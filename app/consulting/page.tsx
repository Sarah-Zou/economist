import Seo from '@/components/Seo'
import ContactCTA from '@/components/ContactCTA'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'

const services = [
  {
    title: "Pricing & Monetization Blueprint",
    question: "What price model maximises NRR & ARPU?",
    deliverables: [
      "Willingness-to-Pay study",
      "Pricing & packaging design",
      "Behavioral pricing tactics"
    ],
    duration: "4 weeks",
    image: "/images/service1.jpg"
  },
  {
    title: "Pricing Experiment Sprint",
    question: "How fast can we validate a new tier?",
    deliverables: [
      "Experiment design",
      "Revenue-impact forecast",
      "Launch playbook"
    ],
    duration: "2 weeks",
    image: "/images/service2.jpg"
  },
  {
    title: "Metrics Analytics & Dashboards",
    question: "Can leadership see the right KPIs instantly?",
    deliverables: [
      "Metric inventory & definitions",
      "BI dashboard (Looker/Mode/Fivetran)"
    ],
    duration: "3 weeks",
    image: "/images/service3.jpg"
  },
  {
    title: "Investor-Grade KPI Pack",
    question: "Do our numbers withstand diligence scrutiny?",
    deliverables: [
      "Clean KPI workbook",
      "Benchmark commentary",
      "3-slide insert for deck"
    ],
    duration: "1 week",
    image: "/images/service4.jpg"
  },
  {
    title: "Fractional Economist Retainer",
    question: "We need board-level economic firepower each month.",
    deliverables: [
      "Monthly KPI review call",
      "Scenario models on demand",
      "Quarterly pricing refresh"
    ],
    duration: "Ongoing (≥6 mo)",
    image: "/images/service5.jpg"
  },
  {
    title: "Economic Impact Study",
    question: "How do we prove ROI to prospects & press?",
    deliverables: [
      "Original data study (100-hr desk + survey)",
      "Designed report & PR toolkit"
    ],
    duration: "6–8 weeks",
    image: "/images/service6.jpg"
  }
]

const testimonials = [
  {
    name: "Maya Levin",
    title: "CFO, CloudLoop",
    quote: "Sarah reframed our pricing in one two-week sprint. We unlocked a 19 % ARR lift and cut churn by a third—without touching the product roadmap."
  },
  {
    name: "James O'Brien",
    title: "Founder & CEO, Datamatic AI",
    quote: "Her AI-SaaS Index pinpointed where we lagged peers. With the new dashboards, revenue beat plan by Q2."
  },
  {
    name: "Priya Shah",
    title: "Partner, Vertex Ventures",
    quote: "Sarah turned dense metrics into a compelling deck. Our portfolio company closed a $12 M Series A in just six weeks."
  }
]

export default function Consulting() {
  return (
    <>
      <Seo
        title="SaaS & AI Consulting Services | Pricing, Metrics, and Growth | Sarah Zou"
        description="Explore consulting services from Sarah Zou, PhD: pricing strategy, SaaS metrics, investor communications, and AI-driven growth. Tailored solutions for SaaS founders and tech leaders."
        path="/consulting"
      />
      <section className="py-20 bg-[#f5f5f5] min-h-screen">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif-playfair text-4xl font-bold mb-6 text-[#111]">Consulting Services</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Expert guidance to help your SaaS business thrive in today's competitive landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24 border-t border-b border-[#e5e7eb] bg-white py-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center px-4 text-center">
                <div className="relative w-64 h-40 mb-4 rounded-2xl overflow-hidden border border-[#e5e7eb] bg-[#f5f5f5] flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={256}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs text-left">
                    {service.title}
                  </div>
                </div>
                <div className="font-serif-playfair text-lg font-bold mb-1 text-[#111]">{service.title}</div>
                <div className="text-sm italic text-gray-600 mb-2">{service.question}</div>
                <ul className="text-gray-700 mb-2 text-sm list-disc list-inside text-left mx-auto mt-2" style={{maxWidth:'220px'}}>
                  {service.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 mb-3 w-full text-left pl-2">Duration: {service.duration}</div>
                <a
                  href="https://calendly.com/sarahz-saas-economist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff5722] font-medium hover:underline flex items-center gap-1 text-sm"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="font-serif-playfair text-2xl font-bold mb-8 text-center text-[#ff5722]">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactCTA variant="section" />
          </div>
        </div>
      </section>
    </>
  )
} 