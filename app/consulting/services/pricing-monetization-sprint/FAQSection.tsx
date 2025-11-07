'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'Will this "work" if we\'re pre-revenue?', a: 'Yes—benchmarks + value hypotheses + cost floors give a defendable first price and test plan.' },
    { q: 'Will customers churn if we raise prices?', a: 'We design fences, upgrade paths, and comms to protect retention while lifting yield.' },
    { q: 'Can we switch to usage-based?', a: 'If the value metric supports it and ops allow, you\'ll get a migration playbook.' },
    { q: 'What do you need from me to get started?', a: 'Founder + PM (and Sales/CS if post-launch) in workshops • Access to pricing page drafts, cost inputs, and recent usage/sales notes • A single decision owner' },
    { q: 'How are payments handled?', a: '70% at kickoff, 30% at readout.' }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
              >
                <h3 className="font-semibold text-base text-[#223] pr-4 flex-1">{faq.q}</h3>
                <svg 
                  className={`w-5 h-5 text-[#4b636e] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div 
                  id={`faq-answer-${idx}`}
                  className="px-6 pb-6 animate-in fade-in duration-200"
                >
                  <p className="text-base text-[#4b636e] font-light">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

