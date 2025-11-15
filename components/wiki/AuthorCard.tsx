import Link from 'next/link';

export default function AuthorCard() {
  return (
    <div className="bg-[#f6f7f9] rounded-2xl p-6 border border-[#e2e6ea]">
      <div>
        <h3 className="text-lg font-semibold text-[#1f2933] mb-1">
          Dr. Sarah Zou
        </h3>
        <p className="text-sm text-[#3b4652] mb-3">
          EconNova Consulting
        </p>
        <p className="text-sm text-[#1f2933] mb-4 leading-[1.65]">
          PhD economist specializing in pricing and monetization strategy for tech startups. 
          Helping startups and scale-ups optimize their pricing for maximum growth.
        </p>
        <Link
          href="/about"
          className="text-[#ff5722] hover:text-[#e44e1f] text-sm font-medium transition-colors"
        >
          Learn more about Sarah →
        </Link>
      </div>
    </div>
  );
}
