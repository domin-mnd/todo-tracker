const { black, blue, neutral, purple, red, white } = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {},
    colors: {
      primary: blue,
      secondary: red,
      tertiary: purple,
      quaternary: neutral,
      
      white: white,
      black: black,
    }
  },
  plugins: [],
}
