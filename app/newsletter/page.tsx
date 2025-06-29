"use client";
import Seo from '@/components/Seo'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Define the Post type for the Substack feed
interface Post {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string | null;
  author: string;
}

function SubstackFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://sarahzou.substack.com/feed')
      .then(res => res.json())
      .then(data => {
        if (!data.items) throw new Error('No posts found');
        const posts: Post[] = data.items.slice(0, 6).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          excerpt: item.description,
          thumbnail: item.thumbnail || null,
          author: item.author || 'Sarah Zou',
        }));
        setPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-500 mt-8">Loading latest posts…</div>;
  if (error) return <div className="text-red-500 mt-8">{error}</div>;

  return (
    <section id="substack-feed" className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      {posts.map((post, i) => (
        <div key={i} className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-bold text-lg text-gray-900 hover:text-orange-600 mb-1 leading-snug truncate"
            >
              {post.title}
            </a>
            <div className="text-xs text-gray-500 mb-1">
              {post.author.toUpperCase()} &nbsp; {new Date(post.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
            <p className="text-gray-700 text-base leading-snug max-w-full line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-28 h-20 object-cover rounded ml-2 flex-shrink-0"
              loading="lazy"
            />
          )}
        </div>
      ))}
    </section>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Newsletter | Sarah Zou"
        description="Insights and analysis on economics, SaaS, and startup metrics"
        canonical="https://sarahzou.com/newsletter"
      />
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Post List Only */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-2xl">
          <SubstackFeed />
        </div>
        {/* Right: Signup Box + Image */}
        <div className="flex flex-col items-center w-full max-w-lg mx-auto md:sticky md:top-12 h-fit">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-600 mb-4 leading-tight">Subscribe to my weekly newsletter where we deep dive into all things SaaS strategies.</h2>
            <p className="text-lg text-center text-gray-700 mb-6 max-w-md">
              Get original research, pricing breakdowns, and frameworks for SaaS founders, operators, and investors. No spam—just actionable insights and the occasional meme.
            </p>
            <div className="flex flex-row items-center w-full gap-6">
              <aside className="bg-white rounded-lg shadow p-8 flex flex-col items-center border border-[#f0f0f0] w-full max-w-md">
                <div className="w-full flex justify-center">
                  <iframe
                    src="https://sarahzou.substack.com/embed"
                    width="420"
                    height="320"
                    style={{ border: '1px solid #EEE', background: 'white' }}
                    frameBorder="0"
                    scrolling="no"
                    title="Substack signup"
                    className="max-w-full"
                  />
                </div>
              </aside>
              <div className="hidden md:flex flex-col items-center justify-center">
                <Image src="/assets/images/newsletter/fractional-economist-saas-startups.webp" alt="Sarah Zou headshot" width={96} height={96} className="rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 