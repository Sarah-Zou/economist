import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap,
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
  'a pricing model recommendation and the logic behind it',
  'a stronger value metric or meter',
  'a clearer package structure with better upgrade logic',
  'initial price-point guidance and discount guardrails',
  'a rollout plan with priorities, risks, and next actions',
  'a stronger pricing story for customers, investors, or your team',
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
  'you are launching and need a first pricing structure',
  'you have traction, but conversion or expansion feels weak',
  'your packaging is unclear and upgrade paths are muddy',
  'you are debating seat, usage-based, hybrid, or another model',
  'your current pricing feels patched together',
  'you need clearer pricing logic for investors, leadership, or internal alignment',
];

const WORKSTREAMS = [
  'choose the right pricing model for your product and buyers',
  'define a value metric customers can understand and your team can operate',
  'structure packages and upgrade paths more clearly',
  'design good / better / best tiers or hybrid monetization logic',
  'set initial price logic and discount guardrails',
  'improve entry-point and expansion logic',
  'plan a re-pricing move with less chaos',
  'build a rollout plan with risks, priorities, and next steps',
  'strengthen the monetization story for investors, leadership, or internal alignment',
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
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-[#3b4652] sm:text-base">
                  <span className="rounded-full border border-[#e2e6ea] bg-white px-3 py-1.5">Best for: launch, re-pricing, weak monetization, packaging confusion, investor-facing pricing decisions</span>
                  <span className="rounded-full border border-[#e2e6ea] bg-white px-3 py-1.5">Typical scope: 1-2 weeks</span>
                  <span className="rounded-full border border-[#e2e6ea] bg-white px-3 py-1.5">Starting at: $5K</span>
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

          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm">
                  <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                    What you get
                  </h2>
                  <div className="mt-3 h-1 w-20 rounded-full bg-brand" />
                  <p className="mt-5 text-base leading-[1.7] text-[#3b4652]">
                    This is not just high-level strategy. It is focused pricing work designed to
                    produce decisions you can use.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {WHAT_YOU_GET.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                        <span className="text-base text-[#1f2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-brand/20 bg-brand-soft p-7 shadow-sm">
                  <h3 className="font-serif-playfair text-2xl font-semibold text-brand-ink sm:text-[30px]">
                    Typical deliverables
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {DELIVERABLES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
                        <span className="text-base font-medium text-brand-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-[1.7] text-[#3b4652]">
                    <strong>Note:</strong> Exact deliverables depend on scope. Some projects are
                    narrower. Some require deeper research.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                  Start here: session or sprint?
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
                <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  Most founders start with the 90-minute Pricing Strategy Session. That is usually
                  the fastest way to tell whether you need one sharp recommendation or a broader
                  pricing reset.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm">
                  <h3 className="text-[22px] font-semibold text-[#1f2933]">Start with the session</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      'one key pricing decision resolved',
                      'a fast expert recommendation',
                      'a lower-risk way to test whether deeper work is needed',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                        <span className="text-base text-[#1f2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm">
                  <h3 className="text-[22px] font-semibold text-[#1f2933]">Move into the sprint</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      'a full pricing structure, not just a quick opinion',
                      'model, metric, packaging, and pricing to work together',
                      'pricing structure you can actually take to market',
                      'a stronger monetization story before launch, fundraising, or a pricing reset',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                        <span className="text-base text-[#1f2933]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-brand/20 bg-brand-soft p-6 text-center shadow-sm">
                <p className="text-base font-semibold leading-[1.7] text-brand-ink sm:text-[19px]">
                  Session = one key pricing decision. Sprint = full pricing structure and rollout.
                </p>
              </div>
            </div>
          </section>

          <section id="pricing" className="py-12 scroll-mt-24 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">Investment</h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
                <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  Sprint engagements start at $5K and scale with complexity.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {INVESTMENT_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="font-serif-playfair text-[24px] font-semibold text-[#1f2933]">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-brand">{tier.price}</p>
                    <p className="mt-4 text-base leading-[1.65] text-[#3b4652]">{tier.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-[1.7] text-[#3b4652]">
                Not sure which scope fits? Start with the 90-minute session. I&apos;ll tell you
                honestly whether you need the sprint at all.
              </p>
            </div>
          </section>

          <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                  When founders hire me for this
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              </div>
              <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
                {WHEN_FOUNDERS_HIRE.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-[#e2e6ea] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <HelpCircle className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
                    <p className="text-base font-medium leading-[1.65] text-[#1f2933]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                  What we can work on
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
                <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  The sprint is flexible, but it usually focuses on the highest-leverage
                  monetization decisions.
                </p>
              </div>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {WORKSTREAMS.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#e2e6ea] bg-white px-4 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="text-base font-semibold text-[#1f2933]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                  How the sprint works
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
                <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  This is a focused engagement designed to move quickly without becoming vague.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  ['Step 1 - Diagnose the real problem', 'I review your product, current pricing, goals, constraints, and monetization context to identify where the issue really sits.'],
                  ['Step 2 - Design the structure', 'We work through model, value metric, packaging, price logic, and tradeoffs as one connected system.'],
                  ['Step 3 - Test the decisions', 'I stress-test the recommendations against buyer behavior, business model realities, and likely implementation risks.'],
                  ['Step 4 - Hand off the plan', 'You leave with clear recommendations, implementation priorities, and a practical roadmap for what to do next.'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm">
                    <h3 className="text-[22px] font-semibold text-[#1f2933]">{title}</h3>
                    <p className="mt-3 text-base leading-[1.65] text-[#3b4652]">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-center text-base font-semibold text-[#1f2933]">
                Typical scope: 1-2 weeks, depending on complexity.
              </p>
            </div>
          </section>

          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                  Why founders hire me for this work
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
                <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                  I work more like a fractional Chief Economist for startups making consequential
                  monetization decisions.
                </p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  'Rigorous thinking without academic abstraction.',
                  'Practical founder-facing recommendations.',
                  'Outputs designed to be used, not admired.',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e2e6ea] bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-soft shadow-sm">
                      <Zap className="h-7 w-7 text-brand" aria-hidden />
                    </div>
                    <p className="text-base leading-[1.65] text-[#3b4652]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm sm:p-10">
                <p className="mb-7 text-center text-base font-medium italic leading-[1.7] text-[#1f2933] sm:text-[18px]">
                  &ldquo;Honestly, we were just guessing on price and our sales team was discounting
                  everything just to hit their numbers. Sarah simplified our tiers and our ACV shot
                  up 40% in two months.&rdquo;
                </p>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1f2933] sm:text-lg">Dayvon, B.</p>
                  <p className="text-sm text-[#3b4652] sm:text-base">
                    Founder & CEO, Series A SaaS Platform
                  </p>
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
