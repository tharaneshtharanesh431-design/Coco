import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request a Quote | VERDECOCO',
  description: 'Provide your product and quantity requirements to receive a detailed commercial quotation from VERDECOCO.',
  alternates: {
    canonical: '/quote',
  },
};

export default function QuotePage() {
  return (
    <div className="flex flex-col w-full bg-ivory min-h-screen pt-40 pb-24">
      <div className="container-grid">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Form Area */}
          <div className="lg:col-span-8">
            <ScrollFade>
              <div className="mb-12">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                  REQUEST A QUOTE
                </span>
                <h1 className="font-serif text-5xl md:text-6xl text-teal-950 mb-6 tracking-tight leading-[1.05]">
                  Tell us what you <span className="italic text-emerald-800 font-light block mt-2">are looking for.</span>
                </h1>
                <p className="text-teal-900/70 font-sans text-sm leading-relaxed tracking-wide max-w-xl">
                  Provide your product, quantity, and business requirements below. Our commercial team will review your enquiry and provide a detailed quotation.
                </p>
              </div>

              <div className="bg-white border border-teal-900/10 p-8 md:p-12 shadow-sm rounded-sm">
                <Suspense fallback={<div className="h-96 flex items-center justify-center text-teal-900/40 italic font-serif">Loading form...</div>}>
                  <QuoteForm />
                </Suspense>
              </div>
            </ScrollFade>
          </div>

          {/* Sidebar Contact Info */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <ScrollFade delay={0.1} className="sticky top-32">
              
              <div className="bg-teal-950 p-10 rounded-sm">
                <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 block mb-6 uppercase italic">
                  Business Contact
                </span>
                
                <h2 className="font-serif text-2xl text-white mb-1">Tharaneesh M</h2>
                <p className="text-teal-100/60 font-sans text-xs tracking-wide mb-8 pb-8 border-b border-teal-800/50">
                  Owner / Business Contact
                </p>

                <ul className="space-y-6">
                  <li>
                    <a href="mailto:tharaneeshm2416@gmail.com" className="group flex items-start gap-4">
                      <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.1em] text-teal-100/40 font-medium mb-1">Email</span>
                        <span className="text-white font-sans text-sm group-hover:text-emerald-400 transition-colors break-words">tharaneeshm2416@gmail.com</span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <a href="tel:+918124173993" className="group flex items-start gap-4">
                      <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.1em] text-teal-100/40 font-medium mb-1">Phone</span>
                        <span className="text-white font-sans text-sm group-hover:text-emerald-400 transition-colors">+91 8124173993</span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.1em] text-teal-100/40 font-medium mb-1">Location</span>
                        <span className="text-white font-sans text-sm leading-relaxed">Gandhipuram, Dharapuram</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </ScrollFade>
          </div>

        </div>

      </div>
    </div>
  );
}
