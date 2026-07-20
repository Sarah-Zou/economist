import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getConceptBySlug } from '@/lib/mdx'
import {
  generateCollectionPageJsonLd,
  generateItemListJsonLd,
  generateWebPageJsonLd,
} from '@/lib/generateJsonLd'
import type { WikiHubConfig, WikiHubTopic } from '@/lib/wiki-hub-data'
import WikiLicenseFooter from './WikiLicenseFooter'

interface WikiAreaHubProps {
  config: WikiHubConfig
}

function topicHref(config: WikiHubConfig, topic: WikiHubTopic) {
  return `${config.basePath}/${topic.slug}`
}

export default function WikiAreaHub({ config }: WikiAreaHubProps) {
  const topics = config.topics.map((topic) => ({
    ...topic,
    available:
      config.liveTopicSlugs.includes(topic.slug) &&
      getConceptBySlug(config.categorySlug, topic.slug, { includeNonPublished: true })?.status ===
        'published',
  }))
  const topicsBySlug = new Map(topics.map((topic) => [topic.slug, topic]))
  const availableTopics = topics.filter((topic) => topic.available)
  const availableCount = availableTopics.length
  const progress = Math.round((availableCount / topics.length) * 100)
  const canonicalUrl = `https://sarahzou.com${config.basePath}`
  const jsonLdDescription = `${config.description} ${config.calendarTopicCount} topics organized into ${config.groups.length} decision tracks.`
  const itemListJsonLd = generateItemListJsonLd(
    availableTopics.map((topic) => ({
      name: topic.title,
      url: `https://sarahzou.com${topicHref(config, topic)}`,
      description: topic.summary,
    }))
  )
  const webPageJsonLd = generateWebPageJsonLd({
    title: config.title,
    description: jsonLdDescription,
    url: canonicalUrl,
    dateModified: '2026-07-14',
  })
  const collectionPageJsonLd = generateCollectionPageJsonLd({
    title: config.title,
    description: jsonLdDescription,
    url: canonicalUrl,
    dateModified: '2026-07-14',
  })

  return (
    <main className="resource-editorial min-h-screen bg-page">
      {availableTopics.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />

      <div className="section-shell py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-text-subtle"
        >
          <Link href="/wiki" className="transition-colors hover:text-brand-ink">
            Wiki library
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text">{config.shortTitle}</span>
        </nav>
      </div>

      <section className="border-y border-border-soft bg-surface">
        <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
          <div>
            <p className="kicker-accent">{config.areaLabel}</p>
            <h1 className="mt-6 max-w-[14ch] font-serif-playfair">{config.title}</h1>
            <p className="mt-7 max-w-[46rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
              {config.description}
            </p>
            <p className="mt-7 max-w-[42rem] border-l border-brand pl-5 text-[15px] leading-[1.8] text-text">
              {config.intro}
            </p>
          </div>

          <aside className="border-t border-border pt-5">
            <p className="kicker-muted">The decision underneath</p>
            <p className="mt-4 font-serif-playfair text-[25px] leading-[1.25] text-ink">
              {config.guidingQuestion}
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border-soft pt-5">
              <div>
                <dt className="kicker-muted">Topics</dt>
                <dd className="mt-2 text-[20px] text-ink">{config.calendarTopicCount}</dd>
              </div>
              <div>
                <dt className="kicker-muted">Tracks</dt>
                <dd className="mt-2 text-[20px] text-ink">{config.groups.length}</dd>
              </div>
              <div>
                <dt className="kicker-muted">Published</dt>
                <dd className="mt-2 text-[20px] text-ink">{availableCount}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section>
        <div className="section-shell py-20 sm:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24">
            <div>
              <p className="kicker-muted">A practical sequence</p>
              <h2 id={`${config.slug}-start-heading`} className="mt-3 font-serif-playfair">
                Start here
              </h2>
              <p className="mt-5 max-w-xs text-[14px] leading-[1.75] text-text-muted">
                Follow these concepts in order for the shortest path from first principles to a
                usable operating decision.
              </p>
            </div>

            <ol
              className="border-t border-border-soft"
              aria-labelledby={`${config.slug}-start-heading`}
            >
              {config.startHere.map((slug, index) => {
                const topic = topicsBySlug.get(slug)
                if (!topic) return null

                const content = (
                  <>
                    <span className="pt-1 text-[12px] tracking-[0.14em] text-text-subtle">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif-playfair text-[24px] font-medium leading-[1.22] text-ink">
                        {topic.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">
                        {topic.summary}
                      </p>
                    </div>
                    <span
                      className={`pt-1 text-[11px] uppercase tracking-[0.13em] ${
                        topic.available ? 'text-brand-ink' : 'text-text-subtle'
                      }`}
                    >
                      {topic.available ? 'Available now' : `Scheduled · ${topic.phase}`}
                    </span>
                    {topic.available ? (
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block"
                        aria-hidden
                      />
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </>
                )

                return (
                  <li key={topic.slug}>
                    {topic.available ? (
                      <Link
                        href={topicHref(config, topic)}
                        className="group grid gap-5 border-b border-border-soft py-8 lg:grid-cols-[2.75rem_minmax(0,1fr)_8rem_auto] lg:items-start lg:gap-8"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="grid gap-5 border-b border-border-soft py-8 lg:grid-cols-[2.75rem_minmax(0,1fr)_8rem_auto] lg:items-start lg:gap-8">
                        {content}
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface">
        <div className="section-shell py-20 sm:py-24 lg:py-32">
          <div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="kicker-muted">The full map</p>
              <h2 id={`${config.slug}-library-heading`} className="mt-3 font-serif-playfair">
                Explore by decision track
              </h2>
            </div>
            <div className="min-w-[230px]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.13em] text-text-subtle">
                <span>Library progress</span>
                <span>
                  {availableCount}/{topics.length}
                </span>
              </div>
              <div className="mt-3 h-px bg-border">
                <div className="h-px bg-brand" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div aria-labelledby={`${config.slug}-library-heading`}>
            {config.groups.map((group, groupIndex) => (
              <section
                key={group.title}
                className="grid gap-10 border-b border-border-soft py-12 lg:grid-cols-[0.46fr_1.54fr] lg:gap-24"
                aria-labelledby={`${config.slug}-group-${groupIndex}`}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink">
                    Track {String(groupIndex + 1).padStart(2, '0')}
                  </p>
                  <h3
                    id={`${config.slug}-group-${groupIndex}`}
                    className="mt-3 font-serif-playfair text-[26px] font-medium text-ink"
                  >
                    {group.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-text-muted">
                    {group.description}
                  </p>
                </div>

                <div className="border-t border-border-soft">
                  {group.topicSlugs.map((slug) => {
                    const topic = topicsBySlug.get(slug)
                    if (!topic) return null

                    const topicBody = (
                      <>
                        <div>
                          <h4 className="font-serif-playfair text-[21px] font-medium leading-[1.25] text-ink">
                            {topic.title}
                          </h4>
                          <p className="mt-2 text-[14px] leading-[1.7] text-text-muted">
                            {topic.summary}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-4 lg:block">
                          <span className="text-[10px] uppercase tracking-[0.13em] text-text-subtle">
                            {topic.phase}
                          </span>
                          <span
                            className={`mt-2 block text-[11px] uppercase tracking-[0.12em] ${
                              topic.available ? 'text-brand-ink' : 'text-text-subtle'
                            }`}
                          >
                            {topic.available ? 'Read guide' : 'On the roadmap'}
                          </span>
                        </div>
                        {topic.available ? (
                          <ArrowRight
                            className="mt-1 hidden h-4 w-4 text-text-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink lg:block"
                            aria-hidden
                          />
                        ) : (
                          <span aria-hidden="true" />
                        )}
                      </>
                    )

                    return topic.available ? (
                      <Link
                        key={topic.slug}
                        href={topicHref(config, topic)}
                        className="group grid gap-5 border-b border-border-soft py-6 lg:grid-cols-[minmax(0,1fr)_7.5rem_auto] lg:items-start lg:gap-8"
                      >
                        {topicBody}
                      </Link>
                    ) : (
                      <article
                        key={topic.slug}
                        className="grid gap-5 border-b border-border-soft py-6 lg:grid-cols-[minmax(0,1fr)_7.5rem_auto] lg:items-start lg:gap-8"
                      >
                        {topicBody}
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              Built as a living reference
            </p>
            <h2 className="mt-4 max-w-[42rem] font-serif-playfair !text-white">
              New guides open in editorial-calendar order.
            </h2>
            <p className="mt-4 max-w-[42rem] text-[15px] leading-[1.8] text-white/65">
              The full map remains visible so each concept has context, even before every article is
              published.
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              href="/wiki"
              className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[15px] font-medium text-white"
            >
              Browse all wiki areas
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>

      <div className="section-shell pb-20 pt-4 sm:pb-24">
        <WikiLicenseFooter />
      </div>
    </main>
  )
}
