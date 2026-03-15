/**
 * Converts all concept markdown files to PDF and saves them in public/assets/wiki_pages_pdf
 * Run: node scripts/export-concepts-to-pdf.js
 */
const fs = require('fs');
const path = require('path');

const conceptsDir = path.join(__dirname, '../content/wiki/concepts');
const outputDir = path.join(__dirname, '../public/assets/wiki_pages_pdf');

function collectMdFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMdFiles(full, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('Created:', outputDir);
  }

  const { mdToPdf } = require('md-to-pdf');
  const files = collectMdFiles(conceptsDir);

  if (files.length === 0) {
    console.log('No markdown files found in', conceptsDir);
    return;
  }

  console.log(`Converting ${files.length} concept files to PDF...`);

  for (const file of files) {
    const baseName = path.basename(file, '.md');
    const dest = path.join(outputDir, `${baseName}.pdf`);
    try {
      await mdToPdf(
        { path: file },
        {
          dest,
          pdf_options: {
            format: 'A4',
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
          },
        }
      );
      console.log('  ✓', baseName + '.pdf');
    } catch (err) {
      console.error('  ✗', baseName + '.pdf', err.message);
    }
  }

  console.log('Done. PDFs saved to', outputDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
