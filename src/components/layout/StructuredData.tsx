// Global WebSite + Organization JSON-LD — Phase 8.3, Batch 10B.
//
// Rendered ONCE by the root layout (src/app/layout.tsx), not per-page:
// these two entities describe the whole site/brand, not any one
// locale-specific page, so they must not be duplicated into all 52
// route-level generateMetadata functions or re-rendered per locale.
// There is exactly one QLIXA WebSite and exactly one QLIXA
// Organization, regardless of how many localized pages exist.
//
// Deliberately NOT a Client Component — no hooks, no browser APIs,
// just two plain objects serialized with JSON.stringify(). No external
// structured-data package; the values below are hardcoded, trusted
// project constants (not user-generated content), so JSON.stringify is
// sufficient — no extra sanitization is needed.
//
// Scope is intentionally minimal (Phase 8.3 audit + this batch's own
// brief): only confirmed facts are included.
// - name/url: trivially confirmed (the site itself).
// - logo: the real production logo already used in Navbar/Footer
//   (public/logos/logo-name-slogan_planets_black.svg), not the
//   favicon/planet-only mark.
// - email: info@qlixa.eu, the confirmed public contact address.
// - sameAs: the 4 social profile URLs actually live in
//   src/components/layout/Footer.tsx's own `socials` array (YouTube,
//   Instagram, Facebook, LinkedIn) — verified real, absolute,
//   officially-branded QLIXA profiles, not guessed or constructed from
//   the brand name.
// Deliberately NOT included: legalName ("QLIXA GmbH"), registration
// numbers, address, phone, foundingDate, founder — none of these are
// confirmed, finalized public facts yet (Legal remains deferred).

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://qlixa.eu/#website',
  url: 'https://qlixa.eu',
  name: 'QLIXA',
  publisher: {
    '@id': 'https://qlixa.eu/#organization',
  },
}

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://qlixa.eu/#organization',
  name: 'QLIXA',
  url: 'https://qlixa.eu',
  logo: 'https://qlixa.eu/logos/logo-name-slogan_planets_black.svg',
  email: 'info@qlixa.eu',
  sameAs: [
    'https://www.youtube.com/@qlixa_eu',
    'https://www.instagram.com/qlixa_eu/',
    'https://www.facebook.com/profile.php?id=61590172723729',
    'https://www.linkedin.com/company/123154282',
  ],
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
    </>
  )
}
