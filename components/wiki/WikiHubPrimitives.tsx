import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface WikiHubShellProps {
  children: ReactNode
}

interface WikiHubStat {
  label: string
  value: ReactNode
}

interface WikiHubHeroProps {
  kicker: string
  title: ReactNode
  description: ReactNode
  stats: WikiHubStat[]
  titleClassName?: string
}

interface WikiHubIndexSectionProps {
  eyebrow: string
  heading?: string
  description: ReactNode
  children: ReactNode
  surface?: boolean
}

interface WikiHubRowProps {
  href: string
  title: string
  summary: string
  eyebrow?: string
  meta?: ReactNode
}

export function WikiHubShell({ children }: WikiHubShellProps) {
  return <div className="resource-editorial min-h-screen bg-page">{children}</div>
}

export function WikiHubHero({
  kicker,
  title,
  description,
  stats,
  titleClassName = 'max-w-[14ch]',
}: WikiHubHeroProps) {
  return (
    <section className="border-y border-border-soft bg-surface">
      <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
        <div>
          <p className="kicker-accent">{kicker}</p>
          <h1 className={`mt-6 font-serif-playfair ${titleClassName}`}>{title}</h1>
          <div className="mt-7 max-w-[46rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
            {description}
          </div>
        </div>

        <dl
          className={`grid gap-6 border-t border-border pt-5 ${
            stats.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="kicker-muted">{stat.label}</dt>
              <dd className="mt-3 font-serif-playfair text-[30px] leading-none text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function WikiHubIndexSection({
  eyebrow,
  heading,
  description,
  children,
  surface = false,
}: WikiHubIndexSectionProps) {
  return (
    <section className={surface ? 'border-y border-border-soft bg-surface' : undefined}>
      <div className="section-shell py-20 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24">
          <div>
            <p className="kicker-muted">{eyebrow}</p>
            {heading && <h2 className="mt-3 font-serif-playfair">{heading}</h2>}
            <div className="mt-5 max-w-xs text-[14px] leading-[1.75] text-text-muted">
              {description}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  )
}

export function WikiHubRow({ href, title, summary, eyebrow, meta }: WikiHubRowProps) {
  return (
    <Link
      href={href}
      className="group grid gap-5 border-b border-border-soft py-9 no-underline lg:grid-cols-[minmax(0,0.95fr)_minmax(15rem,1.05fr)_auto] lg:items-start lg:gap-10"
    >
      <div>
        {eyebrow && <p className="kicker-muted">{eyebrow}</p>}
        <h3
          className={`font-serif-playfair text-[26px] font-medium leading-[1.2] text-ink ${
            eyebrow ? 'mt-3' : ''
          }`}
        >
          {title}
        </h3>
        {meta && (
          <div className="mt-3 text-[11px] uppercase tracking-[0.13em] text-brand-ink">{meta}</div>
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
