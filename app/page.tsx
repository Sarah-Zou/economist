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
import { brandLink, outlineButton, primaryButton } from '@/lib/brandStyles'

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

      <div className="bg-white text-[#1f2933]">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7f3] via-white to-white">
          <div className="pointer-events-none absolute -left-10 top-8 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="relative lg:col-span-5 order-2 lg:order-1">
                <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[500px] aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white/40 ring-1 ring-[#e2e6ea] shadow-none backdrop-blur-sm">
                  {/* Edge tint + subtle vignette so it blends into the hero background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/18 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/5" />
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

              <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-8 xl:pl-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-ink">PHD ECONOMIST</span>
                </div>

                <h1 className="mt-4 font-black tracking-tight text-[#0f172a] text-[44px] leading-[0.98] sm:text-[56px] lg:text-[66px]">
                  <span className="block">Not sure your</span>
                  <span className="block">pricing makes</span>
                  <span className="block text-brand">sense?</span>
                </h1>

                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-[#6b7280] sm:text-[18px]">
                I help AI and SaaS founders fix pricing, unit economics, and monetization decisions with research-grade rigor and startup-speed execution.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-6">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} inline-flex w-full max-w-[340px] items-center justify-center gap-3 bg-brand px-6 py-4 text-[15px] leading-[1.15] shadow-xl sm:w-auto sm:max-w-none sm:px-10 sm:text-[16px]`}
                  >
                    <span className="max-w-[230px] text-center sm:max-w-[240px]">
                      Book the 90-Minute Pricing Strategy Session
                    </span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0" aria-hidden />
                  </Link>

                  <Link
                    href={CONSULT_CTA_HREF}
                    className="text-sm leading-[1.3] font-medium text-[#6b7280] underline underline-offset-4 hover:text-brand-ink"
                  >
                    <span className="block">Already need broader support?</span>
                    <span className="block">Start with a consult</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              Best starting point for most founders
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mt-8 rounded-3xl bg-[#111827] p-5 text-white shadow-2xl ring-1 ring-white/10 sm:p-10">
              <p className="text-[24px] sm:text-[34px] font-bold leading-tight text-white">
                <Link href="/consulting/entry-offer" className="underline-offset-4 hover:underline">
                  90-Minute Pricing Strategy Session
                </Link>
              </p>
              <p className="mt-4 text-lg leading-[1.7] text-[#e5e7eb]">
                If you have one important pricing question, start here.
              </p>
              <p className="mt-4 text-base leading-[1.7] text-[#cbd5e1]">
                Use this session to pressure-test your pricing direction, choose the right value
                metric, compare usage vs. seat vs. hybrid, or clean up packaging.
              </p>
              <h3 className="mt-7 text-base font-semibold uppercase tracking-[0.08em] text-[#fcb79a]">
                What you get
              </h3>
              <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2 sm:text-base">
                <li className="rounded-xl border border-[#334155] bg-[#1e293b] px-4 py-3 shadow-sm">
                  <span className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#fcb79a] flex-shrink-0" aria-hidden />
                    <span>Short intake review</span>
                  </span>
                </li>
                <li className="rounded-xl border border-[#334155] bg-[#1e293b] px-4 py-3 shadow-sm">
                  <span className="flex items-center gap-2.5">
                    <Video className="h-4 w-4 text-[#fcb79a] flex-shrink-0" aria-hidden />
                    <span>90-minute live session</span>
                  </span>
                </li>
                <li className="rounded-xl border border-[#334155] bg-[#1e293b] px-4 py-3 shadow-sm">
                  <span className="flex items-center gap-2.5">
                    <Clock3 className="h-4 w-4 text-[#fcb79a] flex-shrink-0" aria-hidden />
                    <span>48-hour summary memo</span>
                  </span>
                </li>
                <li className="rounded-xl border border-[#334155] bg-[#1e293b] px-4 py-3 shadow-sm">
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#fcb79a] flex-shrink-0" aria-hidden />
                    <span>Top 3 next actions</span>
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Link href={PRIMARY_CTA_HREF} className={`${primaryButton} w-full text-center sm:w-auto`}>
                    Book the Session
                  </Link>
                  <Link
                    href="/consulting/entry-offer"
                    className={`${primaryButton} w-full bg-slate-500 text-center text-white hover:bg-slate-600 sm:w-auto`}
                  >
                    Explore the Session
                  </Link>
                </div>
                <div className="sm:text-right">
                  <p className="text-3xl font-bold text-white">$600</p>
                  <p className="mt-1 max-w-sm text-xs leading-[1.6] text-[#cbd5e1] sm:ml-auto">
                    If we move into a{' '}
                    <Link
                      href="/consulting/services/pricing-monetization-sprint"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      Pricing &amp; Monetization Sprint
                    </Link>{' '}
                    within 14 days,
                    <br />
                    I&apos;ll credit this fee toward the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              Choose your path
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
              {pathCards.map((card, index) => {
                const icon =
                  index === 0 ? (
                    <Clock3 className="h-7 w-7 text-brand" aria-hidden />
                  ) : index === 1 ? (
                    <Rocket className="h-7 w-7 text-[#64748b]" aria-hidden />
                  ) : (
                    <BookOpen className="h-7 w-7 text-[#64748b]" aria-hidden />
                  )

                return (
                <div
                  key={card.title}
                  className={`relative rounded-2xl border p-5 sm:p-7 transition-all ${
                    card.highlighted
                      ? 'border-[#edd8b5] bg-[#f8f1e8] shadow-md'
                      : 'border-[#e2e6ea] bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  {card.highlighted && (
                    <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-2xl bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1f5f9]">
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1f2933]">{card.title}</h3>
                  <p className="mt-3 min-h-[72px] text-base leading-[1.65] text-[#3b4652]">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className={`mt-6 inline-flex items-center gap-2 font-semibold ${
                      card.highlighted ? 'text-brand-ink hover:text-brand' : 'text-[#374151] hover:text-brand-ink'
                    }`}
                  >
                    {card.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              What makes me different
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mx-auto mt-8 max-w-4xl text-center text-base leading-[1.75] text-[#3b4652] sm:text-[18px]">
              <p>Most pricing consultants give you frameworks.</p>
              <p className="mt-2">Most analysts give you rigor.</p>
              <p className="mt-2">Most startup operators give you speed.</p>
              <p className="mt-4 font-semibold text-[#1f2933]">I sit at the intersection.</p>
              <p className="mt-4">
                I do not just give pricing advice. I work more like a fractional Chief Economist
                for startups making consequential monetization decisions.
              </p>
            </div>
            <div className="mx-auto mt-10 h-px w-full bg-[#e2e6ea]" />
            <h3 className="mt-10 text-center font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-[32px]">
              Why clients hire me
            </h3>
            <div className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="text-left">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e2e6ea] bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-brand" aria-hidden />
                    </div>
                    <h4 className="text-[20px] font-semibold leading-tight text-[#1f2933] sm:text-[22px]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-base leading-[1.65] text-[#3b4652]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              What founders say
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <figure
                  key={item.author}
                  className="rounded-2xl border border-[#e2e6ea] bg-white p-5 sm:p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <blockquote className="text-base italic leading-[1.75] text-[#1f2933] sm:text-[18px]">
                    &quot;{item.quote}&quot;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-[#3b4652]">
                    <p className="font-semibold text-[#1f2933]">{item.author}</p>
                    <p>{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-gradient-to-b from-[#f8fafc] to-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              Need more than one session?
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
              {deeperServices.map((service) => (
                <div
                  key={service.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#e2e6ea] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[340px] w-full sm:h-[420px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1228]/85 via-[#111827]/45 to-[#111827]/15" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <h3 className="text-xl font-semibold leading-tight text-white sm:text-[32px]">
                        {service.title}
                      </h3>
                      <p className="mt-3 min-h-[72px] text-base leading-[1.65] text-[#d1d5db]">
                        {service.description}
                      </p>
                      <Link
                        href={service.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#f97316] hover:text-[#fb923c]"
                      >
                        {service.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mt-8 space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={item.q}
                  open={index === 0}
                  className={`group rounded-2xl border bg-white shadow-sm transition-all ${
                    index === 0 ? 'border-brand/60' : 'border-[#d6dce4]'
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
                    <h3 className="text-lg font-semibold text-[#0f172a] sm:text-xl">{item.q}</h3>
                    <ChevronDown
                      className="h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <div className="border-t border-[#e2e6ea] px-5 py-4 text-[15px] leading-[1.7] text-[#3b4652] sm:px-7 sm:py-5 sm:text-base sm:leading-[1.75]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand py-12 text-brand-on sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-4 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-3xl font-bold leading-tight text-white sm:text-[42px]">
              Need a sharper pricing decision before your next move?
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#fcb79a]" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-soft sm:text-[19px]">
              Start with the 90-Minute Pricing Strategy Session.
            </p>
            <div className="mt-8">
              <Link
                href={PRIMARY_CTA_HREF}
                className="inline-block rounded-full bg-white px-7 py-3 text-lg font-bold text-brand transition-colors hover:bg-brand-soft"
              >
                Book the 90-Minute Pricing Strategy Session
              </Link>
            </div>
            <p className="mt-5 text-sm text-brand-soft sm:text-base">
              <Link href={CONSULT_CTA_HREF} className="underline underline-offset-4 hover:text-white">
                Need a broader conversation? Book a Free Consult
              </Link>
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-soft sm:text-base">
              Or explore a deeper sprint if you already know you need full pricing work.
            </p>
            <div className="mt-6">
              <Link
                href="/consulting/services/pricing-monetization-sprint"
                className={`${outlineButton} border-white text-white hover:bg-white/10`}
              >
                Explore the Pricing &amp; Monetization Sprint
              </Link>
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
