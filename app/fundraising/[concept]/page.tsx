import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import { FUNDRAISING_WIKI_AREA } from '@/lib/wiki-areas'
import WikiConceptArticlePage, {
  generateWikiConceptMetadata,
} from '@/components/wiki/WikiConceptArticlePage'

interface FundraisingConceptPageProps {
  params: { concept: string }
}

export async function generateStaticParams() {
  const category = getCategoryBySlug(FUNDRAISING_WIKI_AREA.categorySlug, {
    includeNonPublished: true,
  })

  return (category?.concepts ?? [])
    .filter((concept) => concept.id)
    .filter((concept) =>
      getConceptBySlug(FUNDRAISING_WIKI_AREA.categorySlug, concept.id!, {
        includeNonPublished: true,
      })
    )
    .map((concept) => ({ concept: concept.id! }))
}

export async function generateMetadata({
  params,
}: FundraisingConceptPageProps): Promise<Metadata> {
  return generateWikiConceptMetadata({
    categorySlug: FUNDRAISING_WIKI_AREA.categorySlug,
    conceptSlug: params.concept,
    wikiArea: FUNDRAISING_WIKI_AREA,
  })
}

export default function FundraisingConceptPage({ params }: FundraisingConceptPageProps) {
  if (
    !getConceptBySlug(FUNDRAISING_WIKI_AREA.categorySlug, params.concept, {
      includeNonPublished: true,
    })
  ) {
    notFound()
  }

  return (
    <WikiConceptArticlePage
      categorySlug={FUNDRAISING_WIKI_AREA.categorySlug}
      conceptSlug={params.concept}
      wikiArea={FUNDRAISING_WIKI_AREA}
    />
  )
}
