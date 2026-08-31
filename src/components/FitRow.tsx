'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Wraps a row of elements (e.g. pill links) and shrinks the WHOLE row via
 * CSS transform:scale — never clips, never wraps to a second line. Unlike
 * FitHeadline (which resizes one text span's font-size), this scales an
 * entire row of separate elements uniformly, so relative spacing/padding
 * between pills stays visually consistent as it shrinks.
 */
export default function FitRow({ children, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    function fit() {
      const container = containerRef.current
      const row = rowRef.current
      if (!container || !row) return
      row.style.transform = 'scale(1)'
      const naturalWidth = row.scrollWidth
      const available = container.clientWidth
      const next = naturalWidth > available ? available / naturalWidth : 1
      setScale(next)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [children])

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' as const, ...style }}>
      <div ref={rowRef} style={{ display: 'flex', flexWrap: 'nowrap' as const, gap: 8, transform: `scale(${scale})`, transformOrigin: 'center' as const, whiteSpace: 'nowrap' as const }}>
        {children}
      </div>
    </div>
  )
}
