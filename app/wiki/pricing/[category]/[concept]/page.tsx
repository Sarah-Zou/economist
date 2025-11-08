import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategories } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import Link from 'next/link';

interface ConceptPageProps {
  params: {
    category: string;
    concept: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: Array<{ category: string; concept: string }> = [];
  
  categories.forEach(category => {
    category.concepts.forEach(concept => {
      if (concept.id) {
        params.push({
          category: category.slug,
          concept: concept.id
        });
      }
    });
  });
  
  return params;
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Concept Not Found',
    };
  }

  const concept = category.concepts.find(c => c.id === params.concept);
  
  if (!concept) {
    return {
      title: 'Concept Not Found',
    };
  }

  const conceptName = concept.text.split(':')[0].trim();
  const description = concept.text.includes(':') 
    ? concept.text.split(':').slice(1).join(':').trim()
    : `Learn about ${conceptName} in the context of ${category.title}`;

  return {
    title: `${conceptName} | ${category.title} | Pricing Wiki`,
    description,
    alternates: {
      canonical: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`
    },
    openGraph: {
      title: `${conceptName} | ${category.title}`,
      description,
      url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
      siteName: 'Sarah Zou',
      type: 'article'
    }
  };
}

export default function ConceptPage({ params }: ConceptPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const concept = category.concepts.find(c => c.id === params.concept);
  
  if (!concept) {
    notFound();
  }

  const conceptName = concept.text.split(':')[0].trim();
  const description = concept.text.includes(':') 
    ? concept.text.split(':').slice(1).join(':').trim()
    : '';

  const breadcrumbs = [
    { name: 'Pricing', url: '/wiki/pricing' },
    { name: category.title, url: `/wiki/pricing/${category.slug}` },
    { name: conceptName, url: `/wiki/pricing/${params.category}/${params.concept}` }
  ];

  const articleJsonLd = generateArticleJsonLd({
    title: conceptName,
    description: description || `Learn about ${conceptName} in the context of ${category.title}`,
    url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
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
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <Link 
                href={`/wiki/pricing/${category.slug}`}
                className="text-[#ff5722] hover:underline text-sm font-medium"
              >
                ← Back to {category.title}
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {conceptName}
            </h1>
            {description && (
              <p className="text-xl text-gray-700 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Category Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Category:</span>{' '}
              <Link 
                href={`/wiki/pricing/${category.slug}`}
                className="text-[#ff5722] hover:underline"
              >
                {category.title}
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              {category.summary}
            </p>
          </div>

          {/* Content Placeholder */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Content Coming Soon
              </h3>
              <p className="text-yellow-800">
                Detailed information about <strong>{conceptName}</strong> is currently being developed. 
                This page will include step-by-step guides, real-world examples, and practical applications.
              </p>
            </div>

            <h2>Related Concepts</h2>
            <p className="text-gray-700 mb-4">
              Other concepts in this category:
            </p>
            <ul className="space-y-2">
              {category.concepts
                .filter(c => c.id !== params.concept)
                .map((relatedConcept, index) => {
                  const relatedName = relatedConcept.text.split(':')[0].trim();
                  return (
                    <li key={index}>
                      <Link
                        href={relatedConcept.id 
                          ? `/wiki/pricing/${params.category}/${relatedConcept.id}`
                          : `/wiki/pricing/${params.category}#${relatedConcept.id || 'concept'}`
                        }
                        className="text-[#ff5722] hover:underline"
                      >
                        {relatedName}
                      </Link>
                      {relatedConcept.text.includes(':') && (
                        <span className="text-gray-600 text-sm ml-2">
                          - {relatedConcept.text.split(':').slice(1).join(':').trim()}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </WikiLayout>
    </>
  );
}

