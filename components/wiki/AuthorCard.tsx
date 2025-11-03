import Link from 'next/link';

export default function AuthorCard() {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Dr. Sarah Zou
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          EconNova Consulting
        </p>
        <p className="text-sm text-gray-700 mb-4">
          PhD economist specializing in SaaS pricing and monetization strategy. 
          Helping startups and scale-ups optimize their pricing for maximum growth.
        </p>
        <Link
          href="/about"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          Learn more about Sarah →
        </Link>
      </div>
    </div>
  );
}
