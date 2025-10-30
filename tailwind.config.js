/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // turn off "system prefers dark" behavior
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        // Your custom palette
        dmElement: "hsl(209, 23%, 22%)", // Dark mode elements
        dmBg: "hsl(207, 26%, 17%)", // Dark mode background
        lmText: "hsl(200, 15%, 8%)", // Light mode text
        lmInput: "hsl(0, 0%, 50%)", // Light mode input
        lmBg: "hsl(0, 0%, 99%)", // Light mode background
        surface: "hsl(0, 100%, 100%)", // White (cards/DM text)
      },
    },
  },
  plugins: [],
};
