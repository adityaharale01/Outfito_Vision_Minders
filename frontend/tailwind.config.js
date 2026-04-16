/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        secondary: '#d946ef',
        accent: '#06b6d4',
        warm: {
          50: '#fffaf5',
          100: '#fff5e6',
          500: '#f59e0b',
          600: '#d97706',
        },
        dark: {
          900: '#0f0f23',
          800: '#1a1a2e',
          700: '#242a45',
          600: '#2d3561',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #f97316 0%, #d946ef 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'gradient-warm': 'linear-gradient(135deg, #faf5f0 0%, #f3e8ff 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};