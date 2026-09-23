import * as z from 'zod';

export const quoteSchema = z.object({
  fullName: z.string().max(100).optional(),
  companyName: z.string().max(150).optional(),
  businessEmail: z.string().email().optional(),
  countryRegion: z.string().max(100).optional(),
  buyerType: z.string().min(1, 'Please select a buyer type').max(100, 'Buyer type is too long'),
  product: z.string().min(1, 'Please select a product').max(100, 'Product name is too long'),
  quantityRequirement: z.string().min(1, 'Quantity requirement is required').max(100, 'Quantity requirement is too long'),
  phone: z.string().max(50, 'Phone number is too long').optional().nullable(),
  preferredPackaging: z.string().max(100, 'Preferred packaging is too long').optional().nullable(),
  additionalRequirements: z.string().max(1000, 'Message is too long').optional().nullable(),
  message: z.string().min(10, 'Please provide more details about your requirement').max(1000, 'Message is too long')
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
