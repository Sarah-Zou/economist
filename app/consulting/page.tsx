import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { brandLink, primaryButtonLg } from '@/lib/brandStyles'
import { generateBreadcrumbJsonLd, generateServiceWithOffersJsonLd } from '@/lib/generateJsonLd'
import { OG_IMAGE_CONSULTING } from '@/lib/seo'
import FAQList from '@/components/FAQList'

const PRIMARY_CTA_HREF = '/diagnostic-note'
const SECONDARY_CTA_HREF = '/book'

export const metadata: Metadata = {
  title: 'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
  description: 'Pricing architecture, GTM for technical buyers, unit economics, and fundraising-ready commercial models for infrastructure and data-platform founders. Begins with a free one-page diagnostic note.',
  alternates: { canonical: 'https://sarahzou.com/consulting' },
  openGraph: {
    title: 'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
    description: 'Pricing architecture, GTM for technical buyers, unit economics, and fundraising-ready commercial models for infrastructure and data-platform founders. Begins with a free one-page diagnostic note.',
    type: 'website', url: 'https://sarahzou.com/consulting', images: [OG_IMAGE_CONSULTING],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work With Sarah Zou | Commercial Architecture Diagnostic for Infrastructure & Data Platforms',
    description: 'Pricing architecture, GTM for technical buyers, unit economics, and fundraising-ready commercial models for infrastructure and data-platform founders. Begins with a free one-page diagnostic note.',
    images: [OG_IMAGE_CONSULTING],
  },
}

const challenges = [
  "You're launching an API, infrastructure product, or data platform and need a pricing architecture built on cost-floor logic — not a SaaS template.",
  "You're choosing between usage-based, credit-based, committed-use, or hybrid pricing and need to know which model survives technical-buyer adoption.",
  'Your GTM motion is misaligned with how infrastructure or data-platform buyers evaluate, pilot, and buy.',
  'Your unit economics or gross-margin story needs to hold up when an investor asks about cost floors, margin at scale, or hardware-software economics.',
  "You need a paid-pilot structure, ICP definition, or commercial packaging for a product category that doesn't have a ready benchmark.",
  'You want senior commercial strategy thinking for a decision that needs a clear commercial structure.',
]

const deeperEngagements = [
  { title: 'Pricing & Monetization Build', bestFor: 'Founders who need the full pricing structure built and rolled out, not the direction set.', scope: 'Three to four weeks. Pricing model, value metric, packaging, price logic, rollout.', price: '$22,000 fixed', href: '/consulting/services/pricing-monetization-sprint' },
  { title: 'Growth Economics Build', bestFor: 'Teams whose unit economics, forecasting logic, or investor assumptions need to hold up in diligence.', scope: 'Three weeks. Unit economics model, cost-floor analysis, forecasting logic, KPI system.', price: '$18,000 fixed', href: '/consulting/services/metrics-experimentation-sprint' },
  { title: 'Ongoing advisory', bestFor: 'Teams carrying weekly commercial decisions, or running an active fundraise.', scope: 'Monthly cadence. Pricing moves, forward models, board-facing economics.', price: '$9,000/month', terms: 'Three-month minimum. Two client seats at a time.', href: '/consulting/services/on-call-economist-retainer' },
]

const faqItems = [
  { q: 'Should I start with the Diagnostic or a Build?', a: 'Start with the Diagnostic if the direction itself is unsettled — value metric, pricing model, or where the economics actually break. Choose a Build when you already know the work is structural and needs to be constructed and rolled out. Fifty percent of the Diagnostic fee is credited toward a Build booked within thirty days.' },
  { q: "What if I don't know exactly what I need?", a: 'Send the free one-page diagnostic note request. I will tell you honestly whether you need a paid engagement at all, and which one.' },
  { q: 'Is this only about pricing?', a: 'No. Pricing and monetization are the core, but the work also covers GTM motion design for infrastructure buyers, paid-pilot structure, ICP definition for novel-category products, cost-floor and gross-margin logic, and fundraising-ready commercial narratives.' },
  { q: 'Why fixed fees?', a: 'Because the scope is defined before the work starts, and because a founder deciding whether to engage should not also be estimating what the engagement will cost.' },
]

