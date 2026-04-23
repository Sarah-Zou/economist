import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | Entry Offer Request Received | Sarah Zou',
  description:
    'Thank you for applying for the 90-minute pricing strategy session. Your request has been received and will be reviewed shortly.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://sarahzou.com/thanks/entry-offer',
  },
  openGraph: {
    title: 'Thank You | Entry Offer Request Received | Sarah Zou',
    description:
      'Thank you for applying for the 90-minute pricing strategy session. Your request has been received and will be reviewed shortly.',
    type: 'website',
    url: 'https://sarahzou.com/thanks/entry-offer',
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

export default function EntryOfferThanksPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; if (typeof gtag === 'function') { gtag('event', 'lead', { event_category: 'consulting', event_label: 'pricing_strategy_session_90' }); }`,
        }}
      />
      <div className="min-h-screen bg-page selection:bg-brand-soft selection:text-brand-ink">
        <main className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-white border border-border-subtle rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-brand flex-shrink-0" aria-hidden />
                <h1 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text">
                  Thanks—your request is in
                </h1>
              </div>
              <p className="mb-6 text-base sm:text-[17px] text-text leading-[1.65] max-w-lg">
                I’ve received your request for the 90-minute pricing strategy session. I’ll review what you shared and
                reply by email with next steps and proposed times.
              </p>

              <div className="w-full space-y-4 mb-8">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-brand hover:bg-brand-ink text-brand-on rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md"
                >
                  Prefer live scheduling? Book a free 15-min consult
                </Link>
                <div className="text-sm text-text-muted max-w-lg mx-auto text-left leading-[1.65]">
                  <p className="mb-2">From here you can:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>wait for my email reply with suggested times, or</li>
                    <li>grab a quick 15-minute slot to clarify fit and timing.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <Link
                  href="/consulting/entry-offer"
                  className="text-brand-ink underline decoration-2 underline-offset-2 hover:text-brand-ink/90 font-medium text-base"
                >
                  Back to entry offer
                </Link>
                <span className="text-[#9ca3af]" aria-hidden>·</span>
                <Link
                  href="/consulting"
                  className="text-brand-ink underline decoration-2 underline-offset-2 hover:text-brand-ink/90 font-medium text-base"
                >
                  Consulting
                </Link>
                <span className="text-[#9ca3af]" aria-hidden>·</span>
                <Link
                  href="/"
                  className="text-brand-ink underline decoration-2 underline-offset-2 hover:text-brand-ink/90 font-medium text-base"
                >
                  Home
                </Link>
              </div>

              <p className="mt-8 text-sm text-text-muted max-w-lg mx-auto leading-[1.65]">
                I usually reply within 24–48 hours on weekdays. If you don’t see a note from me, please check spam or
                promotions.
              </p>
            </div>
          </div>
        </main>
      </div>
      <LeadEvent />
    </>
  );
}
