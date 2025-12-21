import React from 'react'
import { CheckCircle, Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Thank You | Book a Consultation | Sarah Zou, PhD",
  description: "Thank you for your interest. Book a free consultation with Sarah Zou, PhD to discuss your pricing and metrics strategy.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sarahzou.com/book",
  },
  openGraph: {
    title: "Thank You | Book a Consultation | Sarah Zou, PhD",
    description: "Thank you for your interest. Book a free consultation with Sarah Zou, PhD to discuss your pricing and metrics strategy.",
    type: "website",
    url: "https://sarahzou.com/book",
  },
};

export default function BookPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#f6f7f9] py-12 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-16">
            {/* Thank You Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff5722] flex-shrink-0" />
                <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933]">
                  Thank You for Your Interest!
                </h1>
              </div>
              <p className="mb-8 text-[#1f2933] text-base sm:text-[17px] leading-[1.65] max-w-2xl">
                I'd love to learn more about your pricing challenges and help you build a data-driven strategy. 
                Book a free 30-minute consultation below to get started.
              </p>
            </div>

            {/* What to Expect */}
            <div className="flex items-start gap-4 p-4 bg-[#f6f7f9] rounded-lg max-w-2xl mx-auto mb-8">
              <Calendar className="w-6 h-6 text-[#ff5722] mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-[#1f2933] mb-1">What to Expect</h3>
                <p className="text-sm text-[#3b4652]">
                  During our call, we'll discuss your current pricing model, key challenges, and goals. 
                  I'll share insights tailored to your stage and help you identify quick wins and strategic opportunities.
                </p>
              </div>
            </div>

            {/* Calendly Inline Widget */}
            <div className="overflow-hidden">
              <div 
                className="calendly-inline-widget"
                data-url="https://calendly.com/sarahxzou/free-consult-30-min"
                style={{ minWidth: '320px', height: '650px', overflow: 'hidden' }}
              />
              <Script 
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

