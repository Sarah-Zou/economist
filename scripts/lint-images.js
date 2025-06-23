const fs = require('fs');
const path = require('path');

const imageDir = 'public/assets/images/newsletter';
const postDir = '_posts';

fs.readdirSync(imageDir).forEach(file => {
  if (!file.endsWith('.png')) return;
  const filePath = path.join(imageDir, file);
  const stats = fs.statSync(filePath);
  if (stats.size > 200 * 1024) {
    console.warn(`Image > 200KB: ${file}`);
  }
  if (!file.match(/^[a-z0-9-]+\.png$/)) {
    console.warn(`Non-hyphenated or non-keyword image name: ${file}`);
  }
});

fs.readdirSync(postDir).forEach(file => {
  if (!file.endsWith('.md')) return;
  const content = fs.readFileSync(path.join(postDir, file), 'utf8');
  if (!content.includes('image:')) {
    console.warn(`Missing image front-matter in: ${file}`);
  }
}); 