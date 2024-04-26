/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],

  // for dark mod
  darkMode: "class",
  
  // custom configs
  theme: {
    colors: {
      orange:"#EFA500",
      yellow : "#FFFF00",
      blue: "#1fb6ff",
      // 'pink': '#ff49db',
      // 'orange': '#ff7849',
      'green': '#13ce66',
      "transparent": "transparent",
      "red": "#ff0000",
      // "green": "#00ff00",
      "gray": "#efefef",
      "black": "#111111",
      "white":"#ffffff",
      // 'gray-dark': '#282828',
      'gray-dark': '#212121',
      "gray-dark-i": "#e3dce6",
      "gray-dark-bg": "#313131",
      "gray-dark-text": "#818181",

      // "gray-dark-bg": "#515151",
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
  },
};
