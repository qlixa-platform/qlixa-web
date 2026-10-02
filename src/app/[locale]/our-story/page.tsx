import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import OurStoryContent from '@/components/OurStoryContent'

const PATH = '/our-story'

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
    const title = 'Über QLIXA: Die Geschichte hinter dem Steuer-Tool'
    const description = 'Lerne die Geschichte hinter QLIXA kennen und erfahre, warum das digitale Self-Service-Tool für die Steuererklärung in Österreich entstanden ist.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'About QLIXA: The Story Behind the Tax Tool'
    const description = 'Meet the story behind QLIXA and discover why the digital self-service tool for preparing tax returns in Austria was created.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'Про QLIXA: історія створення податкового інструменту'
    const description = 'Познайомся з історією QLIXA та дізнайся, чому з’явився цифровий self-service інструмент для підготовки податкової декларації в Австрії.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'О QLIXA: история создания налогового инструмента'
    const description = 'Познакомьтесь с историей QLIXA и узнайте, почему появился цифровой self-service инструмент для подготовки налоговой декларации в Австрии.'
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
// Localized /our-story — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same OurStoryContent shared by the old, un-prefixed "/our-story" route
// (src/app/our-story/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleOurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <OurStoryContent lang={toInternalKey(locale)} locale={locale} />
}
