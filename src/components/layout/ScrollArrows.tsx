'use client'
import type { CSSProperties } from 'react'

export default function ScrollArrows() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

  const btnStyle: CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: '#038390',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    boxShadow: '0 4px 14px rgba(3,131,144,0.35)',
    transition: 'background 0.2s, transform 0.2s',
  }

  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 9999 }}>
      <button
        aria-label="Нагору"
        onClick={scrollTop}
        style={btnStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#026B76'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#038390'; (e.currentTarget as HTMLElement).style.transform = ''; }}
      >
        ↑
      </button>
      <button
        aria-label="Донизу"
        onClick={scrollBottom}
        style={btnStyle}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#026B76'; (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#038390'; (e.currentTarget as HTMLElement).style.transform = ''; }}
      >
        ↓
      </button>
    </div>
  )
}
