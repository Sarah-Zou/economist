export interface WikiAreaConfig {
  /** Public URL prefix, e.g. /wiki/fundraising */
  basePath: string
  /** Name displayed on the wiki hub and in navigation. */
  title: string
  /** Short description displayed on the wiki hub. */
  summary: string
  /** Content folder under content/wiki/concepts */
  categorySlug: string
  /** Short label shown in the page kicker */
  areaLabel: string
  /** Concept id rendered at basePath (no slug segment in URL) */
  pillarConceptId?: string
}

export const PRICING_WIKI_AREA: WikiAreaConfig = {
  basePath: '/wiki/pricing',
  title: 'Pricing & Monetization',
  summary:
    'Evidence-based frameworks for pricing, packaging, customer value, and monetization decisions.',
  categorySlug: '',
  areaLabel: 'Pricing Wiki',
}

export const FUNDRAISING_WIKI_AREA: WikiAreaConfig = {
  basePath: '/fundraising',
  title: 'Startup Fundraising',
  summary:
    'Practical guidance on funding sources, round sizing, dilution, and the trade-offs behind capital decisions.',
  categorySlug: 'fundraising',
  areaLabel: 'Fundraising Wiki',
  pillarConceptId: 'how-startup-funding-works',
}

export const STANDALONE_WIKI_AREAS: WikiAreaConfig[] = [FUNDRAISING_WIKI_AREA]
export const WIKI_AREAS: WikiAreaConfig[] = [PRICING_WIKI_AREA, ...STANDALONE_WIKI_AREAS]

export function getWikiConceptPagePath(
  area: WikiAreaConfig,
  categorySlug: string,
  conceptSlug: string
): string {
  if (area.basePath === PRICING_WIKI_AREA.basePath) {
    return `${area.basePath}/${categorySlug}/${conceptSlug}`
  }
  return `${area.basePath}/${conceptSlug}`
}

export function getPublishedStandaloneWikiUrls(): string[] {
  const urls: string[] = []
  for (const area of STANDALONE_WIKI_AREAS) {
    if (area.pillarConceptId) {
      urls.push(area.basePath)
    }
  }
  return urls
}
