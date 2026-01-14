'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

interface CalendlyEmbedProps {
  url: string
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(() => {
    if (typeof window !== 'undefined') {
      return `${window.innerHeight - 250}px`
    }
    return 'calc(100vh - 250px)'
  })

  // Add hide_gdpr_banner parameter to URL
  const embedUrl = (() => {
    try {
      const urlObj = new URL(url)
      urlObj.searchParams.set('hide_gdpr_banner', '1')
      return urlObj.toString()
    } catch {
      // If URL parsing fails, append parameter manually
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}hide_gdpr_banner=1`
    }
  })()

  useEffect(() => {
    // Update height on window resize
    const updateHeight = () => {
      const newHeight = window.innerHeight - 250
      setHeight(`${newHeight}px`)
    }

    window.addEventListener('resize', updateHeight)
    updateHeight() // Set initial height

    // Listen for Calendly resize messages
    const handleMessage = (e: MessageEvent) => {
      // Security: only accept Calendly as sender
      if (e.origin !== 'https://calendly.com') return
      
      if (e.data?.event && typeof e.data.event === 'string' && e.data.event.indexOf('calendly.') === 0) {
        // Calendly may send height in payload, but we'll use viewport-based height
        // This ensures full viewport usage while allowing Calendly to scroll internally
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <>
      <div 
        ref={widgetRef}
        className="calendly-inline-widget w-full"
        data-url={embedUrl}
        style={{ 
          minWidth: '320px', 
          height: height,
          minHeight: '600px',
          overflow: 'hidden' 
        }}
      />
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}
