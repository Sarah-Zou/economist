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
    <section className="w-full border-t border-border-soft">
      {posts.map((post) => (
        <article
          key={post.slug}
          className={`group grid gap-5 border-b border-border-soft py-8 sm:gap-8 ${
            post.image
              ? 'sm:grid-cols-[5.5rem_minmax(0,1fr)_8.5rem]'
              : 'sm:grid-cols-[5.5rem_minmax(0,1fr)]'
          }`}
        >
          <div className="pt-1">
            <p className="text-[11px] uppercase tracking-[0.13em] text-text-subtle">
              {format(new Date(post.date), 'MMM d')}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.13em] text-text-subtle">
              {format(new Date(post.date), 'yyyy')}
            </p>
          </div>
          <div className="min-w-0">
            <Link
              href={`/newsletter/${post.slug}`}
              className="block font-serif-playfair text-[24px] font-medium leading-[1.22] text-ink transition-colors group-hover:text-brand-ink sm:text-[27px]"
            >
              {post.title}
            </Link>
            <p className="mt-4 line-clamp-2 max-w-full text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
              {post.description}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.13em] text-text-subtle">
              By {post.author}
            </p>
          </div>
          {post.image && (
            <div className="relative aspect-[4/3] w-full max-w-[10rem] overflow-hidden bg-surface sm:max-w-none">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                sizes="(min-width: 640px) 136px, 160px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </article>
      ))}

      {totalPages > 1 && (
        <nav aria-label="Newsletter pagination" className="pt-8">
          <div className="flex flex-wrap items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={getNewsletterPagePath(currentPage - 1)}
                className="border-b border-border px-2 py-1.5 text-sm text-text hover:border-ink"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={getNewsletterPagePath(pageNum)}
                className={`border-b px-2 py-1.5 text-sm ${
                  pageNum === currentPage
                    ? 'border-ink text-ink'
                    : 'border-transparent text-text-muted hover:border-border hover:text-ink'
                }`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={getNewsletterPagePath(currentPage + 1)}
                className="border-b border-border px-2 py-1.5 text-sm text-text hover:border-ink"
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
