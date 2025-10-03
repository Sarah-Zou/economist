import React from 'react'
import { Mail, Linkedin, Twitter } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Sarah Zou, PhD | SaaS & AI Strategy Consultation",
  description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
  openGraph: {
    title: "Contact Sarah Zou, PhD | SaaS & AI Strategy Consultation",
    description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
    type: "website",
    url: "https://sarahzou.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sarah Zou, PhD | SaaS & AI Strategy Consultation",
    description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
  },
  alternates: {
    canonical: "https://sarahzou.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] py-20">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-8 md:p-16">
          <h1 className="font-serif-playfair text-4xl font-bold mb-8 text-[#111] text-center">Let's Connect</h1>
          <p className="mb-6 text-gray-700 text-lg text-center">
            Interested in working together, booking me for a speaking event, or just saying hello?
          </p>
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex gap-4">
              <a href="mailto:sarah@sarahzou.com" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Mail className="w-6 h-6" /> Email
              </a>
              <a href="https://www.linkedin.com/in/drsarah-saas-economist" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" /> LinkedIn
              </a>
              <a href="https://twitter.com/SaaS_Econ" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6" /> X / Twitter
              </a>
            </div>
          </div>
          <div className="mb-8 text-center">
            <a 
              href="https://calendly.com/sarahz-saas-economist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors mb-4"
            >
              Book Free Consult
            </a>
            <p className="text-gray-700 text-center text-base">Or fill out the form below:</p>
          </div>
          <form action="https://formspree.io/f/mdkgqeye" method="POST" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="flex-1 px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="flex-1 px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage & ARR band</label>
              <select
                name="stage"
                className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
                required
              >
                <option value="">Select your stage</option>
                <option value="pre-rev">Pre-revenue</option>
                <option value="under-1m">Under $1M ARR</option>
                <option value="1-5m">$1M - $5M ARR</option>
                <option value="5-20m">$5M - $20M ARR</option>
                <option value="20m-plus">$20M+ ARR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current pricing model</label>
              <select
                name="pricingModel"
                className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
                required
              >
                <option value="">Select your model</option>
                <option value="seats">Seats</option>
                <option value="usage">Usage</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <select
                name="goal"
                className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
                required
              >
                <option value="">Select your goal</option>
                <option value="raise-arpa">Raise ARPA</option>
                <option value="improve-nrr">Improve NRR</option>
                <option value="faster-payback">Faster payback</option>
                <option value="new-market">New market</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Tell me more about your pricing challenges..."
              rows={5}
              className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#ff5722] text-white font-bold py-3 rounded transition-colors hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>
    </>
  )
} 