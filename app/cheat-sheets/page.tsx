import Image from 'next/image';
import { Metadata } from 'next';

const cheatSheets = [
  {
    title: 'Metrics-Storytelling One-Pager',
    blurb: 'Pitch decks only have one metrics slide—make it legendary. Map the exact KPIs and narrative beats VCs want to see, from Pre-Seed spark to Pre-IPO scale.',
  },
  {
    title: 'SaaS Benchmark Source Navigator',
    blurb: 'Never quote stale numbers again. A side-by-side scorecard of 9 major SaaS surveys and index datasets—ranked by freshness, sample size, stage fit, and bias—so you can grab the right benchmark the first time.',
  },
  {
    title: 'Stage-Smart Metrics Benchmarks 2025 Q2',
    blurb: 'Seed, A, B, or beyond—instantly spot median vs. top-quartile ARR growth, GRR, NRR, CAC payback, burn multiple, ARR/FTE, and more. Updated with Q2 2025 data so you know exactly where you stand.',
  },
];

export const metadata: Metadata = {
  title: "SaaS Cheat-Sheets Bundle | Free Download | Sarah Zou",
  description: "Sign up for my newsletter and get 3 SaaS cheat-sheets for free. Instantly access metrics storytelling, benchmark navigator, and 2025-Q2 benchmarks.",
  openGraph: {
    title: "SaaS Cheat-Sheets Bundle | Free Download | Sarah Zou",
    description: "Sign up for my newsletter and get 3 SaaS cheat-sheets for free. Instantly access metrics storytelling, benchmark navigator, and 2025-Q2 benchmarks.",
    type: "website",
    url: "https://sarahzou.com/cheat-sheets",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Cheat-Sheets Bundle | Free Download | Sarah Zou",
    description: "Sign up for my newsletter and get 3 SaaS cheat-sheets for free. Instantly access metrics storytelling, benchmark navigator, and 2025-Q2 benchmarks.",
  },
  alternates: {
    canonical: "https://sarahzou.com/cheat-sheets",
  },
};

export default function CheatSheetsPage() {
  return (
    <>
      <div className="min-h-screen bg-[#fff8f2]">
        <div className="max-w-8xl mx-auto px-4 py-16 flex flex-col items-center">
          {/* Hero and Subheadline */}
          <section className="w-full max-w-4xl mx-auto mb-8">
            <h1 className="font-serif-playfair text-4xl md:text-5xl font-bold mb-6 text-[#ff5722] text-center">Sign up for my newsletter and get 3 SaaS cheat sheets for free.</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-8 text-[#222] text-center">I distilled thousands of data points from 10+ reports and indexes into 3 clear, actionable cheat sheets. Subscribe below—download links arrive in your welcome email. Unsubscribe anytime.</h2>
          </section>
          {/* Signup box and image side-by-side on desktop */}
          <section className="w-full max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Signup box */}
              <div className="flex flex-col items-center md:items-start w-full">
                <h3 className="text-2xl font-bold mb-2 text-[#ff5722] text-left w-full">Get the bundle now</h3>
                <p className="text-lg mb-4 text-[#222] text-left w-full">Enter your email to join EconNova Consulting. You'll instantly receive the Metrics-Storytelling, Benchmark Navigator, and Stage-Smart cheat sheets. No spam—just weekly 5-minute insights on SaaS pricing, AI economics, and growth benchmarks.</p>
                <div className="w-full flex justify-center md:justify-start">
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
                  src="/images/cheatsheet_images.png"
                  alt="Preview of SaaS cheat-sheets bundle"
                  width={1000}
                  height={1125}
                  className="rounded-2xl object-contain"
                  priority
                />
              </div>
            </div>
          </section>
          {/* 3-card grid below */}
          <section className="w-full max-w-5xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cheatSheets.map((sheet, idx) => (
                <div key={idx} className="bg-[#fafbfc] rounded-3xl shadow-md border border-[#f0f0f0] flex flex-col items-start p-6 transition hover:shadow-lg">
                  <h3 className="font-serif-playfair text-xl font-bold mb-2 text-[#222]">{sheet.title}</h3>
                  <p className="text-[#4b636e] text-base mb-2">{sheet.blurb}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 