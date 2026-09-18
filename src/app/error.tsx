'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Logo } from '@/components/common/Logo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service internally if available
    console.error('Application Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-ivory justify-center items-center text-center px-6 relative overflow-hidden">
      
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <Logo variant="compact" theme="dark" className="w-[800px] h-[800px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic block mb-8">
          APPLICATION ERROR
        </span>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-teal-950 tracking-tight leading-[1.05] mb-10 break-words">
          We couldn't load this <br/> <span className="italic font-light text-emerald-800">page right now.</span>
        </h1>
        
        <p className="text-teal-900/70 font-sans text-sm leading-relaxed mb-16 max-w-md mx-auto">
          A temporary issue prevented this page from displaying correctly. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button 
            variant="primary" 
            className="w-full sm:w-auto" 
            onClick={() => reset()}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto text-teal-950 border-teal-900/30" withArrow>
              Return Home
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
