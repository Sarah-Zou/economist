import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '_posts')

export type NewsletterPostStatus = 'published' | 'draft' | 'retired'

export interface Post {
  slug: string
  title: string
  date: string
  author: string
  description: string
  dek?: string
  image: string
  imageAlt?: string
  content: string
  tags: string[]
  canonical?: string
  draft?: boolean
  status: NewsletterPostStatus
}

function getPostStatus(data: Record<string, any>): NewsletterPostStatus {
  if (data.status === 'draft' || data.status === 'retired') return data.status
  return data.draft === true ? 'draft' : 'published'
}

function getFileDate(filePath: string, frontmatterDate: string) {
  // If frontmatter has a date, use it
  if (frontmatterDate) {
    return frontmatterDate
  }
  
  // Otherwise fall back to file creation date
  try {
    const stats = fs.statSync(filePath)
    const d = stats.birthtime
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  } catch {
    return frontmatterDate
  }
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Extract slug after the date (YYYY-MM-DD-)
    const slug = fileName.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const date = getFileDate(fullPath, data.date)

    return {
      slug,
      title: data.title,
      date,
      author: data.author,
      description: data.description,
      dek: data.dek,
      image: data.image,
      imageAlt: data.imageAlt,
      content,
      tags: data.tags || [],
      canonical: data.canonical,
      draft: data.draft,
      status: getPostStatus(data),
    }
  })

  return allPostsData
    .filter((post) => post.status === 'published')
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

const SITE_BASE = 'https://sarahzou.com'

/** Posts suitable for sitemap: not draft, no external canonical. */
export function getIndexablePosts(): Post[] {
  return getAllPosts().filter((post) => {
    if (post.draft === true) return false
    const canon = post.canonical
    if (!canon) return true
    if (!/^https?:\/\//i.test(canon)) return true
    return canon.startsWith(SITE_BASE)
  })
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // Find the file that matches the slug after the date
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.find((name) => name.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.md$/, '') === slug)
    if (!fileName) return null
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const status = getPostStatus(data)
    if (status !== 'published') return null
    const date = getFileDate(fullPath, data.date)

    return {
      slug,
      title: data.title,
      date,
      author: data.author,
      description: data.description,
      dek: data.dek,
      image: data.image,
      imageAlt: data.imageAlt,
      content,
      tags: data.tags || [],
      canonical: data.canonical,
      draft: data.draft,
      status,
    }
  } catch (error) {
    return null
  }
}
