# SEO + AI Citation Readiness Audit

Date: 2026-02-18  
Scope audited: `app` routes, wiki templates/components, metadata generation, JSON-LD, internal linking, `robots`/sitemaps, canonicals, pagination, duplicate-content risk, performance pitfalls.

## Top 10 issues (prioritized by impact x effort)

| # | Issue | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Stale/conflicting sitemap files in `public` list non-existent URLs and legacy slugs | High | Low | Critical |
| 2 | `robots.txt` points to `sitemap_index.xml`, but sitemap delivery is inconsistent by deployment mode | High | Low | Critical |
| 3 | `app/sitemap.ts` only includes a small static subset of URLs (major crawl discovery gap) | High | Medium | High |
| 4 | Canonical URL normalization is inconsistent with sitemap URLs (slash/no-slash variants) | High | Medium | High |
| 5 | Wiki JSON-LD types are not always the best fit for encyclopedic concept pages | Medium | Medium | High |
| 6 | FAQ JSON-LD is partly synthetic/generic and may drift from visible page content | Medium | Low | High |
| 7 | Internal linking implementation is fragmented (`Link` vs plain `<a>` for internal paths) | Medium | Low | High |
| 8 | No pagination strategy for index-like routes (`newsletter`, future wiki growth) | Medium | Medium | Medium |
| 9 | Global image optimization is disabled (`images.unoptimized: true`) affecting LCP/SEO | Medium | Medium | Medium |
| 10 | Extra synchronous filesystem logging in content loaders adds runtime overhead risk | Medium | Low | Medium |

---

## Detailed findings with exact file locations and fixes

### 1) Stale/conflicting sitemaps in `public` (critical)

**Files**
- `public/sitemap.xml`
- `public/sitemap-0.xml`

**Why this matters**
- These files contain many outdated/removed URLs and legacy route names (for example old service routes and old wiki slug patterns).
- They also use trailing-slash URL variants that conflict with current canonical patterns.
- Search engines can crawl and index dead URLs, causing crawl-budget waste and duplicate-content signals.

**Recommended fix**
- Choose one authoritative sitemap system:
  - either App Router metadata sitemap (`app/sitemap.ts`) and remove static `public/sitemap*.xml`, or
  - fully generated static sitemap set, but keep it current and canonical-consistent.
- Remove obsolete URLs immediately.

---

### 2) `robots` sitemap target is deployment-fragile (critical)

**Files**
- `app/robots.ts`
- `scripts/generate-sitemap-index.js`
- `package.json` (`postbuild`)

**Why this matters**
- `robots` points to `https://sarahzou.com/sitemap_index.xml`.
- That file is generated postbuild in `out/`, while the repo simultaneously contains static public sitemaps and `app/sitemap.ts`.
- Depending on host/deploy path, bots may get a sitemap reference that is missing or inconsistent with served files.

**Recommended fix**
- Make `robots` reference the actually served canonical sitemap endpoint in all environments.
- If using App Router sitemap, point to `/sitemap.xml` and retire `sitemap_index.xml` flow.
- If using sitemap index, ensure index + child sitemaps are always present in production artifact and remove conflicting sources.

---

### 3) Crawl discovery gap in `app/sitemap.ts` (high)

**Files**
- `app/sitemap.ts`
- Dynamic routes:
  - `app/wiki/pricing/[category]/page.tsx`
  - `app/wiki/pricing/[category]/[concept]/page.tsx`
  - `app/newsletter/[slug]/page.tsx`

**Why this matters**
- The sitemap only returns a small set of core static URLs.
- It excludes most content-heavy pages (wiki concepts, categories, newsletter posts), which are high SEO and high citation value.

**Recommended fix**
- Generate sitemap entries dynamically from:
  - wiki category/concept content source (`content/wiki/**` via `lib/mdx.ts`)
  - newsletter posts (`_posts` via `lib/api.ts`)
- Include `lastModified` from frontmatter where available.

---

### 4) Canonical normalization mismatch (high)

**Files**
- Canonicals in metadata:
  - `app/layout.tsx` (site base)
  - `app/wiki/pricing/page.tsx`
  - `app/wiki/pricing/[category]/page.tsx`
  - `app/wiki/pricing/[category]/[concept]/page.tsx`
  - multiple route `metadata` blocks across `app/**/page.tsx`
- Conflicting URL forms in:
  - `public/sitemap.xml`
  - `public/sitemap-0.xml`

**Why this matters**
- Canonicals are mostly non-trailing slash, while sitemap URLs often include trailing slash.
- That creates duplicate URL candidates for the same content and weakens canonical signals.

**Recommended fix**
- Standardize one URL policy (prefer no trailing slash, aligned with `next.config.js`).
- Enforce it in:
  - metadata `alternates.canonical`
  - sitemap generation
  - internal absolute links in structured data

---

### 5) Wiki structured data types can be improved for entity clarity (high)

**Files**
- `app/wiki/pricing/page.tsx`
- `app/wiki/pricing/[category]/page.tsx`
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `lib/generateJsonLd.ts`

**Why this matters**
- Wiki hub/category/concept pages are mostly modeled as `Article` + `FAQPage`.
- For glossary/encyclopedia intent, richer schema fit would improve machine understanding:
  - hub/category: `CollectionPage` or `DefinedTermSet`
  - concept: `DefinedTerm`/`TechArticle` (depending on content style)
- Better type specificity improves AI citation extraction quality.

**Recommended fix**
- Add wiki-specific JSON-LD generators (not just generic `Article`).
- Keep `BreadcrumbList`; use `FAQPage` only when FAQ truly exists in visible content.

---

### 6) FAQ JSON-LD partly synthetic and potentially non-parallel to on-page content (high)

