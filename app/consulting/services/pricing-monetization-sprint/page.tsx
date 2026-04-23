import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import FAQSection from './FAQSection'
import { generateServiceJsonLd } from '@/lib/generateJsonLd'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
  description:
    'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
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
    canonical: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  openGraph: {
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description:
      'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description:
      'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
  },
}

const SERVICE_URL = 'https://sarahzou.com/consulting/services/pricing-monetization-sprint'
const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const SECONDARY_CTA_HREF = '#pricing'

const WHAT_YOU_GET = [
  { lead: 'A pricing model recommendation', rest: 'and the logic behind it' },
  { lead: 'A stronger value metric', rest: 'or meter' },
  { lead: 'A clearer package structure', rest: 'with better upgrade logic' },
  { lead: 'Initial price-point guidance', rest: 'and discount guardrails' },
  { lead: 'A rollout plan', rest: 'with priorities, risks, and next actions' },
  { lead: 'A stronger pricing story', rest: 'for customers, investors, or your team' },
]

const DELIVERABLES = [
  'Pricing recommendation report',
  'Package / tier architecture',
  'Value metric recommendation',
  'Initial price-point guidance',
  'Rollout and experiment plan',
  'Readout with decisions, tradeoffs, and next steps',
]

const WHEN_FOUNDERS_HIRE = [
  { lead: 'You are launching', rest: 'and need a first pricing structure' },
  { lead: 'You have traction', rest: 'but conversion or expansion feels weak' },
  { lead: 'Your packaging is unclear', rest: 'and upgrade paths are muddy' },
  { lead: 'You are debating', rest: 'seat, usage-based, hybrid, or another model' },
  { lead: 'Your current pricing', rest: 'feels patched together' },
  {
    lead: 'You need clearer pricing logic',
    rest: 'for investors, leadership, or internal alignment',
  },
]

const WORKSTREAMS = [
  {
    lead: 'Choose the right pricing model',
    rest: 'for your product and buyers',
    href: '/wiki/pricing/models-and-metering/monetization-model',
    linkLabel: 'pricing model',
  },
  {
    lead: 'Define a value metric',
    rest: 'customers can understand and your team can operate',
    href: '/wiki/pricing/models-and-metering/pricing-metric-value-metric',
    linkLabel: 'value metric',
  },
  {
    lead: 'Structure packages',
    rest: 'and upgrade paths more clearly',
    href: '/wiki/pricing/packaging-and-bundling/packaging',
    linkLabel: 'packaging',
  },
  {
    lead: 'Design good / better / best tiers',
    rest: 'or hybrid monetization logic',
    href: '/wiki/pricing/packaging-and-bundling/good-better-best',
    linkLabel: 'good / better / best',
  },
  {
    lead: 'Set initial price logic',
    rest: 'and discount guardrails',
    href: '/wiki/pricing/value-and-customers/price-fences-price-discrimination',
    linkLabel: 'price fences',
  },
  {
    lead: 'Improve entry-point',
    rest: 'and expansion logic',
    href: '/wiki/pricing/models-and-metering/freemium-model',
    linkLabel: 'freemium entry points',
  },
  {
    lead: 'Plan a re-pricing move',
    rest: 'with less chaos',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'strategic pricing',
  },
  {
    lead: 'Build a rollout plan',
    rest: 'with risks, priorities, and next steps',
    href: '/wiki/pricing/foundations/maximization',
    linkLabel: 'decision framework',
  },
  {
    lead: 'Strengthen the monetization story',
    rest: 'for investors, leadership, or internal alignment',
    href: '/wiki/pricing/value-and-customers/economic-value-estimation',
    linkLabel: 'economic value logic',
  },
]

