import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import FAQSection from './FAQSection'
import { generateServiceWithOffersJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Ongoing Advisory for Infrastructure & Data-Platform Founders | Sarah Zou',
  description:
    'Ongoing advisory for AI-infrastructure, API, and data-platform founders: pricing moves, forward models, cost-floor analysis, and board-facing economics on a monthly cadence.',
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
    title: 'Ongoing Advisory for Infrastructure & Data-Platform Founders | Sarah Zou',
    description:
      'Ongoing advisory for AI-infrastructure, API, and data-platform founders: pricing moves, forward models, cost-floor analysis, and board-facing economics on a monthly cadence.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/on-call-economist-retainer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ongoing Advisory for Infrastructure & Data-Platform Founders | Sarah Zou',
    description:
      'Ongoing advisory for AI-infrastructure, API, and data-platform founders: pricing moves, forward models, cost-floor analysis, and board-facing economics on a monthly cadence.',
  },
}

const SERVICE_URL = 'https://sarahzou.com/consulting/services/on-call-economist-retainer'
const PRIMARY_CTA_HREF = '/diagnostic-note'
const CONSULT_CTA_HREF = '/book'
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
    lead: 'Build work is done',
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
    lead: 'Commercial decisions arrive weekly',
    rest: '— and the commercial complexity has outgrown ad-hoc help',
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
  const serviceJsonLd = generateServiceWithOffersJsonLd({
    name: 'Ongoing Advisory',
    description:
      'Ongoing advisory across pricing moves, forward models, cost-floor analysis, and board-facing economics for infrastructure and data-platform founders.',
    url: SERVICE_URL,
    offers: [{ name: 'Ongoing Advisory', price: 9000, description: 'Monthly cadence across pricing moves, forward models, and board-facing economics.' }],
  })

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Consulting', url: '/consulting' },
    {
      name: 'Ongoing Advisory',
      url: '/consulting/services/on-call-economist-retainer',
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
                <span className="kicker-accent">Ongoing Advisory</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Commercial strategy at operating cadence
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  Ongoing support across pricing architecture, GTM for technical buyers, unit
                  economics, cost-floor modeling, and board prep — for founders of
                  AI-infrastructure, API, and data-platform companies (Seed–Series B) at any growth
                  stage.
                </p>
                <p className="meta-note mt-6">
                  Most teams start with a free diagnostic note or a Build. Ongoing advisory clients get
                  priority access and a dedicated monthly cadence.
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
                    See plans and pricing
                  </Link>
                </div>
                <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-6 border-t border-border-soft pt-8 text-left sm:grid-cols-3">
                  <div>
                    <dt className="kicker-muted">Best for</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">
                      Post-Build teams, active fundraise prep, or weekly commercial decisions
                    </dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Engagement type</dt>
                    <dd className="mt-2 text-[15px] leading-[1.55] text-ink">Ongoing monthly</dd>
                  </div>
                  <div>
                    <dt className="kicker-muted">Monthly fee</dt>
                    <dd className="mt-2 text-[15px] font-semibold leading-[1.55] text-brand-ink">
                      $9,000/month
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

          {/* Investment */}
          <section id="pricing" className="section scroll-mt-24">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Ongoing advisory</span>
                <h2 className="mt-3 font-serif-playfair">A single monthly engagement</h2>
              </div>

              <div className="mx-auto mt-12 max-w-3xl"><div className="card"><p className="font-serif-playfair text-[42px] font-semibold leading-none text-ink">$9,000/month</p><p className="mt-3 text-[14px] font-semibold text-brand-ink">Three-month minimum. Two client seats at a time.</p><p className="mt-5 text-[15px] leading-[1.7] text-text-muted">Monthly cadence across pricing moves, forward models, and board-facing economics, for teams making commercial decisions weekly or running an active fundraise.</p></div><p className="mt-7 text-center text-[15px] leading-[1.7] text-text-muted">Deeper embedded work — multi-segment monetization, complex cost structures, full fundraise support — is available for a small number of teams. That scope is set by conversation.</p></div>
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
                    and now calls for a consistent operating cadence.
                  </p>
                  <figure className="mt-8 max-w-[480px]">
                    <div className="relative aspect-[3/2] overflow-hidden bg-page">
                      <Image
                        src="/images/service-embedded-advisory-v3.webp"
                        alt="An East Asian woman and a client in an ongoing strategy session"
                        fill
                        sizes="(min-width: 768px) 420px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                      Ongoing advisory, close to the operating cadence
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
                            <span className="text-[14px] leading-[1.6] text-text-muted">
                              {item}
                            </span>
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
                <h2 className="mt-3 font-serif-playfair">Up and running within two weeks</h2>
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

          {/* Why hire */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <span className="kicker">The approach</span>
                <h2 className="mt-3 font-serif-playfair">Why founders hire me for this work</h2>
                <p className="mt-6 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                  Ongoing advisory keeps commercial context intact across pricing moves, forecast
                  revisions, and board-facing economics. It is designed for founders who need those
                  decisions to hold together continuously, not episodically.
                </p>
                {/* TODO(Sarah): add named, linkable client testimonials here when available. */}
              </div>
            </div>
          </section>

          {/* How this fits with the Diagnostic and Builds */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">How it fits together</span>
                <h2 className="mt-3 font-serif-playfair">
                  The Diagnostic and Builds set the foundation. Ongoing advisory keeps it running.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  Many founders start with a free diagnostic note, then the Commercial Architecture
                  Diagnostic, then a Build when structural work is needed before ongoing advisory.
                </p>
              </div>
              <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-4">
                {[
                  {
                    label: 'Commercial Architecture Diagnostic',
                    desc: 'Sets the commercial direction before a deeper engagement.',
                    href: '/consulting#commercial-architecture-diagnostic',
                  },
                  {
                    label: 'Pricing & Monetization Build',
                    desc: 'Sets the pricing structure, value metric, packaging, and rollout plan.',
                    href: '/consulting/services/pricing-monetization-sprint',
                  },
                  {
                    label: 'Growth Economics Build',
                    desc: 'Installs the KPI system, unit economics model, and forecasting logic.',
                    href: '/consulting/services/metrics-experimentation-sprint',
                  },
                  {
                    label: 'Ongoing advisory',
                    desc: 'Keeps the machine honest: iterate pricing, run experiments, maintain forward models, stay investor-ready.',
                    href: '/consulting/services/on-call-economist-retainer',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.label}
                    className={idx === 3 ? 'card-dark' : 'card border-border-soft'}
                  >
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                        idx === 3 ? 'text-brand-soft' : 'text-text-subtle'
                      }`}
                    >
                      {idx === 0 ? 'Diagnostic' : idx === 1 ? 'Build 1' : idx === 2 ? 'Build 2' : 'Ongoing'}
                    </p>
                    <h3
                      className={`mt-3 font-serif-playfair text-[20px] font-semibold leading-[1.25] ${
                        idx === 3 ? 'text-white' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p
                      className={`mt-3 text-[14px] leading-[1.65] ${
                        idx === 3 ? 'text-white/75' : 'text-text-muted'
                      }`}
                    >
                      {item.desc}
                    </p>
                    <Link
                      href={item.href}
                      className={`mt-5 inline-flex items-center gap-1 text-[13px] font-semibold underline underline-offset-4 transition-colors ${
                        idx === 3
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
                <h2 className="font-serif-playfair text-ink">
                  Ready to explore an ongoing engagement?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with a free one-page diagnostic note, or book a 15-min consult to discuss
                  scope, cadence, and whether a retainer is the right fit given your growth stage
                  and commercial complexity.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Request a free diagnostic note
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={CONSULT_CTA_HREF} className={outlineButton}>
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
                name: 'Do I need to complete a Build before starting ongoing advisory?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Not required, but many founders start with the Commercial Architecture Diagnostic and a Build, then move into ongoing advisory to keep the work current.',
                },
              },
              {
                '@type': 'Question',
                name: 'What determines whether ongoing advisory is the right format?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cadence. If the commercial decisions are episodic, a Build is the better structure. If they arrive weekly — pricing exceptions, packaging questions, investor follow-ups, forecast revisions — ongoing advisory is cheaper than rebuilding context every quarter.',
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
                  text: "Weeks 0–2: scope & access → baseline metrics review → first pricing/test move → first Economist's Board Pack. Most teams are fully up and running by the end of week 2.",
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
