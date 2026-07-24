/**
 * Cloudflare Worker: deterministic SEO URL remediation for sarahzou.com
 *
 * Goals:
 * - Canonical normalization (https, host, lowercase, no trailing slash except root)
 * - One-hop 301 redirects for known legacy URLs
 * - Explicit 410 responses for intentionally removed legacy URLs
 */
import {
  WIKI_EXACT_301,
  WIKI_EXACT_410,
  WIKI_410_PREFIXES,
} from './wiki-url-remediation-map.js';

const CANONICAL_HOST = 'sarahzou.com';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const EXACT_301 = new Map([
  // Retired entry-offer routes — now redirected to the consulting offer ladder.
  ['/consulting/entry-offer', '/consulting'],
  ['/consulting/entry-offer/form', '/consulting'],
  ['/entry-offer', '/diagnostic-note'],
  ['/entry-offer/form', '/diagnostic-note'],
  ['/thanks/entry-offer', '/diagnostic-note'],
  ['/thanks/pricing-strategy-session', '/diagnostic-note'],

  // Legacy consulting services consolidated into current offerings.
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

  // Downloads.
  ['/downloads/monetization-roadmap', '/downloads/monetization-roadmap'],

  // Canonical wiki concept renames.
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
]);

// Intentionally removed URLs with no replacement — return 410.
const EXACT_410 = new Set([
  '/newsletter/saas-benchmark-data-sources-guide',
  '/downloads/stage-smart-metrics-benchmarks-2025-q2',
  '/downloads/saas-benchmark-source-navigator',
  '/downloads/metrics-storytelling-one-pager', // retired download; remains 410
  '/wiki/pricing/pitfalls-and-failures/minivation',
]);

const CATEGORY_301 = new Map([
  ['/wiki/pricing/research-and-metrics', '/wiki/pricing/research-and-experiments'],
  ['/wiki/pricing/price-architecture', '/wiki/pricing/packaging-and-bundling'],
  ['/wiki/pricing/intl-channels-billing', '/wiki/pricing/governance-and-process'],
]);

const CATEGORY_410_PREFIXES = ['/wiki/pricing/behavioral-psychology', ...WIKI_410_PREFIXES];

function matches410Prefix(pathname, prefix) {
  if (pathname.startsWith(prefix)) {
    return true;
  }
  // Prefixes use trailing slashes; also match the category hub itself.
  if (prefix.endsWith('/') && pathname === prefix.slice(0, -1)) {
    return true;
  }
  return false;
}

function goneResponse(pathname) {
  return new Response(
    `410 Gone: ${pathname} has been intentionally removed with no close replacement.`,
    {
      status: 410,
      headers: {
        'content-type': 'text/plain; charset=UTF-8',
        'cache-control': 'public, max-age=3600',
      },
    }
  );
}

function redirect(toPath, search = '', hash = '') {
  const target = `${CANONICAL_ORIGIN}${toPath}${search}${hash}`;
  return Response.redirect(target, 301);
}

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }
  return pathname.replace(/\/+$/, '');
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // SEO assets must pass through unchanged (avoid redirect/canonical side effects).
    if (/^\/(robots\.txt|sitemap.*\.xml|llms(-full)?\.txt)$/i.test(url.pathname)) {
      return fetch(request);
    }

    const originalPath = url.pathname;
    const lowerPath = originalPath.toLowerCase();
    const normalizedPath = normalizePathname(lowerPath);

    // Canonical protocol/host/path normalization.
    if (
      url.protocol !== 'https:' ||
      url.hostname !== CANONICAL_HOST ||
      originalPath !== lowerPath ||
      originalPath !== normalizedPath
    ) {
      return redirect(normalizedPath, url.search, url.hash);
    }

    // Strip deprecated query filtering endpoints to canonical route.
    if (normalizedPath === '/consulting' && url.searchParams.has('filter')) {
      return redirect('/consulting');
    }

    // Exact 301 rules.
    const mapped301 = WIKI_EXACT_301.get(normalizedPath) || EXACT_301.get(normalizedPath);
    if (mapped301 && mapped301 !== normalizedPath) {
      return redirect(mapped301);
    }

    // Exact 410 rules.
    if (WIKI_EXACT_410.has(normalizedPath) || EXACT_410.has(normalizedPath)) {
      return goneResponse(normalizedPath);
    }

    // Category-level rename redirects.
    const category301 = CATEGORY_301.get(normalizedPath);
    if (category301) {
      return redirect(category301);
    }

    // research-and-metrics concepts now consolidate to category hub.
    if (normalizedPath.startsWith('/wiki/pricing/research-and-metrics/')) {
      return redirect('/wiki/pricing/research-and-experiments');
    }

    // Placeholder concept URLs should be explicit 410s, not soft-404s.
    for (const prefix of CATEGORY_410_PREFIXES) {
      if (matches410Prefix(normalizedPath, prefix)) {
        return goneResponse(normalizedPath);
      }
    }

    return fetch(request);
  },
};
