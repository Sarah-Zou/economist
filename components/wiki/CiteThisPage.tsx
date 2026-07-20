'use client'

import { useState } from 'react'
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'

const DEFAULT_PUBLICATION_TITLE = 'Pricing & Monetization Wiki'

export interface CiteThisPageProps {
  canonicalUrl: string
  title: string
  collectionTitle?: string
  categoryTitle?: string
  publicationTitle?: string
  lastUpdated?: string
  conceptSlug?: string
  slug?: string
}

function formatSuggestedCitation(
  title: string,
  publicationTitle: string,
  url: string,
  lastUpdated?: string,
  collectionTitle?: string
): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear()
  if (collectionTitle) {
    return `Zou, S. (${year}). ${title}. In ${collectionTitle}. ${publicationTitle}. ${url}`
  }
  return `Zou, S. (${year}). ${title}. ${publicationTitle}. ${url}`
}

function formatBibTeX(
  title: string,
  publicationTitle: string,
  url: string,
  lastUpdated?: string,
  slug?: string,
  collectionTitle?: string
): string {
  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : new Date().getFullYear()
  const key = slug
    ? `zou-${slug}`
    : `zou-${title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`
  const note = lastUpdated ? `Last updated: ${lastUpdated}` : ''
  const noteLine = note ? `\n  note = {${note}},` : ''
  const howpublished = collectionTitle
    ? `{${publicationTitle}, ${collectionTitle}}`
    : `{${publicationTitle}}`

  return `@misc{${key},
  author = {Zou, Sarah},
  title = {{${title}}},
  howpublished = ${howpublished},
  year = {${year}},
  url = {${url}},${noteLine}
}`
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-[11px] font-medium text-brand-ink"
      aria-label={label}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
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
  const [showBibTeX, setShowBibTeX] = useState(false)
  const sectionTitle = collectionTitle ?? categoryTitle
  const bibSlug = slug ?? conceptSlug
  const suggestedCitation = formatSuggestedCitation(
    title,
    publicationTitle,
    canonicalUrl,
    lastUpdated,
    sectionTitle
  )
  const bibTeX = formatBibTeX(
    title,
    publicationTitle,
    canonicalUrl,
    lastUpdated,
    bibSlug,
    sectionTitle
  )

  return (
    <div className="mt-7 border-t border-border pt-6">
      <p className="kicker-muted">Cite this page</p>

      <div className="mt-5 space-y-5 text-[12px]">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-text-subtle">
            Canonical URL
          </p>
          <a
            href={canonicalUrl}
            className="break-words text-brand-ink hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {canonicalUrl}
          </a>
          <div className="mt-2">
            <CopyButton text={canonicalUrl} label="Copy URL" />
          </div>
        </div>

        <div className="border-t border-border-soft pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-text-subtle">
            Suggested citation
          </p>
          <p className="break-words leading-[1.65] text-text-muted">{suggestedCitation}</p>
          <div className="mt-2">
            <CopyButton text={suggestedCitation} label="Copy citation" />
          </div>
        </div>

        <div className="border-t border-border-soft pt-4">
          <button
            type="button"
            onClick={() => setShowBibTeX(!showBibTeX)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-ink"
          >
            {showBibTeX ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showBibTeX ? 'Hide' : 'Show'} BibTeX
          </button>
          {showBibTeX && (
            <div className="mt-3">
              <pre className="overflow-x-auto whitespace-pre-wrap border border-border-soft bg-surface p-3 font-mono text-[10px] text-text">
                {bibTeX}
              </pre>
              <div className="mt-2">
                <CopyButton text={bibTeX} label="Copy BibTeX" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
