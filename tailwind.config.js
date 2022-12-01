/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require('tailwindcss/colors')
const colors = require("tailwindcss/colors");
const themeColors = {
  primary: colors.sky,
  secondary: colors.teal,
  accent: colors.fuchsia,
  alert: colors.red,
  warning: colors.yellow,
  success: colors.emerald,
  info: colors.blue
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
        'width' : 'width',
        'height' : 'height'
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      }
    },
    fontFamily: {
      // sans: ['proxima-soft']
      sans: ['Poppins'],
      mono: ['Inconsolata']
    }
  },
  plugins: [],
}

