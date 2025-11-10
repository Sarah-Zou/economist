import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import FAQSection from './FAQSection';

export const metadata: Metadata = {
  title: 'Metrics & Experimentation Sprint | Dr. Sarah Zou',
  description: 'A one-week intensive sprint for early-stage teams to stand up a working KPI system and a repeatable experimentation loop that lifts conversion and ARPU.',
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
    canonical: 'https://sarahzou.com/consulting/services/metrics-experimentation-sprint',
  },
  openGraph: {
    title: 'Metrics & Experimentation Sprint | Sarah Zou',
    description: 'A one-week intensive sprint for early-stage teams to stand up a working KPI system and a repeatable experimentation loop that lifts conversion and ARPU.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/metrics-experimentation-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metrics & Experimentation Sprint | Sarah Zou',
    description: 'A one-week intensive sprint for early-stage teams to stand up a working KPI system and a repeatable experimentation loop that lifts conversion and ARPU.',
  },
};

export default function MetricsExperimentationSprint() {
  return (
    <section className="bg-[#f5f8f7] min-h-screen py-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-xs text-[#4b636e] font-semibold mb-4 block">Consulting Service</span>
          <h1 className="font-serif-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#223] mb-4 leading-tight max-w-4xl mx-auto">
            Unlock Growth with Metrics & Experimentation Sprint
          </h1>
          <p className="text-lg md:text-xl text-[#4b636e] font-light mb-8 max-w-3xl mx-auto">
            A one-week intensive sprint for early-stage teams to stand up a working KPI system and a repeatable experimentation loop that lifts conversion and ARPU.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Key Benefits Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-4">Key Benefits of the Sprint</h2>
            <p className="text-base md:text-lg text-[#4b636e] font-light mb-12 max-w-3xl mx-auto">
              Gain the capabilities and confidence to make smarter, faster decisions backed by data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#223] mb-3">Data-Driven Decisions</h3>
                <p className="text-base text-[#4b636e] font-light">
                  Learn to identify, track, and analyze the metrics that truly matter for your business.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#223] mb-3">Faster Growth Cycles</h3>
                <p className="text-base text-[#4b636e] font-light">
                  Implement a repeatable process for rapidly testing hypotheses and iterating on your product.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#223] mb-3">Build a Culture of Experimentation</h3>
                <p className="text-base text-[#4b636e] font-light">
                  Embed a mindset of continuous learning and improvement across your entire team.
                </p>
              </div>
            </div>
          </section>

          {/* Common Triggers Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-4">Common triggers</h2>
            <p className="text-base text-[#4b636e] font-light mb-8">If any of these sound familiar, this sprint is designed for you.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: '🎯', text: 'No shared North Star or conflicting KPI definitions' },
                { icon: '📊', text: 'Inconsistent dashboards; manually stitched reports' },
                { icon: '🧪', text: 'Testing paralysis (what to test, how to measure, when to stop)' },
                { icon: '💰', text: 'No visibility into payback, NRR drivers, or pricing impact' },
                { icon: '📈', text: 'Investor pressure for "efficient growth" metrics' },
                { icon: '💸', text: 'Metrics chaos after first funding' }
              ].map((trigger, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{trigger.icon}</div>
                  <p className="text-base text-[#4b636e] font-light">{trigger.text}</p>
                </div>
              ))}
          </div>
            </section>

          {/* Is This Sprint For You & What You'll Get - Two Column Layout */}
            <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Is This Sprint For You */}
              <div>
                <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-6">Is This Sprint For You?</h2>
                <ul className="space-y-4">
                  {[
                    <><strong>Early-Stage Founders</strong> who need a minimal KPI loop before scaling GTM.</>,
                    <><strong>PM/Growth Leads</strong> who want a prioritized experiment backlog and clear decision cadence.</>,
                    <><strong>Lean Teams</strong> under investor pressure to show payback/NRR and move from ad-hoc reports to a system.</>
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base text-[#4b636e] font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What You'll Get */}
              <div>
                <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-6">What You'll Get</h2>
                <ul className="space-y-4">
                  {[
                    <>A clear <strong>Live Metrics Dashboard</strong> for tracking your <strong>North Star + Metric Tree</strong>.</>,
                    <>A comprehensive <strong>Experimentation Playbook</strong> for your team.</>,
                    <>Readout + 30-day plan and a check-in at 30 days.</>
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base text-[#4b636e] font-light">{item}</span>
                    </li>
                  ))}
              </ul>
              </div>
            </div>
            </section>

          {/* Cadence Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-3">The 1-Week Sprint Cadence</h2>
            <p className="text-base text-[#4b636e] font-light mb-12 max-w-2xl mx-auto">
              A structured, collaborative process designed for maximum impact in minimum time.
            </p>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2 relative">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-[#e5e7eb] z-0" style={{ left: '2rem', right: '2rem' }}></div>
                {[
                  { num: 0, title: 'Discovery', desc: 'Inputs/data room; stack review; current funnels' },
                  { num: 1, title: 'Workshop #1', desc: 'North Star, metric tree, success thresholds' },
                  { num: 2, title: 'Build', desc: 'Dashboards + event patch list; backlog seeding' },
                  { num: 3, title: 'Workshop #2', desc: 'Prioritize; spec 2 experiments; power/guardrails' },
                  { num: 4, title: 'Validation', desc: 'Finalize dashboards; cadence SOP; 30-day plan' },
                  { num: 5, title: 'Handoff', desc: 'Readout; ownership assignment; follow-up booking' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <div className="bg-[#06b6d4] rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold text-white">{step.num}</span>
                    </div>
                    <h3 className="font-bold text-base text-[#223] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#4b636e] font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            </section>

          {/* Pricing Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-3">A Clear Investment in Your Growth</h2>
            <p className="text-base text-[#4b636e] font-light mb-8 max-w-2xl mx-auto">
              Get an expert metrics system for a fraction of the cost and time of hiring full-time.
            </p>
            
            {/* Comparison Table */}
            <div className="bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm overflow-x-auto mb-8 max-w-5xl mx-auto">
              <table className="w-full border-collapse text-base text-[#4b636e] font-light">
                <thead>
                  <tr className="border-b-2 border-[#223]">
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#223]">Doing Nothing</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#223]">Hire Full-Time Analytics/Growth</th>
                    <th className="text-center py-4 px-4 font-semibold text-[#223] bg-[#eef2ff] rounded-t-lg">Metrics & Experimentation Sprint</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 px-4 font-medium text-[#223] text-left">Cost</td>
                    <td className="py-4 px-4 text-center">$0 (but lost revenue)</td>
                    <td className="py-4 px-4 text-center">$120k+ / yr</td>
                    <td className="py-4 px-4 bg-[#eef2ff] text-[#06b6d4] font-semibold text-center">$6k–$12k</td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 px-4 font-medium text-[#223] text-left">Time to Value</td>
                    <td className="py-4 px-4 text-center">Never</td>
                    <td className="py-4 px-4 text-center">2–3 months</td>
                    <td className="py-4 px-4 bg-[#eef2ff] text-[#06b6d4] font-semibold text-center">5–10 business days</td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 px-4 font-medium text-[#223] text-left">Expertise</td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-6 h-6 rounded-full border-2 border-[#ff5722] flex items-center justify-center mx-auto">
                      </div>
                    </td>
                    <td className="py-4 px-4 bg-[#eef2ff] text-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 px-4 font-medium text-[#223] text-left">Actionable System</td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-6 h-6 rounded-full border-2 border-[#ff5722] flex items-center justify-center mx-auto">
                      </div>
                    </td>
                    <td className="py-4 px-4 bg-[#eef2ff] text-center">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 px-4 font-medium text-[#223] text-left">Risk</td>
                    <td className="py-4 px-4 text-center">High</td>
                    <td className="py-4 px-4 text-center">High</td>
                    <td className="py-4 px-4 bg-[#eef2ff] text-[#06b6d4] font-semibold rounded-b-lg text-center">Zero (Guaranteed)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="max-w-6xl mx-auto mt-20">
              <h3 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-3 text-center">Choose the Right Sprint for Your Team</h3>
              <p className="text-base text-[#4b636e] font-light mb-12 text-center max-w-2xl mx-auto">
                Find the perfect plan to unlock your metrics and experimentation potential.
              </p>
              
              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    name: 'Lite', 
                    price: '$6K',
                    duration: '/ 1 wk',
                    description: 'Pre-MVP or just-launched teams needing a minimal KPI loop and one high-impact test.',
                    buttonText: 'Get Started',
                    buttonStyle: 'bg-gray-100 text-[#223] hover:bg-gray-200',
                    features: [
                      { text: <>1×60-min <strong>workshop</strong></>, included: true },
                      { text: <><strong>KPI tree + glossary</strong> (v1)</>, included: true },
                      { text: <>Starter <strong>Founders dashboard</strong></>, included: true },
                      { text: <>Experiment backlog (8 items) + 1 <strong>test brief</strong></>, included: true },
                      { text: <>Follow-up: Async Q&A (1 wk)</>, included: true }
                    ]
                  },
                  { 
                    name: 'Core', 
                    price: '$9K',
                    duration: '/ 1 wk',
                    description: 'Early-revenue teams needing aligned metrics, two tests, and a weekly decision cadence.',
                    buttonText: 'Choose Plan',
                    buttonStyle: 'bg-[#06b6d4] text-white hover:bg-[#0891b2]',
                    features: [
                      { text: <>2×60-min <strong>workshops</strong></>, included: true },
                      { text: <><strong>KPI tree + glossary + thresholds</strong></>, included: true },
                      { text: <>Founders + GTM/Product <strong>dashboards</strong>, simple cohort views</>, included: true },
                      { text: <>Event patch list (top 10)</>, included: true },
                      { text: <>Backlog (12 items) + 2 <strong>test briefs</strong> with power check</>, included: true },
                      { text: <>Cadence SOP + 30-day plan</>, included: true },
                      { text: <>Follow-up: 1×45-min at 30 days</>, included: true }
                    ]
                  },
                  { 
                    name: 'Pro', 
                    price: '$12K',
                    duration: '/ 2 wks',
                    description: 'Complex funnels or multiple ICPs needing deeper analysis and test velocity.',
                    buttonText: 'Choose Plan',
                    buttonStyle: 'bg-gray-100 text-[#223] hover:bg-gray-200',
                    features: [
                      { text: <>3×60-min <strong>workshops</strong></>, included: true },
                      { text: <><strong>KPI tree + governance + threshold doc</strong></>, included: true },
                      { text: <>Founders + GTM + Product <strong>dashboards</strong> + basic cohort/LTV views</>, included: true },
                      { text: <>Event schema review + tracking plan edits (no engineering)</>, included: true },
                      { text: <>Backlog (15+ items) + 3 <strong>test briefs</strong> + scorecard templates</>, included: true },
                      { text: <>Slack async support (14 days)</>, included: true },
                      { text: <>Follow-up: 2×45-min at 30 & 60 days</>, included: true }
                    ]
                  }
                ].map((tier, tierIdx) => (
                  <div 
                    key={tierIdx} 
                    className="bg-white rounded-lg border-2 border-[#e5e7eb] shadow-sm p-6 flex flex-col"
                  >
                    <div className="mb-6">
                      <h4 className="font-serif-playfair text-2xl font-bold text-[#06b6d4] mb-3 text-left">{tier.name}</h4>
                      <div className="mb-2 text-left">
                        <span className="text-3xl font-bold text-[#223]">{tier.price}</span>
                        <span className="text-sm text-[#4b636e] font-light ml-1">{tier.duration}</span>
                      </div>
                      <p className="text-sm text-[#4b636e] font-light text-left leading-relaxed mt-2">{tier.description}</p>
                    </div>
                    <ul className="space-y-3 flex-grow mb-6">
                      {tier.features.map((feature, featIdx) => (
                        <li key={featIdx} className="flex items-start gap-3 text-left">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          <span className={`text-sm ${feature.included ? 'text-[#4b636e]' : 'text-gray-400'} font-light`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
              </ul>
                    <a
                      href="https://calendly.com/sarahxzou/free-consult-30-min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tier.buttonStyle} text-center py-3 px-6 rounded-lg font-semibold transition-colors mt-auto`}
                    >
                      {tier.buttonText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            </section>

          {/* Add-ons Section */}
            <section>
            <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-6 text-center">Add-ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  title: 'Light Instrumentation Support', 
                  desc: 'GTM/GA/Amplitude/Mixpanel tagging, QA',
                  icon: (
                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Survey / In-product Feedback Setup', 
                  desc: 'NPS, JTBD prompts, pricing probe',
                  icon: (
                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Experiment Run Support (4 weeks)', 
                  desc: 'Launch, monitor, analyze, iterate',
                  icon: (
                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Pricing Variant Pack', 
                  desc: 'Price/pack/plan A/Bs aligned with Pricing & Monetization Sprint',
                  icon: (
                    <svg className="w-6 h-6 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((addon, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                  <div className="mb-4">
                    {addon.icon}
                  </div>
                  <h3 className="font-bold text-lg text-[#223] mb-2">{addon.title}</h3>
                  <p className="text-base text-[#4b636e] font-light">{addon.desc}</p>
                </div>
              ))}
            </div>
            </section>

          {/* FAQs Section */}
            <FAQSection />
          </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-[#e5e7eb] shadow-lg text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/images/headshot_v2.jpg" alt="Sarah Zou headshot" width={80} height={80} className="rounded-full object-cover flex-shrink-0" />
              <h2 className="font-serif-playfair text-2xl md:text-3xl font-bold text-[#223]">Ready to master your metrics?</h2>
            </div>
            <p className="text-base text-[#4b636e] font-light mb-6 max-w-2xl mx-auto">
              Stop guessing and start making data-driven decisions. Let's build a metrics system that unlocks your startup's true potential.
            </p>
              <a
                href="https://calendly.com/sarahxzou/free-consult-30-min"
                target="_blank"
                rel="noopener noreferrer"
              className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl mb-8"
              >
              Book Your Sprint
              </a>
            </div>
          </div>

          {/* Contact Form */}
        <div className="max-w-2xl mx-auto mt-16 mb-16">
          <div className="bg-white rounded-lg p-8 border border-[#e5e7eb] shadow-sm">
            <h2 className="font-serif-playfair text-2xl font-bold mb-6 text-[#223] text-center">Let's get in touch</h2>
            <form action="https://formspree.io/f/mdkgqeye" method="POST" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="flex-1 px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="flex-1 px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                required
              />
              <textarea
                name="message"
                placeholder="Say Hello"
                rows={5}
                className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#ff5722] text-white font-bold py-3 rounded-lg transition-colors hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2 shadow"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

