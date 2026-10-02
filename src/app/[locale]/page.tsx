import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import HomePageContent from '@/components/HomePageContent'

// Page-level SEO metadata — Phase 8.1, Batch 1 (DE) + Batch 4 (EN) +
// Batch 5 (UA) + Batch 6 (RU added, completing all 4 locales for this
// route). Canonical, hreflang, Open Graph, Twitter and structured data
// are intentionally untouched — out of scope for this batch. The route
// segment stays "ua" (not "uk") — the eventual html-lang/hreflang code
// "uk" is a separate, later technical-SEO task.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    return {
      title: 'Steuererklärung in Österreich einfach vorbereiten | QLIXA',
      description: 'Steuererklärung in Österreich selbst vorbereiten: Beantworte verständliche Fragen, sieh deine mögliche Steuererstattung vorab und erhalte deine vorbereitete Steuererklärung.',
    }
  }

  if (locale === 'en') {
    return {
      title: 'Tax Return in Austria Made Simple | QLIXA',
      description: 'Prepare your tax return in Austria yourself: answer clear questions, see your possible tax refund in advance and receive your prepared tax return.',
    }
  }

  if (locale === 'ua') {
    return {
      title: 'Податкова декларація в Австрії просто | QLIXA',
      description: 'Підготуй податкову декларацію в Австрії самостійно: відповідай на зрозумілі запитання, заздалегідь побач можливе повернення податку та отримай готову декларацію.',
    }
  }

  if (locale === 'ru') {
    return {
      title: 'Налоговая декларация в Австрии — просто | QLIXA',
      description: 'Подготовьте налоговую декларацию в Австрии самостоятельно: ответьте на понятные вопросы, заранее узнайте возможный возврат налога и получите готовую декларацию.',
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
