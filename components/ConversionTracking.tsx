'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

const conversionRoutes: Record<string, string> = {
  '/diagnostic-note': 'diagnostic_note_cta_click',
  '/book': 'book_call_cta_click',
  '/contact': 'contact_cta_click',
}

export default function ConversionTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href]')
      if (!(link instanceof HTMLAnchorElement)) return

      const url = new URL(link.href, window.location.origin)
      if (url.origin !== window.location.origin) return

      const eventName = conversionRoutes[url.pathname.replace(/\/$/, '') || '/']
      if (!eventName) return

      trackEvent(eventName, {
        link_text: link.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120),
        source_path: window.location.pathname,
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
