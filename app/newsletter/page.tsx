import { Button } from '@/components/ui/button'
import Image from 'next/image'

const latestPosts = [
  {
    title: "The Economics of AI in SaaS",
    date: "2024-02-15",
    summary: "How AI is reshaping SaaS business models and what it means for your growth strategy.",
    image: "/images/newsletter1.png"
  },
  {
    title: "Pricing Strategies for B2B SaaS",
    date: "2024-02-01",
    summary: "A practical guide to value-based pricing and avoiding common pitfalls.",
    image: "/images/newsletter2.png"
  },
  {
    title: "Growth Metrics That Matter",
    date: "2024-01-15",
    summary: "The KPIs every SaaS founder should track (and which to ignore).",
    image: "/images/newsletter3.png"
  }
]

export default function Newsletter() {
  return (
    <section className="py-16 bg-[#f9f6f7] min-h-screen">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Recent Issues */}
        <div className="space-y-10">
          {latestPosts.map((post, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg p-6 shadow-sm border border-[#f0f0f0]">
              <div className="flex-shrink-0 w-full md:w-40 h-32 md:h-32 relative rounded overflow-hidden bg-[#f9f6f7]">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-playfair text-xl font-bold text-[#222] mb-1">{post.title}</h3>
                  <p className="text-[#222] mb-2 text-base">{post.summary}</p>
                </div>
                <div className="text-xs text-[#888] mt-2">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </div>
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
              style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent' }}
              className="w-full"
            />
          </div>
        </aside>
      </div>
    </section>
  )
} 