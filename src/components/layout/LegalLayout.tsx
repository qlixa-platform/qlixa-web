'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const legalLinks = [
  { href: '/impressum', label: 'Імпресум' },
  { href: '/privacy', label: 'Політика конфіденційності' },
  { href: '/agb', label: 'Умови використання' },
  { href: '/disclaimer', label: 'Відмова від відповідальності' },
  { href: '/lizenz', label: 'Ліцензійні умови' },
  { href: '/cookies', label: 'Політика Cookies' },
]

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff' }}>

      {/* Left sidebar */}
      <aside style={{
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
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 4 }}>
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
        {children}
      </div>

    </div>
  )
}
