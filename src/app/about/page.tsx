import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/services/mockData';

export const metadata: Metadata = {
  title: 'About Us | VERDECOCO',
  description: 'Rooted in nature, connected to the world. We are a reliable and premium supplier of Indian coconut products to the global market.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-end pb-16 lg:pb-32 pt-32 md:pt-40 overflow-hidden bg-teal-950">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-harvest.jpg"
            alt="Coconut Harvest"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/20 to-teal-950/10"></div>
        </div>
        
        <div className="container-grid relative z-10 w-full flex flex-col justify-end">
          <ScrollFade direction="up">
            <div className="max-w-[1100px]">
              
              <div className="flex items-center gap-6 mb-8 lg:mb-12">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic">
                  VERDECOCO / ABOUT
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-[7.5rem] leading-[1.05] text-white mb-12 tracking-tight break-words">
                Rooted in <span className="italic text-ivory/80 font-light">Nature.</span><br />
                Connected to the <span className="italic text-ivory/80 font-light">World.</span>
              </h1>
              
              <div className="border-t border-teal-800/50 pt-10">
                <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                  Founded with a singular vision: to be the most reliable and premium supplier of Indian coconut products to the global market.
                </p>
              </div>

            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — WHO WE ARE (Sourcing & Origin) */}
      <section className="section-padding bg-ivory">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <ScrollFade direction="right" className="relative w-full aspect-[4/5] bg-teal-950/5">
                <Image 
                  src="/images/home-hero.jpg" 
                  alt="Farm Sourcing" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ScrollFade>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
              <ScrollFade direction="left">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
                  Direct Sourcing
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  Bridging the gap between lush plantations and <span className="italic text-emerald-800 font-light">international buyers.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                <div className="space-y-6 text-teal-900/80 font-sans text-sm leading-loose tracking-wide max-w-lg">
                  <p>
                    We work directly with farmers and established plantations across India's primary coconut-producing regions. By eliminating unnecessary intermediaries, we ensure better traceability and fresher products.
                  </p>
                  <p>
                    Every coconut is hand-selected and graded precisely to meet the stringent requirements of our international buyers, ensuring that the natural integrity of the product is preserved from the moment it is harvested.
                  </p>
                </div>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR APPROACH */}
      <section className="section-padding bg-teal-950 text-white border-t border-emerald-900/30">
        <div className="container-grid">
          <ScrollFade>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-24 max-w-4xl tracking-tight leading-tight text-white">
              An operational <span className="italic text-emerald-400 font-light">framework.</span>
            </h2>
          </ScrollFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-teal-800/50">
            {[
              { id: "01", title: "Source", desc: "Partnering directly with established plantations in India's primary regions." },
              { id: "02", title: "Select", desc: "Every coconut is hand-selected and graded precisely for export." },
              { id: "03", title: "Prepare", desc: "Managing custom, export-ready packaging designed for long transit." },
              { id: "04", title: "Deliver", desc: "Handling complex international shipping documentation and logistics." }
            ].map((item, i) => (
              <StaggerItem key={item.id} className="pt-10 pb-12 border-b lg:border-b-0 lg:border-r border-teal-800/50 lg:pr-10 lg:pl-10 first:pl-0 last:border-r-0">
                <ScrollFade delay={i * 0.1} direction="up">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 block mb-8 uppercase italic">{item.id}</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 italic">{item.title}</h3>
                  <p className="text-teal-100/60 font-sans text-sm leading-relaxed tracking-wide">{item.desc}</p>
                </ScrollFade>
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — QUALITY COMMITMENT */}
      <section className="section-padding bg-white">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            
            <div className="lg:col-span-5">
              <ScrollFade direction="up">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 tracking-tight leading-[1.1] mb-10 break-words">
                  Consistency begins <br/><span className="italic text-emerald-800 font-light">at the source.</span>
                </h2>
                <p className="text-teal-900/80 font-serif italic text-xl leading-relaxed mb-10">
                  Supplying international markets requires more than just good coconuts; it requires logistical mastery and unwavering standards.
                </p>
                <div className="w-16 h-px bg-teal-900/20 mb-10"></div>
                <p className="text-teal-900/70 font-sans text-sm leading-loose tracking-wide">
                  From custom export-ready packaging to handling complex international shipping documentation, we manage the entire supply chain to ensure quality is maintained across continents.
                </p>
              </ScrollFade>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollFade direction="up" className="relative w-full aspect-[4/3] bg-teal-950/5">
                <Image 
                  src="/images/about-process.jpg" 
                  alt="Processing & Quality" 
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
                Our Portfolio
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-950 tracking-tight">
                Prepared for <span className="italic font-light">export.</span>
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

      {/* SECTION 6 — GLOBAL BUSINESS / PARTNERSHIP CTA */}
      <section className="section-padding bg-teal-950 text-center">
        <div className="container-grid max-w-4xl mx-auto">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic block mb-8">
              Global Reach
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-10 break-words">
              Built for <span className="italic font-light text-emerald-400">businesses.</span>
            </h2>
            <p className="text-teal-100/80 font-serif italic text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
              We supply importers, distributors, wholesalers, and commercial buyers across the Middle East, Europe, and Asia. Whether you need a single container or regular large-scale shipments, we are ready to partner with you.
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
