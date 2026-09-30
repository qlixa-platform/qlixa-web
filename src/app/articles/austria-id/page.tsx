'use client'

import { useState, useEffect } from 'react'
import AustriaIdContent from '@/components/AustriaIdContent'
import type { InternalLangKey } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// /articles/austria-id — legacy compatibility wrapper
// (QLIXA_I18N_MIGRATION_PLAN.md, Phase 6). All actual content/
// translations/JSX now live in AustriaIdContent, the single shared
// implementation also rendered by
// src/app/[locale]/articles/[slug]/page.tsx. This wrapper's only job is
// to keep this un-prefixed route's EXISTING client-side language
// selection (localStorage + qlixa-lang-change) byte-for-byte unchanged —
// it deliberately omits the `locale` prop, which keeps Navbar/Footer in
// legacy mode here (see AustriaIdContent's own doc comment). The
// resolved `lang` is still handed to AustriaIdContent, which in turn
// hands the SAME value to ArticleSidebar/ArticleTOC/ArticlePrevNext, so
// the article body and its navigation chrome never disagree on language
// even in legacy mode.
// ————————————————————————————————————————————————————————————————

export default function AustriaIdPage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  return <AustriaIdContent lang={lang as InternalLangKey} />
}
