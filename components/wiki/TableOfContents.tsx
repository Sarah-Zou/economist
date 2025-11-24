'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Zap, 
  Pin, 
  Link2, 
  Book, 
  AlertTriangle, 
  Users, 
  List, 
  HelpCircle,
  Target,
  TrendingUp
} from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
  title: string
}

// Map section names to icons
const getSectionIcon = (text: string) => {
  const lowerText = text.toLowerCase()
  
  if (lowerText.includes('snapshot') || lowerText.includes('tl;dr') || lowerText.includes('tldr') || lowerText.includes('quick')) {
    return <Zap className="w-4 h-4" />
  }
  if (lowerText.includes('concept') || lowerText.includes('what is') || lowerText.includes('definition')) {
    return <Pin className="w-4 h-4" />
  }
  if (lowerText.includes('why') || lowerText.includes('matter') || lowerText.includes('important')) {
    return <TrendingUp className="w-4 h-4" />
  }
  if (lowerText.includes('interlock') || lowerText.includes('integration') || lowerText.includes('connect')) {
    return <Link2 className="w-4 h-4" />
  }
  if (lowerText.includes('implement') || lowerText.includes('step') || lowerText.includes('playbook') || lowerText.includes('guide') || lowerText.includes('how')) {
    return <Book className="w-4 h-4" />
  }
  if (lowerText.includes('risk') || lowerText.includes('pitfall') || lowerText.includes('anti-pattern') || lowerText.includes('mitigation')) {
    return <AlertTriangle className="w-4 h-4" />
  }
  if (lowerText.includes('own') || lowerText.includes('responsibility') || lowerText.includes('team')) {
    return <Users className="w-4 h-4" />
  }
  if (lowerText.includes('reference') || lowerText.includes('link') || lowerText.includes('source')) {
    return <List className="w-4 h-4" />
  }
  if (lowerText.includes('faq') || lowerText.includes('question')) {
    return <HelpCircle className="w-4 h-4" />
  }
  if (lowerText.includes('key fact') || lowerText.includes('fact')) {
    return <Target className="w-4 h-4" />
  }
  
  // Default icon
  return <Pin className="w-4 h-4" />
}

export default function TableOfContents({ items, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Function to determine which section is in the top third of the viewport
    const updateActiveSection = () => {
      const viewportTopThird = window.innerHeight / 3
      let currentActiveId = ''
      let closestTop = Infinity

      // Check each section to see if its top edge is within the top third of the viewport
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top
          
          // Check if the section's top edge is within the top third (0 to viewportTopThird)
          if (elementTop >= 0 && elementTop <= viewportTopThird) {
            // If multiple sections are in the top third, prioritize the one closest to the top
            if (elementTop < closestTop) {
              closestTop = elementTop
              currentActiveId = item.id
            }
          }
        }
      })

      // If no section is currently in the top third, find the most recently passed section
      if (!currentActiveId) {
        let bestMatchId: string | null = null
        let bestMatchDistance: number = Infinity

        items.forEach((item) => {
          const element = document.getElementById(item.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            // If section has passed the top third line (is above it) but is still visible
            if (rect.top < viewportTopThird && rect.bottom > 0) {
              const distance = viewportTopThird - rect.top
              if (distance < bestMatchDistance) {
                bestMatchDistance = distance
                bestMatchId = item.id
              }
            }
          }
        })

        if (bestMatchId) {
          currentActiveId = bestMatchId
        }
      }

      setActiveId(currentActiveId)
    }

    // Initial check
    updateActiveSection()

    // Update on scroll with throttling for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
      <h2 className="text-lg font-serif-playfair font-semibold text-[#1f2933] mb-2">{title}</h2>
      <p className="text-xs text-[#3b4652] mb-4">On this page</p>
      <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id
            const Icon = getSectionIcon(item.text)
            
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                  ${isActive 
                    ? 'bg-[#f6f7f9] text-[#ff5722] font-medium' 
                    : 'text-[#3b4652] hover:text-[#1f2933] hover:bg-[#f6f7f9]'
                  }
                `}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(item.id)
                  if (element) {
                    const offset = 100 // Account for sticky header
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                <span className={`flex-shrink-0 ${isActive ? 'text-[#ff5722]' : 'text-[#3b4652]'}`}>
                  {Icon}
                </span>
                <span className="truncate">{item.text}</span>
              </Link>
            )
          })}
        </nav>
    </div>
  )
}

