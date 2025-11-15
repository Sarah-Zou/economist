import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

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

export default function NewsletterPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Remove any top-level heading from the content
  const content = post.content.replace(/^# .*$/m, '').trim()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `https://sarahzou.com${post.image}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    url: `https://sarahzou.com/newsletter/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sarahzou.com/newsletter/${post.slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1f2933] mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-[#3b4652]">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12 text-[#1f2933] text-base sm:text-[17px] leading-[1.65]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="https://calendly.com/sarahxzou/free-consult-30-min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg text-lg font-bold shadow hover:bg-[#e64a19] transition"
          >
            Book a Free Consultation
          </Link>
        </div>
      </article>
    </div>
  )
} 