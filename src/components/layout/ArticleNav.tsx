'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { articles, getAdjacentArticles } from '@/lib/articles'

const ARTICLE_NAV_TEXT: Record<string, {
  toc: string
  allArticles: string
  backToAll: string
  soon: string
  prevArticle: string
  nextArticle: string
}> = {
  UA: { toc: 'Зміст', allArticles: 'Всі статті', backToAll: '← Всі статті', soon: 'Скоро', prevArticle: 'Попередня стаття', nextArticle: 'Наступна стаття' },
  RU: { toc: 'Содержание', allArticles: 'Все статьи', backToAll: '← Все статьи', soon: 'Скоро', prevArticle: 'Предыдущая статья', nextArticle: 'Следующая статья' },
  EN: { toc: 'Contents', allArticles: 'All Articles', backToAll: '← All Articles', soon: 'Soon', prevArticle: 'Previous article', nextArticle: 'Next article' },
  DE: { toc: 'Inhalt', allArticles: 'Alle Artikel', backToAll: '← Alle Artikel', soon: 'Bald', prevArticle: 'Vorheriger Artikel', nextArticle: 'Nächster Artikel' },
}

const ARTICLE_META_TRANSLATIONS: Record<string, Record<string, { tag: string; title: string }>> = {
  'rwr-karte': {
    RU: { tag: 'Гайд', title: 'Как подготовиться к подаче на RWR+ карту' },
    EN: { tag: 'Guide', title: 'How to prepare your RWR+ card application' },
    DE: { tag: 'Anleitung', title: 'Wie du dich auf die RWR+ Karte vorbereitest' },
  },
  'gewerbeanmeldung': {
    RU: { tag: 'Регистрация бизнеса', title: 'Gewerbeanmeldung в Австрии: пошаговая регистрация самозанятости' },
    EN: { tag: 'Business Registration', title: 'Gewerbeanmeldung in Austria: step-by-step self-employment registration' },
    DE: { tag: 'Geschäftsregistrierung', title: 'Gewerbeanmeldung in Österreich: Schritt-für-Schritt-Registrierung der Selbstständigkeit' },
  },
  'austria-id': {
    RU: { tag: 'Австрия · Документы', title: 'Как оформить Austria ID: пошаговый гайд для иностранцев' },
    EN: { tag: 'Austria · Documents', title: 'How to get an Austria ID: step-by-step guide for foreigners' },
    DE: { tag: 'Österreich · Dokumente', title: 'Austria ID beantragen: Schritt-für-Schritt-Anleitung für Ausländer' },
  },
  'invalidity-child': {
    RU: { tag: 'Семья · Льготы', title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать' },
    EN: { tag: 'Family · Benefits', title: 'Child disability in Austria: payments, benefits, and where to start' },
    DE: { tag: 'Familie · Leistungen', title: 'Kindesbehinderung in Österreich: Leistungen, Vergünstigungen und erste Schritte' },
  },
  'gisa-formular': {
    RU: { tag: 'GISA · Регистрация', title: 'Регистрация на сайте GISA: пошаговая инструкция' },
    EN: { tag: 'GISA · Registration', title: 'Registering on the GISA website: a step-by-step guide' },
    DE: { tag: 'GISA · Anmeldung', title: 'Anmeldung auf der GISA-Website: Schritt-für-Schritt-Anleitung' },
  },
}

function localizeArticle<T extends { slug: string; tag: string; title: string }>(art: T, lang: string): T {
  const override = ARTICLE_META_TRANSLATIONS[art.slug]?.[lang]
  return override ? { ...art, tag: override.tag, title: override.title } : art
}

function useLang() {
  const [lang, setLang] = useState('UA')
  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])
  return lang
}

function useArticleNavLang() {
  const lang = useLang()
  return ARTICLE_NAV_TEXT[lang] || ARTICLE_NAV_TEXT.UA
}

export function ArticleTOC({ items }: { items: [string, string][] }) {
  const t = useArticleNavLang()
  return (
    <div style={{
      background: '#F0F7F8', borderRadius: 16,
      padding: '20px 24px', marginBottom: 32,
    }}>
      <div style={{ fontWeight: 700, color: '#038390', marginBottom: 14, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>
        {t.toc}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px 24px' }}>
        {items.map(([href, label]) => (
          <a key={href} href={href} style={{
            fontSize: 13, color: '#595959', textDecoration: 'none',
            padding: '4px 0', lineHeight: 1.4,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#595959'}
          >
            {label}
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export function ArticleSidebar({ currentSlug }: { currentSlug: string }) {
  const lang = useLang()
  const t = ARTICLE_NAV_TEXT[lang] || ARTICLE_NAV_TEXT.UA
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
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          color: 'var(--text3)',
        }}>
          {t.allArticles}
        </div>

        <div style={{ padding: 8 }}>
          {all.map(rawArt => {
            const art = localizeArticle(rawArt, lang)
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
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                  background: isCurrent ? '#038390' : isPublished ? 'var(--charcoal)' : 'var(--line2)',
                }} />
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700,
                    color: isCurrent ? '#038390' : 'var(--text3)',
                    marginBottom: 2,
                  }}>
                    {art.tag}
                  </div>
                  <div style={{
                    fontSize: 12, lineHeight: 1.4,
                    color: isCurrent ? '#038390' : 'var(--charcoal)',
                    fontWeight: isCurrent ? 600 : 400,
                  }}>
                    {art.title}
                  </div>
                  {!isPublished && (
                    <div style={{ fontSize: 9, color: '#038390', fontWeight: 700, marginTop: 3, letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>
                      {t.soon}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--line)' }}>
          <Link href="/articles" style={{ fontSize: 12, color: '#038390', fontWeight: 600, textDecoration: 'none' }}>
            {t.backToAll}
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ArticlePrevNext({ currentSlug }: { currentSlug: string }) {
  const lang = useLang()
  const t = ARTICLE_NAV_TEXT[lang] || ARTICLE_NAV_TEXT.UA
  const { prev: rawPrev, next: rawNext } = getAdjacentArticles(currentSlug)
  const prev = rawPrev ? localizeArticle(rawPrev, lang) : null
  const next = rawNext ? localizeArticle(rawNext, lang) : null

  if (!prev && !next) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: prev && next ? '1fr 1fr' : prev ? '1fr auto' : 'auto 1fr',
      gap: 12, margin: '40px 0 0',
    }}>
      {prev ? (
        <Link href={prev.href} style={{
          display: 'flex', flexDirection: 'column' as const, gap: 6,
          padding: '16px 18px', borderRadius: 14,
          border: '1px solid var(--line)', background: '#fff',
          textDecoration: 'none',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>←</span> {t.prevArticle}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4 }}>
            {prev.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#038390' }}>
            {prev.tag}
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={next.href} style={{
          display: 'flex', flexDirection: 'column' as const, gap: 6,
          padding: '16px 18px', borderRadius: 14,
          border: '1px solid var(--line)', background: '#fff',
          textDecoration: 'none', textAlign: 'right' as const,
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
            {t.nextArticle} <span>→</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4 }}>
            {next.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#038390' }}>
            {next.tag}
          </div>
        </Link>
      ) : <div />}
    </div>
  )
}
