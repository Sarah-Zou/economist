import Link from 'next/link'
import type { ReactNode } from 'react'
import { Metadata } from 'next'
import { ArrowRight, CheckCircle2, Target } from 'lucide-react'
import { brandLink, outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'

const SESSION_INFO_HREF = '/consulting/entry-offer'
const PRICING_SPRINT_HREF = '/consulting/services/pricing-monetization-sprint'
const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const SECONDARY_CTA_HREF = '/book'

function SessionEmbedLink({ children }: { children: ReactNode }) {
  return (
    <Link href={SESSION_INFO_HREF} className={`${brandLink} font-medium`}>
      {children}
    </Link>
  )
}

export const metadata: Metadata = {
  title: 'Work With Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS',
  description:
    'Ways to work together on commercial strategy, pricing, GTM economics, revenue model, forecasting, and unit economics — from a 90-minute session to fractional or embedded strategy support.',
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
    title: 'Work With Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS',
    description:
      'Commercial strategy, pricing, GTM economics, forecasting, and unit economics support for AI-native B2B SaaS teams. Start with a free consult or the 90-minute strategy session.',
    type: 'website',
    url: 'https://sarahzou.com/consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work With Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS',
    description:
      'Commercial strategy, pricing, GTM economics, forecasting, and unit economics support for AI-native B2B SaaS teams. Start with a free consult or the 90-minute strategy session.',
  },
}

const CHALLENGES = [
  "You're about to launch and need a pricing model that won't need to be redone in six months.",
  "Your pricing or monetization feels wrong, but you can't tell if it's the model, the packaging, or the price level.",
  "You're debating seat-based vs usage-based vs hybrid — or trying to align pricing with your GTM motion.",
  'Your revenue model, unit economics, or forecasting assumptions need to hold up to investor scrutiny.',
  "You need to structure messy commercial questions — GTM priorities, growth economics, or BizOps decisions — into something executable.",
  'You want senior commercial strategy and monetization thinking without a full-time strategy hire.',
]

const SESSION_OUTPUTS = [
  'Short intake review',
  '90-minute live working session',
  '48-hour summary memo',
  'Top 3 next actions',
]

const SESSION_QUESTIONS = [
  'What pricing model should we use?',
  'Does our GTM motion match our monetization structure?',
  'Is our unit economics story investor-ready?',
]

const OTHER_PATHS = [
  {
    title: 'Pricing & Monetization Sprint',
    bestFor: 'Founders who need a full pricing structure, not just one answer.',
    scope: '2–4 weeks. Pricing model, value metric, packaging, rollout.',
    price: 'From $5K',
    cta: 'Explore the sprint',
    href: '/consulting/services/pricing-monetization-sprint',
  },
  {
    title: 'Growth Economics, Forecasting & Unit Economics',
    bestFor: 'Teams whose revenue model, KPI structure, or investor assumptions need rigorous grounding.',
    scope: '2–3 weeks. Revenue model design, KPI logic, forward models, investor narrative.',
    price: 'From $6K',
    cta: 'Explore the sprint',
    href: '/consulting/services/metrics-experimentation-sprint',
  },
  {
    title: 'Fractional or Embedded Strategy Support',
    bestFor: 'Teams that need ongoing commercial strategy, monetization, and board-facing economics — or a strong embedded hire.',
    scope: 'Monthly. Weekly advisory, board prep, strategic reviews. Open to select embedded or full-time roles in commercial strategy, finance, or BizOps.',
    price: 'From $4K/mo',
    cta: 'Explore this option',
    href: '/consulting/services/on-call-economist-retainer',
  },
]

const DIFFERENTIATORS = [
  {
    title: 'Commercial economics, applied',
    copy: 'Grounded in pricing research, revenue model logic, and econometric rigor — not generic frameworks or consulting boilerplate.',
  },
  {
    title: 'Decisions, not deliverables',
    copy: 'Every engagement ends with a specific recommendation and the tradeoffs named — not a 40-page deck you have to interpret.',
  },
  {
    title: 'Built for founders and operators',
    copy: 'Outputs are short, defensible, and board-ready — useful whether you\'re the founder, the COO, or the CFO trying to make a call this week.',
  },
]