**Files**
- `app/wiki/pricing/[category]/page.tsx`
- `app/wiki/pricing/[category]/[concept]/page.tsx`

**Why this matters**
- Category/concept FAQ schema can be auto-generated fallback text even when page content is thin or placeholder.
- Search engines and AI systems expect schema to mirror visible content; drift reduces trust.

**Recommended fix**
- Emit FAQ schema only for rendered FAQ blocks.
- For placeholder pages, avoid FAQ schema unless exact Q/A is visibly present.

---

### 7) Internal linking is inconsistent (`Link` vs plain `<a>`) (high)

**Files**
- Many internal anchors as plain `<a>` in:
  - `app/page.tsx`
  - `app/consulting/page.tsx`
  - `app/wiki/pricing/[category]/page.tsx`
  - service pages under `app/consulting/services/**/page.tsx`
- Markdown link handling:
  - `app/wiki/pricing/[category]/[concept]/page.tsx` (`markdownComponents.a`)

**Why this matters**
- Mixed approach creates inconsistent prefetch/navigation and link hygiene.
- Markdown handler only upgrades `/wiki/pricing/` links to `Link`; other internal paths remain plain anchors.

**Recommended fix**
- Centralize link component logic:
  - If `href` is internal (`/`), render `Link`.
  - If external, render `<a target="_blank" rel="noopener noreferrer">`.
- Reuse same helper in markdown renderers and JSX content blocks.

---

### 8) Pagination strategy missing for index growth (medium)

**Files**
- `app/newsletter/page.tsx`
- `lib/api.ts`
- (future impact) `app/wiki/pricing/[category]/page.tsx` if concept lists expand further

**Why this matters**
- Newsletter index currently renders all posts in one page.
- As content grows, this harms crawl efficiency, page weight, and user performance.
- No rel-next/prev metadata strategy exists.

**Recommended fix**
- Add paginated route design (`/newsletter/page/[n]` or query param with canonical rules).
- Emit canonical/prev/next metadata per page.
- Keep page 1 canonicalized cleanly to `/newsletter`.

---

### 9) Image optimization disabled globally (medium)

**Files**
- `next.config.js` (`images.unoptimized: true`)

**Why this matters**
- Disables Next image optimization pipeline, likely increasing payload and slowing LCP on image-heavy pages.
- LCP and CWV directly affect SEO outcomes.

**Recommended fix**
- Enable optimization where deployment supports it.
- If static export constraints remain, pre-generate multiple responsive image sizes and ensure proper `sizes` usage.

---

### 10) Synchronous debug logging in content loader (medium)

**Files**
- `lib/mdx.ts` (`getConceptBySlug` appends to `.cursor/debug.log` on every read)

**Why this matters**
- Sync fs writes (`appendFileSync`) in content paths add unnecessary overhead and noise.
- Risks increased TTFB and build/runtime cost on content-heavy routes.

**Recommended fix**
- Remove debug logging from production code path.
- Gate diagnostics behind explicit development-only flag and non-blocking logging.

---

## Quick wins vs bigger refactors

### Quick wins (high ROI, low effort)
- Remove/replace stale `public/sitemap.xml` and `public/sitemap-0.xml`.
- Align `app/robots.ts` sitemap target with actual served sitemap endpoint.
- Enforce one canonical slash policy across sitemap + metadata.
- Restrict FAQ JSON-LD emission to visible FAQ sections only.
- Replace obvious internal `<a href="/...">` with `Link` in key templates.
- Remove sync debug fs logging from `lib/mdx.ts`.

### Bigger refactors (higher effort, durable gains)
- Build one canonical sitemap pipeline that includes all dynamic wiki/newsletter URLs and reliable `lastModified`.
- Introduce wiki-specific schema model (`CollectionPage`/`DefinedTermSet`/`DefinedTerm` or `TechArticle`) with consistent entity graph.
- Add newsletter pagination + canonical/prev-next metadata.
- Consolidate structured-data generation into reusable typed builders to avoid schema drift.

---

## Definition of Done checklist (wiki template)

Use this checklist for `app/wiki/pricing/[category]/[concept]/page.tsx` and related wiki templates.

- [ ] Canonical URL is absolute, stable, and matches sitemap URL format exactly.
- [ ] Page emits one primary JSON-LD type appropriate to wiki intent (not generic-only `Article` by default).
- [ ] `BreadcrumbList` JSON-LD exists and matches visible breadcrumb path.
- [ ] FAQ JSON-LD is emitted only when visible FAQ content exists on page.
- [ ] Metadata includes title, description, open graph, twitter, robots.
- [ ] `lastUpdated` is surfaced both visibly and in schema (`dateModified`) from frontmatter.
- [ ] Internal links in markdown and JSX use unified internal-link logic (`Link` for internal paths).
- [ ] Outbound links include safe rel attributes (`noopener noreferrer`) where needed.
- [ ] Citation UX is present and accurate (canonical URL, suggested citation, BibTeX, updated date).
- [ ] Page is discoverable via canonical sitemap and sitemap entry has `lastModified`.
- [ ] No placeholder/thin-content pages are accidentally indexable without value (or they are clearly noindexed).
- [ ] No debug-only filesystem operations exist in request/build content path.

---

## Notes on AI citation readiness

Strengths already present:
- `public/llms.txt` exists and points to citation-ready wiki URLs.
- Concept pages include citation UI (`components/wiki/CiteThisPage.tsx`) with canonical URL and BibTeX.
- License/attribution guidance is visible (`components/wiki/WikiLicenseFooter.tsx`).

Main gap:
- Technical consistency (sitemap/canonical/schema alignment) is currently the biggest blocker to reliable machine citation at scale.
