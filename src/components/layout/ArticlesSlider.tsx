'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PubArticle = {
  tag: string
  title: string
  desc: string
  date: string
  readTime: string
  href: string
  cover: string
}

type UpArticle = {
  tag: string
  title: string
  desc: string
  href: string
}

const SLIDER_TEXT: Record<string, { header: string; headerEm: string; allArticles: string; readMore: string; soon: string }> = {
  UA: { header: 'Останні', headerEm: 'статті', allArticles: 'Всі статті →', readMore: 'Читати →', soon: 'Скоро' },
  RU: { header: 'Последние', headerEm: 'статьи', allArticles: 'Все статьи →', readMore: 'Читать →', soon: 'Скоро' },
  EN: { header: 'Latest', headerEm: 'articles', allArticles: 'All articles →', readMore: 'Read →', soon: 'Soon' },
  DE: { header: 'Neueste', headerEm: 'Artikel', allArticles: 'Alle Artikel →', readMore: 'Lesen →', soon: 'Bald' },
}

export default function ArticlesSlider({
  published,
  upcoming,
  lang,
}: {
  published: PubArticle[]
  upcoming: UpArticle[]
  lang: string
}) {
  const [cur, setCur] = React.useState(0)
  const visible = 4
  const t = SLIDER_TEXT[lang] || SLIDER_TEXT.UA

  const allCards: Array<
    ({ type: 'pub' } & PubArticle) | ({ type: 'up' } & UpArticle)
  > = [
    ...published.map(a => ({ ...a, type: 'pub' as const })),
    ...upcoming.map(a => ({ ...a, type: 'up' as const })),
  ]

  const total = allCards.length
  const maxCur = Math.max(0, total - visible)
  const pages = Math.ceil(total / visible)

  function go(dir: number) {
    setCur(c => Math.max(0, Math.min(c + dir, maxCur)))
  }

  return (
    <section style={{ background: '#F0F7F8', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: '#1A1A1A' }}>
            {t.header} <em style={{ fontStyle: 'italic', color: '#038390' }}>{t.headerEm}</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/articles" style={{ fontSize: 13, fontWeight: 500, color: '#038390', textDecoration: 'none' }}>
              {t.allArticles}
            </Link>
            <div style={{ display: 'flex', gap: 8 }}>
              {([{ d: -1, i: '←' }, { d: 1, i: '→' }] as const).map(b => (
                <button
                  key={b.d}
                  onClick={() => go(b.d)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid rgba(26,26,26,0.15)', background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', fontSize: 14, color: '#1A1A1A',
                    opacity: (b.d === -1 && cur === 0) || (b.d === 1 && cur >= maxCur) ? 0.3 : 1,
                  }}
                >
                  {b.i}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Track */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', overflow: 'hidden' }}>
        <style>{`
          .card-img { transition: transform 0.4s cubic-bezier(.25,.46,.45,.94); }
          .card-link:hover .card-img { transform: scale(1.07); }
          .card-body-inner { transition: box-shadow 0.3s ease; }
          .card-link:hover .card-body-inner { box-shadow: 0 8px 32px rgba(53,52,52,0.13) !important; }
        `}</style>
        <div
          style={{
            display: 'flex',
            gap: 20,
            transform: `translateX(calc(-${cur} * (280px + 20px)))`,
            transition: 'transform 0.4s cubic-bezier(.25,.46,.45,.94)',
          }}
        >
          {allCards.map((art, i) =>
            art.type === 'pub' ? (
              <Link
                key={i}
                href={art.href}
                className="card-link"
                style={{ display: 'block', textDecoration: 'none', position: 'relative', minWidth: 280, flex: '0 0 280px' }}
              >
                <div style={{ position: 'relative', width: '100%', height: 190, borderRadius: 14, overflow: 'hidden', zIndex: 1 }}>
                  <Image src={art.cover} alt={art.title} fill className="card-img" style={{ objectFit: 'cover', objectPosition: 'center 35%' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 4, zIndex: 2 }}>
                    {art.tag}
                  </div>
                </div>
                <div className="card-body-inner" style={{ position: 'relative', zIndex: 2, background: '#fff', borderRadius: 14, padding: '20px 18px 18px', marginTop: -22, border: '1px solid var(--line)', boxShadow: '0 4px 16px rgba(53,52,52,0.07)', display: 'flex', flexDirection: 'column', minHeight: 230 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 7, minHeight: 58, flex: 'none' }}>{art.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12, flex: 1 }}>{art.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontSize: 11, color: 'rgba(26,26,26,0.55)' }}>{art.date} · {art.readTime}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>{t.readMore}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                key={i}
                href={art.href}
                style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', minWidth: 280, flex: '0 0 280px', height: 320, background: '#fff', borderRadius: 14, padding: 18, border: '1px dashed var(--line2)', opacity: 0.65 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: '#F0F7F8', color: 'rgba(26,26,26,0.55)' }}>{art.tag}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 7px', borderRadius: 3, background: 'var(--peach-light)', color: 'var(--orange)' }}>{t.soon}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 6 }}>{art.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55, marginTop: 'auto' }}>{art.desc}</div>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, paddingTop: 24 }}>
        {Array.from({ length: pages }).map((_, i) => {
          const isActive = cur >= i * visible && cur < (i + 1) * visible
          return (
            <button
              key={i}
              onClick={() => setCur(Math.min(i * visible, maxCur))}
              style={{
                width: isActive ? 20 : 7, height: 7,
                borderRadius: isActive ? 4 : '50%',
                background: isActive ? 'var(--orange)' : 'var(--line2)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.2s', padding: 0,
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
