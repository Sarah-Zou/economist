import type { Metadata } from 'next'
import WikiAreaHub from '@/components/wiki/WikiAreaHub'
import { BUSINESS_MODELS_HUB } from '@/lib/wiki-hub-data'

export const metadata: Metadata = {
  title: 'Business Models Wiki for Tech Founders | Sarah Zou',
  description: BUSINESS_MODELS_HUB.description,
  alternates: { canonical: 'https://sarahzou.com/wiki/business-models' },
  openGraph: {
    title: 'Business Models Wiki for Tech Founders | Sarah Zou',
    description: BUSINESS_MODELS_HUB.description,
    url: 'https://sarahzou.com/wiki/business-models',
    siteName: 'Sarah Zou',
    type: 'website',
  },
}

export default function BusinessModelsHubPage() {
  return <WikiAreaHub config={BUSINESS_MODELS_HUB} />
}
