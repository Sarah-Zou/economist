import { Metadata } from 'next'
import { getAllPosts } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: "Newsletter | Pricing & Monetization Insights | Sarah Zou",
  description: "Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups. Actionable frameworks for pricing and growth strategies.",
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
    canonical: "https://sarahzou.com/newsletter",
  },
  openGraph: {
    title: "Newsletter | Pricing & Monetization Insights | Sarah Zou",
    description: "Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups. Actionable frameworks for pricing and growth strategies.",
    type: "website",
    url: "https://sarahzou.com/newsletter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter | Pricing & Monetization Insights | Sarah Zou",
    description: "Weekly newsletter on pricing research, experiments, benchmarks, and real case studies from tech startups.",
  },
};

function ArticleList() {
  const posts = getAllPosts()

  return (
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
    </section>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Post List Only */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-2xl">
          <ArticleList />
        </div>
        {/* Right: Signup Box */}
        <div className="flex flex-col items-center md:items-start w-full max-w-lg mx-auto md:sticky md:top-12 h-fit">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-center text-[#ff5722] mb-4 leading-tight w-full">Subscribe to my weekly newsletter where we deep dive into all things pricing and growth strategies.</h2>
          <div className="bg-[#f6f7f9] rounded-lg p-6 mb-6 w-full">
            <h3 className="font-semibold text-[20px] mb-3 text-[#1f2933]">What you'll get:</h3>
            <p className="text-[#1f2933] mb-2 text-base sm:text-[17px] leading-[1.65]">• Pricing research, experiments, and benchmarks—1×/week</p>
            <p className="text-[#1f2933] mb-2 text-base sm:text-[17px] leading-[1.65]">• Real case studies from tech startups</p>
            <p className="text-[#1f2933] text-base sm:text-[17px] leading-[1.65]">• Actionable frameworks you can implement immediately</p>
          </div>
          <div className="w-full flex justify-center md:justify-start">
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
  )
} 