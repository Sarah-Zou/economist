import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllCategories, getConceptBySlug } from '@/lib/mdx'
import { FUNDRAISING_WIKI_AREA, PRICING_WIKI_AREA, WIKI_AREAS } from '@/lib/wiki-areas'
import { BUSINESS_MODELS_HUB, GO_TO_MARKET_HUB, UNIT_ECONOMICS_HUB } from '@/lib/wiki-hub-data'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'

export const metadata: Metadata = {
  title: 'Business Strategy Wiki | Sarah Zou',
  description:
    'Practical, evidence-based reference guides for startup pricing, monetization, and fundraising.',
  alternates: {
    canonical: 'https://sarahzou.com/wiki',
  },
  openGraph: {
    title: 'Business Strategy Wiki | Sarah Zou',
    description:
      'Practical, evidence-based reference guides for startup pricing, monetization, and fundraising.',
    url: 'https://sarahzou.com/wiki',
    siteName: 'Sarah Zou',
    type: 'website',
  },
}

export default function WikiHubPage() {
  const pricingCategories = getAllCategories()
  const pricingConceptCount = pricingCategories.reduce(
    (count, category) =>
      count +
      category.concepts.filter(
        (concept) => concept.id && getConceptBySlug(category.slug, concept.id)
      ).length,
    0
  )
  const fundraisingConceptCount = getConceptBySlug(
    FUNDRAISING_WIKI_AREA.categorySlug,
    FUNDRAISING_WIKI_AREA.pillarConceptId!,
    { includeNonPublished: true }
  )
    ? 1
    : 0

  const statsByPath: Record<string, string> = {
    [PRICING_WIKI_AREA.basePath]: `${pricingCategories.length} categories · ${pricingConceptCount} concepts`,
    [BUSINESS_MODELS_HUB.basePath]: `${BUSINESS_MODELS_HUB.calendarTopicCount} topics · ${BUSINESS_MODELS_HUB.groups.length} tracks`,
    [GO_TO_MARKET_HUB.basePath]: `${GO_TO_MARKET_HUB.calendarTopicCount} topics · ${GO_TO_MARKET_HUB.groups.length} tracks`,
    [UNIT_ECONOMICS_HUB.basePath]: `${UNIT_ECONOMICS_HUB.calendarTopicCount} topics · ${UNIT_ECONOMICS_HUB.groups.length} tracks`,
    [FUNDRAISING_WIKI_AREA.basePath]: `${fundraisingConceptCount} guide · expanding library`,
  }

  return (
    <main className="resource-editorial min-h-screen bg-page">
      <section className="border-b border-border-soft bg-surface">
        <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
          <div>
            <p className="kicker-accent">Reference library</p>
            <h1 className="mt-6 max-w-[13ch] font-serif-playfair">Business strategy wiki</h1>
            <p className="mt-7 max-w-[44rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
              Practical, evidence-based guides for the commercial decisions that shape how a startup
              grows, earns, and funds its next stage.
            </p>
          </div>
          <div className="border-t border-border pt-5">
            <p className="kicker-muted">A working reference</p>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.8] text-text-muted">
              Five connected knowledge areas, organized to move from a question to the relevant
              model, trade-off, or operating metric.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-shell py-20 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24">
            <div>
              <p className="kicker-muted">Knowledge areas</p>
              <p className="mt-5 max-w-xs text-[14px] leading-[1.75] text-text-muted">
                Begin with the decision itself, then follow the references as the commercial system
                comes into view.
              </p>
            </div>
            <div>
              <ol className="border-t border-border-soft" aria-label="Wiki areas">
                {WIKI_AREAS.map((area, index) => (
                  <li key={area.basePath}>
                    <Link
                      href={area.basePath}
                      className="group grid gap-5 border-b border-border-soft py-9 lg:grid-cols-[2.75rem_minmax(0,1fr)_minmax(13rem,0.7fr)_auto] lg:items-start lg:gap-8 lg:py-11"
                    >
                      <span className="pt-1 text-[12px] tracking-[0.14em] text-text-subtle">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="kicker-muted">{area.areaLabel}</p>
                        <h2 className="mt-3 font-serif-playfair">{area.title}</h2>
                        <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-brand-ink">
                          {statsByPath[area.basePath]}
                        </p>
                      </div>
                      <p className="text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                        {area.summary}
                      </p>
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ol>
              <p className="mt-7 max-w-2xl text-[13px] leading-[1.7] text-text-subtle">
                New areas will be added as the library expands.
              </p>
              <WikiLicenseFooter />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
