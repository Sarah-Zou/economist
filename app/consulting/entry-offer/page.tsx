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
import { cn } from '@/lib/utils';
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
    <div className="min-h-screen bg-page selection:bg-brand-soft selection:text-brand-ink">
      <main>
        {/* Hero */}
        <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <span className="inline-block py-2 px-4 sm:px-5 rounded-full bg-brand-soft text-brand-ink text-xs sm:text-sm font-bold mb-6 sm:mb-8 border border-brand/20 tracking-wide">
            90-Minute Pricing Strategy Session
          </span>
          <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933] leading-tight mb-4 sm:mb-6 max-w-4xl mx-auto">
            Get a clear pricing direction in <span className="text-brand">one focused session</span>
          </h1>
          <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65] max-w-2xl mx-auto mb-8 sm:mb-10">
            A 90-minute working session for AI and SaaS founders who need expert help choosing the right pricing model, value metric, or package structure.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href={PRIMARY_CTA_HREF}
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-brand hover:bg-brand-ink text-brand-on rounded-xl sm:rounded-2xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              Apply for 90-Minute Pricing Strategy Session <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden />
            </Link>
            <Link
              href={SECONDARY_CTA_HREF}
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-surface hover:bg-white text-[#1f2933] rounded-xl sm:rounded-2xl font-bold transition-all shadow-sm border border-[#e2e6ea] flex items-center justify-center text-base sm:text-lg"
            >
              Not sure yet? Book a Free 15-Min Consult First
            </Link>
          </div>
          <p className="mt-8 sm:mt-10 text-sm text-[#3b4652] font-medium flex items-center justify-center gap-2 bg-surface/50 inline-flex px-3 sm:px-4 py-2 rounded-full border border-[#e2e6ea]/50 text-center max-w-lg">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0" aria-hidden />
            You&apos;ll leave with a sharper recommendation, clearer tradeoffs, and concrete next steps—not generic advice.
          </p>
        </section>

        {/* This is for you if... */}
        <section className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6 rounded-t-[2rem] sm:rounded-t-[3rem] border-t border-[#e2e6ea]/50 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">This is for you if you&apos;re asking questions like:</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-surface border border-[#e2e6ea] hover:border-brand/30 transition-colors">
                  <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-brand shrink-0 mt-0.5" aria-hidden />
                  <p className="text-base sm:text-[17px] text-[#1f2933] font-medium leading-[1.65]">{q}</p>
                </div>
              ))}
            </div>
            <div className="text-center p-6 sm:p-8 md:p-10 bg-brand-soft rounded-2xl sm:rounded-3xl border border-brand/20 shadow-sm">
              <p className="text-base sm:text-[17px] md:text-xl text-brand-ink font-semibold leading-[1.65]">
                If you need a fast, expert second brain before making a pricing decision, this session is built for that.
              </p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3 sm:mb-6">What&apos;s included</h2>
              <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65] max-w-2xl mx-auto">Everything you need to get clarity on your pricing, structured to respect your time.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              <div className="bg-surface p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] border border-[#e2e6ea] shadow-sm hover:shadow-md transition-all group flex flex-col">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-brand" aria-hidden />
                </div>
                <h3 className="font-serif-playfair text-xl sm:text-[22px] font-semibold text-[#1f2933] mb-3 sm:mb-4">Pre-session review</h3>
                <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">You share your current metrics, goals, and challenges ahead of time so we can dive straight into solving the problem.</p>
              </div>
              <div className="bg-surface p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] border border-[#e2e6ea] shadow-sm hover:shadow-md transition-all group flex flex-col">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Video className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-brand" aria-hidden />
                </div>
                <h3 className="font-serif-playfair text-xl sm:text-[22px] font-semibold text-[#1f2933] mb-3 sm:mb-4">90-minute live session</h3>
                <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">A focused, intensive working session where we break down your pricing model, identify risks, and map out the right structure.</p>
              </div>
              <div className="bg-brand text-brand-on p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] shadow-xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform group-hover:scale-110" aria-hidden />
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 relative z-10 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" aria-hidden />
                </div>
                <h3 className="font-serif-playfair text-xl sm:text-[22px] font-bold mb-3 sm:mb-4 relative z-10 text-white">48-hour follow-up memo</h3>
                <p className="text-brand-soft text-base sm:text-[17px] mb-6 sm:mb-8 relative z-10">A concrete action plan delivered to your inbox, including:</p>
                <ul className="space-y-3 sm:space-y-4 mt-auto relative z-10">
                  {['Recommended pricing model', 'Value metric / usage meter', 'Packaging guidance', 'Major risks & watch-outs', 'Top 3 priority actions'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 mt-0.5 opacity-90" aria-hidden />
                      <span className="font-medium text-base sm:text-[17px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What we can cover */}
        <section className="py-12 sm:py-16 md:py-24 bg-page px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3 sm:mb-6">What we can cover in the session</h2>
              <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">We&apos;ll focus on the highest-value decision, not try to solve everything at once.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {['Pricing model choice', 'Usage vs seat vs hybrid logic', 'Plan and package structure', 'Trial / freemium / entry offer decisions', 'Pricing risks before launch or changes', 'What to test next'].map((item, i) => (
                <div key={i} className="bg-surface p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#e2e6ea] shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow min-h-[48px]">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-brand shadow-sm shrink-0" aria-hidden />
                  <span className="text-[#1f2933] font-semibold text-base sm:text-[17px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best fit / Not the right fit */}
        <section className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6 border-y border-[#e2e6ea]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] md:text-3xl font-semibold text-[#1f2933] mb-4 sm:mb-6">Best fit</h2>
              <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65] mb-6 sm:mb-8">
                This session is designed for Seed to Series A AI and SaaS companies with a real product, beta users, or early revenue—and a pricing decision they need to make soon.
              </p>
            </div>
            <div className="bg-surface p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] border border-[#e2e6ea] shadow-sm">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#3b4652] shrink-0" aria-hidden />
                <h3 className="font-serif-playfair text-xl sm:text-[22px] font-semibold text-[#1f2933]">Not the right fit if:</h3>
              </div>
              <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">
                You are still at pure idea stage, mainly need branding/GTM help, or want a full consulting project inside a one-off session.
              </p>
            </div>
          </div>
        </section>

        {/* Why founders book me */}
        <section className="py-12 sm:py-16 md:py-24 bg-page px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3 sm:mb-6">Why founders book me</h2>
              <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65] max-w-3xl mx-auto">
                I bring an economist&apos;s lens to pricing decisions: value logic, monetization structure, tradeoffs, and what to do next. My work is designed to help founders make clearer decisions—not just generate more pricing jargon.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-20">
              {[
                { title: 'Pricing & Monetization Focus', desc: 'Deep expertise in how software makes money.' },
                { title: 'Practical Recommendations', desc: 'Founder-facing advice you can actually implement.' },
                { title: 'Clear Next-Step Thinking', desc: 'Concrete actions, not abstract economic theory.' },
              ].map((item, i) => (
                <div key={i} className="bg-surface p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-[2rem] border border-[#e2e6ea] shadow-sm text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-brand-soft rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-brand" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-surface p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2.5rem] border border-[#e2e6ea] shadow-sm max-w-4xl mx-auto relative overflow-hidden">
              <div className="text-7xl sm:text-8xl md:text-9xl text-brand/10 absolute -top-2 -left-2 font-serif leading-none select-none" aria-hidden>&ldquo;</div>
              <p className="text-base sm:text-[17px] text-[#1f2933] italic relative z-10 text-center mb-6 sm:mb-8 pt-4 sm:pt-6 font-medium leading-[1.65]">
                &ldquo;Sarah gave us the clarity we needed to make the right pricing decision. We stopped debating internally and finally launched our new tiers with confidence.&rdquo;
              </p>
              <div className="text-center relative z-10">
                <p className="font-semibold text-[#1f2933] text-base sm:text-lg">John L.</p>
                <p className="text-sm sm:text-base text-[#3b4652]">Founder, Stealth AI Startup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-page px-4 sm:px-6 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-6">Simple, focused, flat-fee</h2>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-16 shadow-xl border border-[#e2e6ea] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-brand-soft rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden />
              <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center justify-between">
                <div className="flex-1 w-full">
                  <h3 className="font-serif-playfair text-xl sm:text-2xl md:text-3xl font-semibold text-[#1f2933] mb-3 sm:mb-4">90-Minute Pricing Strategy Session</h3>
                  <div className="flex items-baseline gap-2 mb-6 sm:mb-10">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand">$600</span>
                  </div>
                  <p className="text-[#3b4652] font-semibold mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm">Includes:</p>
                  <ul className="space-y-3 sm:space-y-5 mb-6 sm:mb-10">
                    {['Intake review', '90-minute live session', '48-hour summary memo'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 sm:gap-4">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand shrink-0" aria-hidden />
                        <span className="text-[#1f2933] text-base sm:text-[17px] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-brand-soft/50 border border-brand/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                    <p className="text-[#1f2933] leading-[1.65] text-base sm:text-[17px]">
                      <strong className="text-brand block mb-1 sm:mb-2 text-base sm:text-[17px] font-semibold">Risk reducer:</strong> If we move into a{' '}
                      <Link href="/consulting/services/pricing-monetization-sprint" className="text-brand underline decoration-brand decoration-2 underline-offset-2 hover:text-brand-ink">
                        pricing sprint
                      </Link>{' '}
                      within 14 days, I&apos;ll credit this fee toward the project.
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-auto flex flex-col gap-3 sm:gap-5 shrink-0 lg:min-w-[260px]">
                  <Link
                    href={PRIMARY_CTA_HREF}
                    className={cn(
                      'w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-5 bg-brand hover:bg-brand-ink text-brand-on rounded-xl sm:rounded-2xl font-bold transition-all shadow-lg shadow-brand/25 flex items-center justify-center gap-2 text-base sm:text-lg hover:-translate-y-1 active:scale-[0.98]'
                    )}
                  >
                    Apply for 90-Minute Session
                  </Link>
                  <Link
                    href={SECONDARY_CTA_HREF}
                    className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-5 bg-white hover:bg-surface text-[#1f2933] rounded-xl sm:rounded-2xl font-bold transition-all border-2 border-[#e2e6ea] flex items-center justify-center text-base sm:text-lg hover:-translate-y-1 active:scale-[0.98]"
                  >
                    Book a Free 15-Min Consult
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 md:py-24 bg-page px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 sm:mb-12 text-center">Frequently Asked Questions</h2>
            <EntryOfferFAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 md:py-32 bg-brand text-brand-on px-4 sm:px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-white/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" aria-hidden />
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight text-white">Need a clearer pricing direction before your next move?</h2>
            <p className="text-base sm:text-[17px] md:text-xl lg:text-2xl text-brand-soft mb-8 sm:mb-12 max-w-2xl mx-auto leading-[1.65]">
              Book a focused session and leave with a sharper recommendation, clearer tradeoffs, and a concrete next step.
            </p>
            <Link
              href={PRIMARY_CTA_HREF}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 min-h-[48px] px-6 sm:px-8 md:px-10 py-3.5 sm:py-5 bg-white text-brand hover:bg-brand-soft rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            >
              Apply for 90-Minute Pricing Strategy Session <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
