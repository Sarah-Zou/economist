'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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
              <motion.div
                initial={{ opacity: 0, x: -8, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 -top-4 -left-4 sm:-top-6 sm:-left-8 w-[90%] h-[90%] rounded-2xl shadow-lg"
                aria-hidden="true"
              >
                <Image
                  src={bgSrc}
                  alt=""
                  fill
                  className="object-cover rounded-2xl"
                  loading="lazy"
                />
              </motion.div>

              {/* Foreground Portrait with Arch Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative aspect-[4/5] rounded-t-[45%] rounded-b-none shadow-2xl ring-1 ring-black/5 overflow-hidden"
              >
                <Image
                  src={photoSrc}
                  alt={photoAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Kicker */}
            {kicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xs sm:text-sm font-medium text-orange-600 uppercase tracking-wide"
              >
                {kicker}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-gray-900 leading-[1.1] tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl font-light"
            >
              {lede}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-16 sm:w-20 h-0.5 bg-orange-500"
            />

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4"
              >
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    target={primaryCta.href.startsWith('http') ? '_blank' : undefined}
                    rel={primaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block bg-[#ff5722] text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base hover:bg-[#e64a19] transition-colors text-center"
                  >
                    {primaryCta.text}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-block border border-[#ff5722] text-[#ff5722] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-sm sm:text-base hover:bg-[#ff5722] hover:text-white transition-colors text-center"
                  >
                    {secondaryCta.text}
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
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
