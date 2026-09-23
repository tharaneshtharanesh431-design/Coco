'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { registerSchema, loginSchema, type RegisterInput, type LoginInput } from '@/lib/validations/auth';

export function B2BAuthUI({ returnUrl = '/portal/enquiries/new' }: { returnUrl?: string }) {
  const [view, setView] = useState<'login' | 'register'>('register');

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-8 border-b border-teal-900/10">
        <button 
          onClick={() => setView('register')}
          className={`pb-4 text-sm font-sans font-medium tracking-wide transition-colors relative ${view === 'register' ? 'text-teal-950' : 'text-teal-900/40 hover:text-teal-900/70'}`}
        >
          Create Account
          {view === 'register' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600" />}
        </button>
        <button 
          onClick={() => setView('login')}
          className={`pb-4 text-sm font-sans font-medium tracking-wide transition-colors relative ${view === 'login' ? 'text-teal-950' : 'text-teal-900/40 hover:text-teal-900/70'}`}
        >
          Sign In
          {view === 'login' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-600" />}
        </button>
      </div>

      <div className="relative">
        {view === 'register' ? <RegisterForm returnUrl={returnUrl} /> : <LoginForm returnUrl={returnUrl} />}
      </div>
    </div>
  );
}

function RegisterForm({ returnUrl }: { returnUrl: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterInput) => {
    setSubmitError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Registration failed');
      }

      router.push(returnUrl);
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <FadeIn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {submitError && (
          <div className="p-3 bg-red-50 text-red-800 text-sm font-sans rounded-sm border border-red-100">
            {submitError}
          </div>
        )}
        <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
        <Input label="Company Name" {...register('companyName')} error={errors.companyName?.message} />
        <Input label="Country / Region" {...register('countryRegion')} error={errors.countryRegion?.message} placeholder="e.g. UAE, Germany" />
        <Input label="Business Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        
        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Business Account'}
          </Button>
        </div>
      </form>
    </FadeIn>
  );
}

function LoginForm({ returnUrl }: { returnUrl: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    setSubmitError(null);
    try {
      const response = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Invalid credentials');
      }

      router.push(returnUrl);
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <FadeIn>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {submitError && (
          <div className="p-3 bg-red-50 text-red-800 text-sm font-sans rounded-sm border border-red-100">
            {submitError}
          </div>
        )}
        <Input label="Business Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        
        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>
      </form>
    </FadeIn>
  );
}
