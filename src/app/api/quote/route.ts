import { NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validations/quote';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { Resend } from 'resend';
import { QuoteNotificationEmail } from '@/components/emails/QuoteNotificationEmail';

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

    // 5. Persist with Prisma (Safe database access)
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        fullName: validData.fullName,
        companyName: validData.companyName,
        businessEmail: validData.businessEmail,
        phone: validData.phone || null,
        countryRegion: validData.countryRegion,
        buyerType: validData.buyerType,
        product: validData.product,
        quantityRequirement: validData.quantityRequirement,
        preferredPackaging: validData.preferredPackaging || null,
        additionalRequirements: validData.additionalRequirements || null,
        message: validData.message,
        status: 'PENDING'
      }
    });

    // 6. Attempt to Send Email Notification
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
          to: process.env.CONTACT_EMAIL_TO || 'tharaneeshm2416@gmail.com',
          replyTo: validData.businessEmail,
          subject: `New B2B Enquiry - ${quoteRequest.id}`,
          react: QuoteNotificationEmail({
            id: quoteRequest.id,
            fullName: validData.fullName,
            companyName: validData.companyName,
            businessEmail: validData.businessEmail,
            phone: validData.phone,
            countryRegion: validData.countryRegion,
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

    // 7. Return Success 201
    // The client only learns that the enquiry was received, not whether the email was delivered.
    return NextResponse.json(
      { success: true, id: quoteRequest.id },
      { status: 201 }
    );

  } catch (error) {
    // 7. Prevent DB error leakage / Error masking
    // In production, we log internally but do not return stack traces
    console.error('Quote Submission Error:', error);
    
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
