import { Metadata } from 'next'
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

export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts()
  const totalPages = getNewsletterTotalPages(posts.length)
  const canonical = getNewsletterPageCanonical(1)

  return {
    title: 'Newsletter | Pricing & Monetization Insights | Sarah Zou',
    description:
      'Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups. Actionable frameworks for pricing and growth strategies.',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: { canonical },
    openGraph: {
      title: 'Newsletter | Pricing & Monetization Insights | Sarah Zou',
      description:
        'Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups. Actionable frameworks for pricing and growth strategies.',
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Newsletter | Pricing & Monetization Insights | Sarah Zou',
      description:
        'Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups.',
    },
  }
}

export default function NewsletterPage() {
  const posts = getAllPosts()
  const totalPages = getNewsletterTotalPages(posts.length)
  const pagePosts = getPostsForNewsletterPage(posts, 1)
  const { next } = getNewsletterPrevNextUrls(1, totalPages)

  return (
    <>
      <NewsletterPaginationLinks next={next} />
      <NewsletterIndexLayout>
        <NewsletterArticleList
          posts={pagePosts}
          currentPage={1}
          totalPages={totalPages}
        />
      </NewsletterIndexLayout>
    </>
  )
}
