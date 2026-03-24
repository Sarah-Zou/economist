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
import { outlineButton, primaryButton } from '@/lib/brandStyles'

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
  'operator-led marketplaces',
  'hardware-enabled software businesses',
]

const bestUseCases = [
  'You are unsure how to price v1',
  'Your current pricing is not working',
  'Your unit economics are blurry',
  'Your team has data but not decision clarity',
  'Investors or leadership need a stronger economic story',
]

const selectedOutcomes: { id: string; content: ReactNode }[] = [
  {
    id: 'cac-payback',
    content: (
      <>
        Helped <strong>redesign pricing and packaging</strong> to support faster <strong>CAC payback</strong>
      </>
    ),
  },
  {
    id: 'nrr',
    content: (
      <>
        Improved <strong>monetization structure</strong> to support stronger <strong>expansion</strong> and{' '}
        <strong>NRR</strong>
      </>
    ),
  },
  {
    id: 'models-narratives',
    content: (
      <>
        Built <strong>forward models</strong>, <strong>KPI logic</strong>, and{' '}
        <strong>investor-facing economic narratives</strong> to support growth and fundraising
      </>
    ),
  },
  {
    id: 'raises',
    content: (
      <>
        Supported clients involved in <strong>$50M+</strong> in cumulative raises
      </>
    ),
  },
]

