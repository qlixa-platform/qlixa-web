import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import HomePageContent from '@/components/HomePageContent'

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
