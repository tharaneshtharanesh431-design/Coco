import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { createCustomerSession } from '@/lib/customer-auth';

export async function POST(request: Request) {
  try {
    const { token, fullName, password } = await request.json();

    if (!token || !fullName || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // 1. Hash the incoming token
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Perform validation and user creation inside an atomic transaction
    const result = await prisma.$transaction(async (tx) => {
      // Find the invitation
      const invitation = await tx.userInvitation.findUnique({
        where: { tokenHash },
      });

      if (!invitation) {
        return { success: false, error: 'Invalid or expired invitation' };
      }

      if (invitation.usedAt !== null) {
        return { success: false, error: 'This invitation has already been used' };
      }

      if (invitation.expiresAt < new Date()) {
        return { success: false, error: 'This invitation has expired' };
      }

      // Check if user already exists (just in case of race conditions)
      const existingUser = await tx.user.findUnique({
        where: { email: invitation.email },
      });

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Hash the new password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create the User (tied to the company and email from the invitation)
      const user = await tx.user.create({
        data: {
          email: invitation.email,
          passwordHash,
          fullName,
          companyId: invitation.companyId,
          role: 'CUSTOMER',
        },
      });

      // Mark the invitation as used
      await tx.userInvitation.update({
        where: { id: invitation.id },
        data: { usedAt: new Date() },
      });

      return { success: true, user };
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { user } = result;

    // 3. Create customer session
    await createCustomerSession({
      userId: user!.id,
      companyId: user!.companyId,
      email: user!.email,
      role: user!.role,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Accept invite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
