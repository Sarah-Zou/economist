import type { WikiEntityLink } from './wiki-entity-links';

export const SITE_BASE_URL = 'https://sarahzou.com';

export const SITE_ENTITY_IDS = {
  person: `${SITE_BASE_URL}/#person`,
  organization: `${SITE_BASE_URL}/#organization`,
  professionalService: `${SITE_BASE_URL}/#professional-service`,
  website: `${SITE_BASE_URL}/#website`,
} as const;

export interface ArticleData {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  about?: WikiEntityLink | null;
  mentions?: WikiEntityLink[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface CategoryItem {
  name: string;
  url: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

function entityLinkToSchemaThing(link: WikiEntityLink) {
  const sameAs = [link.wikipedia, link.wikidata].filter(Boolean);
  return {
    '@type': 'Thing',
    name: link.name,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function generateSiteEntityGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': SITE_ENTITY_IDS.website,
        name: 'Sarah Zou',
        url: SITE_BASE_URL,
        publisher: { '@id': SITE_ENTITY_IDS.organization },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_BASE_URL}/wiki/pricing?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': SITE_ENTITY_IDS.organization,
        name: 'EconNova Consulting',
        url: SITE_BASE_URL,
        logo: `${SITE_BASE_URL}/images/econnova_logo.png`,
        description:
          'Commercial strategy for technical founders of API-first infrastructure and data platform companies. Pricing architecture, GTM for technical buyers, unit economics, cost-floor modeling, and fundraising-ready commercial narratives.',
        founder: { '@id': SITE_ENTITY_IDS.person },
        sameAs: ['https://www.linkedin.com/in/drsarahzou'],
      },
      {
        '@type': 'Person',
        '@id': SITE_ENTITY_IDS.person,
        name: 'Sarah Zou',
        honorificSuffix: 'PhD',
        alternateName: 'Dr. Sarah Zou',
        jobTitle: 'Commercial Strategy Advisor for API-First Infrastructure & Data Platforms',
        description:
          'PhD economist and COO of a fiber-optic sensing infrastructure-as-a-service startup. Helps technical founders of API-first infrastructure and data platform companies build the commercial layer: pricing architecture, GTM for technical buyers, and fundraising-ready unit economics.',
        url: `${SITE_BASE_URL}/about`,
        image: `${SITE_BASE_URL}/images/headshot_v4.webp`,
        sameAs: ['https://www.linkedin.com/in/drsarahzou/'],
        worksFor: { '@id': SITE_ENTITY_IDS.organization },
        knowsAbout: [
          'Commercial Strategy',
          'Pricing Architecture',
          'Usage-Based Pricing',
          'Credit-Based Pricing',
          'Committed-Use Pricing',
          'API Monetization',
          'Infrastructure Economics',
          'GTM for Technical Buyers',
          'Founder-Led Sales',
          'Paid Pilot Design',
          'Unit Economics',
          'Cost-Floor Modeling',
          'Gross Margin Logic',
          'Fundraising Diligence',
          'Data-as-a-Service',
          'Sensing-as-a-Service',
          'Econometrics',
          'Revenue Model',
          'Investor Narratives',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': SITE_ENTITY_IDS.professionalService,
        name: 'EconNova Consulting',
        url: SITE_BASE_URL,
        logo: `${SITE_BASE_URL}/images/econnova_logo.png`,
        description:
          'Commercial strategy for technical founders of API-first infrastructure and data platform companies. Pricing architecture, GTM for technical buyers, unit economics, cost-floor modeling, and fundraising-ready commercial narratives.',
        founder: { '@id': SITE_ENTITY_IDS.person },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Princeton',
          addressRegion: 'NJ',
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Business Inquiries',
          email: 'hello@sarahzou.com',
          url: `${SITE_BASE_URL}/contact`,
        },
      },
    ],
  };
}

/** @deprecated Use generateSiteEntityGraphJsonLd() in root layout instead. */
export function generateOrganizationProfessionalServiceJsonLd() {
  const graph = generateSiteEntityGraphJsonLd();
  return graph['@graph'].find(
    (node) => node['@id'] === SITE_ENTITY_IDS.professionalService
  );
}

export function generateFAQJsonLd(data: { url: string; faqItems: FAQItem[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: data.url,
    mainEntity: data.faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateArticleJsonLd(data: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image || `${SITE_BASE_URL}/images/og-default.jpg`,
    author: { '@id': SITE_ENTITY_IDS.person },
    publisher: { '@id': SITE_ENTITY_IDS.organization },
    ...(data.datePublished ? { datePublished: data.datePublished } : {}),
    ...(data.dateModified ? { dateModified: data.dateModified } : {}),
    ...(data.about ? { about: entityLinkToSchemaThing(data.about) } : {}),
    ...(data.mentions?.length
      ? { mentions: data.mentions.map(entityLinkToSchemaThing) }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    url: data.url,
  };
}

export function generateTechArticleJsonLd(data: ArticleData) {
  return {
    ...generateArticleJsonLd(data),
    '@type': 'TechArticle',
  };
}

const DEFAULT_BASE_URL = SITE_BASE_URL;

export function generateBreadcrumbJsonLd(
  breadcrumbs: BreadcrumbItem[],
  baseUrl: string = DEFAULT_BASE_URL
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => {
      const absoluteUrl = item.url.startsWith('http')
        ? item.url
        : `${baseUrl.replace(/\/$/, '')}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl,
      };
    }),
  };
}

export function generateItemListJsonLd(categories: CategoryItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SaaS Pricing & Monetization Wiki Categories',
    description: 'Comprehensive guide to SaaS pricing and monetization strategies',
    numberOfItems: categories.length,
    itemListElement: categories.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.name,
      description: category.description,
      url: category.url,
    })),
  };
}

export function generateWebPageJsonLd(data: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url,
    dateModified: data.dateModified,
    isPartOf: { '@id': SITE_ENTITY_IDS.website },
  };
}

export function generateCollectionPageJsonLd(data: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.title,
    description: data.description,
    url: data.url,
    dateModified: data.dateModified,
    isPartOf: { '@id': SITE_ENTITY_IDS.website },
  };
}

export interface ServiceData {
  name: string;
  description: string;
  url: string;
}

export interface ServiceOfferTier {
  name: string;
  price: number;
  priceCurrency?: string;
  description?: string;
}

export function generateServiceJsonLd(data: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    url: data.url,
    provider: { '@id': SITE_ENTITY_IDS.professionalService },
  };
}

export function generateServiceWithOffersJsonLd(
  data: ServiceData & { offers: ServiceOfferTier[] }
) {
  return {
    ...generateServiceJsonLd(data),
    offers: data.offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency ?? 'USD',
      ...(offer.description ? { description: offer.description } : {}),
      url: data.url,
      availability: 'https://schema.org/InStock',
      seller: { '@id': SITE_ENTITY_IDS.organization },
    })),
  };
}
