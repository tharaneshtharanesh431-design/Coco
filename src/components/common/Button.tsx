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
    
    // Base structural styles: No rounding, overflow hidden for hover effects
    const baseStyles = 'group relative inline-flex items-center justify-center font-sans tracking-[0.15em] uppercase font-medium italic transition-all duration-500 ease-cinematic rounded-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Complex variants with pseudo-element hover fills
    const variants = {
      primary: 'text-white bg-teal-950 border border-teal-950 hover:text-white before:absolute before:inset-0 before:bg-emerald-700 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-cinematic before:-z-10 z-0',
      secondary: 'text-teal-950 bg-ivory border border-ivory hover:text-white before:absolute before:inset-0 before:bg-teal-950 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-cinematic before:-z-10 z-0',
      outline: 'text-teal-950 bg-transparent border border-teal-900/30 hover:border-teal-950 hover:text-white before:absolute before:inset-0 before:bg-teal-950 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-cinematic before:-z-10 z-0',
      dark: 'text-white bg-transparent border border-white/30 hover:border-white hover:text-teal-950 before:absolute before:inset-0 before:bg-white before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-cinematic before:-z-10 z-0',
      light: 'text-teal-950 bg-white border border-white hover:text-teal-950 before:absolute before:inset-0 before:bg-ivory-200 before:translate-y-full hover:before:translate-y-0 before:transition-transform before:duration-500 before:ease-cinematic before:-z-10 z-0',
      text: 'text-inherit bg-transparent border-b border-current pb-1 hover:text-emerald-700 hover:border-emerald-700 px-0 py-0',
    };

    const sizes = {
      sm: variant === 'text' ? '' : 'px-6 py-3 text-[10px]',
      md: variant === 'text' ? '' : 'px-10 py-4 text-xs',
      lg: variant === 'text' ? '' : 'px-12 py-5 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10 flex items-center">
          {children}
          {withArrow && (
            <ArrowRight 
              className={cn(
                "ml-3 transition-transform duration-500 ease-cinematic group-hover:translate-x-1.5",
                size === 'sm' ? "w-3 h-3" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"
              )} 
            />
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
