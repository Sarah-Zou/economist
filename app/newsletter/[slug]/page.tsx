import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import CiteThisPage from '@/components/wiki/CiteThisPage'
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import TableOfContents from '@/components/wiki/TableOfContents'
import { normalizeHeadingText, createUniqueHeadingId } from '@/lib/wikiHeadingUtils'
import { getArticleConfig } from '@/lib/newsletterArticleConfig'
import { createNewsletterMarkdownComponents } from '@/components/newsletter/newsletterMarkdownComponents'
import TakeawayBox from '@/components/newsletter/TakeawayBox'
import ArticleCTA from '@/components/newsletter/ArticleCTA'
import DecisionMatrix from '@/components/newsletter/DecisionMatrix'
import '@/app/prose.css'

// ─────────────────────────────────────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) return { title: 'Post Not Found' }

  const canonicalUrl = post.canonical || `https://sarahzou.com/newsletter/${post.slug}`

  return {
    title: post.title,
    description: post.description,
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
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format a post date for display.
 *
 * gray-matter parses YAML `date:` values as JS Date objects (UTC midnight),
 * but the Post.date type is declared as string for simplicity. We handle both
 * and always display the UTC date components to avoid UTC→local timezone drift.
 */
function formatPostDate(date: unknown): string {
  let d: Date
  if (date instanceof Date) {
    d = date
  } else {
    const s = String(date)
    // For ISO date-only strings ("2026-06-23"), add a noon time to avoid
    // UTC-midnight → previous-day shifts. For full ISO strings keep as-is.
    d = s.length === 10 ? new Date(s + 'T12:00:00') : new Date(s)
  }
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth()
  const day = d.getUTCDate()
  return format(new Date(y, m, day), 'MMMM d, yyyy')
}

// ─────────────────────────────────────────────────────────────────────────────
// Content parsing helpers
// ─────────────────────────────────────────────────────────────────────────────

interface TocItem {
  id: string
  text: string
  level: number
}

/** Extract H2 headings from markdown for the table of contents. */
function extractHeadingsForTOC(
  content: string,
  labelOverrides?: Record<string, string>
): TocItem[] {
  const headingRegex = /^##\s+(.+)$/gm
  const seenIds = new Map<string, number>()
  const items: TocItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const text = normalizeHeadingText(match[1].trim())
    const id = createUniqueHeadingId(text, seenIds)
    items.push({
      id,
      text: (labelOverrides && labelOverrides[id]) ?? text,
      level: 2,
    })
  }

  return items
}

interface ParsedContent {
  mainContent: string
  referencesMarkdown: string | null
  footerMarkdown: string | null
}

/**
 * Separates the article body into:
 *  - mainContent: everything before the first `---` separator that precedes References
 *  - referencesMarkdown: content from the References heading through the next `---`
 *  - footerMarkdown: content after the second `---` separator
 */
function parseArticleContent(content: string): ParsedContent {
  // Normalise line endings
  const text = content.replace(/\r\n/g, '\n')

  // Find HR separators (`---` alone on a line)
  const hrRegex = /\n---\n/g
  const hrPositions: number[] = []
  let m: RegExpExecArray | null

  while ((m = hrRegex.exec(text)) !== null) {
    hrPositions.push(m.index)
  }

  if (hrPositions.length === 0) {
    return { mainContent: text, referencesMarkdown: null, footerMarkdown: null }
  }

  // The first HR separates main content from references
  const firstHr = hrPositions[0]
  const mainContent = text.substring(0, firstHr).trim()

  if (hrPositions.length === 1) {
    // Everything after the first HR is the references
    const referencesMarkdown = text.substring(firstHr + 5).trim() // 5 = length of '\n---\n'
    return { mainContent, referencesMarkdown, footerMarkdown: null }
  }

  // Second HR separates references from footer
  const secondHr = hrPositions[1]
  const referencesMarkdown = text.substring(firstHr + 5, secondHr).trim()
  const footerMarkdown = text.substring(secondHr + 5).trim()

  return { mainContent, referencesMarkdown, footerMarkdown: footerMarkdown || null }
}

interface ContentSection {
  /** null for the intro chunk before the first H2 */
  heading: string | null
  headingId: string | null
  level: number
  body: string
}

/**
 * Splits markdown content by H2 headings.
 * The first entry is the intro (heading = null).
 */
function splitContentBySections(content: string): ContentSection[] {
  const headingRegex = /^(##)\s+(.+)$/gm
  const sections: ContentSection[] = []
  const seenIds = new Map<string, number>()

  let lastIndex = 0
  let lastHeading: string | null = null
  let lastHeadingId: string | null = null
  let lastLevel = 0
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    // Save everything before this heading as the previous section's body
    const body = content.substring(lastIndex, match.index).trim()
    sections.push({
      heading: lastHeading,
      headingId: lastHeadingId,
      level: lastLevel,
      body,
    })

    lastHeading = normalizeHeadingText(match[2].trim())
    lastHeadingId = createUniqueHeadingId(lastHeading, seenIds)
    lastLevel = match[1].length
    lastIndex = match.index + match[0].length
  }

  // Last section
  sections.push({
    heading: lastHeading,
    headingId: lastHeadingId,
    level: lastLevel,
    body: content.substring(lastIndex).trim(),
  })

  return sections
}

