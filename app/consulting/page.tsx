import Link from 'next/link'
import type { ReactNode } from 'react'
import { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'
import { generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { OG_IMAGE_CONSULTING } from '@/lib/seo'

const PRIMARY_CTA_HREF = '/diagnostic-note'
const SECONDARY_CTA_HREF = '/book'
const PRICING_SPRINT_HREF = '/consulting/services/pricing-monetization-sprint'

export const metadata: Metadata = {
  title:
    'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
  description:
    'A two-week, fixed-fee pricing and unit-economics audit for AI-infrastructure and data-platform companies (Seed–Series B). Start with a free diagnostic note.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/consulting',
  },
  openGraph: {
    title:
      'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
    description:
      'A two-week, fixed-fee pricing and unit-economics audit for AI-infrastructure and data-platform companies (Seed–Series B). Start with a free diagnostic note.',
    type: 'website',
    url: 'https://sarahzou.com/consulting',
    images: [OG_IMAGE_CONSULTING],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
    description:
      'A two-week, fixed-fee pricing and unit-economics audit for AI-infrastructure and data-platform companies (Seed–Series B). Start with a free diagnostic note.',
    images: [OG_IMAGE_CONSULTING],
  },
}

const CHALLENGES = [
  "You're launching an API, infrastructure product, or data platform and need a pricing architecture built on cost-floor logic — not a SaaS template.",
  "You're choosing between usage-based, credit-based, committed-use, or hybrid pricing and need to know which model survives technical-buyer adoption.",
  "Your GTM motion is misaligned with how infrastructure or data-platform buyers evaluate, pilot, and buy.",
  'Your unit economics or gross-margin story needs to hold up when an investor asks about cost floors, margin at scale, or hardware-software economics.',
  "You need a paid-pilot structure, ICP definition, or commercial packaging for a product category that doesn't have a ready benchmark.",
  'You want senior commercial strategy thinking — pricing, GTM, and fundraising economics — without a full-time strategy hire.',
]

const OTHER_PATHS = [
  {
    title: 'Pricing & Monetization Sprint',
    bestFor:
      'Founders who need to build and roll out the full pricing structure once the Diagnostic has set the direction.',
    scope:
      '2–4 weeks. Pricing model, value metric, packaging, rollout. Follow-on to the Diagnostic when implementation depth is needed.',
    price: null,
    cta: 'Explore the sprint',
    href: PRICING_SPRINT_HREF,
  },
  {
    title: 'Growth Economics, Forecasting & Unit Economics',
    bestFor:
      'Teams whose revenue model, KPI structure, or investor assumptions need rigorous grounding.',
    scope: '2–3 weeks. Revenue model design, KPI logic, forward models, investor narrative.',
    price: null,
    cta: 'Explore the sprint',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    title: 'Fractional or Embedded Strategy Support',
    bestFor:
      'Teams that need ongoing commercial strategy, monetization, and board-facing economics.',
    scope: 'Monthly. Weekly advisory, board prep, strategic reviews.',
    price: null,
    cta: 'Explore this option',
    href: '/consulting/services/on-call-economist-retainer',
  },
]

const CREDENTIALS = [
  'PhD Economics, Rutgers',
  'MS Finance & Statistics, UIUC',
  'NBER & World Bank research',
  'Former Citigroup & Capgemini',
]

const WORK_STEPS = [
  {
    title: 'You share context',
    copy: 'I review the relevant background — commercial model, pricing, metrics, or team structure — before we meet.',
  },
  {
    title: 'We identify the real problem',
    copy: 'Pricing model, GTM economics, revenue logic, unit economics, KPI structure, or forecasting assumptions.',
  },
  {
    title: 'We work through the decision',
    copy: 'You get a clear recommendation and the key tradeoffs in plain English — no vague strategy, no 40-page decks.',
  },
  {
    title: 'You leave with next steps',
    copy: 'A concrete next move — one focused change, or a broader engagement if the work warrants it.',
  },
]

const FAQ_ITEMS: Array<{
  qSchema: string
  question: ReactNode
  a: string
}> = [
  {
    qSchema: "We're too early / pre-revenue.",
    question: "\"We're too early / pre-revenue.\"",
    a: "If you're charging anything — or about to — the architecture decision is already in front of you. It's cheapest to fix before contracts pile up.",
  },
  {
    qSchema: 'Why two weeks, why fixed fee?',
    question: 'Why two weeks, why fixed fee?',
    a: "You get a decision, not a dependency. A fixed fee keeps the work focused and the cost predictable.",
  },
  {
    qSchema: "Why you, not a pricing tool or a big firm?",
    question: "Why you, not a pricing tool or a big firm?",
    a: "An economist who operates an infrastructure company and builds these exact cost and pricing models — infra-specific, not generic SaaS.",
  },
  {
    qSchema: "We can't share our cost data.",
    question: "\"We can't share our cost data.\"",
    a: "We work under NDA, from ranges and your own categories.",
  },
  {
    qSchema: 'How should I start?',
    question: 'How should I start?',
    a: "Most founders start with a free one-page diagnostic note — the lowest-risk way to see how I think before anything is paid. From there, the two-week Commercial Architecture Diagnostic is the usual next step. If you already know the work is broader, a deeper sprint may fit.",
  },
  {
    qSchema: "What if I don't know exactly what I need?",
    question: "What if I don't know exactly what I need?",
    a: "That's common — and it's part of what the diagnostic note is for. A short note on what you're working through is enough to start. If the scope is clearly bigger, we can talk.",
  },
  {
    qSchema: 'Is this only for pricing?',
    question: 'Is this only for pricing?',
    a: 'No. Pricing and monetization are the core, but technical founders also work with me on GTM motion design for infrastructure buyers, paid pilot structure, ICP definition for novel-category products, gross-margin and cost-floor logic, and fundraising-ready commercial narratives — anywhere the commercial layer around a complex product needs to be built.',
  },
]

export default function ConsultingPage() {
  return (
    <>
      <div className="bg-page text-text">
        <main>
          {/* Hero */}
          <section className="bg-hero-tint">
            <div className="section-shell pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-30 lg:pt-24">
              <div className="section-header max-w-[44rem]">
                <span className="kicker-accent">Commercial Architecture</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Pricing, unit economics, and commercial strategy for AI-infrastructure and
                  data-platform founders.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  Infrastructure and usage-based companies get handed pricing advice built for
                  per-seat SaaS — and it misfits. The value metric drifts from the real cost
                  driver, tiers cap on the wrong axis, the free tier leaks margin, and every
                  enterprise deal is renegotiated from scratch. The error compounds with each
                  contract you sign — and it&apos;s the first thing a serious investor probes.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full sm:w-auto`}
                  >
                    Get a free diagnostic note
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className={`${outlineButton} w-full sm:w-auto`}>
                    Book a free 15-min consult
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Is this for you? */}
          <section className="section">
            <div className="section-shell max-w-3xl">
              <div className="section-header">
                <span className="kicker">Is this for you?</span>
                <h2 className="section-title">Founders and operators come to me when</h2>
              </div>
              <ul className="mt-10 divide-y divide-border-soft border-y border-border-soft">
                {CHALLENGES.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-5">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-text-subtle" aria-hidden />
                    <span className="text-[16px] leading-[1.65] text-text">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-[15px] leading-[1.7] text-text-muted">
                If one of these sounds like you,{' '}
                <Link href={PRIMARY_CTA_HREF} className={`${brandLink} font-medium`}>
                  a free diagnostic note
                </Link>{' '}
                is usually the best place to start.
              </p>
            </div>
          </section>

          {/* Commercial Architecture Diagnostic — anchor tier */}
          <section className="section section-alt">
            <div className="section-shell max-w-5xl">
              <div className="card-dark">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  Anchor offer
                </span>
                <h2 className="mt-5 font-serif-playfair text-white">
                  Commercial Architecture Diagnostic
                </h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-white/80 sm:text-[18px]">
                  A two-week, fixed-fee audit that fixes your pricing, packaging, and unit economics
                  before you scale the sales motion.
                </p>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-soft">
                        Who it&apos;s for
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.7] text-white/75">
                        Founders of AI-infrastructure, API, and deep-tech data-platform companies
                        (Seed–Series B) whose consumption-based economics don&apos;t fit
                        off-the-shelf SaaS pricing advice.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-soft">
                        What you get, in two weeks
                      </h3>
                      <ul className="mt-3 space-y-3">
                        {[
                          { label: 'The right value metric', desc: 'one that tracks both value and cost.' },
                          { label: 'A pricing & packaging recommendation', desc: 'tiers, credits, committed-use, and the price ceiling.' },
                          { label: 'A unit-economics view', desc: 'cost to serve, the margin floor, and which customers actually make money.' },
                          { label: 'A prioritized action list', desc: 'what to change first.' },
                        ].map((item) => (
                          <li key={item.label} className="flex items-start gap-2.5">
                            <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand" />
                            <span className="text-[15px] leading-[1.6] text-white/80">
                              <span className="font-semibold text-white">{item.label}</span>{' '}
                              — {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-soft">
                        How it works
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.7] text-white/75">
                        Free one-page diagnostic note → two-week engagement → a Commercial
                        Architecture memo and a readout call.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="rounded-card border border-white/10 bg-white/5 p-6 sm:p-7 space-y-5">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                          Investment
                        </p>
                        <p className="mt-2 font-serif-playfair text-[36px] font-semibold leading-none text-white">
                          US$10,000
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.6] text-white/60">
                          Fixed fee. 50% to start, 50% on delivery. No hourly billing, no
                          open-ended retainer.
                        </p>
                      </div>

                      <div className="border-t border-white/10 pt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                          Low-risk start
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.65] text-white/70">
                          A free one-page diagnostic note on your pricing first — you see how I
                          think before anything is paid. If the first working session doesn&apos;t
                          surface a pricing or margin issue worth more than the fee, we stop there
                          and you owe nothing.
                        </p>
                      </div>

                      <div className="border-t border-white/10 pt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                          Who runs it
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.65] text-white/70">
                          Sarah Zou, PhD economist and operating COO of an infrastructure data
                          platform. The cost models, pricing memos, and unit-economics work I run
                          for my own company, applied to yours.
                        </p>
                      </div>
                    </div>

                    <Link href={PRIMARY_CTA_HREF} className={`${primaryButton} w-full text-center`}>
                      Start with a free diagnostic note
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ladder — deeper tiers */}
          <section className="section">
            <div className="section-shell">
              <div className="section-header max-w-2xl">
                <span className="kicker">Deeper engagements</span>
                <h2 className="section-title">After the Diagnostic</h2>
                <p className="mt-5 text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  When the commercial question is bigger than the Diagnostic — or when ongoing
                  support is the right model — here are the formats that work.
                </p>
              </div>

              <div className="mt-12 divide-y divide-border-soft border-y border-border-soft">
                {OTHER_PATHS.map((item) => (
                  <article
                    key={item.title}
                    className="grid gap-4 py-7 md:grid-cols-[1.35fr_1fr_auto] md:items-start md:gap-8"
                  >
                    <div>
                      <h3 className="font-serif-playfair text-[22px] leading-[1.25] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[14px] leading-[1.6] text-text-muted">
                        <span className="font-semibold text-ink">Best for: </span>
                        {item.bestFor}
                      </p>
                    </div>
                    <dl className="space-y-4 text-[14px] md:pt-1">
                      <div>
                        <dt className="kicker-muted">Typical scope</dt>
                        <dd className="mt-1 leading-[1.65] text-text">{item.scope}</dd>
                      </div>
                      {item.price && (
                        <div>
                          <dt className="kicker-muted">Starting at</dt>
                          <dd className="mt-1 font-semibold leading-[1.55] text-brand-ink">
                            {item.price}
                          </dd>
                        </div>
                      )}
                    </dl>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-ink hover:text-brand-dark md:justify-self-end md:pt-1"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                ))}
              </div>

              {/* TODO(Sarah): add prices back to the three deeper tiers once confirmed. */}
            </div>
          </section>

          {/* Why founders work with me — verifiable proof block */}
          <section className="section section-alt">
            <div className="section-shell">
              <div className="section-header max-w-2xl">
                <span className="kicker">Why founders work with me</span>
                <h2 className="section-title">
                  Operator context, not outside advice
                </h2>
              </div>

              <div className="mx-auto mt-12 max-w-3xl space-y-6 text-[16px] leading-[1.8] text-text-muted">
                <p>
                  I operate the same kind of company I advise: COO of an infrastructure data
                  platform, pricing against real cost floors and building diligence-ready models —
                  not advising from the outside. Every engagement ends with a specific
                  recommendation and the tradeoffs named, not a 40-page deck. I also publish an
                  openly available{' '}
                  <Link href="/wiki/pricing" className={brandLink}>
                    pricing &amp; monetization wiki
                  </Link>
                  .
                </p>
                <p className="text-[14px] text-text-subtle">
                  {CREDENTIALS.join(' · ')}
                </p>
                {/* TODO(Sarah): add named, linkable client testimonials here when available. */}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section">
            <div className="section-shell">
              <div className="section-header">
                <span className="kicker">What working together looks like</span>
                <h2 className="section-title">A simple process</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {WORK_STEPS.map((item, idx) => (
                  <div key={item.title} className="border-t border-border pt-6">
                    <p className="font-serif-playfair text-[44px] font-semibold leading-none text-ink/20">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-text-muted">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section section-alt">
            <div className="section-shell max-w-3xl">
              <div className="section-header">
                <span className="kicker">FAQ</span>
                <h2 className="section-title">Frequently asked questions</h2>
              </div>
              <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
                {FAQ_ITEMS.map((item) => (
                  <article key={item.qSchema} className="py-5">
                    <h3 className="text-[17px] font-semibold leading-[1.35] text-ink">
                      {item.question}
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-text-muted">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter — just exploring */}
          <section className="section">
            <div className="section-shell max-w-3xl">
              <div className="section-header">
                <span className="kicker">Just exploring?</span>
                <h2 className="section-title">Get the occasional pricing note</h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-text-muted">
                  I publish notes on pricing, unit economics, and commercial strategy for
                  infrastructure founders — no cadence commitment, only when there&apos;s something
                  worth saying.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <iframe
                  src="https://sarahzou.substack.com/embed"
                  width="480"
                  height="150"
                  style={{ border: '1px solid #EEE', background: 'white' }}
                  frameBorder="0"
                  scrolling="no"
                  title="Subscribe to pricing notes"
                  className="max-w-full rounded-card"
                />
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="section-sm">
            <div className="section-shell max-w-4xl">
              <div className="cta-panel">
                <h2 className="font-serif-playfair text-ink">
                  Ready to fix your pricing architecture before you scale?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with a free one-page diagnostic note — no commitment, no pitch. You see how
                  I think before anything is paid.
                </p>
                <div className="mt-8">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Get a free diagnostic note
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <p className="mt-6 text-[13px] text-text-muted">
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    Or book a free 15-min consult →
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Consulting', url: '/consulting' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            url: 'https://sarahzou.com/consulting',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.qSchema,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />
    </>
  )
}
