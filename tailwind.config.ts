import type { Config } from 'tailwindcss'
import { namuiColors } from './constants/colors/namui-colors'
import { defaultColors } from './constants/colors/default'
import { fontSize } from './constants/styles'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './layout/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      padding: {
        4: '14px',
      },
      spacing: {
        header: 'calc(var(--header-height) - 1px)',
        'calc-h': 'calc(var(--vh,1vh)*100)',
      },

      colors: {
        ...namuiColors,
        ...defaultColors,
        line: {
          ...namuiColors.line,
        },
        disabled: 'var(--disabled)',
      },
      fontSize: {
        ...fontSize,
        'mainTitle1-bold': [
          '28px',
          {
            fontWeight: 'bold',
            lineHeight: '38px',
          },
        ],
        'mainTitle1-medium': [
          '28px',
          {
            fontWeight: '500',
            lineHeight: '38px',
          },
        ],
        'mainTitle2-bold': [
          '24px',
          {
            fontWeight: 'bold',
            lineHeight: '34px',
          },
        ],
        'mainTitle2-medium': [
          '24px',
          {
            fontWeight: '500',
            lineHeight: '34px',
          },
        ],
        'subTitle1-bold': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: 'bold',
          },
        ],
        'subTitle1-medium': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '500',
          },
        ],
        'subTitle2-medium': [
          '18px',
          {
            lineHeight: '26px',
            fontWeight: '500',
          },
        ],
        'subTitle2-bold': [
          '18px',
          {
            lineHeight: '26px',
            fontWeight: '700',
          },
        ],
        'body1-medium': [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '24px',
          },
        ],
        'body1-bold': [
          '16px',
          {
            fontWeight: '700',
            lineHeight: '24px',
          },
        ],
        body2: '15px',
        'body3-medium': [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '20px',
          },
        ],
        'body3-bold': [
          '14px',
          {
            fontWeight: '700',
            lineHeight: '20px',
          },
        ],
        'caption1-medium': [
          '13px',
          {
            lineHeight: '18px',
            fontWeight: '500',
          },
        ],
        'caption1-bold': [
          '13px',
          {
            lineHeight: '18px',
            fontWeight: '700',
          },
        ],
        'caption2-medium': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '500',
          },
        ],
        'caption2-bold': [
          '12px',
          {
            lineHeight: '18px',
            fontWeight: '700',
          },
        ],
      },
      fontWeight: {
        medium: '500',
        bold: '700',
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
        emoji: [
          'var(--font-toss)',
          'var(--font-base)',
          'ui-sans-serif',
          'system-ui, sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      boxShadow: {
        basic: '0px 4px 10px rgba(0,0,0,0.06)',
        'chat-bubble': '4px 4px 16px rgba(0, 0, 0, 0.1)',
        onboard: '4px 8px 20px rgba(0, 0, 0, 0.08)',
      },
      dropShadow: {
        'chat-bubble': '4px 4px 16px rgba(0, 0, 0, 0.1)',
      },
      lineHeight: {
        mainTitle1: '38px',
        mainTitle2: '36px',
        body1: '24px',
        body2: '22px',
        body3: '20px',
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

        // Background Gradient
        first: 'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third: 'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth: 'moveInCircle 20s ease infinite',
      },
      transitionTimingFunction: {
        easeOutQuint: 'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  safelist: [
    'mr-auto',
    ...Object.values(namuiColors.relation),
    {
      pattern: /^bg-/,
    },
  ],
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config

export default config
