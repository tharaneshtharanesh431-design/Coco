import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-ivory justify-center items-center text-center px-6 relative overflow-hidden">
      
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Logo variant="compact" theme="dark" className="w-[800px] h-[800px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
          404 / NOT FOUND
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl text-teal-950 tracking-tight leading-[1.05] mb-10">
          The requested path <br/> <span className="italic font-light text-emerald-800">cannot be located.</span>
        </h1>
        
        <p className="text-teal-900/70 font-serif italic text-xl leading-relaxed mb-16 max-w-lg mx-auto">
          The product or page you are looking for may have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto" withArrow>
              Return Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto text-teal-950 border-teal-900/30" withArrow>
              View Portfolio
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
