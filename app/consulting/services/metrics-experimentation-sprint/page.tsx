import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import FAQSection from './FAQSection'
import { generateServiceJsonLd } from '@/lib/generateJsonLd'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Growth Economics, Forecasting & Unit Economics Sprint | Sarah Zou',
  description:
    'A focused 1–2 week sprint for AI-native B2B SaaS teams: working KPI system, unit economics model, forecasting logic, and growth narrative that supports pricing decisions and investor-ready commercial narratives.',
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
    canonical: 'https://sarahzou.com/consulting/services/metrics-experimentation-sprint',
  },
  openGraph: {
    title: 'Growth Economics, Forecasting & Unit Economics Sprint | Sarah Zou',
    description:
      'A focused 1–2 week sprint for AI-native B2B SaaS teams: working KPI system, unit economics model, forecasting logic, and growth narrative that supports pricing decisions and investor-ready commercial narratives.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/metrics-experimentation-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Economics, Forecasting & Unit Economics Sprint | Sarah Zou',
    description:
      'A focused 1–2 week sprint for AI-native B2B SaaS teams: working KPI system, unit economics model, forecasting logic, and growth narrative that supports pricing decisions and investor-ready commercial narratives.',
  },
}

const SERVICE_URL = 'https://sarahzou.com/consulting/services/metrics-experimentation-sprint'
const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const SECONDARY_CTA_HREF = '#pricing'

const WHAT_YOU_GET = [
  { lead: 'A working KPI system', rest: 'with metric tree, north star, and thresholds your team will actually use' },
  { lead: 'A unit economics model', rest: 'LTV, CAC, payback period, and gross margin by segment — not generic templates' },
  { lead: 'A forecasting framework', rest: 'cohort-based revenue logic, scenario switches, and investor-readable outputs' },
  { lead: 'A growth narrative', rest: 'the commercial story of where your economics stand and what to fix first' },
]

const DELIVERABLES = [
  'Metric tree and KPI glossary with thresholds',
  'Unit economics model (LTV / CAC / payback / GM by segment)',
  'Rolling forecast workbook with scenario logic',
  'North star definition and decision framework',
  '30-day action plan + follow-up call',
]

const WHEN_FOUNDERS_HIRE = [
  { lead: 'Forecasting feels made up', rest: '— no cohort logic, just spreadsheet guesses that change every quarter' },
  { lead: 'Metrics exist but tell no story', rest: '— numbers without a connected commercial narrative' },
  {
    lead: 'Investor is asking about payback',
    rest: '— and you cannot answer with confidence',
  },
  { lead: 'NRR or CAC looks wrong', rest: '— but you are not sure why or where the leak is' },
  {
    lead: 'You need to model a pricing move',
    rest: '— but there is no unit economics baseline to reason from',
  },
  {
    lead: 'Board deck needs stronger growth economics',
    rest: '— the numbers are there but the story is not',
  },
]

const WORKSTREAMS = [
  {
    lead: 'Define your north star and KPI tree',
    rest: 'with metric definitions and thresholds your team agrees on',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'strategic pricing foundations',
  },
  {
    lead: 'Build a unit economics model',
    rest: 'LTV, CAC, payback, and gross margin by segment',
    href: '/wiki/pricing/value-and-customers/economic-value-estimation',
    linkLabel: 'economic value logic',
  },
  {
    lead: 'Design cohort-based forecasting logic',
    rest: 'so your revenue model is built on real retention and expansion assumptions',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'revenue model logic',
  },
  {
    lead: 'Audit your current metrics setup',
    rest: 'identify data gaps, mismatched definitions, and tracking errors',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'metrics baseline',
  },
  {
    lead: 'Build scenario models',
    rest: 'for pricing moves, CAC shifts, hiring decisions, and growth bets',
    href: '/wiki/pricing/value-and-customers/economic-value-estimation',
    linkLabel: 'scenario planning',
  },
  {
    lead: 'Frame the investor growth narrative',
    rest: 'connect metrics to commercial story in a way investors can follow',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'investor narrative',
  },
]

