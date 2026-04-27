import Link from 'next/link'
import type { Metadata } from 'next'
import { CheckCircle2, ArrowRight, FileText, Video, Target, Zap, XCircle } from 'lucide-react'
import { outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles'
import EntryOfferFAQ from './EntryOfferFAQ'

export const metadata: Metadata = {
  title: '90-Minute Commercial Strategy Session for AI-Native B2B SaaS | Sarah Zou',
  description:
    'A focused 90-minute working session for AI-native B2B SaaS founders and operators. Get a clear recommendation on pricing model, value metric, GTM structure, revenue logic, or packaging — with a 48-hour follow-up memo.',
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
    canonical: 'https://sarahzou.com/consulting/entry-offer',
  },
  openGraph: {
    title: '90-Minute Commercial Strategy Session for AI-Native B2B SaaS | Sarah Zou',
    description:
      'A focused, flat-fee working session for AI-native B2B SaaS founders and operators who need a clearer direction on pricing model, value metric, GTM structure, revenue logic, or packaging.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/entry-offer',
  },
  twitter: {
    card: 'summary_large_image',
    title: '90-Minute Commercial Strategy Session for AI-Native B2B SaaS | Sarah Zou',
    description:
      'A 90-minute working session plus a 48-hour follow-up memo covering pricing model, value metric, GTM structure, revenue logic, packaging, risks, and next steps.',
  },
}

const PRIMARY_CTA_HREF = '/consulting/entry-offer/form'
const SECONDARY_CTA_HREF = '/book'

const QUESTIONS = [
  'Should we use subscription, usage-based, or hybrid pricing?',
  'What should we actually charge for?',
  'Are our plans too complicated or too weak?',
  'Does our pricing align with how we sell and how customers actually use the product?',
  'What should we fix before we launch, raise prices, or go into a fundraise?',
]

const FAQ_ITEMS = [
  {
    q: "What if I don't have pricing yet?",
    a: "That's fine. This session is often most useful before you lock into a structure that's hard to undo later.",
  },
  {
    q: 'What if I already have pricing?',
    a: "That's also fine. We can pressure-test what you have and identify what to change.",
  },
  {
    q: 'Will you rewrite my pricing page?',
    a: 'Not in this session. If needed, that can become a follow-on project.',
  },
  {
    q: 'Will I get a full pricing strategy?',
    a: "You'll get a focused recommendation and concrete next steps. If you need full implementation, we can scope that separately.",
  },
  {
    q: 'Is this for B2C too?',
    a: 'Sometimes, but this offer is strongest for B2B AI/SaaS/API businesses.',
  },
]

const SESSION_TOPICS = [
  'Pricing model choice',
  'Usage vs seat vs hybrid logic',
  'Plan and package structure',
  'GTM and pricing alignment',
  'Revenue model and unit economics logic',
  'Trial / freemium / entry offer decisions',
  'Pricing risks before launch or changes',
  'What to test next',
]

const WHY_FOUNDERS = [
  {
    title: 'Research-grade rigor',
    desc: 'Research-grade rigor without academic abstraction.',
  },
  {
    title: 'Practical recommendations',
    desc: 'Practical founder-facing recommendations instead of vague strategy talk.',
  },
  {
    title: 'Startup speed',
    desc: 'Fast, testable outputs built for startup pace.',
  },
]

