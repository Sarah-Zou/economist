import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Should I start with the session or the sprint?',
      a: 'Start with the session if you need clarity on one important pricing decision. Choose the sprint if you already know you need a fuller pricing structure, packaging, and rollout plan.',
    },
    {
      q: 'Is the session fee credited toward the sprint?',
      a: 'Yes. If we move into either the Pricing & Monetization Sprint or the Growth Economics Sprint within 14 days, the $600 session fee is credited toward the project.',
    },
    {
      q: 'Will this work if we are pre-revenue?',
      a: 'Yes. In many cases this is the right time to design a first pricing structure before habits, discounting, and exceptions harden.',
    },
    {
      q: 'What do you need from us to start?',
      a: 'Usually a short intake, product context, current pricing if you have it, and focused founder input on goals, customers, and constraints.',
    },
    {
      q: 'Can you help after the sprint?',
      a: 'Yes. Some founders stop after the sprint and execute internally. Others continue into additional support for rollout, testing, or ongoing strategic work.',
    },
  ]

  return (
    <div className="scroll-mt-24">
      <FAQList items={faqs} />
    </div>
  )
}
