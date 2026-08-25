'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  text: string
  startSize: number
  minSize?: number
  maxWidth: number // px — container the text must fit inside, never wraps
  style?: React.CSSProperties
}

/**
 * Renders text that is GUARANTEED to stay on one line (whiteSpace: nowrap).
 * On mount and on every window resize, it measures the text's real rendered
 * width and shrinks the font-size in 0.5px steps until it fits within
 * `maxWidth` (or the available container width, whichever is smaller) —
 * never allowing the line to wrap.
 */
export default function FitHeadline({ text, startSize, minSize = 16, maxWidth, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(startSize)

  useLayoutEffect(() => {
    function fit() {
      const container = containerRef.current
      const textEl = textRef.current
      if (!container || !textEl) return
      let size = startSize
      textEl.style.fontSize = size + 'px'
      while (textEl.scrollWidth > container.clientWidth && size > minSize) {
        size -= 0.5
        textEl.style.fontSize = size + 'px'
      }
      setFontSize(size)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [text, startSize, minSize])

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' as const, overflow: 'hidden' }}>
      <span ref={textRef} style={{ whiteSpace: 'nowrap' as const, display: 'inline-block', fontSize, ...style }}>
        {text}
      </span>
    </div>
  )
}