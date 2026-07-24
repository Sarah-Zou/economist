import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import FAQList from '@/components/FAQList'

const PRIMARY_CTA_HREF = '/diagnostic-note'
const SECONDARY_CTA_HREF = '/book'
const HOME_SOCIAL_IMAGE = 'https://sarahzou.com/images/og-home-norm.png'

const credentials = [
  {
    number: '01',
    category: 'Academic training',
    title: 'PhD, Economics',
    detail: 'Rutgers University',
  },
  {
    number: '02',
    category: 'Economic research',
    title: 'NBER & World Bank',
    detail: 'Applied research across markets and institutions',
  },
  {
    number: '03',
    category: 'Operating perspective',
    title: 'Infrastructure, finance & consulting',
    detail: 'Operator experience; formerly Citigroup and Capgemini',
  },
]

const decisionFocus = [
  {
    number: '01',
    title: 'Pricing architecture',
    description:
      'A model that reflects how customers receive value and how the product creates cost.',
  },
  {
    number: '02',
    title: 'Value metric selection',
    description:
      'A clear basis for charging across usage, credits, capacity, outcomes, or hybrid models.',
  },
  {
    number: '03',
    title: 'Packaging and GTM',
    description:
      'Offers that technical buyers can evaluate, adopt, and expand without unnecessary friction.',
  },
  {
    number: '04',
    title: 'Unit economics',
    description: 'Cost floors, margin logic, and commercial assumptions that hold up in diligence.',
  },
]

const engagementOutputs = [
  'A defensible value metric',
  'Pricing and packaging recommendation',
  'Unit-economics and cost-floor view',
  'Prioritized commercial decisions',
]

const otherEngagements = [
  {
    label: 'Pricing & Monetization Sprint',
    sub: 'Full pricing structure, packaging, and rollout plan',
    href: '/consulting/services/pricing-monetization-sprint',
  },
  {
    label: 'Growth Economics, Forecasting & Unit Economics',
    sub: 'Revenue-model logic, KPI design, forward models, and investor-ready assumptions',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    label: 'Fractional or Embedded Strategy Support',
    sub: 'Ongoing commercial strategy, monetization, and board-facing economics',
    href: '/consulting/services/on-call-economist-retainer',
  },
]

const publishedWork = [
  {
    label: 'Pricing & Monetization Wiki',
    sub: 'An open reference library for pricing, packaging, and monetization decisions.',
    href: '/wiki/pricing',
    type: 'Reference library',
  },
  {
    label: 'Startup Fundraising Library',
    sub: 'Clear explanations of funding mechanics, instruments, valuation, and dilution.',
    href: '/fundraising',
    type: 'Reference library',
  },
  {
    label: 'Research Notes',
    sub: 'Published analysis on pricing, unit economics, and commercial strategy for infrastructure founders.',
    href: '/newsletter',
    type: 'Selected writing',
  },
]

const faqItems = [
  {
    q: 'What kinds of commercial questions do you work on?',
    a: (
      <>
        Pricing architecture, value-metric selection, usage, credit and committed-use model design,
        GTM for technical buyers, paid-pilot structuring, unit economics, cost-floor modeling, and
        fundraising-ready commercial narratives. Read more{' '}
        <Link
          href="/about"
          className="underline decoration-border-subtle underline-offset-4 transition-colors hover:text-ink"
        >
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
        Most founders start with a free one-page diagnostic note: the lowest-risk way to see how I
        think before anything is paid. From there, the two-week Commercial Architecture Diagnostic
        is the usual next step. If the work is already clearly broader, a deeper sprint may fit.
      </>
    ),
  },
  {
    q: 'What does it cost?',
    a: (
      <>
        The Commercial Architecture Diagnostic is a fixed fee of $9,500 and begins with a free
        one-page diagnostic note. Deeper engagements are also fixed-fee: the Pricing & Monetization
        Build is $22,000 and the Growth Economics Build is $18,000. Ongoing advisory is $9,000 per
        month with a three-month minimum.
      </>
    ),
  },
]

