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
import { brandLink, outlineButton, primaryButtonLg } from '@/lib/brandStyles';

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
  'Short intake review',
  '90-minute live working session',
  '48-hour summary memo',
  'Top 3 next actions',
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
    typicalScope: '2–4 weeks. Deep dive into model, value metric, and packaging.',
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
    typicalScope: '2–3 weeks. KPI definition and testing framework.',
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
      'For founders who need recurring help on monetization, metrics, tradeoffs, and investor-facing decision support without a full-time hire.',
    typicalScope: 'Retainer. Weekly advisory, board prep, strategic reviews.',
    outcome: 'Ongoing strategic support and an investor-ready economic narrative.',
    cta: 'Explore Fractional Support',
    href: '/consulting/services/on-call-economist-retainer',
    image: '/images/p-2-v2.webp',
    imageAlt: 'Fractional Chief Economist Support',
  },
];

const WHY_HIRE_ME = [
  { bold: 'Research-grade rigor', rest: ' without academic abstraction' },
  { bold: 'Practical recommendations', rest: ' instead of vague strategy talk' },
  { bold: 'Investor- and board-ready', rest: ' thinking behind the numbers' },
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
    quote:
      'We were stuck on value metric, and Sarah’s framework helped a lot. Highly recommend the 90-min session.',
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
    question: 'Should I start with the 90-minute session or a sprint?',
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
      <div className="bg-page text-text">
        <main>
          {/* Hero */}
          <section className="bg-hero-tint">
            <div className="mx-auto w-full max-w-container px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
              <div className="mx-auto max-w-3xl text-center">
                <span className="kicker">Work with me</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Pricing, metrics, and growth support for{' '}
                  <span className="text-brand">AI and SaaS founders</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.7] text-text-muted sm:text-[19px]">
                  Whether you&apos;re pre-launch, revisiting pricing, or trying to fix weak
                  conversion or expansion, I help you get to a clearer next move — without
                  months of vague consulting.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link href={PRIMARY_CTA_HREF} className={`${primaryButtonLg} w-full max-w-[420px] sm:w-auto`}>
                    Book the 90-Minute Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className={`${outlineButton} h-12 px-7 text-[16px] w-full max-w-[420px] sm:w-auto`}
                  >
                    Book a free consult
                  </Link>
                </div>
                <p className="mx-auto mt-8 inline-flex max-w-2xl items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-[13px] text-text-muted">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 text-brand" aria-hidden />
                  If we move into a Pricing &amp; Monetization Sprint within 14 days, I&apos;ll
                  credit the session fee toward the project.
                </p>
              </div>
            </div>
          </section>

          {/* Challenges */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="kicker">Common reasons founders reach out</span>
                <h2 className="mt-3 font-serif-playfair">Founders usually come to me when:</h2>
              </div>
              <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
                {CHALLENGES.map((item) => (
                  <li key={item.title} className="card-quiet">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden />
                      <div>
                        <p className="text-[16px] font-semibold leading-[1.45] text-ink">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-[14px] leading-[1.65] text-text-muted">
                          {item.detail}
                        </p>
                        <Link
                          href={item.href}
                          className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-ink hover:text-brand-dark"
                        >
                          {item.linkLabel}
                          <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-[1.7] text-text-muted">
                If one of these sounds familiar, the{' '}
                <SessionEmbedLink>90-minute session</SessionEmbedLink> is usually the best
                place to start.
              </p>
            </div>
          </section>

          {/* Featured session */}
          <section className="section">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="card-dark">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  The best way to start
                </span>
                <h2 className="mt-5 font-serif-playfair text-white">
                  The 90-Minute Pricing Strategy Session
                </h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-white/80 sm:text-[18px]">
                  A high-intensity working session to unblock your most pressing pricing or
                  monetization decision.
                </p>
                <Link
                  href={SESSION_INFO_HREF}
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-soft underline decoration-brand-soft/40 underline-offset-4 hover:text-white"
                >
                  See full session details
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <Target className="h-4 w-4 text-brand" aria-hidden />
                      <h3 className="text-[18px] font-semibold text-white">Who it&apos;s for</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-white/75">
                      Founders facing a specific pricing hurdle who need immediate clarity
                      and a recommended path forward, without committing to a multi-week project.
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
                      <h3 className="text-[18px] font-semibold text-white">What you get</h3>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {SESSION_OUTPUTS.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand" />
                          <span className="text-[15px] leading-[1.6] text-white/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="rounded-card border border-white/10 bg-white/5 p-6 sm:p-7">
                      <h3 className="text-[15px] font-semibold uppercase tracking-[0.15em] text-brand-soft">
                        Example questions
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {SESSION_QUESTIONS.map((item) => (
                          <li key={item} className="font-serif-playfair text-[17px] italic leading-[1.5] text-white/85">
                            &ldquo;{item}&rdquo;
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href={PRIMARY_CTA_HREF}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-[16px] font-semibold text-brand-on transition-colors hover:bg-brand-ink"
                      >
                        Book the Session
                      </Link>
                      <p className="max-w-[220px] text-[12px] leading-[1.55] text-white/60">
                        Fee fully credited toward{' '}
                        <Link
                          href={PRICING_SPRINT_HREF}
                          className="font-semibold text-brand-soft underline decoration-brand-soft/40 underline-offset-2 hover:text-white"
                        >
                          a sprint
                        </Link>{' '}
                        if booked within 14 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="text-center text-[13px] leading-[1.7] text-white/55">
                    <strong className="text-white/75">What it is not for:</strong> pure idea
                    stage, branding/GTM help, or fitting a full consulting project into a
                    one-off session.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Other paths */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="kicker">Other ways to work together</span>
                <h2 className="mt-3 font-serif-playfair">Need broader support?</h2>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {OTHER_PATHS.map((item) => (
                  <article
                    key={item.title}
                    className="group overflow-hidden rounded-card border border-border-subtle bg-white"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
                        <h3 className="font-serif-playfair text-[22px] leading-[1.2] text-white sm:text-[24px]">
                          {item.title}
                        </h3>
                        <p className="text-[14px] font-medium leading-[1.5] text-white/90">
                          {item.forLine}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-[14px] leading-[1.65] text-text-muted">
                        {item.summary}
                      </p>
                      <dl className="mt-5 space-y-3 border-t border-border-soft pt-5">
                        <div>
                          <dt className="kicker-muted">Typical scope</dt>
                          <dd className="mt-1 text-[14px] leading-[1.55] text-ink">
                            {item.typicalScope}
                          </dd>
                        </div>
                        <div>
                          <dt className="kicker-muted">Outcome</dt>
                          <dd className="mt-1 text-[14px] font-semibold leading-[1.55] text-brand-ink">
                            {item.outcome}
                          </dd>
                        </div>
                      </dl>
                      <Link
                        href={item.href}
                        className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-surface"
                      >
                        {item.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mx-auto mt-10 max-w-2xl rounded-card border border-brand/20 bg-brand-soft p-5 text-center text-[15px] font-medium leading-[1.6] text-brand-ink">
                Not sure which path fits? Start with the{' '}
                <SessionEmbedLink>90-minute session</SessionEmbedLink>.
              </p>
            </div>
          </section>

          {/* Why hire + testimonials */}
          <section className="section">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
                <div>
                  <span className="kicker">Why founders hire me</span>
                  <h2 className="mt-3 font-serif-playfair">
                    When pricing gets high-stakes, bring in a PhD economist
                  </h2>
                  <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    I combine three things founders rarely get in one place:
                  </p>
                  <ul className="mt-5 space-y-4">
                    {WHY_HIRE_ME.map((item) => (
                      <li key={item.bold} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                        <span className="text-[15px] leading-[1.6] text-text">
                          <strong className="text-ink">{item.bold}</strong>
                          {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                    You get clear priorities, clear tradeoffs, and outputs built for startup
                    pace.
                  </p>
                </div>
                <div>
                  <span className="kicker">Proof</span>
                  <h3 className="mt-3 font-serif-playfair text-[26px] sm:text-[30px]">
                    What founders say
                  </h3>
                  <div className="mt-6 space-y-5">
                    {TESTIMONIALS.map((item) => (
                      <figure key={item.name} className="card">
                        <blockquote className="font-serif-playfair text-[18px] italic leading-[1.55] text-ink">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-5 text-[13px] text-text-muted">
                          <p className="font-semibold text-ink">{item.name}</p>
                          <p>{item.role}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section section-alt">
            <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="kicker">What working together looks like</span>
                <h2 className="mt-3 font-serif-playfair">A simple process</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {WORK_STEPS.map((item, idx) => (
                  <div key={item.title}>
                    <p className="font-serif-playfair text-[44px] font-semibold leading-none text-brand/30">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-text-muted">
                      {item.copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="kicker">FAQ</span>
                <h2 className="mt-3 font-serif-playfair">Frequently asked questions</h2>
              </div>
              <div className="mt-10 space-y-4">
                {FAQ_ITEMS.map((item) => (
                  <article key={item.qSchema} className="card">
                    <h3 className="text-[17px] font-semibold leading-[1.35] text-ink">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.7] text-text-muted">{item.a}</p>
                  </article>
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
                Start with the{' '}
                <Link
                  href={SESSION_INFO_HREF}
                  className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white/80"
                >
                  90-Minute Pricing Strategy Session
                </Link>{' '}
                for a focused recommendation and a clear next step.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[16px] font-semibold text-brand-ink transition-colors hover:bg-brand-soft"
                >
                  Book the Session
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={SECONDARY_CTA_HREF}
                  className={`${outlineButton} border-white bg-transparent text-white hover:bg-white/10 hover:text-white`}
                >
                  Book a free consult
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
