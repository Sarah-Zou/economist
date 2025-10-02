import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  level: string;
  icon?: string;
  image?: string;
}

export default function CategoryCard({ 
  title, 
  slug, 
  summary, 
  tags, 
  level,
  icon,
  image 
}: CategoryCardProps) {
  return (
    <Link
      href={`/wiki/pricing/${slug}`}
      className="block group"
    >
      <div 
        className="relative h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
        style={{
          backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* Title - positioned at mid-bottom, moves up on hover */}
          <div className="transform group-hover:-translate-y-4 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {title}
            </h3>
          </div>
          
          {/* Summary - appears on hover */}
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
