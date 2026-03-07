import Link from 'next/link'
import type { Metadata } from 'next'
import { brandLink, primaryButtonSm } from '@/lib/brandStyles'

export const metadata: Metadata = {
  title: 'Free Tools | EconNova',
  description: 'Free tools for startup pricing and monetization decisions.',
  alternates: {
    canonical: 'https://sarahzou.com/free-tools'
  }
}

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen bg-[#f9f6f7]">
      <section className="border-b border-[#e2e6ea] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-ink">
            Free Tool
          </p>
          <h1 className="mt-3 font-serif-playfair text-[34px] font-bold leading-tight text-[#1f2933] sm:text-[42px]">
            Practical tools for pricing decisions
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-[1.65] text-[#3b4652] sm:text-[17px]">
            Founder-friendly tools designed to help you make faster, clearer monetization choices.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-[#e2e6ea] bg-white p-7 shadow-sm sm:p-8">
          <div className="mb-4 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-ink">
            Beta
          </div>
          <h2 className="font-serif-playfair text-3xl font-semibold text-[#1f2933] sm:text-[34px]">
            Pricing Model Matchmaker
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-[1.65] text-[#3b4652] sm:text-[17px]">
            Answer a short quiz to get a practical pricing model recommendation, value metric, wrapper, and launch-vs-evolve path.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href="/free-tools/pricing-model-matchmaker" className={primaryButtonSm}>
              Open Pricing Model Matchmaker
            </Link>
            <Link href="/wiki/pricing" className={brandLink}>
              Read the pricing wiki
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

