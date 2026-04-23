import { Metadata } from 'next'
import { getAllPosts } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

const POSTS_PER_PAGE = 10

export const metadata: Metadata = {
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
  alternates: {
    canonical: 'https://sarahzou.com/newsletter',
  },
  openGraph: {
    title: 'Newsletter | Pricing & Monetization Insights | Sarah Zou',
    description:
      'Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups. Actionable frameworks for pricing and growth strategies.',
    type: 'website',
    url: 'https://sarahzou.com/newsletter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsletter | Pricing & Monetization Insights | Sarah Zou',
    description:
      'Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups.',
  },
}

function ArticleList() {
  const posts = getAllPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const pagePosts = posts.slice(0, POSTS_PER_PAGE)

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      {pagePosts.map((post) => (
        <div
          key={post.slug}
          className="flex items-start justify-between gap-4 border-t border-border pt-5"
        >
          <div className="flex-1 min-w-0">
            <Link
              href={`/newsletter/${post.slug}`}
              className="mb-2 block font-serif-playfair text-[22px] font-semibold leading-[1.3] text-text hover:text-brand-ink"
            >
              {post.title}
            </Link>
            <div className="mb-2 text-[12px] uppercase tracking-[0.12em] text-text-subtle">
              {post.author.toUpperCase()} &nbsp; {format(new Date(post.date), 'MMM d')}
            </div>
            <p className="max-w-full text-text-muted text-base leading-[1.8] sm:text-[17px] line-clamp-2">
              {post.description}
            </p>
          </div>
          {post.image && (
            <div className="relative ml-2 h-20 w-28 flex-shrink-0 overflow-hidden rounded-[12px] bg-white shadow-card">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      ))}
      {totalPages > 1 && (
        <nav aria-label="Newsletter pagination" className="pt-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={pageNum === 1 ? '/newsletter' : `/newsletter/page/${pageNum}`}
                className={`px-3 py-1.5 rounded border text-sm ${
                  pageNum === 1
                    ? 'bg-brand-ink text-white border-brand'
                    : 'bg-white text-text border-border-subtle hover:border-brand-ink'
                }`}
                aria-current={pageNum === 1 ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </section>
  )
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="section-shell flex flex-col items-start gap-12 py-16 md:flex-row">
        {/* Left: Post List Only */}
        <div className="flex w-full max-w-2xl flex-1 flex-col gap-8">
          <div className="mb-2">
            <p className="kicker-accent">Newsletter</p>
            <h1 className="mt-4 font-serif-playfair text-[34px] font-semibold leading-tight text-text sm:text-[42px]">
              Weekly pricing and monetization thinking for technical founders
            </h1>
            <p className="mt-6 max-w-[38rem] text-[16px] leading-[1.9] text-text-muted sm:text-[17px]">
              Research, case studies, frameworks, and pricing judgment you can actually use.
            </p>
          </div>
          <ArticleList />
        </div>
        {/* Right: Signup Box */}
        <div className="h-fit w-full max-w-lg mx-auto md:sticky md:top-20 md:items-start">
          <div className="border-t border-border pt-6">
            <h2 className="w-full text-center text-2xl font-semibold leading-tight text-ink sm:text-[28px] md:text-left">
              Subscribe for a sharper weekly view on pricing, growth, and monetization.
            </h2>
            <div className="mb-6 mt-6 w-full">
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                What you'll get
              </h3>
              <p className="mb-2 text-base leading-[1.75] text-text sm:text-[17px]">
                • Pricing research, experiments, and benchmarks—1×/week
              </p>
              <p className="mb-2 text-base leading-[1.75] text-text sm:text-[17px]">
                • Real case studies from tech startups
              </p>
              <p className="text-base leading-[1.75] text-text sm:text-[17px]">
                • Actionable frameworks you can implement immediately
              </p>
            </div>
            <div className="flex w-full justify-center md:justify-start">
              <iframe
                src="https://sarahzou.substack.com/embed"
                width="520"
                height="380"
                style={{ border: '1px solid #EEE', background: 'white' }}
                frameBorder="0"
                scrolling="no"
                title="Substack signup"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
