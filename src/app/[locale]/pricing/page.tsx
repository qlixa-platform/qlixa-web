import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import PricingContent from '@/components/PricingContent'

const PATH = '/pricing'

// Page-level SEO metadata — Phase 8.1, Batch 1 (DE) + Batch 4 (EN) +
// Batch 5 (UA) + Batch 6 (RU, completing all 4 locales' Title/
// Description) + Batch 8 (canonical/hreflang) + Batch 10A (Open Graph/
// Twitter via getSocialMetadata — reuses the SAME title/description
// variables as standard metadata; no separate OG_TITLE copy exists).
// The route segment stays "ua" (not "uk") — only the hreflang KEY and
// the Open Graph locale use "uk"/"uk_UA", via src/lib/seo.ts.
//
// Product precision (per the Phase 8.1 brief): €24,90 / €24.90 is the
// price for ONE generated tax return for ONE selected tax year — there
// is no subscription. All four strings below preserve that wording
// exactly as approved; do not rephrase them.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    const title = 'QLIXA Kosten: Steuererklärung für €24,90 | Kein Abo'
    const description = 'QLIXA kostenlos ausprobieren. Die vorbereitete Steuererklärung kostet €24,90 pro Steuererklärung und ausgewähltem Steuerjahr. Einmalige Zahlung, kein Abo.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'QLIXA Pricing: Tax Return for €24.90 | No Subscription'
    const description = 'Try QLIXA for free. A prepared tax return costs €24.90 per tax return and selected tax year. One-time payment, no subscription.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'QLIXA: вартість податкової декларації €24,90 | Без підписки'
    const description = 'Спробуй QLIXA безкоштовно. Готова податкова декларація коштує €24,90 за одну декларацію та обраний податковий рік. Одноразова оплата, без підписки.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'QLIXA: налоговая декларация за €24,90 | Без подписки'
    const description = 'Попробуйте QLIXA бесплатно. Готовая налоговая декларация стоит €24,90 за одну декларацию и выбранный налоговый год. Разовая оплата, без подписки.'
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
