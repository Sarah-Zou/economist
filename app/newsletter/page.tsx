'use client';

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

  if (loading) return null;
  if (error) return null;

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
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Post List Only */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-2xl">
          <SubstackFeed />
        </div>
        {/* Right: Signup Box */}
        <div className="flex flex-col items-center md:items-start w-full max-w-lg mx-auto md:sticky md:top-12 h-fit">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-600 mb-4 leading-tight w-full">Subscribe to my weekly newsletter where we deep dive into all things SaaS strategies.</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-6 w-full">
            <h3 className="font-bold text-lg mb-3 text-[#111]">What you'll get:</h3>
            <p className="text-gray-700 mb-2">• Pricing research, experiments, and benchmarks—1×/week</p>
            <p className="text-gray-700 mb-2">• Real case studies from SaaS companies</p>
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