export type WikiHubPhase = 'P1' | 'P2' | 'P3'

export interface WikiHubTopic {
  title: string
  slug: string
  summary: string
  phase: WikiHubPhase
}

export interface WikiHubGroup {
  title: string
  description: string
  topicSlugs: string[]
}

export interface WikiHubConfig {
  slug: 'business-models' | 'go-to-market' | 'unit-economics'
  categorySlug: string
  basePath: string
  title: string
  shortTitle: string
  areaLabel: string
  description: string
  intro: string
  guidingQuestion: string
  calendarTopicCount: number
  liveTopicSlugs: string[]
  startHere: string[]
  topics: WikiHubTopic[]
  groups: WikiHubGroup[]
}

export const BUSINESS_MODELS_HUB: WikiHubConfig = {
  slug: 'business-models',
  categorySlug: 'business-models',
  basePath: '/wiki/business-models',
  title: 'Business Models Wiki',
  shortTitle: 'Business Models',
  areaLabel: 'Business model library',
  description:
    'A founder-focused guide to choosing how a company creates, delivers, and captures value—from services and APIs to platforms, marketplaces, and AI-native models.',
  intro:
    'Use this hub to compare operating models, understand where margin and defensibility come from, and choose an architecture that fits the product, customer, and cost structure.',
  guidingQuestion:
    'How should this company deliver value—and where should revenue and margin accrue?',
  calendarTopicCount: 14,
  liveTopicSlugs: [],
  startHere: ['managed-services', 'api-as-a-product', 'hardware-as-a-service', 'marketplace-model'],
  topics: [
    {
      title: 'Managed Services',
      slug: 'managed-services',
      summary:
        'When people, process, and expertise are part of the product—and how to protect margin.',
      phase: 'P1',
    },
    {
      title: 'API-as-a-Product',
      slug: 'api-as-a-product',
      summary:
        'Design a developer-facing product around integration value, usage, reliability, and scale.',
      phase: 'P1',
    },
    {
      title: 'Hardware-as-a-Service',
      slug: 'hardware-as-a-service',
      summary:
        'Turn equipment into a recurring offer while managing financing, service, and lifecycle risk.',
      phase: 'P1',
    },
    {
      title: 'Everything-as-a-Service (XaaS)',
      slug: 'everything-as-a-service',
      summary:
        'Understand the recurring-service pattern behind software, infrastructure, and connected products.',
      phase: 'P1',
    },
    {
      title: 'Marketplace Model',
      slug: 'marketplace-model',
      summary:
        'Create value by matching supply and demand—and build enough liquidity to make the market work.',
      phase: 'P1',
    },
    {
      title: 'Razor-and-Blades',
      slug: 'razor-and-blades',
      summary:
        'Pair a low-friction installed base with recurring, higher-margin consumables or usage.',
      phase: 'P2',
    },
    {
      title: 'Vertical SaaS',
      slug: 'vertical-saas',
      summary:
        'Build deep workflow software for one industry, then expand into payments, data, and services.',
      phase: 'P2',
    },
    {
      title: 'Open-Source Business Models',
      slug: 'open-source-business-models',
      summary:
        'Translate adoption and community trust into support, cloud, enterprise, or usage revenue.',
      phase: 'P2',
    },
    {
      title: 'AI-Native Business Models',
      slug: 'ai-native-business-models',
      summary:
        'Match automation, variable compute cost, and outcome value to a durable commercial model.',
      phase: 'P2',
    },
    {
      title: 'SaaS',
      slug: 'saas',
      summary:
        'Understand the recurring software model, its operating leverage, and its retention logic.',
      phase: 'P2',
    },
    {
      title: 'Platform vs. Pipeline',
      slug: 'platform-business-model',
      summary:
        'Compare linear value chains with ecosystems that enable interactions among participants.',
      phase: 'P2',
    },
    {
      title: 'Direct-to-Consumer (D2C)',
      slug: 'direct-to-consumer',
      summary:
        'Own the customer relationship while carrying acquisition, fulfillment, and retention risk.',
      phase: 'P3',
    },
    {
      title: 'Advertising Model',
      slug: 'advertising-model',
      summary:
        'Monetize attention or intent without losing sight of audience quality and advertiser outcomes.',
      phase: 'P3',
    },
  ],
  groups: [
    {
      title: 'Deliver the product',
      description: 'Choose what the customer buys and how the offer reaches them.',
      topicSlugs: [
        'managed-services',
        'api-as-a-product',
        'hardware-as-a-service',
        'everything-as-a-service',
      ],
    },
    {
      title: 'Structure the market',
      description:
        'Decide whether value moves through a pipeline, platform, marketplace, or installed base.',
      topicSlugs: [
        'marketplace-model',
        'platform-business-model',
        'razor-and-blades',
        'advertising-model',
      ],
    },
    {
      title: 'Scale and specialize',
      description:
        'Compare repeatable software models and the economics of focused verticals and new technology.',
      topicSlugs: [
        'vertical-saas',
        'open-source-business-models',
        'ai-native-business-models',
        'saas',
        'direct-to-consumer',
      ],
    },
  ],
}

