'use client'

import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { ArrowRight } from 'lucide-react'
import { brandLink, outlineButton, primaryButtonLg } from '@/lib/brandStyles'
import { cn } from '@/lib/utils'

export default function ContactPage() {
  const scrollToForm = () => {
    const nameInput = document.getElementById('name-input')
    if (nameInput) {
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        nameInput.focus()
      }, 300)
    }
  }

  return (
    <>
      <section className="bg-hero-tint">
        <div className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[44rem] text-center">
            <span className="kicker-accent">Contact</span>
            <h1 className="mt-5 font-serif-playfair text-[36px] font-bold text-text sm:text-[42px] lg:text-[52px]">
              Get in touch.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.75] text-text-muted sm:text-xl">
              Pricing, commercial strategy, and unit economics for infrastructure and data-platform
              companies.
            </p>
          </div>
        </div>
      </section>

      {/* Async option — lead element */}
      <section className="section section-alt">
        <div className="section-shell max-w-3xl">
          <div className="rounded-card border border-border bg-surface p-7 sm:p-9">
            <span className="kicker-accent">Async · Free · No strings</span>
            <h2 className="mt-4 font-serif-playfair text-[26px] font-semibold text-ink sm:text-[30px]">
              Not ready for a call? Get a free one-page diagnostic note.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.8] text-text-muted">
              Tell me what you&apos;re working through and share your pricing page. Within 1–2
              business days I&apos;ll send a one-page note with the specific gap I see and one
              concrete thing you can do this week.
            </p>
            <div className="mt-6">
              <Link href="/diagnostic-note" className={`${primaryButtonLg} w-full sm:w-auto`}>
                Get a free diagnostic note
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call option — secondary */}
      <section className="section">
        <div className="section-shell max-w-3xl">
          <div className="border-t border-border-soft pt-8 sm:pt-10">
            <h2 className="font-serif-playfair text-[24px] font-semibold text-ink sm:text-[28px]">
              Prefer a call?
            </h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-text-muted">
              Book a free 15-minute consult — the fastest way to get a direct answer.
            </p>
            <div className="mt-6">
              <Link href="/book" className={cn(outlineButton, 'w-full sm:w-auto')}>
                Book a free 15-min consult
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Message form */}
      <section className="section section-alt">
        <div className="section-shell max-w-3xl">
          <div className="border-t border-border-soft pt-8 sm:pt-10">
            <h2 className="text-center font-serif-playfair text-[28px] font-bold text-text sm:text-[32px]">
              Send a message
            </h2>
            <p className="mb-8 mt-4 text-center text-[15px] leading-[1.8] text-text-muted">
              Tell me what you&apos;re working through — pricing, packaging, unit economics, or GTM
              — and I&apos;ll reply with the clearest next step.
            </p>
            <ContactForm
              messagePlaceholder="Tell me what you're working through — pricing, packaging, unit economics, or GTM — and I'll reply with the clearest next step."
              buttonText="Send message"
            />
            <p className="mt-6 text-center text-[13px] leading-[1.7] text-text-subtle">
              Prefer direct email?{' '}
              <Link href="mailto:hello@sarahzou.com" className={brandLink}>
                hello@sarahzou.com
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
