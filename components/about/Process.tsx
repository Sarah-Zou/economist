'use client'

import { motion } from 'framer-motion'

interface ProcessStep {
  number: number
  title: string
  description: string
}

interface ProcessProps {
  steps: ProcessStep[]
}

export default function Process({ steps }: ProcessProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-12 text-center">
            How We'll Work Together
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#ff5722] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  {/* Connector Line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-[#e2e6ea] -z-10" 
                         style={{ width: 'calc(100% - 4rem)', left: 'calc(50% + 2rem)' }} />
                  )}
                </div>
                
                {/* Step Content */}
                <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-[#1f2933] mb-3">
                  {step.title}
                </h3>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
