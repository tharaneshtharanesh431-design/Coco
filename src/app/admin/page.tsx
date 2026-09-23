import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card } from '@/components/common/Card';
import { Typography } from '@/components/common/Typography';
import { Button } from '@/components/common/Button';
import { QuoteStatus } from '@prisma/client';
import { ArrowUpRight, Clock, CheckCircle2, XCircle, Inbox, TrendingUp, Building2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [total, pending, reviewing, quoted, rejected, recentEnquiries, companyCount] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.PENDING } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.REVIEWING } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.QUOTED } }),
    prisma.quoteRequest.count({ where: { status: QuoteStatus.REJECTED } }),
    prisma.quoteRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.company.count()
  ]);

  const conversionRate = total > 0 ? Math.round((quoted / total) * 100) : 0;

  return (
    <div className="p-6 md:p-10 w-full max-w-[1600px] mx-auto animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <Typography variant="label" className="text-teal-600 mb-2 block">Overview</Typography>
          <Typography variant="h2" className="text-teal-950 m-0">Dashboard</Typography>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/enquiries">
            <Button variant="primary" size="sm">View All Enquiries</Button>
          </Link>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard 
          title="Total Enquiries" 
          value={total} 
          icon={<Inbox size={20} className="text-teal-600" />}
          trend="+12% this month"
          trendPositive={true}
        />
        <MetricCard 
          title="Pending Review" 
          value={pending} 
          icon={<Clock size={20} className="text-amber-600" />}
          alert={pending > 0}
        />
        <MetricCard 
          title="Quotes Sent" 
          value={quoted} 
          icon={<CheckCircle2 size={20} className="text-emerald-600" />}
        />
        <MetricCard 
          title="Registered Companies" 
          value={companyCount} 
          icon={<Building2 size={20} className="text-blue-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden border-teal-900/10 shadow-editorial bg-white">
            <div className="px-6 py-5 border-b border-teal-900/10 flex justify-between items-center bg-ivory-50/50">
              <Typography variant="h5" className="text-teal-950 m-0">Recent Enquiries</Typography>
              <Link href="/admin/enquiries" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
                View All <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-teal-900/10 text-teal-900/60 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/5">
                  {recentEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-teal-900/50">
                        No recent enquiries found.
                      </td>
                    </tr>
                  ) : (
                    recentEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-ivory-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <Link href={`/admin/enquiries/${enquiry.id}`} className="block">
                            <div className="font-medium text-teal-950 group-hover:text-emerald-700 transition-colors">{enquiry.companyName}</div>
                            <div className="text-xs text-teal-900/50">{enquiry.countryRegion}</div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-teal-900/80">{enquiry.product}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={enquiry.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-teal-900/60 text-right whitespace-nowrap">
                          {new Date(enquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Action Center / Quick Stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="p-6 border-teal-900/10 shadow-editorial bg-teal-950 text-white">
            <Typography variant="h5" className="text-white mb-6">Operations Queue</Typography>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b border-teal-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium text-teal-100">Awaiting Review</span>
                </div>
                <span className="text-lg font-serif">{pending}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-teal-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-teal-100">In Progress</span>
                </div>
                <span className="text-lg font-serif">{reviewing}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-sm font-medium text-teal-100">Successfully Quoted</span>
                </div>
                <span className="text-lg font-serif">{quoted}</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

// --- Internal Components ---

function MetricCard({ 
  title, 
  value, 
  icon, 
  trend,
  trendPositive,
  alert 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  alert?: boolean;
}) {
  return (
    <Card className={`p-6 border-teal-900/10 shadow-editorial bg-white relative overflow-hidden ${alert ? 'ring-1 ring-amber-500/50' : ''}`}>
      {alert && <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>}
      <div className="flex justify-between items-start mb-4">
        <Typography variant="label" className="text-teal-900/60 m-0">{title}</Typography>
        <div className="p-2 bg-ivory-100 rounded-md">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <Typography variant="h2" className="text-teal-950 m-0">{value}</Typography>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-teal-900/5">
          <span className={`text-xs font-medium ${trendPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend}
          </span>
        </div>
      )}
    </Card>
  );
}

function StatusBadge({ status }: { status: QuoteStatus }) {
  const styles = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    REVIEWING: 'bg-blue-100 text-blue-800 border-blue-200',
    QUOTED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    REJECTED: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const labels = {
    PENDING: 'Pending',
    REVIEWING: 'Reviewing',
    QUOTED: 'Quoted',
    REJECTED: 'Rejected',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