export const metadata: Metadata = {
  title:
    'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou, PhD',
  description:
    'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed-Series B). Start with a free one-page diagnostic note.',
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
      'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed-Series B). Start with a free one-page diagnostic note.',
    type: 'website',
    url: 'https://sarahzou.com',
    images: [HOME_SOCIAL_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Pricing & Commercial Strategy for AI-Infrastructure & Data-Platform Companies | Sarah Zou, PhD',
    description:
      'Pricing, packaging, and unit-economics strategy for AI-infrastructure, API, and data-platform founders (Seed-Series B). Start with a free one-page diagnostic note.',
    images: [HOME_SOCIAL_IMAGE],
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
          text: 'Pricing architecture, value-metric selection, usage, credit and committed-use model design, GTM for technical buyers, paid-pilot structuring, unit economics and gross-margin logic for API, infrastructure and hardware-software products, cost-floor modeling, and fundraising-ready commercial narratives.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most founders start with a free one-page diagnostic note, the lowest-risk way to see how I think before anything is paid. From there, the two-week Commercial Architecture Diagnostic is the usual next step.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Commercial Architecture Diagnostic is a fixed fee of $9,500 and begins with a free one-page diagnostic note. Deeper engagements are also fixed-fee: the Pricing & Monetization Build is $22,000 and the Growth Economics Build is $18,000. Ongoing advisory is $9,000 per month with a three-month minimum.',
        },
      },
    ],
  }

  return (
    <>
      <div id="home-norm" className="overflow-hidden bg-page text-text">
        <section
          className="relative isolate min-h-[740px] overflow-hidden bg-ink sm:min-h-[780px] lg:min-h-[820px]"
          aria-labelledby="home-hero-title"
        >
          <Image
            src="/images/hero-social-card-style-v4.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[80%_center] md:object-[76%_center] lg:object-center"
            priority
          />

          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,22,30,0.9)_0%,rgba(9,22,30,0.68)_38%,rgba(9,22,30,0.12)_72%,rgba(9,22,30,0.02)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,22,30,0.8)_0%,rgba(9,22,30,0.04)_58%)] sm:bg-[linear-gradient(0deg,rgba(9,22,30,0.55)_0%,rgba(9,22,30,0)_54%)]"
            aria-hidden
          />

          <div className="section-shell relative z-10 flex min-h-[740px] items-end pb-16 pt-32 sm:min-h-[780px] sm:pb-20 lg:min-h-[820px] lg:pb-24">
            <div className="max-w-[47rem] text-white">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                Pricing &middot; GTM &middot; Unit Economics
              </p>
              <h1
                id="home-hero-title"
                className="mt-6 max-w-[44rem] font-serif-playfair text-white"
              >
                Commercial clarity for complex technical products.
              </h1>
              <p className="mt-7 max-w-[36rem] text-[17px] leading-[1.75] text-white/[0.82] sm:text-[19px]">
                I help AI-infrastructure, API, and data-platform founders make pricing, packaging,
                and growth decisions they can defend - to buyers, teams, and investors.
              </p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="group inline-flex items-center gap-2 border-b border-white pb-1 text-[15px] font-medium text-white transition-colors hover:border-white/[0.55] hover:text-white/80"
                >
                  Request a free diagnostic note
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/consulting"
                  className="border-b border-white/40 pb-1 text-[15px] text-white/75 transition-colors hover:border-white hover:text-white"
                >
                  Explore the practice
                </Link>
              </div>
            </div>
          </div>

          <p className="absolute bottom-6 right-8 z-10 hidden border-t border-white/25 pt-3 text-[11px] uppercase tracking-[0.16em] text-white/[0.55] xl:block">
            Sarah Zou, PhD &middot; Independent economist and operator
          </p>
        </section>

        <section className="border-b border-border-soft">
          <div className="section-shell grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20 lg:py-32">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
              The practice
            </p>
            <div className="max-w-[48rem]">
              <h2 className="font-serif-playfair text-ink">
                Economist discipline. Operator context. Advice built for the commercial realities of
                deep technology.
              </h2>
              <p className="mt-7 max-w-[42rem] text-[16px] leading-[1.85] text-text-muted sm:text-[17px]">
                Independent commercial strategy for founders navigating consumption-shaped pricing,
                uncertain cost floors, and technical buying journeys. Every engagement ends with a
                clear recommendation, the tradeoffs named, and a practical path forward.
              </p>
            </div>
          </div>
        </section>

        <section
          className="border-b border-border-soft"
          aria-labelledby="selected-credentials-title"
        >
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <div className="grid gap-8 border-b border-border-soft pb-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Selected credentials
              </p>
              <div>
                <h2
                  id="selected-credentials-title"
                  className="max-w-[43rem] font-serif-playfair text-ink"
                >
                  Research depth, quantitative training, and operating context.
                </h2>
                <p className="mt-5 max-w-[40rem] text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                  A background built to connect economic reasoning with the commercial decisions
                  technical companies face in practice.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3">
              {credentials.map((credential, index) => (
                <article
                  key={credential.title}
                  className={`py-8 sm:px-6 lg:py-10 ${
                    index > 0 ? 'border-t border-border-soft sm:border-l sm:border-t-0' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-subtle">
                      {credential.category}
                    </p>
                    <span className="text-[11px] tracking-[0.14em] text-text-subtle">
                      {credential.number}
                    </span>
                  </div>
                  <h3 className="mt-7 font-serif-playfair text-[23px] font-medium leading-[1.18] tracking-[-0.01em] text-ink">
                    {credential.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-text-muted">
                    {credential.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <figure className="relative min-h-[420px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/editorial-infrastructure.webp"
                alt="Architectural detail of modern data infrastructure and cooling systems"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,25,32,0.38),rgba(12,25,32,0.02))]"
                aria-hidden
              />
              <figcaption className="absolute bottom-5 left-5 right-5 border-t border-white/30 pt-3 text-[11px] uppercase tracking-[0.16em] text-white/[0.65]">
                The economics begin at the physical layer
              </figcaption>
            </figure>

            <div className="px-5 py-20 sm:px-7 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/[0.55]">
                Start here
              </p>
              <h2 className="mt-5 font-serif-playfair text-white">
                The Commercial Architecture Diagnostic
              </h2>
              <p className="mt-7 max-w-[35rem] text-[16px] leading-[1.8] text-white/70 sm:text-[17px]">
                A focused two-week engagement for the pricing, packaging, or unit-economics decision
                currently constraining growth. Built for consumption- and capability-shaped
                economics, not generic per-seat SaaS.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="group inline-flex items-center gap-2 border-b border-white pb-1 text-[15px] font-medium text-white"
                >
                  Request a free diagnostic note
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <span className="text-[13px] uppercase tracking-[0.14em] text-white/[0.45]">
                  Two weeks &middot; $9,500 fixed fee
                </span>
              </div>

              <ol className="mt-12 border-t border-white/[0.18]">
                {engagementOutputs.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-8 border-b border-white/[0.18] py-5"
                  >
                    <span className="text-[16px] leading-[1.5] text-white/[0.85]">{item}</span>
                    <span className="text-[12px] tracking-[0.16em] text-white/[0.38]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section>
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-10 border-b border-border-soft pb-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Decisions, not deliverables
              </p>
              <h2 className="max-w-[45rem] font-serif-playfair text-ink">
                The commercial layer should be as carefully engineered as the product.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2">
              {decisionFocus.map((item, index) => (
                <article
                  key={item.number}
                  className={`grid grid-cols-[2.5rem_1fr] gap-4 py-9 sm:gap-6 sm:px-7 lg:py-11 ${
                    index > 0 ? 'border-t border-border-soft sm:border-t-0' : ''
                  } ${index % 2 === 1 ? 'sm:border-l sm:border-border-soft' : ''} ${
                    index > 1 ? 'sm:border-t sm:border-border-soft' : ''
                  }`}
                >
                  <span className="text-[12px] tracking-[0.14em] text-text-subtle">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-medium text-ink">{item.title}</h3>
                    <p className="mt-3 max-w-[30rem] text-[15px] leading-[1.75] text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface">
          <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24 lg:py-32">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Why this practice
              </p>
              <h2 className="mt-5 font-serif-playfair text-ink">
                Operator context, not outside advice.
              </h2>
              <figure className="mt-10">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/images/editorial-analysis.webp"
                    alt="Analytical work in progress with models, charts, and written annotations"
                    fill
                    sizes="(min-width: 1024px) 430px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                  Recommendations grounded in the model, not a template
                </figcaption>
              </figure>
            </div>
            <div className="max-w-[43rem]">
              <p className="text-[17px] leading-[1.85] text-text sm:text-[18px]">
                I operate the same kind of company I advise: an infrastructure data platform,
                pricing against real cost floors and building diligence-ready models.
              </p>
              <p className="mt-7 text-[16px] leading-[1.85] text-text-muted">
                My background spans economic research, finance, consulting, and operating work. That
                combination makes it possible to move between the product, the model, and the
                board-level commercial narrative without losing the underlying economics.
              </p>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-medium text-ink"
              >
                About Sarah
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Other engagements
              </p>
              <div>
                <h2 className="max-w-[45rem] font-serif-playfair text-ink">
                  Deeper and ongoing commercial strategy support.
                </h2>
                <ul className="mt-12 border-t border-border-soft">
                  {otherEngagements.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group grid gap-3 border-b border-border-soft py-7 sm:grid-cols-[2.5rem_1fr_auto] sm:items-start sm:gap-6"
                      >
                        <span className="text-[12px] tracking-[0.14em] text-text-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-[17px] font-medium text-ink">{item.label}</p>
                          <p className="mt-2 max-w-[38rem] text-[15px] leading-[1.7] text-text-muted">
                            {item.sub}
                          </p>
                        </div>
                        <ArrowRight
                          className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-ink sm:block"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border-soft">
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Published work
              </p>
              <div>
                <h2 className="max-w-[45rem] font-serif-playfair text-ink">
                  The methodology is open.
                </h2>
                <p className="mt-6 max-w-[39rem] text-[16px] leading-[1.8] text-text-muted">
                  Read the frameworks before hiring me - or instead of hiring me. The work should be
                  useful on its own.
                </p>
                <p className="mt-2 text-[13px] leading-[1.65] text-text-subtle">
                  Fifty percent is credited toward a deeper engagement booked within thirty days.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-px bg-border-soft lg:grid-cols-3">
              {publishedWork.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-[260px] flex-col justify-between bg-page p-7 transition-colors hover:bg-surface sm:p-9"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-subtle">
                    {item.type}
                  </p>
                  <div className="mt-16">
                    <h3 className="text-[19px] font-medium text-ink">{item.label}</h3>
                    <p className="mt-3 text-[15px] leading-[1.7] text-text-muted">{item.sub}</p>
                    <ArrowRight
                      className="mt-6 h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="section-shell grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20 lg:py-32">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                FAQ
              </p>
              <h2 className="mt-5 font-serif-playfair text-ink">Before we begin.</h2>
            </div>
            <FAQList items={faqItems} />
          </div>
        </section>

        <section className="bg-surface">
          <div className="section-shell py-20 sm:py-24 lg:py-28">
            <div className="grid gap-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                  A useful first step
                </p>
                <h2 className="mt-5 max-w-[48rem] font-serif-playfair text-ink">
                  Bring me the commercial decision you cannot yet defend.
                </h2>
              </div>
              <div className="lg:text-right">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-medium text-ink"
                >
                  Request a free diagnostic note
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <p className="mt-4 text-[13px] leading-[1.65] text-text-subtle">
                  No commitment. No pitch.
                  <br />
                  Prefer a conversation?{' '}
                  <Link href={SECONDARY_CTA_HREF} className="underline underline-offset-4">
                    Book 15 minutes.
                  </Link>
                </p>
              </div>
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
