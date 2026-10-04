'use client'

import { useState, useEffect, useId } from 'react'
import Link from 'next/link'
import { articles, getAdjacentArticles } from '@/lib/articles'
import { type InternalLangKey, type Locale, localeHref } from '@/lib/locale'

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
    RU: { tag: 'Австрия · Документы', title: 'Как оформить ID Austria: пошаговый гайд для иностранцев' },
    EN: { tag: 'Austria · Documents', title: 'How to get ID Austria: step-by-step guide for foreigners' },
    DE: { tag: 'Österreich · Dokumente', title: 'ID Austria beantragen: Schritt-für-Schritt-Anleitung für Ausländer' },
  },
  'invalidity-child': {
    RU: { tag: 'Семья · Льготы', title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать' },
    EN: { tag: 'Family · Benefits', title: 'Child disability in Austria: payments, benefits, and where to start' },
    DE: { tag: 'Familie · Leistungen', title: 'Kindesbehinderung in Österreich: Leistungen, Vergünstigungen und erste Schritte' },
  },
  'gisa-formular': {
    RU: { tag: 'GISA · Регистрация', title: 'Как зарегистрировать предпринимательскую деятельность через GISA: пошаговая онлайн-инструкция' },
    EN: { tag: 'GISA · Registration', title: 'How to Register a Business Activity via GISA: Step-by-Step Online Guide' },
    DE: { tag: 'GISA · Anmeldung', title: 'Gewerbe über GISA anmelden: Schritt-für-Schritt-Online-Anleitung' },
  },
  'steuererklaerung-selbst-vorbereiten': {
    RU: { tag: 'Налоговая декларация', title: 'Как просто подготовить налоговую декларацию в Австрии с QLIXA' },
    EN: { tag: 'Tax Return', title: 'An Easier Way to Prepare Your Tax Return in Austria with QLIXA' },
    DE: { tag: 'Steuererklärung', title: 'Steuererklärung in Österreich einfacher vorbereiten – mit QLIXA' },
  },
}

// Slugs that exist ONLY as localized routes (/[locale]/articles/<slug>)
// — no flat, un-prefixed /articles/<slug> page exists for them. Right
// now that's just the one article added after individual localized
// article routes already existed (Phase 8 EN/UA/RU localization
// brief), so it never had — and was never meant to get — a legacy flat
// wrapper the way the original 5 articles do. Filtered out of both
// ArticleSidebar and ArticlePrevNext below whenever `locale` is
// undefined (flat/legacy mode), so neither ever generates a flat link
// to a route that 404s.
const LOCALE_ONLY_SLUGS = new Set(['steuererklaerung-selbst-vorbereiten'])

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

// `explicitLang`, when provided, overrides the legacy localStorage-derived
// language — but useLang() is still called unconditionally below so hook
// order never depends on whether a caller passes it (React Rules of
// Hooks). This is the same dual-mode pattern already proven in
// Navbar/Footer/*Content components: no explicit lang → byte-for-byte
// legacy behavior; explicit lang → used as-is, no localStorage read
// needed for the effective displayed language.
function useArticleNavLang(explicitLang?: InternalLangKey) {
  const legacyLang = useLang()
  const effectiveLang = explicitLang ?? legacyLang
  return ARTICLE_NAV_TEXT[effectiveLang] || ARTICLE_NAV_TEXT.UA
}

export function ArticleTOC({ items, lang }: { items: [string, string][]; lang?: InternalLangKey }) {
  const t = useArticleNavLang(lang)
  // Mobile-only collapse state. Irrelevant at desktop (>=901px): the
  // items grid there is force-shown by an unconditional CSS rule
  // outside the mobile media query (see .article-toc-grid-collapsed in
  // globals.css), so toggling this state never hides desktop content —
  // only the mobile-only chevron (base-hidden pattern, same as the
  // rest of the project) is visible feedback for it there.
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div style={{
      background: '#F0F7F8', borderRadius: 16,
      padding: '20px 24px', marginBottom: 32,
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left' as const,
          fontWeight: 700, color: '#026B76', marginBottom: 14, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase' as const,
        }}
      >
        {t.toc}
        <svg className="article-toc-chevron" aria-hidden="true" width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <path d="M1 1L6 6L11 1" stroke="#026B76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div id={panelId} className={`article-toc-grid${open ? '' : ' article-toc-grid-collapsed'}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px 24px' }}>
        {items.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)} style={{
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
    </div>
  )
}

// `locale`, when provided, makes every page-route href this component
// generates (each article entry + the "back to all" link) locale-aware
// via localeHref — completely separate from `lang`, which only selects
// display language (see useArticleNavLang above). Legacy callers pass
// neither prop and get byte-for-byte flat hrefs, exactly as before.
export function ArticleSidebar({ currentSlug, lang, locale }: { currentSlug: string; lang?: InternalLangKey; locale?: Locale }) {
  const legacyLang = useLang()
  const effectiveLang = lang ?? legacyLang
  const t = ARTICLE_NAV_TEXT[effectiveLang] || ARTICLE_NAV_TEXT.UA
  // See LOCALE_ONLY_SLUGS above — in flat/legacy mode (no `locale`
  // prop), never list an article that has no flat page.
  const all = locale ? articles : articles.filter(a => !LOCALE_ONLY_SLUGS.has(a.slug))

  return (
    <div className="article-sidebar-desktop-only" style={{
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
            const art = localizeArticle(rawArt, effectiveLang)
            const isCurrent = art.slug === currentSlug
            const isPublished = art.published

            return (
              <Link
                key={art.slug}
                href={locale ? localeHref(locale, art.href) : art.href}
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
          <Link href={locale ? localeHref(locale, '/articles') : '/articles'} style={{ fontSize: 12, color: '#038390', fontWeight: 600, textDecoration: 'none' }}>
            {t.backToAll}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Same `locale` contract as ArticleSidebar above — makes the prev/next
// page-route hrefs locale-aware without touching language resolution.
export function ArticlePrevNext({ currentSlug, lang, locale }: { currentSlug: string; lang?: InternalLangKey; locale?: Locale }) {
  const legacyLang = useLang()
  const effectiveLang = lang ?? legacyLang
  const t = ARTICLE_NAV_TEXT[effectiveLang] || ARTICLE_NAV_TEXT.UA
  const { prev: rawPrevAll, next: rawNextAll } = getAdjacentArticles(currentSlug)
  // See LOCALE_ONLY_SLUGS above — in flat/legacy mode, never point
  // prev/next at an article that has no flat page (it would 404).
  const rawPrev = !locale && rawPrevAll && LOCALE_ONLY_SLUGS.has(rawPrevAll.slug) ? null : rawPrevAll
  const rawNext = !locale && rawNextAll && LOCALE_ONLY_SLUGS.has(rawNextAll.slug) ? null : rawNextAll
  const prev = rawPrev ? localizeArticle(rawPrev, effectiveLang) : null
  const next = rawNext ? localizeArticle(rawNext, effectiveLang) : null

  if (!prev && !next) return null

  return (
    <div className="article-prevnext-grid" style={{
      display: 'grid',
      gridTemplateColumns: prev && next ? '1fr 1fr' : prev ? '1fr auto' : 'auto 1fr',
      gap: 12, margin: '40px 0 0',
    }}>
      {prev ? (
        <Link href={locale ? localeHref(locale, prev.href) : prev.href} style={{
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
        <Link href={locale ? localeHref(locale, next.href) : next.href} style={{
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
