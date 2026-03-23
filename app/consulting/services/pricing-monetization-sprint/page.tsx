import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import FAQSection from './FAQSection';
import { generateServiceJsonLd } from '@/lib/generateJsonLd';
import { primaryButton } from '@/lib/brandStyles';

export const metadata: Metadata = {
  title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
  description:
    'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
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
    canonical: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  openGraph: {
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description:
      'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description:
      'Build a pricing structure you can take to market. For AI and SaaS founders needing model, value metric, packaging, price logic, and rollout guidance in one focused sprint.',
  },
};

const SERVICE_URL = 'https://sarahzou.com/consulting/services/pricing-monetization-sprint';
const PRIMARY_CTA_HREF = '/consulting/entry-offer/form';
const SECONDARY_CTA_HREF = '#pricing';

const WHAT_YOU_GET = [
  {
    lead: 'A pricing model recommendation',
    rest: 'and the logic behind it',
  },
  {
    lead: 'A stronger value metric',
    rest: 'or meter',
  },
  {
    lead: 'A clearer package structure',
    rest: 'with better upgrade logic',
  },
  {
    lead: 'Initial price-point guidance',
    rest: 'and discount guardrails',
  },
  {
    lead: 'A rollout plan',
    rest: 'with priorities, risks, and next actions',
  },
  {
    lead: 'A stronger pricing story',
    rest: 'for customers, investors, or your team',
  },
];

const DELIVERABLES = [
  'pricing recommendation report',
  'package / tier architecture',
  'value metric recommendation',
  'initial price-point guidance',
  'rollout and experiment plan',
  'readout with decisions, tradeoffs, and next steps',
];

const WHEN_FOUNDERS_HIRE = [
  {
    lead: 'You are launching',
    rest: 'and need a first pricing structure',
  },
  {
    lead: 'You have traction',
    rest: 'but conversion or expansion feels weak',
  },
  {
    lead: 'Your packaging is unclear',
    rest: 'and upgrade paths are muddy',
  },
  {
    lead: 'You are debating',
    rest: 'seat, usage-based, hybrid, or another model',
  },
  {
    lead: 'Your current pricing',
    rest: 'feels patched together',
  },
  {
    lead: 'You need clearer pricing logic',
    rest: 'for investors, leadership, or internal alignment',
  },
];

const WORKSTREAMS = [
  {
    lead: 'Choose the right pricing model',
    rest: 'for your product and buyers',
    href: '/wiki/pricing/models-and-metering/monetization-model',
    linkLabel: 'pricing model',
  },
  {
    lead: 'Define a value metric',
    rest: 'customers can understand and your team can operate',
    href: '/wiki/pricing/models-and-metering/pricing-metric-value-metric',
    linkLabel: 'value metric',
  },
  {
    lead: 'Structure packages',
    rest: 'and upgrade paths more clearly',
    href: '/wiki/pricing/packaging-and-bundling/packaging',
    linkLabel: 'packaging',
  },
  {
    lead: 'Design good / better / best tiers',
    rest: 'or hybrid monetization logic',
    href: '/wiki/pricing/packaging-and-bundling/good-better-best',
    linkLabel: 'good / better / best',
  },
  {
    lead: 'Set initial price logic',
    rest: 'and discount guardrails',
    href: '/wiki/pricing/value-and-customers/price-fences-price-discrimination',
    linkLabel: 'price fences',
  },
  {
    lead: 'Improve entry-point',
    rest: 'and expansion logic',
    href: '/wiki/pricing/models-and-metering/freemium-model',
    linkLabel: 'freemium entry points',
  },
  {
    lead: 'Plan a re-pricing move',
    rest: 'with less chaos',
    href: '/wiki/pricing/foundations/strategic-pricing',
    linkLabel: 'strategic pricing',
  },
  {
    lead: 'Build a rollout plan',
    rest: 'with risks, priorities, and next steps',
    href: '/wiki/pricing/foundations/maximization',
    linkLabel: 'decision framework',
  },
  {
    lead: 'Strengthen the monetization story',
    rest: 'for investors, leadership, or internal alignment',
    href: '/wiki/pricing/value-and-customers/economic-value-estimation',
    linkLabel: 'economic value logic',
  },
];

