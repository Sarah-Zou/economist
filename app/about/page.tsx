import Image from 'next/image'
import Link from 'next/link'
import ContactCTA from '@/components/ContactCTA'
import { Metadata } from 'next'

const quickFacts = [
  "10+ years in SaaS and technology",
  "PhD in Economics",
  "Former startup founder",
  "Published author",
  "Regular conference speaker"
]

export const metadata: Metadata = {
  title: "About — Sarah Zou, PhD | The SaaS Economist",
  description: "PhD economist specializing in B2B SaaS pricing & monetization. I turn pricing into a growth system — decisions in days, not quarters.",
  openGraph: {
    title: "About — Sarah Zou, PhD | The SaaS Economist",
    description: "PhD economist specializing in B2B SaaS pricing & monetization. I turn pricing into a growth system — decisions in days, not quarters.",
    type: "website",
    url: "https://sarahzou.com/about",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Sarah Zou, PhD | The SaaS Economist",
    description: "PhD economist specializing in B2B SaaS pricing & monetization. I turn pricing into a growth system — decisions in days, not quarters.",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  alternates: {
    canonical: "https://sarahzou.com/about",
  },
};

export default function About() {
  return (
    <>
      <section className="min-h-[70vh] flex items-center justify-center py-16 md:py-32">
        <div className="container max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] flex flex-col lg:flex-row items-stretch p-0 overflow-hidden min-h-[420px] border border-[#f0f0f0]">
            {/* Left: Image */}
            <div className="flex-1 flex items-stretch justify-center bg-[#f5f8f7] p-0 md:p-0">
              <div className="relative w-[370px] h-auto min-h-[420px] rounded-l-[160px] overflow-hidden border-2 border-[#eee] shadow-sm flex-1 flex items-stretch">
                <picture>
                  <source srcSet="/images/about_headshot.webp" type="image/webp" />
                  <Image
                    src="/images/about_headshot.jpg"
                    alt="Professional headshot of Sarah Zou"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 400px"
                    priority
                  />
                </picture>
              </div>
            </div>
            {/* Right: Text */}
            <div className="flex-1 flex flex-col justify-center items-start px-10 py-12 md:px-16 md:py-0 text-[#223] bg-white">
              <div className="flex flex-col w-full">
                <h1 className="font-serif-playfair text-5xl font-bold mb-4 text-[#223] mt-8">Hi, I'm Sarah — <strong>The SaaS Economist</strong></h1>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl font-medium">
                  I help B2B SaaS teams turn pricing into a compounding growth system. My background: <strong>PhD in Economics</strong>, years building pricing/metrics programs and investor-grade narratives for founders. I bridge <strong>value metrics → pricing & packaging → RevOps enablement</strong> so NRR improves without burning runway.
                </p>
                <blockquote className="mb-6 text-lg text-[#4b636e] max-w-2xl border-l-4 border-[#ff5722] pl-4 italic">
                  Operator-first. Research that turns into decisions, enablement, and measurable experiments.
                </blockquote>
                
                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">What I do (fast)</h2>
                <ul className="mb-6 list-disc pl-5 text-[#4b636e] text-lg">
                  <li><strong>Monetization MRI (10 days):</strong> gaps, quick wins, board one-pager.</li>
                  <li><strong>Pricing & Packaging Sprint (4–6 weeks):</strong> value metric, tiers, price corridors, rollout.</li>
                  <li><strong>Investor Monetization Pitch Kit (2–3 weeks):</strong> the story and numbers investors buy.</li>
                  <li><strong>Pricing-Ops Retainer:</strong> experiments cadence, discount governance, quarterly reviews.</li>
                </ul>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  Learn more about my <Link href="/consulting/services/pricing-diagnostic-revenue-boost" className="text-[#ff5722] hover:text-[#e64a19] focus:text-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] focus:ring-offset-2 font-semibold underline">pricing diagnostic services</Link> and explore my <Link href="/wiki/pricing" className="text-[#ff5722] hover:text-[#e64a19] focus:text-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] focus:ring-offset-2 font-semibold underline">pricing knowledge base</Link>.
                </p>

                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">Why founders pick me</h2>
                <ul className="mb-6 list-disc pl-5 text-[#4b636e] text-lg">
                  <li><strong>Economist lens:</strong> rigorous causal thinking, not vanity metrics.</li>
                  <li><strong>Pricing depth + GTM pragmatism:</strong> decisions ship with <strong>talk-tracks, discount rules, calculators</strong>.</li>
                  <li><strong>Investor-ready:</strong> your monetization story aligns with cohorts, NRR, CAC payback, and Rule-of-40/FCF.</li>
                </ul>

                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">Approach</h2>
                <ol className="mb-6 list-decimal pl-5 text-[#4b636e] text-lg">
                  <li><strong>Diagnose</strong> — data & interviews to size lift and risk.</li>
                  <li><strong>Decide</strong> — value metric & packaging guardrails; price corridors.</li>
                  <li><strong>Enable</strong> — AE talk-tracks, renewal/discount policy, pricing page copy.</li>
                  <li><strong>Govern</strong> — experiment plan, Pricing Council, quarterly tune-ups.</li>
                </ol>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  <strong>Tooling I work with:</strong> Stripe/Chargebee/ChartMogul, HubSpot/Salesforce, product analytics, survey/conjoint templates.
                </p>

                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">Who I'm best for</h2>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  Seed–Series B SaaS, <strong>$500K–$20M ARR</strong>, PLG or sales-assist, aiming for faster sales cycles, cleaner renewals, and clearer investor narratives.
                </p>

                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">My stance on "pricing consultants"</h2>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl">
                  Great peers exist across the spectrum:
                </p>
                <ul className="mb-4 list-disc pl-5 text-[#4b636e] text-lg">
                  <li><strong>Pricing specialists</strong> who structure programs and research deeply.</li>
                  <li><strong>RevOps advisors</strong> who operationalize GTM systems.</li>
                  <li><strong>Fractional CMOs</strong> who scale demand and content.</li>
                </ul>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  I sit at the intersection: <strong>pricing economics × GTM enablement × investor storytelling</strong>. You get one owner from hypothesis → price change → measurement.
                </p>

                <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223] mt-8">Let's talk</h2>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  Based in <strong>Princeton, NJ · NYC · Philadelphia</strong> — working <strong>remote (US/EU)</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <a 
                    href="https://calendly.com/d/cspp-v8x-qpj/free-pricing-consult-25-min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#ff5722] hover:bg-[#e64a19] focus:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] focus:ring-offset-2 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors text-center"
                  >
                    Book Free Consult
                  </a>
                  <a 
                    href="/contact" 
                    className="inline-block bg-white hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff5722] focus:ring-offset-2 text-[#ff5722] font-bold px-8 py-4 rounded-full text-lg transition-colors border-2 border-[#ff5722] text-center"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mt-12">
            <ContactCTA variant="section" />
          </div>
        </div>
      </section>
    </>
  )
} 