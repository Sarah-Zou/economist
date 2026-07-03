# SEO / GEO Review — sarahzou.com

Date: July 2, 2026. Reviewed: live site (homepage, wiki page, robots.txt, sitemaps, llms.txt), source code (`app/`, `lib/`, `next.config.js`, build scripts), and deployed output (`out/`).

## What's already strong

The fundamentals are in better shape than most consultant sites: full metadata coverage (title/description/canonical/OG on all ~26 routes), a rich JSON-LD entity graph (Person, Organization, ProfessionalService, WebSite, TechArticle, FAQPage, BreadcrumbList), `llms.txt` + `llms-full.txt`, citation widgets with BibTeX and CC-BY licensing on wiki pages, sensible noindex on thank-you/form pages, a clean 57-URL sitemap, well-handled fonts and lazy-loaded analytics, and hand-optimized WebP images. The wiki page structure (TL;DR snapshot, question-form H2s, Key Facts with cited sources, FAQ) is exactly what GEO best practice calls for.

The issues below are ordered by impact.

---

## 1. CRITICAL — Your robots.txt blocks the AI crawlers your GEO strategy depends on

Your live robots.txt contains a **Cloudflare-managed block** that disallows `GPTBot`, `ClaudeBot`, `CCBot` (Common Crawl), `Google-Extended` (Gemini), `Amazonbot`, `Applebot-Extended`, `Bytespider`, and `meta-externalagent` from the entire site, plus a `Content-Signal: ai-train=no` directive. Your source (`app/robots.ts`) doesn't do this — Cloudflare injects it.

This directly contradicts everything the site is built to do. You publish llms.txt, citation widgets, BibTeX, and CC-BY licensing to *attract* AI citation — while telling every major AI crawler to stay out. Because a bot-specific robots group overrides the `*` group, these bots can't fetch anything, including llms.txt. Consequences: excluded from Common Crawl (the base corpus for most LLM training), from Gemini grounding, and from GPT/Claude training data. Your content cannot become part of what AI models "know" about pricing.

**Fix (Cloudflare dashboard):**
1. Go to **AI Crawl Control** (formerly AI Audit) → review crawler settings, and **Security → Settings → filter "Bot traffic"** → turn OFF "block AI training in robots.txt" (managed robots.txt).
2. Cloudflare now classifies AI traffic as Search / Agent / Crawler (training) — set at minimum **Search = allow** and **Agent = allow**; decide consciously on Training. Note Cloudflare began blocking Training/Agent *by default* for some zones in 2025–2026, which is likely how this happened without you choosing it.
3. Also check no WAF/Bot Fight Mode rule returns 403s to these bots — the managed robots.txt is often paired with active blocking, which would also break retrieval-time fetches (ChatGPT browsing, Perplexity, Claude web search) that the robots.txt alone doesn't block.
4. After changing, verify: `https://sarahzou.com/robots.txt` should no longer contain the "Cloudflare Managed content" block.

If you deliberately want to opt out of *training* while staying citable, keep `ai-train=no` but ensure Search/Agent bots and `OAI-SearchBot`, `PerplexityBot`, `Claude-User` are allowed. But understand the tradeoff: blocking training bots means models never internalize your definitions; you'd rely purely on retrieval-time citation.

## 2. HIGH — www.sarahzou.com doesn't respond

`https://www.sarahzou.com/` timed out repeatedly (no response at all — not a redirect). Likely there's no `www` DNS record. Anyone typing or linking the www form gets a dead site, and any existing www backlinks pass nothing.

**Fix:** In Cloudflare DNS, add a proxied record for `www` (CNAME → `sarahzou.com`), then a Redirect Rule: `www.sarahzou.com/*` → 301 → `https://sarahzou.com/$1`.

## 3. HIGH — Sitemap lastmod is the build timestamp for most URLs

`lib/sitemap-urls.ts` assigns `new Date().toISOString()` to core pages (and as fallback elsewhere), so every deploy stamps every URL as "just modified" (all 57 URLs currently show the identical timestamp `2026-06-23T19:43:23Z`). Google detects always-changing lastmod and learns to ignore it — losing you a real recrawl signal for pages that *did* change. It also contradicts the visible "Last Updated: November 25, 2025" on wiki pages.

