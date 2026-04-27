'use client';

import { type FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { primaryButtonLg } from '@/lib/brandStyles';

const DEFAULT_FORM_ACTION =
  'https://script.google.com/macros/s/AKfycbx1ndwJyYb0zSBnun4OszCJrRMMopBDIrSY-B9855RKgnusPauxx0pVJT-4EvXLI5pACA/exec';
const FORM_ACTION = (process.env.NEXT_PUBLIC_PRICING_SESSION_FORM_URL || '').trim();
const RESOLVED_FORM_ACTION = FORM_ACTION || DEFAULT_FORM_ACTION;
const REDIRECT_URL = 'https://sarahzou.com/thanks/entry-offer';
const IS_VALID_FORM_ACTION = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(RESOLVED_FORM_ACTION);

type UTMKeys = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term';

export default function EntryOfferFormClient() {
  const PRODUCT_SUMMARY_MIN_LENGTH = 25;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productSummary, setProductSummary] = useState('');
  const [productSummaryTouched, setProductSummaryTouched] = useState(false);

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
    setPageTitle(document.title || '90-Minute Commercial Strategy Session Application');
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProductSummaryTouched(true);

    if (productSummary.trim().length < PRODUCT_SUMMARY_MIN_LENGTH) {
      return;
    }

    if (!IS_VALID_FORM_ACTION) {
      setConfigError(
        'Form is temporarily unavailable because the form endpoint is missing or invalid. Please refresh after updating NEXT_PUBLIC_PRICING_SESSION_FORM_URL and restarting the app.'
      );
      return;
    }

    setConfigError('');
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      // no-cors keeps this simple for Apps Script and avoids leaving this domain.
      await fetch(RESOLVED_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
    } catch {
      // We still continue to the thank-you page to keep UX smooth.
    } finally {
      window.location.assign(REDIRECT_URL);
    }
  }

  const isProductSummaryTooShort =
    productSummaryTouched && productSummary.trim().length < PRODUCT_SUMMARY_MIN_LENGTH;

  return (
    <div className="min-h-screen bg-page text-text">
      <main className="px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl">
          {/* Hero */}
          <div className="mb-8">
            <Link
              href="/consulting/entry-offer"
              className="inline-flex items-center rounded-full border border-border-subtle bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink transition-colors hover:border-brand/40 hover:bg-brand-soft"
            >
              90-Minute Commercial Strategy Session
            </Link>
            <h1 className="mt-5 font-serif-playfair text-ink">
              Request the 90-Minute Commercial Strategy Session
            </h1>
            <p className="mt-4 text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
              Share a few details so I can quickly tell whether this session is the right
              fit and make it useful from the start.
            </p>
          </div>

          <p className="text-[14px] text-text-muted">Takes about 2 minutes.</p>
          <p className="mt-1 text-[14px] leading-[1.55] text-text-subtle">
            Best fit for founders with a live product, clear offer, or active pricing
            decision in motion.
          </p>

          {/* Form card */}
          <form
            action={RESOLVED_FORM_ACTION}
            method="POST"
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 rounded-card border border-border-subtle bg-white p-6 sm:p-8"
          >
            {!IS_VALID_FORM_ACTION && (
              <div className="rounded-control border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[13px] text-[#991b1b]">
                `NEXT_PUBLIC_PRICING_SESSION_FORM_URL` is missing or invalid. Update it to
                your Google Apps Script `/exec` URL and restart Next.js.
              </div>
            )}
            {configError && (
              <div className="rounded-control border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[13px] text-[#991b1b]">
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
              <label htmlFor="name" className="label">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Work email *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="product-summary" className="label">Product summary (1–2 sentences) *</label>
              <textarea
                id="product-summary"
                name="product_summary"
                required
                minLength={PRODUCT_SUMMARY_MIN_LENGTH}
                rows={3}
                value={productSummary}
                onChange={(event) => setProductSummary(event.target.value)}
                onBlur={() => setProductSummaryTouched(true)}
                className={cn('textarea', isProductSummaryTooShort && 'textarea-invalid')}
                placeholder="What you sell, who it is for, and what stage you’re at in 1–2 sentences."
              />
              {isProductSummaryTooShort && (
                <p className="form-error">
                  Please add a bit more detail so I can understand the product and context.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="decision-type" className="label">What decision are you trying to make? *</label>
              <select
                id="decision-type"
                name="decision_type"
                required
                className="select-input"
                defaultValue=""
              >
                <option value="" disabled>Select one</option>
                <option value="Pricing model">Pricing model</option>
                <option value="Packaging / tiers">Packaging / tiers</option>
                <option value="Value metric">Value metric</option>
                <option value="Price level">Price level</option>
                <option value="GTM structure / pricing alignment">GTM structure / pricing alignment</option>
                <option value="Revenue model / unit economics">Revenue model / unit economics</option>
                <option value="Forecasting / forward model">Forecasting / forward model</option>
                <option value="Investor-ready commercial narrative">Investor-ready commercial narrative</option>
                <option value="Experiment / test design">Experiment / test design</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <div>
              <label htmlFor="target-customer" className="label">Company name *</label>
              <input
                id="target-customer"
                name="target_customer"
                type="text"
                required
                className="input"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="website" className="label">
                Website, product page, demo, LinkedIn company page, or short deck link (recommended)
              </label>
              <input
                id="website"
                name="website_url"
                type="url"
                autoComplete="url"
                className="input"
                placeholder="https://yourproduct.com"
              />
            </div>

            <div>
              <label htmlFor="current-pricing" className="label">Current pricing (optional)</label>
              <textarea
                id="current-pricing"
                name="current_pricing"
                rows={2}
                className="textarea"
                placeholder="How do you charge today, if at all?"
              />
            </div>

            <div>
              <label htmlFor="uncertainty" className="label">Biggest uncertainty (optional)</label>
              <textarea
                id="uncertainty"
                name="uncertainty"
                rows={2}
                className="textarea"
                placeholder="What feels hardest, riskiest, or most unclear right now?"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="label">Deadline or timing (optional)</label>
              <input
                id="deadline"
                name="deadline"
                type="text"
                className="input"
                placeholder="e.g., before launch in May, before next fundraise"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!IS_VALID_FORM_ACTION || isSubmitting}
                className={cn(primaryButtonLg, 'w-full')}
              >
                {isSubmitting ? 'Submitting…' : 'Submit request'}
              </button>
              <p className="mt-3 text-center text-[13px] leading-[1.65] text-text-muted">
                I read every request myself. If it looks like a fit, I&apos;ll reply with
                the next step to choose a time. Your session is confirmed once payment is
                completed.
              </p>
            </div>
          </form>

          {/* Benefits card */}
          <div className="mt-8 rounded-card border border-border-soft bg-surface p-6 sm:p-7">
            <h2 className="font-serif-playfair text-[20px] font-semibold text-ink">
              In this session, you&apos;ll get:
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-[1.6] text-text">
              {[
                'A clear recommendation on pricing model, value metric, GTM structure, or revenue logic',
                'Concrete guidance on packages, tiers, and entry offer',
                'A short memo within 48 hours with risks and next steps',
                'A chance to pressure-test your current or planned commercial model',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary CTA */}
          <div className="mt-10 text-center text-[15px] leading-[1.65] text-text-muted">
            <p className="mb-2">Not ready to apply yet?</p>
            <Link
              href="/book"
              className="font-medium text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark"
            >
              Start with a free 15-minute consult instead
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
