import type { Metadata } from 'next'
import { generateBreadcrumbJsonLd } from '@/lib/generateJsonLd'
import { OG_IMAGE_HOME } from '@/lib/seo'
import DiagnosticNoteForm from './DiagnosticNoteForm'

export const metadata: Metadata = {
  title: 'Free Pricing Diagnostic Note | Sarah Zou, PhD',
  description:
    'A free one-page diagnostic note on your pricing for AI-infrastructure and data-platform companies — the specific gap, a comparable pattern, and one thing to do this week.',
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
      'A free one-page diagnostic note on your pricing for AI-infrastructure and data-platform companies — the specific gap, a comparable pattern, and one thing to do this week.',
    type: 'website',
    url: 'https://sarahzou.com/diagnostic-note',
    images: [OG_IMAGE_HOME],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pricing Diagnostic Note | Sarah Zou, PhD',
    description:
      'A free one-page diagnostic note on your pricing for AI-infrastructure and data-platform companies — the specific gap, a comparable pattern, and one thing to do this week.',
    images: [OG_IMAGE_HOME],
  },
}

export default function DiagnosticNotePage() {
  return (
    <>
      <div className="bg-page text-text">
        {/* Hero */}
        <section className="bg-hero-tint">
          <div className="section-shell pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
            <div className="mx-auto max-w-[44rem]">
              <span className="kicker-accent">Free · No strings · 1–2 business days</span>
              <h1 className="mt-5 font-serif-playfair text-ink">
                Get a free one-page diagnostic note on your pricing.
              </h1>
              <p className="mt-6 text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
                Tell me what you&apos;re working through and share your pricing page. Within 1–2
                business days I&apos;ll send a one-page note: the specific gap I see, a pattern from
                comparable infrastructure companies, and one concrete thing you can do this week. No
                strings, no pitch — I send these to a small number of infrastructure companies.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="section section-alt">
          <div className="section-shell max-w-2xl">
            <DiagnosticNoteForm />
          </div>
        </section>

        {/* What happens next */}
        <section className="section">
          <div className="section-shell max-w-3xl">
            <div className="section-header">
              <span className="kicker">What happens next</span>
              <h2 className="section-title">Simple process</h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  n: '01',
                  title: 'Submit the form',
                  copy: 'Share what you\'re working through and your pricing page, if you have one.',
                },
                {
                  n: '02',
                  title: 'I review and write',
                  copy: 'Within 1–2 business days I\'ll send a one-page note: the specific gap, a comparable pattern, and one thing to do this week.',
                },
                {
                  n: '03',
                  title: 'Optional next step',
                  copy: 'If the work is bigger, the two-week Commercial Architecture Diagnostic is the usual next step. But there\'s no obligation.',
                },
              ].map((item) => (
                <div key={item.n} className="border-t border-border pt-6">
                  <p className="font-serif-playfair text-[28px] font-semibold leading-none text-ink/20">
                    {item.n}
                  </p>
                  <h3 className="mt-4 text-[17px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-text-muted">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: 'Home', url: '/' },
              { name: 'Free Diagnostic Note', url: '/diagnostic-note' },
            ])
          ),
        }}
      />
    </>
  )
}
