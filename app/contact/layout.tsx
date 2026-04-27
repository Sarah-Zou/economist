import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Contact Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS",
  description: "Get in touch about commercial strategy, pricing, GTM economics, fractional support, or embedded and full-time roles. Book a free consult or send a message — reply in 1–2 business days.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://sarahzou.com/contact",
  },
  openGraph: {
    title: "Contact Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS",
    description: "Get in touch about commercial strategy, pricing, GTM economics, fractional support, or embedded and full-time roles. Book a free consult or send a message.",
    type: "website",
    url: "https://sarahzou.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sarah Zou | Commercial Strategy, Pricing & Growth Economics for AI SaaS",
    description: "Get in touch about commercial strategy, pricing, GTM economics, fractional support, or embedded and full-time roles. Book a free consult or send a message.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}

