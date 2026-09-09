/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jharkhand: {
          green: {
            DEFAULT: '#005A36', // Forest Emerald
            dark: '#003D24',
            light: '#E8F5E9',
            medium: '#1B7A4A'
          },
          earth: {
            DEFAULT: '#B84A17', // Terracotta
            dark: '#87320D',
            light: '#FDF6F0'
          },
          gold: {
            DEFAULT: '#D99B00', // Sun Gold
            light: '#FFF8E7'
          },
          cream: '#FAF8F5',
          navy: '#1A2E40',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
