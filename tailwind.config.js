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
        'avatar': "url('../assets/images/avatar-bg.jpg')",
        'pattern-1': "url('../assets/images/pattern-1.png')",
      },
      colors: {
        'cinder': {
          '50': '#f6f6f9',
          '100': '#ececf2',
          '200': '#d4d5e3',
          '300': '#afb1ca',
          '400': '#8387ad',
          '500': '#636894',
          '600': '#4f517a',
          '700': '#414363',
          '800': '#383954',
          '900': '#323348',
          '950': '#15151e',
        },
        'steel-gray': {
          '50': '#f6f6f9',
          '100': '#ebebf3',
          '200': '#d3d4e4',
          '300': '#adafcc',
          '400': '#8084b0',
          '500': '#606597',
          '600': '#4c4f7d',
          '700': '#3e4066',
          '800': '#363856',
          '900': '#313249',
          '950': '#1e1e2d',
      },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
