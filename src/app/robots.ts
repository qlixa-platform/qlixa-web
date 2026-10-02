import type { MetadataRoute } from 'next'

// Native Next.js App Router metadata route — produces /robots.txt
// (Phase 8.2, Batch 9). QLIXA's public pages should be fully
// crawlable: no Disallow rules, no noindex here or anywhere else in
// this batch. The legacy/duplicate-content concern is already solved
// by Batch 7's permanent redirects, not by robots.txt.
const SITE_URL = 'https://qlixa.eu'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
