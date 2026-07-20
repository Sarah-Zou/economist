'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
  title: string
}

export default function TableOfContents({ items, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportTopThird = window.innerHeight / 3
      let currentActiveId = ''
      let closestTop = Infinity

      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (!element) return
        const rect = element.getBoundingClientRect()

        if (rect.top >= 0 && rect.top <= viewportTopThird && rect.top < closestTop) {
          closestTop = rect.top
          currentActiveId = item.id
        }
      })

      if (!currentActiveId) {
        let bestMatchId = ''
        let bestMatchDistance = Infinity

        items.forEach((item) => {
          const element = document.getElementById(item.id)
          if (!element) return
          const rect = element.getBoundingClientRect()

          if (rect.top < viewportTopThird && rect.bottom > 0) {
            const distance = viewportTopThird - rect.top
            if (distance < bestMatchDistance) {
              bestMatchDistance = distance
              bestMatchId = item.id
            }
          }
        })

        currentActiveId = bestMatchId
      }

      setActiveId(currentActiveId)
    }

    updateActiveSection()
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        updateActiveSection()
        ticking = false
      })
      ticking = true
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="border-t border-border pt-5">
      <p className="kicker-muted">On this page</p>
      <p className="mt-3 font-serif-playfair text-[19px] leading-[1.25] text-ink">{title}</p>
      <nav className="mt-5 border-t border-border-soft">
        {items.map((item, index) => {
          const isActive = activeId === item.id

          return (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={`grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2 border-b py-3 text-[12px] leading-[1.45] transition-colors ${
                isActive
                  ? 'border-brand text-brand-ink'
                  : 'border-border-soft text-text-muted hover:text-ink'
              }`}
              onClick={(event) => {
                event.preventDefault()
                const element = document.getElementById(item.id)
                if (!element) return
                const offsetPosition =
                  element.getBoundingClientRect().top + window.pageYOffset - 100
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }}
            >
              <span className="text-[10px] tracking-[0.1em] text-text-subtle">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item.text}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
