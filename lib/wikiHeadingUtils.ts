export function normalizeHeadingText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function slugifyHeading(text: string): string {
  return normalizeHeadingText(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function createUniqueHeadingId(baseText: string, seen: Map<string, number>): string {
  const base = slugifyHeading(baseText) || 'section';
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function extractNodeText(node: any): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractNodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractNodeText(node.props?.children);
  }
  return '';
}
