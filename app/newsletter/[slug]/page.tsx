import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import CiteThisPage from '@/components/wiki/CiteThisPage'
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import '@/app/prose.css'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const canonicalUrl = post.canonical || `https://sarahzou.com/newsletter/${post.slug}`
  
  return {
    title: post.title,
    description: post.description,
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
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

// Plain <img> is intentional: static export disables next/image optimiser and
// markdown image src/dimensions are only known at runtime.
function MarkdownImg({ src, alt }: { src?: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" width={1200} height={800} className="my-8 h-auto w-full rounded-lg shadow-card" />
}

export default function NewsletterPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const canonicalUrl = post.canonical || `https://sarahzou.com/newsletter/${post.slug}`
  const content = post.content.replace(/^# .*$/m, '').trim()

  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.description,
    url: canonicalUrl,
    image: `https://sarahzou.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
  })

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Newsletter', url: '/newsletter' },
    { name: post.title, url: `/newsletter/${post.slug}` },
  ])

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-text mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-text-muted">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12 text-text text-base sm:text-[17px] leading-[1.65]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ img: MarkdownImg }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <CiteThisPage
          canonicalUrl={canonicalUrl}
          title={post.title}
          publicationTitle="Sarah Zou Newsletter"
          lastUpdated={post.date}
          slug={post.slug}
        />

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/book"
            rel="noopener noreferrer"
            className="inline-block bg-brand text-brand-on px-8 py-4 rounded-lg text-[19px] font-bold leading-[1.2] shadow hover:bg-brand transition"
          >
            Book a Free Consultation
          </Link>
        </div>
      </article>
    </div>
  )
}
