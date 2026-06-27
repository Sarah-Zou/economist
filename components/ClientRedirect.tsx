'use client'

import { useEffect } from 'react'

export default function ClientRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])

  return (
    <div className="section-shell py-20 text-center text-[14px] text-text-muted">
      Redirecting…
    </div>
  )
}