export const GO_TO_MARKET_HUB: WikiHubConfig = {
  slug: 'go-to-market',
  categorySlug: 'go-to-market',
  basePath: '/wiki/go-to-market',
  title: 'Go-to-Market Wiki',
  shortTitle: 'Go-to-Market',
  areaLabel: 'GTM library',
  description:
    'A practical guide to defining a market, earning initial traction, choosing a distribution motion, and building a repeatable path from demand to retained revenue.',
  intro:
    'Use this hub to connect market selection, positioning, channels, sales mechanics, and customer success into one coherent growth system.',
  guidingQuestion:
    'Which customers should we reach, with what promise, through which repeatable motion?',
  calendarTopicCount: 11,
  liveTopicSlugs: [],
  startHere: ['tam-sam-som', 'product-market-fit', 'positioning', 'distribution-channels'],
  topics: [
    {
      title: 'TAM, SAM, SOM',
      slug: 'tam-sam-som',
      summary:
        'Size the full opportunity, the market your offer can serve, and the share you can plausibly win.',
      phase: 'P1',
    },
    {
      title: 'Product-Market Fit',
      slug: 'product-market-fit',
      summary:
        'Recognize when a defined market pulls the product—and what evidence is stronger than enthusiasm.',
      phase: 'P2',
    },
    {
      title: 'Positioning',
      slug: 'positioning',
      summary:
        'Frame the product around the customer, alternative, differentiated value, and buying context.',
      phase: 'P2',
    },
    {
      title: 'Distribution Channels',
      slug: 'distribution-channels',
      summary:
        'Choose direct, partner, product-led, marketplace, and ecosystem paths that fit the deal.',
      phase: 'P2',
    },
    {
      title: 'Sales Funnel & Pipeline Metrics',
      slug: 'sales-funnel-metrics',
      summary:
        'Turn the revenue process into measurable stages, conversion rates, velocity, and coverage.',
      phase: 'P2',
    },
    {
      title: 'Cloud Marketplaces',
      slug: 'cloud-marketplaces',
      summary:
        'Use committed cloud spend, procurement shortcuts, and co-sell motions without surrendering control.',
      phase: 'P2',
    },
    {
      title: 'Product-Led Growth',
      slug: 'product-led-growth',
      summary:
        'Let product experience drive acquisition and expansion while preserving a sound revenue model.',
      phase: 'P2',
    },
    {
      title: 'Sales-Led vs. Product-Led',
      slug: 'sales-led-vs-product-led',
      summary:
        'Compare motions by buyer complexity, contract value, time-to-value, and implementation burden.',
      phase: 'P2',
    },
    {
      title: 'Land-and-Expand',
      slug: 'land-and-expand',
      summary:
        'Start with a credible wedge, prove value, and grow through teams, use cases, volume, or products.',
      phase: 'P2',
    },
    {
      title: 'Customer Success',
      slug: 'customer-success',
      summary:
        'Design adoption, outcomes, renewal, and expansion as part of the commercial system.',
      phase: 'P2',
    },
  ],
  groups: [
    {
      title: 'Choose the market',
      description: 'Define the opportunity and establish why this product belongs in it.',
      topicSlugs: ['tam-sam-som', 'product-market-fit', 'positioning'],
    },
    {
      title: 'Design the motion',
      description: 'Match distribution to how the customer discovers, evaluates, and buys.',
      topicSlugs: [
        'distribution-channels',
        'cloud-marketplaces',
        'product-led-growth',
        'sales-led-vs-product-led',
      ],
    },
    {
      title: 'Make growth repeatable',
      description: 'Measure the revenue engine and build retention and expansion into the path.',
      topicSlugs: ['sales-funnel-metrics', 'land-and-expand', 'customer-success'],
    },
  ],
}

