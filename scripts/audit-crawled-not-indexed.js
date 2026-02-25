#!/usr/bin/env node

/**
 * Audit URLs from docs/gsc-crawled-not-indexed.txt against static export output.
 *
 * Outputs:
 * - docs/gsc-crawled-not-indexed-report.md
 * - docs/gsc-crawled-not-indexed-report.csv
 *
 * Exit codes:
 * - 0: no blocking issues
 * - 1: one or more blocking issues (non-200, noindex, canonical missing/mismatch)
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const INPUT_FILE = path.join(ROOT, 'docs', 'gsc-crawled-not-indexed.txt');
const REPORT_MD = path.join(ROOT, 'docs', 'gsc-crawled-not-indexed-report.md');
const REPORT_CSV = path.join(ROOT, 'docs', 'gsc-crawled-not-indexed-report.csv');
const OUT_DIR = path.join(ROOT, 'out');
const POSTS_DIR = path.join(ROOT, '_posts');
const LEGACY_MAP_FILE = path.join(
  ROOT,
  'docs',
  'github-pages-legacy-url-remediation-map.csv'
);

const LOW_LINK_THRESHOLD = 2;
const WORD_THRESHOLDS = {
  concept: 450,
  category: 250,
  newsletter: 350,
  consultingService: 300,
  generic: 300,
};

function readLines(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file not found: ${filePath}`);
  }
  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

function loadLegacyMap() {
  if (!fs.existsSync(LEGACY_MAP_FILE)) {
    return new Map();
  }
  const lines = fs
    .readFileSync(LEGACY_MAP_FILE, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length <= 1) {
    return new Map();
  }

  const map = new Map();
  for (const line of lines.slice(1)) {
    // Parse the first three CSV columns only: legacy_path,recommended_status,target_path
    const firstComma = line.indexOf(',');
    const secondComma = firstComma >= 0 ? line.indexOf(',', firstComma + 1) : -1;
    const thirdComma = secondComma >= 0 ? line.indexOf(',', secondComma + 1) : -1;
    if (firstComma < 0 || secondComma < 0) continue;

    const legacyPath = line.slice(0, firstComma).trim();
    const recommendedStatus = line.slice(firstComma + 1, secondComma).trim();
    const targetPath = thirdComma >= 0 ? line.slice(secondComma + 1, thirdComma).trim() : '';
    if (!legacyPath || !recommendedStatus) continue;

    map.set(normalizePathname(legacyPath), {
      recommendedStatus,
      targetPath,
    });
  }
  return map;
}

function walkFiles(dir, matcher, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, matcher, acc);
    } else if (matcher(full)) {
      acc.push(full);
    }
  }
  return acc;
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function toCanonicalUrl(rawUrl) {
  const url = new URL(rawUrl);
  const pathname = normalizePathname(url.pathname);
  return `${url.protocol}//${url.host}${pathname}`;
}

function routeMapping(urlObj) {
  const pathname = normalizePathname(urlObj.pathname);
  const segments = pathname.split('/').filter(Boolean);

  const result = {
    routeType: 'generic',
    routeFile: 'unknown',
    sourceFile: 'n/a',
  };

  if (pathname === '/wiki/pricing') {
    result.routeType = 'wikiIndex';
    result.routeFile = 'app/wiki/pricing/page.tsx';
    return result;
  }

  if (segments[0] === 'wiki' && segments[1] === 'pricing') {
    if (segments.length === 3) {
      const category = segments[2];
      result.routeType = 'category';
      result.routeFile = 'app/wiki/pricing/[category]/page.tsx';
      result.sourceFile = `content/wiki/categories/${category}.md`;
      return result;
    }
    if (segments.length === 4) {
      const category = segments[2];
      const concept = segments[3];
      result.routeType = 'concept';
      result.routeFile = 'app/wiki/pricing/[category]/[concept]/page.tsx';
      result.sourceFile = `content/wiki/concepts/${category}/${concept}.md`;
      return result;
    }
  }

  if (segments[0] === 'newsletter' && segments.length === 2) {
    const slug = segments[1];
    result.routeType = 'newsletter';
    result.routeFile = 'app/newsletter/[slug]/page.tsx';
    const postFiles = fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR) : [];
    const found = postFiles.find((file) => file.endsWith(`-${slug}.md`));
    result.sourceFile = found ? `_posts/${found}` : `_posts/*-${slug}.md`;
    return result;
  }

  if (
    segments[0] === 'consulting' &&
    segments[1] === 'services' &&
    segments.length === 3
  ) {
    const slug = segments[2];
    result.routeType = 'consultingService';
    result.routeFile = `app/consulting/services/${slug}/page.tsx`;
    result.sourceFile = result.routeFile;
    return result;
  }

  if (pathname.startsWith('/_next/')) {
    result.routeType = 'asset';
    result.routeFile = 'static asset';
    result.sourceFile = 'generated by Next.js build';
    return result;
  }

  return result;
}

function buildCandidates(pathname) {
  const normalized = normalizePathname(pathname);
  if (normalized === '/') {
    return [path.join(OUT_DIR, 'index.html')];
  }
  const rel = normalized.replace(/^\//, '');
  return [
    path.join(OUT_DIR, `${rel}.html`),
    path.join(OUT_DIR, rel, 'index.html'),
    path.join(OUT_DIR, rel),
  ];
}

function getBuildArtifact(pathname) {
  const candidates = buildCandidates(pathname);
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWordCountFromHtml(html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const source = mainMatch ? mainMatch[1] : html;
  const text = stripHtml(source);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractMetaDescription(html) {
  const m = html.match(
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
  );
  return m ? m[1].trim() : '';
}

function extractCanonicalLinks(html) {
  const links = [];
  const regex = /<link[^>]+rel=["']canonical["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const hrefMatch = match[0].match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      links.push(hrefMatch[1].trim());
    }
  }
  return links;
}

function hasNoindexMeta(html) {
  const robotsMetaRegex =
    /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = robotsMetaRegex.exec(html)) !== null) {
    if (match[1].toLowerCase().includes('noindex')) {
      return true;
    }
  }
  const googleBotMetaRegex =
    /<meta[^>]+name=["']googlebot["'][^>]*content=["']([^"']*)["'][^>]*>/gi;
  while ((match = googleBotMetaRegex.exec(html)) !== null) {
    if (match[1].toLowerCase().includes('noindex')) {
      return true;
    }
  }
  return false;
}

function countH1(html) {
  const matches = html.match(/<h1\b/gi);
  return matches ? matches.length : 0;
}

function isLikelySoft404(mainText, wordCount) {
  const lower = mainText.toLowerCase();
  if (lower.includes('content coming soon')) return true;
  if (lower.includes('page not found')) return true;
  return wordCount < 150;
}

function normalizeInternalHref(href, baseHost) {
  if (!href) return null;
  if (href.startsWith('#')) return null;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (href.startsWith('javascript:')) return null;

  try {
    if (href.startsWith('http://') || href.startsWith('https://')) {
      const url = new URL(href);
      if (url.host !== baseHost) return null;
      return `${url.protocol}//${url.host}${normalizePathname(url.pathname)}`;
    }
    if (href.startsWith('/')) {
      return `https://${baseHost}${normalizePathname(href)}`;
    }
  } catch (error) {
    return null;
  }

  return null;
}

function extractInternalLinksFromHtml(html, baseHost) {
  const links = [];
  const hrefRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const normalized = normalizeInternalHref(match[1], baseHost);
    if (normalized) {
      links.push(normalized);
    }
  }
  return links;
}

function readSitemapUrls() {
  const sitemapFiles = [
    path.join(OUT_DIR, 'sitemap.xml'),
    path.join(OUT_DIR, 'sitemap-wiki.xml'),
    path.join(OUT_DIR, 'sitemap-posts.xml'),
  ].filter((filePath) => fs.existsSync(filePath));

  const urls = [];
  for (const filePath of sitemapFiles) {
    const xml = fs.readFileSync(filePath, 'utf8');
    const locRegex = /<loc>([^<]+)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(toCanonicalUrl(match[1]));
    }
  }
  return urls;
}

function toRelative(root, absPath) {
  const rel = path.relative(root, absPath);
  return rel.split(path.sep).join('/');
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (text.includes('"') || text.includes(',') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('Missing out/ build output. Run `npm run build` first.');
    process.exit(1);
  }

  const rawUrls = readLines(INPUT_FILE);
  if (rawUrls.length === 0) {
    console.error('No URLs found in docs/gsc-crawled-not-indexed.txt');
    process.exit(1);
  }

  const canonicalAuditUrls = rawUrls.map((u) => toCanonicalUrl(u));
  const canonicalAuditUrlSet = new Set(canonicalAuditUrls);
  const legacyMap = loadLegacyMap();
  const baseHost = new URL(rawUrls[0]).host;
  const titleByUrl = new Map();
  const descByUrl = new Map();
  const rows = [];

  const allHtmlFiles = walkFiles(OUT_DIR, (f) => f.endsWith('.html'));
  const inboundCounts = new Map();
  for (const target of canonicalAuditUrls) {
    inboundCounts.set(target, 0);
  }

  for (const htmlFile of allHtmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const links = extractInternalLinksFromHtml(html, baseHost);
    for (const link of links) {
      if (inboundCounts.has(link)) {
        inboundCounts.set(link, (inboundCounts.get(link) || 0) + 1);
      }
    }
  }

  const sitemapUrls = readSitemapUrls();
  const sitemapSet = new Set(sitemapUrls);
  const duplicateSitemapUrls = sitemapUrls.filter(
    (url, idx) => sitemapUrls.indexOf(url) !== idx
  );

  let sitemapNon200Count = 0;
  for (const sitemapUrl of new Set(sitemapUrls)) {
    const urlObj = new URL(sitemapUrl);
    const artifact = getBuildArtifact(urlObj.pathname);
    if (!artifact) {
      sitemapNon200Count += 1;
    }
  }

  for (const rawUrl of rawUrls) {
    const urlObj = new URL(rawUrl);
    const canonicalUrl = toCanonicalUrl(rawUrl);
    const pathname = normalizePathname(urlObj.pathname);
    const mapping = routeMapping(urlObj);
    const artifact = getBuildArtifact(pathname);
    const existsInBuild = Boolean(artifact);
    const status = existsInBuild ? 200 : 404;
    const sourceExists =
      mapping.sourceFile === 'n/a' ||
      mapping.sourceFile === 'generated by Next.js build' ||
      fs.existsSync(path.join(ROOT, mapping.sourceFile));

    const canonicalVariant = `${urlObj.protocol}//${urlObj.host}${pathname}`;
    const hasTrailingSlashInInput = urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/');
    const canonicalVariantInInput = canonicalAuditUrlSet.has(canonicalVariant);
    const legacyRule = legacyMap.get(pathname);
    const isExpectedLegacy =
      Boolean(legacyRule) &&
      (legacyRule.recommendedStatus === '301' || legacyRule.recommendedStatus === '410');
    const expectedNonIndexableReason = mapping.routeType === 'asset'
      ? 'asset'
      : isExpectedLegacy
        ? `legacy-${legacyRule.recommendedStatus}`
        : hasTrailingSlashInInput && canonicalVariantInInput
          ? 'trailing-slash-alternate'
          : '';

    let canonicalLinks = [];
    let title = '';
    let metaDescription = '';
    let h1Count = 0;
    let wordCount = 0;
    let noindex = false;
    let soft404 = false;
    let canonicalOk = false;
    let canonicalError = '';
    let hasXRobotsNoindex = false; // static export audit cannot inspect response headers

    let mainText = '';

    if (existsInBuild && artifact && artifact.endsWith('.html')) {
      const html = fs.readFileSync(artifact, 'utf8');
      canonicalLinks = extractCanonicalLinks(html).map((href) => toCanonicalUrl(href));
      title = extractTitle(html);
      metaDescription = extractMetaDescription(html);
      h1Count = countH1(html);
      wordCount = getWordCountFromHtml(html);
      const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
      mainText = stripHtml(mainMatch ? mainMatch[1] : html);
      noindex = hasNoindexMeta(html);
      soft404 = isLikelySoft404(mainText, wordCount);

      if (canonicalLinks.length === 0) {
        canonicalError = 'missing canonical';
      } else if (canonicalLinks.length > 1) {
        canonicalError = `multiple canonicals (${canonicalLinks.length})`;
      } else if (canonicalLinks[0] !== canonicalUrl) {
        canonicalError = `canonical mismatch (${canonicalLinks[0]})`;
      } else {
        canonicalOk = true;
      }
    }

    const threshold = WORD_THRESHOLDS[mapping.routeType] || WORD_THRESHOLDS.generic;
    const inboundLinks = inboundCounts.get(canonicalUrl) || 0;
    const lowLinks = inboundLinks < LOW_LINK_THRESHOLD;
    const inSitemap = sitemapSet.has(canonicalUrl);

    titleByUrl.set(canonicalUrl, title);
    descByUrl.set(canonicalUrl, metaDescription);

    rows.push({
      rawUrl,
      canonicalUrl,
      pathname,
      routeType: mapping.routeType,
      routeFile: mapping.routeFile,
      sourceFile: mapping.sourceFile,
      sourceExists,
      buildArtifact: artifact ? toRelative(ROOT, artifact) : '',
      status,
      existsInBuild,
      noindex,
      hasXRobotsNoindex,
      canonicalLinks,
      canonicalOk,
      canonicalError,
      title,
      metaDescription,
      h1Count,
      wordCount,
      wordThreshold: threshold,
      wordThresholdOk: wordCount >= threshold,
      soft404,
      inboundLinks,
      lowLinks,
      inSitemap,
      expectedNonIndexableReason,
    });
  }

  const titleCounts = new Map();
  const descCounts = new Map();
  for (const row of rows) {
    if (row.title) titleCounts.set(row.title, (titleCounts.get(row.title) || 0) + 1);
    if (row.metaDescription) {
      descCounts.set(
        row.metaDescription,
        (descCounts.get(row.metaDescription) || 0) + 1
      );
    }
  }

  const blockers = [];
  const warnings = [];
  for (const row of rows) {
    const duplicateTitle = row.title && titleCounts.get(row.title) > 1;
    const duplicateDescription =
      row.metaDescription && descCounts.get(row.metaDescription) > 1;
    row.duplicateTitle = Boolean(duplicateTitle);
    row.duplicateDescription = Boolean(duplicateDescription);

    const isExpectedNonIndexable = Boolean(row.expectedNonIndexableReason);

    if (!isExpectedNonIndexable && row.status !== 200) {
      blockers.push(`${row.rawUrl}: build status ${row.status}`);
    }
    if (!isExpectedNonIndexable && row.status === 200 && row.noindex) {
      blockers.push(`${row.rawUrl}: meta robots includes noindex`);
    }
    if (!isExpectedNonIndexable && row.status === 200 && !row.canonicalOk) {
      blockers.push(`${row.rawUrl}: ${row.canonicalError || 'canonical check failed'}`);
    }

    if (isExpectedNonIndexable) {
      warnings.push(
        `${row.rawUrl}: expected non-indexable (${row.expectedNonIndexableReason})`
      );
    }

    if (!isExpectedNonIndexable && row.status === 200 && row.soft404) warnings.push(`${row.rawUrl}: looks like soft-404/thin content`);
    if (!isExpectedNonIndexable && row.status === 200 && row.h1Count !== 1) warnings.push(`${row.rawUrl}: H1 count ${row.h1Count}`);
    if (!isExpectedNonIndexable && row.status === 200 && !row.wordThresholdOk) {
      warnings.push(
        `${row.rawUrl}: word count ${row.wordCount} below threshold ${row.wordThreshold}`
      );
    }
    if (!isExpectedNonIndexable && row.lowLinks) {
      warnings.push(
        `${row.rawUrl}: low inbound links (${row.inboundLinks} < ${LOW_LINK_THRESHOLD})`
      );
    }
    if (!isExpectedNonIndexable && row.duplicateTitle) warnings.push(`${row.rawUrl}: duplicate title`);
    if (!isExpectedNonIndexable && row.duplicateDescription) warnings.push(`${row.rawUrl}: duplicate meta description`);
    if (!isExpectedNonIndexable && !row.inSitemap) warnings.push(`${row.rawUrl}: canonical URL not found in sitemap`);
  }

  if (duplicateSitemapUrls.length > 0) {
    warnings.push(`Sitemap duplicate URLs: ${duplicateSitemapUrls.length}`);
  }
  if (sitemapNon200Count > 0) {
    warnings.push(`Sitemap URLs missing in build output: ${sitemapNon200Count}`);
  }

  const mdLines = [];
  mdLines.push('# GSC Crawled - Not Indexed Audit Report');
  mdLines.push('');
  mdLines.push(`- Generated: ${new Date().toISOString()}`);
  mdLines.push(`- Input URLs: ${rows.length}`);
  mdLines.push(`- Blocking issues: ${blockers.length}`);
  mdLines.push(`- Warnings: ${warnings.length}`);
  mdLines.push('');
  mdLines.push('## Blocking Issues (Fail CI)');
  mdLines.push('');
  if (blockers.length === 0) {
    mdLines.push('- None');
  } else {
    for (const b of blockers) mdLines.push(`- ${b}`);
  }
  mdLines.push('');
  mdLines.push('## Warnings');
  mdLines.push('');
  if (warnings.length === 0) {
    mdLines.push('- None');
  } else {
    for (const w of warnings) mdLines.push(`- ${w}`);
  }
  mdLines.push('');
  mdLines.push('## URL Details');
  mdLines.push('');
  mdLines.push(
    '| URL | Route mapping | Build | Indexability | Quality | Inbound links | Sitemap |'
  );
  mdLines.push('|---|---|---|---|---|---:|---|');
  for (const row of rows) {
    const routeInfo = `\`${row.routeFile}\`<br/>\`${row.sourceFile}\``;
    const buildInfo = row.existsInBuild
      ? `200 (\`${row.buildArtifact}\`)`
      : `${row.status} (missing)`;
    const indexability = row.canonicalOk
      ? `canonical ok<br/>noindex=${row.noindex ? 'yes' : 'no'}`
      : `${row.canonicalError}<br/>noindex=${row.noindex ? 'yes' : 'no'}`;
    const quality = `h1=${row.h1Count}, words=${row.wordCount}/${row.wordThreshold}${
      row.soft404 ? ', soft404?' : ''
    }`;
    const sitemapInfo = row.inSitemap ? 'yes' : 'no';
    const expectedInfo = row.expectedNonIndexableReason || 'no';
    mdLines.push(
      `| ${row.rawUrl} | ${routeInfo} | ${buildInfo} | ${indexability}<br/>expected_non_indexable=${expectedInfo} | ${quality} | ${row.inboundLinks} | ${sitemapInfo} |`
    );
  }
  mdLines.push('');
  mdLines.push('## Sitemap Integrity');
  mdLines.push('');
  mdLines.push(`- Duplicate sitemap URLs: ${duplicateSitemapUrls.length}`);
  mdLines.push(`- Sitemap URLs missing in build output: ${sitemapNon200Count}`);
  mdLines.push('');

  fs.writeFileSync(REPORT_MD, `${mdLines.join('\n')}\n`, 'utf8');

  const csvHeader = [
    'url',
    'canonical_url',
    'route_type',
    'route_file',
    'source_file',
    'source_exists',
    'build_status',
    'build_artifact',
    'noindex',
    'x_robots_noindex',
    'canonical_ok',
    'canonical_error',
    'h1_count',
    'word_count',
    'word_threshold',
    'soft_404_flag',
    'duplicate_title',
    'duplicate_meta_description',
    'inbound_links',
    'low_inbound_links',
    'in_sitemap',
    'expected_non_indexable_reason',
  ];
  const csvLines = [csvHeader.join(',')];
  for (const row of rows) {
    const values = [
      row.rawUrl,
      row.canonicalUrl,
      row.routeType,
      row.routeFile,
      row.sourceFile,
      row.sourceExists,
      row.status,
      row.buildArtifact,
      row.noindex,
      row.hasXRobotsNoindex,
      row.canonicalOk,
      row.canonicalError,
      row.h1Count,
      row.wordCount,
      row.wordThreshold,
      row.soft404,
      row.duplicateTitle,
      row.duplicateDescription,
      row.inboundLinks,
      row.lowLinks,
      row.inSitemap,
      row.expectedNonIndexableReason,
    ];
    csvLines.push(values.map(csvEscape).join(','));
  }
  fs.writeFileSync(REPORT_CSV, `${csvLines.join('\n')}\n`, 'utf8');

  console.log(`Wrote ${toRelative(ROOT, REPORT_MD)}`);
  console.log(`Wrote ${toRelative(ROOT, REPORT_CSV)}`);
  console.log(`Blocking issues: ${blockers.length}`);
  console.log(`Warnings: ${warnings.length}`);

  process.exit(blockers.length > 0 ? 1 : 0);
}

main();
