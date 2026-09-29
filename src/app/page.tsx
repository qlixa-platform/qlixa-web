'use client'

import { useState, useEffect } from 'react'
import HomePageContent from '@/components/HomePageContent'
import type { InternalLangKey } from '@/lib/locale'

// Temporary compatibility wrapper for the old, un-prefixed "/" route during
// the i18n migration's coexistence phase (see QLIXA_I18N_MIGRATION_PLAN.md,
// Phase 3). Keeps the site's existing client-side language mechanism byte-
// for-byte as it worked before this phase — reading `qlixa-lang` from
// localStorage and reacting to the `qlixa-lang-change` event exactly as
// every other still-unmigrated page on the site does. All homepage content
// and behavior now lives in HomePageContent, the single shared
// implementation also used by the new, server-rendered
// src/app/[locale]/page.tsx. This wrapper is temporary and is removed at
// final cutover, once "/" itself redirects to a locale-prefixed URL.
export default function HomePage() {
  const [lang, setLang] = useState('UA');

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang') || 'UA';
      setLang(l.toUpperCase());
    };
    updateLang();
    window.addEventListener('qlixa-lang-change', updateLang);
    return () => window.removeEventListener('qlixa-lang-change', updateLang);
  }, []);

  return <HomePageContent lang={lang as InternalLangKey} />
}
