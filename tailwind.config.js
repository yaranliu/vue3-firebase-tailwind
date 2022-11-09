/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/colors')
const colors = require("tailwindcss/colors");
const themeColors = {
  primary: colors.sky,
  secondary: colors.orange,
  accent: colors.cyan
}


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: themeColors,
      transitionProperty: {
        'width' : 'width'
      }
    },
    fontFamily: {
      // sans: ['proxima-soft']
      sans: ['Poppins']
    }
  },
  plugins: [],
}

