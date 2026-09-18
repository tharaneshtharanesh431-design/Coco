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
  title: 'Global Markets | VERDECOCO',
  description: 'Supplying importers, distributors, wholesalers, and commercial buyers across the Middle East, Europe, and Asia.',
  alternates: {
    canonical: '/global-markets',
  },
};

export default function GlobalMarketsPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — MARKETS HERO */}
      <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-end pb-16 lg:pb-32 pt-32 md:pt-40 overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/product-semi.jpg"
            alt="Export Products"
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
                  VERDECOCO / GLOBAL MARKETS
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-[7.5rem] leading-[1.05] text-white mb-12 tracking-tight break-words">
                Connected to <span className="italic text-ivory/80 font-light">the world.</span>
              </h1>
              
              <div className="border-t border-teal-800/50 pt-10">
                <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                  Supplying international commercial buyers across key global regions.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — REGIONAL REACH */}
      <section className="section-padding bg-ivory">
        <div className="container-grid">
          <ScrollFade>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
              Regional Supply
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-20 leading-[1.1] tracking-tight">
              Operating across <span className="italic text-emerald-800 font-light">three major regions.</span>
            </h2>
          </ScrollFade>
          
          <div className="border-t border-teal-900/20">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3">
              {[
                { id: "01", title: "Middle East", desc: "Supporting commercial demands across the Middle Eastern region with consistent supply." },
                { id: "02", title: "Europe", desc: "Providing graded products tailored for European commercial buyers and distributors." },
                { id: "03", title: "Asia", desc: "Connecting directly with Asian wholesale markets through established logistics channels." }
              ].map((region, i) => (
                <StaggerItem key={region.id} className="pt-10 pb-12 md:pb-16 border-b md:border-b-0 md:border-r border-teal-900/20 md:pr-12 md:pl-12 first:pl-0 last:border-r-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 block mb-6 uppercase italic">
                    {region.id}
                  </span>
                  <h3 className="font-serif text-3xl text-teal-950 mb-6 italic">
                    {region.title}
                  </h3>
                  <p className="text-teal-900/70 font-sans text-sm leading-relaxed tracking-wide">
                    {region.desc}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* SECTION 3 — GLOBAL CONNECTION VISUAL */}
      <section className="section-padding bg-white border-t border-teal-900/10">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 relative">
              <ScrollFade direction="right" className="relative w-full aspect-[4/5] bg-teal-950/5">
                <Image 
                  src="/images/about-process.jpg" 
                  alt="Export Preparation" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ScrollFade>
            </div>

            <div className="lg:col-span-6">
              <ScrollFade direction="left">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  India to <span className="italic text-emerald-800 font-light">International Business.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic w-24">01</span>
                    <p className="font-serif italic text-teal-950 text-xl">India</p>
                  </div>
                  <div className="w-px h-8 bg-teal-900/20 ml-[3rem]"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic w-24">02</span>
                    <p className="font-serif italic text-teal-950 text-xl">Export Preparation</p>
                  </div>
                  <div className="w-px h-8 bg-teal-900/20 ml-[3rem]"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic w-24">03</span>
                    <p className="font-serif italic text-teal-950 text-xl">International Logistics</p>
                  </div>
                  <div className="w-px h-8 bg-teal-900/20 ml-[3rem]"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic w-24">04</span>
                    <p className="font-serif italic text-teal-950 text-xl">Global Buyers</p>
                  </div>
                </div>

                <Link href="/process">
                  <Button variant="text" className="text-teal-950 border-teal-900/30 hover:text-emerald-700 hover:border-emerald-700" withArrow>
                    See How We Work
                  </Button>
                </Link>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4 — BUYER TYPES */}
      <section className="section-padding bg-ivory border-t border-teal-900/10">
        <div className="container-grid">
          
          <ScrollFade>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
              Buyer Profiles
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-16 leading-[1.1] tracking-tight">
              Serving the <span className="italic text-emerald-800 font-light">commercial supply chain.</span>
            </h2>
          </ScrollFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { id: "01", title: "Importers", desc: "Supplying international import firms with consistent, graded product ready for local market distribution." },
              { id: "02", title: "Distributors", desc: "Providing reliable inventory to distributors who manage regional supply networks and retail channels." },
              { id: "03", title: "Wholesalers", desc: "Fulfilling wholesale demands with appropriate packaging formats for bulk commercial handling." },
              { id: "04", title: "Commercial Buyers", desc: "Meeting the specific preparation and grading needs of diverse international commercial buyers." }
            ].map((buyer) => (
              <ScrollFade key={buyer.id} direction="up" className="border-t border-teal-900/20 pt-8">
                <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-700 block mb-4 uppercase italic">
                  {buyer.id}
                </span>
                <h3 className="font-serif text-2xl text-teal-950 mb-4 italic">
                  {buyer.title}
                </h3>
                <p className="text-teal-900/70 font-sans text-sm leading-relaxed tracking-wide max-w-sm">
                  {buyer.desc}
                </p>
              </ScrollFade>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — BUSINESS REQUIREMENTS & PRODUCT CONNECTION */}
      <section className="section-padding bg-white border-t border-teal-900/10">
        <div className="container-grid">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 lg:mb-24">
            <ScrollFade className="max-w-2xl">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                Product Alignment
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-950 tracking-tight mb-8">
                Aligned with <span className="italic font-light">international formats.</span>
              </h2>
              <p className="text-teal-900/80 font-serif italic text-lg leading-relaxed">
                We present verified product formats, grades, and packaging configurations designed to align with the logistical demands of international buyers.
              </p>
            </ScrollFade>
            <ScrollFade delay={0.2} className="mt-8 md:mt-0">
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

      {/* SECTION 6 — B2B PARTNERSHIP & FINAL CTA */}
      <section className="section-padding bg-teal-950 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              B2B Partnership
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-10 break-words">
              Built for <span className="italic font-light text-emerald-400">international business.</span>
            </h2>
            <p className="text-teal-100/80 font-serif italic text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              Connecting importers, distributors, wholesalers, and commercial buyers across the Middle East, Europe, and Asia with our supply network.
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
