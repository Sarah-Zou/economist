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
import { primaryButton } from '@/lib/brandStyles';
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

export default function EntryOfferPage() {
  return (
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
                  90-MINUTE SESSION
                </span>
              </div>
              <h1 className="mt-4 font-black tracking-tight text-[#0f172a] text-[38px] leading-[1.02] sm:text-[52px] lg:text-[62px]">
                Get a clear pricing direction in{' '}
                <span className="text-brand">one focused session</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#6b7280] sm:text-[18px]">
                A 90-minute working session for AI and SaaS founders who need expert help
                choosing the right pricing model, value metric, or package structure.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <Link
                  href={PRIMARY_CTA_HREF}
                  className={`${primaryButton} inline-flex w-full max-w-[360px] items-center justify-center gap-2 bg-brand px-6 py-4 sm:w-auto sm:max-w-none`}
                >
                  Book 90-Minute Pricing Strategy Session
                  <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                </Link>
                <Link
                  href={SECONDARY_CTA_HREF}
                  className="inline-flex w-full max-w-[360px] items-center justify-center rounded-full border border-[#d6dce4] bg-white px-6 py-4 text-center font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:max-w-none"
                >
                  Not sure yet? Book a Free 15-Min Consult First
                </Link>
              </div>
              <p className="mx-auto mt-7 inline-flex max-w-2xl items-start gap-2 rounded-full border border-[#e2e6ea] bg-white/80 px-4 py-2 text-left text-sm text-[#3b4652]">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                You&apos;ll leave with a sharper recommendation, clearer tradeoffs, and concrete
                next steps. If we move into a pricing sprint within 14 days, the fee will be credited toward the project.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                This is for you if you&apos;re asking questions like:
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
              {QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-[#e2e6ea] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <HelpCircle className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
                  <p className="text-base font-medium leading-[1.65] text-[#1f2933]">{q}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-brand/20 bg-brand-soft p-6 text-center shadow-sm sm:p-8">
              <p className="text-base font-semibold leading-[1.7] text-brand-ink sm:text-[19px]">
                If you need a fast, expert second brain before making a pricing decision, this session is built for that.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                What&apos;s included
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                Everything you need to get clarity on your pricing, structured to respect your
                time.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <div className="group flex flex-col rounded-2xl border border-[#e2e6ea] bg-[#f8fafc] p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105">
                  <FileText className="h-7 w-7 text-brand" aria-hidden />
                </div>
                <h3 className="font-serif-playfair text-[24px] font-semibold text-[#1f2933]">
                  Pre-session review
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-[#3b4652]">
                  You share your current metrics, goals, and challenges ahead of time so we can
                  dive straight into solving the problem.
                </p>
              </div>
              <div className="group flex flex-col rounded-2xl border border-[#e2e6ea] bg-[#f8fafc] p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105">
                  <Video className="h-7 w-7 text-brand" aria-hidden />
                </div>
                <h3 className="font-serif-playfair text-[24px] font-semibold text-[#1f2933]">
                  90-minute live session
                </h3>
                <p className="mt-3 text-base leading-[1.65] text-[#3b4652]">
                  A focused, intensive working session where we break down your pricing model,
                  identify risks, and map out the right structure.
                </p>
              </div>
              <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand p-7 text-brand-on shadow-xl">
                <div
                  className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/15 blur-3xl transition-transform group-hover:scale-110"
                  aria-hidden
                />
                <div className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                  <Target className="h-7 w-7 text-white" aria-hidden />
                </div>
                <h3 className="relative z-10 font-serif-playfair text-[24px] font-bold text-white">
                  48-hour follow-up memo
                </h3>
                <p className="relative z-10 mt-3 text-base text-brand-soft">
                  A concrete action plan delivered to your inbox, including:
                </p>
                <ul className="relative z-10 mt-6 space-y-3">
                  {['Recommended pricing model', 'Value metric / usage meter', 'Packaging guidance', 'Major risks & watch-outs', 'Top 3 priority actions'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white opacity-90" aria-hidden />
                      <span className="font-medium text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                What we can cover in the session
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                We&apos;ll focus on the highest-value decision, not try to solve everything at
                once.
              </p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {['Pricing model choice', 'Usage vs seat vs hybrid logic', 'Plan and package structure', 'Trial / freemium / entry offer decisions', 'Pricing risks before launch or changes', 'What to test next'].map((item, i) => (
                <div
                  key={i}
                  className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#e2e6ea] bg-white px-4 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span className="text-base font-semibold text-[#1f2933]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">Best fit</h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-brand" />
              <p className="mt-6 text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                This session is designed for Seed to Series A AI and SaaS companies with a real product, beta users, or early revenue—and a pricing decision they need to make soon.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e2e6ea] bg-[#f8fafc] p-7 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <XCircle className="h-6 w-6 shrink-0 text-[#3b4652]" aria-hidden />
                <h3 className="font-serif-playfair text-[24px] font-semibold text-[#1f2933]">
                  Not the right fit if:
                </h3>
              </div>
              <p className="text-base leading-[1.65] text-[#3b4652]">
                You are still at pure idea stage, mainly need branding/GTM help, or want a full consulting project inside a one-off session.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#e2e6ea] bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                Why founders book me
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
              <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.7] text-[#3b4652] sm:text-[18px]">
                Most pricing consultants give you frameworks. Most analysts give you rigor. Most
                startup operators give you speed. I sit at the intersection and translate complex
                pricing questions into clear, founder-ready decisions.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
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
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#e2e6ea] bg-white p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-soft shadow-sm">
                    <Zap className="h-7 w-7 text-brand" aria-hidden />
                  </div>
                  <h3 className="text-[22px] font-semibold text-[#1f2933]">{item.title}</h3>
                  <p className="mt-2 text-base leading-[1.65] text-[#3b4652]">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm sm:p-10">
              <div
                className="absolute -left-2 -top-2 select-none font-serif text-8xl leading-none text-brand/10"
                aria-hidden
              >
                &ldquo;
              </div>
              <p className="relative z-10 mb-7 pt-4 text-center text-base font-medium italic leading-[1.7] text-[#1f2933] sm:text-[18px]">
                &ldquo;We were stuck on value metric, and Sarah&apos;s framework helped a lot. Highly
                recommend the 90-min session.&rdquo;
              </p>
              <div className="relative z-10 text-center">
                <p className="text-base font-semibold text-[#1f2933] sm:text-lg">Lisa, J.</p>
                <p className="text-sm text-[#3b4652] sm:text-base">
                  Co-Founder, Seed AI Developer Tool
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 sm:py-16 lg:py-20 scroll-mt-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif-playfair text-2xl font-semibold sm:text-[32px]">
                Simple, focused, flat-fee
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            </div>
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#e2e6ea] bg-white p-6 shadow-xl sm:p-10 lg:p-12">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand-soft blur-3xl"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start lg:gap-14">
                <div className="w-full flex-1">
                  <h3 className="font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-3xl">
                    90-Minute Pricing Strategy Session
                  </h3>
                  <div className="mb-7 mt-4 flex items-baseline gap-2">
                    <span className="text-6xl font-extrabold tracking-tight text-brand sm:text-7xl">
                      $600
                    </span>
                  </div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#3b4652] sm:text-sm">
                    Includes:
                  </p>
                  <ul className="mb-7 space-y-4">
                    {[
                      'Intake review',
                      '90-minute live session',
                      '48-hour summary memo',
                      'Top 3 next actions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6" aria-hidden />
                        <span className="text-base font-medium text-[#1f2933] sm:text-[17px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-2xl border border-brand/20 bg-brand-soft/60 p-5">
                    <p className="text-base leading-[1.65] text-[#1f2933] sm:text-[17px]">
                      <strong className="mb-1 block font-semibold text-brand">Risk reducer:</strong>{' '}
                      If we move into a{' '}
                      <Link
                        href="/consulting/services/pricing-monetization-sprint"
                        className="text-brand underline underline-offset-2 hover:text-brand-ink"
                      >
                        pricing sprint
                      </Link>{' '}
                      within 14 days, I&apos;ll credit this fee toward the project.
                    </p>
                  </div>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-4 lg:w-auto lg:min-w-[290px]">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={`${primaryButton} w-full text-center`}
                  >
                    Book 90-Minute Session
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#d6dce4] bg-white px-6 py-3 text-center font-semibold text-[#1f2933] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Book a Free 15-Min Consult
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif-playfair text-2xl font-semibold text-[#1f2933] sm:text-[32px]">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-brand" />
            <div className="mt-8">
            <EntryOfferFAQ items={FAQ_ITEMS} />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand py-12 text-brand-on sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-4 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-3xl font-bold leading-tight text-white sm:text-[42px]">
              Need a clearer pricing direction before your next move?
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#fcb79a]" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.75] text-brand-soft sm:text-[19px]">
              Book a focused session and leave with a sharper recommendation, clearer tradeoffs, and a concrete next step.
            </p>
            <div className="mt-8">
            <Link
              href={PRIMARY_CTA_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-lg font-bold text-brand transition-colors hover:bg-brand-soft"
            >
              Book 90-Minute Pricing Strategy Session{' '}
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
