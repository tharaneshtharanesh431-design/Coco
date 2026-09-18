import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/common/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | VERDECOCO',
  description: 'Contact VERDECOCO for product enquiries, export requirements, and business enquiries.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — HERO */}
      <section className="pt-40 pb-16 lg:pb-24 bg-teal-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/90 to-teal-950/60 z-10"></div>
          {/* Subtle background texture/pattern could go here if available, keeping it minimal */}
        </div>
        
        <div className="container-grid relative z-20">
          <ScrollFade direction="up">
            <div className="max-w-3xl">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
                CONTACT VERDECOCO
              </span>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-white mb-8 tracking-tight">
                Let's discuss your <span className="italic text-emerald-400 font-light block mt-2">requirements.</span>
              </h1>
              <p className="text-teal-100/80 text-lg md:text-xl leading-relaxed font-light font-serif italic border-t border-teal-800/50 pt-8 max-w-2xl">
                We are available to discuss product enquiries, export preparation, and long-term commercial supply partnerships.
              </p>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INFO & MARKETS */}
      <section className="section-padding bg-ivory relative z-10 -mt-8 rounded-t-3xl border-t border-teal-900/10">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Business Contact Panel */}
            <ScrollFade>
              <div className="bg-white border border-teal-900/10 p-10 md:p-14 rounded-sm shadow-sm">
                <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 block mb-6 uppercase italic">
                  Business Contact
                </span>
                
                <h2 className="font-serif text-3xl text-teal-950 mb-2">Tharaneesh M</h2>
                <p className="text-teal-900/60 font-sans text-sm tracking-wide mb-10 pb-10 border-b border-teal-900/10">
                  Owner / Business Contact
                </p>

                <ul className="space-y-8">
                  <li>
                    <a href="mailto:tharaneeshm2416@gmail.com" className="group flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center shrink-0 border border-teal-900/5 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                        <Mail className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-[0.1em] text-teal-900/40 font-medium mb-1">Email</span>
                        <span className="text-teal-950 font-sans group-hover:text-emerald-700 transition-colors">tharaneeshm2416@gmail.com</span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <a href="tel:+918124173993" className="group flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center shrink-0 border border-teal-900/5 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                        <Phone className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-[0.1em] text-teal-900/40 font-medium mb-1">Phone</span>
                        <span className="text-teal-950 font-sans group-hover:text-emerald-700 transition-colors">+91 8124173993</span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center shrink-0 border border-teal-900/5">
                        <MapPin className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <span className="block text-xs uppercase tracking-[0.1em] text-teal-900/40 font-medium mb-1">Location</span>
                        <span className="text-teal-950 font-sans leading-relaxed">Gandhipuram, Dharapuram</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollFade>

            {/* What Can We Help With & Markets */}
            <div className="space-y-16">
              
              <ScrollFade delay={0.1}>
                <h3 className="font-serif text-2xl text-teal-950 mb-8 italic border-b border-teal-900/10 pb-6">
                  What can we help with?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Product enquiries',
                    'Export requirements',
                    'Packaging formats',
                    'Commercial enquiries',
                    'Business partnerships'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-teal-900/80 font-sans text-sm tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollFade>

              <ScrollFade delay={0.2}>
                <h3 className="font-serif text-2xl text-teal-950 mb-8 italic border-b border-teal-900/10 pb-6">
                  International Markets
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="block text-xs uppercase tracking-[0.1em] text-teal-900/40 font-medium mb-4">Regions Served</span>
                    <ul className="space-y-3">
                      {['Middle East', 'Europe', 'Asia'].map((region, idx) => (
                        <li key={idx} className="text-teal-900/80 font-sans text-sm tracking-wide">{region}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.1em] text-teal-900/40 font-medium mb-4">Commercial Buyers</span>
                    <ul className="space-y-3">
                      {['Importers', 'Distributors', 'Wholesalers', 'Commercial Buyers'].map((buyer, idx) => (
                        <li key={idx} className="text-teal-900/80 font-sans text-sm tracking-wide">{buyer}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollFade>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — CTA */}
      <section className="section-padding bg-ivory border-t border-teal-900/10 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
              Initiate a Request
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-teal-950 tracking-tight leading-[1.1] mb-8">
              Have a specific <span className="italic font-light text-emerald-800">requirement?</span>
            </h2>
            <p className="text-teal-900/70 font-serif italic text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              Share your product and quantity requirements with us to receive a detailed commercial quotation.
            </p>
            
            <div className="flex justify-center">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" withArrow>
                  Request a Quote
                </Button>
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>

    </div>
  );
}
