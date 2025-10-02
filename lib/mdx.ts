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
  concepts: string[];
  relatedCategories: Array<{
    title: string;
    slug: string;
    summary: string;
  }>;
}

export function getAllCategorySlugs(): string[] {
  try {
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
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Parse the content to extract concepts and related categories
    const concepts: string[] = [];
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
        concepts.push(line.trim().replace(/^- \*\*/, '').replace(/\*\*: /, ': '));
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
