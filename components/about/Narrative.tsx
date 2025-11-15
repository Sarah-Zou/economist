'use client'

import { motion } from 'framer-motion'

interface NarrativeProps {
  title: string
  content: string
  className?: string
}

export default function Narrative({ title, content, className = '' }: NarrativeProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 leading-tight">
            {title}
          </h2>
          <div 
            className="prose prose-lg prose-gray max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.div>
      </div>
    </section>
  )
}
