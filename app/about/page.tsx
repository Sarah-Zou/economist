import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  LineChart,
  Rocket,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { outlineButton, primaryButtonLg } from '@/lib/brandStyles'

const PRIMARY_CTA_HREF = '/book'
const SECONDARY_CTA_HREF = '/consulting'

const heroProofPoints = [
  'PhD Economics',
  'MS Finance & Statistics',
  'NBER / World Bank research',
  'Citigroup',
  'Capgemini',
  'Startup pricing & ops',
]

const companyTypes = [
  'SaaS',
  'AI products',
  'API platforms',
  'OSS-commercial products',
  'Operator-led marketplaces',
  'Hardware-enabled software',
]

const bestUseCases = [
  'You are unsure how to price v1',
  'Your current pricing is not working',
  'Your unit economics are blurry',
  'Your team has data but not decision clarity',
  'Investors or leadership need a stronger economic story',
]

const selectedOutcomes: { id: string; icon: typeof Rocket; content: ReactNode }[] = [
  {
    id: 'cac-payback',
    icon: Rocket,
    content: (
      <>
        Helped <strong>redesign pricing and packaging</strong> to support faster{' '}
        <strong>CAC payback</strong>.
      </>
    ),
  },
  {
    id: 'nrr',
    icon: LineChart,
    content: (
      <>
        Improved <strong>monetization structure</strong> to support stronger{' '}
        <strong>expansion</strong> and <strong>NRR</strong>.
      </>
    ),
  },
  {
    id: 'models-narratives',
    icon: BarChart3,
    content: (
      <>
        Built <strong>forward models</strong>, <strong>KPI logic</strong>, and{' '}
        <strong>investor-facing economic narratives</strong> to support growth and fundraising.
      </>
    ),
  },
  {
    id: 'raises',
    icon: ShieldCheck,
    content: (
      <>
        Supported clients involved in <strong>$50M+</strong> in cumulative raises.
      </>
    ),
  },
]

const workPrinciples = [
  {
    title: 'Hypothesis-driven',
    description: 'Focused on what is most likely to improve revenue, retention, or margin.',
  },
  {
    title: 'Documented',
    description: 'Clear about assumptions, tradeoffs, and decision logic.',
  },
  {
    title: 'Testable',
    description: 'Built to be launched, measured, and refined in the real business.',
  },
]

const pillars = [
  {
    icon: Briefcase,
    title: 'Strategy',
    desc: 'Practical founder-facing recommendations instead of vague strategy talk.',
  },
  {
    icon: BarChart3,
    title: 'Rigor',
    desc: 'Research-grade quantitative analysis that removes guesswork from pricing.',
  },
  {
    icon: Zap,
    title: 'Speed',
    desc: 'Actionable steps you can implement and test this week.',
  },
]

export const metadata: Metadata = {
  title: 'About | Fractional Chief Economist for Tech Startups',
  description:
    'Fractional Chief Economist support for pre-seed to Series A tech startups: pricing, monetization, and unit economics with research-grade rigor and startup-speed execution.',
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
    canonical: 'https://sarahzou.com/about',
  },
  openGraph: {
    title: 'About | Fractional Chief Economist for Tech Startups',
    description:
      'Pricing, monetization, and unit economics support for startup founders who need clear decisions and investor-defensible economics.',
    type: 'website',
    url: 'https://sarahzou.com/about',
    images: ['https://sarahzou.com/images/about_headshot.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Fractional Chief Economist for Tech Startups',
    description:
      'Pricing, monetization, and unit economics support for startup founders who need clear decisions and investor-defensible economics.',
    images: ['https://sarahzou.com/images/about_headshot.webp'],
  },
}

