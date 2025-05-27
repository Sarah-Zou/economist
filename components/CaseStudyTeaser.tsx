import Image from 'next/image'

interface CaseStudyTeaserProps {
  image: string
  impact: string
}

const CaseStudyTeaser = ({ image, impact }: CaseStudyTeaserProps) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <div className="relative h-48 md:h-64">
        <Image
          src={image}
          alt="Case study"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-gray-600">{impact}</p>
      </div>
    </div>
  )
}

export default CaseStudyTeaser 