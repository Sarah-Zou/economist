import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'
const workLinks = [
  { href: '/consulting', label: 'Work With Me' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const resourceLinks = [
  { href: '/wiki/pricing', label: 'Pricing Wiki' },
  { href: '/free-tools/pricing-model-matchmaker', label: 'Pricing Model Matchmaker' },
  { href: '/cheat-sheets', label: 'Roadmap Download' },
  { href: '/newsletter', label: 'Newsletter' },
]

const footerLink =
  'text-[13px] uppercase tracking-[0.08em] leading-[1.6] text-text-muted transition-colors hover:text-ink'

const Footer = () => {
  return (
    <footer className="mt-28 bg-page">
      <div className="section-shell py-16 sm:py-18">
        <div className="grid gap-12 border-t border-border-soft pt-10 md:grid-cols-[1.45fr_1fr_1fr_auto] md:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/econnova-logo-240.webp"
                alt="EconNova Consulting Logo"
                width={122}
                height={43}
                className="h-9 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-serif-playfair text-[1.12rem] font-semibold leading-tight text-ink">
                  Sarah Zou, PhD
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-subtle">
                  EconNova Consulting
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.8] text-text-muted">
              Commercial strategy, pricing, and growth economics for AI-native B2B SaaS teams.
              Fractional chief economist and commercial advisor — from pricing and GTM decisions to
              unit economics, forecasting, and investor-ready narratives.
            </p>
            <Link
              href="/consulting/entry-offer/form"
              className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-ink transition-colors hover:text-brand-dark"
            >
              Book the 90-minute strategy session
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="kicker-muted mb-4">Navigation</p>
            <ul className="space-y-3">
              {workLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="kicker-muted mb-4">Free resources</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <p className="kicker-muted mb-4 md:text-right">Contact</p>
            <p className="mb-5 text-[14px] leading-[1.7] text-text-muted md:ml-auto md:max-w-[14rem]">
              For commercial strategy, pricing, or GTM questions, the fastest path is the free consult.
            </p>
            <div className="flex items-center gap-3 md:justify-end">
              <Link
                href="/contact"
                aria-label="Contact Sarah Zou"
                title="Contact Sarah Zou"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <a
                href="https://www.linkedin.com/in/drsarahzou"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sarah Zou on LinkedIn"
                title="Sarah Zou on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border-soft pt-6 text-[13px] text-text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EconNova Consulting · All rights reserved</p>
          <p>Princeton, NJ · NYC · Philadelphia · Remote (US/EU)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
