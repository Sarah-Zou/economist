import type { Post } from '@/lib/api'
import { SITE_BASE_URL } from '@/lib/seo'

export const POSTS_PER_PAGE = 10

export function getNewsletterTotalPages(postCount: number): number {
  return Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
}

export function getPostsForNewsletterPage(posts: Post[], page: number): Post[] {
  const safePage = Math.max(1, page)
  const start = (safePage - 1) * POSTS_PER_PAGE
  return posts.slice(start, start + POSTS_PER_PAGE)
}

export function getNewsletterPagePath(page: number): string {
  return page <= 1 ? '/newsletter' : `/newsletter/page/${page}`
}

export function getNewsletterPageCanonical(page: number): string {
  return `${SITE_BASE_URL}${getNewsletterPagePath(page)}`
}

export function getNewsletterPrevNextUrls(page: number, totalPages: number) {
  const prev =
    page > 1 ? getNewsletterPageCanonical(page - 1) : null
  const next =
    page < totalPages ? getNewsletterPageCanonical(page + 1) : null
  return { prev, next }
}
