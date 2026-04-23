import Link from 'next/link'

export default function AuthorCard() {
  return (
    <div className="border-t border-border pt-6">
      <div>
        <p className="kicker-muted mb-3">Author</p>
        <h3 className="mb-1 text-lg font-semibold text-text">Dr. Sarah Zou</h3>
        <p className="mb-3 text-sm text-text-muted">EconNova Consulting</p>
        <p className="mb-4 text-sm leading-[1.75] text-text">
          PhD economist specializing in pricing and monetization strategy for tech startups. Helping
          startups and scale-ups optimize their pricing for maximum growth.
        </p>
        <Link
          href="/about"
          className="text-sm font-medium text-brand-ink transition-colors hover:text-brand-dark"
        >
          Learn more about Sarah →
        </Link>
      </div>
    </div>
  )
}
