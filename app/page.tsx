import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Clock3, FileText, ChevronDown, Video } from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'
import { OG_IMAGE_HOME } from '@/lib/seo'

const PRIMARY_CTA_HREF = '/book'
const CONSULT_CTA_HREF = '/consulting'

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

const pillars = [
  {
    title: 'Inside the problem, not above it',
    description:
      'I operate a fiber-optic sensing infrastructure-as-a-service startup as COO — pricing against real cost floors, running paid pilots, building diligence-ready models. Not advising from the outside.',
  },
  {
    title: 'Decisions, not deliverables',
    description:
      'Clear recommendations with tradeoffs named — not long reports that avoid a point of view.',
  },
  {
    title: 'Built for technical founders',
    description:
      'Fast, defensible outputs calibrated for founding teams where the product is complex and the commercial layer has to match.',
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
    label: 'Growth Economics, Forecasting & Unit Economics',
    sub: 'Revenue model logic, KPI design, forward models, and investor-ready assumptions',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    label: 'Fractional or Embedded Strategy Support',
    sub: 'Ongoing commercial strategy, monetization, and board-facing economics — or select embedded / full-time roles',
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
    q: 'How do I know if the 90-minute session is the right first step?',
    a: (
      <>
        Start with the{' '}
        <Link href="/consulting/entry-offer" className={brandLink}>
          90-minute session
        </Link>{' '}
        if you have one important commercial decision in motion — pricing model, value metric,
        GTM structure, or revenue model logic. If you already know the work is broader, a{' '}
        <Link href="/consulting" className={brandLink}>
          deeper engagement
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
        Sprints are fixed-fee ($5K–$18K). Ongoing support starts at $4K/month.
      </>
    ),
  },
]

export const metadata: Metadata = {
  title: 'Commercial Strategy & Pricing for API-First Infrastructure & Data Platforms | Sarah Zou, PhD',
  description:
    'I help technical founders of API-first infrastructure and data platform companies build the commercial layer — pricing architecture, GTM for technical buyers, and fundraising-ready unit economics. Start with a free consult.',
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
    title: 'Commercial Strategy & Pricing for API-First Infrastructure & Data Platforms | Sarah Zou, PhD',
    description:
      'I help technical founders of API-first infrastructure and data platform companies build the commercial layer — pricing architecture, GTM for technical buyers, and fundraising-ready unit economics.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: [OG_IMAGE_HOME],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Strategy & Pricing for API-First Infrastructure & Data Platforms | Sarah Zou, PhD',
    description:
      'I help technical founders of API-first infrastructure and data platform companies build the commercial layer — pricing architecture, GTM for technical buyers, and fundraising-ready unit economics.',
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
        name: 'How do I know if the 90-minute session is the right first step?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the 90-minute session if you have one important commercial decision in motion — pricing model, value metric, GTM structure, or revenue model logic. If the work is broader, a deeper engagement is a better fit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 90-minute session is $600, credited toward a sprint if you move into one within 14 days. Sprints are fixed-fee ($5K–$18K). Ongoing support starts at $4K/month.',
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
                  Pricing and <span className="whitespace-nowrap">go-to-market</span> for deep tech founders.
                </h1>

                <p className="lede mt-7 max-w-[39rem]">
                  I help founders of AI infrastructure and deep tech data platforms turn hard
                  technology into a business that customers buy and investors back.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full sm:w-auto`}
                  >
                    Book a free consult
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>

                  <Link href={CONSULT_CTA_HREF} className={`${outlineButton} w-full sm:w-auto`}>
                    See how it works
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
                  <p className="media-caption">For seed to series B technical founders of AI infrastructure &amp; deep tech data platforms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus strip — answers "what decisions" in one glance */}
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
              <h2 className="section-title">Deep tech founders at Seed to Series B</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-text-muted">
                The fit is strongest when the product is technically
                complex and the right business model is not yet obvious.
              </p>
            </div>

            <div className="mt-12 grid gap-0 sm:grid-cols-3">
              {[
                {
                  role: 'AI Infrastructure & API Platforms',
                  need: 'Founders building model-serving, LLMOps, AI data infrastructure, developer tools, or technical API platforms.',
                },
                {
                  role: 'Deep Tech Data Platforms',
                  need: 'Founders commercializing geospatial, environmental, sensing, fiber-optic sensing, or physical-world data infrastructure.',
                },
                {
                  role: 'Technical Founders Facing the Commercial Layer',
                  need: 'Founders with strong technology who need clarity on pricing, packaging, ICP, GTM motion, unit economics, or investor narrative.',
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

        {/* The Session — single offer block */}
        <section className="section">
          <div className="section-shell max-w-4xl">
            <div className="section-header">
              <span className="kicker">Start here</span>
              <h2 className="section-title">The 90-Minute Commercial Strategy Session</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                One focused working session to pressure-test your commercial direction — pricing
                model, value metric, GTM structure, revenue logic, or packaging — with a 48-hour
                follow-up memo.
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
                  <Link href="/consulting/entry-offer/form" className={primaryButton}>
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
                    Credited toward either follow-on sprint if you move into one within 14 days.
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
              <h2 className="section-title">An economist who also runs a deep tech startup</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                I&apos;m a PhD economist, and I&apos;m also COO of a deep tech startup. So I price
                against real costs and real buyers — not theory — and give you clear decisions, not
                long reports.
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className={
                    idx === 1 ? 'border-t border-ink/20 pt-6' : 'border-t border-border pt-6'
                  }
                >
                  <p className="font-serif-playfair text-[28px] font-semibold leading-none text-ink/20">
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

        {/* FAQ — 3 items */}
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

        {/* Closing CTA — single button */}
        <section className="section-sm">
          <div className="section-shell max-w-4xl">
            <div className="cta-panel">
              <h2 className="font-serif-playfair text-ink">
                Have a pricing or GTM decision in front of you?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Start with a free 15-min consult. Or go straight to the 90-minute session if you
                have a live commercial decision to work through.
              </p>
              <div className="mt-8">
                <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                  Book a free consult
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <p className="mt-6 text-[13px] text-text-muted">
                <Link
                  href={CONSULT_CTA_HREF}
                  className="underline underline-offset-4 hover:text-ink"
                >
                  Explore ways to work together →
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
