import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SaaS Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
  description: "Weekly insights on SaaS pricing strategies, metrics analysis, and growth optimization. Join 2,000+ founders getting actionable economic insights for their SaaS business.",
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
    title: "SaaS Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
    description: "Weekly insights on SaaS pricing strategies, metrics analysis, and growth optimization. Join 2,000+ founders getting actionable economic insights for their SaaS business.",
    type: "website",
    url: "https://sarahzou.com/newsletter",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Economics Newsletter | Pricing & Growth Insights | Sarah Zou",
    description: "Weekly insights on SaaS pricing strategies, metrics analysis, and growth optimization. Join 2,000+ founders getting actionable economic insights for their SaaS business.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}







