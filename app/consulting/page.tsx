import ContactCTA from '@/components/ContactCTA'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pricing Consulting for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
  description: "Expert pricing strategy consulting for early-stage tech startups. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
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
    title: "Pricing Consulting for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
    description: "Expert pricing strategy consulting for early-stage tech startups. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
    type: "website",
    url: "https://sarahzou.com/consulting",
    images: ["https://sarahzou.com/images/P-1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Consulting for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
    description: "Expert pricing strategy consulting for early-stage tech startups. Get validated price points, experiment-ready plans, and revenue optimization from PhD economist Sarah Zou.",
    images: ["https://sarahzou.com/images/P-1.webp"],
  },
};

const services = [
  {
    id: 'monetization-sprint',
    slug: 'pricing-monetization-sprint',
    title: 'Pricing & Monetization Sprint',
    description: 'A focused, high-impact engagement to design price, package, and policy for sustainable growth. In 5 days, we land your value metric, 3-tier pricing, discount guardrails, and a rollout plan.',
    bullets: [
      'Good/Better/Best packaging with price fences and upgrade paths.',
      'List prices with discount/trial guardrails and value messaging.',
      'Unit-economics snapshot (GM%, CAC payback) + 30-day rollout plan.'
    ],
    cta: 'Explore Pricing Sprint',
    image: '/images/S-4.webp',
  },
  {
    id: 'economics-os',
    slug: 'metrics-experimentation-sprint',
    title: 'Metrics & Experimentation Sprint',
    description: 'A one-week build to install a working KPI loop and a repeatable testing cadence that turns noise into decisions and lifts conversion/ARPU.',
    bullets: [
      'North Star + metric tree with green/amber/red thresholds and owners.',
      'Live dashboards (Founder, GTM, Product) + lean event patch list.',
      'Experiment backlog (8–12) with 2 ready-to-run test briefs and SOP.'
    ],
    cta: 'Explore Metrics Sprint',
    image: '/images/metrics.webp',
  },
  {
    id: 'fractional-retainer',
    slug: 'on-call-economist-retainer',
    title: 'Fractional Chief Economist (Retainer)',
    description: 'Ongoing ownership of monetization, forward models, and experiment cadence. You get decisions, not dashboards—kept board-ready every month.',
    bullets: [
      'Shipped decisions (pricing moves/tests) with guardrails and readouts.',
      'Economist\'s Board Pack: NRR & GM bridges + 12–18-month forecast.',
      'Quarterly pricing refresh and investor/fundraise support.'
    ],
    cta: 'Explore Retainer',
    image: '/images/P-2.webp',
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
    quote: "Her tech startup index pinpointed where we lagged peers. With the new dashboards, revenue beat plan by Q2."
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
              "name": "Tech Startup Consulting Services",
              "description": "Expert guidance to help your early-stage tech startup thrive in today's competitive landscape through pricing strategy, metrics analysis, and growth optimization.",
              "provider": {
                "@type": "Person",
                "name": "Dr. Sarah Zou",
                "jobTitle": "Fractional Chief Economist",
                "url": "https://sarahzou.com"
              },
              "url": "https://sarahzou.com/consulting",
              "serviceType": [
                "Pricing Strategy Consulting",
                "Tech Startup Metrics Analysis",
                "Revenue Optimization",
                "Early-Stage Growth Strategy"
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
                      "name": "Pricing & Monetization Sprint",
                      "description": "Pricing metric, 3-tier package + fences, list/discount curves, GM/payback scenarios, 90-day experiments. Best for Pre-seed to A companies."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Metrics & Experimentation Sprint",
                      "description": "A live North Star + metric tree with thresholds, 2 dashboards, 2 fully-specced experiments, and a 30-day cadence plan—your startup's first working measurement system. Best for early-stage founders, PMs, and growth teams who need clean metrics, faster test cycles, and investor-ready visibility into payback and NRR."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fractional Chief Economist (Retainer)",
                      "description": "Monthly shipped pricing/test moves, board-ready pack, rolling 12–18-mo forecast with scenarios, and a clear next-30-day action plan. Best for Seed → Series A teams with active experiments, upcoming fundraise, or complex monetization (usage-based, marketplace, hybrid) needing an accountable economics owner."
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
      <section className="py-12 sm:py-16 lg:py-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24 lg:mb-32">
            {/* Left Section - Text Content */}
            <div>
              <h1 className="font-serif-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#223] leading-tight">
              Economics for Early-Stage Teams: Price. Test. Scale.
              </h1>
              <p className="text-base sm:text-lg text-[#4b636e] font-light leading-relaxed">
              From first price to forward model—everything you need to learn fast.
              </p>
            </div>
            
            {/* Right Section - Image */}
            <div className="lg:block">
              <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/S-3.webp"
                  alt="Economic consulting services"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>


          <div className="space-y-16 sm:space-y-24 lg:space-y-32 mb-16 sm:mb-24 lg:mb-32">
            {services.map((service, index) => {
              // Metrics & Experimentation Sprint should have image on the right
              const isMetricsSprint = service.slug === 'metrics-experimentation-sprint';
              return (
              <div
                key={index}
                id={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className={`relative h-[250px] sm:h-[300px] lg:h-auto lg:min-h-[400px] ${isMetricsSprint ? 'order-2' : 'order-1'}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Text Content Section */}
                  <div className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isMetricsSprint ? 'order-1' : 'order-2'}`}>
                    <div>
                      <h3 className="font-serif-playfair text-2xl sm:text-3xl font-bold text-[#223] mb-3 sm:mb-4">
                          {service.title}
                        </h3>
                      <p className="text-sm sm:text-base text-[#4b636e] font-light mb-4 sm:mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {service.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-base text-[#4b636e] font-light">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={`/consulting/services/${service.slug}`}
                      className="inline-block bg-[#06b6d4] text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#0891b2] transition-colors text-center"
                    >
                      {service.cta}
                    </a>
                  </div>
                </div>
              </div>
              );
            })}
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

          {/* Comparison Table */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-[#223] px-4">
              Compare Services
            </h2>
            <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[700px]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f6f7f9] border-b-2 border-[#e5e7eb]">
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Service</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Who it's for</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Time</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Outcomes</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Key deliverables</th>
                    <th className="text-left py-4 px-4 font-semibold text-[#223]">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {/* Pricing & Monetization Sprint */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-4">
                      <a href="/consulting/services/pricing-monetization-sprint" className="font-bold text-base text-[#06b6d4] hover:text-[#0891b2] transition-colors">
                        Pricing & Monetization Sprint
                      </a>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Founders needing first price or pricing reset.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">1–2 weeks</p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Value-based pricing model, unit-economics snapshot, 30-day rollout plan.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Strategy report, unit economics model, discount guardrails.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm font-semibold text-[#223]">$5K–$18K</p>
                    </td>
                  </tr>

                  {/* Metrics & Experimentation Sprint */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-4">
                      <a href="/consulting/services/metrics-experimentation-sprint" className="font-bold text-base text-[#06b6d4] hover:text-[#0891b2] transition-colors">
                        Metrics & Experimentation Sprint
                      </a>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Early-stage teams needing KPI system and experimentation loop.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">1-2 weeks</p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Live metrics dashboard, experimentation playbook, clear decision cadence.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        North Star + metric tree, live dashboards, experiment backlog, test briefs.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm font-semibold text-[#223]">$6K–$12K</p>
                    </td>
                  </tr>

                  {/* Fractional Chief Economist (Retainer) */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-4">
                      <a href="/consulting/services/on-call-economist-retainer" className="font-bold text-base text-[#06b6d4] hover:text-[#0891b2] transition-colors">
                        Fractional Chief Economist (Retainer)
                      </a>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Seed → Series A teams with active experiments or upcoming fundraise.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">Monthly (3-month min)</p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Monthly decisions shipped, forward view, investor-grade narrative.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm text-[#4b636e] font-light">
                        Board Pack, pricing updates, experiment docket, forecast workbook.
                      </p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-sm font-semibold text-[#223]">$4K–$15K/mo</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center px-4 sm:hidden">
              Scroll horizontally to view full table
            </p>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16" id="faq">
            <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#223] px-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">When not to change prices?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light">
                  Avoid price changes during major product launches, customer renewals, or market volatility. We'll identify the optimal timing based on your customer lifecycle, competitive landscape, and internal capacity to handle the transition smoothly.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">Will usage pricing spike bills?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light">
                  Not with proper design. We implement usage caps, tiered pricing, and clear communication to prevent bill shock. Our approach includes customer education, gradual rollouts, and safety nets to maintain satisfaction while optimizing revenue.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">How do we test without harming revenue?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light">
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