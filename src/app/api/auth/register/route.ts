import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createCustomerSession } from '@/lib/customer-auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate Input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { email, password, fullName, companyName, countryRegion } = validationResult.data;

    // 2. Perform validation and creation in an atomic transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if user already exists
      const existingUser = await tx.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      // Hash the new password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create the Company
      const company = await tx.company.create({
        data: {
          name: companyName,
          countryRegion: countryRegion,
        },
      });

      // Create the User (tied to the new company)
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          fullName,
          companyId: company.id,
          role: 'COMPANY_ADMIN', // Self-registered users are admins of their own company
        },
      });

      return { success: true, user };
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const { user } = result;

    // 3. Create customer session
    await createCustomerSession({
      userId: user!.id,
      companyId: user!.companyId,
      email: user!.email,
      role: user!.role,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred during registration.' },
      { status: 500 }
    );
  }
}
