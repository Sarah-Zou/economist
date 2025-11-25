'use client'

import { motion } from 'framer-motion'

interface CredentialItem {
  title: string
  items: string[]
}

interface CredsGridProps {
  credentials: CredentialItem[]
}

export default function CredsGrid({ credentials }: CredsGridProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#e2e6ea] bg-white/50 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-[#1f2933] mb-4">
                {cred.title}
              </h3>
              <ul className="space-y-2">
                {cred.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