export default function ConsultingPage() {
  const serviceJsonLd = generateServiceWithOffersJsonLd({
    name: 'Commercial Architecture Diagnostic',
    description: 'A two-week engagement on the pricing, packaging, or unit-economics decision currently constraining growth.',
    url: 'https://sarahzou.com/consulting',
    offers: [{ name: 'Commercial Architecture Diagnostic', price: 9500, description: 'Defensible value metric, pricing and packaging recommendation, unit-economics view, and prioritized commercial decisions.' }],
  })
  return <>
    <div className="consulting-editorial bg-page text-text"><main>
      <section className="relative isolate min-h-[600px] border-b border-border-soft bg-surface lg:min-h-[700px]" aria-labelledby="consulting-hero-title">
        <Image src="/images/consulting-hero.png" alt="Rigorous commercial modeling and strategic structure" fill sizes="100vw" className="object-cover object-[70%_center] lg:object-[80%_center]" priority />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,243,237,0.98)_0%,rgba(246,243,237,0.85)_45%,rgba(246,243,237,0.3)_75%,rgba(246,243,237,0)_100%)]" aria-hidden />
        <div className="section-shell relative z-10 flex min-h-[600px] items-center pb-16 pt-32 sm:min-h-[700px] sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48"><div className="max-w-[48rem]">
          <span className="kicker-accent">Commercial Architecture</span>
          <h1 id="consulting-hero-title" className="mt-5 font-serif-playfair text-ink">Commercial strategy support for technical founders — at the level the decision requires.</h1>
          <p className="mt-6 max-w-[42rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">Most engagements begin with the Commercial Architecture Diagnostic. Deeper builds follow when the work is structural rather than directional.</p>
          <div className="mt-10 flex flex-col items-start gap-4"><Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>Request a free diagnostic note <ArrowRight className="h-4 w-4" /></Link><Link href={SECONDARY_CTA_HREF} className="text-[14px] text-text-muted underline underline-offset-4 hover:text-ink">Prefer a conversation? Book 15 minutes.</Link></div>
        </div></div>
      </section>

      <section className="section"><div className="section-shell max-w-3xl"><div className="section-header-left"><span className="kicker">Is this for you?</span><h2 className="section-title">Founders and operators come to me when</h2></div><ul className="mt-10 divide-y divide-border-soft border-y border-border-soft">{challenges.map((item) => <li key={item} className="flex items-start gap-4 py-5"><CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-text-subtle" /><span className="text-[16px] leading-[1.65] text-text">{item}</span></li>)}</ul><p className="mt-8 text-center text-[15px] leading-[1.7] text-text-muted">If one of these sounds like you, the Commercial Architecture Diagnostic is the place to start.</p></div></section>

      <section id="commercial-architecture-diagnostic" className="bg-ink text-white"><div className="grid lg:grid-cols-[0.78fr_1.22fr]"><figure className="relative min-h-[420px] overflow-hidden lg:min-h-full"><Image src="/images/consulting-diagnostic-session-v3.webp" alt="A founder reviewing a commercial diagnostic" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></figure><div className="px-5 py-20 sm:px-7 sm:py-24 lg:px-14 lg:py-28 xl:px-20"><p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/[0.55]">Start here</p><h2 className="mt-5 font-serif-playfair text-white">The Commercial Architecture Diagnostic</h2><p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-white/80 sm:text-[18px]">A focused two-week engagement on the pricing, packaging, or unit-economics decision currently constraining growth. Built for consumption- and capability-shaped economics, not per-seat SaaS.</p><div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]"><div className="space-y-8"><div><h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-soft">Who it&apos;s for</h3><p className="mt-3 text-[15px] leading-[1.7] text-white/75">Founders of AI-infrastructure, API, and data-platform companies, Seed through Series B, carrying a live commercial decision they cannot yet defend to a buyer, a team, or an investor.</p></div><div><h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-brand-soft">What you get</h3><ul className="mt-3 space-y-3">{['A defensible value metric','A pricing and packaging recommendation','A unit-economics and cost-floor view','A prioritized list of commercial decisions, in order'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-2 h-1 w-1 rounded-full bg-brand" /><span className="text-[15px] leading-[1.6] text-white/80">{item}</span></li>)}</ul></div><p className="text-[14px] leading-[1.7] text-white/65">Not for: idea-stage exploration, brand positioning, demand-gen execution, or compressing a multi-week build into a two-week engagement.</p></div><div className="flex flex-col gap-6"><div className="rounded-card border border-white/10 bg-white/5 p-6 sm:p-7"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">Investment</p><p className="mt-2 font-serif-playfair text-[36px] font-semibold leading-none text-white">$9,500 fixed · two weeks</p><p className="mt-4 text-[13px] leading-[1.65] text-white/70">Fifty percent is credited toward a Build booked within thirty days.</p></div><Link href={PRIMARY_CTA_HREF} className="group inline-flex items-center gap-2 self-start border-b border-white pb-1 text-[15px] font-medium text-white">Request a free diagnostic note <ArrowRight className="h-4 w-4" /></Link></div></div></div></div></section>

      <section className="section"><div className="section-shell"><div className="section-header max-w-2xl"><span className="kicker">Deeper commercial strategy support</span><h2 className="section-title">When the work is structural</h2></div><div className="mt-12 divide-y divide-border-soft border-y border-border-soft">{deeperEngagements.map((item, index) => <article key={item.title} className="grid gap-5 py-8 md:grid-cols-[2.5rem_1.35fr_1fr_auto] md:items-start md:gap-8"><span className="text-[11px] tracking-[0.14em] text-text-subtle">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-serif-playfair text-[22px] leading-[1.25] text-ink">{item.title}</h3><p className="mt-4 text-[14px] leading-[1.6] text-text-muted"><strong className="text-ink">Best for: </strong>{item.bestFor}</p></div><dl className="space-y-4 text-[14px]"><div><dt className="kicker-muted">Scope</dt><dd className="mt-1 leading-[1.65] text-text">{item.scope}</dd></div><div><dt className="kicker-muted">Fixed fee</dt><dd className="mt-1 font-semibold text-brand-ink">{item.price}</dd>{item.terms && <p className="mt-2 leading-[1.6] text-text-muted">{item.terms}</p>}</div></dl><Link href={item.href} className="inline-flex items-center gap-1.5 border-b border-border pb-1 text-[14px] font-medium text-ink hover:border-ink">Learn more <ArrowRight className="h-4 w-4" /></Link></article>)}</div></div></section>

      {/* Testimonials removed pending named, attributable references. */}
      <section id="faq" className="section section-alt"><div className="section-shell max-w-3xl"><div className="section-header-left"><span className="kicker">FAQ</span><h2 className="section-title">Frequently asked questions</h2></div><FAQList className="mt-10" items={faqItems} /></div></section>
      <section className="section-sm"><div className="section-shell max-w-4xl"><div className="cta-panel"><h2 className="font-serif-playfair text-ink">Bring me the commercial decision you cannot yet defend.</h2><div className="mt-8"><Link href={PRIMARY_CTA_HREF} className={primaryButtonLg}>Request a free diagnostic note <ArrowRight className="h-4 w-4" /></Link></div><p className="mt-6 text-[13px] text-text-muted"><Link href={SECONDARY_CTA_HREF} className="underline underline-offset-4 hover:text-ink">Or book a free 15-min consult</Link></p></div></div></section>
    </main></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Consulting', url: '/consulting' }])) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', url: 'https://sarahzou.com/consulting', mainEntity: faqItems.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }) }} />
  </>
}
