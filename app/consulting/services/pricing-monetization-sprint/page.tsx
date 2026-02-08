import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import FAQSection from './FAQSection';
import ContactForm from '@/components/ContactForm';
import { generateServiceJsonLd } from '@/lib/generateJsonLd';

export const metadata: Metadata = {
  title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
  description: '5-day sprint: land value metric, 3-tier pricing, discount guardrails, rollout plan. For Pre-Seed–Series A SaaS, APIs & AI. Optional extra week at no fee. NRR & payback focus.',
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
    canonical: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  openGraph: {
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description: '5-day sprint: land value metric, 3-tier pricing, discount guardrails, rollout plan. For Pre-Seed–Series A SaaS, APIs & AI. Optional extra week at no fee. NRR & payback focus.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/pricing-monetization-sprint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Sprint for Seed–Series A Startups | Sarah Zou',
    description: '5-day sprint: land value metric, 3-tier pricing, discount guardrails, rollout plan. For Pre-Seed–Series A SaaS, APIs & AI. Optional extra week at no fee. NRR & payback focus.',
  },
};

const SERVICE_URL = 'https://sarahzou.com/consulting/services/pricing-monetization-sprint';

export default function PricingDiagnosticRevenueBoost() {
  const serviceJsonLd = generateServiceJsonLd({
    name: 'Pricing & Monetization Sprint',
    description: 'Land your value metric, 3-tier pricing, discount guardrails, and rollout plan in 5 business days—or get one extra week at no fee. For early-stage tech founders (Pre-Seed → Series A).',
    url: SERVICE_URL
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="bg-[#f5f8f7] min-h-screen py-0 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-xs text-[#3b4652] font-semibold mb-4 block">Consulting Service</span>
          <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933] mb-4 leading-tight max-w-4xl mx-auto">
            Master Your Monetization. Go from Guesswork to Growth.
          </h1>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 max-w-3xl mx-auto">
            A one-week intensive sprint designed for early-stage tech founders to build a pricing and monetization strategy that converts.
          </p>
        </div>

        {/* Navigation Chips */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <a
            href="#key-benefits"
            className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
          >
            Outcomes
          </a>
          <a
            href="#cadence"
            className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
          >
            FAQ
          </a>
        </div>

        {/* Guarantee Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif-playfair text-xl font-semibold text-[#1f2933]">Our Guarantee</h2>
            </div>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
              We guarantee you'll walk away with a clear, actionable monetization strategy. If you're not satisfied with the outcome, we'll work with you until you are.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Who it's for Section */}
          <section className="text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">Who This Sprint is For</h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 max-w-3xl mx-auto">
              Early-stage tech founders (Pre-Seed → Series A; pre-revenue to &lt;$3M ARR) who need investor-credible monetization, a first price for launch, or a reset after weak revenue yield.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
              <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold text-[20px] text-[#1f2933] mb-2">Pre-Seed Founders</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Building your first pricing model and need investor-credible monetization strategy before launch.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-left">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="font-semibold text-[20px] text-[#1f2933] mb-2">Seed or Series-A Startups</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Need to reset pricing after weak revenue yield or optimize monetization for growth and fundraising.
                </p>
              </div>
            </div>
          </section>

          {/* Common Triggers Section */}
          <section id="key-benefits" className="text-center scroll-mt-24">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">Common triggers</h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8">If any of these sound familiar, this sprint is designed for you.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: '❓', text: 'Unsure how to price new product or new features' },
                { icon: '📉', text: 'Low conversion/ARPU' },
                { icon: '💼', text: 'Pressure to show a credible plan for fundraising/board' },
                { icon: '🔄', text: 'Confusion over subscription vs. usage' },
                { icon: '⚠️', text: 'Fear of churn from price changes' },
                { icon: '🎲', text: 'Pricing feels "plucked from thin air"' }
              ].map((trigger, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{trigger.icon}</div>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{trigger.text}</p>
                </div>
              ))}
          </div>
            </section>

          {/* Outcomes & What You Get - Two Column Layout */}
            <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tangible Outcomes */}
              <div>
                <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3">Tangible Outcomes</h2>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6">By the end of the sprint, you will have:</p>
                <ol className="space-y-4">
                  {[
                    <><strong>A value-based pricing model that aligns with your customer segments</strong>, with value metric chosen</>,
                    <><strong>Clear, data-backed pricing structure</strong> with 3-tier packaging + price fences + list price points </>,
                    <><strong>Unit-economics snapshot</strong> at recommended prices</>,
                    <><strong>30-day rollout plan</strong> </>,
                    <><strong>Confidence and clarity to communicate your pricing to customers and investors</strong> </>
                  ].map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{outcome}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* What You Get */}
              <div>
                <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3">What You Get</h2>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6">A comprehensive set of deliverables:</p>
                <ul className="space-y-4">
                  {[
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ),
                      text: <><strong>Pricing Strategy Report</strong> (hypotheses, competitive analysis, value metrics, pricing structure, final recommendations)</>
                    },
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      ),
                      text: <><strong>Unit Economics model</strong> (GM, LTV/CAC, scenarios, sensitivity analysis)</>
                    },
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      ),
                      text: <><strong>Pricing Implementation Roadmap</strong> (pricing page, policy, comms)</>
                    },
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      ),
                      text: <><strong>Readout</strong> with decisions, risks, next actions</>
                    },
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      ),
                      text: <><strong>Experiment design</strong> (test brief[s], metrics, segments, runbook) — per tier</>
                    },
                    { 
                      icon: (
                        <svg className="w-5 h-5 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                      text: <><strong>Investor mini-pack</strong> on monetization — per tier</>
                    }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                      <span className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{item.text}</span>
                    </li>
                  ))}
                  </ul>
                </div>
            </div>
          </section>

          {/* Cadence Section */}
          <section id="cadence" className="text-center scroll-mt-24">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3">The 1-Week Sprint Cadence</h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-12 max-w-2xl mx-auto">
              A structured, collaborative process designed for maximum impact in minimum time.
            </p>
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2 relative">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#e5e7eb] z-0" style={{ left: '2rem', right: '2rem' }}></div>
                {[
                  { day: 0, name: 'Discovery', desc: 'Data room review and current-state scan' },
                  { day: 1, name: 'Workshop #1', desc: 'Define goals, ICPs, and value drivers' },
                  { day: 2, name: 'Research', desc: 'Draft architecture and price bands' },
                  { day: 3, name: 'Workshop #2', desc: 'Lock value metric and tiers' },
                  { day: 4, name: 'Validation', desc: 'Refine unit economics and plan' },
                  { day: 5, name: 'Handoff', desc: 'Final presentation and delivery' }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <div className="bg-[#ff5722] rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <span className="text-xs sm:text-sm font-bold text-white text-center leading-tight px-2">
                        Day {step.day}<br/>{step.name}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#1f2933] leading-[1.65] max-w-[120px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="text-center scroll-mt-24">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3">A Clear Investment in Your Growth</h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 max-w-2xl mx-auto">
              Get an expert monetization strategy for a fraction of the cost and time of hiring full-time.
            </p>
            
            {/* Comparison Table */}
            <div className="bg-white rounded-lg p-4 sm:p-8 border border-[#e5e7eb] shadow-sm overflow-x-auto mb-8 max-w-5xl mx-auto -mx-4 sm:mx-auto" role="region" aria-label="Service comparison table">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-[#1f2933]">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-[#1f2933] whitespace-nowrap">Feature</th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-[#1f2933] whitespace-nowrap">Doing Nothing</th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-[#1f2933] whitespace-nowrap">Hire Full-Time</th>
                    <th className="text-center py-3 sm:py-4 px-3 sm:px-4 font-semibold text-xs sm:text-sm text-[#1f2933] bg-[#fff5f2] rounded-t-lg whitespace-nowrap">Pricing & Monetization Sprint</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 sm:py-5 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-[17px] text-[#1f2933] text-left min-w-[120px]">Cost</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">$0 (Lost Revenue)</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">$150k+/yr</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 bg-[#fff5f2] text-[#ff5722] font-semibold text-sm sm:text-base md:text-[17px] text-center">$5k-$18k</td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 sm:py-5 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-[17px] text-[#1f2933] text-left min-w-[120px]">Time to Value</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">Never</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">3-6+ Months</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 bg-[#fff5f2] text-[#ff5722] font-semibold text-sm sm:text-base md:text-[17px] text-center">1-2 Weeks</td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 sm:py-5 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-[17px] text-[#1f2933] text-left min-w-[120px]">Expertise</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-[#ff5722] flex items-center justify-center mx-auto">
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 bg-[#fff5f2] text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 sm:py-5 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-[17px] text-[#1f2933] text-left min-w-[120px]">Actionable Strategy</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-[#ff5722] flex items-center justify-center mx-auto">
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 bg-[#fff5f2] text-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#e5e7eb]">
                    <td className="py-4 sm:py-5 px-3 sm:px-4 font-medium text-sm sm:text-base md:text-[17px] text-[#1f2933] text-left min-w-[120px]">Risk</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">High</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base md:text-[17px] text-center">High</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 bg-[#fff5f2] text-[#ff5722] font-semibold text-sm sm:text-base md:text-[17px] rounded-b-lg text-center">Zero (Guaranteed)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="max-w-6xl mx-auto mt-20">
              <h3 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-3 text-center">Choose the Right Strategy Sprint for Your Business</h3>
              <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-12 text-center max-w-2xl mx-auto">
                Find the perfect plan to unlock your product's pricing and monetization potential.
              </p>
              
              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    name: 'Lite', 
                    price: '$5K',
                    duration: '/ 1 wk',
                    description: 'Pre-launch or just-post-MVP teams needing a defendable first price, simple G/B/B package, and discount guardrails.',
                    buttonText: 'Choose Plan',
                    buttonStyle: 'bg-[#f6f7f9] text-[#1f2933] hover:bg-[#e2e6ea]',
                    features: [
                      { text: <>1x60 min <strong>Workshops</strong></>, included: true },
                      { text: <>6-10 pp <strong>Strategy Report</strong></>, included: true },
                      { text: <>1 segment · 1 scenario <strong>Unit Econ Model</strong></>, included: true },
                      { text: <><strong>Experiment design</strong></>, included: false },
                      { text: <><strong>Customer value research</strong></>, included: false },
                      { text: <><strong>Investor slides</strong></>, included: false },
                      { text: <>Async Q&A (1 wk) <strong>Follow-up support</strong></>, included: true }
                    ]
                  },
                  { 
                    name: 'Core', 
                    price: '$9K',
                    duration: '/ 1 wk',
                    description: 'Early-revenue startups (pilots to ~$1M ARR) with weak yield needing value metric validation, tier refinement, and first pricing experiment.',
                    buttonText: 'Get Started',
                    buttonStyle: 'bg-[#ff5722] text-white hover:bg-[#e44e1f]',
                    features: [
                      { text: <>2x60 min <strong>Workshops</strong></>, included: true },
                      { text: <>12-18 pp <strong>Strategy Report</strong></>, included: true },
                      { text: <>2-3 segments · 3 scenarios <strong>Unit Econ Model</strong></>, included: true },
                      { text: <>1 test brief <strong>Experiment design</strong></>, included: true },
                      { text: <><strong>Customer value research</strong></>, included: false },
                      { text: <>2-3 <strong>Investor slides</strong></>, included: true },
                      { text: <>1 x 45-min at 30 days <strong>Follow-up support</strong></>, included: true }
                    ]
                  },
                  { 
                    name: 'Pro', 
                    price: '$18K',
                    duration: '/ 2 wks',
                    description: 'Investor-critical resets or complex cases (multiple segments/SKUs, usage-based shift) requiring customer research, deeper modeling, and multi-test design.',
                    buttonText: 'Choose Plan',
                    buttonStyle: 'bg-[#f6f7f9] text-[#1f2933] hover:bg-[#e2e6ea]',
                    features: [
                      { text: <>3x60 min <strong>Workshops</strong></>, included: true },
                      { text: <>18-25 pp + comms copy blocks <strong>Strategy Report</strong></>, included: true },
                      { text: <>3+ segments · 3-5 scenarios + sensitivity <strong>Unit Econ Model</strong></>, included: true },
                      { text: <>2-3 briefs + power check <strong>Experiment design</strong></>, included: true },
                      { text: <>8-10 interviews or survey</>, included: true },
                      { text: <>5-8 <strong>Investor slides</strong></>, included: true },
                      { text: <>2 x 45-min at 30 & 60 days <strong>Follow-up support</strong></>, included: true }
                    ]
                  }
                ].map((tier, tierIdx) => (
                  <div 
                    key={tierIdx} 
                    className="bg-white rounded-lg border-2 border-[#e5e7eb] shadow-sm p-6 flex flex-col"
                  >
                    <div className="mb-6">
                      <h4 className="font-serif-playfair text-2xl font-bold text-[#ff5722] mb-3 text-left">{tier.name}</h4>
                      <div className="mb-2 text-left">
                        <span className="text-3xl font-bold text-[#1f2933]">{tier.price}</span>
                        <span className="text-sm text-[#3b4652] ml-1">{tier.duration}</span>
                      </div>
                      <p className="text-base sm:text-[17px] text-[#1f2933] text-left leading-[1.65] mt-2">{tier.description}</p>
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
                            <div className="w-5 h-5 rounded-full bg-[#f6f7f9] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-[#3b4652]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          <span className={`text-sm ${feature.included ? 'text-[#1f2933]' : 'text-[#3b4652]'}`}>
                            {feature.text}
                          </span>
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

          {/* Add-ons Section */}
            <section>
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-6 text-center">Add-ons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  title: 'Customer Value Research Pack', 
                  desc: 'Interviews/survey to de-risk pricing assumptions',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Pricing Page Wireframe + Comms Pack', 
                  desc: 'Web copy, emails, in-app modals',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                { 
                  title: 'Experiment Run Support (4 weeks)', 
                  desc: 'Stand-up tests, analyze, iterate',
                  icon: (
                    <svg className="w-6 h-6 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                }
              ].map((addon, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                  <div className="mb-4">
                    {addon.icon}
                  </div>
                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-2">{addon.title}</h3>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">{addon.desc}</p>
                </div>
              ))}
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
              "url": "https://sarahzou.com/consulting/services/pricing-monetization-sprint",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Will this work if we're pre-revenue?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Pre-revenue or pre-MVP is the perfect timing to start designing your first pricing strategy. The sprint is designed for pre-launch through <$3M ARR to make your first price investor-credible and testable."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will customers churn if we raise prices?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We pair guardrails with plan fences, run low-risk experiments, and read impact via unit-economics snapshots—minimizing exposure while learning."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can we switch to usage-based?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "If a usage metric truly tracks value, we'll validate the metric, design hybrid fences, and ship a 30-day rollout plan with comms."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What do you need from us to start?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Discovery inputs/data room and a current-state scan, followed by two focused workshops to lock positioning, customer segmentations, value metric, tiers, guardrails, and etc."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What exactly do we get?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A pricing strategy report, unit-economics model, pricing implementation roadmap, experiment briefs, and investor mini-pack—delivered in one to two weeks."
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
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933]">Thinking about a Pricing Sprint?</h2>
            </div>
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6 max-w-2xl mx-auto">
              Book a free 15-minute call to assess whether pricing is your highest-impact lever right now and what outcomes you could realistically expect in 5 days.
            </p>
              <a
                href="/book"
              className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl mb-8"
              >
              Book a free 15-minute call
              </a>
            </div>
          </div>

          {/* Contact Form */}
        <div className="max-w-2xl mx-auto mt-16 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="font-serif-playfair text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2933] text-center">
              Prefer email? Send a Message
            </h2>
            <p className="text-sm text-[#3b4652] text-center mb-4">
              Expect a reply in 1–2 business days. Want a faster answer? <Link href="/book" className="text-[#ff5722] hover:underline font-medium">Book a 15-min call</Link>
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] shadow-lg z-50 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3">
          <Link
            href="/book"
            className="flex-1 bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-4 py-3 rounded-lg text-center transition-colors shadow-sm"
          >
            Book Free Consult
          </Link>
          <Link
            href="/contact"
            className="flex-1 bg-transparent border-2 border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-white font-bold px-4 py-3 rounded-lg text-center transition-colors"
          >
            Send a message
          </Link>
        </div>
      </div>
    </>
  );
} 
