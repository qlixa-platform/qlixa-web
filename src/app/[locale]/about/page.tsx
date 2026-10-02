import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import AboutContent from '@/components/AboutContent'

const PATH = '/about'

// Page-level SEO metadata — Phase 8.1, Batch 2 (DE) + Batch 4 (EN) +
// Batch 5 (UA) + Batch 6 (RU, completing all 4 locales' Title/
// Description) + Batch 8 (canonical/hreflang) + Batch 10A (Open Graph/
// Twitter via getSocialMetadata — reuses the SAME title/description
// variables as standard metadata; no separate OG_TITLE copy exists).
// The route segment stays "ua" (not "uk") — only the hreflang KEY and
// the Open Graph locale use "uk"/"uk_UA", via src/lib/seo.ts.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    const title = 'Was ist QLIXA? Digitales Steuer-Tool für Österreich'
    const description = 'Erfahre, wie QLIXA funktioniert: ein digitales Self-Service-Tool zur selbstständigen Vorbereitung der Steuererklärung in Österreich.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'What Is QLIXA? Digital Tax Tool for Austria'
    const description = 'Learn how QLIXA works: a digital self-service tool for preparing your tax return in Austria independently.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'Що таке QLIXA? Цифровий податковий інструмент для Австрії'
    const description = 'Дізнайся, як працює QLIXA — цифровий self-service інструмент для самостійної підготовки податкової декларації в Австрії.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'Что такое QLIXA? Цифровой налоговый инструмент для Австрии'
    const description = 'Узнайте, как работает QLIXA — цифровой self-service инструмент для самостоятельной подготовки налоговой декларации в Австрии.'
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
// Localized /about — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same AboutContent shared by the old, un-prefixed "/about" route
// (src/app/about/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <AboutContent lang={toInternalKey(locale)} locale={locale} />
}
