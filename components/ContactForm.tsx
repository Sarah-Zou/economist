'use client'

import React, { useState } from 'react'

interface ContactFormProps {
  firstName?: boolean
  lastName?: boolean
  name?: boolean
  stage?: boolean
  pricing?: boolean
  goal?: boolean
  messagePlaceholder?: string
  buttonText?: string
}

export default function ContactForm({
  firstName = false,
  lastName = false,
  name = false,
  stage = false,
  pricing = false,
  goal = false,
  messagePlaceholder = "Say Hello",
  buttonText = "SEND MESSAGE"
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
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
      {firstName && lastName ? (
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="flex-1 px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="flex-1 px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
            required
          />
        </div>
      ) : name ? (
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
          required
        />
      ) : null}
      
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
        required
      />
      
      {stage && (
        <select
          name="stage"
          className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
        >
          <option value="Pre-revenue">Pre-revenue</option>
          <option value="Under $1M ARR">Under $1M ARR</option>
        </select>
      )}
      
      {pricing && (
        <select
          name="pricing"
          className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
        >
          <option value="">Select pricing model (optional)</option>
          <option value="Seats">Seats</option>
          <option value="Usage">Usage</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Other">Other</option>
        </select>
      )}
      
      {goal && (
        <select
          name="goal"
          className="w-full px-4 py-3 border border-[#e2e6ea] bg-[#f6f7f9] rounded focus:outline-none focus:ring-2 focus:ring-[#ff5722] text-[#1f2933]"
        >
          <option value="">Select goal (optional)</option>
          <option value="Raise ARPA">Raise ARPA</option>
          <option value="Improve NRR">Improve NRR</option>
          <option value="Faster payback">Faster payback</option>
          <option value="New market">New market</option>
          <option value="Other">Other</option>
        </select>
      )}
      
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
        className="w-full bg-[#ff5722] text-white font-bold py-3 rounded-lg transition-colors hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonText}
      </button>
      
      {status.show && (
        <div id="form-status" className="mt-4 text-center text-[#1f2933]">
          {status.message}
        </div>
      )}
    </form>
  )
}

