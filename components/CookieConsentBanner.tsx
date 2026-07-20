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
    analytics_storage: 'denied',
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
    <div
      className="fixed inset-x-4 bottom-4 z-[60] border border-border-soft bg-page/95 px-5 py-4 shadow-elevated backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-[390px] sm:px-6 sm:py-5"
      role="region"
      aria-label="Cookie consent"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-subtle">
        Your privacy
      </p>
      <p className="mt-3 text-[13px] leading-[1.65] text-text-muted sm:text-[14px]">
        Optional cookies help me understand site traffic and measure marketing performance.{' '}
        <Link
          href="/privacy"
          className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
        >
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => handleChoice('allow')}
          className="border border-ink bg-ink px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-ink"
        >
          Accept optional cookies
        </button>
        <button
          type="button"
          onClick={() => handleChoice('deny')}
          className="border-b border-border pb-1 text-[12px] font-medium text-text-muted transition-colors hover:border-ink hover:text-ink"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
