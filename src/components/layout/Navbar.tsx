'use client'

import React, { useEffect, useRef } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  const handleLangAndClose = (l: string) => {
    handleLang(l);
    setIsMenuOpen(false);
  };

  // Escape closes the mobile panel while it's open. No focus trap is
  // needed here (unlike Footer's form modal) since this is a simple
  // non-modal link/button panel — Tab already flows naturally through
  // whichever of its controls are visible.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen])

  const navItems = getNavItems(lang);
  const t = NAV_TEXT[lang] || NAV_TEXT.UA;

  function scrollToAnchor(id: string) {
    return () => {
      setIsMenuOpen(false)
      const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, background: '#ffffff',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>
          <div className="navbar-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '-12px' }}>
              <Image
                className="navbar-logo"
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
                  color: 'var(--color-text-muted)', textDecoration: 'none',
                }}
                  onClick={
                    item.href === '/#who-its-for' ? scrollToAnchor('who-its-for') :
                    item.href === '/#how-it-works' ? scrollToAnchor('how-it-works') :
                    undefined
                  }
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/pricing" style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: 'var(--color-text-muted)', textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
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
                      color: lang === l ? '#038390' : 'var(--color-text-muted)',
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
                color: 'var(--color-text-muted)', border: '1px solid var(--color-text-muted)',
                background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none', display: 'inline-block',
              }}>
                {t.login}
              </a>
            </div>

            {/* Mobile-only controls: compact current-language indicator +
                hamburger. Hidden by default (inline style) at every width;
                shown only inside the @media(max-width:900px) block in
                globals.css via .navbar-mobile-controls, so desktop is
                never affected regardless of viewport-resize edge cases. */}
            <div className="navbar-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setIsMenuOpen(o => !o)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, color: '#038390',
                  padding: '6px 4px', fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {lang} ▾
              </button>
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setIsMenuOpen(o => !o)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-panel"
                style={{
                  width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <line x1="0" y1="1" x2="22" y2="1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="8" x2="22" y2="8" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="15" x2="22" y2="15" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile navigation panel — same destinations/labels/behavior as
          the desktop nav + right-actions blocks above, just reachable
          through the hamburger below the approved breakpoint. Plain
          conditional render (no CSS visibility class needed): it can
          only ever be opened via the hamburger, which is itself hidden
          at desktop widths, so it never appears there. */}
      {isMenuOpen && (
        <div
          id="mobile-nav-panel"
          style={{
            position: 'sticky', top: 64, zIndex: 39,
            background: '#ffffff', borderTop: '1px solid #E6F4F5',
            boxShadow: '0 8px 24px rgba(26,26,26,0.08)',
            padding: '8px clamp(20px,4vw,60px) 20px',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}
        >
          {navItems.map(item => (
            <Link key={item.label} href={item.href} style={{
              padding: '12px 4px', fontSize: 15, fontWeight: 500,
              color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid #F0F7F8',
            }}
              onClick={
                item.href === '/#who-its-for' ? scrollToAnchor('who-its-for') :
                item.href === '/#how-it-works' ? scrollToAnchor('how-it-works') :
                () => setIsMenuOpen(false)
              }
            >
              {item.label}
            </Link>
          ))}
          <Link href="/pricing" style={{
            padding: '12px 4px', fontSize: 15, fontWeight: 500,
            color: '#1A1A1A', textDecoration: 'none', borderBottom: '1px solid #F0F7F8',
          }}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.pricing}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 4px 6px' }}>
            {(['UA', 'DE', 'EN', 'RU'] as const).map((l) => (
              <button
                key={l}
                onClick={() => handleLangAndClose(l)}
                style={{
                  background: lang === l ? '#F0F7F8' : 'none',
                  border: 'none', cursor: 'pointer', borderRadius: 6,
                  fontSize: 13, fontWeight: lang === l ? 700 : 400,
                  color: lang === l ? '#038390' : 'var(--color-text-muted)',
                  padding: '6px 10px', fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <a href={`https://cabinet-ten-lac.vercel.app/login?lang=${lang === 'UA' ? 'uk' : lang.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: 'block', textAlign: 'center', marginTop: 10,
              padding: '13px 16px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              color: '#fff', background: '#038390', textDecoration: 'none',
            }}>
            {t.login}
          </a>
        </div>
      )}
    </>
  )
}
