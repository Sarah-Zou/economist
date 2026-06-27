import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Contact Sarah Zou | Pricing & Commercial Strategy for Infrastructure & Data Platforms",
  description: "Get in touch about pricing, commercial strategy, and unit economics for infrastructure and data-platform companies. Request a free one-page diagnostic note or book a consult.",
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
    title: "Contact Sarah Zou | Pricing & Commercial Strategy for Infrastructure & Data Platforms",
    description: "Get in touch about pricing, commercial strategy, and unit economics for infrastructure and data-platform companies. Request a free one-page diagnostic note or book a consult.",
    type: "website",
    url: "https://sarahzou.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sarah Zou | Pricing & Commercial Strategy for Infrastructure & Data Platforms",
    description: "Get in touch about pricing, commercial strategy, and unit economics for infrastructure and data-platform companies. Request a free one-page diagnostic note or book a consult.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}

