import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] flex flex-col lg:flex-row items-stretch p-0 overflow-hidden min-h-[420px] border border-[#f0f0f0]">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start px-10 py-12 md:px-16 md:py-0 text-[#222] bg-white">
            <h1 className="font-serif-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Data-Driven Tech Growth, Made Simple.
          </h1>
            <p className="text-lg md:text-xl mb-4 text-[#222] max-w-xl">
              I'm Sarah Zou, PhD Economist, specialized in pricing strategies, metrics analytics, and investor-ready storytelling for early-stage tech startups.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Princeton, NJ · NYC · Philadelphia · Remote (US/EU)
            </p>
            <Link href="/contact">
              <Button className="bg-[#ff5722] text-white font-bold rounded-full px-6 py-3 hover:bg-[#e64a19] focus:ring-2 focus:ring-[#ff5722]">
                Get in touch
                <span className="ml-2" aria-hidden>→</span>
              </Button>
            </Link>
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
  )
}

export default Hero 