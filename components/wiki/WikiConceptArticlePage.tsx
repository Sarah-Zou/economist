import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_noStore } from 'next/cache'
import 'katex/dist/katex.min.css'
import {
  generateTechArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateFAQJsonLd,
} from '@/lib/generateJsonLd'
import { getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import { getWikiConceptPagePath, type WikiAreaConfig, PRICING_WIKI_AREA } from '@/lib/wiki-areas'
import {
  normalizeHeadingText,
  createUniqueHeadingId,
  extractNodeText,
} from '@/lib/wikiHeadingUtils'
import WikiLayout from '@/components/wiki/WikiLayout'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'
import TableOfContents from '@/components/wiki/TableOfContents'
import CiteThisPage from '@/components/wiki/CiteThisPage'
import { WikiMarkdownHtml } from '@/components/wiki/WikiMarkdownHtml'
import FAQList from '@/components/FAQList'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import {
  Zap,
  Info,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  AlertCircle,
  TrendingDown,
  XCircle,
  ArrowLeftRight,
  Target,
  ArrowRight,
  BarChart,
  Percent,
  FileWarning,
  Activity,
} from 'lucide-react'
import { getWikiConceptEntityLink, getWikiConceptMentionLinks } from '@/lib/wiki-entity-links'

export interface WikiConceptArticlePageOptions {
  categorySlug: string
  conceptSlug: string
  wikiArea?: WikiAreaConfig
}

const SITE_ORIGIN = 'https://sarahzou.com'

function resolveWikiArea(wikiArea?: WikiAreaConfig): WikiAreaConfig {
  return wikiArea ?? PRICING_WIKI_AREA
}

function resolvePagePath(options: WikiConceptArticlePageOptions): string {
  const wikiArea = resolveWikiArea(options.wikiArea)
  return getWikiConceptPagePath(wikiArea, options.categorySlug, options.conceptSlug)
}

function loadConceptContext(options: WikiConceptArticlePageOptions) {
  const wikiArea = resolveWikiArea(options.wikiArea)
  const includeNonPublished = wikiArea.basePath !== PRICING_WIKI_AREA.basePath
  const category = getCategoryBySlug(options.categorySlug, { includeNonPublished })
  if (!category) {
    return null
  }

  const concept = category.concepts.find((item) => item.id === options.conceptSlug)
  const conceptData = getConceptBySlug(options.categorySlug, options.conceptSlug, {
    includeNonPublished,
  })

  if (!concept && !conceptData) {
    return null
  }

  const conceptName =
    conceptData?.title || concept?.text.split(':')[0].trim() || options.conceptSlug
  const description =
    conceptData?.oneLiner ||
    conceptData?.metaTitle ||
    (concept?.text.includes(':')
      ? concept.text.split(':').slice(1).join(':').trim()
      : `Learn about ${conceptName} in the context of ${category.title}`)

  return {
    wikiArea,
    category,
    concept,
    conceptData,
    conceptName,
    description,
    pagePath: resolvePagePath(options),
  }
}

export async function generateWikiConceptMetadata(
  options: WikiConceptArticlePageOptions
): Promise<Metadata> {
  try {
    const context = loadConceptContext(options)
    if (!context?.conceptData) {
      return {
        title: 'Concept Not Found',
        robots: {
          index: false,
          follow: false,
        },
      }
    }

    const { wikiArea, category, conceptData, conceptName, description, pagePath } = context
    const metaTitle =
      conceptData.metaTitle || `${conceptName} | ${category.title} | ${wikiArea.areaLabel}`
    const canonicalUrl = `${SITE_ORIGIN}${pagePath}`

    return {
      title:
        metaTitle.length > 60
          ? `${conceptName} | ${category.title} | ${wikiArea.areaLabel}`
          : metaTitle,
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
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${conceptName} | ${category.title}`,
        description,
        url: canonicalUrl,
        siteName: 'Sarah Zou',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${conceptName} | ${category.title}`,
        description,
      },
    }
  } catch (error) {
    console.error('Error in generateWikiConceptMetadata:', error)
    return {
      title: 'Error Loading Page',
      description: 'An error occurred while loading this page.',
    }
  }
}

// Helper function to extract headings from markdown content
function extractHeadings(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Array<{ id: string; text: string; level: number }> = []
  const seenIds = new Map<string, number>()
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = normalizeHeadingText(match[2].trim())
    const id = createUniqueHeadingId(text, seenIds)

    headings.push({ id, text, level })
  }

  return headings
}

type SnapshotData = {
  whatItIs?: string
  whyItMatters?: string
  whyItsTempting?: string
  whereItFails?: string
  whenToUse?: string
  keyTakeaways?: string[]
}

