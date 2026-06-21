import Image from 'next/image'
import { normalizeHeadingText, createUniqueHeadingId, extractNodeText } from '@/lib/wikiHeadingUtils'
import { Zap, TrendingUp, CheckCircle, DollarSign, Users, AlertCircle, TrendingDown, XCircle, ArrowLeftRight, Target } from 'lucide-react'

export function createWikiMarkdownComponents() {
  const renderedHeadingIds = new Map<string, number>()
  return {
    h1: ({ node, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(props.children))
      const id = createUniqueHeadingId(text, renderedHeadingIds)
      return (
        <h2
          id={id}
          className="group font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24 flex items-center gap-3"
        >
          <span>{text}</span>
          <a
            href={`#${id}`}
            className="text-sm text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label={`Link to ${text}`}
          >
            #
          </a>
        </h2>
      )
    },
    h2: ({ node, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(props.children))
      const id = createUniqueHeadingId(text, renderedHeadingIds)

      // Add icons for specific h2 headings
      let Icon = null
      const headingText = text.toLowerCase()
      if (
        headingText.includes('decision criteria') ||
        (headingText.includes('when') && headingText.includes('right tool'))
      ) {
        Icon = Target
      }

      return (
        <h2
          id={id}
          className="group font-serif-playfair text-2xl sm:text-[28px] font-semibold text-text mb-4 mt-[4.5rem] scroll-mt-24 flex items-center gap-3"
        >
          {Icon && <Icon className="w-6 h-6 text-brand-ink flex-shrink-0" />}
          <span>{text}</span>
          <a
            href={`#${id}`}
            className="text-sm text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label={`Link to ${text}`}
          >
            #
          </a>
        </h2>
      )
    },
    h3: ({ node, ...props }: any) => {
      const text = normalizeHeadingText(extractNodeText(props.children))
      const id = createUniqueHeadingId(text, renderedHeadingIds)

      // Add icons for "Where cost-plus pricing fails" subsections
      let Icon = null
      const headingText = text.toLowerCase()
      if (headingText.includes('ignores customer value')) {
        Icon = Users
      } else if (headingText.includes('focuses inward')) {
        Icon = ArrowLeftRight
      } else if (headingText.includes('circular logic')) {
        Icon = XCircle
      } else if (
        headingText.includes('sub-optimal pricing') ||
        headingText.includes('suboptimal pricing')
      ) {
        Icon = TrendingDown
      }
      // Add icons for "Where customer-driven pricing fails" subsections
      else if (headingText.includes('trains bad behavior')) {
        Icon = AlertCircle
      } else if (headingText.includes('damages relationships')) {
        Icon = XCircle
      } else if (headingText.includes('focuses on transaction')) {
        Icon = DollarSign
      } else if (headingText.includes('leads to price cuts')) {
        Icon = TrendingDown
      } else if (headingText.includes('commoditization risk')) {
        Icon = TrendingDown
      }
      // Add icons for "Rules of thumb" subsections
      else if (headingText.includes('revenue coverage')) {
        Icon = Target
      } else if (headingText.includes('dedicated plan threshold')) {
        Icon = DollarSign
      } else if (headingText.includes('use case profitability')) {
        Icon = TrendingUp
      } else if (headingText.includes('plan clarity')) {
        Icon = CheckCircle
      } else if (headingText.includes('interview count')) {
        Icon = Users
      } else if (headingText.includes('drill/hole maxim') || headingText.includes('drill/hole')) {
        Icon = Target
      } else if (headingText.includes('workaround') || headingText.includes('workaround rule')) {
        Icon = Zap
      }

      return (
        <h3
          id={id}
          className="group font-serif-playfair font-semibold text-[20px] sm:text-[22px] text-text mb-4 mt-8 scroll-mt-24 flex items-center gap-2"
        >
          {Icon && <Icon className="w-5 h-5 text-brand-ink flex-shrink-0" />}
          <span>{text}</span>
          <a
            href={`#${id}`}
            className="text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label={`Link to ${text}`}
          >
            #
          </a>
        </h3>
      )
    },
    a: ({ node, href, ...props }: any) => {
      const isInternalLink = href?.startsWith('/')
      if (isInternalLink && href) {
        return (
          <a href={href} className="text-brand-ink hover:underline font-medium" {...props} />
        )
      }
      return (
        <a
          href={href}
          className="text-brand-ink hover:underline"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        />
      )
    },
    blockquote: ({ node, ...props }: any) => (
      <blockquote className="my-8 border-l border-brand pl-6 pr-4 py-1" {...props} />
    ),
    pre: ({ node, ...props }: any) => (
      <pre
        className="bg-[#111827] text-[#f8fafc] rounded-lg p-4 my-6 overflow-x-auto text-sm leading-relaxed"
        {...props}
      />
    ),
    code: ({ node, inline, className, ...props }: any) => {
      if (inline) {
        return (
          <code className="bg-[#f3f4f6] text-text px-1.5 py-0.5 rounded text-[0.9em]" {...props} />
        )
      }
      return <code className={`font-mono text-sm ${className || ''}`.trim()} {...props} />
    },
    table: ({ node, ...props }: any) => (
      <div
        className="my-8 w-full max-w-full overflow-x-auto rounded-xl border border-border-soft bg-white"
        role="region"
        aria-label="Data table"
        tabIndex={0}
      >
        <table className="w-full border-separate border-spacing-0 min-w-[620px]" {...props} />
      </div>
    ),
    thead: ({ node, ...props }: any) => <thead className="bg-surface/80" {...props} />,
    th: ({ node, ...props }: any) => (
      <th
        className="text-left py-3.5 sm:py-4 px-4 sm:px-6 font-semibold text-sm text-text border-b border-border-subtle first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6 whitespace-nowrap"
        {...props}
      />
    ),
    td: ({ node, ...props }: any) => {
      // Check if this is a "Decision criteria" table cell with fit level
      const cellText = String(props.children || '').trim()
      const cellTextLower = cellText.toLowerCase()
      let Icon = null
      let iconColor = ''

      // Only add icons for specific fit level indicators (standalone, not part of other phrases)
      // Match exact fit level patterns, avoiding false matches in comparison tables
      const isVeryHighOrCritical =
        cellTextLower === 'very high' ||
        cellTextLower === 'critical' ||
        /^very high\s*[–:]/i.test(cellText) ||
        /^critical\s*[–:]/i.test(cellText)
      const isHigh =
        (cellTextLower === 'high' || /^high\s*[–:]/i.test(cellText)) &&
        !cellTextLower.includes('stakes') &&
        !cellTextLower.includes('value') &&
        !cellTextLower.includes('quality') &&
        !cellTextLower.includes('price') &&
        !cellTextLower.includes('b2b') &&
        !cellTextLower.includes('b2c')
      const isLowerOrLimited =
        cellTextLower === 'lower' ||
        cellTextLower === 'limited' ||
        /^lower\s*[–:]/i.test(cellText) ||
        /^limited\s*[–:]/i.test(cellText)

      if (isVeryHighOrCritical) {
        Icon = CheckCircle
        iconColor = 'text-green-600'
      } else if (isHigh) {
        Icon = TrendingUp
        iconColor = 'text-blue-600'
      } else if (isLowerOrLimited) {
        Icon = AlertCircle
        iconColor = 'text-amber-600'
      }

      return (
        <td
          className="py-4 sm:py-4.5 px-4 sm:px-6 text-[15px] sm:text-base text-text leading-[1.6] border-b border-border-subtle align-top first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6 min-w-[140px]"
          {...props}
        >
          {Icon ? (
            <div className="flex items-center gap-2">
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} flex-shrink-0`} />
              <span>{props.children}</span>
            </div>
          ) : (
            props.children
          )}
        </td>
      )
    },
    tbody: ({ node, ...props }: any) => <tbody className="divide-y divide-[#e5e7eb]" {...props} />,
    tr: ({ node, ...props }: any) => (
      <tr
        className="even:bg-[#fafbfc] hover:bg-surface transition-colors duration-150 last:border-b-0"
        {...props}
      />
    ),
    div: ({ node, ...props }: any) => {
      // Preserve all props including className for nested divs
      return <div {...props} />
    },
    img: ({ node, src, alt, ...props }: any) => {
      // Handle images with Next.js Image component for optimization
      if (src?.startsWith('/')) {
        const isMentalModel =
          /wiki_(?:.*_mental|freemium_)/.test(src)
        const imageWidth = isMentalModel ? 600 : 800
        const imageHeight = isMentalModel ? 450 : 600
        const maxWidth = isMentalModel ? 'max-w-2xl' : 'max-w-full'

        return (
          <span className="my-8 block text-center">
            <Image
              src={src}
              alt={alt || ''}
              width={imageWidth}
              height={imageHeight}
              className={`inline-block rounded-lg shadow-lg ${maxWidth} h-auto`}
              {...props}
            />
          </span>
        )
      }

      // Use next/image for configured remote hosts to keep lint clean and preserve static-export safety.
      const isConfiguredRemoteImage = /^https:\/\/(?:assets\.calendly\.com|cdn\.jsdelivr\.net)\//.test(
        src || ''
      )
      if (isConfiguredRemoteImage) {
        const explicitWidth = Number(props.width)
        const explicitHeight = Number(props.height)
        const width = Number.isFinite(explicitWidth) && explicitWidth > 0 ? explicitWidth : 800
        const height = Number.isFinite(explicitHeight) && explicitHeight > 0 ? explicitHeight : 600

        return (
          <span className="my-8 block text-center">
            <Image
              src={src}
              alt={alt || ''}
              width={width}
              height={height}
              className="inline-block rounded-lg shadow-card h-auto max-w-full"
              {...props}
            />
          </span>
        )
      }

      // Fallback for unconfigured external images from markdown.
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="my-8 h-auto max-w-full rounded-lg shadow-card"
          {...props}
        />
      )
    },
  }
}
