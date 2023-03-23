/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './components/*.{js,vue,ts}',
    './layouts/*.vue',
    './pages/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Proxima Nova"', 'sans-serif'],
        headings: ['"Butler"', 'sans-serif'],
      },
      fontSize: {
        h1: '4.5rem',
        h2: '2.75rem',
        'h-mobile': '1.5rem',
        xl: '1.375rem',
        large: '1.125rem',
        regular: '1rem',
        small: '0.875rem',
        disclaimer: '0.8125rem',
        mini: '0.75rem',
      },
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        'black-light-rgba': 'rgba(0,0,0,.8)',
      },
    },
  },
  plugins: [],
}
