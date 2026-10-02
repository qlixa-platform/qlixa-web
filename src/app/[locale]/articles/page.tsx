import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import ArticlesContent from '@/components/ArticlesContent'

const PATH = '/articles'

// Page-level SEO metadata for the ARTICLES INDEX route itself — Phase
// 8.1, Batch 2 (DE) + Batch 4 (EN) + Batch 5 (UA) + Batch 6 (RU,
// completing all 4 locales' Title/Description) + Batch 8 (canonical/
// hreflang) + Batch 10A (Open Graph/Twitter via getSocialMetadata —
// reuses the SAME title/description variables; no separate OG_TITLE
// copy exists). Scoped only to this index page; the sibling [slug]
// dispatcher has its own separate generateMetadata/social wiring. The
// index itself is `type: 'website'` (per the Batch 10A brief — only
// individual article pages use `type: 'article'`). The route segment
// stays "ua" (not "uk") — only the hreflang KEY and the Open Graph
// locale use "uk"/"uk_UA", via src/lib/seo.ts.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    const title = 'Steuern & Leben in Österreich: Anleitungen | QLIXA'
    const description = 'Praktische Anleitungen zu Steuern, Selbstständigkeit, Dokumenten und Leben in Österreich – verständlich erklärt von QLIXA.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'Taxes & Life in Austria: Practical Guides | QLIXA'
    const description = 'Practical guides to taxes, self-employment, documents and everyday life in Austria, explained clearly by QLIXA.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'Податки та життя в Австрії: практичні інструкції | QLIXA'
    const description = 'Практичні інструкції про податки, самозайнятість, документи та життя в Австрії — зрозуміло від QLIXA.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'Налоги и жизнь в Австрии: практические инструкции | QLIXA'
    const description = 'Практические инструкции о налогах, самозанятости, документах и жизни в Австрии — понятно от QLIXA.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  return {}
}

// ————————————————————————————————————————————————————————————————
// Localized /articles — QLIXA_I18N_MIGRATION_PLAN.md, Phase 6.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same ArticlesContent shared by the old, un-prefixed "/articles" route
// (src/app/articles/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
//
// Individual localized article routes (/[locale]/articles/[slug]) do
// not exist yet — this is Phase 6, Batch A scope only. Article-card
// links on this page intentionally stay flat "/articles/<slug>" until
// that later batch lands.
// ————————————————————————————————————————————————————————————————

export default async function LocaleArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <ArticlesContent lang={toInternalKey(locale)} locale={locale} />
}
