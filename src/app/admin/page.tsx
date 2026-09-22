import React from 'react';
import prisma from '@/lib/prisma';
import { Card } from '@/components/common/Card';
import { QuoteStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [total, pending, reviewing, quoted, rejected] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.PENDING } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.REVIEWING } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.QUOTED } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.REJECTED } }),
  ]);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="font-serif text-4xl mb-2 text-white">Dashboard</h1>
        <p className="text-teal-200">Overview of your business enquiries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <DashboardCard title="Total" count={total} className="bg-teal-900 border-teal-800 text-white" />
        <DashboardCard title="Pending" count={pending} className="bg-amber-900/50 border-amber-800 text-amber-50" />
        <DashboardCard title="Reviewing" count={reviewing} className="bg-blue-900/50 border-blue-800 text-blue-50" />
        <DashboardCard title="Quoted" count={quoted} className="bg-emerald-900/50 border-emerald-800 text-emerald-50" />
        <DashboardCard title="Rejected" count={rejected} className="bg-rose-900/50 border-rose-800 text-rose-50" />
      </div>
    </div>
  );
}

function DashboardCard({ title, count, className }: { title: string; count: number; className?: string }) {
  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-sm uppercase tracking-wider font-semibold opacity-80 mb-2">{title}</h3>
      <p className="text-4xl font-serif">{count}</p>
    </Card>
  );
}
