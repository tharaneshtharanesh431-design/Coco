'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
};
