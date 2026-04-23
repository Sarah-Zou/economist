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
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1120px",
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Shadcn-compatible semantic tokens (kept for plugin compatibility)
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",

        // Canonical design tokens (use these going forward)
        page: "var(--color-page)",
        body: "var(--color-text)",
        ink: "var(--color-ink)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-subtle": "var(--color-text-subtle)",
        surface: "var(--color-surface)",
        "surface-muted": "var(--color-surface-muted)",
        "hero-tint": "var(--color-hero-tint)",
        "border-subtle": "var(--color-border)",
        "border-soft": "var(--color-border-soft)",

        brand: {
          DEFAULT: "var(--color-brand-default)",
          ink: "var(--color-brand-ink)",
          hover: "var(--color-brand-ink)",
          dark: "var(--color-brand-dark)",
          soft: "var(--color-brand-soft)",
          on: "var(--color-brand-on)",
        },
      },
      maxWidth: {
        "content": "900px",
        "prose-wide": "68ch",
        "container": "1120px",
      },
      boxShadow: {
        "card": "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 1px rgba(15, 23, 42, 0.03)",
        "card-hover": "0 6px 24px -8px rgba(15, 23, 42, 0.12)",
        "elevated": "0 12px 40px -12px rgba(15, 23, 42, 0.18)",
      },
      borderRadius: {
        "control": "0.75rem",
        "card": "1rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
