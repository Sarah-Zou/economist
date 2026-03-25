import { MetadataRoute } from 'next'
import {
  getAllCategories,
  getConceptBySlug,
  getPublishedConceptIdsForCategory,
  getWikiRemediationMap,
} from '@/lib/mdx'

const baseUrl = 'https://sarahzou.com'

// Helper to ensure no trailing slash
function normalizeUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  const categories = getAllCategories()
  const { redirects } = getWikiRemediationMap()
  const redirectSources = new Set(Array.from(redirects.keys()))
  const entriesByUrl = new Map<string, MetadataRoute.Sitemap[number]>()

  // Wiki pricing categories
  for (const category of categories) {
    const conceptIds = getPublishedConceptIdsForCategory(category.slug)
    if (conceptIds.length === 0) {
      continue
    }

    const categoryPath = `/wiki/pricing/${category.slug}`
    if (redirectSources.has(categoryPath)) {
      continue
    }

    entriesByUrl.set(normalizeUrl(categoryPath), {
      url: normalizeUrl(categoryPath),
      lastModified: category.updated || currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })
  }

  // Wiki concept pages (only include concepts with IDs)
  // Use concept's lastUpdated date if available, otherwise fall back to category.updated
  for (const category of categories) {
    for (const conceptId of getPublishedConceptIdsForCategory(category.slug)) {
      const conceptPath = `/wiki/pricing/${category.slug}/${conceptId}`
      if (redirectSources.has(conceptPath)) {
        continue
      }

      const conceptData = getConceptBySlug(category.slug, conceptId)
      if (!conceptData) {
        continue
      }

      entriesByUrl.set(normalizeUrl(conceptPath), {
        url: normalizeUrl(conceptPath),
        lastModified: conceptData.lastUpdated || category.updated || currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  return Array.from(entriesByUrl.values())
}

