import type { Metadata } from 'next'
import {
  generateCollectionPageJsonLd,
  generateItemListJsonLd,
  generateWebPageJsonLd,
} from '@/lib/generateJsonLd'
import { getAllCategories, getConceptBySlug } from '@/lib/mdx'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'
import CategoryCard from '@/components/wiki/CategoryCard'

export const metadata: Metadata = {
  title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
  description:
    'Evidence-based concepts covering value metrics, packaging, retention, payback, usage-based pricing, and monetization decisions for technical startups.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/wiki/pricing',
  },
  openGraph: {
    title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
    description:
      'Evidence-based concepts covering value metrics, packaging, retention, payback, usage-based pricing, and monetization decisions for technical startups.',
    url: 'https://sarahzou.com/wiki/pricing',
    siteName: 'Sarah Zou',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
    description:
      'Evidence-based pricing and monetization concepts for SaaS, APIs, AI, and technical products.',
  },
}

export default function WikiPricingPage() {
  const allCategories = getAllCategories()
  const categoryOrder = [
    'foundations',
    'value-and-customers',
    'packaging-and-bundling',
    'models-and-metering',
    'competitive-and-positioning',
    'comms-and-deals',
    'research-and-experiments',
    'economics-and-metrics',
    'governance-and-process',
    'pitfalls-and-failures',
  ]

  const categories = categoryOrder
    .map((slug) => {
      const category = allCategories.find((candidate) => candidate.slug === slug)
      if (!category) return null

      const conceptCount = category.concepts.filter(
        (concept) => concept.id && getConceptBySlug(category.slug, concept.id)
      ).length

      return {
        ...category,
        conceptCount,
        hasContent: conceptCount > 0,
      }
    })
    .filter((category): category is NonNullable<typeof category> => category !== null)

  const categoriesWithContent = categories.filter((category) => category.hasContent)
  const totalConcepts = categoriesWithContent.reduce(
    (sum, category) => sum + category.conceptCount,
    0
  )

  const itemListJsonLd = generateItemListJsonLd(
    categoriesWithContent.map((category) => ({
      name: category.title,
      url: `https://sarahzou.com/wiki/pricing/${category.slug}`,
      description: category.summary,
    }))
  )
  const webPageJsonLd = generateWebPageJsonLd({
    title: 'Pricing & Monetization Wiki',
    description:
      'An evidence-based reference library for pricing and monetization decisions in technical startups.',
    url: 'https://sarahzou.com/wiki/pricing',
    dateModified: '2026-07-20',
  })
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: 'Pricing & Monetization Wiki',
    description:
      'An evidence-based reference library for pricing and monetization decisions in technical startups.',
    url: 'https://sarahzou.com/wiki/pricing',
    dateModified: '2026-07-20',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />

      <main className="resource-editorial min-h-screen bg-page">
        <section className="border-b border-border-soft bg-surface">
          <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
            <div>
              <p className="kicker-accent">Pricing reference library</p>
              <h1 className="mt-6 max-w-[13ch] font-serif-playfair">
                Pricing &amp; Monetization Wiki
              </h1>
              <p className="mt-7 max-w-[46rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
                Evidence-based guidance for choosing the metric, packaging the offer, understanding
                customer value, and protecting the economics underneath the model.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-5">
              <div>
                <dt className="kicker-muted">Active categories</dt>
                <dd className="mt-3 font-serif-playfair text-[30px] leading-none text-ink">
                  {categoriesWithContent.length}
                </dd>
              </div>
              <div>
                <dt className="kicker-muted">Published concepts</dt>
                <dd className="mt-3 font-serif-playfair text-[30px] leading-none text-ink">
                  {totalConcepts}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section>
          <div className="section-shell py-20 sm:py-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24">
              <div>
                <p className="kicker-muted">Explore categories</p>
                <p className="mt-5 max-w-xs text-[14px] leading-[1.75] text-text-muted">
                  Start with the commercial question you are trying to answer, then move through the
                  connected concepts one decision at a time.
                </p>
              </div>
              <div>
                <div className="border-t border-border-soft">
                  {categoriesWithContent.map((category) => (
                    <CategoryCard
                      key={category.slug}
                      title={category.title}
                      slug={category.slug}
                      summary={category.summary}
                      tags={category.tags}
                      level={category.level}
                      conceptCount={category.conceptCount}
                    />
                  ))}
                </div>
                <WikiLicenseFooter />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
