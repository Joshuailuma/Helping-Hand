/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        waterfall: ['Waterfall', 'cursive'],
      },
      colors: {
        brightBlue: 'hsl(211, 62%, 43%)',
        brightBlueLight: 'hsl(211, 75%, 47%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 63%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        textColorWrite: 'hsl(210, 29%, 29%)',
        lightBlack: '#212F3D'
      },
    },
  },
  plugins: [],
};
