import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow transition-all duration-300">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif-playfair text-2xl font-bold">Sarah Zou, PhD</span>
            <span className="text-xs text-gray-500 tracking-wide mt-0.5">The SaaS Economist</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/consulting" className="text-gray-600 hover:text-gray-900">Consulting</Link>
            <Link href="/wiki/pricing" className="text-gray-600 hover:text-gray-900">Wiki</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/newsletter" className="text-gray-600 hover:text-gray-900">Newsletter</Link>
            <a 
              href="https://calendly.com/sarahz-saas-economist" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold rounded-full px-6 py-3 transition-colors"
            >
              Book Free Consult
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 