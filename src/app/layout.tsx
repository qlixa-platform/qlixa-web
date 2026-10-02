import type { Metadata } from 'next'
import '../styles/globals.css'
import ScrollArrows from '@/components/layout/ScrollArrows'
import LangSync from '@/components/layout/LangSync'

// Phase 8.3, Batch 10A — the `openGraph` block below was cleaned up
// because it directly conflicted with social metadata: every one of
// the 52 localized pages now sets its own openGraph/twitter via
// getSocialMetadata() (src/lib/seo.ts), which fully replaces this
// object for those pages, but only THIS fallback is left over for
// every route NOT yet covered (legacy flat pages, Legal, /for/*,
// /how-it-works/*) — it must not actively assert wrong information
// for those.
//
// Removed: the obsolete "Reports in one click" / "Smart online
// accounting platform..." title/description (flagged obsolete in the
// Phase 8.3 audit), the hardcoded `url: 'https://qlixa.eu'` (wrong for
// every non-root page that inherits it), and `locale: 'en_US'` (wrong
// for any non-English page that inherits it). Replaced with neutral,
// factual, non-claim text — not new marketing copy, just the accurate
// product description already used verbatim in the Phase 8.3 brief's
// own "Product Positioning" section.
//
// NOT touched in this batch (out of scope — see the final report for
// this batch): the plain `title`/`description`/`keywords` fields below
// still contain the same obsolete "Reports in one click" / "accounting
// platform" / "Buchhaltung made simple" wording. `icons` is untouched.
export const metadata: Metadata = {
  title: 'QLIXA — Reports in one click',
  description: 'Smart online accounting platform for foreigners in Austria. Buchhaltung made simple.',
  keywords: 'accounting austria, buchhaltung, foreigners austria, business austria, QLIXA',
  icons: {
    icon: '/logos/favicon-planet-black.svg',
    shortcut: '/logos/favicon-planet-black.svg',
    apple: '/logos/favicon-planet-black.svg',
  },
  openGraph: {
    title: 'QLIXA',
    description: 'Digital self-service tool for preparing your tax return in Austria.',
    siteName: 'QLIXA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollArrows />
        <LangSync />
      </body>
    </html>
  )
}
