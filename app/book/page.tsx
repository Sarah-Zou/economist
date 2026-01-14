import React from 'react'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Script from 'next/script'
import CalendlyEmbed from '@/components/CalendlyEmbed'

export const metadata: Metadata = {
  title: "Thank You | Book a Consultation | Sarah Zou, PhD",
  description: "Thank you for your interest. Book a free consultation with Sarah Zou, PhD to discuss your pricing and metrics strategy.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sarahzou.com/book",
  },
  openGraph: {
    title: "Thank You | Book a Consultation | Sarah Zou, PhD",
    description: "Thank you for your interest. Book a free consultation with Sarah Zou, PhD to discuss your pricing and metrics strategy.",
    type: "website",
    url: "https://sarahzou.com/book",
  },
};

export default function BookPage() {
  return (
    <>
      <section className="min-h-screen flex flex-col bg-[#f6f7f9] py-4 sm:py-8 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Thank You Header */}
            <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
              <h1 className="font-serif-playfair text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#1f2933] mb-2 sm:mb-4">
                Thanks—let's make this practical.
              </h1>
              <p className="text-[#1f2933] text-sm sm:text-base lg:text-[17px] leading-[1.65] max-w-2xl px-2">
                Pick a time below for a free 30-min chat. If nothing works, <a href="mailto:hello@sarahzou.com" className="text-[#ff5722] hover:text-[#e44e1f] underline">email me</a> and I'll suggest options.
              </p>
            </div>

            {/* Calendly Inline Widget */}
            <div className="overflow-hidden mb-4 sm:mb-6 -mx-2 sm:-mx-4 md:mx-0">
              <CalendlyEmbed url="https://calendly.com/sarahxzou/free-consult-30-min?embed_domain=sarahzou.com&embed_type=Inline" />
            </div>

            {/* What to Expect */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-[#f6f7f9] rounded-lg max-w-2xl mx-auto">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff5722] mt-1 flex-shrink-0" />
              <div className="text-left flex-1">
                <h3 className="font-semibold text-[#1f2933] mb-2 sm:mb-3 text-sm sm:text-base">What to expect:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#3b4652]">
                  <li>
                    <span className="font-semibold text-[#1f2933]">Bring:</span> a quick overview of your product + current pricing (or your latest experiment idea)
                  </li>
                  <li>
                    <span className="font-semibold text-[#1f2933]">I'll help:</span> sharpen the problem, outline options, and suggest next steps
                  </li>
                  <li>
                    <span className="font-semibold text-[#1f2933]">If we're a fit:</span> I'll recommend the best engagement (or point you to resources)
                  </li>
                </ul>
              </div>
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
                // Security: only accept Calendly as sender
                if (e.origin !== "https://calendly.com") return;
                if (!isCalendlyMessage(e)) return;

                const calendlyEvent = e.data.event; // e.g. "calendly.event_scheduled"
                const payload = e.data.payload || {};

                // GA4 event names must use only letters/numbers/underscores (no dots)
                const ga4EventName = calendlyEvent.replaceAll(".", "_"); // "calendly_event_scheduled"

                // Option A: send the raw calendly event name mapped to underscores
                if (typeof gtag === "function") {
                  gtag("event", ga4EventName, {
                    calendly_event: calendlyEvent,
                    // keep parameters small/simple (GA4 will drop complex objects)
                    event_uri: payload.event?.uri || undefined,
                    invitee_uri: payload.invitee?.uri || undefined
                  });
                }

                // Option B (recommended): also send a clean "business" conversion event
                if (calendlyEvent === "calendly.event_scheduled" && typeof gtag === "function") {
                  // dedupe (prevents double counting on refresh/back)
                  if (sessionStorage.getItem("book_intro_call_sent")) return;
                  sessionStorage.setItem("book_intro_call_sent", "1");

                  gtag("event", "book_intro_call", {
                    method: "calendly",
                    event_uri: payload.event?.uri || undefined,
                    invitee_uri: payload.invitee?.uri || undefined
                  });
                }

                // Helpful for debugging in browser console
                // console.log("Calendly message:", calendlyEvent, payload);
              });
            })();
          `,
        }}
      />
    </>
  )
}

