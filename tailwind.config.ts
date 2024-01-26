import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        muted: {
          DEFAULT: 'var(--muted)',
        },
        line: {
          DEFAULT: 'var(--black)',
          muted: 'var(--line)',
        },
        disabled: 'var(--disabled)',
      },
      fontSize: {
        sm: [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
      },
      fontFamily: {
        base: [
          'var(--font-base)',
          'ui-sans-serif',
          'system-ui, sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
