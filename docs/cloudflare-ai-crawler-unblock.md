# Cloudflare: unblock AI crawlers (Sprint 0)

Production `robots.txt` is augmented by **Cloudflare Managed robots rules**, which currently block major GenAI crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, etc.). That prevents ChatGPT, Claude, Perplexity, and Gemini from fetching citation-ready wiki content even though `llms.txt` and on-page citation widgets exist.

## Steps (Cloudflare dashboard)

1. Open **Cloudflare Dashboard** → your zone (`sarahzou.com`).
2. Go to **Security** → **Bots** (or **AI Audit** / **Crawl control**, depending on plan UI).
3. Find **Managed robots.txt** or **AI bot blocking** rules.
4. Set these user agents to **Allow** (or remove block rules):
   - `GPTBot` (ChatGPT / OpenAI)
   - `ClaudeBot` (Anthropic)
   - `Google-Extended` (Gemini / AI Overviews grounding)
   - `PerplexityBot` (if listed)
   - `Applebot-Extended` (Apple Intelligence)
   - `OAI-SearchBot` (ChatGPT search, if listed)
5. Optional: keep blocking scrapers you do not want (`Bytespider`, etc.).
6. For `Content-Signal`:
   - Keep `search=yes`
   - Set `ai-input=yes` if you want RAG/citation fetch allowed
   - Use `ai-train=no` only if you explicitly do not want training on your content

## Verify after change

```bash
curl -s https://sarahzou.com/robots.txt | findstr /i "GPTBot ClaudeBot Google-Extended"
```

Blocked crawlers show `Disallow: /`. Allowed crawlers should not appear with a blanket disallow.

Spot-check a wiki concept URL is fetchable (200, full HTML):

```bash
curl -I https://sarahzou.com/wiki/pricing/foundations/value-based-pricing
```

## Sitemap (related Sprint 0 fix)

After deploy, confirm:

- `https://sarahzou.com/sitemap.xml` → 200
- `https://sarahzou.com/sitemap_index.xml` → 200 (points to `sitemap.xml`)

Then resubmit `sitemap_index.xml` in Google Search Console.
