/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        intel: ['Inter', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0.1 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
        'fade-in-slow': 'fade-in 0.45s ease-in-out forwards',
        'fade-out': 'fade-out 0.3s ease-in-out forwards',
        'fade-out-slow': 'fade-out 0.45s ease-in-out forwards',
      },
      backgroundImage: {
        'auth': "url('../assets/images/auth-bg.png')",
        'caro': "url('../assets/images/caro.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
