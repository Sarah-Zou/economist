import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tech Startup Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
  description: "Weekly insights on pricing strategies, metrics analysis, and growth optimization for early-stage tech startups. Join 2,000+ founders getting actionable economic insights for their business.",
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
    canonical: "https://sarahzou.com/newsletter",
  },
  openGraph: {
    title: "Tech Startup Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
    description: "Weekly insights on pricing strategies, metrics analysis, and growth optimization for early-stage tech startups. Join 2,000+ founders getting actionable economic insights for their business.",
    type: "website",
    url: "https://sarahzou.com/newsletter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Startup Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
    description: "Weekly insights on pricing strategies, metrics analysis, and growth optimization for early-stage tech startups. Join 2,000+ founders getting actionable economic insights for their business.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}







