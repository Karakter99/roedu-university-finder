/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"], // Connects to the font we added in layout.tsx
        serif: ["var(--font-playfair)"], // Connects to the font we added in layout.tsx
      },
      colors: {
        cream: "#FDFBF7",
        dark: "#1a1a1a",
        "brand-yellow": "#F4E04D",
      },
    },
  },
  plugins: [],
};
