import type { Metadata } from 'next'
import ClientRedirect from '@/components/ClientRedirect'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://sarahzou.com/diagnostic-note',
  },
}

export default function EntryOfferFormAliasPage() {
  return <ClientRedirect to="/diagnostic-note" />
}
