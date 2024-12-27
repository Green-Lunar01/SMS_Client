/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all React files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#13A541'
        },
        secondary: {
          bold: '#08190E'
        }
      },
      backgroundImage: {
        header: "url('/green-bg.png')",
        headerMobile: "url('/green-bg-mobile.png')",
        hero: "url('/white-bg.png')",
        heroMobile: "url('/mobile-hero.png')"
      },
    
      keyframes: {
        slideIn: {
          '70%': { transform: 'translateX(-100%)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 1s ease-out',
        slideOut: 'slideOut 0.5s ease-in',
      },
    },
  },

  
  plugins: [],
}

