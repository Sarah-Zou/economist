import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { brandLink, primaryButton } from '@/lib/brandStyles';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Thank You | Pricing Strategy Session Request Received | Sarah Zou',
  description:
    'Thank you for applying for the 90-minute pricing strategy session. Your request has been received and will be reviewed shortly.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://sarahzou.com/thanks/pricing-strategy-session',
  },
  openGraph: {
    title: 'Thank You | Pricing Strategy Session Request Received | Sarah Zou',
    description:
      'Thank you for applying for the 90-minute pricing strategy session. Your request has been received and will be reviewed shortly.',
    type: 'website',
    url: 'https://sarahzou.com/thanks/pricing-strategy-session',
  },
};

function LeadEvent() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'lead', {
      event_category: 'consulting',
      event_label: 'pricing_strategy_session_90',
    });
  }
  return null;
}

export default function PricingStrategySessionThanksPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; if (typeof gtag === 'function') { gtag('event', 'lead', { event_category: 'consulting', event_label: 'pricing_strategy_session_90' }); }`,
        }}
      />
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#f6f7f9] py-20">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-8 md:p-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#c2410c] flex-shrink-0" />
              <h1 className="font-serif-playfair text-[28px] sm:text-[32px] font-bold text-[#1f2933]">
                Thanks—your request is in
              </h1>
            </div>
            <p className="mb-6 text-[#1f2933] text-base sm:text-[17px] leading-[1.65] max-w-lg">
              I’ve received your request for the 90-minute pricing strategy session. I’ll review what you shared and
              reply by email with next steps and proposed times.
            </p>

            <div className="w-full space-y-4 mb-8">
              <Link
                href="/book"
                className={cn(primaryButton, 'inline-block px-8 py-4 text-center w-full sm:w-auto')}
              >
                Prefer live scheduling? Book a free 15-min consult
              </Link>
              <div className="text-sm text-[#3b4652] max-w-lg mx-auto text-left">
                <p className="mb-2">From here you can:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>wait for my email reply with suggested times, or</li>
                  <li>grab a quick 15-minute slot to clarify fit and timing.</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 space-x-4">
              <Link href="/consulting" className={cn(brandLink, 'text-base')}>
                Back to consulting
              </Link>
              <span className="text-[#9ca3af]">·</span>
              <Link href="/" className={cn(brandLink, 'text-base')}>
                Return home
              </Link>
            </div>

            <p className="mt-8 text-xs text-[#3b4652] max-w-lg mx-auto">
              I usually reply within 24–48 hours on weekdays. If you don’t see a note from me, please check spam or
              promotions.
            </p>
          </div>
        </div>
      </section>
      <LeadEvent />
    </>
  );
}

