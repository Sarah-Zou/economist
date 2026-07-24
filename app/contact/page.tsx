import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

const waysToBegin = [
  {
    number: '01',
    title: 'Request a diagnostic note',
    description:
      'Share the commercial question and receive one specific observation and a practical next move.',
    href: '/diagnostic-note',
    linkLabel: 'Request a free diagnostic note',
    primary: true,
  },
  {
    number: '02',
    title: 'Book a short conversation',
    description:
      'Use a 15-minute call when context is easier to explain aloud or the decision is time-sensitive.',
    href: '/book',
    linkLabel: 'Book 15 minutes',
    primary: false,
  },
]

export default function ContactPage() {
  return (
    <div id="contact-editorial" className="overflow-hidden bg-page text-text">
      <section
        className="relative isolate border-b border-border-soft bg-surface min-h-[540px] lg:min-h-[640px]"
        aria-labelledby="contact-hero-title"
      >
        <Image
          src="/images/contact-hero.png"
          alt="An open doorway leading into a quiet space"
          fill
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center"
          priority
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,243,237,0.98)_0%,rgba(246,243,237,0.85)_45%,rgba(246,243,237,0.3)_75%,rgba(246,243,237,0)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(246,243,237,0.95)_0%,rgba(246,243,237,0)_30%)] sm:hidden"
          aria-hidden
        />

        <div className="section-shell relative z-10 flex min-h-[540px] items-end pb-16 pt-32 sm:min-h-[640px] sm:pb-24 lg:pb-28">
          <div className="max-w-[47rem]">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-subtle">
              Contact
            </p>
            <h1 id="contact-hero-title" className="mt-6 font-serif-playfair text-ink">
              Start with the decision in front of you.
            </h1>
            <p className="mt-7 max-w-[39rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
              A short note is enough. Tell me what you are trying to decide, what makes it
              difficult, and where the business is today.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-starting-points">
        <div className="section-shell grid gap-10 py-20 sm:py-24 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20 lg:py-32">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
              Ways to begin
            </p>
            <h2 id="contact-starting-points" className="mt-5 font-serif-playfair text-ink">
              Choose the format that fits the question.
            </h2>
          </div>

          <div className="border-t border-border-soft">
            {waysToBegin.map((item) => (
              <article
                key={item.number}
                className="grid gap-5 border-b border-border-soft py-8 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-7"
              >
                <span className="text-[11px] tracking-[0.14em] text-text-subtle">
                  {item.number}
                </span>
                <div className="max-w-[36rem]">
                  <h3 className="text-[18px] font-medium text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className={item.primary
                    ? 'group inline-flex items-center gap-2 self-start rounded-[8px] bg-brand px-4 py-2.5 text-[14px] font-semibold text-brand-on transition-colors hover:bg-brand-dark'
                    : 'group inline-flex items-center gap-2 self-start border-b border-border pb-1 text-[14px] font-medium text-ink transition-colors hover:border-ink'}
                >
                  {item.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft bg-surface">
        <div className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24 lg:py-32">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-text-subtle">
              Send a message
            </p>
            <h2 className="mt-5 font-serif-playfair text-ink">Put the context in writing.</h2>
            <p className="mt-6 max-w-[27rem] text-[15px] leading-[1.8] text-text-muted">
              Pricing, packaging, unit economics, GTM, or a commercial model that does not yet feel
              defensible—I will reply with the clearest next step.
            </p>
            <p className="mt-8 border-t border-border-soft pt-5 text-[13px] leading-[1.7] text-text-subtle">
              Prefer direct email?{' '}
              <Link
                href="mailto:hello@sarahzou.com"
                className="text-ink underline decoration-border underline-offset-4 hover:decoration-ink"
              >
                hello@sarahzou.com
              </Link>
            </p>
          </div>

          <div className="border-t border-border-soft pt-8">
            <ContactForm
              messagePlaceholder="Tell me what you're working through and what makes the decision difficult."
              buttonText="Send message"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
