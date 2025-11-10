import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'

const baseUrl = 'https://sarahzou.com'

// Helper to ensure no trailing slash
function normalizeUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Newsletter posts
  const postPages = posts.map((post) => ({
    url: normalizeUrl(`/newsletter/${post.slug}`),
    lastModified: post.date || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return postPages
}

