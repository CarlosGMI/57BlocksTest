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
        colgate: '#F50005',
        white: '#FFFFFF',
        charcoal: '#595655',
        brick: '#8F1F1D',
        monza: '#D6090C',
        alabaster: '#F9F9F9',
        seashell: '#F1F1F1',
        titan: '#EEEEEE',
        gallery: '#777574',
        valerie: '#FEE5E6',
        ruby: '#D6090C',
        'light-gray': '#EAEAEA',
        'charcoal-light-rgba': 'rgba(89, 86, 85, 0.1)',
        'charcoal-dark-rgba': 'rgba(89, 86, 85, 0.8)',
        'white-dark-rgba': 'rgba(255, 255, 255, 0.9)',
        'white-light-rgba': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
