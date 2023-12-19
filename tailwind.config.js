/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['Nunito', 'sans- serif'],
        'sans': ['Open Sans', 'sans- serif'],
        'Poppins': ['Poppins', 'sans- serif'],       
      },
      colors:{
        'praimary':'#5F35F5'
      }
    },
  },
plugins: [],
}