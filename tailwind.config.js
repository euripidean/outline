/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "outline-bg": "#030303",
        "outline-white": "#f0f0f0",
        "outline-light": "#d8ceb4",
        "outline-mid": "#c1ac79",
        "outline-gold": "#aa8a3e",
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
