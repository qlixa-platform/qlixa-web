import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
import ToolsContent from '@/components/ToolsContent'

const PATH = '/tools'

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
    const title = 'RWR Plus Rechner & Checklisten für Österreich | QLIXA'
    const description = 'Kostenloser RWR Plus Einkommensrechner und Checklisten für Österreich. Prüfe dein Einkommen und bereite wichtige Unterlagen für den RWR+ Antrag vor.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'en') {
    const title = 'Red-White-Red Card Plus Calculator & Checklists | QLIXA'
    const description = 'Free income calculator and checklists for the Red-White-Red Card Plus in Austria. Check your income and prepare key documents for your application.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ua') {
    const title = 'RWR Plus: калькулятор доходу та чек-листи | QLIXA'
    const description = 'Безкоштовний калькулятор доходу та чек-листи для RWR Plus в Австрії. Перевір свій дохід і підготуй основні документи для подання заяви.'
    return {
      title,
      description,
      ...getLocalizedAlternates(locale, PATH),
      ...getSocialMetadata({ locale, path: PATH, title, description, type: 'website' }),
    }
  }

  if (locale === 'ru') {
    const title = 'RWR Plus: калькулятор дохода и чек-листы | QLIXA'
    const description = 'Бесплатный калькулятор дохода и чек-листы для RWR Plus в Австрии. Проверьте свой доход и подготовьте основные документы для подачи заявления.'
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
