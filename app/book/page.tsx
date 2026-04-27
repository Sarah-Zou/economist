import React from 'react'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Book a Free Consult | Commercial Strategy & Pricing for AI-Native B2B SaaS | Sarah Zou',
  description:
    'Book a free 15-min call with Sarah Zou — commercial strategy, pricing, monetization, GTM economics, and unit economics for AI-native B2B SaaS founders and operators. No prep needed.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sarahzou.com/book',
  },
  openGraph: {
    title: 'Book a Free Consult | Commercial Strategy & Pricing for AI-Native B2B SaaS | Sarah Zou',
    description:
      'Book a free 15-min call — commercial strategy, pricing, monetization, GTM economics, and unit economics for AI-native B2B SaaS founders and operators.',
    type: 'website',
    url: 'https://sarahzou.com/book',
  },
}

export default function BookPage() {
  return (
    <>
      <section className="bg-page py-14 sm:py-20 lg:py-24">
        <div className="section-shell max-w-4xl">
          <div className="section-header max-w-[42rem]">
            <span className="kicker-accent">Free 15-min consult</span>
            <h1 className="mt-4 font-serif-playfair text-ink">Book a free 15-min consultation</h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.8] text-text-muted sm:text-[17px]">
              Pick a time below. We&apos;ll use the 15 minutes to sharpen the commercial question
              — pricing, GTM economics, revenue model, or unit economics — and figure out the right
              next step. After you book, you&apos;ll get a confirmation and calendar invite. If
              nothing works,{' '}
              <a
                href="mailto:hello@sarahzou.com"
                className="font-medium text-brand-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-dark"
              >
                email me
              </a>{' '}
              and I&apos;ll suggest options.
            </p>
            <p className="meta-note mt-6">
              Best for a fast first conversation, not a full work session.
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

          <div className="mt-10 overflow-hidden rounded-card border border-border-soft bg-white/94 shadow-card">
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

          <div className="mx-auto mt-12 flex max-w-2xl items-start gap-3 border-t border-border pt-5 sm:pt-6">
            <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden />
            <div className="flex-1 text-left">
              <h3 className="text-[15px] font-semibold text-ink">What to expect</h3>
              <ul className="mt-3 space-y-2 text-[14px] leading-[1.65] text-text-muted">
                <li>
                  <span className="font-semibold text-ink">Bring:</span> a quick overview of your
                  product, commercial model, or the decision you&apos;re working through.
                </li>
                <li>
                  <span className="font-semibold text-ink">I&apos;ll help:</span> sharpen the
                  commercial problem — pricing, GTM, revenue model, or unit economics — outline
                  options, and suggest next steps.
                </li>
                <li>
                  <span className="font-semibold text-ink">If we&apos;re a fit:</span> I&apos;ll
                  recommend the best engagement — session, sprint, fractional support, or point you
                  to resources.
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
