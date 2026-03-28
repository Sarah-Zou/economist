import type { Metadata } from 'next'
import EntryOfferFormClient from '@/app/consulting/entry-offer/form/EntryOfferFormClient'

export const metadata: Metadata = {
  title: 'Apply for 90-Minute Pricing Strategy Session | Sarah Zou',
  description:
    'Request the 90-minute pricing strategy session. Share a few details so I can quickly assess fit and make the session useful from the start.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://sarahzou.com/entry-offer/form',
  },
  openGraph: {
    title: 'Apply for 90-Minute Pricing Strategy Session | Sarah Zou',
    description:
      'Apply for a focused 90-minute pricing strategy session. For AI and SaaS founders who need a clear pricing direction on model, value metric, and packaging.',
    type: 'website',
    url: 'https://sarahzou.com/entry-offer/form',
  },
}

export default function EntryOfferFormPage() {
  return <EntryOfferFormClient />
}