// Helper function to parse Snapshot section from markdown content
function parseSnapshot(content: string): {
  beforeSnapshot: string
  snapshot: SnapshotData | null
  afterSnapshot: string
} {
  const snapshotRegex = /##\s+Snapshot\s*\(TL;DR\)\s*\n([\s\S]*?)(?=\n##|$)/
  const match = content.match(snapshotRegex)

  if (!match) {
    return { beforeSnapshot: content, snapshot: null, afterSnapshot: '' }
  }

  const snapshotStartIndex = match.index!
  const snapshotContent = match[1]
  const beforeSnapshot = content.substring(0, snapshotStartIndex).trim()
  const afterSnapshot = content.substring(snapshotStartIndex + match[0].length).trim()

  // Parse snapshot fields
  const snapshot: SnapshotData = {}

  // Extract "What it is:" - stop at newline followed by next field
  const whatItIsMatch = snapshotContent.match(
    /\*\*What it is:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Why it matters|Why it's tempting|Where it fails|When to use|Key Takeaways):|$)/
  )
  if (whatItIsMatch) {
    snapshot.whatItIs = whatItIsMatch[1].trim()
  }

  // Extract "Why it matters:" - stop at newline followed by next field
  const whyItMattersMatch = snapshotContent.match(
    /\*\*Why it matters:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Why it's tempting|Where it fails|When to use|Key Takeaways):|$)/
  )
  if (whyItMattersMatch) {
    snapshot.whyItMatters = whyItMattersMatch[1].trim()
  }

  // Extract "Why it's tempting:" - stop at newline followed by next field
  const whyItsTemptingMatch = snapshotContent.match(
    /\*\*Why it's tempting:\*\*\s*([\s\S]*?)(?=\n\*\*(?:Where it fails|When to use|Key Takeaways):|$)/
  )
  if (whyItsTemptingMatch) {
    snapshot.whyItsTempting = whyItsTemptingMatch[1].trim()
  }

  // Extract "Where it fails:" - stop at newline followed by next field
  const whereItFailsMatch = snapshotContent.match(
    /\*\*Where it fails:\*\*\s*([\s\S]*?)(?=\n\*\*(?:When to use|Key Takeaways):|$)/
  )
  if (whereItFailsMatch) {
    snapshot.whereItFails = whereItFailsMatch[1].trim()
  }

  // Extract "When to use:" - stop at newline followed by **Key Takeaways:
  const whenToUseMatch = snapshotContent.match(
    /\*\*When to use:\*\*\s*([\s\S]*?)(?=\n\*\*Key Takeaways:|$)/
  )
  if (whenToUseMatch) {
    snapshot.whenToUse = whenToUseMatch[1].trim()
  }

  // Extract "Key Takeaways:"
  const keyTakeawaysMatch = snapshotContent.match(/\*\*Key Takeaways:\*\*\s*([\s\S]*?)(?=\n##|$)/)
  if (keyTakeawaysMatch) {
    const takeawaysText = keyTakeawaysMatch[1].trim()
    // Extract bullet points (lines starting with -)
    const takeaways = takeawaysText
      .split('\n')
      .filter((line) => line.trim().startsWith('-'))
      .map((line) => line.replace(/^-\s*/, '').trim())
    if (takeaways.length > 0) {
      snapshot.keyTakeaways = takeaways
    }
  }

  return { beforeSnapshot, snapshot, afterSnapshot }
}

function SnapshotTopCard({ snapshot }: { snapshot: SnapshotData }) {
  const conciseWhyItMatters = snapshot.whyItMatters
    ? snapshot.whyItMatters
        .split(/(?<=[.!?])\s+/)
        .find((sentence) => sentence.trim().length > 0)
        ?.trim() || snapshot.whyItMatters
    : undefined

  return (
    <div className="border-t border-border pt-7">
      <div className="mb-5">
        <p id="snapshot" className="kicker-muted scroll-mt-24">
          Snapshot
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {snapshot.whatItIs && (
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 font-serif-playfair text-[20px] font-semibold text-text sm:text-[22px]">
              What it is
            </h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-text" {...props} />
                  ),
                }}
              >
                {snapshot.whatItIs}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whenToUse && (
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 font-serif-playfair text-[20px] font-semibold text-text sm:text-[22px]">
              When to use
            </h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-text" {...props} />
                  ),
                }}
              >
                {snapshot.whenToUse}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {conciseWhyItMatters && (
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 font-serif-playfair text-[20px] font-semibold text-text sm:text-[22px]">
              Why it matters
            </h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-text" {...props} />
                  ),
                }}
              >
                {conciseWhyItMatters}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whyItsTempting && (
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 font-serif-playfair text-[20px] font-semibold text-text sm:text-[22px]">
              Why it's tempting
            </h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-text" {...props} />
                  ),
                }}
              >
                {snapshot.whyItsTempting}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.whereItFails && (
          <div className="border-t border-border pt-4">
            <h3 className="mb-2 font-serif-playfair text-[20px] font-semibold text-text sm:text-[22px]">
              Where it fails
            </h3>
            <div className="text-base sm:text-[17px] text-text leading-[1.65]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-text" {...props} />
                  ),
                }}
              >
                {snapshot.whereItFails}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {snapshot.keyTakeaways && snapshot.keyTakeaways.length > 0 && (
          <div className="md:col-span-2 border-t border-brand/25 pt-5">
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-ink">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {snapshot.keyTakeaways.map((takeaway, index) => (
                <li
                  key={index}
                  className="text-base sm:text-[17px] text-text leading-[1.65] flex items-start gap-2"
                >
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
  )
}

// Helper function to parse Key Facts section from markdown content
function parseKeyFacts(content: string): {
  beforeKeyFacts: string
  keyFacts: Array<{
    title: string
    description: string
    sourceUrl?: string
    sourceText?: string
  }> | null
  afterKeyFacts: string
} {
  const keyFactsRegex = /##\s+Key Facts\s*\n([\s\S]*?)(?=\n##|$)/
  const match = content.match(keyFactsRegex)

  if (!match) {
    return { beforeKeyFacts: content, keyFacts: null, afterKeyFacts: '' }
  }

  const keyFactsStartIndex = match.index!
  const keyFactsContent = match[1]
  const beforeKeyFacts = content.substring(0, keyFactsStartIndex).trim()
  const afterKeyFacts = content.substring(keyFactsStartIndex + match[0].length).trim()

  // Parse bullet points (lines starting with - or *)
  const factLines = keyFactsContent
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return trimmed.startsWith('-') || trimmed.startsWith('*')
    })
    .map((line) => line.replace(/^[-\*]\s*/, '').trim())

  const keyFacts: Array<{
    title: string
    description: string
    sourceUrl?: string
    sourceText?: string
  }> = []

  for (const line of factLines) {
    if (!line) continue

    // Extract markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

    let description = line
    let sourceUrl: string | undefined
    let sourceText: string | undefined

    // Find all markdown links in the line
    const links: Array<{ text: string; url: string; fullMatch: string }> = []
    let match
    while ((match = markdownLinkRegex.exec(line)) !== null) {
      links.push({
        text: match[1],
        url: match[2],
        fullMatch: match[0],
      })
    }

    // If we found links, use the last one as the source (usually the citation)
    if (links.length > 0) {
      const lastLink = links[links.length - 1]
      sourceUrl = lastLink.url
      sourceText = lastLink.text

      // Remove the citation link entirely from description (all citations should be removed)
      description = description.replace(lastLink.fullMatch, '').trim()

      // Remove any other markdown links but keep their text
      links.slice(0, -1).forEach((link) => {
        description = description.replace(link.fullMatch, link.text)
      })
    }

    // Clean up description - remove trailing periods, extra spaces, and parentheses that might be left behind
    description = description.replace(/\s*\.\s*$/, '').trim()
    description = description.replace(/\s*\(\s*\)\s*/g, '').trim() // Remove empty parentheses
    description = description.replace(/\s+/g, ' ').trim()

    // Extract title (text before colon) and description (text after colon)
    let title = ''
    let descriptionText = description
    const colonIndex = description.indexOf(':')
    if (colonIndex > 0) {
      title = description.substring(0, colonIndex).trim()
      descriptionText = description.substring(colonIndex + 1).trim()
    }

    // Keep titles plain text only (no embedded markdown links)
    title = normalizeHeadingText(title.replace(/\*\*/g, '').trim())

    // Clean up any orphaned ** at the start or end of description (but preserve internal **text** patterns)
    // Remove leading ** followed by space, or trailing ** preceded by space
    descriptionText = descriptionText
      .replace(/^\*\*\s+/, '')
      .replace(/\s+\*\*$/, '')
      .trim()

    if (description) {
      keyFacts.push({ title, description: descriptionText, sourceUrl, sourceText })
    }
  }

  return { beforeKeyFacts, keyFacts: keyFacts.length > 0 ? keyFacts : null, afterKeyFacts }
}

