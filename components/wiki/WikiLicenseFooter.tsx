import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function WikiLicenseFooter() {
  return (
    <div className="mt-16 pt-8 border-t border-border-subtle">
      <div className="bg-surface rounded-lg p-6 border border-border-subtle">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-text text-sm mb-2">Reuse & Attribution</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              This content is available for reuse with attribution. When referencing or republishing, 
              please credit{' '}
              <Link href="/about" className="text-brand-ink hover:underline font-medium">
                Dr. Sarah Zou
              </Link>
              {' '}and link back to the original source.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer license"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-ink transition-colors"
              aria-label="Creative Commons Attribution 4.0 International License"
            >
              <span className="text-2xl" aria-hidden="true">CC</span>
              <span className="text-xs">BY 4.0</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          Licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-ink hover:underline"
          >
            Creative Commons Attribution 4.0 International
          </a>
          . You are free to share and adapt this material, provided you give appropriate credit.
        </p>
      </div>
    </div>
  );
}

