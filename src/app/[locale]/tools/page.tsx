import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import ToolsContent from '@/components/ToolsContent'

// Page-level SEO metadata — Phase 8.1, Batch 2 (DE) + Batch 4 (EN
// added). UA/RU still return {}, which Next merges with the inherited
// root-layout metadata (src/app/layout.tsx) — i.e. no change at all to
// UA/RU or to the legacy un-prefixed "/tools" route. Canonical,
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
      title: 'RWR Plus Rechner & Checklisten für Österreich | QLIXA',
      description: 'Kostenloser RWR Plus Einkommensrechner und Checklisten für Österreich. Prüfe dein Einkommen und bereite wichtige Unterlagen für den RWR+ Antrag vor.',
    }
  }

  if (locale === 'en') {
    return {
      title: 'Red-White-Red Card Plus Calculator & Checklists | QLIXA',
      description: 'Free income calculator and checklists for the Red-White-Red Card Plus in Austria. Check your income and prepare key documents for your application.',
    }
  }

  return {}
}

// ————————————————————————————————————————————————————————————————
// Localized /tools — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same ToolsContent shared by the old, un-prefixed "/tools" route
// (src/app/tools/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <ToolsContent lang={toInternalKey(locale)} locale={locale} />
}
