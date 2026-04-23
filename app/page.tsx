import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  FileSearch,
  Layers,
  LineChart,
  Rocket,
  ShieldCheck,
  ChevronDown,
  Video,
  Zap,
} from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'

const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const CONSULT_CTA_HREF = '/book'

const pathCards = [
  {
    title: '90-Minute Pricing Strategy Session',
    description: 'Best for a fast expert recommendation and clear next step.',
    cta: 'Explore the Session',
    href: '/consulting/entry-offer',
    highlighted: true,
  },
  {
    title: 'Pricing & Monetization Sprint',
    description: 'Best when you need a full pricing structure, packaging, and rollout plan.',
    cta: 'Explore the Sprint',
    href: '/consulting/services/pricing-monetization-sprint',
    highlighted: false,
  },
  {
    title: 'Free Resources',
    description: 'Not ready yet? Explore the free tools and guides.',
    cta: 'Explore Free Resources',
    href: '/free-tools',
    highlighted: false,
  },
]

const differentiators = [
  {
    title: 'Research-grade rigor',
    description: 'Research-grade rigor without academic abstraction.',
    icon: FileSearch,
  },
  {
    title: 'Practical recommendations',
    description: 'Practical founder-facing recommendations instead of vague strategy talk.',
    icon: Layers,
  },
  {
    title: 'Investor-ready',
    description: 'Investor- and board-ready thinking behind the pricing story.',
    icon: ShieldCheck,
  },
  {
    title: 'Startup speed',
    description: 'Fast, testable outputs built for startup pace.',
    icon: Zap,
  },
  {
    title: 'Data to decision',
    description: 'Clear translation from data to decision.',
    icon: LineChart,
  },
  {
    title: 'Prioritization',
    description: 'Sharp prioritization on what matters most.',
    icon: CheckCircle2,
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

const deeperServices = [
  {
    title: 'Pricing & Monetization Sprint',
    description:
      'For a fuller answer on pricing model, value metric, packaging, risks, and roadmap.',
    cta: 'View Pricing Sprint',
    href: '/consulting/services/pricing-monetization-sprint',
    image: '/images/s-4-v2.webp',
  },
  {
    title: 'Metrics & Experimentation Sprint',
    description: 'For KPI, measurement, and experiment design work.',
    cta: 'View Metrics Sprint',
    href: '/consulting/services/metrics-experimentation-sprint',
    image: '/images/metrics.webp',
  },
  {
    title: 'Fractional Chief Economist Support',
    description: 'For ongoing strategic help.',
    cta: 'View Advisory Support',
    href: '/consulting/services/on-call-economist-retainer',
    image: '/images/p-2-v2.webp',
  },
]

const faqItems = [
  {
    q: 'What is a fractional chief economist?',
    a: (
      <>
        A fractional chief economist is a part-time executive who designs your pricing
        system, unit economics, and decision cadence-bringing PhD-level rigor without a
        full-time hire. Learn more about{' '}
        <Link href="/about" className={brandLink}>
          fractional economics services
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How to decide which service to choose?',
    a: (
      <>
        Start with the{' '}
        <Link href="/consulting/entry-offer" className={brandLink}>
          90-Minute Pricing Strategy Session
        </Link>{' '}
        if you need clarity on one important pricing decision. Choose the{' '}
        <Link href="/consulting/services/pricing-monetization-sprint" className={brandLink}>
          Pricing &amp; Monetization Sprint
        </Link>{' '}
        if you need a fuller pricing structure, packaging, and roadmap. Choose the{' '}
        <Link href="/consulting/services/metrics-experimentation-sprint" className={brandLink}>
          Metrics &amp; Experimentation Sprint
        </Link>{' '}
        if your challenge is more about KPIs, testing, and measurement. Choose{' '}
        <Link href="/consulting/services/on-call-economist-retainer" className={brandLink}>
          Fractional Chief Economist Support
        </Link>{' '}
        if you want ongoing strategic help.
      </>
    ),
  },
  {
    q: 'What do engagements look like?',
    a: (
      <>
        For most founders:{' '}
        <Link href="/consulting/entry-offer" className={brandLink}>
          90-Minute Pricing Strategy Session
        </Link>{' '}
        -&gt;{' '}
        <Link href="/consulting/services/pricing-monetization-sprint" className={brandLink}>
          Pricing &amp; Monetization Sprint
        </Link>{' '}
        or{' '}
        <Link href="/consulting/services/metrics-experimentation-sprint" className={brandLink}>
          Metrics &amp; Experimentation Sprint
        </Link>{' '}
        -&gt; optional{' '}
        <Link href="/consulting/services/on-call-economist-retainer" className={brandLink}>
          Fractional Chief Economist Support
        </Link>
        .
      </>
    ),
  },
  {
    q: 'What does it cost?',
    a: (
      <>
        The 90-Minute Pricing Strategy Session is $600 (if we move into a pricing sprint
        within 14 days, this fee will be credited toward the project). Sprints are fixed-fee
        ($5k-$18k for Monetization; $6k-$12k for Metrics) with defined deliverables and
        timelines. Fractional Chief Economist Support starts at $4k/mo with tiered time
        commitments.
      </>
    ),
  },
]

export const metadata: Metadata = {
  title: 'Pricing Strategy for AI & SaaS Founders | Sarah Zou, PhD',
  description:
    'Not sure your pricing makes sense? Get sharper pricing, packaging, and monetization decisions through a 90-minute strategy session, sprints, or ongoing fractional chief economist support.',
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
    title: 'Pricing Strategy for AI & SaaS Founders | Sarah Zou, PhD',
    description:
      'Get sharper pricing, packaging, and monetization decisions without months of analysis or generic advice.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: ['https://sarahzou.com/images/headshot_v4.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Strategy for AI & SaaS Founders | Sarah Zou, PhD',
    description:
      'Get sharper pricing, packaging, and monetization decisions without months of analysis or generic advice.',
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
        name: 'What is a fractional chief economist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A fractional chief economist is a part-time executive who designs your pricing system, unit economics, and decision cadence, bringing PhD-level rigor without a full-time hire.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to decide which service to choose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the 90-Minute Pricing Strategy Session for one important decision. Choose the Pricing & Monetization Sprint for fuller pricing structure and roadmap, the Metrics & Experimentation Sprint for KPI and testing work, and Advisory / On-Call Economist Support for ongoing strategic help.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do engagements look like?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most founders: 90-Minute Pricing Strategy Session, then Pricing & Monetization Sprint or Metrics & Experimentation Sprint, then optional Fractional Chief Economist Support.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 90-Minute Pricing Strategy Session is $600 and can be credited toward a pricing sprint if started within 14 days. Sprints are fixed-fee at $5k-$18k for Monetization and $6k-$12k for Metrics. Advisory starts at $4k/month with tiered time commitments.',
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
          <div className="mx-auto w-full max-w-container px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-card ring-1 ring-border-soft">
                  <Image
                    src="/images/headshot_v4.webp"
                    alt="Sarah Zou, PhD economist"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <span className="kicker">PhD Economist · Fractional Chief Economist</span>

                <h1 className="mt-5 font-serif-playfair text-ink">
                  Not sure your pricing{' '}
                  <span className="text-brand">makes sense?</span>
                </h1>

                <p className="mt-5 max-w-xl text-[17px] leading-[1.7] text-text-muted sm:text-[19px]">
                  I help AI and SaaS founders fix pricing, unit economics, and monetization
                  decisions with research-grade rigor and startup-speed execution.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[420px] sm:w-auto`}
                  >
                    Book the 90-Minute Pricing Strategy Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>

                  <Link
                    href={CONSULT_CTA_HREF}
                    className="text-[14px] font-medium text-text-muted underline underline-offset-4 hover:text-ink"
                  >
                    Or start with a free consult
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured offer */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Best starting point</span>
              <h2 className="mt-3 font-serif-playfair">
                The 90-Minute Pricing Strategy Session
              </h2>
            </div>

            <div className="card-dark mt-10">
              <p className="text-[17px] leading-[1.75] text-white/90 sm:text-[18px]">
                If you have one important pricing question, start here. Use this session to
                pressure-test your direction, choose the right value metric, compare usage
                vs. seat vs. hybrid, or clean up packaging.
              </p>

              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                What you get
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: FileText, label: 'Short intake review' },
                  { icon: Video, label: '90-minute live session' },
                  { icon: Clock3, label: '48-hour summary memo' },
                  { icon: CheckCircle2, label: 'Top 3 next actions' },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-control border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white/90"
                  >
                    <Icon className="h-4 w-4 text-brand-soft" aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={`${primaryButton} w-full sm:w-auto`}>
                    Book the Session
                  </Link>
                  <Link
                    href="/consulting/entry-offer"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Explore the Session
                  </Link>
                </div>
                <div className="sm:text-right">
                  <p className="font-serif-playfair text-[32px] font-semibold text-white">$600</p>
                  <p className="mt-1 max-w-sm text-[13px] leading-[1.6] text-white/60 sm:ml-auto">
                    If we move into a{' '}
                    <Link
                      href="/consulting/services/pricing-monetization-sprint"
                      className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white/80"
                    >
                      Pricing &amp; Monetization Sprint
                    </Link>{' '}
                    within 14 days, I&apos;ll credit this fee toward the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Paths */}
        <section className="section">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Paths</span>
              <h2 className="mt-3 font-serif-playfair">Choose your path</h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {pathCards.map((card, index) => {
                const Icon = index === 0 ? Clock3 : index === 1 ? Rocket : BookOpen
                return (
                  <div
                    key={card.title}
                    className={`relative rounded-card border p-7 transition-colors ${
                      card.highlighted
                        ? 'border-brand/40 bg-brand-soft/40'
                        : 'border-border-subtle bg-white hover:border-ink/20'
                    }`}
                  >
                    {card.highlighted && (
                      <span className="absolute right-5 top-5 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-on">
                        Popular
                      </span>
                    )}
                    <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-white">
                      <Icon
                        className={`h-5 w-5 ${card.highlighted ? 'text-brand-ink' : 'text-text-muted'}`}
                        aria-hidden
                      />
                    </div>
                    <h3 className="text-[20px] font-semibold text-ink">{card.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-text-muted">
                      {card.description}
                    </p>
                    <Link
                      href={card.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-ink hover:text-brand-dark"
                    >
                      {card.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker">What makes me different</span>
              <h2 className="mt-3 font-serif-playfair">
                Rigor, pragmatism, and startup speed
              </h2>
              <p className="mt-5 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                Most pricing consultants give you frameworks. Most analysts give you rigor.
                Most operators give you speed. I sit at the intersection — less a consultant,
                more a fractional Chief Economist for founders making consequential decisions.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title}>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white">
                      <Icon className="h-4 w-4 text-brand" aria-hidden />
                    </div>
                    <h4 className="text-[17px] font-semibold text-ink">{item.title}</h4>
                    <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Proof</span>
              <h2 className="mt-3 font-serif-playfair">What founders say</h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <figure key={item.author} className="card">
                  <blockquote className="font-serif-playfair text-[19px] leading-[1.55] text-ink">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-[13px] text-text-muted">
                    <p className="font-semibold text-ink">{item.author}</p>
                    <p>{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Deeper services */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Other ways to work together</span>
              <h2 className="mt-3 font-serif-playfair">Need more than one session?</h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
              {deeperServices.map((service) => (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-card border border-border-subtle bg-white"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <h3 className="font-serif-playfair text-[22px] leading-[1.2] text-white sm:text-[26px]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.65] text-white/80">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-brand-soft hover:text-white"
                      >
                        {service.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">FAQ</span>
              <h2 className="mt-3 font-serif-playfair">Frequently asked questions</h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqItems.map((item, index) => (
                <details
                  key={item.q}
                  open={index === 0}
                  className="group rounded-card border border-border-subtle bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                    <h3 className="text-[17px] font-semibold text-ink">{item.q}</h3>
                    <ChevronDown
                      className="h-4 w-4 flex-shrink-0 text-text-subtle transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="border-t border-border-soft px-6 py-5 text-[15px] leading-[1.75] text-text-muted">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="orange-surface section-sm">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-white">
              Need a sharper pricing decision before your next move?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.7] text-white/85 sm:text-[17px]">
              Start with the 90-Minute Pricing Strategy Session — or explore a deeper sprint
              if you already know you need full pricing work.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={PRIMARY_CTA_HREF}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[16px] font-semibold text-brand-ink transition-colors hover:bg-brand-soft"
              >
                Book the Session
              </Link>
              <Link
                href="/consulting/services/pricing-monetization-sprint"
                className={`${outlineButton} border-white bg-transparent text-white hover:bg-white/10 hover:text-white`}
              >
                Explore the Sprint
              </Link>
            </div>
            <p className="mt-6 text-[13px] text-white/80">
              <Link href={CONSULT_CTA_HREF} className="underline underline-offset-4 hover:text-white">
                Need a broader conversation? Book a free consult
              </Link>
            </p>
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
