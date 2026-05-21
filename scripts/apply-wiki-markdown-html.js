#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const pagePath = path.join(
  process.cwd(),
  'app/wiki/pricing/[category]/[concept]/page.tsx'
);

const lines = fs.readFileSync(pagePath, 'utf8').split(/\r?\n/);
const startLine = lines.findIndex((line) =>
  line.includes('// Shared ReactMarkdown components')
);
const endLine = lines.findIndex((line) =>
  line.trim().startsWith('export default async function ConceptPage')
);

if (startLine < 0 || endLine < 0 || endLine <= startLine) {
  throw new Error('Could not locate markdown component block line range.');
}

let content = [...lines.slice(0, startLine), ...lines.slice(endLine)].join('\n');
content = content.replace(/\n\s*const markdownComponents = createMarkdownComponents\(\)\n/, '\n');

const blockPattern =
  /<ReactMarkdown(?:(?!<\/ReactMarkdown>)[\s\S])*?components=\{markdownComponents\}(?:(?!<\/ReactMarkdown>)[\s\S])*?>\s*\{([^}]+)\}\s*<\/ReactMarkdown>/g;

let count = 0;
content = content.replace(blockPattern, (_, expr) => {
  count += 1;
  return `<WikiMarkdownHtml markdown={${expr}} />`;
});

if (count === 0) {
  throw new Error('No markdownComponents ReactMarkdown blocks were replaced.');
}
if (content.includes('markdownComponents')) {
  throw new Error('markdownComponents references remain after replacement.');
}
if (!content.includes('export default async function ConceptPage')) {
  throw new Error('ConceptPage export missing after migration.');
}

if (!content.includes("from '@/components/wiki/WikiMarkdownHtml'")) {
  content = content.replace(
    "import CiteThisPage from '@/components/wiki/CiteThisPage'",
    "import CiteThisPage from '@/components/wiki/CiteThisPage'\nimport { WikiMarkdownHtml } from '@/components/wiki/WikiMarkdownHtml'"
  );
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log(`✓ Replaced ${count} wiki markdown blocks with WikiMarkdownHtml`);
