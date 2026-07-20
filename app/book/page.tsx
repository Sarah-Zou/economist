import Image from 'next/image'
import type { Metadata } from 'next'
import Script from 'next/script'
import CalendlyEmbed from '@/components/CalendlyEmbed'

const consultationNotes = [
  {
    number: '01',
    label: 'Bring',
    title: 'The decision, not a presentation.',
    description:
      'A quick overview of the product, commercial model, and the question you are working through is enough.',
  },
  {
    number: '02',
    label: 'During',
    title: 'We sharpen the real question.',
    description:
      'We will use the time to clarify the commercial problem, surface the central tradeoff, and outline useful options.',
  },
  {
    number: '03',
    label: 'After',
    title: 'You leave with a next step.',
    description:
      'If a larger engagement makes sense, I will recommend one. If it does not, I will point you toward the most useful resource.',
  },
]

export const metadata: Metadata = {
  title:
    'Book a Free Consult | Commercial Strategy for AI-Infrastructure & Data Platforms | Sarah Zou',
  description:
    'Book a free 15-minute call with Sarah Zou about pricing architecture, GTM, revenue models, or unit economics for AI-infrastructure, API, and data-platform companies.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://sarahzou.com/book',
  },
  openGraph: {
    title:
      'Book a Free Consult | Commercial Strategy for AI-Infrastructure & Data Platforms | Sarah Zou',
    description:
      'Book a focused 15-minute conversation about the commercial decision in front of you.',
    type: 'website',
    url: 'https://sarahzou.com/book',
  },
}

export default function BookPage() {
  return (
    <>
      <div id="book-editorial" className="overflow-hidden bg-page text-text">
        <section className="border-b border-border-soft bg-surface">
          <div className="section-shell grid gap-12 py-16 sm:py-20 lg:min-h-[650px] lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:gap-20 lg:py-24">
            <div className="max-w-[47rem]">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-subtle">
                Free 15-minute consultation
              </p>
              <h1 className="mt-6 font-serif-playfair text-ink">A focused first conversation.</h1>
              <p className="mt-7 max-w-[39rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                Bring the pricing, GTM, revenue-model, or unit-economics decision that is difficult
                to frame. We will use the time to make the question clearer and identify a sensible
                next step.
              </p>
              <p className="mt-6 text-[13px] leading-[1.7] text-text-subtle">
                No deck or preparation required.
              </p>
            </div>

            <figure>
              <div className="relative aspect-[3/2] overflow-hidden bg-page">
                <Image
                  src="/images/book-conversation-setting.webp"
                  alt="Two chairs prepared for a focused conversation in a quiet office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                Fifteen minutes, centered on the decision
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="schedule-title">
          <div className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.48fr_1.52fr] lg:gap-20 lg:py-32">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Schedule
              </p>
              <h2 id="schedule-title" className="mt-5 font-serif-playfair text-ink">
                Choose a time that works.
              </h2>
              <p className="mt-6 max-w-[27rem] text-[15px] leading-[1.8] text-text-muted">
                You will receive a confirmation and calendar invitation immediately after booking.
              </p>
              <p className="mt-8 border-t border-border-soft pt-5 text-[13px] leading-[1.7] text-text-subtle">
                If nothing works,{' '}
                <a
                  href="mailto:hello@sarahzou.com"
                  className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
                >
                  email me
                </a>{' '}
                and I will suggest options.
              </p>
              <a
                href="https://calendly.com/sarahxzou/free-consult-15-min"
                className="mt-6 inline-flex border-b border-border pb-1 text-[14px] font-medium text-ink transition-colors hover:border-ink"
              >
                Open the scheduler directly
              </a>
            </div>

            <div className="border-t border-border-soft pt-8">
              <div className="overflow-hidden border border-border-soft bg-white">
                <CalendlyEmbed url="https://calendly.com/sarahxzou/free-consult-15-min?embed_domain=sarahzou.com&embed_type=Inline" />
              </div>

              <noscript>
                <p className="mt-6 border-t border-border-soft pt-5">
                  <a
                    href="https://calendly.com/sarahxzou/free-consult-15-min"
                    className="text-[15px] font-medium text-ink underline decoration-border underline-offset-4"
                  >
                    Book the consultation on Calendly
                  </a>
                </p>
              </noscript>
            </div>
          </div>
        </section>

        <section className="bg-ink text-white" aria-labelledby="consultation-expectations">
          <div className="section-shell py-20 sm:py-24 lg:py-28">
            <div className="grid gap-8 border-b border-white/[0.18] pb-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/[0.5]">
                What to expect
              </p>
              <h2 id="consultation-expectations" className="font-serif-playfair text-white">
                A useful fifteen minutes.
              </h2>
            </div>

            <ol className="grid lg:grid-cols-3">
              {consultationNotes.map((item, index) => (
                <li
                  key={item.number}
                  className={`py-8 lg:px-8 lg:py-10 ${
                    index > 0 ? 'border-t border-white/[0.18] lg:border-l lg:border-t-0' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {item.label}
                    </p>
                    <span className="text-[11px] tracking-[0.14em] text-white/[0.35]">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="mt-8 text-[18px] font-medium text-white">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-white/65">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

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
                  gtag("event", "generate_lead", {
                    method: "calendly",
                    form_name: "book_intro_call"
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
