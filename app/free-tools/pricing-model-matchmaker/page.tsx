import type { Metadata } from 'next'
import { MatchmakerLanding } from '@/components/matchmaker/MatchmakerLanding'

export const metadata: Metadata = {
  title: 'Pricing Model Matchmaker (beta) | EconNova',
  description:
    'Answer a short quiz to get a practical pricing model recommendation, metric, wrapper, and launch-vs-evolve guidance.',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://sarahzou.com/free-tools/pricing-model-matchmaker'
  },
  openGraph: {
    title: 'Pricing Model Matchmaker (beta) | EconNova',
    description:
      'Find the best-fit pricing model, meter, and wrapper for your product with a fast founder-friendly quiz.',
    url: 'https://sarahzou.com/free-tools/pricing-model-matchmaker',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Model Matchmaker (beta) | EconNova',
    description:
      'Find the best-fit pricing model, meter, and wrapper for your product with a fast founder-friendly quiz.'
  }
}

export default function PricingModelMatchmakerPage() {
  return (
    <main className="min-h-screen bg-[#f2f0f2]">
      <MatchmakerLanding />
    </main>
  )
}

