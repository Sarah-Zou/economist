import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sarahzou.com'
  const currentDate = new Date().toISOString()

  // Static pages with priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/consulting`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cheat-sheets`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wiki/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Consulting service pages
  const consultingServices = [
    {
      url: `${baseUrl}/consulting/services/pricing-monetization-sprint`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consulting/services/metrics-experimentation-sprint`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/consulting/services/on-call-economist-retainer`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]

  // Wiki pricing categories
  const wikiCategories = [
    'foundations',
    'value-and-customers',
    'price-architecture',
    'packaging-and-bundling',
    'models-and-metering',
    'behavioral-psychology',
    'competitive-and-positioning',
    'research-and-metrics',
    'comms-and-deals',
    'governance-and-process',
    'intl-channels-billing',
    'pitfalls-and-failures',
  ].map((category) => ({
    url: `${baseUrl}/wiki/pricing/${category}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Newsletter posts
  const newsletterPosts = [
    {
      url: `${baseUrl}/newsletter/why-fractional-economist`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsletter/saas-benchmark-data-sources-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Download pages
  const downloadPages = [
    'metrics-storytelling-one-pager',
    'saas-benchmark-source-navigator',
    'stage-smart-metrics-benchmarks-2025-q2',
    'monetization-roadmap',
  ].map((slug) => ({
    url: `${baseUrl}/downloads/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...consultingServices,
    ...wikiCategories,
    ...newsletterPosts,
    ...downloadPages,
  ]
}

