import Image from 'next/image'
import ContactCTA from '@/components/ContactCTA'
import Seo from '@/components/Seo'

const quickFacts = [
  "10+ years in SaaS and technology",
  "PhD in Economics",
  "Former startup founder",
  "Published author",
  "Regular conference speaker"
]

export default function About() {
  return (
    <>
      <Seo
        title="About Sarah Zou, PhD | SaaS & AI Growth Strategist"
        description="Discover the background of Sarah Zou, PhD—an economist, SaaS advisor, and AI strategist. Learn about her experience, credentials, and approach to helping founders and executives scale with confidence."
        path="/about"
      />
      <section className="min-h-[70vh] flex items-center justify-center py-16 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-0 md:gap-12 items-stretch bg-white rounded-lg overflow-hidden shadow-none border border-[#f5f5f5]">
            {/* Left: Text */}
            <div className="flex flex-col justify-center px-6 md:px-12 py-12 md:py-24">
              <span className="text-xs uppercase tracking-wider text-gray-400 mb-4"></span>
              <h1 className="font-serif-playfair text-4xl font-bold mb-2 text-gray-900">PhD Economist & AI Strategist</h1>
              <h2 className="text-lg font-semibold mb-6 text-gray-700"></h2>
              <p className="mb-6 text-gray-700 max-w-xl">
              I'm an economist turned SaaS & AI growth strategist. My expertise blends deep economic rigor with practical, data-driven strategies, enabling founders and executives to scale confidently.
              Previously Chief Subscription Economist at Capgemini and credit researcher at Citigroup, I've spent years advising leading SaaS companies and building robust analytics frameworks—including my proprietary AI-SaaS Index. 
              I hold a PhD in Economics from Rutgers University, and MScs in Finance and Statistics from University of Illinois at Urbana-Champaign.
              </p>
              <h3 className="font-serif-playfair text-xl font-bold mt-2 mb-2">Why Clients Love Working With Me:</h3>
              <ul className="mb-8 list-disc pl-5 text-gray-700">
                <li>No-nonsense advice</li>
                <li>Clear, actionable strategies</li>
                <li>Commitment to results</li>
              </ul>
            </div>
            {/* Right: Image */}
            <div className="flex items-stretch justify-center bg-[#f5f5f5] py-0 md:py-0 border-l border-[#f5f5f5] h-full">
              <div className="relative w-full max-w-[400px] h-full min-h-[320px] rounded-lg overflow-hidden border-2 border-[#eee] shadow-sm flex-1">
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
          </div>
          <div className="max-w-2xl mx-auto mt-12">
            <ContactCTA variant="section" />
          </div>
        </div>
      </section>
    </>
  )
} 