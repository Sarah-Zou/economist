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
  'nav-link text-[13px] font-medium uppercase tracking-[0.1em] text-text-subtle transition-colors hover:text-ink'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-page/88 backdrop-blur-md supports-[backdrop-filter]:bg-page/78">
      <div className="section-shell">
        <div className="relative flex h-[68px] items-center justify-between border-b border-border-soft/80 md:h-[76px]">
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5">
            <Image
              src="/images/econnova-logo-240.webp"
              alt="EconNova Consulting Logo"
              width={122}
              height={43}
              className="h-8.5 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-serif-playfair text-[1.05rem] font-semibold leading-tight text-ink sm:text-[1.2rem]">
                Sarah Zou, PhD
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-text-subtle sm:block">
                Fractional Chief Economist
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/consulting" className={navLinkClass}>
              Work With Me
            </Link>
            <div className="relative group">
              <Link href="/free-tools" className={navLinkClass} aria-haspopup="menu">
                Free Resources
              </Link>
              <div className="invisible absolute left-0 top-full mt-4 w-72 rounded-card border border-border-soft bg-white p-2 opacity-0 shadow-elevated transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[12px] px-4 py-3 text-[13px] text-text-muted transition-colors hover:bg-surface hover:text-ink"
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
            <Link href="/consulting/entry-offer/form" className={`${primaryButtonSm} shadow-none`}>
              Book Session
            </Link>
          </div>

          {/* Mobile toggle */}
          <details className="md:hidden group">
            <summary
              className="list-none cursor-pointer rounded-[12px] px-3.5 py-2 text-[14px] font-semibold text-text-muted transition-colors hover:bg-white hover:text-ink"
              aria-label="Toggle menu"
            >
              Menu
            </summary>
            <div className="absolute inset-x-0 top-[68px] border-t border-border-soft bg-page px-5 py-5 shadow-card md:top-[76px]">
              <div className="space-y-1">
                <Link
                  href="/consulting"
                  className="block rounded-[12px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                >
                  Work With Me
                </Link>
                <Link
                  href="/free-tools"
                  className="block rounded-[12px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                >
                  Free Resources
                </Link>
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[12px] px-8 py-2.5 text-[14px] text-text-muted hover:bg-white hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-[12px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/consulting/entry-offer/form"
                className={`${primaryButtonSm} mt-5 flex w-full justify-center text-center`}
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
