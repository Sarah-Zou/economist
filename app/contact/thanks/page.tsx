import React from 'react'
import { CheckCircle, Mail, Clock } from 'lucide-react'
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
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-[#ff5722] mx-auto" />
            </div>
            <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold mb-4 text-[#1f2933]">
              Thank You for Reaching Out!
            </h1>
            <p className="mb-8 text-[#1f2933] text-base sm:text-[17px] leading-[1.65] max-w-lg">
              Your message has been received. I'll review your inquiry and get back to you within 24-48 hours.
            </p>
            
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-[#f6f7f9] rounded-lg">
                <Mail className="w-6 h-6 text-[#ff5722] mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-[#1f2933] mb-1">What Happens Next?</h3>
                  <p className="text-sm text-[#3b4652]">
                    I'll review your message and respond via email. Please check your inbox (and spam folder) for my reply.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-[#f6f7f9] rounded-lg">
                <Clock className="w-6 h-6 text-[#ff5722] mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-[#1f2933] mb-1">Response Time</h3>
                  <p className="text-sm text-[#3b4652]">
                    I typically respond within 24-48 hours. For urgent matters, feel free to reach out directly via email at sarah@sarahzou.com.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/"
                className="inline-block bg-[#ff5722] hover:bg-[#e44e1f] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors text-center"
              >
                Return Home
              </Link>
              <a
                href="https://calendly.com/sarahxzou/free-consult-30-min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white hover:bg-[#f6f7f9] text-[#1f2933] font-bold px-8 py-4 rounded-full text-lg transition-colors border-2 border-[#e2e6ea] text-center"
              >
                Book a Free Consult
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

