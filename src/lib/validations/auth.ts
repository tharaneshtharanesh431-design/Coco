import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  countryRegion: z.string().min(2, 'Country/Region is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
