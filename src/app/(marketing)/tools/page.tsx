'use client'

import { useState, useEffect } from 'react'
import ToolsContent from '@/components/ToolsContent'
import type { InternalLangKey } from '@/lib/locale'

// ————————————————————————————————————————————————————————————————
// /tools — legacy compatibility wrapper (QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 5). All actual content/translations/JSX/PDF-generation wiring
// now live in ToolsContent, the single shared implementation also
// rendered by src/app/[locale]/tools/page.tsx. This wrapper's only job
// is to keep this un-prefixed route's EXISTING client-side language
// selection (localStorage + qlixa-lang-change) byte-for-byte unchanged —
// it deliberately omits the `locale` prop, which keeps Navbar/Footer in
// legacy mode AND keeps the PDF generator reading `getLang()`/localStorage
// fresh at click-time, exactly as before (see ToolsContent's own doc
// comment).
// ————————————————————————————————————————————————————————————————

export default function ToolsPage() {
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

  return <ToolsContent lang={lang as InternalLangKey} />
}
