'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Textarea } from '@/components/common/Textarea';
import { Button } from '@/components/common/Button';
import { products } from '@/services/mockData';
import { quoteSchema, type QuoteFormData } from '@/lib/validations/quote';

const buyerTypes = ['Importer', 'Distributor', 'Wholesaler', 'Commercial Buyer'];
const packagingFormats = ['Mesh bags', 'PP bags', 'Jute bags', 'Bulk bags', 'Shrink wrapped', 'Cartons'];

export function PortalQuoteForm() {
  const searchParams = useSearchParams();
  const preSelectedProductSlug = searchParams?.get('product');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      product: '',
      buyerType: '',
      preferredPackaging: ''
    }
  });

  useEffect(() => {
    if (preSelectedProductSlug) {
      const productObj = products.find(p => p.slug === preSelectedProductSlug);
      if (productObj) {
        setValue('product', productObj.name);
      }
    }
  }, [preSelectedProductSlug, setValue]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // We only send the fields that the client is responsible for.
        // The server derives fullName, companyName, businessEmail, countryRegion from the session.
        body: JSON.stringify({
          buyerType: data.buyerType,
          product: data.product,
          quantityRequirement: data.quantityRequirement,
          phone: data.phone,
          preferredPackaging: data.preferredPackaging,
          additionalRequirements: data.additionalRequirements,
          message: data.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit quote request. Please try again.');
      }

      // Success: redirect to the enquiries list
      router.push('/portal/enquiries');
      router.refresh();
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
      
      {/* 1. Business Profile */}
      <div className="space-y-6">
        <h3 className="font-sans text-xs tracking-[0.1em] uppercase text-teal-900/50 font-semibold border-b border-teal-900/10 pb-4 mb-6">
          Commercial Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Input 
            label="Phone / WhatsApp (Optional)" 
            type="tel" 
            {...register('phone')} 
            error={errors.phone?.message}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      {/* 2. Product Requirement */}
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
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Link href="/portal/enquiries" className="text-teal-900/60 hover:text-teal-950 font-medium text-sm transition-colors">
            Cancel
          </Link>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </Button>
        </div>
      </div>
      
    </form>
  );
}
