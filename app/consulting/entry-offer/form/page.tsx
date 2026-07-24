import type { Metadata } from 'next'
import ClientRedirect from '@/components/ClientRedirect'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://sarahzou.com/consulting',
  },
}

export default function EntryOfferFormPage() {
  return <ClientRedirect to="/consulting" />
}