**Fix:** Use real content dates everywhere — you already have `conceptData.lastUpdated` and `post.date`; extend that to core pages (hardcode a date, or derive from git file mtime at build). Never fall back to `currentDate`.

## 4. MEDIUM — Title inconsistencies

- Wiki pages: `<title>` ("Value-Based Pricing: Definition, Framework, Steps") differs from `og:title` ("Value-Based Pricing | Core Philosophies & Strategy"). Unify — the Definition/Framework/Steps pattern is the better one for search and AI retrieval.
- Homepage title is ~94 characters; SERPs truncate around 60. Consider front-loading: "Pricing Strategy for AI Infrastructure & Data Platforms | Sarah Zou, PhD" or shorter.

## 5. MEDIUM — Trailing-slash normalization relies on client-side JS

`app/layout.tsx` ships a `beforeInteractive` script that JS-redirects `/about/` → `/about`. Crawlers see HTTP 200 on both variants (JS redirects are weaker signals than 301s and both URLs resolve). Since Cloudflare fronts the site, do this server-side instead: one Redirect Rule (regex: strip trailing slash, 301) — then delete the inline script. You already run a Cloudflare worker for SEO remediation (`cloudflare/seo-remediation-worker.js`); this could fold into it.

## 6. MEDIUM — Entity/GEO strengthening (small effort, compounding payoff)

- `Person.sameAs` lists only LinkedIn. Add your Substack (`sarahzou.substack.com`), and any ORCID / Google Scholar / Crunchbase / X profiles. Cross-platform entity corroboration is a major factor in whether AI engines treat "Sarah Zou" as an authoritative entity on pricing.
- `llms.txt` lists 10 cornerstone wiki pages of 37 total; the rest are only in `llms-full.txt`. Fine, but keep the cornerstone list current as you add pages.
- Wiki "Last Updated" dates showing 2025 while it's mid-2026 will start to look stale to freshness-weighting AI retrieval. When you materially touch a page, bump the date.

## 7. LOW — Performance

The site is fast by construction (static export, preloaded hero with `priority`, `lazyOnload` analytics, `display: swap` fonts, largest image 236KB). Remaining nits:

- The Substack `<iframe>` on the homepage has no `loading="lazy"` — add it (it's below the fold; the third-party frame currently loads eagerly).
- `images.unoptimized: true` is forced by static export; images are hand-optimized so impact is low. If you want responsive sizes without leaving GitHub Pages, enable Cloudflare Polish (or move image serving behind Cloudflare Images).
- Shared JS is ~820KB uncompressed (normal for Next.js; ~250KB over the wire). Not worth attacking now.
- Your `reports/lh-*.json` Lighthouse runs only captured accessibility (99). Re-run full Lighthouse (perf + SEO categories) against the live site for a real baseline: `npx lighthouse https://sarahzou.com --preset=desktop`.

## 8. LOW — Housekeeping

- Three newsletter pagination route dirs exist (`app/newsletter/p/[page]`, `p/[pageNumber]`, `page/[page]`); only `page/[page]` ships. Delete the dead two before they accidentally generate duplicate URLs.
- Stray `tatus` file at repo root (a `git s tatus` typo artifact) — delete.
- Legacy Jekyll files (`_config.yml`, `_layouts/`) remain from the old site; `_posts/` is still your newsletter content source, but `_config.yml`/`_layouts/` look dead — confirm and remove.

---

## Priority order

| # | Action | Where | Effort |
|---|--------|-------|--------|
| 1 | Unblock AI crawlers / remove managed robots.txt | Cloudflare dashboard | 15 min |
| 2 | Add www DNS record + 301 redirect | Cloudflare dashboard | 10 min |
| 3 | Real lastmod dates in sitemap | `lib/sitemap-urls.ts` | 1 hr |
| 4 | Server-side trailing-slash 301, remove JS redirect | Cloudflare rule + `app/layout.tsx` | 30 min |
| 5 | Unify wiki title/og:title; shorten homepage title | metadata generators | 30 min |
| 6 | Expand `Person.sameAs`; lazy-load Substack iframe | `lib/generateJsonLd.ts`, `app/page.tsx` | 20 min |
| 7 | Route/file cleanup | `app/newsletter/*`, repo root | 20 min |

Items 1–2 are dashboard-only and matter more than everything else combined: right now the site's biggest GEO asset (the wiki) is invisible to the systems it was designed for.
