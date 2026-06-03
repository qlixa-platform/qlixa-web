'use client'

import Link from 'next/link'
import { articles, getAdjacentArticles } from '@/lib/articles'

export function ArticleSidebar({ currentSlug }: { currentSlug: string }) {
  const published = articles.filter(a => a.published)
  const all = articles

  return (
    <div style={{
      width: 220, flexShrink: 0,
      position: 'sticky', top: 80,
      alignSelf: 'flex-start',
    }}>
      <div style={{
        background: '#fff', borderRadius: 14,
        border: '1px solid var(--line)',
        boxShadow: 'var(--shadow)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--line)',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--text3)',
        }}>
          Всі статті
        </div>

        <div style={{ padding: 8 }}>
          {all.map(art => {
            const isCurrent = art.slug === currentSlug
            const isPublished = art.published

            return (
              <Link
                key={art.slug}
                href={art.href}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 10px', borderRadius: 8,
                  textDecoration: 'none',
                  background: isCurrent ? 'var(--peach-light)' : 'transparent',
                  opacity: isPublished ? 1 : 0.5,
                  pointerEvents: isPublished ? 'auto' : 'none',
                  marginBottom: 2,
                }}
              >
                {/* Color dot */}
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                  background: isCurrent ? 'var(--orange)' : isPublished ? 'var(--charcoal)' : 'var(--line2)',
                }} />
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700,
                    color: isCurrent ? 'var(--orange)' : 'var(--text3)',
                    marginBottom: 2,
                  }}>
                    {art.tag}
                  </div>
                  <div style={{
                    fontSize: 12, lineHeight: 1.4,
                    color: isCurrent ? 'var(--orange)' : 'var(--charcoal)',
                    fontWeight: isCurrent ? 600 : 400,
                  }}>
                    {art.title}
                  </div>
                  {!isPublished && (
                    <div style={{ fontSize: 9, color: 'var(--orange)', fontWeight: 700, marginTop: 3, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Скоро
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)' }}>
          <Link href="/articles" style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600, textDecoration: 'none' }}>
            ← Всі статті
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ArticlePrevNext({ currentSlug }: { currentSlug: string }) {
  const { prev, next } = getAdjacentArticles(currentSlug)

  if (!prev && !next) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: prev && next ? '1fr 1fr' : prev ? '1fr auto' : 'auto 1fr',
      gap: 12, margin: '40px 0 0',
    }}>
      {prev ? (
        <Link href={prev.href} style={{
          display: 'flex', flexDirection: 'column', gap: 6,
          padding: '16px 18px', borderRadius: 14,
          border: '1px solid var(--line)', background: '#fff',
          textDecoration: 'none',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>←</span> Попередня стаття
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4 }}>
            {prev.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--orange)' }}>
            {prev.tag}
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={next.href} style={{
          display: 'flex', flexDirection: 'column', gap: 6,
          padding: '16px 18px', borderRadius: 14,
          border: '1px solid var(--line)', background: '#fff',
          textDecoration: 'none', textAlign: 'right',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
            Наступна стаття <span>→</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4 }}>
            {next.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--orange)' }}>
            {next.tag}
          </div>
        </Link>
      ) : <div />}
    </div>
  )
}
