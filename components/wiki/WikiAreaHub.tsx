import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react'
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
    <main className="min-h-screen bg-page">
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

      <div className="section-shell py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/wiki" className="transition-colors hover:text-brand-ink">
            Wiki library
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text">{config.shortTitle}</span>
        </nav>

        <header className="mt-8 overflow-hidden rounded-card border border-border-soft bg-white shadow-card">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="kicker-accent">{config.areaLabel}</p>
              <h1 className="mt-5 max-w-3xl font-serif-playfair text-[40px] font-bold leading-[1.08] text-text sm:text-[52px]">
                {config.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-light leading-[1.7] text-text-muted sm:text-2xl">
                {config.description}
              </p>
              <p className="mt-7 max-w-2xl border-l-2 border-brand pl-5 text-base leading-[1.75] text-text">
                {config.intro}
              </p>
            </div>

            <aside className="flex flex-col justify-between border-t border-border-soft bg-surface-muted p-7 lg:border-l lg:border-t-0 lg:p-9">
              <div>
                <p className="kicker-muted">The decision underneath</p>
                <p className="mt-4 font-serif-playfair text-2xl font-semibold leading-snug text-text">
                  {config.guidingQuestion}
                </p>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border-soft pt-6 lg:grid-cols-1">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                    Topic map
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-brand-ink">
                    {config.calendarTopicCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                    Tracks
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-brand-ink">{config.groups.length}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                    Roadmap
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-brand-ink">P1–P3</dd>
                </div>
              </dl>
            </aside>
          </div>
        </header>

        <section className="mt-14" aria-labelledby={`${config.slug}-start-heading`}>
          <div className="max-w-3xl">
            <p className="kicker-muted">A practical sequence</p>
            <h2
              id={`${config.slug}-start-heading`}
              className="mt-3 font-serif-playfair text-3xl font-semibold text-text sm:text-[36px]"
            >
              Start here
            </h2>
            <p className="mt-4 text-base leading-[1.75] text-text-muted sm:text-[17px]">
              Follow these concepts in order for the shortest path from first principles to a usable
              operating decision.
            </p>
          </div>

          <ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {config.startHere.map((slug, index) => {
              const topic = topicsBySlug.get(slug)
              if (!topic) return null
              const content = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand-ink">
                      {index + 1}
                    </span>
                    {topic.available ? (
                      <CheckCircle2
                        className="h-5 w-5 text-brand-ink"
                        aria-label="Guide available"
                      />
                    ) : (
                      <Clock3 className="h-5 w-5 text-text-subtle" aria-label="Guide scheduled" />
                    )}
                  </div>
                  <h3 className="mt-5 font-serif-playfair text-xl font-semibold leading-snug text-text">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.65] text-text-muted">{topic.summary}</p>
                  <p className="mt-auto border-t border-border-soft pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-text-subtle">
                    {topic.available ? 'Read guide' : `Scheduled · ${topic.phase}`}
                  </p>
                </>
              )

              return topic.available ? (
                <li key={topic.slug}>
                  <Link
                    href={topicHref(config, topic)}
                    className="group flex h-full min-h-[260px] flex-col rounded-card border border-border-soft bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card-hover"
                  >
                    {content}
                  </Link>
                </li>
              ) : (
                <li
                  key={topic.slug}
                  className="flex min-h-[260px] flex-col rounded-card border border-border-soft bg-white p-6"
                >
                  {content}
                </li>
              )
            })}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby={`${config.slug}-library-heading`}>
          <div className="flex flex-col gap-6 border-b border-border-soft pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="kicker-muted">The full map</p>
              <h2
                id={`${config.slug}-library-heading`}
                className="mt-3 font-serif-playfair text-3xl font-semibold text-text sm:text-[36px]"
              >
                Explore by decision track
              </h2>
            </div>
            <div className="min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-text-subtle">
                <span>Library progress</span>
                <span>
                  {availableCount}/{topics.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border-soft">
                <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="divide-y divide-border-soft">
            {config.groups.map((group, groupIndex) => (
              <section
                key={group.title}
                className="grid gap-7 py-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10"
                aria-labelledby={`${config.slug}-group-${groupIndex}`}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-ink">
                    Track {String(groupIndex + 1).padStart(2, '0')}
                  </p>
                  <h3
                    id={`${config.slug}-group-${groupIndex}`}
                    className="mt-3 font-serif-playfair text-2xl font-semibold text-text"
                  >
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.65] text-text-muted">{group.description}</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {group.topicSlugs.map((slug) => {
                    const topic = topicsBySlug.get(slug)
                    if (!topic) return null
                    const cardBody = (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-serif-playfair text-lg font-semibold leading-snug text-text">
                            {topic.title}
                          </h4>
                          <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-subtle">
                            {topic.phase}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-[1.6] text-text-muted">
                          {topic.summary}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold uppercase tracking-[0.1em]">
                          <span className={topic.available ? 'text-brand-ink' : 'text-text-subtle'}>
                            {topic.available ? 'Available now' : 'On the roadmap'}
                          </span>
                          {topic.available && (
                            <ArrowRight className="h-4 w-4 text-brand-ink transition-transform group-hover:translate-x-1" />
                          )}
                        </div>
                      </>
                    )

                    return topic.available ? (
                      <Link
                        key={topic.slug}
                        href={topicHref(config, topic)}
                        className="group flex min-h-[190px] flex-col rounded-[16px] border border-border-soft bg-white p-5 transition hover:border-brand/40 hover:shadow-card"
                      >
                        {cardBody}
                      </Link>
                    ) : (
                      <article
                        key={topic.slug}
                        className="flex min-h-[190px] flex-col rounded-[16px] border border-border-soft bg-white p-5"
                      >
                        {cardBody}
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <aside className="mt-6 rounded-card bg-ink px-7 py-8 text-white sm:px-9 sm:py-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Built as a living reference
              </p>
              <h2 className="mt-3 font-serif-playfair text-2xl font-semibold text-white">
                New guides will open in editorial-calendar order.
              </h2>
              <p className="mt-3 text-sm leading-[1.7] text-white/70">
                The complete map is visible now so you can see how each concept fits the decision,
                even before every article is published.
              </p>
            </div>
            <Link
              href="/wiki"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[12px] border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Browse all wiki areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <div className="mt-12">
          <WikiLicenseFooter />
        </div>
      </div>
    </main>
  )
}
