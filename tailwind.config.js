/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      }
    }
  },
  plugins: []
};
