import type { Metadata } from 'next'
import WikiAreaHub from '@/components/wiki/WikiAreaHub'
import { GO_TO_MARKET_HUB } from '@/lib/wiki-hub-data'

export const metadata: Metadata = {
  title: 'Go-to-Market Wiki for Tech Founders | Sarah Zou',
  description: GO_TO_MARKET_HUB.description,
  alternates: { canonical: 'https://sarahzou.com/wiki/go-to-market' },
  openGraph: {
    title: 'Go-to-Market Wiki for Tech Founders | Sarah Zou',
    description: GO_TO_MARKET_HUB.description,
    url: 'https://sarahzou.com/wiki/go-to-market',
    siteName: 'Sarah Zou',
    type: 'website',
  },
}

export default function GoToMarketHubPage() {
  return <WikiAreaHub config={GO_TO_MARKET_HUB} />
}
