import React from 'react';
import { cn } from '@/utils/cn';

interface LogoProps {
  variant?: 'full' | 'compact';
  theme?: 'light' | 'dark' | 'emerald';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  theme = 'light',
  className 
}) => {
  const colors = {
    light: {
      mark: 'text-emerald-400',
      text: 'text-white'
    },
    dark: {
      mark: 'text-emerald-700',
      text: 'text-teal-950'
    },
    emerald: {
      mark: 'text-emerald-300',
      text: 'text-emerald-800'
    }
  };

  const themeColors = colors[theme];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={themeColors.mark}
      >
        <path 
          d="M16 2L30 16L16 30L2 16L16 2Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        <path 
          d="M16 8L24 16L16 24" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        <circle cx="12" cy="16" r="2" fill="currentColor" />
      </svg>
      
      {variant === 'full' && (
        <span className={cn("font-serif text-2xl tracking-[0.1em] uppercase", themeColors.text)}>
          VERDECOCO
        </span>
      )}
    </div>
  );
};
