import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import ArticlesContent from '@/components/ArticlesContent'

// ————————————————————————————————————————————————————————————————
// Localized /articles — QLIXA_I18N_MIGRATION_PLAN.md, Phase 6.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same ArticlesContent shared by the old, un-prefixed "/articles" route
// (src/app/articles/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
//
// Individual localized article routes (/[locale]/articles/[slug]) do
// not exist yet — this is Phase 6, Batch A scope only. Article-card
// links on this page intentionally stay flat "/articles/<slug>" until
// that later batch lands.
// ————————————————————————————————————————————————————————————————

export default async function LocaleArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <ArticlesContent lang={toInternalKey(locale)} locale={locale} />
}
