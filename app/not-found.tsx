import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-text mb-4">404</h1>
        <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4">Page Not Found</h2>
        <p className="text-base sm:text-[17px] text-text mb-8 leading-[1.65]">The page you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="inline-block bg-brand text-brand-on px-6 py-3 rounded-lg text-[18px] font-semibold leading-[1.2] hover:bg-brand-ink transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
