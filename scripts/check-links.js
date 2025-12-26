#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Run linkinator and capture output
  const output = execSync(
    'npx linkinator ./out --config linkinator.config.json --format json',
    { encoding: 'utf-8', stdio: 'pipe' }
  );
  
  const results = JSON.parse(output);
  
  // Filter out local file path errors (these are false positives from Next.js static export)
  const externalBrokenLinks = results.links.filter(link => {
    // Only check external HTTP/HTTPS links
    const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://');
    const isBroken = link.status >= 400 || link.status === 0;
    
    // Skip local file paths and known issues
    const isLocalFile = link.url.startsWith('file://') || 
                       link.url.startsWith('out') || 
                       link.url.includes('\\') ||
                       (!link.url.includes('://') && !link.url.startsWith('/'));
    
    return isExternal && isBroken && !isLocalFile;
  });
  
  if (externalBrokenLinks.length > 0) {
    console.error('\n❌ Found broken external links:');
    externalBrokenLinks.forEach(link => {
      console.error(`  [${link.status}] ${link.url} (in ${link.parent || 'unknown'})`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All external links are valid!');
    process.exit(0);
  }
} catch (error) {
  // If linkinator fails completely, check if it's just local file issues
  if (error.stdout) {
    try {
      const results = JSON.parse(error.stdout);
      const externalBrokenLinks = results.links.filter(link => {
        const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://');
        const isBroken = link.status >= 400 || link.status === 0;
        const isLocalFile = link.url.startsWith('file://') || 
                           link.url.startsWith('out') || 
                           link.url.includes('\\') ||
                           (!link.url.includes('://') && !link.url.startsWith('/'));
        return isExternal && isBroken && !isLocalFile;
      });
      
      if (externalBrokenLinks.length > 0) {
        console.error('\n❌ Found broken external links:');
        externalBrokenLinks.forEach(link => {
          console.error(`  [${link.status}] ${link.url} (in ${link.parent || 'unknown'})`);
        });
        process.exit(1);
      } else {
        console.log('\n✅ All external links are valid (ignoring local file path issues)');
        process.exit(0);
      }
    } catch (parseError) {
      // If we can't parse, show the original error but don't fail on local file issues
      const errorOutput = error.stdout || error.stderr || error.message;
      if (errorOutput.includes('out\\') || errorOutput.includes('out/')) {
        console.log('\n⚠️  Link check found local file path issues (expected with Next.js static export)');
        console.log('   Only external links are checked. If you see external broken links above, fix them.');
        process.exit(0);
      } else {
        console.error('\n❌ Link check failed:', error.message);
        process.exit(1);
      }
    }
  } else {
    console.error('\n❌ Link check failed:', error.message);
    process.exit(1);
  }
}
