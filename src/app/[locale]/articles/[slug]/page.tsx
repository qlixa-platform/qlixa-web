import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import AustriaIdContent from '@/components/AustriaIdContent'
import GewerbeanmeldungContent from '@/components/GewerbeanmeldungContent'

// ————————————————————————————————————————————————————————————————
// Localized individual article route — QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 6, Batch B1 (established) / Batch B2 (extended).
//
// This is the reusable dispatcher established by the FIRST localized
// individual-article route (austria-id) and extended by each subsequent
// article migration. At this stage it recognizes "austria-id" and
// "gewerbeanmeldung" — every other slug (rwr-karte, gisa-formular,
// invalidity-child) 404s here, exactly like an unknown slug would,
// because their own *Content components don't exist yet. As each
// subsequent article is migrated, this file gains one more entry in the
// slug→component lookup below — it is not rewritten from scratch each
// time.
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
const SUPPORTED_ARTICLE_SLUGS = ['austria-id', 'gewerbeanmeldung'] as const

// Pre-generates only the currently-supported slugs, for all 4 locales.
// Advertising the remaining 3 slugs here would statically generate
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
    case 'gewerbeanmeldung':
      return <GewerbeanmeldungContent lang={lang} locale={locale} />
    default:
      notFound()
  }
}
