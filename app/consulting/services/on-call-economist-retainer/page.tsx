import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import FAQSection from './FAQSection';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Fractional Chief Economist (Retainer) | Dr. Sarah Zou',
  description: 'Decisions, not dashboards. Ongoing ownership of monetization, forward models, and experiment cadence so pricing, payback, and runway stay investor-grade and up to date.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/consulting/services/on-call-economist-retainer',
  },
  openGraph: {
    title: 'Fractional Chief Economist (Retainer) | Sarah Zou',
    description: 'Decisions, not dashboards. Ongoing ownership of monetization, forward models, and experiment cadence so pricing, payback, and runway stay investor-grade and up to date.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/on-call-economist-retainer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Chief Economist (Retainer) | Sarah Zou',
    description: 'Decisions, not dashboards. Ongoing ownership of monetization, forward models, and experiment cadence so pricing, payback, and runway stay investor-grade and up to date.',
  },
};

export default function FractionalChiefEconomistRetainer() {
  return (
    <>
      <section className="bg-[#f5f8f7] min-h-screen py-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933] mb-6 leading-tight max-w-4xl mx-auto">
            Strategic Economic Insight, On-Demand
          </h1>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 max-w-3xl mx-auto">
            Guiding tech firms through market complexity with fractional chief economist services. Make smarter, data-driven decisions without the full-time overhead.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto space-y-24">
          {/* What It Is Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">What It Is</h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 max-w-3xl mx-auto">
              A Fractional Chief Economist provides high-level economic expertise and strategic guidance to your executive team on a part-time, retainer basis. This model offers the strategic benefits of a top-tier economist at a fraction of the cost of a full-time hire, integrating seamlessly with your team to drive growth and mitigate risk.
            </p>
          </section>

          {/* Why It Matters Now Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8">Why It Matters Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Economic Uncertainty',
                  desc: 'Navigate inflation, interest rate volatility, and geopolitical risks with expert guidance.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                {
                  title: 'AI & Tech Disruption',
                  desc: 'Understand the economic impact of emerging technologies on your market and business model.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  title: 'Competitive Pressure',
                  desc: 'Stay ahead with sophisticated market analysis and data-driven competitive intelligence.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-3">{item.title}</h3>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Outcomes Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">Outcomes (what you get every month)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  title: 'Decisions shipped', 
                  desc: 'pricing/packaging moves or tests launched with guardrails',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Forward view', 
                  desc: 'updated cohort LTV, NRR & GM bridges, and cash/runway scenarios',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )
                },
                { 
                  title: 'Investor-grade narrative', 
                  desc: 'monthly Economist\'s Board Pack and talking points',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Learning loop', 
                  desc: 'experiment readouts → next bets with MDE/power and stop rules',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )
                }
              ].map((outcome, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                  <div className="mb-4">
                    {outcome.icon}
                  </div>
                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-3">{outcome.title}</h3>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{outcome.desc}</p>
                </div>
              ))}
          </div>
          </section>

          {/* What I Own Section */}
            <section>
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 text-center">What I Own (by function)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                {
                  function: 'Pricing & Revenue Optimization',
                  items: [
                    'Quarterly price/pack refresh; discount & trial guardrails; elasticity/win-loss updates.',
                    'Monetization experiments (price points, value metric, plan fences) with exposure limits.'
                  ]
                },
                {
                  function: 'Marketing & Sales',
                  items: [
                    'Offer tests and ROI stories; CAC payback targets by segment/term; quota alignment.'
                  ]
                },
                {
                  function: 'Product & Data',
                  items: [
                    'Weekly/bi-weekly experiment cadence; metric QA; behavioral/event patch list; monetization UX guidance.'
                  ]
                },
                {
                  function: 'Finance & Planning',
                  items: [
                    'Rolling 12–18-month forecast; NRR/GM waterfalls; scenario planning (hiring, CAC shifts, burn runway); board/investor comms.'
                  ]
                }
              ].map((area, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-4">{area.function}</h3>
                  <ul className="space-y-2">
                    {area.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
              </ul>
                </div>
              ))}
            </div>
            </section>

          {/* Plans & Pricing Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-12">Plans & Pricing</h2>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    name: 'Starter', 
                    price: '$4,000',
                    duration: '/mo',
                    timeCommitment: '≈0.5 d/wk',
                    description: 'Early-stage guidance pre-fundraise.',
                    buttonText: 'Choose Starter',
                    buttonStyle: 'bg-[#f6f7f9] text-[#1f2933] hover:bg-[#e2e6ea]',
                    features: [
                      'Bi-weekly Strategic Call',
                      'Monthly Market Briefing',
                      'Ad-hoc Email Support'
                    ]
                  },
                  { 
                    name: 'Growth', 
                    price: '$8,000',
                    duration: '/mo',
                    timeCommitment: '≈1 d/wk',
                    description: 'Active experiments + investor cadence.',
                    buttonText: 'Choose Growth',
                    buttonStyle: 'bg-[#ff5722] text-white hover:bg-[#e44e1f]',
                    features: [
                      'Weekly Strategic Call',
                      'Deep-Dive Quarterly Report',
                      'Pricing Model Analysis',
                      'Priority Slack Support'
                    ]
                  },
                  { 
                    name: 'Scale', 
                    price: '$15,000',
                    duration: '/mo',
                    timeCommitment: '≈2 d/wk',
                    description: 'Complex monetization or near/active fundraise.',
                    buttonText: 'Choose Scale',
                    buttonStyle: 'bg-[#f6f7f9] text-[#1f2933] hover:bg-[#e2e6ea]',
                    features: [
                      'Multiple Weekly Syncs',
                      'Board & Investor Material Prep',
                      'Custom Research Projects',
                      'Dedicated Slack Channel'
                    ]
                  }
                ].map((tier, tierIdx) => (
                  <div 
                    key={tierIdx} 
                    className="bg-white rounded-lg border-2 border-[#e5e7eb] shadow-sm p-6 flex flex-col"
                  >
                    <div className="mb-6">
                      <h4 className="font-serif-playfair text-2xl font-bold text-[#ff5722] mb-2 text-left">{tier.name}</h4>
                      <p className="text-base sm:text-[17px] text-[#1f2933] text-left leading-[1.65] mb-3">{tier.description}</p>
                      <div className="mb-2 text-left">
                        <span className="text-3xl font-bold text-[#1f2933]">{tier.price}</span>
                        <span className="text-sm text-[#3b4652] ml-1">{tier.duration}</span>
                        <span className="text-sm text-[#3b4652] ml-2">({tier.timeCommitment})</span>
                      </div>
                    </div>
                    <ul className="space-y-3 flex-grow mb-6 text-left">
                      {tier.features.map((feature, featIdx) => (
                        <li key={featIdx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-[#1f2933]">{feature}</span>
                        </li>
                      ))}
              </ul>
                    <a
                      href="/book"
                      className={`${tier.buttonStyle} text-center py-3 px-6 rounded-lg font-semibold transition-colors mt-auto`}
                    >
                      {tier.buttonText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            </section>

          {/* Core Deliverables Section */}
            <section>
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 text-center">Core Deliverables (menu)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  title: 'Economist\'s Board Pack', 
                  desc: 'KPI story, NRR/GM bridges, pricing changes, risks/mitigations.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Pricing Update', 
                  desc: 'price bands, fences, discount policy, comms copy blocks, rollout/retro.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Experiment Docket', 
                  desc: '2–4 briefs/month (hypothesis, MDE/power, guardrails, stop rules).',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )
                },
                { 
                  title: 'Forecast Workbook', 
                  desc: 'rolling 12–18-mo plan; hiring/capital scenarios; sensitivities.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Decision Log', 
                  desc: 'what we decided, why, owner, next check.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Data Health Note', 
                  desc: 'freshness, gaps, event patch list (no-/low-code guidance).',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Investor Prep', 
                  desc: 'narrative framing, FAQ, diligence support.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                { 
                  title: 'Marketplace design', 
                  desc: 'take-rate, subsidies, liquidity levers.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )
                },
                { 
                  title: 'Behavioral economics', 
                  desc: 'choice architecture, framing tests, incentive design.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )
                },
                { 
                  title: 'Pricing page & comms', 
                  desc: 'wireframes, plan page UX, change-notice copy.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Board workshop', 
                  desc: '"Economics of Growth" alignment session.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Recruit/handoff', 
                  desc: 'analyst hiring spec, interview kit, 90-min transition workshop.',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                }
              ].map((deliverable, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                  <div className="mb-4">
                    {deliverable.icon}
                  </div>
                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-3">{deliverable.title}</h3>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{deliverable.desc}</p>
                </div>
              ))}
            </div>
            
            </section>

          {/* Operating Cadence & How This Fits Section */}
            <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Operating Cadence Column */}
              <div>
                <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-6">Operating Cadence</h2>
                <ul className="space-y-4">
                  {[
                    'Weekly (or bi-weekly): Decision stand-up (tests, pricing moves, payback status)',
                    'Monthly: Board Pack + forecast update + experiment readouts',
                    'Quarterly: Pricing/pack reset; strategic deep-dive',
                    'Onboarding (Week 0–2): scope & access → baseline metrics → quick-win pricing/test → first Board Pack'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How This Fits Column */}
              <div>
                <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-6">How This Fits With My Sprints</h2>
                <ul className="space-y-4">
                  {[
                    <><strong>Pricing & Monetization Sprint</strong> → sets price/pack/policy decisions.</>,
                    <><strong>Metrics & Experimentation Sprint</strong> → installs the KPI loop.</>,
                    <><strong>Retainer</strong> → keeps the machine honest: iterate pricing, run tests, maintain forward models, and stay investor-ready.</>
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#ff5722] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <span className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{item}</span>
                    </li>
                  ))}
              </ul>
              </div>
            </div>
            </section>

          {/* FAQs Section */}
          <FAQSection />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "url": "https://sarahzou.com/consulting/services/on-call-economist-retainer",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What's the difference between Starter, Growth, and Scale?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Time/attention and depth. Starter (~0.5 d/wk, $4k/mo) focuses on guidance; Growth (~1 d/wk, $8k/mo) runs active experiments; Scale (~2 d/wk, $15k/mo) handles complex monetization and fundraise prep."
                }
              },
              {
                "@type": "Question",
                "name": "Can we upgrade/downgrade or pause?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—plans are flexible as needs change (e.g., ramp up pre-fundraise, step down post-launch)."
                }
              },
              {
                "@type": "Question",
                "name": "What happens during onboarding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Week 0–2: scope + access → baseline metrics → first pricing/test move → first Economist's Board Pack."
                }
              },
              {
                "@type": "Question",
                "name": "What do you own each month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pricing moves/tests, forward models (NRR/LTV/GM bridges, runway), an Economist's Board Pack, and a learning loop with readouts → next bets."
                }
              },
              {
                "@type": "Question",
                "name": "Do you work with our existing tools and teams?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—Marketing/Sales, Product/Data, and Finance/Planning are included in your operating cadence."
                }
              }
            ]
          }) }}
        />

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-[#e5e7eb] shadow-lg text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/images/headshot_v2.jpg" alt="Sarah Zou headshot" width={80} height={80} className="rounded-full object-cover flex-shrink-0" />
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933]">Ready to own your monetization?</h2>
          </div>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6 max-w-2xl mx-auto">
              Stop juggling pricing, experiments, and forecasts alone. Let's build a steady, investor-grade economics function that keeps you ahead.
            </p>
              <a
                href="/book"
              className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl mb-8"
              >
              Book Your Intake Call
              </a>
            </div>
          </div>

          {/* Contact Form */}
        <div className="max-w-2xl mx-auto mt-16 mb-16">
          <div className="bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-6 text-[#1f2933] text-center">Let's get in touch</h2>
            <ContactForm 
              firstName={true}
              lastName={true}
              messagePlaceholder="Say Hello"
              buttonText="SEND MESSAGE"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
} 
