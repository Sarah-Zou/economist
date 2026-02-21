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
      className="fixed inset-x-3 bottom-3 z-[60] rounded-xl border border-[#e2e6ea] bg-white p-4 shadow-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="text-sm text-[#1f2933] sm:text-base">
        This website uses cookies to analyze traffic and improve your browsing experience.
        <Link href="/privacy" className="ml-1 text-[#ff5722] underline underline-offset-2">
          Learn more
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
        <button
          type="button"
          onClick={() => handleChoice('allow')}
          className="rounded-md bg-[#ff5722] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e44e1f]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => handleChoice('deny')}
          className="rounded-md border border-[#d1d5db] px-4 py-2 text-sm font-semibold text-[#1f2933] hover:bg-[#f6f7f9]"
        >
          Decline
        </button>
      </div>
    </aside>
  )
}