// Helper function to parse Metrics to monitor section from markdown content
function parseMetricsToMonitor(content: string): {
  beforeMetrics: string
  metrics: Array<{ title: string; description: string }> | null
  afterMetrics: string
} {
  const metricsRegex = /#{2,3}\s+Metrics to monitor\s*\n([\s\S]*?)(?=\n##|$)/
  const match = content.match(metricsRegex)

  if (!match) {
    return { beforeMetrics: content, metrics: null, afterMetrics: '' }
  }

  const metricsStartIndex = match.index!
  const metricsContent = match[1]
  const beforeMetrics = content.substring(0, metricsStartIndex).trim()
  const afterMetrics = content.substring(metricsStartIndex + match[0].length).trim()

  // Parse bullet points (lines starting with - or *)
  const metricLines = metricsContent
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return trimmed.startsWith('-') || trimmed.startsWith('*')
    })
    .map((line) => line.replace(/^[-\*]\s*/, '').trim())

  const metrics: Array<{ title: string; description: string }> = []

  for (const line of metricLines) {
    // Extract title from **Title:** and description after colon
    const boldMatch = line.match(/\*\*([^*]+?):\*\*\s*(.+)/)
    if (boldMatch) {
      const title = normalizeHeadingText(boldMatch[1].trim())
      const description = boldMatch[2].trim()
      if (title && description) {
        metrics.push({ title, description })
      }
    }
  }

  const result = { beforeMetrics, metrics: metrics.length > 0 ? metrics : null, afterMetrics }
  return result
}

