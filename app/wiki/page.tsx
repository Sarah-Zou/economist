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
    <main className="min-h-screen bg-page">
      <div className="section-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="kicker-accent">Reference library</p>
          <h1 className="mt-4 font-serif-playfair text-[40px] font-bold text-text sm:text-[52px]">
            Business strategy wiki
          </h1>
          <p className="mt-5 text-xl font-light leading-[1.75] text-text-muted sm:text-2xl">
            Practical, evidence-based guides for the commercial decisions that shape how a startup
            grows, earns, and funds its next stage.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Wiki areas">
          {WIKI_AREAS.map((area) => (
            <Link
              key={area.basePath}
              href={area.basePath}
              className="group flex min-h-[250px] flex-col border border-border-soft bg-white p-7 shadow-card transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated"
            >
              <p className="kicker-muted">{area.areaLabel}</p>
              <h2 className="mt-4 font-serif-playfair text-3xl font-semibold text-text">
                {area.title}
              </h2>
              <p className="mt-4 text-base leading-[1.7] text-text-muted">{area.summary}</p>
              <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-5 text-sm font-semibold text-brand-ink">
                <span>{statsByPath[area.basePath]}</span>
                <span className="inline-flex items-center gap-2">
                  Explore{' '}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        <p className="mt-10 max-w-2xl text-sm leading-[1.65] text-text-muted">
          New areas will be added here as the library expands.
        </p>

        <div className="mt-12">
          <WikiLicenseFooter />
        </div>
      </div>
    </main>
  )
}
