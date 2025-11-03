import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Diagnostic & Revenue Boost | 2-Week Pricing Strategy | Dr. Sarah Zou',
  description: 'Unlock hidden revenue with our 2-week pricing diagnostic. Get comprehensive pricing audit, competitive benchmarks, and actionable optimization recommendations from PhD economist Sarah Zou.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sarahzou.com/consulting/services/pricing-diagnostic-revenue-boost',
  },
  openGraph: {
    title: 'Pricing Diagnostic & Revenue Boost | Sarah Zou',
    description: 'Unlock hidden revenue with our 2-week pricing diagnostic. Get comprehensive pricing audit, competitive benchmarks, and actionable optimization recommendations.',
    type: 'website',
    url: 'https://sarahzou.com/consulting/services/pricing-diagnostic-revenue-boost',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Diagnostic & Revenue Boost | Sarah Zou',
    description: 'Unlock hidden revenue with our 2-week pricing diagnostic. Get comprehensive pricing audit, competitive benchmarks, and actionable optimization recommendations.',
  },
};


export default function PricingDiagnosticRevenueBoost() {
  return (
    <section className="bg-[#f5f8f7] min-h-screen py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 pt-12">
        {/* Hero Image & Sidebar */}
        <div className="md:col-span-3 flex flex-col items-center md:items-end pr-0 md:pr-8">
          <div className="relative w-[260px] h-[320px] md:w-[280px] md:h-[340px] rounded-tl-[90px] rounded-br-[90px] overflow-hidden shadow-lg border border-[#e5e7eb] bg-white mb-8 md:mb-0">
            <Image src="/images/P-1.webp" alt="Pricing Diagnostic & Revenue Boost" fill className="object-cover" />
          </div>
        </div>
        {/* Main Content */}
        <main className="md:col-span-9 bg-white rounded-tl-[60px] rounded-br-[60px] shadow-lg border border-[#e5e7eb] px-8 md:px-16 py-12 flex flex-col justify-center">
          <div className="flex flex-col gap-2 mb-6">
            <span className="uppercase tracking-widest text-xs text-[#4b636e] font-semibold mb-2">Consulting Service</span>
            <h1 className="font-serif-playfair text-5xl font-bold text-[#223] mb-2 leading-tight">Pricing Quickstart</h1>
            <span className="text-[#ff5722] text-lg font-medium">Diagnostic & Blueprint to align price & packaging in 14 days. </span>
          </div>
          <div className="my-8" />
          <div className="space-y-10">
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Why It Matters</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-2">
                <li>Pricing is often the biggest lever for revenue growth</li>
                <li>Many companies leave money on the table with suboptimal pricing</li>
                <li>Data-driven pricing decisions lead to better margins and growth</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">What You Get</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-playfair text-xl font-bold text-[#223] mb-3">Lite — Diagnostic (Desk Analysis only)</h3>
                  <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-2">
                    <li>ICP & value map (jobs/outcomes, price fences)</li>
                    <li>Tier & price table (seats/usage/features/geo), with unit-econ floors/ceilings</li>
                    <li>Pricing page copy (hero, plan blurbs, FAQs, comparison table)</li>
                    <li>Experiment plan (hypotheses, metrics, guardrails, success thresholds)</li>
                    <li>Health scorecard template (conv %, ARPU, churn/NRR, CAC payback)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif-playfair text-xl font-bold text-[#223] mb-3">Pro — Diagnostic + Evidence (Customer Value Research Pack included)</h3>
                  <p className="text-base text-[#4b636e] font-light mb-3">Everything in Lite, plus the full Customer Value Research Pack:</p>
                  <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-2">
                    <li>8–10 interviews (clips + notes) targeting your first ICPs</li>
                    <li>Pulse WTP survey (PSM/van Westendorp) to set confidence bands</li>
                    <li>Value driver matrix & price fence recommendations by segment/use case</li>
                    <li>Calibration of tiers, claims, and page copy with real customer signals</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-base text-[#4b636e] font-light leading-relaxed">
                    <strong>Prefer research-only first?</strong> See <a href="/consulting/services/customer-value-research-pack" className="text-[#ff5722] hover:underline">Customer Value Research Pack (standalone)</a>.<br/>
                    <strong>Started on Lite and need evidence?</strong> Upgrade to Pro by Day 3 with no delay to timeline.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Process</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-2">
                <li><strong>Day 0–1 — Kickoff & Intake:</strong> goals, ICPs, constraints, data pull</li>
                <li><strong>Day 2–5 — Signals & Modeling:</strong> comps, floors/ceilings, scenarios (Pro: launch interviews & survey)</li>
                <li><strong>Day 6–9 — Design:</strong> packaging, fences, first pass page copy (Pro: integrate early evidence)</li>
                <li><strong>Day 10–12 — Review:</strong> exec alignment, risk & guardrails</li>
                <li><strong>Day 13–14 — Handoff:</strong> final kit + 30/60/90 experiment plan</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Outcomes</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-2">
                <li>A tested price ladder you can ship now (with guardrails)</li>
                <li>Clear go/no-go criteria and success thresholds for experiments</li>
                <li>Shared language & artifacts for Exec/Product/Sales enablement</li>
              </ul>
            </section>
            <section>
              <div className="text-base text-[#4b636e] font-light mb-2"><span className="font-bold text-[#223]">Timeline & Price:</span> 14 days | $3.5k Lite (Diagnostic) / $6k Pro (with Research Pack)</div>
            </section>
          </div>
          {/* CTA Box */}
          <div className="bg-[#f5f5f5] rounded-lg p-6 mt-12 flex flex-col md:flex-row items-center gap-6 border border-[#e5e7eb] shadow-sm">
            <Image src="/images/headshot_v2.jpg" alt="Sarah Zou headshot" width={80} height={80} className="rounded-full object-cover" />
            <div>
              <div className="font-serif-playfair text-lg font-bold mb-1">Ready to begin your journey?</div>
              <div className="text-[#4b636e] mb-2">Book a free intake call or send a message to discuss your goals.</div>
              <a
                href="https://calendly.com/sarahxzou/free-pricing-consult-25-min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#ff5722] text-white px-4 py-2 rounded font-semibold hover:bg-[#e64a19] transition"
              >
                Book Intake Call
              </a>
            </div>
          </div>
          {/* Contact Form */}
          <div className="mt-16">
            <h2 className="font-serif-playfair text-2xl font-bold mb-4 text-[#223]">Let's get in touch</h2>
            <form action="https://formspree.io/f/mdkgqeye" method="POST" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="flex-1 px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="flex-1 px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                required
              />
              <textarea
                name="message"
                placeholder="Say Hello"
                rows={5}
                className="w-full px-4 py-3 border border-[#e5e7eb] bg-[#f8fafb] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#223]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#ff5722] text-white font-bold py-3 rounded transition-colors hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2 shadow"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
} 