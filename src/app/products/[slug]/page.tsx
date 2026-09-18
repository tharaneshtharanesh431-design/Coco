import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { products } from '@/services/mockData';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/products/ProductCard';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all known products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate dynamic SEO metadata
export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | VERDECOCO',
    };
  }

  return {
    title: `${product.name} | VERDECOCO Products`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} - VERDECOCO`,
      description: product.shortDescription,
      images: [product.imageUrl],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  // Find 2 related products (just picking others from the list for now)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteUrl}/products`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${product.slug}`
      }
    ]
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.imageUrl}`,
    brand: {
      '@type': 'Brand',
      name: 'VERDECOCO'
    },
    category: product.category
  };

  return (
    <div className="flex flex-col w-full bg-ivory pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      
      {/* BREADCRUMB */}
      <div className="container-grid py-8 border-b border-teal-900/10">
        <ScrollFade>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-sans italic text-teal-900/50">
            <Link href="/products" className="hover:text-emerald-700 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-teal-950 font-medium">{product.name}</span>
          </div>
        </ScrollFade>
      </div>

      {/* PRODUCT HERO & OVERVIEW */}
      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Image Column */}
            <div className="lg:col-span-7">
              <ScrollFade>
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-teal-950/5">
                  <Image 
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
              </ScrollFade>
            </div>
            
            {/* Info Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-40">
              <ScrollFade direction="up">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-6">
                  {product.category}
                </span>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 tracking-tight leading-[1.05] mb-8 break-words">
                  <span className="italic">{product.name}</span>
                </h1>
                
                <p className="text-teal-900/80 font-serif italic text-xl leading-relaxed mb-10">
                  {product.shortDescription}
                </p>

                <div className="w-full h-px bg-teal-900/10 mb-10"></div>
                
                <p className="text-teal-900/70 font-sans text-sm leading-loose tracking-wide mb-12">
                  {product.description}
                </p>

                <div className="flex flex-col gap-6 sm:flex-row mb-16">
                  <Link href={`/quote?product=${product.slug}`}>
                    <Button variant="primary" className="w-full sm:w-auto" withArrow>
                      Request a Quote
                    </Button>
                  </Link>
                </div>

                {/* Quick Info */}
                <div className="space-y-6">
                  {product.origin && (
                    <div className="flex justify-between border-b border-teal-900/10 pb-4">
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase italic text-teal-900/50">Origin</span>
                      <span className="font-serif italic text-teal-950 text-lg break-words text-right">{product.origin}</span>
                    </div>
                  )}
                  {product.formats && product.formats.length > 0 && (
                    <div className="flex justify-between border-b border-teal-900/10 pb-4">
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase italic text-teal-900/50">Formats</span>
                      <span className="font-serif italic text-teal-950 text-lg text-right">{product.formats.join(', ')}</span>
                    </div>
                  )}
                </div>
              </ScrollFade>
            </div>
            
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="section-padding bg-white border-t border-teal-900/5">
          <div className="container-grid max-w-4xl">
            <ScrollFade>
              <h2 className="font-serif text-4xl text-teal-950 tracking-tight mb-16">
                Technical <span className="italic font-light">Specifications</span>
              </h2>
              
              <div className="border-t border-teal-900/20">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-teal-900/20 py-8 gap-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-teal-900/50 italic sm:w-1/3">
                      {key}
                    </span>
                    <span className="font-serif italic text-xl text-teal-950 sm:w-2/3 sm:text-right break-words hyphens-auto">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-ivory border-t border-teal-900/10">
          <div className="container-grid">
            <ScrollFade>
              <h2 className="font-serif text-3xl md:text-4xl text-teal-950 tracking-tight mb-16">
                Explore More <span className="italic font-light">Products</span>
              </h2>
            </ScrollFade>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {relatedProducts.map((p) => (
                <ScrollFade key={p.id} direction="up">
                  <ProductCard product={p} />
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
