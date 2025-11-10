import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HeroStackedImages from '@/components/HeroStackedImages'
import Cta from '@/components/about/Cta'

export const metadata: Metadata = {
  title: "About — Sarah Zou",
  description: "Economist & Pricing Strategist for early-stage tech startups.",
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
    canonical: "https://sarahzou.com/about",
  },
  openGraph: {
    title: "About — Sarah Zou",
    description: "Economist & Pricing Strategist for early-stage tech startups.",
    type: "website",
    url: "https://sarahzou.com/about",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Sarah Zou",
    description: "Economist & Pricing Strategist for early-stage tech startups.",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
};

// Content data
const heroData = {
  photoSrc: "/images/about_headshot.webp",
  bgSrc: "/images/background.webp",
  title: "Sarah Zou, PhD",
  kicker: "--- Fractional Chief Economist for Tech ---",
  lede: "I turn pricing into a growth system—linking value metrics to experiments (not debates) so your team ships decisions next week and your board sees a defensible economic narrative next month.",
  photoAlt: "Dr. Sarah Zou, Fractional Chief Economist and Pricing Strategist"
}

const whoIWorkWith = {
  title: "Who I work with & when to bring me in",
  content: "I partner with",
  contentBold: "pre-seed to Series A teams",
  contentAfter: "that want rigor without big-company bloat.",
  techTypes: [
    {
      name: "SaaS",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="12" height="12" rx="2" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M9 12 L12 9 L15 12 M9 12 L12 15 L15 12" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "API platforms",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="6" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M12 6 L12 18 M6 12 L18 12" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#06b6d4"/>
        </svg>
      )
    },
    {
      name: "AI products",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4 L8 8 L12 12 L16 8 Z" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M4 12 L8 16 L12 12 L8 8 Z" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M20 12 L16 16 L12 12 L16 8 Z" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <path d="M12 20 L8 16 L12 12 L16 16 Z" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="3" stroke="#06b6d4" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "OSS-commercial",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "Operator-led marketplaces",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="6" width="6" height="6" rx="1" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <rect x="14" y="6" width="6" height="6" rx="1" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <rect x="4" y="14" width="6" height="6" rx="1" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <rect x="14" y="14" width="6" height="6" rx="1" stroke="#06b6d4" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Hardware-as-a-service",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="5" width="12" height="14" rx="2" stroke="#06b6d4" strokeWidth="2" fill="none"/>
          <rect x="9" y="8" width="6" height="4" rx="1" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
          <circle cx="10" cy="15" r="1" fill="#06b6d4"/>
          <circle cx="14" cy="15" r="1" fill="#06b6d4"/>
        </svg>
      )
    }
  ],
  triggers: [
    {
      text: "Unsure how to price v1, or current pricing isn't working.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#ec4899" opacity="0.2"/>
          <text x="12" y="17" fontSize="24" fontWeight="bold" fill="#ec4899" textAnchor="middle" fontFamily="Arial, sans-serif">?</text>
        </svg>
      )
    },
    {
      text: "Pre/Post-MVP and need monetization before GTM locks in bad habits.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#a78bfa" opacity="0.2" rx="4"/>
          <path d="M3 18 L7 14 L11 16 L15 10 L19 12 L21 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    },
    {
      text: "Unit economics unclear; need CAC payback/NRR/GM targets and a path to hit them.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="12" height="16" rx="2" fill="#92400e" opacity="0.2"/>
          <rect x="8" y="7" width="8" height="1" fill="#92400e"/>
          <rect x="8" y="10" width="6" height="1" fill="#92400e"/>
          <rect x="8" y="13" width="8" height="1" fill="#92400e"/>
          <rect x="8" y="16" width="5" height="1" fill="#92400e"/>
        </svg>
      )
    },
    {
      text: "Plenty of data, but the \"right\" KPIs and decision cadence aren't.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#3b82f6" opacity="0.2" rx="4"/>
          <path d="M12 4 L12 20 M4 12 L20 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M12 8 L16 12 L12 16 M8 12 L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      )
    },
    {
      text: "Board asks for a 3–5 year model and scenario pack yesterday.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2 L22 20 L2 20 Z" fill="#eab308" opacity="0.2"/>
          <path d="M12 2 L22 20 L2 20 Z" stroke="#eab308" strokeWidth="2" fill="none"/>
          <text x="12" y="16" fontSize="14" fontWeight="bold" fill="#000" textAnchor="middle" fontFamily="Arial, sans-serif">!</text>
        </svg>
      )
    },
    {
      text: "You don't want to hire CFO + RevOps + Data Science to get one economic answer.",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="white" rx="2"/>
          <circle cx="8" cy="8" r="1.5" fill="#a855f7"/>
          <circle cx="12" cy="6" r="1.5" fill="#a855f7"/>
          <circle cx="16" cy="8" r="1.5" fill="#a855f7"/>
          <circle cx="10" cy="12" r="1.5" fill="#a855f7"/>
          <circle cx="14" cy="12" r="1.5" fill="#a855f7"/>
          <circle cx="12" cy="16" r="1.5" fill="#a855f7"/>
        </svg>
      )
    }
  ]
}

