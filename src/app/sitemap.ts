import type { MetadataRoute } from 'next'
import { SUPPORTED_LOCALES } from '@/lib/locale'

// Native Next.js App Router metadata route — this file alone produces
// /sitemap.xml; there is no manual XML and no API route (Phase 8.2,
// Batch 9).
//
// Canonical origin — intentionally hardcoded, matching the same
// SITE_URL convention already established in src/lib/seo.ts (Batch 8).
// Never read from request headers/env, never localhost.
const SITE_URL = 'https://qlixa.eu'

// The 13 approved public route types (locale-independent paths) — a
// deliberately curated list, not a filesystem scan. This intentionally
// excludes: every flat/legacy route (now a Batch 7 redirect source,
// not a destination), /how-it-works/*, /for/*, Legal (/impressum,
// /privacy, /agb, /cookies, /terms, /datenschutz — deferred to Phase
// 7), and the flat (never-existed) steuererklaerung-selbst-vorbereiten
// URL. Only the real, localized destination pages are listed.
const ROUTE_PATHS = [
  '/',
  '/tax-return',
  '/pricing',
  '/tools',
  '/about',
  '/our-story',
  '/articles',
  '/articles/austria-id',
  '/articles/gewerbeanmeldung',
  '/articles/gisa-formular',
  '/articles/rwr-karte',
  '/articles/invalidity-child',
  '/articles/steuererklaerung-selbst-vorbereiten',
] as const

// Minimal local URL builder, deliberately NOT importing the absolute-
// URL logic from src/lib/seo.ts: that helper is private to seo.ts (only
// getLocalizedAlternates is exported), and exporting it just for this
// one small sitemap would broaden that module's public API for no real
// benefit. The two lines below follow the exact same convention
// (SITE_URL + locale + path, '/' collapses to no suffix, no trailing
// slash, no double slash) without creating a second competing
// implementation of canonical/hreflang logic — Batch 8's own
// canonical/hreflang behavior is untouched by this file.
function absoluteUrl(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path
  return `${SITE_URL}/${locale}${suffix}`
}

// No lastModified (no trustworthy per-page modification dates exist to
// report honestly), no changeFrequency, no priority — kept minimal per
// the Batch 9 brief. No sitemap-level hreflang alternates either; that
// already lives in each page's own HTML (Batch 8).
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of ROUTE_PATHS) {
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({ url: absoluteUrl(locale, path) })
    }
  }

  return entries
}
