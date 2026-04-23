import Link from 'next/link'
import Image from 'next/image'
import { primaryButtonSm } from '@/lib/brandStyles'

const navLinks = [
  { href: '/consulting', label: 'Work With Me' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const freeResourceLinks = [
  { href: '/wiki/pricing', label: 'Pricing Wiki' },
  { href: '/free-tools/pricing-model-matchmaker', label: 'Pricing Model Matchmaker' },
  { href: '/cheat-sheets', label: 'Roadmap Download' },
  { href: '/newsletter', label: 'Newsletter' },
]

const navLinkClass =
  'text-[15px] text-text-muted hover:text-ink transition-colors'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border-soft bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between md:h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/econnova-logo-240.webp"
              alt="EconNova Consulting Logo"
              width={122}
              height={43}
              className="h-9 w-auto"
            />
            <span className="font-serif-playfair text-lg font-semibold leading-tight text-ink sm:text-xl">
              Sarah Zou, PhD
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            <Link href="/consulting" className={navLinkClass}>
              Work With Me
            </Link>
            <div className="relative group">
              <Link
                href="/free-tools"
                className={navLinkClass}
                aria-haspopup="menu"
              >
                Free Resources
              </Link>
              <div className="invisible absolute left-0 top-full mt-3 w-64 rounded-card border border-border-subtle bg-white opacity-0 shadow-elevated transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-[14px] text-text-muted transition-colors first:rounded-t-card last:rounded-b-card hover:bg-surface hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
            <Link href="/consulting/entry-offer/form" className={primaryButtonSm}>
              Book Session
            </Link>
          </div>

          {/* Mobile toggle */}
          <details className="md:hidden group">
            <summary
              className="list-none cursor-pointer rounded-control px-3 py-2 text-[14px] font-semibold text-text-muted transition-colors hover:bg-surface hover:text-ink"
              aria-label="Toggle menu"
            >
              Menu
            </summary>
            <div className="absolute inset-x-0 top-16 border-t border-border-soft bg-white px-4 py-4 shadow-card md:top-[72px]">
              <div className="space-y-1">
                <Link
                  href="/consulting"
                  className="block rounded-control px-4 py-2 text-[15px] text-text-muted hover:bg-surface hover:text-ink"
                >
                  Work With Me
                </Link>
                <Link
                  href="/free-tools"
                  className="block rounded-control px-4 py-2 text-[15px] text-text-muted hover:bg-surface hover:text-ink"
                >
                  Free Resources
                </Link>
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-control px-8 py-2 text-[14px] text-text-muted hover:bg-surface hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-control px-4 py-2 text-[15px] text-text-muted hover:bg-surface hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/consulting/entry-offer/form"
                className={`${primaryButtonSm} mt-4 block w-full text-center`}
              >
                Book Session
              </Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
