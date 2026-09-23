'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function GlobeLines() {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] overflow-hidden opacity-80">
      <svg
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Base Grid */}
        <path
          d="M0 250 H1000 M500 0 V500"
          stroke="#064e3b"
          strokeWidth="1"
          strokeOpacity="0.2"
        />

        {/* Nodes (India, Middle East, Europe, SE Asia) */}
        <circle cx="700" cy="250" r="4" fill="#10b981" />
        <circle cx="450" cy="220" r="4" fill="#065f46" />
        <circle cx="350" cy="150" r="4" fill="#065f46" />
        <circle cx="850" cy="300" r="4" fill="#065f46" />

        {/* Connection Lines */}
        <motion.path
          d="M700 250 C600 200, 500 200, 450 220"
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M700 250 C600 150, 400 100, 350 150"
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M700 250 C750 280, 800 280, 850 300"
          stroke="#10b981"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Pulsing origin (India) */}
        <motion.circle
          cx="700"
          cy="250"
          r="12"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
