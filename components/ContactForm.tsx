'use client'

import React, { useState } from 'react'

interface ContactFormProps {
  messagePlaceholder?: string
  buttonText?: string
}

export default function ContactForm({
  messagePlaceholder = "How can I help you?",
  buttonText = "SUBMIT"
}: ContactFormProps) {
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

  return (
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
        placeholder={messagePlaceholder}
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
        {buttonText}
      </button>
      {status.show && (
        <div id="form-status" className="mt-2 text-center text-[#1f2933]">
          {status.message}
        </div>
      )}
    </form>
  )
}

