'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.scrollWidth / testimonials.length
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length
    scrollToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    scrollToSlide(prevIndex)
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Clients Say
          </h2>
          
          <div className="relative">
            {/* Carousel Container */}
            <div
              ref={scrollRef}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="snap-start shrink-0 basis-[85%] md:basis-[45%] lg:basis-[30%]"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                      <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="border-t pt-4">
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.title}
                        </div>
                        <div className="text-sm text-orange-600 font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-orange-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
