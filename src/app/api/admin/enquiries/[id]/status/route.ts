import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { QuoteStatus } from '@prisma/client';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Validate status
    if (!Object.values(QuoteStatus).includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updatedEnquiry = await prisma.quoteRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedEnquiry);
  } catch (error) {
    console.error('Failed to update status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
