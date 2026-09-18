import React from 'react';
import { cn } from '@/utils/cn';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'quote';
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  as, 
  className, 
  children, 
  ...props 
}) => {
  const Component = as || (
    variant.startsWith('h') ? variant : 
    variant === 'small' ? 'small' : 
    variant === 'quote' ? 'blockquote' : 'p'
  ) as React.ElementType;

  const styles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight leading-snug',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-serif italic leading-snug',
    h4: 'text-xl md:text-2xl font-serif italic leading-snug',
    h5: 'text-lg md:text-xl font-serif italic leading-snug',
    h6: 'text-base md:text-lg font-serif italic leading-snug',
    body: 'text-base font-sans leading-relaxed',
    small: 'text-sm font-sans',
    quote: 'text-xl md:text-2xl font-serif italic border-l-4 border-emerald-600 pl-4 py-2',
  };

  return (
    <Component className={cn(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};

