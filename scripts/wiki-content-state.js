#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();
const CATEGORY_DIR = path.join(ROOT, 'content', 'wiki', 'categories');
const CONCEPT_DIR = path.join(ROOT, 'content', 'wiki', 'concepts');
const BASE_URL = 'https://sarahzou.com';

const STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  RETIRED: 'retired',
};

function normalizeStatus(rawStatus) {
  if (rawStatus === STATUS.PUBLISHED || rawStatus === STATUS.DRAFT || rawStatus === STATUS.RETIRED) {
    return rawStatus;
  }
  return STATUS.PUBLISHED;
}

function normalizePath(rawPath) {
  if (!rawPath) return '/';
  const withSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return withSlash === '/' ? withSlash : withSlash.replace(/\/+$/, '');
}

function toAbsoluteUrl(pathname) {
  return `${BASE_URL}${normalizePath(pathname)}`;
}

function extractConceptIds(markdownContent) {
  const conceptIds = [];
  const lines = markdownContent.split('\n');
  let inConceptSection = false;

  for (const line of lines) {
    if (line.includes("## What's in this category")) {
      inConceptSection = true;
      continue;
    }
    if (line.startsWith('## ')) {
      inConceptSection = false;
      continue;
    }
    if (!inConceptSection) continue;

    const spanMatch = line.match(/<span id="([^"]+)">/);
    if (spanMatch) {
      conceptIds.push(spanMatch[1].trim());
    }
  }

  return Array.from(new Set(conceptIds));
}

function parseCategoryLinks(markdownContent) {
  const links = [];
  const lines = markdownContent.split('\n');
  let inRelatedSection = false;

  for (const line of lines) {
    if (line.includes('## Related categories')) {
      inRelatedSection = true;
      continue;
    }
    if (line.startsWith('## ')) {
      inRelatedSection = false;
      continue;
    }
    if (!inRelatedSection) continue;

    const match = line.match(/\[[^\]]+\]\(([^)]+)\)/);
    if (!match) continue;
    const href = match[1].trim();
    if (!href.includes('/wiki/pricing/')) continue;

    const slug = href
      .split('/wiki/pricing/')[1]
      .split('#')[0]
      .split('?')[0]
      .replace(/\/$/, '');
    if (slug) links.push(slug);
  }

  return Array.from(new Set(links));
}

function readCategoryRecords() {
  const files = fs
    .readdirSync(CATEGORY_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort();

  return files.map((fileName) => {
    const fullPath = path.join(CATEGORY_DIR, fileName);
    const markdown = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(markdown);
    const slug = data.slug || fileName.replace(/\.md$/, '');
    const status = normalizeStatus(data.status);
    const redirectTo = data.redirectTo ? normalizePath(data.redirectTo) : '';
    const conceptIds = extractConceptIds(content);
    const relatedCategorySlugs = parseCategoryLinks(content);

    return {
      slug,
      title: data.title || slug,
      canonical: data.canonical || toAbsoluteUrl(`/wiki/pricing/${slug}`),
      updated: data.updated || '',
      status,
      redirectTo,
      conceptIds,
      relatedCategorySlugs,
      sourceFile: fullPath,
      content,
    };
  });
}

function readConceptRecord(categorySlug, conceptId) {
  const conceptPath = path.join(CONCEPT_DIR, categorySlug, `${conceptId}.md`);
  if (!fs.existsSync(conceptPath)) {
    return null;
  }
  const markdown = fs.readFileSync(conceptPath, 'utf8');
  const { data } = matter(markdown);
  return {
    conceptId,
    status: normalizeStatus(data.status),
    redirectTo: data.redirectTo ? normalizePath(data.redirectTo) : '',
    canonical: data.canonical || toAbsoluteUrl(`/wiki/pricing/${categorySlug}/${conceptId}`),
    lastUpdated: data.lastUpdated || '',
    sourceFile: conceptPath,
  };
}

function buildWikiRegistry() {
  const categories = readCategoryRecords();
  const categoryStatusBySlug = new Map(categories.map((category) => [category.slug, category.status]));

  const publishedCategoryUrls = new Set();
  const publishedConceptUrls = new Set();
  const retiredUrls = new Set();
  const retiredPrefixes = new Set();
  const redirects = new Map();
  const unresolvedConceptPlaceholders = [];

  for (const category of categories) {
    const categoryPath = `/wiki/pricing/${category.slug}`;

    if (category.status === STATUS.PUBLISHED) {
      publishedCategoryUrls.add(categoryPath);
    } else if (category.status === STATUS.RETIRED) {
      if (category.redirectTo) {
        redirects.set(categoryPath, category.redirectTo);
      } else {
        retiredUrls.add(categoryPath);
        retiredPrefixes.add(`${categoryPath}/`);
      }
    }

    for (const conceptId of category.conceptIds) {
      const conceptPath = `/wiki/pricing/${category.slug}/${conceptId}`;
      const conceptRecord = readConceptRecord(category.slug, conceptId);

      if (category.status === STATUS.RETIRED) {
        if (category.redirectTo) {
          redirects.set(conceptPath, category.redirectTo);
        } else {
          retiredUrls.add(conceptPath);
        }
        continue;
      }

      if (!conceptRecord) {
        unresolvedConceptPlaceholders.push({
          category: category.slug,
          conceptId,
          url: conceptPath,
        });
        continue;
      }

      if (conceptRecord.status === STATUS.PUBLISHED) {
        publishedConceptUrls.add(conceptPath);
      } else if (conceptRecord.status === STATUS.RETIRED) {
        if (conceptRecord.redirectTo) {
          redirects.set(conceptPath, conceptRecord.redirectTo);
        } else {
          retiredUrls.add(conceptPath);
        }
      }
    }
  }

  const publishedUrls = new Set([...publishedCategoryUrls, ...publishedConceptUrls]);
  const nonPublishedStatusByUrl = new Map();
  for (const category of categories) {
    const categoryPath = `/wiki/pricing/${category.slug}`;
    if (category.status !== STATUS.PUBLISHED) {
      nonPublishedStatusByUrl.set(categoryPath, category.status);
    }
    for (const conceptId of category.conceptIds) {
      const conceptPath = `/wiki/pricing/${category.slug}/${conceptId}`;
      const conceptRecord = readConceptRecord(category.slug, conceptId);
      if (category.status !== STATUS.PUBLISHED) {
        nonPublishedStatusByUrl.set(conceptPath, category.status);
      } else if (!conceptRecord) {
        nonPublishedStatusByUrl.set(conceptPath, STATUS.RETIRED);
      } else if (conceptRecord.status !== STATUS.PUBLISHED) {
        nonPublishedStatusByUrl.set(conceptPath, conceptRecord.status);
      }
    }
  }

  return {
    statusValues: STATUS,
    categories,
    categoryStatusBySlug,
    publishedCategoryUrls,
    publishedConceptUrls,
    publishedUrls,
    nonPublishedStatusByUrl,
    retiredUrls,
    retiredPrefixes,
    redirects,
    unresolvedConceptPlaceholders,
    toAbsoluteUrl,
  };
}

module.exports = {
  BASE_URL,
  STATUS,
  buildWikiRegistry,
  normalizePath,
  toAbsoluteUrl,
};
