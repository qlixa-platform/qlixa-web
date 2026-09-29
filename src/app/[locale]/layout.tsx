import { notFound } from 'next/navigation'
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// TEMPORARY nested layout for the i18n migration's coexistence phase
// (QLIXA_I18N_MIGRATION_PLAN.md, Phase 2 — revised after the root-layout
// architecture verification).
//
// This is deliberately NOT the app's root layout yet: it renders only
// `children`, with no <html>/<body> of its own. Those stay owned by the
// existing src/app/layout.tsx for the whole coexistence window (Phases
// 2–8), which is why every currently-existing page.tsx continues to
// build and render completely unchanged alongside this new [locale]
// segment. Confirmed by build test during the architecture verification
// that adding a second, sibling <html>-owning root here would break
// every other top-level route ("doesn't have a root layout").
//
// <html lang> correctness is intentionally OUT OF SCOPE here — it stays
// whatever src/app/layout.tsx currently hardcodes until the final
// cutover phase, when this layout is promoted to be the real root and
// gains <html lang={locale}>. Do not attempt to correct it via
// useEffect, LangSync, localStorage, or any client-side mechanism in
// the meantime — that would reintroduce exactly the hydration-dependent
// pattern this migration exists to remove.
// ————————————————————————————————————————————————————————————————

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return children
}
