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
}

export default function HeroStackedImages({
  photoSrc,
  bgSrc,
  title,
  kicker,
  lede,
  photoAlt = "Professional portrait",
  className = ""
}: HeroStackedImagesProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Stacked Images */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative max-w-[520px] w-full">
              {/* Background Texture Card */}
              <motion.div
                initial={{ opacity: 0, x: -8, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 -top-6 -left-8 w-[90%] h-[90%] rounded-2xl shadow-lg"
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
            className="space-y-8"
          >
            {/* Kicker */}
            {kicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm font-medium text-orange-600 uppercase tracking-wide"
              >
                {kicker}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl"
            >
              {lede}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-20 h-0.5 bg-orange-500"
            />
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
  kicker="The SaaS Economist"
  lede="I help B2B SaaS teams turn pricing into a growth system—so NRR compounds, CAC payback shortens, and the investor story is clear."
  photoAlt="Dr. Sarah Zou, SaaS Economist and Pricing Strategist"
/>
*/
