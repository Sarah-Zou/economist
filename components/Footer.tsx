import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { href: '/consulting', label: 'Consulting' },
  { href: '/wiki/pricing', label: 'Wiki' },
  { href: '/cheat-sheets', label: 'Cheat Sheets' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Footer = () => {
  return (
    <footer className="bg-[#f9f6f7] pt-12 sm:pt-16 pb-6 sm:pb-8 mt-16 sm:mt-24 border-t-0">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12">
        {/* Left: Logo, nav, copyright */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-6 sm:mb-8 md:mb-0">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Image
              src="/images/EconNova_logo.png"
              alt="EconNova Consulting Logo"
              width={40}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-serif-playfair text-xl sm:text-2xl font-bold text-[#111] leading-tight">Sarah Zou, PhD</span>
              <span className="text-xs text-[#3b4652] tracking-wide mt-0.5">EconNova Consulting</span>
            </div>
          </Link>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center md:justify-start">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white text-[#111] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium shadow-sm border border-[#eee] hover:bg-[#ff5722] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-xs sm:text-sm text-[#3b4652] mt-2 sm:mt-4 text-center md:text-left">© 2026 EconNova Consulting · All rights reserved</div>
          <div className="text-xs sm:text-sm text-[#3b4652] mt-1 text-center md:text-left">Princeton, NJ · NYC · Philadelphia · Remote (US/EU)</div>
        </div>
        {/* Right: Newsletter subscription */}
        <div className="flex-1 flex flex-col items-center md:items-end w-full">
          <div className="max-w-md w-full flex flex-col items-center md:items-end">
            <div className="font-bold text-base sm:text-lg mb-3 text-[#111]">Connect with me</div>
            <div className="flex gap-3 sm:gap-4">
              <a href="mailto:hello@sarahzou.com" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e44e1f] font-medium text-base sm:text-lg" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/drsarah-saas-economist" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e44e1f] font-medium text-base sm:text-lg" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
