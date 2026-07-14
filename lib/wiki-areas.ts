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

export const BUSINESS_MODELS_WIKI_AREA: WikiAreaConfig = {
  basePath: '/wiki/business-models',
  title: 'Business Models',
  summary:
    'Compare how companies create, deliver, and capture value across services, APIs, platforms, marketplaces, and AI-native models.',
  categorySlug: 'business-models',
  areaLabel: 'Business Models Wiki',
}

export const GO_TO_MARKET_WIKI_AREA: WikiAreaConfig = {
  basePath: '/wiki/go-to-market',
  title: 'Go-to-Market',
  summary:
    'Connect market selection, positioning, distribution, sales mechanics, and customer success into a repeatable growth system.',
  categorySlug: 'go-to-market',
  areaLabel: 'Go-to-Market Wiki',
}

export const UNIT_ECONOMICS_WIKI_AREA: WikiAreaConfig = {
  basePath: '/wiki/unit-economics',
  title: 'Unit Economics',
  summary:
    'Understand acquisition, retention, margin, and capital efficiency from CAC and LTV to burn multiple and the Rule of 40.',
  categorySlug: 'unit-economics',
  areaLabel: 'Unit Economics Wiki',
}

export const EDITORIAL_WIKI_AREAS: WikiAreaConfig[] = [
  BUSINESS_MODELS_WIKI_AREA,
  GO_TO_MARKET_WIKI_AREA,
  UNIT_ECONOMICS_WIKI_AREA,
]

export const STANDALONE_WIKI_AREAS: WikiAreaConfig[] = [
  ...EDITORIAL_WIKI_AREAS,
  FUNDRAISING_WIKI_AREA,
]
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
  return STANDALONE_WIKI_AREAS.map((area) => area.basePath)
}
