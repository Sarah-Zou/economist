import { Metadata } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import HeroStackedImages from '@/components/HeroStackedImages'
import Cta from '@/components/about/Cta'

export const metadata: Metadata = {
  title: "About — Sarah Zou",
  description: "SaaS Economist & Pricing Strategist for B2B software teams.",
  openGraph: {
    title: "About — Sarah Zou",
    description: "SaaS Economist & Pricing Strategist for B2B software teams.",
    type: "website",
    url: "https://sarahzou.com/about",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Sarah Zou",
    description: "SaaS Economist & Pricing Strategist for B2B software teams.",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  alternates: {
    canonical: "https://sarahzou.com/about",
  },
};

// Content data
const heroData = {
  photoSrc: "/images/about_headshot.webp",
  bgSrc: "/images/background.webp",
  title: "Dr. Sarah Zou",
  kicker: "--- About ---",
  lede: "I help B2B SaaS teams turn pricing into a growth system.",
  photoAlt: "Dr. Sarah Zou, SaaS Economist and Pricing Strategist"
}

const credentials = [
  {
    title: "Focus",
    items: [
      "Pricing & Packaging",
      "Monetization Research",
      "Enablement",
      "Investor narrative"
    ]
  },
  {
    title: "Education",
    items: [
      "PhD Economics (Rutgers)",
      "MS Finance & Statistics (UIUC)"
    ]
  },
  {
    title: "Experience",
    items: [
      "Citigroup (risk models)",
      "Capgemini (pricing/GenAI projects)",
      "Founder, The SaaS Economist"
    ]
  }
]

const narrativeSections = [
  {
    title: "Your dedicated SaaS Economist",
    content: `
      <p>I bring economist's rigor with operator's speed to your pricing challenges. Every value metric becomes a product decision—tested, not debated. My approach blends rigorous econometrics with practical SaaS benchmarks, turning your pricing into a growth system that investors understand.</p>
      <p>Unlike traditional fractional CFO services, I focus exclusively on pricing strategy, monetization research, and investor communications. The result? Clear trade-offs, fast cycles, and documentation you can hand to Sales/RevOps tomorrow.</p>
    `
  },
  {
    title: "My path into pricing & metrics",
    content: `
      <p>My journey from economics PhD to SaaS pricing expert started with building risk models at Citigroup, then leading pricing and GenAI projects at Capgemini. I've spent years advising tech startups and building robust analytics frameworks.</p>
      <p>This experience taught me that most SaaS metrics are vanity metrics. The real value comes from understanding which KPIs actually predict growth, and how to communicate that story to investors. That's why I founded The SaaS Economist—to bridge the gap between raw data and powerful fundraising narratives.</p>
    `
  },
  {
    title: "Highlights",
    content: `
      <ul>
        <li>Redesigned pricing tiers and discount policies for 15+ SaaS companies</li>
        <li>Accelerated CAC payback by 40% through value-based pricing models</li>
        <li>Lifted NRR by 25% average through retention optimization strategies</li>
        <li>Built investor-grade models that secured $50M+ in funding rounds</li>
        <li>Created pricing calculators and talk-tracks for 200+ sales reps</li>
      </ul>
    `
  }
]


const processSteps = [
  {
    number: 1,
    title: "Kickoff & Goals",
    description: "60-minute session to understand your pricing challenges, growth goals, and investor requirements."
  },
  {
    number: 2,
    title: "Decisions on Value Metric",
    description: "Define optimal value metrics, packaging structure, and pricing guardrails based on customer research."
  },
  {
    number: 3,
    title: "Enablement Tools",
    description: "Build pricing calculator, sales talk-tracks, objection bank, and optimized pricing page copy."
  },
  {
    number: 4,
    title: "Experiments & Council",
    description: "Launch pricing experiments and establish ongoing Pricing Council for continuous optimization."
  }
]

const ctaData = {
  title: "Ready to turn pricing into your growth system?",
  description: "Let's discuss how I can help you optimize your pricing strategy and create compelling investor narratives.",
  buttonText: "Book a free consult",
  buttonHref: "https://calendly.com/d/cspp-v8x-qpj/free-pricing-consult-25-min"
}

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sarah Zou",
  "jobTitle": "SaaS Economist & Pricing Strategist",
  "description": "I help B2B SaaS teams turn pricing into a growth system—so NRR compounds, CAC payback shortens, and the investor story is clear.",
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
    "name": "The SaaS Economist"
  },
  "knowsAbout": [
    "SaaS Pricing Strategy",
    "Monetization Research",
    "Investor Communications",
    "Value-Based Pricing",
    "Unit Economics"
  ]
}

export default function About() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <HeroStackedImages {...heroData} />
      
      {/* Two-column layout like Psyche reference */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Credentials */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {credentials.map((cred, index) => (
                  <div key={cred.title} className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      {cred.title}
                    </h3>
                    <ul className="space-y-2">
                      {cred.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Narrative */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {narrativeSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {section.title}
                    </h2>
                    <div 
                      className="prose prose-lg prose-gray max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Two-Column Layout */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Process Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                My process
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Let's explore my process—a well-structured approach aimed at guiding you toward optimized pricing strategy and growth. It involves four key steps:
              </p>
              
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.number} className="space-y-3">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="ml-4 w-px h-6 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
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
      <Cta {...ctaData} />
    </>
  )
} 