/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/*.{html, js}",
  ],
  theme: {
    extend: {
      spacing: {
        '84': '21rem',
      } , 
      backgroundImage: {
      'modal-bg': "url('media\backg.jpg')",
    }},
  },
  plugins: [],
}

