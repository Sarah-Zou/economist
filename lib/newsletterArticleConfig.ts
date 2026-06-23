export interface TakeawayItem {
  text: string
}

export interface MatrixConfig {
  xAxis: string[]
  yAxis: string[]
  cells: string[][]
  caption?: string
}

export interface NewsletterArticleConfig {
  /** Bullets shown in the "The short answer" takeaway box */
  takeaway?: TakeawayItem[]
  /** Decision matrix rendered in place of the matching H2's markdown table */
  matrix?: MatrixConfig
  /** H2 slug that contains the matrix table (matched via slugified heading text) */
  matrixHeadingSlug?: string
  /** H2 slug after whose section the strong worksheet CTA is inserted */
  worksheetHeadingSlug?: string
  /** Strong CTA copy shown after the worksheet section */
  worksheetCtaCopy?: string
  /** Soft CTA copy shown after the takeaway box */
  introCtaCopy?: string
  /** Optional overrides for TOC item display labels (key = extracted H2 id, value = display label) */
  tocLabels?: Record<string, string>
}

const config: Record<string, NewsletterArticleConfig> = {
  'selling-physics-as-a-service': {
    takeaway: [
      { text: 'What outcome can you meter?' },
      { text: 'What risk are you absorbing?' },
      { text: 'Does the data reduce cost to serve, deepen lock-in, or become the product?' },
    ],
    matrix: {
      xAxis: [
        'Data cuts cost to serve',
        'Data deepens lock-in',
        'Data is the product',
      ],
      yAxis: ['Asset-light', 'Hybrid / financed', 'Asset-heavy'],
      cells: [
        ['Intuitive Surgical', 'John Deere', 'Whoop, Samsara'],
        ['Caterpillar', 'Michelin', 'Komatsu Smart Construction; Element Fleet'],
        ['Rolls-Royce', 'Signify', 'Planet, Spire'],
      ],
      caption:
        'Each cell is the data role × asset model combination. The bottom-right cell (asset-heavy + data as product) is the rarest and most capital-intensive.',
    },
    matrixHeadingSlug: 'two-questions-place-any-business',
    worksheetHeadingSlug: 'worksheet-place-a-business',
    worksheetCtaCopy:
      'Unsure where your hardware-plus-data business fits? Book the 90-minute strategy session.',
    introCtaCopy: 'Want help placing your own business on this framework?',
    tocLabels: {
      'the-movement-of-servitization': 'The movement of servitization',
      'why-the-naive-view-misleads': 'Why the naive view misleads',
      'the-four-archetypes': 'The four archetypes',
      'two-questions-place-any-business': 'Two questions place any business',
      'the-decision-that-matters-most-asset-light-or-asset-heavy':
        'Asset-light or asset-heavy',
      'where-it-breaks': 'Where it breaks',
      'worksheet-place-a-business': 'Worksheet',
      'next-action': 'Next action',
    },
  },
}

export function getArticleConfig(slug: string): NewsletterArticleConfig | null {
  return config[slug] ?? null
}
