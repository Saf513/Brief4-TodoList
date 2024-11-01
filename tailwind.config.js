/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/*.{html, js}",
  ],
  theme: {
    extend: {  backgroundImage: {
      'modal-bg': "url('media\backg.jpg')",
    }},
  },
  plugins: [],
}

