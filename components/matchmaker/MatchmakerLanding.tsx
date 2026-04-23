'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { MatchmakerQuiz } from '@/components/matchmaker/MatchmakerQuiz'

export function MatchmakerLanding() {
  const [started, setStarted] = useState(false)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      {!started ? (
        <section className="flex min-h-[72svh] flex-col items-center justify-center py-10 text-center sm:min-h-[72vh] sm:py-20">
          <div className="mb-8 w-full max-w-2xl">
            <div className="media-shell bg-[#f2ece5] p-3">
              <div className="media-inner aspect-[2/1]">
                <Image
                  src="/images/pmm_hero_image.png"
                  alt="Pricing Model Matchmaker hero illustration"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          <p className="kicker">Interactive tool</p>
          <h1 className="mt-5 font-serif-playfair text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            Pricing Model Matchmaker
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-[1.8] text-text-muted sm:mt-5 sm:text-lg">
            Find the right pricing model + metric for your SaaS/API/AI product in 3 minutes. Answer
            10-15 questions about your product, customers, and costs to get tailored
            recommendations.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-7 inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-[14px] bg-brand px-6 py-3 text-base font-semibold text-white shadow-card transition hover:-translate-y-px hover:bg-brand-ink hover:shadow-card-hover sm:mt-8 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            Start the Matchmaker
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="mt-8 text-sm text-text-subtle">
            Designed for Pre-seed to Series A founders.
          </p>

          <section className="mx-auto mt-16 w-full max-w-2xl" id="faq">
            <h2 className="mb-6 text-center font-serif-playfair text-2xl font-semibold text-text sm:mb-8 sm:text-[28px]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="rounded-card border border-border-soft bg-white/92 p-5 shadow-card sm:p-6">
                <h3 className="mb-2 text-[20px] font-semibold text-text sm:mb-3 sm:text-[22px]">
                  What is the Pricing Model Matchmaker?
                </h3>
                <p className="text-base leading-[1.75] text-text-muted sm:text-[17px]">
                  A short quiz that recommends a pricing model (e.g. usage-based, hybrid, tiered), a
                  headline metric to charge on, and a GTM wrapper (freemium vs free trial). You get
                  a tailored result plus optional email report—all free.
                </p>
              </div>
              <div className="rounded-card border border-border-soft bg-white/92 p-5 shadow-card sm:p-6">
                <h3 className="mb-2 text-[20px] font-semibold text-text sm:mb-3 sm:text-[22px]">
                  How long does it take?
                </h3>
                <p className="text-base leading-[1.75] text-text-muted sm:text-[17px]">
                  About 3 minutes. You answer 10–15 questions about your product, customers, and
                  costs. Most questions are single-choice; you can pick “Not sure” when you’re
                  uncertain.
                </p>
              </div>
              <div className="rounded-card border border-border-soft bg-white/92 p-5 shadow-card sm:p-6">
                <h3 className="mb-2 text-[20px] font-semibold text-text sm:mb-3 sm:text-[22px]">
                  Is it really free?
                </h3>
                <p className="text-base leading-[1.75] text-text-muted sm:text-[17px]">
                  Yes. The on-page recommendation is free. You can optionally request a detailed
                  report by email—also free, no spam. Designed for Pre-seed to Series B founders who
                  want a fast, practical starting point.
                </p>
              </div>
              <div className="rounded-card border border-border-soft bg-white/92 p-5 shadow-card sm:p-6">
                <h3 className="mb-2 text-[20px] font-semibold text-text sm:mb-3 sm:text-[22px]">
                  What do I get at the end?
                </h3>
                <p className="text-base leading-[1.75] text-text-muted sm:text-[17px]">
                  A best-fit model and metric, launch-now vs evolve-later guidance, why it fits,
                  watch-outs, and what to do next. You can copy the summary or request a fuller
                  report by email. If you want help implementing, you can book a free consult or
                  explore a Pricing Sprint.
                </p>
              </div>
              <div className="rounded-card border border-border-soft bg-white/92 p-5 shadow-card sm:p-6">
                <h3 className="mb-2 text-[20px] font-semibold text-text sm:mb-3 sm:text-[22px]">
                  What if I’m not sure about some answers?
                </h3>
                <p className="text-base leading-[1.75] text-text-muted sm:text-[17px]">
                  You can choose “Not sure” for any question. The tool still gives a recommendation
                  and may suggest a confidence level. For “Not sure” answers, it’s fine to guess
                  based on your target customer or closest competitors.
                </p>
              </div>
            </div>
          </section>
        </section>
      ) : null}

      {started ? <MatchmakerQuiz onRestart={() => setStarted(false)} /> : null}
    </div>
  )
}
