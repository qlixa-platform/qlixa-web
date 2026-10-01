import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import TaxReturnContent from '@/components/TaxReturnContent'

// Page-level SEO metadata — Phase 8.1, Batch 1 (DE) + Batch 4 (EN) +
// Batch 5 (UA added). RU still returns {}, which Next merges with the
// inherited root-layout metadata (src/app/layout.tsx) — i.e. no change
// at all to RU or to the legacy un-prefixed "/tax-return" route. The
// route segment stays "ua" (not "uk") — the eventual html-lang/hreflang
// code "uk" is a separate, later technical-SEO task. Canonical,
// hreflang, Open Graph, Twitter and structured data are intentionally
// untouched — out of scope for this batch.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    return {
      title: 'Steuererklärung in Österreich selber machen | QLIXA',
      description: 'Steuererklärung selbst vorbereiten: Beantworte passende Fragen zu deiner Situation, sieh deine mögliche Steuererstattung vorab und erhalte deine vorbereitete Steuererklärung.',
    }
  }

  if (locale === 'en') {
    return {
      title: 'Prepare Your Tax Return in Austria | QLIXA',
      description: 'Prepare your Austrian tax return yourself. Answer questions that adapt to your situation, see your possible refund in advance and receive a prepared tax return.',
    }
  }

  if (locale === 'ua') {
    return {
      title: 'Як підготувати податкову декларацію в Австрії | QLIXA',
      description: 'Підготуй податкову декларацію в Австрії самостійно. Відповідай на запитання, що адаптуються до твоєї ситуації, та заздалегідь побач можливе повернення податку.',
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
