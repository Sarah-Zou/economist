#!/usr/bin/env node

/**
 * Post-build: sitemap index, OG image, GitHub Pages helpers.
 * Wiki/newsletter URLs live in app/sitemap.ts (out/sitemap.xml).
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sarahzou.com';
const outDir = path.join(process.cwd(), 'out');

function getLastModified(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtime.toISOString().split('T')[0];
    }
  } catch {
    // fall through
  }
  return new Date().toISOString().split('T')[0];
}

function generateSitemapIndex() {
  const sitemapPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ out/sitemap.xml missing. Run "npm run build" first.');
    process.exit(1);
  }

  const lastmod = getLastModified(sitemapPath);
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  const indexPath = path.join(outDir, 'sitemap_index.xml');
  fs.writeFileSync(indexPath, sitemapIndex, 'utf8');
  console.log(`✓ Generated sitemap_index.xml → ${indexPath}`);

  // Remove legacy split sitemaps if a previous build left them behind.
  for (const legacy of ['sitemap-wiki.xml', 'sitemap-posts.xml']) {
    const legacyPath = path.join(outDir, legacy);
    if (fs.existsSync(legacyPath)) {
      fs.unlinkSync(legacyPath);
      console.log(`✓ Removed legacy ${legacy}`);
    }
  }
}

async function generateOgHomeImage() {
  const { execSync } = require('child_process');
  execSync('node scripts/generate-og-home.js', { stdio: 'inherit' });

  const destPath = path.join(process.cwd(), 'public', 'images', 'og-home.webp');
  const outCopy = path.join(outDir, 'images', 'og-home.webp');
  if (fs.existsSync(destPath)) {
    fs.mkdirSync(path.dirname(outCopy), { recursive: true });
    fs.copyFileSync(destPath, outCopy);
  }
}

function setup404Page() {
  try {
    const indexPath = path.join(outDir, 'index.html');
    const notFoundPath = path.join(outDir, '404.html');

    if (!fs.existsSync(indexPath)) {
      console.error('❌ index.html not found in out/.');
      return false;
    }

    if (!fs.existsSync(notFoundPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log('✓ Created 404.html from index.html');
    } else {
      console.log('✓ 404.html already exists');
    }
    return true;
  } catch (error) {
    console.error('❌ Error setting up 404 page:', error.message);
    return false;
  }
}

function setupCNAME() {
  try {
    const cnameSource = path.join(process.cwd(), 'CNAME');
    const cnameDest = path.join(outDir, 'CNAME');

    if (!fs.existsSync(cnameSource)) {
      console.log('⚠ CNAME not found; skipping');
      return false;
    }

    fs.copyFileSync(cnameSource, cnameDest);
    console.log('✓ Copied CNAME to out/');
    return true;
  } catch (error) {
    console.error('❌ Error copying CNAME:', error.message);
    return false;
  }
}

function setupNoJekyll() {
  try {
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    console.log('✓ Created .nojekyll');
    return true;
  } catch (error) {
    console.error('❌ Error creating .nojekyll:', error.message);
    return false;
  }
}

async function main() {
  if (!fs.existsSync(outDir)) {
    console.error(`❌ ${outDir} does not exist. Run "npm run build" first.`);
    process.exit(1);
  }

  generateSitemapIndex();
  await generateOgHomeImage();
  setup404Page();
  setupCNAME();
  setupNoJekyll();
}

main().catch((error) => {
  console.error('❌ postbuild failed:', error);
  process.exit(1);
});
