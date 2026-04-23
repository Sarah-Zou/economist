import Link from 'next/link'
import { brandLink } from '@/lib/brandStyles'
import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: "What's the difference between Starter, Growth, and Scale?",
      a: (
        <>
          Time/attention and depth. Starter (~0.5 d/wk, $4k/mo) focuses on guidance;
          Growth (~1 d/wk, $8k/mo) runs active experiments; Scale (~2 d/wk, $15k/mo)
          handles complex monetization and fundraise prep. See{' '}
          <Link href="/consulting/services/on-call-economist-retainer" className={brandLink}>
            pricing tiers
          </Link>
          .
        </>
      ),
    },
    {
      q: 'Can we upgrade/downgrade or pause?',
      a: 'Yes — plans are flexible as needs change (e.g., ramp up pre-fundraise, step down post-launch).',
    },
    {
      q: 'What happens during onboarding?',
      a: "Week 0–2: scope + access → baseline metrics → first pricing/test move → first Economist's Board Pack.",
    },
    {
      q: 'What do you own each month?',
      a: (
        <>
          Pricing moves/tests, forward models (NRR/LTV/GM bridges, runway), an{' '}
          <strong>Economist&apos;s Board Pack</strong>, and a learning loop with readouts
          → next bets.
        </>
      ),
    },
    {
      q: 'Do you work with our existing tools and teams?',
      a: 'Yes — Marketing/Sales, Product/Data, and Finance/Planning are included in your operating cadence.',
    },
  ]

  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="kicker">FAQ</span>
          <h2 className="mt-3 font-serif-playfair">Frequently asked questions</h2>
        </div>
        <div className="mt-10">
          <FAQList items={faqs} />
        </div>
      </div>
    </section>
  )
}
