import { WikiHubRow } from './WikiHubPrimitives'

interface CategoryCardProps {
  title: string
  slug: string
  summary: string
  level: string
  conceptCount?: number
}

export default function CategoryCard({
  title,
  slug,
  summary,
  level,
  conceptCount,
}: CategoryCardProps) {
  return (
    <WikiHubRow
      href={`/wiki/pricing/${slug}`}
      title={title}
      summary={summary}
      eyebrow={level}
      meta={
        typeof conceptCount === 'number'
          ? `${conceptCount} ${conceptCount === 1 ? 'concept' : 'concepts'}`
          : undefined
      }
    />
  )
}
