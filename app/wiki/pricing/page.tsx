import { Metadata } from 'next';
import { generateItemListJsonLd, generateWebPageJsonLd, generateCollectionPageJsonLd } from '@/lib/generateJsonLd';
import { getAllCategories, getConceptBySlug } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter';
import CategoryCard from '@/components/wiki/CategoryCard';
import '@/app/prose.css';

export const metadata: Metadata = {
  title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
  description: 'Evidence-based concepts: value metric, packaging, NRR, payback, usage-based pricing. For Seed–Series A SaaS, APIs & AI. Definitions, applications, pitfalls, metrics.',
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
    title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
    description: 'Evidence-based concepts: value metric, packaging, NRR, payback, usage-based pricing. For Seed–Series A SaaS, APIs & AI. Definitions, applications, pitfalls, metrics.',
    url: 'https://sarahzou.com/wiki/pricing',
    siteName: 'Sarah Zou',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing & Monetization Wiki for SaaS & Tech Startups | Sarah Zou',
    description: 'Evidence-based concepts: value metric, packaging, NRR, payback, usage-based pricing. For Seed–Series A SaaS, APIs & AI. Definitions, applications, pitfalls, metrics.',
  },
};


export default function WikiPricingPage() {
  const allCategories = getAllCategories();
  
  // Define the specific order and images for categories
  const categoryOrder = [
    { slug: 'foundations', image: '/images/pricing.webp' },
    { slug: 'value-and-customers', image: '/images/metrics.webp' },
    { slug: 'packaging-and-bundling', image: '/images/p-1.webp' },
    { slug: 'models-and-metering', image: '/images/p-2.webp' },
    { slug: 'competitive-and-positioning', image: '/images/p-5.webp' },
    { slug: 'comms-and-deals', image: '/images/p-6.webp' },
    { slug: 'research-and-experiments', image: '/images/s-1.webp' },
    { slug: 'economics-and-metrics', image: '/images/s-5.webp' },
    { slug: 'governance-and-process', image: '/images/s-3.webp' },
    { slug: 'pitfalls-and-failures', image: '/images/s-4.webp' }
  ];
  
  // Sort categories according to the specified order and add concept counts
  const categories = categoryOrder.map(orderItem => {
    const category = allCategories.find(cat => cat.slug === orderItem.slug);
    if (!category) return null;
    
    const conceptCount = category.concepts.filter((c) => {
      if (!c.id) {
        return false;
      }
      // Count only published concept pages so index stats match crawlable URLs.
      return getConceptBySlug(category.slug, c.id) !== null;
    }).length;
    const hasContent = conceptCount > 0;
    
    return { 
      ...category, 
      image: orderItem.image,
      conceptCount,
      hasContent
    };
  }).filter((cat): cat is NonNullable<typeof cat> => cat !== null);
  
  // Separate categories with content from empty ones
  const categoriesWithContent = categories.filter(cat => cat.hasContent);
  const emptyCategories = categories.filter(cat => !cat.hasContent);
  
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

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: 'Pricing & Monetization Wiki',
    description: 'An evidence-based encyclopedia of pricing & monetization concepts for tech startups—definitions, applications, pitfalls, and metrics.',
    url: 'https://sarahzou.com/wiki/pricing',
    dateModified: '2025-01-02',
  });

  const totalConcepts = categories.reduce((sum, cat) => sum + cat.conceptCount, 0);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      
      <WikiLayout breadcrumbs={[]} showAreasFooter={false}>
        <div className="w-full">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="font-serif-playfair text-[40px] sm:text-[48px] font-bold text-[#1f2933] mb-4">
              Pricing & Monetization Wiki
            </h1>
            
            <div className="prose prose-lg text-[#1f2933] text-base sm:text-[17px] leading-[1.65] mb-6">
              <p className="text-xl sm:text-2xl text-[#3b4652] font-light">
                A comprehensive, evidence-based guide to pricing and monetization strategies for tech startups. 
                From foundational concepts to advanced tactics, learn how to optimize your pricing for maximum growth.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="bg-white rounded-lg px-6 py-4 border border-[#e2e6ea] shadow-sm hover:border-brand-ink transition-colors">
                <div className="text-2xl font-bold text-brand-ink">{categoriesWithContent.length}</div>
                <div className="text-sm text-[#3b4652]">Active Categories</div>
              </div>
              <div className="bg-white rounded-lg px-6 py-4 border border-[#e2e6ea] shadow-sm hover:border-brand-ink transition-colors">
                <div className="text-2xl font-bold text-brand-ink">{totalConcepts}</div>
                <div className="text-sm text-[#3b4652]">Concepts Available</div>
              </div>
            </div>
          </div>

          {/* Search placeholder */}
          <div className="mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pricing concepts..."
                className="w-full px-4 py-3 border border-[#e2e6ea] rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent bg-white hover:border-brand-ink transition-colors"
                disabled
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-[#3b4652]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#3b4652] mt-2">
              Search functionality coming soon
            </p>
          </div>

          {/* Category Grid - Active Categories */}
          {categoriesWithContent.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-brand"></div>
                <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933]">
                  Explore Categories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriesWithContent.map((category) => (
                  <div key={category.slug} className="relative">
                    <CategoryCard
                      title={category.title}
                      slug={category.slug}
                      summary={category.summary}
                      tags={category.tags}
                      level={category.level}
                      image={category.image}
                    />
                    {category.conceptCount > 0 && (
                      <div className="absolute top-3 right-3 bg-brand-ink text-brand-on text-xs font-semibold px-2 py-1 rounded-full">
                        {category.conceptCount} {category.conceptCount === 1 ? 'concept' : 'concepts'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Quick Reference Section */}
          <div className="border-t border-[#e2e6ea] pt-10 mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-brand"></div>
              <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933]">
                Quick Reference
              </h2>
            </div>
            <div className="text-[#1f2933]">
              <p className="mb-4 text-base sm:text-[17px] leading-[1.65]">
                Browse concepts alphabetically or by topic area. 
                This section will be expanded as we add more detailed content to each category.
              </p>
              <div className="bg-[#f6f7f9] rounded-lg p-6 border border-[#e2e6ea] hover:border-brand-ink transition-colors">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm text-[#3b4652] font-medium">
                    A-Z index and advanced filtering coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* License Footer */}
          <div className="mt-12">
            <WikiLicenseFooter />
          </div>
        </div>
      </WikiLayout>
    </>
  );
}
