import Link from 'next/link'

interface CategoryCardProps {
  title: string
  slug: string
  summary: string
  tags: string[]
  level: string
  icon?: string
  image?: string
}

export default function CategoryCard({ title, slug, summary, level, image }: CategoryCardProps) {
  return (
    <Link href={`/wiki/pricing/${slug}`} className="block group">
      <div
        className="relative h-64 w-full overflow-hidden rounded-[1.45rem] bg-[#f3ede5] p-2.5 shadow-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-card-hover"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : 'linear-gradient(135deg, #eadfd5 0%, #f7f4f0 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative h-full overflow-hidden rounded-[1.05rem]">
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,40,0.8),rgba(16,24,40,0.22),rgba(16,24,40,0.04))] transition-all duration-300 group-hover:opacity-90"></div>

          {/* Content */}
          <div className="relative flex h-full flex-col justify-end p-6">
            {/* Title - positioned at mid-bottom, moves up on hover */}
            <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/72">
                {level}
              </p>
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">{title}</h3>
            </div>

            {/* Summary - appears on hover */}
            <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="mt-2 text-sm leading-relaxed text-white/88 drop-shadow-md">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
