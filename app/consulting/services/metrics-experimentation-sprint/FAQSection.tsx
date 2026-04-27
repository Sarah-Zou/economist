import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'When should I start with the 90-minute session vs. the sprint?',
      a: 'Start with the session if you have one specific metrics or unit economics question in motion. Choose the sprint if you know you need a fuller KPI system, forecasting model, and unit economics baseline.',
    },
    {
      q: 'Is the $600 session fee credited toward this sprint?',
      a: 'Yes. If we move into either the Growth Economics Sprint or the Pricing & Monetization Sprint within 14 days, the $600 session fee is credited toward the project.',
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
