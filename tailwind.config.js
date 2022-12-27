/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        cinder: {
          900: '#151521',
          800: '#1B1B28',
          700: '#1E1E2D',
          600: '#2B2B40'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
