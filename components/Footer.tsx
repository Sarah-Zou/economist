import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'
import { primaryButtonSm } from '@/lib/brandStyles'

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
  'text-[14px] text-text-muted transition-colors hover:text-ink'

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border-soft bg-page">
      <div className="mx-auto w-full max-w-container px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_auto] md:gap-12">
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
                <span className="font-serif-playfair text-lg font-semibold leading-tight text-ink">
                  Sarah Zou, PhD
                </span>
                <span className="text-[12px] text-text-subtle tracking-wide">
                  EconNova Consulting
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-[14px] leading-[1.7] text-text-muted">
              Fractional Chief Economist for AI and SaaS founders. Pricing, unit economics,
              and monetization decisions with research-grade rigor.
            </p>
            <Link
              href="/consulting/entry-offer/form"
              className={`${primaryButtonSm} mt-6`}
            >
              Book the Session
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <p className="kicker-muted mb-4">Navigation</p>
            <ul className="space-y-2.5">
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
            <ul className="space-y-2.5">
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
            <div className="flex items-center gap-3 md:justify-end">
              <Link
                href="/contact"
                aria-label="Contact Sarah Zou"
                title="Contact Sarah Zou"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors hover:border-ink/30 hover:text-ink"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <a
                href="https://www.linkedin.com/in/drsarahzou"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sarah Zou on LinkedIn"
                title="Sarah Zou on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors hover:border-ink/30 hover:text-ink"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-soft pt-6 text-[13px] text-text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EconNova Consulting · All rights reserved</p>
          <p>Princeton, NJ · NYC · Philadelphia · Remote (US/EU)</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
