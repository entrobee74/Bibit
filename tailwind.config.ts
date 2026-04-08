import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette
        gold: {
          50: '#fffbf0',
          100: '#fef3e2',
          200: '#fde5c5',
          300: '#fcd4a4',
          400: '#fcb878',
          500: '#d4af37', // Primary gold
          600: '#b8941f',
          700: '#9c7a1a',
          800: '#7d6014',
          900: '#66480f',
        },
        // Dark mode backgrounds
        slate: {
          950: '#0a0a0a',
          925: '#0f0f12',
          900: '#141417',
          850: '#1a1a1f',
          800: '#1f1f26',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--color-text-primary) / <alpha-value>)',
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'gold': '0 0 24px rgba(212, 175, 55, 0.3)',
        'gold-sm': '0 0 12px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(212, 175, 55, 0.4)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
