import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Should I start with the Diagnostic or the Build?',
      a: 'Start with the Diagnostic when the direction is unsettled. Fifty percent of the Diagnostic fee is credited toward this Build when it is booked within thirty days.',
    },
    {
      q: 'How do I start?',
      a: 'Start with a free one-page diagnostic note. You see how I think before anything is paid, and we move into the Build once the direction is clear.',
    },
    {
      q: 'We have almost no data. Will this still work?',
      a: 'Yes. Part of the Build is installing the right minimal metric system so you can make decisions immediately — before you have perfect data.',
    },
    {
      q: 'Do I need the Pricing & Monetization Build before this one?',
      a: 'Not necessarily. The two Builds are complementary but independent. Many founders do the Growth Economics Build first to build the unit economics foundation, then use the Pricing & Monetization Build to design the monetization structure on top.',
    },
    {
      q: 'How long does the Build take?',
      a: 'Three weeks against a scope defined before the work begins.',
    },
  ]

  return (
    <FAQList items={faqs} />
  )
}
