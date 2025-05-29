import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Seo from '@/components/Seo'

const latestPosts = [
  {
    title: "The Economics of AI in SaaS",
    date: "2024-02-15",
    summary: "How AI is reshaping SaaS business models and what it means for your growth strategy.",
    image: "/images/newsletter1.jpg"
  },
  {
    title: "Pricing Strategies for B2B SaaS",
    date: "2024-02-01",
    summary: "A practical guide to value-based pricing and avoiding common pitfalls.",
    image: "/images/newsletter2.jpg"
  },
  {
    title: "Growth Metrics That Matter",
    date: "2024-01-15",
    summary: "The KPIs every SaaS founder should track (and which to ignore).",
    image: "/images/newsletter3.jpg"
  }
]

export default function Newsletter() {
  return (
    <>
      <Seo
        title="AI-SaaS Growth Newsletter | Insights by Sarah Zou, PhD"
        description="Subscribe to Sarah Zou's newsletter for actionable insights on SaaS pricing, metrics, and AI trends. Get expert advice and strategies delivered weekly to your inbox."
        path="/newsletter"
      />
      <section className="py-16 bg-[#f9f6f7] min-h-screen">
        <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Recent Issues */}
          <div className="space-y-10">
            {latestPosts.map((post, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8 items-center bg-white rounded-2xl shadow-md p-6 mb-8 border border-[#e5e7eb]">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={160}
                  height={120}
                  className="rounded-lg object-cover w-40 h-28"
                />
                <div className="flex-1">
                  <h3 className="font-serif-playfair text-xl font-bold mb-2 text-[#111]">{post.title}</h3>
                  <p className="text-gray-600 mb-2 text-sm">{post.date}</p>
                  <p className="text-gray-700 mb-2">{post.summary}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Right: Subscribe Callout (fixed width, sticky on large screens) */}
          <aside className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center border border-[#f0f0f0] w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-32">
            <h2 className="font-serif-playfair text-2xl md:text-3xl font-bold text-center mb-4 text-[#ff5722]">Subscribe to my weekly newsletter</h2>
            <p className="text-center text-[#222] mb-6 text-lg">
              I share practical advice and strategic insights on pricing, SaaS metrics, and investor communication. Sign up if you want:
            </p>
            <ul className="mb-6 text-[#222] text-base list-disc pl-6">
              <li>Real-world SaaS growth strategies</li>
              <li>Clear, actionable advice</li>
              <li>Fresh insights from the AI-SaaS Market Index</li>
            </ul>
            <p className="text-center text-[#222] font-semibold mb-6">Don't miss out.</p>
            <div className="w-full">
              <iframe 
                src="https://embeds.beehiiv.com/0d286f02-6dd7-43ae-ace7-e00771e5df79?slim=true" 
                data-test-id="beehiiv-embed" 
                height="52" 
                frameBorder="0" 
                scrolling="no" 
                title="Newsletter signup form"
                style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent' }}
                className="w-full"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
} 