export const UNIT_ECONOMICS_HUB: WikiHubConfig = {
  slug: 'unit-economics',
  categorySlug: 'unit-economics',
  basePath: '/wiki/unit-economics',
  title: 'Unit Economics Wiki',
  shortTitle: 'Unit Economics',
  areaLabel: 'Unit economics library',
  description:
    'A founder-focused guide to acquisition, retention, margin, and capital-efficiency metrics—from CAC and LTV to burn multiple and the Rule of 40.',
  intro:
    'Use this hub to connect customer-level economics to company-level growth, then test whether scale improves or weakens the business.',
  guidingQuestion:
    'Does each unit of growth create durable gross profit—and can the company fund the path?',
  calendarTopicCount: 15,
  liveTopicSlugs: [],
  startHere: [
    'customer-acquisition-cost',
    'customer-lifetime-value',
    'ltv-cac-ratio',
    'cac-payback-period',
  ],
  topics: [
    {
      title: 'Cohort Analysis',
      slug: 'cohort-analysis',
      summary:
        'Separate customers by start period or behavior to see retention, spend, and margin clearly.',
      phase: 'P2',
    },
    {
      title: 'Customer Acquisition Cost (CAC)',
      slug: 'customer-acquisition-cost',
      summary:
        'Measure the fully loaded cost of acquiring a new customer for a defined segment and period.',
      phase: 'P3',
    },
    {
      title: 'Customer Lifetime Value (LTV / CLV)',
      slug: 'customer-lifetime-value',
      summary:
        'Estimate the gross profit a customer contributes over the economically relevant relationship.',
      phase: 'P3',
    },
    {
      title: 'LTV:CAC Ratio',
      slug: 'ltv-cac-ratio',
      summary:
        'Compare customer value with acquisition cost without hiding timing, segment, or model risk.',
      phase: 'P3',
    },
    {
      title: 'CAC Payback Period',
      slug: 'cac-payback-period',
      summary: 'Calculate how long contribution margin takes to recover acquisition spend.',
      phase: 'P3',
    },
    {
      title: 'ARR & MRR',
      slug: 'arr-mrr',
      summary:
        'Normalize recurring revenue while keeping bookings, usage, services, and one-time fees separate.',
      phase: 'P3',
    },
    {
      title: 'Churn Rate',
      slug: 'churn-rate',
      summary:
        'Measure lost customers or revenue with the right denominator, interval, and cohort context.',
      phase: 'P3',
    },
    {
      title: 'Gross Margin',
      slug: 'gross-margin',
      summary:
        'Identify the direct cost of delivering revenue and the operating leverage available at scale.',
      phase: 'P3',
    },
    {
      title: 'Contribution Margin',
      slug: 'contribution-margin',
      summary:
        'Understand what remains after the variable costs tied to serving and growing a unit.',
      phase: 'P3',
    },
    {
      title: 'NRR & GRR',
      slug: 'net-revenue-retention',
      summary:
        'Separate retained revenue from expansion to understand the health of the installed base.',
      phase: 'P3',
    },
    {
      title: 'Burn Rate & Runway',
      slug: 'burn-rate-runway',
      summary: 'Translate cash consumption into decision time under a stated operating plan.',
      phase: 'P3',
    },
    {
      title: 'Rule of 40',
      slug: 'rule-of-40',
      summary:
        'Use a growth-plus-profitability heuristic with careful definitions and stage context.',
      phase: 'P3',
    },
    {
      title: 'Burn Multiple',
      slug: 'burn-multiple',
      summary: 'Compare net cash burn with new recurring revenue to assess growth efficiency.',
      phase: 'P3',
    },
    {
      title: 'Magic Number',
      slug: 'magic-number',
      summary: 'Relate sales and marketing spend to the recurring revenue it appears to create.',
      phase: 'P3',
    },
  ],
  groups: [
    {
      title: 'Acquire and retain',
      description: 'Understand what a customer costs, contributes, and does over time.',
      topicSlugs: [
        'cohort-analysis',
        'customer-acquisition-cost',
        'customer-lifetime-value',
        'ltv-cac-ratio',
        'cac-payback-period',
        'churn-rate',
        'net-revenue-retention',
      ],
    },
    {
      title: 'Revenue and margin',
      description: 'Connect recurring revenue to the direct economics of delivering it.',
      topicSlugs: ['arr-mrr', 'gross-margin', 'contribution-margin'],
    },
    {
      title: 'Capital efficiency',
      description: 'Judge whether the pace and quality of growth justify the cash required.',
      topicSlugs: ['burn-rate-runway', 'rule-of-40', 'burn-multiple', 'magic-number'],
    },
  ],
}

export const WIKI_HUB_CONFIGS = [BUSINESS_MODELS_HUB, GO_TO_MARKET_HUB, UNIT_ECONOMICS_HUB]

export function getWikiHubConfig(slug: string): WikiHubConfig | undefined {
  return WIKI_HUB_CONFIGS.find((hub) => hub.slug === slug)
}
