import Link from 'next/link';

export default function FAQSection() {
  return (
    <section>
      <h2 className="font-serif-playfair text-3xl md:text-4xl font-bold text-[#223] mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">We have almost no data. Will this still work?</h3>
          <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
            Yes. I install a minimal KPI loop, define your metric tree, and set thresholds so you can make decisions immediately.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">Which tools do you use?</h3>
          <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
            I integrate with your stack; common setups include GTM/GA/Amplitude/Mixpanel, plus a light instrumentation add-on if needed.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What if our data is messy?</h3>
          <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
            I deliver an event patch list and governance basics so dashboards stay trustworthy and actionable.
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 sm:p-6 border border-[#e5e7eb] shadow-sm">
          <h3 className="font-bold text-lg sm:text-xl mb-3 text-[#223]">What exactly do we get?</h3>
          <p className="text-sm sm:text-base text-[#4b636e] font-light leading-relaxed">
            Founders + GTM/Product <strong>dashboards</strong>, <strong>KPI glossary + thresholds</strong>, <strong>experiment backlog</strong> and <strong>test briefs</strong>, and a 30-day plan with check-in. See <Link href="/consulting/services/metrics-experimentation-sprint" className="text-[#ff5722] hover:underline">deliverables</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

