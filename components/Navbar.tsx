'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { outlineButtonSm } from '@/lib/brandStyles'

const navLinks = [
  { href: '/consulting', label: 'Work With Me' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const wikiLinks = [
  { href: '/wiki/pricing', label: 'Pricing & Monetization' },
  { href: '/wiki/business-models', label: 'Business Models' },
  { href: '/wiki/go-to-market', label: 'Go-to-Market' },
  { href: '/wiki/unit-economics', label: 'Unit Economics' },
  { href: '/fundraising', label: 'Startup Fundraising' },
]

const freeResourceLinks = [{ href: '/newsletter', label: 'Newsletter' }]

const Navbar = () => {
  const pathname = usePathname()
  const hasOverlayHero = pathname === '/'
  const navLinkClass = `nav-link whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${
    hasOverlayHero ? 'text-white/75 hover:text-white' : 'text-text-subtle hover:text-ink'
  }`

  return (
    <nav
      className={
        hasOverlayHero
          ? 'absolute inset-x-0 top-0 z-50 bg-transparent text-white'
          : 'sticky top-0 z-50 bg-page/94 backdrop-blur-md supports-[backdrop-filter]:bg-page/86'
      }
    >
      <div className="section-shell">
        <div
          className={`relative flex h-[64px] items-center justify-between border-b md:h-[72px] ${
            hasOverlayHero ? 'border-white/20' : 'border-border-soft/80'
          }`}
        >
          {/* Name-led brand — EconNova lives in the footer and legal pages only. */}
          <Link href="/" className="flex min-w-0 flex-col">
            <span
              className={`whitespace-nowrap font-serif-playfair text-[1.15rem] font-semibold leading-tight sm:text-[1.25rem] ${
                hasOverlayHero ? 'text-white' : 'text-ink'
              }`}
            >
              Sarah Zou, PhD
            </span>
            <span
              className={`hidden whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.1em] xl:block ${
                hasOverlayHero ? 'text-white/60' : 'text-text-subtle'
              }`}
            >
              Commercial strategy for complex technical products
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 lg:flex lg:gap-7">
            <Link href="/consulting" className={navLinkClass}>
              Work With Me
            </Link>
            <div className="relative flex items-center group">
              <Link href="/free-tools" className={navLinkClass} aria-haspopup="menu">
                Resources
              </Link>
              <div className="invisible absolute left-0 top-full mt-4 w-72 rounded-card border border-border-soft bg-white p-2 opacity-0 shadow-elevated transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <Link
                  href="/wiki"
                  className="block rounded-[8px] px-4 py-3 text-[13px] font-semibold text-text transition-colors hover:bg-surface"
                >
                  Wiki Library
                </Link>
                <div className="mb-1 ml-4 border-l border-border-soft pb-1 pl-2">
                  {wikiLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-[10px] px-3 py-2 text-[13px] text-text-muted transition-colors hover:bg-surface hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[8px] px-4 py-3 text-[13px] text-text-muted transition-colors hover:bg-surface hover:text-ink"
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
            <Link
              href="/diagnostic-note"
              className={
                hasOverlayHero
                  ? 'inline-flex h-10 min-w-[168px] items-center justify-center rounded-[8px] border border-white/[0.45] px-5 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10'
                  : `${outlineButtonSm} shadow-none`
              }
            >
              Request a free diagnostic note
            </Link>
          </div>

          {/* Mobile toggle */}
          <details className="group overflow-hidden open:overflow-visible lg:hidden">
            <summary
              className={`list-none cursor-pointer rounded-[8px] px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                hasOverlayHero
                  ? 'text-white/80 hover:bg-white/10 hover:text-white'
                  : 'text-text-muted hover:bg-white hover:text-ink'
              }`}
              aria-label="Toggle menu"
            >
              Menu
            </summary>
            <div className="absolute inset-x-0 top-[64px] border-t border-border-soft bg-page px-5 py-5 shadow-card md:top-[72px]">
              <div className="space-y-1">
                <Link
                  href="/consulting"
                  className="block rounded-[8px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                >
                  Work With Me
                </Link>
                <Link
                  href="/free-tools"
                  className="block rounded-[8px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                >
                  Resources
                </Link>
                <Link
                  href="/wiki"
                  className="block rounded-[8px] px-8 py-2.5 text-[14px] font-semibold text-text hover:bg-white hover:text-ink"
                >
                  Wiki Library
                </Link>
                <div className="ml-8 border-l border-border-soft pl-2">
                  {wikiLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-[8px] px-4 py-2.5 text-[14px] text-text-muted hover:bg-white hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                {freeResourceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-[8px] px-8 py-2.5 text-[14px] text-text-muted hover:bg-white hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-[8px] px-4 py-3 text-[15px] text-text-muted hover:bg-white hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/diagnostic-note"
                className={`${outlineButtonSm} mt-5 flex w-full justify-center text-center`}
              >
                Request a free diagnostic note
              </Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
