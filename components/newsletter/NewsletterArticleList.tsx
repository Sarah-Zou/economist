import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import type { Post } from '@/lib/api'
import { getNewsletterPagePath } from '@/lib/newsletter-pagination'

type NewsletterArticleListProps = {
  posts: Post[]
  currentPage: number
  totalPages: number
}

export default function NewsletterArticleList({
  posts,
  currentPage,
  totalPages,
}: NewsletterArticleListProps) {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="flex items-start justify-between gap-4 border-t border-border pt-5"
        >
          <div className="min-w-0 flex-1">
            <Link
              href={`/newsletter/${post.slug}`}
              className="mb-2 block font-serif-playfair text-[22px] font-semibold leading-[1.3] text-text hover:text-brand-ink"
            >
              {post.title}
            </Link>
            <div className="mb-2 text-[12px] uppercase tracking-[0.12em] text-text-subtle">
              {post.author.toUpperCase()} &nbsp; {format(new Date(post.date), 'MMM d')}
            </div>
            <p className="line-clamp-2 max-w-full text-base leading-[1.8] text-text-muted sm:text-[17px]">
              {post.description}
            </p>
          </div>
          {post.image && (
            <div className="relative ml-2 h-20 w-28 flex-shrink-0 overflow-hidden rounded-[12px] bg-white shadow-card">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
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
            {currentPage > 1 && (
              <Link
                href={getNewsletterPagePath(currentPage - 1)}
                className="rounded border border-border-subtle bg-white px-3 py-1.5 text-sm text-text hover:border-brand-ink"
              >
                Prev
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={getNewsletterPagePath(pageNum)}
                className={`rounded border px-3 py-1.5 text-sm ${
                  pageNum === currentPage
                    ? 'border-brand bg-brand-ink text-white'
                    : 'border-border-subtle bg-white text-text hover:border-brand-ink'
                }`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={getNewsletterPagePath(currentPage + 1)}
                className="rounded border border-border-subtle bg-white px-3 py-1.5 text-sm text-text hover:border-brand-ink"
              >
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </section>
  )
}
