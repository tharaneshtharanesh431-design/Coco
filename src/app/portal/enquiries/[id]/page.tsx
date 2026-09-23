import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getCustomerSession } from '@/lib/customer-auth';
import { Card } from '@/components/common/Card';
import { Typography } from '@/components/common/Typography';
import { ArrowLeft, Package, MapPin, Building2, User, Phone, Mail, FileText } from 'lucide-react';
import { QuoteStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function CustomerEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getCustomerSession();
  
  if (!session) {
    redirect('/portal/login');
  }

  const resolvedParams = await params;
  const { id } = resolvedParams;

  // STRICT TENANT ISOLATION
  const enquiry = await prisma.quoteRequest.findFirst({
    where: { 
      id,
      companyId: session.companyId 
    },
  });

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Breadcrumb / Back */}
      <Link href="/portal/enquiries" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors mb-8 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Return to Enquiries
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Typography variant="label" className="text-teal-900/40 m-0 font-mono tracking-wider">
              REQ-{enquiry.id.slice(-6).toUpperCase()}
            </Typography>
            <StatusBadge status={enquiry.status} />
          </div>
          <Typography variant="h1" className="text-teal-950 m-0 leading-tight">
            {enquiry.product}
          </Typography>
          <Typography variant="body" className="text-teal-900/60 mt-2">
            Submitted on {new Date(enquiry.createdAt).toLocaleString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 lg:p-10 border-teal-900/10 shadow-sm bg-white">
            <Typography variant="h4" className="text-teal-950 mb-8 border-b border-teal-900/10 pb-4 flex items-center gap-3">
              <Package className="text-emerald-600" size={24} />
              Requirement Specifications
            </Typography>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-8">
              <DetailItem label="Requested Product" value={enquiry.product} />
              <DetailItem label="Order Quantity" value={enquiry.quantityRequirement} />
              <DetailItem label="Destination Market" value={enquiry.countryRegion} icon={<MapPin size={16} className="text-teal-900/40" />} />
              <DetailItem label="Preferred Packaging" value={enquiry.preferredPackaging || 'Standard Bulk Packaging'} />
            </div>
          </Card>

          <Card className="p-8 lg:p-10 border-teal-900/10 shadow-sm bg-ivory-50">
            <Typography variant="h4" className="text-teal-950 mb-6 border-b border-teal-900/10 pb-4 flex items-center gap-3">
              <FileText className="text-emerald-600" size={24} />
              Additional Details & Comments
            </Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="label" className="text-teal-900/50 mb-2 block">Primary Message</Typography>
                <div className="p-6 bg-white rounded-md border border-teal-900/5 text-teal-900/80 whitespace-pre-wrap font-sans text-sm leading-relaxed shadow-sm">
                  {enquiry.message}
                </div>
              </div>

              {enquiry.additionalRequirements && (
                <div>
                  <Typography variant="label" className="text-teal-900/50 mb-2 block">Certifications & Special Instructions</Typography>
                  <div className="p-6 bg-white rounded-md border border-teal-900/5 text-teal-900/80 whitespace-pre-wrap font-sans text-sm leading-relaxed shadow-sm">
                    {enquiry.additionalRequirements}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-8">
          <Card className="p-8 border-teal-900/10 shadow-sm bg-teal-950 text-white">
            <Typography variant="h5" className="text-white mb-6 border-b border-teal-800 pb-4 flex items-center gap-3">
              <Building2 className="text-emerald-400" size={20} />
              Contact Information
            </Typography>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <User size={18} className="text-teal-100/50 mt-1 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-teal-100/50 font-medium mb-1">Point of Contact</span>
                  <span className="block text-sm font-medium text-white">{enquiry.fullName}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={18} className="text-teal-100/50 mt-1 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-teal-100/50 font-medium mb-1">Business Email</span>
                  <a href={`mailto:${enquiry.businessEmail}`} className="block text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors break-all">
                    {enquiry.businessEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} className="text-teal-100/50 mt-1 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-teal-100/50 font-medium mb-1">Phone Number</span>
                  <span className="block text-sm font-medium text-white">{enquiry.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </Card>

          {enquiry.status === QuoteStatus.QUOTED && (
            <Card className="p-8 border-emerald-900/20 shadow-sm bg-emerald-50">
              <Typography variant="h5" className="text-emerald-900 mb-4">Quote Ready</Typography>
              <Typography variant="body" className="text-emerald-800/80 text-sm mb-6">
                Your commercial quotation has been prepared. Please check your email inbox ({enquiry.businessEmail}) for the official commercial proposal and pricing.
              </Typography>
              <a href={`mailto:tharaneeshm2416@gmail.com?subject=Regarding Quote REQ-${enquiry.id.slice(-6).toUpperCase()}`} className="inline-flex items-center justify-center w-full px-4 py-3 bg-emerald-700 text-white text-sm font-medium rounded-sm hover:bg-emerald-800 transition-colors shadow-sm">
                Contact Sales Team
              </a>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Internal Components ---

function DetailItem({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <span className="block text-[11px] uppercase tracking-[0.15em] font-semibold text-teal-900/50 mb-2">{label}</span>
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="block text-base font-medium text-teal-950">{value}</span>
      </div>
    </div>
  );
}

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
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
