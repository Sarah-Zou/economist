// Single source of truth for CTA class strings.
// Keep names stable for backwards compatibility; styles are aligned to the
// unified Button/utility system in globals.css and components/ui/button.tsx.

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none'

export const primaryButton =
  `${btnBase} h-11 px-6 text-[15px] bg-brand text-brand-on hover:bg-brand-ink [&_svg]:text-brand-on`

export const primaryButtonLg =
  `${btnBase} h-12 px-7 text-[16px] bg-brand text-brand-on hover:bg-brand-ink [&_svg]:text-brand-on`

export const primaryButtonSm =
  `${btnBase} h-10 px-5 text-[14px] bg-brand text-brand-on hover:bg-brand-ink [&_svg]:text-brand-on`

export const secondaryButton =
  `${btnBase} h-11 px-6 text-[15px] bg-ink text-white hover:bg-ink/90 [&_svg]:text-white`

export const outlineButton =
  `${btnBase} h-11 px-6 text-[15px] border border-border-subtle bg-white text-text hover:border-ink/30 hover:bg-surface [&_svg]:text-text`

export const ghostButton =
  `${btnBase} h-11 px-6 text-[15px] text-text hover:bg-surface`

export const brandLink =
  'text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark'

export const orangeSurface =
  'bg-brand text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'

export const orangeSurfaceInk =
  'bg-brand-ink text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'
