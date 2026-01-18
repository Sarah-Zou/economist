import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateArticleJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategories, getConceptBySlug } from '@/lib/mdx';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter';
import TableOfContents from '@/components/wiki/TableOfContents';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { Zap, Info, TrendingUp, Clock, CheckCircle, DollarSign, Users, AlertCircle, TrendingDown, XCircle, ArrowLeftRight, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ConceptPageProps {
  params: {
    category: string;
    concept: string;
  };
}

export async function generateStaticParams() {
  try {
    const categories = getAllCategories();
    const params: Array<{ category: string; concept: string }> = [];
  
    categories.forEach(category => {
    // Validate category slug - must be a valid slug, not a URL
    if (!category.slug || 
        category.slug.includes('http://') || 
        category.slug.includes('https://') ||
        category.slug.includes('://') ||
        category.slug.startsWith('/')) {
      console.warn(`Invalid category slug detected: ${category.slug}, skipping...`);
      return;
    }
    
    category.concepts.forEach(concept => {
      if (concept.id) {
        // Validate concept ID
        if (concept.id.includes('http://') || 
            concept.id.includes('https://') ||
            concept.id.includes('://')) {
          console.warn(`Invalid concept ID detected: ${concept.id}, skipping...`);
          return;
        }
        
        params.push({
          category: category.slug,
          concept: concept.id
        });
      }
    });
    });
    
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ConceptPageProps): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Error Loading Page',
      description: 'An error occurred while loading this page.',
    };
  }
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
    whyItsTempting?: string;
    whereItFails?: string;
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
  const snapshot: { whatItIs?: string; whyItMatters?: string; whyItsTempting?: string; whereItFails?: string; whenToUse?: string; keyTakeaways?: string[] } = {};
  
  // Extract "What it is:" - stop at newline followed by next field
  const whatItIsMatch = snapshotContent.match(/\*\*What it is:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Why it matters|Why it's tempting|Where it fails|When to use|Key Takeaways):|$)/);
  if (whatItIsMatch) {
    snapshot.whatItIs = whatItIsMatch[1].trim();
  }

  // Extract "Why it matters:" - stop at newline followed by next field
  const whyItMattersMatch = snapshotContent.match(/\*\*Why it matters:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Why it's tempting|Where it fails|When to use|Key Takeaways):|$)/);
  if (whyItMattersMatch) {
    snapshot.whyItMatters = whyItMattersMatch[1].trim();
  }

  // Extract "Why it's tempting:" - stop at newline followed by next field
  const whyItsTemptingMatch = snapshotContent.match(/\*\*Why it's tempting:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Where it fails|When to use|Key Takeaways):|$)/);
  if (whyItsTemptingMatch) {
    snapshot.whyItsTempting = whyItsTemptingMatch[1].trim();
  }

  // Extract "Where it fails:" - stop at newline followed by next field
  const whereItFailsMatch = snapshotContent.match(/\*\*Where it fails:\*\*\s*([\s\S]*?)(?=\n\*\*(?:When to use|Key Takeaways):|$)/);
  if (whereItFailsMatch) {
    snapshot.whereItFails = whereItFailsMatch[1].trim();
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
  keyFacts: Array<{ title: string; description: string; sourceUrl?: string; sourceText?: string }> | null; 
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

  const keyFacts: Array<{ title: string; description: string; sourceUrl?: string; sourceText?: string }> = [];
  
  for (const line of factLines) {
    if (!line) continue;
    
    // Extract markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    let description = line;
    let sourceUrl: string | undefined;
    let sourceText: string | undefined;
    
    // Find all markdown links in the line
    const links: Array<{ text: string; url: string; fullMatch: string }> = [];
    let match;
    while ((match = markdownLinkRegex.exec(line)) !== null) {
      links.push({
        text: match[1],
        url: match[2],
        fullMatch: match[0]
      });
    }
    
    // If we found links, use the last one as the source (usually the citation)
    if (links.length > 0) {
      const lastLink = links[links.length - 1];
      sourceUrl = lastLink.url;
      sourceText = lastLink.text;
      
      // Remove the citation link entirely from description (all citations should be removed)
      description = description.replace(lastLink.fullMatch, '').trim();
      
      // Remove any other markdown links but keep their text
      links.slice(0, -1).forEach(link => {
        description = description.replace(link.fullMatch, link.text);
      });
    }
    
    // Clean up description - remove trailing periods, extra spaces, and parentheses that might be left behind
    description = description.replace(/\s*\.\s*$/, '').trim();
    description = description.replace(/\s*\(\s*\)\s*/g, '').trim(); // Remove empty parentheses
    description = description.replace(/\s+/g, ' ').trim();
    
    // Extract title (text before colon) and description (text after colon)
    let title = '';
    let descriptionText = description;
    const colonIndex = description.indexOf(':');
    if (colonIndex > 0) {
      title = description.substring(0, colonIndex).trim();
      descriptionText = description.substring(colonIndex + 1).trim();
    }
    
    // Strip markdown bold syntax (**text**) from title only (description will be parsed by ReactMarkdown)
    title = title.replace(/\*\*/g, '').trim();
    
    // Clean up any orphaned ** at the start or end of description (but preserve internal **text** patterns)
    // Remove leading ** followed by space, or trailing ** preceded by space
    descriptionText = descriptionText.replace(/^\*\*\s+/, '').replace(/\s+\*\*$/, '').trim();
    
    if (description) {
      keyFacts.push({ title, description: descriptionText, sourceUrl, sourceText });
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
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:parseFAQ:413',message:'parseFAQ entry',data:{contentLength:content.length,hasMatch:!!match,matchIndex:match?.index||-1},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  if (!match) {
    return { beforeFAQ: content, faqItems: [], afterFAQ: '' };
  }

  const faqStartIndex = match.index!;
  const faqContent = match[1];
  const beforeFAQ = content.substring(0, faqStartIndex).trim();
  const afterFAQ = content.substring(faqStartIndex + match[0].length).trim();

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:parseFAQ:422',message:'parseFAQ extraction',data:{faqStartIndex,beforeFAQLength:beforeFAQ.length,afterFAQLength:afterFAQ.length,faqContentLength:faqContent.length,beforeFAQFirst200:beforeFAQ.substring(0,200),afterFAQFirst200:afterFAQ.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  // Parse Q/A pairs
  const qaRegex = /\*\*Q:\*\*\s*([\s\S]+?)\n+\*\*A:\*\*\s*([\s\S]+?)(?=\n+\*\*Q:|$)/g;
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
    
    // Add icons for specific h2 headings
    let Icon = null;
    const headingText = text.toLowerCase();
    if (headingText.includes('decision criteria') || (headingText.includes('when') && headingText.includes('right tool'))) {
      Icon = Target;
    }
    
    return (
      <h2 id={id} className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4 mt-[4.5rem] scroll-mt-24 flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-[#ff5722] flex-shrink-0" />}
        <span>{props.children}</span>
      </h2>
    );
  },
  h3: ({ node, ...props }: any) => {
    const text = String(props.children)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    // Add icons for "Where cost-plus pricing fails" subsections
    let Icon = null;
    const headingText = text.toLowerCase();
    if (headingText.includes('ignores customer value')) {
      Icon = Users;
    } else if (headingText.includes('focuses inward')) {
      Icon = ArrowLeftRight;
    } else if (headingText.includes('circular logic')) {
      Icon = XCircle;
    } else if (headingText.includes('sub-optimal pricing') || headingText.includes('suboptimal pricing')) {
      Icon = TrendingDown;
    }
    // Add icons for "Where customer-driven pricing fails" subsections
    else if (headingText.includes('trains bad behavior')) {
      Icon = AlertCircle;
    } else if (headingText.includes('damages relationships')) {
      Icon = XCircle;
    } else if (headingText.includes('focuses on transaction')) {
      Icon = DollarSign;
    } else if (headingText.includes('leads to price cuts')) {
      Icon = TrendingDown;
    } else if (headingText.includes('commoditization risk')) {
      Icon = TrendingDown;
    }
    // Add icons for "Rules of thumb" subsections
    else if (headingText.includes('revenue coverage')) {
      Icon = Target;
    } else if (headingText.includes('dedicated plan threshold')) {
      Icon = DollarSign;
    } else if (headingText.includes('use case profitability')) {
      Icon = TrendingUp;
    } else if (headingText.includes('plan clarity')) {
      Icon = CheckCircle;
    } else if (headingText.includes('interview count')) {
      Icon = Users;
    } else if (headingText.includes('drill/hole maxim') || headingText.includes('drill/hole')) {
      Icon = Target;
    } else if (headingText.includes('workaround') || headingText.includes('workaround rule')) {
      Icon = Zap;
    }
    
    return (
      <h3 id={id} className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-4 mt-8 scroll-mt-24 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-[#ff5722] flex-shrink-0" />}
        <span>{props.children}</span>
      </h3>
    );
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
    <div className="overflow-x-auto my-8 -mx-4 sm:mx-0" role="region" aria-label="Data table" tabIndex={0}>
      <div className="bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden min-w-full">
        <table className="w-full border-collapse min-w-[600px]" {...props} />
      </div>
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-[#f6f7f9]" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-xs sm:text-sm text-[#1f2933] border-b-2 border-[#e5e7eb] uppercase tracking-wide first:pl-3 sm:first:pl-6 last:pr-3 sm:last:pr-6 whitespace-nowrap" {...props} />
  ),
  td: ({ node, ...props }: any) => {
    // Check if this is a "Decision criteria" table cell with fit level
    const cellText = String(props.children || '').trim();
    const cellTextLower = cellText.toLowerCase();
    let Icon = null;
    let iconColor = '';
    
    // Only add icons for specific fit level indicators (standalone, not part of other phrases)
    // Match exact fit level patterns, avoiding false matches in comparison tables
    const isVeryHighOrCritical = cellTextLower === 'very high' || cellTextLower === 'critical' || 
                                  /^very high\s*[–:]/i.test(cellText) || /^critical\s*[–:]/i.test(cellText);
    const isHigh = (cellTextLower === 'high' || /^high\s*[–:]/i.test(cellText)) && 
                   !cellTextLower.includes('stakes') && !cellTextLower.includes('value') && 
                   !cellTextLower.includes('quality') && !cellTextLower.includes('price') &&
                   !cellTextLower.includes('b2b') && !cellTextLower.includes('b2c');
    const isLowerOrLimited = cellTextLower === 'lower' || cellTextLower === 'limited' || 
                             /^lower\s*[–:]/i.test(cellText) || /^limited\s*[–:]/i.test(cellText);
    
    if (isVeryHighOrCritical) {
      Icon = CheckCircle;
      iconColor = 'text-green-600';
    } else if (isHigh) {
      Icon = TrendingUp;
      iconColor = 'text-blue-600';
    } else if (isLowerOrLimited) {
      Icon = AlertCircle;
      iconColor = 'text-amber-600';
    }
    
    return (
      <td className="py-4 sm:py-5 px-3 sm:px-6 text-sm sm:text-base md:text-[17px] text-[#1f2933] leading-[1.65] border-b border-[#e5e7eb] align-top first:pl-3 sm:first:pl-6 last:pr-3 sm:last:pr-6 min-w-[120px]" {...props}>
        {Icon ? (
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} flex-shrink-0`} />
            <span>{props.children}</span>
          </div>
        ) : (
          props.children
        )}
      </td>
    );
  },
  tbody: ({ node, ...props }: any) => (
    <tbody className="divide-y divide-[#e5e7eb]" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="hover:bg-[#f6f7f9] transition-colors duration-150 last:border-b-0" {...props} />
  ),
  div: ({ node, ...props }: any) => {
    // Preserve all props including className for nested divs
    return <div {...props} />;
  },
  img: ({ node, src, alt, ...props }: any) => {
    // Handle images with Next.js Image component for optimization
    if (src?.startsWith('/')) {
      // Check if this is the use case or JTBD mental model image - make it smaller
      const isUseCaseMental = src.includes('wiki_usecase_mental');
      const isJTBDMental = src.includes('wiki_JTBD_mental');
      const isMentalModel = isUseCaseMental || isJTBDMental;
      const imageWidth = isMentalModel ? 600 : 800;
      const imageHeight = isMentalModel ? 450 : 600;
      const maxWidth = isMentalModel ? 'max-w-2xl' : 'max-w-full';
      
      return (
        <div className="my-8 flex justify-center">
          <Image
            src={src}
            alt={alt || ''}
            width={imageWidth}
            height={imageHeight}
            className={`rounded-lg shadow-lg ${maxWidth} h-auto`}
            {...props}
          />
        </div>
      );
    }
    // Fallback for external images
    return <img src={src} alt={alt} className="my-8 rounded-lg shadow-lg max-w-full h-auto" {...props} />;
  },
};

export default async function ConceptPage({ params }: ConceptPageProps) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:639',message:'ConceptPage entry',data:{category:params.category,concept:params.concept},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  try {
    const category = getCategoryBySlug(params.category);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:642',message:'After category lookup',data:{categoryFound:!!category,categoryTitle:category?.title,conceptsCount:category?.concepts?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    if (!category) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:644',message:'Category not found, calling notFound',data:{category:params.category},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      notFound();
    }

    const concept = category.concepts.find(c => c.id === params.concept);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:648',message:'After concept lookup',data:{conceptFound:!!concept,conceptId:concept?.id,conceptText:concept?.text,allConceptIds:category.concepts.map(c=>c.id)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    
    if (!concept) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:650',message:'Concept not found, calling notFound',data:{paramsConcept:params.concept,availableIds:category.concepts.map(c=>c.id)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      notFound();
    }

    // Try to get concept content
    const conceptData = getConceptBySlug(params.category, params.concept);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:655',message:'After getConceptBySlug',data:{conceptDataFound:!!conceptData,hasTitle:!!conceptData?.title,contentLength:conceptData?.content?.length,contentPreview:conceptData?.content?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    const conceptName = conceptData?.title || concept.text.split(':')[0].trim();
    const description = conceptData?.oneLiner || (concept.text.includes(':') 
      ? concept.text.split(':').slice(1).join(':').trim()
      : '');
    const hasContent = conceptData !== null;
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:660',message:'Content check',data:{hasContent,conceptName,description},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Extract headings for table of contents (only first level - h2)
    let tocItems: Array<{ id: string; text: string; level: number }> = [];
    try {
      tocItems = hasContent && conceptData 
        ? extractHeadings(conceptData.content).filter(item => item.level === 2)
        : [];
    } catch (error) {
      console.error('Error extracting headings:', error);
    }

    // Parse Snapshot section if content exists
    let beforeSnapshot = '';
    let snapshot: { 
      whatItIs?: string; 
      whyItMatters?: string; 
      whyItsTempting?: string;
      whereItFails?: string;
      whenToUse?: string; 
      keyTakeaways?: string[] 
    } | null = null;
    let afterSnapshotContent = '';
    try {
      const snapshotResult = hasContent && conceptData
        ? parseSnapshot(conceptData.content)
        : { beforeSnapshot: '', snapshot: null, afterSnapshot: '' };
      beforeSnapshot = snapshotResult.beforeSnapshot;
      snapshot = snapshotResult.snapshot;
      afterSnapshotContent = snapshotResult.afterSnapshot;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:680',message:'After snapshot parsing',data:{afterSnapshotLength:afterSnapshotContent.length,afterSnapshotPreview:afterSnapshotContent.substring(0,300),hasFAQ:afterSnapshotContent.includes('## FAQ')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      console.error('Error parsing snapshot:', error);
    }

    // Parse Key Facts section - parse from content after snapshot
    let beforeKeyFacts = '';
    let keyFacts: Array<{ title: string; description: string; sourceUrl?: string; sourceText?: string }> | null = null;
    let afterKeyFactsContent = '';
    try {
      const contentToParseForKeyFacts = hasContent && conceptData 
        ? (afterSnapshotContent || conceptData.content)
        : '';
      const keyFactsResult = contentToParseForKeyFacts
        ? parseKeyFacts(contentToParseForKeyFacts)
        : { beforeKeyFacts: '', keyFacts: null, afterKeyFacts: '' };
      beforeKeyFacts = keyFactsResult.beforeKeyFacts;
      keyFacts = keyFactsResult.keyFacts;
      afterKeyFactsContent = keyFactsResult.afterKeyFacts;
    } catch (error) {
      console.error('Error parsing key facts:', error);
    }

    // Parse Step-by-step section - parse from content after key facts
    let beforeStepByStep = '';
    let steps: Array<{ number: number; title: string; description: string }> | null = null;
    let beforeStepsContent = '';
    let afterStepsContent = '';
    let afterStepByStepContent = '';
    try {
      const contentToParseForStepByStep = hasContent && conceptData 
        ? (afterKeyFactsContent || afterSnapshotContent || conceptData.content)
        : '';
      const stepByStepResult = contentToParseForStepByStep
        ? parseStepByStep(contentToParseForStepByStep)
        : { beforeStepByStep: '', steps: null, beforeStepsContent: '', afterStepsContent: '', afterStepByStep: '' };
      beforeStepByStep = stepByStepResult.beforeStepByStep;
      steps = stepByStepResult.steps;
      beforeStepsContent = stepByStepResult.beforeStepsContent;
      afterStepsContent = stepByStepResult.afterStepsContent;
      afterStepByStepContent = stepByStepResult.afterStepByStep;
    } catch (error) {
      console.error('Error parsing step-by-step:', error);
    }

    // Parse Metrics to monitor section - parse from content after step-by-step
    let beforeMetrics = '';
    let metrics: Array<{ title: string; description: string }> | null = null;
    let afterMetricsContent = '';
    try {
      const contentToParseForMetrics = hasContent && conceptData 
        ? (afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || conceptData.content)
        : '';
      const metricsResult = contentToParseForMetrics
        ? parseMetricsToMonitor(contentToParseForMetrics)
        : { beforeMetrics: '', metrics: null, afterMetrics: '' };
      beforeMetrics = metricsResult.beforeMetrics;
      metrics = metricsResult.metrics;
      afterMetricsContent = metricsResult.afterMetrics;
    } catch (error) {
      console.error('Error parsing metrics:', error);
    }

    // Parse FAQ section - parse from content after metrics
    let beforeFAQ = '';
    let faqItems: Array<{ question: string; answer: string }> = [];
    let afterFAQ = '';
    try {
      const contentToParseForFAQ = hasContent && conceptData 
        ? (afterMetricsContent || afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || conceptData.content)
        : '';
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:751',message:'FAQ parsing input',data:{contentLength:contentToParseForFAQ?.length||0,contentPreview:contentToParseForFAQ?.substring(0,200)||'',hasMetrics:!!metrics,hasSteps:!!steps,hasKeyFacts:!!keyFacts},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      const faqResult = contentToParseForFAQ
        ? parseFAQ(contentToParseForFAQ)
        : { beforeFAQ: '', faqItems: [], afterFAQ: '' };
      beforeFAQ = faqResult.beforeFAQ;
      faqItems = faqResult.faqItems;
      afterFAQ = faqResult.afterFAQ;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:757',message:'FAQ parsing result',data:{beforeFAQLength:beforeFAQ.length,beforeFAQPreview:beforeFAQ.substring(0,300),afterFAQLength:afterFAQ.length,afterFAQPreview:afterFAQ.substring(0,300),faqItemsCount:faqItems.length,beforeFAQHasReferences:beforeFAQ.includes('References'),beforeFAQHasWhatIs:beforeFAQ.includes('What is'),beforeFAQHasWhyTempting:beforeFAQ.includes('Why')&&beforeFAQ.includes('tempting')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      console.error('Error parsing FAQ:', error);
    }

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

    // Generate FAQ schema from parsed FAQ items, or create default FAQs if none exist
    const faqItemsForSchema = faqItems.length > 0 
      ? faqItems.map(item => ({
          question: item.question,
          answer: item.answer
        }))
      : [
          {
            question: `What is ${conceptName}?`,
            answer: description || `Learn about ${conceptName} in the context of ${category.title}. This concept is part of the ${category.title} category in the Pricing & Monetization Wiki.`
          },
          {
            question: `How does ${conceptName} relate to ${category.title}?`,
            answer: `${conceptName} is a key concept within ${category.title}, which focuses on ${category.summary.toLowerCase()}. Understanding this concept helps you apply ${category.title.toLowerCase()} strategies effectively.`
          }
        ];

    const faqJsonLd = generateFAQJsonLd({
      url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
      faqItems: faqItemsForSchema
    });

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:838',message:'Before render return',data:{hasSnapshot:!!snapshot,hasKeyFacts:!!keyFacts,keyFactsCount:keyFacts?.length,hasSteps:!!steps,stepsCount:steps?.length,hasMetrics:!!metrics,metricsCount:metrics?.length,faqCount:faqItems.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

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
      
      <div className="min-h-screen bg-[#f9f6f7] pb-20 md:pb-8">
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

          {/* Navigation Chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="#snapshot"
              className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
            >
              Outcomes
            </a>
            <a
              href="#step-by-step"
              className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="inline-flex items-center px-4 py-2 bg-white border border-[#e5e7eb] rounded-full text-sm font-medium text-[#1f2933] hover:bg-[#f6f7f9] hover:border-[#ff5722] hover:text-[#ff5722] transition-colors cursor-pointer active:scale-95"
            >
              FAQ
            </a>
          </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none text-[#1f2933] text-base sm:text-[17px] leading-[1.65]">
                  {hasContent && conceptData ? (
                    <>
                      {/* Content before Snapshot */}
                      {beforeSnapshot && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeSnapshot}
                        </ReactMarkdown>
                      )}

                      {/* Snapshot Section */}
                      {snapshot && (
                        <>
                          <h2 id="snapshot" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] scroll-mt-24 mb-4 mt-[2.25rem]">
                            Snapshot (TL;DR)
                          </h2>
                          <div className="bg-white rounded-lg pt-4 pb-6 px-6 sm:pt-4 sm:pb-8 sm:px-8 border border-[#e5e7eb] shadow-sm mb-8">
                            <div className="space-y-1.5">
                              {snapshot.whatItIs && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-[1px]">What it is</h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-[#1f2933]" {...props} />,
                                      }}
                                    >
                                      {snapshot.whatItIs}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              )}
                              {snapshot.whyItMatters && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-[1px]">Why it matters</h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-[#1f2933]" {...props} />,
                                      }}
                                    >
                                      {snapshot.whyItMatters}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              )}
                              {snapshot.whyItsTempting && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-[1px]">Why it's tempting</h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-[#1f2933]" {...props} />,
                                      }}
                                    >
                                      {snapshot.whyItsTempting}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              )}
                              {snapshot.whereItFails && (
                                <div>
                                  <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-[#1f2933] mb-[1px]">Where it fails</h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-[#1f2933]" {...props} />,
                                      }}
                                    >
                                      {snapshot.whereItFails}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              )}
                              {snapshot.whenToUse && (
                                <div>
                                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-[1px]">When to use</h3>
                                  <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-[#1f2933]" {...props} />,
                                      }}
                                    >
                                      {snapshot.whenToUse}
                                    </ReactMarkdown>
                                  </div>
                                </div>
                              )}
                              {snapshot.keyTakeaways && snapshot.keyTakeaways.length > 0 && (
                                <div>
                                  <h3 className="font-semibold text-[20px] text-[#1f2933] mb-[1.5px]">Key Takeaways</h3>
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

                      {/* Content after Snapshot but before Key Facts */}
                      {keyFacts && keyFacts.length > 0 && beforeKeyFacts && beforeKeyFacts.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeKeyFacts}
                        </ReactMarkdown>
                      )}
                      {/* Content after Snapshot when there are no Key Facts, Steps, or Metrics but FAQ exists - render main content sections before FAQ */}
                      {(()=>{
                        // Only render if there are no intermediate sections, FAQ exists, and we have content to render
                        // Use beforeFAQ directly to avoid duplication (it's already parsed from the content)
                        const shouldRender = (!keyFacts || keyFacts.length === 0) && (!steps || steps.length === 0) && (!metrics || metrics.length === 0) && faqItems.length > 0 && beforeFAQ && beforeFAQ.trim();
                        if (shouldRender) {
                          fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1068',message:'Rendering beforeFAQ (no intermediate sections)',data:{hasKeyFacts:!!keyFacts,hasSteps:!!steps,hasMetrics:!!metrics,hasFAQ:faqItems.length>0,beforeFAQLength:beforeFAQ.length,condition:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'G'})}).catch(()=>{});
                        }
                        return shouldRender;
                      })() && (
                        <div key="after-snapshot-content-no-intermediate">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                            components={markdownComponents}
                          >
                            {beforeFAQ}
                          </ReactMarkdown>
                        </div>
                      )}

                      {/* Key Facts Section */}
                      {keyFacts && keyFacts.length > 0 && (
                        <div className="mb-8">
                          <h2 id="key-facts" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-4 mt-[4.5rem] scroll-mt-24">
                            Key Facts
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {keyFacts.map((fact, index) => {
                              // Choose icon based on content (check both title and description)
                              const contentLower = `${fact.title} ${fact.description}`.toLowerCase();
                              let Icon = DollarSign;
                              if (contentLower.includes('hour') || contentLower.includes('time')) {
                                Icon = Clock;
                              } else if (contentLower.includes('cream') || contentLower.includes('segment')) {
                                Icon = Target;
                              } else if (contentLower.includes('loyal') || contentLower.includes('brand') || contentLower.includes('retention')) {
                                Icon = CheckCircle;
                              } else if (contentLower.includes('wtp') || contentLower.includes('premium') || contentLower.includes('tier') || contentLower.includes('growth')) {
                                Icon = TrendingUp;
                              } else if (contentLower.includes('failure') || contentLower.includes('risk') || contentLower.includes('fail')) {
                                Icon = AlertCircle;
                              } else if (contentLower.includes('compan') || contentLower.includes('companies') || contentLower.includes('firms')) {
                                Icon = Users;
                              } else if (contentLower.includes('profit') || contentLower.includes('profitability') || contentLower.includes('operating profit')) {
                                Icon = DollarSign;
                              } else if (contentLower.includes('value-based') || contentLower.includes('pricing strategy')) {
                                Icon = DollarSign;
                              }

                              return (
                                <div key={index} className="bg-white rounded-lg p-6 border border-[#e5e7eb] shadow-sm">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f6f7f9] flex-shrink-0">
                                      <Icon className="w-6 h-6 text-[#ff5722]" />
                                    </div>
                                    {fact.title && (
                                      <h3 className="text-lg font-semibold text-[#1f2933]">
                                        <strong>{fact.title}</strong>
                                      </h3>
                                    )}
                                  </div>
                                  <div className="text-sm sm:text-base text-[#1f2933] leading-[1.65] text-left">
                                    {fact.description && (
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                          p: ({ node, ...props }) => (
                                            <p className="mb-0 text-left" {...props} />
                                          ),
                                          strong: ({ node, ...props }) => (
                                            <strong className="font-bold text-[#1f2933]" {...props} />
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
                                    )}
                                    {fact.sourceUrl && (
                                      <a
                                        href={fact.sourceUrl}
                                        className="text-[#ff5722] hover:underline font-medium text-sm mt-2 block"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {fact.sourceText || fact.sourceUrl}
                                      </a>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Content after Key Facts but before Step-by-step */}
                      {beforeStepByStep && beforeStepByStep.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeStepByStep}
                        </ReactMarkdown>
                      )}

                      {/* Step-by-step Section */}
                      {steps && steps.length > 0 && (
                        <div className="mb-8">
                          <h2 id="step-by-step" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-4 mt-[4.5rem] scroll-mt-24">
                            Step-by-step
                          </h2>
                          {/* Content above steps */}
                          {beforeStepsContent && (
                            <div className="mb-6">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
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
                                    <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                          p: ({ node, ...props }) => (
                                            <p className="mb-0" {...props} />
                                          ),
                                          strong: ({ node, ...props }) => (
                                            <strong className="font-bold text-[#1f2933]" {...props} />
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
                                        }}
                                      >
                                        {step.description}
                                      </ReactMarkdown>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Callout below steps */}
                          {afterStepsContent && afterStepsContent.trim() && (
                            <div className="mt-6">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
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
                      {metrics && metrics.length > 0 && beforeMetrics && beforeMetrics.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeMetrics}
                        </ReactMarkdown>
                      )}
                      {/* Content after Step-by-step when there are no Metrics or FAQ sections */}
                      {steps && steps.length > 0 && (!metrics || metrics.length === 0) && faqItems.length === 0 && afterStepByStepContent && afterStepByStepContent.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {afterStepByStepContent}
                        </ReactMarkdown>
                      )}
                      {/* Content when there are no Step-by-step, Metrics, or FAQ sections - render through beforeFAQ (last parsed) */}
                      {(!steps || steps.length === 0) && (!metrics || metrics.length === 0) && faqItems.length === 0 && beforeFAQ && beforeFAQ.trim() && (
                        <>
                          {/* #region agent log */}
                          {(()=>{fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1343',message:'Rendering beforeFAQ (no FAQ path)',data:{hasSteps:!!steps,hasMetrics:!!metrics,hasFAQ:faqItems.length>0,condition:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});return null;})()}
                          {/* #endregion */}
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                            components={markdownComponents}
                          >
                            {beforeFAQ}
                          </ReactMarkdown>
                        </>
                      )}

                      {/* Metrics to monitor Section */}
                      {metrics && metrics.length > 0 && (
                        <div className="mb-8">
                          <h2 id="metrics-to-monitor" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-[#1f2933] mb-4 mt-[4.5rem] scroll-mt-24">
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
                      {metrics && metrics.length > 0 && beforeFAQ && beforeFAQ.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeFAQ}
                        </ReactMarkdown>
                      )}
                      {/* Content after Metrics when there are no FAQ sections */}
                      {metrics && metrics.length > 0 && faqItems.length === 0 && afterMetricsContent && afterMetricsContent.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {afterMetricsContent}
                        </ReactMarkdown>
                      )}
                      {/* Content before FAQ (only if FAQ exists, no Metrics, and content hasn't been rendered yet via afterSnapshotContent) */}
                      {(()=>{
                        // Prevent rendering if content was already rendered via afterSnapshotContent path (no intermediate sections)
                        // This happens when there are no keyFacts, steps, or metrics, but FAQ exists
                        const hasNoIntermediateSections = (!keyFacts || keyFacts.length === 0) && (!steps || steps.length === 0) && (!metrics || metrics.length === 0);
                        const contentAlreadyRendered = hasNoIntermediateSections && faqItems.length > 0 && beforeFAQ && beforeFAQ.trim();
                        // Only render beforeFAQ if:
                        // 1. FAQ exists
                        // 2. No metrics (metrics have their own beforeFAQ rendering path)
                        // 3. Has intermediate sections (keyFacts or steps) - content wasn't already rendered
                        // 4. Content wasn't already rendered
                        const shouldRender = !contentAlreadyRendered && faqItems.length > 0 && (!metrics || metrics.length === 0) && ((keyFacts && keyFacts.length > 0) || (steps && steps.length > 0)) && beforeFAQ && beforeFAQ.trim();
                        fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1448',message:'Checking beforeFAQ render condition',data:{shouldRender:!!shouldRender,contentAlreadyRendered,hasNoIntermediateSections,hasFAQ:faqItems.length>0,hasMetrics:!!metrics,hasKeyFacts:!!keyFacts&&keyFacts.length>0,hasSteps:!!steps&&steps.length>0,beforeFAQLength:beforeFAQ?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'J'})}).catch(()=>{});
                        return !!shouldRender;
                      })() ? (
                        <div key="before-faq-content">
                          {/* #region agent log */}
                          {(()=>{fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1456',message:'Rendering beforeFAQ (with KeyFacts/Steps)',data:{beforeFAQLength:beforeFAQ.length,condition:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'H'})}).catch(()=>{});return null;})()}
                          {/* #endregion */}
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                            components={markdownComponents}
                          >
                            {beforeFAQ}
                          </ReactMarkdown>
                        </div>
                      ) : null}

                      {/* FAQ Section */}
                      {faqItems.length > 0 && (
                        <section className="mt-12 mb-12">
                          <h2 id="faq" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-4 mt-[4.5rem] text-center scroll-mt-24">
                            Frequently Asked Questions
                          </h2>
                          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                            {faqItems.map((item, index) => (
                              <div key={index} className="bg-white rounded-lg px-5 pt-[10px] pb-5 sm:px-6 sm:pt-3 sm:pb-6 border border-[#e5e7eb] shadow-sm">
                                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-1.5 text-[#1f2933]">
                                  {item.question}
                                </h3>
                                <div className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
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

                      {/* Content after FAQ - only render if there's actual content (not just whitespace or newlines) */}
                      {(()=>{
                        const shouldRender = afterFAQ && afterFAQ.trim() && afterFAQ.trim().length > 0 && !/^\s*$/.test(afterFAQ);
                        fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1523',message:'Checking afterFAQ render condition',data:{shouldRender,afterFAQLength:afterFAQ?.length||0,afterFAQPreview:afterFAQ?.substring(0,300)||'',afterFAQTrimmed:afterFAQ?.trim()||''},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'K'})}).catch(()=>{});
                        return shouldRender;
                      })() && (
                        <>
                          {/* #region agent log */}
                          {(()=>{fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1527',message:'Rendering afterFAQ',data:{afterFAQLength:afterFAQ.length,afterFAQPreview:afterFAQ.substring(0,300),condition:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});return null;})()}
                          {/* #endregion */}
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                            components={markdownComponents}
                          >
                            {afterFAQ}
                          </ReactMarkdown>
                        </>
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
                            href="/book"
                            className="inline-block bg-[#ff5722] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e64a19] transition shadow-lg hover:shadow-xl"
                          >
                            Book Your Sprint
                          </a>
                        </div>
                      </div>

                      {/* License Footer */}
                      <WikiLicenseFooter />
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

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] shadow-lg z-50 md:hidden">
        <div className="max-w-[90rem] mx-auto px-4 py-3 flex gap-3">
          <Link
            href="/book"
            className="flex-1 bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold px-4 py-3 rounded-lg text-center transition-colors shadow-sm"
          >
            Book Free Consult
          </Link>
          <Link
            href="/contact"
            className="flex-1 bg-transparent border-2 border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-white font-bold px-4 py-3 rounded-lg text-center transition-colors"
          >
            Send a message
          </Link>
        </div>
      </div>
    </>
  );
  } catch (error) {
    // Log the error and re-throw it so it can be caught by error boundaries
    console.error('Error in ConceptPage:', error);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7cdfc052-f0eb-41b2-9929-6d06a5eacf86',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:1658',message:'Error caught in ConceptPage',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined,category:params.category,concept:params.concept},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    throw error;
  }
}