const INVESTMENT_TIERS = [
  {
    name: 'Lite',
    price: '$6K+',
    desc: 'For early-stage teams needing a minimal KPI loop and a first unit economics model before scaling GTM.',
    featured: false,
  },
  {
    name: 'Core',
    price: '$9K+',
    desc: 'For revenue-stage teams that need aligned metrics, a full unit economics baseline, and a working forecast model.',
    featured: true,
  },
  {
    name: 'Pro',
    price: '$12K+',
    desc: 'For multi-segment or investor-critical cases requiring deeper cohort analysis, complex scenarios, and a board-ready growth narrative.',
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Honestly, we were just guessing on price and our sales team was discounting everything just to hit their numbers. Sarah simplified our tiers and our ACV shot up 40% in two months.',
    author: 'Dayvon, B.',
    role: 'Founder & CEO, Series A SaaS Platform',
  },
  {
    quote:
      "We were stuck on value metric, and Sarah's framework helped a lot. Highly recommend the 90-min session.",
    author: 'Lisa, J.',
    role: 'Co-Founder, Seed AI Developer Tool',
  },
]

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Audit the baseline',
    desc: 'Review existing metrics, data quality, current models, and the business model context that drives your economics.',
  },
  {
    num: '02',
    title: 'Design the framework',
    desc: 'KPI tree and north star, unit economics structure, forecasting logic, and scenario architecture.',
  },
  {
    num: '03',
    title: 'Build the models',
    desc: 'Unit economics model, rolling forecast workbook, scenario logic, and KPI definitions your team will use.',
  },
  {
    num: '04',
    title: 'Hand off and plan',
    desc: 'Full readout, team walkthrough, 30-day plan, and a follow-up call to pressure-test implementation.',
  },
]

