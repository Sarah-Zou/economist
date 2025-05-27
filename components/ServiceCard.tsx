import { Button } from './ui/button'
import ContactCTA from './ContactCTA'

interface ServiceCardProps {
  title: string
  description: string
}

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ContactCTA variant="button" />
    </div>
  )
}

export default ServiceCard 