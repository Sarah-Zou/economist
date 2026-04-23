import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_noStore } from 'next/cache';
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter';
import Link from 'next/link';
import Image from 'next/image';
import { Diamond, Settings, TrendingDown, Grid3x3, AlertTriangle, Lightbulb, BookOpen, Briefcase, GraduationCap, Users, Target, Zap, TrendingUp, Calculator, BarChart, DollarSign, Layers, FileText, Sparkles, ArrowRight, Package, PackageCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '@/app/prose.css';

interface CategoryPageProps {
  params: {
    category: string;
  };
}


export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs
    .filter(slug => {
      // Validate slug - must be a valid slug, not a URL
      return slug && 
             slug.length > 0 && 
             !slug.includes('http://') && 
             !slug.includes('https://') &&
             !slug.includes('://') &&
             !slug.startsWith('/');
    })
    .map((slug) => ({
      category: slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false },
    };
  }
  const canonicalUrl = `https://sarahzou.com/wiki/pricing/${category.slug}`;

  return {
    title: `${category.title} | Pricing Wiki`,
    description: category.summary,
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
      canonical: canonicalUrl
    },
    openGraph: {
      title: category.title,
      description: category.summary,
      url: canonicalUrl,
      siteName: 'Sarah Zou',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: category.title,
      description: category.summary,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // In development, opt out of route cache so content/UI changes show without restarting the server
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
  }
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
    'research-and-experiments': '🔬',
    'economics-and-metrics': '📊',
    'intl-channels-billing': '🌍',
    'governance-and-process': '⚙️',
    'pitfalls-and-failures': '⚠️'
  };

  const categoryImages: Record<string, string> = {
    'foundations': '/images/pricing.webp',
    'value-and-customers': '/images/metrics.webp',
    'packaging-and-bundling': '/images/p-1.webp',
    'models-and-metering': '/images/p-2.webp',
    'price-architecture': '/images/p-3.webp',
    'behavioral-psychology': '/images/p-4.webp',
    'competitive-and-positioning': '/images/p-5.webp',
    'comms-and-deals': '/images/p-6.webp',
    'research-and-experiments': '/images/s-1.webp',
    'economics-and-metrics': '/images/s-5.webp',
    'intl-channels-billing': '/images/s-2.webp',
    'governance-and-process': '/images/s-3.webp',
    'pitfalls-and-failures': '/images/s-4.webp'
  };

  const categoryIcon = categoryIcons[params.category] || '📚';
  const categoryImage = categoryImages[params.category] || '/images/pricing.webp';
  const canonicalUrl = `https://sarahzou.com/wiki/pricing/${category.slug}`;

  const breadcrumbs = [
    { name: 'Pricing', url: '/wiki/pricing' },
    { name: category.title, url: `/wiki/pricing/${category.slug}` }
  ];

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: category.title,
    description: category.summary,
    url: canonicalUrl,
    dateModified: category.updated,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

  // Extract the "What's in this category" section from markdown content (without the heading)
  const extractWhatsInCategorySection = (content: string): { content: string; workingNote: string } => {
    const lines = content.split('\n');
    let inWhatsInSection = false;
    const whatsInLines: string[] = [];
    let workingNote = '';
    
    for (const line of lines) {
      if (line.includes('## What\'s in this category')) {
        inWhatsInSection = true;
        continue; // Skip the heading line
      }
      if (inWhatsInSection && line.trim().startsWith('## ') && !line.includes("What's in this category")) {
        break; // Stop when we hit the next section
      }
      if (inWhatsInSection) {
        // Check if this is the working note (italic text starting with *)
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('*') && (trimmedLine.includes('currently working') || trimmedLine.includes('working on'))) {
          workingNote = trimmedLine.replace(/^\*+|\*+$/g, '').trim();
        } else if (trimmedLine.length > 0) {
          // Only add non-empty lines (skip the note line)
          whatsInLines.push(line);
        }
      }
    }
    
    return {
      content: whatsInLines.join('\n').trim(),
      workingNote: workingNote
    };
  };

  // Extract section between two ## headings
  const extractSection = (content: string, startHeading: string, endHeadings?: string[]): string => {
    const lines = content.split('\n');
    let inSection = false;
    const sectionLines: string[] = [];
    const stopAt = endHeadings || ['## '];
    
    for (const line of lines) {
      if (line.includes(startHeading)) {
        inSection = true;
        sectionLines.push(line);
        continue;
      }
      if (inSection) {
        const isStop = stopAt.some(h => line.trim().startsWith(h));
        if (isStop) break;
        sectionLines.push(line);
      }
    }
    return sectionLines.join('\n');
  };

  // Extract "How to use this" or "How startup founders can use these concepts"
  const extractHowToUseSection = (content: string): string => {
    const howToUse = extractSection(content, '## How to use this', ['## Related categories']);
    if (howToUse.trim()) return howToUse;
    return extractSection(content, '## How startup founders can use these concepts', ['## Related categories']);
  };

  // Extract insights as { title, content }[] from ## Insights section
  const extractInsights = (content: string): { title: string; content: string }[] => {
    const raw = extractSection(content, '## Insights', ['## How to use this', '## Related categories']);
    if (!raw.trim()) return [];
    const blocks = raw.replace(/^## Insights\s*\n?/, '').split(/\n### /).filter(Boolean);
    return blocks.map((block) => {
      const firstLine = block.split('\n')[0] || '';
      const title = firstLine.replace(/^#+\s*/, '').trim();
      const contentStart = block.indexOf('\n');
      const content = contentStart >= 0 ? block.slice(contentStart).trim() : '';
      return { title, content };
    }).filter((i) => i.title && i.content);
  };

  // Extract How to use cards (### blocks) for foundations
  const extractHowToUseCards = (content: string): { title: string; content: string }[] => {
    const raw = extractHowToUseSection(content);
    if (!raw.trim()) return [];
    const withoutHeader = raw.replace(/^## How to use this\s*\n?/i, '').replace(/^## How startup founders can use these concepts\s*\n?/i, '');
    const blocks = withoutHeader.split(/\n### /).filter(Boolean);
    return blocks.map((block) => {
      const firstLine = block.split('\n')[0] || '';
      const title = firstLine.replace(/^#+\s*/, '').trim();
      const contentStart = block.indexOf('\n');
      const content = contentStart >= 0 ? block.slice(contentStart).trim() : '';
      return { title, content };
    }).filter((i) => i.title);
  };

  // Extract workflow (title, description, steps) for value-and-customers, packaging-and-bundling, models-and-metering
  const extractHowToUseWorkflow = (content: string): { title: string; description: string; steps: { number: string; title: string; subtitle: string }[] } | null => {
    const raw = extractHowToUseSection(content);
    const titleMatch = raw.match(/### ([^\n]+)/);
    if (!titleMatch) return null;
    const title = titleMatch[1].trim();
    const afterTitle = raw.slice(raw.indexOf('\n') + 1).trim();
    const stepsMatch = afterTitle.match(/#### Steps\n([\s\S]*?)(?=\n## |\n### |$)/);
    const stepsRaw = stepsMatch ? stepsMatch[1] : '';
    if (!stepsRaw.trim()) return null;
    const stepLines = stepsRaw.split('\n').filter((l) => /^\s*-\s*\d+/.test(l.trim()));
    const steps = stepLines.map((line) => {
      const m = line.trim().match(/^-\s*(\d+)\s*\|\s*([^|]+)\s*\|\s*(.+)$/);
      if (m) return { number: m[1].padStart(2, '0'), title: m[2].trim(), subtitle: m[3].trim() };
      return null;
    }).filter((s): s is { number: string; title: string; subtitle: string } => s !== null);
    const descMatch = afterTitle.match(/^([\s\S]*?)(?=\n#### Steps)/);
    let description = descMatch ? descMatch[1].trim() : '';
    // Strip the ### title line from description (it's rendered separately as h3)
    description = description.replace(/^###\s+[^\n]+\n?/, '').replace(/\n+/g, ' ').trim();
    return { title, description, steps };
  };

  const { content: whatsInCategoryContent, workingNote } = extractWhatsInCategorySection(category.content);
  const howToUseContent = extractHowToUseSection(category.content);
  const summarySectionContent = extractSection(category.content, '## Summary', ["## What's in this category"]);
  const coreConceptsContent = extractSection(category.content, '## Core Concepts', ['## How to use this', '## Related categories']);
  const insights = extractInsights(category.content);
  const howToUseCards = extractHowToUseCards(category.content);
  const howToUseWorkflow = extractHowToUseWorkflow(category.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <WikiLayout breadcrumbs={breadcrumbs} showAreasFooter={false}>
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
                <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold text-white drop-shadow-lg mb-4">
                  {category.title}
                </h1>
                <p className="text-xl text-white leading-relaxed drop-shadow-md">
                  {category.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Summary Section - For foundations (from markdown) */}
            {params.category === 'foundations' && (summarySectionContent || category.summary) && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Summary
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-text">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4 text-justify" {...props} />,
                      strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                      a: ({node, ...props}: any) => <a className="text-brand-ink hover:underline font-medium" {...props} />,
                    }}
                  >
                    {(summarySectionContent || `## Summary\n\n${category.summary}`).replace(/^## Summary\s*/i, '')}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Concepts in Context Section - Only for foundations category */}
            {params.category === 'foundations' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Concepts in Context
                  </h2>
                </div>
                <div className="space-y-32">
                  {/* First section: Value-based and Strategic pricing with first text box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - First two concept boxes */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      {/* Value-Based Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/value-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Diamond className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Value-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Core philosophy
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Anchors prices to the measurable value you create and your customers' willingness to pay, rather than your internal costs or competitors' numbers. This is the long-run "gold standard" for SaaS pricing and the core philosophy behind the rest of the wiki.
                        </p>
                      </Link>

                      {/* Strategic Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/strategic-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Settings className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Strategic pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Operating system
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Treats pricing as an operating system for the business: a deliberate way of deciding how you charge, what you charge, and when you change prices, so profit, growth, and positioning stay aligned. Prevents "random walk" pricing and ensures every change in price has a clear objective and owner.
                        </p>
                      </Link>
                    </div>

                    {/* Right side - First text box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[0]?.title || 'Strategic Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[0]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[0].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second section: Cost-plus, Competition-based, and Customer-driven with second text box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Pricing Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[1]?.title || 'Pricing Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[1]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[1].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Last three concept boxes */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      {/* Cost-Plus Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/cost-plus-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-brand no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <TrendingDown className="w-6 h-6 text-gray-700 group-hover:text-brand transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Cost-plus pricing
                          </h3>
                          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            As price floor
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Starts from unit cost and adds a margin to "keep things simple"; useful as a floor and sanity check for unit economics, but too blunt and inward-looking as a primary strategy.
                        </p>
                      </Link>

                      {/* Competition-Based Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/competition-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Grid3x3 className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Competition-based pricing
                          </h3>
                          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            As benchmark
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Sets prices relative to competitors' price points, discounts, and bundles; good as reference points, risky as a default strategy.
                        </p>
                      </Link>

                      {/* Customer-Driven Tactics */}
                      <Link 
                        href="/wiki/pricing/foundations/customer-driven-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-red-500 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <AlertTriangle className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Customer-driven pricing
                          </h3>
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Danger
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Charges each buyer as much as you can extract in the moment through negotiation; can boost short-term revenue, but trains aggressive bargaining and undermines fairness, trust, and long-term relationships.
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Choosing Your Posture Section - Only for foundations category */}
            {params.category === 'foundations' && (
              <div className="mt-16 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="choosing-your-posture" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Choosing Your Posture
                  </h2>
                </div>
                <p className="text-text text-base sm:text-[17px] leading-[1.65] mb-10 max-w-3xl">
                  Once you understand your range, you must choose a strategic posture based on your market differentiation, growth goals, and constraints.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skimming Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/skimming-strategy"
                    className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        SKIMMING
                      </span>
                      <h3 className="font-semibold text-text text-lg mb-3">High Margins & Brand Prestige</h3>
                      <p className="text-text leading-relaxed text-base mb-4">
                        Setting a high initial price to "skim" the most profitable segments of the market before lowering it or introducing lower tiers.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-text-muted uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-text italic">
                          "Strong differentiation and clear high-willingness-to-pay tiers."
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Penetration Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/penetration-strategy"
                    className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        PENETRATION
                      </span>
                      <h3 className="font-semibold text-text text-lg mb-3">Market Share & Network Effects</h3>
                      <p className="text-text leading-relaxed text-base mb-4">
                        Setting a low price to attract a large number of buyers quickly and win market share, betting on lifetime value and scale.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-text-muted uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-text italic">
                          "Speed, scale, or network effects are the primary objective."
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Maximization Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/maximization"
                    className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-soft rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-brand-ink text-brand-on text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        MAXIMIZATION
                      </span>
                      <h3 className="font-semibold text-text text-lg mb-3">Cash Flow & Near-term Profit</h3>
                      <p className="text-text leading-relaxed text-base mb-4">
                        Optimizing price to squeeze out maximum possible revenue/profit from the existing customer base within a specific timeframe.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-text-muted uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-text italic">
                          "Demand is well understood and cash is the binding constraint."
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Summary Section - Markdown-first for non-foundations categories */}
            {params.category !== 'foundations' && (summarySectionContent || category.summary) && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Summary
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-text">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4 text-justify" {...props} />,
                      strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                      a: ({node, ...props}: any) => <a className="text-brand-ink hover:underline font-medium" {...props} />,
                    }}
                  >
                    {(summarySectionContent || `## Summary\n\n${category.summary}`).replace(/^## Summary\s*/i, '')}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Concepts in Context Section - For value-and-customers category */}
            {params.category === 'value-and-customers' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Concepts in Context
                  </h2>
                </div>
                <div className="space-y-32">
                  {/* First section: Foundation concepts (ICP, Use Cases, JTBD) with insight box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Foundation concept boxes */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      {/* Ideal Customer Profile */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/ideal-customer-profile"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Users className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Ideal Customer Profile (ICP)
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The account/segment profile that gets the most value from your offer—and delivers the best acquisition, retention, and expansion economics. Use it to focus targeting and pricing power so you're not building (or discounting) for everyone.
                        </p>
                      </Link>

                      {/* Customer Use Cases */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/customer-use-cases"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <FileText className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Customer Use Cases
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A concrete description of who uses you for what problem, in what context, and versus which alternative. Use it to align packaging and pricing to real workflows and stakes instead of feature lists.
                        </p>
                      </Link>

                      {/* Jobs-to-Be-Done */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/jobs-to-be-done"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Target className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Jobs‑to‑Be‑Done (JTBD)
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A lens that frames demand as the "progress" customers are trying to make, not the persona they belong to. Use it when messaging and onboarding feel fuzzy and you need a crisp "why now."
                        </p>
                      </Link>
                    </div>

                    {/* Right side - Foundation Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[0]?.title || 'Foundation Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[0]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[0].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second section: Value Logic concepts (Value Drivers, EVE, Value Decoder, WTP) with insight box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[1]?.title || 'Value Logic Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[1]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[1].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Value Logic concept boxes */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      {/* Value Drivers */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/value-drivers"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Sparkles className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Value Drivers
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The specific benefits that create utility (time saved, risk reduced, revenue gained, convenience, status, etc.). Use it to justify pricing, prioritize roadmap, and design tiers around outcomes customers actually pay for.
                        </p>
                      </Link>

                      {/* Economic Value Estimation */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/economic-value-estimation"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Calculator className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Economic Value Estimation (EVE)
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A value-based pricing method that anchors on the next-best alternative (reference value) and adds/subtracts your differentiation value. Use it to build a defendable ROI narrative and a credible value-based ceiling.
                        </p>
                      </Link>

                      {/* Value Decoder Framework */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/value-decoder-framework"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <BarChart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Value Decoder framework
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A structured way to translate perceived value into a price band by anchoring on the alternative and adjusting for differences and context. Use it when budgets, complements, timing, or market environment change what "value" feels like.
                        </p>
                      </Link>

                      {/* Willingness to Pay */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/willingness-to-pay"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <DollarSign className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Willingness to Pay (WTP)
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The distribution of maximum acceptable prices across customers, not a single number. Use it to validate your value-based range, choose price points, and design tiers with evidence.
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Third section: Capture Mechanism concepts (Segmentation, Price Fences) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Capture Mechanism concept boxes */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      {/* Segmentation by WTP / Use Case */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/customer-segments"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Layers className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Segmentation by WTP / Use Case
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Capture Mechanism
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Grouping customers by distinct jobs/use cases and WTP so one price doesn't undercharge some and exclude others. Use it to decide tiering, packaging, and go-to-market focus without drowning in complexity.
                        </p>
                      </Link>

                      {/* Price Fences / Price Discrimination */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/price-fences-price-discrimination"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Zap className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Price fences / price discrimination
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Capture Mechanism
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Enforceable rules that let different segments pay different effective prices with minimal leakage and manageable fairness risk. Use it to capture more surplus than blanket discounts—while protecting your premium segment.
                        </p>
                      </Link>
                    </div>

                    {/* Right side - Capture Mechanism Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[2]?.title || 'Capture Mechanism Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[2]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[2].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Concepts in Context Section - For packaging-and-bundling category */}
            {params.category === 'packaging-and-bundling' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Concepts in Context
                  </h2>
                </div>
                <div className="space-y-32">
                  {/* Blueprint: Packaging architecture */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex order-2 lg:order-1">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[0]?.title || 'Blueprint Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[0]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[0].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/packaging"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Package className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Packaging architecture
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Blueprint
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The structural design of what you sell (plans, modules, upgrade paths) and how customers move up—independent of exact price points. Use it to reduce decision friction, increase ACV, and avoid feature giveaways that kill margins.
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Tier design: Leader/Filler/Killer Features; Good–Better–Best tiers */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/leader-filler-killer-features"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Layers className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Leader/Filler/Killer Features
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Tier design
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Classify features by impact on purchase decisions: leaders that drive tier choice, fillers that make the tier feel complete, killers that devalue the tier. Use it to design high-converting tiers and avoid feature soup.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/good-better-best"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <TrendingUp className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Good–Better–Best tiers
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Tier design
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A tiered packaging pattern (typically 3 plans) that offers entry, mass-market, and premium options to anchor value, segment buyers, and create predictable upgrade paths.
                        </p>
                      </Link>
                    </div>
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[1]?.title || 'Tier design Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[1]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[1].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expansion: Add‑ons & modular packaging; Bundling */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[2]?.title || 'Expansion Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[2]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[2].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/add-ons-modular"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Grid3x3 className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Add‑ons & modular packaging
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Expansion
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Customers buy a core offer, then optionally purchase add-ons (modules) to tailor the product. Use it to capture WTP differences, keep entry plans simple, and create repeatable expansion paths.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/bundling"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <PackageCheck className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Bundling
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Expansion
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Selling multiple complementary products together at one price to increase total revenue and customer stickiness. Use it when customers value different items differently and marginal cost per extra item is low.
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Concepts in Context Section - For models-and-metering category */}
            {params.category === 'models-and-metering' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Concepts in Context
                  </h2>
                </div>
                <div className="space-y-32">
                  {/* Foundation: Monetization model, Pricing metric / value metric */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/models-and-metering/monetization-model"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Settings className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Monetization model
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The overarching blueprint defining how your business captures value and generates cash flow. Use it to align product design, GTM motion, and unit economics before setting price points.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/pricing-metric-value-metric"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Calculator className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Pricing metric / value metric
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          The specific unit you charge for (per user, per API call, per gigabyte) that should track customer value and your cost-to-serve. Use it to drive expansion revenue naturally and avoid ghost churn.
                        </p>
                      </Link>
                    </div>
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[0]?.title || 'Foundation Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[0]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[0].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Engines: Subscription, Seat-based, Usage-based, Transaction-based, Outcome-based */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[1]?.title || 'Revenue Engines Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[1]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[1].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/models-and-metering/subscription-model"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <TrendingUp className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Subscription model
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Revenue Engine
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Recurring fee for ongoing access when value is continuous and usage is frequent. Use it to build predictable MRR and manage retention as the core growth lever.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/seat-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Users className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Seat-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Revenue Engine
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Flat recurring fee per user when value scales with headcount and buyers want budget predictability. Watch utilization to avoid shelfware and renewal pressure.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/usage-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Zap className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Usage-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Revenue Engine
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Charge by measured consumption when usage is the clearest proxy for value and costs scale with use. Add allowances, alerts, and caps to avoid bill-shock churn.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/transaction-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <BarChart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Transaction-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Revenue Engine
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Charge per auditable, discrete value event (for example, payment captured or booking completed). It aligns price with realized activity while preserving simple buyer logic.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/outcome-performance-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Target className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Outcome / performance-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Revenue Engine
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Tie price to verified results when outcomes are measurable and attributable. Use it to share risk and capture a share of value created—requires clear metrics and attribution rules.
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Advanced & GTM: Hybrid pricing, Credits / drawdown, Freemium */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/models-and-metering/hybrid-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Layers className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Hybrid pricing
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Advanced
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Base subscription plus variable usage to balance predictability for buyers and upside capture for you. Mature startups almost always graduate to hybrid when pure seat-based limits growth and pure usage-based hurts predictability.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/credits-drawdown-model"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Package className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Credits / drawdown model
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Advanced
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          Customers pre-commit budget into a wallet and usage burns it down over time. This adds procurement-friendly predictability without giving up consumption-based fairness.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/models-and-metering/freemium-model"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-border-subtle hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Sparkles className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-text text-lg no-underline">
                            Freemium model
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Go-To-Market
                          </span>
                        </div>
                        <p className="text-text leading-tight text-sm ml-9 mt-0 text-justify">
                          A customer acquisition strategy (not a true revenue model) that offers a perpetual free tier to lower entry barriers. Treat free as a marketing expense; design clear fences so users upgrade for meaningful reasons.
                        </p>
                      </Link>
                    </div>
                    <div className="lg:col-span-5 flex">
                      <div className="bg-surface rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-text text-lg">{insights[2]?.title || 'Advanced & GTM Insight'}</h4>
                        </div>
                        <div className="text-base sm:text-[17px] text-text leading-[1.65] text-justify prose prose-sm max-w-none">
                          {insights[2]?.content && (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{insights[2].content}</ReactMarkdown>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Core Concepts - Markdown fallback for categories without card-based blocks */}
            {coreConceptsContent && !['foundations', 'value-and-customers', 'packaging-and-bundling', 'models-and-metering'].includes(params.category) && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    Concepts in Context
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-text">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4 text-justify" {...props} />,
                      ul: ({node, ...props}: any) => <ul className="list-disc list-outside space-y-2 mb-4 ml-6" {...props} />,
                      li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65] pl-2" {...props} />,
                      strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                      h3: ({node, ...props}: any) => <h3 className="text-lg font-semibold text-text mb-3 mt-6" {...props} />,
                      a: ({node, ...props}: any) => <a className="text-brand-ink hover:underline font-medium" {...props} />,
                    }}
                  >
                    {coreConceptsContent.replace(/^## Core Concepts\s*/i, '')}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Render "How to use this" or "How startup founders can use these concepts" section */}
            {howToUseContent && (
              <div className="mt-16 mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="how-to-use-this" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    How to use this
                  </h2>
                </div>
                
                {/* Custom cards for foundations and value-and-customers categories */}
                {params.category === 'foundations' && howToUseCards.length >= 3 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-text text-lg">{howToUseCards[0]?.title}</h3>
                      </div>
                      <div className="text-text leading-relaxed text-base prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, ol: ({node, ...p}: any) => <ol className="list-decimal list-inside space-y-2" {...p} />, li: ({node, ...p}: any) => <li {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{howToUseCards[0]?.content || ''}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-soft rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-brand-ink" />
                        </div>
                        <h3 className="font-semibold text-text text-lg">{howToUseCards[1]?.title}</h3>
                      </div>
                      <div className="text-text leading-relaxed text-base prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, ol: ({node, ...p}: any) => <ol className="list-decimal list-inside space-y-2" {...p} />, li: ({node, ...p}: any) => <li {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{howToUseCards[1]?.content || ''}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-text text-lg">{howToUseCards[2]?.title}</h3>
                      </div>
                      <div className="text-text leading-relaxed text-base prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{howToUseCards[2]?.content || ''}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ) : params.category === 'value-and-customers' && howToUseWorkflow ? (
                  <div className="space-y-8">
                    <div className="bg-surface rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-30"></div>
                      <div className="relative z-10">
                        <h3 className="text-text font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-4">{howToUseWorkflow.title}</h3>
                        <p className="text-text text-base sm:text-[17px] leading-[1.65] mb-8">{howToUseWorkflow.description}</p>
                        <div className="flex flex-nowrap items-stretch gap-3 md:gap-4 overflow-x-auto pb-2 -mx-1">
                          {howToUseWorkflow.steps.flatMap((step, i) => [
                            <div key={`s-${i}`} className="bg-white rounded-xl p-4 md:p-5 border border-border-subtle shadow-md flex-shrink-0 flex-1 min-w-[7rem] md:min-w-0 flex flex-col">
                              <div className="text-brand-ink text-sm font-bold mb-2 tracking-wider">{step.number}</div>
                              <h4 className="text-text font-bold text-base mb-1.5">{step.title}</h4>
                              <p className="text-text text-sm text-text-subtle leading-snug mt-auto">{step.subtitle}</p>
                            </div>,
                            ...(i < howToUseWorkflow.steps.length - 1 ? [<div key={`a-${i}`} className="flex items-center justify-center flex-shrink-0 self-stretch"><ArrowRight className="text-[#cbd5e1] w-5 h-5 md:w-6 md:h-6" /></div>] : [])
                          ])}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : params.category === 'packaging-and-bundling' && howToUseWorkflow ? (
                  <div className="space-y-8">
                    <div className="bg-surface rounded-2xl p-8 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-30"></div>
                      <div className="relative z-10">
                        <h3 className="text-text font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-3">{howToUseWorkflow.title}</h3>
                        <p className="text-text text-base sm:text-[17px] opacity-80 mb-8 leading-[1.65]">{howToUseWorkflow.description}</p>
                        <div className="flex flex-nowrap items-center justify-between gap-2 md:gap-3 lg:gap-4">
                          {howToUseWorkflow.steps.flatMap((step, i) => [
                            <div key={`s-${i}`} className="bg-white rounded-lg p-3 md:p-4 border border-border-subtle shadow-sm min-h-[5.5rem] flex flex-col flex-shrink-0 flex-1 min-w-0">
                              <div className="text-brand-ink text-xs font-semibold mb-1.5 tracking-wide">{step.number}</div>
                              <h4 className="text-text font-bold text-sm mb-1">{step.title}</h4>
                              <p className="text-text text-xs opacity-70 leading-tight">{step.subtitle}</p>
                            </div>,
                            ...(i < howToUseWorkflow.steps.length - 1 ? [<ArrowRight key={`a-${i}`} className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />] : [])
                          ])}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : params.category === 'models-and-metering' && howToUseCards.length >= 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {howToUseCards.map((card, i) => {
                      const icons = [Zap, Target, TrendingUp, DollarSign, BarChart];
                      const iconBg = ['bg-blue-100', 'bg-green-100', 'bg-amber-100', 'bg-purple-100', 'bg-teal-100'];
                      const iconColor = ['text-blue-600', 'text-green-600', 'text-amber-600', 'text-purple-600', 'text-teal-600'];
                      const Icon = icons[i % icons.length];
                      return (
                        <div key={i} className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 ${iconBg[i % iconBg.length]} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${iconColor[i % iconColor.length]}`} />
                            </div>
                            <h3 className="font-semibold text-text text-lg">{card.title}</h3>
                          </div>
                          <div className="text-text leading-relaxed text-base prose prose-sm max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ p: ({node, ...p}: any) => <p className="mb-0" {...p} />, a: ({node, ...p}: any) => <a className="text-brand-ink hover:underline font-medium" {...p} /> }}>{card.content || ''}</ReactMarkdown>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Render markdown content for all other categories */
                  <div className="prose prose-lg max-w-none text-text">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4" {...props} />,
                        ul: ({node, ...props}: any) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
                        ol: ({node, ...props}: any) => <ol className="list-decimal list-inside space-y-2 mb-4" {...props} />,
                        li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65]" {...props} />,
                        strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}: any) => <em className="italic" {...props} />,
                        h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold text-text mb-3 mt-6" {...props} />,
                        h4: ({node, ...props}: any) => <h4 className="text-lg font-semibold text-text mb-2 mt-4" {...props} />,
                        a: ({node, ...props}: any) => <a className="text-brand-ink hover:underline font-medium" {...props} />,
                      }}
                    >
                      {howToUseContent.replace(/^## How to use this\s*/i, '')}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {/* What's in this category Section - After How to use this for all categories */}
            {(whatsInCategoryContent || workingNote) && (
              <div className="mt-16 mb-12">
                {workingNote && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base sm:text-[17px] text-text leading-[1.65] italic">
                      {workingNote}
                    </p>
                  </div>
                )}
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="whats-in-this-category" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                    What's in this category
                  </h2>
                </div>
                {whatsInCategoryContent && (
                  <div className="prose prose-lg max-w-none text-text">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4" {...props} />,
                        ul: ({node, ...props}: any) => <ul className="list-disc list-outside space-y-3 mb-4 ml-6" {...props} />,
                        li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65] pl-2" {...props} />,
                        strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}: any) => <em className="italic" {...props} />,
                        a: ({node, ...props}: any) => <a className="text-brand-ink hover:underline font-medium" {...props} />,
                      }}
                    >
                      {whatsInCategoryContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            <div className="mt-16 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                <h2 id="related-categories" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-0">
                  Related categories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.relatedCategories.slice(0, 2).map((related) => (
                <Link
                  key={related.slug}
                  href={`/wiki/pricing/${related.slug}`}
                  className="block p-4 border border-border-subtle rounded-lg hover:border-brand-ink hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-text mb-2">
                    {related.title}
                  </h3>
                  <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                    {related.summary}
                  </p>
                </Link>
              ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-16 mb-8">
            <div className="bg-white rounded-lg p-8 md:p-12 border border-border-subtle shadow-lg text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Image 
                  src="/images/headshot_v2.jpg" 
                  alt="Sarah Zou headshot" 
                  width={80} 
                  height={80} 
                  className="rounded-full object-cover flex-shrink-0" 
                />
                <h2 className="font-serif-playfair text-2xl md:text-[28px] font-semibold text-text">
                  If you want help applying this to your business…
                </h2>
              </div>
              <Link
                href="/book"
                className="inline-block bg-brand text-brand-on px-8 py-4 rounded-lg text-[19px] font-bold leading-[1.2] hover:bg-brand-ink transition shadow-lg hover:shadow-xl"
              >
                Book a 15-min intro call
              </Link>
            </div>
          </div>

          {/* License Footer */}
          <WikiLicenseFooter />
        </div>
      </WikiLayout>
    </>
  );
}