const CREDENTIALS = [
  'PhD Economics, Rutgers',
  'MS Finance & Statistics, UIUC',
  'NBER & World Bank research',
  'Former Citigroup & Capgemini',
]

const WORK_STEPS = [
  {
    title: 'You share context',
    copy: 'I review the relevant background — commercial model, pricing, metrics, or team structure — before we meet.',
  },
  {
    title: 'We identify the real problem',
    copy: 'Pricing model, GTM economics, revenue logic, unit economics, KPI structure, or forecasting assumptions.',
  },
  {
    title: 'We work through the decision',
    copy: 'You get a clear recommendation and the key tradeoffs in plain English — no vague strategy, no 40-page decks.',
  },
  {
    title: 'You leave with next steps',
    copy: 'A concrete next move — one focused change, or a broader engagement if the work warrants it.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Honestly, we were just guessing on price and our sales team was discounting everything just to hit their numbers. Sarah simplified our tiers and our ACV shot up 40% in two months.',
    name: 'Dayvon, B.',
    role: 'Founder & CEO, Series A SaaS Platform',
  },
  {
    quote:
      'We were stuck on value metric, and Sarah\u2019s framework helped a lot. Highly recommend the 90-min session.',
    name: 'Lisa, J.',
    role: 'Co-Founder, Seed AI Developer Tool',
  },
]

const FAQ_ITEMS: Array<{
  qSchema: string
  question: ReactNode
  a: string
}> = [
  {
    qSchema: 'Should I start with the 90-minute session or a sprint?',
    question: 'Should I start with the 90-minute session or a sprint?',
    a: 'Start with the session if you have one specific commercial decision in motion or want a lower-risk first step. Choose a sprint if you already know the work is broader — pricing structure, revenue model, or growth economics. If we move into a Pricing & Monetization Sprint within 14 days, the $600 session fee is credited toward the sprint.',
  },
  {
    qSchema: 'What if I do not know exactly what I need?',
    question: "What if I don't know exactly what I need?",
    a: "That's common — and it's part of what the session is for. We use the 90 minutes to pinpoint the real commercial problem and decide whether you need one focused change or a broader engagement.",
  },
  {
    qSchema: 'Is this only for pricing?',
    question: 'Is this only for pricing?',
    a: 'No. Pricing and monetization are the core, but founders and operators also work with me on GTM economics, revenue model design, forecasting, unit economics, KPI structure, and investor-ready commercial narratives — anywhere economic rigor makes the decision sharper.',
  },
  {
    qSchema: 'Are you open to embedded or full-time roles?',
    question: 'Are you open to embedded or full-time roles?',
    a: 'For the right team, yes. I am open to select embedded, fractional, or full-time roles where the work centers on commercial strategy, pricing, growth economics, finance, or BizOps. The best starting point is a conversation — book a free consult or reach out directly.',
  },
]

