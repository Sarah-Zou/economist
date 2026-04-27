import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Clock3, FileText, ChevronDown, Video } from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'

const PRIMARY_CTA_HREF = '/book'
const CONSULT_CTA_HREF = '/consulting'

const decisionFocus = [
  'Pricing strategy',
  'GTM economics',
  'Revenue model',
  'Unit economics',
  'Forecasting',
  'Investor narrative',
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
        Pricing model, value metric, packaging, GTM economics, revenue model design, unit
        economics, forecasting, KPI structure, and investor-ready commercial narratives. The common
        thread: decisions where economic rigor makes the answer clearer. Read more{' '}
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
  title: 'Commercial Strategy, Pricing & Growth Economics for AI-Native B2B SaaS | Sarah Zou, PhD',
  description:
    'Commercial strategy, pricing, monetization, GTM economics, forecasting, and unit economics for AI-native B2B SaaS founders and operators. Fractional chief economist — start with a free consult.',
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
    title: 'Commercial Strategy, Pricing & Growth Economics for AI-Native B2B SaaS | Sarah Zou, PhD',
    description:
      'Commercial strategy, pricing, monetization, GTM economics, forecasting, and unit economics for AI-native B2B SaaS founders and operators.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: ['https://sarahzou.com/images/headshot_v4.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Strategy, Pricing & Growth Economics for AI-Native B2B SaaS | Sarah Zou, PhD',
    description:
      'Commercial strategy, pricing, monetization, GTM economics, forecasting, and unit economics for AI-native B2B SaaS founders and operators.',
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
      'Commercial strategy, pricing, and growth economics for AI-native B2B SaaS teams. Pricing, monetization, GTM economics, forecasting, unit economics, and investor-ready commercial narratives.',
    founder: {
      '@type': 'Person',
      name: 'Dr. Sarah Zou',
      jobTitle: 'Commercial Strategy Advisor & Fractional Chief Economist',
    },
    sameAs: ['https://www.linkedin.com/in/drsarahzou'],
    serviceType: [
      'Commercial Strategy Consulting',
      'Pricing Strategy Consulting',
      'Monetization Strategy',
      'GTM Economics',
      'Growth Economics and Forecasting',
      'Fractional Chief Economist Services',
      'BizOps and Strategy Support',
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sarah Zou',
    honorificSuffix: 'PhD',
    alternateName: 'Dr. Sarah Zou',
    jobTitle: 'Commercial Strategy Advisor & Fractional Chief Economist',
    description:
      'PhD economist and commercial strategy advisor helping AI-native B2B SaaS teams make sharper decisions on pricing, monetization, GTM economics, revenue models, forecasting, and unit economics.',
    url: 'https://sarahzou.com',
    image: 'https://sarahzou.com/images/headshot_v4.webp',
    sameAs: ['https://www.linkedin.com/in/drsarahzou/'],
    worksFor: {
      '@type': 'Organization',
      name: 'EconNova Consulting',
      url: 'https://sarahzou.com',
    },
    knowsAbout: [
      'Commercial Strategy',
      'Pricing',
      'Monetization',
      'GTM Strategy',
      'Unit Economics',
      'Revenue Model',
      'Forecasting',
      'Growth Economics',
      'Experimentation',
      'Econometrics',
      'BizOps',
      'Investor Narratives',
    ],
  }

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
          text: 'Pricing model, value metric, packaging, GTM economics, revenue model design, unit economics, forecasting, KPI structure, and investor-ready commercial narratives — anywhere economic rigor makes the decision clearer.',
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
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-14 xl:gap-20">
              <div className="order-1">
                <span className="kicker-accent">Commercial Strategy &amp; Growth Economics</span>

                <h1 className="mt-5 max-w-[54rem] font-serif-playfair text-ink">
                  Commercial strategy, pricing, and growth economics for AI-native B2B SaaS teams.
                </h1>

                <p className="lede mt-7 max-w-[39rem]">
                  I help technical founders and operators turn messy pricing, GTM, revenue model,
                  and unit economics questions into clearer decisions, sharper investor narratives,
                  and more executable growth plans.
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
                    Explore working together
                  </Link>
                </div>

                <div className="mt-10 max-w-3xl border-y border-border-soft py-5">
                  <p className="meta-note">
                    Most founders start with one live commercial or pricing decision.
                  </p>
                  <div className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {credentials.map((item) => (
                      <span key={item} className="text-[13.5px] leading-[1.65] text-text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-2">
                <div className="portrait-shell mx-auto aspect-[4/5] w-full max-w-[380px] lg:max-w-[440px]">
                  <div className="portrait-inner">
                    <Image
                      src="/images/headshot_v4.webp"
                      alt="Sarah Zou, PhD economist"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                <div className="media-rule mx-auto max-w-[380px] text-center lg:max-w-[440px]">
                  <p className="media-caption">For AI-native B2B SaaS teams</p>
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

        {/* The Session — single offer block */}
        <section className="section section-alt">
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
              <h2 className="section-title">Rigor, decisions, and startup speed</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Most consultants give you frameworks. Most analysts give you rigor. Most operators
                give you speed. I combine all three — for founders and operators making consequential
                commercial decisions.
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

        {/* Who this is for */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Who this is for</span>
              <h2 className="section-title">Built for teams making consequential commercial decisions</h2>
            </div>

            <div className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  role: 'Founder',
                  need: 'Need clearer pricing, packaging, GTM, or monetization decisions — framed in a way you can defend with your team and investors.',
                },
                {
                  role: 'COO / BizOps Lead',
                  need: 'Need structure around messy commercial questions, operating metrics, or growth priorities that cross multiple functions.',
                },
                {
                  role: 'CFO / Finance Lead',
                  need: 'Need revenue model logic, forecasting, unit economics, or investor-ready assumptions that hold up under scrutiny.',
                },
                {
                  role: 'Hiring Founder',
                  need: 'Need embedded strategy, finance, BizOps, or growth economics talent who can work across analysis, narrative, and execution.',
                },
              ].map((item) => (
                <div
                  key={item.role}
                  className="border-t border-border-soft py-6 pr-6"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-subtle">
                    {item.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.75] text-text-muted">{item.need}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-[14px] leading-[1.7] text-text-muted">
              Not sure which applies to you?{' '}
              <Link href={PRIMARY_CTA_HREF} className="font-semibold text-brand-ink underline decoration-brand/30 underline-offset-2 hover:decoration-brand/80">
                Book a free 15-min consult
              </Link>{' '}
              and I&apos;ll help you figure out the right path.
            </p>
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
                Ready to make your pricing, GTM, or revenue model decisions clearer?
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
