import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { unstable_noStore } from 'next/cache'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  generateBreadcrumbJsonLd,
  generateCollectionPageJsonLd,
  generateItemListJsonLd,
} from '@/lib/generateJsonLd'
import { getAllCategorySlugs, getCategoryBySlug, getConceptBySlug } from '@/lib/mdx'
import WikiLicenseFooter from '@/components/wiki/WikiLicenseFooter'
import {
  WikiHubHero,
  WikiHubIndexSection,
  WikiHubRow,
  WikiHubShell,
} from '@/components/wiki/WikiHubPrimitives'

interface CategoryPageProps {
  params: {
    category: string
  }
}

interface CategorySection {
  title: string
  body: string
}

export async function generateStaticParams() {
  return getAllCategorySlugs()
    .filter(
      (slug) =>
        slug &&
        !slug.includes('http://') &&
        !slug.includes('https://') &&
        !slug.includes('://') &&
        !slug.startsWith('/')
    )
    .map((category) => ({ category }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category)

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://sarahzou.com/wiki/pricing/${category.slug}`

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
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: category.title,
      description: category.summary,
      url: canonicalUrl,
      siteName: 'Sarah Zou',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.title,
      description: category.summary,
    },
  }
}

function splitCategorySections(content: string): CategorySection[] {
  const sections: CategorySection[] = []
  let currentTitle = ''
  let currentLines: string[] = []

  const saveCurrentSection = () => {
    if (currentTitle && currentLines.some((line) => line.trim())) {
      sections.push({ title: currentTitle, body: currentLines.join('\n').trim() })
    }
  }

  for (const line of content.split('\n')) {
    const heading = line.match(/^##\s+(.+)$/)
    if (heading) {
      saveCurrentSection()
      currentTitle = heading[1].trim()
      currentLines = []
    } else if (currentTitle) {
      currentLines.push(line)
    }
  }

  saveCurrentSection()
  return sections
}

const markdownComponents = {
  h3: ({ node, ...props }: any) => (
    <h3 className="mt-8 font-serif-playfair text-[25px] font-medium text-ink" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="mt-7 text-[16px] font-semibold text-ink" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="mt-4 text-[16px] leading-[1.8] text-text-muted" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="mt-5 space-y-3 border-t border-border-soft pt-5" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="mt-5 list-decimal space-y-3 pl-5 text-text-muted" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li
      className="border-b border-border-soft pb-3 text-[15px] leading-[1.75] text-text-muted"
      {...props}
    />
  ),
  a: ({ node, ...props }: any) => (
    <a className="font-medium text-brand-ink underline-offset-4 hover:underline" {...props} />
  ),
  strong: ({ node, ...props }: any) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="mt-6 border-l border-brand pl-5 text-[16px] leading-[1.8] text-text"
      {...props}
    />
  ),
}

export default function CategoryPage({ params }: CategoryPageProps) {
  if (process.env.NODE_ENV === 'development') {
    unstable_noStore()
  }

  const category = getCategoryBySlug(params.category)
  if (!category) notFound()

  const concepts = category.concepts
    .filter((concept) => concept.id)
    .map((concept) => {
      const content = getConceptBySlug(category.slug, concept.id!)
      if (!content) return null

      return {
        id: concept.id!,
        title: content.title,
        summary: content.oneLiner || category.summary,
        readingTime: content.readingTime,
      }
    })
    .filter((concept): concept is NonNullable<typeof concept> => concept !== null)

  const guidanceSections = splitCategorySections(category.content).filter(
    (section) =>
      !['summary', "what's in this category", 'related categories'].includes(
        section.title.toLowerCase()
      )
  )
  const canonicalUrl = `https://sarahzou.com/wiki/pricing/${category.slug}`
  const breadcrumbs = [
    { name: 'Pricing Wiki', url: '/wiki/pricing' },
    { name: category.title, url: `/wiki/pricing/${category.slug}` },
  ]
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: category.title,
    description: category.summary,
    url: canonicalUrl,
    dateModified: category.updated,
  })
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbs)
  const itemListJsonLd = generateItemListJsonLd(
    concepts.map((concept) => ({
      name: concept.title,
      url: `${canonicalUrl}/${concept.id}`,
      description: concept.summary,
    }))
  )
  const updatedLabel = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${category.updated}T00:00:00Z`))

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <WikiHubShell>
        <div className="section-shell py-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-text-subtle"
          >
            <Link href="/wiki/pricing" className="transition-colors hover:text-brand-ink">
              Pricing Wiki
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-text">{category.title}</span>
          </nav>
        </div>

        <WikiHubHero
          kicker="Pricing wiki · Category"
          title={category.title}
          description={<p>{category.summary}</p>}
          stats={[
            { label: 'Published concepts', value: concepts.length },
            { label: 'Updated', value: updatedLabel },
          ]}
        />

        <WikiHubIndexSection
          eyebrow="Category index"
          heading="Explore concepts"
          description={
            <p>
              Start with the decision you need to make, then use the connected concepts to test the
              logic underneath it.
            </p>
          }
        >
          <div className="border-t border-border-soft">
            {concepts.map((concept) => (
              <WikiHubRow
                key={concept.id}
                href={`/wiki/pricing/${category.slug}/${concept.id}`}
                title={concept.title}
                summary={concept.summary}
                meta={concept.readingTime ? `${concept.readingTime} min read` : 'Read concept'}
              />
            ))}
          </div>
        </WikiHubIndexSection>

        {guidanceSections.length > 0 && (
          <WikiHubIndexSection
            eyebrow="Editorial guide"
            heading="Use this category"
            description={
              <p>
                These notes preserve the category’s recommended sequence, decision rules, and
                practical applications.
              </p>
            }
            surface
          >
            <div className="border-t border-border">
              {guidanceSections.map((section) => (
                <section key={section.title} className="border-b border-border-soft py-10">
                  <h2 className="font-serif-playfair text-[30px] font-medium text-ink">
                    {section.title}
                  </h2>
                  <div className="max-w-[46rem]">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={markdownComponents}
                    >
                      {section.body}
                    </ReactMarkdown>
                  </div>
                </section>
              ))}
            </div>
          </WikiHubIndexSection>
        )}

        {category.relatedCategories.length > 0 && (
          <WikiHubIndexSection
            eyebrow="Continue through the library"
            heading="Related categories"
            description={<p>Move to the adjacent pricing decision without losing context.</p>}
          >
            <div className="border-t border-border-soft">
              {category.relatedCategories.slice(0, 3).map((related) => (
                <WikiHubRow
                  key={related.slug}
                  href={`/wiki/pricing/${related.slug}`}
                  title={related.title}
                  summary={related.summary}
                  meta="Pricing category"
                />
              ))}
            </div>
          </WikiHubIndexSection>
        )}

        <section className="bg-ink text-white">
          <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                From reference to recommendation
              </p>
              <h2 className="mt-4 max-w-[42rem] font-serif-playfair !text-white">
                Apply the framework to a live commercial decision.
              </h2>
              <p className="mt-4 max-w-[42rem] text-[15px] leading-[1.8] text-white/70">
                Bring the decision, the evidence you have, and the constraint you cannot ignore.
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                href="/book"
                className="inline-flex items-center border-b border-white/50 pb-1 text-[15px] font-medium text-white"
              >
                Book a 15-minute introduction
              </Link>
            </div>
          </div>
        </section>

        <div className="section-shell pb-20 pt-4 sm:pb-24">
          <WikiLicenseFooter />
        </div>
      </WikiHubShell>
    </>
  )
}
