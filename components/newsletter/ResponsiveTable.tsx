interface HastElement {
  type: 'element'
  tagName: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

interface HastText {
  type: 'text'
  value: string
}

type HastNode = HastElement | HastText | { type: string; children?: HastNode[] }

function isElement(n: HastNode): n is HastElement {
  return n.type === 'element'
}

function isText(n: HastNode): n is HastText {
  return n.type === 'text'
}

function hastToText(node: HastNode): string {
  if (isText(node)) return node.value
  if (isElement(node) && node.children) return node.children.map(hastToText).join('')
  return ''
}

function HastCell({ node }: { node: HastNode }): React.ReactElement {
  if (isText(node)) return <>{node.value}</>

  if (!isElement(node)) return <></>

  const children = node.children?.map((child, i) => <HastCell key={i} node={child} />) ?? []

  switch (node.tagName) {
    case 'strong':
    case 'b':
      return <strong className="font-semibold">{children}</strong>
    case 'em':
    case 'i':
      return <em>{children}</em>
    case 'a': {
      const href = String(node.properties?.href ?? '')
      const isInternal = href.startsWith('/')
      return (
        <a
          href={href}
          className="text-brand-ink hover:underline"
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
        >
          {children}
        </a>
      )
    }
    case 'br':
      return <br />
    case 'code':
      return (
        <code className="bg-surface px-1 py-0.5 rounded text-[0.9em] font-mono">{children}</code>
      )
    default:
      return <>{children}</>
  }
}

function CellContent({ nodes }: { nodes: HastNode[] }) {
  return (
    <>
      {nodes.map((n, i) => (
        <HastCell key={i} node={n} />
      ))}
    </>
  )
}

function extractHeaders(tableNode: HastElement): string[] {
  const thead = tableNode.children?.find((c) => isElement(c) && c.tagName === 'thead') as
    | HastElement
    | undefined
  if (!thead) return []
  const tr = thead.children?.find((c) => isElement(c) && c.tagName === 'tr') as
    | HastElement
    | undefined
  if (!tr) return []
  return (
    tr.children
      ?.filter((c): c is HastElement => isElement(c) && c.tagName === 'th')
      .map((th) => hastToText(th).trim()) ?? []
  )
}

interface BodyRow {
  cells: HastNode[][]
}

function extractRows(tableNode: HastElement): BodyRow[] {
  const tbody = tableNode.children?.find((c) => isElement(c) && c.tagName === 'tbody') as
    | HastElement
    | undefined
  if (!tbody) return []
  return (
    tbody.children
      ?.filter((c): c is HastElement => isElement(c) && c.tagName === 'tr')
      .map((tr) => ({
        cells:
          tr.children
            ?.filter(
              (c): c is HastElement => isElement(c) && (c.tagName === 'td' || c.tagName === 'th')
            )
            .map((td) => td.children ?? []) ?? [],
      })) ?? []
  )
}

interface ResponsiveTableProps {
  node: any // hast Element passed by react-markdown
}

/**
 * Renders a GFM table as:
 * - Desktop (md+): styled <table> with clear headers and row spacing
 * - Mobile (<md): stacked cards, one per row, with label–value pairs
 */
export default function ResponsiveTable({ node }: ResponsiveTableProps) {
  const tableNode = node as HastElement
  const headers = extractHeaders(tableNode)
  const rows = extractRows(tableNode)

  const hasHeader = headers.length > 0 && headers.some((h) => h !== '')

  return (
    <>
      {/* ── Desktop table ──────────────────────────────────────── */}
      <div
        className="hidden md:block my-8 w-full overflow-x-auto rounded-xl border border-border-soft bg-white"
        role="region"
        aria-label="Data table"
      >
        <table className="w-full border-separate border-spacing-0 min-w-[560px] text-[15px] sm:text-base">
          {hasHeader && (
            <thead className="bg-surface/80">
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="text-left py-3.5 px-5 font-semibold text-sm text-text border-b border-border-subtle first:rounded-tl-xl last:rounded-tr-xl whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="even:bg-[#fafbfc] hover:bg-surface transition-colors duration-150 last:[&>td]:border-b-0"
              >
                {row.cells.map((cellNodes, ci) => (
                  <td
                    key={ci}
                    className="py-4 px-5 text-text leading-[1.65] border-b border-border-subtle align-top min-w-[130px]"
                  >
                    <CellContent nodes={cellNodes} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile stacked cards ───────────────────────────────── */}
      <div className="md:hidden my-6 space-y-4" role="list" aria-label="Data table">
        {rows.map((row, ri) => {
          const titleNodes = row.cells[0] ?? []
          return (
            <div
              key={ri}
              role="listitem"
              className="rounded-xl border border-border-soft bg-white p-4 space-y-3"
            >
              {/* First cell as the card title */}
              <div className="font-semibold text-text text-[15px] leading-snug">
                <CellContent nodes={titleNodes} />
              </div>

              {/* Remaining cells as labeled rows */}
              {row.cells.slice(1).map((cellNodes, ci) => {
                const label = headers[ci + 1]
                return (
                  <div key={ci} className="border-t border-border-soft pt-2.5">
                    {label && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-subtle mb-1">
                        {label}
                      </p>
                    )}
                    <div className="text-[14px] text-text leading-[1.6]">
                      <CellContent nodes={cellNodes} />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
