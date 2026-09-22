'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const legalLinks = [
  { href: '/impressum', label: 'Імпресум' },
  { href: '/privacy', label: 'Політика конфіденційності' },
  { href: '/agb', label: 'Умови використання' },
  { href: '/cookies', label: 'Політика Cookies' },
]

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff' }}>

      {/* Left sidebar — desktop only below 900px (see .legal-sidebar-desktop-only
          in globals.css). At mobile the same legalLinks data drives a compact
          2x2 grid instead (.legal-mobile-nav, rendered inside the content
          column below), so there is one nav data source and two responsive
          presentations, not two independent navs. */}
      <aside className="legal-sidebar-desktop-only" style={{
        width: 260,
        flexShrink: 0,
        background: '#F0F7F8',
        borderRight: '1px solid rgba(3,131,144,0.12)',
        padding: '40px 0',
        position: 'sticky' as const,
        top: 0,
        height: '100vh',
        overflowY: 'auto' as const,
      }}>
        <div style={{ padding: '0 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76', marginBottom: 4 }}>
            Правове
          </div>
          <div style={{ fontSize: 11, color: '#888' }}>Юридичні документи</div>
        </div>

        <div style={{ display: 'inline-block', margin: '0 24px 20px', padding: '6px 12px', background: 'rgba(204,0,0,0.08)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 8, fontSize: 11, color: '#CC0000', lineHeight: 1.4 }}>
          ⚠️ Робочий шаблон — документи потребують заповнення після реєстрації GmbH
        </div>

        <nav>
          {legalLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '10px 24px',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#038390' : '#595959',
                  background: isActive ? 'rgba(3,131,144,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid #038390' : '3px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = '#038390'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(3,131,144,0.04)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = '#595959'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                <div>{link.label}</div>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Mobile-only compact legal identity + always-visible 4-document
            nav (base-hidden pattern, see .legal-mobile-nav in globals.css —
            hidden by default, shown only at <=900px, so it can never appear
            at desktop regardless of state). Reuses the exact same
            legalLinks array and active-path logic as the desktop sidebar
            above — same routes, same labels, same current-document rule. */}
        <nav className="legal-mobile-nav" aria-label="Правове — юридичні документи">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76', marginBottom: 3 }}>
            Правове
          </div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 14 }}>Юридичні документи</div>

          <div style={{ display: 'inline-block', marginBottom: 16, padding: '6px 12px', background: 'rgba(204,0,0,0.08)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 8, fontSize: 11, color: '#CC0000', lineHeight: 1.4 }}>
            ⚠️ Робочий шаблон — документи потребують заповнення після реєстрації GmbH
          </div>

          <div className="legal-mobile-nav-grid">
            {legalLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const,
                    minHeight: 52, padding: '10px 12px', borderRadius: 12,
                    fontSize: 13, lineHeight: 1.3, textDecoration: 'none',
                    background: isActive ? '#038390' : '#F0F7F8',
                    color: isActive ? '#ffffff' : '#1A1A1A',
                    fontWeight: isActive ? 700 : 500,
                    border: isActive ? '1px solid #038390' : '1px solid rgba(3,131,144,0.2)',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {children}
      </div>

    </div>
  )
}
