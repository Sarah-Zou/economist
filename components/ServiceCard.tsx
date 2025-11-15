import { Button } from './ui/button'
import ContactCTA from './ContactCTA'

interface ServiceCardProps {
  title: string
  description: string
}

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-[20px] font-semibold text-[#1f2933] mb-4">{title}</h3>
      <p className="text-[#1f2933] mb-6 text-base sm:text-[17px] leading-[1.65]">{description}</p>
      <ContactCTA variant="inline" />
    </div>
  )
}

export default ServiceCard 