# Editorial Design Spec — July 2026 (v2, final decisions)

Direction: **editorial authority** (refs: Stripe Press, Works in Progress, Commoncog; solo-expert structure: Hemrock). Goal: research-publication feel, name-led personal brand, one restrained accent.

## Final decisions (Sarah, 2026-07-19)

- Headline serif: **EB Garamond** (chosen over Newsreader, Source Serif 4, Fraunces, Spectral). Garamond renders small → type scale runs larger (h1 max 4.5rem).
- Palette: **ink navy / warm ivory / muted copper / stone / charcoal** (replaces both bright orange and the interim terracotta).
- H1: broader positioning line — "Pricing and commercial strategy for complex technical products." Keyword tradeoff was flagged; Sarah chose broad. AI-infra/API/data-platform keywords remain in the lede, title tag, and meta description (unchanged).
- Brand hierarchy: **Sarah Zou, PhD leads**; EconNova logo demoted to secondary mark in navbar and footer/legal.

## Tokens

Fonts (`app/layout.tsx`): EB Garamond loaded into the legacy `--font-playfair` variable — do not rename casually; 43 files reference `font-serif-playfair`. Headline weight 500, letter-spacing −0.01em.

Colors (`app/globals.css`):

- Ink `#13212a` (headings, dark panel bg) · charcoal text `#26363e` · muted `#54646e` · subtle `#7f8b93`
- Page ivory `#f6f3ed` · surface `#efeae1` · surface-muted `#e5dfd4` · hero tint `#f2eee6`
- Borders: stone `#d2ccc2`, soft `#e2ddd4`
- Copper `#b9583b` (hover `#9a4630`, dark `#7a3826`, soft tint `#f3e3dc`) — **small doses only**: rules, labels, links, primary CTA
- shadcn bridge: `--accent: 14 52% 48%`

Shape: radii control 0.5rem / card 0.75rem / buttons 8px / portrait 12px; no body gradients; hairline rules over shadows. (Applied in v1, retained.)

## Homepage structure (app/page.tsx)

Sequence: hero (new copy, one primary CTA + quiet secondary, portrait, credential strip) → core-areas strip → four commercial problems (cut from seven; audience-fit line folded into intro) → Commercial Architecture Diagnostic (navy panel) → evidence/differentiation → other engagements → **published research & tools** (wiki, matchmaker, notes — framed as evidence, new section) → FAQ (schema unchanged) → closing CTA.

Removed: "Who this is for" three-role grid; Substack iframe embed (newsletter now a row in published-work section — also removes a third-party script from the homepage). Section intros left-aligned (`section-header-left`).

## Not changed

Title tags, meta descriptions, canonicals, FAQ/JSON-LD schema, all non-homepage page copy.

## Follow-ups

- Local `npm run dev` visual check (sandbox can't build); tune Garamond sizes if headlines feel light — h3/h4 are still Inter by design.
- Chrome-extension visual audit of interior pages (wiki, consulting) once connected.
- Footer: consider mirroring name-led hierarchy (currently logo-led).
- OG images (`images/og-home.webp`) still show old branding — regenerate to match palette.
