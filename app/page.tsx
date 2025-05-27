import Hero from '@/components/Hero'
import TestimonialCard from '@/components/TestimonialCard'

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
    <div>
      <Hero />
      <section className="py-20 bg-white flex flex-col items-center text-center">
        <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold mb-2 text-[#ff5722] relative inline-block">
          How I Can Help
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-[#222] mb-8">
          Whether you're optimizing pricing, benchmarking against industry metrics, or crafting powerful investor communications—I help transform complex data into clear, actionable strategies.
        </p>
        <div className="max-w-3xl mx-auto space-y-8 mt-10 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#222]">Pricing Strategy</h3>
            <p className="text-[#222]">Discover value-based pricing &amp; packaging that lifts ARR and slashes churn.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#222]">AI-SaaS Metrics &amp; Dashboards</h3>
            <p className="text-[#222]">Benchmark against my proprietary <span className="font-semibold">AI-SaaS Index</span> and get automated, investor-ready reporting.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#222]">Investor Communications</h3>
            <p className="text-[#222]">Translate dense metrics into crisp stories that close rounds faster and at higher valuations.</p>
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
            {homepageTestimonials.map((t, i) => (
              <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 