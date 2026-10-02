/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // Phase 8.2, Batch 7 — permanent (308) redirects from confirmed legacy
  // non-localized public URLs to their final German localized URL.
  // German is the deterministic default (DEFAULT_LOCALE in
  // src/lib/locale.ts) — there is no browser/IP/Accept-Language/
  // localStorage detection here or anywhere else in this list.
  //
  // Evaluated by Next.js BEFORE filesystem routes, so the legacy
  // page.tsx files below are intentionally left in place (not deleted)
  // — these config-level redirects intercept their public URLs first,
  // making the page files themselves unreachable without removing them.
  //
  // Root destination note: '/' redirects to '/de' (no trailing slash),
  // not '/de/'. Next.js's own trailing-slash normalization 308-redirects
  // '/de/' -> '/de' by default, so a '/de/' destination here would add a
  // second hop ('/' -> '/de/' -> '/de') — '/de' alone keeps this a
  // single 308 hop, consistent with the "no redirect chains" requirement
  // for this batch. Every other destination below already matches
  // Next's own canonical (no-trailing-slash) form, so this only applies
  // to the root entry.
  async redirects() {
    return [
      // Group A — legacy marketing/article routes with a byte-for-byte
      // equivalent already live under /de/... (QLIXA_I18N_MIGRATION_PLAN.md
      // Phase 8.2 audit).
      { source: '/', destination: '/de', permanent: true },
      { source: '/about', destination: '/de/about', permanent: true },
      { source: '/our-story', destination: '/de/our-story', permanent: true },
      { source: '/pricing', destination: '/de/pricing', permanent: true },
      { source: '/tax-return', destination: '/de/tax-return', permanent: true },
      { source: '/tools', destination: '/de/tools', permanent: true },
      { source: '/articles', destination: '/de/articles', permanent: true },
      { source: '/articles/austria-id', destination: '/de/articles/austria-id', permanent: true },
      { source: '/articles/gewerbeanmeldung', destination: '/de/articles/gewerbeanmeldung', permanent: true },
      { source: '/articles/gisa-formular', destination: '/de/articles/gisa-formular', permanent: true },
      { source: '/articles/rwr-karte', destination: '/de/articles/rwr-karte', permanent: true },
      { source: '/articles/invalidity-child', destination: '/de/articles/invalidity-child', permanent: true },

      // Legacy aliases — these pages still contain their own in-page
      // redirect() to a flat legacy URL (left untouched in this batch);
      // these config entries intercept the request first and go
      // straight to the final German URL, so there is no redirect
      // chain through the flat intermediate route.
      { source: '/how-it-works/tax-return', destination: '/de/tax-return', permanent: true },
      { source: '/for/biznes', destination: '/de/pricing', permanent: true },
      { source: '/for/frilanser', destination: '/de/tax-return', permanent: true },
      { source: '/for/naymanyy', destination: '/de/tax-return', permanent: true },
      { source: '/for/nerukhomist', destination: '/de/tax-return', permanent: true },
      { source: '/for/pensioner', destination: '/de/tax-return', permanent: true },
      { source: '/for/samostiynyy', destination: '/de/tax-return', permanent: true },

      // Deliberately NOT redirected (Phase 8.2 audit):
      // - /articles/steuererklaerung-selbst-vorbereiten never existed as
      //   a flat route; it correctly stays 404.
      // - /impressum, /privacy, /agb, /cookies, /terms, /datenschutz —
      //   Legal is DEFERRED to Phase 7 and must stay exactly as is.
    ]
  },
}
module.exports = nextConfig
