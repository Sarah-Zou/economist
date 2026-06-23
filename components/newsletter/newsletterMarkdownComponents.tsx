import Link from 'next/link'
import Image from 'next/image'
import type { Element as HastElement } from 'hast'
import ResponsiveTable from './ResponsiveTable'
import { normalizeHeadingText, createUniqueHeadingId, extractNodeText } from '@/lib/wikiHeadingUtils'

export function createNewsletterMarkdownComponents() {
  const seenIds = new Map<string, number>()

  return {
    h1: ({ node, children, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(children))
      const id = createUniqueHeadingId(text, seenIds)
      return (
        <h2
          id={id}
          className="font-serif-playfair text-[24px] sm:text-[28px] font-semibold text-text mt-16 mb-5 scroll-mt-24 leading-tight"
          {...props}
        >
          {text}
        </h2>
      )
    },

    h2: ({ node, children, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(children))
      const id = createUniqueHeadingId(text, seenIds)
      return (
        <h2
          id={id}
          className="font-serif-playfair text-[24px] sm:text-[28px] font-semibold text-text mt-16 mb-5 scroll-mt-24 leading-tight"
          {...props}
        >
          {text}
        </h2>
      )
    },

    h3: ({ node, children, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(children))
      const id = createUniqueHeadingId(text, seenIds)
      return (
        <h3
          id={id}
          className="font-serif-playfair text-[20px] sm:text-[22px] font-semibold text-text mt-10 mb-4 scroll-mt-24 leading-snug"
          {...props}
        >
          {text}
        </h3>
      )
    },

    h4: ({ node, children, ...props }: any) => (
      <h4 className="font-serif-playfair text-[18px] sm:text-[19px] font-semibold text-text mt-8 mb-3 leading-snug" {...props}>
        {children}
      </h4>
    ),

    p: ({ node, children, ...props }: any) => (
      <p className="text-[18px] leading-[1.78] text-text mb-6 last:mb-0" {...props}>
        {children}
      </p>
    ),

    li: ({ node, children, ...props }: any) => (
      <li className="text-[18px] leading-[1.78] text-text mb-2" {...props}>
        {children}
      </li>
    ),

    ul: ({ node, children, ...props }: any) => (
      <ul className="my-6 pl-6 list-disc space-y-1" {...props}>
        {children}
      </ul>
    ),

    ol: ({ node, children, ...props }: any) => (
      <ol className="my-6 pl-6 list-decimal space-y-1" {...props}>
        {children}
      </ol>
    ),

    strong: ({ node, children, ...props }: any) => (
      <strong className="font-semibold text-text" {...props}>
        {children}
      </strong>
    ),

    em: ({ node, children, ...props }: any) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),

    a: ({ node, href, children, ...props }: any) => {
      const isInternal = href?.startsWith('/')
      if (isInternal && href) {
        return (
          <Link href={href} className="text-brand-ink hover:underline font-medium" {...props}>
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          className="text-brand-ink hover:underline"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      )
    },

    blockquote: ({ node, children, ...props }: any) => (
      <blockquote
        className="my-8 border-l-2 border-brand pl-6 pr-2 py-1 text-text-muted italic"
        {...props}
      >
        {children}
      </blockquote>
    ),

    hr: () => (
      <hr className="my-10 border-0 border-t border-border-soft" />
    ),

    code: ({ node, inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-surface px-1.5 py-0.5 rounded text-[0.9em] font-mono text-text" {...props}>
            {children}
          </code>
        )
      }
      return (
        <code className={`font-mono text-sm ${className ?? ''}`.trim()} {...props}>
          {children}
        </code>
      )
    },

    pre: ({ node, children, ...props }: any) => (
      <pre
        className="bg-[#111827] text-[#f8fafc] rounded-lg p-4 my-6 overflow-x-auto text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),

    table: ({ node, ...props }: any) => {
      if (node) {
        return <ResponsiveTable node={node as HastElement} />
      }
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-[15px]" {...props} />
        </div>
      )
    },

    thead: ({ node, children, ...props }: any) => (
      <thead className="bg-surface/80" {...props}>
        {children}
      </thead>
    ),

    th: ({ node, children, ...props }: any) => (
      <th
        className="text-left py-3 px-5 font-semibold text-sm text-text border-b border-border-subtle"
        {...props}
      >
        {children}
      </th>
    ),

    td: ({ node, children, ...props }: any) => (
      <td
        className="py-4 px-5 text-[15px] text-text leading-[1.65] border-b border-border-subtle align-top"
        {...props}
      >
        {children}
      </td>
    ),

    tbody: ({ node, children, ...props }: any) => (
      <tbody className="divide-y divide-border-subtle" {...props}>
        {children}
      </tbody>
    ),

    tr: ({ node, children, ...props }: any) => (
      <tr
        className="even:bg-[#fafbfc] hover:bg-surface transition-colors duration-150"
        {...props}
      >
        {children}
      </tr>
    ),

    img: ({ node, src, alt, ...props }: any) => {
      if (src?.startsWith('/')) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ''}
            loading="lazy"
            decoding="async"
            className="my-8 h-auto w-full rounded-lg shadow-card"
          />
        )
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
          className="my-8 h-auto w-full rounded-lg shadow-card"
          {...props}
        />
      )
    },
  }
}
