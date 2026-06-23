#!/usr/bin/env node

/**
 * Convert newsletter PNGs to WebP, update _posts front-matter and body references,
 * then delete the original PNGs.
 * Run: node scripts/optimize-newsletter-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const NEWSLETTER_IMAGES_DIR = path.join(ROOT, 'public', 'assets', 'images', 'newsletter');
const POSTS_DIR = path.join(ROOT, '_posts');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 82;

function collectPostFiles() {
  return fs.readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(POSTS_DIR, f));
}

function findReferencedPngs() {
  const refs = new Set();
  // matches both front-matter `image: "/assets/..."` and body `![](...)`
  const pattern = /\/assets\/images\/newsletter\/([^)\s"']+\.png)/gi;

  for (const file of collectPostFiles()) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = pattern.exec(content)) !== null) {
      refs.add(match[1]);
    }
  }
  return [...refs].sort();
}

async function convertToWebp(filename) {
  const sourcePath = path.join(NEWSLETTER_IMAGES_DIR, filename);
  const webpFilename = filename.replace(/\.png$/i, '.webp');
  const destPath = path.join(NEWSLETTER_IMAGES_DIR, webpFilename);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠  Source not found, skipping: ${filename}`);
    return null;
  }

  if (fs.existsSync(destPath)) {
    console.log(`  (WebP already exists for ${filename}, re-generating to ensure freshness)`);
  }

  const before = fs.statSync(sourcePath).size;

  await sharp(sourcePath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);

  const after = fs.statSync(destPath).size;
  const meta = await sharp(destPath).metadata();

  return { filename, webpFilename, before, after, width: meta.width, height: meta.height };
}

function updatePostReferences() {
  let updatedFiles = 0;
  let replacements = 0;

  for (const file of collectPostFiles()) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(
      /(\/assets\/images\/newsletter\/[^)\s"']+)\.png/gi,
      (_, base) => {
        replacements++;
        return `${base}.webp`;
      }
    );
    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      updatedFiles++;
    }
  }
  return { updatedFiles, replacements };
}

function deleteOriginalPngs(filenames) {
  let deleted = 0;
  for (const filename of filenames) {
    const p = path.join(NEWSLETTER_IMAGES_DIR, filename);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      deleted++;
    }
  }
  return deleted;
}

async function main() {
  const pngRefs = findReferencedPngs();

  if (pngRefs.length === 0) {
    console.log('No newsletter PNG references found in _posts/.');
    return;
  }

  console.log(`Converting ${pngRefs.length} newsletter image(s) to WebP (max width ${MAX_WIDTH}px)…\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const converted = [];

  for (const filename of pngRefs) {
    const result = await convertToWebp(filename);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;
    converted.push(result.filename);

    const savedPct = ((1 - result.after / result.before) * 100).toFixed(1);
    console.log(
      `✓ ${result.filename} → ${result.webpFilename}` +
      ` (${result.width}×${result.height}, ${(result.before / 1024).toFixed(0)} KB → ${(result.after / 1024).toFixed(0)} KB, −${savedPct}%)`
    );
  }

  console.log('');
  const { updatedFiles, replacements } = updatePostReferences();
  console.log(`Updated ${replacements} reference(s) across ${updatedFiles} post file(s).`);

  const deleted = deleteOriginalPngs(converted);
  console.log(`Deleted ${deleted} original PNG(s).`);

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB` +
    ` (−${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );

  // Also delete any unreferenced PNG originals that already have a WebP twin
  const allPngs = fs.readdirSync(NEWSLETTER_IMAGES_DIR).filter((f) => /\.png$/i.test(f));
  const orphaned = allPngs.filter((f) => {
    const webp = path.join(NEWSLETTER_IMAGES_DIR, f.replace(/\.png$/i, '.webp'));
    return fs.existsSync(webp);
  });
  for (const f of orphaned) {
    fs.unlinkSync(path.join(NEWSLETTER_IMAGES_DIR, f));
  }
  if (orphaned.length) {
    console.log(`\nAlso removed ${orphaned.length} unreferenced PNG(s) that already had WebP twin(s): ${orphaned.join(', ')}`);
  }
}

main().catch((err) => {
  console.error('❌ optimize-newsletter-images failed:', err);
  process.exit(1);
});
