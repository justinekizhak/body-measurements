module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: require('tailwindcss/colors'),
    extend: {
      fontFamily: {
        display: 'Raleway',
      },
      gridRow: {
        'span-8': 'span 8 / span 8',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
