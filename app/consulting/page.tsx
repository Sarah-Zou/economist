"use client";

import Seo from '@/components/Seo'
import ContactCTA from '@/components/ContactCTA'
import TestimonialCard from '@/components/TestimonialCard'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const services = [
  {
    slug: 'pricing-diagnostic-revenue-boost',
    title: 'Pricing Quickstart',
    hero: 'Find hidden ARR in 14 days.',
    summary: 'Health scorecard, uplift roadmap, and strategy call.',
    image: '/images/P-1.webp',
  },
  {
    slug: 'rapid-pricing-experiment-toolkit',
    title: 'Price Experiment Build',
    hero: 'A/B test pricing like a product feature—no engineering bottlenecks.',
    summary: 'Experiment sheets, dashboard, and coaching.',
    image: '/images/P-4.webp',
  },
  {
    slug: 'pricing-optimization-retainer',
    title: 'Pricing Optimization Retainer',
    hero: 'Continuous pricing edge without hiring a full team.',
    summary: 'Quarterly review, experiment feedback, and hotline.',
    image: '/images/P-8.webp',
  },
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


function ConsultingContent() {

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


          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/consulting/services/${service.slug}`}
                className="block group"
              >
                <div 
                  className="relative h-64 w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${service.image})`,
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
                      <h3 className="text-xl font-bold text-white drop-shadow-lg mb-2">
                        {service.title}
                      </h3>
                      <p className="text-white text-sm font-medium drop-shadow-md">
                        {service.hero}
                      </p>
                    </div>
                    
                    {/* Summary - appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-white text-sm leading-relaxed mt-2 drop-shadow-md">
                        {service.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Testimonials section commented out */}
          {false && (
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="font-serif-playfair text-2xl font-bold mb-8 text-center text-[#ff5722]">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* {testimonials.map((t, i) => (
                <TestimonialCard key={i} name={t.name} title={t.title} quote={t.quote} />
              ))} */}
            </div>
          </div>
          )}

          <div className="max-w-2xl mx-auto">
            <ContactCTA variant="section" />
          </div>
        </div>
      </section>
    </>
  )
}

export default function Consulting() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultingContent />
    </Suspense>
  );
} 