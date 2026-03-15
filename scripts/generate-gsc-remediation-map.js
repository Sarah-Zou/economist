#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();
const DOC_DIR = path.join(ROOT, 'docs', 'GSC_2026-03-13');
const INPUT_404 = path.join(DOC_DIR, 'page_list_404.csv');
const INPUT_CNI = path.join(DOC_DIR, 'page_list_crawled_not_indexed.csv');
const OUTPUT = path.join(DOC_DIR, 'url-remediation-map.csv');

const BASE = 'https://sarahzou.com';

const EXPLICIT_301 = new Map([
  ['/consulting/services/rapid-pricing-experiment-toolkit', '/consulting/services/pricing-monetization-sprint'],
  ['/consulting/services/investor-monetization-pitch-kit', '/consulting/services/pricing-monetization-sprint'],
  ['/consulting/services/profitability-simulator', '/consulting/services/on-call-economist-retainer'],
  ['/consulting/services/investor-updates-automation-kit', '/consulting/services/on-call-economist-retainer'],
  ['/consulting/services/investor-deck-accelerator', '/consulting/services/on-call-economist-retainer'],
  ['/consulting/services/customer-value-research-pack', '/consulting/services/pricing-monetization-sprint'],
  ['/consulting/services/value-based-monetization-design', '/consulting/services/pricing-monetization-sprint'],
  ['/consulting/services/runway-scenario-model', '/consulting/services/on-call-economist-retainer'],
  ['/consulting/services/competitive-benchmark-insights', '/consulting/services/metrics-experimentation-sprint'],
  ['/consulting/services/pricing-diagnostic-revenue-boost', '/consulting/services/pricing-monetization-sprint'],
  ['/consulting/services/pricing-optimization-retainer', '/consulting/services/on-call-economist-retainer'],
  ['/consulting/services/saas-metrics-clarity-pack', '/consulting/services/metrics-experimentation-sprint'],
  ['/downloads/stage-smart-metrics-benchmarks-2025-q2', '/newsletter/saas-benchmark-data-sources-guide'],
  ['/downloads/saas-benchmark-source-navigator', '/newsletter/saas-benchmark-data-sources-guide'],
  ['/downloads/monetization-roadmap', '/downloads/monetization-roadmap'],
  ['/wiki/pricing/models-and-metering/pricing-metric', '/wiki/pricing/models-and-metering/pricing-metric-value-metric'],
  ['/wiki/pricing/models-and-metering/value-metric', '/wiki/pricing/models-and-metering/pricing-metric-value-metric'],
  ['/wiki/pricing/models-and-metering/per-user-per-seat', '/wiki/pricing/models-and-metering/seat-based-pricing'],
  ['/wiki/pricing/models-and-metering/outcome-based-pricing', '/wiki/pricing/models-and-metering/outcome-performance-based-pricing'],
  ['/wiki/pricing/models-and-metering/credit-based-metrics', '/wiki/pricing/models-and-metering/credits-drawdown-model'],
  ['/wiki/pricing/models-and-metering/consumption-based-pricing', '/wiki/pricing/models-and-metering/usage-based-pricing'],
  ['/wiki/pricing/value-and-customers/buyer-identification-fences', '/wiki/pricing/value-and-customers/price-fences-price-discrimination'],
  ['/wiki/pricing/packaging-and-bundling/leaders-fillers-killers', '/wiki/pricing/packaging-and-bundling/leader-filler-killer-features'],
  ['/wiki/pricing/packaging-and-bundling/modular-packaging', '/wiki/pricing/packaging-and-bundling/add-ons-modular'],
  ['/wiki/pricing/foundations/price-led-product-design', '/wiki/pricing/foundations/strategic-pricing'],
  ['/wiki/pricing/research-and-metrics', '/wiki/pricing/research-and-experiments'],
  ['/wiki/pricing/price-architecture', '/wiki/pricing/packaging-and-bundling'],
  ['/wiki/pricing/intl-channels-billing', '/wiki/pricing/governance-and-process'],
]);

const EXPLICIT_410 = new Set([
  '/downloads/metrics-storytelling-one-pager',
  '/wiki/pricing/pitfalls-and-failures/minivation',
]);

