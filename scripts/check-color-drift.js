#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const SCAN_DIRS = ['app', 'components', 'lib', 'pages', 'styles', 'content'];
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.mdx']);

const DISALLOWED_ORANGE_HEX = new Set([
  '#e44e1f',
  '#e64a19',
  '#9a3412',
  '#ffe0d6',
  '#fff8f5',
  '#fff5f2',
]);

const ORANGE_TAILWIND_UTILITY_REGEX = /\b(?:bg|text|border|from|via|to|ring)-orange(?:-\d{2,3})?\b/g;
const HEX_REGEX = /#[0-9a-fA-F]{6}\b/g;

function shouldSkipPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return (
    normalized.includes('/node_modules/') ||
    normalized.includes('/.next/') ||
    normalized.includes('/out/') ||
    normalized.includes('/reports/.npx-cache/') ||
    normalized.includes('/.git/')
  );
}

function getAllFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (shouldSkipPath(fullPath)) continue;

    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath));
      continue;
    }

    if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }

  return results;
}

function findMatches(content, regex) {
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push({ index: match.index, value: match[0] });
  }
  return matches;
}

function getLineAtIndex(content, index) {
  const prior = content.slice(0, index);
  const lineNumber = prior.split('\n').length;
  const line = content.split('\n')[lineNumber - 1] || '';
  return { lineNumber, line: line.trim() };
}

const violations = [];

for (const dir of SCAN_DIRS) {
  const targetDir = path.join(ROOT, dir);
  const files = getAllFiles(targetDir);

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(ROOT, filePath).replace(/\\/g, '/');

    const utilityMatches = findMatches(content, new RegExp(ORANGE_TAILWIND_UTILITY_REGEX));
    for (const item of utilityMatches) {
      const { lineNumber, line } = getLineAtIndex(content, item.index);
      violations.push({
        relPath,
        lineNumber,
        reason: `Disallowed tailwind orange utility "${item.value}"`,
        line,
      });
    }

    const hexMatches = findMatches(content, new RegExp(HEX_REGEX));
    for (const item of hexMatches) {
      const lower = item.value.toLowerCase();
      if (!DISALLOWED_ORANGE_HEX.has(lower)) continue;
      const { lineNumber, line } = getLineAtIndex(content, item.index);
      violations.push({
        relPath,
        lineNumber,
        reason: `Disallowed orange hex "${lower}"`,
        line,
      });
    }
  }
}

if (violations.length > 0) {
  console.error('\nColor drift check failed. Use brand tokens instead of ad-hoc orange values.\n');
  violations.forEach((v) => {
    console.error(`- ${v.relPath}:${v.lineNumber} — ${v.reason}`);
    console.error(`  ${v.line}`);
  });
  console.error('\nAllowed orange tokens:');
  console.error('- brand.DEFAULT / --color-brand-default (#ff5722)');
  console.error('- brand.ink / --color-brand-ink (#c2410c)');
  console.error('- brand.soft / --color-brand-soft (#fff1eb)');
  process.exit(1);
}

console.log('Color drift check passed.');
