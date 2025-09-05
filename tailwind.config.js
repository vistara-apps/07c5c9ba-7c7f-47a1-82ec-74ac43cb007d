/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        bg: 'hsl(210, 30%, 95%)',
        error: 'hsl(0, 80%, 50%)',
        accent: 'hsl(130, 70%, 50%)',
        primary: 'hsl(210, 100%, 50%)',
        surface: 'hsl(210, 30%, 100%)',
        'text-primary': 'hsl(210, 20%, 15%)',
        'text-secondary': 'hsl(210, 20%, 40%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 6px 16px hsla(210,30%,10%,0.12)',
      },
      animation: {
        'pulse-red': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.25,0.8,0.25,1)',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '300ms',
      },
      typography: {
        'display': 'text-3xl font-bold',
        'heading': 'text-xl font-semibold',
        'body': 'text-base leading-7',
        'caption': 'text-sm text-secondary',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
