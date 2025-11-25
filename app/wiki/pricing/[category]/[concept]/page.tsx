import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategories, getConceptBySlug } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import TableOfContents from '@/components/wiki/TableOfContents';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Zap, Info, TrendingUp, Clock, CheckCircle, DollarSign, Users, AlertCircle } from 'lucide-react';
import Image from 'next/image';

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

  // Try to get concept content for better metadata
  const conceptData = getConceptBySlug(params.category, params.concept);
  const conceptName = conceptData?.title || concept.text.split(':')[0].trim();
  const description = conceptData?.oneLiner || conceptData?.metaTitle || (concept.text.includes(':') 
    ? concept.text.split(':').slice(1).join(':').trim()
    : `Learn about ${conceptName} in the context of ${category.title}`);
  const metaTitle = conceptData?.metaTitle || `${conceptName} | ${category.title} | Pricing Wiki`;

  return {
    title: metaTitle.length > 60 ? `${conceptName} | ${category.title} | Pricing Wiki` : metaTitle,
    description,
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
      canonical: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`
    },
    openGraph: {
      title: `${conceptName} | ${category.title}`,
      description,
      url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
      siteName: 'Sarah Zou',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${conceptName} | ${category.title}`,
      description,
    },
  };
}

// Helper function to extract headings from markdown content
function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create ID from text (lowercase, replace spaces with hyphens, remove special chars)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    headings.push({ id, text, level });
  }

  return headings;
}

// Helper function to parse Snapshot section from markdown content
function parseSnapshot(content: string): { 
  beforeSnapshot: string; 
  snapshot: { 
    whatItIs?: string; 
    whyItMatters?: string; 
    whenToUse?: string; 
    keyTakeaways?: string[] 
  } | null; 
  afterSnapshot: string 
} {
  const snapshotRegex = /##\s+Snapshot\s*\(TL;DR\)\s*\n([\s\S]*?)(?=\n##|$)/;
  const match = content.match(snapshotRegex);
  
  if (!match) {
    return { beforeSnapshot: content, snapshot: null, afterSnapshot: '' };
  }

  const snapshotStartIndex = match.index!;
  const snapshotContent = match[1];
  const beforeSnapshot = content.substring(0, snapshotStartIndex).trim();
  const afterSnapshot = content.substring(snapshotStartIndex + match[0].length).trim();

  // Parse snapshot fields
  const snapshot: { whatItIs?: string; whyItMatters?: string; whenToUse?: string; keyTakeaways?: string[] } = {};
  
  // Extract "What it is:" - stop at newline followed by **Why it matters: or **When to use: or **Key Takeaways:
  const whatItIsMatch = snapshotContent.match(/\*\*What it is:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Why it matters|When to use|Key Takeaways):|$)/);
  if (whatItIsMatch) {
    snapshot.whatItIs = whatItIsMatch[1].trim();
  }

  // Extract "Why it matters:" - stop at newline followed by **When to use: or **Key Takeaways:
  const whyItMattersMatch = snapshotContent.match(/\*\*Why it matters:\*\*\s*([\s\S]*?)(?=\n\*\*(?:When to use|Key Takeaways):|$)/);
  if (whyItMattersMatch) {
    snapshot.whyItMatters = whyItMattersMatch[1].trim();
  }

  // Extract "When to use:" - stop at newline followed by **Key Takeaways:
  const whenToUseMatch = snapshotContent.match(/\*\*When to use:\*\*\s*([\s\S]*?)(?=\n\*\*Key Takeaways:|$)/);
  if (whenToUseMatch) {
    snapshot.whenToUse = whenToUseMatch[1].trim();
  }

  // Extract "Key Takeaways:"
  const keyTakeawaysMatch = snapshotContent.match(/\*\*Key Takeaways:\*\*\s*([\s\S]*?)(?=\n##|$)/);
  if (keyTakeawaysMatch) {
    const takeawaysText = keyTakeawaysMatch[1].trim();
    // Extract bullet points (lines starting with -)
    const takeaways = takeawaysText
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());
    if (takeaways.length > 0) {
      snapshot.keyTakeaways = takeaways;
    }
  }

  return { beforeSnapshot, snapshot, afterSnapshot };
}

