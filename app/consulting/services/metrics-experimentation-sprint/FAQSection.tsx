import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Should I start with the Diagnostic or the sprint?',
      a: 'Most founders start with a free one-page diagnostic note, then the two-week Commercial Architecture Diagnostic to set direction. This sprint is the follow-on where you build the full KPI system, forecasting model, and unit economics baseline.',
    },
    {
      q: 'How do I start?',
      a: 'Start with a free one-page diagnostic note. You see how I think before anything is paid, and we move into the sprint once the direction is clear.',
    },
    {
      q: 'We have almost no data. Will this still work?',
      a: 'Yes. Part of the sprint is installing the right minimal metric system so you can make decisions immediately — before you have perfect data.',
    },
    {
      q: 'Do I need the Pricing & Monetization Sprint before this one?',
      a: 'Not necessarily. The two sprints are complementary but independent. Many founders do the Growth Economics Sprint first to build the unit economics foundation, then use the Pricing Sprint to design the monetization structure on top.',
    },
    {
      q: 'How long does the sprint take?',
      a: 'Typically 1–2 weeks depending on complexity, existing data quality, and how many segments or scenarios we need to model.',
    },
  ]

  return (
    <FAQList items={faqs} />
  )
}
