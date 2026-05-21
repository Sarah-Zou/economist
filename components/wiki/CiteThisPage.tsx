'use client';

import { useState } from 'react';
import { Copy, Check, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const DEFAULT_PUBLICATION_TITLE = 'Pricing & Monetization Wiki';

export interface CiteThisPageProps {
  canonicalUrl: string;
  title: string;
  /** Section or series name shown in the citation (e.g. wiki category or "Newsletter"). */
  collectionTitle?: string;
  /** @deprecated Use collectionTitle */
  categoryTitle?: string;
  publicationTitle?: string;
  lastUpdated?: string;
  /** @deprecated Use slug */
  conceptSlug?: string;
  slug?: string;
}

function formatSuggestedCitation(
  title: string,
  publicationTitle: string,
  url: string,
  lastUpdated?: string,
  collectionTitle?: string
): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear();
  if (collectionTitle) {
    return `Zou, S. (${year}). ${title}. In ${collectionTitle}. ${publicationTitle}. ${url}`;
  }
  return `Zou, S. (${year}). ${title}. ${publicationTitle}. ${url}`;
}

function formatBibTeX(
  title: string,
  publicationTitle: string,
  url: string,
  lastUpdated?: string,
  slug?: string,
  collectionTitle?: string
): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear();
  const key = slug
    ? `zou-${slug}`
    : `zou-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  const note = lastUpdated ? `Last updated: ${lastUpdated}` : '';
  const noteLine = note ? `\n  note = {${note}},` : '';
  const howpublished = collectionTitle
    ? `{${publicationTitle}, ${collectionTitle}}`
    : `{${publicationTitle}}`;
  return `@misc{${key},
  author = {Zou, Sarah},
  title = {{${title}}},
  howpublished = ${howpublished},
  year = {${year}},
  url = {${url}},${noteLine}
}`;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs text-brand-ink hover:text-brand-ink/90 font-medium"
      aria-label={label}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function CiteThisPage({
  canonicalUrl,
  title,
  collectionTitle,
  categoryTitle,
  publicationTitle = DEFAULT_PUBLICATION_TITLE,
  lastUpdated,
  conceptSlug,
  slug,
}: CiteThisPageProps) {
  const [showBibTeX, setShowBibTeX] = useState(false);
  const sectionTitle = collectionTitle ?? categoryTitle;
  const bibSlug = slug ?? conceptSlug;
  const suggestedCitation = formatSuggestedCitation(
    title,
    publicationTitle,
    canonicalUrl,
    lastUpdated,
    sectionTitle
  );
  const bibTeX = formatBibTeX(
    title,
    publicationTitle,
    canonicalUrl,
    lastUpdated,
    bibSlug,
    sectionTitle
  );

  return (
    <div className="border border-border-subtle rounded-lg bg-[#fafafa] p-4 mt-6 overflow-hidden">
      <h3 className="text-sm font-semibold text-text uppercase tracking-wide mb-3 flex items-center gap-2">
        <Quote className="w-4 h-4 text-brand-ink" />
        How to cite this page
      </h3>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-medium text-text-muted mb-1">Canonical URL</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 min-w-0">
            <a
              href={canonicalUrl}
              className="text-brand-ink hover:underline break-words min-w-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              {canonicalUrl}
            </a>
            <CopyButton text={canonicalUrl} label="Copy URL" />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-text-muted mb-1">Suggested citation</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 min-w-0">
            <p className="text-text leading-snug break-words min-w-0">{suggestedCitation}</p>
            <CopyButton text={suggestedCitation} label="Copy citation" />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowBibTeX(!showBibTeX)}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-ink hover:text-brand-ink/90"
          >
            {showBibTeX ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showBibTeX ? 'Hide' : 'Show'} BibTeX
          </button>
          {showBibTeX && (
            <div className="mt-2">
              <pre className="p-3 bg-white border border-border-subtle rounded text-xs text-text overflow-x-auto whitespace-pre-wrap font-mono">
                {bibTeX}
              </pre>
              <div className="mt-1.5">
                <CopyButton text={bibTeX} label="Copy BibTeX" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
