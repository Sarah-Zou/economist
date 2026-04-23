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
    <div className={`divide-y divide-border-soft border-y border-border-soft ${className}`.trim()}>
      {items.map((item, index) => (
        <details
          key={typeof item.q === 'string' ? item.q : index}
          open={openFirst && index === 0}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 transition-colors hover:text-ink">
            <h3 className="text-[17px] font-semibold leading-[1.35] text-ink">{item.q}</h3>
            <ChevronDown
              className="h-4 w-4 flex-shrink-0 text-text-subtle transition-[transform,color] duration-200 group-open:rotate-180 group-hover:text-ink"
              aria-hidden
            />
          </summary>
          <div className="max-w-[62ch] pb-5 pr-8 text-[15px] leading-[1.8] text-text-muted">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  )
}
