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
                </div>
                <div className="font-serif-playfair text-lg font-bold mb-1">{service.title}</div>
                <div className="text-sm italic mb-2">{service.hero}</div>
                <Link
                  href={`/consulting/services/${service.slug}`}
                  className="text-[#ff5722] font-medium hover:underline flex items-center gap-1 text-sm mt-2"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
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