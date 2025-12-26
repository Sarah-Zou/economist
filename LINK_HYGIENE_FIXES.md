# Link Hygiene Fixes - PR Summary

This PR fixes link hygiene blockers on sarahzou.com pricing wiki.

## Changes Made

### 1. Fixed Broken "Monetizing Innovation" Link ✅

**Problem**: The link to `https://www.simon-kucher.com/en/monetizing-innovation` was returning 404.

**Solution**: Replaced with stable Wiley publisher page using ISBN:
- New link: `https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119240860`
- Added ISBN references to all citation entries: `ISBN: 978-1-119-24086-0`

**Files Updated**:
- `content/wiki/concepts/foundations/value-based-pricing.md`
- `content/wiki/concepts/foundations/penetration-strategy.md`
- `content/wiki/concepts/foundations/skimming-strategy.md`
- `content/wiki/concepts/foundations/maximization.md`
- `content/wiki/concepts/foundations/cost-plus-pricing.md` (also fixed incorrect author attribution)
- `content/wiki/concepts/foundations/strategic-pricing.md`

### 2. Fixed "+24% profits" Key Fact ✅

**Problem**: The specific "+24% profits" claim was not explicitly supported by the cited source.

**Solution**: Rewrote the claim to be more general and verifiable:
- **Before**: "Companies that adopt value-based pricing earn 24% higher profits than peers"
- **After**: "Companies that adopt value-based pricing systematically outperform peers on profitability"

**Files Updated**:
- `content/wiki/concepts/foundations/value-based-pricing.md` (both in "Why it matters" section and Key Facts)

### 3. Fixed Trailing-Slash 404s ✅

**Problem**: URLs with trailing slashes could cause 404s if accessed directly.

**Solution**:
- Verified all internal links use canonical style (no trailing slash) - ✅ Already correct
- Created `public/_redirects` file for Netlify to redirect trailing-slash URLs to non-trailing-slash
- Site already configured with `trailingSlash: false` in `next.config.js`

**Files Created**:
- `public/_redirects` - Netlify redirect rules (301 redirects from trailing-slash to non-trailing-slash)

**Note**: For other hosting providers (Cloudflare, Nginx, etc.), configure redirects in their respective dashboards using the same pattern: redirect `/*/` to `/:splat` with 301 status.

### 4. Added Automated Link Checker ✅

**Solution**: Integrated [Linkinator](https://github.com/JustinBeckwith/linkinator) for automated link checking.

**Changes**:
- Added `linkinator` as dev dependency in `package.json`
- Added `check-links` script to check built site
- Added `check-links:local` script that builds and checks
- Configured to skip external domains that may block automated checkers

**Files Updated**:
- `package.json` - Added linkinator dependency and scripts

### 5. Wired Link Checker into CI ✅

**Solution**: Added link checking to GitHub Actions workflows.

**Changes**:
- Updated `.github/workflows/pages.yml` to run link checks after build
- Created `.github/workflows/link-check.yml` for PR checks
- Both workflows fail if broken links are detected

**Files Created/Updated**:
- `.github/workflows/pages.yml` - Added link check step
- `.github/workflows/link-check.yml` - New workflow for PR link checks

### 6. Created Local Link Check Instructions ✅

**Solution**: Created comprehensive documentation for running link checks locally.

**Files Created**:
- `LINK_CHECKING.md` - Complete guide for running link checks locally, troubleshooting, and understanding output

## Testing

### Run Link Checks Locally

```bash
# Install dependencies (if not already done)
npm install

# Build the site
npm run build

# Check links
npm run check-links

# Or use the combined command
npm run check-links:local
```

### Verify Redirects

For Netlify: The `public/_redirects` file will be automatically used.

For other hosts: Configure redirects in their dashboard:
- **Cloudflare**: Page Rules → Redirect `/*/` to `/:splat` (301)
- **Nginx**: Add rewrite rule: `rewrite ^(.+)/$ $1 permanent;`
- **Apache**: Add to `.htaccess`: `RewriteRule ^(.+)/$ /$1 [R=301,L]`

## Next Steps

1. **Install dependencies**: Run `npm install` to get the new `linkinator` package
2. **Test locally**: Run `npm run check-links:local` to verify everything works
3. **Deploy**: The CI will automatically check links on PRs and before deployment
4. **Monitor**: Check CI runs to ensure no new broken links are introduced

## Notes

- External domains that may block automated checkers are skipped in the link checker configuration
- The redirects file works for Netlify; other hosting providers need manual configuration
- Link checks run on both PRs and main branch deployments to catch issues early

