import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/services/mockData';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Button } from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'Products | VERDECOCO',
  description: 'Premium agricultural products from India to the world. Explore our portfolio of fresh coconuts, tender coconuts, semi-husked, and copra.',
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full bg-ivory pt-32">
      
      {/* SECTION 1 — PAGE HERO */}
      <section className="section-padding pb-16 lg:pb-32">
        <div className="container-grid">
          <ScrollFade direction="up">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
              VERDECOCO / PRODUCTS
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-teal-950 leading-[1.05] tracking-tight mb-12">
              Products from the <br/> <span className="italic font-light text-emerald-800">heart of India.</span>
            </h1>
            <p className="text-teal-900/80 text-lg md:text-xl font-serif italic max-w-2xl leading-relaxed">
              Our portfolio represents the intersection of rich agricultural heritage and rigorous modern export operations. Cultivated with care, graded with precision, and prepared for international wholesale.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* SECTION 2 — PRODUCT COLLECTION */}
      <section className="pb-32 lg:pb-48">
        <div className="container-grid">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 lg:gap-y-32">
            {products.map((product, index) => (
              <StaggerItem key={product.id} className={index % 2 !== 0 ? 'md:mt-32' : ''}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3 — BUSINESS CTA */}
      <section className="section-padding bg-teal-950">
        <div className="container-grid max-w-5xl text-center">
          <ScrollFade direction="up">
            <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-12">
              Looking for a <span className="italic text-emerald-400 font-light">specific product?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" withArrow>
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="dark" size="lg" className="w-full sm:w-auto" withArrow>
                  Contact Us
                </Button>
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>

    </div>
  );
}
