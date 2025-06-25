"use client";
import Seo from '@/components/Seo'
import { useEffect, useState } from 'react'

// Define the Post type for the Substack feed
interface Post {
  title: string | null | undefined;
  link: string | null | undefined;
  pubDate: string | null | undefined;
  excerpt: string | null | undefined;
  thumbnail: string | null;
}

function SubstackFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://sarahzou.substack.com/feed')
      .then(res => res.text())
      .then(str => {
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(str, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 5); // latest 5
        const posts: Post[] = items.map(item => {
          // Try to get thumbnail from <enclosure> or from <content:encoded>
          let thumbnail = null;
          const enclosure = item.querySelector('enclosure');
          if (enclosure && enclosure.getAttribute('url')) {
            thumbnail = enclosure.getAttribute('url');
          } else {
            // Try to extract first image from content:encoded
            const content = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
            const imgMatch = content.match(/<img[^>]+src=\"([^\"]+)\"/);
            if (imgMatch) thumbnail = imgMatch[1];
          }
          return {
            title: item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: item.querySelector('pubDate')?.textContent,
            excerpt: item.querySelector('description')?.textContent,
            thumbnail,
          };
        });
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading latest posts…</div>;

  return (
    <section id="substack-feed" className="space-y-8">
      {posts.map((post, i) => (
        <article key={i} className="flex gap-6 items-start">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title || 'Substack post thumbnail'}
              className="w-28 h-20 object-cover rounded"
              loading="lazy"
            />
          ) : (
            <div className="w-28 h-20 bg-gray-200 rounded" />
          )}
          <div>
            <a
              href={post.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-700 hover:underline"
            >
              {post.title}
            </a>
            <div className="text-gray-500 text-sm mb-1">
              {post.pubDate ? new Date(post.pubDate).toLocaleDateString() : ''}
            </div>
            <p
              className="text-gray-700 mb-0"
              dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
            />
          </div>
        </article>
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Headings */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Subscribe for actionable insights on SaaS & AI strategy</h1>
        <h3 className="text-lg md:text-xl text-gray-700 mb-10">Get original research, pricing breakdowns, and frameworks every week-ish.</h3>
        {/* Main grid layout */}
        <div
          className="grid gap-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 380px',
          }}
        >
          {/* Left: Substack Feed */}
          <SubstackFeed />
          {/* Right: Substack Signup */}
          <aside className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border border-[#f0f0f0] w-full max-w-sm mx-auto lg:mx-0 sticky top-24 h-fit">
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