const whatIFocusOn = [
  {
    title: "Monetization & Pricing",
    description: "Develop pricing strategies that align with your product's value and market position.",
    link: "/consulting/services/pricing-monetization-sprint",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#3b82f6" opacity="0.1"/>
        <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" fill="#3b82f6" opacity="0.5"/>
      </svg>
    )
  },
  {
    title: "Metrics & Experimentation",
    description: "Establish key metrics & dashboards and a framework for rigorous, data-informed decision-making.",
    link: "/consulting/services/metrics-experimentation-sprint",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#10b981" opacity="0.1"/>
        <rect x="4" y="16" width="4" height="4" rx="1" fill="#10b981" opacity="0.3"/>
        <rect x="10" y="12" width="4" height="8" rx="1" fill="#10b981" opacity="0.3"/>
        <rect x="16" y="8" width="4" height="12" rx="1" fill="#10b981" opacity="0.3"/>
        <path d="M6 18 L10 14 L14 10 L18 6" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="1.5" fill="#10b981"/>
        <circle cx="12" cy="12" r="1.5" fill="#10b981"/>
        <circle cx="18" cy="6" r="1.5" fill="#10b981"/>
      </svg>
    )
  },
  {
    title: "Forward Models for Founders & Boards",
    description: "Build clear, defensible forecasts and scenarios that map choices → outcomes.",
    link: "/consulting/services/on-call-economist-retainer",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#8b5cf6" opacity="0.1"/>
        <path d="M4 20 L8 16 L12 18 L16 12 L20 14" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M4 20 L8 16 L12 18 L16 12 L20 14" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3"/>
        <circle cx="4" cy="20" r="2" fill="#8b5cf6" opacity="0.3"/>
        <circle cx="12" cy="18" r="2" fill="#8b5cf6" opacity="0.3"/>
        <circle cx="20" cy="14" r="2" fill="#8b5cf6" opacity="0.3"/>
        <path d="M4 4 L20 4 M4 8 L20 8 M4 12 L20 12" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    )
  }
]

const selectedOutcomes = [
  {
    title: "Dev-tools SaaS (Seed)",
    description: "Re-designed tiers and value metric; <strong>40% faster CAC payback</strong> and <strong>cleaner upgrade paths</strong> within a quarter."
  },
  {
    title: "Vertical SaaS (Series A)",
    description: "Pricing fences + customer value study; <strong>25% NRR lift</strong> via <strong>expansion motions</strong> and <strong>usage-indexed add-ons</strong>."
  },
  {
    title: "AI platform (Pre-seed)",
    description: "Investor narrative + forward model + KPIs; supported <strong>$50M+ in cumulative raises</strong> across clients; enabled <strong>200+ GTM reps</strong> with price guides and calculators."
  }
]

const outcomeNote = "(Sampled across clients; details available under NDA.)"

const howWeWork = {
  intro: "I bring an economist's rigor with an operator's speed. Every recommendation is:",
  principles: [
  {
    number: 1,
      title: "Hypothesis-driven",
      description: "(what we believe will move revenue or retention)"
  },
  {
    number: 2,
      title: "Documented",
      description: "(assumptions, inputs, and experiment plan)"
  },
  {
    number: 3,
      title: "Testable",
      description: "(what to launch, when to read it, and what \"good\" looks like)"
    }
  ],
  outcome: "That way your team gets decisions, not dashboards — and your board gets a clear economic narrative behind the numbers."
}

const myPathHere = {
  title: "My path here",
  content: [
    "Academia and policy research taught me discipline and clarity (<strong>PhD Economics, Rutgers</strong>; <strong>MS Finance & Statistics, UIUC</strong>; work with <strong>NBER</strong> and the <strong>World Bank</strong>). I brought that rigor into industry—first at <strong>Citigroup</strong> building risk/forecasting models, then at <strong>Capgemini</strong> leading <strong>digital-transformation</strong> and <strong>GenAI</strong> initiatives where complex analysis had to become executive decisions.",
    "From there I moved closer to the founder edge, owning <strong>pricing, market intel, and operations</strong> inside high-growth startups. I kept seeing the same gap: early-stage teams need <strong>research-grade thinking</strong> in a format they can ship this week. I started <strong>EconNova Consulting</strong> so founders could get <strong>pricing, metrics, unit economics, forecasting, and economic storytelling</strong> at a level usually reserved for later-stage companies—without the overhead."
  ]
}

const whereIWork = {
  title: "Where I work",
  content: [
    "Remote, serving founders globally.",
    "Based in <strong>Princeton, NJ</strong> (Eastern Time). Available on-site in the <strong>NYC and Philadelphia</strong> metros."
  ]
}

