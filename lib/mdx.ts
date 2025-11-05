import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/wiki/categories');

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
      .map(name => name.replace(/\.md$/, ''));
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
          const slug = url.replace('/wiki/pricing/', '');
          relatedCategories.push({
            title,
            slug,
            summary: '' // Would need to be populated from the actual category data
          });
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