export default function EntryOfferPage() {
  return (
    <div className="bg-page text-text">
      <main>
        {/* Hero */}
        <section className="bg-hero-tint">
          <div className="section-shell pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-24">
            <div className="section-header max-w-[44rem]">
              <span className="kicker-accent">90-Minute Session</span>
              <h1 className="mt-5 font-serif-playfair text-ink">
                Get a clear commercial direction on one live decision
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                A 90-minute working session for AI-native B2B SaaS founders and operators who need
                expert help with pricing model, value metric, GTM structure, revenue logic, or
                package design.
              </p>
              <p className="meta-note mt-6">
                If we move into a sprint within 14 days, the fee is credited toward the project.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className={`${primaryButtonLg} w-full max-w-[360px] sm:w-auto`}
                >
                  Book the Session
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href={SECONDARY_CTA_HREF} className="display-link">
                  Or start with a free 15-min consult
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="section section-alt">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">Is this you?</span>
              <h2 className="section-title">You&apos;re asking questions like</h2>
            </div>
            <ul className="mt-10 divide-y divide-border-soft border-y border-border-soft">
              {QUESTIONS.map((q) => (
                <li
                  key={q}
                  className="py-5 font-serif-playfair text-[19px] italic leading-[1.5] text-ink sm:text-[21px]"
                >
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-[15px] leading-[1.75] text-text-muted">
              If you need a fast, expert second brain before making a consequential commercial
              decision, this session is built for that.
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="section">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Included</span>
              <h2 className="section-title">What you get</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Everything you need to work through your most important commercial decision,
                structured to respect your time.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: 'Pre-session review',
                  desc: 'You share your current metrics, goals, and challenges ahead of time so we can dive straight into solving the problem.',
                },
                {
                  icon: Video,
                  title: '90-minute live session',
                  desc: 'A focused, intensive working session where we break down your pricing model, identify risks, and map out the right structure.',
                },
                {
                  icon: Target,
                  title: '48-hour follow-up memo',
                  desc: 'A concrete action plan in your inbox: recommended model, value metric, packaging guidance, risks, and top 3 priority actions.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border-t border-border pt-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-soft">
                    <Icon className="h-4 w-4 text-brand" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="section section-alt">
          <div className="section-shell max-w-4xl">
            <div className="section-header">
              <span className="kicker">Scope</span>
              <h2 className="section-title">What we can cover</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                We focus on the highest-value decision, not try to solve everything at once.
              </p>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {SESSION_TOPICS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-border-soft pb-3 text-[15px] text-ink"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fit */}
        <section className="section">
          <div className="section-shell">
            <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
              <div>
                <span className="kicker">Best fit</span>
                <h2 className="section-title">Who this is for</h2>
                <p className="mt-6 max-w-md text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  Seed to Series A AI and SaaS companies with a real product, beta users, or early
                  revenue — and a pricing decision they need to make soon.
                </p>
              </div>
              <div className="border-l border-border pl-6">
                <div className="mb-3 flex items-center gap-3">
                  <XCircle className="h-4 w-4 flex-shrink-0 text-text-subtle" aria-hidden />
                  <p className="kicker-muted">Not the right fit if</p>
                </div>
                  <p className="text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                  You&apos;re still at pure idea stage, mainly need brand positioning or
                  demand-gen execution, or want a full consulting project inside a one-off session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why founders */}
        <section className="section section-alt">
          <div className="section-shell">
            <div className="section-header">
              <span className="kicker">Why founders book me</span>
              <h2 className="section-title">At the intersection of three things</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Most commercial consultants give you frameworks. Most analysts give you rigor. Most
                operators give you speed. I sit at the intersection of all three.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
              {WHY_FOUNDERS.map((item, idx) => (
                <div
                  key={item.title}
                  className={
                    idx === 1 ? 'border-t border-brand/35 pt-6' : 'border-t border-border pt-6'
                  }
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-soft">
                    <Zap className="h-4 w-4 text-brand" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <figure className="mx-auto mt-16 max-w-3xl quote-block">
              <blockquote className="font-serif-playfair text-[20px] leading-[1.65] text-ink sm:text-[22px]">
                &ldquo;We were stuck on value metric, and Sarah&apos;s framework helped a lot.
                Highly recommend the 90-min session.&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[13px] text-text-muted">
                <p className="font-semibold text-ink">Lisa, J.</p>
                <p>Co-Founder, Seed AI Developer Tool</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Pricing panel */}
        <section id="pricing" className="section scroll-mt-24">
          <div className="section-shell max-w-4xl">
            <div className="section-header">
              <span className="kicker">Pricing</span>
              <h2 className="section-title">Simple, focused, flat-fee</h2>
            </div>
            <div className="mt-12 border-t border-border pt-10">
              <div className="grid gap-10 lg:grid-cols-[1.25fr_auto] lg:items-start">
                <div>
                  <h3 className="font-serif-playfair text-[24px] font-semibold text-ink sm:text-[28px]">
                    90-Minute Commercial Strategy Session
                  </h3>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-serif-playfair text-[56px] font-semibold leading-none text-ink">
                      $600
                    </span>
                    <span className="text-[14px] text-text-muted">flat fee</span>
                  </div>
                  <p className="kicker-muted mt-8">Includes</p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      'Intake review',
                      '90-minute live session',
                      '48-hour summary memo',
                      'Top 3 next actions',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand" aria-hidden />
                        <span className="text-[15px] text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-l border-brand/40 pl-4 text-[14px] leading-[1.75] text-text-muted">
                    <span className="font-semibold text-ink">Risk reducer.</span> If we move into a{' '}
                    <Link
                      href="/consulting/services/pricing-monetization-sprint"
                      className="text-brand-ink underline decoration-brand/60 underline-offset-4 hover:text-brand-dark"
                    >
                      pricing sprint
                    </Link>{' '}
                    within 14 days, this fee is credited toward the project.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:w-[260px]">
                  <Link href={PRIMARY_CTA_HREF} className={`${primaryButton} w-full text-center`}>
                    Book the Session
                  </Link>
                  <Link href={SECONDARY_CTA_HREF} className={`${outlineButton} w-full text-center`}>
                    Book a free consult
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-alt">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">FAQ</span>
              <h2 className="section-title">Frequently asked questions</h2>
            </div>
            <div className="mt-10">
              <EntryOfferFAQ items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-sm">
          <div className="section-shell max-w-4xl">
            <div className="cta-panel">
              <h2 className="font-serif-playfair text-ink">
                Need a clearer direction on your most important commercial decision?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
                Book a focused session and leave with a sharper recommendation, clearer tradeoffs,
                and a concrete next step.
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
  )
}
