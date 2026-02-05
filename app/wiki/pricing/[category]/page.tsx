import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_noStore } from 'next/cache';
import { generateArticleJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter';
import Link from 'next/link';
import Image from 'next/image';
import { Diamond, Settings, TrendingDown, Grid3x3, AlertTriangle, Lightbulb, BookOpen, Briefcase, GraduationCap, Users, Target, Zap, TrendingUp, Calculator, BarChart, DollarSign, Layers, FileText, Sparkles, ArrowRight, Package, PackageCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
    };
  }

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
      canonical: category.canonical
    },
    openGraph: {
      title: category.title,
      description: category.summary,
      url: category.canonical,
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
    'packaging-and-bundling': '/images/P-1.webp',
    'models-and-metering': '/images/P-2.webp',
    'price-architecture': '/images/P-3.webp',
    'behavioral-psychology': '/images/P-4.webp',
    'competitive-and-positioning': '/images/P-5.webp',
    'comms-and-deals': '/images/P-6.webp',
    'research-and-experiments': '/images/S-1.webp',
    'economics-and-metrics': '/images/S-5.webp',
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

  // Generate FAQ schema with relevant questions about the category
  const faqItems = [
    {
      question: `What is ${category.title}?`,
      answer: category.summary
    },
    {
      question: `How do I use the ${category.title} category?`,
      answer: `The ${category.title} category provides comprehensive guidance on ${category.summary.toLowerCase()}. Browse the concepts in this category to find detailed information, step-by-step guides, and practical applications for your pricing strategy.`
    },
    {
      question: `What concepts are covered in ${category.title}?`,
      answer: `This category covers ${category.concepts.length} key concepts related to ${category.title.toLowerCase()}. Each concept includes detailed explanations, real-world examples, and actionable strategies you can implement in your business.`
    }
  ];

  const faqJsonLd = generateFAQJsonLd({
    url: category.canonical,
    faqItems
  });

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
      if (line.includes('## How to use this') || line.includes('## Related categories')) {
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

  // Extract only the "How to use this" section from markdown content
  // Skip "What's in this category" and "Related categories" as they're rendered manually
  const extractHowToUseSection = (content: string): string => {
    const lines = content.split('\n');
    let inHowToUseSection = false;
    const howToUseLines: string[] = [];
    
    for (const line of lines) {
      if (line.includes('## How to use this')) {
        inHowToUseSection = true;
        howToUseLines.push(line);
        continue;
      }
      if (line.includes('## Related categories')) {
        break; // Stop when we hit the next section
      }
      if (inHowToUseSection) {
        howToUseLines.push(line);
      }
    }
    
    return howToUseLines.join('\n');
  };

  const { content: whatsInCategoryContent, workingNote } = extractWhatsInCategorySection(category.content);
  const howToUseContent = extractHowToUseSection(category.content);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            {/* Summary Section - For foundations (above What's in this category) */}
            {params.category === 'foundations' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    Summary
                  </h2>
                </div>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                  In practice, a healthy SaaS pricing system is <Link href="/wiki/pricing/foundations/value-based-pricing" className="text-[#ff5722] hover:underline font-medium">value‑based pricing</Link> at its core and implemented through <Link href="/wiki/pricing/foundations/strategic-pricing" className="text-[#ff5722] hover:underline font-medium">strategic pricing</Link> as an operating system. <Link href="/wiki/pricing/foundations/cost-plus-pricing" className="text-[#ff5722] hover:underline font-medium">Cost‑plus pricing</Link> and <Link href="/wiki/pricing/foundations/competition-based-pricing" className="text-[#ff5722] hover:underline font-medium">competition‑based pricing</Link> define your feasible range rather than your answer, and <Link href="/wiki/pricing/foundations/customer-driven-pricing" className="text-[#ff5722] hover:underline font-medium">customer‑driven pricing</Link> tactics mark the edge of what not to do if you care about fairness and relationship equity. Within that frame, you choose posture: <Link href="/wiki/pricing/foundations/skimming-strategy" className="text-[#ff5722] hover:underline font-medium">skimming strategy</Link> when you have strong differentiation and clear high‑WTP tiers, <Link href="/wiki/pricing/foundations/penetration-strategy" className="text-[#ff5722] hover:underline font-medium">penetration strategy</Link> when speed, scale, or network effects are the primary goal, and <Link href="/wiki/pricing/foundations/maximization" className="text-[#ff5722] hover:underline font-medium">maximization strategy</Link> when demand is well understood and near‑term cash or profit is the binding constraint.
                </p>
              </div>
            )}

            {/* What's in this category Section - Only for foundations category */}
            {params.category === 'foundations' && (whatsInCategoryContent || workingNote) && (
              <div className="mt-12 mb-12">
                {/* Working note - appears before the section */}
                {workingNote && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] italic">
                      {workingNote}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="whats-in-this-category" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    What's in this category
                  </h2>
                </div>
                {whatsInCategoryContent && (
                  <div className="prose prose-lg max-w-none text-[#1f2933]">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4" {...props} />,
                        ul: ({node, ...props}: any) => <ul className="list-disc list-outside space-y-3 mb-4 ml-6" {...props} />,
                        li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65] pl-2" {...props} />,
                        strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}: any) => <em className="italic" {...props} />,
                        a: ({node, ...props}: any) => <a className="text-[#ff5722] hover:underline font-medium" {...props} />,
                      }}
                    >
                      {whatsInCategoryContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {/* The Core Concepts Section - Only for foundations category */}
            {params.category === 'foundations' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    The Core Concepts
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
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Diamond className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Value-based pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Core philosophy
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Anchors prices to the measurable value you create and your customers' willingness to pay, rather than your internal costs or competitors' numbers. This is the long-run "gold standard" for SaaS pricing and the core philosophy behind the rest of the wiki.
                        </p>
                      </Link>

                      {/* Strategic Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/strategic-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Settings className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Strategic pricing
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Operating system
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Treats pricing as an operating system for the business: a deliberate way of deciding how you charge, what you charge, and when you change prices, so profit, growth, and positioning stay aligned. Prevents "random walk" pricing and ensures every change in price has a clear objective and owner.
                        </p>
                      </Link>
                    </div>

                    {/* Right side - First text box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Strategic Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          At the center of this category is <Link href="/wiki/pricing/foundations/strategic-pricing" className="text-[#ff5722] hover:underline font-medium">strategic pricing</Link>: a systematic, <Link href="/wiki/pricing/foundations/value-based-pricing" className="text-[#ff5722] hover:underline font-medium">value-based pricing</Link> way of deciding how you charge, what you charge, and how prices evolve so profit, growth, and positioning stay aligned. The underlying philosophy is <Link href="/wiki/pricing/foundations/value-based-pricing" className="text-[#ff5722] hover:underline font-medium">value-based pricing</Link>, which pegs price to the economic value you create and your customers' willingness to pay—not to your own costs or whatever rivals happen to charge.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second section: Cost-plus, Competition-based, and Customer-driven with second text box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Pricing Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Pricing Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          <Link href="/wiki/pricing/foundations/cost-plus-pricing" className="text-[#ff5722] hover:underline font-medium">Cost-plus pricing</Link> and <Link href="/wiki/pricing/foundations/competition-based-pricing" className="text-[#ff5722] hover:underline font-medium">competition-based pricing</Link> still matter, but mainly as constraints and reference points: <Link href="/wiki/pricing/foundations/cost-plus-pricing" className="text-[#ff5722] hover:underline font-medium">cost-plus pricing</Link> defines your economic floor, while <Link href="/wiki/pricing/foundations/competition-based-pricing" className="text-[#ff5722] hover:underline font-medium">competition-based pricing</Link> shows where the market is today and how crowded it is. At the other end of the spectrum is <Link href="/wiki/pricing/foundations/customer-driven-pricing" className="text-[#ff5722] hover:underline font-medium">customer-driven pricing</Link>—haggling to extract the maximum from each buyer—which may look flexible but tends to train aggressive bargaining, punish loyal customers, and erode trust, so in this wiki it's treated as a failure pattern, not a strategy to emulate.
                        </p>
                      </div>
                    </div>

                    {/* Right side - Last three concept boxes */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                      {/* Cost-Plus Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/cost-plus-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-orange-500 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <TrendingDown className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Cost-plus pricing
                          </h3>
                          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            As price floor
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Starts from unit cost and adds a margin to "keep things simple"; useful as a floor and sanity check for unit economics, but too blunt and inward-looking as a primary strategy.
                        </p>
                      </Link>

                      {/* Competition-Based Pricing */}
                      <Link 
                        href="/wiki/pricing/foundations/competition-based-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Grid3x3 className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Competition-based pricing
                          </h3>
                          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            As benchmark
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Sets prices relative to competitors' price points, discounts, and bundles; good as reference points, risky as a default strategy.
                        </p>
                      </Link>

                      {/* Customer-Driven Tactics */}
                      <Link 
                        href="/wiki/pricing/foundations/customer-driven-pricing"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-red-500 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <AlertTriangle className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Customer-driven pricing
                          </h3>
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Danger
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
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
                  <h2 id="choosing-your-posture" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    Choosing Your Posture
                  </h2>
                </div>
                <p className="text-[#1f2933] text-base sm:text-[17px] leading-[1.65] mb-10 max-w-3xl">
                  Once you understand your range, you must choose a strategic posture based on your market differentiation, growth goals, and constraints.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skimming Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/skimming-strategy"
                    className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        SKIMMING
                      </span>
                      <h3 className="font-semibold text-[#1f2933] text-lg mb-3">High Margins & Brand Prestige</h3>
                      <p className="text-[#1f2933] leading-relaxed text-base mb-4">
                        Setting a high initial price to "skim" the most profitable segments of the market before lowering it or introducing lower tiers.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-[#3b4652] uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-[#1f2933] italic">
                          "Strong differentiation and clear high-willingness-to-pay tiers."
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Penetration Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/penetration-strategy"
                    className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        PENETRATION
                      </span>
                      <h3 className="font-semibold text-[#1f2933] text-lg mb-3">Market Share & Network Effects</h3>
                      <p className="text-[#1f2933] leading-relaxed text-base mb-4">
                        Setting a low price to attract a large number of buyers quickly and win market share, betting on lifetime value and scale.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-[#3b4652] uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-[#1f2933] italic">
                          "Speed, scale, or network effects are the primary objective."
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Maximization Strategy Card */}
                  <Link 
                    href="/wiki/pricing/foundations/maximization"
                    className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all relative overflow-hidden no-underline block"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200 rounded-full opacity-30 -mr-12 -mt-12"></div>
                    <div className="relative">
                      <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase mb-4">
                        MAXIMIZATION
                      </span>
                      <h3 className="font-semibold text-[#1f2933] text-lg mb-3">Cash Flow & Near-term Profit</h3>
                      <p className="text-[#1f2933] leading-relaxed text-base mb-4">
                        Optimizing price to squeeze out maximum possible revenue/profit from the existing customer base within a specific timeframe.
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-[#3b4652] uppercase mb-2">WHEN TO USE:</p>
                        <p className="text-sm text-[#1f2933] italic">
                          "Demand is well understood and cash is the binding constraint."
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Summary Section - For value-and-customers (above What's in this category) */}
            {params.category === 'value-and-customers' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    Summary
                  </h2>
                </div>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                  This category is the bridge between who you serve and what you can charge. Define <Link href="/wiki/pricing/value-and-customers/ideal-customer-profile" className="text-[#ff5722] hover:underline font-medium">ICP</Link> first, then ground it in real buying situations with <Link href="/wiki/pricing/value-and-customers/customer-use-cases" className="text-[#ff5722] hover:underline font-medium">Customer Use Cases</Link> and <Link href="/wiki/pricing/value-and-customers/jobs-to-be-done" className="text-[#ff5722] hover:underline font-medium">JTBD</Link> so you know who buys, why now, and compared to what. Next, map <Link href="/wiki/pricing/value-and-customers/value-drivers" className="text-[#ff5722] hover:underline font-medium">Value Drivers</Link> to translate features into outcomes that create utility, quantify the dollars with <Link href="/wiki/pricing/value-and-customers/economic-value-estimation" className="text-[#ff5722] hover:underline font-medium">EVE</Link>, and expand to real-world perception and context with the <Link href="/wiki/pricing/value-and-customers/value-decoder-framework" className="text-[#ff5722] hover:underline font-medium">Value Decoder</Link> to land a credible value-based price band. Validate that band with <Link href="/wiki/pricing/value-and-customers/willingness-to-pay" className="text-[#ff5722] hover:underline font-medium">WTP</Link> research to see the distribution of what customers will actually pay, then apply <Link href="/wiki/pricing/value-and-customers/customer-segments" className="text-[#ff5722] hover:underline font-medium">Segmentation by WTP / Use Case</Link> to avoid one-size-fits-all pricing. Finally, implement capture with <Link href="/wiki/pricing/value-and-customers/price-fences-price-discrimination" className="text-[#ff5722] hover:underline font-medium">Price Fences / price discrimination</Link> so different segments self-select into the right offer without leakage—then iterate as your product, market, and customer mix evolve.
                </p>
              </div>
            )}

            {/* Summary Section - For packaging-and-bundling (above What's in this category) */}
            {params.category === 'packaging-and-bundling' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    Summary
                  </h2>
                </div>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                  Packaging is how you turn a product into an offer customers can choose and upgrade: start with <Link href="/wiki/pricing/packaging-and-bundling/packaging" className="text-[#ff5722] hover:underline font-medium">Packaging architecture</Link> to define your plan ladder, use <Link href="/wiki/pricing/packaging-and-bundling/leader-filler-killer-features" className="text-[#ff5722] hover:underline font-medium">Leader/Filler/Killer Features</Link> to decide what drives upgrades vs what's table-stakes, ship clear <Link href="/wiki/pricing/packaging-and-bundling/good-better-best" className="text-[#ff5722] hover:underline font-medium">Good–Better–Best</Link> tiers, then capture extra willingness-to-pay with <Link href="/wiki/pricing/packaging-and-bundling/add-ons-modular" className="text-[#ff5722] hover:underline font-medium">add-ons & modular packaging</Link>. If you have multiple products or offers, use <Link href="/wiki/pricing/packaging-and-bundling/bundling" className="text-[#ff5722] hover:underline font-medium">bundling</Link>—ideally mixed bundling—to sell a better workflow without forcing everyone into a suite.
                </p>
              </div>
            )}

            {/* What's in this category Section - For value-and-customers and packaging-and-bundling categories */}
            {(params.category === 'value-and-customers' || params.category === 'packaging-and-bundling') && (whatsInCategoryContent || workingNote) && (
              <div className="mt-12 mb-12">
                {/* Working note - appears before the section */}
                {workingNote && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] italic">
                      {workingNote}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="whats-in-this-category" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    What's in this category
                  </h2>
                </div>
                {whatsInCategoryContent && (
                  <div className="prose prose-lg max-w-none text-[#1f2933]">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4" {...props} />,
                        ul: ({node, ...props}: any) => <ul className="list-disc list-outside space-y-3 mb-4 ml-6" {...props} />,
                        li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65] pl-2" {...props} />,
                        strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}: any) => <em className="italic" {...props} />,
                        a: ({node, ...props}: any) => <a className="text-[#ff5722] hover:underline font-medium" {...props} />,
                      }}
                    >
                      {whatsInCategoryContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {/* The Core Concepts Section - For value-and-customers category */}
            {params.category === 'value-and-customers' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    The Core Concepts
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
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Users className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Ideal Customer Profile (ICP)
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          The account/segment profile that gets the most value from your offer—and delivers the best acquisition, retention, and expansion economics. Use it to focus targeting and pricing power so you're not building (or discounting) for everyone.
                        </p>
                      </Link>

                      {/* Customer Use Cases */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/customer-use-cases"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <FileText className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Customer Use Cases
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          A concrete description of who uses you for what problem, in what context, and versus which alternative. Use it to align packaging and pricing to real workflows and stakes instead of feature lists.
                        </p>
                      </Link>

                      {/* Jobs-to-Be-Done */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/jobs-to-be-done"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Target className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Jobs‑to‑Be‑Done (JTBD)
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Foundation
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          A lens that frames demand as the "progress" customers are trying to make, not the persona they belong to. Use it when messaging and onboarding feel fuzzy and you need a crisp "why now."
                        </p>
                      </Link>
                    </div>

                    {/* Right side - Foundation Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Foundation Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Start with <Link href="/wiki/pricing/value-and-customers/ideal-customer-profile" className="text-[#ff5722] hover:underline font-medium">ICP</Link> to decide which accounts/segments you're optimizing for (because pricing power often depends more on the customer than the product). Then make that ICP concrete with <Link href="/wiki/pricing/value-and-customers/customer-use-cases" className="text-[#ff5722] hover:underline font-medium">Customer Use Cases</Link> and <Link href="/wiki/pricing/value-and-customers/jobs-to-be-done" className="text-[#ff5722] hover:underline font-medium">JTBD</Link>: use cases define the problem, context, and alternatives; JTBD sharpens it into the "progress" customers are trying to make. Together, they prevent "ICP drift," clarify why customers buy, and create the backbone for positioning, qualification, and packaging.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second section: Value Logic concepts (Value Drivers, EVE, Value Decoder, WTP) with insight box */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left side - Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Value Logic Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Once you know who/why, you translate value into price logic. <Link href="/wiki/pricing/value-and-customers/value-drivers" className="text-[#ff5722] hover:underline font-medium">Value Drivers</Link> turn feature talk into a prioritized list of outcomes (economic, risk, emotional) that actually move WTP—and they're inherently relative to the substitute. From there, <Link href="/wiki/pricing/value-and-customers/economic-value-estimation" className="text-[#ff5722] hover:underline font-medium">EVE</Link> is your "smart-shopper" quantification engine: anchor on the next-best alternative (reference value) and stack your net differentiation value to compute a justifiable ceiling and a credible ROI narrative. <Link href="/wiki/pricing/value-and-customers/value-decoder-framework" className="text-[#ff5722] hover:underline font-medium">Value Decoder</Link> uses the same anchoring idea but is better when real-world perception and context matter (budget/income shifts, complements, market environment, timing); it outputs a defendable price band and helps you spot where you can charge a premium (or must discount) as conditions change. <Link href="/wiki/pricing/value-and-customers/willingness-to-pay" className="text-[#ff5722] hover:underline font-medium">WTP</Link> research then validates the reality: it measures the WTP distribution so you can pick a range (not a guess), stress-test pricing against unit economics, and see which use cases and segments value you most.
                        </p>
                      </div>
                    </div>

                    {/* Right side - Value Logic concept boxes */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      {/* Value Drivers */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/value-drivers"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Sparkles className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Value Drivers
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          The specific benefits that create utility (time saved, risk reduced, revenue gained, convenience, status, etc.). Use it to justify pricing, prioritize roadmap, and design tiers around outcomes customers actually pay for.
                        </p>
                      </Link>

                      {/* Economic Value Estimation */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/economic-value-estimation"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Calculator className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Economic Value Estimation (EVE)
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          A value-based pricing method that anchors on the next-best alternative (reference value) and adds/subtracts your differentiation value. Use it to build a defendable ROI narrative and a credible value-based ceiling.
                        </p>
                      </Link>

                      {/* Value Decoder Framework */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/value-decoder-framework"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <BarChart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Value Decoder framework
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          A structured way to translate perceived value into a price band by anchoring on the alternative and adjusting for differences and context. Use it when budgets, complements, timing, or market environment change what "value" feels like.
                        </p>
                      </Link>

                      {/* Willingness to Pay */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/willingness-to-pay"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <DollarSign className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Willingness to Pay (WTP)
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Value Logic
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
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
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Layers className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Segmentation by WTP / Use Case
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Capture Mechanism
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Grouping customers by distinct jobs/use cases and WTP so one price doesn't undercharge some and exclude others. Use it to decide tiering, packaging, and go-to-market focus without drowning in complexity.
                        </p>
                      </Link>

                      {/* Price Fences / Price Discrimination */}
                      <Link 
                        href="/wiki/pricing/value-and-customers/price-fences-price-discrimination"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-purple-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Zap className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Price fences / price discrimination
                          </h3>
                          <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Capture Mechanism
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Enforceable rules that let different segments pay different effective prices with minimal leakage and manageable fairness risk. Use it to capture more surplus than blanket discounts—while protecting your premium segment.
                        </p>
                      </Link>
                    </div>

                    {/* Right side - Capture Mechanism Insight box */}
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Capture Mechanism Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Finally, you design capture mechanisms so you don't leave value on the table. <Link href="/wiki/pricing/value-and-customers/customer-segments" className="text-[#ff5722] hover:underline font-medium">Segmentation by WTP / Use Case</Link> is what you do when one price can't fit (hobbyists vs enterprise, low vs high urgency, low vs high intensity): partition by jobs/use cases and WTP, then align packages and price points so you're not averaging your market. <Link href="/wiki/pricing/value-and-customers/price-fences-price-discrimination" className="text-[#ff5722] hover:underline font-medium">Price fences / price discrimination</Link> is the implementation layer: don't discount blindly—fence. Use eligibility or self-selection fences (features, limits, support, contract terms, time/location rules) that are enforceable and minimize arbitrage, so high-WTP customers don't leak into low-price buckets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* The Core Concepts Section - For packaging-and-bundling category */}
            {params.category === 'packaging-and-bundling' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="the-core-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    The Core Concepts
                  </h2>
                </div>
                <div className="space-y-32">
                  {/* Blueprint: Packaging architecture */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex order-2 lg:order-1">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Blueprint Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Start with <Link href="/wiki/pricing/packaging-and-bundling/packaging" className="text-[#ff5722] hover:underline font-medium">Packaging architecture</Link> to define your offer structure (plans, modules, limits, upgrade paths) independent of the price numbers—because packaging precedes pricing. A good architecture reduces decision friction, prevents feature giveaways, and sets you up for clean upgrades as customers hit natural &quot;success triggers.&quot;
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/packaging"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Package className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Packaging architecture
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Blueprint
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
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
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Layers className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Leader/Filler/Killer Features
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Tier design
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Classify features by impact on purchase decisions: leaders that drive tier choice, fillers that make the tier feel complete, killers that devalue the tier. Use it to design high-converting tiers and avoid feature soup.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/good-better-best"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-blue-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <TrendingUp className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Good–Better–Best tiers
                          </h3>
                          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Tier design
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          A tiered packaging pattern (typically 3 plans) that offers entry, mass-market, and premium options to anchor value, segment buyers, and create predictable upgrade paths.
                        </p>
                      </Link>
                    </div>
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Tier design Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Next, use <Link href="/wiki/pricing/packaging-and-bundling/leader-filler-killer-features" className="text-[#ff5722] hover:underline font-medium">Leader/Filler/Killer Features</Link> to decide what belongs where. Leaders are the few capabilities that actually drive someone to buy; fillers are expected &quot;completeness&quot; items; killers are the clutter or cost drivers that lower willingness to pay for some segments and should be removed—or sold separately. With those classifications in hand, design <Link href="/wiki/pricing/packaging-and-bundling/good-better-best" className="text-[#ff5722] hover:underline font-medium">Good–Better–Best</Link> tiers so each plan targets a real segment: make &quot;Better&quot; the obvious default, fence premium value drivers so Good doesn't cannibalize upgrades, and make the Best tier meaningfully different (not just a longer checklist).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expansion: Add‑ons & modular packaging; Bundling */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-5 flex">
                      <div className="bg-[#eef0f3] rounded-lg p-6 shadow-sm sticky top-24 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <h4 className="font-semibold text-[#1f2933] text-lg">Expansion Insight</h4>
                        </div>
                        <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                          Once your core ladder is clear, expand your revenue capture without bloating the base plans. Use <Link href="/wiki/pricing/packaging-and-bundling/add-ons-modular" className="text-[#ff5722] hover:underline font-medium">add‑ons & modular packaging</Link> when value is high but not universal: add‑ons work best as &quot;power/scale&quot; top‑ups, while modules work best when they map to distinct roles or use cases that can't fit neatly into one tier ladder. Use <Link href="/wiki/pricing/packaging-and-bundling/bundling" className="text-[#ff5722] hover:underline font-medium">bundling</Link> when you have multiple products (or distinct offers) and customers value the combination: mixed bundling is often a safer default because it preserves choice while encouraging larger purchases—bundle for workflow value (and sometimes charge a premium), not just for volume discounts.
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/add-ons-modular"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <Grid3x3 className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Add‑ons & modular packaging
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Expansion
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Customers buy a core offer, then optionally purchase add-ons (modules) to tailor the product. Use it to capture WTP differences, keep entry plans simple, and create repeatable expansion paths.
                        </p>
                      </Link>
                      <Link 
                        href="/wiki/pricing/packaging-and-bundling/bundling"
                        className="group block bg-white rounded-lg px-4 py-1 hover:shadow-md transition-all shadow-sm border border-[#e5e7eb] hover:border-green-600 no-underline"
                      >
                        <div className="flex items-center gap-3 mb-0">
                          <PackageCheck className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors flex-shrink-0" />
                          <h3 className="font-semibold text-[#1f2933] text-lg no-underline">
                            Bundling
                          </h3>
                          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
                            Expansion
                          </span>
                        </div>
                        <p className="text-[#1f2933] leading-tight text-sm ml-9 mt-0 text-justify">
                          Selling multiple complementary products together at one price to increase total revenue and customer stickiness. Use it when customers value different items differently and marginal cost per extra item is low.
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary Section - For other categories (above What's in this category) */}
            {params.category !== 'foundations' && params.category !== 'value-and-customers' && params.category !== 'packaging-and-bundling' && (
              <div className="mt-12 mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-[#ff5722] mr-3"></div>
                  <h2 id="summary" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    Summary
                  </h2>
                </div>
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                  {category.summary}
                </p>
              </div>
            )}

            {/* Render "What's in this category" section for other non-foundations categories */}
            {params.category !== 'foundations' && params.category !== 'value-and-customers' && params.category !== 'packaging-and-bundling' && (whatsInCategoryContent || workingNote) && (
              <div className="mt-12 mb-12">
                {/* Working note - appears before the section */}
                {workingNote && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] italic">
                      {workingNote}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-[#ff5722] mr-3"></div>
                  <h2 id="whats-in-this-category" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    What's in this category
                  </h2>
                </div>
                {whatsInCategoryContent && (
                  <div className="prose prose-lg max-w-none text-[#1f2933]">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({node, ...props}: any) => <p className="text-base sm:text-[17px] leading-[1.65] mb-4" {...props} />,
                        ul: ({node, ...props}: any) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
                        li: ({node, ...props}: any) => <li className="text-base sm:text-[17px] leading-[1.65]" {...props} />,
                        strong: ({node, ...props}: any) => <strong className="font-semibold" {...props} />,
                        em: ({node, ...props}: any) => <em className="italic" {...props} />,
                      }}
                    >
                      {whatsInCategoryContent}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            {/* Render "How to use this" section */}
            {howToUseContent && (
              <div className="mt-16 mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-1 h-8 bg-[#ff5722] mr-3"></div>
                  <h2 id="how-to-use-this" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    How to use this
                  </h2>
                </div>
                
                {/* Custom cards for foundations and value-and-customers categories */}
                {params.category === 'foundations' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* New to SaaS pricing */}
                    <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-[#1f2933] text-lg">New to SaaS pricing?</h3>
                      </div>
                      <p className="text-[#1f2933] leading-relaxed text-base">
                        Read this section first to get the big picture before touching discount ladders or feature matrices.
                      </p>
                    </div>

                    {/* Working on a live pricing problem */}
                    <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-[#1f2933] text-lg">Working on a live pricing problem?</h3>
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-[#1f2933] leading-relaxed text-base">
                        <li>Skim the cards above.</li>
                        <li>Pick the 1–2 strategies that match your situation.</li>
                        <li><Link href="/cheat-sheets" className="text-[#ff5722] hover:underline font-medium">Go to the detailed guide and follow the steps.</Link></li>
                      </ol>
                    </div>

                    {/* Teaching / studying */}
                    <div className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-[#1f2933] text-lg">Teaching / studying?</h3>
                      </div>
                      <p className="text-[#1f2933] leading-relaxed text-base">
                        Use the strategy cards as a syllabus for a 2–3 session MBA module.
                      </p>
                    </div>
                  </div>
                ) : params.category === 'value-and-customers' ? (
                  <div className="space-y-8">
                    {/* The Ideal Iterative Workflow */}
                    <div className="bg-[#eef0f3] rounded-2xl p-8 shadow-sm relative overflow-hidden">
                      {/* Decorative circle in top right */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-30"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-[#1f2933] font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-3">The Ideal Iterative Workflow</h3>
                        <p className="text-[#1f2933] text-base sm:text-[17px] opacity-80 mb-8 leading-[1.65]">
                          Pricing isn't a one-time project. It's a continuous cycle of refining logic and capturing value as market conditions evolve.
                        </p>
                        
                        {/* Workflow steps */}
                        <div className="flex flex-nowrap items-center justify-between gap-2 md:gap-3 lg:gap-4">
                          {/* Step 01: Refine ICP */}
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm flex-shrink-0 flex-1 min-w-0">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">01</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Refine ICP</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Use Cases & JTBD</p>
                          </div>
                          
                          <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          
                          {/* Step 02: Map Drivers */}
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm flex-shrink-0 flex-1 min-w-0">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">02</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Map Drivers</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Value Mapping</p>
                          </div>
                          
                          <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          
                          {/* Step 03: Quantify */}
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm flex-shrink-0 flex-1 min-w-0">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">03</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Quantify</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">EVE & Decoder</p>
                          </div>
                          
                          <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          
                          {/* Step 04: Measure */}
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm flex-shrink-0 flex-1 min-w-0">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">04</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Measure</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">WTP Research</p>
                          </div>
                          
                          <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          
                          {/* Step 05: Capture */}
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm flex-shrink-0 flex-1 min-w-0">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">05</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Capture</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Segment & Fence</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : params.category === 'packaging-and-bundling' ? (
                  <div className="space-y-8">
                    {/* Packaging & Bundling Workflow */}
                    <div className="bg-[#eef0f3] rounded-2xl p-8 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-30"></div>
                      <div className="relative z-10">
                        <h3 className="text-[#1f2933] font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-3">The Packaging Workflow</h3>
                        <p className="text-[#1f2933] text-base sm:text-[17px] opacity-80 mb-8 leading-[1.65]">
                          Package first, price second. A quarterly packaging check-in to keep tiers clean, upgrades obvious, and new features monetized..
                        </p>
                        <div className="grid gap-2 md:gap-3 lg:gap-4 items-stretch" style={{ gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr' }}>
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm min-h-[5.5rem] flex flex-col">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">01</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Define Architecture</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Plans & Upgrade Paths</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          </div>
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm min-h-[5.5rem] flex flex-col">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">02</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Classify Features</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Leader/Filler/Killer</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          </div>
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm min-h-[5.5rem] flex flex-col">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">03</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Set Tiers</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Good–Better–Best</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <ArrowRight className="text-[#e5e7eb] w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          </div>
                          <div className="bg-white rounded-lg p-3 md:p-4 border border-[#e5e7eb] shadow-sm min-h-[5.5rem] flex flex-col">
                            <div className="text-[#ff5722] text-xs font-semibold mb-1.5 tracking-wide">04</div>
                            <h4 className="text-[#1f2933] font-bold text-sm mb-1">Expand</h4>
                            <p className="text-[#1f2933] text-xs opacity-70 leading-tight">Add-ons & Bundling</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Render markdown content for all other categories */
                  <div className="prose prose-lg max-w-none text-[#1f2933]">
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
                        h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold text-[#1f2933] mb-3 mt-6" {...props} />,
                        h4: ({node, ...props}: any) => <h4 className="text-lg font-semibold text-[#1f2933] mb-2 mt-4" {...props} />,
                      }}
                    >
                      {howToUseContent.replace(/^## How to use this\s*/i, '')}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}

            <div className="mt-16 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                <h2 id="related-categories" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                  Related categories
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.relatedCategories.map((related) => (
                <Link
                  key={related.slug}
                  href={`/wiki/pricing/${related.slug}`}
                  className="block p-4 border border-[#e2e6ea] rounded-lg hover:border-[#ff5722] hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-[#1f2933] mb-2">
                    {related.title}
                  </h3>
                  <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                    {related.summary}
                  </p>
                </Link>
              ))}
              </div>
            </div>
          </div>

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
                  If you want help applying this to your business…
                </h2>
              </div>
              <a
                href="/book"
                className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl"
              >
                Book a 15-min intro call
              </a>
            </div>
          </div>

          {/* License Footer */}
          <WikiLicenseFooter />
        </div>
      </WikiLayout>
    </>
  );
}
