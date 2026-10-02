// Server-safe SEO helper — the single source of truth for canonical/
// hreflang alternates on localized public pages (QLIXA_I18N_MIGRATION_
// PLAN.md, Phase 8.2, Batch 8).
//
// Deliberately free of window/document/localStorage/React hooks, so it
// is safe to call from generateMetadata() in Server Components. Reuses
// SUPPORTED_LOCALES/Locale/toHtmlLang from src/lib/locale.ts — this is
// NOT a second, independent locale system; it only adds the one thing
// locale.ts doesn't already provide: absolute, origin-qualified URLs
// for metadata output.
//
// IMPORTANT — the ua/uk distinction: the public URL locale segment is
// 'ua', but the real BCP-47/hreflang language code for Ukrainian is
// 'uk' (see locale.ts's own extensive comment on this). This module
// goes through toHtmlLang() for every hreflang KEY, so 'uk' is the only
// value that can ever appear there — 'ua' must never leak into a
// hreflang attribute.

import { SUPPORTED_LOCALES, toHtmlLang, type Locale } from './locale'

// Canonical origin — intentionally hardcoded, not read from request
// headers or environment variables. The brief is explicit: no dynamic
// host, no localhost, no environment-dependent hostname.
const SITE_URL = 'https://qlixa.eu'

// Builds one locale's absolute URL for a given locale-independent route
// path. `path` is either '/' (home) or a root-relative path starting
// with '/' and WITHOUT a trailing slash (e.g. '/pricing',
// '/articles/austria-id') — the same convention already used by
// localeHref() elsewhere in this codebase. The home case collapses to
// `${SITE_URL}/${locale}` (no trailing slash), matching the stable,
// no-redirect form confirmed in Phase 8.2 Batch 7 (Next's own trailing-
// slash normalization would otherwise immediately 308 a '/de/' URL to
// '/de', so a canonical/hreflang value must never end in a trailing
// slash here).
function absoluteUrl(locale: Locale, path: string): string {
  const suffix = path === '/' ? '' : path
  return `${SITE_URL}/${locale}${suffix}`
}

// getLocalizedAlternates(locale, path) — returns the exact shape
// Next.js Metadata expects for `alternates`, ready to spread directly
// into a generateMetadata() return value:
//
//   { alternates: { canonical: '...', languages: { de: '...', en: '...', uk: '...', ru: '...' } } }
//
// `locale` is the CURRENT page's own locale (its canonical always
// points at itself — EN/UA/RU are never canonicalized to German).
// `languages` always contains all 4 supported locales, keyed by their
// real hreflang code (via toHtmlLang), including the current locale
// itself — the set is identical and reciprocal across all 4 variants
// of the same page. No x-default is added (out of scope for this
// batch, per the brief).
export function getLocalizedAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {}
  for (const l of SUPPORTED_LOCALES) {
    languages[toHtmlLang(l)] = absoluteUrl(l, path)
  }

  return {
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages,
    },
  }
}

// ————————————————————————————————————————————————————————————————
// Social metadata — Open Graph + Twitter (Phase 8.3, Batch 10A).
//
// Approved universal social image (Phase 8.3 brief). Its real,
// measured dimensions are 1729×910 — NOT the 1200×630 the brief
// originally expected. Per explicit user decision (asked during this
// batch rather than guessed), the OG image metadata below declares
// these REAL dimensions rather than the file itself being resized —
// 1729×910 is ≈1.90:1, already very close to Open Graph's own ideal
// 1.91:1 ratio, so this is a correctly-proportioned image at a larger
// size, not a problem. If the image is ever replaced, update
// OG_IMAGE_WIDTH/OG_IMAGE_HEIGHT to match the new file's real
// dimensions — never assert a number that doesn't match the actual
// asset.
const OG_IMAGE_URL = `${SITE_URL}/og/qlixa-og.png`
const OG_IMAGE_WIDTH = 1729
const OG_IMAGE_HEIGHT = 910
const OG_IMAGE_ALT = 'QLIXA — Tax Return. Simplified.'

// Open Graph locale codes — deliberately separate from toHtmlLang()'s
// hreflang codes (de/en/uk/ru): Open Graph's own convention is
// language_TERRITORY (e.g. uk_UA), not the bare BCP-47 language code
// hreflang uses. Ukrainian is 'uk_UA', matching the same uk (not 'ua')
// distinction established throughout this codebase — 'ua_UA' must
// never be produced.
const OG_LOCALE_MAP: Record<Locale, string> = {
  de: 'de_AT',
  en: 'en_US',
  ua: 'uk_UA',
  ru: 'ru_RU',
}

export type SocialMetadataType = 'website' | 'article'

// getSocialMetadata(...) — the single source of truth for Open Graph +
// Twitter on localized pages. Deliberately takes `title`/`description`
// as PARAMETERS rather than looking them up itself: every call site
// already has its own approved SEO title/description (from its own
// generateMetadata locale branch, or from ARTICLE_METADATA for
// articles) and passes the SAME values through here — there is no
// second OG_TITLE/TWITTER_TITLE copy anywhere, by construction.
export function getSocialMetadata({
  locale,
  path,
  title,
  description,
  type,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  type: SocialMetadataType
}) {
  const url = absoluteUrl(locale, path)
  const alternateLocale = SUPPORTED_LOCALES
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE_MAP[l])

  const image = {
    url: OG_IMAGE_URL,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: OG_IMAGE_ALT,
  }

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'QLIXA',
      locale: OG_LOCALE_MAP[locale],
      alternateLocale,
      type,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  }
}
