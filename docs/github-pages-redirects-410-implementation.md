# GitHub Pages 301/410 Implementation Notes

This repository deploys via `.github/workflows/pages.yml` to **GitHub Pages**.

## Important platform constraint

GitHub Pages cannot natively apply per-path `301`/`410` response rules for arbitrary legacy URLs.

- It can serve static files and a global `404.html`.
- It cannot be configured like Netlify/Vercel/Cloudflare to return custom status codes for a path map.

## Source of truth map

Use this file as the canonical remediation map:

- `docs/github-pages-legacy-url-remediation-map.csv`

It contains:

- `recommended_status` (`301` or `410`)
- `target_path` for redirects
- rationale and notes

## How to enforce true 301/410 in production

To actually return these statuses, place an edge layer in front of GitHub Pages (for example, Cloudflare Rules/Workers or another reverse proxy) and implement:

- all `301` rows as permanent redirects
- all `410` rows as explicit Gone responses

## Current in-repo mitigation already completed

- Internal source links have been fixed to avoid broken targets.
- Unpublished concept pages are no longer generated or listed in sitemaps.
- This prevents new soft-404 debt from being introduced by site generation.
