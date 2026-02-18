# Wiki Concept Template Improvement Audit

Date: 2026-02-18  
Scope audited: concept page template, wiki shared components, markdown/content loading, metadata and JSON-LD pipeline.

This is an audit + implementation plan only.  
No route or template code was changed in this phase.

## Files reviewed (exact paths)

- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `components/wiki/TableOfContents.tsx`
- `components/wiki/WikiLayout.tsx`
- `components/wiki/CiteThisPage.tsx`
- `components/wiki/WikiLicenseFooter.tsx`
- `lib/mdx.ts`
- `lib/generateJsonLd.ts`
- `app/wiki/pricing/[category]/page.tsx` (for consistency checks)
- `app/globals.css`
- Sample concept content:
  - `content/wiki/concepts/models-and-metering/pricing-metric-value-metric.md`
  - `content/wiki/concepts/models-and-metering/usage-based-pricing.md`

---

## Current state summary

### What already works well

- Concept pages already have `generateMetadata` with canonical, description, OG, and Twitter basics.
- JSON-LD is present and generally strong:
  - `TechArticle` (`generateTechArticleJsonLd`)
  - `BreadcrumbList` (`generateBreadcrumbJsonLd`)
  - FAQ JSON-LD only when visible FAQ content exists.
- H1 + summary line exist (`title` + `oneLiner` fallback).
- Last updated is already displayed (when `lastUpdated` exists).
- Citation support exists via `components/wiki/CiteThisPage.tsx`.
- Desktop TOC exists with active-section tracking and sticky behavior.

### Main template gaps against your goal

- Above-the-fold is not consistently structured as a compact "Snapshot + key takeaways + subtle CTA" block.
- TOC is desktop-only (`hidden xl:block`) with no mobile collapsible version.
- Heading ID generation is duplicated and not collision-safe, so anchor stability can drift.
- Reading width is too wide for long-form on large screens (`prose ... max-w-none`).
- Markdown styling is rich for tables/callouts, but code blocks (`pre`/`code`) are not custom-styled.
- References and related concepts are not template-driven for full-content pages:
  - References: no frontmatter schema support yet.
  - Related concepts: currently shown mainly in "content coming soon" fallback.

---

## Prioritized checklist (impact x effort)

| # | Improvement | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | Standardize stable heading IDs + anchor links across TOC and markdown render | High | Low | Critical |
| 2 | Add mobile collapsible TOC, keep desktop sticky TOC | High | Medium | High |
| 3 | Improve readable content measure (70-80ch) and section spacing consistency | High | Low | High |
| 4 | Add reusable top "Snapshot" block fallback (1-2 sentence summary + takeaways + CTA strip) | High | Medium | High |
| 5 | Add frontmatter-driven `references` section (numbered list, optional) | Medium | Low | High |
| 6 | Add related concepts block (max 5) for full-content pages | Medium | Medium | Medium |
| 7 | Refine JSON-LD dates (`datePublished` vs `dateModified`) with graceful fallback | Medium | Low | Medium |
| 8 | Add minimal markdown code block styling (`pre`/`code`) | Medium | Low | Medium |
| 9 | Reduce template complexity by centralizing heading slug logic | Medium | Medium | Medium |
| 10 | CTA alignment: subtle primary CTA + secondary newsletter link in above-the-fold region | Medium | Low | Medium |

---

## Detailed findings and recommended minimal diffs

### 1) Anchor/heading stability (Critical)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `components/wiki/TableOfContents.tsx`

**Current**
- TOC IDs are created by `extractHeadings()` slug logic.
- Rendered heading IDs are independently generated inside markdown `h2`/`h3` components.
- Neither path handles duplicate headings robustly (same text -> same ID).
- `String(props.children)` is brittle for headings containing inline markdown nodes.

**Risk**
- Broken or unstable deep links, TOC mismatch, weaker AI/snippet referencing.

**Recommended change (minimal)**
- Introduce a single shared slug utility (same file or small helper) and dedupe suffixing (`-2`, `-3`).
- Use identical ID generation in both `extractHeadings()` and markdown heading renderers.
- Add visible anchor affordance on headings (lightweight hash icon on hover/focus).

**Before -> After behavior**
- Before: some anchors may collide/drift.
- After: stable deterministic IDs and TOC links for every heading.

---

### 2) Mobile TOC support (High)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `components/wiki/TableOfContents.tsx`

**Current**
- TOC sidebar is desktop-only (`hidden xl:block`).
- No equivalent mobile "On this page" navigation.

**Risk**
- Poor mobile scannability for long concept pages.

**Recommended change (minimal)**
- Reuse existing `TableOfContents` UI in a collapsible mobile card (`details/summary` or small client toggle).
- Place it below H1/snapshot so users can quickly jump sections.
- Keep existing desktop sticky behavior unchanged.

**Before -> After behavior**
- Before: mobile users scroll long pages without section jumps.
- After: mobile users can expand/collapse TOC and jump to anchored sections.

---

### 3) Readability/layout measure and rhythm (High)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `app/globals.css` (if needed for one reusable utility class)

**Current**
- Main article content uses `max-w-none` and can become too wide on desktop.
- Section spacing is mostly good but mixed due to bespoke blocks.

**Risk**
- Lower reading comfort, reduced completion/scanning rates.

**Recommended change (minimal)**
- Constrain article text container to ~70-80ch (`max-w-[78ch]`) while allowing selected rich blocks (tables) to overflow in their wrappers.
- Normalize vertical rhythm around section wrappers and heading scroll offsets.

