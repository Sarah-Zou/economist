import { Metadata } from 'next';
import { generateItemListJsonLd, generateWebPageJsonLd } from '@/lib/generateJsonLd';
import { getAllCategories } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import CategoryCard from '@/components/wiki/CategoryCard';

export const metadata: Metadata = {
  title: 'Pricing & Monetization Wiki | Sarah Zou',
  description: 'An evidence-based encyclopedia of pricing & monetization concepts for tech startups—definitions, applications, pitfalls, and metrics.',
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
    canonical: 'https://sarahzou.com/wiki/pricing'
  },
  openGraph: {
    title: 'Pricing & Monetization Wiki',
    description: 'An evidence-based encyclopedia of pricing & monetization concepts for tech startups—definitions, applications, pitfalls, and metrics.',
    url: 'https://sarahzou.com/wiki/pricing',
    siteName: 'Sarah Zou',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Wiki',
    description: 'An evidence-based encyclopedia of pricing & monetization concepts for tech startups—definitions, applications, pitfalls, and metrics.',
  },
};


export default function WikiPricingPage() {
  const allCategories = getAllCategories();
  
  // Define the specific order and images for categories
  const categoryOrder = [
    { slug: 'foundations', image: '/images/pricing.webp' },
    { slug: 'value-and-customers', image: '/images/metrics.webp' },
    { slug: 'packaging-and-bundling', image: '/images/P-1.webp' },
    { slug: 'models-and-metering', image: '/images/P-2.webp' },
    { slug: 'price-architecture', image: '/images/P-3.webp' },
    { slug: 'behavioral-psychology', image: '/images/P-4.webp' },
    { slug: 'competitive-and-positioning', image: '/images/P-5.webp' },
    { slug: 'comms-and-deals', image: '/images/P-6.webp' },
    { slug: 'research-and-metrics', image: '/images/S-1.webp' },
    { slug: 'intl-channels-billing', image: '/images/S-2.webp' },
    { slug: 'governance-and-process', image: '/images/S-3.webp' },
    { slug: 'pitfalls-and-failures', image: '/images/S-4.webp' }
  ];
  
  // Sort categories according to the specified order
  const categories = categoryOrder.map(orderItem => {
    const category = allCategories.find(cat => cat.slug === orderItem.slug);
    return category ? { ...category, image: orderItem.image } : null;
  }).filter((cat): cat is NonNullable<typeof cat> => cat !== null);
  
  const itemListJsonLd = generateItemListJsonLd(categories.map(cat => ({
    name: cat.title,
    url: `https://sarahzou.com/wiki/pricing/${cat.slug}`,
    description: cat.summary
  })));

  const webPageJsonLd = generateWebPageJsonLd({
    title: 'Pricing & Monetization Wiki',
    description: 'An evidence-based encyclopedia of pricing & monetization concepts for tech startups—definitions, applications, pitfalls, and metrics.',
    url: 'https://sarahzou.com/wiki/pricing',
    dateModified: '2025-01-02'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      
      <WikiLayout breadcrumbs={[]}>
        <div className="max-w-4xl">
          <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1f2933] mb-6">
            Pricing & Monetization Wiki
          </h1>
          
          <div className="prose prose-lg text-[#1f2933] text-base sm:text-[17px] leading-[1.65] mb-8">
            <p>
              A comprehensive, evidence-based guide to pricing and monetization strategies for tech startups. 
              From foundational concepts to advanced tactics, learn how to optimize your pricing for maximum growth.
            </p>
          </div>

          {/* Search placeholder */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pricing concepts..."
                className="w-full px-4 py-3 border border-[#e2e6ea] rounded-lg focus:ring-2 focus:ring-[#ff5722] focus:border-transparent"
                disabled
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-[#3b4652]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#3b4652] mt-2">
              Search functionality coming soon
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                title={category.title}
                slug={category.slug}
                summary={category.summary}
                tags={category.tags}
                level={category.level}
                image={category.image}
              />
            ))}
          </div>

          {/* A-Z Quick Filter placeholder */}
          <div className="border-t border-[#e2e6ea] pt-8">
            <h2 className="text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4">
              Quick Reference
            </h2>
            <div className="text-[#1f2933]">
              <p className="mb-4">
                Browse concepts alphabetically or by topic area. 
                This section will be expanded as we add more detailed content to each category.
              </p>
              <div className="bg-[#f6f7f9] rounded-lg p-4">
                <p className="text-sm text-[#3b4652]">
                  A-Z index and advanced filtering coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </WikiLayout>
    </>
  );
}
