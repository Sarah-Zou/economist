import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import { FUNDRAISING_WIKI_AREA } from '@/lib/wiki-areas'
import WikiLayout from '@/components/wiki/WikiLayout'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'

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
      return content
        ? {
            id: concept.id!,
            title: content.title,
            summary: content.oneLiner || category?.summary || '',
            readingTime: content.readingTime,
          }
        : null
    })
    .filter((concept): concept is NonNullable<typeof concept> => concept !== null)

  return (
    <WikiLayout breadcrumbs={[]} showAreasFooter={false}>
      <div className="w-full">
        <div className="mb-14">
          <p className="kicker-accent">Reference library</p>
          <h1 className="mt-4 mb-4 font-serif-playfair">
            Startup Fundraising Wiki
          </h1>
          <div className="prose prose-lg mb-6 text-base text-text sm:text-[17px] leading-[1.75]">
            <p className="text-xl font-light text-text-muted sm:text-2xl">
              Practical guidance for choosing capital, sizing a round, and understanding the
              dilution and control trade-offs behind startup funding.
            </p>
          </div>
          <p className="meta-note">Start with a guide, then build your financing plan one decision at a time.</p>
          <div className="mt-8 flex flex-wrap gap-10 border-t border-border-soft pt-5">
            <div>
              <div className="text-2xl font-bold text-brand-ink">{concepts.length}</div>
              <div className="text-[12px] uppercase tracking-[0.12em] text-text-subtle">
                Guides Available
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-px bg-brand" />
            <h2 className="font-serif-playfair">
              Explore Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concepts.map((concept) => (
              <Link
                key={concept.id}
                href={`/fundraising/${concept.id}`}
                className="group flex min-h-[220px] flex-col border border-border-soft bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated"
              >
                <h3 className="font-serif-playfair text-2xl font-semibold text-text">{concept.title}</h3>
                <p className="mt-4 text-base leading-[1.7] text-text-muted">{concept.summary}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border-soft pt-5 text-sm font-semibold text-brand-ink">
                  <span>{concept.readingTime ? `${concept.readingTime} min read` : 'Read guide'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <WikiLicenseFooter />
        </div>
      </div>
    </WikiLayout>
  )
}
