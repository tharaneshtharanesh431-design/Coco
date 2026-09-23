import React from 'react';
import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/customer-auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Typography } from '@/components/common/Typography';
import { Building, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { QuoteStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function CustomerDashboardPage() {
  const session = await getCustomerSession();
  
  if (!session) {
    redirect('/portal/login');
  }

  const company = await prisma.company.findUnique({
    where: { id: session.companyId },
    select: { name: true },
  });

  const [totalEnquiries, quotesReceived] = await Promise.all([
    prisma.quoteRequest.count({
      where: { companyId: session.companyId },
    }),
    prisma.quoteRequest.count({
      where: { companyId: session.companyId, status: QuoteStatus.QUOTED },
    })
  ]);

  const recentEnquiries = await prisma.quoteRequest.findMany({
    where: { companyId: session.companyId },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="w-full animate-in fade-in duration-700">
      <div className="mb-12">
        <Typography variant="label" className="text-emerald-700 mb-2 block">Client Dashboard</Typography>
        <Typography variant="h1" className="text-teal-950 m-0">Welcome back.</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-8 border-teal-900/10 shadow-sm bg-white">
          <div className="flex justify-between items-start mb-6">
            <Typography variant="label" className="text-teal-900/50 m-0">Account Identity</Typography>
            <Building size={20} className="text-teal-900/30" />
          </div>
          <Typography variant="h3" className="text-teal-950 mb-1">{company?.name || 'Your Company'}</Typography>
          <p className="text-sm text-teal-900/60 font-medium">{session.email}</p>
        </Card>

        <Card className="p-8 border-teal-900/10 shadow-sm bg-white">
          <div className="flex justify-between items-start mb-6">
            <Typography variant="label" className="text-teal-900/50 m-0">Access Level</Typography>
            <ShieldCheck size={20} className="text-emerald-600" />
          </div>
          <Typography variant="h3" className="text-teal-950 mb-1 capitalize">{session.role.toLowerCase()}</Typography>
          <p className="text-sm text-teal-900/60 font-medium">Verified B2B Partner</p>
        </Card>

        <Card className="p-8 border-teal-900/10 shadow-sm bg-teal-950 text-white">
          <div className="flex justify-between items-start mb-6">
            <Typography variant="label" className="text-teal-100/50 m-0">Activity Overview</Typography>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <span className="text-4xl font-serif">{totalEnquiries}</span>
              <span className="text-xs text-teal-100/60 ml-2 uppercase tracking-widest">Enquiries</span>
            </div>
            <div className="h-8 w-px bg-teal-800"></div>
            <div>
              <span className="text-2xl font-serif text-emerald-400">{quotesReceived}</span>
              <span className="text-xs text-teal-100/60 ml-2 uppercase tracking-widest">Quotes</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-end mb-6">
        <Typography variant="h3" className="text-teal-950 m-0">Recent Activity</Typography>
        <Link href="/portal/enquiries" className="text-sm font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group transition-colors">
          View All Enquiries <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <Card className="p-0 overflow-hidden border-teal-900/10 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory-50 border-b border-teal-900/10 text-teal-900/60 text-xs uppercase tracking-wider font-semibold">
                <th className="px-8 py-5">Product Required</th>
                <th className="px-8 py-5">Quantity</th>
                <th className="px-8 py-5">Date Submitted</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-900/5">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <Typography variant="body" className="text-teal-900/50">You have no active quote requests.</Typography>
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-ivory-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <Link href={`/portal/enquiries/${enquiry.id}`} className="block">
                        <span className="font-medium text-teal-950 group-hover:text-emerald-700 transition-colors">{enquiry.product}</span>
                      </Link>
                    </td>
                    <td className="px-8 py-5 text-sm text-teal-900/80">{enquiry.quantityRequirement}</td>
                    <td className="px-8 py-5 text-sm text-teal-900/60">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <StatusBadge status={enquiry.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// --- Internal Components ---

function StatusBadge({ status }: { status: QuoteStatus }) {
  const styles = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200/60',
    REVIEWING: 'bg-blue-50 text-blue-700 border-blue-200/60',
    QUOTED: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200/60',
  };

  const labels = {
    PENDING: 'Pending Review',
    REVIEWING: 'In Progress',
    QUOTED: 'Quote Available',
    REJECTED: 'Closed',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
