import Link from 'next/link';

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold text-[#1f2933] mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Will this work if we're pre-revenue?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Yes. Pre-revenue or pre-MVP is the perfect timing to start designing your first pricing strategy. The sprint is designed for pre-launch through &lt;$3M ARR to make your first price investor-credible and testable.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Will customers churn if we raise prices?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            We pair guardrails with plan fences, run low-risk experiments, and read impact via unit-economics snapshots—minimizing exposure while learning.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">Can we switch to usage-based?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            If a usage metric truly tracks value, we'll validate the metric, design hybrid fences, and ship a 30-day rollout plan with comms.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What do you need from us to start?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            Discovery inputs/data room and a current-state scan, followed by two focused workshops to lock positioning, customer segmentations, value metric, tiers, guardrails, and etc.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-semibold text-[20px] sm:text-[22px] mb-3 text-[#1f2933]">What exactly do we get?</h3>
          <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
            A <strong>pricing strategy report</strong>, <strong>unit-economics model</strong>, <strong>pricing implementation roadmap</strong>, <strong>experiment briefs</strong>, and <strong>investor mini-pack</strong>—delivered in one to two weeks. See <Link href="/consulting/services/pricing-monetization-sprint" className="text-[#ff5722] hover:underline">deliverables</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

