import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'Resources | VERDECOCO',
  description: 'Useful information, clearly presented. Explore our FAQ and Industry Insights.',
  alternates: {
    canonical: '/resources',
  },
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — RESOURCES HERO */}
      <section className="relative min-h-[70vh] flex items-end pb-16 lg:pb-24 pt-40 overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/80 to-teal-950/40 z-10"></div>
          <Image 
            src="/images/about-harvest.jpg"
            alt="Resources Background"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>
        
        <div className="container-grid relative z-20 w-full flex flex-col justify-end">
          <ScrollFade direction="up">
            <div className="max-w-[900px]">
              
              <div className="flex items-center gap-6 mb-8 lg:mb-12">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic">
                  VERDECOCO / RESOURCES
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.05] text-white mb-10 tracking-tight">
                Useful information, <span className="italic text-ivory/80 font-light block mt-2">clearly presented.</span>
              </h1>
              
              <div className="border-t border-teal-800/50 pt-8">
                <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                  Explore answers to common operational questions and view published industry insights.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — RESOURCE HUBS */}
      <section className="section-padding bg-ivory relative z-10 -mt-8 rounded-t-3xl border-t border-teal-900/10">
        <div className="container-grid">
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* FAQ HUB */}
            <StaggerItem className="group relative border border-teal-900/10 p-10 lg:p-14 bg-white transition-colors hover:border-teal-900/30">
              <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 block mb-8 uppercase italic">
                01
              </span>
              <h2 className="font-serif text-4xl text-teal-950 mb-6 tracking-tight">
                Frequently Asked <span className="italic font-light text-emerald-800">Questions</span>
              </h2>
              <p className="text-teal-900/70 font-sans text-sm leading-loose tracking-wide mb-12 max-w-sm">
                Answers to common questions regarding our verified products, export preparation, sourcing, and commercial supply chain.
              </p>
              <Link href="/resources/faq" className="inline-flex items-center gap-4 text-teal-950 font-serif italic text-lg transition-colors group-hover:text-emerald-700">
                <span>Explore FAQ</span>
                <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </StaggerItem>

            {/* INSIGHTS HUB */}
            <StaggerItem className="group relative border border-teal-900/10 p-10 lg:p-14 bg-white transition-colors hover:border-teal-900/30">
              <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 block mb-8 uppercase italic">
                02
              </span>
              <h2 className="font-serif text-4xl text-teal-950 mb-6 tracking-tight">
                Industry <span className="italic font-light text-emerald-800">Insights</span>
              </h2>
              <p className="text-teal-900/70 font-sans text-sm leading-loose tracking-wide mb-12 max-w-sm">
                Published knowledge, agricultural updates, and operational insights from the VERDECOCO team.
              </p>
              <Link href="/resources/insights" className="inline-flex items-center gap-4 text-teal-950 font-serif italic text-lg transition-colors group-hover:text-emerald-700">
                <span>Explore Insights</span>
                <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3 — B2B CTA */}
      <section className="section-padding bg-teal-950 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              Commercial Requirements
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-10">
              Have a specific <span className="italic font-light text-emerald-400">requirement?</span>
            </h2>
            <p className="text-teal-100/80 font-serif italic text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              If your questions are not answered in our resources, please reach out to discuss your specific international supply needs.
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
