module.exports = {
  purge: {
    enabled: false,
    content: [
      './src/ts/**/*.{ts,tsx}',
      './src/html/index.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Meiryo', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
