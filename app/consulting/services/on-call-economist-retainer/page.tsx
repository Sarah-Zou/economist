import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import FAQSection from './FAQSection'
import { generateServiceJsonLd } from '@/lib/generateJsonLd'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Fractional or Embedded Commercial Strategy Support | Sarah Zou',
  description:
    'Ongoing commercial strategy support for AI-native B2B SaaS teams — pricing, monetization, GTM economics, forecasting, unit economics, and board prep without hiring a full-time strategy or finance leader before you need one.',
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
    canonical: 'https://sarahzou.com/consulting/services/on-call-economist-retainer',
  },
  openGraph: {
    title: 'Fractional or Embedded Commercial Strategy Support | Sarah Zou',
    description:
      'Ongoing commercial strategy support for AI-native B2B SaaS teams — pricing, monetization, GTM economics, forecasting, unit economics, and board prep without hiring a full-time strategy or finance leader before you need one.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/on-call-economist-retainer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional or Embedded Commercial Strategy Support | Sarah Zou',
    description:
      'Ongoing commercial strategy support for AI-native B2B SaaS teams — pricing, monetization, GTM economics, forecasting, unit economics, and board prep without hiring a full-time strategy or finance leader before you need one.',
  },
}

const SERVICE_URL = 'https://sarahzou.com/consulting/services/on-call-economist-retainer'
const PRIMARY_CTA_HREF = '/book'
const SECONDARY_CTA_HREF = '#pricing'

const WHAT_YOU_GET = [
  {
    lead: 'Pricing moves shipped monthly',
    rest: 'price/packaging experiments and adjustments with guardrails and rollback logic',
  },
  {
    lead: 'Updated forward models',
    rest: 'cohort LTV, NRR and GM bridges, and cash/runway scenarios — refreshed each month',
  },
  {
    lead: "Economist's Board Pack",
    rest: 'a monthly KPI story, pricing changes, and risk narrative ready for investors or the board',
  },
  {
    lead: 'A learning loop',
    rest: 'experiment readouts that connect directly to next bets, with MDE and stop rules',
  },
]

const DELIVERABLES = [
  "Economist's Board Pack (KPI story, NRR/GM bridges, pricing changes, risks)",
  'Pricing update (price bands, fences, discount policy, rollout)',
  'Experiment docket (2–4 briefs/month with MDE, guardrails, stop rules)',
  'Forecast workbook (rolling 12–18 mo, hiring/capital scenarios)',
  'Decision log (what we decided, why, owner, next check)',
]

const WHEN_FOUNDERS_HIRE = [
  {
    lead: 'Sprint work is done',
    rest: '— now needs someone to run the ongoing cadence and keep models current',
  },
  {
    lead: 'Commercial decisions are coming weekly',
    rest: '— pricing, discount requests, packaging questions, investor follow-ups',
  },
  {
    lead: 'Board needs ongoing economic narrative',
    rest: '— monthly KPI story, NRR bridge, and forward model update',
  },
  {
    lead: 'Pricing experiments need someone to own them',
    rest: '— design, launch, monitor, and read out results',
  },
  {
    lead: 'Pre-fundraise',
    rest: '— needs investor-ready metrics, narratives, and diligence support on a reliable cadence',
  },
  {
    lead: 'Not ready to hire full-time',
    rest: '— but the commercial complexity has outgrown ad-hoc help',
  },
]

const INVESTMENT_TIERS = [
  {
    name: 'Starter',
    price: '$4K',
    per: '/mo',
    commitment: '≈ 0.5 d/wk',
    desc: 'Guidance and cadence for early-stage teams making regular commercial decisions before or after a fundraise.',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$8K',
    per: '/mo',
    commitment: '≈ 1 d/wk',
    desc: 'Active pricing experiments, ongoing forecast maintenance, and monthly board-ready narrative.',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$15K',
    per: '/mo',
    commitment: '≈ 2 d/wk',
    desc: 'Complex monetization, multi-segment modeling, and full active fundraise support.',
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
    title: 'Scope and access',
    desc: 'Align on priorities, cadence, and tools. I get context on your pricing, metrics, and commercial questions in motion.',
  },
  {
    num: '02',
    title: 'Baseline review',
    desc: 'First metrics audit, pricing review, and model foundation — so every subsequent month builds on solid ground.',
  },
  {
    num: '03',
    title: 'First quick win',
    desc: 'A first pricing move or experiment, the first Board Pack, and the initial forecast model — usually by end of week 2.',
  },
  {
    num: '04',
    title: 'Ongoing cadence',
    desc: 'Weekly or bi-weekly decision stand-up, monthly Board Pack + forecast update, quarterly pricing reset.',
  },
]

