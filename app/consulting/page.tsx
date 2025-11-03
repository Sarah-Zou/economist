import ContactCTA from '@/components/ContactCTA'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SaaS Pricing Consulting | Fractional Chief Economist Sarah Zou",
  description: "Expert pricing strategy consulting for SaaS companies. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
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
    canonical: "https://sarahzou.com/consulting",
  },
  openGraph: {
    title: "SaaS Pricing Consulting | Fractional Chief Economist Sarah Zou",
    description: "Expert pricing strategy consulting for SaaS companies. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
    type: "website",
    url: "https://sarahzou.com/consulting",
    images: ["https://sarahzou.com/images/P-1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Pricing Consulting | Fractional Chief Economist Sarah Zou",
    description: "Expert pricing strategy consulting for SaaS companies. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
    images: ["https://sarahzou.com/images/P-1.webp"],
  },
};

const services = [
  {
    slug: 'pricing-diagnostic-revenue-boost',
    title: 'Pricing Quickstart',
    hero: 'Find hidden ARR fast.',
    summary: 'WTP bands (lite), packaging & price points, pricing page copy, experiment plan, 30/60/90 roadmap, health scorecard.',
    duration: '14 days',
    price: '$3.5k Lite / $6k Pro',
    image: '/images/P-1.webp',
  },
  {
    slug: 'rapid-pricing-experiment-toolkit',
    title: 'Rapid Experiment Build',
    hero: 'Ship pricing tests safely; learn fast.',
    summary: 'Design sheets, guardrails, cohort dashboard, readout templates; then 1–2 live tests.',
    duration: '3–5 weeks',
    price: '$4k setup + $2k/test',
    image: '/images/P-4.webp',
  },
  {
    slug: 'customer-value-research-pack',
    title: 'Customer Value Research Pack',
    hero: 'Hear customers → price with confidence.',
    summary: 'Interviews + survey, value map, price fences & messaging.',
    duration: '2 weeks',
    price: '$3.5k',
    image: '/images/P-2.webp',
  },
  {
    slug: 'pricing-optimization-retainer',
    title: 'Pricing Ops Retainer',
    hero: 'Continuous edge without new hires.',
    summary: 'Core: 2 tests/mo, deal-desk, quarterly review. Plus: adds VoC pulse, exec memo, enablement.',
    duration: 'monthly',
    price: '$3k Core / $5k Plus',
    image: '/images/P-8.webp',
  },
]

const testimonials = [
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


function ConsultingContent() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "SaaS & AI Consulting Services",
              "description": "Expert guidance to help your SaaS business thrive in today's competitive landscape through pricing strategy, metrics analysis, and growth optimization.",
              "provider": {
                "@type": "Person",
                "name": "Dr. Sarah Zou",
                "jobTitle": "Fractional Chief Economist",
                "url": "https://sarahzou.com"
              },
              "url": "https://sarahzou.com/consulting",
              "serviceType": [
                "Pricing Strategy Consulting",
                "SaaS Metrics Analysis",
                "Revenue Optimization",
                "AI-SaaS Growth Strategy"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pricing Quickstart",
                      "description": "Find hidden ARR fast with WTP bands, packaging & price points, pricing page copy, and experiment plan."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Rapid Experiment Build",
                      "description": "Ship pricing tests safely with design sheets, guardrails, cohort dashboard, and readout templates."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Customer Value Research Pack",
                      "description": "Hear customers and price with confidence through interviews, surveys, value mapping, and messaging frameworks."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pricing Ops Retainer",
                      "description": "Continuous pricing edge with 2 tests/month, deal-desk optimization, and quarterly reviews."
                    }
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "When not to change prices?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Avoid price changes during major product launches, customer renewals, or market volatility. We'll identify the optimal timing based on your customer lifecycle, competitive landscape, and internal capacity to handle the transition smoothly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Will usage pricing spike bills?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not with proper design. We implement usage caps, tiered pricing, and clear communication to prevent bill shock. Our approach includes customer education, gradual rollouts, and safety nets to maintain satisfaction while optimizing revenue."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do we test without harming revenue?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Through controlled experiments with guardrails: A/B tests on new customers, grandfathering existing clients, and gradual rollouts. We monitor key metrics and have rollback plans to ensure revenue protection while gathering valuable pricing insights."
                  }
                }
              ]
            }
          ])
        }}
      />
      <section className="py-20 bg-[#f5f5f5] min-h-screen">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif-playfair text-4xl font-bold mb-6 text-[#111]">Consulting Services</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Expert guidance to help your SaaS business thrive in today's competitive landscape.
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/consulting/services/${service.slug}`}
                className="block group"
              >
                <div 
                  className="relative h-[400px] w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    {/* Title - positioned at mid-bottom, moves up on hover */}
                    <div className="transform group-hover:-translate-y-4 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-white text-sm font-medium drop-shadow-md">
                          {service.duration}
                        </p>
                        <p className="text-white text-sm font-bold drop-shadow-md">
                          {service.price}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hero text - appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-white text-lg leading-relaxed mt-3 drop-shadow-md">
                        {service.hero}
                      </p>
                      <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                        {service.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Testimonials section commented out */}
          {false && (
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="font-serif-playfair text-2xl font-bold mb-8 text-center text-[#ff5722]">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* {testimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
              ))} */}
            </div>
          </div>
          )}

          {/* How Engagements Run Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-serif-playfair text-3xl font-bold mb-8 text-center text-[#ff5722]">
              How Engagements Run
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-[#ff5722] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    0
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#111]">Week 0</h3>
                  <p className="text-gray-700 text-sm">Intake</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#ff5722] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    2
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#111]">Week 2</h3>
                  <p className="text-gray-700 text-sm">Recommendations</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#ff5722] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    3-8
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#111]">Weeks 3–8</h3>
                  <p className="text-gray-700 text-sm">Experiments</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#ff5722] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    90
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#111]">90-day</h3>
                  <p className="text-gray-700 text-sm">Check</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16" id="faq">
            <h2 className="font-serif-playfair text-3xl font-bold mb-8 text-center text-[#ff5722]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-[#111]">When not to change prices?</h3>
                <p className="text-gray-700">
                  Avoid price changes during major product launches, customer renewals, or market volatility. We'll identify the optimal timing based on your customer lifecycle, competitive landscape, and internal capacity to handle the transition smoothly.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-[#111]">Will usage pricing spike bills?</h3>
                <p className="text-gray-700">
                  Not with proper design. We implement usage caps, tiered pricing, and clear communication to prevent bill shock. Our approach includes customer education, gradual rollouts, and safety nets to maintain satisfaction while optimizing revenue.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-[#111]">How do we test without harming revenue?</h3>
                <p className="text-gray-700">
                  Through controlled experiments with guardrails: A/B tests on new customers, grandfathering existing clients, and gradual rollouts. We monitor key metrics and have rollback plans to ensure revenue protection while gathering valuable pricing insights.
                </p>
              </div>
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
  return <ConsultingContent />;
} 