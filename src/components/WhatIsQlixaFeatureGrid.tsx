'use client'

import { useId, useState } from 'react'
import Badge from '@/components/ui/Badge'

export type WiqFeatureCard = {
  img: string
  alt: string
  title: string
  desc: string
  badge?: string
}

type Props = {
  cards: WiqFeatureCard[] // exactly 8, same order/content as the desktop grid's cards[0..7]
  centerImg: string
  centerAlt: string
}

// Mobile-only interactive presentation of the SAME 3×3 "What is QLIXA"
// matrix already rendered (unchanged) for desktop. Reads only the
// existing card data passed in as props — no copy is duplicated or
// invented here. Toggled visible/hidden purely via CSS class hooks
// (.wiq-grid-mobile-only / .wiq-grid-desktop-only in globals.css),
// mirroring the same "separate DOM per breakpoint, same source data"
// pattern already used for the Navbar's desktop nav vs. mobile panel.
export default function WhatIsQlixaFeatureGrid({ cards, centerImg, centerAlt }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const baseId = useId()
  const panelId = `wiq-detail-${baseId}`

  function toggle(i: number) {
    setActiveIndex(cur => (cur === i ? null : i))
  }

  function renderCard(i: number) {
    const card = cards[i]
    const isOpen = activeIndex === i
    return (
      <button
        key={i}
        type="button"
        className="wiq-mcard"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => toggle(i)}
      >
        {card.badge && (
          <Badge variant="comingSoon" className="wiq-card-badge" style={{ position: 'absolute', top: 3, right: 3, zIndex: 1 }}>
            {card.badge}
          </Badge>
        )}
        <span className="wiq-mcard-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.img} alt={card.alt} />
        </span>
        <span className="wiq-mcard-title">{card.title}</span>
        <span className="wiq-mcard-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
    )
  }

  function renderPanelIfActiveIn(indices: number[]) {
    if (activeIndex === null || !indices.includes(activeIndex)) return null
    const card = cards[activeIndex]
    return (
      <div id={panelId} className="wiq-mdetail">
        <span className="wiq-mdetail-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.img} alt={card.alt} />
        </span>
        <span className="wiq-mdetail-text">
          <span className="wiq-mdetail-title">{card.title}</span>
          <span className="wiq-mdetail-desc">{card.desc}</span>
        </span>
      </div>
    )
  }

  return (
    <div className="wiq-grid-mobile wiq-grid-mobile-only">
      {renderCard(0)}
      {renderCard(1)}
      {renderCard(2)}
      {renderPanelIfActiveIn([0, 1, 2])}

      {renderCard(3)}
      <div className="wiq-mcard wiq-mcard-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={centerImg} alt={centerAlt} />
      </div>
      {renderCard(4)}
      {renderPanelIfActiveIn([3, 4])}

      {renderCard(5)}
      {renderCard(6)}
      {renderCard(7)}
      {renderPanelIfActiveIn([5, 6, 7])}
    </div>
  )
}
