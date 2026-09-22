import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Card } from '@/components/common/Card';
import { StatusUpdater } from './StatusUpdater';
import { CustomerOnboarding } from './CustomerOnboarding';

export const dynamic = 'force-dynamic';

export default async function EnquiryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const enquiry = await prisma.quoteRequest.findUnique({
    where: { id },
  });

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin/enquiries" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium mb-4 inline-block">
            &larr; Back to Enquiries
          </Link>
          <h1 className="font-serif text-3xl text-white">Enquiry Details</h1>
          <p className="text-teal-200 mt-1">Submitted on {new Date(enquiry.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <Card className="bg-white text-teal-900 border-none shadow-2xl p-6 md:p-10">
        <div className="mb-10 pb-10 border-b border-gray-200">
          <h2 className="font-serif text-2xl mb-6 text-teal-800">Status Management</h2>
          <StatusUpdater enquiryId={enquiry.id} currentStatus={enquiry.status} />
        </div>

        <div className="mb-10 pb-10 border-b border-gray-200">
          <CustomerOnboarding enquiryId={enquiry.id} hasCompany={!!enquiry.companyId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-4">Customer Info</h3>
            <div className="space-y-4">
              <DetailItem label="Full Name" value={enquiry.fullName} />
              <DetailItem label="Company Name" value={enquiry.companyName} />
              <DetailItem label="Business Email" value={enquiry.businessEmail} />
              <DetailItem label="Phone Number" value={enquiry.phone || 'Not provided'} />
              <DetailItem label="Country/Region" value={enquiry.countryRegion} />
              <DetailItem label="Buyer Type" value={enquiry.buyerType} />
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-4">Requirement Info</h3>
            <div className="space-y-4">
              <DetailItem label="Product" value={enquiry.product} />
              <DetailItem label="Quantity" value={enquiry.quantityRequirement} />
              <DetailItem label="Preferred Packaging" value={enquiry.preferredPackaging || 'Not specified'} />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-gray-200">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-gray-500 mb-4">Additional Details</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
            <div className="p-4 bg-gray-50 rounded-md text-gray-800 whitespace-pre-wrap font-sans">
              {enquiry.message}
            </div>
          </div>

          {enquiry.additionalRequirements && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications / Special Requirements</h4>
              <div className="p-4 bg-gray-50 rounded-md text-gray-800 whitespace-pre-wrap font-sans">
                {enquiry.additionalRequirements}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs font-medium text-gray-500 mb-1">{label}</span>
      <span className="block text-base font-medium text-teal-900">{value}</span>
    </div>
  );
}
