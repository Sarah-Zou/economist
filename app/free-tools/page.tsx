import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'

export const metadata: Metadata = {
  title: 'Open Research & Resources | Sarah Zou',
  description:
    'Open research on pricing, monetization, unit economics, business models, and startup fundraising for technical founders.',
  alternates: {
    canonical: 'https://sarahzou.com/free-tools',
  },
}

const resources = [
  {
    number: '01',
    type: 'Reference library',
    title: 'Pricing & Monetization Wiki',
    description:
      'Clear explanations of pricing architecture, value metrics, packaging, and monetization models for technical products.',
    href: '/wiki/pricing',
  },
  {
    number: '02',
    type: 'Reference library',
    title: 'Startup Fundraising',
    description:
      'Practical explanations of funding mechanics, instruments, valuation, dilution, and investor-facing decisions.',
    href: '/fundraising',
  },
  {
    number: '03',
    type: 'Selected writing',
    title: 'Research Notes',
    description:
      'Published analysis on pricing, unit economics, infrastructure businesses, and commercial strategy.',
    href: '/newsletter',
  },
]

export default function ResourcesPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/free-tools' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="resource-editorial min-h-screen bg-page">
        <section className="border-b border-border-soft bg-surface">
          <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
            <div>
              <p className="kicker-accent">Open resources</p>
              <h1 className="mt-6 max-w-[13ch] font-serif-playfair text-ink">
                Research and frameworks, available without a gate.
              </h1>
              <p className="mt-7 max-w-[43rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
                Use the library to understand a decision, align a team, or sharpen the question
                before bringing in outside help.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="kicker-muted">Built for the work before the meeting</p>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.8] text-text-muted">
                Plain-language references for technical founders making pricing, growth, and
                financing decisions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24">
              <div>
                <p className="kicker-muted">Browse the library</p>
                <p className="mt-5 max-w-xs text-[14px] leading-[1.75] text-text-muted">
                  Start with the area closest to the decision in front of you.
                </p>
              </div>
              <ul className="border-t border-border-soft">
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <Link
                      href={resource.href}
                      className="group grid gap-5 border-b border-border-soft py-9 lg:grid-cols-[2.75rem_minmax(0,1fr)_minmax(15rem,0.72fr)_auto] lg:items-start lg:gap-8 lg:py-11"
                    >
                      <span className="pt-1 text-[12px] tracking-[0.14em] text-text-subtle">
                        {resource.number}
                      </span>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-subtle">
                          {resource.type}
                        </p>
                        <h2 className="mt-3 font-serif-playfair text-ink">{resource.title}</h2>
                      </div>
                      <p className="max-w-[40rem] text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                        {resource.description}
                      </p>
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                A live commercial decision
              </p>
              <h2 className="mt-5 max-w-[42rem] font-serif-playfair !text-white">
                Need a recommendation rather than another resource?
              </h2>
              <p className="mt-5 max-w-[38rem] text-[15px] leading-[1.8] text-white/65 sm:text-[16px]">
                Share the decision, the constraint, and the evidence you already have. I&apos;ll
                return a concise point of view on what to examine next.
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                href="/diagnostic-note"
                className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[15px] font-medium text-white"
              >
                Request a free diagnostic note
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
