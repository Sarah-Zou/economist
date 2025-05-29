import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-transparent transition-all duration-300 hover:bg-white hover:shadow-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif-playfair text-2xl font-bold">Sarah Zou, PhD</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/consulting" className="text-gray-600 hover:text-gray-900">Consulting</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/newsletter" className="text-gray-600 hover:text-gray-900">Newsletter</Link>
            <Link href="/contact">
              <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-3">Contact</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 