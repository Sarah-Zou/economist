import { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Contact Sarah Zou, PhD | Early-Stage Tech Strategy Consultation",
  description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
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
    title: "Contact Sarah Zou, PhD | Early-Stage Tech Strategy Consultation",
    description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
    type: "website",
    url: "https://sarahzou.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sarah Zou, PhD | Early-Stage Tech Strategy Consultation",
    description: "Get in touch with Sarah Zou, PhD for consulting, speaking engagements, or collaboration. Fill out the contact form or connect via email or LinkedIn.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}

