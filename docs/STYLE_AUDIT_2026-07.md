# Site style audit — July 2026

Context: editorial redesign applied (EB Garamond, navy/ivory/copper, name-led brand). This audit covers what remains inconsistent sitewide, prioritized. Items marked ✅ were fixed during the audit itself.

## Why some text looks small (root cause)

Three compounding reasons. First, the site hardcodes pixel sizes everywhere (`text-[14px]` etc., 15 distinct values from 10px to 40px), which bypasses the responsive root scale (`html` is 16px, 17px ≥768px) — hardcoded px never benefits from it. Second, heavy use of 10–11px uppercase micro-labels with wide letter-spacing (kickers, captions, footer links) reads far smaller than its nominal size. Third, EB Garamond headlines are now very large, which exaggerates the contrast with 13–15px Inter body text nearby.

✅ Fixed in this pass: nav links 12→13px, `.copy` 15/16→16/17px, homepage list/sub text 14→15px, problem intro 15→16px, footer links 13px-uppercase→14px sentence case.

## Prioritized recommendations

> Status update: P1 items 1–2 and P3 items 9–12 were implemented on 2026-07-19 (30 files normalized by script — heading size/weight/color overrides stripped so the global scale rules; article titles on newsletter + wiki concept pages capped at clamp(2rem…3rem); intros left-aligned on about/consulting/diagnostic-note; outline buttons + cards + metric chips now transparent with hairline borders; portrait squared to 6px with stone border; wiki prose scale raised ~15% for Garamond). P2 (OG images, favicon, footer tagline, logo) and P4 (post-build verification) remain open.

### P1 — Consistency with the new system

1. **Interior H1 overrides.** ~10 pages (consulting, services ×3, wiki hubs, error pages) set their own fixed 30–40px heading sizes, so they won't match the homepage's Garamond clamp scale. Remove the overrides and let the global `h1`/`h2` rules apply.
2. **Centered vs left-aligned intros.** `section-header` (centered) is still used on `/about`, `/consulting`, `/diagnostic-note` while the homepage is now left-aligned. Standardize on left (`section-header-left`).
3. **Type scale consolidation.** Adopt a fixed menu — 12 (meta), 14 (small), 16 (body), 17–19 (lede), then the heading clamps — and migrate arbitrary values toward it opportunistically. Avoid introducing new `text-[Npx]` values.
4. **Micro-label restraint.** Keep kickers at 11–12px but use them once per section; several sections stack kicker + caption + meta-note, which multiplies the "tiny text" impression.

### P2 — Brand remnants of the old palette

5. **OG images** (`/images/og-home.webp` and siblings) still show the old orange branding — regenerate with navy/ivory/copper. These are what people see when the site is shared.
6. **Favicon** (`econnova_icon.png`) is the old orange logo mark; consider a simple "SZ" monogram in navy/copper to match the name-led brand.
7. **Footer** still leads with the EconNova logo (acceptable — footer is the agreed home for the entity) but the tagline reads "Pricing, GTM, and unit economics for deep tech founders." Update to the new positioning line for consistency.
8. **Logo file itself** is orange+navy; on ivory next to copper accents it may clash. If Sarah keeps it in the footer only, low priority.

### P3 — Component polish

9. **Outline buttons** use `bg-white`, which reads as stark white boxes on the ivory page. Change to `bg-transparent` (hover can stay `bg-surface`).
10. **Cards** use `bg-white/90` — same issue; consider `bg-surface` or transparent with hairline border for the editorial feel.
11. **Wiki prose** (`prose.css` "legacy" block) fixes h1 at 34px and has its own scale — audit against the new global scale; also confirm reading measure ≈70ch on concept pages.
12. **Headshot treatment**: current 12px-radius portrait is fine; a squarer editorial crop (4:5, 6px radius, thin stone border) would push further toward the research-publication feel.
13. **Mobile menu** is a text "Menu" `<details>` toggle — works, but verify the new nowrap name + tagline don't crowd it below 400px.

### P4 — Verify after changes

14. Run Lighthouse locally after the rebuild: removing the Substack iframe should improve LCP/total blocking time on the homepage; confirm no CLS from the larger Garamond hero (font is `display: swap` with preload — watch for flash).
15. Check `card-dark` (now navy) text contrast: `white/60` on `#13212a` passes AA for large text only — bump to `white/70` if any small text sits on it.
16. Cross-browser check EB Garamond at weight 500 on Windows (GDI rendering can thin out Garamond at small sizes — another reason to keep headlines large).
