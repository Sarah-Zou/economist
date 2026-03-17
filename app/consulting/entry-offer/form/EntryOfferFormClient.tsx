'use client';

import { type FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FORM_ACTION = process.env.NEXT_PUBLIC_PRICING_SESSION_FORM_URL || '';
const REDIRECT_URL = 'https://sarahzou.com/thanks/entry-offer';
const IS_VALID_FORM_ACTION = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(FORM_ACTION);

type UTMKeys = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term';

export default function EntryOfferFormClient() {
  const [utm, setUtm] = useState<Record<UTMKeys, string>>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  });

  const [sourcePage, setSourcePage] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [configError, setConfigError] = useState('');

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (IS_VALID_FORM_ACTION) return;

    event.preventDefault();
    setConfigError(
      'Form is temporarily unavailable because the form endpoint is missing or invalid. Please refresh after updating NEXT_PUBLIC_PRICING_SESSION_FORM_URL and restarting the app.'
    );
  }

  return (
    <div className="min-h-screen bg-page selection:bg-brand-soft selection:text-brand-ink">
      <main className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-8 sm:mb-10">
            <span className="inline-block py-2 px-4 sm:px-5 rounded-full bg-brand-soft text-brand-ink text-xs sm:text-sm font-bold mb-6 border border-brand/20 tracking-wide">
              90-Minute Pricing Strategy Session
            </span>
            <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-semibold text-[#1f2933] leading-tight mb-3">
            Short application form
            </h1>
            <p className="text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">
            Share a few details so we can make the session as useful as possible.
            </p>
          </div>

          <p className="text-sm text-[#3b4652] mb-4">
            Takes about 2 minutes. Only the first 4 fields are required.
          </p>

          {/* Form card */}
          <form
            action={FORM_ACTION}
            method="POST"
            onSubmit={handleSubmit}
            className="bg-white border border-[#e2e6ea] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-4 shadow-sm"
          >
            {!IS_VALID_FORM_ACTION && (
              <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-sm text-[#991b1b]">
                `NEXT_PUBLIC_PRICING_SESSION_FORM_URL` is missing or invalid. Update it to your Google Apps Script
                `/exec` URL and restart Next.js.
              </div>
            )}
            {configError && (
              <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-sm text-[#991b1b]">
                {configError}
              </div>
            )}
            <input type="hidden" name="offer" value="pricing_strategy_session_90" />
            <input type="hidden" name="source_page" value={sourcePage} />
            <input type="hidden" name="page_title" value={pageTitle} />
            <input type="hidden" name="redirect_url" value={REDIRECT_URL} />
            <input type="hidden" name="utm_source" value={utm.utm_source} />
            <input type="hidden" name="utm_medium" value={utm.utm_medium} />
            <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
            <input type="hidden" name="utm_content" value={utm.utm_content} />
            <input type="hidden" name="utm_term" value={utm.utm_term} />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1f2933] mb-1">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] leading-[1.65] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1f2933] mb-1">Work email *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] leading-[1.65] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="product-summary" className="block text-sm font-medium text-[#1f2933] mb-1">Product summary (1–2 sentences) *</label>
              <textarea
                id="product-summary"
                name="product_summary"
                required
                rows={3}
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] leading-[1.65] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="What you sell and who it’s for, in 1–2 sentences."
              />
            </div>

            <div>
              <label htmlFor="decision-type" className="block text-sm font-medium text-[#1f2933] mb-1">What decision are you trying to make? *</label>
              <select
                id="decision-type"
                name="decision_type"
                required
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                defaultValue=""
              >
                <option value="" disabled>Select one</option>
                <option value="Pricing model">Pricing model</option>
                <option value="Packaging / tiers">Packaging / tiers</option>
                <option value="Value metric">Value metric</option>
                <option value="Price level">Price level</option>
                <option value="Experiment / test design">Experiment / test design</option>
                <option value="Investor-ready pricing story">Investor-ready pricing story</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <div>
              <label htmlFor="target-customer" className="block text-sm font-medium text-[#1f2933] mb-1">Target customer (optional)</label>
              <input
                id="target-customer"
                name="target_customer"
                type="text"
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="e.g., Seed-stage B2B SaaS, GTM leaders, data teams"
              />
            </div>

            <div>
              <label htmlFor="current-pricing" className="block text-sm font-medium text-[#1f2933] mb-1">Current pricing (optional)</label>
              <textarea
                id="current-pricing"
                name="current_pricing"
                rows={2}
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="How do you charge today, if at all?"
              />
            </div>

            <div>
              <label htmlFor="uncertainty" className="block text-sm font-medium text-[#1f2933] mb-1">Biggest uncertainty (optional)</label>
              <textarea
                id="uncertainty"
                name="uncertainty"
                rows={2}
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="What feels most unclear or risky about your pricing decision?"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-[#1f2933] mb-1">Website (optional)</label>
              <input
                id="website"
                name="website_url"
                type="url"
                autoComplete="url"
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="https://yourproduct.com"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-[#1f2933] mb-1">Deadline or timing (optional)</label>
              <input
                id="deadline"
                name="deadline"
                type="text"
                className="w-full px-3.5 py-2.5 border border-[#e2e6ea] bg-surface rounded-lg text-base sm:text-[17px] text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="e.g., before launch in May, before next fundraise"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!IS_VALID_FORM_ACTION}
                className={cn(
                  'w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-sm',
                  IS_VALID_FORM_ACTION
                    ? 'bg-brand hover:bg-brand-ink text-brand-on hover:shadow-md'
                    : 'bg-[#cbd5e1] text-white cursor-not-allowed'
                )}
              >
                Submit request
              </button>
              <p className="mt-2 text-sm text-[#3b4652] text-center leading-[1.65]">
                I read every application myself. If it’s a fit, I’ll reply with a couple of suggested times and any light
                pre-work so we can use the 90 minutes well.
              </p>
            </div>
          </form>

          {/* Benefits card */}
          <div className="mt-6 sm:mt-8 bg-surface border border-[#e2e6ea] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm">
            <h2 className="font-serif-playfair text-xl sm:text-[22px] font-semibold text-[#1f2933] mb-3">
              In this session, you’ll get:
            </h2>
            <ul className="space-y-2 text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
              <li className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden />
                <span>a clearer recommendation on pricing model and value metric</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden />
                <span>concrete guidance on packages, tiers, and entry offer</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden />
                <span>a short memo within 48 hours with risks and next steps</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden />
                <span>a chance to pressure-test your current or planned pricing</span>
              </li>
            </ul>
          </div>

          {/* Secondary CTA */}
          <div className="mt-6 sm:mt-8 text-center text-base sm:text-[17px] text-[#3b4652] leading-[1.65]">
            <p className="mb-2">Not ready to apply yet?</p>
            <Link
              href="/book"
              className="text-brand-ink underline decoration-2 underline-offset-2 hover:text-brand-ink/90 font-medium"
            >
              Start with a free 15-minute consult instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
