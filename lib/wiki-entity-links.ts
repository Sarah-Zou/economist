export interface WikiEntityLink {
  name: string;
  wikipedia?: string;
  wikidata?: string;
}

/** Maps published wiki concept paths to external entity URIs for JSON-LD grounding. */
const WIKI_CONCEPT_ENTITY_LINKS: Record<string, WikiEntityLink> = {
  'foundations/value-based-pricing': {
    name: 'Value-based pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Value-based_pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q7919018',
  },
  'foundations/strategic-pricing': {
    name: 'Pricing strategy',
    wikipedia: 'https://en.wikipedia.org/wiki/Pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q124964',
  },
  'foundations/skimming-strategy': {
    name: 'Price skimming',
    wikipedia: 'https://en.wikipedia.org/wiki/Price_skimming',
    wikidata: 'https://www.wikidata.org/wiki/Q7243122',
  },
  'foundations/penetration-strategy': {
    name: 'Penetration pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Penetration_pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q7165295',
  },
  'foundations/maximization': {
    name: 'Profit maximization',
    wikipedia: 'https://en.wikipedia.org/wiki/Profit_maximization',
    wikidata: 'https://www.wikidata.org/wiki/Q211413',
  },
  'foundations/cost-plus-pricing': {
    name: 'Cost-plus pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Cost-plus_pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q5176453',
  },
  'foundations/competition-based-pricing': {
    name: 'Competitive pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Competitive_pricing',
  },
  'foundations/customer-driven-pricing': {
    name: 'Dynamic pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Dynamic_pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q1260801',
  },
  'models-and-metering/freemium-model': {
    name: 'Freemium',
    wikipedia: 'https://en.wikipedia.org/wiki/Freemium',
    wikidata: 'https://www.wikidata.org/wiki/Q2424448',
  },
  'models-and-metering/subscription-model': {
    name: 'Subscription business model',
    wikipedia: 'https://en.wikipedia.org/wiki/Subscription_business_model',
    wikidata: 'https://www.wikidata.org/wiki/Q988108',
  },
  'models-and-metering/seat-based-pricing': {
    name: 'Per-seat licensing',
    wikipedia: 'https://en.wikipedia.org/wiki/Software_license',
  },
  'models-and-metering/usage-based-pricing': {
    name: 'Usage-based pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Pay_as_you_go',
  },
  'models-and-metering/hybrid-pricing': {
    name: 'Pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q124964',
  },
  'models-and-metering/monetization-model': {
    name: 'Monetization',
    wikipedia: 'https://en.wikipedia.org/wiki/Monetization',
    wikidata: 'https://www.wikidata.org/wiki/Q194046',
  },
  'models-and-metering/pricing-metric-value-metric': {
    name: 'Pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q124964',
  },
  'models-and-metering/outcome-performance-based-pricing': {
    name: 'Outcome-based pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Outcome-based_pricing',
  },
  'models-and-metering/credits-drawdown-model': {
    name: 'Prepaid',
    wikipedia: 'https://en.wikipedia.org/wiki/Prepaid',
  },
  'models-and-metering/transaction-based-pricing': {
    name: 'Transaction fee',
    wikipedia: 'https://en.wikipedia.org/wiki/Transaction_fee',
    wikidata: 'https://www.wikidata.org/wiki/Q7830265',
  },
  'packaging-and-bundling/packaging': {
    name: 'Product bundling',
    wikipedia: 'https://en.wikipedia.org/wiki/Product_bundling',
    wikidata: 'https://www.wikidata.org/wiki/Q7247780',
  },
  'packaging-and-bundling/bundling': {
    name: 'Product bundling',
    wikipedia: 'https://en.wikipedia.org/wiki/Product_bundling',
    wikidata: 'https://www.wikidata.org/wiki/Q7247780',
  },
  'packaging-and-bundling/good-better-best': {
    name: 'Good-better-best',
    wikipedia: 'https://en.wikipedia.org/wiki/Good-better-best',
  },
  'packaging-and-bundling/leader-filler-killer-features': {
    name: 'Kano model',
    wikipedia: 'https://en.wikipedia.org/wiki/Kano_model',
    wikidata: 'https://www.wikidata.org/wiki/Q1723865',
  },
  'packaging-and-bundling/add-ons-modular': {
    name: 'Modular design',
    wikipedia: 'https://en.wikipedia.org/wiki/Modular_design',
    wikidata: 'https://www.wikidata.org/wiki/Q747713',
  },
  'value-and-customers/willingness-to-pay': {
    name: 'Willingness to pay',
    wikipedia: 'https://en.wikipedia.org/wiki/Willingness_to_pay',
    wikidata: 'https://www.wikidata.org/wiki/Q1415395',
  },
  'value-and-customers/value-decoder-framework': {
    name: 'Value-based pricing',
    wikipedia: 'https://en.wikipedia.org/wiki/Value-based_pricing',
    wikidata: 'https://www.wikidata.org/wiki/Q7919018',
  },
  'value-and-customers/economic-value-estimation': {
    name: 'Economic value',
    wikipedia: 'https://en.wikipedia.org/wiki/Economic_value',
  },
  'value-and-customers/value-drivers': {
    name: 'Customer value',
    wikipedia: 'https://en.wikipedia.org/wiki/Customer_value',
  },
  'value-and-customers/customer-segments': {
    name: 'Market segmentation',
    wikipedia: 'https://en.wikipedia.org/wiki/Market_segmentation',
    wikidata: 'https://www.wikidata.org/wiki/Q754786',
  },
  'value-and-customers/price-fences-price-discrimination': {
    name: 'Price discrimination',
    wikipedia: 'https://en.wikipedia.org/wiki/Price_discrimination',
    wikidata: 'https://www.wikidata.org/wiki/Q469379',
  },
  'value-and-customers/jobs-to-be-done': {
    name: 'Jobs to be done',
    wikipedia: 'https://en.wikipedia.org/wiki/Jobs_to_be_done',
    wikidata: 'https://www.wikidata.org/wiki/Q62094651',
  },
  'value-and-customers/ideal-customer-profile': {
    name: 'Ideal customer profile',
    wikipedia: 'https://en.wikipedia.org/wiki/Ideal_customer_profile',
  },
  'value-and-customers/customer-use-cases': {
    name: 'Use case',
    wikipedia: 'https://en.wikipedia.org/wiki/Use_case',
    wikidata: 'https://www.wikidata.org/wiki/Q217019',
  },
};

export function getWikiConceptEntityLink(
  category: string,
  concept: string
): WikiEntityLink | null {
  return WIKI_CONCEPT_ENTITY_LINKS[`${category}/${concept}`] ?? null;
}

export function getWikiConceptMentionLinks(
  category: string,
  relatedConceptIds: string[] = []
): WikiEntityLink[] {
  const mentions: WikiEntityLink[] = [];
  const seen = new Set<string>();

  for (const relatedId of relatedConceptIds) {
    const link = getWikiConceptEntityLink(category, relatedId);
    if (!link) {
      continue;
    }
    const key = link.wikidata ?? link.wikipedia ?? link.name;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    mentions.push(link);
    if (mentions.length >= 5) {
      break;
    }
  }

  return mentions;
}
