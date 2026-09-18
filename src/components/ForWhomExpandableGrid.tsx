'use client'

import { Fragment, useId, useState } from 'react'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

export type ForWhomCard = {
  img: string
  title: string
  desc: string
  href: string
  isSoon?: boolean
}

type Props = {
  cards: ForWhomCard[] // same order/content as the desktop grid's cards
  soonLabel: string
  columns: number // mobile column count (see report for why 2 was chosen)
}

// Mobile-only interactive presentation of the desktop "For whom" grid.
// Reads only the existing card data passed in as props — no copy is
// duplicated or invented here. Unlike the "What is QLIXA" feature
// grid, every card here is a real navigation Link (all six currently
// redirect to /tax-return or /pricing — confirmed by reading the
// actual /for/* route files before writing this component). To avoid
// changing that existing navigation behavior, the expand/collapse
// toggle is a SIBLING <button> next to the <Link>, not nested inside
// it (nesting a button inside an <a> is invalid HTML and would make
// keyboard/screen-reader focus ambiguous about which control a tap
// activates). Tapping the card body still navigates immediately,
// exactly as before; tapping the small +/- separately previews the
// description inline without leaving the page.
export default function ForWhomExpandableGrid({ cards, soonLabel, columns }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const baseId = useId()
  const panelId = `fw-detail-${baseId}`

  function toggle(i: number) {
    setActiveIndex(cur => (cur === i ? null : i))
  }

  function renderCard(i: number) {
    const card = cards[i]
    const isOpen = activeIndex === i
    return (
      <div key={i} className="fw-card-outer" style={{ position: 'relative' as const }}>
        <Link href={card.href} className="fw-card-link" style={{ textDecoration: 'none', display: 'block' }}>
          <div className="fw-card" style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', height: '100%', position: 'relative' as const }}>
            {card.isSoon && (
              <Badge variant="comingSoon" className="wiq-card-badge" style={{ position: 'absolute' as const, top: 14, right: 14, zIndex: 1 }}>
                {soonLabel}
              </Badge>
            )}
            <div className="fw-card-header" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="fw-card-icon" src={card.img} alt={card.title} style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
              <div className="fw-card-title" style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase' as const, letterSpacing: '0.5px', lineHeight: 1.3, paddingRight: card.isSoon ? 60 : 0 }}>{card.title}</div>
            </div>
            <div className="fw-card-desc" style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{card.desc}</div>
          </div>
        </Link>
        <button
          type="button"
          className="fw-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={card.title}
          onClick={() => toggle(i)}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>
    )
  }

  function renderPanelIfActiveIn(indices: number[]) {
    if (activeIndex === null || !indices.includes(activeIndex)) return null
    const card = cards[activeIndex]
    return (
      <div id={panelId} className="fw-detail">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="fw-detail-image" src={card.img} alt={card.title} />
        <span className="fw-detail-text">
          <span className="fw-detail-title">{card.title}</span>
          <span className="fw-detail-desc">{card.desc}</span>
        </span>
      </div>
    )
  }

  // Row-aware placement derived from the actual mobile column count,
  // not hard-coded: a detail panel is inserted after every full row.
  const rows: number[][] = []
  for (let i = 0; i < cards.length; i += columns) {
    rows.push(Array.from({ length: Math.min(columns, cards.length - i) }, (_, j) => i + j))
  }

  return (
    <div className="fw-grid fw-grid-mobile-only">
      {rows.map((row, r) => (
        <Fragment key={r}>
          {row.map(i => renderCard(i))}
          {renderPanelIfActiveIn(row)}
        </Fragment>
      ))}
    </div>
  )
}
