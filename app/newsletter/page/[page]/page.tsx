import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/api'
import NewsletterArticleList from '@/components/newsletter/NewsletterArticleList'
import NewsletterIndexLayout from '@/components/newsletter/NewsletterIndexLayout'
import NewsletterPaginationLinks from '@/components/newsletter/NewsletterPaginationLinks'
import {
  getNewsletterPageCanonical,
  getNewsletterPrevNextUrls,
  getNewsletterTotalPages,
  getPostsForNewsletterPage,
} from '@/lib/newsletter-pagination'

type PageProps = {
  params: { page: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const totalPages = getNewsletterTotalPages(posts.length)

  if (totalPages < 2) {
    // Static export requires at least one param for dynamic routes. Page 2 404s until
    // post count exceeds POSTS_PER_PAGE; it is omitted from the sitemap until then.
    return [{ page: '2' }]
  }

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = Number(params.page)
  const posts = getAllPosts()
  const totalPages = getNewsletterTotalPages(posts.length)

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    return { title: 'Newsletter Page Not Found' }
  }

  const canonical = getNewsletterPageCanonical(page)

  return {
    title: `Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`,
    description: `Browse page ${page} of newsletter posts on pricing research, experiments, benchmarks, and startup monetization case studies.`,
    alternates: { canonical },
    openGraph: {
      title: `Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`,
      description: `Browse page ${page} of newsletter posts on pricing and growth strategies.`,
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`,
      description: `Browse page ${page} of newsletter posts on pricing and growth strategies.`,
    },
  }
}

export default function NewsletterPaginatedPage({ params }: PageProps) {
  const page = Number(params.page)
  const posts = getAllPosts()
  const totalPages = getNewsletterTotalPages(posts.length)

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    notFound()
  }

  const pagePosts = getPostsForNewsletterPage(posts, page)
  const { prev, next } = getNewsletterPrevNextUrls(page, totalPages)

  return (
    <>
      <NewsletterPaginationLinks prev={prev} next={next} />
      <NewsletterIndexLayout>
        <NewsletterArticleList
          posts={pagePosts}
          currentPage={page}
          totalPages={totalPages}
        />
      </NewsletterIndexLayout>
    </>
  )
}
