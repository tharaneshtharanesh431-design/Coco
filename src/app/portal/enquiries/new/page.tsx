import React from 'react';
import { Metadata } from 'next';
import { PortalQuoteForm } from '@/components/forms/PortalQuoteForm';
import { TextReveal } from '@/components/animations/TextReveal';
import * as motion from 'framer-motion/client';

export const metadata: Metadata = {
  title: 'New Enquiry | VERDECOCO Portal',
  description: 'Create a new B2B quote request.',
};

export default function NewEnquiryPage() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl text-teal-950 mb-4 tracking-tight">
            <TextReveal text="New Quote Request" />
          </h1>
          <p className="text-teal-900/60 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
            Configure your commercial requirement below. Our team will prepare a formal quotation based on your specifications.
          </p>
        </div>

        <motion.div 
          className="bg-white rounded-sm border border-teal-900/5 p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-10 opacity-30" />
          <PortalQuoteForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
