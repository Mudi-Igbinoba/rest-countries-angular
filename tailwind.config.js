/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",

  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        zinc: {
          25: "#858585", // Dark Gray (Light Mode Input)
          // 50: Very Light Gray (Light Mode Background): #fafafa
        },

        primary: {
          500: "#2b3945", // Dark Blue (Dark Mode Elements)
          600: "#202c37", // Very Dark Blue (Dark Mode Background)
          700: "#111517", // Very Dark Blue (Light Mode Text)
        },
      },
      backgroundImage: {
        "light-arrow": "url(/black_arrow.svg)",
        "dark-arrow": "url(/white_arrow.svg)",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
