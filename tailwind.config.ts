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
        },
        emerald: {
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
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 2px 10px rgba(0, 0, 0, 0.02)',
        'editorial-hover': '0 8px 30px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
