#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { BASE_URL, STATUS, buildWikiRegistry, normalizePath } = require('./wiki-content-state');

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/gi;
  let match;
  while ((match = re.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  return match ? match[1].trim() : '';
}

function extractLinks(html) {
  const links = [];
  const re = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    links.push(match[1].trim());
  }
  return links;
}

function toWikiPath(href) {
  if (!href) return null;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      const url = new URL(href);
      if (url.host !== 'sarahzou.com') return null;
      return normalizePath(url.pathname);
    } catch {
      return null;
    }
  }
  if (!href.startsWith('/')) return null;
  return normalizePath(href.split('#')[0].split('?')[0]);
}

function resolveOutHtml(pathname) {
  if (pathname === '/') {
    const rootIndex = path.join(OUT_DIR, 'index.html');
    return fs.existsSync(rootIndex) ? rootIndex : null;
  }
  const clean = pathname.replace(/^\//, '');
  const candidates = [
    path.join(OUT_DIR, `${clean}.html`),
    path.join(OUT_DIR, clean, 'index.html'),
    path.join(OUT_DIR, clean),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function validateInternalRegistries(registry, failures) {
  for (const category of registry.categories) {
    const categoryPath = `/wiki/pricing/${category.slug}`;
    if (!registry.publishedCategoryUrls.has(categoryPath)) {
      continue;
    }

    for (const relatedSlug of category.relatedCategorySlugs) {
      const relatedPath = `/wiki/pricing/${relatedSlug}`;
      if (!registry.publishedCategoryUrls.has(relatedPath)) {
        const status = registry.categoryStatusBySlug.get(relatedSlug) || 'missing';
        failures.push(
          `Published category "${category.slug}" links to non-published related category "${relatedSlug}" (${status}).`
        );
      }
    }

    for (const conceptId of category.conceptIds) {
      const conceptPath = `/wiki/pricing/${category.slug}/${conceptId}`;
      if (!registry.publishedConceptUrls.has(conceptPath)) {
        failures.push(
          `Published category "${category.slug}" registry contains non-published concept "${conceptId}".`
        );
      }
    }
  }
}

function validateSitemaps(registry, failures) {
  const sitemapFiles = ['sitemap.xml', 'sitemap-wiki.xml', 'sitemap-posts.xml', 'sitemap_index.xml']
    .map((name) => path.join(OUT_DIR, name))
    .filter((filePath) => fs.existsSync(filePath));

  const seen = new Set();
  const duplicateWikiUrls = new Set();

  for (const sitemapFile of sitemapFiles) {
    const xml = fs.readFileSync(sitemapFile, 'utf8');
    const urls = extractUrlsFromSitemap(xml);
    for (const fullUrl of urls) {
      let pathname = '';
      try {
        pathname = normalizePath(new URL(fullUrl).pathname);
      } catch {
        continue;
      }

      if (!pathname.startsWith('/wiki/pricing')) {
        continue;
      }

      if (seen.has(pathname)) {
        duplicateWikiUrls.add(pathname);
      }
      seen.add(pathname);

      if (pathname === '/wiki/pricing') {
        continue;
      }

      if (registry.redirects.has(pathname)) {
        failures.push(`Sitemap includes redirected wiki URL: ${pathname}`);
      } else if (registry.nonPublishedStatusByUrl.has(pathname)) {
        failures.push(
          `Sitemap includes non-published wiki URL: ${pathname} (${registry.nonPublishedStatusByUrl.get(pathname)})`
        );
      } else if (!registry.publishedUrls.has(pathname)) {
        failures.push(`Sitemap includes unknown/non-canonical wiki URL: ${pathname}`);
      }
    }
  }

  for (const dup of duplicateWikiUrls) {
    failures.push(`Duplicate wiki URL appears across sitemap files: ${dup}`);
  }
}

function validatePublishedPageOutputs(registry, failures) {
  const publishedPagePaths = ['/wiki/pricing', ...Array.from(registry.publishedUrls)].sort();
  const publishedPathSet = new Set(publishedPagePaths);

  for (const pagePath of publishedPagePaths) {
    const artifact = resolveOutHtml(pagePath);
    if (!artifact) {
      failures.push(`Published page is missing from static output: ${pagePath}`);
      continue;
    }

    const html = fs.readFileSync(artifact, 'utf8');
    const canonical = extractCanonical(html);
    const expectedCanonical = `${BASE_URL}${pagePath}`;
    if (canonical !== expectedCanonical) {
      failures.push(`Canonical mismatch on ${pagePath}: found "${canonical}" expected "${expectedCanonical}"`);
    } else {
      const canonicalPath = normalizePath(new URL(canonical).pathname);
      if (!publishedPathSet.has(canonicalPath)) {
        failures.push(`Canonical for ${pagePath} points to non-published URL: ${canonicalPath}`);
      }
    }

    const links = extractLinks(html);
    for (const href of links) {
      const linkedPath = toWikiPath(href);
      if (!linkedPath || !linkedPath.startsWith('/wiki/pricing')) {
        continue;
      }
      if (linkedPath === '/wiki/pricing') {
        continue;
      }
      if (registry.redirects.has(linkedPath)) {
        failures.push(`Published page ${pagePath} links to redirected wiki URL: ${linkedPath}`);
      } else if (registry.nonPublishedStatusByUrl.has(linkedPath)) {
        failures.push(
          `Published page ${pagePath} links to non-published wiki URL: ${linkedPath} (${registry.nonPublishedStatusByUrl.get(linkedPath)})`
        );
      } else if (!registry.publishedUrls.has(linkedPath)) {
        failures.push(`Published page ${pagePath} links to unknown wiki URL: ${linkedPath}`);
      }
    }
  }
}

function main() {
  const registry = buildWikiRegistry();
  const failures = [];

  if (!fs.existsSync(OUT_DIR)) {
    console.error('❌ Missing out/ directory. Run `npm run build` first.');
    process.exit(1);
  }

  validateInternalRegistries(registry, failures);
  validateSitemaps(registry, failures);
  validatePublishedPageOutputs(registry, failures);

  if (registry.unresolvedConceptPlaceholders.length > 0) {
    for (const unresolved of registry.unresolvedConceptPlaceholders) {
      if (registry.publishedCategoryUrls.has(`/wiki/pricing/${unresolved.category}`)) {
        failures.push(
          `Published category "${unresolved.category}" references missing concept content "${unresolved.conceptId}".`
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error('❌ Wiki content-state validation failed:\n');
    for (const issue of failures) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log('✓ Wiki content-state validation passed.');
  console.log(`  Published categories: ${registry.publishedCategoryUrls.size}`);
  console.log(`  Published concepts: ${registry.publishedConceptUrls.size}`);
  console.log(`  Retired URLs: ${registry.retiredUrls.size}`);
  console.log(`  Redirected URLs: ${registry.redirects.size}`);
}

main();
