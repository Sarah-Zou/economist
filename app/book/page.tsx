import React from 'react'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Book a Free 15-Min Consultation | Pricing & Metrics for Seed–Series A | Sarah Zou',
  description:
    'Book a free 15-min call. For Seed–Series A SaaS, APIs & AI: pricing, value metric, NRR, payback, and monetization. No prep needed — get tailored next steps.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sarahzou.com/book',
  },
  openGraph: {
    title: 'Book a Free 15-Min Consultation | Pricing & Metrics for Seed–Series A | Sarah Zou',
    description:
      'Book a free 15-min call. For Seed–Series A SaaS, APIs & AI: pricing, value metric, NRR, payback, and monetization. No prep needed — get tailored next steps.',
    type: 'website',
    url: 'https://sarahzou.com/book',
  },
}

export default function BookPage() {
  return (
    <>
      <section className="bg-page px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-4xl">
          <div className="text-center">
            <span className="kicker">Free 15-min consult</span>
            <h1 className="mt-4 font-serif-playfair text-ink">
              Book a free 15-min consultation
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.7] text-text-muted sm:text-[17px]">
              Pick a time below. After you book, you&apos;ll get a confirmation and
              calendar invite. If nothing works,{' '}
              <a
                href="mailto:hello@sarahzou.com"
                className="font-medium text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark"
              >
                email me
              </a>{' '}
              and I&apos;ll suggest options.
            </p>
          </div>

          <p className="mt-6 text-center text-[14px]">
            <a
              href="https://calendly.com/sarahxzou/free-consult-15-min"
              className="inline-flex items-center gap-1.5 font-medium text-brand-ink underline underline-offset-4 hover:text-brand-dark"
            >
              If the scheduler doesn&apos;t load, book here →
            </a>
          </p>

          <div className="mt-8 overflow-hidden rounded-card border border-border-subtle bg-white">
            <CalendlyEmbed url="https://calendly.com/sarahxzou/free-consult-15-min?embed_domain=sarahzou.com&embed_type=Inline" />
          </div>

          <noscript>
            <p className="mt-6 rounded-card bg-surface p-5 text-center">
              <a
                href="https://calendly.com/sarahxzou/free-consult-15-min"
                className="text-[17px] font-semibold text-brand-ink underline underline-offset-4 hover:text-brand-dark"
              >
                Book a free 15-min consultation on Calendly →
              </a>
            </p>
          </noscript>

          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-card border border-border-soft bg-surface p-5 sm:p-6">
            <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden />
            <div className="flex-1 text-left">
              <h3 className="text-[15px] font-semibold text-ink">What to expect</h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.65] text-text-muted">
                <li>
                  <span className="font-semibold text-ink">Bring:</span> a quick overview
                  of your product + current pricing (or your latest experiment idea).
                </li>
                <li>
                  <span className="font-semibold text-ink">I&apos;ll help:</span> sharpen
                  the problem, outline options, and suggest next steps.
                </li>
                <li>
                  <span className="font-semibold text-ink">If we&apos;re a fit:</span>{' '}
                  I&apos;ll recommend the best engagement (or point you to resources).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="calendly-ga4-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              function isCalendlyMessage(e) {
                return e?.data?.event && typeof e.data.event === "string" && e.data.event.indexOf("calendly.") === 0;
              }

              window.addEventListener("message", function (e) {
                if (e.origin !== "https://calendly.com") return;
                if (!isCalendlyMessage(e)) return;

                const calendlyEvent = e.data.event;
                const payload = e.data.payload || {};
                const ga4EventName = calendlyEvent.replaceAll(".", "_");

                if (typeof gtag === "function") {
                  gtag("event", ga4EventName, {
                    calendly_event: calendlyEvent,
                    event_uri: payload.event?.uri || undefined,
                    invitee_uri: payload.invitee?.uri || undefined
                  });
                }

                if (calendlyEvent === "calendly.event_scheduled" && typeof gtag === "function") {
                  if (sessionStorage.getItem("book_intro_call_sent")) return;
                  sessionStorage.setItem("book_intro_call_sent", "1");

                  gtag("event", "book_intro_call", {
                    method: "calendly",
                    event_uri: payload.event?.uri || undefined,
                    invitee_uri: payload.invitee?.uri || undefined
                  });
                }
              });
            })();
          `,
        }}
      />
    </>
  )
}
