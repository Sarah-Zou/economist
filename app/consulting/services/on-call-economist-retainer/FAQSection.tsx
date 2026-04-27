import FAQList from '@/components/FAQList'

export default function FAQSection() {
  const faqs = [
    {
      q: 'Do I need to complete a sprint before starting the retainer?',
      a: "Not required, but many founders start with the Pricing or Growth Economics Sprint, then move into the retainer to keep the machine running. If you skip the sprint, the first month includes an onboarding baseline that covers similar ground.",
    },
    {
      q: "What's the difference between Starter, Growth, and Scale?",
      a: "Time, attention, and depth. Starter (~0.5 d/wk, $4k/mo) provides guidance and cadence. Growth (~1 d/wk, $8k/mo) runs active pricing experiments. Scale (~2 d/wk, $15k/mo) handles complex monetization, multi-segment modeling, and active fundraise prep.",
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
