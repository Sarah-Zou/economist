import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ArticleCTAProps {
  href?: string
  variant: 'soft' | 'strong'
  /** Primary copy, e.g. "Unsure where your business fits? Book a session." */
  copy: string
  /** Button label for the strong variant */
  buttonLabel?: string
}

export default function ArticleCTA({
  href = '/book',
  variant,
  copy,
  buttonLabel = 'Book a free consultation',
}: ArticleCTAProps) {
  if (variant === 'soft') {
    return (
      <div className="my-8 flex items-center gap-3 text-[15px] text-text-muted">
        <span>{copy}</span>
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-semibold text-brand-ink hover:text-brand-dark transition-colors whitespace-nowrap"
        >
          Book a free call
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="my-12 rounded-xl border border-border-soft bg-white px-6 py-8 text-center">
      <p className="text-[17px] text-text leading-[1.7] mb-6 max-w-[32rem] mx-auto">{copy}</p>
      <Link
        href={href}
        className="inline-flex h-[3rem] min-w-[200px] items-center justify-center rounded-[12px] bg-brand px-7 text-[16px] font-semibold leading-none text-brand-on shadow-card transition-[background-color] duration-200 hover:bg-brand-ink"
      >
        {buttonLabel}
      </Link>
    </div>
  )
}
