'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { primaryButton, outlineButton, brandLink } from '@/lib/brandStyles';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Apply for 90-Minute Pricing Strategy Session | Sarah Zou',
  description:
    'Short application form for the 90-minute pricing strategy session for AI and SaaS founders. Share a few details so we can make the session as useful as possible.',
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
};

const FORM_ACTION = process.env.NEXT_PUBLIC_PRICING_SESSION_FORM_URL || '';
const REDIRECT_URL = 'https://sarahzou.com/thanks/pricing-strategy-session';

type UTMKeys = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term';

export default function EntryOfferFormPage() {
  const [utm, setUtm] = useState<Record<UTMKeys, string>>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  });

  const [sourcePage, setSourcePage] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    const params = url.searchParams;

    const nextUtm: Record<UTMKeys, string> = {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    };

    setUtm(nextUtm);
    setSourcePage(url.pathname + (url.search || ''));
    setPageTitle(document.title || '90-Minute Pricing Strategy Session Application');
  }, []);

  return (
    <section className="bg-[#f5f8f7] min-h-screen py-10 sm:py-14 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact hero */}
        <div className="mb-8 sm:mb-10">
          <h1 className="font-serif-playfair text-[26px] sm:text-[30px] font-bold text-[#1f2933] leading-tight mb-3">
            Apply for a 90-minute pricing session
          </h1>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65] mb-2">
            For Seed to Series A AI and SaaS founders who need a clearer pricing direction before their next launch,
            raise, or big customer push.
          </p>
        </div>

        {/* Benefits / what you get */}
        <div className="bg-white border border-[#e5e7eb] rounded-lg p-4 sm:p-5 mb-8">
          <h2 className="font-serif-playfair text-[18px] sm:text-[20px] font-semibold text-[#1f2933] mb-2">
            In this session, you’ll get:
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-[15px] text-[#1f2933] leading-[1.6]">
            <li>a clearer recommendation on pricing model and value metric</li>
            <li>concrete guidance on packages, tiers, and entry offer</li>
            <li>a short memo within 48 hours with risks and next steps</li>
            <li>a chance to pressure-test your current or planned pricing</li>
          </ul>
        </div>

        {/* Trust / expectations (small box above form) */}
        <div className="mb-6 text-sm text-[#3b4652]">
          <p className="mb-1 font-medium">What to expect</p>
          <p className="leading-relaxed">
            I read every application myself. If it’s a fit, I’ll reply with a couple of times and any pre-work so we can
            use the 90 minutes well.
          </p>
        </div>

        {/* Form intro line */}
        <p className="text-sm text-[#3b4652] mb-3">
          Takes about 2 minutes. Only the first 4 fields are required.
        </p>

        {/* Short intake form */}
        <form
          action={FORM_ACTION}
          method="POST"
          className="bg-white border border-[#e5e7eb] rounded-lg p-5 sm:p-6 space-y-4 shadow-sm"
        >
          {/* Hidden fields */}
          <input type="hidden" name="offer" value="pricing_strategy_session_90" />
          <input type="hidden" name="source_page" value={sourcePage} />
          <input type="hidden" name="page_title" value={pageTitle} />
          <input type="hidden" name="redirect_url" value={REDIRECT_URL} />
          <input type="hidden" name="utm_source" value={utm.utm_source} />
          <input type="hidden" name="utm_medium" value={utm.utm_medium} />
          <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
          <input type="hidden" name="utm_content" value={utm.utm_content} />
          <input type="hidden" name="utm_term" value={utm.utm_term} />

          {/* Required fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1f2933] mb-1">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1f2933] mb-1">
              Work email *
            </label>
            <input
              id="email"
              name="work_email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="product-summary" className="block text-sm font-medium text-[#1f2933] mb-1">
              Product summary (1–2 sentences) *
            </label>
            <textarea
              id="product-summary"
              name="product_summary"
              required
              rows={3}
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="What you sell and who it’s for, in 1–2 sentences."
            />
          </div>

          <div>
            <label htmlFor="decision-type" className="block text-sm font-medium text-[#1f2933] mb-1">
              What decision are you trying to make? *
            </label>
            <select
              id="decision-type"
              name="decision_type"
              required
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="Pricing model">Pricing model</option>
              <option value="Packaging / tiers">Packaging / tiers</option>
              <option value="Value metric">Value metric</option>
              <option value="Price level">Price level</option>
              <option value="Experiment / test design">Experiment / test design</option>
              <option value="Investor-ready pricing story">Investor-ready pricing story</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          {/* Optional fields */}
          <div>
            <label htmlFor="target-customer" className="block text-sm font-medium text-[#1f2933] mb-1">
              Target customer (optional)
            </label>
            <input
              id="target-customer"
              name="target_customer"
              type="text"
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="e.g., Seed-stage B2B SaaS, GTM leaders, data teams"
            />
          </div>

          <div>
            <label htmlFor="current-pricing" className="block text-sm font-medium text-[#1f2933] mb-1">
              Current pricing (optional)
            </label>
            <textarea
              id="current-pricing"
              name="current_pricing"
              rows={2}
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="How do you charge today, if at all?"
            />
          </div>

          <div>
            <label htmlFor="uncertainty" className="block text-sm font-medium text-[#1f2933] mb-1">
              Biggest uncertainty (optional)
            </label>
            <textarea
              id="uncertainty"
              name="uncertainty"
              rows={2}
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="What feels most unclear or risky about your pricing decision?"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-[#1f2933] mb-1">
              Website (optional)
            </label>
            <input
              id="website"
              name="website_link"
              type="url"
              autoComplete="url"
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="https://yourproduct.com"
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-[#1f2933] mb-1">
              Deadline or timing (optional)
            </label>
            <input
              id="deadline"
              name="deadline"
              type="text"
              className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-[#f6f7f9] rounded-md text-sm sm:text-[15px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="e.g., before launch in May, before next fundraise"
            />
          </div>

          {/* Submit + note */}
          <div className="pt-2">
            <button
              type="submit"
              className={cn(
                primaryButton,
                'w-full justify-center rounded-full text-[17px] sm:text-[18px] tracking-normal'
              )}
            >
              Submit request
            </button>
            <p className="mt-2 text-xs sm:text-[13px] text-[#3b4652] text-center">
              I’ll review your request and reply with next steps.
            </p>
          </div>
        </form>

        {/* Secondary CTA for lower-intent visitors */}
        <div className="mt-6 text-center text-sm text-[#3b4652]">
          <p className="mb-2">Not ready to apply yet?</p>
          <Link href="/book" className={cn(brandLink, 'text-sm')}>
            Start with a free 15-minute consult instead
          </Link>
        </div>
      </div>
    </section>
  );
}

