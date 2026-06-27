import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'
import { OG_IMAGE_HOME } from '@/lib/seo'

const PRIMARY_CTA_HREF = '/diagnostic-note'
const SECONDARY_CTA_HREF = '/book'

const decisionFocus = [
  'Pricing architecture',
  'Usage & credit-based pricing',
  'Value metric selection',
  'GTM for technical buyers',
  'Unit economics & cost floors',
  'Fundraising-ready models',
]

const credentials = [
  'PhD Economics, Rutgers',
  'MS Finance & Statistics, UIUC',
  'NBER & World Bank research',
  'Former Citigroup & Capgemini',
]

const otherEngagements = [
  {
    label: 'Pricing & Monetization Sprint',
    sub: 'Full pricing structure, packaging, and rollout plan',
    href: '/consulting/services/pricing-monetization-sprint',
  },
  {
    label: 'Growth Economics, Forecasting & Unit Economics',
    sub: 'Revenue model logic, KPI design, forward models, and investor-ready assumptions',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    label: 'Fractional or Embedded Strategy Support',
    sub: 'Ongoing commercial strategy, monetization, and board-facing economics',
    href: '/consulting/services/on-call-economist-retainer',
  },
]

const faqItems = [
  {
    q: 'What kinds of commercial questions do you work on?',
    a: (
      <>
        Pricing architecture, value-metric selection, usage/credit/committed-use model design, GTM
        for technical buyers, paid pilot structuring, unit economics and gross-margin logic for
        API/infra/hardware-software products, cost-floor modeling, and fundraising-ready commercial
        narratives. Read more{' '}
        <Link href="/about" className={brandLink}>
          about the practice
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How should I start?',
    a: (
      <>
        Most founders start with a free one-page diagnostic note — the lowest-risk way to see how I
        think before anything is paid. From there, the two-week Commercial Architecture Diagnostic
        is the usual next step. If you already know the work is broader, a deeper sprint may fit.{' '}
        <Link href="/diagnostic-note" className={brandLink}>
          Request a free note →
        </Link>
      </>
    ),
  },
  {
    q: 'What does it cost?',
    a: (
      <>
        The Commercial Architecture Diagnostic is a fixed fee of US$6,000, and it starts with a
        free one-page diagnostic note. Deeper engagements — the Pricing &amp; Monetization Sprint
        and Growth Economics, Forecasting &amp; Unit Economics — are fixed-fee; ongoing support
        starts at US$4K/month.
      </>
    ),
  },
]

export const metadata: Metadata = {
  title:
    'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou, PhD',
  description:
    'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed–Series B). Start with a free one-page diagnostic note.',
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
    canonical: 'https://sarahzou.com',
  },
  openGraph: {
    title:
      'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou, PhD',
    description:
      'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed–Series B). Start with a free one-page diagnostic note.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: [OG_IMAGE_HOME],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou, PhD',
    description:
      'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed–Series B). Start with a free one-page diagnostic note.',
    images: [OG_IMAGE_HOME],
  },
}

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: 'https://sarahzou.com',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kinds of commercial questions do you work on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pricing architecture, value-metric selection, usage/credit/committed-use model design, GTM for technical buyers, paid pilot structuring, unit economics and gross-margin logic for API/infrastructure/hardware-software products, cost-floor modeling, and fundraising-ready commercial narratives.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most founders start with a free one-page diagnostic note — the lowest-risk way to see how I think before anything is paid. From there, the two-week Commercial Architecture Diagnostic is the usual next step. If you already know the work is broader, a deeper sprint may fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Commercial Architecture Diagnostic is a fixed fee of US$6,000, and it starts with a free one-page diagnostic note. Deeper engagements are fixed-fee; ongoing support starts at US$4K/month.',
        },
      },
    ],
  }

  return (
    <>
      <div className="bg-page text-text">
        {/* Hero */}
        <section className="bg-hero-tint">
          <div className="section-shell pb-20 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-14 xl:gap-20">
              <div className="order-1">
                <span className="kicker-accent">Pricing · GTM · Unit Economics</span>

                <h1 className="mt-5 max-w-[54rem] font-serif-playfair text-ink">
                  Pricing and commercial-model strategy for AI-infrastructure and data-platform
                  companies.
                </h1>

                <p className="lede mt-7 max-w-[39rem]">
                  I help technical founders turn consumption-shaped pricing, unit economics, and GTM
                  into decisions they can defend — to buyers and to investors. Built by an economist
                  who operates an infrastructure company, not a generic SaaS consultant.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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

                <div className="mt-10 max-w-3xl border-y border-border-soft py-5">
                  <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {credentials.map((item) => (
                      <span key={item} className="text-[13.5px] leading-[1.65] text-text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-2 w-full">
                <div className="portrait-shell mx-auto aspect-[4/5] w-full max-w-full sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px]">
                  <Image
                    src="/images/headshot_v4.webp"
                    alt="Sarah Zou, PhD economist"
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 360px, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="media-rule mx-auto w-full max-w-full text-center sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px]">
                  <p className="media-caption">
                    For AI-infrastructure, API, and data-platform founders · Seed to Series B
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus strip */}
        <section className="editorial-band bg-page/60">
          <div className="section-shell grid gap-5 py-8 sm:py-9 lg:grid-cols-[0.32fr_1fr] lg:items-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-subtle">
              Core areas of work
            </p>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {decisionFocus.map((item) => (
                <li key={item} className="border-t border-border-soft pt-2">
                  <span className="text-[14px] font-semibold leading-none text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who this is for */}
        <section className="section">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Who this is for</span>
              <h2 className="section-title">
                AI-infrastructure, API, and data-platform founders at Seed to Series B
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-text-muted">
                The fit is strongest when the product is technically complex and the right
                commercial model is not yet obvious.
              </p>
            </div>

            <div className="mt-12 grid gap-0 sm:grid-cols-3">
              {[
                {
                  role: 'Founder',
                  need: 'Building pricing, packaging, and GTM from scratch — or fixing what\'s already in market. Needs decisions, not frameworks.',
                },
                {
                  role: 'COO / BizOps',
                  need: 'Owning the commercial model, unit economics, or pricing operations. Needs rigorous inputs fast.',
                },
                {
                  role: 'CFO / Finance',
                  need: 'Building investor-ready models, defending margin assumptions, or stress-testing the revenue architecture.',
                },
              ].map((item) => (
                <div key={item.role} className="border-t border-border-soft py-6 pr-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-subtle">
                    {item.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.75] text-text-muted">{item.need}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:items-start">
              <div>
                <span className="kicker">The problem</span>
                <h2 className="mt-3 font-serif-playfair text-[28px] font-semibold leading-[1.2] text-ink sm:text-[32px]">
                  Deep tech doesn&apos;t fail on technology alone.
                </h2>
                <p className="mt-5 text-[15px] leading-[1.75] text-text-muted">
                  The commercial layer — pricing, GTM, unit economics — is where technically strong
                  products stall. These are the patterns that surface most often at Seed to Series B.
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {[
                  'The product works, but the buyer does not know how to evaluate it.',
                  'Usage grows, but gross margin becomes unclear.',
                  'Pricing is either too simple for the cost structure or too complex for adoption.',
                  'Free pilots do not convert.',
                  'The technical user is excited, but the economic buyer is unclear.',
                  'Investors ask about margins, repeatability, and GTM, and the answers are not yet crisp.',
                  'The company is stuck between developer adoption, enterprise sales, and partner-led GTM.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-border-soft py-4">
                    <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="text-[14px] leading-[1.65] text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Commercial Architecture Diagnostic — condensed feature block */}
        <section className="section">
          <div className="section-shell max-w-4xl">
            <div className="section-header">
              <span className="kicker">Start here</span>
              <h2 className="section-title">The Commercial Architecture Diagnostic</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Infrastructure and usage-based companies get handed pricing advice built for
                per-seat SaaS — and it misfits. The error compounds with each contract you sign —
                and it&apos;s the first thing a serious investor probes.
              </p>
            </div>

            <div className="card-dark mt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Two-week · Fixed fee · Starts free
              </p>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/80 sm:text-[17px]">
                A two-week, fixed-fee audit of your pricing, packaging, and unit economics, built
                for consumption- and capability-shaped economics — not per-seat SaaS. You get the
                right value metric, a pricing &amp; packaging recommendation, a unit-economics view,
                and a prioritized action list. Starts with a free one-page diagnostic note.
              </p>

              <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col items-start gap-3">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButton}>
                    Get a free diagnostic note
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/consulting"
                    className="text-[13px] font-medium text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    See full details →
                  </Link>
                </div>
                <div className="sm:text-right">
                  <p className="font-serif-playfair text-[32px] font-semibold leading-none text-white">
                    US$6,000
                  </p>
                  <p className="mt-2 max-w-sm text-[13px] leading-[1.6] text-white/60 sm:ml-auto">
                    Fixed fee. Starts with a free one-page diagnostic note — no cost until you
                    decide to proceed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof — verifiable proof block */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Why founders work with me</span>
              <h2 className="section-title">Operator context, not outside advice</h2>
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6 text-[16px] leading-[1.8] text-text-muted">
              <p>
                I operate the same kind of company I advise: COO of an infrastructure data
                platform, pricing against real cost floors and building diligence-ready models —
                not advising from the outside. Every engagement ends with a specific recommendation
                and the tradeoffs named, not a 40-page deck. I also publish an openly available{' '}
                <Link href="/wiki/pricing" className={brandLink}>
                  pricing &amp; monetization wiki
                </Link>
                .
              </p>
              <p className="text-[14px] text-text-subtle">
                PhD Economics, Rutgers · MS Finance &amp; Statistics, UIUC · NBER &amp; World Bank
                research · Former Citigroup &amp; Capgemini
              </p>
              {/* TODO(Sarah): add named, linkable client testimonials here when available. */}
            </div>
          </div>
        </section>

        {/* Other ways to work together */}
        <section className="section">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">Other ways to work together</span>
              <h2 className="section-title">Deeper or ongoing commercial strategy support</h2>
            </div>

            <ul className="mt-10 divide-y divide-border-soft border-y border-border-soft">
              {otherEngagements.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-6 py-6 transition-colors"
                  >
                    <div>
                      <p className="text-[17px] font-semibold text-ink">{item.label}</p>
                      <p className="mt-1.5 text-[14px] leading-[1.75] text-text-muted">
                        {item.sub}
                      </p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 flex-shrink-0 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-brand-ink"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">FAQ</span>
              <h2 className="section-title">Frequently asked questions</h2>
            </div>

            <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
              {faqItems.map((item, index) => (
                <details key={item.q} open={index === 0} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
                    <h3 className="text-[17px] font-semibold text-ink">{item.q}</h3>
                    <ChevronDown
                      className="h-4 w-4 flex-shrink-0 text-text-subtle transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="pb-5 pr-8 text-[15px] leading-[1.85] text-text-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter capture */}
        <section className="section section-alt">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">Just exploring?</span>
              <h2 className="section-title">Get the occasional pricing note</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-text-muted">
                I publish notes on pricing, unit economics, and commercial strategy for
                infrastructure founders. No cadence commitment — only when there&apos;s something
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
                Have a pricing or commercial-model decision in front of you?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Start with a free one-page diagnostic note — no commitment, no pitch. Or book a
                free 15-min consult if you want to talk it through first.
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
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
