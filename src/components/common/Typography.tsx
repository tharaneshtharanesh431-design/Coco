import React from 'react';
import { cn } from '@/utils/cn';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'quote' | 'label';
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
    variant === 'display' ? 'h1' :
    variant.startsWith('h') ? variant : 
    variant === 'small' || variant === 'label' ? 'small' : 
    variant === 'quote' ? 'blockquote' : 'p'
  ) as React.ElementType;

  const styles = {
    display: 'text-5xl md:text-7xl lg:text-[7.5rem] font-serif italic tracking-tight leading-[1.05]',
    h1: 'text-4xl md:text-5xl lg:text-7xl font-serif italic tracking-tight leading-[1.1]',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight leading-snug',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-serif italic leading-snug',
    h4: 'text-xl md:text-2xl font-serif italic leading-snug',
    h5: 'text-lg md:text-xl font-serif italic leading-snug',
    h6: 'text-base md:text-lg font-serif italic leading-snug',
    body: 'text-base md:text-lg font-sans font-light leading-[1.8] text-teal-900/80',
    small: 'text-sm font-sans text-teal-900/60 leading-relaxed',
    label: 'font-sans text-[10px] tracking-[0.2em] text-teal-900/50 uppercase italic',
    quote: 'text-xl md:text-2xl lg:text-3xl font-serif italic border-l border-emerald-600 pl-6 py-2 leading-relaxed',
  };

  return (
    <Component className={cn(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
};
