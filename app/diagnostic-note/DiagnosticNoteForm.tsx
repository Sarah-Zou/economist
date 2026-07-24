'use client'

import React, { useState } from 'react'
import { primaryButton } from '@/lib/brandStyles'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

const STAGE_OPTIONS = [
  { value: '', label: 'Select stage…' },
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'other', label: 'Other' },
]

const CATEGORY_OPTIONS = [
  { value: '', label: 'Select category…' },
  { value: 'ai-infra-api', label: 'AI infra / API' },
  { value: 'llmops', label: 'LLMOps' },
  { value: 'dev-tooling', label: 'Dev tooling' },
  { value: 'data-platform', label: 'Data platform' },
  { value: 'other', label: 'Other' },
]

export default function DiagnosticNoteForm() {
  const [succeeded, setSucceeded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    // Set NEXT_PUBLIC_PRICING_SESSION_FORM_URL to the deployed diagnostic-note form endpoint.
    const scriptURL =
      process.env.NEXT_PUBLIC_PRICING_SESSION_FORM_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_WEB_APP_URL ||
      ''

    if (!scriptURL) {
      setError('Form endpoint not configured. Please email hello@sarahzou.com directly.')
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData(form)
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
      trackEvent('generate_lead', {
        method: 'diagnostic_note',
        form_name: 'diagnostic_note_request',
      })
      setSucceeded(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email hello@sarahzou.com directly.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (succeeded) {
    return (
      <div className="border-y border-border-soft py-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
          Request received
        </p>
        <p className="mt-5 font-serif-playfair text-[26px] font-medium text-ink">
          Thanks — I&apos;ll be in touch within 1–2 business days.
        </p>
        <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.75] text-text-muted">
          I&apos;ll review the context personally and reply with a concise, practical note.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="field-group">
        <label htmlFor="dn-name" className="label">
          Name
        </label>
        <input
          id="dn-name"
          type="text"
          name="name"
          placeholder="Your name"
          className="input"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="dn-email" className="label">
          Email
        </label>
        <input
          id="dn-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          className="input"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="dn-company" className="label">
          Company or website
        </label>
        <input
          id="dn-company"
          type="text"
          name="company"
          placeholder="acme.com or Acme Inc."
          className="input"
          required
        />
      </div>

      <div className="field-group">
        <label htmlFor="dn-pricing-url" className="label">
          Pricing page URL <span className="text-text-subtle">(optional)</span>
        </label>
        <input
          id="dn-pricing-url"
          type="url"
          name="pricing_url"
          placeholder="https://yourcompany.com/pricing"
          className="input"
        />
      </div>

      <div className="field-group">
        <label htmlFor="dn-message" className="label">
          What you&apos;re working through
        </label>
        <textarea
          id="dn-message"
          name="message"
          placeholder="1–2 lines on the pricing, packaging, unit economics, or GTM question you're working through."
          rows={4}
          className="textarea"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field-group">
          <label htmlFor="dn-stage" className="label">
            Stage
          </label>
          <select id="dn-stage" name="stage" className="input" defaultValue="" required>
            {STAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="dn-category" className="label">
            Category
          </label>
          <select id="dn-category" name="category" className="input" defaultValue="" required>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-3 pt-1">
        <input
          id="dn-newsletter"
          type="checkbox"
          name="newsletter_opt_in"
          value="yes"
          className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border accent-brand"
        />
        <label
          htmlFor="dn-newsletter"
          className="cursor-pointer text-[14px] leading-[1.65] text-text-muted"
        >
          Also send me the occasional pricing note
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(primaryButton, 'mt-2 w-full sm:w-auto')}
        >
          {isSubmitting ? 'Sending…' : 'Send my request'}
        </button>
        <p className="mt-3 text-[13px] leading-[1.65] text-text-subtle">
          No pitch, no spam — I&apos;ll reply with a one-page note within 1–2 business days.
        </p>
      </div>

      {error && (
        <div className="rounded-control bg-surface px-4 py-3 text-[14px] leading-[1.7] text-text-muted">
          {error}
        </div>
      )}
    </form>
  )
}
