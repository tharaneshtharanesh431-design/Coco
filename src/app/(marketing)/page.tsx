import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { Button } from '@/components/common/Button';
import { products } from '@/services/mockData';
import { Logo } from '@/components/common/Logo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VERDECOCO | Premium Coconut Export',
  description: 'VERDECOCO is an international B2B export business supplying premium coconut products globally. Sourced from India with uncompromising integrity.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-ivory">
      
      {/* SECTION 1 — HERO REDESIGN */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-end pb-12 md:pb-16 lg:pb-32 pt-32 md:pt-40 overflow-hidden">
        {/* Background Image: No heavy blur, subtle overlay for text contrast */}
        <div className="absolute inset-0 z-0 bg-teal-950">
          <Image 
            src="/images/product-fresh.jpg"
            alt="Indian coconut harvest"
            fill
            sizes="100vw"
            className="object-cover object-[center_60%] opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-teal-950/20"></div>
        </div>
        
        <div className="container-grid relative z-10 w-full flex flex-col justify-end">
          <ScrollFade direction="up">
            <div className="max-w-[1100px]">
              
              <div className="flex items-center gap-6 mb-6 md:mb-8 lg:mb-12">
                <Logo variant="compact" theme="emerald" className="w-6 h-6" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium italic">
                  Indian Agricultural Exports
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-[7.5rem] leading-[1.05] text-white mb-12 tracking-tight">
                From source <br />
                <span className="italic text-ivory/80 font-light break-words">to global scale.</span>
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-end mt-12 lg:mt-24 border-t border-teal-800/50 pt-10">
                <div className="lg:col-span-7">
                  <p className="text-teal-100/90 text-lg md:text-xl leading-relaxed font-light font-serif italic max-w-2xl">
                    We supply premium agricultural products to international B2B buyers. Defined by absolute integrity, powered by reliable export operations.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row gap-6 sm:gap-8 lg:justify-end">
                  <Link href="/products">
                    <Button variant="text" className="text-white hover:text-emerald-300 border-white/40 hover:border-emerald-300 text-sm" withArrow>
                      Explore Portfolio
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button variant="text" className="text-teal-400 hover:text-white border-teal-800/50 hover:border-white text-sm" withArrow>
                      Talk to our team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — WHO WE ARE (EDITORIAL) */}
      <section className="section-padding bg-ivory">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
              <ScrollFade direction="left">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 mb-10 leading-[1.1] tracking-tight">
                  A premium standard in <br/> <span className="italic text-emerald-800 font-light break-words">agricultural export.</span>
                </h2>
                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                <p className="text-teal-900 text-lg md:text-xl leading-relaxed font-serif italic max-w-xl mb-12">
                  Headquartered in India, VERDECOCO represents the intersection of rich agricultural heritage and rigorous modern export operations. We are dedicated to providing the international market with products sourced responsibly and processed to exact global standards.
                </p>
                <Link href="/about">
                  <Button variant="text" className="text-teal-950 hover:text-emerald-700 border-teal-900/20" withArrow>
                    Discover Our Heritage
                  </Button>
                </Link>
              </ScrollFade>
            </div>
            
            <div className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1 relative">
              <ScrollFade direction="up" className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
                <Image 
                  src="/images/home-about.jpg" 
                  alt="VERDECOCO Quality Assessment" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                {/* Minimal editorial framing */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border border-teal-900/10 z-0 pointer-events-none hidden lg:block"></div>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT WE SUPPLY (EDITORIAL GRID) */}
      <section className="section-padding bg-white">
        <div className="container-grid">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 lg:mb-32 border-b border-teal-900/10 pb-8">
            <ScrollFade>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 tracking-tight">
                Our <span className="italic font-light break-words">Portfolio.</span>
              </h2>
            </ScrollFade>
            <ScrollFade delay={0.2} className="mt-6 md:mt-0">
              <p className="text-teal-800/70 max-w-sm font-sans text-[10px] tracking-[0.2em] uppercase italic">
                Prepared for wholesale and international distribution.
              </p>
            </ScrollFade>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 lg:gap-y-32">
            {products.map((product, index) => (
              <StaggerItem key={product.id} className={index % 2 !== 0 ? 'md:mt-32' : ''}>
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="relative w-full aspect-[4/3] mb-8 overflow-hidden bg-ivory">
                    <Image 
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.25,1,0.5,1]"
                    />
                  </div>
                  
                  <div className="flex flex-col border-t border-teal-900/10 pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-serif text-3xl md:text-4xl text-teal-950 group-hover:text-emerald-700 transition-colors">
                        {product.name}
                      </h3>
                      <div className="text-teal-900/30 group-hover:text-emerald-700 transition-colors transform group-hover:translate-x-1 duration-500">
                        <ArrowRight className="w-6 h-6 stroke-[1.5]" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <p className="text-teal-800/80 font-serif italic text-lg max-w-sm line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 shrink-0">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 4 — WHY VERDECOCO (STORYTELLING) */}
      <section className="section-padding bg-teal-950 text-white relative">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <Image src="/images/wild-forest-bg.jpg" alt="Texture" fill sizes="100vw" className="object-cover grayscale" />
        </div>
        
        <div className="container-grid relative z-10">
          <ScrollFade>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-24 max-w-4xl tracking-tight leading-tight text-white">
              Quality begins <span className="italic text-emerald-400 font-light break-words">long before shipment.</span>
            </h2>
          </ScrollFade>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-teal-800/50">
            {[
              { id: "01", title: "Product Quality", desc: "Rigorous grading ensures every shipment meets strict international parameters." },
              { id: "02", title: "Sourcing", desc: "Direct partnerships with established farms in India, prioritizing integrity." },
              { id: "03", title: "Preparation", desc: "Optimal moisture control and export-ready packaging for long transit." },
              { id: "04", title: "Coordination", desc: "Transparent communication from port of loading to final destination." }
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

      {/* SECTION 5 — FARM TO MARKET (VISUAL JOURNEY) */}
      <section className="section-padding bg-ivory overflow-hidden">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-5 sticky top-40">
              <ScrollFade direction="right">
                <h2 className="font-serif text-4xl md:text-5xl md:text-6xl text-teal-950 leading-[1.1] mb-10 tracking-tight break-words">
                  The Journey. <br/>
                </h2>
                <div className="flex items-center gap-6 mb-12">
                  <span className="font-sans text-xs tracking-[0.2em] text-teal-900/50 uppercase italic">India</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 stroke-[1.5]" />
                  <span className="font-sans text-xs tracking-[0.2em] text-emerald-700 uppercase italic">Global</span>
                </div>
                <p className="text-teal-900 text-lg md:text-xl font-serif italic leading-relaxed max-w-sm">
                  We maintain complete visibility over the supply chain, ensuring that the product maintains its integrity from the moment it leaves the farm to its arrival at the destination port.
                </p>
              </ScrollFade>
            </div>
            
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative pl-10 border-l border-teal-900/10 space-y-20 py-8">
                {[
                  { title: "Farm Collection", desc: "Harvested at peak maturity from verified agricultural partners." },
                  { title: "Grading & Sorting", desc: "Manual and mechanical sorting to categorize by size, weight, and quality." },
                  { title: "Inspection", desc: "Strict quality checks to eliminate defects and ensure uniformity." },
                  { title: "Processing & Packaging", desc: "Preparation according to client specifications and export-grade packing." },
                  { title: "Container Loading", desc: "Strategic stuffing in standard or reefer containers to maximize airflow." },
                  { title: "Global Shipment", desc: "Dispatch via reliable maritime logistics partners to international ports." }
                ].map((step, idx) => (
                  <ScrollFade key={idx} direction="up" className="relative group">
                    <div className="absolute -left-[44.5px] top-1.5 w-2 h-2 bg-ivory border border-teal-900/30 rounded-none group-hover:bg-emerald-700 group-hover:border-emerald-700 transition-colors duration-500"></div>
                    <span className="font-sans text-[10px] tracking-[0.2em] text-teal-900/40 uppercase block mb-4 italic">Step 0{idx + 1}</span>
                    <h3 className="font-serif text-3xl lg:text-4xl text-teal-950 mb-4">{step.title}</h3>
                    <p className="text-teal-800/70 font-sans text-sm tracking-wide leading-relaxed max-w-sm">{step.desc}</p>
                  </ScrollFade>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 6 — QUALITY (COMMANDING IMAGE) */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-process.jpg" 
            alt="Quality Control" 
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-teal-950/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-teal-950/40"></div>
        </div>
        
        <div className="relative z-10 container-grid max-w-5xl">
          <ScrollFade direction="up">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[6rem] text-white leading-tight mb-10 tracking-tight">
              Uncompromising <br/><span className="italic font-light text-ivory/90 break-words">integrity.</span>
            </h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-10"></div>
            <p className="text-white/80 font-serif italic text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Every coconut is individually inspected to ensure physical integrity and optimal maturity before it is cleared for export.
            </p>
            <Link href="/quality">
              <Button variant="text" className="text-white border-white/40 hover:text-emerald-300 hover:border-emerald-300" withArrow>
                Read Our Standards
              </Button>
            </Link>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 7 — GLOBAL MARKETS */}
      <section className="section-padding bg-white text-center">
        <div className="container-grid max-w-4xl">
          <ScrollFade>
            <Logo variant="compact" theme="dark" className="w-8 h-8 mx-auto mb-10 opacity-50" />
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-teal-900/50 mb-8 italic">International Trade</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 tracking-tight leading-[1.1] mb-12">
              Connecting supply with <br/> <span className="italic text-teal-800 font-light break-words">global demand.</span>
            </h2>
            <p className="text-teal-800/80 font-serif italic text-xl leading-relaxed max-w-2xl mx-auto mb-16">
              We facilitate international B2B transactions by bridging the gap between premium Indian agricultural supply and the demanding requirements of global buyers. Our operations support consistent volume and reliable delivery channels worldwide.
            </p>
            <Link href="/global-markets">
              <Button variant="text" className="text-teal-950 hover:text-emerald-700 border-teal-900/20" withArrow>
                Explore Global Operations
              </Button>
            </Link>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 8 — EXPORT PROCESS */}
      <section className="section-padding bg-ivory border-t border-teal-900/5">
        <div className="container-grid">
          <ScrollFade>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 tracking-tight mb-20 text-center">
              The <span className="italic font-light">Export Sequence.</span>
            </h2>
          </ScrollFade>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-0 border-t border-teal-900/20">
              {[
                { step: "01", title: "Enquiry" },
                { step: "02", title: "Requirement" },
                { step: "03", title: "Quotation" },
                { step: "04", title: "Confirmation" },
                { step: "05", title: "Inspection" },
                { step: "06", title: "Packaging" },
                { step: "07", title: "Documentation" },
                { step: "08", title: "Loading" },
                { step: "09", title: "Shipment" }
              ].map((item, index) => (
                <ScrollFade key={index} direction="up" delay={index * 0.05} className="group border-b border-teal-900/20 py-8 flex items-center justify-between hover:bg-teal-950/5 transition-colors px-6 -mx-6 cursor-default">
                  <div className="flex items-center gap-6 sm:gap-12 lg:gap-24">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-teal-900/40 uppercase italic">{item.step}</span>
                    <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-teal-950 italic group-hover:text-emerald-800 transition-colors">{item.title}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-teal-900/20 group-hover:text-emerald-700 transition-colors transform group-hover:translate-x-2 duration-500" />
                </ScrollFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — BUSINESS CTA (MINIMALIST) */}
      <section className="section-padding bg-teal-950">
        <div className="container-grid max-w-5xl">
          <ScrollFade direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] text-white tracking-tight leading-[1.05] mb-8">
                Initiate a <br/> <span className="italic text-emerald-400 font-light break-words">partnership.</span>
              </h2>
              <p className="text-teal-100/70 font-sans text-sm tracking-wide max-w-md leading-relaxed">
                Contact our trade team to discuss your wholesale requirements, request a formal quotation, or learn more about our export capabilities.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 shrink-0">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="w-full justify-between" withArrow>
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full justify-between text-white border-white/30 hover:border-white" withArrow>
                  Contact Office
                </Button>
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>

    </div>
  );
}
