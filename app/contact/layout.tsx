import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Contact Sarah Zou | Pricing & Metrics for Seed–Series A Startups",
  description: "Contact for pricing sprint, metrics sprint, or fractional chief economist. SaaS, APIs & AI. Book a free 15-min call or send a message—reply in 1–2 business days.",
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
    title: "Contact Sarah Zou | Pricing & Metrics for Seed–Series A Startups",
    description: "Contact for pricing sprint, metrics sprint, or fractional chief economist. SaaS, APIs & AI. Book a free 15-min call or send a message—reply in 1–2 business days.",
    type: "website",
    url: "https://sarahzou.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sarah Zou | Pricing & Metrics for Seed–Series A Startups",
    description: "Contact for pricing sprint, metrics sprint, or fractional chief economist. SaaS, APIs & AI. Book a free 15-min call or send a message—reply in 1–2 business days.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}

