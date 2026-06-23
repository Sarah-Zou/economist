import { CheckCircle } from 'lucide-react'

interface TakeawayItem {
  text: string
}

interface TakeawayBoxProps {
  title?: string
  items: TakeawayItem[]
}

export default function TakeawayBox({ title = 'The short answer', items }: TakeawayBoxProps) {
  return (
    <div className="my-8 rounded-xl border border-brand/20 bg-brand-soft px-6 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-ink mb-3">
        {title}
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[16px] leading-[1.7] text-text">
            <CheckCircle className="w-4 h-4 text-brand-ink mt-0.5 flex-shrink-0" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
