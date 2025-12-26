# Link Checking Guide

This project uses [Linkinator](https://github.com/JustinBeckwith/linkinator) to automatically check for broken links in the built site.

## Running Link Checks Locally

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the site:
   ```bash
   npm run build
   ```

### Check Links

Run the link checker on the built site:

```bash
npm run check-links
```

Or use the combined command that builds and checks:

```bash
npm run check-links:local
```

### What Gets Checked

The link checker:
- Scans all HTML files in the `out/` directory (the built static site)
- Checks both internal and external links
- Skips certain external domains that may have rate limiting or access restrictions:
  - `simon-kucher.com`
  - `link.springer.com`
  - `mckinsey.com`
  - `wiley.com`
  - `paddle.com`
  - `bain.com`
  - `courses.lumenlearning.com`
  - `researchgate.net`
  - `counterpointresearch.com`
  - `sciative.com`
  - `journalppw.com`

### Understanding the Output

- ✅ **Success**: All links are valid
- ❌ **Failure**: One or more links are broken (returns 404, 403, or connection errors)

When the check fails, Linkinator will show:
- The broken link URL
- The file where the link was found
- The HTTP status code or error

### Fixing Broken Links

1. **Internal links**: Update the link path in the source file
2. **External links**: 
   - Verify the URL is correct
   - Check if the site is temporarily down
   - Replace with an alternative stable source (e.g., publisher page, DOI, ISBN page)

### CI Integration

Link checks run automatically:
- **On Pull Requests**: The `link-check.yml` workflow runs on every PR to `main`
- **On Main Branch**: The `pages.yml` workflow includes link checking before deployment

PRs will fail if broken links are detected, preventing broken links from being merged.

## Troubleshooting

### "Link check failed but the site works locally"

- The built site in `out/` may be out of date. Run `npm run build` first.
- Some external sites may block automated link checkers. These are added to the skip list.

### "Too many false positives from external sites"

Add the domain to the `--skip` flags in `package.json` scripts.

### "Link checker is slow"

Linkinator checks all links sequentially. For large sites, this can take several minutes. This is normal.

## Manual Link Checking

If you need to check a specific URL manually:

```bash
npx linkinator https://sarahzou.com/wiki/pricing --recurse
```

Or check a local file:

```bash
npx linkinator ./out/index.html
```

