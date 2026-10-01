import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import AustriaIdContent from '@/components/AustriaIdContent'
import GewerbeanmeldungContent from '@/components/GewerbeanmeldungContent'
import GisaFormularContent from '@/components/GisaFormularContent'
import InvalidityChildContent from '@/components/InvalidityChildContent'
import RwrKarteContent from '@/components/RwrKarteContent'
import SteuererklaerungSelbstVorbereitenContent from '@/components/SteuererklaerungSelbstVorbereitenContent'

// ————————————————————————————————————————————————————————————————
// Localized individual article route — QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 6, Batch B1 (established) / Batch B2 / Batch B3 / Batch B4 /
// RWR Batch C1 (extended).
//
// This is the reusable dispatcher established by the FIRST localized
// individual-article route (austria-id) and extended by each subsequent
// article migration. It now recognizes all 5 articles: "austria-id",
// "gewerbeanmeldung", "gisa-formular", "invalidity-child" and
// "rwr-karte" — every other slug still 404s here, exactly like an
// unknown slug would.
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
//
// 'steuererklaerung-selbst-vorbereiten' (Phase 8 new-article brief) is
// DE-ONLY today — see the locale guard in the switch below. It is still
// listed here (not in a separate array) so generateStaticParams below
// pre-generates its path for all 4 locales like every other slug; the
// non-DE paths simply 404 via the guard instead of rendering untranslated
// or machine-translated content. Remove the guard once EN/UA/RU content
// for this article is approved.
const SUPPORTED_ARTICLE_SLUGS = ['austria-id', 'gewerbeanmeldung', 'gisa-formular', 'invalidity-child', 'rwr-karte', 'steuererklaerung-selbst-vorbereiten'] as const

// Pre-generates all 6 currently-supported article slugs, for all 4
// locales — 24 localized individual-article page paths in total (20 of
// which actually render; the 3 non-DE paths for the newest slug 404 via
// the guard in the switch below).
export function generateStaticParams() {
  return SUPPORTED_ARTICLE_SLUGS.map((slug) => ({ slug }))
}

// Page-level SEO metadata — scoped ONLY to the one new DE article
// (correction requested after the initial Phase 8 new-article delivery;
// the earlier "metadata" added to ArticlesContent.tsx was card copy for
// the index grid, not real <title>/<meta description> output). Every
// other slug/locale combination returns {}, which Next merges with the
// inherited root-layout metadata (src/app/layout.tsx) — i.e. no change
// at all to the other 5 articles' or other locales' rendered <title>/
// <meta description>. This intentionally does NOT touch canonical,
// hreflang, openGraph or twitter — those stay out of scope per the
// correction brief ("do not redesign the global metadata system").
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (locale === 'de' && slug === 'steuererklaerung-selbst-vorbereiten') {
    return {
      title: 'Steuererklärung in Österreich selbst vorbereiten | QLIXA',
      description: 'Steuererklärung in Österreich selbst vorbereiten – auch ohne Steuerformulare zu kennen. QLIXA führt dich mit verständlichen Fragen Schritt für Schritt durch deine Situation.',
    }
  }

  return {}
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
    case 'gisa-formular':
      return <GisaFormularContent lang={lang} locale={locale} />
    case 'invalidity-child':
      return <InvalidityChildContent lang={lang} locale={locale} />
    case 'rwr-karte':
      return <RwrKarteContent lang={lang} locale={locale} />
    case 'steuererklaerung-selbst-vorbereiten':
      // DE-only (Phase 8 new-article brief — no EN/UA/RU translation
      // approved yet). 404 for every other locale instead of silently
      // rendering German content, or a fallback, on /en|ua|ru/articles/
      // steuererklaerung-selbst-vorbereiten.
      if (locale !== 'de') {
        notFound()
      }
      return <SteuererklaerungSelbstVorbereitenContent lang={lang} locale={locale} />
    default:
      notFound()
  }
}
