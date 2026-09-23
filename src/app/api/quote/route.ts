import { NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validations/quote';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { Resend } from 'resend';
import { QuoteNotificationEmail } from '@/components/emails/QuoteNotificationEmail';
import { cookies } from 'next/headers';
import { CUSTOMER_SESSION_COOKIE_NAME, CustomerJwtPayload } from '@/lib/customer-auth';
import { jwtVerify } from 'jose';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (5 requests per IP per minute)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = checkRateLimit(ip, 5, 60000);
    
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Content-Type Validation
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Unsupported Media Type' },
        { status: 415 }
      );
    }

    // 3. Request Size Limit (5KB) and Parse JSON
    let body;
    try {
      if (!req.body) {
        throw new Error('Missing request body');
      }

      let rawBody = '';
      let bytesRead = 0;
      const reader = req.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          bytesRead += value.length;
          if (bytesRead > 5120) { // 5 KB limit
            return NextResponse.json(
              { success: false, error: 'Payload Too Large' },
              { status: 413 }
            );
          }
          rawBody += decoder.decode(value, { stream: true });
        }
      }
      rawBody += decoder.decode();
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }

    // 4. Server-Side Zod Validation
    const validationResult = quoteSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 5. Enforce Authentication (B2B Requirement)
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;
    
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: 'Authentication required to submit a quote.' },
        { status: 401 }
      );
    }
    
    // Verify session
    let sessionPayload;
    try {
      const secret = process.env.JWT_SECRET_CUSTOMER;
      if (!secret) throw new Error('Missing JWT_SECRET_CUSTOMER');
      
      const key = new TextEncoder().encode(secret);
      const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ['HS256'] });
      sessionPayload = payload as unknown as CustomerJwtPayload;
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session.' },
        { status: 401 }
      );
    }

    if (!sessionPayload.companyId) {
      return NextResponse.json(
        { success: false, error: 'Session is missing company association.' },
        { status: 403 }
      );
    }

    // 6. Fetch user and company to auto-fill immutable fields
    const user = await prisma.user.findUnique({
      where: { id: sessionPayload.userId },
      include: { company: true }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found.' },
        { status: 404 }
      );
    }

    // 7. Persist with Prisma (Safe database access, strictly tied to companyId)
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        // Enforced Server-Side derived fields
        fullName: user.fullName,
        companyName: user.company.name,
        businessEmail: user.email,
        countryRegion: user.company.countryRegion,
        companyId: sessionPayload.companyId,
        // Client-provided fields
        phone: validData.phone || null,
        buyerType: validData.buyerType,
        product: validData.product,
        quantityRequirement: validData.quantityRequirement,
        preferredPackaging: validData.preferredPackaging || null,
        additionalRequirements: validData.additionalRequirements || null,
        message: validData.message,
        status: 'PENDING'
      }
    });

    // 8. Attempt to Send Email Notification
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL_TO || 'tharaneeshm2416@gmail.com',
          replyTo: user.email,
          subject: `New B2B Enquiry - ${quoteRequest.id}`,
          react: QuoteNotificationEmail({
            id: quoteRequest.id,
            fullName: user.fullName,
            companyName: user.company.name,
            businessEmail: user.email,
            phone: validData.phone,
            countryRegion: user.company.countryRegion,
            buyerType: validData.buyerType,
            product: validData.product,
            quantityRequirement: validData.quantityRequirement,
            preferredPackaging: validData.preferredPackaging,
            additionalRequirements: validData.additionalRequirements,
            message: validData.message,
            createdAt: quoteRequest.createdAt
          })
        });
      } else {
        console.warn('[Email Warning] RESEND_API_KEY is not set. Skipping email notification.');
      }
    } catch (emailError) {
      // Safe server-side logging. Do not expose customer payload or secrets.
      console.error(`[Email Delivery Failed] Quote ID: ${quoteRequest.id}`);
      if (emailError instanceof Error) {
        console.error(`[Email Delivery Error] ${emailError.message}`);
      }
      // Note: We do NOT throw here. 
      // The database persistence succeeded, so we continue to return 201 Created.
    }

    // 9. Return Success 201
    // The client only learns that the enquiry was received, not whether the email was delivered.
    return NextResponse.json(
      { success: true, id: quoteRequest.id },
      { status: 201 }
    );

  } catch (error) {
    // 10. Prevent DB error leakage / Error masking
    // In production, we log internally but do not return stack traces
    console.error('Quote Submission Error:', error);
    
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
