import Link from 'next/link';
import type { Metadata } from 'next';
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  Video,
  Target,
  Zap,
  XCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { outlineButton, primaryButton, primaryButtonLg } from '@/lib/brandStyles';
import EntryOfferFAQ from './EntryOfferFAQ';

export const metadata: Metadata = {
  title: '90-Minute Pricing Strategy Session for AI & SaaS Founders | Sarah Zou',
  description:
    'A flat-fee 90-minute pricing strategy session for AI and SaaS founders. Get a clear pricing direction on model, value metric, packaging, risks, and next steps—with a 48-hour follow-up memo.',
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
    title: '90-Minute Pricing Strategy Session for AI & SaaS Founders | Sarah Zou',
    description:
      'A focused, flat-fee pricing strategy session for AI and SaaS founders who need a clearer pricing direction on model, value metric, and package structure.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/entry-offer',
  },
  twitter: {
    card: 'summary_large_image',
    title: '90-Minute Pricing Strategy Session for AI & SaaS Founders | Sarah Zou',
    description:
      'A 90-minute working session plus a 48-hour follow-up memo covering pricing model, value metric, packages, risks, and next steps.',
  },
};

const PRIMARY_CTA_HREF = '/consulting/entry-offer/form';
const SECONDARY_CTA_HREF = '/book';

const QUESTIONS = [
  'Should we use subscription, usage-based, or hybrid pricing?',
  'What should we actually charge for?',
  'Are our plans too complicated or too weak?',
  'Is our current pricing leaving money on the table?',
  'What should we fix before we launch or raise prices?',
];

const FAQ_ITEMS = [
  { q: "What if I don't have pricing yet?", a: "That's fine. This session is often most useful before you lock into a structure that's hard to undo later." },
  { q: 'What if I already have pricing?', a: "That's also fine. We can pressure-test what you have and identify what to change." },
  { q: 'Will you rewrite my pricing page?', a: 'Not in this session. If needed, that can become a follow-on project.' },
  { q: 'Will I get a full pricing strategy?', a: "You'll get a focused recommendation and concrete next steps. If you need full implementation, we can scope that separately." },
  { q: 'Is this for B2C too?', a: 'Sometimes, but this offer is strongest for B2B AI/SaaS/API businesses.' },
];

const SESSION_TOPICS = [
  'Pricing model choice',
  'Usage vs seat vs hybrid logic',
  'Plan and package structure',
  'Trial / freemium / entry offer decisions',
  'Pricing risks before launch or changes',
  'What to test next',
];

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
];

