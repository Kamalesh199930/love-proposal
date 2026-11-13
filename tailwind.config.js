/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        romance: {
          light: '#FFF0F5',
          blush: '#FFB6C1',
          cotton: '#FFC0CB',
          softPink: '#FF94B9',
          hotPink: '#FF4D8D',
          deepRose: '#D81B60',
          wine: '#880e4f',
          lavender: '#E8D7F1',
          gold: '#FFD700',
          amberGlow: '#FFA07A',
        }
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.4), 0 0 40px rgba(244, 63, 94, 0.2)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 35px rgba(244, 63, 94, 0.7), 0 0 70px rgba(244, 63, 94, 0.4)',
            transform: 'scale(1.03)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
