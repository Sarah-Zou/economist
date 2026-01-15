import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Thank You | Message Received | Sarah Zou, PhD",
  description: "Thank you for reaching out. Sarah Zou, PhD will get back to you soon.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://sarahzou.com/contact/thanks",
  },
  openGraph: {
    title: "Thank You | Message Received | Sarah Zou, PhD",
    description: "Thank you for reaching out. Sarah Zou, PhD will get back to you soon.",
    type: "website",
    url: "https://sarahzou.com/contact/thanks",
  },
};

export default function ContactThanksPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#f6f7f9] py-20">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-8 md:p-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff5722] flex-shrink-0" />
              <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933]">
                Thanks —message received
              </h1>
            </div>
            <p className="mb-8 text-[#1f2933] text-base sm:text-[17px] leading-[1.65] max-w-lg">
              Want the fastest next step? Book a free 15-minute consult now to skip email back-and-forth.
            </p>
            
            <div className="w-full space-y-4 mb-8">
              <Link
                href="/book"
                className="inline-block bg-[#ff5722] hover:bg-[#e44e1f] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors text-center w-full sm:w-auto"
              >
                Book free 15-min consult
              </Link>
              <div className="text-sm text-[#3b4652] max-w-lg mx-auto text-left">
                <p className="mb-2">You'll leave with:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>2–3 tailored <strong>recommendations</strong>, and</li>
                  <li>a concrete <strong>next-step</strong> path (DIY, sprint, or retainer—whatever fits best).</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="text-[#ff5722] hover:text-[#e44e1f] underline text-base"
              >
                Return home
              </Link>
            </div>

            <p className="mt-8 text-xs text-[#3b4652] max-w-lg mx-auto">
              I'll reply by email within 24–48 hours. If you don’t see it, please check spam/promotions.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

