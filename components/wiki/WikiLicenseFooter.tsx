import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export default function WikiLicenseFooter() {
  return (
    <div className="mt-16 border-t border-border-subtle pt-8">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-12">
        <div className="max-w-2xl">
          <p className="kicker-muted">Open license</p>
          <h3 className="mt-3 font-serif-playfair text-ink">Reuse with attribution</h3>
          <p className="mt-4 text-[14px] leading-[1.75] text-text-muted">
            This content is available for reuse. When referencing or republishing it, please credit{' '}
            <Link href="/about" className="font-medium text-brand-ink hover:underline">
              Dr. Sarah Zou
            </Link>{' '}
            and link back to the original source.
          </p>
        </div>
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer license"
          className="inline-flex items-center gap-2 border-b border-border pb-1 text-[12px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-brand-ink hover:text-brand-ink"
          aria-label="Creative Commons Attribution 4.0 International License"
        >
          <span aria-hidden="true">CC BY 4.0</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="mt-7 border-t border-border-soft pt-5 text-[12px] leading-[1.7] text-text-subtle">
        Licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-ink hover:underline"
        >
          Creative Commons Attribution 4.0 International
        </a>
        . You may share and adapt the material with appropriate credit.
      </p>
    </div>
  )
}