// Helper function to parse Key Facts section from markdown content
function parseKeyFacts(content: string): { 
  beforeKeyFacts: string; 
  keyFacts: Array<{ title: string; description: string }> | null; 
  afterKeyFacts: string 
} {
  const keyFactsRegex = /##\s+Key Facts\s*\n([\s\S]*?)(?=\n##|$)/;
  const match = content.match(keyFactsRegex);
  
  if (!match) {
    return { beforeKeyFacts: content, keyFacts: null, afterKeyFacts: '' };
  }

  const keyFactsStartIndex = match.index!;
  const keyFactsContent = match[1];
  const beforeKeyFacts = content.substring(0, keyFactsStartIndex).trim();
  const afterKeyFacts = content.substring(keyFactsStartIndex + match[0].length).trim();

  // Parse bullet points (lines starting with -)
  const factLines = keyFactsContent
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').trim());

  const keyFacts: Array<{ title: string; description: string }> = [];
  
  for (const line of factLines) {
    // Split by colon - first part is title, rest is description
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const title = line.substring(0, colonIndex).trim();
      const description = line.substring(colonIndex + 1).trim();
      if (title && description) {
        keyFacts.push({ title, description });
      }
    }
  }

  return { beforeKeyFacts, keyFacts: keyFacts.length > 0 ? keyFacts : null, afterKeyFacts };
}

// Helper function to parse Metrics to monitor section from markdown content
function parseMetricsToMonitor(content: string): { 
  beforeMetrics: string; 
  metrics: Array<{ title: string; description: string }> | null; 
  afterMetrics: string 
} {
  const metricsRegex = /##\s+Metrics to monitor\s*\n([\s\S]*?)(?=\n##|$)/;
  const match = content.match(metricsRegex);
  
  if (!match) {
    return { beforeMetrics: content, metrics: null, afterMetrics: '' };
  }

  const metricsStartIndex = match.index!;
  const metricsContent = match[1];
  const beforeMetrics = content.substring(0, metricsStartIndex).trim();
  const afterMetrics = content.substring(metricsStartIndex + match[0].length).trim();

  // Parse bullet points (lines starting with -)
  const metricLines = metricsContent
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').trim());

  const metrics: Array<{ title: string; description: string }> = [];
  
  for (const line of metricLines) {
    // Extract title from **Title:** and description after colon
    const boldMatch = line.match(/\*\*([^*]+?):\*\*\s*(.+)/);
    if (boldMatch) {
      const title = boldMatch[1].trim();
      const description = boldMatch[2].trim();
      if (title && description) {
        metrics.push({ title, description });
      }
    }
  }

  return { beforeMetrics, metrics: metrics.length > 0 ? metrics : null, afterMetrics };
}

// Helper function to parse Step-by-step section from markdown content
function parseStepByStep(content: string): { 
  beforeStepByStep: string; 
  steps: Array<{ number: number; title: string; description: string }> | null; 
  beforeStepsContent: string;
  afterStepsContent: string;
  afterStepByStep: string 
} {
  const stepByStepRegex = /###\s+Step-by-step\s*\n([\s\S]*?)(?=\n##|$)/;
  const match = content.match(stepByStepRegex);
  
  if (!match) {
    return { beforeStepByStep: content, steps: null, beforeStepsContent: '', afterStepsContent: '', afterStepByStep: '' };
  }

  const stepByStepStartIndex = match.index!;
  const stepByStepContent = match[1];
  const beforeStepByStep = content.substring(0, stepByStepStartIndex).trim();
  const afterStepByStep = content.substring(stepByStepStartIndex + match[0].length).trim();

  // Find the first numbered step to extract content before it
  const firstStepMatch = stepByStepContent.match(/(\d+)\.\s+\*\*/);
  const beforeStepsContent = firstStepMatch 
    ? stepByStepContent.substring(0, firstStepMatch.index).trim()
    : '';

  // Parse numbered list items (1. **title:** description)
  // Stop at next step, blockquote (callout after blank line), or end of string
  const stepRegex = /(\d+)\.\s+\*\*([^*]+?):\*\*\s*([\s\S]+?)(?=\n\d+\.\s+\*\*|\n\n\s*>|$)/g;
  const steps: Array<{ number: number; title: string; description: string }> = [];
  let stepMatch;
  let lastStepEndIndex = 0;

  while ((stepMatch = stepRegex.exec(stepByStepContent)) !== null) {
    steps.push({
      number: parseInt(stepMatch[1], 10),
      title: stepMatch[2].trim(),
      description: stepMatch[3].trim()
    });
    lastStepEndIndex = stepMatch.index + stepMatch[0].length;
  }

  // Extract content after the last step but still within the Step-by-step section
  const afterStepsContent = lastStepEndIndex > 0
    ? stepByStepContent.substring(lastStepEndIndex).trim()
    : '';

  return { beforeStepByStep, steps: steps.length > 0 ? steps : null, beforeStepsContent, afterStepsContent, afterStepByStep };
}

