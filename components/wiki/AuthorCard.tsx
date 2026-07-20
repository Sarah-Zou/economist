import Link from 'next/link'

export default function AuthorCard() {
  return (
    <div className="border-t border-border pt-6">
      <p className="kicker-muted">Author</p>
      <h3 className="mt-3 font-serif-playfair text-[20px] font-medium text-ink">Dr. Sarah Zou</h3>
      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text-subtle">
        Independent economist · EconNova
      </p>
      <p className="mt-4 text-[13px] leading-[1.75] text-text-muted">
        Commercial strategy for technical products, with a focus on pricing, unit economics, and the
        operating choices behind the model.
      </p>
      <Link
        href="/about"
        className="mt-4 inline-flex border-b border-border pb-0.5 text-[12px] font-medium text-brand-ink transition-colors hover:border-brand-ink"
      >
        About Sarah
      </Link>
    </div>
  )
}
