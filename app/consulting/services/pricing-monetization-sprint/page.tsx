import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import FAQSection from './FAQSection'
import { generateServiceWithOffersJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Pricing & Monetization Sprint for AI-Infrastructure & Data Platforms | Sarah Zou',
  description:
    'Build a pricing architecture for a technically complex product. For founders of AI-infrastructure, API, and data-platform companies (Seed–Series B) needing pricing model, value metric, packaging, and rollout guidance in one focused sprint.',
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
    title: 'Pricing & Monetization Sprint for AI-Infrastructure & Data Platforms | Sarah Zou',
    description:
      'Build a pricing architecture for a technically complex product. For founders of AI-infrastructure, API, and data-platform companies (Seed–Series B) needing pricing model, value metric, packaging, and rollout guidance in one focused sprint.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Sprint for AI-Infrastructure & Data Platforms | Sarah Zou',
    description:
      'Build a pricing architecture for a technically complex product. For founders of AI-infrastructure, API, and data-platform companies (Seed–Series B) needing pricing model, value metric, packaging, and rollout guidance in one focused sprint.',
  },
}

const SERVICE_URL = 'https://sarahzou.com/consulting/services/pricing-monetization-sprint'
const PRIMARY_CTA_HREF = '/diagnostic-note'
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
  {
    lead: 'You are launching',
    rest: 'and need a first pricing architecture — usage-based, credit-based, committed-use, or hybrid — built on your actual cost structure',
  },
  {
    lead: 'You have traction',
    rest: 'but your pricing model is misaligned with how technical buyers evaluate and adopt your product',
  },
  {
    lead: 'Your packaging is unclear',
    rest: 'and you need a paid-pilot or expansion structure that works for infrastructure buyers',
  },
  {
    lead: 'You are debating',
    rest: 'usage-based vs credit-based vs committed-use vs hybrid — and need cost-floor logic, not a template',
  },
  {
    lead: 'Your current pricing',
    rest: 'was designed for SaaS but your product is infrastructure or a data platform — the model needs to match',
  },
  {
    lead: 'You need clearer pricing logic',
    rest: 'for investors, customers, or internal alignment on a technically complex product',
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
  const serviceJsonLd = generateServiceWithOffersJsonLd({
    name: 'Pricing & Monetization Sprint',
    description:
      'Build a pricing architecture for a technically complex product across model, value metric, packaging, cost-floor logic, and rollout in 1–2 weeks.',
    url: SERVICE_URL,
    offers: [
      {
        name: 'Lite',
        price: 5000,
        description: 'Defendable first pricing structure and package design.',
      },
      {
        name: 'Core',
        price: 9000,
        description: 'Broader reset across model, metric, packaging, and rollout.',
      },
      {
        name: 'Pro',
        price: 18000,
        description: 'Complex or investor-critical pricing with deeper analysis.',
      },
    ],
  })
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Consulting', url: '/consulting' },
    {
      name: 'Pricing & Monetization Sprint',
      url: '/consulting/services/pricing-monetization-sprint',
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="consulting-editorial bg-page text-text">
        <main>
          {/* Hero */}
          <section className="bg-hero-tint">
            <div className="section-shell pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-24">
              <div className="section-header max-w-[44rem]">
                <span className="kicker-accent">Pricing &amp; Monetization Sprint</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Build a pricing architecture your technical buyers can adopt and your investors
                  can underwrite
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  For founders of AI-infrastructure, API, and data-platform companies (Seed–Series
                  B) who need more than a quick opinion. We work across pricing model, value metric,
                  packaging, price logic, and rollout — built for products where generic SaaS
                  frameworks fall short.
                </p>
                <p className="meta-note mt-6">
                  The usual path: a free one-page diagnostic note, then the Commercial Architecture
                  Diagnostic to set direction, then this sprint to build and roll out the structure.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                  >
                    Request a free diagnostic note
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

          {/* Diagnostic or Sprint */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Diagnostic or sprint?</span>
                <h2 className="mt-3 font-serif-playfair">
                  Most founders start with a free diagnostic note
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  The free one-page note and the two-week{' '}
                  <Link
                    href="/consulting"
                    className="font-semibold text-brand-ink underline decoration-brand/40 underline-offset-4 hover:text-brand-dark"
                  >
                    Commercial Architecture Diagnostic
                  </Link>{' '}
                  set the direction. This sprint is where you build and roll out the full structure.
                </p>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
                <div className="card">
                  <h3 className="font-serif-playfair text-[22px] font-semibold leading-[1.2] text-ink">
                    Start with the Diagnostic if you need
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-border-soft pt-5">
                    {[
                      'Direction on value metric, pricing, and unit economics',
                      'A prioritized action list of what to fix first',
                      'A lower-risk way to see how I think before a larger build',
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
                    Move into this sprint if you need
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                    {[
                      'The full pricing structure built, not just the direction set',
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
                Not sure yet? Start with a free one-page diagnostic note — you see how I think
                before anything is paid.
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
                Not sure which scope fits? Start with a free one-page diagnostic note. I&apos;ll
                tell you honestly whether you need the sprint at all.
              </p>
              <div className="mt-5 text-center">
                <Link href={PRIMARY_CTA_HREF} className={outlineButton}>
                  Request a free diagnostic note
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
                  <figure className="mt-8 max-w-[480px]">
                    <div className="relative aspect-[3/2] overflow-hidden bg-page">
                      <Image
                        src="/images/service-pricing-session-v3.webp"
                        alt="An East Asian woman and a client comparing pricing structures"
                        fill
                        sizes="(min-width: 768px) 420px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                      A working session focused on the pricing decision
                    </figcaption>
                  </figure>
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

          {/* Why hire */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <span className="kicker">The approach</span>
                <h2 className="mt-3 font-serif-playfair">Why founders hire me for this work</h2>
                <p className="mt-6 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                  I operate the same kind of company I advise — COO of an infrastructure data
                  platform, pricing against real cost floors and building diligence-ready models. So
                  the work is rigorous without academic abstraction, the recommendations are
                  practical and founder-facing, and the outputs are designed to be used — not
                  admired.
                </p>
                {/* TODO(Sarah): add named, linkable client testimonials here when available. */}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
              <div>
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
                <h2 className="font-serif-playfair text-ink">Ready to build the full structure?</h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with a free one-page diagnostic note. You see how I think before anything is
                  paid — and we move into the sprint intelligently once the direction is set.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Request a free diagnostic note
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/book" className={outlineButton}>
                    Book a free 15-min consult
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
                name: 'Should I start with the Diagnostic or the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most founders start with a free one-page diagnostic note, then the two-week Commercial Architecture Diagnostic to set direction. This sprint is the follow-on where you build and roll out the full pricing structure, packaging, and rollout plan.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I start?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with a free one-page diagnostic note on your pricing. You see how I think before anything is paid, and we move into the sprint once the direction is clear.',
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
