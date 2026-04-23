import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export type FAQItem = { q: string; a: ReactNode }

type Props = {
  items: FAQItem[]
  openFirst?: boolean
  className?: string
}

export default function FAQList({ items, openFirst = true, className = '' }: Props) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item, index) => (
        <details
          key={typeof item.q === 'string' ? item.q : index}
          open={openFirst && index === 0}
          className="group rounded-card border border-border-subtle bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
            <h3 className="text-[17px] font-semibold text-ink">{item.q}</h3>
            <ChevronDown
              className="h-4 w-4 flex-shrink-0 text-text-subtle transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-border-soft px-6 py-5 text-[15px] leading-[1.75] text-text-muted">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  )
}
