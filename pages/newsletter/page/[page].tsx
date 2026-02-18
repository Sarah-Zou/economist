import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { format } from 'date-fns'
import { getAllPosts, Post } from '@/lib/api'

const POSTS_PER_PAGE = 10

type Props = {
  page: number
  totalPages: number
  posts: Post[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    params: { page: String(i + 2) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = Number(params?.page)
  const posts = getAllPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    return { notFound: true }
  }

  const start = (page - 1) * POSTS_PER_PAGE
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE)

  return {
    props: {
      page,
      totalPages,
      posts: pagePosts,
    },
  }
}

export default function NewsletterPagePagination({
  page,
  totalPages,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonicalUrl = `https://sarahzou.com/newsletter/page/${page}`
  const prevUrl = page === 2 ? 'https://sarahzou.com/newsletter' : `https://sarahzou.com/newsletter/page/${page - 1}`
  const nextUrl = page < totalPages ? `https://sarahzou.com/newsletter/page/${page + 1}` : null

  return (
    <>
      <Head>
        <title>{`Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`}</title>
        <meta
          name="description"
          content={`Browse page ${page} of newsletter posts on pricing research, experiments, benchmarks, and startup monetization case studies.`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`} />
        <meta
          property="og:description"
          content={`Browse page ${page} of newsletter posts on pricing and growth strategies.`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Newsletter - Page ${page} | Pricing & Monetization Insights | Sarah Zou`} />
        <meta
          name="twitter:description"
          content={`Browse page ${page} of newsletter posts on pricing and growth strategies.`}
        />
        <link rel="prev" href={prevUrl} />
        {nextUrl && <link rel="next" href={nextUrl} />}
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-start">
          <section className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            {posts.map((post) => (
              <div key={post.slug} className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/newsletter/${post.slug}`}
                    className="block font-bold text-lg text-[#1f2933] hover:text-[#ff5722] mb-1 leading-snug truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="text-xs text-[#3b4652] mb-1">
                    {post.author.toUpperCase()} &nbsp; {format(new Date(post.date), 'MMM d')}
                  </div>
                  <p className="text-[#1f2933] text-base sm:text-[17px] leading-[1.65] max-w-full line-clamp-2">
                    {post.description}
                  </p>
                </div>
                {post.image && (
                  <div className="relative w-28 h-20 flex-shrink-0 ml-2">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}

            <nav aria-label="Newsletter pagination" className="pt-4">
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={page === 2 ? '/newsletter' : `/newsletter/page/${page - 1}`}
                  className="px-3 py-1.5 rounded border text-sm bg-white text-[#1f2933] border-[#e2e6ea] hover:border-[#ff5722]"
                >
                  Prev
                </Link>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={pageNum === 1 ? '/newsletter' : `/newsletter/page/${pageNum}`}
                    className={`px-3 py-1.5 rounded border text-sm ${
                      pageNum === page
                        ? 'bg-[#ff5722] text-white border-[#ff5722]'
                        : 'bg-white text-[#1f2933] border-[#e2e6ea] hover:border-[#ff5722]'
                    }`}
                    aria-current={pageNum === page ? 'page' : undefined}
                  >
                    {pageNum}
                  </Link>
                ))}
                <Link
                  href={`/newsletter/page/${page + 1}`}
                  className={`px-3 py-1.5 rounded border text-sm ${
                    page >= totalPages
                      ? 'bg-[#f6f7f9] text-[#3b4652] border-[#e2e6ea] pointer-events-none'
                      : 'bg-white text-[#1f2933] border-[#e2e6ea] hover:border-[#ff5722]'
                  }`}
                  aria-disabled={page >= totalPages}
                >
                  Next
                </Link>
              </div>
            </nav>
          </section>
        </div>
      </div>
    </>
  )
}
