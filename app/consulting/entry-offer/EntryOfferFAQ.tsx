'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#e2e6ea] py-4 sm:py-5 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full min-h-[48px] items-center justify-between gap-3 text-left font-semibold text-[#1f2933] hover:text-brand transition-colors py-1 -my-1"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-[17px]">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-[#3b4652] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-3 sm:pt-4 text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EntryOfferFAQ({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="bg-surface p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-[2rem] border border-[#e2e6ea] shadow-sm">
      {items.map((item, i) => (
        <FAQItem key={i} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}
