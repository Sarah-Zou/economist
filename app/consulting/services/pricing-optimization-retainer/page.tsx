import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Optimization Retainer | Monthly Pricing Strategy | Sarah Zou',
  description: 'Get continuous pricing edge with our monthly retainer. Includes 2 tests/month, deal desk help, and policy tuning from PhD economist Sarah Zou.',
  openGraph: {
    title: 'Pricing Optimization Retainer | Sarah Zou',
    description: 'Get continuous pricing edge with our monthly retainer. Includes 2 tests/month, deal desk help, and policy tuning.',
    type: 'website',
  },
};


export default function PricingOptimizationRetainer() {
  return (
    <section className="bg-[#f5f8f7] min-h-screen py-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 pt-12">
        {/* Hero Image & Sidebar */}
        <div className="md:col-span-3 flex flex-col items-center md:items-end pr-0 md:pr-8">
          <div className="relative w-[260px] h-[320px] md:w-[280px] md:h-[340px] rounded-tl-[90px] rounded-br-[90px] overflow-hidden shadow-lg border border-[#e5e7eb] bg-white mb-8 md:mb-0">
            <Image src="/images/P-8.webp" alt="Pricing Optimization Retainer" fill className="object-cover" />
          </div>
        </div>
        {/* Main Content */}
        <main className="md:col-span-9 bg-white rounded-tl-[60px] rounded-br-[60px] shadow-lg border border-[#e5e7eb] px-8 md:px-16 py-12 flex flex-col justify-center">
          <div className="flex flex-col gap-2 mb-6">
            <span className="uppercase tracking-widest text-xs text-[#4b636e] font-semibold mb-2">Consulting Service</span>
            <h1 className="font-serif-playfair text-5xl font-bold text-[#223] mb-2 leading-tight">Pricing Optimization Retainer</h1>
            <span className="text-[#ff5722] text-lg font-medium">Ongoing support to continuously optimize your pricing strategy.</span>
          </div>
          <div className="my-8" />
          <div className="space-y-10">
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Why It Matters</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Maintain optimal pricing in changing markets</li>
                <li>Continuously improve revenue performance</li>
                <li>Stay ahead of competitive pressures</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">What You Get</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Monthly pricing strategy review</li>
                <li>Ongoing optimization recommendations</li>
                <li>Market and competitor analysis</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Process</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Regular data analysis and review</li>
                <li>Strategy adjustments and implementation</li>
                <li>Performance monitoring and reporting</li>
              </ul>
            </section>
            <section>
              <h2 className="font-serif-playfair text-2xl font-bold text-[#223] mb-2">Outcomes</h2>
              <ul className="list-disc ml-6 text-base text-[#4b636e] font-light space-y-1">
                <li>Sustained revenue growth</li>
                <li>Adaptive pricing strategy</li>
                <li>Competitive market position</li>
              </ul>
            </section>
            <section>
              <div className="text-base mb-2"><span className="font-bold">Timeline & Price:</span> Monthly | $3k/month</div>
            </section>
          </div>
          {/* CTA Box */}
          <div className="bg-[#f5f5f5] rounded-lg p-6 mt-12 flex flex-col md:flex-row items-center gap-6 border border-[#e5e7eb] shadow-sm">
            <Image src="/images/headshot_v2.jpg" alt="Sarah Zou headshot" width={80} height={80} className="rounded-full object-cover" />
            <div>
              <div className="font-serif-playfair text-lg font-bold mb-1">Ready to begin your journey?</div>
              <div className="text-[#4b636e] mb-2">Book a free intake call or send a message to discuss your goals.</div>
              <a
                href="https://calendly.com/d/cspp-v8x-qpj/free-pricing-consult-25-min"
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