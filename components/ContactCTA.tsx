import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ContactCTAProps {
  variant?: 'section' | 'inline'
}

const ContactCTA = ({ variant = 'section' }: ContactCTAProps) => {
  if (variant === 'inline') {
    return (
      <div className="text-center">
        <Link href="/contact">
          <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3 focus:ring-2 focus:ring-[#ff5722]">
            Get in touch
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <section className="py-20 bg-[#f6f7f9]">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-6">
            Ready to accelerate your tech startup growth?
          </h2>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-8">
            Let's work together to optimize your pricing, improve your metrics, and scale your business with confidence.
          </p>
          <Link href="/contact">
            <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3 focus:ring-2 focus:ring-[#ff5722]">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA 