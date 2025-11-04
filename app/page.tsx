import TestimonialCard from '@/components/TestimonialCard'
import HeroStackedImages from '@/components/HeroStackedImages'
import Image from 'next/image'
import { Metadata } from 'next'

const homepageTestimonials = [
  {
    name: "Maya Levin",
    title: "CFO, CloudLoop",
    quote: "Sarah reframed our pricing in one two-week sprint. We unlocked a 19% ARR lift and cut churn by a third—without touching the product roadmap."
  },
  {
    name: "James O'Brien",
    title: "Founder & CEO, Datamatic AI",
    quote: "Her AI-SaaS Index pinpointed where we lagged peers. With the new dashboards, revenue beat plan by Q2."
  },
  {
    name: "Priya Shah",
    title: "Partner, Vertex Ventures",
    quote: "Sarah turned dense metrics into a compelling deck. Our portfolio company closed a $12M Series A in just six weeks."
  }
]

export const metadata: Metadata = {
  title: "Pricing & Monetization for AI-SaaS | Fractional Chief Economist Sarah Zou",
  description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
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
    canonical: "https://sarahzou.com",
  },
  openGraph: {
    title: "Pricing & Monetization for AI-SaaS | Fractional Chief Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
    type: "website",
    url: "https://sarahzou.com",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Monetization for AI-SaaS | Fractional Chief Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Sarah Zou",
    "jobTitle": "Fractional Chief Economist",
    "description": "PhD Economist specializing in pricing strategies, metrics analytics, and investor-ready storytelling for AI-SaaS startups.",
    "url": "https://sarahzou.com",
    "image": "https://sarahzou.com/images/headshot_v2.webp",
    "sameAs": [
      "https://www.linkedin.com/in/drsarah-saas-economist",
      "https://twitter.com/SaaS_Econ"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Princeton",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "SaaS Pricing Strategy",
      "AI-SaaS Monetization",
      "Value-Based Pricing",
      "Revenue Optimization",
      "Fractional Economics"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div>
        <HeroStackedImages
          photoSrc="/images/headshot_v2.webp"
          bgSrc="/images/background.webp"
          kicker="FRACTIONAL CHIEF ECONOMIST"
          title="PhD economist for early-stage tech"
          lede="With 10+ years in quantitative modeling, applied research, and strategy & operations, I help founders design monetization, prove unit economics, instrument the right metrics, and extend runway. Get evidence-based decisions fast—without hiring a full-time team."
          photoAlt="Dr. Sarah Zou, PhD economist for early-stage tech"
          primaryCta={{
            text: "Book a 30-min Free Consult",
            href: "https://calendly.com/sarahxzou/free-consult-30-min"
          }}
          secondaryCta={{
            text: "Download the Monetization Roadmap",
            href: "/downloads/monetization-roadmap"
          }}
        />

        {/* What Makes Me Different Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#ff5722]">
              What Makes Me Different
            </h2>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Rare blend */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#ff5722] transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rare blend</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Pricing + unit economics + econometrics in one person. Most firms split this across CFO/RevOps/DS; I design the whole economic system end-to-end.
                </p>
              </div>

              {/* Card 2: Research-grade rigor */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#ff5722] transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Research-grade rigor</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I treat each engagement like an academic study: hypotheses → models → experiments → decisions. Methods are documented; assumptions are explicit.
                </p>
              </div>

              {/* Card 3: Funder-friendly outputs */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#ff5722] transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Funder-friendly outputs</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Board-ready artifacts (GM waterfall, NRR/LTV bridges, payback guardrails, elasticity write-ups) that withstand diligence—not just pretty decks.
                </p>
              </div>

              {/* Card 4: Fast, testable decisions */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-[#ff5722] transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast, testable decisions</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Sprints ship answers in 1–2 weeks with a 90-day experiment plan. No "more analysis" stall; every recommendation is testable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white flex flex-col items-center text-center">
          <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold mb-2 text-[#ff5722] relative inline-block">
            How I Can Help
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#222] mb-12">
            Fractional Chief Economist for early-stage tech startups. I turn pricing + unit economics + rigorous modeling into investor-grade decisions.
          </p>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-10">
            {/* Card 1: Monetization & Unit-Economics Sprint */}
            <a href="/consulting#monetization-sprint" className="block group">
              <div 
                className="relative h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: 'url(/images/pricing.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Title - positioned at mid-bottom, moves up on hover */}
                  <div className="transform group-hover:-translate-y-4 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      Monetization & Unit-Economics Sprint
                    </h3>
                    <p className="text-white text-xs font-medium mt-1 drop-shadow-md">
                      1–2 weeks
                    </p>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      Decide your pricing metric, 3-tier packaging & fences, GM floors/ceilings, monetization narratives, and a 90-day test plan.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Card 2: Economics OS Build */}
            <a href="/consulting#economics-os" className="block group">
              <div 
                className="relative h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: 'url(/images/metrics.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Title - positioned at mid-bottom, moves up on hover */}
                  <div className="transform group-hover:-translate-y-4 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      Economics OS Build
                    </h3>
                    <p className="text-white text-xs font-medium mt-1 drop-shadow-md">
                      4–6 weeks
                    </p>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      KPI/event schema, dashboards, cohort/LTV model, forecasting workbook, Elasticity Lab, and a board-ready pack.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Card 3: Fractional Chief Economist */}
            <a href="/consulting#fractional-retainer" className="block group">
              <div 
                className="relative h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: 'url(/images/investor.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Title - positioned at mid-bottom, moves up on hover */}
                  <div className="transform group-hover:-translate-y-4 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      Fractional Chief Economist
                    </h3>
                    <p className="text-white text-xs font-medium mt-1 drop-shadow-md">
                      Monthly
                    </p>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      Own pricing roadmap, experiment cadence, rolling forecast, and investor narrative. Quarterly price/pack refresh.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <a
            href="https://calendly.com/sarahxzou/free-consult-30-min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#ff5722] text-[#ff5722] font-bold px-10 py-4 rounded-lg text-lg tracking-widest hover:bg-[#ff5722] hover:text-white transition-colors mt-4"
          >
            LET'S WORK TOGETHER
          </a>
        </section>
        <section className="py-20 bg-white flex flex-col items-center">
          <div className="max-w-4xl w-full">
            <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold mb-8 text-center text-[#ff5722]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-[#111]">What is a fractional chief economist?</h3>
                <p className="text-gray-700 mb-3">
                  A fractional chief economist is a part-time economic advisor who brings PhD-level expertise to your pricing, metrics, and growth strategy without the cost of a full-time hire.
                </p>
                <a href="/consulting#faq" className="text-[#ff5722] font-medium hover:underline">
                  Learn more about fractional economics →
                </a>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-[#111]">How quickly can you impact our pricing?</h3>
                <p className="text-gray-700 mb-3">
                  Most clients see initial pricing improvements within 2-4 weeks. Our Pricing Quickstart delivers a complete strategy and test plan in just 14 days.
                </p>
                <a href="/consulting#faq" className="text-[#ff5722] font-medium hover:underline">
                  See our pricing services →
                </a>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-[#111]">What makes your approach different?</h3>
                <p className="text-gray-700 mb-3">
                  I combine academic rigor with startup speed. Every recommendation is backed by data, tested with experiments, and designed for your specific market dynamics.
                </p>
                <a href="/consulting#faq" className="text-[#ff5722] font-medium hover:underline">
                  Explore our methodology →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 