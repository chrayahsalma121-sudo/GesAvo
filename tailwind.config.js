/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        arabic: ['Noto Naskh Arabic', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        law: {
          ink: '#0D0D0D',
          paper: '#F7F4EE',
          cream: '#EDE9E0',
          gold: '#B8913A',
          goldLight: '#D4A853',
          goldPale: '#F5EDD6',
          slate: '#3A3F4A',
          muted: '#8A8F9A',
          border: '#D8D3C8',
          danger: '#C0392B',
          success: '#27634A',
          warn: '#B5710A',
        },
      },
      boxShadow: {
        soft: '0 14px 40px rgba(13, 13, 13, 0.08)',
      },
    },
  },
  plugins: [],
};
