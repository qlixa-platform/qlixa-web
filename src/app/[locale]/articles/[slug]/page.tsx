import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import AustriaIdContent from '@/components/AustriaIdContent'

// ————————————————————————————————————————————————————————————————
// Localized individual article route — QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 6, Batch B1.
//
// This is the FIRST localized individual-article route and establishes
// the reusable pattern for the remaining articles (Batch B2+). At this
// stage it recognizes ONLY the "austria-id" slug — every other slug
// (rwr-karte, gewerbeanmeldung, gisa-formular, invalidity-child) 404s
// here, exactly like an unknown slug would, because their own
// *Content components don't exist yet. As each subsequent article is
// migrated, this file gains one more entry in the slug→component
// lookup below — it is not rewritten from scratch each time.
//
// Genuine Server Component: `locale` and `slug` come only from the URL
// segments (params), never from localStorage/navigator/client state.
// Renders the same AustriaIdContent shared by the old, un-prefixed
// "/articles/austria-id" route (src/app/articles/austria-id/page.tsx) —
// one source of truth for this article's content/behavior during this
// coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

// Only slugs with a migrated *Content component are listed here. This
// is intentionally NOT the full 5-slug article registry (src/lib/
// articles.ts) — that registry exists for ArticleNav's sidebar/prev-next
// links, which still point to flat legacy URLs for slugs that aren't in
// this map yet (see AustriaIdContent's own doc comment).
const SUPPORTED_ARTICLE_SLUGS = ['austria-id'] as const

// Pre-generates only the one currently-supported slug, for all 4
// locales. Advertising the other 4 slugs here would statically generate
// pages for routes that have no *Content component to render yet — this
// list grows by exactly one entry per future Batch B/C migration, never
// all at once.
export function generateStaticParams() {
  return SUPPORTED_ARTICLE_SLUGS.map((slug) => ({ slug }))
}

export default async function LocaleArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const lang = toInternalKey(locale)

  switch (slug) {
    case 'austria-id':
      return <AustriaIdContent lang={lang} locale={locale} />
    default:
      notFound()
  }
}
