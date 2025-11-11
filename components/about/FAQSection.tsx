import Link from 'next/link';

export default function FAQSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#223]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What problems do you solve most often?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              First price and packaging, price increases with minimal churn, usage vs. tiered model decisions, "why us/why now" economics for fundraising, and putting metrics into a weekly decision cadence.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Who do you work with?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Pre-seed to Series A SaaS/API/AI and operator-led marketplaces. I'm effective when a founder wants research-grade rigor without big-company bloat.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">How are you different from a fractional CFO, data scientist, or RevOps?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              CFO manages cash and reporting; I design how you create cash (pricing, margins, NRR). Data science predicts/optimizes; I decide what economic questions matter and set guardrails. RevOps runs GTM processes; I define what you sell, to whom, and at what economics.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What's your working style?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Short, high-intensity sprints that ship decisions in 1–2 weeks, followed by a light operating cadence to learn and iterate. Everything is hypothesis-driven, documented, and testable.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What do engagements look like?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Start with a 30-min consult → pick a <Link href="/consulting/services/pricing-monetization-sprint" className="text-[#ff5722] hover:underline">Monetization Sprint</Link> or <Link href="/consulting/services/metrics-experimentation-sprint" className="text-[#ff5722] hover:underline">Metrics Sprint</Link> → optional <Link href="/consulting/services/on-call-economist-retainer" className="text-[#ff5722] hover:underline">retainer</Link> for ongoing pricing moves, forward models, and experiment cadence. Fixed deliverables, clear timelines.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What deliverables should we expect?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              A <strong>pricing/packaging strategy</strong>, <strong>unit-economics model</strong>, <strong>discount/fence policy</strong>, <strong>experiment briefs</strong>, <strong>KPI glossary</strong> and <strong>dashboards</strong>, and an <strong>Economist's Board Pack</strong> for narrative and tracking.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Do you work pre-product or pre-revenue?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Yes. I'll define the value metric, design testable tiers, and set decision thresholds so you can launch with confidence and adjust with data.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Will you integrate with our stack?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Yes—common tools include GA/GTM, Amplitude/Mixpanel, spreadsheets, and your data warehouse. I keep instrumentation "light but correct" so dashboards stay trustworthy.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">How do you handle confidentiality and IP?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              I sign MNDA/MSA; client data stays in your systems; work product is yours. I maintain a conflict log and never cross-pollinate proprietary details.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Do you train our team?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Yes. I upskill founders and leads on pricing, experimentation, and metric reading, and I can coach a junior analyst to maintain the cadence after the sprint.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Where are you based and when are you available?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              NYC/Princeton area, remote-first with on-site options. I cover US/EU time zones and typically start new sprints within 1–2 weeks.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What's your background?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              PhD economist with MS in Finance & Statistics; experience across research, enterprise transformation, and high-growth startups. My edge is combining academic rigor with operator pragmatism.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Do you take equity or flexible comp?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Cash is standard for sprints; retainers can mix cash/equity when aligned with scope and stage.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
            <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">How do we start?</h3>
            <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
              Share context, book a consult, and we'll scope a sprint with clear questions, inputs, and a day-by-day plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

