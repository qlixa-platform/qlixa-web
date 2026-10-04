import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import { getLocalizedAlternates, getSocialMetadata } from '@/lib/seo'
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
// metadata for "rwr-karte" and "invalidity-child"; Batch 4: added `en`
// metadata to the other 5 articles; Batch 5: added `ua`; Batch 6: added
// `ru`, completing all 4 locales for all 6 articles). This
// intentionally does NOT touch canonical, hreflang, openGraph or
// twitter — out of scope for this batch.
const ARTICLE_METADATA: Record<string, Partial<Record<string, { title: string; description: string }>>> = {
  'steuererklaerung-selbst-vorbereiten': {
    de: {
      title: 'Steuererklärung in Österreich selbst vorbereiten | QLIXA',
      description: 'Steuererklärung in Österreich vorbereiten, ohne zuerst die Steuerformulare verstehen zu müssen. Erfahre, wie QLIXA funktioniert und was du am Ende erhältst.',
    },
    en: {
      title: 'How to Prepare Your Tax Return in Austria | QLIXA',
      description: 'Prepare your tax return in Austria without having to understand the tax forms first. See how QLIXA works and what you receive at the end.',
    },
    ua: {
      title: 'Податкова декларація в Австрії: як підготувати | QLIXA',
      description: 'Як підготувати податкову декларацію в Австрії без необхідності спочатку розбиратися в податкових формах. Дізнайтеся, як працює QLIXA і що ви отримуєте в результаті.',
    },
    ru: {
      title: 'Налоговая декларация в Австрии: как подготовить | QLIXA',
      description: 'Как подготовить налоговую декларацию в Австрии без необходимости сначала разбираться в налоговых формах. Узнайте, как работает QLIXA и что вы получаете в результате.',
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
    ua: {
      title: 'Як зареєструвати ID Austria: покрокова інструкція | QLIXA',
      description: 'Як зареєструвати ID Austria: умови, етапи реєстрації, необхідні документи та візит до органу реєстрації — покроково і зрозуміло.',
    },
    ru: {
      title: 'Как зарегистрировать ID Austria: пошаговая инструкция | QLIXA',
      description: 'Как зарегистрировать ID Austria: условия, этапы регистрации, необходимые документы и визит в орган регистрации — пошагово и понятно.',
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
    ua: {
      title: 'Як відкрити Gewerbe в Австрії: покрокова інструкція | QLIXA',
      description: 'Як зареєструвати Gewerbe в Австрії: умови, необхідні документи, компетентний орган та процес реєстрації підприємницької діяльності.',
    },
    ru: {
      title: 'Как открыть Gewerbe в Австрии: пошаговая инструкция | QLIXA',
      description: 'Как зарегистрировать Gewerbe в Австрии: условия, необходимые документы, компетентный орган и процесс регистрации предпринимательской деятельности.',
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
    ua: {
      title: 'Як зареєструвати Gewerbe онлайн через GISA | QLIXA',
      description: 'Реєстрація Gewerbe онлайн через GISA покроково: онлайн-форма, ID Austria, необхідні дані, додатки та процес подання.',
    },
    ru: {
      title: 'Как зарегистрировать Gewerbe онлайн через GISA | QLIXA',
      description: 'Регистрация Gewerbe онлайн через GISA пошагово: онлайн-форма, ID Austria, необходимые данные, приложения и процесс подачи.',
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
    ua: {
      title: 'RWR Plus в Австрії: умови та подання заяви | QLIXA',
      description: 'RWR Plus в Австрії: умови, необхідні документи, підтвердження доходу та підготовка до подання заяви — зрозуміло і по кроках.',
    },
    ru: {
      title: 'RWR Plus в Австрии: условия и подача заявления | QLIXA',
      description: 'RWR Plus в Австрии: условия, необходимые документы, подтверждение дохода и подготовка к подаче заявления — понятно и по шагам.',
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
    ua: {
      title: 'Дитина з інвалідністю в Австрії: виплати та підтримка | QLIXA',
      description: 'Огляд для батьків дітей з інвалідністю в Австрії: Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та можливі податкові пільги.',
    },
    ru: {
      title: 'Ребёнок с инвалидностью в Австрии: выплаты и поддержка | QLIXA',
      description: 'Обзор для родителей детей с инвалидностью в Австрии: Behindertenpass, повышенная Familienbeihilfe, Pflegegeld и возможные налоговые льготы.',
    },
  },
}

// Canonical/hreflang are route properties, not article-copy properties
// — ARTICLE_METADATA above stays responsible for title/description
// only (Batches 3A/3B/4/5/6); this function is the one place that
// combines it with getLocalizedAlternates (Batch 8). An unknown slug,
// or a slug/locale combination with no approved copy, has no `entry`
// here, so it returns {} — it never accidentally gets a canonical/
// hreflang set for a page that doesn't actually exist at that URL.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  const entry = ARTICLE_METADATA[slug]?.[locale]
  if (!entry) {
    return {}
  }

  // Narrows `locale` to the `Locale` type getLocalizedAlternates/
  // getSocialMetadata expect. In practice this is always true here,
  // since `entry` only exists for the 4 real locale keys written into
  // ARTICLE_METADATA above — this check exists for type safety, not
  // because the fallback branch is expected to run.
  if (!isSupportedLocale(locale)) {
    return entry
  }

  const path = `/articles/${slug}`

  // Open Graph/Twitter (Phase 8.3, Batch 10A) reuse the SAME
  // entry.title/entry.description already approved for standard
  // metadata — no separate OG copy. `type: 'article'` per the Batch
  // 10A brief; deliberately NOT adding publishedTime/modifiedTime/
  // authors — the Phase 8.3 audit found no trustworthy publication
  // date or author for any of the 6 articles, and inventing either
  // was explicitly disallowed. An unknown slug (or unsupported locale)
  // never reaches this point — `entry` would already be falsy above —
  // so no fake social metadata is ever produced for a non-existent
  // article page.
  return {
    ...entry,
    ...getLocalizedAlternates(locale, path),
    ...getSocialMetadata({
      locale,
      path,
      title: entry.title,
      description: entry.description,
      type: 'article',
    }),
  }
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
