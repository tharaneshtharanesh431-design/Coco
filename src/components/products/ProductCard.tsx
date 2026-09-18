import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <Link href={`/products/${product.slug}`} className={cn("group block w-full", className)}>
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
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 shrink-0 italic">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
};
