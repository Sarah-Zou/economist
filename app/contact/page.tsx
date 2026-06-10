'use client'

import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { brandLink, outlineButton, primaryButtonLg } from '@/lib/brandStyles'
import { cn } from '@/lib/utils'

export default function ContactPage() {
  const scrollToForm = () => {
    const nameInput = document.getElementById('name-input')
    if (nameInput) {
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Small delay to ensure scroll completes before focusing
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
            Got a question?  
            Book a free 15-min call to get a faster answer.
            
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.75] text-text-muted sm:text-xl">
            Otherwise, send a note below.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/book" className={primaryButtonLg}>
                Book a free consult
              </Link>
              <button onClick={scrollToForm} className={cn(outlineButton, 'w-full sm:w-auto')}>
                Send a message
              </button>
            </div>

            <p className="mx-auto mt-5 max-w-xl text-[13px] leading-[1.7] text-text-subtle">
              I reply within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-shell max-w-3xl">
          <div className="border-t border-border-soft pt-8 sm:pt-10">
            <h2 className="text-center font-serif-playfair text-[28px] font-bold text-text sm:text-[32px]">
              Send a message
            </h2>
            <p className="mb-8 mt-4 text-center text-[15px] leading-[1.8] text-text-muted">
              Briefly describe what you&apos;re working through. I&apos;ll reply with the clearest
              next step.
            </p>
            <ContactForm
              messagePlaceholder="What's the commercial question, pricing issue, or decision you're working through?"
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