/**
 * Splits a section body around the first markdown table it contains.
 * A markdown table is a contiguous block of lines starting with `|`.
 */
function splitBodyAroundTable(body: string): {
  before: string
  hasTable: boolean
  after: string
} {
  const lines = body.split('\n')
  let tableStart = -1
  let tableEnd = -1

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trimStart()
    if (trimmed.startsWith('|')) {
      if (tableStart === -1) tableStart = i
      tableEnd = i
    } else if (tableStart !== -1 && tableEnd !== -1 && !trimmed.startsWith('|')) {
      break
    }
  }

  if (tableStart === -1) {
    return { before: body, hasTable: false, after: '' }
  }

  return {
    before: lines.slice(0, tableStart).join('\n').trim(),
    hasTable: true,
    after: lines
      .slice(tableEnd + 1)
      .join('\n')
      .trim(),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsletterPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const articleConfig = getArticleConfig(params.slug)
  const canonicalUrl = post.canonical || `https://sarahzou.com/newsletter/${post.slug}`

  // Strip the leading H1 (it's rendered from frontmatter)
  const rawContent = post.content.replace(/^# .*$/m, '').trim()

  // Parse into main body, references, and footer sections
  const { mainContent, referencesMarkdown, footerMarkdown } = parseArticleContent(rawContent)

  // TOC items (H2 only, with optional label overrides from config)
  const tocItems = extractHeadingsForTOC(mainContent, articleConfig?.tocLabels)

  // Shared markdown components (single seenIds map across all ReactMarkdown calls)
  const mdComponents = createNewsletterMarkdownComponents()

  // JSON-LD
  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.description,
    url: canonicalUrl,
    image: `https://sarahzou.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
  })

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Newsletter', url: '/newsletter' },
    { name: post.title, url: `/newsletter/${post.slug}` },
  ])

  // ── Section-based rendering for config articles ──────────────────────────

  const renderConfigArticle = () => {
    const sections = splitContentBySections(mainContent)
    const introSection = sections[0]
    const bodySections = sections.slice(1)

    return (
      <>
        {/* Intro paragraphs */}
        {introSection.body && (
          <div className="newsletter-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {introSection.body}
            </ReactMarkdown>
          </div>
        )}

        {/* Takeaway box + soft CTA */}
        {articleConfig?.takeaway && (
          <>
            <TakeawayBox items={articleConfig.takeaway} />
            {articleConfig.introCtaCopy && (
              <ArticleCTA variant="soft" copy={articleConfig.introCtaCopy} />
            )}
          </>
        )}

        {/* H2 sections */}
        {bodySections.map((section, i) => {
          const isMatrixSection =
            articleConfig?.matrixHeadingSlug &&
            section.headingId === articleConfig.matrixHeadingSlug
          const isWorksheetSection =
            articleConfig?.worksheetHeadingSlug &&
            section.headingId === articleConfig.worksheetHeadingSlug

          return (
            <section key={i}>
              {/* Section heading */}
              {section.heading && section.headingId && (
                <h2
                  id={section.headingId}
                  className="newsletter-h2 font-serif-playfair mt-16 mb-5 scroll-mt-24"
                >
                  {section.heading}
                </h2>
              )}

              {/* Section body */}
              {isMatrixSection && articleConfig?.matrix ? (
                (() => {
                  const { before, hasTable, after } = splitBodyAroundTable(section.body)
                  return (
                    <>
                      {before && (
                        <div className="newsletter-body">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                            {before}
                          </ReactMarkdown>
                        </div>
                      )}
                      <DecisionMatrix
                        xAxis={articleConfig.matrix.xAxis}
                        yAxis={articleConfig.matrix.yAxis}
                        cells={articleConfig.matrix.cells}
                        caption={articleConfig.matrix.caption}
                      />
                      {after && (
                        <div className="newsletter-body">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                            {after}
                          </ReactMarkdown>
                        </div>
                      )}
                    </>
                  )
                })()
              ) : (
                <div className="newsletter-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {section.body}
                  </ReactMarkdown>
                </div>
              )}

              {/* Strong CTA after worksheet section */}
              {isWorksheetSection && articleConfig?.worksheetCtaCopy && (
                <ArticleCTA
                  variant="strong"
                  href="/diagnostic-note"
                  copy={articleConfig.worksheetCtaCopy}
                  buttonLabel="Request a free diagnostic note"
                />
              )}
            </section>
          )
        })}
      </>
    )
  }

  // ── Generic single-pass rendering ─────────────────────────────────────────

  const renderGenericArticle = () => (
    <div className="newsletter-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {mainContent}
      </ReactMarkdown>
    </div>
  )

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-[90rem] mx-auto px-5 sm:px-7 lg:px-8 pt-12 sm:pt-16 pb-20">
        {/* ── Article header (above hero) ──────────────────────── */}
        <header className="max-w-[700px] mx-auto xl:mx-0 mb-8">
          <p className="kicker-accent mb-4">Newsletter</p>
          <h1 className="font-serif-playfair mb-4 text-[length:clamp(2rem,1.6vw+1.3rem,3rem)]">
            {post.title}
          </h1>
          {post.dek && (
            <p className="text-[18px] sm:text-[19px] text-text-muted leading-[1.7] mb-5 max-w-[38rem]">
              {post.dek}
            </p>
          )}
          <div className="flex items-center text-text-muted text-[15px] gap-1.5">
            <time dateTime={String(post.date).split('T')[0]}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true" className="opacity-40 text-[18px] leading-none">
              ·
            </span>
            <span>{post.author}</span>
          </div>
        </header>

        {/* ── Hero image (shorter on mobile) ───────────────────── */}
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] mb-10 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ── Mobile collapsible TOC (xl:hidden) ───────────────── */}
        {tocItems.length > 0 && (
          <div className="xl:hidden mb-8 max-w-[700px] mx-auto xl:mx-0">
            <details className="border border-border-soft rounded-xl bg-white overflow-hidden">
              <summary className="cursor-pointer list-none px-4 py-3 text-[14px] font-semibold text-text select-none flex items-center justify-between [&::-webkit-details-marker]:hidden">
                <span>On this page</span>
                <span className="text-text-muted text-[12px] font-normal">tap to expand</span>
              </summary>
              <div className="border-t border-border-soft px-4 pb-4 pt-2">
                <TableOfContents items={tocItems} title={post.title} />
              </div>
            </details>
          </div>
        )}

        {/* ── Main layout: sidebar + content ───────────────────── */}
        <div className="flex gap-12 items-start">
          {/* Sticky desktop TOC sidebar */}
          {tocItems.length > 0 && (
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} title={post.title} />
              </div>
            </aside>
          )}

          {/* Main content column */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            {/* Article body */}
            <article>{articleConfig ? renderConfigArticle() : renderGenericArticle()}</article>

            {/* ── Collapsible references ──────────────────────── */}
            {referencesMarkdown && (
              <details className="mt-14 border-t border-border-soft pt-6 group">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[13px] font-semibold uppercase tracking-[0.14em] text-text-muted hover:text-text transition-colors select-none flex items-center gap-2">
                  <span>References</span>
                  <span className="text-[11px] font-normal normal-case tracking-normal opacity-60">
                    (tap to expand)
                  </span>
                </summary>
                <div className="mt-4 pl-1">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ children, ...props }: any) => (
                        <h3
                          className="font-serif-playfair text-[18px] font-semibold text-text mb-4 mt-2"
                          {...props}
                        >
                          {children}
                        </h3>
                      ),
                      ol: ({ children, ...props }: any) => (
                        <ol className="list-decimal pl-5 space-y-2.5" {...props}>
                          {children}
                        </ol>
                      ),
                      li: ({ children, ...props }: any) => (
                        <li className="text-[14px] text-text-muted leading-[1.65]" {...props}>
                          {children}
                        </li>
                      ),
                      a: ({ href, children, ...props }: any) => (
                        <a
                          href={href}
                          className="text-brand-ink hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      ),
                      p: ({ children, ...props }: any) => (
                        <p className="text-[14px] text-text-muted leading-[1.65] mb-2" {...props}>
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {referencesMarkdown}
                  </ReactMarkdown>
                </div>
              </details>
            )}

            {/* ── Footer markdown (consulting / subscribe CTAs) ── */}
            {footerMarkdown && (
              <div className="mt-10 border-t border-border-soft pt-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children, ...props }: any) => (
                      <p
                        className="text-[15px] text-text-muted leading-[1.75] mb-3 last:mb-0"
                        {...props}
                      >
                        {children}
                      </p>
                    ),
                    a: ({ href, children, ...props }: any) => {
                      const isInternal = href?.startsWith('/')
                      if (isInternal && href) {
                        return (
                          <Link
                            href={href}
                            className="text-brand-ink hover:underline font-medium"
                            {...props}
                          >
                            {children}
                          </Link>
                        )
                      }
                      return (
                        <a
                          href={href}
                          className="text-brand-ink hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      )
                    },
                    em: ({ children, ...props }: any) => (
                      <em className="italic" {...props}>
                        {children}
                      </em>
                    ),
                  }}
                >
                  {footerMarkdown}
                </ReactMarkdown>
              </div>
            )}

            {/* ── How to cite this page ───────────────────────── */}
            <div className="mt-10">
              <CiteThisPage
                canonicalUrl={canonicalUrl}
                title={post.title}
                publicationTitle="Sarah Zou Newsletter"
                lastUpdated={post.date}
                slug={post.slug}
              />
            </div>

            {/* ── Footer CTA button ───────────────────────────── */}
            <div className="flex justify-center mt-10 mb-4">
              <Link
                href="/book"
                className="inline-flex h-[3.25rem] min-w-[220px] items-center justify-center rounded-[12px] bg-brand px-8 text-[16px] font-semibold leading-none text-brand-on shadow-card transition-[background-color] duration-200 hover:bg-brand-ink"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
