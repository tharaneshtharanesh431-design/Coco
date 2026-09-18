import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/services/mockData';

export const metadata: Metadata = {
  title: 'Process | VERDECOCO',
  description: 'The VERDECOCO export sequence. An end-to-end transparent process from initial enquiry to final global delivery.',
  alternates: {
    canonical: '/process',
  },
};

export default function ProcessPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — PROCESS HERO */}
      <section className="relative min-h-[90vh] flex items-end pb-16 lg:pb-32 pt-40 overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-harvest.jpg"
            alt="Farm Harvest"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/20 to-teal-950/10"></div>
        </div>
        
        <div className="container-grid relative z-10 w-full flex flex-col justify-end">
          <ScrollFade direction="up">
            <div className="max-w-[1100px]">
              
              <div className="flex items-center gap-6 mb-8 lg:mb-12">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic">
                  VERDECOCO / OUR PROCESS
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.05] text-white mb-12 tracking-tight">
                From the farm <span className="italic text-ivory/80 font-light">to the world.</span>
              </h1>
              
              <div className="border-t border-teal-800/50 pt-10">
                <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                  Navigating the journey from local agricultural sourcing to international delivery for global commercial buyers.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — PROCESS OVERVIEW (Vertical Timeline) */}
      <section className="section-padding bg-ivory">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
              <ScrollFade>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
                  The Journey
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  Movement and <span className="italic text-emerald-800 font-light">Logistics.</span>
                </h2>
                <div className="w-16 h-px bg-teal-900/10 mb-10"></div>
                <p className="text-teal-900/80 font-sans text-sm leading-loose tracking-wide max-w-sm">
                  Moving agricultural products across the globe requires precise operational steps. We bridge the gap between Indian plantations and international markets through a structured supply chain.
                </p>
              </ScrollFade>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="border-t border-teal-900/20">
                <StaggerContainer>
                  {[
                    { id: "01", title: "Source", desc: "Establishing and maintaining direct relationships with farmers in India's primary coconut-producing regions." },
                    { id: "02", title: "Select", desc: "Executing hand-selection directly following the harvest to isolate the appropriate product." },
                    { id: "03", title: "Grade", desc: "Categorizing the product according to established international requirements." },
                    { id: "04", title: "Prepare", desc: "Executing export-ready packaging, retaining husk where necessary to protect the product during movement." },
                    { id: "05", title: "Document", desc: "Preparing the necessary international shipping documentation for export clearance." },
                    { id: "06", title: "Deliver", desc: "Managing the logistics chain to move the product toward global commercial buyers." }
                  ].map((item, i) => (
                    <StaggerItem key={item.id} className="flex flex-col sm:flex-row py-10 border-b border-teal-900/20 group">
                      <div className="w-24 shrink-0 mb-4 sm:mb-0">
                        <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 uppercase italic transition-colors group-hover:text-emerald-500">
                          {item.id}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-teal-950 mb-4 italic transition-colors group-hover:text-emerald-800">
                          {item.title}
                        </h3>
                        <p className="text-teal-900/70 font-sans text-sm leading-relaxed tracking-wide max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3 — DEEP DIVE: PREPARATION TO FREIGHT */}
      <section className="section-padding bg-white border-t border-teal-900/10">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 relative">
              <ScrollFade direction="right" className="relative w-full aspect-[4/5] bg-teal-950/5">
                <Image 
                  src="/images/about-process.jpg" 
                  alt="Preparation and Logistics" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ScrollFade>
            </div>

            <div className="lg:col-span-6">
              <ScrollFade direction="left">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  From Agriculture to <span className="italic text-emerald-800 font-light">International Freight.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                <div className="space-y-6 text-teal-900/80 font-sans text-sm leading-loose tracking-wide max-w-lg">
                  <p>
                    Transitioning agricultural products into international commerce requires specific preparation. Our operations focus heavily on export-ready packaging, ensuring that the physical product is protected against the rigors of long-distance movement.
                  </p>
                  <p>
                    Equally critical is the administrative movement. We navigate the complexities of international shipping documentation, aligning our logistical management with the demands of the global supply chain.
                  </p>
                </div>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRODUCTS CONNECTION */}
      <section className="section-padding bg-ivory border-t border-teal-900/10">
        <div className="container-grid">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 lg:mb-24">
            <ScrollFade>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                The Result
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-950 tracking-tight">
                Export-ready <span className="italic font-light">products.</span>
              </h2>
            </ScrollFade>
            <ScrollFade delay={0.2} className="mt-6 md:mt-0">
              <Link href="/products">
                <Button variant="text" className="text-teal-950 border-teal-900/30 hover:text-emerald-700 hover:border-emerald-700" withArrow>
                  Explore All Products
                </Button>
              </Link>
            </ScrollFade>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {products.map((p) => (
              <ScrollFade key={p.id} direction="up">
                <ProductCard product={p} />
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE GLOBAL BUYER / FINAL CTA */}
      <section className="section-padding bg-teal-950 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              International Markets
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-10">
              Supplying the <span className="italic font-light text-emerald-400">globe.</span>
            </h2>
            <p className="text-teal-100/80 font-serif italic text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              Our logistical operations are structured to supply importers, distributors, wholesalers, and commercial buyers across the Middle East, Europe, and Asia.
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
