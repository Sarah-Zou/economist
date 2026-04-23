import Link from 'next/link'

export default function PricingWikiNotFound() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-text mb-4">
          Page not found
        </h1>
        <p className="text-base sm:text-[17px] text-text mb-8 leading-[1.65]">
          The pricing wiki page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/wiki/pricing"
          className="inline-block bg-brand text-brand-on px-6 py-3 rounded-lg text-[18px] font-semibold leading-[1.2] hover:bg-brand-ink transition-colors"
        >
          Go to Pricing Wiki
        </Link>
      </div>
    </div>
  )
}
