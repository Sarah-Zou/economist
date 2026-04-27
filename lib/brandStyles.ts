// Single source of truth for CTA class strings.
// Keep names stable for backwards compatibility; styles are aligned to the
// unified Button/utility system in globals.css and components/ui/button.tsx.

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-semibold leading-none tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50'

const primaryShadow = `shadow-[0_1px_3px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]`

export const primaryButton = `${btnBase} h-11 min-w-[180px] px-6 text-[15px] bg-brand text-brand-on ${primaryShadow} hover:bg-brand-ink [&_svg]:text-brand-on [&_svg]:transition-transform`

export const primaryButtonLg = `${btnBase} h-[3.25rem] min-w-[220px] px-8 text-[16px] bg-brand text-brand-on ${primaryShadow} hover:bg-brand-ink [&_svg]:text-brand-on [&_svg]:transition-transform`

export const primaryButtonSm = `${btnBase} h-10 min-w-[160px] px-5 text-[14px] bg-brand text-brand-on ${primaryShadow} hover:bg-brand-ink [&_svg]:text-brand-on [&_svg]:transition-transform`

export const secondaryButton = `${btnBase} h-11 px-6 text-[15px] bg-ink text-white hover:bg-ink/90 [&_svg]:text-white [&_svg]:transition-transform`

export const outlineButton = `${btnBase} h-11 min-w-[180px] px-6 text-[15px] border border-border bg-white text-ink hover:border-ink hover:bg-surface [&_svg]:text-ink [&_svg]:transition-transform`

export const outlineButtonSm = `${btnBase} h-10 min-w-[168px] px-5 text-[14px] border border-border bg-white text-ink hover:border-ink hover:bg-surface [&_svg]:text-ink [&_svg]:transition-transform`

export const ghostButton = `${btnBase} h-11 px-6 text-[15px] text-text hover:bg-surface`

export const brandLink =
  'text-brand-ink underline decoration-brand/70 decoration-[1.5px] underline-offset-4 hover:text-brand-dark hover:decoration-brand'

export const orangeSurface =
  'bg-brand text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'

export const orangeSurfaceInk =
  'bg-brand-ink text-brand-on [&_a]:text-brand-on [&_a]:underline [&_a]:decoration-brand-on/80 [&_svg]:text-brand-on'
