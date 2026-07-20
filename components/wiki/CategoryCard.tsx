import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  title: string
  slug: string
  summary: string
  tags: string[]
  level: string
  icon?: string
  image?: string
  conceptCount?: number
}

export default function CategoryCard({
  title,
  slug,
  summary,
  level,
  conceptCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/wiki/pricing/${slug}`}
      className="group grid gap-5 border-b border-border-soft py-9 no-underline lg:grid-cols-[minmax(0,0.9fr)_minmax(15rem,1.1fr)_auto] lg:items-start lg:gap-10"
    >
      <div>
        <p className="kicker-muted">{level}</p>
        <h3 className="mt-3 font-serif-playfair text-[26px] font-medium leading-[1.2] text-ink">
          {title}
        </h3>
        {typeof conceptCount === 'number' && (
          <p className="mt-3 text-[11px] uppercase tracking-[0.13em] text-brand-ink">
            {conceptCount} {conceptCount === 1 ? 'concept' : 'concepts'}
          </p>
        )}
      </div>
      <p className="text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">{summary}</p>
      <ArrowRight
        className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block"
        aria-hidden
      />
    </Link>
  )
}
