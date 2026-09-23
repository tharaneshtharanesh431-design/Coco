import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/customer-auth';
import { B2BAuthUI } from '@/components/forms/B2BAuthUI';
import { FadeIn } from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/TextReveal';
import * as motion from 'framer-motion/client';

export const metadata: Metadata = {
  title: 'Request a Quote | VERDECOCO',
  description: 'Create your VERDECOCO Business Account to request quotations, track orders, and manage shipments.',
  alternates: {
    canonical: '/quote',
  },
};

export const dynamic = 'force-dynamic';

export default async function QuoteConversionPage() {
  const session = await getCustomerSession();

  // 1. If Authenticated -> Redirect straight to the secure Quote Builder
  if (session) {
    redirect('/portal/enquiries/new');
  }

  // 2. If Unauthenticated -> Show B2B Conversion Funnel
  return (
    <div className="flex flex-col w-full bg-ivory min-h-screen pt-28 md:pt-32 pb-12 md:pb-24">
      <div className="container-grid h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:min-h-[70vh]">
          
          {/* Left Column: B2B Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="max-w-xl">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                  B2B COMMERCE PORTAL
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 mb-6 tracking-tight leading-[1]">
                  <TextReveal text="Premium quality" delay={0.1} />
                  <TextReveal text="coconut products," delay={0.2} />
                  <span className="italic text-emerald-800 font-light block mt-2">
                    <TextReveal text="delivered globally." delay={0.3} />
                  </span>
                </h1>
                
                <p className="text-teal-900/70 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-12">
                  Create your VERDECOCO Business Account to access our secure B2B commerce platform.
                </p>

                <ul className="space-y-6">
                  {[
                    {
                      title: 'Request Quotations',
                      desc: 'Submit detailed commercial requirements and receive custom pricing directly to your dashboard.'
                    },
                    {
                      title: 'Manage Orders & Shipments',
                      desc: 'Track the status of your active shipments, download commercial invoices, and access Bill of Lading documents.'
                    },
                    {
                      title: 'Dedicated Account Manager',
                      desc: 'Get personalized support for your commercial needs, contract negotiations, and logistics.'
                    }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-teal-950 mb-1">{item.title}</h4>
                        <p className="font-sans text-sm text-teal-900/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }} 
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="bg-white border border-teal-900/10 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-50" />
                <B2BAuthUI returnUrl="/portal/enquiries/new" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
