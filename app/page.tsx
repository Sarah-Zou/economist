import Seo from '@/components/Seo'
import Hero from '@/components/Hero'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'

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

export default function Home() {
  return (
    <>
      <Seo
        title="Fractional Economist for AI-SaaS | Sarah Zou"
        description="Pricing & metrics strategy for SaaS founders—data-driven insights from PhD economist Sarah Zou."
        path="/"
      />
      <div>
        <section className="py-8 md:py-12">
          <div className="container max-w-7xl mx-auto">
            <div className="bg-white rounded-[2.5rem] flex flex-col lg:flex-row items-stretch p-0 overflow-hidden min-h-[420px] border border-[#f0f0f0]">
              {/* Left: Text */}
              <div className="flex-1 flex flex-col justify-center items-start px-10 py-12 md:px-16 md:py-0 text-[#222] bg-white">
                <h1 className="font-serif-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Fractional Economist for SaaS Founders
                </h1>
                <p className="text-lg md:text-xl mb-8 text-[#222] max-w-xl">
                  I'm Sarah Zou, PhD Economist, specialized in pricing strategies, metrics analytics, and investor-ready storytelling for SaaS startups.
                </p>
                <a href="/contact" className="inline-block border-2 border-[#ff5722] text-[#ff5722] font-bold px-6 py-3 rounded-full text-lg tracking-widest hover:bg-[#ff5722] hover:text-white transition-colors mt-4">
                  Get in touch <span className="ml-2" aria-hidden>→</span>
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
            I embed as your Fractional Chief Economist—translating data, external signals, and internal KPIs into decisions that raise valuation, pricing power, and capital efficiency.
          </p>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-4 mb-10">
            {/* Pricing Strategy */}
            <div className="bg-[#fafbfc] rounded-3xl shadow-md border border-[#f0f0f0] flex flex-col items-center p-8 transition hover:shadow-lg">
              <Image src="/images/pricing.webp" alt="Pricing Strategy" width={180} height={120} className="rounded-xl mb-6 object-cover w-[180px] h-[120px]" />
              <h3 className="font-serif-playfair text-2xl font-bold mb-2 text-[#222]">Pricing Strategy</h3>
              <p className="text-[#4b636e] text-base mb-6">Discover value-based pricing & packaging that lifts ARR and slashes churn.</p>
              <a href="/consulting?filter=Pricing" className="text-[#ff5722] font-semibold text-base hover:underline transition">Learn more →</a>
            </div>
            {/* SaaS Metrics & Dashboards */}
            <div className="bg-[#fafbfc] rounded-3xl shadow-md border border-[#f0f0f0] flex flex-col items-center p-8 transition hover:shadow-lg">
              <Image src="/images/metrics.webp" alt="SaaS Metrics & Dashboards" width={180} height={120} className="rounded-xl mb-6 object-cover w-[180px] h-[120px]" />
              <h3 className="font-serif-playfair text-2xl font-bold mb-2 text-[#222]">SaaS Metrics & Dashboards</h3>
              <p className="text-[#4b636e] text-base mb-6">Benchmark against my proprietary AI-SaaS Index and get automated, investor-ready reporting.</p>
              <a href="/consulting?filter=Metrics" className="text-[#ff5722] font-semibold text-base hover:underline transition">Learn more →</a>
            </div>
            {/* Investor Communications */}
            <div className="bg-[#fafbfc] rounded-3xl shadow-md border border-[#f0f0f0] flex flex-col items-center p-8 transition hover:shadow-lg">
              <Image src="/images/investor.webp" alt="Investor Communications" width={180} height={120} className="rounded-xl mb-6 object-cover w-[180px] h-[120px]" />
              <h3 className="font-serif-playfair text-2xl font-bold mb-2 text-[#222]">Investor Communications</h3>
              <p className="text-[#4b636e] text-base mb-6">Translate dense metrics into crisp stories that close rounds faster and at higher valuations.</p>
              <a href="/consulting?filter=Investor" className="text-[#ff5722] font-semibold text-base hover:underline transition">Learn more →</a>
            </div>
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
          <div className="max-w-5xl w-full">
            <div className="grid md:grid-cols-2 gap-12">
              {/* {homepageTestimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
              ))} */}
            </div>
          </div>
        </section>
      </div>
    </>
  )
} 