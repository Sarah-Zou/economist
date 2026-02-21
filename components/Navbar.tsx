import Link from 'next/link'
import Image from 'next/image'
import { primaryButton } from '@/lib/brandStyles'

const navLinks = [
  { href: '/consulting', label: 'Consulting' },
  { href: '/wiki/pricing', label: 'Wiki' },
  { href: '/cheat-sheets', label: 'Cheat Sheets' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/econnova-logo-240.webp"
              alt="EconNova Consulting Logo"
              width={122}
              height={43}
              className="h-10 w-auto"
            />
            <span className="font-serif-playfair text-lg sm:text-xl md:text-2xl font-bold leading-tight">Sarah Zou, PhD</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-base text-[#3b4652] hover:text-[#1f2933] transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/book" className={`${primaryButton} whitespace-nowrap`}>
              Book Free Consult
            </Link>
          </div>

          <details className="md:hidden group">
            <summary
              className="list-none cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-[#3b4652] hover:text-[#1f2933] hover:bg-[#f6f7f9] transition-colors"
              aria-label="Toggle menu"
            >
              Menu
            </summary>
            <div className="absolute left-0 right-0 top-20 border-t border-[#e2e6ea] bg-white px-4 py-4 space-y-3 shadow-md">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-4 py-2 text-base text-[#3b4652] hover:text-[#1f2933] hover:bg-[#f6f7f9] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                className={`${primaryButton} block mx-4 mt-4 text-center`}
              >
                Book Free Consult
              </Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 