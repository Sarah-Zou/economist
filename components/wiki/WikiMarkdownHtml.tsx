import type { HTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import { createWikiMarkdownComponents } from '@/components/wiki/wikiMarkdownComponents'

type WikiMarkdownHtmlProps = {
  markdown: string
  className?: string
}

const simpleMarkdownComponents = {
  p: ({ ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base sm:text-[17px] text-text leading-[1.65]" {...props} />
  ),
  strong: ({ ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-text" {...props} />
  ),
}

export function WikiMarkdownHtml({ markdown, className }: WikiMarkdownHtmlProps) {
  if (!markdown) {
    return null
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={createWikiMarkdownComponents()}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export function WikiSimpleMarkdownHtml({ markdown, className }: WikiMarkdownHtmlProps) {
  if (!markdown) {
    return null
  }

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={simpleMarkdownComponents}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
