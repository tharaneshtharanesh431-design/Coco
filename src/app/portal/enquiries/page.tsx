import React from 'react';
import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/customer-auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Typography } from '@/components/common/Typography';
import { Button } from '@/components/common/Button';
import { QuoteStatus } from '@prisma/client';
import { Eye, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CustomerEnquiriesPage() {
  const session = await getCustomerSession();
  
  if (!session) {
    redirect('/portal/login');
  }

  const enquiries = await prisma.quoteRequest.findMany({
    where: { companyId: session.companyId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="w-full animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Typography variant="label" className="text-emerald-700 mb-2 block">Management</Typography>
          <Typography variant="h2" className="text-teal-950 m-0">Enquiries & Quotes</Typography>
        </div>
        <div className="flex items-center">
          <Link href="/quote">
            <Button variant="primary" size="sm" className="gap-2 px-4 py-2 flex items-center">
              <Plus size={16} />
              Submit New Request
            </Button>
          </Link>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-teal-900/10 shadow-sm bg-white">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory-50 border-b border-teal-900/10 text-teal-900/60 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Product Requirement</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Date Submitted</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-900/5">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <Typography variant="h5" className="text-teal-950 mb-2">No Enquiries Found</Typography>
                      <Typography variant="body" className="text-teal-900/60 text-sm mb-6">
                        You haven't submitted any quote requests yet. Start by exploring our products and submitting a requirement.
                      </Typography>
                      <Link href="/quote">
                        <Button variant="outline" size="sm">Request a Quote</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-ivory-50/50 transition-colors group">
                    <td className="px-6 py-5 text-xs font-mono text-teal-900/40">
                      #{enquiry.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-teal-950 font-medium group-hover:text-emerald-700 transition-colors">{enquiry.product}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-teal-900/80">{enquiry.quantityRequirement}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-teal-900/80">{enquiry.countryRegion}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={enquiry.status} />
                    </td>
                    <td className="px-6 py-5 text-sm text-teal-900/60 text-right whitespace-nowrap">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Link 
                        href={`/portal/enquiries/${enquiry.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-emerald-50 text-teal-900/40 hover:text-emerald-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {enquiries.length > 0 && (
          <div className="px-6 py-4 border-t border-teal-900/10 flex items-center justify-between bg-ivory-50">
            <Typography variant="body" className="text-xs text-teal-900/50">
              Showing <span className="font-medium">{enquiries.length}</span> total requests
            </Typography>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="px-3 text-xs" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="px-3 text-xs" disabled>Next</Button>
            </div>
          </div>
        )}
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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
