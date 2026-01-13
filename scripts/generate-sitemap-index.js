#!/usr/bin/env node

/**
 * Generate separate sitemap files and sitemap_index.xml
 * This script runs after Next.js build to create wiki/posts sitemaps and the index
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const baseUrl = 'https://sarahzou.com';
const outDir = path.join(process.cwd(), 'out');

// Helper to format sitemap XML
function formatSitemap(entries) {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastModified 
      ? new Date(entry.lastModified).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency || 'monthly'}</changefreq>
    <priority>${entry.priority || 0.5}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Generate wiki sitemap
function generateWikiSitemap() {
  try {
    // Read markdown files directly
    
    const contentDir = path.join(process.cwd(), 'content/wiki/categories');
    const fileNames = fs.readdirSync(contentDir).filter(name => name.endsWith('.md'));
    
    const categories = fileNames.map((fileName) => {
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug: data.slug || fileName.replace('.md', ''),
        updated: data.updated,
        concepts: [] // We'll parse concepts if needed, but for now just categories
      };
    });
    
    const currentDate = new Date().toISOString();

    const wikiPages = categories.map((category) => ({
      url: `${baseUrl}/wiki/pricing/${category.slug}`,
      lastModified: category.updated || currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // Parse concepts from markdown files
    const conceptPages = [];
    fileNames.forEach((fileName) => {
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slug = data.slug || fileName.replace('.md', '');
      
      // Simple parsing of concepts (looking for span id patterns)
      const lines = fileContents.split('\n');
      let inConceptsSection = false;
      for (const line of lines) {
        if (line.includes("## What's in this category")) {
          inConceptsSection = true;
          continue;
        }
        if (line.includes('## ')) {
          inConceptsSection = false;
          continue;
        }
        if (inConceptsSection && line.includes('<span id="')) {
          const match = line.match(/<span id="([^"]+)">/);
          if (match) {
            conceptPages.push({
              url: `${baseUrl}/wiki/pricing/${slug}/${match[1]}`,
              lastModified: data.updated || currentDate,
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          }
        }
      }
    });

    const sitemap = formatSitemap([...wikiPages, ...conceptPages]);
    const wikiPath = path.join(outDir, 'sitemap-wiki.xml');
    fs.writeFileSync(wikiPath, sitemap, 'utf8');
    console.log(`✓ Generated sitemap-wiki.xml (${wikiPages.length + conceptPages.length} URLs)`);
    return true;
  } catch (error) {
    console.error('❌ Error generating wiki sitemap:', error.message);
    return false;
  }
}

// Generate posts sitemap
function generatePostsSitemap() {
  try {
    // Read posts directly from _posts directory
    
    const postsDir = path.join(process.cwd(), '_posts');
    const fileNames = fs.readdirSync(postsDir).filter(name => name.endsWith('.md'));
    
    const posts = fileNames.map((fileName) => {
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slug = fileName.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.md$/, '');
      return {
        slug,
        date: data.date || new Date().toISOString(),
      };
    });

    const postPages = posts.map((post) => ({
      url: `${baseUrl}/newsletter/${post.slug}`,
      lastModified: post.date || new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const sitemap = formatSitemap(postPages);
    const postsPath = path.join(outDir, 'sitemap-posts.xml');
    fs.writeFileSync(postsPath, sitemap, 'utf8');
    console.log(`✓ Generated sitemap-posts.xml (${postPages.length} URLs)`);
    return true;
  } catch (error) {
    console.error('❌ Error generating posts sitemap:', error.message);
    return false;
  }
}

function getLastModified(sitemapPath) {
  try {
    if (fs.existsSync(sitemapPath)) {
      const stats = fs.statSync(sitemapPath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch (error) {
    // Ignore errors, use current date as fallback
  }
  return new Date().toISOString().split('T')[0];
}

function generateSitemapIndex() {
  // Generate wiki and posts sitemaps first
  const wikiGenerated = generateWikiSitemap();
  const postsGenerated = generatePostsSitemap();

  // Sitemaps to include in the index
  const sitemaps = ['sitemap.xml']; // Core sitemap from Next.js
  if (wikiGenerated) sitemaps.push('sitemap-wiki.xml');
  if (postsGenerated) sitemaps.push('sitemap-posts.xml');

  // Filter to only include sitemaps that actually exist
  const existingSitemaps = sitemaps.filter((sitemap) => {
    const sitemapPath = path.join(outDir, sitemap);
    return fs.existsSync(sitemapPath);
  });

  if (existingSitemaps.length === 0) {
    console.error('❌ No sitemap files found. Run "npm run build" first.');
    process.exit(1);
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${existingSitemaps
  .map((sitemap) => {
    const sitemapPath = path.join(outDir, sitemap);
    const lastmod = getLastModified(sitemapPath);
    return `  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
  })
  .join('\n')}
</sitemapindex>`;

  const indexPath = path.join(outDir, 'sitemap_index.xml');
  fs.writeFileSync(indexPath, sitemapIndex, 'utf8');
  console.log(`✓ Generated sitemap_index.xml at ${indexPath}`);
  console.log(`  Included ${existingSitemaps.length} sitemap(s):`);
  existingSitemaps.forEach((sitemap) => console.log(`    - ${sitemap}`));
}

// Copy index.html to 404.html for GitHub Pages client-side routing
function setup404Page() {
  try {
    const indexPath = path.join(outDir, 'index.html');
    const notFoundPath = path.join(outDir, '404.html');
    
    if (!fs.existsSync(indexPath)) {
      console.error('❌ Error: index.html not found. Run "npm run build" first.');
      return false;
    }
    
    // Copy index.html to 404.html
    // This allows GitHub Pages to serve the Next.js app for 404s,
    // enabling client-side routing to work properly
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✓ Copied index.html to 404.html for GitHub Pages routing');
    return true;
  } catch (error) {
    console.error('❌ Error setting up 404 page:', error.message);
    return false;
  }
}

// Copy CNAME file to out directory for custom domain support
function setupCNAME() {
  try {
    const cnameSource = path.join(process.cwd(), 'CNAME');
    const cnameDest = path.join(outDir, 'CNAME');
    
    if (!fs.existsSync(cnameSource)) {
      console.log('⚠ CNAME file not found in root directory, skipping...');
      return false;
    }
    
    // Copy CNAME file to out directory
    // This is required for GitHub Pages custom domain configuration
    fs.copyFileSync(cnameSource, cnameDest);
    console.log('✓ Copied CNAME file to out directory');
    return true;
  } catch (error) {
    console.error('❌ Error copying CNAME file:', error.message);
    return false;
  }
}

// Create .nojekyll file to disable Jekyll processing
function setupNoJekyll() {
  try {
    const nojekyllPath = path.join(outDir, '.nojekyll');
    // Create empty .nojekyll file
    fs.writeFileSync(nojekyllPath, '');
    console.log('✓ Created .nojekyll file');
    return true;
  } catch (error) {
    console.error('❌ Error creating .nojekyll file:', error.message);
    return false;
  }
}

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
  console.error(`❌ Error: ${outDir} does not exist. Run 'npm run build' first.`);
  process.exit(1);
}

generateSitemapIndex();
setup404Page();
setupCNAME();
setupNoJekyll();

