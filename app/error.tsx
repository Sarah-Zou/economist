'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root level error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-text mb-4">
          Something went wrong!
        </h1>
        <p className="text-base sm:text-[17px] text-text mb-8 leading-[1.65]">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        {error.digest && (
          <p className="text-sm text-text-muted mb-8">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-brand text-brand-on px-6 py-3 rounded-lg text-[18px] font-semibold leading-[1.2] hover:bg-brand-ink transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white text-brand-ink border-2 border-brand px-6 py-3 rounded-lg font-semibold hover:bg-surface transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

