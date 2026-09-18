import React, { useId } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, fullWidth = true, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-teal-900 font-sans">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex min-h-[120px] w-full rounded-md border border-teal-200 bg-white px-4 py-3 text-sm text-teal-900 shadow-sm transition-colors resize-y',
            'placeholder:text-teal-900/40',
            'focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500'
          )}
          {...props}
        />
        {error && <span id={errorId} className="text-xs text-red-500 font-medium break-words">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
