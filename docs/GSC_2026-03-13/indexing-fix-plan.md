# GSC Indexing Fix Plan (2026-03-13)

## What Was Broken

- Google Search Console reported elevated legacy URL debt:
  - `173` URLs under **Not found (404)**.
  - `41` URLs under **Crawled - currently not indexed**.
- Root causes were concentrated in:
  - historical wiki slug migrations (`research-and-metrics`, old concept IDs, deprecated category branches),
  - retired consulting service slugs,
  - retired `/downloads/*` URLs,
  - trailing-slash and query-parameter variants (`/path/`, `/consulting?filter=*`),
  - thin placeholder wiki category hubs and unpublished concept URLs.
- Canonical/indexing risk:
  - mixed canonical discovery for slash/no-slash variants,
  - placeholder category URLs discoverable even when not ready to rank.

## What I Changed

### 1) Full URL-by-URL remediation map

- Generated `docs/GSC_2026-03-13/url-remediation-map.csv` with all URLs from both GSC exports and one deterministic action per URL.
- Actions include:
  - `RESTORE_200` for URLs that should exist as canonical pages,
  - `REDIRECT_301` / `MERGE_301` for moved/merged legacy URLs,
  - `GONE_410` / `REMOVE_FROM_SITEMAP` for intentionally retired URLs,
  - `KEEP_INDEXABLE`, `NOINDEX_TEMP`, and `IGNORE` for crawled-not-indexed cases.

### 2) Canonical and indexability tightening for thin category hubs

- Updated category metadata logic in `app/wiki/pricing/[category]/page.tsx`:
  - if a category has no published concept content, it is now `noindex,follow` (temporary suppression of thin placeholders).
  - categories with published concepts remain `index,follow`.
- Added reusable helpers in `lib/mdx.ts`:
  - `getPublishedConceptIdsForCategory()`
  - `hasPublishedConceptContent()`

### 3) Sitemap cleanup (indexable canonical URLs only)

- Updated `app/sitemap-wiki.ts` to include only category hubs that have published concept content.
- Updated `scripts/generate-sitemap-index.js` to apply the same category filtering when generating `out/sitemap-wiki.xml`.
- This removes thin placeholder category hubs from wiki sitemap output while retaining live concept pages and core pages.

### 4) Edge remediation layer (Cloudflare Worker)

- Added `cloudflare/seo-remediation-worker.js` implementing deterministic behavior:
  - enforce canonical host/protocol/path style:
    - `https://sarahzou.com`
    - lowercase path
    - no trailing slash except `/`
  - one-hop 301s for known legacy service/download/wiki renames,
  - explicit 410 for intentionally retired/unpublished legacy endpoints,
  - query normalization for deprecated filtered consulting URLs.

### 5) Verification tooling

- Added `scripts/verify-seo.sh` to test:
  - sampled legacy URLs return intended `301`/`410`,
  - sampled canonical pages return `200` and self-canonical tags,
  - sampled redirects do not chain,
  - sitemap files do not include known bad URL patterns or non-indexable classes.

## Remaining Manual Decisions

- **Edge deployment**: deploy `cloudflare/seo-remediation-worker.js` in the production Cloudflare Worker route for `sarahzou.com/*`.
- **Deprecated downloads**:
  - `/downloads/metrics-storytelling-one-pager` is intentionally retired with no replacement; it **remains 410**.
- **Thin category strategy**:
  - currently configured as temporary `noindex` + sitemap exclusion for categories with no published concept pages.
  - when each category receives substantive content, flip back to indexable by publishing concept files.
- **Content enhancement queue (KEEP_INDEXABLE pages)**:
  - apply editorial improvements to top pages in crawled-not-indexed list (opening 150 words, stronger differentiation, extra practical examples/FAQ sections, and tighter hub linking).

## Safe To Validate In GSC Now

Validate now after Cloudflare Worker rollout and next deploy:

- legacy consulting slugs mapped to current service URLs (301),
- legacy wiki renamed slugs with direct one-hop 301s,
- URLs intentionally retired and now explicit 410,
- trailing-slash/query variants normalized to canonical non-slash URLs,
- sitemap cleanliness and canonical consistency changes.

## Should Wait Before “Request Indexing”

Wait until additional editorial work is complete for:

- thin/placeholder category hubs currently set to `NOINDEX_TEMP`,
- any page still flagged as KEEP_INDEXABLE but with weak uniqueness/opening intent match,
- any page where internal-link support from hub/category pages is still sparse.

