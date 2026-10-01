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
// article migration. It now recognizes 6 articles: "austria-id",
// "gewerbeanmeldung", "gisa-formular", "invalidity-child", "rwr-karte"
// and "steuererklaerung-selbst-vorbereiten" — every other slug still
// 404s here, exactly like an unknown slug would.
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
// 'steuererklaerung-selbst-vorbereiten' was DE-only at first; EN/UA/RU
// copy is now approved too (Phase 8 EN/UA/RU localization brief), so it
// renders for all 4 locales like every other article — no locale guard
// needed in the switch below any more.
const SUPPORTED_ARTICLE_SLUGS = ['austria-id', 'gewerbeanmeldung', 'gisa-formular', 'invalidity-child', 'rwr-karte', 'steuererklaerung-selbst-vorbereiten'] as const

// Pre-generates all 6 currently-supported article slugs, for all 4
// locales — 24 localized individual-article page paths in total, all of
// which now actually render.
export function generateStaticParams() {
  return SUPPORTED_ARTICLE_SLUGS.map((slug) => ({ slug }))
}

// Page-level SEO metadata — resolved by BOTH slug and locale (Phase
// 8.1, Batch 3A: restructured from the single-article/4-locale shape
// used for "steuererklaerung-selbst-vorbereiten" alone, preserved here
// with its exact existing values in all 4 locales; Batch 3B: added DE
// metadata for "rwr-karte" and "invalidity-child", completing DE
// coverage for all 6 articles; Batch 4: added `en` metadata to the
// other 5 articles, completing EN coverage for all 6). UA/RU for those
// 5 articles still have no entry, so they return {}, which Next merges
// with the inherited root-layout metadata (src/app/layout.tsx) — i.e.
// no change at all to any combination not explicitly listed here. This
// intentionally does NOT touch canonical, hreflang, openGraph or
// twitter — out of scope for this batch.
const ARTICLE_METADATA: Record<string, Partial<Record<string, { title: string; description: string }>>> = {
  'steuererklaerung-selbst-vorbereiten': {
    de: {
      title: 'Steuererklärung in Österreich selbst vorbereiten | QLIXA',
      description: 'Steuererklärung in Österreich selbst vorbereiten – auch ohne Steuerformulare zu kennen. QLIXA führt dich mit verständlichen Fragen Schritt für Schritt durch deine Situation.',
    },
    en: {
      title: 'How to Prepare Your Tax Return in Austria | QLIXA',
      description: 'Prepare your tax return in Austria without having to understand every tax form first. QLIXA guides you through your situation with clear, step-by-step questions.',
    },
    ua: {
      title: 'Податкова декларація в Австрії: як підготувати | QLIXA',
      description: 'Як самостійно підготувати податкову декларацію в Австрії без вивчення податкових форм. QLIXA проводить крок за кроком через зрозумілі запитання.',
    },
    ru: {
      title: 'Налоговая декларация в Австрии: как подготовить | QLIXA',
      description: 'Как самостоятельно подготовить налоговую декларацию в Австрии без изучения налоговых форм. QLIXA шаг за шагом проводит вас через понятные вопросы.',
    },
  },
  'austria-id': {
    de: {
      title: 'ID Austria einrichten: Schritt-für-Schritt-Anleitung | QLIXA',
      description: 'ID Austria einrichten: Voraussetzungen, Registrierung, benötigte Dokumente und Behördentermin Schritt für Schritt verständlich erklärt.',
    },
    en: {
      title: 'How to Register for ID Austria: Step-by-Step Guide | QLIXA',
      description: 'How to register for ID Austria: requirements, registration steps, documents and the government office appointment explained step by step.',
    },
  },
  'gewerbeanmeldung': {
    de: {
      title: 'Gewerbe anmelden in Österreich: Schritt für Schritt | QLIXA',
      description: 'Gewerbe in Österreich anmelden: Voraussetzungen, benötigte Unterlagen, zuständige Behörde und Ablauf der Gewerbeanmeldung einfach erklärt.',
    },
    en: {
      title: 'How to Register a Business (Gewerbe) in Austria | QLIXA',
      description: 'How to register a Gewerbe in Austria: requirements, documents, competent authority and the business registration process explained step by step.',
    },
  },
  'gisa-formular': {
    de: {
      title: 'Gewerbe online über GISA anmelden: Anleitung | QLIXA',
      description: 'Gewerbeanmeldung über GISA Schritt für Schritt: Online-Formular, ID Austria, benötigte Angaben, Beilagen und Ablauf verständlich erklärt.',
    },
    en: {
      title: 'How to Register a Gewerbe Online via GISA | QLIXA',
      description: 'Register a Gewerbe online via GISA step by step: the online form, ID Austria, required information, attachments and submission process explained.',
    },
  },
  'rwr-karte': {
    de: {
      title: 'RWR Plus Karte Österreich: Voraussetzungen & Antrag | QLIXA',
      description: 'RWR Plus Karte in Österreich: Voraussetzungen, benötigte Unterlagen, Einkommensnachweis und Vorbereitung auf den Antrag verständlich erklärt.',
    },
    en: {
      title: 'Red-White-Red Card Plus Austria: Requirements & Application | QLIXA',
      description: 'Red-White-Red Card Plus in Austria: requirements, required documents, proof of income and how to prepare for your application.',
    },
  },
  'invalidity-child': {
    de: {
      title: 'Kind mit Behinderung in Österreich: Leistungen & Hilfe | QLIXA',
      description: 'Überblick für Eltern: Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und mögliche steuerliche Begünstigungen für Kinder mit Behinderung in Österreich.',
    },
    en: {
      title: 'Child with a Disability in Austria: Benefits & Support | QLIXA',
      description: 'Overview for parents of children with disabilities in Austria: disability pass, increased family allowance, care allowance and possible tax benefits.',
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  return ARTICLE_METADATA[slug]?.[locale] ?? {}
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
      return <SteuererklaerungSelbstVorbereitenContent lang={lang} locale={locale} />
    default:
      notFound()
  }
}
