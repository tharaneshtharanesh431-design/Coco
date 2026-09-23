'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export function ParallaxImage({ src, alt, className = "", overlay = true }: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image moves slower than the scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // A subtle scale effect when scrolling
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`relative overflow-hidden w-full h-full ${className}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover origin-center"
      />
      {overlay && (
        <div className="absolute inset-0 bg-teal-950/40 mix-blend-multiply" />
      )}
    </div>
  );
}
