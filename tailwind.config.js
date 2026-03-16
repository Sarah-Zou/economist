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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
        page: "#f9f6f7",
        body: "#1f2933",
        surface: "#f6f7f9",
        "border-subtle": "#e2e6ea",
        brand: {
          DEFAULT: "var(--color-brand-default)",
          ink: "var(--color-brand-ink)",
          hover: "var(--color-brand-ink)",
          soft: "var(--color-brand-soft)",
          on: "var(--color-brand-on)",
        },
        gray: {
          700: '#222',
          600: '#444',
        },
      },
      maxWidth: {
        "content": "900px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} 