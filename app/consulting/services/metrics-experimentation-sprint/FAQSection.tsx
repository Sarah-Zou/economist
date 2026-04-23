import Link from 'next/link'
import { brandLink } from '@/lib/brandStyles'
import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'We have almost no data. Will this still work?',
      a: 'Yes. I install a minimal KPI loop, define your metric tree, and set thresholds so you can make decisions immediately.',
    },
    {
      q: 'Which tools do you use?',
      a: 'I integrate with your stack; common setups include GTM/GA/Amplitude/Mixpanel, plus a light instrumentation add-on if needed.',
    },
    {
      q: 'What if our data is messy?',
      a: 'I deliver an event patch list and governance basics so dashboards stay trustworthy and actionable.',
    },
    {
      q: 'What exactly do we get?',
      a: (
        <>
          Founders + GTM/Product <strong>dashboards</strong>,{' '}
          <strong>KPI glossary + thresholds</strong>, <strong>experiment backlog</strong>{' '}
          and <strong>test briefs</strong>, plus a 30-day plan with check-in. See{' '}
          <Link href="/consulting/services/metrics-experimentation-sprint" className={brandLink}>
            deliverables
          </Link>
          .
        </>
      ),
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
