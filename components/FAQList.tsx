import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export type FAQItem = { q: ReactNode; a: ReactNode }

type Props = {
  items: FAQItem[]
  openFirst?: boolean
  className?: string
}

export default function FAQList({ items, openFirst = true, className = '' }: Props) {
  return (
    <div className={`border-t border-border-soft ${className}`.trim()}>
      {items.map((item, index) => (
        <details
          key={typeof item.q === 'string' ? item.q : index}
          open={openFirst && index === 0}
          className="group border-b border-border-soft"
        >
          <summary className="grid cursor-pointer list-none grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 py-6 transition-colors hover:text-ink sm:gap-5">
            <span className="pt-1 text-[10px] tracking-[0.12em] text-text-subtle">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-serif-playfair text-[19px] font-medium leading-[1.3] text-ink sm:text-[21px]">
              {item.q}
            </h3>
            <ChevronDown
              className="mt-1 h-4 w-4 flex-shrink-0 text-text-subtle transition-[transform,color] duration-200 group-open:rotate-180 group-hover:text-ink"
              aria-hidden
            />
          </summary>
          <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 pb-7 sm:gap-5">
            <span aria-hidden="true" />
            <div className="max-w-[72ch] pr-8 text-[15px] leading-[1.85] text-text-muted sm:text-[16px]">
              {item.a}
            </div>
          </div>
        </details>
      ))}
    </div>
  )
}