export default function EntryOfferPage() {
  return (
    <div className="bg-page text-text">
      <main>
        {/* Hero */}
        <section className="bg-hero-tint">
          <div className="mx-auto w-full max-w-container px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="kicker">90-Minute Session</span>
              <h1 className="mt-5 font-serif-playfair text-ink">
                Get a clear pricing direction in{' '}
                <span className="text-brand">one focused session</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.7] text-text-muted sm:text-[19px]">
                A 90-minute working session for AI and SaaS founders who need expert help
                choosing the right pricing model, value metric, or package structure.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className={`${primaryButtonLg} w-full max-w-[420px] sm:w-auto`}
                >
                  Book the Session
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={SECONDARY_CTA_HREF}
                  className={`${outlineButton} h-12 px-7 text-[16px] w-full max-w-[420px] sm:w-auto`}
                >
                  Book a free 15-min consult first
                </Link>
              </div>
              <p className="mx-auto mt-8 inline-flex max-w-2xl items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-[13px] text-text-muted">
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-brand" aria-hidden />
                If we move into a sprint within 14 days, the fee is credited toward the
                project.
              </p>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Is this you?</span>
              <h2 className="mt-3 font-serif-playfair">
                You&apos;re asking questions like:
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
              {QUESTIONS.map((q) => (
                <div
                  key={q}
                  className="flex items-start gap-3 rounded-card border border-border-subtle bg-white p-5"
                >
                  <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden />
                  <p className="text-[15px] font-medium leading-[1.6] text-ink">{q}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-2xl rounded-card border border-brand/20 bg-brand-soft p-5 text-center text-[15px] font-medium leading-[1.65] text-brand-ink sm:p-6">
              If you need a fast, expert second brain before making a pricing decision, this
              session is built for that.
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="section">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Included</span>
              <h2 className="mt-3 font-serif-playfair">What you get</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                Everything you need to get clarity on your pricing, structured to respect
                your time.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <div className="card-quiet">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white">
                  <FileText className="h-4 w-4 text-brand" aria-hidden />
                </div>
                <h3 className="text-[18px] font-semibold text-ink">Pre-session review</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">
                  You share your current metrics, goals, and challenges ahead of time so we
                  can dive straight into solving the problem.
                </p>
              </div>
              <div className="card-quiet">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white">
                  <Video className="h-4 w-4 text-brand" aria-hidden />
                </div>
                <h3 className="text-[18px] font-semibold text-ink">90-minute live session</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">
                  A focused, intensive working session where we break down your pricing
                  model, identify risks, and map out the right structure.
                </p>
              </div>
              <div className="card-dark">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Target className="h-4 w-4 text-white" aria-hidden />
                </div>
                <h3 className="text-[18px] font-semibold text-white">48-hour follow-up memo</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-white/75">
                  A concrete action plan delivered to your inbox:
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Recommended pricing model',
                    'Value metric / usage meter',
                    'Packaging guidance',
                    'Major risks & watch-outs',
                    'Top 3 priority actions',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-soft" aria-hidden />
                      <span className="text-[14px] text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Scope</span>
              <h2 className="mt-3 font-serif-playfair">What we can cover</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                We focus on the highest-value decision, not try to solve everything at once.
              </p>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {SESSION_TOPICS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-control border border-border-subtle bg-white px-4 py-3.5"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                  <span className="text-[15px] font-medium text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fit */}
        <section className="section">
          <div className="mx-auto grid w-full max-w-container items-start gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <span className="kicker">Best fit</span>
              <h2 className="mt-3 font-serif-playfair">Who this is for</h2>
              <p className="mt-5 text-[16px] leading-[1.75] text-text-muted sm:text-[17px]">
                Seed to Series A AI and SaaS companies with a real product, beta users, or
                early revenue — and a pricing decision they need to make soon.
              </p>
            </div>
            <div className="card-quiet">
              <div className="mb-3 flex items-center gap-3">
                <XCircle className="h-5 w-5 flex-shrink-0 text-text-subtle" aria-hidden />
                <h3 className="text-[18px] font-semibold text-ink">Not the right fit if:</h3>
              </div>
              <p className="text-[15px] leading-[1.65] text-text-muted">
                You&apos;re still at pure idea stage, mainly need branding/GTM help, or want
                a full consulting project inside a one-off session.
              </p>
            </div>
          </div>
        </section>

        {/* Why founders */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Why founders book me</span>
              <h2 className="mt-3 font-serif-playfair">At the intersection of three things</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
                Most pricing consultants give you frameworks. Most analysts give you rigor.
                Most operators give you speed. I sit at the intersection.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {WHY_FOUNDERS.map((item) => (
                <div key={item.title} className="card">
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft">
                    <Zap className="h-4 w-4 text-brand" aria-hidden />
                  </div>
                  <h3 className="text-[18px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <figure className="card mx-auto mt-12 max-w-3xl">
              <blockquote className="font-serif-playfair text-[20px] italic leading-[1.55] text-ink">
                &ldquo;We were stuck on value metric, and Sarah&apos;s framework helped a
                lot. Highly recommend the 90-min session.&rdquo;
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
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">Pricing</span>
              <h2 className="mt-3 font-serif-playfair">Simple, focused, flat-fee</h2>
            </div>
            <div className="card mt-10">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-start">
                <div>
                  <h3 className="font-serif-playfair text-[24px] font-semibold text-ink sm:text-[28px]">
                    90-Minute Pricing Strategy Session
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
                  <p className="mt-8 rounded-control border border-brand/20 bg-brand-soft p-4 text-[14px] leading-[1.65] text-brand-ink">
                    <strong className="font-semibold">Risk reducer:</strong> If we move into
                    a{' '}
                    <Link
                      href="/consulting/services/pricing-monetization-sprint"
                      className="underline underline-offset-2 hover:text-brand-dark"
                    >
                      pricing sprint
                    </Link>{' '}
                    within 14 days, this fee is credited toward the project.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:w-[260px]">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} w-full text-center`}
                  >
                    Book the Session
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className={`${outlineButton} w-full text-center`}
                  >
                    Book a free consult
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-alt">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="kicker">FAQ</span>
              <h2 className="mt-3 font-serif-playfair">Frequently asked questions</h2>
            </div>
            <div className="mt-10">
              <EntryOfferFAQ items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="orange-surface section-sm">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-white">
              Need a clearer pricing direction before your next move?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.7] text-white/85 sm:text-[17px]">
              Book a focused session and leave with a sharper recommendation, clearer
              tradeoffs, and a concrete next step.
            </p>
            <div className="mt-8">
              <Link
                href={PRIMARY_CTA_HREF}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[16px] font-semibold text-brand-ink transition-colors hover:bg-brand-soft"
              >
                Book the Session
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
