#!/usr/bin/env node

/**
 * Generate 1200×630 og-home.webp from og-default.jpg for social / LLM previews.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
const sourcePath = path.join(publicImagesDir, 'og-default.jpg');
const destPath = path.join(publicImagesDir, 'og-home.webp');

async function main() {
  if (!fs.existsSync(sourcePath)) {
    console.log('⚠ og-default.jpg not found; skipping og-home.webp');
    return;
  }

  await sharp(sourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(destPath);

  console.log('✓ Generated public/images/og-home.webp (1200×630)');
}

main().catch((error) => {
  console.error('❌ generate-og-home failed:', error);
  process.exit(1);
});
