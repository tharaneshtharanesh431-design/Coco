import React, { useId } from 'react';
import { cn } from '@/utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, fullWidth = true, children, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div className={cn('relative flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-teal-900 font-sans">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex h-12 w-full rounded-md border border-teal-200 bg-white px-4 py-2 text-sm text-teal-900 shadow-sm transition-colors appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500'
          )}
          {...props}
        >
          {children}
        </select>
        
        {/* Custom Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-[28px] text-teal-900/50">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>

        {error && <span id={errorId} className="text-xs text-red-500 font-medium break-words">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