**Before -> After behavior**
- Before: long line lengths on wide screens.
- After: easier long-form reading with consistent spacing.

---

### 4) Above-the-fold template consistency (High)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `lib/mdx.ts` (frontmatter typing additions only)

**Current**
- H1 + description are present.
- Snapshot and key takeaways depend on markdown section parsing and may not be consistently top-structured.
- CTA is mostly bottom-heavy (plus mobile sticky bar with `/book` + `/contact`).

**Risk**
- Inconsistent first-screen comprehension and weaker immediate intent cues.

**Recommended change (minimal)**
- Add a reusable top card section that renders:
  - H1
  - 1-2 sentence snapshot (from `oneLiner`, then first paragraph fallback)
  - key takeaways (from frontmatter if added, else parsed snapshot bullets if present)
  - subtle CTA row: primary `/book`, secondary `/newsletter` (existing route)
- Keep existing bottom CTA; do not remove proven conversion block.

**Before -> After behavior**
- Before: top section varies by content structure.
- After: predictable "learn + act" first fold on every concept page.

---

### 5) References / Further reading (High)

**Files**
- `lib/mdx.ts`
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- Optional examples in concept frontmatter files under `content/wiki/concepts/**`

**Current**
- No frontmatter schema for explicit references list.
- Some sources are embedded in "Key Facts" lines only.

**Risk**
- AI citation and trust signals are less explicit.

**Recommended change (minimal)**
- Extend `ConceptFrontmatter` with optional `references`:
  - `references?: Array<{ title: string; url: string; source?: string }>`
- If present, render numbered "References / Further reading" section.
- If absent, omit gracefully.

**Before -> After behavior**
- Before: citations are mixed inside narrative sections.
- After: clear dedicated source list when provided.

---

### 6) Related concepts (Medium)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `lib/mdx.ts` (optional typing for future explicit related list)

**Current**
- Related concepts are shown primarily in no-content fallback.
- Full-content pages do not consistently expose related links.

**Risk**
- Weaker internal-link graph and lower topical exploration.

**Recommended change (minimal)**
- Always render a compact "Related concepts" block near article end (or right rail), max 5 links.
- Default source: same category concepts excluding current page.
- If future `related` frontmatter exists, prefer that list.

**Before -> After behavior**
- Before: related links inconsistent.
- After: predictable 5-link contextual navigation.

---

### 7) SEO metadata + schema precision (Medium)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `lib/generateJsonLd.ts`

**Current**
- Canonical + OG + Twitter are present and generally correct.
- JSON-LD `TechArticle` uses `datePublished` from `lastUpdated` fallback, which is semantically imperfect.

**Risk**
- Mild schema-quality drift for publication signals.

**Recommended change (minimal)**
- Keep `TechArticle` + `BreadcrumbList`.
- Prefer:
  - `datePublished`: explicit frontmatter value if available (new optional field), otherwise omit.
  - `dateModified`: `lastUpdated` if available.
- Continue graceful omission when unknown.

**Before -> After behavior**
- Before: published date may mirror modified date by fallback.
- After: cleaner schema semantics.

---

### 8) Markdown rendering polish (Medium)

**Files**
- `app/wiki/pricing/[category]/[concept]/page.tsx`

**Current**
- Tables, blockquotes, images, math are handled.
- No dedicated `pre`/`code` rendering styles for readability and overflow on mobile.

**Risk**
- Dense technical snippets are harder to scan.

**Recommended change (minimal)**
- Add lightweight `pre` and inline `code` styles in markdown component map.
- Keep no heavy syntax highlighting package to protect bundle size.

**Before -> After behavior**
- Before: default code styles.
- After: clearer code readability with minimal CSS.

---

## Decisions (and why)

1. **Do not change routes or URL shapes**  
   Preserves canonical stability and avoids SEO/indexing churn.

2. **Prefer server-rendered template changes**  
   Keeps JS footprint small; only TOC needs client behavior.

3. **Reuse current design tokens/components**  
   Preserves visual identity and minimizes diff surface.

4. **Make references/related optional frontmatter-driven**  
   Avoids mass content rewrites and allows gradual rollout.

5. **Keep existing JSON-LD model, refine fields**  
   Current structure is already strong; small semantic upgrades give best ROI.

---

## Proposed implementation files (next step)

Primary:
- `app/wiki/pricing/[category]/[concept]/page.tsx`
- `components/wiki/TableOfContents.tsx`
- `lib/mdx.ts`

Optional/minor:
- `lib/generateJsonLd.ts` (if adding a helper for optional publish date handling)
- `app/globals.css` (only if one utility class is needed)
- selective concept files in `content/wiki/concepts/**` only when adding `references` frontmatter examples

---

## Acceptance checklist mapping

- [ ] Concept page has consistent top section: H1, short snapshot, key takeaways (when available), subtle CTA row.
- [ ] Reading width and spacing improved on desktop and mobile.
- [ ] TOC works on desktop and mobile (collapsible on mobile).
- [ ] Heading anchors are stable and deterministic.
- [ ] Canonical + metadata remain correct.
- [ ] JSON-LD includes `BreadcrumbList` + `TechArticle`/`Article` with clean date semantics.
- [ ] Optional references section renders from frontmatter, omitted gracefully otherwise.
- [ ] Related concepts (max 5) render without route changes.
- [ ] No duplicate content is introduced.
- [ ] `npm run build` and `npm run lint` pass after implementation phase.

