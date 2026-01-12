'use client'

import React, { useState } from 'react'
import { Mail, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [status, setStatus] = useState({ message: '', show: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ message: 'Sending...', show: true })

    const form = e.currentTarget
    const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_WEB_APP_URL || 'https://script.google.com/macros/s/AKfycbyLhMFSGNNOOtdvwboYEjgDPiJoEy8TxBA5MA9TvVDSEDsXcWx1bgTUdcyA-lC3bBHI/exec'

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })

      if (response.ok) {
        setStatus({ message: "Thanks! I'll be in touch soon.", show: true })
        form.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatus({ 
        message: "Error! Please try again or email me directly at hello@sarahzou.com", 
        show: true 
      })
      console.error('Error!', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#f6f7f9] py-20">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-8 md:p-16">
          <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold mb-8 text-[#1f2933] text-center">Let's Connect</h1>
          <p className="mb-6 text-[#1f2933] text-base sm:text-[17px] leading-[1.65] text-center">
            Interested in working together, booking me for a speaking event, or just saying hello?
          </p>
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex gap-4">
              <a href="mailto:hello@sarahzou.com" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e44e1f] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Mail className="w-6 h-6" /> Email
              </a>
              <a href="https://www.linkedin.com/in/drsarah-saas-economist" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e44e1f] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" /> LinkedIn
              </a>
              <a href="https://twitter.com/SaaS_Econ" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e44e1f] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6" /> X / Twitter
              </a>
            </div>
          </div>
          <div className="mb-8 text-center">
            <Link 
              href="/book"
              className="inline-block bg-[#ff5722] hover:bg-[#e44e1f] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors mb-4"
            >
              Book Free Consult
            </Link>
            <p className="text-[#1f2933] text-center text-base sm:text-[17px]">Or fill out the form below:</p>
          </div>
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
              required
            />
            <div>
              <label className="block text-sm font-medium text-[#3b4652] mb-2">Stage & ARR band</label>
              <select
                name="stage"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
                required
              >
                <option value="">Select your stage</option>
                <option value="pre-rev">Pre-revenue</option>
                <option value="under-1m">Under $1M ARR</option>
                <option value="1-5m">$1M - $5M ARR</option>
                <option value="5m-plus">$5M+ ARR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3b4652] mb-2">Current pricing model</label>
              <select
                name="pricingModel"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
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
              <label className="block text-sm font-medium text-[#3b4652] mb-2">Goal</label>
              <select
                name="goal"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
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
              placeholder="How can I help you?"
              rows={5}
              className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
              required
            />
            <button
              type="submit"
              id="submit-btn"
              disabled={isSubmitting}
              className="w-full bg-[#ff5722] text-white font-bold py-3 rounded transition-colors hover:bg-[#e44e1f] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SUBMIT
            </button>
            {status.show && (
              <div id="form-status" className="mt-4 text-center text-[#1f2933]">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
} 