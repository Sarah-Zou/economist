'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface CtaProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export default function Cta({ title, description, buttonText, buttonHref }: CtaProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative order-first lg:order-none"
          >
            <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/readyToGrow.webp"
                alt="Business growth and analytics workspace"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
            
            <Link
              href={buttonHref}
              className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm sm:text-base transition-all duration-200 hover:shadow-lg"
            >
              {buttonText}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
