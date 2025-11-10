'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/images/EconNova_logo.png"
              alt="EconNova Consulting Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="font-serif-playfair text-lg sm:text-xl md:text-2xl font-bold leading-tight">Sarah Zou, PhD</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/consulting" className="text-base text-gray-600 hover:text-gray-900 transition-colors">Consulting</Link>
            <Link href="/wiki/pricing" className="text-base text-gray-600 hover:text-gray-900 transition-colors">Wiki</Link>
            <Link href="/cheat-sheets" className="text-base text-gray-600 hover:text-gray-900 transition-colors">Cheat Sheets</Link>
            <Link href="/about" className="text-base text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/newsletter" className="text-base text-gray-600 hover:text-gray-900 transition-colors">Newsletter</Link>
            <a 
              href="https://calendly.com/sarahxzou/free-consult-30-min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold rounded-full px-6 py-3 transition-colors whitespace-nowrap"
            >
              Book Free Consult
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link 
              href="/consulting" 
              className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Consulting
            </Link>
            <Link 
              href="/wiki/pricing" 
              className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wiki
            </Link>
            <Link 
              href="/cheat-sheets" 
              className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cheat Sheets
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/newsletter" 
              className="block px-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Newsletter
            </Link>
            <a 
              href="https://calendly.com/sarahxzou/free-consult-30-min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mx-4 mt-4 bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold rounded-full px-6 py-3 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Free Consult
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 