import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'

const baseUrl = 'https://sarahzou.com'
const POSTS_PER_PAGE = 10

// Helper to ensure no trailing slash
function normalizeUrl(path: string): string {
  if (!path || path === '/') {
    return baseUrl
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  // Core static pages (high priority)
  const corePages = [
    {
      url: normalizeUrl(''),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: normalizeUrl('/consulting'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: normalizeUrl('/about'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: normalizeUrl('/newsletter'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: normalizeUrl('/cheat-sheets'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: normalizeUrl('/contact'),
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: normalizeUrl('/wiki/pricing'),
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Consulting service pages
    {
      url: normalizeUrl('/consulting/services/pricing-monetization-sprint'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: normalizeUrl('/consulting/services/metrics-experimentation-sprint'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: normalizeUrl('/consulting/services/on-call-economist-retainer'),
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  const newsletterPosts = getAllPosts()
  const newsletterTotalPages = Math.ceil(newsletterPosts.length / POSTS_PER_PAGE)
  const newsletterPaginationPages = Array.from({ length: Math.max(newsletterTotalPages - 1, 0) }, (_, i) => ({
    url: normalizeUrl(`/newsletter/page/${i + 2}`),
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Keep this sitemap focused on core/static pages. Wiki and newsletter post URLs
  // are emitted in dedicated sitemaps to avoid duplicate URLs in sitemap_index.xml.
  return [...corePages, ...newsletterPaginationPages]
}