const INVESTMENT_TIERS = [
  {
    name: 'Lite',
    price: '$5K+',
    desc: 'Best for founders who need a defendable first pricing structure, a simpler package design, and clear next-step guidance.',
  },
  {
    name: 'Core',
    price: '$9K+',
    desc: 'Best for startups that need a broader reset across pricing model, metric, packaging, and initial rollout planning.',
  },
  {
    name: 'Pro',
    price: '$18K+',
    desc: 'Best for complex or investor-critical cases that require deeper analysis, more research, multiple segments, or broader rollout planning.',
  },
];

const TESTIMONIALS = [
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
];

export default function PricingDiagnosticRevenueBoost() {
  const serviceJsonLd = generateServiceJsonLd({
    name: 'Pricing & Monetization Sprint',
    description:
      'Build a pricing structure you can take to market across model, value metric, packaging, price logic, and rollout in 1-2 weeks.',
    url: SERVICE_URL,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="bg-white text-[#1f2933] selection:bg-brand-soft selection:text-brand-ink">
        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7f3] via-white to-white">
            <div className="pointer-events-none absolute -left-10 top-8 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-ink">
                    PRICING & MONETIZATION SPRINT
                  </span>
                </div>
                <h1 className="mt-4 font-black tracking-tight text-[#0f172a] text-[38px] leading-[1.02] sm:text-[52px] lg:text-[62px]">
                  Build a pricing structure you can take to market
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-[1.7] text-[#6b7280] sm:text-[18px]">
                  For AI and SaaS founders who need more than a quick opinion. We work across
                  pricing model, value metric, packaging, price logic, and rollout so your
                  monetization system works together.
                </p>
                <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-[#dfe5eb] bg-[#f8fafc] px-6 py-7 shadow-sm sm:px-8">
                  <div className="grid gap-6 text-left sm:grid-cols-3 sm:gap-8">
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#64748b]">
                        Best for
                      </p>
                      <p className="mt-2 text-xl font-semibold leading-[1.35] text-[#0f172a]">
                        Launch, re-pricing,
                        <br />
                        weak monetization, or
                        <br />
                        investor decisions
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#64748b]">
                        Typical scope
                      </p>
                      <p className="mt-2 text-xl font-semibold leading-[1.35] text-[#0f172a]">
                        1-2 weeks
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#64748b]">
                        Starting at
                      </p>
                      <p className="mt-2 text-xl font-semibold leading-[1.35] text-[#0f172a]">$5K</p>
                    </div>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} inline-flex w-full max-w-[360px] items-center justify-center gap-2 bg-brand px-6 py-4 sm:w-auto sm:max-w-none`}
                  >
                    Book the 90-Minute Pricing Strategy Session
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="inline-flex w-full max-w-[360px] items-center justify-center rounded-full border border-[#d6dce4] bg-white px-6 py-4 text-center font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:max-w-none"
                  >
                    See pricing and scope
                  </Link>
                </div>
                <p className="mx-auto mt-7 inline-flex max-w-3xl items-start gap-2 rounded-full border border-[#e2e6ea] bg-white/80 px-4 py-2 text-left text-sm text-[#3b4652]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  Most founders start with the 90-minute session. If we continue into a sprint
                  within 14 days, the $600 session fee is credited toward the project.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#f6f8fb] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  What you get
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  This is not just high-level strategy. It is focused pricing work designed to
                  produce decisions you can use.
                </h2>
              </div>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe5eb] bg-white p-8 shadow-sm sm:p-9">
                  <h3 className="text-[34px] font-semibold leading-[1.2] text-[#1f2933]">
                    You leave with:
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {WHAT_YOU_GET.map((item) => (
                      <li key={item.lead} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e68f74]" aria-hidden />
                        <span className="text-base leading-[1.6] text-[#1f2933]">
                          <strong>{item.lead}</strong> {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#dfe5eb] bg-white p-8 shadow-sm sm:p-9">
                  <h3 className="text-[34px] font-semibold leading-[1.2] text-[#1f2933]">
                    Typical deliverables
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {DELIVERABLES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d5d9df]" aria-hidden />
                        <span className="text-base font-semibold leading-[1.6] text-[#1f2933] capitalize">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-t border-[#e8ecf1] pt-6 text-sm leading-[1.7] text-[#3b4652]">
                    <strong>Note:</strong> Exact deliverables depend on scope. Some projects are
                    narrower. Some require deeper research.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  Start here: session or sprint?
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  Most founders start with the 90-minute Pricing Strategy Session.
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  That is usually the fastest way to tell whether you need one sharp recommendation
                  or a broader pricing reset.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#dfe5eb] bg-[#f8fafc] p-7 shadow-sm sm:p-8">
                  <h3 className="text-3xl font-semibold leading-[1.2] text-[#1f2933]">
                    Start with the 90-minute session if you need:
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {[
                      'one key pricing decision resolved',
                      'a fast expert recommendation',
                      'a lower-risk way to test whether deeper work is needed',
                    ].map((item) => (
                      <li key={item} className="border-t border-[#e6ebf0] pt-4 first:border-0 first:pt-0">
                        <span className="text-base leading-[1.6] text-[#1f2933]">
                          <strong className="capitalize">{item.split(' ')[0]}</strong>{' '}
                          {item.split(' ').slice(1).join(' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#bf3f0f] bg-[#c94812] p-7 text-white shadow-sm sm:p-8">
                  <h3 className="text-3xl font-semibold leading-[1.2] text-white">
                    Move into the sprint if you need:
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {[
                      'a full pricing structure, not just a quick opinion',
                      'model, metric, packaging, and pricing to work together',
                      'pricing structure you can actually take to market',
                      'a stronger monetization story before launch, fundraising, or a pricing reset',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 inline-block h-0.5 w-4 shrink-0 rounded-full bg-white/65" />
                        <span className="text-base leading-[1.6] text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-[#dfe5eb] bg-[#f8fafc] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#4b5563]">
                Session = One key pricing decision &nbsp; | &nbsp; Sprint = Full pricing structure
                & rollout
              </div>
              <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#f0d3c7] bg-[#fff3ed] p-5 text-center">
                <p className="text-base font-medium leading-[1.6] text-[#9a4d2d]">
                  If we move into a Pricing &amp; Monetization Sprint within 14 days, the $600
                  session fee is credited toward the project.
                </p>
              </div>
            </div>
          </section>

          <section id="pricing" className="bg-[#f6f8fb] py-14 scroll-mt-24 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  Investment
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  Sprint engagements start at $5K and scale with complexity.
                </h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {INVESTMENT_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl border p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      tier.name === 'Core'
                        ? 'border-[#bf3f0f] bg-[#c94812] text-white'
                        : 'border-[#dfe5eb] bg-white'
                    }`}
                  >
                    <p
                      className={`text-[12px] font-medium uppercase tracking-[0.2em] ${
                        tier.name === 'Core' ? 'text-white/80' : 'text-[#6b7280]'
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={`mt-2 text-5xl font-extrabold tracking-tight ${
                        tier.name === 'Core' ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {tier.price}
                    </p>
                    <p
                      className={`mt-5 text-base leading-[1.65] ${
                        tier.name === 'Core' ? 'text-white/90' : 'text-[#3b4652]'
                      }`}
                    >
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-[1.7] text-[#3b4652]">
                Not sure which scope fits? Start with the 90-minute session. I&apos;ll tell you
                honestly whether you need the sprint at all.
              </p>
              <div className="mt-6 text-center">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="inline-flex items-center justify-center rounded-full border border-[#d6dce4] bg-white px-7 py-3 text-base font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Book the 90-Minute Session
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-10 md:grid-cols-[1fr_1.35fr]">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    The trigger
                  </p>
                  <h2 className="mt-4 font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                    When founders hire me for this
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-[1.75] text-[#3b4652]">
                    Pricing problems usually show up in one of two ways: either the structure was
                    never strong to begin with, or the company has outgrown something that used to
                    be good enough.
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    Common situations
                  </p>
                  <ul className="mt-5 space-y-5">
                    {WHEN_FOUNDERS_HIRE.map((item) => (
                      <li key={item.lead} className="flex items-start gap-4">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span className="text-base leading-[1.6] text-[#1f2933]">
                          <strong>{item.lead}</strong> {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#c94812] py-14 text-white sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-10 md:grid-cols-[1fr_1.8fr]">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-white/75">
                    Scope
                  </p>
                  <h2 className="mt-4 font-serif-playfair text-3xl font-semibold leading-[1.2] text-white sm:text-[46px]">
                    What we can work on
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-[1.75] text-white/80">
                    The sprint is flexible, but it usually focuses on the highest-leverage
                    monetization decisions.
                  </p>
                </div>
                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {WORKSTREAMS.map((item) => (
                    <div key={item.lead} className="border-b border-white/15 py-3">
                      <span className="mr-2 inline-block text-white/75">↗</span>
                      <span className="text-base leading-[1.6] text-white">
                        <strong>{item.lead}</strong> {item.rest}
                        <Link
                          href={item.href}
                          className="ml-1 inline-flex align-middle text-white/70 transition-colors hover:text-white"
                          aria-label={`Read more about ${item.linkLabel}`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f6f8fb] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  How the sprint works
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  This is a focused engagement designed to move quickly without becoming vague.
                </h2>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['01', 'Diagnose the real problem', 'I review your product, current pricing, goals, and monetization context to identify where the issue really sits.'],
                  ['02', 'Design the structure', 'We work through model, value metric, packaging, price logic, and tradeoffs as one connected system.'],
                  ['03', 'Test the decisions', 'I stress-test the recommendations against buyer behavior, business model realities, and likely implementation risks.'],
                  ['04', 'Hand off the plan', 'You leave with clear recommendations, implementation priorities, and a practical roadmap for what to do next.'],
                ].map(([num, title, desc]) => (
                  <div key={title}>
                    <p className="text-5xl font-semibold tracking-wide text-[#f2c8ba]">{num}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-[1.3] text-[#1f2933]">{title}</h3>
                    <p className="mt-3 text-base leading-[1.65] text-[#3b4652]">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-fit rounded-full bg-[#fff1ea] px-5 py-2 text-center text-base font-semibold text-[#a15435]">
                Typical scope: 1-2 weeks, depending on complexity.
              </p>
            </div>
          </section>

          <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-10 md:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    The approach
                  </p>
                  <h2 className="mt-4 font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                    Why founders hire me for this work
                  </h2>
                  <p className="mt-6 max-w-lg text-lg leading-[1.75] text-[#3b4652]">
                    I work more like a <strong>fractional Chief Economist</strong> for startups
                    making consequential monetization decisions.
                  </p>
                  <p className="mt-6 max-w-lg text-lg leading-[1.75] text-[#3b4652]">
                    That means you get rigorous thinking without academic abstraction, practical
                    founder-facing recommendations, and outputs designed to be used, not admired.
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    What founders say
                  </p>
                  <div className="mt-5 space-y-5">
                    {TESTIMONIALS.map((item) => (
                      <figure
                        key={item.author}
                        className="rounded-2xl border border-[#e2e6ea] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7"
                      >
                        <blockquote className="text-base italic leading-[1.75] text-[#1f2933] sm:text-[18px]">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 text-sm text-[#3b4652]">
                          <p className="font-semibold text-[#1f2933]">{item.author}</p>
                          <p>{item.role}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-[32px]">
                Frequently Asked Questions
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              <div className="mt-8">
                <FAQSection />
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-brand py-12 text-brand-on sm:py-16 lg:py-20">
            <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 bottom-4 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="font-serif-playfair text-3xl font-bold leading-tight text-white sm:text-[42px]">
                Need more than one pricing answer?
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#fcb79a]" />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-soft sm:text-[19px]">
                Start with the 90-Minute Pricing Strategy Session. It is the fastest way to get a
                sharp recommendation, see whether you need deeper work, and move into the sprint
                intelligently if the problem is broader.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-lg font-bold text-brand transition-colors hover:bg-brand-soft"
                >
                  Book the 90-Minute Pricing Strategy Session
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Already sure you need full-scope pricing work? Book a consult.
                </Link>
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
                name: 'Should I start with the session or the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with the session if you need clarity on one important pricing decision. Choose the sprint if you already know you need a fuller pricing structure, packaging, and rollout plan.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the session fee credited toward the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. If we move into a Pricing & Monetization Sprint within 14 days, the $600 session fee is credited toward the project.',
                },
              },
              {
                '@type': 'Question',
                name: 'Will this work if we are pre-revenue?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, in many cases this is the right time to design a first pricing structure before habits, discounting, and exceptions harden.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do you need from us to start?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Usually a short intake, product context, current pricing if you have it, and focused founder input on goals, customers, and constraints.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you help after the sprint?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Some founders stop after the sprint and execute internally. Others continue into additional support for rollout, testing, or ongoing strategic work.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
