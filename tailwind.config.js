module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './pages/**/*.js',
     './components/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
