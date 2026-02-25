import { MetadataRoute } from 'next'
import { getAllCategories, getConceptBySlug } from '@/lib/mdx'

const baseUrl = 'https://sarahzou.com'

// Helper to ensure no trailing slash
function normalizeUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  const categories = getAllCategories()

  // Wiki pricing categories
  const wikiPages = categories.map((category) => ({
    url: normalizeUrl(`/wiki/pricing/${category.slug}`),
    lastModified: category.updated || currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Wiki concept pages (only include concepts with IDs)
  // Use concept's lastUpdated date if available, otherwise fall back to category.updated
  const conceptPages = categories.flatMap((category) =>
    category.concepts
      .filter((concept) => concept.id)
      .map((concept) => {
        const conceptId = concept.id as string
        // Only include concept URLs that have a published markdown file.
        const conceptData = getConceptBySlug(category.slug, conceptId)
        if (!conceptData) {
          return null
        }

        return {
          url: normalizeUrl(`/wiki/pricing/${category.slug}/${conceptId}`),
          lastModified: conceptData.lastUpdated || category.updated || currentDate,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
  )

  return [...wikiPages, ...conceptPages]
}

