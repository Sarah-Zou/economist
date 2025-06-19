import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'

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
          <Link href="/" className="font-serif-playfair text-2xl font-bold mb-6 text-[#111]">Sarah Zou, PhD</Link>
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
          <div className="text-sm text-gray-500 mt-4">© 2025 WeKong Solutions · All rights reserved · Princeton, NJ</div>
        </div>
        {/* Right: Newsletter subscription */}
        <div className="flex-1 flex flex-col items-center md:items-end w-full">
          <div className="max-w-md w-full">
            <div className="font-bold text-lg mb-3 text-[#111]">Subscribe to my newsletter</div>
            <div className="w-full">
              <iframe 
                src="https://sarahzou.substack.com/embed" 
                height="52" 
                frameBorder="0" 
                scrolling="no" 
                style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent', width: '100%' }}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 