// Shared locale utility — the single source of truth for the upcoming
// URL-based i18n migration (see QLIXA_I18N_MIGRATION_PLAN.md, Phase 1).
//
// This module is imported from both Server Components and Client
// Components, so it must stay free of any browser-only API (window,
// document, localStorage, navigator) and of React/Next.js runtime
// imports (hooks, next/navigation). It only does plain string/type
// logic and can run anywhere.
//
// It does NOT change any existing routing, translation content, or
// component today — nothing in the app imports it yet.

// ————————————————————————————————————————————————————————————————
// 1. Supported public URL locales
//
// IMPORTANT — URL segment vs. language code, and why they differ for
// Ukrainian (founders' decision):
//
//   URL locale segment (this array, routes, canonical URLs): 'ua'
//   HTML `lang` attribute / hreflang language code:          'uk'
//
// 'ua' is ONLY QLIXA's chosen public URL locale segment — it is not a
// valid BCP-47 language code (that would be a country code, Ukraine).
// The real language code for Ukrainian, 'uk', is used everywhere a
// language standard actually applies: <html lang>, hreflang alternates,
// and og:locale. Never output <html lang="ua"> and never generate
// hreflang="ua" — see LOCALE_TO_HTML_LANG / toHtmlLang below, which is
// the single place this distinction is bridged.
//
// Concretely, once implemented (not yet — see toHtmlLang's own doc
// comment):
//   canonical: https://qlixa.eu/ua/pricing
//   hreflang:  <link rel="alternate" hreflang="uk" href="https://qlixa.eu/ua/pricing" />
// ————————————————————————————————————————————————————————————————

export const SUPPORTED_LOCALES = ['de', 'en', 'ua', 'ru'] as const

// ————————————————————————————————————————————————————————————————
// 3. Locale type, derived from SUPPORTED_LOCALES (not hand-duplicated)
// ————————————————————————————————————————————————————————————————

export type Locale = (typeof SUPPORTED_LOCALES)[number]

// ————————————————————————————————————————————————————————————————
// 2. Default locale — German, the primary Austrian market/SEO language
// ————————————————————————————————————————————————————————————————

export const DEFAULT_LOCALE: Locale = 'de'

// ————————————————————————————————————————————————————————————————
// 4–5. Mapping between public URL locales and the EXISTING internal
// translation keys already used throughout the codebase (e.g.
// PRICING_TEXT['UA' | 'RU' | 'EN' | 'DE']). The internal 'UA' key is
// deliberately NOT renamed — it happens to read the same as the 'ua'
// URL segment, which is a coincidence of this specific founders'
// decision, not a guarantee this module relies on anywhere else (see
// LOCALE_TO_HTML_LANG below, where the URL segment 'ua' and the actual
// language code 'uk' are intentionally different). This is the same
// de/en/ua/ru <-> UA mapping already duplicated by hand in LangSync.tsx
// (currently still keyed by 'uk', since that file hasn't been migrated
// yet — see the "Impact of the ua/uk convention change" note near the
// bottom of this file) and in Navbar's Cabinet-link construction; this
// module is meant to become their one shared source once those files
// are migrated (later phases).
// ————————————————————————————————————————————————————————————————

export type InternalLangKey = 'DE' | 'EN' | 'UA' | 'RU'

export const LOCALE_TO_INTERNAL_KEY: Record<Locale, InternalLangKey> = {
  de: 'DE',
  en: 'EN',
  ua: 'UA',
  ru: 'RU',
}

export const INTERNAL_KEY_TO_LOCALE: Record<InternalLangKey, Locale> = {
  DE: 'de',
  EN: 'en',
  UA: 'ua',
  RU: 'ru',
}

// ————————————————————————————————————————————————————————————————
// HTML language / hreflang mapping — deliberately separate from
// LOCALE_TO_INTERNAL_KEY above. The URL locale segment and the real
// BCP-47 language code are identical for de/en/ru, but NOT for
// Ukrainian: the URL uses 'ua' (founders' chosen public segment) while
// the actual language code is 'uk'. This is the ONLY place that
// distinction is encoded — every future consumer that needs a real
// language code (root <html lang>, hreflang alternates, og:locale)
// must go through toHtmlLang() rather than using the Locale value
// directly, so 'ua' can never leak into a place that requires a real
// language standard.
// ————————————————————————————————————————————————————————————————

export const LOCALE_TO_HTML_LANG: Record<Locale, string> = {
  de: 'de',
  en: 'en',
  ua: 'uk',
  ru: 'ru',
}

// ————————————————————————————————————————————————————————————————
// 6. Type guard — safely narrows an arbitrary string (e.g. a raw
// params.locale value from a future [locale] route segment) to Locale.
// ————————————————————————————————————————————————————————————————

