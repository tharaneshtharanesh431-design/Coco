import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'solid' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white shadow-editorial hover:shadow-editorial-hover border border-ivory-200',
      solid: 'bg-teal-950 text-white shadow-none border-none',
      outline: 'bg-transparent border-2 border-teal-900/10 hover:border-teal-900/30 shadow-none',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-none overflow-hidden transition-all duration-500', variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
