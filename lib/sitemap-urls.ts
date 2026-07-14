import type { MetadataRoute } from 'next'
import { getIndexablePosts } from '@/lib/api'
import {
  getAllCategories,
  getConceptBySlug,
  getPublishedConceptIdsForCategory,
  getWikiRemediationMap,
} from '@/lib/mdx'
import { FUNDRAISING_WIKI_AREA, getWikiConceptPagePath } from '@/lib/wiki-areas'

export const SITE_BASE_URL = 'https://sarahzou.com'

export function normalizeSitemapUrl(path: string): string {
  if (!path || path === '/') {
    return SITE_BASE_URL
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_BASE_URL}${cleanPath}`
}

type SitemapEntry = MetadataRoute.Sitemap[number]

function addEntry(
  entriesByUrl: Map<string, SitemapEntry>,
  entry: SitemapEntry
): void {
  entriesByUrl.set(entry.url, entry)
}

/** All indexable URLs for sitemap.xml (single source of truth). */
export function getAllSitemapEntries(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  const entriesByUrl = new Map<string, SitemapEntry>()
  const { redirects } = getWikiRemediationMap()
  const redirectSources = new Set(Array.from(redirects.keys()))

  const corePages: Array<{
    path: string
    changeFrequency: SitemapEntry['changeFrequency']
    priority: number
  }> = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/consulting', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/diagnostic-note', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/consulting/services/pricing-monetization-sprint', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/consulting/services/metrics-experimentation-sprint', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/consulting/services/on-call-economist-retainer', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/book', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/newsletter', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/cheat-sheets', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/free-tools', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/free-tools/pricing-model-matchmaker', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/wiki', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/wiki/pricing', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/fundraising', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  ]

  for (const page of corePages) {
    addEntry(entriesByUrl, {
      url: normalizeSitemapUrl(page.path),
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  }

  for (const post of getIndexablePosts()) {
    addEntry(entriesByUrl, {
      url: normalizeSitemapUrl(`/newsletter/${post.slug}`),
      lastModified: post.date || currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  const newsletterPosts = getIndexablePosts()
  const newsletterTotalPages = Math.max(1, Math.ceil(newsletterPosts.length / 10))
  for (let page = 2; page <= newsletterTotalPages; page += 1) {
    addEntry(entriesByUrl, {
      url: normalizeSitemapUrl(`/newsletter/page/${page}`),
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  }

  for (const category of getAllCategories()) {
    const categoryPath = `/wiki/pricing/${category.slug}`
    if (redirectSources.has(categoryPath)) {
      continue
    }

    const conceptIds = getPublishedConceptIdsForCategory(category.slug)
    if (conceptIds.length === 0) {
      continue
    }

    addEntry(entriesByUrl, {
      url: normalizeSitemapUrl(categoryPath),
      lastModified: category.updated || currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    for (const conceptId of conceptIds) {
      const conceptPath = `/wiki/pricing/${category.slug}/${conceptId}`
      if (redirectSources.has(conceptPath)) {
        continue
      }

      const conceptData = getConceptBySlug(category.slug, conceptId)
      if (!conceptData) {
        continue
      }

      addEntry(entriesByUrl, {
        url: normalizeSitemapUrl(conceptPath),
        lastModified: conceptData.lastUpdated || category.updated || currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  const fundraisingCategory = getAllCategories({ includeNonPublished: true }).find(
    (category) => category.slug === FUNDRAISING_WIKI_AREA.categorySlug
  )
  if (fundraisingCategory) {
    const fundraisingConceptIds = [
      FUNDRAISING_WIKI_AREA.pillarConceptId,
      ...fundraisingCategory.concepts.map((concept) => concept.id).filter(Boolean),
    ] as string[]

    for (const conceptId of Array.from(new Set(fundraisingConceptIds))) {
      const conceptPath = getWikiConceptPagePath(
        FUNDRAISING_WIKI_AREA,
        FUNDRAISING_WIKI_AREA.categorySlug,
        conceptId
      )
      if (redirectSources.has(conceptPath)) {
        continue
      }

      const conceptData = getConceptBySlug(FUNDRAISING_WIKI_AREA.categorySlug, conceptId, {
        includeNonPublished: true,
      })
      if (!conceptData || conceptData.status !== 'published') {
        continue
      }

      addEntry(entriesByUrl, {
        url: normalizeSitemapUrl(conceptPath),
        lastModified: conceptData.lastUpdated || fundraisingCategory.updated || currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return Array.from(entriesByUrl.values())
}
