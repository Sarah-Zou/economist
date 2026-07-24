#!/usr/bin/env node

/**
 * Convert large wiki diagram PNGs to WebP and update markdown references.
 * Run: node scripts/optimize-wiki-mental-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const CONTENT_DIR = path.join(ROOT, 'content', 'wiki');
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 82;

function collectMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function findReferencedWikiPngs() {
  const pngRefs = new Set();
  const pattern = /\/images\/(wiki_[^)\s"]+\.png)/g;

  for (const file of collectMarkdownFiles(CONTENT_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = pattern.exec(content)) !== null) {
      pngRefs.add(match[1]);
    }
  }

  return [...pngRefs].sort();
}

async function convertToWebp(pngName) {
  const sourcePath = path.join(IMAGES_DIR, pngName);
  const webpName = pngName.replace(/\.png$/i, '.webp');
  const destPath = path.join(IMAGES_DIR, webpName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠ Source not found, skipping: ${pngName}`);
    return null;
  }

  const before = fs.statSync(sourcePath).size;

  await sharp(sourcePath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(destPath);

  const after = fs.statSync(destPath).size;
  const meta = await sharp(destPath).metadata();

  return {
    pngName,
    webpName,
    before,
    after,
    width: meta.width,
    height: meta.height,
  };
}

function updateMarkdownReferences() {
  let updatedFiles = 0;
  let replacements = 0;

  for (const file of collectMarkdownFiles(CONTENT_DIR)) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(
      /(\/images\/wiki_[^)\s"]+)\.png/g,
      (_, base) => {
        replacements += 1;
        return `${base}.webp`;
      }
    );

    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      updatedFiles += 1;
    }
  }

  return { updatedFiles, replacements };
}

async function main() {
  const pngRefs = findReferencedWikiPngs();

  if (pngRefs.length === 0) {
    console.log('No wiki PNG references found in content/wiki.');
    return;
  }

  console.log(`Converting ${pngRefs.length} wiki image(s) to WebP (max width ${MAX_WIDTH}px)…\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const pngName of pngRefs) {
    const result = await convertToWebp(pngName);
    if (!result) continue;

    totalBefore += result.before;
    totalAfter += result.after;
    const savedPct = ((1 - result.after / result.before) * 100).toFixed(1);
    console.log(
      `✓ ${result.pngName} → ${result.webpName} (${result.width}×${result.height}, ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB, −${savedPct}%)`
    );
  }

  const { updatedFiles, replacements } = updateMarkdownReferences();

  console.log(`\nUpdated ${replacements} reference(s) across ${updatedFiles} markdown file(s).`);
  console.log(
    `Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (−${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
}

main().catch((error) => {
  console.error('❌ optimize-wiki-mental-images failed:', error);
  process.exit(1);
});
