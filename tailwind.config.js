/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#020305",
        ink: "#f5f7fa",
        blue: "#0b1833",
        blueSoft: "#122449",
        red: "#b1262f",
        line: "rgba(255,255,255,0.12)"
      },
      fontFamily: {
        sans: ['"Segoe UI"', "system-ui", "sans-serif"],
        display: ['"Arial Black"', '"Segoe UI"', "sans-serif"]
      },
      boxShadow: {
        dock: "0 30px 80px rgba(0,0,0,0.55)",
        panel: "0 24px 70px rgba(0,0,0,0.45)"
      },
      letterSpacing: {
        ultra: "0.28em"
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 38%), linear-gradient(120deg, rgba(11,24,51,0.26), transparent 32%, rgba(177,38,47,0.14) 120%)"
      }
    }
  },
  plugins: []
};
