import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/wiki/categories');
const conceptsDirectory = path.join(process.cwd(), 'content/wiki/concepts');
const PLACEHOLDER_PATTERN =
  /(coming soon|content coming soon|currently working on developing detailed content|check back soon)/i;

export type WikiContentStatus = 'published' | 'draft' | 'retired';

export interface CategoryFrontmatter {
  title: string;
  slug: string;
  summary: string;
  updated: string;
  level: string;
  tags: string[];
  canonical: string;
  status?: WikiContentStatus;
  redirectTo?: string;
}

export interface CategoryData extends CategoryFrontmatter {
  status: WikiContentStatus;
  redirectTo?: string;
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

interface VisibilityOptions {
  includeNonPublished?: boolean;
}

function normalizeStatus(rawStatus: unknown): WikiContentStatus {
  if (rawStatus === 'published' || rawStatus === 'draft' || rawStatus === 'retired') {
    return rawStatus;
  }
  return 'published';
}

function normalizeWikiPath(rawPath: string): string {
  if (!rawPath) {
    return '/';
  }
  const withSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return withSlash === '/' ? withSlash : withSlash.replace(/\/+$/, '');
}

function isValidSlug(slug: string): boolean {
  return (
    !!slug &&
    slug.length > 0 &&
    !slug.includes('http://') &&
    !slug.includes('https://') &&
    !slug.includes('://') &&
    !slug.startsWith('/')
  );
}

function readCategoryFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

function extractConcepts(content: string): Array<{ text: string; id?: string }> {
  const concepts: Array<{ text: string; id?: string }> = [];
  const lines = content.split('\n');
  let inConceptsSection = false;

  for (const line of lines) {
    if (line.includes('## What\'s in this category')) {
      inConceptsSection = true;
      continue;
    }
    if (line.includes('## ')) {
      inConceptsSection = false;
      continue;
    }

    if (!inConceptsSection || !line.trim().startsWith('- **')) {
      continue;
    }

    const lineContent = line.trim();
    const spanMatch = lineContent.match(/<span id="([^"]+)">([^<]+)<\/span>/);
    if (spanMatch) {
      const [, id, conceptName] = spanMatch;
      const descMatch = lineContent.match(/:\s*(.+)$/);
      const fullText = descMatch ? `${conceptName}: ${descMatch[1]}` : conceptName;
      concepts.push({ text: fullText, id });
      continue;
    }

    const textOnly = lineContent.replace(/^- \*\*/, '').replace(/\*\*: /, ': ').replace(/<[^>]+>/g, '');
    concepts.push({ text: textOnly });
  }

  return concepts;
}

function extractRelatedCategories(content: string): Array<{ title: string; slug: string; summary: string }> {
  const relatedCategories: Array<{ title: string; slug: string; summary: string }> = [];
  const lines = content.split('\n');
  let inRelatedSection = false;

  for (const line of lines) {
    if (line.includes('## Related categories')) {
      inRelatedSection = true;
      continue;
    }
    if (line.includes('## ')) {
      inRelatedSection = false;
      continue;
    }
    if (!inRelatedSection || !line.includes('[')) {
      continue;
    }

    const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) {
      continue;
    }

    const title = match[1];
    const url = match[2];
    let slug = '';

    if (url.includes('/wiki/pricing/')) {
      const parts = url.split('/wiki/pricing/');
      if (parts.length > 1) {
        slug = parts[1];
      }
    } else if (url.startsWith('/wiki/pricing/')) {
      slug = url.replace('/wiki/pricing/', '');
    }

    slug = slug.split('#')[0].split('?')[0].replace(/\/$/, '');
    if (!isValidSlug(slug)) {
      continue;
    }

    relatedCategories.push({ title, slug, summary: '' });
  }

  return relatedCategories;
}

function isCategoryPublished(slug: string): boolean {
  const categoryFile = readCategoryFile(slug);
  if (!categoryFile) {
    return false;
  }
  const frontmatter = categoryFile.data as unknown as Partial<CategoryFrontmatter>;
  return normalizeStatus(frontmatter.status) === 'published';
}

export function getAllCategorySlugs(options: VisibilityOptions = {}): string[] {
  const { includeNonPublished = false } = options;
  try {
    if (!fs.existsSync(contentDirectory)) {
      console.warn('Content directory does not exist:', contentDirectory);
      return [];
    }
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''))
      .filter((slug) => isValidSlug(slug))
      .filter((slug) => {
        if (includeNonPublished) {
          return true;
        }
        const category = getCategoryBySlug(slug, { includeNonPublished: true });
        return category?.status === 'published';
      });
  } catch (error) {
    console.error('Error reading category directory:', error);
    return [];
  }
}

