export interface ArticleData {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
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

export function generateFAQJsonLd(data: {
  url: string;
  faqItems: FAQItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "url": data.url,
    "mainEntity": data.faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function generateArticleJsonLd(data: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.image || "https://sarahzou.com/images/og-default.jpg",
    "author": {
      "@type": "Person",
      "name": data.author,
      "url": "https://sarahzou.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sarah Zou",
      "url": "https://sarahzou.com"
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "url": data.url
  };
}

export function generateBreadcrumbJsonLd(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateItemListJsonLd(categories: CategoryItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SaaS Pricing & Monetization Wiki Categories",
    "description": "Comprehensive guide to SaaS pricing and monetization strategies",
    "numberOfItems": categories.length,
    "itemListElement": categories.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": category.name,
      "description": category.description,
      "url": category.url
    }))
  };
}

export function generateWebPageJsonLd(data: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.title,
    "description": data.description,
    "url": data.url,
    "dateModified": data.dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Sarah Zou",
      "url": "https://sarahzou.com"
    }
  };
}
