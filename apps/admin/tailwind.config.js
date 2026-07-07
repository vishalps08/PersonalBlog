
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B1A",
        paper: "#FAF8F4",
        graphite: "#2A2826",
        ash: "#8A837A",
        safelight: "#A8402A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
    plugins: [require("@tailwindcss/typography")],
};