export default function GrowthEconomicsSprint() {
  const serviceJsonLd = generateServiceJsonLd({
    name: 'Growth Economics, Forecasting & Unit Economics Sprint',
    description:
      'A focused 1–2 week sprint for AI-native B2B SaaS teams to build a working KPI system, unit economics model, and forecasting logic that supports pricing decisions and investor-ready commercial narratives.',
    url: SERVICE_URL,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="bg-page text-text">
        <main>
          {/* Hero */}
          <section className="bg-hero-tint">
            <div className="section-shell pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-24">
              <div className="section-header max-w-[44rem]">
                <span className="kicker-accent">Growth Economics Sprint</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Build the economics foundation your growth decisions need
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  For AI-native B2B SaaS teams that need a working KPI system, cohort-based
                  forecasting model, and unit economics framework — built to support pricing
                  decisions and investor-ready narratives.
                </p>
                <p className="meta-note mt-6">
                  Most founders start with the 90-minute session. The $600 fee is credited toward
                  either sprint within 14 days.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                  >
                    Book the 90-Minute Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className="display-link">
                    See pricing and scope
                  </Link>
                </div>
                <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 border-t border-border-soft pt-8 text-left sm:grid-cols-3">
                  <div>
                    <dt className="kicker-muted">Best for</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">
                      Messy forecasting, weak unit economics, or investor pressure for growth metrics
                    </dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Typical scope</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">1–2 weeks</dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Starting at</dt>
                    <dd className="mt-2 text-[15px] font-semibold leading-[1.55] text-brand-ink">
                      $6K
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* What you get */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">What you get</span>
                <h2 className="mt-3 font-serif-playfair">
                  Focused growth economics work that produces decisions you can use
                </h2>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="card">
                  <h3 className="font-serif-playfair text-[24px] font-semibold leading-[1.2] text-ink sm:text-[26px]">
                    You leave with
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {WHAT_YOU_GET.map((item) => (
                      <li key={item.lead} className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
                          aria-hidden
                        />
                        <span className="text-[15px] leading-[1.65] text-text">
                          <strong className="text-ink">{item.lead}</strong> {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card">
                  <h3 className="font-serif-playfair text-[24px] font-semibold leading-[1.2] text-ink sm:text-[26px]">
                    Typical deliverables
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {DELIVERABLES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand"
                          aria-hidden
                        />
                        <span className="text-[15px] font-semibold leading-[1.6] text-ink">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-border-soft pt-5 text-[13px] leading-[1.7] text-text-muted">
                    <strong className="text-ink">Note:</strong> Exact deliverables depend on scope.
                    Some projects are narrower. Some require deeper modeling.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Session vs Sprint */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Session or sprint?</span>
                <h2 className="mt-3 font-serif-playfair">
                  Most founders start with the 90-minute session
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  Usually the fastest way to tell whether you need one sharp answer or a full
                  economics rebuild.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
                <div className="card">
                  <h3 className="font-serif-playfair text-[22px] font-semibold leading-[1.2] text-ink">
                    Start with the session if you need
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-border-soft pt-5">
                    {[
                      'One specific KPI or unit economics question resolved',
                      'A fast expert read on your forecasting assumptions',
                      'A lower-risk way to test whether deeper work is needed',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                        <span className="text-[15px] leading-[1.6] text-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-dark">
                  <h3 className="font-serif-playfair text-[22px] font-semibold leading-[1.2] text-white">
                    Move into the sprint if you need
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    {[
                      'A full KPI system, not just a quick metric recommendation',
                      'Unit economics and forecasting to work together as one model',
                      'A structure you can actually present to investors',
                      'A clearer economics narrative before launch or fundraise',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                        <span className="text-[15px] leading-[1.6] text-white/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mx-auto mt-10 max-w-3xl rounded-card border border-brand/20 bg-brand-soft p-5 text-center text-[14px] font-medium leading-[1.65] text-brand-ink">
                If we move into either sprint (Pricing &amp; Monetization or Growth Economics)
                within 14 days, the $600 session fee is credited toward the project.
              </p>
            </div>
          </section>

          {/* Pricing tiers */}
          <section id="pricing" className="section section-alt scroll-mt-24">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Investment</span>
                <h2 className="mt-3 font-serif-playfair">
                  Sprints start at $6K and scale with complexity
                </h2>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
                {INVESTMENT_TIERS.map((tier) => (
                  <div key={tier.name} className={tier.featured ? 'card-dark relative' : 'card'}>
                    {tier.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-on">
                        Most popular
                      </span>
                    )}
                    <p className={tier.featured ? 'kicker-muted text-brand-soft' : 'kicker-muted'}>
                      {tier.name}
                    </p>
                    <p
                      className={`mt-3 font-serif-playfair text-[42px] font-semibold leading-none ${
                        tier.featured ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {tier.price}
                    </p>
                    <p
                      className={`mt-5 text-[14px] leading-[1.65] ${
                        tier.featured ? 'text-white/80' : 'text-text-muted'
                      }`}
                    >
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-[1.7] text-text-muted">
                Not sure which scope fits? Start with the 90-minute session. I&apos;ll tell you
                honestly whether you need the sprint at all.
              </p>
              <div className="mt-5 text-center">
                <Link href={PRIMARY_CTA_HREF} className={outlineButton}>
                  Book the 90-Minute Session
                </Link>
              </div>
            </div>
          </section>

          {/* When founders hire */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr] lg:gap-16">
                <div>
                  <span className="kicker">The trigger</span>
                  <h2 className="mt-3 font-serif-playfair">When founders hire me for this</h2>
                  <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    Growth economics problems tend to surface in one of two ways: the models were
                    never built properly, or the company has outgrown the assumptions it started
                    with.
                  </p>
                </div>
                <div>
                  <p className="kicker-muted mb-5">Common situations</p>
                  <ul className="space-y-4">
                    {WHEN_FOUNDERS_HIRE.map((item) => (
                      <li key={item.lead} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                        <span className="text-[15px] leading-[1.6] text-text">
                          <strong className="text-ink">{item.lead}</strong> {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Workstreams */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-[1fr_1.8fr] lg:gap-16">
                <div>
                  <span className="kicker">Scope</span>
                  <h2 className="mt-3 font-serif-playfair">What we can work on</h2>
                  <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    The sprint is flexible, but always focuses on the economics decisions with the
                    highest leverage for your growth stage.
                  </p>
                </div>
                <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  {WORKSTREAMS.map((item) => (
                    <li
                      key={item.lead}
                      className="flex items-start gap-3 border-b border-border-soft py-3.5"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                      <span className="text-[14px] leading-[1.55] text-text">
                        <strong className="text-ink">{item.lead}</strong> {item.rest}
                        <Link
                          href={item.href}
                          className="ml-1 inline-flex align-middle text-text-subtle transition-colors hover:text-brand-ink"
                          aria-label={`Read more about ${item.linkLabel}`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">How the sprint works</span>
                <h2 className="mt-3 font-serif-playfair">
                  Structured enough to move quickly, rigorous enough to be defensible
                </h2>
              </div>
              <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.title}>
                    <p className="font-serif-playfair text-[40px] font-semibold leading-none text-brand/30">
                      {step.num}
                    </p>
                    <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-text-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-10 inline-flex max-w-fit rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-center text-[13px] font-semibold text-brand-ink">
                Typical scope: 1–2 weeks, depending on complexity and data quality.
              </p>
            </div>
          </section>

          {/* Why hire + testimonials */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
                <div>
                  <span className="kicker">The approach</span>
                  <h2 className="mt-3 font-serif-playfair">Why founders hire me for this work</h2>
                  <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    I work more like a{' '}
                    <strong className="text-ink">fractional Chief Economist</strong> for startups
                    making consequential growth decisions — not an analyst building dashboards for
                    their own sake.
                  </p>
                  <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    The goal is always the same: economics that inform decisions, not reports that
                    sit in a folder.
                  </p>
                </div>
                <div>
                  <span className="kicker">What founders say</span>
                  <div className="mt-5 space-y-5">
                    {TESTIMONIALS.map((item) => (
                      <figure key={item.author} className="card">
                        <blockquote className="font-serif-playfair text-[18px] italic leading-[1.55] text-ink">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-5 text-[13px] text-text-muted">
                          <p className="font-semibold text-ink">{item.author}</p>
                          <p>{item.role}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="kicker">FAQ</span>
                <h2 className="mt-3 font-serif-playfair">Frequently asked questions</h2>
              </div>
              <div className="mt-10">
                <FAQSection />
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="section-sm">
            <div className="section-shell max-w-4xl">
              <div className="cta-panel">
                <h2 className="font-serif-playfair text-ink">
                  Need more than one growth economics answer?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with the 90-Minute Commercial Strategy Session. It&apos;s the fastest way
                  to get a sharp recommendation and move into the sprint intelligently if the
                  problem is broader.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Book the Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/book" className={outlineButton}>
                    Book a free consult
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            url: SERVICE_URL,
            mainEntity: [
              {
                '@type': 'Question',
                name: 'When should I start with the 90-minute session vs. the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with the session if you have one specific metrics or unit economics question in motion. Choose the sprint if you know you need a fuller KPI system, forecasting model, and unit economics baseline.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the $600 session fee credited toward this sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. If we move into either the Growth Economics Sprint or the Pricing & Monetization Sprint within 14 days, the $600 session fee is credited toward the project.',
                },
              },
              {
                '@type': 'Question',
                name: 'We have almost no data. Will this still work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Part of the sprint is installing the right minimal metric system so you can make decisions immediately — before you have perfect data.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need the Pricing & Monetization Sprint before this one?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not necessarily. The two sprints are complementary but independent. Many founders do the Growth Economics Sprint first to build the unit economics foundation, then use the Pricing Sprint to design the monetization structure on top.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does the sprint take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typically 1–2 weeks depending on complexity, existing data quality, and how many segments or scenarios we need to model.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
