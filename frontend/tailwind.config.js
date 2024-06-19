/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D5F200",
        primaryHover: "#eefa99",
        primaryHoverDark: "#809100",
        secondary: "#00FAFB",
        secondaryHover: "#99fdfd",
        secondaryHoverDark: "#009697",
        warning: "#DE0051",
      },
    },
  },
  plugins: [],
};
