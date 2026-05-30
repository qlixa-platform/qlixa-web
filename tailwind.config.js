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
        orange: {
          DEFAULT: '#FF7033',
          dark: '#E85F1F',
          light: '#FFB899',
          pale: '#FFF0E8',
          mid: '#FFD4BC',
        },
        charcoal: {
          DEFAULT: '#353434',
          2: '#4A4848',
          3: '#6B6969',
        },
        qgray: {
          DEFAULT: '#F1F1F1',
          2: '#E8E8E8',
          3: '#D4D4D4',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        qsm: '8px',
        qmd: '16px',
        qlg: '24px',
      },
    },
  },
  plugins: [],
}
