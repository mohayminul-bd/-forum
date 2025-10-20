export default {
  darkMode: "class", // এটা রাখবে যেমন আছে
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // 👈 এখানেই নতুন font যোগ করা হলো
        bbh: ["BBH Sans Bartle", "sans - serif"],
      },
    },
  },
  plugins: [],
};