// Helper function to parse Step-by-step section from markdown content
function parseStepByStep(content: string): {
  beforeStepByStep: string
  steps: Array<{ number: number; title: string; description: string }> | null
  beforeStepsContent: string
  afterStepsContent: string
  afterStepByStep: string
} {
  const stepByStepRegex = /#{2,3}\s+Step-by-step\s*\n([\s\S]*?)(?=\n##|$)/
  const match = content.match(stepByStepRegex)

  if (!match) {
    return {
      beforeStepByStep: content,
      steps: null,
      beforeStepsContent: '',
      afterStepsContent: '',
      afterStepByStep: '',
    }
  }

  const stepByStepStartIndex = match.index!
  const stepByStepContent = match[1]
  const beforeStepByStep = content.substring(0, stepByStepStartIndex).trim()
  const afterStepByStep = content.substring(stepByStepStartIndex + match[0].length).trim()

  // Find the first numbered step to extract content before it
  const firstStepMatch = stepByStepContent.match(/(\d+)\.\s+\*\*/)
  const beforeStepsContent = firstStepMatch
    ? stepByStepContent.substring(0, firstStepMatch.index).trim()
    : ''

  // Parse numbered list items (1. **title:** description)
  // Stop at next step, h2 heading, or end of string
  // Updated to handle multi-line descriptions with bullet lists by finding step positions first
  const stepMatches: Array<{ index: number; number: number; title: string; fullMatch: string }> = []

  // First, find all step numbers and their positions
  const stepNumberRegex = /(\d+)\.\s+\*\*([^*]+?)[:.]\*\*/g
  let stepNumberMatch
  while ((stepNumberMatch = stepNumberRegex.exec(stepByStepContent)) !== null) {
    stepMatches.push({
      index: stepNumberMatch.index,
      number: parseInt(stepNumberMatch[1], 10),
      title: normalizeHeadingText(stepNumberMatch[2].trim()),
      fullMatch: stepNumberMatch[0],
    })
  }

  // Now extract the description for each step
  const steps: Array<{ number: number; title: string; description: string }> = []
  for (let i = 0; i < stepMatches.length; i++) {
    const currentMatch = stepMatches[i]
    const nextIndex =
      i < stepMatches.length - 1 ? stepMatches[i + 1].index : stepByStepContent.length

    // Find the end of the current step's title
    const titleEndIndex = currentMatch.index + currentMatch.fullMatch.length

    // Extract description from after the title until the next step
    let description = stepByStepContent.substring(titleEndIndex, nextIndex).trim()

    // Also check if we hit an h2 heading before the next step
    const h2Match = description.match(/\n##/)
    if (h2Match) {
      description = description.substring(0, h2Match.index).trim()
    }

    steps.push({
      number: currentMatch.number,
      title: currentMatch.title,
      description: description,
    })
  }

  // Calculate last step end index for afterStepsContent
  const lastStepEndIndex =
    stepMatches.length > 0
      ? (() => {
          const lastMatch = stepMatches[stepMatches.length - 1]
          const fromLastMatch = stepByStepContent.substring(lastMatch.index)
          const h2Split = fromLastMatch.split(/\n##/)
          return lastMatch.index + h2Split[0].length
        })()
      : 0

  // Extract content after the last step but still within the Step-by-step section
  const afterStepsContent =
    lastStepEndIndex > 0 ? stepByStepContent.substring(lastStepEndIndex).trim() : ''

  const result = {
    beforeStepByStep,
    steps: steps.length > 0 ? steps : null,
    beforeStepsContent,
    afterStepsContent,
    afterStepByStep,
  }
  return result
}

// Helper function to parse FAQ section from markdown content
function parseFAQ(content: string): {
  beforeFAQ: string
  faqItems: Array<{ question: string; answer: string }>
  afterFAQ: string
} {
  const faqRegex = /##\s+FAQ\s*\n([\s\S]*?)(?=\n##|$)/
  const match = content.match(faqRegex)

  if (!match) {
    return { beforeFAQ: content, faqItems: [], afterFAQ: '' }
  }

  const faqStartIndex = match.index!
  const faqContent = match[1]
  const beforeFAQ = content.substring(0, faqStartIndex).trim()
  const afterFAQ = content.substring(faqStartIndex + match[0].length).trim()

  // Parse Q/A pairs
  const qaRegex = /\*\*Q:\*\*\s*([\s\S]+?)\n+\*\*A:\*\*\s*([\s\S]+?)(?=\n+\*\*Q:|$)/g
  const faqItems: Array<{ question: string; answer: string }> = []
  let qaMatch

  while ((qaMatch = qaRegex.exec(faqContent)) !== null) {
    faqItems.push({
      question: qaMatch[1].trim(),
      answer: qaMatch[2].trim(),
    })
  }

  return { beforeFAQ, faqItems, afterFAQ }
}

export default async function WikiConceptArticlePage({
  categorySlug,
  conceptSlug,
  wikiArea,
}: WikiConceptArticlePageOptions) {
  // In development, opt out of route cache so content file changes show without restarting the server
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore()
  }
  try {
    const resolvedWikiArea = resolveWikiArea(wikiArea)
    const includeNonPublished = resolvedWikiArea.basePath !== PRICING_WIKI_AREA.basePath
    const category = getCategoryBySlug(categorySlug, { includeNonPublished })

    if (!category) {
      notFound()
    }

    const concept = category.concepts.find((c) => c.id === conceptSlug)

    if (!concept && resolvedWikiArea.basePath === PRICING_WIKI_AREA.basePath) {
      notFound()
    }

    // Try to get concept content
    const conceptData = getConceptBySlug(categorySlug, conceptSlug, { includeNonPublished })
    const conceptName = conceptData?.title || concept?.text.split(':')[0].trim() || conceptSlug
    const description =
      conceptData?.oneLiner ||
      (concept?.text.includes(':') ? concept.text.split(':').slice(1).join(':').trim() : '')
    if (!conceptData) {
      notFound()
    }
    const pagePath = resolvePagePath({ categorySlug, conceptSlug, wikiArea: resolvedWikiArea })
    const hasContent = conceptData !== null

    // Extract headings for table of contents (only first level - h2)
    let tocItems: Array<{ id: string; text: string; level: number }> = []
    try {
      tocItems =
        hasContent && conceptData
          ? extractHeadings(conceptData.content).filter(
              (item) => item.level === 2 && !item.id.startsWith('snapshot')
            )
          : []
    } catch (error) {
      console.error('Error extracting headings:', error)
    }

    // Parse Snapshot section if content exists
    let beforeSnapshot = ''
    let snapshot: SnapshotData | null = null
    let afterSnapshotContent = ''
    try {
      const snapshotResult =
        hasContent && conceptData
          ? parseSnapshot(conceptData.content)
          : { beforeSnapshot: '', snapshot: null, afterSnapshot: '' }
      beforeSnapshot = snapshotResult.beforeSnapshot
      snapshot = snapshotResult.snapshot
      afterSnapshotContent = snapshotResult.afterSnapshot
    } catch (error) {
      console.error('Error parsing snapshot:', error)
    }

    // Parse Key Facts section - parse from content after snapshot only (never full content when Snapshot exists to avoid duplicating it)
    let beforeKeyFacts = ''
    let keyFacts: Array<{
      title: string
      description: string
      sourceUrl?: string
      sourceText?: string
    }> | null = null
    let afterKeyFactsContent = ''
    try {
      const contentToParseForKeyFacts =
        hasContent && conceptData
          ? snapshot
            ? afterSnapshotContent
            : afterSnapshotContent || conceptData.content
          : ''
      const keyFactsResult = contentToParseForKeyFacts
        ? parseKeyFacts(contentToParseForKeyFacts)
        : { beforeKeyFacts: '', keyFacts: null, afterKeyFacts: '' }
      beforeKeyFacts = keyFactsResult.beforeKeyFacts
      keyFacts = keyFactsResult.keyFacts
      afterKeyFactsContent = keyFactsResult.afterKeyFacts
    } catch (error) {
      console.error('Error parsing key facts:', error)
    }

    // Parse Step-by-step section - parse from content after key facts
    let beforeStepByStep = ''
    let steps: Array<{ number: number; title: string; description: string }> | null = null
    let beforeStepsContent = ''
    let afterStepsContent = ''
    let afterStepByStepContent = ''
    try {
      // Search for Step-by-step - parse from afterKeyFactsContent; when Snapshot exists never use full content to avoid duplicating it
      const contentToParseForStepByStep =
        hasContent && conceptData
          ? afterKeyFactsContent || (snapshot ? afterSnapshotContent : conceptData.content)
          : ''
      const stepByStepResult = contentToParseForStepByStep
        ? parseStepByStep(contentToParseForStepByStep)
        : {
            beforeStepByStep: '',
            steps: null,
            beforeStepsContent: '',
            afterStepsContent: '',
            afterStepByStep: '',
          }
      beforeStepByStep = stepByStepResult.beforeStepByStep
      steps = stepByStepResult.steps
      beforeStepsContent = stepByStepResult.beforeStepsContent
      afterStepsContent = stepByStepResult.afterStepsContent
      afterStepByStepContent = stepByStepResult.afterStepByStep
    } catch (error) {
      console.error('Error parsing step-by-step:', error)
    }

    // Parse Metrics to monitor section - parse from content after step-by-step
    let beforeMetrics = ''
    let metrics: Array<{ title: string; description: string }> | null = null
    let afterMetricsContent = ''
    try {
      // Search for Metrics - when Snapshot exists never use full content to avoid duplicating it
      const contentToParseForMetrics =
        hasContent && conceptData
          ? afterStepByStepContent ||
            afterKeyFactsContent ||
            (snapshot ? afterSnapshotContent : conceptData.content)
          : ''
      const metricsResult = contentToParseForMetrics
        ? parseMetricsToMonitor(contentToParseForMetrics)
        : { beforeMetrics: '', metrics: null, afterMetrics: '' }
      beforeMetrics = metricsResult.beforeMetrics
      metrics = metricsResult.metrics
      afterMetricsContent = metricsResult.afterMetrics
    } catch (error) {
      console.error('Error parsing metrics:', error)
    }

    // Parse FAQ section - parse from content after metrics
    let beforeFAQ = ''
    let faqItems: Array<{ question: string; answer: string }> = []
    let afterFAQ = ''
    try {
      const contentToParseForFAQ =
        hasContent && conceptData
          ? afterMetricsContent ||
            afterStepByStepContent ||
            afterKeyFactsContent ||
            afterSnapshotContent ||
            (snapshot ? '' : conceptData.content)
          : ''
      const faqResult = contentToParseForFAQ
        ? parseFAQ(contentToParseForFAQ)
        : { beforeFAQ: '', faqItems: [], afterFAQ: '' }
      beforeFAQ = faqResult.beforeFAQ
      faqItems = faqResult.faqItems
      afterFAQ = faqResult.afterFAQ
    } catch (error) {
      console.error('Error parsing FAQ:', error)
    }

    const references = (conceptData?.references || []).filter((ref) => ref?.title && ref?.url)
    const relatedConceptIdsFromFrontmatter = (conceptData?.relatedConcepts || []).filter(
      (id) => id && id !== conceptSlug
    )
    const fallbackRelatedIds = category.concepts
      .filter((item) => item.id && item.id !== conceptSlug)
      .map((item) => item.id as string)
    const relatedConceptIds = Array.from(
      new Set(
        (relatedConceptIdsFromFrontmatter.length > 0
          ? relatedConceptIdsFromFrontmatter
          : fallbackRelatedIds
        ).slice(0, 4)
      )
    )
    const relatedConceptCards = relatedConceptIds
      .map((relatedId) => {
        const data = getConceptBySlug(categorySlug, relatedId, { includeNonPublished })
        if (!data) {
          return null
        }
        return {
          id: relatedId,
          title: data.title || relatedId,
          summary: data.oneLiner || '',
          href: getWikiConceptPagePath(resolvedWikiArea, categorySlug, relatedId),
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
    const conceptBodyWidthClass = 'w-full max-w-[64rem]'
    const breadcrumbs =
      resolvedWikiArea.basePath === PRICING_WIKI_AREA.basePath
        ? [
            { name: 'Pricing', url: '/wiki/pricing' },
            { name: category.title, url: `${PRICING_WIKI_AREA.basePath}/${category.slug}` },
            { name: conceptName, url: pagePath },
          ]
        : pagePath === resolvedWikiArea.basePath
          ? [{ name: category.title, url: pagePath }]
          : [
              { name: category.title, url: resolvedWikiArea.basePath },
              { name: conceptName, url: pagePath },
            ]

    const entityAbout = getWikiConceptEntityLink(categorySlug, conceptSlug)
    const entityMentions = getWikiConceptMentionLinks(
      categorySlug,
      conceptData?.relatedConcepts ?? relatedConceptIds
    )

    const articleJsonLd = generateTechArticleJsonLd({
      title: conceptName,
      description: description || `Learn about ${conceptName} in the context of ${category.title}`,
      url: `${SITE_ORIGIN}${pagePath}`,
      datePublished: conceptData?.publishedAt,
      dateModified: conceptData?.lastUpdated || category.updated,
      author: conceptData?.owner || 'Dr. Sarah Zou',
      about: entityAbout,
      mentions: entityMentions,
    })

    const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs)

    const faqJsonLd =
      faqItems.length > 0
        ? generateFAQJsonLd({
            url: `${SITE_ORIGIN}${pagePath}`,
            faqItems: faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          })
        : null

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

        <div className="resource-editorial wiki-concept-editorial min-h-screen bg-page pb-20">
          <div className="section-shell max-w-[96rem] py-8">
            {breadcrumbs.length > 0 && (
              <div className="mb-8 border-b border-border-soft pb-5">
                <nav className="flex flex-wrap items-center gap-y-2 text-[11px] uppercase tracking-[0.12em] text-text-subtle">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={index} className="flex items-center">
                      {index > 0 && <span className="mx-2.5">/</span>}
                      <Link href={crumb.url} className="transition-colors hover:text-brand-ink">
                        {crumb.name}
                      </Link>
                    </span>
                  ))}
                </nav>
              </div>
            )}

            {tocItems.length > 0 && (
              <div className="mb-8 xl:hidden">
                <details className="border-y border-border-soft">
                  <summary className="cursor-pointer list-none py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text">
                    On this page
                  </summary>
                  <div className="pb-5">
                    <TableOfContents items={tocItems} title={conceptName} />
                  </div>
                </details>
              </div>
            )}

            <div className="flex gap-10">
              {/* Table of Contents Sidebar - Left side, outside content box */}
              {tocItems.length > 0 && (
                <aside className="hidden w-56 flex-shrink-0 xl:block">
                  <div className="sticky top-24">
                    <TableOfContents items={tocItems} title={conceptName} />
                  </div>
                </aside>
              )}

              {/* Main content area with WikiLayout */}
              <div className="min-w-0 flex-1">
                <WikiLayout
                  breadcrumbs={[]}
                  customGridRatio="10:2"
                  noOuterWrapper={true}
                  showAreasFooter={false}
                  rightSidebarContent={
                    <div className="space-y-6">
                      <div className="border-t border-border pt-6">
                        <p className="kicker-muted mb-5">Article details</p>
                        <div className="space-y-4">
                          <div>
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-subtle">
                              Category
                            </p>
                            <Link
                              href={
                                resolvedWikiArea.basePath === PRICING_WIKI_AREA.basePath
                                  ? `${PRICING_WIKI_AREA.basePath}/${category.slug}`
                                  : resolvedWikiArea.basePath
                              }
                              className="text-[13px] font-medium text-brand-ink hover:underline"
                            >
                              {category.title}
                            </Link>
                          </div>
                          {conceptData?.lastUpdated && (
                            <div>
                              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-subtle">
                                Last updated
                              </p>
                              <p className="text-[13px] text-text-muted">
                                {new Date(
                                  `${conceptData.lastUpdated}T00:00:00Z`
                                ).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  timeZone: 'UTC',
                                })}
                              </p>
                            </div>
                          )}
                          {conceptData?.readingTime && (
                            <div>
                              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-subtle">
                                Reading time
                              </p>
                              <p className="text-[13px] text-text-muted">
                                {conceptData.readingTime} minutes
                              </p>
                            </div>
                          )}
                          {conceptData?.tags && conceptData.tags.length > 0 && (
                            <div>
                              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-text-subtle">
                                Tags
                              </p>
                              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                {conceptData.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="border-b border-border pb-0.5 text-[11px] text-text-muted"
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
                        canonicalUrl={`${SITE_ORIGIN}${pagePath}`}
                        title={conceptName}
                        categoryTitle={category.title}
                        lastUpdated={conceptData?.lastUpdated || category.updated}
                        conceptSlug={conceptSlug}
                      />
                    </div>
                  }
                >
                  {/* Header */}
                  <header
                    className={`mb-14 border-y border-border-soft bg-surface px-6 py-10 sm:px-9 sm:py-12 ${conceptBodyWidthClass}`}
                  >
                    <p className="kicker-accent">{resolvedWikiArea.areaLabel}</p>
                    <h1 className="mt-5 font-serif-playfair text-[length:clamp(2.25rem,2vw+1.3rem,3.6rem)]">
                      {conceptName}
                    </h1>
                    {description && (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p
                              className="mb-0 mt-6 max-w-[42rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]"
                              {...props}
                            />
                          ),
                          a: ({ node, href, ...props }: any) => {
                            const isInternalLink = href?.startsWith('/')
                            if (isInternalLink && href) {
                              return (
                                <Link
                                  href={href}
                                  className="text-brand-ink hover:underline font-medium not-italic"
                                  {...props}
                                />
                              )
                            }
                            return (
                              <a
                                href={href}
                                className="text-brand-ink hover:underline not-italic"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                {...props}
                              />
                            )
                          },
                        }}
                      >
                        {description}
                      </ReactMarkdown>
                    )}
                    {snapshot && (
                      <div className="mt-8">
                        <SnapshotTopCard snapshot={snapshot} />
                      </div>
                    )}
                  </header>

                  {/* Content */}
                  <div
                    className={`prose prose-lg ${conceptBodyWidthClass} text-text text-base sm:text-[17px] leading-[1.7]`}
                  >
                    {hasContent && conceptData ? (
                      <>
                        {/* Content before Snapshot */}
                        {beforeSnapshot && <WikiMarkdownHtml markdown={beforeSnapshot} />}

                        {/* Content after Snapshot but before Key Facts (What, When, Why sections) */}
                        {keyFacts &&
                          keyFacts.length > 0 &&
                          beforeKeyFacts &&
                          beforeKeyFacts.trim() && <WikiMarkdownHtml markdown={beforeKeyFacts} />}
                        {/* Content after Snapshot when there are no Key Facts, Steps, or Metrics but FAQ exists - render main content sections before FAQ */}
                        {(() => {
                          // Only render if there are no intermediate sections, FAQ exists, and we have content to render
                          // Use beforeFAQ directly to avoid duplication (it's already parsed from the content)
                          const shouldRender =
                            (!keyFacts || keyFacts.length === 0) &&
                            (!steps || steps.length === 0) &&
                            (!metrics || metrics.length === 0) &&
                            faqItems.length > 0 &&
                            beforeFAQ &&
                            beforeFAQ.trim()
                          return shouldRender
                        })() && (
                          <div key="after-snapshot-content-no-intermediate">
                            <WikiMarkdownHtml markdown={beforeFAQ} />
                          </div>
                        )}

                        {/* Key Facts Section */}
                        {keyFacts && keyFacts.length > 0 && (
                          <div className="mb-8">
                            <h2
                              id="key-facts"
                              className="font-serif-playfair mb-4 mt-[4.5rem] scroll-mt-24"
                            >
                              Key Facts
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                              {keyFacts.map((fact, index) => {
                                // Choose icon based on content (check both title and description)
                                const contentLower =
                                  `${fact.title} ${fact.description}`.toLowerCase()
                                let Icon = DollarSign
                                if (
                                  contentLower.includes('hour') ||
                                  contentLower.includes('time')
                                ) {
                                  Icon = Clock
                                } else if (
                                  contentLower.includes('cream') ||
                                  contentLower.includes('segment')
                                ) {
                                  Icon = Target
                                } else if (
                                  contentLower.includes('loyal') ||
                                  contentLower.includes('brand') ||
                                  contentLower.includes('retention')
                                ) {
                                  Icon = CheckCircle
                                } else if (
                                  contentLower.includes('wtp') ||
                                  contentLower.includes('premium') ||
                                  contentLower.includes('tier') ||
                                  contentLower.includes('growth')
                                ) {
                                  Icon = TrendingUp
                                } else if (
                                  contentLower.includes('failure') ||
                                  contentLower.includes('risk') ||
                                  contentLower.includes('fail')
                                ) {
                                  Icon = AlertCircle
                                } else if (
                                  contentLower.includes('compan') ||
                                  contentLower.includes('companies') ||
                                  contentLower.includes('firms')
                                ) {
                                  Icon = Users
                                } else if (
                                  contentLower.includes('profit') ||
                                  contentLower.includes('profitability') ||
                                  contentLower.includes('operating profit')
                                ) {
                                  Icon = DollarSign
                                } else if (
                                  contentLower.includes('value-based') ||
                                  contentLower.includes('pricing strategy')
                                ) {
                                  Icon = DollarSign
                                }

                                return (
                                  <div key={index} className="border-t border-border pt-5">
                                    <div className="mb-4 flex items-center gap-3">
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
                                                target={
                                                  href?.startsWith('http') ? '_blank' : undefined
                                                }
                                                rel={
                                                  href?.startsWith('http')
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                                }
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
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Content after Key Facts but before Step-by-step */}
                        {steps &&
                          steps.length > 0 &&
                          beforeStepByStep &&
                          beforeStepByStep.trim() && (
                            <WikiMarkdownHtml markdown={beforeStepByStep} />
                          )}

                        {/* Step-by-step Section */}
                        {(() => {
                          return null
                        })()}
                        {steps && steps.length > 0 && (
                          <div className="mb-8">
                            <h2
                              id="step-by-step"
                              className="font-serif-playfair mb-4 mt-[4.5rem] scroll-mt-24"
                            >
                              Step-by-step
                            </h2>
                            {/* Content above steps */}
                            {beforeStepsContent && (
                              <div className="mb-6">
                                <ReactMarkdown
                                  remarkPlugins={[
                                    remarkGfm,
                                    [remarkMath, { singleDollarTextMath: false }],
                                  ]}
                                  rehypePlugins={[rehypeKatex]}
                                  components={{
                                    p: ({ node, ...props }) => (
                                      <p
                                        className="text-base sm:text-[17px] text-text leading-[1.65] mb-6"
                                        {...props}
                                      />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                      <blockquote
                                        className="bg-white border-l-4 border-brand pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm"
                                        {...props}
                                      />
                                    ),
                                    a: ({ node, href, ...props }: any) => {
                                      const isInternalLink = href?.startsWith('/')
                                      if (isInternalLink && href) {
                                        return (
                                          <Link
                                            href={href}
                                            className="text-brand-ink hover:underline font-medium"
                                            {...props}
                                          />
                                        )
                                      }
                                      return (
                                        <a
                                          href={href}
                                          className="text-brand-ink hover:underline"
                                          target={href?.startsWith('http') ? '_blank' : undefined}
                                          rel={
                                            href?.startsWith('http')
                                              ? 'noopener noreferrer'
                                              : undefined
                                          }
                                          {...props}
                                        />
                                      )
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
                                        <span className="text-white font-bold text-lg">
                                          {step.number}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 border-t border-border pt-3">
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
                                              const isInternalLink = href?.startsWith('/')
                                              if (isInternalLink && href) {
                                                return (
                                                  <Link
                                                    href={href}
                                                    className="text-brand-ink hover:underline font-medium"
                                                    {...props}
                                                  />
                                                )
                                              }
                                              return (
                                                <a
                                                  href={href}
                                                  className="text-brand-ink hover:underline"
                                                  target={
                                                    href?.startsWith('http') ? '_blank' : undefined
                                                  }
                                                  rel={
                                                    href?.startsWith('http')
                                                      ? 'noopener noreferrer'
                                                      : undefined
                                                  }
                                                  {...props}
                                                />
                                              )
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
                                  remarkPlugins={[
                                    remarkGfm,
                                    [remarkMath, { singleDollarTextMath: false }],
                                  ]}
                                  rehypePlugins={[rehypeKatex]}
                                  components={{
                                    p: ({ node, ...props }) => (
                                      <p
                                        className="text-base sm:text-[17px] text-text leading-[1.65]"
                                        {...props}
                                      />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                      <blockquote
                                        className="bg-white border-l-4 border-brand pl-6 pr-4 py-4 my-6 rounded-r-lg shadow-sm"
                                        {...props}
                                      />
                                    ),
                                    a: ({ node, href, ...props }: any) => {
                                      const isInternalLink = href?.startsWith('/')
                                      if (isInternalLink && href) {
                                        return (
                                          <Link
                                            href={href}
                                            className="text-brand-ink hover:underline font-medium"
                                            {...props}
                                          />
                                        )
                                      }
                                      return (
                                        <a
                                          href={href}
                                          className="text-brand-ink hover:underline"
                                          target={href?.startsWith('http') ? '_blank' : undefined}
                                          rel={
                                            href?.startsWith('http')
                                              ? 'noopener noreferrer'
                                              : undefined
                                          }
                                          {...props}
                                        />
                                      )
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
                          <WikiMarkdownHtml markdown={beforeMetrics} />
                        )}
                        {/* Content after Step-by-step when there are no Metrics or FAQ sections */}
                        {steps &&
                          steps.length > 0 &&
                          (!metrics || metrics.length === 0) &&
                          faqItems.length === 0 &&
                          afterStepByStepContent &&
                          afterStepByStepContent.trim() && (
                            <WikiMarkdownHtml markdown={afterStepByStepContent} />
                          )}
                        {/* Content when there are no Step-by-step, Metrics, or FAQ sections - render through beforeFAQ (last parsed) */}
                        {(!steps || steps.length === 0) &&
                          (!metrics || metrics.length === 0) &&
                          faqItems.length === 0 &&
                          beforeFAQ &&
                          beforeFAQ.trim() && (
                            <>
                              <WikiMarkdownHtml markdown={beforeFAQ} />
                            </>
                          )}

                        {/* Metrics to monitor Section */}
                        {metrics && metrics.length > 0 && (
                          <div className="mb-8">
                            <h2
                              id="metrics-to-monitor"
                              className="font-serif-playfair mb-4 mt-[4.5rem] scroll-mt-24"
                            >
                              Metrics to monitor
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                              {metrics.map((metric, index) => {
                                // Choose icon based on content
                                const titleLower = metric.title.toLowerCase()
                                let Icon = TrendingUp

                                // Pricing metric page specific metrics
                                if (
                                  titleLower.includes('nrr') ||
                                  titleLower.includes('net revenue retention') ||
                                  titleLower.includes('retention')
                                ) {
                                  Icon = BarChart
                                } else if (
                                  titleLower.includes('overage') ||
                                  titleLower.includes('contribution')
                                ) {
                                  Icon = Percent
                                } else if (
                                  titleLower.includes('churn') ||
                                  titleLower.includes('downgrade')
                                ) {
                                  Icon = TrendingDown
                                } else if (
                                  titleLower.includes('dispute') ||
                                  titleLower.includes('credit') ||
                                  titleLower.includes('invoice')
                                ) {
                                  Icon = FileWarning
                                } else if (
                                  titleLower.includes('margin') ||
                                  titleLower.includes('gross margin')
                                ) {
                                  Icon = DollarSign
                                } else if (
                                  titleLower.includes('usage') &&
                                  titleLower.includes('adoption')
                                ) {
                                  Icon = Activity
                                }
                                // General metrics
                                else if (
                                  titleLower.includes('price') ||
                                  titleLower.includes('asp') ||
                                  titleLower.includes('arpa')
                                ) {
                                  Icon = DollarSign
                                } else if (titleLower.includes('elasticity')) {
                                  Icon = TrendingUp
                                } else if (
                                  titleLower.includes('discount') ||
                                  titleLower.includes('realization')
                                ) {
                                  Icon = AlertCircle
                                }

                                return (
                                  <div key={index} className="border-t border-border pt-5">
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
                                              target={
                                                href?.startsWith('http') ? '_blank' : undefined
                                              }
                                              rel={
                                                href?.startsWith('http')
                                                  ? 'noopener noreferrer'
                                                  : undefined
                                              }
                                              {...props}
                                            />
                                          ),
                                        }}
                                      >
                                        {metric.description}
                                      </ReactMarkdown>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Content after Metrics but before FAQ */}
                        {metrics && metrics.length > 0 && beforeFAQ && beforeFAQ.trim() && (
                          <WikiMarkdownHtml markdown={beforeFAQ} />
                        )}
                        {/* Content after Metrics when there are no FAQ sections - only render if FAQ doesn't exist to avoid duplication with beforeFAQ */}
                        {metrics &&
                          metrics.length > 0 &&
                          faqItems.length === 0 &&
                          afterMetricsContent &&
                          afterMetricsContent.trim() && (
                            <WikiMarkdownHtml markdown={afterMetricsContent} />
                          )}
                        {/* Content before FAQ (only if FAQ exists, no Metrics, and content hasn't been rendered yet via afterSnapshotContent) */}
                        {(() => {
                          // Prevent rendering if content was already rendered via afterSnapshotContent path (no intermediate sections)
                          // This happens when there are no keyFacts, steps, or metrics, but FAQ exists
                          const hasNoIntermediateSections =
                            (!keyFacts || keyFacts.length === 0) &&
                            (!steps || steps.length === 0) &&
                            (!metrics || metrics.length === 0)
                          const contentAlreadyRendered =
                            hasNoIntermediateSections &&
                            faqItems.length > 0 &&
                            beforeFAQ &&
                            beforeFAQ.trim()
                          // Only render beforeFAQ if:
                          // 1. FAQ exists
                          // 2. No metrics (metrics have their own beforeFAQ rendering path)
                          // 3. Has intermediate sections (keyFacts or steps) - content wasn't already rendered
                          // 4. Content wasn't already rendered
                          const shouldRender =
                            !contentAlreadyRendered &&
                            faqItems.length > 0 &&
                            (!metrics || metrics.length === 0) &&
                            ((keyFacts && keyFacts.length > 0) || (steps && steps.length > 0)) &&
                            beforeFAQ &&
                            beforeFAQ.trim()
                          return !!shouldRender
                        })() ? (
                          <div key="before-faq-content">
                            <WikiMarkdownHtml markdown={beforeFAQ} />
                          </div>
                        ) : null}

                        {/* FAQ Section */}
                        {faqItems.length > 0 && (
                          <section className="mb-12 mt-12">
                            <h2
                              id="faq"
                              className="mb-8 mt-[4.5rem] scroll-mt-24 font-serif-playfair"
                            >
                              Frequently asked questions
                            </h2>
                            <FAQList
                              className="not-prose"
                              items={faqItems.map((item) => ({
                                q: item.question,
                                a: (
                                  <div>
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeRaw]}
                                      components={{
                                        p: ({ node, ...props }) => (
                                          <p className="mb-3 last:mb-0" {...props} />
                                        ),
                                        strong: ({ node, ...props }) => (
                                          <strong className="font-semibold text-text" {...props} />
                                        ),
                                        a: ({ node, href, ...props }) => {
                                          const isInternalLink = href?.startsWith('/')
                                          if (isInternalLink && href) {
                                            return (
                                              <Link
                                                href={href}
                                                className="text-brand-ink hover:underline font-medium"
                                                {...props}
                                              />
                                            )
                                          }
                                          return (
                                            <a
                                              href={href}
                                              className="text-brand-ink hover:underline"
                                              target={
                                                href?.startsWith('http') ? '_blank' : undefined
                                              }
                                              rel={
                                                href?.startsWith('http')
                                                  ? 'noopener noreferrer'
                                                  : undefined
                                              }
                                              {...props}
                                            />
                                          )
                                        },
                                      }}
                                    >
                                      {item.answer}
                                    </ReactMarkdown>
                                  </div>
                                ),
                              }))}
                            />
                          </section>
                        )}

                        {/* Content after FAQ - only render if there's actual content (not just whitespace or newlines) */}
                        {(() => {
                          const shouldRender =
                            afterFAQ &&
                            afterFAQ.trim() &&
                            afterFAQ.trim().length > 0 &&
                            !/^\s*$/.test(afterFAQ)
                          return shouldRender
                        })() && (
                          <>
                            <WikiMarkdownHtml markdown={afterFAQ} />
                          </>
                        )}

                        {references.length > 0 && (
                          <section className="mt-12 mb-12">
                            <h2
                              id="references"
                              className="font-serif-playfair mb-4 mt-[4.5rem] scroll-mt-24"
                            >
                              References / Further reading
                            </h2>
                            <ol className="list-decimal pl-5 space-y-3">
                              {references.map((ref, index) => (
                                <li
                                  key={`${ref.url}-${index}`}
                                  className="text-base sm:text-[17px] text-text leading-[1.65]"
                                >
                                  <a
                                    href={ref.url}
                                    className="text-brand-ink hover:underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {ref.title}
                                  </a>
                                  {ref.source && (
                                    <span className="text-text-muted"> - {ref.source}</span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          </section>
                        )}

                        {relatedConceptCards.length > 0 && (
                          <section
                            id="related-concepts"
                            className="wiki-related-concepts not-prose mb-14 mt-20 scroll-mt-24 border-y border-border-soft bg-surface px-6 py-10 sm:px-9 sm:py-12"
                          >
                            <p className="kicker-accent">Continue through the system</p>
                            <h2 className="font-serif-playfair">Related concepts / Next steps</h2>
                            <div className="mt-8 border-t border-border">
                              {relatedConceptCards.map((related, index) => (
                                <Link
                                  key={related.id}
                                  href={related.href}
                                  className="group grid gap-3 border-b border-border-soft py-6 no-underline sm:grid-cols-[2.5rem_minmax(0,0.7fr)_minmax(15rem,1.3fr)_auto] sm:items-start sm:gap-7"
                                >
                                  <span className="pt-1 text-[10px] font-semibold tracking-[0.14em] text-text-subtle">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <h3 className="font-serif-playfair font-medium text-ink transition-colors group-hover:text-brand-ink">
                                    {related.title}
                                  </h3>
                                  {related.summary ? (
                                    <p className="text-[15px] leading-[1.75] text-text-muted">
                                      {related.summary}
                                    </p>
                                  ) : (
                                    <span aria-hidden />
                                  )}
                                  <ArrowRight
                                    className="mt-1 hidden size-4 text-brand transition-transform group-hover:translate-x-1 sm:block"
                                    aria-hidden
                                  />
                                </Link>
                              ))}
                            </div>
                          </section>
                        )}

                        {/* CTA Section */}
                        <div className="mx-auto mb-8 mt-16 max-w-4xl">
                          <div className="wiki-concept-cta border-y border-white/10 bg-ink p-8 text-left md:p-12">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                              From reference to recommendation
                            </p>
                            <h2 className="mt-4 max-w-[34rem] font-serif-playfair !text-white">
                              If you want help applying this to your business…
                            </h2>
                            <p className="mt-4 max-w-[38rem] text-[15px] leading-[1.8] text-white/65">
                              Bring the commercial decision, the evidence you have, and the
                              constraint you cannot ignore.
                            </p>
                            <Link
                              href="/book"
                              className="mt-7 inline-flex items-center border-b border-white/50 pb-1 text-[15px] font-medium text-white no-underline"
                            >
                              Book a 15-minute introduction
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
                            Detailed information about <strong>{conceptName}</strong> is currently
                            being developed. This page will include step-by-step guides, real-world
                            examples, and practical applications.
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
      </>
    )
  } catch (error) {
    // Log the error and re-throw it so it can be caught by error boundaries
    console.error('Error in ConceptPage:', error)
    throw error
  }
}