export function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

// ————————————————————————————————————————————————————————————————
// 7. URL locale -> existing internal translation key, and its mirror.
// ————————————————————————————————————————————————————————————————

export function toInternalKey(locale: Locale): InternalLangKey {
  return LOCALE_TO_INTERNAL_KEY[locale]
}

export function toPublicLocale(key: InternalLangKey): Locale {
  return INTERNAL_KEY_TO_LOCALE[key]
}

// ————————————————————————————————————————————————————————————————
// URL locale -> real HTML language / hreflang code. This is what the
// eventual root layout must use — <html lang={toHtmlLang(locale)}> —
// once src/app/[locale]/layout.tsx is promoted to be the real root at
// final cutover (not implemented yet; see that file's own doc comment).
// The same helper is the one later SEO work (canonical/hreflang
// metadata) must use for the `hreflang` attribute value — never the
// raw Locale/URL segment.
// ————————————————————————————————————————————————————————————————

export function toHtmlLang(locale: Locale): string {
  return LOCALE_TO_HTML_LANG[locale]
}

// ————————————————————————————————————————————————————————————————
// 8. localeHref — prefixes an internal, root-relative public-site path
// with the given locale, for use in <Link href={...}>/<a href={...}>.
//
// Precondition: `path` is either an external URL (any string containing
// a URL scheme, e.g. "https:", "mailto:", "tel:", or a protocol-relative
// "//...") or a root-relative internal path starting with "/" (e.g.
// "/pricing", "/articles/rwr-karte#calculator", "/pricing?source=nav").
// Every internal href in this codebase is already authored this way
// (confirmed in QLIXA_I18N_MIGRATION_PLAN.md, Section 1.1) — a bare
// path with no leading slash is not a case this helper needs to
// support, so it is intentionally not special-cased, to keep this
// function's logic easy to verify.
//
// Query strings and hash fragments are preserved unchanged: they are
// simply part of whatever remains of `path` after any existing leading
// locale segment is stripped.
//
// Safety: external URLs are returned completely unchanged. A path that
// already starts with one of the 4 supported locale segments has that
// segment replaced (not stacked), so re-applying localeHref is
// idempotent and switching locales never produces "/en/de/pricing".
// ————————————————————————————————————————————————————————————————

const EXTERNAL_OR_PROTOCOL_RELATIVE = /^([a-z][a-z0-9+.-]*:)|^\/\//i

// Matches a leading "/xx" locale segment followed by "/", the end of
// the string, "?", or "#" — i.e. a real path segment boundary, not just
// any path that happens to start with two letters (so "/pricing" is
// never mistaken for a locale segment "pr" + "icing").
const LEADING_LOCALE_SEGMENT = /^\/([a-z]{2})(\/|$|\?|#)/

function stripLeadingLocale(path: string): string {
  const match = path.match(LEADING_LOCALE_SEGMENT)
  if (match && isSupportedLocale(match[1])) {
    return path.slice(1 + match[1].length)
  }
  return path
}

export function localeHref(locale: Locale, path: string): string {
  if (EXTERNAL_OR_PROTOCOL_RELATIVE.test(path)) {
    return path
  }

  let rest = stripLeadingLocale(path)
  if (rest === '/') {
    // Avoids "/de/" (trailing slash) when the remainder after removing
    // an existing locale segment is just the root, and also covers the
    // plain "/" input case, matching localeHref('de', '/') === '/de'.
    rest = ''
  }

  return `/${locale}${rest}`
}

// ————————————————————————————————————————————————————————————————
// Impact of the ua/uk convention change (founders' decision, applied
// here) on later migration phases:
//
// - src/app/[locale]/layout.tsx (Phase 2) needed NO change — it only
//   reads SUPPORTED_LOCALES/isSupportedLocale from this module, never
//   hardcodes 'uk', so 'ua' now flows through it automatically.
// - LangSync.tsx and Navbar.tsx's Cabinet-link construction still hand-
//   roll their OWN de/en/uk/ru <-> UA mapping today (not yet migrated
//   to this module) — their hardcoded 'uk' is for the Cabinet's
//   `?lang=` query param and for `document.documentElement.lang`,
//   i.e. real language-code contexts, so it should eventually be
//   replaced by toHtmlLang(), NOT by the new 'ua' URL segment. Whoever
//   migrates those files (a later phase) must not blindly swap their
//   existing 'uk' literal for 'ua' — that would incorrectly send the
//   Cabinet a URL locale segment where it expects a language code.
// - Any future sitemap/canonical/hreflang implementation must use
//   Locale ('ua') for URLs and toHtmlLang(locale) ('uk') for the
//   hreflang attribute value — never the same value for both.
// ————————————————————————————————————————————————————————————————
