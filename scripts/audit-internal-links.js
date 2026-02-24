#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const root = process.cwd();
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx']);
const ignoredDirs = new Set(['node_modules', '.next', 'out', '.git', 'reports']);

function walk(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (ignoredDirs.has(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (sourceExtensions.has(path.extname(item))) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizePathname(url) {
  const pathname = url.split('#')[0].split('?')[0];
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getCategoryAndConceptRoutes() {
  const categoryDir = path.join(root, 'content', 'wiki', 'categories');
  const categoryFiles = fs
    .readdirSync(categoryDir)
    .filter((name) => name.endsWith('.md'));

  const categoryRoutes = new Set();
  const conceptRoutes = new Set();
  const conceptRoutesMissingContent = new Set();

  for (const fileName of categoryFiles) {
    const fullPath = path.join(categoryDir, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContent);
    const categorySlug = data.slug || fileName.replace(/\.md$/, '');
    categoryRoutes.add(`/wiki/pricing/${categorySlug}`);

    const lines = fileContent.split('\n');
    let inConceptSection = false;
    for (const line of lines) {
      if (line.includes("## What's in this category")) {
        inConceptSection = true;
        continue;
      }
      if (line.startsWith('## ')) {
        inConceptSection = false;
      }
      if (!inConceptSection) continue;

      const match = line.match(/<span id="([^"]+)">/);
      if (!match) continue;

      const conceptId = match[1];
      const route = `/wiki/pricing/${categorySlug}/${conceptId}`;
      conceptRoutes.add(route);

      const conceptFile = path.join(
        root,
        'content',
        'wiki',
        'concepts',
        categorySlug,
        `${conceptId}.md`
      );
      if (!fs.existsSync(conceptFile)) {
        conceptRoutesMissingContent.add(route);
      }
    }
  }

  return { categoryRoutes, conceptRoutes, conceptRoutesMissingContent };
}

function getStaticPageRoutes() {
  const appDir = path.join(root, 'app');
  const staticRoutes = new Set(['/']);

  const visit = (dir) => {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        visit(fullPath);
        continue;
      }
      if (!fullPath.endsWith(`${path.sep}page.tsx`)) continue;

      const rel = path.relative(appDir, fullPath).replace(/\\/g, '/');
      const routePart = rel.replace(/\/page\.tsx$/, '');
      if (routePart.includes('[')) continue;

      staticRoutes.add(routePart === '' ? '/' : `/${routePart}`);
    }
  };

  visit(appDir);
  return staticRoutes;
}

function getNewsletterRoutes() {
  const postsDir = path.join(root, '_posts');
  const routes = new Set();
  if (!fs.existsSync(postsDir)) return routes;

  const postFiles = fs.readdirSync(postsDir).filter((name) => name.endsWith('.md'));
  for (const fileName of postFiles) {
    const slug = fileName
      .replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '')
      .replace(/\.md$/, '');
    routes.add(`/newsletter/${slug}`);
  }

  return routes;
}

function getDownloadRoutes() {
  const downloadsFile = path.join(root, 'lib', 'downloads.ts');
  const content = fs.readFileSync(downloadsFile, 'utf8');
  const matches = [...content.matchAll(/'([^']+)':\s*\{/g)];
  return new Set(matches.map((m) => `/downloads/${m[1]}`));
}

function extractInternalLinksFromSources(sourceFiles) {
  const urlToSources = new Map();

  const add = (url, filePath) => {
    if (!url || !url.startsWith('/') || url.startsWith('//')) return;
    if (!urlToSources.has(url)) urlToSources.set(url, new Set());
    urlToSources.get(url).add(path.relative(root, filePath));
  };

  for (const filePath of sourceFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    let match;

    const markdownLink = /\[[^\]]*\]\((\/[^)\s]+)\)/g;
    while ((match = markdownLink.exec(content)) !== null) {
      add(match[1], filePath);
    }

    const hrefAttr = /href\s*=\s*["'](\/[^"']+)["']/g;
    while ((match = hrefAttr.exec(content)) !== null) {
      add(match[1], filePath);
    }
  }

  return urlToSources;
}

function main() {
  const sourceFiles = walk(root);
  const sourceLinks = extractInternalLinksFromSources(sourceFiles);

  const knownRoutes = new Set([
    ...getStaticPageRoutes(),
    ...getNewsletterRoutes(),
    ...getDownloadRoutes(),
  ]);

  const { categoryRoutes, conceptRoutes, conceptRoutesMissingContent } =
    getCategoryAndConceptRoutes();
  for (const route of categoryRoutes) knownRoutes.add(route);
  for (const route of conceptRoutes) knownRoutes.add(route);

  const allowPrefixes = ['/images/', '/files/', '/api/'];
  const broken = [];

  for (const [rawUrl, sourceSet] of sourceLinks.entries()) {
    const url = normalizePathname(rawUrl);
    const isKnownRoute = knownRoutes.has(url);
    const isAllowedPrefix = allowPrefixes.some((prefix) => url.startsWith(prefix));
    if (isKnownRoute || isAllowedPrefix) continue;

    broken.push({
      url,
      sources: [...sourceSet].sort(),
    });
  }

  broken.sort((a, b) => a.url.localeCompare(b.url));
  const soft404Candidates = [...conceptRoutesMissingContent].sort();

  console.log(
    JSON.stringify(
      {
        counts: {
          discoveredInternalUrls: sourceLinks.size,
          hard404Candidates: broken.length,
          soft404Candidates: soft404Candidates.length,
        },
        hard404Candidates: broken,
        soft404Candidates,
      },
      null,
      2
    )
  );
}

main();
