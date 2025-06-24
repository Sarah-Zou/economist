"use client";

import Seo from '@/components/Seo'
import ContactCTA from '@/components/ContactCTA'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const services = [
  {
    slug: 'investor-deck-accelerator',
    title: 'Investor Deck Accelerator',
    hero: 'Close the credibility gap—walk into your next investor call with a board-worthy deck, built in 48 hours.',
    summary: 'Board-worthy deck in 48 hours. Proven template, narrative checklist, and red-flag review.',
    image: '/images/S-1.webp',
  },
  {
    slug: 'saas-metrics-clarity-pack',
    title: 'SaaS Metrics Clarity Pack',
    hero: 'Turn messy spreadsheets into a single source of metric truth in one week.',
    summary: 'Unified KPI workbook, field-mapping, and push-button reporting.',
    image: '/images/S-2.webp',
  },
  {
    slug: 'competitive-benchmark-insights',
    title: 'Competitive Benchmark Insights',
    hero: 'Instantly see how your growth rates, burn, and payback compare to peers at your stage.',
    summary: 'Custom PDF, CSV lookup, and access to benchmark DB.',
    image: '/images/S-3.webp',
  },
  {
    slug: 'runway-scenario-model',
    title: 'Runway & Scenario Model',
    hero: 'Know exactly how many months of runway you have under best, base, and worst cases—without wrestling Excel.',
    summary: '3-statement model, Monte-Carlo, and auto-updating dashboard.',
    image: '/images/S-4.webp',
  },
  {
    slug: 'investor-updates-automation-kit',
    title: 'Investor Updates Automation Kit',
    hero: 'Spend minutes—not hours—creating monthly investor updates.',
    summary: 'Notion/Visible templates, Zapier scripts, and prompt library.',
    image: '/images/S-5.webp',
  },
  {
    slug: 'on-call-economist-retainer',
    title: 'On-Call Economist Retainer',
    hero: 'Your fractional economist in Slack—answers in hours, not weeks.',
    summary: 'Slack channel, quarterly benchmarks, and mini-models.',
    image: '/images/S-6.webp',
  },
  {
    slug: 'pricing-diagnostic-revenue-boost',
    title: 'Pricing Diagnostic & Revenue Boost',
    hero: 'Find hidden ARR in 14 days.',
    summary: 'Health scorecard, uplift roadmap, and strategy call.',
    image: '/images/P-1.webp',
  },
  {
    slug: 'customer-value-research-pack',
    title: 'Customer Value Research Pack',
    hero: 'Know exactly what prospects will pay—and why.',
    summary: 'Survey design, analysis, and findings deck.',
    image: '/images/P-2.webp',
  },
  {
    slug: 'value-based-monetization-design',
    title: 'Value-Based Monetization Design',
    hero: 'Align revenue with the metric customers truly value.',
    summary: 'Workshop, financial modeling, and migration playbook.',
    image: '/images/P-3.webp',
  },
  {
    slug: 'rapid-pricing-experiment-toolkit',
    title: 'Rapid Pricing Experiment Toolkit',
    hero: 'A/B test pricing like a product feature—no engineering bottlenecks.',
    summary: 'Experiment sheets, dashboard, and coaching.',
    image: '/images/P-4.webp',
  },
  {
    slug: 'price-change-comms-playbook',
    title: 'Price Change Comms Playbook',
    hero: 'Raise prices, keep goodwill.',
    summary: 'Templates, FAQ, and rollout checklist.',
    image: '/images/P-5.webp',
  },
  {
    slug: 'profitability-simulator',
    title: 'Profitability Simulator',
    hero: 'Stress-test unit economics before you hire or discount.',
    summary: 'Interactive simulator, scenario library, and tutorial.',
    image: '/images/P-6.webp',
  },
  {
    slug: 'investor-monetization-pitch-kit',
    title: 'Investor Monetization Pitch Kit',
    hero: 'Tell a monetization story that commands premium valuation.',
    summary: 'Slide templates, talking points, and rehearsal.',
    image: '/images/P-7.webp',
  },
  {
    slug: 'pricing-optimization-retainer',
    title: 'Pricing Optimization Retainer',
    hero: 'Continuous pricing edge without hiring a full team.',
    summary: 'Quarterly review, experiment feedback, and hotline.',
    image: '/images/P-8.webp',
  },
]

