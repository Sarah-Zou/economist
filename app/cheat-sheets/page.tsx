import Image from 'next/image'
import { Metadata } from 'next'
import { BookOpen, Users, Network, Tag, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Startup Monetization Roadmap | Free Playbook for Seed–Series A | Sarah Zou',
  description:
    'Free download: 4-phase playbook from zero to first dollar. Value-based pricing, interview scripts, packaging, 30-60-90 plan. For SaaS, APIs & AI. Sign up; link in welcome email.',
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
    canonical: 'https://sarahzou.com/cheat-sheets',
  },
  openGraph: {
    title: 'Startup Monetization Roadmap | Free Playbook for Seed–Series A | Sarah Zou',
    description:
      'Free download: 4-phase playbook from zero to first dollar. Value-based pricing, interview scripts, packaging, 30-60-90 plan. For SaaS, APIs & AI. Sign up; link in welcome email.',
    type: 'website',
    url: 'https://sarahzou.com/cheat-sheets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Monetization Roadmap | Free Playbook for Seed–Series A | Sarah Zou',
    description:
      'Free download: 4-phase playbook from zero to first dollar. Value-based pricing, interview scripts, packaging, 30-60-90 plan. For SaaS, APIs & AI. Sign up; link in welcome email.',
  },
}

export default function CheatSheetsPage() {
  return (
    <>
      <div className="min-h-screen bg-page">
        <div className="section-shell flex flex-col items-center py-16">
          {/* Hero and Subheadline */}
          <section className="w-full max-w-4xl mx-auto mb-12">
            <p className="kicker-accent text-center">Free playbook</p>
            <h1 className="mb-6 mt-4 text-center font-serif-playfair text-[32px] font-bold text-text sm:text-[40px]">
              Sign up for my newsletter and get The Startup Monetization Roadmap for free.
            </h1>
            <h2 className="mx-auto mb-8 max-w-3xl text-center text-lg font-medium leading-[1.9] text-text-muted sm:text-xl">
              A step-by-step playbook to go from zero to first dollar—value-based, investor-grade.
              You'll get the 4-phase system, interview scripts, pricing architecture, and a 30-60-90
              action plan. Subscribe below; the download link arrives in your welcome email.
              Unsubscribe anytime.
            </h2>
            <p className="meta-note text-center">Primary action: subscribe and get the roadmap.</p>
          </section>

          {/* Signup box and image side-by-side on desktop */}
          <section className="w-full max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
              {/* Signup box */}
              <div className="w-full border-t border-border pt-6">
                <h3 className="mb-4 w-full text-left text-2xl font-semibold text-ink sm:text-[28px]">
                  Get the Free Roadmap
                </h3>
                <p className="mb-6 max-w-[32rem] text-[15px] leading-[1.8] text-text-muted sm:text-[16px]">
                  Subscribe once, get the roadmap in your welcome email, and keep receiving weekly
                  insights on pricing, monetization, and commercial economics for technical founders.
                </p>
                <div className="mb-8 flex w-full justify-center md:justify-start">
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
              <div className="flex w-full justify-center">
                <div className="media-shell w-full max-w-[38rem] bg-[#f3ede5] p-4 sm:p-5">
                  <div className="media-inner aspect-[10/11]">
                    <Image
                      src="/images/roadmap_stacked.webp"
                      alt="Preview of The Startup Monetization Roadmap - Cover, First Page, and Last Page"
                      fill
                      className="object-contain p-5 sm:p-7"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What's inside section */}
          <section className="w-full max-w-5xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-4 text-center text-text">
              What's inside
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-[1.8] text-text-muted sm:text-[17px]">
              Everything you need to build a value-based, investor-grade pricing strategy from the
              ground up.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-t border-border pt-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-[14px] bg-brand/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-brand-ink" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mb-2">
                      4 Phases, zero fluff
                    </h3>
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                      Foundations → Packaging/Value Metric → Price Points → Rollout & Policies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-[14px] bg-brand/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-brand-ink" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mb-2">
                      Interview kit
                    </h3>
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                      10-customer discovery sprint, WTP prompts, and synthesis checklist.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-[14px] bg-brand/10 flex items-center justify-center">
                      <Network className="h-6 w-6 text-brand-ink" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mb-2">
                      Architecture decisions
                    </h3>
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                      G/B/B tiers, Leaders/Fillers/Killers, value-metric and model selection.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-[14px] bg-brand/10 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-brand-ink" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mb-2">
                      Price setting, practically
                    </h3>
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                      Value Decoder worksheet, fences, and simple pricing psychology.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-2xl border-t border-border pt-5 md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-[14px] bg-brand/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-brand-ink" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mb-2">
                      30-60-90 plan
                    </h3>
                    <p className="text-base sm:text-[17px] text-text leading-[1.65]">
                      Field-tested tasks to launch pricing and track early signals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who it's for section */}
          <section className="w-full max-w-4xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-playfair text-2xl sm:text-[28px] font-semibold mb-8 text-center text-text">
              Who it's for
            </h2>
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              <span className="rounded-full bg-white px-6 py-3 text-base font-medium text-text shadow-card">
                Seed–Series B Founders
              </span>
              <span className="rounded-full bg-white px-6 py-3 text-base font-medium text-text shadow-card">
                Product & GTM Leads
              </span>
              <span className="rounded-full bg-white px-6 py-3 text-base font-medium text-text shadow-card">
                Fractional Execs
              </span>
            </div>
            <p className="text-base sm:text-[17px] text-text text-center leading-[1.65] max-w-2xl mx-auto">
              who need a defensible, funder-friendly monetization plan in weeks, not months.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
