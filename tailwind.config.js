/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "#f9f6f7",
        foreground: "#222",
        accent: "#ff5722",
        muted: "#888",
        gray: {
          700: '#222',
          600: '#444',
        },
        orange: {
          500: '#ff5722',
        },
      },
      maxWidth: {
        "content": "900px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} 