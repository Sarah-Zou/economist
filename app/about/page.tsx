import Image from 'next/image'
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
  title: "About Sarah Zou, PhD | SaaS & AI Growth Strategist",
  description: "Discover the background of Sarah Zou, PhD—an economist, SaaS advisor, and AI strategist. Learn about her experience, credentials, and approach to helping founders and executives scale with confidence.",
  openGraph: {
    title: "About Sarah Zou, PhD | SaaS & AI Growth Strategist",
    description: "Discover the background of Sarah Zou, PhD—an economist, SaaS advisor, and AI strategist. Learn about her experience, credentials, and approach to helping founders and executives scale with confidence.",
    type: "website",
    url: "https://sarahzou.com/about",
    images: ["https://sarahzou.com/images/about_headshot.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sarah Zou, PhD | SaaS & AI Growth Strategist",
    description: "Discover the background of Sarah Zou, PhD—an economist, SaaS advisor, and AI strategist. Learn about her experience, credentials, and approach to helping founders and executives scale with confidence.",
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
                <h1 className="font-serif-playfair text-5xl font-bold mb-4 text-[#223] mt-8">Sarah Zou, PhD</h1>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl font-medium">
                  Economist focused 100% on SaaS pricing & monetization. I design pricing like a product—evidence first, experiments always.
                </p>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl">
                  I'm Sarah Zou, your Fractional Economist. With a PhD in Economics and deep expertise in SaaS financial modeling, subscription economics, and investor communications, I bridge the gap between raw data and powerful fundraising narratives.
                </p>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl">
                  Unlike traditional fractional CFO services or DIY software, my approach blends rigorous econometrics, precise SaaS benchmarks, and investor-grade storytelling.
                </p>
                <p className="mb-4 text-lg text-[#4b636e] max-w-2xl">
                  Previously Chief Subscription Economist at Capgemini and credit researcher at Citigroup, I've spent years advising tech startups and leading companies, and building robust analytics frameworks—including my proprietary AI-SaaS Index.
                </p>
                <p className="mb-6 text-lg text-[#4b636e] max-w-2xl">
                  I hold a PhD in Economics from Rutgers University, and MScs in Finance and Statistics from University of Illinois at Urbana-Champaign.
                </p>
                <h3 className="font-serif-playfair text-xl font-bold mt-2 mb-2 text-[#223]">Why Clients Love Working With Me:</h3>
                <ul className="mb-6 list-disc pl-5 text-[#4b636e]">
                  <li>No-nonsense advice</li>
                  <li>Clear, actionable strategies</li>
                  <li>Commitment to results</li>
                </ul>
                <a 
                  href="https://calendly.com/sarahz-saas-economist" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
                >
                  Book Free Consult
                </a>
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