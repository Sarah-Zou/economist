import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Should I start with the Diagnostic or the sprint?',
      a: 'Most founders start with a free one-page diagnostic note, then the two-week Commercial Architecture Diagnostic to set direction. This sprint is the follow-on where you build and roll out the full pricing structure, packaging, and rollout plan.',
    },
    {
      q: 'How do I start?',
      a: 'Start with a free one-page diagnostic note on your pricing. You see how I think before anything is paid, and we move into the sprint once the direction is clear.',
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
