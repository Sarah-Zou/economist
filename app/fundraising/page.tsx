import type { Metadata } from 'next'
import {
  generateCollectionPageJsonLd,
  generateItemListJsonLd,
  generateWebPageJsonLd,
} from '@/lib/generateJsonLd'
import { getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import { FUNDRAISING_WIKI_AREA } from '@/lib/wiki-areas'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'
import {
  WikiHubHero,
  WikiHubIndexSection,
  WikiHubRow,
  WikiHubShell,
} from '@/components/wiki/WikiHubPrimitives'

export const metadata: Metadata = {
  title: 'Startup Fundraising Wiki | Sarah Zou',
  description:
    'Evidence-based guides to startup funding, round sizing, dilution, and financing decisions.',
  alternates: { canonical: 'https://sarahzou.com/fundraising' },
  openGraph: {
    title: 'Startup Fundraising Wiki | Sarah Zou',
    description:
      'Evidence-based guides to startup funding, round sizing, dilution, and financing decisions.',
    url: 'https://sarahzou.com/fundraising',
    siteName: 'Sarah Zou',
    type: 'website',
  },
}

const START_HERE = [
  'how-startup-funding-works',
  'pre-seed-seed-series-a',
  'startup-valuation-methods',
  'dilution-cap-tables',
]

const FUNDRAISING_TRACKS = [
  {
    title: 'Choose the funding path',
    description: 'Understand the financing landscape and what changes from one round to the next.',
    slugs: ['how-startup-funding-works', 'pre-seed-seed-series-a'],
  },
  {
    title: 'Price the round and choose the instrument',
    description: 'Connect valuation logic to the mechanics of SAFEs, notes, and priced equity.',
    slugs: ['startup-valuation-methods', 'safe-notes', 'convertible-notes'],
  },
  {
    title: 'Model ownership, control, and exit outcomes',
    description:
      'See how dilution, negotiated rights, and payout priority change founder outcomes.',
    slugs: ['dilution-cap-tables', 'term-sheets', 'liquidation-preferences'],
  },
]

export default function FundraisingHubPage() {
  const category = getCategoryBySlug(FUNDRAISING_WIKI_AREA.categorySlug, {
    includeNonPublished: true,
  })
  const concepts = (category?.concepts ?? [])
    .filter((concept) => concept.id)
    .map((concept) => {
      const content = getConceptBySlug(FUNDRAISING_WIKI_AREA.categorySlug, concept.id!, {
        includeNonPublished: true,
      })

      if (!content || content.status !== 'published') return null

      return {
        id: concept.id!,
        title: content.title,
        summary: content.oneLiner || category?.summary || '',
        readingTime: content.readingTime,
        lastUpdated: content.lastUpdated,
      }
    })
    .filter((concept): concept is NonNullable<typeof concept> => concept !== null)

  const conceptsBySlug = new Map(concepts.map((concept) => [concept.id, concept]))
  const dateModified =
    concepts
      .map((concept) => concept.lastUpdated)
      .filter((date): date is string => Boolean(date))
      .sort()
      .at(-1) || '2026-07-21'

  const itemListJsonLd = generateItemListJsonLd(
    concepts.map((concept) => ({
      name: concept.title,
      url: `https://sarahzou.com/fundraising/${concept.id}`,
      description: concept.summary,
    }))
  )
  const description =
    'Practical guidance for choosing capital, sizing a round, and understanding the dilution and control trade-offs behind startup funding.'
  const webPageJsonLd = generateWebPageJsonLd({
    title: 'Startup Fundraising Wiki',
    description,
    url: 'https://sarahzou.com/fundraising',
    dateModified,
  })
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: 'Startup Fundraising Wiki',
    description,
    url: 'https://sarahzou.com/fundraising',
    dateModified,
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

      <WikiHubShell>
        <WikiHubHero
          kicker="Fundraising reference library"
          title="Startup Fundraising Wiki"
          description={<p>{description}</p>}
          stats={[
            { label: 'Published guides', value: concepts.length },
            { label: 'Decision tracks', value: FUNDRAISING_TRACKS.length },
          ]}
        />

        <WikiHubIndexSection
          eyebrow="A practical sequence"
          heading="Start here"
          description={
            <p>
              Follow these four guides for the shortest path from financing basics to a usable
              ownership model.
            </p>
          }
        >
          <ol className="border-t border-border-soft">
            {START_HERE.map((slug, index) => {
              const concept = conceptsBySlug.get(slug)
              if (!concept) return null

              return (
                <li key={slug}>
                  <WikiHubRow
                    href={`/fundraising/${concept.id}`}
                    title={concept.title}
                    summary={concept.summary}
                    eyebrow={String(index + 1).padStart(2, '0')}
                    meta={concept.readingTime ? `${concept.readingTime} min read` : 'Read guide'}
                  />
                </li>
              )
            })}
          </ol>
        </WikiHubIndexSection>

        <WikiHubIndexSection
          eyebrow="The full library"
          heading="Explore by decision track"
          description={
            <p>
              Start with the financing question you need to answer, then move through the connected
              legal and economic choices.
            </p>
          }
          surface
        >
          <div className="border-t border-border">
            {FUNDRAISING_TRACKS.map((track, trackIndex) => (
              <section
                key={track.title}
                className="grid gap-8 border-b border-border-soft py-10 lg:grid-cols-[0.42fr_1.58fr] lg:gap-12"
              >
                <div>
                  <p className="kicker-accent">Track {String(trackIndex + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-serif-playfair text-[25px] font-medium text-ink">
                    {track.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-text-muted">
                    {track.description}
                  </p>
                </div>
                <div className="border-t border-border-soft">
                  {track.slugs.map((slug) => {
                    const concept = conceptsBySlug.get(slug)
                    if (!concept) return null

                    return (
                      <WikiHubRow
                        key={slug}
                        href={`/fundraising/${concept.id}`}
                        title={concept.title}
                        summary={concept.summary}
                        meta={
                          concept.readingTime ? `${concept.readingTime} min read` : 'Read guide'
                        }
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
          <WikiLicenseFooter />
        </WikiHubIndexSection>
      </WikiHubShell>
    </>
  )
}
