import { ChevronDown } from 'lucide-react';

export default function EntryOfferFAQ({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={item.q}
          open={index === 0}
          className={`group rounded-2xl border bg-white shadow-sm transition-all ${
            index === 0 ? 'border-brand/60' : 'border-[#d6dce4]'
          }`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
            <h3 className="text-lg font-semibold text-[#0f172a] sm:text-xl">{item.q}</h3>
            <ChevronDown
              className="h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-[#e2e6ea] px-5 py-4 text-[15px] leading-[1.7] text-[#3b4652] sm:px-7 sm:py-5 sm:text-base sm:leading-[1.75]">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  )
}
