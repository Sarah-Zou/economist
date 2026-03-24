import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { brandLink, primaryButton } from '@/lib/brandStyles';

const SESSION_INFO_HREF = '/consulting/entry-offer';
const PRICING_SPRINT_HREF = '/consulting/services/pricing-monetization-sprint';

function SessionEmbedLink({ children }: { children: ReactNode }) {
  return (
    <Link href={SESSION_INFO_HREF} className={`${brandLink} font-medium`}>
      {children}
    </Link>
  );
}

export const metadata: Metadata = {
  title: 'Pricing, Metrics, and Growth Support for AI and SaaS Founders | Sarah Zou',
  description:
    'Work with Sarah Zou on pricing, packaging, unit economics, KPI design, and experimentation priorities. Start with a focused 90-minute pricing strategy session.',
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
    canonical: 'https://sarahzou.com/consulting',
  },
  openGraph: {
    title: 'Pricing, Metrics, and Growth Support for AI and SaaS Founders | Sarah Zou',
    description:
      'Work with Sarah Zou on pricing, packaging, unit economics, KPI design, and experimentation priorities. Start with a focused 90-minute pricing strategy session.',
    type: 'website',
    url: 'https://sarahzou.com/consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing, Metrics, and Growth Support for AI and SaaS Founders | Sarah Zou',
    description:
      'Work with Sarah Zou on pricing, packaging, unit economics, KPI design, and experimentation priorities. Start with a focused 90-minute pricing strategy session.',
  },
};

const PRIMARY_CTA_HREF = '/consulting/entry-offer/form';
const SECONDARY_CTA_HREF = '/book';

const CHALLENGES = [
  {
    title: 'Pre-launch pricing structure',
    detail: 'They need a pricing model, value metric, or packaging structure before launch.',
    href: '/free-tools/pricing-model-matchmaker',
    linkLabel: 'Try Pricing Model Matchmaker',
  },
  {
    title: 'Pricing feels off, but root cause is unclear',
    detail: 'They are not sure whether the issue is model, metric, packaging, or price level.',
    href: '/wiki/pricing/packaging-and-bundling',
    linkLabel: 'Product, Packaging & Bundling Guide',
  },
  {
    title: 'Monetization model decision',
    detail: 'They are deciding between seat-based, usage-based, hybrid, credits, or another approach.',
    href: '/wiki/pricing/models-and-metering',
    linkLabel: 'Model comparison',
  },
  {
    title: 'Weak conversion, expansion, or margins',
    detail: 'Growth and monetization outcomes become weaker than expected as you scale.',
    href: '/wiki/pricing/value-and-customers',
    linkLabel: 'Understand Value & Customers',
  },
  {
    title: 'KPI and experimentation system gaps',
    detail: 'They need clearer decision metrics and testing priorities, not just more dashboards.',
    href: '/wiki/pricing/foundations/maximization',
    linkLabel: 'Strategy & Prioritization Framework',
  },
  {
    title: 'Need senior strategic support',
    detail: 'They want high-level pricing and growth thinking without a full-time strategy hire.',
    href: '/wiki/pricing/foundations',
    linkLabel: 'Strategic pricing',
  },
];

const SESSION_OUTPUTS = [
  'short intake review',
  '90-minute live working session',
  '48-hour summary memo',
  'top 3 next actions',
];

const SESSION_QUESTIONS = [
  'What pricing model should we use?',
  'Should we charge by seat, usage, or hybrid?',
  'Is our value metric wrong?',
  'What should we fix before launch or a pricing change?',
  'Do we need a broader sprint?',
];

