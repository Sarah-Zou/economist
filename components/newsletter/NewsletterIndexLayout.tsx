import type { ReactNode } from 'react'

type NewsletterIndexLayoutProps = {
  children: ReactNode
}

export default function NewsletterIndexLayout({ children }: NewsletterIndexLayoutProps) {
  return (
    <main className="resource-editorial min-h-screen bg-page">
      <section className="border-b border-border-soft bg-surface">
        <div className="section-shell grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-24 lg:py-32">
          <div>
            <p className="kicker-accent">Newsletter</p>
            <h1 className="mt-6 max-w-[14ch] font-serif-playfair">
              Weekly pricing and monetization thinking for technical founders
            </h1>
            <p className="mt-7 max-w-[42rem] text-[17px] leading-[1.85] text-text-muted sm:text-[18px]">
              Research, case studies, frameworks, and pricing judgment you can actually use.
            </p>
          </div>
          <div className="border-t border-border pt-5">
            <p className="kicker-muted">The editorial brief</p>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.8] text-text-muted">
              Notes on the choices behind the model: what to measure, where the economics break, and
              how to make the trade-off legible.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-shell grid items-start gap-16 py-20 sm:py-24 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24 lg:py-32">
          <div className="min-w-0">
            <div className="mb-8">
              <p className="kicker-muted">Selected writing</p>
              <h2 className="mt-3 font-serif-playfair">Latest research notes</h2>
            </div>
            {children}
          </div>

          <aside className="border-t border-border pt-6 lg:sticky lg:top-24">
            <p className="kicker-accent">The weekly letter</p>
            <h2 className="mt-4 font-serif-playfair text-ink">
              A sharper view on pricing, growth, and monetization.
            </h2>
            <ul className="mt-7 border-y border-border-soft py-4 text-[14px] leading-[1.7] text-text-muted">
              <li className="border-b border-border-soft py-3">
                Pricing research, experiments, and benchmarks
              </li>
              <li className="border-b border-border-soft py-3">
                Real commercial cases from technical companies
              </li>
              <li className="py-3">Frameworks designed for an operating decision</li>
            </ul>
            <div className="mt-6 overflow-hidden bg-white">
              <iframe
                src="https://sarahzou.substack.com/embed"
                width="520"
                height="320"
                style={{ border: 0, background: 'white' }}
                frameBorder="0"
                scrolling="no"
                title="Substack signup"
                className="block max-w-full"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
