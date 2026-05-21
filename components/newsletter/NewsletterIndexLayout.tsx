import type { ReactNode } from 'react'

type NewsletterIndexLayoutProps = {
  children: ReactNode
}

export default function NewsletterIndexLayout({ children }: NewsletterIndexLayoutProps) {
  return (
    <div className="min-h-screen bg-page">
      <div className="section-shell flex flex-col items-start gap-12 py-16 md:flex-row">
        <div className="flex w-full max-w-2xl flex-1 flex-col gap-8">
          <div className="mb-2">
            <p className="kicker-accent">Newsletter</p>
            <h1 className="mt-4 font-serif-playfair text-[34px] font-semibold leading-tight text-text sm:text-[42px]">
              Weekly pricing and monetization thinking for technical founders
            </h1>
            <p className="mt-6 max-w-[38rem] text-[16px] leading-[1.9] text-text-muted sm:text-[17px]">
              Research, case studies, frameworks, and pricing judgment you can actually use.
            </p>
          </div>
          {children}
        </div>
        <div className="mx-auto h-fit w-full max-w-lg md:sticky md:top-20 md:items-start">
          <div className="border-t border-border pt-6">
            <h2 className="w-full text-center text-2xl font-semibold leading-tight text-ink sm:text-[28px] md:text-left">
              Subscribe for a sharper weekly view on pricing, growth, and monetization.
            </h2>
            <div className="mb-6 mt-6 w-full">
              <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                What you&apos;ll get
              </h3>
              <p className="mb-2 text-base leading-[1.75] text-text sm:text-[17px]">
                • Pricing research, experiments, and benchmarks—1×/week
              </p>
              <p className="mb-2 text-base leading-[1.75] text-text sm:text-[17px]">
                • Real case studies from tech startups
              </p>
              <p className="text-base leading-[1.75] text-text sm:text-[17px]">
                • Actionable frameworks you can implement immediately
              </p>
            </div>
            <div className="flex w-full justify-center md:justify-start">
              <iframe
                src="https://sarahzou.substack.com/embed"
                width="520"
                height="380"
                style={{ border: '1px solid #EEE', background: 'white' }}
                frameBorder="0"
                scrolling="no"
                title="Substack signup"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
