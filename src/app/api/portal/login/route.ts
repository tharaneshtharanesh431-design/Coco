import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createCustomerSession } from '@/lib/customer-auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true },
    });

    if (!user) {
      // Return a generic error to prevent email enumeration
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create the customer session JWT
    await createCustomerSession({
      userId: user.id,
      companyId: user.companyId,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Customer login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
