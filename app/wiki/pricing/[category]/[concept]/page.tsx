import { Metadata } from 'next'
import { getAllCategories, getConceptBySlug } from '@/lib/mdx'
import { PRICING_WIKI_AREA } from '@/lib/wiki-areas'
import WikiConceptArticlePage, {
  generateWikiConceptMetadata,
} from '@/components/wiki/WikiConceptArticlePage'

interface ConceptPageProps {
  params: {
    category: string
    concept: string
  }
}

export async function generateStaticParams() {
  try {
    const categories = getAllCategories()
    const params: Array<{ category: string; concept: string }> = []

    categories.forEach((category) => {
      if (
        !category.slug ||
        category.slug.includes('http://') ||
        category.slug.includes('https://') ||
        category.slug.includes('://') ||
        category.slug.startsWith('/')
      ) {
        console.warn(`Invalid category slug detected: ${category.slug}, skipping...`)
        return
      }

      category.concepts.forEach((concept) => {
        if (concept.id) {
          if (
            concept.id.includes('http://') ||
            concept.id.includes('https://') ||
            concept.id.includes('://')
          ) {
            console.warn(`Invalid concept ID detected: ${concept.id}, skipping...`)
            return
          }

          if (!getConceptBySlug(category.slug, concept.id)) {
            return
          }

          params.push({
            category: category.slug,
            concept: concept.id,
          })
        }
      })
    })

    return params
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  return generateWikiConceptMetadata({
    categorySlug: params.category,
    conceptSlug: params.concept,
    wikiArea: PRICING_WIKI_AREA,
  })
}

export default function ConceptPage({ params }: ConceptPageProps) {
  return (
    <WikiConceptArticlePage
      categorySlug={params.category}
      conceptSlug={params.concept}
      wikiArea={PRICING_WIKI_AREA}
    />
  )
}
