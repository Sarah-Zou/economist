import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import { GO_TO_MARKET_WIKI_AREA } from '@/lib/wiki-areas'
import WikiConceptArticlePage, {
  generateWikiConceptMetadata,
} from '@/components/wiki/WikiConceptArticlePage'

interface GoToMarketConceptPageProps {
  params: { concept: string }
}

export async function generateStaticParams() {
  const category = getCategoryBySlug(GO_TO_MARKET_WIKI_AREA.categorySlug, {
    includeNonPublished: true,
  })

  return (category?.concepts ?? [])
    .filter((concept) => concept.id)
    .filter((concept) =>
      getConceptBySlug(GO_TO_MARKET_WIKI_AREA.categorySlug, concept.id!, {
        includeNonPublished: true,
      })
    )
    .map((concept) => ({ concept: concept.id! }))
}

export async function generateMetadata({
  params,
}: GoToMarketConceptPageProps): Promise<Metadata> {
  return generateWikiConceptMetadata({
    categorySlug: GO_TO_MARKET_WIKI_AREA.categorySlug,
    conceptSlug: params.concept,
    wikiArea: GO_TO_MARKET_WIKI_AREA,
  })
}

export default function GoToMarketConceptPage({ params }: GoToMarketConceptPageProps) {
  if (
    !getConceptBySlug(GO_TO_MARKET_WIKI_AREA.categorySlug, params.concept, {
      includeNonPublished: true,
    })
  ) {
    notFound()
  }

  return (
    <WikiConceptArticlePage
      categorySlug={GO_TO_MARKET_WIKI_AREA.categorySlug}
      conceptSlug={params.concept}
      wikiArea={GO_TO_MARKET_WIKI_AREA}
    />
  )
}
