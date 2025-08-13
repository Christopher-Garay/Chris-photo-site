/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ← enables toggling via the .dark class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};

