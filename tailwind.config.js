/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1180px',
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        // Shadcn-compatible semantic tokens (kept for plugin compatibility)
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',

        // Canonical design tokens (use these going forward)
        page: 'var(--color-page)',
        body: 'var(--color-text)',
        ink: 'var(--color-ink)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-subtle': 'var(--color-text-subtle)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        'hero-tint': 'var(--color-hero-tint)',
        'border-subtle': 'var(--color-border)',
        'border-soft': 'var(--color-border-soft)',

        brand: {
          DEFAULT: 'var(--color-brand-default)',
          ink: 'var(--color-brand-ink)',
          hover: 'var(--color-brand-ink)',
          dark: 'var(--color-brand-dark)',
          soft: 'var(--color-brand-soft)',
          on: 'var(--color-brand-on)',
        },
      },
      maxWidth: {
        content: '920px',
        'prose-wide': '70ch',
        container: '1180px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.03), 0 10px 30px -24px rgba(15, 23, 42, 0.16)',
        'card-hover': '0 18px 40px -26px rgba(15, 23, 42, 0.22)',
        elevated: '0 28px 60px -34px rgba(15, 23, 42, 0.28)',
      },
      borderRadius: {
        control: '0.875rem',
        card: '1.25rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