const INVESTMENT_TIERS = [
  {
    name: 'Lite',
    price: '$5K+',
    desc: 'For founders who need a defendable first pricing structure, a simpler package design, and clear next-step guidance.',
    featured: false,
  },
  {
    name: 'Core',
    price: '$9K+',
    desc: 'For startups that need a broader reset across pricing model, metric, packaging, and initial rollout planning.',
    featured: true,
  },
  {
    name: 'Pro',
    price: '$18K+',
    desc: 'For complex or investor-critical cases that require deeper analysis, more research, multiple segments, or broader rollout planning.',
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
    title: 'Diagnose the real problem',
    desc: 'I review your product, current pricing, goals, and monetization context to identify where the issue really sits.',
  },
  {
    num: '02',
    title: 'Design the structure',
    desc: 'We work through model, value metric, packaging, price logic, and tradeoffs as one connected system.',
  },
  {
    num: '03',
    title: 'Test the decisions',
    desc: 'I stress-test the recommendations against buyer behavior, business-model realities, and likely implementation risks.',
  },
  {
    num: '04',
    title: 'Hand off the plan',
    desc: 'You leave with clear recommendations, implementation priorities, and a practical roadmap for what to do next.',
  },
]

export default function PricingDiagnosticRevenueBoost() {
  const serviceJsonLd = generateServiceJsonLd({
    name: 'Pricing & Monetization Sprint',
    description:
      'Build a pricing structure you can take to market across model, value metric, packaging, price logic, and rollout in 1–2 weeks.',
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
                <span className="kicker-accent">Pricing &amp; Monetization Sprint</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Build a pricing structure you can take to market
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  For AI and SaaS founders who need more than a quick opinion. We work across
                  pricing model, value metric, packaging, price logic, and rollout so your
                  monetization system works together.
                </p>
                <p className="meta-note mt-6">
                  Most founders start with the 90-minute session. The $600 fee is credited toward
                  the sprint within 14 days.
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
                      Launch, re-pricing, weak monetization, or investor decisions
                    </dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Typical scope</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">1–2 weeks</dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Starting at</dt>
                    <dd className="mt-2 text-[15px] font-semibold leading-[1.55] text-brand-ink">
                      $5K
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
                  Focused pricing work that produces decisions you can use
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
                    Some projects are narrower. Some require deeper research.
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
                  Usually the fastest way to tell whether you need one sharp recommendation or a
                  broader pricing reset.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
                <div className="card">
                  <h3 className="font-serif-playfair text-[22px] font-semibold leading-[1.2] text-ink">
                    Start with the session if you need
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-border-soft pt-5">
                    {[
                      'One key pricing decision resolved',
                      'A fast expert recommendation',
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
                      'A full pricing structure, not just a quick opinion',
                      'Model, metric, packaging, and pricing to work together',
                      'A structure you can actually take to market',
                      'A stronger monetization story before launch or fundraise',
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
                If we move into a Pricing &amp; Monetization Sprint within 14 days, the $600 session
                fee is credited toward the project.
              </p>
            </div>
          </section>

          {/* Pricing tiers */}
          <section id="pricing" className="section section-alt scroll-mt-24">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Investment</span>
                <h2 className="mt-3 font-serif-playfair">
                  Sprints start at $5K and scale with complexity
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
                    Pricing problems usually show up in one of two ways: the structure was never
                    strong to begin with, or the company has outgrown something that used to be good
                    enough.
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
                    The sprint is flexible, but usually focuses on the highest-leverage monetization
                    decisions.
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
                  Focused enough to move quickly, rigorous enough not to be vague
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
                Typical scope: 1–2 weeks, depending on complexity.
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
                    making consequential monetization decisions.
                  </p>
                  <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    That means rigorous thinking without academic abstraction, practical
                    founder-facing recommendations, and outputs designed to be used — not admired.
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
                <h2 className="font-serif-playfair text-ink">Need more than one pricing answer?</h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with the 90-Minute Pricing Strategy Session. It&apos;s the fastest way to
                  get a sharp recommendation and move into the sprint intelligently if the problem
                  is broader.
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
                name: 'Should I start with the session or the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with the session if you need clarity on one important pricing decision. Choose the sprint if you already know you need a fuller pricing structure, packaging, and rollout plan.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the session fee credited toward the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. If we move into a Pricing & Monetization Sprint within 14 days, the $600 session fee is credited toward the project.',
                },
              },
              {
                '@type': 'Question',
                name: 'Will this work if we are pre-revenue?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. In many cases this is the right time to design a first pricing structure before habits, discounting, and exceptions harden.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do you need from us to start?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Usually a short intake, product context, current pricing if you have it, and focused founder input on goals, customers, and constraints.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you help after the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Some founders stop after the sprint and execute internally. Others continue into additional support for rollout, testing, or ongoing strategic work.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
