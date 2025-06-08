import Image from 'next/image';
import Link from 'next/link';

const services = [
  { slug: 'investor-deck-accelerator', title: 'Investor Deck Accelerator' },
  { slug: 'saas-metrics-clarity-pack', title: 'SaaS Metrics Clarity Pack' },
  { slug: 'competitive-benchmark-insights', title: 'Competitive Benchmark Insights' },
  { slug: 'runway-scenario-model', title: 'Runway & Scenario Model' },
  { slug: 'investor-updates-automation-kit', title: 'Investor Updates Automation Kit' },
  { slug: 'on-call-economist-retainer', title: 'On-Call Economist Retainer' },
  { slug: 'pricing-diagnostic-revenue-boost', title: 'Pricing Diagnostic & Revenue Boost' },
  { slug: 'customer-value-research-pack', title: 'Customer Value Research Pack' },
  { slug: 'value-based-monetization-design', title: 'Value-Based Monetization Design' },
  { slug: 'rapid-pricing-experiment-toolkit', title: 'Rapid Pricing Experiment Toolkit' },
  { slug: 'price-change-comms-playbook', title: 'Price Change Comms Playbook' },
  { slug: 'profitability-simulator', title: 'Profitability Simulator' },
  { slug: 'investor-monetization-pitch-kit', title: 'Investor Monetization Pitch Kit' },
  { slug: 'pricing-optimization-retainer', title: 'Pricing Optimization Retainer' },
];

export default function CustomerValueResearchPack() {
  return (
    <section className="bg-[#f5f8f7] min-h-screen py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 pt-12">
        {/* Hero Image & Sidebar */}
        <div className="md:col-span-3 flex flex-col items-center md:items-end pr-0 md:pr-8">
          <div className="relative w-[260px] h-[320px] md:w-[280px] md:h-[340px] rounded-tl-[90px] rounded-br-[90px] overflow-hidden shadow-lg border border-[#e5e7eb] bg-white mb-8 md:mb-0">
            <Image src="/images/P-2.webp" alt="Customer Value Research Pack" fill className="object-cover" />
          </div>
          <nav className="hidden md:block mt-10 w-full max-w-[180px]">
            <h3 className="uppercase tracking-widest text-[11px] text-[#7a8a99] font-semibold mb-3 pl-1">Other Services</h3>
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/consulting/services/${service.slug}`} className="block px-2 py-1 rounded text-[#7a8a99] hover:text-[#ff5722] text-sm transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Main Content */}
        <main className="md:col-span-9 bg-white rounded-tl-[60px] rounded-br-[60px] shadow-lg border border-[#e5e7eb] px-8 md:px-16 py-12 flex flex-col justify-center">
          <div className="flex flex-col gap-2 mb-6">
            <span className="uppercase tracking-widest text-xs text-[#4b636e] font-semibold mb-2">Consulting Service</span>
            <h1 className="font-serif-playfair text-5xl font-bold text-[#223] mb-2 leading-tight">Customer Value Research Pack</h1>
            <span className="text-[#ff5722] text-lg font-medium">Understand your customers' value perception to drive growth.</span>
          </div>
          <div className="my-8" />
          <div className="space-y-10">
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Why It Matters</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Understanding customer value is key to pricing and growth</li>
                <li>Data-driven insights help align product with market needs</li>
                <li>Better customer understanding leads to stronger retention</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">What You Get</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Customer value research report</li>
                <li>Value perception analysis</li>
                <li>Actionable recommendations for product and pricing</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Process</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Customer interviews and surveys</li>
                <li>Data analysis and insights generation</li>
                <li>Strategy development and implementation plan</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Outcomes</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Clear understanding of customer value perception</li>
                <li>Improved product-market fit</li>
                <li>Enhanced customer retention and growth</li>
              </ul>
            </section>
            <section>
              <div className="text-base mb-2"><span className="font-bold">Timeline & Price:</span> 3 weeks | $4k</div>
            </section>
          </div>
          {/* CTA Box */}
          <div className="bg-[#f5f5f5] rounded-lg p-6 mt-12 flex flex-col md:flex-row items-center gap-6 border border-[#e5e7eb] shadow-sm">
            <Image src="/images/headshot_v2.jpg" alt="Sarah Zou headshot" width={80} height={80} className="rounded-full object-cover" />
            <div>
              <div className="font-serif-playfair text-lg font-bold mb-1">Ready to begin your journey?</div>
              <div className="text-[#4b636e] mb-2">Book a free intake call or send a message to discuss your goals.</div>
              <a
                href="https://calendly.com/sarahz-saas-economist"
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