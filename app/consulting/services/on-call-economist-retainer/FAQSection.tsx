import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Do I need to complete a Build before starting ongoing advisory?',
      a: 'Not required, but many founders start with the Commercial Architecture Diagnostic and a Build, then move into ongoing advisory to keep the work current.',
    },
    {
      q: 'What determines whether ongoing advisory is the right format?',
      a: 'Cadence. If the commercial decisions are episodic, a Build is the better structure. If they arrive weekly — pricing exceptions, packaging questions, investor follow-ups, forecast revisions — ongoing advisory is cheaper than rebuilding context every quarter.',
    },
    {
      q: 'Can we upgrade, downgrade, or pause?',
      a: 'Yes. Plans are flexible as your needs change — for example, ramping up pre-fundraise, stepping down post-launch, or pausing during a quiet quarter.',
    },
    {
      q: 'What does onboarding look like?',
      a: "Weeks 0–2: scope & access → baseline metrics review → first pricing/test move → first Economist's Board Pack. Most teams are fully up and running by end of week 2.",
    },
    {
      q: 'Do you work with our existing tools and teams?',
      a: 'Yes. The retainer cadence includes touch points with Marketing/Sales, Product/Data, and Finance/Planning as needed.',
    },
  ]

  return (
    <FAQList items={faqs} />
  )
}
