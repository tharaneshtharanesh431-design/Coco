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
  title: 'Quality | VERDECOCO',
  description: 'Our quality process from source to export. Emphasizing precise grading and export-ready preparation for international markets.',
  alternates: {
    canonical: '/quality',
  },
};

export default function QualityPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — QUALITY HERO */}
      <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-end pb-16 lg:pb-32 pt-32 md:pt-40 overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-process.jpg"
            alt="Quality Process"
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
                  VERDECOCO / QUALITY
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-[7.5rem] leading-[1.05] text-white mb-12 tracking-tight break-words">
                Quality begins <span className="italic text-ivory/80 font-light">at the source.</span>
              </h1>
              
              <div className="border-t border-teal-800/50 pt-10">
                <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                  Focusing on direct sourcing, precise grading, and export-ready preparation to meet international market requirements.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — QUALITY PHILOSOPHY & PROCESS */}
      <section className="section-padding bg-teal-950 text-white">
        <div className="container-grid">
          <ScrollFade>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              The Process
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-24 max-w-5xl tracking-tight leading-tight text-white">
              A systematic approach spanning <span className="italic text-emerald-400 font-light">selection, grading, and preparation.</span>
            </h2>
          </ScrollFade>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-teal-800/50">
            {[
              { id: "01", title: "Source", desc: "Establishing relationships with farmers and plantations." },
              { id: "02", title: "Select", desc: "Hand-selection of coconuts prior to grading." },
              { id: "03", title: "Grade", desc: "Precise grading to meet international requirements." },
              { id: "04", title: "Prepare", desc: "Implementing export-ready packaging formats." },
              { id: "05", title: "Document", desc: "Managing international shipping documentation." }
            ].map((item, i) => (
              <StaggerItem key={item.id} className="pt-10 pb-12 border-b lg:border-b-0 lg:border-r border-teal-800/50 lg:pr-8 lg:pl-8 first:pl-0 last:border-r-0">
                <ScrollFade delay={i * 0.1} direction="up">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 block mb-8 uppercase italic">{item.id}</span>
                  <h3 className="font-serif text-2xl text-white mb-6 italic">{item.title}</h3>
                  <p className="text-teal-100/60 font-sans text-sm leading-relaxed tracking-wide">{item.desc}</p>
                </ScrollFade>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3 — SOURCE & SELECTION */}
      <section className="section-padding bg-ivory">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 relative">
              <ScrollFade direction="right" className="relative w-full aspect-[4/5] bg-teal-950/5">
                <Image 
                  src="/images/about-harvest.jpg" 
                  alt="Harvesting & Sourcing" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ScrollFade>
            </div>

            <div className="lg:col-span-6">
              <ScrollFade direction="left">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  Source & <span className="italic text-emerald-800 font-light">Selection.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                <div className="space-y-6 text-teal-900/80 font-sans text-sm leading-loose tracking-wide max-w-lg">
                  <p>
                    Working directly with farmers and established plantations across India's primary coconut-producing regions allows for a clearer view of product origin.
                  </p>
                  <p>
                    Prior to export, every coconut is hand-selected. This manual selection process is the first step in ensuring that the product meets the specifications required by international buyers.
                  </p>
                </div>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4 — GRADING & EXPORT PREPARATION (with Documentation) */}
      <section className="section-padding bg-white border-t border-teal-900/10">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <ScrollFade direction="right">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  Preparation & <span className="italic text-emerald-800 font-light">Export.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                <div className="space-y-6 text-teal-900/80 font-sans text-sm leading-loose tracking-wide max-w-lg">
                  <p>
                    Following selection, products undergo precise grading to align with international requirements. Specific preparation methods, such as retaining a portion of the husk on semi-husked varieties, are utilized to protect the product during transport.
                  </p>
                  <p>
                    The final stages involve export-ready packaging and managing the necessary international shipping documentation, coordinating logistics to support the supply chain.
                  </p>
                </div>
              </ScrollFade>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <ScrollFade direction="left" className="relative w-full aspect-[4/5] bg-teal-950/5">
                <Image 
                  src="/images/product-semi.jpg" 
                  alt="Export Preparation" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRODUCTS CONNECTION */}
      <section className="section-padding bg-ivory border-t border-teal-900/10">
        <div className="container-grid">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 lg:mb-24">
            <ScrollFade>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                Products
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-950 tracking-tight">
                Our export <span className="italic font-light">portfolio.</span>
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

      {/* SECTION 6 — B2B QUALITY & FINAL CTA */}
      <section className="section-padding bg-teal-950 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              Business Inquiries
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-10 break-words">
              Commercial <span className="italic font-light text-emerald-400">supply.</span>
            </h2>
            <p className="text-teal-100/80 font-serif italic text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              Our systematic approach to grading, packaging, and documentation supports the logistical requirements of international commercial buyers.
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
