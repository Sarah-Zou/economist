import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_noStore } from 'next/cache';
import 'katex/dist/katex.min.css';
import { generateTechArticleJsonLd, generateBreadcrumbJsonLd, generateFAQJsonLd } from '@/lib/generateJsonLd';
import { getCategoryBySlug, getAllCategories, getConceptBySlug } from '@/lib/mdx';
import { normalizeHeadingText, createUniqueHeadingId, extractNodeText } from '@/lib/wikiHeadingUtils';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter';
import TableOfContents from '@/components/wiki/TableOfContents';
import CiteThisPage from '@/components/wiki/CiteThisPage';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { Zap, Info, TrendingUp, Clock, CheckCircle, DollarSign, Users, AlertCircle, TrendingDown, XCircle, ArrowLeftRight, Target, ArrowRight, BarChart, Percent, FileWarning, Activity } from 'lucide-react';
import Image from 'next/image';
import '@/app/prose.css';

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

        // Only generate pages for concepts that have actual content files.
        // This prevents "Coming Soon" soft-404 pages from being indexed.
        if (!getConceptBySlug(category.slug, concept.id)) {
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
  if (!conceptData) {
    return {
      title: 'Concept Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
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
  const seenIds = new Map<string, number>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = normalizeHeadingText(match[2].trim());
    const id = createUniqueHeadingId(text, seenIds);
    
    headings.push({ id, text, level });
  }

  return headings;
}

type SnapshotData = {
  whatItIs?: string;
  whyItMatters?: string;
  whyItsTempting?: string;
  whereItFails?: string;
  whenToUse?: string;
  keyTakeaways?: string[];
};

// Helper function to parse Snapshot section from markdown content
function parseSnapshot(content: string): { 
  beforeSnapshot: string; 
  snapshot: SnapshotData | null; 
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
  const snapshot: SnapshotData = {};
  
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

function SnapshotTopCard({ snapshot }: { snapshot: SnapshotData }) {
  const conciseWhyItMatters = snapshot.whyItMatters
    ? snapshot.whyItMatters
        .split(/(?<=[.!?])\s+/)
        .find((sentence) => sentence.trim().length > 0)
        ?.trim() || snapshot.whyItMatters
    : undefined;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm mb-8">
      <div className="px-5 py-5 sm:px-7 sm:py-7">
      <div className="mb-4">
        <h2 id="snapshot" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-text scroll-mt-24">
          Snapshot (TL;DR)
        </h2>
      </div>
      <div className="space-y-4">
        {snapshot.whatItIs && (
          <div className="rounded-xl border border-[#edf1f5] bg-[#fafbfc] px-4 py-4 sm:px-5">
            <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-2">What it is</h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-text" {...props} />,
                }}
              >
                {snapshot.whatItIs}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whenToUse && (
          <div className="rounded-xl border border-[#edf1f5] bg-[#fafbfc] px-4 py-4 sm:px-5">
            <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-2">When to use</h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-text" {...props} />,
                }}
              >
                {snapshot.whenToUse}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {conciseWhyItMatters && (
          <div className="rounded-xl border border-[#edf1f5] bg-[#fafbfc] px-4 py-4 sm:px-5">
            <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-2">Why it matters</h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-text" {...props} />,
                }}
              >
                  {conciseWhyItMatters}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whyItsTempting && (
          <div className="rounded-xl border border-[#edf1f5] bg-[#fafbfc] px-4 py-4 sm:px-5">
            <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-2">Why it's tempting</h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-text" {...props} />,
                }}
              >
                {snapshot.whyItsTempting}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whereItFails && (
          <div className="rounded-xl border border-[#edf1f5] bg-[#fafbfc] px-4 py-4 sm:px-5">
            <h3 className="font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-2">Where it fails</h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-text" {...props} />,
                }}
              >
                {snapshot.whereItFails}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.keyTakeaways && snapshot.keyTakeaways.length > 0 && (
          <div className="rounded-xl border border-brand/30 bg-brand-soft px-4 py-4 sm:px-5">
            <h3 className="font-semibold text-[20px] text-text mb-2">Key Takeaways</h3>
            <ul className="space-y-2">
              {snapshot.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="text-base sm:text-[17px] text-text leading-[1.65] flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-ink mt-1 flex-shrink-0" />
                  <span>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ node, ...props }) => (
                          <strong className="font-bold text-text" {...props} />
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
    </div>
  );
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

  // Parse bullet points (lines starting with - or *)
  const factLines = keyFactsContent
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('-') || trimmed.startsWith('*');
    })
    .map(line => line.replace(/^[-\*]\s*/, '').trim());

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
    
    // Keep titles plain text only (no embedded markdown links)
    title = normalizeHeadingText(title.replace(/\*\*/g, '').trim());
    
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

  // Parse bullet points (lines starting with - or *)
  const metricLines = metricsContent
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('-') || trimmed.startsWith('*');
    })
    .map(line => line.replace(/^[-\*]\s*/, '').trim());

  const metrics: Array<{ title: string; description: string }> = [];
  
  for (const line of metricLines) {
    // Extract title from **Title:** and description after colon
    const boldMatch = line.match(/\*\*([^*]+?):\*\*\s*(.+)/);
    if (boldMatch) {
      const title = normalizeHeadingText(boldMatch[1].trim());
      const description = boldMatch[2].trim();
      if (title && description) {
        metrics.push({ title, description });
      }
    }
  }

  const result = { beforeMetrics, metrics: metrics.length > 0 ? metrics : null, afterMetrics };
  return result;
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
  // Stop at next step, h2 heading, or end of string
  // Updated to handle multi-line descriptions with bullet lists by finding step positions first
  const stepMatches: Array<{ index: number; number: number; title: string; fullMatch: string }> = [];
  
  // First, find all step numbers and their positions
  const stepNumberRegex = /(\d+)\.\s+\*\*([^*]+?)[:.]\*\*/g;
  let stepNumberMatch;
  while ((stepNumberMatch = stepNumberRegex.exec(stepByStepContent)) !== null) {
    stepMatches.push({
      index: stepNumberMatch.index,
      number: parseInt(stepNumberMatch[1], 10),
      title: normalizeHeadingText(stepNumberMatch[2].trim()),
      fullMatch: stepNumberMatch[0]
    });
  }
  
  // Now extract the description for each step
  const steps: Array<{ number: number; title: string; description: string }> = [];
  for (let i = 0; i < stepMatches.length; i++) {
    const currentMatch = stepMatches[i];
    const nextIndex = i < stepMatches.length - 1 
      ? stepMatches[i + 1].index 
      : stepByStepContent.length;
    
    // Find the end of the current step's title
    const titleEndIndex = currentMatch.index + currentMatch.fullMatch.length;
    
    // Extract description from after the title until the next step
    let description = stepByStepContent.substring(titleEndIndex, nextIndex).trim();
    
    // Also check if we hit an h2 heading before the next step
    const h2Match = description.match(/\n##/);
    if (h2Match) {
      description = description.substring(0, h2Match.index).trim();
    }
    
    steps.push({
      number: currentMatch.number,
      title: currentMatch.title,
      description: description
    });
  }
  
  // Calculate last step end index for afterStepsContent
  const lastStepEndIndex = stepMatches.length > 0 
    ? (() => {
        const lastMatch = stepMatches[stepMatches.length - 1];
        const fromLastMatch = stepByStepContent.substring(lastMatch.index);
        const h2Split = fromLastMatch.split(/\n##/);
        return lastMatch.index + h2Split[0].length;
      })()
    : 0;

  // Extract content after the last step but still within the Step-by-step section
  const afterStepsContent = lastStepEndIndex > 0
    ? stepByStepContent.substring(lastStepEndIndex).trim()
    : '';

  const result = { beforeStepByStep, steps: steps.length > 0 ? steps : null, beforeStepsContent, afterStepsContent, afterStepByStep };
  return result;
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
function createMarkdownComponents() {
  const renderedHeadingIds = new Map<string, number>();
  return {
  h1: ({ node, ...props }: any) => {
    const text = normalizeHeadingText(extractNodeText(props.children))
    const id = createUniqueHeadingId(text, renderedHeadingIds)
    return (
      <h2 id={id} className="group font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24 flex items-center gap-3">
        <span>{text}</span>
        <a
          href={`#${id}`}
          className="text-sm text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          aria-label={`Link to ${text}`}
        >
          #
        </a>
      </h2>
    );
  },
  h2: ({ node, ...props }: any) => {
    const text = normalizeHeadingText(extractNodeText(props.children))
    const id = createUniqueHeadingId(text, renderedHeadingIds)
    
    // Add icons for specific h2 headings
    let Icon = null;
    const headingText = text.toLowerCase();
    if (headingText.includes('decision criteria') || (headingText.includes('when') && headingText.includes('right tool'))) {
      Icon = Target;
    }
    
    return (
      <h2 id={id} className="group font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24 flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-brand-ink flex-shrink-0" />}
        <span>{text}</span>
        <a
          href={`#${id}`}
          className="text-sm text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          aria-label={`Link to ${text}`}
        >
          #
        </a>
      </h2>
    );
  },
  h3: ({ node, ...props }: any) => {
    const text = normalizeHeadingText(extractNodeText(props.children))
    const id = createUniqueHeadingId(text, renderedHeadingIds)
    
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
      <h3 id={id} className="group font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-4 mt-8 scroll-mt-24 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 text-brand-ink flex-shrink-0" />}
        <span>{text}</span>
        <a
          href={`#${id}`}
          className="text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          aria-label={`Link to ${text}`}
        >
          #
        </a>
      </h3>
    );
  },
  a: ({ node, href, ...props }: any) => {
    const isInternalLink = href?.startsWith('/');
    if (isInternalLink && href) {
      return (
        <Link 
          href={href}
          className="text-brand-ink hover:underline font-medium"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        className="text-brand-ink hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="bg-white border-l-4 border-brand pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
  ),
  pre: ({ node, ...props }: any) => (
    <pre
      className="bg-[#111827] text-[#f8fafc] rounded-lg p-4 my-6 overflow-x-auto text-sm leading-relaxed"
      {...props}
    />
  ),
  code: ({ node, inline, className, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="bg-[#f3f4f6] text-text px-1.5 py-0.5 rounded text-[0.9em]"
          {...props}
        />
      );
    }
    return (
      <code
        className={`font-mono text-sm ${className || ''}`.trim()}
        {...props}
      />
    );
  },
  table: ({ node, ...props }: any) => (
    <div className="my-8 w-full max-w-full overflow-x-auto rounded-xl border border-border-subtle bg-white shadow-sm" role="region" aria-label="Data table" tabIndex={0}>
      <table className="w-full border-separate border-spacing-0 min-w-[620px]" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-surface" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="text-left py-3.5 sm:py-4 px-4 sm:px-6 font-semibold text-sm text-text border-b border-border-subtle first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6 whitespace-nowrap" {...props} />
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
      <td className="py-4 sm:py-4.5 px-4 sm:px-6 text-[15px] sm:text-base text-text leading-[1.6] border-b border-border-subtle align-top first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6 min-w-[140px]" {...props}>
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
    <tr className="even:bg-[#fafbfc] hover:bg-surface transition-colors duration-150 last:border-b-0" {...props} />
  ),
  div: ({ node, ...props }: any) => {
    // Preserve all props including className for nested divs
    return <div {...props} />;
  },
  img: ({ node, src, alt, ...props }: any) => {
    // Handle images with Next.js Image component for optimization
    if (src?.startsWith('/')) {
      // Check if this is a mental model image - make it smaller
      const isUseCaseMental = src.includes('wiki_usecase_mental');
      const isJTBDMental = src.includes('wiki_JTBD_mental');
      const isSegmentMental = src.includes('wiki_segment_mental');
      const isPenetrationMental = src.includes('wiki_penetration_mental');
      const isMentalModel = isUseCaseMental || isJTBDMental || isSegmentMental || isPenetrationMental;
      const imageWidth = isMentalModel ? 600 : 800;
      const imageHeight = isMentalModel ? 450 : 600;
      const maxWidth = isMentalModel ? 'max-w-2xl' : 'max-w-full';
      
      return (
        <span className="my-8 block text-center">
          <Image
            src={src}
            alt={alt || ''}
            width={imageWidth}
            height={imageHeight}
            className={`inline-block rounded-lg shadow-lg ${maxWidth} h-auto`}
            {...props}
          />
        </span>
      );
    }
    // Fallback for external images
    return <img src={src} alt={alt} className="my-8 rounded-lg shadow-lg max-w-full h-auto" {...props} />;
  },
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  // In development, opt out of route cache so content file changes show without restarting the server
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore();
  }
  try {
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
    if (!conceptData) {
      notFound();
    }
    const hasContent = conceptData !== null;
    const markdownComponents = createMarkdownComponents();
    
    // Extract headings for table of contents (only first level - h2)
    let tocItems: Array<{ id: string; text: string; level: number }> = [];
    try {
      tocItems = hasContent && conceptData 
        ? extractHeadings(conceptData.content).filter(item => item.level === 2 && !item.id.startsWith('snapshot'))
        : [];
    } catch (error) {
      console.error('Error extracting headings:', error);
    }

    // Parse Snapshot section if content exists
    let beforeSnapshot = '';
    let snapshot: SnapshotData | null = null;
    let afterSnapshotContent = '';
    try {
      const snapshotResult = hasContent && conceptData
        ? parseSnapshot(conceptData.content)
        : { beforeSnapshot: '', snapshot: null, afterSnapshot: '' };
      beforeSnapshot = snapshotResult.beforeSnapshot;
      snapshot = snapshotResult.snapshot;
      afterSnapshotContent = snapshotResult.afterSnapshot;
    } catch (error) {
      console.error('Error parsing snapshot:', error);
    }

    if (snapshot && !tocItems.some((item) => item.id.startsWith('snapshot') || item.text.toLowerCase().includes('snapshot'))) {
      tocItems = [{ id: 'snapshot', text: 'Snapshot (TL;DR)', level: 2 }, ...tocItems];
    }

    // Parse Key Facts section - parse from content after snapshot only (never full content when Snapshot exists to avoid duplicating it)
    let beforeKeyFacts = '';
    let keyFacts: Array<{ title: string; description: string; sourceUrl?: string; sourceText?: string }> | null = null;
    let afterKeyFactsContent = '';
    try {
      const contentToParseForKeyFacts = hasContent && conceptData 
        ? (snapshot ? afterSnapshotContent : (afterSnapshotContent || conceptData.content))
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
      // Search for Step-by-step - parse from afterKeyFactsContent; when Snapshot exists never use full content to avoid duplicating it
      const contentToParseForStepByStep = hasContent && conceptData 
        ? (afterKeyFactsContent || (snapshot ? afterSnapshotContent : conceptData.content))
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
      // Search for Metrics - when Snapshot exists never use full content to avoid duplicating it
      const contentToParseForMetrics = hasContent && conceptData 
        ? (afterStepByStepContent || afterKeyFactsContent || (snapshot ? afterSnapshotContent : conceptData.content))
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
        ? (afterMetricsContent || afterStepByStepContent || afterKeyFactsContent || afterSnapshotContent || (snapshot ? '' : conceptData.content))
        : '';
      const faqResult = contentToParseForFAQ
        ? parseFAQ(contentToParseForFAQ)
        : { beforeFAQ: '', faqItems: [], afterFAQ: '' };
      beforeFAQ = faqResult.beforeFAQ;
      faqItems = faqResult.faqItems;
      afterFAQ = faqResult.afterFAQ;
    } catch (error) {
      console.error('Error parsing FAQ:', error);
    }

    const references = (conceptData?.references || []).filter((ref) => ref?.title && ref?.url);
    const relatedConceptIdsFromFrontmatter = (conceptData?.relatedConcepts || [])
      .filter((id) => id && id !== params.concept);
    const fallbackRelatedIds = category.concepts
      .filter((item) => item.id && item.id !== params.concept)
      .map((item) => item.id as string);
    const relatedConceptIds = Array.from(
      new Set(
        (relatedConceptIdsFromFrontmatter.length > 0
          ? relatedConceptIdsFromFrontmatter
          : fallbackRelatedIds).slice(0, 4)
      )
    );
    const relatedConceptCards = relatedConceptIds
      .map((relatedId) => {
        const data = getConceptBySlug(params.category, relatedId);
        if (!data) {
          return null;
        }
        return {
          id: relatedId,
          title: data.title || relatedId,
          summary: data.oneLiner || '',
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
    const conceptBodyWidthClass = 'max-w-none 2xl:max-w-[96ch]';
    const breadcrumbs = [
      { name: 'Pricing', url: '/wiki/pricing' },
      { name: category.title, url: `/wiki/pricing/${category.slug}` },
      { name: conceptName, url: `/wiki/pricing/${params.category}/${params.concept}` }
    ];

    const articleJsonLd = generateTechArticleJsonLd({
      title: conceptName,
      description: description || `Learn about ${conceptName} in the context of ${category.title}`,
      url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
      datePublished: conceptData?.publishedAt,
      dateModified: conceptData?.lastUpdated || category.updated,
      author: conceptData?.owner || 'Dr. Sarah Zou'
    });

    const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs);

    const faqJsonLd = faqItems.length > 0
      ? generateFAQJsonLd({
          url: `https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`,
          faqItems: faqItems.map(item => ({
            question: item.question,
            answer: item.answer
          }))
        })
      : null;

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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      <div className="min-h-screen bg-page pb-20 md:pb-8">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {breadcrumbs.length > 0 && (
            <div className="mb-6">
              <nav className="flex items-center space-x-2 text-sm text-text-muted">
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    <Link 
                      href={crumb.url}
                      className="hover:text-brand-ink hover:underline"
                    >
                      {crumb.name}
                    </Link>
                  </span>
                ))}
              </nav>
            </div>
          )}

          {tocItems.length > 0 && (
            <div className="xl:hidden mb-6">
              <details className="bg-white rounded-lg border border-border-subtle shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-text border-b border-border-subtle">
                  On this page
                </summary>
                <div className="p-4">
                  <TableOfContents items={tocItems} title={conceptName} />
                </div>
              </details>
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
                showAreasFooter={false}
                rightSidebarContent={
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Category</p>
                          <Link 
                            href={`/wiki/pricing/${category.slug}`}
                            className="text-sm text-brand-ink hover:underline font-medium"
                          >
                            {category.title}
                          </Link>
                        </div>
                        {conceptData?.lastUpdated && (
                          <div>
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Last Updated</p>
                            <p className="text-sm text-text">
                              {new Date(conceptData.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          </div>
                        )}
                        {conceptData?.readingTime && (
                          <div>
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Reading Time</p>
                            <p className="text-sm text-text">{conceptData.readingTime} minutes</p>
                          </div>
                        )}
                        {conceptData?.tags && conceptData.tags.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">Tags</p>
                            <div className="flex flex-wrap gap-2">
                              {conceptData.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="text-xs text-text-muted bg-surface px-2 py-1 rounded-full border border-border-subtle"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <CiteThisPage
                      canonicalUrl={`https://sarahzou.com/wiki/pricing/${params.category}/${params.concept}`}
                      title={conceptName}
                      categoryTitle={category.title}
                      lastUpdated={conceptData?.lastUpdated || category.updated}
                      conceptSlug={params.concept}
                    />
                  </div>
                }
              >
          {/* Header */}
          <div className={`mb-8 ${conceptBodyWidthClass}`}>
            <h1 className="text-[32px] sm:text-[36px] font-serif-playfair font-bold text-text mb-4">
              {conceptName}
            </h1>
            {description && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-lg sm:text-xl text-text leading-relaxed italic mb-0" {...props} />
                  ),
                  a: ({ node, href, ...props }: any) => {
                    const isInternalLink = href?.startsWith('/');
                    if (isInternalLink && href) {
                      return (
                        <Link
                          href={href}
                          className="text-brand-ink hover:underline font-medium not-italic"
                          {...props}
                        />
                      );
                    }
                    return (
                      <a
                        href={href}
                        className="text-brand-ink hover:underline not-italic"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        {...props}
                      />
                    );
                  },
                }}
              >
                {description}
              </ReactMarkdown>
            )}
            {snapshot && <div className="mt-8"><SnapshotTopCard snapshot={snapshot} /></div>}
          </div>

                {/* Content */}
                <div className={`prose prose-lg ${conceptBodyWidthClass} text-text text-base sm:text-[17px] leading-[1.7]`}>
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

                      {/* Content after Snapshot but before Key Facts (What, When, Why sections) */}
                      {beforeKeyFacts && beforeKeyFacts.trim() && (
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
                          <h2 id="key-facts" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24">
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
                                <div key={index} className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface flex-shrink-0">
                                      <Icon className="w-6 h-6 text-brand-ink" />
                                    </div>
                                    {fact.title && (
                                      <h3 className="text-lg font-semibold text-text">
                                        <strong>{fact.title}</strong>
                                      </h3>
                                    )}
                                  </div>
                                  <div className="text-sm sm:text-base text-text leading-[1.65] text-left">
                                    {fact.description && (
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                          p: ({ node, ...props }) => (
                                            <p className="mb-0 text-left" {...props} />
                                          ),
                                          strong: ({ node, ...props }) => (
                                            <strong className="font-bold text-text" {...props} />
                                          ),
                                          a: ({ node, href, ...props }) => (
                                            <a
                                              href={href}
                                              className="text-brand-ink hover:underline font-medium"
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
                                        className="text-brand-ink hover:underline font-medium text-sm mt-2 block"
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
                      {steps && steps.length > 0 && beforeStepByStep && beforeStepByStep.trim() && (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {beforeStepByStep}
                        </ReactMarkdown>
                      )}

                      {/* Step-by-step Section */}
                      {(()=>{
                        return null;
                      })()}
                      {steps && steps.length > 0 && (
                        <div className="mb-8">
                          <h2 id="step-by-step" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24">
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
                                    <p className="text-base sm:text-[17px] text-text leading-[1.65] mb-6" {...props} />
                                  ),
                                  blockquote: ({ node, ...props }) => (
                                    <blockquote className="bg-white border-l-4 border-brand pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
                                  ),
                                  a: ({ node, href, ...props }: any) => {
                                    const isInternalLink = href?.startsWith('/');
                                    if (isInternalLink && href) {
                                      return (
                                        <Link 
                                          href={href}
                                          className="text-brand-ink hover:underline font-medium"
                                          {...props}
                                        />
                                      );
                                    }
                                    return (
                                      <a
                                        href={href}
                                        className="text-brand-ink hover:underline"
                                        target={href?.startsWith('http') ? '_blank' : undefined}
                                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        {...props}
                                      />
                                    );
                                  },
                                  strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-text" {...props} />
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
                                    <div className="w-12 h-12 rounded-full bg-brand text-brand-on flex items-center justify-center">
                                      <span className="text-white font-bold text-lg">{step.number}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-[20px] text-text mb-1.5">
                                      {step.title}
                                    </h3>
                                    <div className="text-base sm:text-[17px] text-text leading-[1.65]">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                          p: ({ node, ...props }) => (
                                            <p className="mb-0" {...props} />
                                          ),
                                          strong: ({ node, ...props }) => (
                                            <strong className="font-bold text-text" {...props} />
                                          ),
                                          a: ({ node, href, ...props }: any) => {
                                            const isInternalLink = href?.startsWith('/');
                                            if (isInternalLink && href) {
                                              return (
                                                <Link 
                                                  href={href}
                                                  className="text-brand-ink hover:underline font-medium"
                                                  {...props}
                                                />
                                              );
                                            }
                                            return (
                                              <a
                                                href={href}
                                                className="text-brand-ink hover:underline"
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
                                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                                  ),
                                  blockquote: ({ node, ...props }) => (
                                    <blockquote className="bg-white border-l-4 border-brand pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm" {...props} />
                                  ),
                                  a: ({ node, href, ...props }: any) => {
                                    const isInternalLink = href?.startsWith('/');
                                    if (isInternalLink && href) {
                                      return (
                                        <Link 
                                          href={href}
                                          className="text-brand-ink hover:underline font-medium"
                                          {...props}
                                        />
                                      );
                                    }
                                    return (
                                      <a
                                        href={href}
                                        className="text-brand-ink hover:underline"
                                        target={href?.startsWith('http') ? '_blank' : undefined}
                                        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        {...props}
                                      />
                                    );
                                  },
                                  strong: ({ node, ...props }) => (
                                    <strong className="font-bold text-text" {...props} />
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
                          <h2 id="metrics-to-monitor" className="text-2xl sm:text-[28px] font-serif-playfair font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24">
                            Metrics to monitor
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {metrics.map((metric, index) => {
                              // Choose icon based on content
                              const titleLower = metric.title.toLowerCase();
                              let Icon = TrendingUp;
                              
                              // Pricing metric page specific metrics
                              if (titleLower.includes('nrr') || titleLower.includes('net revenue retention') || titleLower.includes('retention')) {
                                Icon = BarChart;
                              } else if (titleLower.includes('overage') || titleLower.includes('contribution')) {
                                Icon = Percent;
                              } else if (titleLower.includes('churn') || titleLower.includes('downgrade')) {
                                Icon = TrendingDown;
                              } else if (titleLower.includes('dispute') || titleLower.includes('credit') || titleLower.includes('invoice')) {
                                Icon = FileWarning;
                              } else if (titleLower.includes('margin') || titleLower.includes('gross margin')) {
                                Icon = DollarSign;
                              } else if (titleLower.includes('usage') && titleLower.includes('adoption')) {
                                Icon = Activity;
                              }
                              // General metrics
                              else if (titleLower.includes('price') || titleLower.includes('asp') || titleLower.includes('arpa')) {
                                Icon = DollarSign;
                              } else if (titleLower.includes('elasticity')) {
                                Icon = TrendingUp;
                              } else if (titleLower.includes('discount') || titleLower.includes('realization')) {
                                Icon = AlertCircle;
                              }

                              return (
                                <div key={index} className="bg-white rounded-lg p-6 border border-border-subtle shadow-sm">
                                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface mb-4">
                                    <Icon className="w-6 h-6 text-brand-ink" />
                                  </div>
                                  <h3 className="text-xl font-bold text-text mb-2">
                                    {metric.title}
                                  </h3>
                                  <div className="text-base sm:text-[17px] text-text leading-[1.65]">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        p: ({ node, ...props }) => (
                                          <p className="mb-0" {...props} />
                                        ),
                                        a: ({ node, href, ...props }) => (
                                          <a
                                            href={href}
                                            className="text-brand-ink hover:underline font-medium"
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
                      {/* Content after Metrics when there are no FAQ sections - only render if FAQ doesn't exist to avoid duplication with beforeFAQ */}
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
                        return !!shouldRender;
                      })() ? (
                        <div key="before-faq-content">
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
                          <h2 id="faq" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] text-center scroll-mt-24">
                            Frequently Asked Questions
                          </h2>
                          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                            {faqItems.map((item, index) => (
                              <div key={index} className="bg-white rounded-lg px-5 pt-[10px] pb-5 sm:px-6 sm:pt-3 sm:pb-6 border border-border-subtle shadow-sm">
                                <h3 className="font-semibold text-[20px] sm:text-[22px] mb-1.5 text-text">
                                  {item.question}
                                </h3>
                                <div className="text-base sm:text-[17px] text-text leading-[1.65]">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                      p: ({ node, ...props }) => (
                                        <p className="mb-3 last:mb-0" {...props} />
                                      ),
                                      strong: ({ node, ...props }) => (
                                        <strong className="font-bold text-text" {...props} />
                                      ),
                                      a: ({ node, href, ...props }) => {
                                        const isInternalLink = href?.startsWith('/');
                                        if (isInternalLink && href) {
                                          return (
              <Link 
                                              href={href}
                                              className="text-brand-ink hover:underline font-medium"
                                              {...props}
                                            />
                                          );
                                        }
                                        return (
                                          <a
                                            href={href}
                                            className="text-brand-ink hover:underline"
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
                        return shouldRender;
                      })() && (
                        <>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeRaw, rehypeKatex]}
                            components={markdownComponents}
                          >
                            {afterFAQ}
                          </ReactMarkdown>
                        </>
                      )}

                      {references.length > 0 && (
                        <section className="mt-12 mb-12">
                          <h2 id="references" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24">
                            References / Further reading
                          </h2>
                          <ol className="list-decimal pl-5 space-y-3">
                            {references.map((ref, index) => (
                              <li key={`${ref.url}-${index}`} className="text-base sm:text-[17px] text-text leading-[1.65]">
                                <a
                                  href={ref.url}
                                  className="text-brand-ink hover:underline font-medium"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {ref.title}
                                </a>
                                {ref.source && <span className="text-text-muted"> - {ref.source}</span>}
                              </li>
                            ))}
                          </ol>
                        </section>
                      )}

                      {relatedConceptCards.length > 0 && (
                        <section className="mt-12 mb-12">
                          <h2 id="related-concepts" className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24">
                            Related concepts / Next steps
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedConceptCards.map((related) => (
                              <Link
                                key={related.id}
                                href={`/wiki/pricing/${params.category}/${related.id}`}
                                className="block p-4 border border-border-subtle rounded-lg hover:border-brand-ink hover:shadow-md transition-all no-underline"
                              >
                                <h3 className="font-semibold text-text mb-2">
                                  {related.title}
                                </h3>
                                {related.summary && (
                                  <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                                    {related.summary}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </section>
                      )}

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
                            className="inline-block bg-brand text-brand-on px-8 py-4 rounded-lg font-bold text-[19px] leading-[1.2] hover:bg-brand-ink transition shadow-lg hover:shadow-xl"
                          >
                            Book a 15-min intro call
                          </Link>
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
                    </>
                  )}
                </div>
              </WikiLayout>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-subtle shadow-lg z-50 md:hidden">
        <div className="max-w-[90rem] mx-auto px-4 py-3 flex gap-3">
          <Link
            href="/book"
            className="flex-1 bg-brand hover:bg-brand-ink text-brand-on text-[19px] font-bold leading-[1.2] px-4 py-3 rounded-lg text-center transition-colors shadow-sm"
          >
            Book Free Consult
          </Link>
          <Link
            href="/contact"
            className="flex-1 bg-transparent border-2 border-brand text-brand-ink hover:bg-brand-ink hover:text-brand-on font-bold px-4 py-3 rounded-lg text-center transition-colors"
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
    throw error;
  }
}

