import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toHtmlLang, SUPPORTED_LOCALES } from '@/lib/locale'
import '../../styles/globals.css'
import ScrollArrows from '@/components/layout/ScrollArrows'
import StructuredData from '@/components/layout/StructuredData'

// ————————————————————————————————————————————————————————————————
// Phase 8.4, Batch 11A — promoted from a temporary non-root nested
// layout (QLIXA_I18N_MIGRATION_PLAN.md, Phase 2) to a REAL, independent
// root layout, now that all 52 localized public pages are complete.
// This is the "localized root" approved by the Phase 8.4 Step 0 audit
// — the sibling to src/app/(marketing)/layout.tsx (the relocated
// former single root, still serving every non-localized route).
//
// <html lang={toHtmlLang(locale)}> — reuses the EXISTING locale.ts
// mapping (de→de, en→en, ua→uk, ru→ru) rather than a second one.
// `locale` comes only from the already-validated URL segment (params),
// never from localStorage/navigator/client state, so the correct
// language is present in the INITIAL server-rendered HTML — no
// hydration-dependent fix. `generateStaticParams` below means this
// value is known at BUILD time, so static generation for all 52 pages
// is fully preserved; nothing here reads a request-time API.
//
// Deliberately does NOT render <LangSync /> — LangSync reads
// `qlixa-lang` from localStorage and would be both redundant and
// actively wrong here: a stale localStorage value must never be able
// to override the URL-authoritative language on a localized page (see
// the Phase 8.4 Step 0 audit's own LangSync analysis). LangSync
// remains exactly where it already was, in the (marketing) root, for
// the legacy client-side language mechanism that root still serves.
//
// `metadata.icons` is repeated here (not inherited from (marketing),
// since these are two independent root trees) purely so the favicon
// isn't lost for the 52 localized pages. No title/description/
// openGraph/twitter/alternates object is set here — every page under
// this root already provides its own complete, approved metadata via
// its own generateMetadata (Phases 8.1–8.3); adding a second fallback
// copy here would create exactly the second SEO-copy source this
// batch's brief says not to introduce.
// ————————————————————————————————————————————————————————————————

export const metadata: Metadata = {
  icons: {
    icon: '/logos/favicon-planet-black.svg',
    shortcut: '/logos/favicon-planet-black.svg',
    apple: '/logos/favicon-planet-black.svg',
  },
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return (
    <html lang={toHtmlLang(locale)}>
      <body>
        {children}
        <ScrollArrows />
        <StructuredData />
      </body>
    </html>
  )
}
