import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card } from '@/components/common/Card';
import { QuoteStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiries() {
  const enquiries = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'REVIEWING': return 'bg-blue-100 text-blue-800';
      case 'QUOTED': return 'bg-emerald-100 text-emerald-800';
      case 'REJECTED': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="font-serif text-4xl mb-2 text-white">Enquiries</h1>
        <p className="text-teal-200">Manage all incoming quote requests.</p>
      </div>

      <Card className="bg-white overflow-hidden border-none text-teal-900 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-teal-50 text-teal-800 border-b border-teal-100">
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Date</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Company</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Product</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Region</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-sm uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b border-teal-50 hover:bg-teal-50/50 transition-colors">
                    <td className="p-4 whitespace-nowrap text-sm">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{enquiry.companyName}</div>
                      <div className="text-xs text-gray-500">{enquiry.fullName}</div>
                    </td>
                    <td className="p-4 text-sm">{enquiry.product}</td>
                    <td className="p-4 text-sm">{enquiry.countryRegion}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/admin/enquiries/${enquiry.id}`}
                        className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                      >
                        View Details
                      </Link>
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
