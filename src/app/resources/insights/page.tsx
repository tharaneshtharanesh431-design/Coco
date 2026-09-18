import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Insights | VERDECOCO',
  description: 'Industry insights and operational updates from VERDECOCO.',
  alternates: {
    canonical: '/resources/insights',
  },
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col w-full bg-ivory min-h-[70vh] md:min-h-[90vh] pt-28 md:pt-40 pb-12 md:pb-24">
      <div className="container-grid max-w-4xl">
        
        <ScrollFade>
          <div className="flex items-center gap-6 mb-8">
            <Link href="/resources" className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic hover:text-teal-950 transition-colors">
              RESOURCES
            </Link>
            <span className="text-teal-900/30">/</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-teal-900/50 font-medium italic">
              INSIGHTS
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 mb-10 tracking-tight break-words">
            Industry <span className="italic text-emerald-800 font-light">Insights.</span>
          </h1>
          
          <div className="w-24 h-px bg-teal-900/20 mb-16"></div>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <div className="border border-teal-900/10 bg-white p-12 md:p-20 text-center max-w-2xl mx-auto rounded-sm">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
              Content in Development
            </span>
            <h2 className="font-serif text-3xl text-teal-950 mb-6 italic">
              Coming Soon
            </h2>
            <p className="text-teal-900/70 font-sans text-sm leading-relaxed tracking-wide mb-10">
              We are currently preparing published industry knowledge, agricultural updates, and operational insights. Please check back later for our latest editorial releases.
            </p>
            <Link href="/resources" className="inline-flex items-center gap-4 text-teal-950 font-serif italic text-lg transition-colors hover:text-emerald-700">
              <span className="transform transition-transform rotate-180">→</span>
              <span>Return to Resources</span>
            </Link>
          </div>
        </ScrollFade>

      </div>
    </div>
  );
}
