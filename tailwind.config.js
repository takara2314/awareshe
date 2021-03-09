module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/ts/**/*.{ts,tsx}',
      './src/html/index.html'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Meiryo', 'sans-serif'],
        'jk': ['JKGothic', 'Meiryo', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '256': '64rem',
        '512': '128rem',
        '1024': '256rem',
        '2048': '512rem',
        '3968': '992rem',
        '4096': '1024rem',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
