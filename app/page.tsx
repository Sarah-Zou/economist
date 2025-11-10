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
    quote: "Her tech startup index pinpointed where we lagged peers. With the new dashboards, revenue beat plan by Q2."
  },
  {
    name: "Priya Shah",
    title: "Partner, Vertex Ventures",
    quote: "Sarah turned dense metrics into a compelling deck. Our portfolio company closed a $12M Series A in just six weeks."
  }
]

export const metadata: Metadata = {
  title: "Pricing & Monetization for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
  description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in growth strategies for early-stage tech startups.",
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
    title: "Pricing & Monetization for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in growth strategies for early-stage tech startups.",
    type: "website",
    url: "https://sarahzou.com",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Monetization for Early-Stage Tech | Fractional Chief Economist Sarah Zou",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in growth strategies for early-stage tech startups.",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EconNova Consulting",
    "url": "https://sarahzou.com",
    "logo": "https://sarahzou.com/images/EconNova_logo.png",
    "description": "Fractional Chief Economist services for early-stage tech startups. Expert pricing strategy, metrics analysis, and economic storytelling to help startups optimize revenue and growth.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Dr. Sarah Zou",
      "jobTitle": "Fractional Chief Economist"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Princeton",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "email": "sarah@sarahzou.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.linkedin.com/in/drsarah-saas-economist",
      "https://twitter.com/SaaS_Econ"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "European Union"
      }
    ],
    "serviceType": [
      "Pricing Strategy Consulting",
      "Tech Startup Metrics Analysis",
      "Revenue Optimization",
      "Fractional Chief Economist Services",
      "Early-Stage Growth Strategy"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Sarah Zou",
    "alternateName": "Sarah Zou",
    "jobTitle": "Fractional Chief Economist",
    "description": "PhD Economist specializing in pricing strategies, metrics analytics, and investor-ready storytelling for early-stage tech startups.",
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
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Rutgers University",
        "degree": "PhD in Economics"
      },
      {
        "@type": "EducationalOrganization",
        "name": "University of Illinois at Urbana-Champaign",
        "degree": "MS in Finance & Statistics"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "EconNova Consulting",
      "url": "https://sarahzou.com"
    },
    "knowsAbout": [
      "Tech Startup Pricing Strategy",
      "Early-Stage Monetization",
      "Value-Based Pricing",
      "Revenue Optimization",
      "Fractional Chief Economist",
      "Unit Economics",
      "Investor Communications",
      "Monetization Research"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Rutgers University"
        },
        "about": "PhD in Economics"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a fractional chief economist?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A fractional chief economist is a part-time economic advisor who brings PhD-level expertise to your pricing, metrics, and growth strategy without the cost of a full-time hire."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly can you impact our pricing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most clients see initial pricing improvements within 2-4 weeks. Our Pricing Quickstart delivers a complete strategy and test plan in just 14 days."
              }
            },
            {
              "@type": "Question",
              "name": "What makes your approach different?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I combine academic rigor with startup speed. Every recommendation is backed by data, tested with experiments, and designed for your specific market dynamics."
              }
            }
          ]
        }) }}
      />
      <div>
        <HeroStackedImages
          photoSrc="/images/headshot_v2.webp"
          bgSrc="/images/background.webp"
          kicker="PHD ECONOMIST"
          title="Fractional Chief Economist for Tech"
          lede="Pricing, metrics, and economic storytelling for founders who need investor-grade decisions fast."
          photoAlt="Dr. Sarah Zou, PhD economist for early-stage tech"
          primaryCta={{
            text: "Book a 30-min Free Consult",
            href: "https://calendly.com/sarahxzou/free-consult-30-min"
          }}
          secondaryCta={{
            text: "Download the Monetization Roadmap",
            href: "/cheat-sheets"
          }}
        />

        {/* What Makes Me Different Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-[#223]">
              What Makes Me Different
            </h2>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Rare blend */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#223] mb-2 sm:mb-3">Rare blend</h3>
                <p className="text-xs sm:text-sm text-[#4b636e] font-light leading-relaxed">
                  Pricing + unit economics + econometrics in one person. Most firms split this across CFO/RevOps/DS; I design the whole economic system end-to-end.
                </p>
              </div>

              {/* Card 2: Research-grade rigor */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#223] mb-2 sm:mb-3">Research-grade rigor</h3>
                <p className="text-xs sm:text-sm text-[#4b636e] font-light leading-relaxed">
                  I treat each engagement like an academic study: hypotheses → models → experiments → decisions. Methods are documented; assumptions are explicit.
                </p>
              </div>

              {/* Card 3: Funder-friendly outputs */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#223] mb-2 sm:mb-3">Funder-friendly outputs</h3>
                <p className="text-xs sm:text-sm text-[#4b636e] font-light leading-relaxed">
                  Board-ready artifacts (GM waterfall, NRR/LTV bridges, payback guardrails, elasticity write-ups) that withstand diligence—not just pretty decks.
                </p>
              </div>

              {/* Card 4: Fast, testable decisions */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#223] mb-2 sm:mb-3">Fast, testable decisions</h3>
                <p className="text-xs sm:text-sm text-[#4b636e] font-light leading-relaxed">
                  Sprints ship answers in 1–2 weeks with a 90-day experiment plan. No "more analysis" stall; every recommendation is testable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white flex flex-col items-center text-center px-4">
          <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#223] relative inline-block">
            How I Can Help
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#4b636e] font-light mb-8 sm:mb-12">
            Fractional Chief Economist for early-stage tech startups. I turn pricing + unit economics + rigorous modeling into investor-grade decisions.
          </p>
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 mb-8 sm:mb-10">
            {/* Card 1: Pricing & Monetization Sprint */}
            <a href="/consulting/services/pricing-monetization-sprint" className="block group">
              <div 
                className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: 'url(/images/S-4.webp)',
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
                      Pricing & Monetization Sprint
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

            {/* Card 2: Metrics & Experimentation Sprint */}
            <a href="/consulting/services/metrics-experimentation-sprint" className="block group">
              <div 
                className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
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
                      Metrics & Experimentation Sprint
                    </h3>
                    <p className="text-white text-xs font-medium mt-1 drop-shadow-md">
                      1–2 weeks
                    </p>
                  </div>
                  
                  {/* Description - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                      In 5 days, install your KPI loop, live dashboards, and ready-to-run experiments—so decisions finally move at product speed.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Card 3: Fractional Chief Economist */}
            <a href="/consulting/services/on-call-economist-retainer" className="block group">
              <div 
                className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: 'url(/images/P-2.webp)',
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
                      Ongoing ownership of pricing, forward models, and the experiment cadence—so you ship decisions, not dashboards.
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
            className="inline-block border-2 border-[#ff5722] text-[#ff5722] font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-lg tracking-widest hover:bg-[#e44e1f] hover:border-[#e44e1f] hover:text-white transition-colors mt-4"
          >
            LET'S WORK TOGETHER
          </a>
        </section>
        <section className="py-12 sm:py-16 lg:py-20 bg-white flex flex-col items-center px-4">
          <div className="max-w-4xl w-full">
            <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#223]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">What is a fractional chief economist?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light mb-2 sm:mb-3">
                  A fractional chief economist is a part-time economic advisor who brings PhD-level expertise to your pricing, metrics, and growth strategy without the cost of a full-time hire.
                </p>
                <a href="/consulting#faq" className="text-sm sm:text-base text-[#ff5722] font-medium hover:text-[#e44e1f] hover:underline transition-colors">
                  Learn more about fractional economics →
                </a>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">How quickly can you impact our pricing?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light mb-2 sm:mb-3">
                  Most clients see initial pricing improvements within 2-4 weeks. Our Pricing Quickstart delivers a complete strategy and test plan in just 14 days.
                </p>
                <a href="/consulting#faq" className="text-sm sm:text-base text-[#ff5722] font-medium hover:text-[#e44e1f] hover:underline transition-colors">
                  See our pricing services →
                </a>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#223]">What makes your approach different?</h3>
                <p className="text-sm sm:text-base text-[#4b636e] font-light mb-2 sm:mb-3">
                  I combine academic rigor with startup speed. Every recommendation is backed by data, tested with experiments, and designed for your specific market dynamics.
                </p>
                <a href="/consulting#faq" className="text-sm sm:text-base text-[#ff5722] font-medium hover:text-[#e44e1f] hover:underline transition-colors">
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