interface DecisionMatrixProps {
  xAxis: string[]
  yAxis: string[]
  /** cells[row][col], indexed by yAxis row × xAxis column */
  cells: string[][]
  caption?: string
}

/**
 * Branded 3×N decision matrix.
 *
 * Desktop: full grid with axis headers.
 * Mobile: collapses into per-row groups (one group per Y-axis row).
 */
export default function DecisionMatrix({ xAxis, yAxis, cells, caption }: DecisionMatrixProps) {
  const cols = xAxis.length
  const rows = yAxis.length

  return (
    <figure className="my-10 not-prose" aria-label="Decision matrix">
      {/* ── Desktop grid ────────────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <div
          className="grid gap-px bg-border-soft rounded-xl overflow-hidden border border-border-soft"
          style={{ gridTemplateColumns: `min-content repeat(${cols}, 1fr)` }}
          role="table"
          aria-label="Decision matrix"
        >
          {/* Top-left empty corner */}
          <div className="bg-white" role="columnheader" aria-label="Axis" />

          {/* X-axis headers */}
          {xAxis.map((label, i) => (
            <div
              key={i}
              role="columnheader"
              className="bg-surface/80 px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-ink leading-snug"
            >
              {label}
            </div>
          ))}

          {/* Rows */}
          {yAxis.map((rowLabel, ri) => (
            <>
              {/* Y-axis label */}
              <div
                key={`y-${ri}`}
                role="rowheader"
                className="bg-surface/80 px-4 py-4 flex items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-ink whitespace-nowrap writing-mode-vertical"
              >
                <span className="[writing-mode:vertical-lr] rotate-180 select-none">
                  {rowLabel}
                </span>
              </div>

              {/* Data cells */}
              {(cells[ri] ?? []).slice(0, cols).map((cellText, ci) => {
                const isCorner = ri === rows - 1 && ci === cols - 1
                return (
                  <div
                    key={`cell-${ri}-${ci}`}
                    role="cell"
                    className={`
                      bg-white px-4 py-4 text-[14px] text-text leading-[1.6] text-center
                      ${isCorner ? 'bg-brand-soft/60 font-medium text-brand-dark' : ''}
                    `.trim()}
                  >
                    {cellText}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>

      {/* ── Mobile grouped layout ────────────────────────────────── */}
      <div className="md:hidden space-y-5">
        {yAxis.map((rowLabel, ri) => (
          <div key={ri} className="rounded-xl border border-border-soft bg-white overflow-hidden">
            <div className="bg-surface/80 px-4 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink">
                {rowLabel}
              </p>
            </div>
            <div className="divide-y divide-border-soft">
              {(cells[ri] ?? []).slice(0, cols).map((cellText, ci) => (
                <div key={ci} className="px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle mb-1">
                    {xAxis[ci]}
                  </p>
                  <p className="text-[14px] text-text leading-[1.6]">{cellText}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <figcaption className="mt-4 text-[13px] text-text-muted leading-[1.6] text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