const OTHER_PATHS = [
  {
    title: 'Pricing & Monetization Sprint',
    forLine: 'For teams that need more than one pricing answer.',
    summary:
      'A focused sprint to work through pricing model, value metric, packaging, price logic, and rollout priorities as a system.',
    typicalScope: '2-4 weeks. Deep dive into model, value metric, and packaging.',
    outcome: 'Full pricing structure and rollout plan.',
    cta: 'Explore the Pricing & Monetization Sprint',
    href: '/consulting/services/pricing-monetization-sprint',
    image: '/images/s-4-v2.webp',
    imageAlt: 'Pricing & Monetization Sprint',
  },
  {
    title: 'Metrics & Experimentation Sprint',
    forLine: 'For founders who need a clearer decision system.',
    summary:
      'We define the metrics that matter, identify what to test, and turn scattered data into a practical operating framework.',
    typicalScope: '2-3 weeks. KPI definition and testing framework.',
    outcome: 'A robust KPI and testing system you can run internally.',
    cta: 'Explore the Metrics & Experimentation Sprint',
    href: '/consulting/services/metrics-experimentation-sprint',
    image: '/images/metrics.webp',
    imageAlt: 'Metrics & Experimentation Sprint',
  },
  {
    title: 'Fractional Chief Economist Retainer',
    forLine: 'For teams that want ongoing strategic support.',
    summary:
      'This is for founders who need recurring help on monetization, metrics, tradeoffs, and investor-facing decision support without a full-time hire.',
    typicalScope: 'Retainer. Weekly advisory, board prep, strategic reviews.',
    outcome: 'Ongoing strategic support and an investor-ready economic narrative.',
    cta: 'Explore Fractional Support',
    href: '/consulting/services/on-call-economist-retainer',
    image: '/images/p-2-v2.webp',
    imageAlt: 'Fractional Chief Economist Support',
  },
];

const WHY_HIRE_ME = [
  { bold: 'research-grade rigor', rest: ' without academic abstraction' },
  { bold: 'practical recommendations', rest: ' instead of vague strategy talk' },
  { bold: 'investor- and board-ready', rest: ' thinking behind the numbers' },
];

const WORK_STEPS = [
  {
    title: 'You share context',
    copy: 'I review the relevant background before we meet.',
  },
  {
    title: 'We identify the real problem',
    copy: 'Pricing model, value metric, packaging, price logic, KPI structure, or experiment design.',
  },
  {
    title: 'We work through the decision',
    copy: 'You get a clear recommendation and the key tradeoffs in plain English.',
  },
  {
    title: 'You leave with next steps',
    copy: 'So you know what to do next, whether that is one focused change or a broader engagement.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Honestly, we were just guessing on price and our sales team was discounting everything just to hit their numbers. Sarah simplified our tiers and our ACV shot up 40% in two months.',
    name: 'Dayvon, B.',
    role: 'Founder & CEO, Series A SaaS Platform',
  },
  {
    quote: 'We were stuck on value metric, and Sarah’s framework helped a lot. Highly recommend the 90-min session.',
    name: 'Lisa, J.',
    role: 'Co-Founder, Seed AI Developer Tool',
  },
];

const FAQ_ITEMS: Array<{
  qSchema: string;
  question: ReactNode;
  a: string;
}> = [
  {
    qSchema: 'Should I start with the 90-minute session or a sprint?',
    question: (
      <>
        Should I start with the 90-minute session or a sprint?
      </>
    ),
    a: 'Start with the session if you need clarity on one important decision or want a lower-risk first step. Choose a sprint if you already know the work is broader.',
  },
  {
    qSchema: 'Is the session fee credited if we continue?',
    question: 'Is the session fee credited if we continue?',
    a: 'Yes. If we move into a Pricing & Monetization Sprint within 14 days, I credit the $600 fee toward the sprint.',
  },
  {
    qSchema: 'What if I do not know exactly what I need?',
    question: 'What if I do not know exactly what I need?',
    a: 'That is common. The session is designed to help you get to a strong recommendation without overcommitting too early.',
  },
  {
    qSchema: 'Is this only for pricing?',
    question: 'Is this only for pricing?',
    a: 'No. Founders also come to me for monetization structure, KPI design, experimentation priorities, and broader strategic support.',
  },
];

