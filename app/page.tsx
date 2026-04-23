import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Clock3, FileText, ChevronDown, Video } from 'lucide-react'
import { brandLink, primaryButton, primaryButtonLg } from '@/lib/brandStyles'

const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const CONSULT_CTA_HREF = '/book'

const decisionFocus = [
  'Pricing model',
  'Value metric',
  'Packaging',
  'Unit economics',
  'Monetization risk',
]

const credentials = [
  'PhD Economics, Rutgers',
  'MS Finance & Statistics, UIUC',
  'NBER & World Bank research',
  'Former Citigroup & Capgemini',
]

const pillars = [
  {
    title: 'Rigor, not frameworks',
    description:
      'Econometrics and pricing research applied to the revenue decisions actually in front of you.',
  },
  {
    title: 'Decisions, not dashboards',
    description:
      'Clear recommendations with tradeoffs named — not long reports that avoid a point of view.',
  },
  {
    title: 'Startup speed',
    description: 'Fast, testable outputs built to ship and defend, not to be admired on a shelf.',
  },
]

const testimonials = [
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

const otherEngagements = [
  {
    label: 'Pricing & Monetization Sprint',
    sub: 'Full pricing structure, packaging, and rollout plan',
    href: '/consulting/services/pricing-monetization-sprint',
  },
  {
    label: 'Metrics & Experimentation Sprint',
    sub: 'KPI design, measurement, and experiment priorities',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    label: 'Fractional Chief Economist Retainer',
    sub: 'Ongoing strategic support for monetization and board-facing economics',
    href: '/consulting/services/on-call-economist-retainer',
  },
]

const faqItems = [
  {
    q: 'What is a fractional Chief Economist?',
    a: (
      <>
        A part-time executive who designs your pricing system, unit economics, and monetization
        cadence — bringing PhD-level rigor without a full-time hire. Read more{' '}
        <Link href="/about" className={brandLink}>
          about the practice
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How do I know if the 90-minute session is the right first step?',
    a: (
      <>
        Start with the{' '}
        <Link href="/consulting/entry-offer" className={brandLink}>
          90-minute session
        </Link>{' '}
        if you have one important pricing decision in motion — model, value metric, packaging, or
        pre-launch structure. If you already know the work is broader, a{' '}
        <Link href="/consulting/services/pricing-monetization-sprint" className={brandLink}>
          sprint
        </Link>{' '}
        is a better fit.
      </>
    ),
  },
  {
    q: 'What does it cost?',
    a: (
      <>
        The 90-minute session is $600, credited toward a sprint if you move into one within 14 days.
        Sprints are fixed-fee ($5K–$18K). A retainer starts at $4K/month.
      </>
    ),
  },
]

export const metadata: Metadata = {
  title: 'Fractional Chief Economist for AI & SaaS Founders | Sarah Zou, PhD',
  description:
    'A fractional Chief Economist for AI and SaaS founders. PhD-level pricing, unit economics, and monetization decisions — delivered at startup speed. Start with a 90-minute strategy session.',
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
    title: 'Fractional Chief Economist for AI & SaaS Founders | Sarah Zou, PhD',
    description:
      'PhD-level pricing, unit economics, and monetization decisions for AI and SaaS founders — delivered at startup speed.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: ['https://sarahzou.com/images/headshot_v4.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Chief Economist for AI & SaaS Founders | Sarah Zou, PhD',
    description:
      'PhD-level pricing, unit economics, and monetization decisions for AI and SaaS founders — delivered at startup speed.',
    images: ['https://sarahzou.com/images/headshot_v4.webp'],
  },
}

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EconNova Consulting',
    url: 'https://sarahzou.com',
    logo: 'https://sarahzou.com/images/econnova_logo.png',
    description:
      'Fractional Chief Economist services for early-stage tech startups. Expert pricing strategy, metrics analysis, and economic storytelling to help startups optimize revenue and growth.',
    founder: {
      '@type': 'Person',
      name: 'Dr. Sarah Zou',
      jobTitle: 'Fractional Chief Economist',
    },
    sameAs: ['https://www.linkedin.com/in/drsarahzou'],
    serviceType: [
      'Pricing Strategy Consulting',
      'Monetization Strategy',
      'Metrics and Experimentation Strategy',
      'Fractional Chief Economist Services',
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sarah Zou',
    honorificSuffix: 'PhD',
    alternateName: 'Dr. Sarah Zou',
    jobTitle: 'Fractional Chief Economist',
    description:
      'PhD Economist specializing in pricing strategies, metrics analytics, and investor-ready storytelling for early-stage tech startups.',
    url: 'https://sarahzou.com',
    image: 'https://sarahzou.com/images/headshot_v4.webp',
    sameAs: ['https://www.linkedin.com/in/drsarahzou/'],
    worksFor: {
      '@type': 'Organization',
      name: 'EconNova Consulting',
      url: 'https://sarahzou.com',
    },
    knowsAbout: [
      'Pricing',
      'Monetization',
      'Unit Economics',
      'Experimentation',
      'Econometrics',
      'Value-Based Pricing',
      'Revenue Optimization',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: 'https://sarahzou.com',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a fractional Chief Economist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A part-time executive who designs your pricing system, unit economics, and monetization cadence, bringing PhD-level rigor without a full-time hire.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know if the 90-minute session is the right first step?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the 90-minute session if you have one important pricing decision in motion — pricing model, value metric, packaging, or pre-launch structure. If the work is broader, a sprint is a better fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 90-minute session is $600, credited toward a sprint if you move into one within 14 days. Sprints are fixed-fee ($5K–$18K). A retainer starts at $4K/month.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="bg-page text-text">
        {/* Hero */}
        <section className="bg-hero-tint">
          <div className="section-shell pb-20 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
              <div className="order-2 lg:order-1">
                <div className="portrait-shell mx-auto aspect-[4/5] w-full max-w-[380px] lg:max-w-[400px]">
                  <div className="portrait-inner">
                    <Image
                      src="/images/headshot_v4.webp"
                      alt="Sarah Zou, PhD economist"
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                <div className="media-rule mx-auto max-w-[380px] text-center lg:max-w-[400px]">
                  <p className="media-caption">For AI, SaaS, and API founders</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="kicker-accent">Fractional Chief Economist for Tech</span>

                <h1 className="mt-5 font-serif-playfair text-ink">
                  Investor-grade economic judgment for technical founders.
                </h1>

                <p className="lede mt-6 max-w-[34rem]">
                  I help AI, SaaS, and API founders make sharper decisions on pricing, unit
                  economics, and monetization &mdash; with research-grade rigor and startup-speed
                  execution.
                </p>

                <p className="meta-note mt-5">
                  Most founders start with one live pricing decision.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                  >
                    Book the 90-Minute Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>

                  <Link href={CONSULT_CTA_HREF} className="display-link">
                    Or start with a free 15-min consult
                  </Link>
                </div>

                <div className="mt-12 border-t border-border-soft pt-6">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-text-subtle">
                    Background
                  </p>
                  <div className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {credentials.map((item) => (
                      <span key={item} className="text-[13.5px] leading-[1.65] text-text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus strip — answers "what decisions" in one glance */}
        <section className="editorial-band">
          <div className="section-shell py-9 sm:py-10">
            <p className="text-center text-[12px] uppercase tracking-[0.18em] text-text-subtle">
              I help founders decide
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
              {decisionFocus.map((item, idx) => (
                <li key={item} className="flex items-center gap-5 sm:gap-7">
                  <span className="font-serif-playfair text-[18px] leading-none text-ink sm:text-[20px]">
                    {item}
                  </span>
                  {idx < decisionFocus.length - 1 && (
                    <span aria-hidden className="hidden h-px w-6 bg-border sm:inline-block" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The Session — single offer block */}
        <section className="section section-alt">
          <div className="section-shell max-w-4xl">
            <div className="section-header">
              <span className="kicker">Start here</span>
              <h2 className="section-title">The 90-Minute Pricing Strategy Session</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                One focused working session to pressure-test your direction, choose the right value
                metric, or clean up packaging — with a 48-hour follow-up memo.
              </p>
            </div>

            <div className="card-dark mt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                What you get
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: FileText, label: 'Short intake review' },
                  { icon: Video, label: '90-minute live session' },
                  { icon: Clock3, label: '48-hour summary memo' },
                  { icon: CheckCircle2, label: 'Top 3 next actions' },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 border-b border-white/10 pb-4 text-[15px] text-white/90"
                  >
                    <Icon className="h-4 w-4 text-brand-soft" aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col items-start gap-3">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButton}>
                    Book the Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/consulting/entry-offer"
                    className="text-[13px] font-medium text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    See full session details →
                  </Link>
                </div>
                <div className="sm:text-right">
                  <p className="font-serif-playfair text-[32px] font-semibold leading-none text-white">
                    $600
                  </p>
                  <p className="mt-2 max-w-sm text-[13px] leading-[1.6] text-white/60 sm:ml-auto">
                    Fully credited toward a{' '}
                    <Link
                      href="/consulting/services/pricing-monetization-sprint"
                      className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white/80"
                    >
                      Pricing &amp; Monetization Sprint
                    </Link>{' '}
                    if booked within 14 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How I'm different — 3 pillars */}
        <section className="section">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Approach</span>
              <h2 className="section-title">Rigor, decisions, and startup speed</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Most consultants give you frameworks. Most analysts give you rigor. Most operators
                give you speed. I combine all three — for founders making consequential monetization
                decisions.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className={
                    idx === 1 ? 'border-t border-brand/35 pt-6' : 'border-t border-border pt-6'
                  }
                >
                  <p className="font-serif-playfair text-[28px] font-semibold leading-none text-brand/30">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 text-[18px] font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Proof</span>
              <h2 className="section-title">What founders say</h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-12 md:grid-cols-[1.25fr_0.95fr]">
              <figure className="quote-block">
                <blockquote className="font-serif-playfair text-[22px] leading-[1.65] text-ink sm:text-[24px]">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[13px] text-text-muted">
                  <p className="font-semibold text-ink">{testimonials[0].author}</p>
                  <p>{testimonials[0].role}</p>
                </figcaption>
              </figure>
              <div className="border-t border-border pt-6">
                <p className="text-[12px] uppercase tracking-[0.12em] text-text-subtle">
                  Also heard from
                </p>
                <blockquote className="mt-4 font-serif-playfair text-[18px] leading-[1.7] text-ink">
                  &ldquo;{testimonials[1].quote}&rdquo;
                </blockquote>
                <div className="mt-5 text-[13px] text-text-muted">
                  <p className="font-semibold text-ink">{testimonials[1].author}</p>
                  <p>{testimonials[1].role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other engagements — quiet text-only list */}
        <section className="section">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">Other ways to work together</span>
              <h2 className="section-title">Need more than one session?</h2>
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

        {/* FAQ — 3 items */}
        <section className="section section-alt">
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

        {/* Closing CTA — single button */}
        <section className="section-sm">
          <div className="section-shell max-w-4xl">
            <div className="cta-panel">
              <h2 className="font-serif-playfair text-ink">
                Ready for a sharper pricing decision?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Start with the 90-minute session. You&apos;ll leave with a clear recommendation and
                a concrete next step.
              </p>
              <div className="mt-8">
                <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                  Book the Session
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <p className="mt-6 text-[13px] text-text-muted">
                <Link
                  href={CONSULT_CTA_HREF}
                  className="underline underline-offset-4 hover:text-ink"
                >
                  Or start with a free 15-min consult
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
