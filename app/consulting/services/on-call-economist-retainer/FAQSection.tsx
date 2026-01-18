import Link from 'next/link';

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What's the difference between Starter, Growth, and Scale?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Time/attention and depth. Starter (~0.5 d/wk, $4k/mo) focuses on guidance; Growth (~1 d/wk, $8k/mo) runs active experiments; Scale (~2 d/wk, $15k/mo) handles complex monetization and fundraise prep. See <Link href="/consulting/services/on-call-economist-retainer" className="text-[#ff5722] hover:underline">pricing tiers</Link>.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Can we upgrade/downgrade or pause?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Yes—plans are flexible as needs change (e.g., ramp up pre-fundraise, step down post-launch).
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What happens during onboarding?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Week 0–2: scope + access → baseline metrics → first pricing/test move → first Economist's Board Pack.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What do you own each month?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Pricing moves/tests, forward models (NRR/LTV/GM bridges, runway), an <strong>Economist's Board Pack</strong>, and a learning loop with readouts → next bets.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Do you work with our existing tools and teams?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Yes—Marketing/Sales, Product/Data, and Finance/Planning are included in your operating cadence.
          </p>
        </div>
      </div>
    </section>
  );
}

