'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Textarea } from '@/components/common/Textarea';
import { Button } from '@/components/common/Button';
import { products } from '@/services/mockData';

import { quoteSchema, type QuoteFormData } from '@/lib/validations/quote';

const buyerTypes = ['Importer', 'Distributor', 'Wholesaler', 'Commercial Buyer'];
const packagingFormats = ['Mesh bags', 'PP bags', 'Jute bags', 'Bulk bags', 'Shrink wrapped', 'Cartons'];

export function QuoteForm() {
  const searchParams = useSearchParams();
  const preSelectedProductSlug = searchParams?.get('product');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      product: '',
      buyerType: '',
      preferredPackaging: ''
    }
  });

  // Pre-select product if passed in URL query
  useEffect(() => {
    if (preSelectedProductSlug) {
      const productObj = products.find(p => p.slug === preSelectedProductSlug);
      if (productObj) {
        setValue('product', productObj.name);
      }
    }
  }, [preSelectedProductSlug, setValue]);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);
    try {
      let response;
      try {
        response = await fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } catch (err) {
        throw new Error('Network error. Please check your connection and try again.');
      }

      if (!response.ok) {
        let errorMsg = 'Failed to submit quote request. Please try again.';
        if (response.status === 429) {
          errorMsg = 'Too many requests. Please wait a moment and try again.';
        } else if (response.status === 413) {
          errorMsg = 'Your enquiry is too large. Please shorten the message or requirements and try again.';
        } else if (response.status === 415) {
          errorMsg = 'Unable to process this request.';
        } else if (response.status === 400) {
          errorMsg = 'Invalid request. Please check your information and try again.';
        } else if (response.status >= 500) {
          errorMsg = "We couldn't submit your enquiry right now. Please try again.";
        }
        
        throw new Error(errorMsg);
      }

      // Fire conversion event safely (without any PII)
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'quote_request_submitted');
        } catch (e) {
          // Analytics should never block business logic
          console.error('Analytics error:', e);
        }
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmitError(null);
  };

  if (isSuccess) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-teal-950 mb-4">Request Submitted Successfully</h2>
        <p className="text-teal-900/70 font-sans text-sm max-w-md mx-auto leading-relaxed mb-10">
          Thank you for your enquiry. Our commercial team has received your requirements and will contact you shortly with a detailed quotation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button 
            variant="primary" 
            className="w-full sm:w-auto"
            onClick={handleReset}
          >
            Submit Another Enquiry
          </Button>
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto text-teal-950 border-teal-900/30" withArrow>
              Return to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      
      {/* 1. Contact Information */}
      <div className="space-y-6">
        <h3 className="font-sans text-xs tracking-[0.1em] uppercase text-teal-900/50 font-semibold border-b border-teal-900/10 pb-4 mb-6">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Full Name *" 
            {...register('fullName')} 
            error={errors.fullName?.message}
            placeholder="John Doe"
          />
          <Input 
            label="Company Name *" 
            {...register('companyName')} 
            error={errors.companyName?.message}
            placeholder="Global Imports Ltd."
          />
          <Input 
            label="Business Email *" 
            type="email" 
            {...register('businessEmail')} 
            error={errors.businessEmail?.message}
            placeholder="john@example.com"
          />
          <Input 
            label="Phone / WhatsApp" 
            type="tel" 
            {...register('phone')} 
            error={errors.phone?.message}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      {/* 2. Business Profile */}
      <div className="space-y-6">
        <h3 className="font-sans text-xs tracking-[0.1em] uppercase text-teal-900/50 font-semibold border-b border-teal-900/10 pb-4 mb-6">
          Business Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Country / Region *" 
            {...register('countryRegion')} 
            error={errors.countryRegion?.message}
            placeholder="e.g. UAE, Germany, Singapore"
          />
          <Select 
            label="Buyer Type *" 
            {...register('buyerType')} 
            error={errors.buyerType?.message}
          >
            <option value="">Select Buyer Type</option>
            {buyerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* 3. Product Requirement */}
      <div className="space-y-6">
        <h3 className="font-sans text-xs tracking-[0.1em] uppercase text-teal-900/50 font-semibold border-b border-teal-900/10 pb-4 mb-6">
          Product Requirement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            label="Product *" 
            {...register('product')} 
            error={errors.product?.message}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.name}>{product.name}</option>
            ))}
          </Select>
          
          <Input 
            label="Quantity Requirement *" 
            {...register('quantityRequirement')} 
            error={errors.quantityRequirement?.message}
            placeholder="e.g. 1x20FT FCL, 10 MT"
          />

          <Select 
            label="Preferred Packaging" 
            {...register('preferredPackaging')} 
            error={errors.preferredPackaging?.message}
          >
            <option value="">Standard Packaging</option>
            {packagingFormats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </Select>
        </div>
        
        <div className="pt-2">
          <Textarea 
            label="Requirement Details *" 
            {...register('message')} 
            error={errors.message?.message}
            placeholder="Please specify your detailed requirements, target port, and any specific quality/grade parameters..."
          />
        </div>
        
        <div className="pt-2">
          <Textarea 
            label="Additional Requirements" 
            {...register('additionalRequirements')} 
            error={errors.additionalRequirements?.message}
            placeholder="Optional: Mention any specific certifications, custom labeling, or documentation needed..."
            className="min-h-[80px]"
          />
        </div>
      </div>

      {/* Submission CTA */}
      <div className="pt-8 border-t border-teal-900/10">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-sm">
            <p className="text-red-800 font-sans text-sm break-words">{submitError}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-teal-900/50 text-xs italic font-sans">
            * Indicates a required field.
          </span>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </div>
      
    </form>
  );
}
