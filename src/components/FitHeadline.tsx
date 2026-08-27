'use client'

import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  text: string
  startSize: number
  minSize?: number
  maxWidth: number
  align?: 'center' | 'left'
  style?: React.CSSProperties
}

export default function FitHeadline({ text, startSize, minSize = 16, maxWidth, align = 'center', style }: Props) {
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
    <div ref={containerRef} style={{ width: '100%', maxWidth: align === 'center' ? maxWidth : undefined, marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined, textAlign: align, overflow: 'hidden' }}>
      <span ref={textRef} style={{ whiteSpace: 'nowrap' as const, display: 'inline-block', fontSize, ...style }}>
        {text}
      </span>
    </div>
  )
}
