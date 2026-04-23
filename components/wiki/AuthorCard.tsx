import Link from 'next/link';

export default function AuthorCard() {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-border-subtle">
      <div>
        <h3 className="text-lg font-semibold text-text mb-1">
          Dr. Sarah Zou
        </h3>
        <p className="text-sm text-text-muted mb-3">
          EconNova Consulting
        </p>
        <p className="text-sm text-text mb-4 leading-[1.65]">
          PhD economist specializing in pricing and monetization strategy for tech startups. 
          Helping startups and scale-ups optimize their pricing for maximum growth.
        </p>
        <Link
          href="/about"
          className="text-brand-ink hover:text-brand-ink/90 text-sm font-medium transition-colors"
        >
          Learn more about Sarah →
        </Link>
      </div>
    </div>
  );
}