export default function ConsultingPage() {
  return (
    <>
      <div className="bg-page text-text">
        <main>
          {/* Hero */}
          <section className="bg-hero-tint">
            <div className="section-shell pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-30 lg:pt-24">
              <div className="section-header max-w-[44rem]">
                <span className="kicker-accent">Ways to work together</span>
                <h1 className="mt-5 font-serif-playfair text-ink">
                  Commercial strategy, pricing, and growth economics support — at the level you need.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                  Most founders start with a 90-minute session. Deeper engagements are available
                  for bigger questions — from pricing sprints to growth economics support and
                  fractional or embedded strategy roles.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButtonLg} w-full sm:w-auto`}
                  >
                    Book the 90-Minute Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className={`${outlineButton} w-full sm:w-auto`}>
                    Not sure? Start with a free 15-min consult
                  </Link>
                </div>
                <p className="meta-note mt-6">The 90-minute session is the cleanest next step for most.</p>
              </div>
            </div>
          </section>

          {/* Is this for you? */}
          <section className="section">
            <div className="section-shell max-w-3xl">
              <div className="section-header">
                <span className="kicker">Is this for you?</span>
                <h2 className="section-title">Founders and operators come to me when</h2>
              </div>
              <ul className="mt-10 divide-y divide-border-soft border-y border-border-soft">
                {CHALLENGES.map((item) => (
                  <li key={item} className="flex items-start gap-4 py-5">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-text-subtle" aria-hidden />
                    <span className="text-[16px] leading-[1.65] text-text">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-[15px] leading-[1.7] text-text-muted">
                If one of these sounds like you, the{' '}
                <SessionEmbedLink>90-minute session</SessionEmbedLink> is usually the best place to
                start.
              </p>
            </div>
          </section>

          {/* The 90-Minute Session */}
          <section className="section section-alt">
            <div className="section-shell max-w-5xl">
              <div className="card-dark">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                  Start here
                </span>
                <h2 className="mt-5 font-serif-playfair text-white">
                  The 90-Minute Commercial Strategy Session
                </h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-white/80 sm:text-[18px]">
                  A focused working session to unblock your most important pricing, GTM, revenue
                  model, or commercial strategy decision. 48-hour follow-up memo included.
                </p>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <Target className="h-4 w-4 text-brand" aria-hidden />
                      <h3 className="text-[17px] font-semibold text-white">Who it&apos;s for</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-white/75">
                      Founders and operators with a live commercial decision — pricing model, value
                      metric, GTM structure, revenue model logic, or unit economics — who need an
                      expert opinion and a concrete next step, without committing to a multi-week
                      project.
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden />
                      <h3 className="text-[17px] font-semibold text-white">What you get</h3>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {SESSION_OUTPUTS.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand" />
                          <span className="text-[15px] leading-[1.6] text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="rounded-card border border-white/10 bg-white/5 p-6 sm:p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                        Questions founders bring
                      </p>
                      <ul className="mt-4 space-y-3">
                        {SESSION_QUESTIONS.map((item) => (
                          <li
                            key={item}
                            className="font-serif-playfair text-[17px] italic leading-[1.5] text-white/85"
                          >
                            &ldquo;{item}&rdquo;
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="font-serif-playfair text-[32px] font-semibold leading-none text-white">
                          $600
                        </p>
                        <p className="mt-2 max-w-[240px] text-[12px] leading-[1.6] text-white/60">
                          Fully credited toward{' '}
                          <Link
                            href={PRICING_SPRINT_HREF}
                            className="font-semibold text-brand-soft underline decoration-brand-soft/40 underline-offset-2 hover:text-white"
                          >
                            a sprint
                          </Link>{' '}
                          if booked within 14 days.
                        </p>
                      </div>
                      <Link href={PRIMARY_CTA_HREF} className={primaryButton}>
                        Book
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] leading-[1.7] text-white/55">
                    <span className="text-white/75">Not for:</span> pure idea-stage exploration,
                    brand positioning, demand-gen execution, or compressing a multi-week project into one session.
                  </p>
                  <Link
                    href={SESSION_INFO_HREF}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-soft underline decoration-brand-soft/40 underline-offset-4 hover:text-white"
                  >
                    See full session details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* When you need more */}
          <section className="section">
            <div className="section-shell">
              <div className="section-header max-w-2xl">
                <span className="kicker">If one session isn&apos;t enough</span>
                <h2 className="section-title">Deeper commercial strategy support</h2>
                <p className="mt-5 text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                  When the commercial question is bigger than one decision — or when ongoing
                  support is the right model — here are the formats that work.
                </p>
              </div>

              <div className="mt-12 divide-y divide-border-soft border-y border-border-soft">
                {OTHER_PATHS.map((item) => (
                  <article
                    key={item.title}
                    className="grid gap-4 py-7 md:grid-cols-[1.35fr_1fr_auto] md:items-start md:gap-8"
                  >
                    <div>
                      <h3 className="font-serif-playfair text-[22px] leading-[1.25] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[14px] leading-[1.6] text-text-muted">
                        <span className="font-semibold text-ink">Best for: </span>
                        {item.bestFor}
                      </p>
                    </div>
                    <dl className="space-y-4 text-[14px] md:pt-1">
                      <div>
                        <dt className="kicker-muted">Typical scope</dt>
                        <dd className="mt-1 leading-[1.65] text-text">{item.scope}</dd>
                      </div>
                      <div>
                        <dt className="kicker-muted">Starting at</dt>
                        <dd className="mt-1 font-semibold leading-[1.55] text-brand-ink">
                          {item.price}
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-ink hover:text-brand-dark md:justify-self-end md:pt-1"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Why founders hire me */}
          <section className="section section-alt">
            <div className="section-shell">
              <div className="section-header max-w-2xl">
                <span className="kicker">Why founders and operators hire me</span>
                <h2 className="section-title">Commercial economist thinking, at startup speed</h2>
              </div>

              <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
                {DIFFERENTIATORS.map((item, idx) => (
                  <div
                    key={item.title}
                    className={
                      idx === 1 ? 'border-t border-ink/20 pt-6' : 'border-t border-border pt-6'
                    }
                  >
                    <p className="font-serif-playfair text-[28px] font-semibold leading-none text-ink/20">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 text-[18px] font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">{item.copy}</p>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-14 max-w-2xl text-center text-[12px] leading-[1.7] text-text-subtle">
                {CREDENTIALS.join(' · ')}
              </p>
            </div>
          </section>

          {/* Proof */}
          <section className="section">
            <div className="section-shell">
              <div className="section-header">
                <span className="kicker">Proof</span>
                <h2 className="section-title">What founders say</h2>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-12 md:grid-cols-[1.25fr_0.95fr]">
                <figure className="quote-block">
                  <blockquote className="font-serif-playfair text-[21px] leading-[1.65] text-ink sm:text-[23px]">
                    &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-[13px] text-text-muted">
                    <p className="font-semibold text-ink">{TESTIMONIALS[0].name}</p>
                    <p>{TESTIMONIALS[0].role}</p>
                  </figcaption>
                </figure>
                <div className="border-t border-border pt-6">
                  <p className="text-[12px] uppercase tracking-[0.12em] text-text-subtle">
                    Also heard from
                  </p>
                  <blockquote className="mt-4 font-serif-playfair text-[18px] leading-[1.7] text-ink">
                    &ldquo;{TESTIMONIALS[1].quote}&rdquo;
                  </blockquote>
                  <div className="mt-5 text-[13px] text-text-muted">
                    <p className="font-semibold text-ink">{TESTIMONIALS[1].name}</p>
                    <p>{TESTIMONIALS[1].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section section-alt">
            <div className="section-shell">
              <div className="section-header">
                <span className="kicker">What working together looks like</span>
                <h2 className="section-title">A simple process</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {WORK_STEPS.map((item, idx) => (
                  <div key={item.title} className="border-t border-border pt-6">
                    <p className="font-serif-playfair text-[44px] font-semibold leading-none text-ink/20">
                      {String(idx + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-4 text-[17px] font-semibold leading-[1.3] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] text-text-muted">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="section-shell max-w-3xl">
              <div className="section-header">
                <span className="kicker">FAQ</span>
                <h2 className="section-title">Frequently asked questions</h2>
              </div>
              <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
                {FAQ_ITEMS.map((item) => (
                  <article key={item.qSchema} className="py-5">
                    <h3 className="text-[17px] font-semibold leading-[1.35] text-ink">
                      {item.question}
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.8] text-text-muted">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="section-sm">
            <div className="section-shell max-w-4xl">
              <div className="cta-panel">
                <h2 className="font-serif-playfair text-ink">
                  Ready to make your commercial strategy clearer and more defensible?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Start with the{' '}
                  <Link
                    href={SESSION_INFO_HREF}
                    className="font-semibold text-brand-ink underline decoration-brand/30 underline-offset-2 hover:decoration-brand/80"
                  >
                    90-Minute Commercial Strategy Session
                  </Link>
                  . You&apos;ll leave with a clear recommendation on your most important commercial
                  decision and a concrete next step.
                </p>
                <div className="mt-8">
                  <Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>
                    Book the Session
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <p className="mt-6 text-[13px] text-text-muted">
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    Or start with a free 15-min consult
                  </Link>
                </p>
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
  )
}