export function getCategoryBySlug(slug: string, options: VisibilityOptions = {}): CategoryData | null {
  const { includeNonPublished = false } = options;
  try {
    const categoryFile = readCategoryFile(slug);
    if (!categoryFile) {
      return null;
    }
    const { data, content } = categoryFile;
    const frontmatter = data as unknown as CategoryFrontmatter;
    const status = normalizeStatus(frontmatter.status);
    const redirectTo = typeof frontmatter.redirectTo === 'string'
      ? normalizeWikiPath(frontmatter.redirectTo as string)
      : undefined;

    if (!includeNonPublished && status !== 'published') {
      return null;
    }

    const concepts = extractConcepts(content);
    const relatedCategories = extractRelatedCategories(content).filter((related) =>
      isCategoryPublished(related.slug)
    );

    const hasPlaceholderSignals = PLACEHOLDER_PATTERN.test(content);
    if (status === 'published' && hasPlaceholderSignals && concepts.length === 0) {
      console.warn(`Published category "${slug}" appears thin/placeholder.`);
    }

    return {
      ...frontmatter,
      status,
      redirectTo,
      content,
      concepts,
      relatedCategories,
    };
  } catch (error) {
    console.error(`Error reading category ${slug}:`, error);
    return null;
  }
}

export function getAllCategories(options: VisibilityOptions = {}): CategoryData[] {
  const slugs = getAllCategorySlugs(options);
  return slugs
    .map((slug) => getCategoryBySlug(slug, options))
    .filter((category): category is CategoryData => category !== null);
}

export function getPublishedConceptIdsForCategory(categorySlug: string): string[] {
  const category = getCategoryBySlug(categorySlug, { includeNonPublished: true });
  if (!category || category.status !== 'published') {
    return [];
  }

  return category.concepts
    .filter((concept) => concept.id)
    .map((concept) => concept.id as string)
    .filter((conceptId) => getConceptBySlug(categorySlug, conceptId, { includeNonPublished: false }) !== null);
}

export function hasPublishedConceptContent(categorySlug: string): boolean {
  return getPublishedConceptIdsForCategory(categorySlug).length > 0;
}

export interface ConceptFrontmatter {
  title: string;
  metaTitle?: string;
  oneLiner?: string;
  prereqs?: string[];
  tags?: string[];
  readingTime?: number;
  publishedAt?: string;
  lastUpdated?: string;
  owner?: string;
  references?: Array<{
    title: string;
    url: string;
    source?: string;
  }>;
  relatedConcepts?: string[];
  status?: WikiContentStatus;
  redirectTo?: string;
  canonical?: string;
}

export interface ConceptData extends ConceptFrontmatter {
  status: WikiContentStatus;
  redirectTo?: string;
  content: string;
}

export function getConceptBySlug(
  category: string,
  concept: string,
  options: VisibilityOptions = {}
): ConceptData | null {
  const { includeNonPublished = false } = options;
  const categoryData = getCategoryBySlug(category, { includeNonPublished: true });
  if (!categoryData) {
    return null;
  }
  if (!includeNonPublished && categoryData.status !== 'published') {
    return null;
  }

  const fullPath = path.join(conceptsDirectory, category, `${concept}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const conceptFrontmatter = data as unknown as ConceptFrontmatter;
    const status = normalizeStatus(conceptFrontmatter.status);
    const redirectTo = typeof conceptFrontmatter.redirectTo === 'string'
      ? normalizeWikiPath(conceptFrontmatter.redirectTo)
      : undefined;

    if (!includeNonPublished && status !== 'published') {
      return null;
    }

    return {
      ...conceptFrontmatter,
      status,
      redirectTo,
      content,
    };
  } catch (error) {
    console.error(`Error reading concept ${category}/${concept}:`, error);
    return null;
  }
}

export function getAllPublishedWikiUrls(): Set<string> {
  const urls = new Set<string>();
  const categories = getAllCategories();
  for (const category of categories) {
    urls.add(`/wiki/pricing/${category.slug}`);
    for (const conceptId of getPublishedConceptIdsForCategory(category.slug)) {
      urls.add(`/wiki/pricing/${category.slug}/${conceptId}`);
    }
  }
  return urls;
}

export function getWikiRemediationMap(): {
  redirects: Map<string, string>;
  gone: Set<string>;
  gonePrefixes: Set<string>;
} {
  const redirects = new Map<string, string>();
  const gone = new Set<string>();
  const gonePrefixes = new Set<string>();

  const categories = getAllCategories({ includeNonPublished: true });
  for (const category of categories) {
    const categoryPath = `/wiki/pricing/${category.slug}`;
    if (category.status === 'retired') {
      if (category.redirectTo) {
        redirects.set(categoryPath, normalizeWikiPath(category.redirectTo));
      } else {
        gone.add(categoryPath);
        gonePrefixes.add(`${categoryPath}/`);
      }
    }

    for (const concept of category.concepts) {
      if (!concept.id) {
        continue;
      }
      const conceptPath = `/wiki/pricing/${category.slug}/${concept.id}`;
      const conceptData = getConceptBySlug(category.slug, concept.id, { includeNonPublished: true });

      if (category.status === 'retired') {
        if (category.redirectTo) {
          redirects.set(conceptPath, normalizeWikiPath(category.redirectTo));
        } else {
          gone.add(conceptPath);
        }
        continue;
      }

      if (!conceptData) {
        continue;
      }

      if (conceptData.status === 'retired') {
        if (conceptData.redirectTo) {
          redirects.set(conceptPath, normalizeWikiPath(conceptData.redirectTo));
        } else {
          gone.add(conceptPath);
        }
      }
    }
  }

  return { redirects, gone, gonePrefixes };
}