const CATEGORY_410_PREFIXES = [
  '/wiki/pricing/behavioral-psychology',
  '/wiki/pricing/comms-and-deals/',
  '/wiki/pricing/competitive-and-positioning/',
  '/wiki/pricing/economics-and-metrics/',
  '/wiki/pricing/governance-and-process/',
  '/wiki/pricing/pitfalls-and-failures/',
  '/wiki/pricing/research-and-experiments/',
];

function parseCsvUrls(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line) => line.split(',')[0].trim()).filter(Boolean);
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '').toLowerCase();
}

function csvEscape(value) {
  const v = String(value ?? '');
  if (v.includes('"') || v.includes(',') || v.includes('\n')) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function listInternalLinkedPaths() {
  const allowedExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx']);
  const ignored = new Set(['node_modules', '.next', 'out', '.git', 'reports']);
  const seen = new Set();
  const rootDirs = ['app', 'components', 'content', 'lib'];
  const re = /(?:href\s*=\s*["'](\/[^"']+)["']|\[[^\]]*\]\((\/[^)\s]+)\))/g;

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) {
          walk(path.join(dir, entry.name));
        }
        continue;
      }
      const ext = path.extname(entry.name);
      if (!allowedExt.has(ext)) continue;
      const full = path.join(dir, entry.name);
      const text = fs.readFileSync(full, 'utf8');
      let m;
      while ((m = re.exec(text)) !== null) {
        const raw = m[1] || m[2];
        if (!raw) continue;
        const pathOnly = normalizePath(raw.split('?')[0].split('#')[0]);
        if (pathOnly.startsWith('/')) {
          seen.add(pathOnly);
        }
      }
    }
  }

  for (const rd of rootDirs) {
    walk(path.join(ROOT, rd));
  }
  return seen;
}

function getPublishedConceptSet() {
  const set = new Set();
  const base = path.join(ROOT, 'content', 'wiki', 'concepts');
  if (!fs.existsSync(base)) return set;
  for (const cat of fs.readdirSync(base, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    const catSlug = cat.name;
    const catDir = path.join(base, catSlug);
    for (const file of fs.readdirSync(catDir)) {
      if (!file.endsWith('.md')) continue;
      const concept = file.replace(/\.md$/, '');
      set.add(`/wiki/pricing/${catSlug}/${concept}`);
    }
  }
  return set;
}

function getCategorySet() {
  const set = new Set(['/wiki/pricing']);
  const categoriesDir = path.join(ROOT, 'content', 'wiki', 'categories');
  for (const file of fs.readdirSync(categoriesDir)) {
    if (!file.endsWith('.md')) continue;
    const full = path.join(categoriesDir, file);
    const fm = matter(fs.readFileSync(full, 'utf8')).data || {};
    const slug = fm.slug || file.replace(/\.md$/, '');
    set.add(`/wiki/pricing/${slug}`);
  }
  return set;
}

function getStaticRoutes() {
  return new Set([
    '/',
    '/about',
    '/book',
    '/booked',
    '/cheat-sheets',
    '/consulting',
    '/contact',
    '/downloads/monetization-roadmap',
    '/free-tools',
    '/newsletter',
    '/privacy',
    '/speaking',
    '/templates',
  ]);
}

function getNewsletterRoutes() {
  const set = new Set(['/newsletter']);
  const postsDir = path.join(ROOT, '_posts');
  if (!fs.existsSync(postsDir)) return set;
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.md$/, '');
    set.add(`/newsletter/${slug}`);
  }
  return set;
}

function buildLiveRouteSet() {
  return new Set([
    ...getStaticRoutes(),
    ...getNewsletterRoutes(),
    ...getCategorySet(),
    ...getPublishedConceptSet(),
    '/consulting/services/pricing-monetization-sprint',
    '/consulting/services/metrics-experimentation-sprint',
    '/consulting/services/on-call-economist-retainer',
  ]);
}

