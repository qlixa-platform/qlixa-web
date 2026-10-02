import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import HomePageContent from '@/components/HomePageContent'

const PATH = '/'

// Page-level SEO metadata — Phase 8.1, Batch 1 (DE) + Batch 4 (EN) +
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
    const title = 'Steuererklärung in Österreich einfach vorbereiten | QLIXA'
    const description = 'Steuererklärung in Österreich selbst vorbereiten: Beantworte verständliche Fragen, sieh deine mögliche Steuererstattung vorab und erhalte deine vorbereitete Steuererklärung.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'Tax Return in Austria Made Simple | QLIXA'
    const description = 'Prepare your tax return in Austria yourself: answer clear questions, see your possible tax refund in advance and receive your prepared tax return.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'Податкова декларація в Австрії просто | QLIXA'
    const description = 'Підготуй податкову декларацію в Австрії самостійно: відповідай на зрозумілі запитання, заздалегідь побач можливе повернення податку та отримай готову декларацію.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'Налоговая декларация в Австрии — просто | QLIXA'
    const description = 'Подготовьте налоговую декларацию в Австрии самостоятельно: ответьте на понятные вопросы, заранее узнайте возможный возврат налога и получите готовую декларацию.'
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
// Localized homepage — QLIXA_I18N_MIGRATION_PLAN.md, Phase 3.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. The
// already-resolved internal translation key is handed to
// HomePageContent — the same shared implementation the old,
// un-prefixed "/" route (src/app/page.tsx) also renders — so the
// homepage's marketing content/behavior has exactly one source of
// truth during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only the homepage BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <HomePageContent lang={toInternalKey(locale)} locale={locale} />
}
