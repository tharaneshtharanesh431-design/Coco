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
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={id} className="text-xs font-sans tracking-[0.05em] text-teal-900/80 uppercase">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex min-h-[120px] w-full rounded-none border-b border-teal-900/20 bg-ivory/50 px-4 py-3 text-sm text-teal-950 transition-all duration-400 ease-cinematic resize-y',
            'placeholder:text-teal-900/30',
            'hover:border-teal-900/50 hover:bg-white',
            'focus:outline-none focus:border-emerald-700 focus:bg-white focus:ring-1 focus:ring-emerald-700',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ivory-100',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
          )}
          {...props}
        />
        {error && <span id={errorId} className="text-[10px] tracking-wide text-red-500 font-medium break-words uppercase">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
