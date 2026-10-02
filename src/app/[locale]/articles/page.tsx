import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates } from '@/lib/seo'
import ArticlesContent from '@/components/ArticlesContent'

// Page-level SEO metadata for the ARTICLES INDEX route itself — Phase
// 8.1, Batch 2 (DE) + Batch 4 (EN) + Batch 5 (UA) + Batch 6 (RU,
// completing all 4 locales' Title/Description) + Batch 8 (canonical/
// hreflang added via the shared src/lib/seo.ts helper). Scoped only to
// this index page; the sibling [slug] dispatcher has its own separate
// generateMetadata for individual articles and is untouched here. Every
// existing Title/Description string below is unchanged. Open Graph,
// Twitter and structured data remain out of scope. The route segment
// stays "ua" (not "uk") — only the hreflang KEY uses "uk", via
// getLocalizedAlternates/toHtmlLang.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    return {
      title: 'Steuern & Leben in Österreich: Anleitungen | QLIXA',
      description: 'Praktische Anleitungen zu Steuern, Selbstständigkeit, Dokumenten und Leben in Österreich – verständlich erklärt von QLIXA.',
      ...getLocalizedAlternates(locale, '/articles'),
    }
  }

  if (locale === 'en') {
    return {
      title: 'Taxes & Life in Austria: Practical Guides | QLIXA',
      description: 'Practical guides to taxes, self-employment, documents and everyday life in Austria, explained clearly by QLIXA.',
      ...getLocalizedAlternates(locale, '/articles'),
    }
  }

  if (locale === 'ua') {
    return {
      title: 'Податки та життя в Австрії: практичні інструкції | QLIXA',
      description: 'Практичні інструкції про податки, самозайнятість, документи та життя в Австрії — зрозуміло від QLIXA.',
      ...getLocalizedAlternates(locale, '/articles'),
    }
  }

  if (locale === 'ru') {
    return {
      title: 'Налоги и жизнь в Австрии: практические инструкции | QLIXA',
      description: 'Практические инструкции о налогах, самозанятости, документах и жизни в Австрии — понятно от QLIXA.',
      ...getLocalizedAlternates(locale, '/articles'),
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
