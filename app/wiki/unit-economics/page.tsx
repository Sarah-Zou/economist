import type { Metadata } from 'next'
import WikiAreaHub from '@/components/wiki/WikiAreaHub'
import { UNIT_ECONOMICS_HUB } from '@/lib/wiki-hub-data'

export const metadata: Metadata = {
  title: 'Unit Economics Wiki for Tech Founders | Sarah Zou',
  description: UNIT_ECONOMICS_HUB.description,
  alternates: { canonical: 'https://sarahzou.com/wiki/unit-economics' },
  openGraph: {
    title: 'Unit Economics Wiki for Tech Founders | Sarah Zou',
    description: UNIT_ECONOMICS_HUB.description,
    url: 'https://sarahzou.com/wiki/unit-economics',
    siteName: 'Sarah Zou',
    type: 'website',
  },
}

export default function UnitEconomicsHubPage() {
  return <WikiAreaHub config={UNIT_ECONOMICS_HUB} />
}
