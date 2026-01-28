import TestimonialCard from '@/components/TestimonialCard'
import HeroStackedImages from '@/components/HeroStackedImages'
import Image from 'next/image'
import Link from 'next/link'
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
  title: "Sarah Zou, PhD — Pricing & Monetization Economist (Fractional Chief Economist)",
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
    title: "Sarah Zou, PhD — Pricing & Monetization Economist (Fractional Chief Economist)",
    description: "Value-based pricing, packaging, and revenue experiments that lift ARR and retention. PhD economist specializing in growth strategies for early-stage tech startups.",
    type: "website",
    url: "https://sarahzou.com",
    images: ["https://sarahzou.com/images/headshot_v2.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah Zou, PhD — Pricing & Monetization Economist (Fractional Chief Economist)",
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
      "email": "hello@sarahzou.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.linkedin.com/in/drsarahzou"
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
    "name": "Sarah Zou",
    "honorificSuffix": "PhD",
    "alternateName": "Dr. Sarah Zou",
    "jobTitle": "Fractional Chief Economist",
    "description": "PhD Economist specializing in pricing strategies, metrics analytics, and investor-ready storytelling for early-stage tech startups.",
    "url": "https://sarahzou.com",
    "image": "https://sarahzou.com/images/headshot_v2.webp",
    "sameAs": [
      "https://www.linkedin.com/in/drsarahzou/"
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
      "Pricing",
      "Monetization",
      "Unit Economics",
      "Experimentation",
      "Econometrics",
      "Tech Startup Pricing Strategy",
      "Early-Stage Monetization",
      "Value-Based Pricing",
      "Revenue Optimization",
      "Fractional Chief Economist",
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
      <div>
        <HeroStackedImages
          photoSrc="/images/headshot_v2.webp"
          bgSrc="/images/background.webp"
          kicker="PHD ECONOMIST"
          title="Pricing Economist & Fractional Chief Economist for Tech"
          lede="Pricing, metrics, and economic storytelling for founders who need investor-grade decisions fast."
          photoAlt="Dr. Sarah Zou, PhD economist for early-stage tech"
          primaryCta={{
            text: "Book a 15-min Free Consult",
            href: "/book"
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
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-8 sm:mb-12 text-center text-[#1f2933]">
              What Makes Me Different
            </h2>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Rare blend */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1f2933] mb-2 sm:mb-3">Rare blend</h3>
                <p className="text-sm sm:text-base text-[#1f2933] leading-[1.65]">
                  Pricing + unit economics + econometrics in one person. Most firms split this across CFO/RevOps/DS; I design the whole economic system end-to-end.
                </p>
              </div>

              {/* Card 2: Research-grade rigor */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1f2933] mb-2 sm:mb-3">Research-grade rigor</h3>
                <p className="text-sm sm:text-base text-[#1f2933] leading-[1.65]">
                  I treat each engagement like an academic study: hypotheses → models → experiments → decisions. Methods are documented; assumptions are explicit.
                </p>
              </div>

              {/* Card 3: Funder-friendly outputs */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1f2933] mb-2 sm:mb-3">Funder-friendly outputs</h3>
                <p className="text-sm sm:text-base text-[#1f2933] leading-[1.65]">
                  Board-ready artifacts (GM waterfall, NRR/LTV bridges, payback guardrails, elasticity write-ups) that withstand diligence—not just pretty decks.
                </p>
              </div>

              {/* Card 4: Fast, testable decisions */}
              <div className="bg-[#f6f7f9] rounded-lg p-5 sm:p-6 border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="mb-3 sm:mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#1f2933] mb-2 sm:mb-3">Fast, testable decisions</h3>
                <p className="text-sm sm:text-base text-[#1f2933] leading-[1.65]">
                  Sprints ship answers in 1–2 weeks with a 90-day experiment plan. No "more analysis" stall; every recommendation is testable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white flex flex-col items-center text-center px-4">
          <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-2 text-[#1f2933] relative inline-block">
            How I Can Help
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8 sm:mb-12">
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
          <Link
            href="/book"
            className="inline-block border-2 border-[#ff5722] text-[#ff5722] font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-sm sm:text-lg tracking-widest hover:bg-[#e44e1f] hover:border-[#e44e1f] hover:text-white transition-colors mt-4"
          >
            LET'S WORK TOGETHER
          </Link>
        </section>
        <section className="py-12 sm:py-16 lg:py-20 bg-white flex flex-col items-center px-4">
          <div className="max-w-4xl w-full">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-6 sm:mb-8 text-center text-[#1f2933]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What is a fractional chief economist?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  A fractional chief economist is a part-time executive who designs your pricing system, unit economics, and decision cadence—bringing PhD-level rigor without a full-time hire. Learn more about <a href="/about" className="text-[#ff5722] hover:underline">fractional economics services</a>.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">How is a Fractional Chief Economist different from a Fractional CFO?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  A fractional CFO manages cash, reporting, controls, and fundraising mechanics. A fractional chief economist designs the engines that create cash—pricing, packaging, and the economic system that drives NRR, payback, and gross margin.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">How is a Fractional Chief Economist different from RevOps?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  RevOps optimizes the GTM machine (CRM hygiene, pipeline stages, handoffs, comp plans). A fractional chief economist defines what you sell and why it's worth the price (value metric, fences, monetization playbook) and then sets the economic guardrails RevOps executes against.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Who do you work with?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Pre-seed to Series A teams across SaaS, APIs, AI, OSS-commercial, operator-led marketplaces, and hardware-as-a-service that want rigor without enterprise bloat. See <a href="/about" className="text-[#ff5722] hover:underline">who I work with</a>.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">How fast do we see impact?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Decisions ship in 1–2 weeks via focused <a href="/consulting/services/pricing-monetization-sprint" className="text-[#ff5722] hover:underline">Monetization Sprints</a> or <a href="/consulting/services/metrics-experimentation-sprint" className="text-[#ff5722] hover:underline">Metrics Sprints</a>, with measurable effects typically within 2–4 weeks and a 90-day experiment plan to learn fast.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What makes your approach different?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Combine pricing + unit economics + econometrics in one person; every recommendation is hypothesis-driven, documented, and testable, producing board-ready artifacts like pricing strategy reports and unit-economics models.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What do engagements look like?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Start with a 15-min consult → choose a <a href="/consulting/services/pricing-monetization-sprint" className="text-[#ff5722] hover:underline">Monetization Sprint</a> or <a href="/consulting/services/metrics-experimentation-sprint" className="text-[#ff5722] hover:underline">Metrics Sprint</a> → optional <a href="/consulting/services/on-call-economist-retainer" className="text-[#ff5722] hover:underline">retainer</a> for ongoing pricing, forward models, and the experiment cadence.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What does it cost?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Sprints are fixed-fee ($5k–$18k for <a href="/consulting/services/pricing-monetization-sprint" className="text-[#ff5722] hover:underline">Monetization</a>; $6k–$12k for <a href="/consulting/services/metrics-experimentation-sprint" className="text-[#ff5722] hover:underline">Metrics</a>) with defined deliverables and timelines. <a href="/consulting/services/on-call-economist-retainer" className="text-[#ff5722] hover:underline">Retainers</a> start at $4k/mo with tiered time commitments.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Do you work with our existing analytics stack?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Yes—common tools include GTM, GA, Amplitude, and Mixpanel. I integrate with your stack and keep instrumentation "light but correct" so dashboards stay trustworthy.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Where do you work from?</h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  Remote first; based in Princeton/NJ with on-site availability in the NYC and Philadelphia metros; US/EU coverage. See <a href="/about" className="text-[#ff5722] hover:underline">where I work</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "url": "https://sarahzou.com",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a fractional chief economist?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A fractional chief economist is a part-time executive who designs your pricing system, unit economics, and decision cadence—bringing PhD-level rigor without a full-time hire."
              }
            },
            {
              "@type": "Question",
              "name": "How is a Fractional Chief Economist different from a Fractional CFO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A fractional CFO manages cash, reporting, controls, and fundraising mechanics. A fractional chief economist designs the engines that create cash—pricing, packaging, and the economic system that drives NRR, payback, and gross margin."
              }
            },
            {
              "@type": "Question",
              "name": "How is a Fractional Chief Economist different from RevOps?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "RevOps optimizes the GTM machine (CRM hygiene, pipeline stages, handoffs, comp plans). A fractional chief economist defines what you sell and why it's worth the price (value metric, fences, monetization playbook) and then sets the economic guardrails RevOps executes against."
              }
            },
            {
              "@type": "Question",
              "name": "Who do you work with?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pre-seed to Series A teams across SaaS, APIs, AI, OSS-commercial, operator-led marketplaces, and hardware-as-a-service that want rigor without enterprise bloat."
              }
            },
            {
              "@type": "Question",
              "name": "How fast do we see impact?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Decisions ship in 1–2 weeks via focused sprints, with measurable effects typically within 2–4 weeks and a 90-day experiment plan to learn fast."
              }
            },
            {
              "@type": "Question",
              "name": "What makes your approach different?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Combine pricing + unit economics + econometrics in one person; every recommendation is hypothesis-driven, documented, and testable, producing board-ready artifacts like pricing strategy reports and unit-economics models."
              }
            },
            {
              "@type": "Question",
              "name": "What do engagements look like?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Start with a 15-min consult → choose a Sprint (Monetization or Metrics) → optional retainer for ongoing pricing, forward models, and the experiment cadence."
              }
            },
            {
              "@type": "Question",
              "name": "What does it cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sprints are fixed-fee ($5k–$18k Monetization; $6k–$12k Metrics) with defined deliverables and timelines. Retainers start at $4k/mo with tiered time commitments."
              }
            },
            {
              "@type": "Question",
              "name": "Do you work with our existing analytics stack?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes—common tools include GTM, GA, Amplitude, and Mixpanel. I integrate with your stack and keep instrumentation \"light but correct\" so dashboards stay trustworthy."
              }
            },
            {
              "@type": "Question",
              "name": "Where do you work from?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Remote first; based in Princeton/NJ with on-site availability in the NYC and Philadelphia metros; US/EU coverage."
              }
            }
          ]
        }) }}
      />
    </>
  )
} 