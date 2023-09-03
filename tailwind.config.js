/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "setting_back_image": "url('../public/goomart.svg')" ,
      },
      colors: {
        primary: "#148C00",
        secondary: "#E7C31E",
        deepgray: "#6D6D6D",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      width: {
        '1/7': '14.2857143%',  // This percentage equates to 1/7
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
  ],
};
