import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import Link from 'next/link';
import { Diamond, Settings, TrendingDown, Grid3x3, AlertTriangle, Lightbulb, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
            {/* Introduction Section - Only for foundations category */}
            {params.category === 'foundations' && (
              <div className="mt-12 mb-12">
                <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] text-justify">
                  In practice, a healthy SaaS pricing system is <Link href="/wiki/pricing/foundations/value-based-pricing" className="text-[#ff5722] hover:underline font-medium">value‑based pricing</Link> at its core and implemented through <Link href="/wiki/pricing/foundations/strategic-pricing" className="text-[#ff5722] hover:underline font-medium">strategic pricing</Link> as an operating system. <Link href="/wiki/pricing/foundations/cost-plus-pricing" className="text-[#ff5722] hover:underline font-medium">Cost‑plus pricing</Link> and <Link href="/wiki/pricing/foundations/competition-based-pricing" className="text-[#ff5722] hover:underline font-medium">competition‑based pricing</Link> define your feasible range rather than your answer, and <Link href="/wiki/pricing/foundations/customer-driven-pricing" className="text-[#ff5722] hover:underline font-medium">customer‑driven pricing</Link> tactics mark the edge of what not to do if you care about fairness and relationship equity. Within that frame, you choose posture: <Link href="/wiki/pricing/foundations/skimming-strategy" className="text-[#ff5722] hover:underline font-medium">skimming strategy</Link> when you have strong differentiation and clear high‑WTP tiers, <Link href="/wiki/pricing/foundations/penetration-strategy" className="text-[#ff5722] hover:underline font-medium">penetration strategy</Link> when speed, scale, or network effects are the primary goal, and <Link href="/wiki/pricing/foundations/maximization" className="text-[#ff5722] hover:underline font-medium">maximization strategy</Link> when demand is well understood and near‑term cash or profit is the binding constraint.
                </p>
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

            {/* Render "How to use this" section */}
            {howToUseContent && (
              <div className="mt-16 mb-12">
                <div className="flex items-center mb-8">
                  <div className="w-1 h-8 bg-blue-600 mr-3"></div>
                  <h2 id="how-to-use-this" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-0">
                    How to use this
                  </h2>
                </div>
                
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
          <div className="mt-12 bg-[#ff5722] rounded-lg p-8 text-white text-center">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-white mb-4">Use this in your pricing sprint</h2>
            <p className="mb-6">
              Ready to apply these concepts to your business? Get expert guidance to implement these strategies effectively.
            </p>
            <Link 
              href="/book"
              className="inline-block bg-white text-[#ff5722] font-bold px-8 py-3 rounded-full hover:bg-[#f6f7f9] transition-colors"
            >
              Book Free Consult
            </Link>
          </div>
        </div>
      </WikiLayout>
    </>
  );
}
