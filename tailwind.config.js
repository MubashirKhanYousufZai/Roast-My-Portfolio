/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App folder
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        // Variables set in layout.tsx
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      colors: {
        primary: "#e11d48",    // Pink-red accent
        secondary: "#9333ea",  // Purple accent
        dark: "#0f0f0f",
        lightGray: "#d1d5db",
      },
      backgroundImage: {
        "gradient-br": "linear-gradient(to bottom right, #1e1e1e, #000)",
        "gradient-tl": "linear-gradient(to top left, #1e1e1e, #000)",
      },
    },
  },
  plugins: [],
};
