import { getAllPosts } from '@/lib/api'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import Seo from '@/components/Seo'

export default function NewsletterPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Newsletter | Sarah Zou"
        description="Insights and analysis on economics, SaaS, and startup metrics"
        canonical="https://sarahzou.com/newsletter"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-16 items-start">
        {/* Left: Recent Issues */}
        <div className="w-full lg:w-[60%] space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col md:flex-row gap-8 items-stretch md:items-start">
              <div className="relative w-[120px] h-full min-h-[90px] rounded-lg overflow-hidden flex-shrink-0 flex items-stretch">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  <Link href={`/newsletter/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <p className="text-gray-600 mb-0">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
        {/* Right: Subscribe Callout */}
        <aside className="bg-white rounded-lg shadow-lg p-10 flex flex-col items-center border border-[#f0f0f0] w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-32">
          <h2 className="font-serif-playfair text-2xl md:text-3xl font-bold text-center mb-4 text-[#ff5722]">Subscribe to my weekly newsletter</h2>
          <p className="text-center text-[#222] mb-6 text-lg">
            I share practical advice and strategic insights on pricing, SaaS metrics, and investor communication. Sign up if you want:
          </p>
          <ul className="mb-6 text-[#222] text-base list-disc pl-6">
            <li>Real-world SaaS growth strategies</li>
            <li>Clear, actionable advice</li>
            <li>Fresh insights from the AI-SaaS Market Index</li>
          </ul>
          <p className="text-center text-[#222] font-semibold mb-6">Don't miss out.</p>
          <div className="w-full">
            <iframe 
              src="https://embeds.beehiiv.com/0d286f02-6dd7-43ae-ace7-e00771e5df79?slim=true" 
              data-test-id="beehiiv-embed" 
              height="52" 
              frameBorder="0" 
              scrolling="no" 
              title="Newsletter signup form"
              style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent' }}
              className="w-full"
            />
          </div>
        </aside>
      </div>
    </div>
  )
} 