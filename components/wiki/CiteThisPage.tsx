'use client';

import { useState } from 'react';
import { Copy, Check, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const WIKI_TITLE = 'Pricing & Monetization Wiki';

export interface CiteThisPageProps {
  canonicalUrl: string;
  title: string;
  categoryTitle: string;
  lastUpdated?: string;
  conceptSlug?: string;
}

function formatSuggestedCitation(title: string, categoryTitle: string, url: string, lastUpdated?: string): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear();
  return `Zou, S. (${year}). ${title}. In ${categoryTitle}. ${WIKI_TITLE}. ${url}`;
}

function formatBibTeX(title: string, categoryTitle: string, url: string, lastUpdated?: string, conceptSlug?: string): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear();
  const key = conceptSlug ? `zou-${conceptSlug}` : `zou-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
  const note = lastUpdated ? `Last updated: ${lastUpdated}` : '';
  const noteLine = note ? `\n  note = {${note}},` : '';
  return `@misc{${key},
  author = {Zou, Sarah},
  title = {{${title}}},
  howpublished = {${WIKI_TITLE}, ${categoryTitle}},
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
      className="inline-flex items-center gap-1.5 text-xs text-[#ff5722] hover:text-[#e44e1f] font-medium"
      aria-label={label}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function CiteThisPage({ canonicalUrl, title, categoryTitle, lastUpdated, conceptSlug }: CiteThisPageProps) {
  const [showBibTeX, setShowBibTeX] = useState(false);
  const suggestedCitation = formatSuggestedCitation(title, categoryTitle, canonicalUrl, lastUpdated);
  const bibTeX = formatBibTeX(title, categoryTitle, canonicalUrl, lastUpdated, conceptSlug);
  const lastUpdatedDisplay = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="border border-[#e5e7eb] rounded-lg bg-[#fafafa] p-4 mt-6">
      <h3 className="text-sm font-semibold text-[#1f2933] uppercase tracking-wide mb-3 flex items-center gap-2">
        <Quote className="w-4 h-4 text-[#ff5722]" />
        How to cite this page
      </h3>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-medium text-[#3b4652] mb-1">Canonical URL</p>
          <div className="flex items-start justify-between gap-2">
            <a
              href={canonicalUrl}
              className="text-[#ff5722] hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {canonicalUrl}
            </a>
            <CopyButton text={canonicalUrl} label="Copy URL" />
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-[#3b4652] mb-1">Suggested citation</p>
          <div className="flex items-start justify-between gap-2">
            <p className="text-[#1f2933] leading-snug flex-1 min-w-0">{suggestedCitation}</p>
            <CopyButton text={suggestedCitation} label="Copy citation" />
          </div>
        </div>

        {lastUpdatedDisplay && (
          <div>
            <p className="text-xs font-medium text-[#3b4652] mb-0.5">Last updated</p>
            <p className="text-[#1f2933]">{lastUpdatedDisplay}</p>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowBibTeX(!showBibTeX)}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#ff5722] hover:text-[#e44e1f]"
          >
            {showBibTeX ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showBibTeX ? 'Hide' : 'Show'} BibTeX
          </button>
          {showBibTeX && (
            <div className="mt-2">
              <pre className="p-3 bg-white border border-[#e5e7eb] rounded text-xs text-[#1f2933] overflow-x-auto whitespace-pre-wrap font-mono">
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
