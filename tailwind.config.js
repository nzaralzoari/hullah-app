/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0D0D0D",
        charcoal: "#18181B",
        offwhite: "#F4F4F5",
        gold: "#D4AF37",
        goldMuted: "#C5A059",
      },
    },
  },
  plugins: [],
};
