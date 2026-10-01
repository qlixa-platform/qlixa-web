import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import PricingContent from '@/components/PricingContent'

// Page-level SEO metadata — Phase 8.1, Batch 1 (DE only for now). Every
// other locale returns {}, which Next merges with the inherited
// root-layout metadata (src/app/layout.tsx) — i.e. no change at all to
// EN/UA/RU or to the legacy un-prefixed "/pricing" route. Canonical,
// hreflang, Open Graph, Twitter and structured data are intentionally
// untouched — out of scope for this batch.
//
// Product precision (per the Phase 8.1 brief): €24,90 is the price for
// ONE generated tax return for ONE selected tax year — there is no
// subscription. The description below preserves that wording exactly
// as approved; do not rephrase it.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    return {
      title: 'QLIXA Kosten: Steuererklärung für €24,90 | Kein Abo',
      description: 'QLIXA kostenlos ausprobieren. Die vorbereitete Steuererklärung kostet €24,90 pro Steuererklärung und ausgewähltem Steuerjahr. Einmalige Zahlung, kein Abo.',
    }
  }

  return {}
}

// ————————————————————————————————————————————————————————————————
// Localized /pricing — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same PricingContent shared by the old, un-prefixed "/pricing" route
// (src/app/pricing/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocalePricingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <PricingContent lang={toInternalKey(locale)} locale={locale} />
}
