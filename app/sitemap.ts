import { MetadataRoute } from 'next'

const baseUrl = 'https://sarahzou.com'

// Helper to ensure no trailing slash
function normalizeUrl(path: string): string {
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

  return corePages
}
