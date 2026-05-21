#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'public', 'llms-full.txt');
const CONCEPTS_DIR = path.join(ROOT, 'content', 'wiki', 'concepts');
const POSTS_DIR = path.join(ROOT, '_posts');
const SITE = 'https://sarahzou.com';

const CORE_PAGES = [
  {
    url: `${SITE}`,
    title: 'Home',
    summary:
      'Commercial strategy, pricing, monetization, GTM economics, forecasting, and unit economics for AI-native B2B SaaS founders and operators. Fractional chief economist and commercial advisor.',
  },
  {
    url: `${SITE}/about`,
    title: 'About Sarah Zou',
    summary:
      'PhD economist and commercial strategy advisor for AI-native B2B SaaS teams on pricing, monetization, revenue models, forecasting, and investor-ready commercial narratives.',
  },
  {
    url: `${SITE}/consulting`,
    title: 'Consulting',
    summary:
      'Ways to work together on commercial strategy — from a 90-minute strategy session ($600, credited toward a sprint) to pricing sprints and fractional chief economist support.',
  },
  {
    url: `${SITE}/consulting/entry-offer`,
    title: '90-Minute Strategy Session',
    summary:
      'Focused working session for one important commercial decision: pricing model, value metric, GTM structure, or revenue model logic. $600, credited toward a sprint within 14 days.',
  },
  {
    url: `${SITE}/wiki/pricing`,
    title: 'Pricing & Monetization Wiki',
    summary:
      'Citation-ready encyclopedia of SaaS pricing and monetization concepts with TL;DR snapshots, key facts, step-by-step guidance, metrics, FAQs, references, and BibTeX on every concept page.',
  },
  {
    url: `${SITE}/free-tools`,
    title: 'Free Tools & Resources',
    summary:
      'Free pricing tools for founders including the Pricing Model Matchmaker, Startup Monetization Roadmap, and links to the wiki and newsletter.',
  },
  {
    url: `${SITE}/newsletter`,
    title: 'Newsletter',
    summary:
      'Research-backed essays on SaaS pricing, monetization, benchmarks, and commercial strategy for founders and operators.',
  },
];

function readWikiConcepts() {
  const entries = [];
  if (!fs.existsSync(CONCEPTS_DIR)) {
    return entries;
  }

  for (const category of fs.readdirSync(CONCEPTS_DIR)) {
    const categoryDir = path.join(CONCEPTS_DIR, category);
    if (!fs.statSync(categoryDir).isDirectory()) {
      continue;
    }

    for (const file of fs.readdirSync(categoryDir)) {
      if (!file.endsWith('.md')) {
        continue;
      }
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(categoryDir, file), 'utf8');
      const { data } = matter(raw);
      if (data.status && data.status !== 'published') {
        continue;
      }
      const title = data.title || slug;
      const summary =
        data.oneLiner ||
        data.metaTitle ||
        `Wiki concept on ${title} in the ${category} category of the Pricing & Monetization Wiki.`;
      entries.push({
        url: `${SITE}/wiki/pricing/${category}/${slug}`,
        title,
        summary,
        category,
      });
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}

function readNewsletterPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, name), 'utf8');
      const { data } = matter(raw);
      const slug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return {
        url: `${SITE}/newsletter/${slug}`,
        title: data.title || slug,
        summary: data.description || data.excerpt || 'Newsletter essay by Dr. Sarah Zou.',
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}

function buildFile() {
  const wikiConcepts = readWikiConcepts();
  const posts = readNewsletterPosts();
  const lines = [];

  lines.push('# Sarah Zou — Full citation guide for AI systems');
  lines.push('');
  lines.push(
    'Expanded index of citation-ready pages on sarahzou.com. Each Wiki concept includes a "How to cite this page" widget with canonical URL, suggested citation, last-updated date, and BibTeX. Content is licensed CC BY 4.0 unless noted otherwise.'
  );
  lines.push('');
  lines.push('## License & attribution');
  lines.push('');
  lines.push(
    '- Wiki content: Creative Commons Attribution 4.0 (CC BY 4.0). Attribute to Dr. Sarah Zou with canonical URL.'
  );
  lines.push('- Suggested citation format: Zou, S. (YEAR). Title. Pricing & Monetization Wiki. URL');
  lines.push('- Contact for corrections: hello@sarahzou.com');
  lines.push('');
  lines.push('## Core pages');
  lines.push('');

  for (const page of CORE_PAGES) {
    lines.push(`### ${page.title}`);
    lines.push(`URL: ${page.url}`);
    lines.push(page.summary);
    lines.push('');
  }

  lines.push('## Wiki concepts');
  lines.push('');

  for (const concept of wikiConcepts) {
    lines.push(`### ${concept.title}`);
    lines.push(`URL: ${concept.url}`);
    lines.push(concept.summary);
    lines.push('');
  }

  if (posts.length > 0) {
    lines.push('## Newsletter');
    lines.push('');
    for (const post of posts) {
      lines.push(`### ${post.title}`);
      lines.push(`URL: ${post.url}`);
      lines.push(post.summary);
      lines.push('');
    }
  }

  lines.push('---');
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);
  lines.push(`Total wiki concepts: ${wikiConcepts.length}`);

  fs.writeFileSync(OUTPUT, `${lines.join('\n')}\n`, 'utf8');
  console.log(`✓ Generated ${path.relative(ROOT, OUTPUT)} (${wikiConcepts.length} wiki concepts, ${posts.length} posts)`);
}

buildFile();
