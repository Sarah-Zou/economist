import Link from 'next/link'
import { Linkedin, Mail, Twitter } from 'lucide-react'

const navLinks = [
  { href: '/consulting', label: 'Consulting' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
]

const Footer = () => {
  return (
    <footer className="bg-[#f9f6f7] pt-16 pb-8 mt-24 border-t-0">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        {/* Left: Logo, nav, copyright */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
          <Link href="/" className="font-serif-playfair text-2xl font-bold mb-1 text-[#111]">Sarah Zou, PhD</Link>
          <span className="text-xs text-gray-500 tracking-wide mb-6">The SaaS Economist</span>
          <div className="flex flex-wrap gap-3 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white text-[#111] px-5 py-2 rounded-full text-base font-medium shadow-sm border border-[#eee] hover:bg-[#ff5722] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-4">© 2025 The SaaS Economist · All rights reserved</div>
          <div className="text-sm text-gray-500 mt-1">Princeton, NJ · NYC · Philadelphia · Remote (US/EU)</div>
        </div>
        {/* Right: Newsletter subscription */}
        <div className="flex-1 flex flex-col items-center md:items-end w-full">
          <div className="max-w-md w-full flex flex-col items-center md:items-end">
            <div className="font-bold text-lg mb-3 text-[#111]">Connect with me</div>
            <div className="flex gap-4">
              <a href="mailto:sarah@sarahzou.com" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/drsarah-saas-economist" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/SaaS_Econ" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 