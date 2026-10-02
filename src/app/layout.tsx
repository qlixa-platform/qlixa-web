import type { Metadata } from 'next'
import '../styles/globals.css'
import ScrollArrows from '@/components/layout/ScrollArrows'
import LangSync from '@/components/layout/LangSync'
import StructuredData from '@/components/layout/StructuredData'

// Phase 8.3, Batch 10A — the `openGraph` block was cleaned up because
// it directly conflicted with social metadata: every one of the 52
// localized pages now sets its own openGraph/twitter via
// getSocialMetadata() (src/lib/seo.ts), which fully replaces this
// object for those pages, but only THIS fallback is left over for
// every route NOT yet covered (legacy flat pages, Legal, /for/*,
// /how-it-works/*) — it must not actively assert wrong information
// for those. No root og:url/og:locale is set, since neither has one
// universally-correct value for every uncovered route.
//
// Phase 8.3, Batch 10B — the plain `title`/`description` fields below
// (left untouched in Batch 10A as explicitly out of scope then) have
// now also been cleaned: the obsolete "QLIXA — Reports in one click" /
// "Smart online accounting platform for foreigners in Austria.
// Buchhaltung made simple." wording is gone, replaced with the same
// neutral, factual, non-claim text as the Batch 10A openGraph fallback
// — "QLIXA" was never a tax adviser/Steuerberater/accountant and does
// not file the return for the user. `openGraph.title` was realigned
// from the bare "QLIXA" to match this cleaned root title for a
// consistent fallback (reported explicitly in this batch's final
// report). The obsolete `keywords` field was removed entirely and
// deliberately NOT replaced — the 52 localized pages already have
// their own intentional SEO metadata; a generic root meta-keywords
// list adds no launch value. `icons` is untouched.
export const metadata: Metadata = {
  title: 'QLIXA — Tax Return. Simplified.',
  description: 'Digital self-service tool for preparing your tax return in Austria.',
  icons: {
    icon: '/logos/favicon-planet-black.svg',
    shortcut: '/logos/favicon-planet-black.svg',
    apple: '/logos/favicon-planet-black.svg',
  },
  openGraph: {
    title: 'QLIXA — Tax Return. Simplified.',
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
        <StructuredData />
      </body>
    </html>
  )
}
