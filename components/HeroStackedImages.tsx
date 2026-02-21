import Image from 'next/image'
import { cn } from '@/lib/utils'
import { outlineButton, primaryButton } from '@/lib/brandStyles'

interface HeroStackedImagesProps {
  photoSrc: string
  bgSrc: string
  title: string
  kicker?: string
  lede: string
  photoAlt?: string
  className?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
}

export default function HeroStackedImages({
  photoSrc,
  bgSrc,
  title,
  kicker,
  lede,
  photoAlt = "Professional portrait",
  className = "",
  primaryCta,
  secondaryCta
}: HeroStackedImagesProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Stacked Images */}
          <div className="flex justify-center lg:justify-start order-first lg:order-none">
            <div className="relative max-w-[400px] sm:max-w-[480px] lg:max-w-[520px] w-full">
              {/* Background Texture Card */}
              <div
                className="absolute inset-0 -top-4 -left-4 sm:-top-6 sm:-left-8 w-[90%] h-[90%] rounded-2xl shadow-lg"
                aria-hidden="true"
              >
                <Image
                  src={bgSrc}
                  alt=""
                  fill
                  className="object-cover rounded-2xl"
                  loading="lazy"
                  sizes="(min-width: 1024px) 468px, (min-width: 640px) 432px, 82vw"
                />
              </div>

              {/* Foreground Portrait with Arch Effect */}
              <div className="relative aspect-[4/5] rounded-t-[45%] rounded-b-none shadow-2xl ring-1 ring-black/5 overflow-hidden">
                <Image
                  src={photoSrc}
                  alt={photoAlt}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 90vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Kicker */}
            {kicker && (
              <div className="text-xs sm:text-sm font-medium text-[#c2410c] uppercase tracking-wide">
                {kicker}
              </div>
            )}

            {/* Title */}
            <h1 className="text-[32px] sm:text-[36px] font-serif font-bold text-[#1f2933] leading-[1.1] tracking-tight">
              {title}
            </h1>

            {/* Lede */}
            <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] max-w-2xl">
              {lede}
            </p>

            {/* Divider */}
            <div className="w-16 sm:w-20 h-0.5 bg-brand" />

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    target={primaryCta.href.startsWith('http') ? '_blank' : undefined}
                    rel={primaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(primaryButton, 'inline-block text-center')}
                  >
                    {primaryCta.text}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className={cn(outlineButton, 'inline-block rounded-md px-5 sm:px-6 py-2.5 sm:py-3 text-[19px] leading-none text-center')}
                  >
                    {secondaryCta.text}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Usage example:
/*
<HeroStackedImages
  photoSrc="/images/about_headshot.webp"
  bgSrc="/images/background.webp"
  title="Dr. Sarah Zou"
  kicker="EconNova Consulting"
  lede="I help early-stage tech teams turn pricing into a growth system—so NRR compounds, CAC payback shortens, and the investor story is clear."
  photoAlt="Dr. Sarah Zou, Economist and Pricing Strategist"
/>
*/