const ctaData = {
  title: "Ready to turn pricing into your growth system?",
  description: "Let's discuss how I can help you optimize your pricing strategy and create compelling investor narratives.",
  buttonText: "Book a free consult",
  buttonHref: "https://calendly.com/sarahxzou/free-consult-30-min"
}

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sarah Zou",
  "jobTitle": "Fractional Chief Economist",
  "description": "I turn pricing into a growth system—linking value metrics to experiments (not debates) so your team ships decisions next week and your board sees a defensible economic narrative next month.",
  "url": "https://sarahzou.com/about",
  "image": "https://sarahzou.com/images/about_headshot.webp",
  "sameAs": [
    "https://www.linkedin.com/in/drsarahzou",
    "https://twitter.com/sarahzou"
  ],
  "areaServed": [
    "United States",
    "European Union"
  ],
  "alumniOf": [
    "Rutgers University",
    "University of Illinois at Urbana-Champaign"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "EconNova Consulting"
  },
  "knowsAbout": [
    "Tech Startup Pricing Strategy",
    "Monetization Research",
    "Investor Communications",
    "Value-Based Pricing",
    "Unit Economics"
  ]
}

export default function About() {
  return (
    <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <HeroStackedImages {...heroData} />
      
      {/* Who I work with & Common triggers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] mb-6">
                {whoIWorkWith.title}
              </h2>
              <div className="mb-8">
                <p className="text-lg text-[#4b636e] font-light leading-relaxed mb-8">
                  {whoIWorkWith.content} <strong className="font-semibold text-[#223]">{whoIWorkWith.contentBold}</strong> {whoIWorkWith.contentAfter}
                </p>
                
                {/* Tech Types as inline badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 my-8">
                  {whoIWorkWith.techTypes.map((tech, index) => (
                    <div key={index} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-[#e5e7eb]">
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        <div className="w-4 h-4">
                          {tech.icon}
                        </div>
                      </div>
                      <span className="text-sm text-[#4b636e] font-light whitespace-nowrap">
                        {tech.name}
                      </span>
                  </div>
                ))}
              </div>
            </div>

              <div>
                <h3 className="text-lg font-semibold text-[#223] mb-6">Common triggers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {whoIWorkWith.triggers.map((trigger, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-[#e5e7eb] shadow-sm text-center flex flex-col items-center space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center">
                        {trigger.icon}
                      </div>
                      <p className="text-base text-[#4b636e] font-light leading-relaxed">
                        {trigger.text}
                      </p>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I focus on */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] mb-12 text-center">
            What I focus on
                    </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatIFocusOn.map((focus, index) => (
              <Link 
                key={index} 
                href={focus.link}
                className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm space-y-4 hover:shadow-md hover:border-[#06b6d4] transition-all duration-200 block"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  {focus.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#223]">
                  {focus.title}
                </h3>
                <p className="text-base text-[#4b636e] font-light leading-relaxed">
                  {focus.description}
                </p>
              </Link>
            ))}
          </div>
            </div>
      </section>

      {/* Selected outcomes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] mb-12 text-center">
            Selected outcomes
          </h2>
          <div className="space-y-8">
            {selectedOutcomes.map((outcome, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-[#e5e7eb] space-y-2">
                <h3 className="text-lg font-semibold text-[#223]">
                  {outcome.title}
                </h3>
                <p 
                  className="text-base text-[#4b636e] font-light leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: outcome.description }}
                />
              </div>
            ))}
            <p className="text-sm text-[#4b636e] font-light italic mt-6 text-center">
              {outcomeNote}
            </p>
          </div>
        </div>
      </section>

      {/* How we'll work */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Process Content */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] leading-tight">
                How we'll work
              </h2>
              <p className="text-lg text-[#4b636e] font-light leading-relaxed">
                {howWeWork.intro}
              </p>
              
              <div className="space-y-6">
                {howWeWork.principles.map((principle, index) => (
                  <div key={principle.number} className="space-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#06b6d4] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {principle.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[#223] mb-1">
                          {principle.title}
                        </h4>
                        <p className="text-base text-[#4b636e] font-light leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                    {index < howWeWork.principles.length - 1 && (
                      <div className="ml-4 w-px h-6 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-lg text-[#4b636e] font-light leading-relaxed pt-4 border-t border-gray-200">
                {howWeWork.outcome}
              </p>
            </div>

            {/* Right Column - Process Image */}
            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/processSteps.webp"
                  alt="Strategic pricing process and business meeting"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My path here */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] mb-8">
            {myPathHere.title}
          </h2>
          <div className="space-y-6">
            {myPathHere.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-base text-[#4b636e] font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Where I work */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif-playfair font-bold text-[#223] mb-6">
            {whereIWork.title}
          </h2>
          <div className="space-y-3">
            {whereIWork.content.map((item, index) => (
              <p 
                key={index} 
                className="text-base text-[#4b636e] font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </div>
        </div>
      </section>
      <Cta {...ctaData} />
    </>
  )
} 