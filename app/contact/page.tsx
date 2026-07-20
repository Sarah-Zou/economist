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
  },
  {
    number: '02',
    title: 'Book a short conversation',
    description:
      'Use a 15-minute call when context is easier to explain aloud or the decision is time-sensitive.',
    href: '/book',
    linkLabel: 'Book 15 minutes',
  },
]

export default function ContactPage() {
  return (
    <div id="contact-editorial" className="overflow-hidden bg-page text-text">
      <section className="border-b border-border-soft bg-surface">
        <div className="section-shell grid gap-12 py-16 sm:py-20 lg:min-h-[650px] lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:gap-20 lg:py-24">
          <div className="max-w-[48rem]">
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-text-subtle">
              Contact
            </p>
            <h1 className="mt-6 font-serif-playfair text-ink">
              Start with the decision in front of you.
            </h1>
            <p className="mt-7 max-w-[39rem] text-[17px] leading-[1.8] text-text-muted sm:text-[19px]">
              A short note is enough. Tell me what you are trying to decide, what makes it
              difficult, and where the business is today.
            </p>
          </div>

          <figure>
            <div className="relative aspect-[3/2] overflow-hidden bg-page">
              <Image
                src="/images/contact-open-threshold.webp"
                alt="An open doorway leading into a quiet consulting studio"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 border-t border-border-subtle pt-3 text-[11px] uppercase tracking-[0.16em] text-text-subtle">
              A first conversation can begin simply
            </figcaption>
          </figure>
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
                  className="group inline-flex items-center gap-2 self-start border-b border-border pb-1 text-[14px] font-medium text-ink transition-colors hover:border-ink"
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
