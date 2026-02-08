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

const DEFAULT_BASE_URL = "https://sarahzou.com";

export function generateBreadcrumbJsonLd(
  breadcrumbs: BreadcrumbItem[],
  baseUrl: string = DEFAULT_BASE_URL
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => {
      const absoluteUrl = item.url.startsWith("http") ? item.url : `${baseUrl.replace(/\/$/, "")}${item.url.startsWith("/") ? item.url : `/${item.url}`}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": absoluteUrl
      };
    })
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

export interface ServiceData {
  name: string;
  description: string;
  url: string;
}

export function generateServiceJsonLd(data: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "provider": {
      "@type": "Organization",
      "name": "EconNova Consulting",
      "url": "https://sarahzou.com"
    }
  };
}

export function generateOrganizationProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "EconNova Consulting",
    "url": "https://sarahzou.com",
    "logo": "https://sarahzou.com/images/EconNova_logo.png",
    "description": "Fractional Chief Economist and pricing strategy for early-stage tech. Pricing, metrics, unit economics, and investor-grade economic storytelling.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Princeton",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "email": "hello@sarahzou.com",
      "url": "https://sarahzou.com/contact"
    }
  };
}