export default function ConsultingPage() {
  return (
    <>
      <div className="bg-white text-[#1f2933] selection:bg-brand-soft selection:text-brand-ink">
        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-[#fff7f3] via-white to-white">
            <div className="pointer-events-none absolute -left-10 top-8 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
            <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-ink">
                    WORK WITH ME
                  </span>
                </div>
                <h1 className="mt-4 font-black tracking-tight text-[38px] leading-[1.08] sm:text-[52px] lg:text-[62px]">
                  <span className="text-brand">Pricing, Metrics, and Growth</span>
                  <span className="text-[#0f172a]"> Support for AI and SaaS Founders</span>
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-[1.7] text-[#6b7280] sm:text-[18px]">
                  Whether you are pre-launch, revisiting pricing, or trying to fix weak conversion or
                  expansion, I help you get to a clearer next move. I help founders make sharper decisions on pricing, packaging, unit economics, and
                  experimentation without months of vague consulting.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} inline-flex w-full max-w-[420px] items-center justify-center gap-2 bg-brand px-6 py-4 sm:w-auto sm:max-w-none`}
                  >
                    Book the 90-Minute Pricing Strategy Session
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="inline-flex w-full max-w-[420px] items-center justify-center rounded-full border border-[#d6dce4] bg-white px-6 py-4 text-center font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:max-w-none"
                  >
                    Book a consult
                  </Link>
                </div>
                <p className="mx-auto mt-7 inline-flex max-w-3xl items-start gap-2 rounded-full border border-[#e2e6ea] bg-white/80 px-4 py-2 text-left text-sm text-[#3b4652]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>
                    Most founders start with the 90-minute session.
                    If we move into a Pricing &amp; Monetization Sprint within 14 days, I&apos;ll
                    credit the session fee toward the project.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#f6f8fb] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  Common reasons founders reach out
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  Founders usually come to me when:
                </h2>
              </div>
              <div className="mx-auto mt-10 max-w-5xl">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {CHALLENGES.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-2xl border border-[#dfe5eb] bg-white p-5 shadow-sm sm:p-6"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#e68f74]" aria-hidden />
                        <div>
                          <p className="text-base font-semibold leading-[1.45] text-[#1f2933]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-[1.6] text-[#3b4652] sm:text-[15px]">
                            {item.detail}
                          </p>
                          <Link
                            href={item.href}
                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                          >
                            {item.linkLabel}
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-[1.7] text-[#3b4652] sm:text-[17px]">
                If one of these sounds familiar, the{' '}
                <SessionEmbedLink>90-minute session</SessionEmbedLink> is usually the best place to
                start.
              </p>
            </div>
          </section>

          <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-[28px] border border-[#334155]/60 bg-[#132130] px-6 py-8 text-white shadow-xl sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-[#f97316]/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
                <div className="relative">
                  <p className="inline-flex rounded-full bg-[#f8eee8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c5663b]">
                    The best way to start
                  </p>
                  <h2 className="mt-5 font-serif-playfair text-3xl font-semibold leading-[1.18] text-white sm:text-[46px]">
                    The 90-Minute Pricing Strategy Session
                  </h2>
                  <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#d4dde7] sm:text-[18px]">
                    A high-intensity working session to unblock your most pressing pricing or
                    monetization decision.
                  </p>
                  <Link
                    href={SESSION_INFO_HREF}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#fcb79a] underline decoration-[#fcb79a]/50 underline-offset-2 transition-colors hover:text-white"
                  >
                    See full 90-minute session details
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </div>

                <div className="relative mt-10 grid gap-8 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-[#ff6a2a]" aria-hidden />
                      <h3 className="text-2xl font-semibold leading-[1.25] text-white sm:text-[30px]">
                        Who it&apos;s for
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl text-base leading-[1.75] text-[#d4dde7] sm:text-[18px]">
                      Founders facing a specific pricing hurdle who need immediate clarity and a
                      recommended path forward, without committing to a multi-week project.
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#ff6a2a]" aria-hidden />
                      <h3 className="text-2xl font-semibold leading-[1.25] text-white sm:text-[30px]">
                        What you get
                      </h3>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {SESSION_OUTPUTS.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a2a]" />
                          <span className="text-base leading-[1.65] text-[#d4dde7] sm:text-[17px]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="rounded-2xl border border-white/15 bg-[#ffffff14] p-6 sm:p-8">
                      <h3 className="text-2xl font-semibold leading-[1.3] text-[#f8fbff] sm:text-[30px]">
                        Example Questions We Tackle:
                      </h3>
                      <ul className="mt-4 space-y-4">
                        {SESSION_QUESTIONS.map((item) => (
                          <li key={item} className="text-base italic leading-[1.7] text-[#d6dee8] sm:text-[18px]">
                            &ldquo;{item}&rdquo;
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href={PRIMARY_CTA_HREF}
                        className={`${primaryButton} inline-flex items-center justify-center rounded-full bg-[#ff5d26] px-8 py-3 text-base font-bold text-white hover:bg-[#f14f1a]`}
                      >
                        Book the 90-Minute Session
                      </Link>
                      <p className="max-w-xs text-sm leading-[1.6] text-[#c8d3df]">
                        Fee fully credited toward{' '}
                        <Link
                          href={PRICING_SPRINT_HREF}
                          className="font-semibold text-[#fcb79a] underline decoration-[#fcb79a]/45 underline-offset-2 hover:text-white"
                        >
                          a sprint
                        </Link>{' '}
                        if booked within 14 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-10 border-t border-white/10 pt-6">
                  <p className="text-center text-sm leading-[1.7] text-[#aab7c5]">
                    <strong>What it is not for:</strong> still at pure idea stage, mainly need branding/GTM help, or want a full consulting project inside a one-off session.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f6f8fb] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  Other ways to work together
                </p>
                <h2 className="mx-auto mt-4 max-w-4xl font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                  Need broader support?
                </h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {OTHER_PATHS.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-[#dfe5eb] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative isolate min-h-[220px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/35 via-[#0f172a]/55 to-[#0f172a]/85"
                        aria-hidden
                      />
                      <div className="relative z-10 space-y-3 p-7 sm:p-8">
                        <h3 className="font-serif-playfair text-[30px] font-semibold leading-[1.1] text-white sm:text-[34px]">
                          {item.title}
                        </h3>
                        <p className="text-base font-medium leading-[1.65] text-white/95">{item.forLine}</p>
                        <p className="text-base leading-[1.7] text-white/85">{item.summary}</p>
                      </div>
                    </div>
                    <div className="border-t border-[#e8ecf1] bg-white p-7 pt-6 sm:p-8 sm:pt-7">
                      <div>
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#64748b]">
                          Typical scope
                        </p>
                        <p className="mt-2 text-base leading-[1.65] text-[#1f2933]">
                          {item.typicalScope}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#64748b]">
                          Outcome
                        </p>
                        <p className="mt-2 text-base font-semibold leading-[1.65] text-brand">
                          {item.outcome}
                        </p>
                      </div>
                      <Link
                        href={item.href}
                        className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#d6dce4] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {item.cta}
                        <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#f0d3c7] bg-[#fff3ed] p-5 text-center text-base font-medium leading-[1.6] text-[#9a4d2d]">
                Not sure which path fits? Start with the{' '}
                <SessionEmbedLink>90-minute session</SessionEmbedLink>.
              </p>
            </div>
          </section>

          <section className="bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-10 md:grid-cols-[1fr_1.15fr]">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    Why founders hire me
                  </p>
                  <h2 className="mt-4 font-serif-playfair text-3xl font-semibold leading-[1.2] text-[#0f172a] sm:text-[46px]">
                    When pricing gets{' '}
                    <span className="whitespace-nowrap">high-stakes,</span>{' '}
                    bring in <span className="whitespace-nowrap">a PhD economist</span>
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-[1.75] text-[#3b4652] sm:text-[18px]">
                    I combine three things founders rarely get in one place:
                  </p>
                  <ul className="mt-5 space-y-4">
                    {WHY_HIRE_ME.map((item) => (
                      <li key={item.bold} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span className="text-base leading-[1.6] text-[#1f2933]">
                          <strong>{item.bold}</strong>
                          {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-lg text-base leading-[1.75] text-[#3b4652] sm:text-[18px]">
                    You get clear priorities, clear tradeoffs, and outputs built for startup pace.
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                    Proof
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-[1.2] text-[#1f2933]">
                    What founders say
                  </h3>
                  <div className="mt-5 space-y-5">
                    {TESTIMONIALS.map((item) => (
                      <figure
                        key={item.name}
                        className="rounded-2xl border border-[#e2e6ea] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:p-7"
                      >
                        <blockquote className="text-base italic leading-[1.75] text-[#1f2933] sm:text-[18px]">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-6 text-sm text-[#3b4652]">
                          <p className="font-semibold text-[#1f2933]">{item.name}</p>
                          <p>{item.role}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f6f8fb] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#c5663b]">
                  What working together looks like
                </p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {WORK_STEPS.map((item, idx) => (
                  <div key={item.title}>
                    <p className="text-5xl font-semibold tracking-wide text-[#f2c8ba]">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-[1.3] text-[#1f2933]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-[1.65] text-[#3b4652]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="bg-white py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-[32px]">
                Frequently Asked Questions
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              <div className="mt-8 space-y-4">
                {FAQ_ITEMS.map((item) => (
                  <article key={item.qSchema} className="rounded-xl border border-[#e2e6ea] bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-semibold leading-[1.35] text-[#1f2933]">{item.question}</h3>
                    <p className="mt-3 text-base leading-[1.7] text-[#3b4652]">{item.a}</p>
                  </article>
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
                Start with the{' '}
                <Link
                  href={SESSION_INFO_HREF}
                  className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white/70"
                >
                  90-Minute Pricing Strategy Session
                </Link>{' '}
                for a focused recommendation and a clear next step.
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
                  href={SECONDARY_CTA_HREF}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3 text-lg font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Book a consult
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
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.qSchema,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}