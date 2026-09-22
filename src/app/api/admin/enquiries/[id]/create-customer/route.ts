import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import crypto from 'crypto';
import { Resend } from 'resend';
import { CustomerInvitationEmail } from '@/components/emails/CustomerInvitationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verify Admin Session
    const session = await verifyAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing QuoteRequest ID' }, { status: 400 });
    }

    // 2. Read the existing QuoteRequest
    const quoteRequest = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!quoteRequest) {
      return NextResponse.json({ error: 'QuoteRequest not found' }, { status: 404 });
    }

    // 3. Extract relevant information
    const { companyName, businessEmail, countryRegion } = quoteRequest;

    if (!companyName || !businessEmail) {
      return NextResponse.json({ error: 'Missing company name or email in QuoteRequest' }, { status: 400 });
    }

    // 4. Check if Company or Invitation already exists (prevent duplicate clicks)
    // We do this in a transaction to be atomic
    const result = await prisma.$transaction(async (tx) => {
      let company = null;
      if (quoteRequest.companyId) {
        company = await tx.company.findUnique({ where: { id: quoteRequest.companyId } });
      }

      if (!company) {
        // Create new company
        company = await tx.company.create({
          data: {
            name: companyName,
            countryRegion: countryRegion,
          },
        });

        // Link QuoteRequest to this company
        await tx.quoteRequest.update({
          where: { id },
          data: { companyId: company.id },
        });
      }

      // Check if there is already a pending invitation for this email + company
      const existingInvite = await tx.userInvitation.findFirst({
        where: {
          companyId: company.id,
          email: businessEmail,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
      });

      if (existingInvite) {
        return { success: false, error: 'A valid invitation already exists for this email.' };
      }

      // Check if user already exists
      const existingUser = await tx.user.findUnique({
        where: { email: businessEmail },
      });

      if (existingUser) {
        return { success: false, error: 'A user account already exists with this email.' };
      }

      // 5. Generate a cryptographically secure raw token
      const rawToken = crypto.randomBytes(32).toString('hex');

      // 6 & 7. Hash the token
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

      // 8 & 9. Create UserInvitation
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

      const invitation = await tx.userInvitation.create({
        data: {
          companyId: company.id,
          email: businessEmail,
          tokenHash,
          expiresAt,
        },
      });

      return { success: true, company, rawToken };
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { company, rawToken } = result;

    // 10. Send the invitation email using Resend
    if (process.env.RESEND_API_KEY) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const inviteUrl = `${baseUrl}/portal/accept-invite?token=${rawToken}`;
      
      try {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
          to: businessEmail,
          subject: 'Invitation to VERDECOCO Customer Portal',
          react: CustomerInvitationEmail({
            companyName: company!.name,
            inviteUrl,
          }),
        });
      } catch (emailError) {
        console.error(`[Email Delivery Failed] Invite for ${businessEmail}`);
        // We do not fail the request if email fails, as the token is generated, 
        // but normally we should probably handle email delivery guarantees.
      }
    } else {
      console.warn('[Email Warning] RESEND_API_KEY is not set. Skipping invitation email.');
      console.log(`[Development] Raw token: ${rawToken}`); // ONLY for local debug since email isn't sent
    }

    return NextResponse.json({ success: true, companyId: company!.id });
  } catch (error) {
    console.error('Customer onboarding error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