const testimonials = [
  {
    name: "Maya Levin",
    title: "CFO, CloudLoop",
    quote: "Sarah reframed our pricing in one two-week sprint. We unlocked a 19 % ARR lift and cut churn by a third—without touching the product roadmap."
  },
  {
    name: "James O'Brien",
    title: "Founder & CEO, Datamatic AI",
    quote: "Her AI-SaaS Index pinpointed where we lagged peers. With the new dashboards, revenue beat plan by Q2."
  },
  {
    name: "Priya Shah",
    title: "Partner, Vertex Ventures",
    quote: "Sarah turned dense metrics into a compelling deck. Our portfolio company closed a $12 M Series A in just six weeks."
  }
]

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Metrics', value: 'metrics' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Investor', value: 'investor' },
];

// Service classification
const serviceCategories = {
  'investor-deck-accelerator': ['investor', 'metrics'],
  'saas-metrics-clarity-pack': ['metrics'],
  'competitive-benchmark-insights': ['investor', 'metrics'],
  'runway-scenario-model': ['investor', 'metrics'],
  'investor-updates-automation-kit': ['investor', 'metrics'],
  'on-call-economist-retainer': ['investor', 'metrics', 'pricing'],
  'pricing-diagnostic-revenue-boost': ['pricing'],
  'customer-value-research-pack': ['pricing'],
  'value-based-monetization-design': ['pricing'],
  'rapid-pricing-experiment-toolkit': ['metrics', 'pricing'],
  'price-change-comms-playbook': ['investor', 'pricing'],
  'profitability-simulator': ['investor', 'metrics', 'pricing'],
  'investor-monetization-pitch-kit': ['investor', 'metrics', 'pricing'],
  'pricing-optimization-retainer': ['investor', 'metrics', 'pricing'],
};

function ConsultingContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get('filter');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (urlFilter && ['metrics', 'pricing', 'investor'].includes(urlFilter.toLowerCase())) {
      setFilter(urlFilter.toLowerCase());
    } else {
      setFilter('all');
    }
  }, [urlFilter]);

  const filteredServices = filter === 'all'
    ? services
    : services.filter(s => (serviceCategories as Record<string, string[]>)[s.slug]?.includes(filter));

  return (
    <>
      <Seo
        title="SaaS & AI Consulting Services | Pricing, Metrics, and Growth | Sarah Zou"
        description="Explore consulting services from Sarah Zou, PhD: pricing strategy, SaaS metrics, investor communications, and AI-driven growth. Tailored solutions for SaaS founders and tech leaders."
        path="/consulting"
      />
      <section className="py-20 bg-[#f5f5f5] min-h-screen">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif-playfair text-4xl font-bold mb-6 text-[#111]">Consulting Services</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Expert guidance to help your SaaS business thrive in today's competitive landscape.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-10 gap-4">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-full border font-semibold transition-colors text-sm
                  ${filter === f.value
                    ? 'bg-[#223] text-white border-[#223] shadow'
                    : 'bg-white text-[#223] border-[#bcd0c7] hover:bg-[#f5f8f7]'}
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24 border-t border-b border-[#e5e7eb] bg-white py-12">
            {filteredServices.map((service, index) => (
              <div key={index} className="flex flex-col items-center px-4 text-center">
                <div className="relative w-64 h-40 mb-4 rounded-2xl overflow-hidden border border-[#e5e7eb] bg-[#f5f5f5] flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={256}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="font-serif-playfair text-lg font-bold mb-1">{service.title}</div>
                <div className="text-sm italic mb-2">{service.hero}</div>
                <Link
                  href={`/consulting/services/${service.slug}`}
                  className="text-[#ff5722] font-medium hover:underline flex items-center gap-1 text-sm mt-2"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="font-serif-playfair text-2xl font-bold mb-8 text-center text-[#ff5722]">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* {testimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
              ))} */}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactCTA variant="section" />
          </div>
        </div>
      </section>
    </>
  )
}

export default function Consulting() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultingContent />
    </Suspense>
  );
} 