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
// ————————————————————————————————————————————————————————————————

export const SUPPORTED_LOCALES = ['de', 'en', 'uk', 'ru'] as const

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
// deliberately NOT renamed — only the public-facing URL/hreflang/
// <html lang> layer uses 'uk'. This is the same de/en/uk/ru <-> UA
// mapping already duplicated by hand in LangSync.tsx and in Navbar's
// Cabinet-link construction; this module is meant to become their one
// shared source once those files are migrated (later phases).
// ————————————————————————————————————————————————————————————————

export type InternalLangKey = 'DE' | 'EN' | 'UA' | 'RU'

export const LOCALE_TO_INTERNAL_KEY: Record<Locale, InternalLangKey> = {
  de: 'DE',
  en: 'EN',
  uk: 'UA',
  ru: 'RU',
}

export const INTERNAL_KEY_TO_LOCALE: Record<InternalLangKey, Locale> = {
  DE: 'de',
  EN: 'en',
  UA: 'uk',
  RU: 'ru',
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