function classify404(rawUrl, liveRoutes, linkedInternally) {
  const url = new URL(rawUrl);
  const originalPath = url.pathname;
  const normalizedPath = normalizePath(originalPath);
  const hasQuery = !!url.search;
  const hasTrailingSlash = originalPath.length > 1 && originalPath.endsWith('/');

  let action = 'GONE_410';
  let targetPath = '';
  let expectedStatus = '410';
  let reason = 'Legacy URL intentionally removed without close replacement.';
  let canonicalTarget = `${BASE}${normalizedPath}`;
  let priority = 'medium';

  if (hasTrailingSlash) {
    action = 'REDIRECT_301';
    targetPath = normalizedPath;
    expectedStatus = '301';
    reason = 'Trailing slash duplicate should canonicalize to non-trailing URL.';
    canonicalTarget = `${BASE}${normalizedPath}`;
    priority = 'high';
  }

  if (hasQuery && normalizedPath === '/consulting' && url.searchParams.has('filter')) {
    action = 'REDIRECT_301';
    targetPath = '/consulting';
    expectedStatus = '301';
    reason = 'Deprecated filtered URL should canonicalize to main consulting page.';
    canonicalTarget = `${BASE}/consulting`;
    priority = 'high';
  }

  if (liveRoutes.has(normalizedPath)) {
    if (normalizedPath !== originalPath || hasQuery) {
      action = 'REDIRECT_301';
      targetPath = normalizedPath;
      expectedStatus = '301';
      reason = 'URL variant should normalize to canonical live route.';
    } else {
      action = 'RESTORE_200';
      targetPath = normalizedPath;
      expectedStatus = '200';
      reason = 'Page exists and should return canonical 200 status.';
    }
    canonicalTarget = `${BASE}${normalizedPath}`;
    priority = 'high';
  }

  if (EXPLICIT_301.has(normalizedPath)) {
    targetPath = EXPLICIT_301.get(normalizedPath);
    action = 'REDIRECT_301';
    expectedStatus = '301';
    reason = 'Legacy slug mapped to closest current canonical replacement.';
    canonicalTarget = `${BASE}${targetPath}`;
    priority = 'high';
  }

  if (normalizedPath.startsWith('/wiki/pricing/research-and-metrics/')) {
    targetPath = '/wiki/pricing/research-and-experiments';
    action = 'REDIRECT_301';
    expectedStatus = '301';
    reason = 'Legacy taxonomy renamed to research-and-experiments category.';
    canonicalTarget = `${BASE}${targetPath}`;
    priority = 'high';
  }

  for (const prefix of CATEGORY_410_PREFIXES) {
    if (normalizedPath.startsWith(prefix)) {
      action = 'GONE_410';
      targetPath = '';
      expectedStatus = '410';
      reason = 'Unpublished placeholder concept should return explicit 410.';
      canonicalTarget = '';
      priority = 'medium';
      break;
    }
  }

  if (EXPLICIT_410.has(normalizedPath)) {
    action = 'GONE_410';
    targetPath = '';
    expectedStatus = '410';
    reason = 'Intentionally retired URL with no relevant replacement.';
    canonicalTarget = '';
    priority = 'medium';
  }

  return {
    url: rawUrl,
    issue_type: 'gsc_404',
    action,
    target_url: targetPath ? `${BASE}${targetPath}` : '',
    expected_status: expectedStatus,
    reason,
    linked_internally_yes_no: linkedInternally.has(normalizedPath) ? 'yes' : 'no',
    in_sitemap_yes_no: 'no',
    canonical_target: canonicalTarget,
    priority,
  };
}

