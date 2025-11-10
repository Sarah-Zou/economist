#!/usr/bin/env node

/**
 * Validate all URLs in sitemaps to ensure no 3xx/4xx responses
 * This script checks that all URLs in the sitemaps are valid and accessible
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const outDir = path.join(process.cwd(), 'out');
const baseUrl = 'https://sarahzou.com';

// Parse XML to extract URLs
function extractUrlsFromSitemap(xmlContent) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

// Check if URL is a sitemap index (contains <sitemapindex>)
function isSitemapIndex(xmlContent) {
  return xmlContent.includes('<sitemapindex');
}

// Fetch and parse sitemap
async function fetchSitemap(sitemapPath) {
  return new Promise((resolve, reject) => {
    const url = sitemapPath.startsWith('http') 
      ? sitemapPath 
      : `${baseUrl}/${path.basename(sitemapPath)}`;
    
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    }).on('error', reject);
  });
}

// Check URL status
async function checkUrlStatus(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        redirect: res.statusCode >= 300 && res.statusCode < 400 ? res.headers.location : null,
      });
      res.destroy();
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: null,
        error: err.message,
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: null,
        error: 'Timeout',
      });
    });
    
    req.setTimeout(10000);
  });
}

async function validateSitemaps() {
  console.log('🔍 Validating sitemap URLs...');
  console.log('⚠️  Note: This validates against the LIVE site. Redirects may occur if site not yet redeployed.\n');

  // Read sitemap_index.xml
  const indexPath = path.join(outDir, 'sitemap_index.xml');
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ sitemap_index.xml not found at ${indexPath}`);
    console.error('   Run "npm run build" first to generate sitemaps.');
    process.exit(1);
  }

  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const sitemapUrls = extractUrlsFromSitemap(indexContent);

  console.log(`Found ${sitemapUrls.length} sitemaps in index:\n`);
  sitemapUrls.forEach((url) => console.log(`  - ${url}`));
  console.log('');

  // Collect all URLs from all sitemaps
  // First try to read from local files, then fall back to fetching from live site
  const allUrls = new Set();
  
  for (const sitemapUrl of sitemapUrls) {
    try {
      let sitemapContent;
      
      // Try to read from local file first
      const sitemapFilename = sitemapUrl.replace(baseUrl + '/', '');
      const localSitemapPath = path.join(outDir, sitemapFilename);
      
      if (fs.existsSync(localSitemapPath)) {
        sitemapContent = fs.readFileSync(localSitemapPath, 'utf8');
      } else {
        // Fall back to fetching from live site
        sitemapContent = await fetchSitemap(sitemapUrl);
      }
      
      if (isSitemapIndex(sitemapContent)) {
        // If it's a sitemap index, extract nested sitemaps
        const nestedSitemaps = extractUrlsFromSitemap(sitemapContent);
        for (const nestedUrl of nestedSitemaps) {
          let nestedContent;
          const nestedFilename = nestedUrl.replace(baseUrl + '/', '');
          const localNestedPath = path.join(outDir, nestedFilename);
          
          if (fs.existsSync(localNestedPath)) {
            nestedContent = fs.readFileSync(localNestedPath, 'utf8');
          } else {
            nestedContent = await fetchSitemap(nestedUrl);
          }
          
          const urls = extractUrlsFromSitemap(nestedContent);
          urls.forEach((url) => allUrls.add(url));
        }
      } else {
        // Regular sitemap, extract URLs
        const urls = extractUrlsFromSitemap(sitemapContent);
        urls.forEach((url) => allUrls.add(url));
      }
    } catch (error) {
      console.error(`❌ Error processing ${sitemapUrl}: ${error.message}`);
    }
  }

  console.log(`\n📋 Found ${allUrls.size} URLs to validate\n`);

  // Validate each URL
  const results = {
    valid: [],
    redirects: [],
    errors: [],
    notFound: [],
  };

  let checked = 0;
  for (const url of allUrls) {
    checked++;
    process.stdout.write(`\rChecking ${checked}/${allUrls.size}: ${url.substring(0, 60)}...`);
    
    const result = await checkUrlStatus(url);
    
    if (result.error) {
      results.errors.push(result);
    } else if (result.status >= 200 && result.status < 300) {
      results.valid.push(result);
    } else if (result.status >= 300 && result.status < 400) {
      results.redirects.push(result);
    } else if (result.status >= 400) {
      results.notFound.push(result);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('\n\n📊 Validation Results:\n');
  console.log(`✅ Valid (2xx): ${results.valid.length}`);
  console.log(`🔄 Redirects (3xx): ${results.redirects.length}`);
  console.log(`❌ Not Found (4xx): ${results.notFound.length}`);
  console.log(`⚠️  Errors: ${results.errors.length}`);

  if (results.redirects.length > 0) {
    console.log('\n🔄 Redirected URLs:');
    results.redirects.forEach((r) => {
      console.log(`  ${r.url} → ${r.redirect || 'unknown'}`);
    });
  }

  if (results.notFound.length > 0) {
    console.log('\n❌ Not Found URLs:');
    results.notFound.forEach((r) => {
      console.log(`  ${r.url} (${r.status})`);
    });
  }

  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors:');
    results.errors.forEach((r) => {
      console.log(`  ${r.url}: ${r.error}`);
    });
  }

  // Exit with error code if there are issues
  if (results.redirects.length > 0 || results.notFound.length > 0 || results.errors.length > 0) {
    console.log('\n❌ Validation failed: Found redirects, 4xx errors, or connection errors');
    process.exit(1);
  } else {
    console.log('\n✅ All URLs are valid!');
    process.exit(0);
  }
}

// Run validation
validateSitemaps().catch((error) => {
  console.error('\n❌ Validation script error:', error);
  process.exit(1);
});

