import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Should I start with the Diagnostic or the Build?',
      a: 'Start with the Diagnostic when the direction is unsettled. Fifty percent of the Diagnostic fee is credited toward this Build when it is booked within thirty days.',
    },
    {
      q: 'How do I start?',
      a: 'Start with a free one-page diagnostic note on your pricing. You see how I think before anything is paid, and we move into the Build once the direction is clear.',
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
      q: 'Can you help after the Build?',
      a: 'Yes. Some founders stop after the Build and execute internally. Others continue into additional support for rollout, testing, or ongoing advisory.',
    },
  ]

  return (
    <div className="scroll-mt-24">
      <FAQList items={faqs} />
    </div>
  )
}