const SCOPE_AREAS = [
  {
    area: 'Pricing & revenue',
    items: [
      'Quarterly price/pack refresh, discount guardrails, and elasticity updates',
      'Monetization experiments: price points, value metric, plan fences',
    ],
  },
  {
    area: 'Forecasting & unit economics',
    items: [
      'Rolling 12–18 month forecast with NRR/GM waterfalls and scenario planning',
      'Cohort LTV, CAC payback, and burn/runway models updated monthly',
    ],
  },
  {
    area: 'Experiments',
    items: [
      'Bi-weekly cadence: briefs with hypothesis, MDE, guardrails, and stop rules',
      'Readouts with next-bet recommendations',
    ],
  },
  {
    area: 'Board & investor prep',
    items: [
      'Monthly narrative framing, KPI story, and talking points',
      'Diligence support, FAQ prep, and investor-facing model review',
    ],
  },
]

export default function FractionalChiefEconomistRetainer() {
  const serviceJsonLd = generateServiceJsonLd({
    name: 'Fractional or Embedded Commercial Strategy Support',
    description:
      'Ongoing commercial strategy support across pricing, monetization, GTM economics, forecasting, unit economics, and board prep for AI-native B2B SaaS teams — without the full-time overhead.',
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
                <span className="kicker-accent">Fractional &amp; Embedded Support</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Senior commercial strategy, without the full-time overhead
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  Ongoing support across pricing, monetization, GTM economics, forecasting, unit
                  economics, and board prep — at a cadence that matches your growth stage.
                </p>
                <p className="meta-note mt-6">
                  Most teams start with the 90-minute session or a sprint. Retainer clients get
                  priority access and a dedicated monthly cadence.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                  >
                    Book a Free Consult
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className="display-link">
                    See plans and pricing
                  </Link>
                </div>
                <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 border-t border-border-soft pt-8 text-left sm:grid-cols-3">
                  <div>
                    <dt className="kicker-muted">Best for</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">
                      Post-sprint teams, active fundraise prep, or weekly commercial decisions
                    </dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Engagement type</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">Ongoing monthly</dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Starting at</dt>
                    <dd className="mt-2 text-[15px] font-semibold leading-[1.55] text-brand-ink">
                      $4K/mo
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
                  A commercial economist in your corner every month
                </h2>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <div className="card">
                  <h3 className="font-serif-playfair text-[24px] font-semibold leading-[1.2] text-ink sm:text-[26px]">
                    Monthly outputs
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
                    Core deliverables
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
                    <strong className="text-ink">Note:</strong> Exact deliverables depend on tier
                    and active priorities each month.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing tiers */}
          <section id="pricing" className="section scroll-mt-24">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Plans</span>
                <h2 className="mt-3 font-serif-playfair">Engagement scales with your complexity</h2>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
                {INVESTMENT_TIERS.map((tier) => (
                  <div key={tier.name} className={tier.featured ? 'card-dark relative' : 'card'}>
                    {tier.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-on">
                        Most common
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
                      <span
                        className={`ml-1 text-[18px] font-normal ${
                          tier.featured ? 'text-white/60' : 'text-text-muted'
                        }`}
                      >
                        {tier.per}
                      </span>
                    </p>
                    <p
                      className={`mt-1 text-[13px] font-semibold ${
                        tier.featured ? 'text-brand-soft' : 'text-brand-ink'
                      }`}
                    >
                      {tier.commitment}
                    </p>
                    <p
                      className={`mt-4 text-[14px] leading-[1.65] ${
                        tier.featured ? 'text-white/80' : 'text-text-muted'
                      }`}
                    >
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-[1.7] text-text-muted">
                Unsure which tier fits? Book the free consult. We&apos;ll discuss your growth stage
                and commercial complexity to find the right level of engagement.
              </p>
              <div className="mt-5 text-center">
                <Link href={PRIMARY_CTA_HREF} className={outlineButton}>
                  Book a Free Consult
                </Link>
              </div>
            </div>
          </section>

          {/* When founders hire */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr] lg:gap-16">
                <div>
                  <span className="kicker">The trigger</span>
                  <h2 className="mt-3 font-serif-playfair">When founders hire me for this</h2>
                  <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    Usually, the commercial complexity has outgrown what a founder can manage alone
                    — and it&apos;s not yet the right time to hire a full-time CFO or Head of
                    Strategy.
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

          {/* Scope areas */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-[1fr_1.8fr] lg:gap-16">
                <div>
                  <span className="kicker">Scope</span>
                  <h2 className="mt-3 font-serif-playfair">What I own each month</h2>
                  <p className="mt-5 max-w-md text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    The retainer is structured around the commercial decisions that matter most —
                    not a fixed list of deliverables that may or may not be relevant.
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {SCOPE_AREAS.map((area) => (
                    <div key={area.area} className="border-t border-border-soft pt-5">
                      <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-ink">
                        {area.area}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {area.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                            <span className="text-[14px] leading-[1.6] text-text-muted">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Onboarding</span>
                <h2 className="mt-3 font-serif-playfair">
                  Up and running within two weeks
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
                First Board Pack and forecast model delivered by end of week 2.
              </p>
            </div>
          </section>

          {/* Why hire + testimonials */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
                <div>
                  <span className="kicker">The approach</span>
                  <h2 className="mt-3 font-serif-playfair">Why founders hire me for this work</h2>
                  <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    I work more like a{' '}
                    <strong className="text-ink">fractional Chief Economist</strong> embedded in
                    your commercial decisions — not a consultant who shows up for a one-off project
                    and disappears.
                  </p>
                  <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    The retainer is designed for founders who need someone thinking about
                    monetization, metrics, and growth economics continuously — not episodically.
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

          {/* How this fits with sprints */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">How it fits together</span>
                <h2 className="mt-3 font-serif-playfair">
                  Sprints set the foundation. The retainer keeps it running.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  Many founders start with a sprint or the 90-minute session, then move into the
                  retainer once they know the work is ongoing.
                </p>
              </div>
              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
                {[
                  {
                    label: 'Pricing & Monetization Sprint',
                    desc: 'Sets the pricing structure, value metric, packaging, and rollout plan.',
                    href: '/consulting/services/pricing-monetization-sprint',
                  },
                  {
                    label: 'Growth Economics Sprint',
                    desc: 'Installs the KPI system, unit economics model, and forecasting logic.',
                    href: '/consulting/services/metrics-experimentation-sprint',
                  },
                  {
                    label: 'Retainer',
                    desc: 'Keeps the machine honest: iterate pricing, run experiments, maintain forward models, stay investor-ready.',
                    href: '/consulting/services/on-call-economist-retainer',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className={idx === 2 ? 'card-dark' : 'card border-border-soft'}
                  >
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        idx === 2 ? 'text-brand-soft' : 'text-text-subtle'
                      }`}
                    >
                      {idx === 0 ? 'Sprint 1' : idx === 1 ? 'Sprint 2' : 'Retainer'}
                    </p>
                    <h3
                      className={`mt-3 font-serif-playfair text-[20px] font-semibold leading-[1.25] ${
                        idx === 2 ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p
                      className={`mt-3 text-[14px] leading-[1.65] ${
                        idx === 2 ? 'text-white/75' : 'text-text-muted'
                      }`}
                    >
                      {item.desc}
                    </p>
                    <Link
                      href={item.href}
                      className={`mt-5 inline-flex items-center gap-1 text-[13px] font-semibold underline underline-offset-4 transition-colors ${
                        idx === 2
                          ? 'text-brand-soft decoration-brand-soft/40 hover:text-white'
                          : 'text-brand-ink decoration-brand/40 hover:text-brand-dark'
                      }`}
                    >
                      Learn more
                    </Link>
                  </div>
                ))}
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
                  Ready to explore an ongoing engagement?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Book the free consult to discuss scope, cadence, and whether a retainer is the
                  right fit given your growth stage and commercial complexity.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Book a Free Consult
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href="/consulting" className={outlineButton}>
                    See all services
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
                name: 'Do I need to complete a sprint before starting the retainer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not required, but many founders start with the Pricing or Growth Economics Sprint, then move into the retainer to keep the machine running. If you skip the sprint, the first month includes an onboarding baseline that covers similar ground.',
                },
              },
              {
                '@type': 'Question',
                name: "What's the difference between Starter, Growth, and Scale?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Time, attention, and depth. Starter (~0.5 d/wk, $4k/mo) provides guidance and cadence. Growth (~1 d/wk, $8k/mo) runs active pricing experiments. Scale (~2 d/wk, $15k/mo) handles complex monetization, multi-segment modeling, and active fundraise prep.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can we upgrade, downgrade, or pause?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Plans are flexible as your needs change — for example, ramping up pre-fundraise, stepping down post-launch, or pausing during a quiet quarter.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does onboarding look like?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Weeks 0–2: scope & access → baseline metrics review → first pricing/test move → first Economist\'s Board Pack. Most teams are fully up and running by the end of week 2.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you work with our existing tools and teams?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The retainer cadence includes touch points with Marketing/Sales, Product/Data, and Finance/Planning as needed.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
