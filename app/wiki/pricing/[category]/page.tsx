import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}


export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} | SaaS Pricing Wiki`,
    description: category.summary,
    alternates: {
      canonical: category.canonical
    },
    openGraph: {
      title: category.title,
      description: category.summary,
      url: category.canonical,
      siteName: 'Sarah Zou',
      type: 'article'
    }
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  // Define icons and images for each category
  const categoryIcons: Record<string, string> = {
    'foundations': '🏗️',
    'value-and-customers': '👥',
    'packaging-and-bundling': '📦',
    'models-and-metering': '⚖️',
    'price-architecture': '🏛️',
    'behavioral-psychology': '🧠',
    'competitive-and-positioning': '🎯',
    'comms-and-deals': '💬',
    'research-and-metrics': '📊',
    'intl-channels-billing': '🌍',
    'governance-and-process': '⚙️',
    'pitfalls-and-failures': '⚠️'
  };

  const categoryImages: Record<string, string> = {
    'foundations': '/images/pricing.webp',
    'value-and-customers': '/images/metrics.webp',
    'packaging-and-bundling': '/images/P-1.webp',
    'models-and-metering': '/images/P-2.webp',
    'price-architecture': '/images/P-3.webp',
    'behavioral-psychology': '/images/P-4.webp',
    'competitive-and-positioning': '/images/P-5.webp',
    'comms-and-deals': '/images/P-6.webp',
    'research-and-metrics': '/images/S-1.webp',
    'intl-channels-billing': '/images/S-2.webp',
    'governance-and-process': '/images/S-3.webp',
    'pitfalls-and-failures': '/images/S-4.webp'
  };

  const categoryIcon = categoryIcons[params.category] || '📚';
  const categoryImage = categoryImages[params.category] || '/images/pricing.webp';

  const breadcrumbs = [
    { name: 'Pricing', url: '/wiki/pricing' },
    { name: category.title, url: `/wiki/pricing/${category.slug}` }
  ];

  const articleJsonLd = generateArticleJsonLd({
    title: category.title,
    description: category.summary,
    url: category.canonical,
    datePublished: category.updated,
    dateModified: category.updated,
    author: 'Dr. Sarah Zou'
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <WikiLayout breadcrumbs={breadcrumbs}>
        <div className="max-w-4xl">
          {/* Hero Section with Background Image */}
          <div className="mb-8">
            <div 
              className="relative h-96 w-full rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url(${categoryImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Content positioned at mid-bottom */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
                  {category.title}
                </h1>
                <p className="text-xl text-white leading-relaxed drop-shadow-md">
                  {category.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {category.tags
                .filter(tag => !['pricing', 'saas', 'monetization'].includes(tag))
                .map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 id="whats-in-this-category">What's in this category</h2>
            <ul className="space-y-2">
              {category.concepts.map((concept, index) => (
                <li key={index} className="text-gray-700">
                  {concept}
                </li>
              ))}
            </ul>

            <h2 id="how-to-use-this">How to use this</h2>
            <p className="text-gray-700">
              This category covers the fundamental principles that should guide all pricing decisions. 
              Start here if you're new to SaaS pricing or need to establish a solid foundation before 
              diving into specific tactics. These concepts apply whether you're a startup finding 
              product-market fit or an enterprise optimizing complex pricing structures.
            </p>

            <h2 id="coming-next">Coming Next</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Detailed guides and frameworks for each concept are in development. 
                This section will include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Step-by-step implementation guides</li>
                <li>• Real-world case studies and examples</li>
                <li>• Templates and frameworks</li>
                <li>• Common pitfalls and how to avoid them</li>
                <li>• Metrics and KPIs to track success</li>
              </ul>
            </div>

            <h2 id="related-categories">Related categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.relatedCategories.map((related) => (
                <Link
                  key={related.slug}
                  href={`/wiki/pricing/${related.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </WikiLayout>
    </>
  );
}
