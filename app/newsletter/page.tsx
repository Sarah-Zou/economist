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
    <section id="substack-feed" className="flex flex-col gap-6">
      {posts.map((post, i) => (
        <article key={i} className="flex items-center bg-white rounded-lg shadow p-4 border border-gray-100">
          <div className="flex-1 pr-4">
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-bold text-gray-900 hover:text-orange-600 leading-tight block mb-1">
              {post.title}
            </a>
            <div className="text-gray-500 text-xs mb-2 flex items-center gap-2">
              <span>{new Date(post.pubDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
          {post.thumbnail && (
            <img src={post.thumbnail} alt={post.title} className="w-24 h-16 object-cover rounded ml-2 border border-gray-200" loading="lazy" />
          )}
        </article>
      ))}
    </section>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Seo
        title="Newsletter | Sarah Zou"
        description="Insights and analysis on economics, SaaS, and startup metrics"
        canonical="https://sarahzou.com/newsletter"
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Headings */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 font-serif">Subscribe for actionable insights on SaaS & AI strategy</h1>
        <h3 className="text-lg md:text-xl text-gray-700 mb-10 font-sans">Get original research, pricing breakdowns, and frameworks every week-ish.</h3>
        {/* Main grid layout */}
        <div
          className="grid gap-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 400px',
          }}
        >
          {/* Left: Substack Feed */}
          <div className="flex flex-col gap-6">
            <SubstackFeed />
          </div>
          {/* Right: Substack Signup */}
          <aside className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border border-[#f0f0f0] w-full max-w-sm mx-auto lg:mx-0 sticky top-12 h-fit">
            <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">Subscribe to my weekly-ish newsletter</h2>
            <p className="text-center text-gray-700 mb-4 text-base">Actionable SaaS & AI strategy, pricing, and metrics in your inbox.</p>
            <iframe
              src="https://sarahzou.substack.com/embed?showPubLogo=false"
              width="100%"
              height="180"
              style={{ border: '1px solid #EEE', background: '#FFF' }}
              frameBorder="0"
              scrolling="no"
              title="Substack signup"
              className="w-full"
            />
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