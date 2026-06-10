'use client'

import React, { useState } from 'react'
import { primaryButton } from '@/lib/brandStyles'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  messagePlaceholder?: string
  buttonText?: string
}

export default function ContactForm({
  messagePlaceholder = 'How can I help you?',
  buttonText = 'Submit',
}: ContactFormProps) {
  const [status, setStatus] = useState({ message: '', show: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ message: 'Sending...', show: true })

    const form = e.currentTarget
    const scriptURL =
      process.env.NEXT_PUBLIC_GOOGLE_WEB_APP_URL ||
      'https://script.google.com/macros/s/AKfycbyM_r8F368DURM5BPZliHGh1cx5NSAijtxWpH98MvVuv9vNBnQpuW9HlygUjz4j2zU7/exec'

    try {
      const formData = new FormData(form)
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
      window.location.href = '/contact/thanks'
    } catch (error) {
      setStatus({
        message: 'Error! Please try again or email me directly at hello@sarahzou.com',
        show: true,
      })
      console.error('Error!', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
      <div className="field-group">
        <label htmlFor="name-input" className="label">
          Name
        </label>
        <input
          id="name-input"
          type="text"
          name="name"
          placeholder="Your name"
          className="input"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="email-input" className="label">
          Email
        </label>
        <input
          id="email-input"
          type="email"
          name="email"
          placeholder="you@company.com"
          className="input"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="company-input" className="label">
          Company or website (optional)
        </label>
        <input
          id="company-input"
          type="text"
          name="company"
          placeholder="acme.com or Acme Inc."
          className="input"
        />
      </div>

      <div className="field-group">
        <label htmlFor="message-textarea" className="label">
          Message
        </label>
        <textarea
          id="message-textarea"
          name="message"
          placeholder={messagePlaceholder}
          rows={5}
          className="textarea"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          id="submit-btn"
          disabled={isSubmitting}
          className={cn(primaryButton, 'mt-2 w-full sm:w-auto')}
        >
          {isSubmitting ? 'Sending…' : buttonText}
        </button>
        <p className="mt-3 text-[13px] leading-[1.65] text-text-subtle">
          No spam — I&apos;ll only use this to reply.
        </p>
      </div>

      {status.show && (
        <div
          id="form-status"
          className="rounded-control bg-surface px-4 py-3 text-[14px] leading-[1.7] text-text-muted"
        >
          {status.message}
        </div>
      )}
    </form>
  )
}
