/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['"Lobster"', 'cursive'],
        'dm-serif-display': ['"DM Serif Display"', "Arial"]
      }
    },
  },
  plugins: [],
}
