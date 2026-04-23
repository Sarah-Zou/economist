// Single source of truth for CTA class strings.
// Keep names stable for backwards compatibility; styles are aligned to the
// unified Button/utility system in globals.css and components/ui/button.tsx.

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-semibold leading-none tracking-[0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50'

export const primaryButton = `${btnBase} h-11 px-5.5 text-[15px] bg-brand text-brand-on shadow-card hover:-translate-y-px hover:bg-brand-ink hover:shadow-card-hover active:translate-y-0 [&_svg]:text-brand-on [&_svg]:transition-transform`

export const primaryButtonLg = `${btnBase} h-12 px-6.5 text-[16px] bg-brand text-brand-on shadow-card hover:-translate-y-px hover:bg-brand-ink hover:shadow-card-hover active:translate-y-0 [&_svg]:text-brand-on [&_svg]:transition-transform`

export const primaryButtonSm = `${btnBase} h-10 px-4.5 text-[14px] bg-brand text-brand-on shadow-card hover:-translate-y-px hover:bg-brand-ink hover:shadow-card-hover active:translate-y-0 [&_svg]:text-brand-on [&_svg]:transition-transform`

export const secondaryButton = `${btnBase} h-11 px-5.5 text-[15px] bg-ink text-white hover:-translate-y-px hover:bg-ink/92 hover:shadow-card [&_svg]:text-white [&_svg]:transition-transform`

export const outlineButton = `${btnBase} h-11 px-5.5 text-[15px] border border-border-subtle bg-white text-text shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] hover:-translate-y-px hover:border-ink hover:bg-white active:translate-y-0 [&_svg]:text-text [&_svg]:transition-transform`

export const ghostButton = `${btnBase} h-11 px-5.5 text-[15px] text-text hover:bg-surface`

export const brandLink =
  'text-brand-ink underline decoration-brand/70 decoration-[1.5px] underline-offset-4 hover:text-brand-dark hover:decoration-brand'

export const orangeSurface =
  'bg-brand text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'

export const orangeSurfaceInk =
  'bg-brand-ink text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'
