'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type ConsentStatus = 'allow' | 'deny'

const CONSENT_KEY = 'econova-cookie-consent'

function updateConsent(status: ConsentStatus) {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return

  if (status === 'allow') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
    return
  }

  gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'granted',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'allow' || stored === 'deny') {
      updateConsent(stored)
      return
    }
    setVisible(true)
  }, [])

  const handleChoice = (status: ConsentStatus) => {
    localStorage.setItem(CONSENT_KEY, status)
    updateConsent(status)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      className="fixed bottom-4 right-4 z-[60] max-w-[320px] rounded-lg border border-[#e2e6ea] bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:bottom-5 sm:right-5 sm:p-3"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="text-xs text-[#1f2933] leading-snug sm:text-sm">
        This site uses cookies to analyze traffic.{' '}
        <Link href="/privacy" className="text-brand-ink underline decoration-brand decoration-2 underline-offset-2 hover:text-brand-ink/90">
          View privacy policy
        </Link>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleChoice('allow')}
          className="rounded bg-brand-ink px-3 py-1.5 text-xs font-semibold leading-[1.2] text-brand-on hover:bg-brand"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleChoice('deny')}
          className="rounded border border-[#d1d5db] px-3 py-1.5 text-xs font-semibold text-[#1f2933] hover:bg-[#f6f7f9]"
        >
          Decline
        </button>
      </div>
    </aside>
  )
}
