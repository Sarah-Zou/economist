import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f6f7] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-[#1f2933] mb-4">
          Concept Not Found
        </h1>
        <p className="text-base sm:text-[17px] text-[#1f2933] mb-8 leading-[1.65]">
          The concept page you're looking for doesn't exist or hasn't been created yet.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/wiki/pricing"
            className="bg-[#ff5722] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e64a19] transition-colors"
          >
            Go to Pricing Wiki
          </Link>
        </div>
      </div>
    </div>
  )
}











