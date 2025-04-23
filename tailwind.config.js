/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb", // Blue
          dark: "#1d4ed8",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#f97316", // Orange
          dark: "#ea580c",
          light: "#fb923c",
        },
        accent: {
          DEFAULT: "#FFFFFF", // White
        },
      },
    },
  },
  plugins: [],
};