const workPrinciples = [
  {
    title: 'Hypothesis-driven',
    description:
      'Focused on what is most likely to improve revenue, retention, or margin.',
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

      <div className="bg-white text-[#1f2933]">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7f3] via-white to-white">
          <div className="pointer-events-none absolute -left-10 top-8 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="order-2 relative lg:col-span-5 lg:order-1">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.5rem] bg-white/40 ring-1 ring-[#e2e6ea] shadow-none backdrop-blur-sm sm:max-w-[500px] sm:rounded-[2rem]">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/18 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/55 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/5" />
                  <Image
                    src="/images/about_headshot.webp"
                    alt="Sarah Zou, PhD economist"
                    fill
                    priority
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="order-1 lg:col-span-7 lg:order-2 lg:pl-8 xl:pl-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-ink">
                    ABOUT
                  </span>
                </div>

                <h1 className="mt-4 text-[42px] font-black leading-[0.98] tracking-tight text-[#0f172a] sm:text-[54px] lg:text-[62px]">
                  Fractional Chief Economist for Tech Startups
                </h1>

                <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-[#6b7280] sm:text-[18px]">
                  I help founders fix pricing, monetization, and unit economics with
                  research-grade rigor and startup-speed execution. You get clear decisions, testable next steps, and a pricing story you can
                  defend with leadership and investors.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-6">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} inline-flex w-full max-w-[300px] items-center justify-center gap-3 bg-brand px-6 py-4 text-[15px] leading-[1.15] shadow-xl sm:w-auto sm:max-w-none sm:px-8 sm:text-[16px]`}
                  >
                    <span>Book a Free Consult</span>
                    <ArrowRight className="h-5 w-5 flex-shrink-0" aria-hidden />
                  </Link>

                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="text-sm font-medium leading-[1.3] text-[#6b7280] underline underline-offset-4 hover:text-brand-ink"
                  >
                    See Ways to Work With Me
                  </Link>
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#334155]">
                    Background &amp; Experience
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
                    {heroProofPoints.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium leading-[1.35] text-[#0f172a] sm:text-[14px]"
                      >
                        <CheckCircle2
                          className="h-[13px] w-[13px] flex-shrink-0 text-brand"
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

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h2 className="font-serif-playfair text-2xl font-semibold text-[#0f172a] sm:text-[32px]">
                  What makes me different
                </h2>
                <div className="mt-3 h-1 w-20 rounded-full bg-brand" />
                <ul className="mt-6 space-y-3 text-base leading-[1.65] text-[#334155] sm:text-[17px]">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                    <span>Most pricing consultants give you frameworks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                    <span>Most analysts give you rigor.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                    <span>Most startup operators give you speed.</span>
                  </li>
                </ul>
                <p className="mt-4 text-[30px] font-semibold leading-[1.2] text-[#0f172a] sm:text-[34px]">
                  I bring all three together.
                </p>
                <p className="mt-4 max-w-[720px] text-base leading-[1.75] text-[#334155] sm:text-[18px]">
                  I combine pricing strategy, unit economics, and econometric rigor in one person,
                  then turn that work into practical recommendations, fast testable next steps,
                  and a monetization logic that can stand up to investor and board scrutiny.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="mx-auto max-w-[460px] rounded-2xl border border-[#e7ebf0] bg-white p-4 shadow-sm sm:p-5 lg:ml-auto">
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <Briefcase className="h-[15px] w-[15px] text-brand" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-semibold leading-tight text-[#0f172a] sm:text-[22px]">
                          Strategy
                        </h3>
                        <p className="mt-1 text-[15px] leading-[1.65] text-[#475569] sm:text-base">
                          Practical founder-facing recommendations instead of vague strategy talk.
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-[#edf2f7]" />

                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <BarChart3 className="h-[15px] w-[15px] text-brand" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-semibold leading-tight text-[#0f172a] sm:text-[22px]">
                          Rigor
                        </h3>
                        <p className="mt-1 text-[15px] leading-[1.65] text-[#475569] sm:text-base">
                        Research-grade quantitative analysis that removes guesswork from pricing.
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-[#edf2f7]" />

                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <Zap className="h-[15px] w-[15px] text-brand" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-semibold leading-tight text-[#0f172a] sm:text-[22px]">
                          Speed
                        </h3>
                        <p className="mt-1 text-[15px] leading-[1.65] text-[#475569] sm:text-base">
                          Actionable steps you can implement and test this week.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#1f3548] bg-[#132233] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="font-serif-playfair text-2xl font-semibold leading-tight text-white sm:text-[32px]">
                  Who I help
                </h2>
                <p className="mt-3 text-base leading-[1.75] text-[#d6dee8] sm:text-[18px]">
                  I work with pre-seed to Series A teams building:
                </p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {companyTypes.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-[#263b4f] bg-[#1a2c3f] px-3.5 py-2.5 text-[14px] font-medium leading-[1.35] text-white sm:text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="relative inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#314557]">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          <span className="pointer-events-none absolute inset-[3px] rounded-full border border-brand/70" />
                        </span>
                        <span>{item}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6 lg:pl-6 xl:pl-10">
                <h3 className="font-serif-playfair text-2xl font-semibold leading-tight text-white sm:text-[32px]">
                  I am most useful when:
                </h3>
                <ul className="mt-5 space-y-3.5 text-base leading-[1.6] text-[#e6edf5] sm:text-[17px]">
                  {bestUseCases.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="relative mt-[7px] inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#3a4f63]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold sm:text-[32px]">
              Selected outcomes
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {selectedOutcomes.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#e2e6ea] bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
                    {index === 0 && <Rocket className="h-5 w-5 text-brand" aria-hidden />}
                    {index === 1 && <LineChart className="h-5 w-5 text-brand" aria-hidden />}
                    {index === 2 && <BarChart3 className="h-5 w-5 text-brand" aria-hidden />}
                    {index === 3 && <ShieldCheck className="h-5 w-5 text-brand" aria-hidden />}
                  </div>
                  <p className="mt-4 text-base leading-[1.75] text-[#1f2933] sm:text-[18px]">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[#3b4652]">
              Selected results are representative; details available under NDA.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-[32px]">
                  How I work
                </h2>
                <div className="mt-3 h-1 w-20 rounded-full bg-brand" />

                <p className="mt-6 text-base leading-[1.75] text-[#3b4652] sm:text-[18px]">
                  I bring an economist&apos;s rigor with an operator&apos;s speed. Every
                  recommendation is:
                </p>

                <div className="mt-6 space-y-5">
                  {workPrinciples.map((item, index) => (
                    <div key={item.title} className="space-y-2">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-[24px] font-semibold leading-[1.2] text-[#1f2933] sm:text-[28px]">
                            {item.title}
                          </h3>
                          <p className="text-base leading-[1.7] text-[#3b4652] sm:text-[17px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      {index < workPrinciples.length - 1 && (
                        <div className="ml-4 h-6 w-px bg-[#d7dce2]" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-7 border-t border-[#e2e6ea] pt-6">
                  <p className="text-base leading-[1.75] text-[#334155] sm:text-[18px]">
                    That way your team gets decisions, not dashboards, and your board gets a clear
                    economic narrative behind the numbers.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl border border-[#e2e6ea] shadow-xl">
                  <div className="relative h-[320px] sm:h-[460px] lg:h-[620px]">
                    <Image
                      src="/images/processsteps.webp"
                      alt="Team reviewing business metrics and growth strategy"
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h2 className="font-serif-playfair text-[34px] font-semibold leading-[1.08] text-[#0f172a] sm:text-[42px]">
                  Why I built this
                  <br />
                  practice
                </h2>
                <div className="mt-5 h-1 w-14 rounded-full bg-brand" />
                <p className="mt-6 text-[23px] font-semibold leading-[1.25] text-[#b54717] sm:text-[28px]">
                  Bridging the gap between academic rigor and startup speed.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="space-y-6 text-base leading-[1.75] text-[#3b4652] sm:text-[18px]">
                  <p>
                    My background spans economics, statistical research, enterprise strategy, and
                    startup work. I was trained to think carefully and rigorously-through a <strong>PhD</strong>{' '}
                    in Economics at Rutgers, an <strong>MS</strong> in Finance and Statistics at UIUC,
                    and research work with <strong>NBER</strong> and the <strong>World Bank</strong>.
                  </p>
                  <p>
                    I brought that rigor into industry at <strong>Citigroup</strong> building
                    risk/forecasting models, then at <strong>Capgemini</strong> leading
                    digital-transformation and GenAI initiatives where complex analysis had to
                    become executive decisions.
                  </p>

                  <div className="border-l-4 border-brand pl-5 sm:pl-6">
                    <p className="text-[22px] font-semibold leading-[1.35] text-[#0f172a] sm:text-[28px]">
                      Over time, I saw the same gap again and again: early-stage teams often need
                      serious economic thinking, but in a form they can actually use this week.
                    </p>
                    <p className="mt-4 text-[21px] font-semibold leading-[1.25] text-[#b54717] sm:text-[25px]">
                      That is the gap I fill.
                    </p>
                  </div>

                  <p>
                    I started <strong>EconNova Consulting</strong> to offer something different: rigorous economic thinking, 
                    practical strategy, and clear decision support designed for founders who need to move quickly and get it right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand py-12 text-brand-on sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-4 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-3xl font-bold leading-tight text-white sm:text-[42px]">
              Need sharper pricing, clearer economics, or a monetization decision you can defend?
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#fcb79a]" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-soft sm:text-[19px]">
              Book a free consult and I&apos;ll help you identify the biggest pricing or
              unit-economics risk in your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={PRIMARY_CTA_HREF}
                className="inline-block rounded-full bg-white px-7 py-3 text-lg font-bold text-brand transition-colors hover:bg-brand-soft"
              >
                Book a Free Consult
              </Link>
              <Link
                href={SECONDARY_CTA_HREF}
                className={`${outlineButton} border-white text-white hover:bg-white/10`}
              >
                See Ways to Work With Me
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