function classifyCrawledNotIndexed(rawUrl, liveRoutes, linkedInternally) {
  const url = new URL(rawUrl);
  const originalPath = url.pathname;
  const normalizedPath = normalizePath(originalPath);
  const isAsset = normalizedPath.startsWith('/_next/') || /\.(css|js|woff2|woff|png|jpe?g|webp|svg|gif|ico)$/.test(normalizedPath);
  const hasTrailingSlash = originalPath.length > 1 && originalPath.endsWith('/');
  const hasLive = liveRoutes.has(normalizedPath);

  let action = 'KEEP_INDEXABLE';
  let targetPath = normalizedPath;
  let expectedStatus = hasLive ? '200' : '301';
  let reason = 'Page is index-intended and should be strengthened, linked, and kept in sitemap.';
  let inSitemap = 'yes';
  let canonicalTarget = `${BASE}${normalizedPath}`;
  let priority = 'high';

  if (isAsset) {
    action = 'IGNORE';
    targetPath = '';
    expectedStatus = '200';
    reason = 'Static asset is not an indexable page and should be ignored for indexing decisions.';
    inSitemap = 'no';
    canonicalTarget = '';
    priority = 'low';
  } else if (EXPLICIT_301.has(normalizedPath)) {
    action = 'MERGE_301';
    targetPath = EXPLICIT_301.get(normalizedPath);
    expectedStatus = '301';
    reason = 'Obsolete URL should merge into closest live equivalent to consolidate signals.';
    inSitemap = 'no';
    canonicalTarget = `${BASE}${targetPath}`;
    priority = 'high';
  } else if (EXPLICIT_410.has(normalizedPath) || CATEGORY_410_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
    action = 'REMOVE_FROM_SITEMAP';
    targetPath = '';
    expectedStatus = '410';
    reason = 'URL is obsolete/unpublished and should not be indexed or listed in sitemap.';
    inSitemap = 'no';
    canonicalTarget = '';
    priority = 'medium';
  } else if (hasTrailingSlash) {
    action = 'MERGE_301';
    targetPath = normalizedPath;
    expectedStatus = '301';
    reason = 'Duplicate trailing-slash variant should merge into canonical non-trailing URL.';
    inSitemap = 'no';
    canonicalTarget = `${BASE}${normalizedPath}`;
    priority = 'high';
  } else if (!hasLive) {
    action = 'REMOVE_FROM_SITEMAP';
    targetPath = '';
    expectedStatus = '410';
    reason = 'URL is obsolete/unpublished and should not be indexed or listed in sitemap.';
    inSitemap = 'no';
    canonicalTarget = '';
    priority = 'medium';
  } else if (
    normalizedPath === '/wiki/pricing/comms-and-deals' ||
    normalizedPath === '/wiki/pricing/competitive-and-positioning' ||
    normalizedPath === '/wiki/pricing/governance-and-process' ||
    normalizedPath === '/wiki/pricing/economics-and-metrics' ||
    normalizedPath === '/wiki/pricing/research-and-experiments' ||
    normalizedPath === '/wiki/pricing/pitfalls-and-failures'
  ) {
    action = 'NOINDEX_TEMP';
    expectedStatus = '200';
    reason = 'Category is currently thin/placeholder and should be temporarily noindexed and excluded from sitemap.';
    inSitemap = 'no';
    priority = 'medium';
  } else {
    action = 'KEEP_INDEXABLE';
    expectedStatus = '200';
    inSitemap = 'yes';
  }

  return {
    url: rawUrl,
    issue_type: 'gsc_crawled_not_indexed',
    action,
    target_url: targetPath ? `${BASE}${targetPath}` : '',
    expected_status: expectedStatus,
    reason,
    linked_internally_yes_no: linkedInternally.has(normalizedPath) ? 'yes' : 'no',
    in_sitemap_yes_no: inSitemap,
    canonical_target: canonicalTarget,
    priority,
  };
}

function main() {
  const urls404 = parseCsvUrls(INPUT_404);
  const urlsCni = parseCsvUrls(INPUT_CNI);
  const liveRoutes = buildLiveRouteSet();
  const linkedInternally = listInternalLinkedPaths();

  const rows = [
    ...urls404.map((url) => classify404(url, liveRoutes, linkedInternally)),
    ...urlsCni.map((url) => classifyCrawledNotIndexed(url, liveRoutes, linkedInternally)),
  ];

  const header = [
    'url',
    'issue_type',
    'action',
    'target_url',
    'expected_status',
    'reason',
    'linked_internally_yes_no',
    'in_sitemap_yes_no',
    'canonical_target',
    'priority',
  ];

  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push(header.map((key) => csvEscape(row[key])).join(','));
  }

  fs.writeFileSync(OUTPUT, `${lines.join('\n')}\n`, 'utf8');
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)} (${rows.length} rows)`);
}

main();

