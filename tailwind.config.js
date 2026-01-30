/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dna: {
          t: 'var(--dna-t)',
          v: 'var(--dna-v)',
          a: 'var(--dna-a)',
          p: 'var(--dna-p)',
        },
        brand: {
          teal: '#25EDBA', // Logo Primary Node
          cyan: '#36F1C4', // Logo Secondary Node
          glow: '#8AFFFA', // Logo Outer Glow
        },
        void: 'var(--bg-void)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
