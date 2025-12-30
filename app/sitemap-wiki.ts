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
        // Try to get concept data to use its lastUpdated date
        const conceptData = getConceptBySlug(category.slug, concept.id!)
        const lastModified = conceptData?.lastUpdated || category.updated || currentDate
        
        return {
          url: normalizeUrl(`/wiki/pricing/${category.slug}/${concept.id}`),
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }
      })
  )

  return [...wikiPages, ...conceptPages]
}

