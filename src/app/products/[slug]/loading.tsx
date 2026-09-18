import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProductLoadingSkeleton() {
  return (
    <div className="flex flex-col w-full bg-ivory pt-32">
      {/* BREADCRUMB SKELETON */}
      <div className="container-grid py-8 border-b border-teal-900/10">
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
          <span className="text-teal-900/20">/</span>
          <div className="h-4 w-32 bg-teal-900/10 rounded motion-safe:animate-pulse"></div>
        </div>
      </div>

      {/* PRODUCT HERO & OVERVIEW SKELETON */}
      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Image Column Skeleton */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-teal-900/5 rounded-sm motion-safe:animate-pulse"></div>
            </div>
            
            {/* Info Column Skeleton */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-8">
              {/* Category */}
              <div className="h-4 w-24 bg-emerald-700/10 rounded motion-safe:animate-pulse mb-6"></div>
              
              {/* Title */}
              <div className="space-y-4 mb-8">
                <div className="h-12 md:h-14 w-3/4 bg-teal-900/10 rounded motion-safe:animate-pulse"></div>
                <div className="h-12 md:h-14 w-1/2 bg-teal-900/10 rounded motion-safe:animate-pulse"></div>
              </div>
              
              {/* Short Description */}
              <div className="space-y-3 mb-10">
                <div className="h-6 w-full bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                <div className="h-6 w-4/5 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
              </div>

              <div className="w-full h-px bg-teal-900/10 mb-10"></div>
              
              {/* Description */}
              <div className="space-y-4 mb-12">
                <div className="h-4 w-full bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                <div className="h-4 w-full bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                <div className="h-4 w-3/4 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
              </div>

              {/* Button */}
              <div className="h-14 w-full sm:w-48 bg-emerald-600/20 rounded motion-safe:animate-pulse mb-16"></div>

              {/* Quick Info */}
              <div className="space-y-6">
                <div className="flex justify-between border-b border-teal-900/10 pb-4">
                  <div className="h-4 w-16 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                  <div className="h-6 w-24 bg-teal-900/10 rounded motion-safe:animate-pulse"></div>
                </div>
                <div className="flex justify-between border-b border-teal-900/10 pb-4">
                  <div className="h-4 w-16 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                  <div className="h-6 w-40 bg-teal-900/10 rounded motion-safe:animate-pulse"></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS SKELETON */}
      <section className="section-padding bg-white border-t border-teal-900/5">
        <div className="container-grid max-w-4xl">
          <div className="h-10 w-64 bg-teal-900/10 rounded motion-safe:animate-pulse mb-16"></div>
          
          <div className="border-t border-teal-900/10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-teal-900/10 py-8 gap-4">
                <div className="h-4 w-32 bg-teal-900/5 rounded motion-safe:animate-pulse"></div>
                <div className="h-6 w-48 bg-teal-900/10 rounded motion-safe:animate-pulse sm:w-2/3 sm:text-right"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
