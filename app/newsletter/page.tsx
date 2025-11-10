import { getAllPosts } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

function ArticleList() {
  const posts = getAllPosts()

  return (
    <section className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      {posts.map((post) => (
        <div key={post.slug} className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link
              href={`/newsletter/${post.slug}`}
              className="block font-bold text-lg text-gray-900 hover:text-orange-600 mb-1 leading-snug truncate"
            >
              {post.title}
            </Link>
            <div className="text-xs text-gray-500 mb-1">
              {post.author.toUpperCase()} &nbsp; {format(new Date(post.date), 'MMM d')}
            </div>
            <p className="text-gray-700 text-base leading-snug max-w-full line-clamp-2">
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-600 mb-4 leading-tight w-full">Subscribe to my weekly newsletter where we deep dive into all things pricing and growth strategies.</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 w-full">
            <h3 className="font-bold text-lg mb-3 text-[#111]">What you'll get:</h3>
            <p className="text-gray-700 mb-2">• Pricing research, experiments, and benchmarks—1×/week</p>
            <p className="text-gray-700 mb-2">• Real case studies from tech startups</p>
            <p className="text-gray-700">• Actionable frameworks you can implement immediately</p>
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