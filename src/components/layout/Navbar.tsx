'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavLink = { label: string; href: string }
type NavItem = NavLink

// Переклади навбару — всі 4 мови
const NAV_TEXT: Record<string, {
  howItWorksLabel: string
  taxReturn: string
  forWhom: string
  articles: string
  tools: string
  pricing: string
  login: string
}> = {
  UA: {
    howItWorksLabel: 'Як працює',
    taxReturn: 'QLIXA Tax Return',
    forWhom: 'Для кого',
    articles: 'Статті',
    tools: 'Інструменти',
    pricing: 'Тарифи',
    login: 'Кабінет',
  },
  RU: {
    howItWorksLabel: 'Как работает',
    taxReturn: 'QLIXA Tax Return',
    forWhom: 'Для кого',
    articles: 'Статьи',
    tools: 'Инструменты',
    pricing: 'Тарифы',
    login: 'Кабинет',
  },
  EN: {
    howItWorksLabel: 'How it works',
    taxReturn: 'QLIXA Tax Return',
    forWhom: 'For Whom',
    articles: 'Articles',
    tools: 'Tools',
    pricing: 'Pricing',
    login: 'Cabinet',
  },
  DE: {
    howItWorksLabel: 'So funktioniert’s',
    taxReturn: 'QLIXA Tax Return',
    forWhom: 'Für wen',
    articles: 'Artikel',
    tools: 'Tools',
    pricing: 'Preise',
    login: 'Kabinett',
  },
}

function getNavItems(lang: string): NavItem[] {
  const t = NAV_TEXT[lang] || NAV_TEXT.UA
  return [
    { label: t.howItWorksLabel, href: '/#how-it-works' },
    { label: t.taxReturn, href: '/tax-return' },
    { label: t.forWhom, href: '/#who-its-for' },
    { label: t.articles, href: '/articles' },
    { label: t.tools, href: '/tools' },
  ]
}

export default function Navbar() {
  const [lang, setLang] = React.useState<string>('UA');

  useEffect(() => {
    const saved = localStorage.getItem('qlixa-lang');
    if (saved) {
      setLang(saved);
      return;
    }
    // First-time visitor, nothing saved yet — detect the browser/device
    // language and use that instead of always defaulting to Ukrainian.
    // navigator.languages (ordered by preference) is checked before the
    // single navigator.language, since some browsers only populate the list.
    const browserLangs = (navigator.languages && navigator.languages.length > 0)
      ? navigator.languages
      : [navigator.language];
    const SUPPORTED = ['UA', 'DE', 'EN', 'RU'];
    const LANG_MAP: Record<string, string> = { uk: 'UA', de: 'DE', en: 'EN', ru: 'RU' };
    let detected = 'EN'; // sensible fallback if none of the 4 match at all
    for (const bl of browserLangs) {
      const code = bl.split('-')[0].toLowerCase();
      if (LANG_MAP[code]) { detected = LANG_MAP[code]; break; }
    }
    if (!SUPPORTED.includes(detected)) detected = 'EN';
    setLang(detected);
    localStorage.setItem('qlixa-lang', detected);
    window.dispatchEvent(new Event('qlixa-lang-change'));
  }, []);

  const handleLang = (l: string) => {
    setLang(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qlixa-lang', l);
      window.dispatchEvent(new Event('qlixa-lang-change'));
    }
  };

  const navItems = getNavItems(lang);
  const t = NAV_TEXT[lang] || NAV_TEXT.UA;

  function scrollToAnchor(id: string) {
    return () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, background: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '-12px' }}>
              <Image
                src="/logos/logo-name-slogan_planets_black.svg"
                alt="QLIXA — Reports in One Click"
                width={160}
                height={57}
                style={{ display: 'block' }}
              />
            </Link>

            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: '40px' }} className="hidden-mobile">
              {navItems.map(item => (
                <Link key={item.label} href={item.href} style={{
                  padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  color: '#9D9D9D', textDecoration: 'none',
                }}
                  onClick={
                    item.href === '/#who-its-for' ? scrollToAnchor('who-its-for') :
                    item.href === '/#how-it-works' ? scrollToAnchor('how-it-works') :
                    undefined
                  }
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/pricing" style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: '#9D9D9D', textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
              >
                {t.pricing}
              </Link>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
              {/* Language switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 8 }}>
                {(['UA', 'DE', 'EN', 'RU'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLang(l)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: lang === l ? 700 : 400,
                      color: lang === l ? '#038390' : '#9D9D9D',
                      padding: '2px 5px',
                      borderRadius: 4,
                      fontFamily: 'DM Sans, sans-serif',
                      transition: 'color 0.15s',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <a href={`https://cabinet-ten-lac.vercel.app/login?lang=${lang === 'UA' ? 'uk' : lang.toLowerCase()}`} style={{
                padding: '8px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                color: '#9D9D9D', border: '1px solid #9D9D9D',
                background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none', display: 'inline-block',
              }}>
                {t.login}
              </a>
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}
