import React from 'react';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withArrow = false, children, ...props }, ref) => {
    
    // Base structural styles: No rounding, minimal padding for text variants
    const baseStyles = 'group inline-flex items-center justify-center font-sans tracking-[0.15em] uppercase font-medium italic transition-all duration-500 rounded-none focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'text-white bg-teal-950 border border-teal-950 hover:bg-emerald-700 hover:border-emerald-700',
      secondary: 'text-teal-950 bg-ivory border border-ivory hover:bg-white hover:border-white',
      outline: 'text-teal-950 bg-transparent border border-teal-900/30 hover:border-teal-950 hover:bg-teal-950/5',
      dark: 'text-white bg-transparent border border-white/30 hover:border-white hover:bg-white/10',
      light: 'text-teal-950 bg-white border border-white hover:bg-ivory hover:border-ivory',
      text: 'text-inherit bg-transparent border-b border-current pb-1 hover:text-emerald-700 hover:border-emerald-700 px-0 py-0',
    };

    const sizes = {
      sm: variant === 'text' ? '' : 'px-5 py-2.5 text-[10px]',
      md: variant === 'text' ? '' : 'px-8 py-3.5 text-xs',
      lg: variant === 'text' ? '' : 'px-12 py-5 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
        {withArrow && (
          <ArrowRight 
            className={cn(
              "ml-3 transition-transform duration-500 ease-[0.25,1,0.5,1] group-hover:translate-x-1.5",
              size === 'sm' ? "w-3 h-3" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"
            )} 
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