export default function AboutPage() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sarah Zou',
    honorificSuffix: 'PhD',
    alternateName: 'Dr. Sarah Zou',
    jobTitle: 'Fractional Chief Economist',
    description:
      'PhD economist helping early-stage tech startups improve pricing, monetization, and unit economics with research-grade rigor and startup-speed execution.',
    url: 'https://sarahzou.com/about',
    image: 'https://sarahzou.com/images/about_headshot.webp',
    sameAs: ['https://www.linkedin.com/in/drsarahzou/'],
    knowsAbout: [
      'Pricing',
      'Monetization',
      'Unit Economics',
      'Econometrics',
      'Startup Economics',
      'Investor Storytelling',
    ],
  }

  return (
    <>
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
                      src="/images/about_headshot.webp"
                      alt="Sarah Zou, PhD economist"
                      fill
                      priority
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="media-rule mx-auto max-w-[380px] text-center lg:max-w-[400px]">
                  <p className="media-caption">Economist. Operator. Advisor.</p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="kicker-accent">About</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Fractional Chief Economist for technical founders.
                </h1>
                <p className="lede mt-6 max-w-[34rem]">
                  I help founders fix pricing, monetization, and unit economics with research-grade
                  rigor and startup-speed execution &mdash; clear decisions, testable next steps,
                  and a pricing story you can defend with leadership and investors.
                </p>
                <p className="meta-note mt-5">
                  Best fit for technical teams making consequential commercial decisions.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                  >
                    Book a free consult
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className="display-link">
                    See ways to work with me
                  </Link>
                </div>

                <div className="mt-12 grid max-w-2xl gap-x-6 gap-y-3 border-t border-border-soft pt-6 sm:grid-cols-2">
                  <p className="text-[12px] uppercase tracking-[0.12em] text-text-subtle">
                    Background &amp; experience
                  </p>
                  <ul className="col-span-full flex flex-wrap gap-x-6 gap-y-3">
                    {heroProofPoints.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 text-[13px] text-text-muted"
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5 flex-shrink-0 text-brand"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What makes me different */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <span className="kicker">What makes me different</span>
                <h2 className="section-title">Strategy, rigor, and speed in one person</h2>
                <ul className="mt-6 space-y-3 text-[16px] leading-[1.7] text-text sm:text-[17px]">
                  {[
                    'Most pricing consultants give you frameworks.',
                    'Most analysts give you rigor.',
                    'Most startup operators give you speed.',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-serif-playfair text-[24px] leading-[1.25] text-ink sm:text-[28px]">
                  I bring all three together.
                </p>
                <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                  I combine pricing strategy, unit economics, and econometric rigor in one person —
                  then turn that work into practical recommendations, fast testable next steps, and
                  a monetization logic that can stand up to investor and board scrutiny.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-6 border-l border-border pl-6">
                  {pillars.map((pillar, idx) => {
                    const Icon = pillar.icon
                    return (
                      <div key={pillar.title}>
                        <div className="flex items-start gap-4">
                          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] bg-brand-soft">
                            <Icon className="h-4 w-4 text-brand" aria-hidden />
                          </div>
                          <div>
                            <h3 className="text-[17px] font-semibold leading-tight text-ink">
                              {pillar.title}
                            </h3>
                            <p className="mt-1 text-[14px] leading-[1.65] text-text-muted">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                        {idx < pillars.length - 1 && <div className="mt-6 h-px bg-border-soft" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who I help */}
        <section className="section">
          <div className="section-shell">
            <div className="card-dark">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    Who I help
                  </span>
                  <h2 className="mt-4 font-serif-playfair text-white">
                    Pre-seed to Series A teams building:
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {companyTypes.map((item) => (
                      <li
                        key={item}
                        className="border-b border-white/10 pb-3 text-[14px] font-medium text-white"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          <span>{item}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    Best fit
                  </span>
                  <h3 className="mt-4 font-serif-playfair text-white">
                    I&apos;m most useful when:
                  </h3>
                  <ul className="mt-6 space-y-3 text-[15px] leading-[1.6] text-white/85">
                    {bestUseCases.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected outcomes */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Selected outcomes</span>
              <h2 className="section-title">What the work has looked like</h2>
            </div>
            <div className="mt-12 divide-y divide-border-soft border-y border-border-soft">
              {selectedOutcomes.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    className="grid gap-4 py-5 md:grid-cols-[auto_1fr] md:items-start md:gap-5"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-soft">
                      <Icon className="h-4 w-4 text-brand" aria-hidden />
                    </div>
                    <p className="text-[16px] leading-[1.8] text-text sm:text-[17px]">
                      {item.content}
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="mt-8 text-center text-[13px] text-text-muted">
              Selected results are representative; details available under NDA.
            </p>
          </div>
        </section>

        {/* How I work + image */}
        <section className="section">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <span className="kicker">How I work</span>
                <h2 className="section-title">Rigor, operated like a startup</h2>
                <p className="mt-5 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                  I bring an economist&apos;s rigor with an operator&apos;s speed. Every
                  recommendation is:
                </p>

                <div className="mt-8 space-y-8">
                  {workPrinciples.map((item, index) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-ink shadow-card">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-[18px] font-semibold leading-[1.25] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[15px] leading-[1.7] text-text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border-soft pt-6">
                  <p className="text-[15px] leading-[1.75] text-text-muted sm:text-[16px]">
                    Your team gets decisions, not dashboards — and your board gets a clear economic
                    narrative behind the numbers.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="media-shell aspect-[4/5] bg-[#f1ece5] p-3">
                  <div className="media-inner">
                    <Image
                      src="/images/processsteps.webp"
                      alt="Team reviewing business metrics and growth strategy"
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="media-caption text-center sm:text-left">
                  The work is designed to help founders move from ambiguity to a decision they can
                  defend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why I built this */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="kicker">Story</span>
                <h2 className="section-title">Why I built this practice</h2>
                <p className="mt-6 font-serif-playfair text-[22px] italic leading-[1.3] text-brand-ink sm:text-[24px]">
                  Bridging the gap between academic rigor and startup speed.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-6 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                  <p>
                    My background spans economics, statistical research, enterprise strategy, and
                    startup work. I was trained to think carefully and rigorously — through a{' '}
                    <strong className="text-ink">PhD</strong> in Economics at Rutgers, an{' '}
                    <strong className="text-ink">MS</strong> in Finance and Statistics at UIUC, and
                    research work with <strong className="text-ink">NBER</strong> and the{' '}
                    <strong className="text-ink">World Bank</strong>.
                  </p>
                  <p>
                    I brought that rigor into industry at{' '}
                    <strong className="text-ink">Citigroup</strong> building risk and forecasting
                    models, then at <strong className="text-ink">Capgemini</strong> leading
                    digital-transformation and GenAI initiatives where complex analysis had to
                    become executive decisions.
                  </p>

                  <blockquote className="quote-block">
                    <p className="font-serif-playfair text-[20px] leading-[1.4] text-ink sm:text-[22px]">
                      Over time, I saw the same gap again and again: early-stage teams need serious
                      economic thinking, but in a form they can actually use this week.
                    </p>
                    <p className="mt-4 text-[15px] font-semibold text-brand-ink">
                      That is the gap I fill.
                    </p>
                  </blockquote>

                  <p>
                    I started <strong className="text-ink">EconNova Consulting</strong> to offer
                    something different: rigorous economic thinking, practical strategy, and clear
                    decision support designed for founders who need to move quickly and get it
                    right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-sm">
          <div className="section-shell max-w-4xl">
            <div className="cta-panel">
              <h2 className="font-serif-playfair text-ink">
                Need sharper pricing, clearer economics, or a monetization decision you can defend?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Book a free consult and I&apos;ll help you identify the biggest pricing or
                unit-economics risk in your business.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                  Book a free consult
                </Link>
                <Link href={SECONDARY_CTA_HREF} className={outlineButton}>
                  See ways to work with me
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
