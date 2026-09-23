import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#001a1a', // Deepest ocean
          900: '#003333', // Dark teal (brand)
          800: '#004d4d',
          700: '#006666',
          600: '#008080',
          500: '#009999',
        },
        emerald: {
          950: '#022c22',
          900: '#064e3b',
          800: '#065f46',
          700: '#047857', // Tropical green (primary CTA)
          600: '#059669',
          500: '#10b981',
        },
        ivory: {
          DEFAULT: '#FDFBF7', // Main warm ivory bg
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
        },
        natural: {
          50: '#f9f9f8',
          100: '#f3f2ee',
          200: '#e4e2db',
          300: '#d1cebe',
          400: '#b7b29d',
          500: '#9f9a7f',
          600: '#8a8368',
          700: '#736d58',
          800: '#5f5a4a',
          900: '#4e4a3e',
          950: '#2b2821',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 2px 10px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01)',
        'editorial-hover': '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.03)',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
