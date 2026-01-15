'use client'

import React, { useState } from 'react'
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
      const formData = new FormData(form)
      
      // Google Apps Script web apps often return redirects, so we use no-cors mode
      // This means we can't read the response, but the data is still sent
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })

      // Since we can't read the response in no-cors mode, assume success
      // The form data was sent to Google Apps Script
      // Redirect to thank you page (using window.location for static export compatibility)
      window.location.href = '/contact/thanks'
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

  const scrollToForm = () => {
    const nameInput = document.getElementById('name-input')
    if (nameInput) {
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Small delay to ensure scroll completes before focusing
      setTimeout(() => {
        nameInput.focus()
      }, 300)
    }
  }

  return (
    <>
      {/* Hero Section - Above the Fold */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f6f7f9] py-20 px-4">
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="font-serif-playfair text-[36px] sm:text-[42px] lg:text-[48px] font-bold mb-6 text-[#1f2933]">
            Contact Sarah
          </h1>
          <p className="mb-8 text-[#1f2933] text-lg sm:text-xl lg:text-[22px] leading-[1.65] max-w-2xl mx-auto">
            Pick what's easiest—book a free 15-min consult, or send 2 lines.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/book"
              className="inline-block bg-[#ff5722] hover:bg-[#e44e1f] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Book Free Consult
            </Link>
            <button
              onClick={scrollToForm}
              className="inline-block bg-transparent border-2 border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-white font-bold px-8 py-4 rounded-full text-lg transition-colors"
            >
              Send a message instead
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#f6f7f9] py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-6 md:p-10">
          <h2 className="font-serif-playfair text-[28px] sm:text-[32px] font-bold mb-4 text-[#1f2933] text-center">
            Send a Message
          </h2>
          <p className="text-sm text-[#3b4652] text-center mb-4">
            Typical response time: within 24 hours (usually faster).
          </p>
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <input
              id="name-input"
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
            <input
              type="text"
              name="company"
              placeholder="Company name or website (optional)"
              className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
            />
            <div>
              <label className="block text-sm font-medium text-[#3b4652] mb-1">Stage & ARR band (optional)</label>
              <select
                name="stage"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
              >
                <option value="">Select your stage</option>
                <option value="pre-rev">Pre-revenue</option>
                <option value="under-1m">Under $1M ARR</option>
                <option value="1-5m">$1M - $5M ARR</option>
                <option value="5m-plus">$5M+ ARR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3b4652] mb-1">Current pricing model (optional)</label>
              <select
                name="pricing"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
              >
                <option value="">Select your model</option>
                <option value="seats">Seats</option>
                <option value="usage">Usage</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3b4652] mb-1">Goal (optional)</label>
              <select
                name="goal"
                className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
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
              className="w-full bg-[#ff5722] text-white font-bold py-3 rounded transition-colors hover:bg-[#e44e1f] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SUBMIT
            </button>
            {status.show && (
              <div id="form-status" className="mt-2 text-center text-[#1f2933]">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
} 