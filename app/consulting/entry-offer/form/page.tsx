import type { Metadata } from 'next';
import EntryOfferFormClient from './EntryOfferFormClient';

export const metadata: Metadata = {
  title: 'Apply for 90-Minute Pricing Strategy Session | Sarah Zou',
  description:
    'Short application form for the 90-minute pricing strategy session for AI and SaaS founders. Share a few details so we can make the session as useful as possible.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://sarahzou.com/consulting/entry-offer/form',
  },
  openGraph: {
    title: 'Apply for 90-Minute Pricing Strategy Session | Sarah Zou',
    description:
      'Apply for a focused 90-minute pricing strategy session. For AI and SaaS founders who need a clear pricing direction on model, value metric, and packaging.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/entry-offer/form',
  },
};

export default function EntryOfferFormPage() {
  return <EntryOfferFormClient />;
}