// Helper function to parse FAQ section from markdown content
function parseFAQ(content: string): { beforeFAQ: string; faqItems: Array<{ question: string; answer: string }>; afterFAQ: string } {
  const faqRegex = /##\s+FAQ\s*\n([\s\S]*?)(?=\n##|$)/;
  const match = content.match(faqRegex);
  
  if (!match) {
    return { beforeFAQ: content, faqItems: [], afterFAQ: '' };
  }

  const faqStartIndex = match.index!;
  const faqContent = match[1];
  const beforeFAQ = content.substring(0, faqStartIndex).trim();
  const afterFAQ = content.substring(faqStartIndex + match[0].length).trim();

  // Parse Q/A pairs
  const qaRegex = /\*\*Q:\*\*\s*([\s\S]+?)\n\n\*\*A:\*\*\s*([\s\S]+?)(?=\n\n\*\*Q:|$)/g;
  const faqItems: Array<{ question: string; answer: string }> = [];
  let qaMatch;

  while ((qaMatch = qaRegex.exec(faqContent)) !== null) {
    faqItems.push({
      question: qaMatch[1].trim(),
      answer: qaMatch[2].trim()
    });
  }

  return { beforeFAQ, faqItems, afterFAQ };
}

// Shared ReactMarkdown components for consistent styling
const markdownComponents = {
  h2: ({ node, ...props }: any) => {
    const text = String(props.children)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    return <h2 id={id} className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4 mt-8 scroll-mt-24" {...props} />
  },
  h3: ({ node, ...props }: any) => {
    const text = String(props.children)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    return <h3 id={id} className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-2 mt-6 scroll-mt-24" {...props} />
  },
  a: ({ node, href, ...props }: any) => {
    const isInternalLink = href?.startsWith('/wiki/pricing/');
    if (isInternalLink && href) {
      return (
        <Link 
          href={href}
          className="text-[#ff5722] hover:underline font-medium"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        className="text-[#ff5722] hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="bg-white border-l-4 border-[#ff5722] pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
  ),
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto my-8">
      <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden min-w-full">
        <table className="w-full border-collapse" {...props} />
      </div>
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-[#f6f7f9]" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="text-left py-4 px-6 font-semibold text-sm text-[#1f2933] border-b-2 border-[#e5e7eb] uppercase tracking-wide first:pl-6 last:pr-6" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="py-5 px-6 text-base sm:text-[17px] text-[#1f2933] leading-[1.65] border-b border-[#e5e7eb] align-top first:pl-6 last:pr-6" {...props} />
  ),
  tbody: ({ node, ...props }: any) => (
    <tbody className="divide-y divide-[#e5e7eb]" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="hover:bg-[#f6f7f9] transition-colors duration-150 last:border-b-0" {...props} />
  ),
};

export default function ConceptPage({ params }: ConceptPageProps) {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    notFound();
  }

  const concept = category.concepts.find(c => c.id === params.concept);
  
  if (!concept) {
    notFound();
  }

  // Try to get concept content
  const conceptData = getConceptBySlug(params.category, params.concept);
  const conceptName = conceptData?.title || concept.text.split(':')[0].trim();
  const description = conceptData?.oneLiner || (concept.text.includes(':') 
    ? concept.text.split(':').slice(1).join(':').trim()
    : '');
  const hasContent = conceptData !== null;
  
  // Extract headings for table of contents (only first level - h2)
  const tocItems = hasContent && conceptData 
    ? extractHeadings(conceptData.content).filter(item => item.level === 2)
    : [];

  // Parse Snapshot section if content exists
  const { beforeSnapshot, snapshot, afterSnapshot: afterSnapshotContent } = hasContent && conceptData
    ? parseSnapshot(conceptData.content)
    : { beforeSnapshot: '', snapshot: null, afterSnapshot: '' };

  // Parse Key Facts section - parse from content after snapshot
  const contentToParseForKeyFacts = hasContent && conceptData 
    ? (afterSnapshotContent || conceptData.content)
    : '';
  const { beforeKeyFacts, keyFacts, afterKeyFacts: afterKeyFactsContent } = contentToParseForKeyFacts
    ? parseKeyFacts(contentToParseForKeyFacts)
    : { beforeKeyFacts: '', keyFacts: null, afterKeyFacts: '' };

  // Parse Step-by-step section - parse from content after key facts
  const contentToParseForStepByStep = hasContent && conceptData 
    ? (afterKeyFactsContent || afterSnapshotContent || conceptData.content)
    : '';
  const { beforeStepByStep, steps, beforeStepsContent, afterStepsContent, afterStepByStep: afterStepByStepContent } = contentToParseForStepByStep
    ? parseStepByStep(contentToParseForStepByStep)
    : { beforeStepByStep: '', steps: null, beforeStepsContent: '', afterStepsContent: '', afterStepByStep: '' };

  // Parse Metrics to monitor section - parse from content after step-by-step
  const contentToParseForMetrics = hasContent && conceptData 
    ? (afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || conceptData.content)
    : '';
  const { beforeMetrics, metrics, afterMetrics: afterMetricsContent } = contentToParseForMetrics
    ? parseMetricsToMonitor(contentToParseForMetrics)
    : { beforeMetrics: '', metrics: null, afterMetrics: '' };

  // Parse FAQ section - parse from content after metrics
  const contentToParseForFAQ = hasContent && conceptData 
    ? (afterMetricsContent || afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || conceptData.content)
    : '';
  const { beforeFAQ, faqItems, afterFAQ } = contentToParseForFAQ
    ? parseFAQ(contentToParseForFAQ)
    : { beforeFAQ: '', faqItems: [], afterFAQ: '' };

  const breadcrumbs = [
    { name: 'Pricing', url: '/wiki/pricing' },
    { name: category.title, url: `/wiki/pricing/${category.slug}` },
    { name: conceptName, url: `/wiki/pricing/${params.category}/${params.concept}` }
  ];

  const articleJsonLd = generateArticleJsonLd({
    title: conceptName,
    description: description || `Learn about ${conceptName} in the context of ${category.title}`,
    url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
    datePublished: conceptData?.lastUpdated || category.updated,
    dateModified: conceptData?.lastUpdated || category.updated,
    author: conceptData?.owner || 'Dr. Sarah Zou'
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
      
      <div className="min-h-screen bg-[#f9f6f7]">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {breadcrumbs.length > 0 && (
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-[#3b4652]">
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <Link 
                      href={crumb.url}
                      className="hover:text-[#ff5722] hover:underline"
                    >
                      {crumb.name}
                    </Link>
                  </span>
                ))}
              </nav>
            </div>
          )}

          <div className="flex gap-8">
            {/* Table of Contents Sidebar - Left side, outside content box */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <TableOfContents items={tocItems} title={conceptName} />
                </div>
              </aside>
            )}

            {/* Main content area with WikiLayout */}
            <div className="flex-1 min-w-0">
              <WikiLayout 
                breadcrumbs={[]}
                customGridRatio="9:3"
                noOuterWrapper={true}
                rightSidebarContent={
                  <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#3b4652] uppercase tracking-wide mb-2">Category</p>
                        <Link 
                          href={`/wiki/pricing/${category.slug}`}
                          className="text-sm text-[#ff5722] hover:underline font-medium"
                        >
                          {category.title}
                        </Link>
                      </div>
                      {conceptData?.lastUpdated && (
                        <div>
                          <p className="text-xs font-semibold text-[#3b4652] uppercase tracking-wide mb-2">Last Updated</p>
                          <p className="text-sm text-[#1f2933]">
                            {new Date(conceptData.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      )}
                      {conceptData?.readingTime && (
                        <div>
                          <p className="text-xs font-semibold text-[#3b4652] uppercase tracking-wide mb-2">Reading Time</p>
                          <p className="text-sm text-[#1f2933]">{conceptData.readingTime} minutes</p>
                        </div>
                      )}
                      {conceptData?.tags && conceptData.tags.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-[#3b4652] uppercase tracking-wide mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {conceptData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-[#3b4652] bg-[#f6f7f9] px-2 py-1 rounded-full border border-[#e5e7eb]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[32px] sm:text-[36px] font-serif-playfair font-bold text-[#1f2933] mb-4">
              {conceptName}
            </h1>
            {description && (
              <p className="text-lg sm:text-xl text-[#1f2933] leading-relaxed italic">
                {description}
              </p>
            )}
          </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-[#1f2933] text-base sm:text-[17px] leading-[1.65]">
                  {hasContent && conceptData ? (
                    <>
                      {/* Content before Snapshot */}
                      {beforeSnapshot && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {beforeSnapshot}
                        </ReactMarkdown>
                      )}

                      {/* Snapshot Section */}
                      {snapshot && (
                        <>
                          <h2 id="snapshot" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] scroll-mt-24 mb-4">
                            Snapshot (TL;DR)
                          </h2>
                          <div className="bg-white rounded-lg pt-4 pb-6 px-6 sm:pt-4 sm:pb-8 sm:px-8 border border-[#e5e7eb] shadow-sm mb-8">
                            <div className="space-y-3">
                              {snapshot.whatItIs && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-1">What it is</h3>
                                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    {snapshot.whatItIs}
                                  </p>
                                </div>
                              )}
                              {snapshot.whyItMatters && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-1">Why it matters</h3>
                                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    {snapshot.whyItMatters}
                                  </p>
                                </div>
                              )}
                              {snapshot.whenToUse && (
                                <div>
                                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-1">When to use</h3>
                                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    {snapshot.whenToUse}
                                  </p>
                                </div>
                              )}
                              {snapshot.keyTakeaways && snapshot.keyTakeaways.length > 0 && (
                                <div>
                                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-1.5">Key Takeaways</h3>
                                  <ul className="space-y-0.5">
                                    {snapshot.keyTakeaways.map((takeaway, index) => (
                                      <li key={index} className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-[#ff5722] mt-1.5 flex-shrink-0" />
                                        <span>
                                          <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                              strong: ({ node, ...props }) => (
                                                <strong className="font-bold text-[#1f2933]" {...props} />
                                              ),
                                            }}
                                          >
                                            {takeaway}
                                          </ReactMarkdown>
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Key Facts Section */}
                      {keyFacts && keyFacts.length > 0 && (
                        <div className="mb-8">
                          <h2 id="key-facts" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-6 scroll-mt-24">
                            Key Facts
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {keyFacts.map((fact, index) => {
                              // Choose icon based on content
                              let Icon = DollarSign;
                              if (fact.title.toLowerCase().includes('hour') || fact.title.toLowerCase().includes('time')) {
                                Icon = Clock;
                              } else if (fact.title.toLowerCase().includes('compan') || fact.title.toLowerCase().includes('%')) {
                                Icon = Users;
                              } else if (fact.title.toLowerCase().includes('profit') || fact.title.toLowerCase().includes('%')) {
                                Icon = DollarSign;
                              }

                              return (
                                <div key={index} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f6f7f9] mb-4">
                                    <Icon className="w-6 h-6 text-[#ff5722]" />
                                  </div>
                                  <h3 className="text-xl font-bold text-[#1f2933] mb-2">
                                    {fact.title}
                                  </h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => (
                                          <p className="mb-0" {...props} />
                                        ),
                                        a: ({ node, href, ...props }) => (
                                          <a
                                            href={href}
                                            className="text-[#ff5722] hover:underline font-medium"
                                            target={href?.startsWith('http') ? '_blank' : undefined}
                                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            {...props}
                                          />
                                        ),
                                      }}
                                    >
                                      {fact.description}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Content after Key Facts but before Step-by-step */}
                      {beforeStepByStep && beforeStepByStep.trim() && beforeStepByStep !== (afterKeyFactsContent || afterSnapshotContent || '') && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {beforeStepByStep}
                        </ReactMarkdown>
                      )}

                      {/* Step-by-step Section */}
                      {steps && steps.length > 0 && (
                        <div className="mb-8">
                          <h2 id="step-by-step" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-2 scroll-mt-24">
                            Step-by-step
                          </h2>
                          {/* Content above steps */}
                          {beforeStepsContent && (
                            <div className="mb-6">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ node, ...props }) => (
                                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6" {...props} />
                                  ),
                                  blockquote: ({ node, ...props }) => (
                                    <blockquote className="bg-white border-l-4 border-[#ff5722] pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
                                  ),
                                  a: ({ node, href, ...props }: any) => {
                                    const isInternalLink = href?.startsWith('/wiki/pricing/');
                                    if (isInternalLink && href) {
                                      return (
                                        <Link 
                                          href={href}
                                          className="text-[#ff5722] hover:underline font-medium"
                                          {...props}
                                        />
                                      );
                                    }
                                    return (
                                      <a
                                        href={href}
                                        className="text-[#ff5722] hover:underline"
                                        target={href?.startsWith('http') ? '_blank' : undefined}
                                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        {...props}
                                      />
                                    );
                                  },
                                  strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-[#1f2933]" {...props} />
                                  ),
                                }}
                              >
                                {beforeStepsContent}
                              </ReactMarkdown>
                            </div>
                          )}
                          <div className="relative pl-2">
                            {/* Vertical connecting line */}
                            {steps.length > 1 && (
                              <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-[#e5e7eb]"></div>
                            )}
                            
                            {/* Steps */}
                            <div className="space-y-4">
                              {steps.map((step, index) => (
                                <div key={index} className="relative flex gap-6">
                                  {/* Numbered circle */}
                                  <div className="flex-shrink-0 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-[#ff5722] flex items-center justify-center">
                                      <span className="text-white font-bold text-lg">{step.number}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-[20px] text-[#1f2933] mb-1.5">
                                      {step.title}
                                    </h3>
                                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                      {step.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Callout below steps */}
                          {afterStepsContent && afterStepsContent.trim() && (
                            <div className="mt-6">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ node, ...props }) => (
                                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />
                                  ),
                                  blockquote: ({ node, ...props }) => (
                                    <blockquote className="bg-white border-l-4 border-[#ff5722] pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
                                  ),
                                  a: ({ node, href, ...props }: any) => {
                                    const isInternalLink = href?.startsWith('/wiki/pricing/');
                                    if (isInternalLink && href) {
                                      return (
                                        <Link 
                                          href={href}
                                          className="text-[#ff5722] hover:underline font-medium"
                                          {...props}
                                        />
                                      );
                                    }
                                    return (
                                      <a
                                        href={href}
                                        className="text-[#ff5722] hover:underline"
                                        target={href?.startsWith('http') ? '_blank' : undefined}
                                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        {...props}
                                      />
                                    );
                                  },
                                  strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-[#1f2933]" {...props} />
                                  ),
                                }}
                              >
                                {afterStepsContent}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content after Step-by-step but before Metrics */}
                      {beforeMetrics && beforeMetrics.trim() && beforeMetrics !== (afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || '') && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {beforeMetrics}
                        </ReactMarkdown>
                      )}

                      {/* Metrics to monitor Section */}
                      {metrics && metrics.length > 0 && (
                        <div className="mb-8">
                          <h2 id="metrics-to-monitor" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-6 scroll-mt-24">
                            Metrics to monitor
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {metrics.map((metric, index) => {
                              // Choose icon based on content
                              let Icon = TrendingUp;
                              if (metric.title.toLowerCase().includes('price') || metric.title.toLowerCase().includes('asp') || metric.title.toLowerCase().includes('arpa')) {
                                Icon = DollarSign;
                              } else if (metric.title.toLowerCase().includes('elasticity')) {
                                Icon = TrendingUp;
                              } else if (metric.title.toLowerCase().includes('discount') || metric.title.toLowerCase().includes('realization')) {
                                Icon = AlertCircle;
                              }

                              return (
                                <div key={index} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f6f7f9] mb-4">
                                    <Icon className="w-6 h-6 text-[#ff5722]" />
                                  </div>
                                  <h3 className="text-xl font-bold text-[#1f2933] mb-2">
                                    {metric.title}
                                  </h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => (
                                          <p className="mb-0" {...props} />
                                        ),
                                        a: ({ node, href, ...props }) => (
                                          <a
                                            href={href}
                                            className="text-[#ff5722] hover:underline font-medium"
                                            target={href?.startsWith('http') ? '_blank' : undefined}
                                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            {...props}
                                          />
                                        ),
                                      }}
                                    >
                                      {metric.description}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Content after Metrics but before FAQ */}
                      {/* Only render afterMetricsContent if FAQ doesn't exist (to avoid duplication with beforeFAQ) */}
                      {faqItems.length === 0 && afterMetricsContent && afterMetricsContent.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {afterMetricsContent}
                        </ReactMarkdown>
                      )}
                      
                      {/* Content before FAQ (only if FAQ exists) */}
                      {faqItems.length > 0 && beforeFAQ && beforeFAQ.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {beforeFAQ}
                        </ReactMarkdown>
                      )}

                      {/* FAQ Section */}
                      {faqItems.length > 0 && (
                        <section className="mt-12 mb-12">
                          <h2 id="faq" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 text-center scroll-mt-24">
                            Frequently Asked Questions
                          </h2>
                          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                            {faqItems.map((item, index) => (
                              <div key={index} className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
                                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">
                                  {item.question}
                                </h3>
                                <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      p: ({ node, ...props }) => (
                                        <p className="mb-3 last:mb-0" {...props} />
                                      ),
                                      strong: ({ node, ...props }) => (
                                        <strong className="font-bold text-[#1f2933]" {...props} />
                                      ),
                                      a: ({ node, href, ...props }) => {
                                        const isInternalLink = href?.startsWith('/wiki/pricing/');
                                        if (isInternalLink && href) {
                                          return (
              <Link 
                                              href={href}
                                              className="text-[#ff5722] hover:underline font-medium"
                                              {...props}
                                            />
                                          );
                                        }
                                        return (
                                          <a
                                            href={href}
                                            className="text-[#ff5722] hover:underline"
                                            target={href?.startsWith('http') ? '_blank' : undefined}
                                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            {...props}
                                          />
                                        );
                                      },
                                    }}
                                  >
                                    {item.answer}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            ))}
          </div>
                        </section>
                      )}

                      {/* Content after FAQ */}
                      {afterFAQ && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={markdownComponents}
                        >
                          {afterFAQ}
                        </ReactMarkdown>
                      )}

                      {/* CTA Section */}
                      <div className="max-w-4xl mx-auto mt-16 mb-8">
                        <div className="bg-white rounded-lg p-8 md:p-12 border border-[#e5e7eb] shadow-lg text-center">
                          <div className="flex items-center justify-center gap-4 mb-6">
                            <Image 
                              src="/images/headshot_v2.jpg" 
                              alt="Sarah Zou headshot" 
                              width={80} 
                              height={80} 
                              className="rounded-full object-cover flex-shrink-0" 
                            />
                            <h2 className="font-serif-playfair text-2xl md:text-[28px] font-semibold text-[#1f2933]">
                              Ready to build a powerful revenue engine?
                            </h2>
                          </div>
                          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-6 max-w-2xl mx-auto">
                            Stop guessing and start growing. Let's build a monetization strategy that unlocks your startup's true potential.
                          </p>
                          <a
                            href="https://calendly.com/sarahxzou/free-consult-30-min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl"
                          >
                            Book Your Sprint
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </WikiLayout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

