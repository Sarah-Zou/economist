import TestimonialCard from '@/components/TestimonialCard'
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
  title: "Pricing & Monetization for AI-SaaS | Fractional Economist Sarah Zou",
  description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
  openGraph: {
    title: "Pricing & Monetization for AI-SaaS | Fractional Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
    type: "website",
    url: "https://sarahzou.com",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Monetization for AI-SaaS | Fractional Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in AI-SaaS growth strategies.",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
  alternates: {
    canonical: "https://sarahzou.com",
  },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Sarah Zou",
    "jobTitle": "Fractional Economist",
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
        <section className="py-8 md:py-12">
          <div className="container max-w-7xl mx-auto">
            <div className="bg-white rounded-[2.5rem] flex flex-col lg:flex-row items-stretch p-0 overflow-hidden min-h-[420px] border border-[#f0f0f0]">
              {/* Left: Text */}
              <div className="flex-1 flex flex-col justify-center items-start px-10 py-12 md:px-16 md:py-0 text-[#222] bg-white">
                <h1 className="font-serif-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Pricing & Monetization for AI-SaaS
                </h1>
                <p className="text-lg md:text-xl mb-8 text-[#222] max-w-xl">
                  Value-based pricing, packaging, and revenue experiments that lift ARR and retention.
                </p>
                <a 
                  href="https://calendly.com/sarahz-saas-economist" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block border-2 border-[#ff5722] text-[#ff5722] font-bold px-6 py-3 rounded-full text-lg tracking-widest hover:bg-[#ff5722] hover:text-white transition-colors mt-4"
                >
                  Book Free Consult <span className="ml-2" aria-hidden>→</span>
                </a>
              </div>
              {/* Right: Image */}
              <div className="flex-1 flex items-stretch">
                <picture>
                  <source srcSet="/images/headshot_v2.webp" type="image/webp" />
                  <Image
                    src="/images/headshot_v2.jpg"
                    alt="Sarah Zou headshot"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white flex flex-col items-center text-center">
          <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold mb-2 text-[#ff5722] relative inline-block">
            How I Can Help
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-[#222] mb-12">
            Fractional Economist focused on pricing power. I turn WTP research + experiment design into ARR, faster payback, and lower churn.
          </p>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-10">
            {/* Pricing Quickstart */}
            <a 
              href="/consulting/services/pricing-diagnostic-revenue-boost" 
              className="block group"
            >
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
                      Pricing Quickstart
                    </h3>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      Your packaging, price points, and a safe test plan—ready in 14 days.
                    </p>
                    <a href="/consulting" className="inline-block text-white text-xs font-medium mt-2 hover:underline">
                      See scope & deliverables →
                    </a>
                  </div>
                </div>
              </div>
            </a>

            {/* Experiment Build */}
            <a 
              href="/consulting/services/rapid-pricing-experiment-toolkit" 
              className="block group"
            >
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
                      Experiment Build
                    </h3>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      Instrumentation, WTP research, cohorts, and rollout guardrails.
                    </p>
                    <a href="/consulting" className="inline-block text-white text-xs font-medium mt-2 hover:underline">
                      See scope & deliverables →
                    </a>
                  </div>
                </div>
              </div>
            </a>

            {/* Pricing Ops Retainer */}
            <a 
              href="/consulting/services/pricing-optimization-retainer" 
              className="block group"
            >
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
                      Pricing Ops Retainer
                    </h3>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      Two tests/month + deal desk help + policy tuning.
                    </p>
                    <a href="/consulting" className="inline-block text-white text-xs font-medium mt-2 hover:underline">
                      See scope & deliverables →
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <a
            href="https://calendly.com/sarahz-saas-economist"
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
                <h3 className="font-bold text-lg mb-3 text-[#111]">What is a fractional economist?</h3>
                <p className="text-gray-700 mb-3">
                  A fractional economist is a part-time economic advisor who brings PhD-level expertise to your pricing, metrics, and growth strategy without the cost of a full-time hire.
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