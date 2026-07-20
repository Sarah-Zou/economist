import type { Metadata } from 'next'
import Image from 'next/image'
import { generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { OG_IMAGE_HOME } from '@/lib/seo'
import DiagnosticNoteForm from './DiagnosticNoteForm'

const noteContents = [
  {
    number: '01',
    title: 'The specific gap',
    description: 'The part of the current pricing or commercial logic that deserves attention.',
  },
  {
    number: '02',
    title: 'A comparable pattern',
    description:
      'A useful way to frame the issue based on how similar infrastructure businesses behave.',
  },
  {
    number: '03',
    title: 'One practical move',
    description: 'A concrete action you can take this week without commissioning a larger project.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Share the context',
    description:
      'Tell me what you are working through and include your pricing page if you have one.',
  },
  {
    number: '02',
    title: 'I review and write',
    description:
      'I look for the underlying commercial issue and prepare a concise one-page response.',
  },
  {
    number: '03',
    title: 'Use the note',
    description:
      'Take the recommendation forward on your own. A larger next step is entirely optional.',
  },
]

export const metadata: Metadata = {
  title: 'Free Pricing Diagnostic Note | Sarah Zou, PhD',
  description:
    'A free one-page diagnostic note on your pricing for AI-infrastructure and data-platform companies—the specific gap, a comparable pattern, and one thing to do this week.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/diagnostic-note',
  },
  openGraph: {
    title: 'Free Pricing Diagnostic Note | Sarah Zou, PhD',
    description:
      'A free one-page diagnostic note: the specific gap, a comparable pattern, and one practical move.',
    type: 'website',
    url: 'https://sarahzou.com/diagnostic-note',
    images: [OG_IMAGE_HOME],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pricing Diagnostic Note | Sarah Zou, PhD',
    description:
      'A free one-page diagnostic note: the specific gap, a comparable pattern, and one practical move.',
    images: [OG_IMAGE_HOME],
  },
}

export default function DiagnosticNotePage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Free Diagnostic Note', url: '/diagnostic-note' },
  ])

  return (
    <>
      <div id="diagnostic-editorial" className="overflow-hidden bg-page text-text">
        <section className="border-b border-border-soft bg-surface">
          <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-24 lg:py-28">
            <div className="max-w-[47rem]">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-subtle">
                Free · No strings · 1–2 business days
              </p>
              <h1 className="mt-6 font-serif-playfair text-ink">
                A clear outside view on the pricing decision in front of you.
              </h1>
              <p className="mt-7 max-w-[40rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                Share the context and your pricing page. I will send a concise one-page note with
                the issue I see, a relevant pattern, and one practical next move.
              </p>
              <p className="mt-6 text-[13px] leading-[1.7] text-text-subtle">
                Available to a small number of AI-infrastructure, API, and data-platform companies.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                What you receive
              </p>
              <div className="mt-5 border-t border-border-soft">
                {noteContents.map((item) => (
                  <div
                    key={item.number}
                    className="grid grid-cols-[2.5rem_1fr] gap-5 border-b border-border-soft py-5"
                  >
                    <span className="text-[11px] tracking-[0.14em] text-text-subtle">
                      {item.number}
                    </span>
                    <div>
                      <h2 className="text-[16px] font-medium text-ink">{item.title}</h2>
                      <p className="mt-2 text-[14px] leading-[1.7] text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="diagnostic-form-title">
          <div className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24 lg:py-32">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
                Your request
              </p>
              <h2 id="diagnostic-form-title" className="mt-5 font-serif-playfair text-ink">
                Give me enough context to see the real question.
              </h2>
              <p className="mt-6 max-w-[28rem] text-[15px] leading-[1.8] text-text-muted">
                A few direct sentences are more useful than a polished brief. If you have live
                pricing, include the link.
              </p>
              <figure className="mt-10">
                <div className="relative aspect-[3/2] overflow-hidden bg-surface">
                  <Image
                    src="/images/diagnostic-one-page-review.webp"
                    alt="A concise one-page analytical review with handwritten annotations"
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
                  One page, focused on the decision
                </figcaption>
              </figure>
            </div>

            <div className="border-t border-border-soft pt-8">
              <DiagnosticNoteForm />
            </div>
          </div>
        </section>

        <section className="bg-ink text-white" aria-labelledby="diagnostic-process-title">
          <div className="section-shell py-20 sm:py-24 lg:py-28">
            <div className="grid gap-8 border-b border-white/[0.18] pb-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/[0.5]">
                What happens next
              </p>
              <h2 id="diagnostic-process-title" className="font-serif-playfair text-white">
                A simple, useful exchange.
              </h2>
            </div>

            <ol className="grid lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  className={`py-8 lg:px-8 lg:py-10 ${
                    index > 0 ? 'border-t border-white/[0.18] lg:border-l lg:border-t-0' : ''
                  }`}
                >
                  <span className="text-[11px] tracking-[0.14em] text-white/[0.4]">
                    {step.number}
                  </span>
                  <h3 className="mt-8 text-[18px] font-medium text-white">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-white/65">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
