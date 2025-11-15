import Image from 'next/image';
import { Metadata } from 'next';
import { BookOpen, Users, Network, Tag, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: "The Startup Monetization Roadmap | Free Download | Sarah Zou",
  description: "A step-by-step playbook to go from zero to first dollar—value-based, investor-grade. Get the 4-phase system, interview scripts, pricing architecture, and 30-60-90 action plan.",
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
    canonical: "https://sarahzou.com/cheat-sheets",
  },
  openGraph: {
    title: "The Startup Monetization Roadmap | Free Download | Sarah Zou",
    description: "A step-by-step playbook to go from zero to first dollar—value-based, investor-grade. Get the 4-phase system, interview scripts, pricing architecture, and 30-60-90 action plan.",
    type: "website",
    url: "https://sarahzou.com/cheat-sheets",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Startup Monetization Roadmap | Free Download | Sarah Zou",
    description: "A step-by-step playbook to go from zero to first dollar—value-based, investor-grade. Get the 4-phase system, interview scripts, pricing architecture, and 30-60-90 action plan.",
  },
};

export default function CheatSheetsPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-8xl mx-auto px-4 py-16 flex flex-col items-center">
          {/* Hero and Subheadline */}
          <section className="w-full max-w-4xl mx-auto mb-12">
            <h1 className="font-serif-playfair text-[32px] sm:text-[36px] font-bold mb-6 text-[#ff5722] text-center">
              Sign up for my newsletter and get The Startup Monetization Roadmap for free.
            </h1>
            <h2 className="text-lg sm:text-xl font-medium mb-8 text-[#1f2933] text-center leading-[1.65]">
              A step-by-step playbook to go from zero to first dollar—value-based, investor-grade. You'll get the 4-phase system, interview scripts, pricing architecture, and a 30-60-90 action plan. Subscribe below; the download link arrives in your welcome email. Unsubscribe anytime.
            </h2>
          </section>
          
          {/* Signup box and image side-by-side on desktop */}
          <section className="w-full max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Signup box */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h3 className="text-2xl sm:text-[28px] font-semibold mb-4 text-[#ff5722] text-left w-full">Get the Free Roadmap</h3>
                <div className="w-full flex justify-center md:justify-start mb-8">
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
              {/* Image */}
              <div className="flex justify-center w-full">
                <Image
                  src="/images/roadmap_stacked.webp"
                  alt="Preview of The Startup Monetization Roadmap - Cover, First Page, and Last Page"
                  width={1000}
                  height={1125}
                  className="rounded-2xl object-contain"
                  priority
                />
              </div>
            </div>
          </section>

          {/* What's inside section */}
          <section className="w-full max-w-5xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-4 text-center text-[#ff5722]">
              What's inside
            </h2>
            <p className="text-base sm:text-[17px] text-[#1f2933] mb-12 text-center max-w-3xl mx-auto leading-[1.65]">
              Everything you need to build a value-based, investor-grade pricing strategy from the ground up.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#ff5722]/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-[#ff5722]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold text-[#1f2933] mb-2">4 Phases, zero fluff</h3>
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                      Foundations → Packaging/Value Metric → Price Points → Rollout & Policies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#ff5722]/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-[#ff5722]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] font-semibold text-[#1f2933] mb-2">Interview kit</h3>
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                      10-customer discovery sprint, WTP prompts, and synthesis checklist.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#ff5722]/10 flex items-center justify-center">
                      <Network className="h-6 w-6 text-[#ff5722]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1f2933] mb-2">Architecture decisions</h3>
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                      G/B/B tiers, Leaders/Fillers/Killers, value-metric and model selection.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#e2e6ea] hover:border-[#ff5722] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#ff5722]/10 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-[#ff5722]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1f2933] mb-2">Price setting, practically</h3>
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                      Value Decoder worksheet, fences, and simple pricing psychology.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-[#ff5722] transition-colors md:col-span-2 max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#ff5722]/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-[#ff5722]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1f2933] mb-2">30-60-90 plan</h3>
                    <p className="text-base sm:text-[17px] text-[#1f2933] leading-[1.65]">
                      Field-tested tasks to launch pricing and track early signals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who it's for section */}
          <section className="w-full max-w-4xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-8 text-center text-[#1f2933]">
              Who it's for
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="bg-[#f6f7f9] text-[#1f2933] px-6 py-3 rounded-full text-base font-medium shadow-sm hover:bg-[#e2e6ea] transition-colors">
                Seed–Series B Founders
              </span>
              <span className="bg-[#f6f7f9] text-[#1f2933] px-6 py-3 rounded-full text-base font-medium shadow-sm hover:bg-[#e2e6ea] transition-colors">
                Product & GTM Leads
              </span>
              <span className="bg-[#f6f7f9] text-[#1f2933] px-6 py-3 rounded-full text-base font-medium shadow-sm hover:bg-[#e2e6ea] transition-colors">
                Fractional Execs
              </span>
            </div>
            <p className="text-base sm:text-[17px] text-[#1f2933] text-center leading-[1.65] max-w-2xl mx-auto">
              who need a defensible, funder-friendly monetization plan in weeks, not months.
            </p>
          </section>
        </div>
      </div>
    </>
  );
} 