import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isSupportedLocale, toInternalKey } from '@/lib/locale'
import OurStoryContent from '@/components/OurStoryContent'

// Page-level SEO metadata — Phase 8.1, Batch 2 (DE) + Batch 4 (EN
// added). UA/RU still return {}, which Next merges with the inherited
// root-layout metadata (src/app/layout.tsx) — i.e. no change at all to
// UA/RU or to the legacy un-prefixed "/our-story" route. Canonical,
// hreflang, Open Graph, Twitter and structured data are intentionally
// untouched — out of scope for this batch.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (locale === 'de') {
    return {
      title: 'Über QLIXA: Die Geschichte hinter dem Steuer-Tool',
      description: 'Lerne die Geschichte hinter QLIXA kennen und erfahre, warum das digitale Self-Service-Tool für die Steuererklärung in Österreich entstanden ist.',
    }
  }

  if (locale === 'en') {
    return {
      title: 'About QLIXA: The Story Behind the Tax Tool',
      description: 'Meet the story behind QLIXA and discover why the digital self-service tool for preparing tax returns in Austria was created.',
    }
  }

  return {}
}

// ————————————————————————————————————————————————————————————————
// Localized /our-story — QLIXA_I18N_MIGRATION_PLAN.md, Phase 5.
//
// Genuine Server Component: `locale` comes only from the URL segment
// (params), never from localStorage/navigator/client state. Renders the
// same OurStoryContent shared by the old, un-prefixed "/our-story" route
// (src/app/our-story/page.tsx) — one source of truth for this page's
// content/behavior during this coexistence phase.
//
// KNOWN TEMPORARY LIMITATION: this route is nested under
// src/app/[locale]/layout.tsx, which does not yet own <html>/<body>
// (see that file's own doc comment) — the served <html lang> still
// comes from the existing src/app/layout.tsx ("en") until final
// cutover. Only this page's own BODY content is guaranteed correct here.
// ————————————————————————————————————————————————————————————————

export default async function LocaleOurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <OurStoryContent lang={toInternalKey(locale)} locale={locale} />
}
