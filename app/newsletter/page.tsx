"use client";
import Seo from '@/components/Seo'
import { useEffect, useState } from 'react'

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
        const posts: Post[] = data.items.slice(0, 5).map((item: any) => ({
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
    <section id="substack-feed" className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {posts.map((post, i) => (
        <article
          key={i}
          className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4 hover:shadow-md transition w-full"
        >
          <div className="flex-1 pr-4 min-w-0">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-lg text-gray-900 hover:text-orange-600 mb-1 leading-snug truncate"
            >
              {post.title}
            </a>
            <div className="text-xs text-gray-500 mb-1 whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-3">
              {new Date(post.pubDate).toLocaleDateString()} • {post.author}
              {/* Placeholder icons for likes and comments */}
              <span className="flex items-center gap-1 ml-2"><span role="img" aria-label="likes">👍</span> 0</span>
              <span className="flex items-center gap-1"><span role="img" aria-label="comments">💬</span> 0</span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-2 max-w-full" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-20 h-16 object-cover rounded ml-4 border border-gray-100 flex-shrink-0"
              loading="lazy"
            />
          )}
        </article>
      ))}
    </section>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Seo
        title="Newsletter | Sarah Zou"
        description="Insights and analysis on economics, SaaS, and startup metrics"
        canonical="https://sarahzou.com/newsletter"
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Headings */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 font-serif">Subscribe for actionable insights on SaaS & AI strategy</h1>
        <h3 className="text-lg md:text-xl text-gray-700 mb-8 font-sans">Get original research, pricing breakdowns, and frameworks every week-ish.</h3>
        <div
          className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_400px] gap-12 items-start"
        >
          {/* Left: Post List Only */}
          <div className="flex flex-col gap-8 w-full max-w-xl mx-auto">
            <SubstackFeed />
          </div>
          {/* Right: Substack Signup */}
          <aside className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border border-[#f0f0f0] w-full max-w-sm mx-auto md:sticky md:top-12 h-fit">
            <h2 className="text-2xl font-extrabold text-center text-orange-600 mb-2">Subscribe to my weekly-ish newsletter</h2>
            <div className="w-full flex justify-center">
              <iframe
                src="https://sarahzou.substack.com/embed"
                width="480"
                height="320"
                style={{ border: '1px solid #EEE', background: 'white' }}
                frameBorder="0"
                scrolling="no"
                title="Substack signup"
                className="max-w-full"
              />
            </div>
          </aside>
        </div>
      </div>
      {/* Responsive grid fallback */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #__next .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
} 