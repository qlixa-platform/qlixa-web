import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import TaxReturnContent from '@/components/TaxReturnContent'

const PATH = '/tax-return'

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
    const title = 'Steuererklärung in Österreich selber machen | QLIXA'
    const description = 'Steuererklärung selbst vorbereiten: Beantworte passende Fragen zu deiner Situation, sieh deine mögliche Steuererstattung vorab und erhalte deine vorbereitete Steuererklärung.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'Prepare Your Tax Return in Austria | QLIXA'
    const description = 'Prepare your Austrian tax return yourself. Answer questions that adapt to your situation, see your possible refund in advance and receive a prepared tax return.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'Як підготувати податкову декларацію в Австрії | QLIXA'
    const description = 'Підготуй податкову декларацію в Австрії самостійно. Відповідай на запитання, що адаптуються до твоєї ситуації, та заздалегідь побач можливе повернення податку.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'Как подготовить налоговую декларацию в Австрии | QLIXA'
    const description = 'Подготовьте налоговую декларацию в Австрии самостоятельно. Ответьте на вопросы, которые адаптируются к вашей ситуации, и заранее узнайте возможный возврат налога.'
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
// Localized /tax-return — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same TaxReturnContent shared by the old, un-prefixed "/tax-return"
// route (src/app/tax-return/page.tsx) — one source of truth for this
// page's content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleTaxReturnPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <TaxReturnContent lang={toInternalKey(locale)} locale={locale} />
}
