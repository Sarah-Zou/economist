import type { Metadata } from 'next'
import Link from 'next/link'
import { outlineButtonSm } from '@/lib/brandStyles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Thank You | Message Received | Sarah Zou, PhD',
  description: 'Thank you for reaching out. Sarah Zou, PhD will get back to you soon.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://sarahzou.com/contact/thanks',
  },
  openGraph: {
    title: 'Thank You | Message Received | Sarah Zou, PhD',
    description: 'Thank you for reaching out. Sarah Zou, PhD will get back to you soon.',
    type: 'website',
    url: 'https://sarahzou.com/contact/thanks',
  },
}

export default function ContactThanksPage() {
  return (
    <section className="min-h-[72vh] border-b border-border-soft bg-surface text-text">
      <div className="section-shell grid gap-12 py-24 sm:py-28 lg:grid-cols-[0.42fr_1.58fr] lg:gap-20 lg:py-36">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
          Message received
        </p>
        <div className="max-w-[47rem] border-t border-border-soft pt-8">
          <h1 className="font-serif-playfair text-ink">Thank you—your message is on its way.</h1>
          <p className="mt-7 max-w-[39rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
            I&apos;ll read the context personally and reply within 1–2 business days with the
            clearest next step.
          </p>
          <p className="mt-6 max-w-[36rem] text-[14px] leading-[1.75] text-text-subtle">
            If the timing is urgent or the question is easier to explain aloud, you can also book a
            short conversation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/book" className={cn(outlineButtonSm, 'min-w-[210px] justify-center')}>
              Book a 15-minute conversation
            </Link>
            <Link
              href="/"
              className="border-b border-border pb-1 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
