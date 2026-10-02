'use client'
import { useState, useEffect } from 'react'
import RwrKarteContent from '@/components/RwrKarteContent'
import type { InternalLangKey } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// /articles/rwr-karte — legacy compatibility wrapper
// (QLIXA_I18N_MIGRATION_PLAN.md, Phase 6). All actual content/
// translations/JSX/calculator/PDF wiring now live in RwrKarteContent,
// the single shared implementation also rendered by
// src/app/[locale]/articles/[slug]/page.tsx. This wrapper's only job is
// to keep this un-prefixed route's EXISTING client-side language
// selection (localStorage + qlixa-lang-change) byte-for-byte unchanged —
// including this article's own slightly different variant of that
// mechanism (it does not `.toUpperCase()` the stored value, unlike most
// other legacy wrappers; this is intentionally preserved exactly, not
// "fixed" here). It deliberately omits the `locale` prop, which keeps
// Navbar/Footer in legacy mode here (see RwrKarteContent's own doc
// comment). The resolved `lang` is still handed to RwrKarteContent,
// which in turn hands the SAME value to ArticleSidebar/ArticleTOC/
// ArticlePrevNext, RWRCalculator, and all 3 generateChecklistPDF calls —
// so the article body, its navigation chrome, the calculator, and the
// generated PDFs never disagree on language even in legacy mode.
// ————————————————————————————————————————————————————————————————

export default function RWRKartePage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const stored = localStorage.getItem('qlixa-lang')
    if (stored) setLang(stored)
    const handler = () => {
      const updated = localStorage.getItem('qlixa-lang')
      if (updated) setLang(updated)
    }
    window.addEventListener('qlixa-lang-change', handler)
    return () => window.removeEventListener('qlixa-lang-change', handler)
  }, [])

  return <RwrKarteContent lang={lang as InternalLangKey} />
}
