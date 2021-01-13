const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './pages/**/*.jsx',
     './components/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans]
    },
    extend: {
        screens: {
        'xsm': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'xxl': '1920px',
        'xxxl': '2560px',
        'navBar': '768px'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: colors.lightBlue,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.amber,
      white: colors.white,
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
      backgroundColor: ['disabled', 'active'],
    }
  },
  plugins: [],
}
