import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/wiki/categories');
const conceptsDirectory = path.join(process.cwd(), 'content/wiki/concepts');

export interface CategoryFrontmatter {
  title: string;
  slug: string;
  summary: string;
  updated: string;
  level: string;
  tags: string[];
  canonical: string;
}

export interface CategoryData extends CategoryFrontmatter {
  content: string;
  concepts: Array<{
    text: string;
    id?: string;
  }>;
  relatedCategories: Array<{
    title: string;
    slug: string;
    summary: string;
  }>;
}

export function getAllCategorySlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn('Content directory does not exist:', contentDirectory);
      return [];
    }
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''))
      .filter(slug => {
        // Ensure slug is valid - no URLs, no special characters that would break paths
        return slug && 
               slug.length > 0 && 
               !slug.includes('http://') && 
               !slug.includes('https://') &&
               !slug.includes('://') &&
               !slug.startsWith('/');
      });
  } catch (error) {
    console.error('Error reading category directory:', error);
    return [];
  }
}

export function getCategoryBySlug(slug: string): CategoryData | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      console.warn('Category file does not exist:', fullPath);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Parse the content to extract concepts and related categories
    const concepts: Array<{ text: string; id?: string }> = [];
    const relatedCategories: Array<{ title: string; slug: string; summary: string }> = [];
    
    // Simple parsing - in a real implementation, you might want to use a proper markdown parser
    const lines = content.split('\n');
    let inConceptsSection = false;
    let inRelatedSection = false;
    
    for (const line of lines) {
      if (line.includes('## What\'s in this category')) {
        inConceptsSection = true;
        inRelatedSection = false;
        continue;
      }
      if (line.includes('## Related categories')) {
        inConceptsSection = false;
        inRelatedSection = true;
        continue;
      }
      if (line.includes('## ')) {
        inConceptsSection = false;
        inRelatedSection = false;
        continue;
      }
      
      if (inConceptsSection && line.trim().startsWith('- **')) {
        const lineContent = line.trim();
        // Extract ID from span tag if present: - **<span id="concept-id">Concept Name</span>**: Description
        const spanMatch = lineContent.match(/<span id="([^"]+)">([^<]+)<\/span>/);
        if (spanMatch) {
          const [, id, conceptName] = spanMatch;
          // Extract description after the colon
          const descMatch = lineContent.match(/:\s*(.+)$/);
          const fullText = descMatch 
            ? `${conceptName}: ${descMatch[1]}`
            : conceptName;
          concepts.push({ text: fullText, id });
        } else {
          // Fallback: extract text without HTML tags
          const textOnly = lineContent.replace(/^- \*\*/, '').replace(/\*\*: /, ': ').replace(/<[^>]+>/g, '');
          concepts.push({ text: textOnly });
        }
      }
      
      if (inRelatedSection && line.includes('[')) {
        const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const title = match[1];
          const url = match[2];
          // Handle both relative paths (/wiki/pricing/...) and full URLs (https://sarahzou.com/wiki/pricing/...)
          let slug = '';
          
          // Extract slug from URL - handle both full URLs and relative paths
          if (url.includes('/wiki/pricing/')) {
            // Extract everything after /wiki/pricing/
            const parts = url.split('/wiki/pricing/');
            if (parts.length > 1) {
              slug = parts[1];
              // Remove trailing slash and any query parameters or fragments
              slug = slug.split('#')[0].split('?')[0].replace(/\/$/, '');
            }
          } else if (url.startsWith('/wiki/pricing/')) {
            // Handle relative paths
            slug = url.replace('/wiki/pricing/', '').split('#')[0].split('?')[0].replace(/\/$/, '');
          }
          
          // Only add if we have a valid slug (not empty and doesn't contain http/https)
          if (slug && slug.length > 0 && !slug.includes('http://') && !slug.includes('https://')) {
            relatedCategories.push({
              title,
              slug,
              summary: '' // Would need to be populated from the actual category data
            });
          }
        }
      }
    }
    
    return {
      ...data as CategoryFrontmatter,
      content,
      concepts,
      relatedCategories
    };
  } catch (error) {
    console.error(`Error reading category ${slug}:`, error);
    return null;
  }
}

export function getAllCategories(): CategoryData[] {
  const slugs = getAllCategorySlugs();
  return slugs
    .map(slug => getCategoryBySlug(slug))
    .filter((category): category is CategoryData => category !== null);
}

export interface ConceptFrontmatter {
  title: string;
  metaTitle?: string;
  oneLiner?: string;
  prereqs?: string[];
  tags?: string[];
  readingTime?: number;
  lastUpdated?: string;
  owner?: string;
}

export interface ConceptData extends ConceptFrontmatter {
  content: string;
}

export function getConceptBySlug(category: string, concept: string): ConceptData | null {
  // #region agent log
  const fullPath = path.join(conceptsDirectory, category, `${concept}.md`);
  const logPath = path.join(process.cwd(), '.cursor', 'debug.log');
  try {
    const logEntry = JSON.stringify({location:'mdx.ts:179',message:'getConceptBySlug entry',data:{category,concept,conceptsDirectory,fullPath,fileExists:fs.existsSync(fullPath)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'}) + '\n';
    fs.appendFileSync(logPath, logEntry, 'utf8');
  } catch {}
  // #endregion
  try {
    if (!fs.existsSync(fullPath)) {
      // #region agent log
      try {
        const logEntry = JSON.stringify({location:'mdx.ts:183',message:'File does not exist',data:{fullPath,conceptsDirectory,category,concept},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'}) + '\n';
        fs.appendFileSync(logPath, logEntry, 'utf8');
      } catch {}
      // #endregion
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    // #region agent log
    try {
      const logEntry = JSON.stringify({location:'mdx.ts:189',message:'File read successfully',data:{contentLength:content.length,hasTitle:!!data.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'}) + '\n';
      fs.appendFileSync(logPath, logEntry, 'utf8');
    } catch {}
    // #endregion
    
    return {
      ...data as ConceptFrontmatter,
      content
    };
  } catch (error) {
    console.error(`Error reading concept ${category}/${concept}:`, error);
    // #region agent log
    try {
      const logEntry = JSON.stringify({location:'mdx.ts:194',message:'Error in getConceptBySlug',data:{errorMessage:error instanceof Error?error.message:String(error),category,concept,fullPath},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'}) + '\n';
      fs.appendFileSync(logPath, logEntry, 'utf8');
    } catch {}
    // #endregion
    return null;
  }
}
