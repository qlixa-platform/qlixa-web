'use client'

import Image from 'next/image'
import Link from 'next/link'

const socials = [
  {
    name: 'YouTube', href: 'https://www.youtube.com/@qlixa_eu',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="4" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.3"/><path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="currentColor"/></svg>,
  },
  {
    name: 'Instagram', href: 'https://www.instagram.com/qlixa_eu/',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/><circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="13" cy="5" r="1" fill="currentColor"/></svg>,
  },
  {
    name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590172723729',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/><path d="M10 16V9.5h2l.5-2H10V6.5c0-.6.3-1 1-1h1.5V4H11c-1.7 0-2.5 1-2.5 2.5V7.5H7v2h1.5V16H10z" fill="currentColor"/></svg>,
  },
  {
    name: 'LinkedIn', href: 'https://www.linkedin.com/company/123154282',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/><path d="M5.5 7.5V13M5.5 5.5v.01M8.5 13V10c0-1.1.9-2 2-2s2 .9 2 2v3M8.5 7.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
]

const footerLinks = {
  'Продукти': [
    { label: 'Ціни', href: '/pricing' },
    { label: 'Шаблони', href: '/templates' },
    { label: 'Партнери', href: '/partners' },
  ],
  'Компанія': [
    { label: 'Про нас', href: '/about' },
    { label: 'Статті', href: '/articles' },
    { label: 'Контакти', href: '/contact' },
  ],
  'Правове': [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови використання', href: '/agb' },
  ],
}

export default function Footer() {
  return (
    <footer>
      <div style={{ height: 3, background: 'linear-gradient(to right, #CC0000 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CC0000 66.66%)', width: '100%' }} />
      <div style={{ background: '#1A1A1A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32, marginBottom: 40,
          }}>
            {/* Brand */}
            <div>
              <Link href="/" style={{ display: 'inline-block', textDecoration: 'none', marginBottom: 14 }}>
                <Image
                  src="/logos/logo-full-light.svg"
                  alt="QLIXA — Reports in One Click"
                  width={140}
                  height={50}
                  style={{ display: 'block' }}
                />
              </Link>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                Твій цифровий помічник для життя та бізнесу в Австрії.
              </p>
              <div style={{ display: 'flex', gap: 14 }}>
                {socials.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.name} style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16,
                }}>
                  {title}
                </div>
                {links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'block', fontSize: 13,
                    color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: 10,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            {/* Contact */}
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16,
              }}>
                Контакт
              </div>
              <a href="mailto:info@qlixa.eu" style={{
                display: 'block', fontSize: 13,
                color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: 10,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'}
              >
                info@qlixa.eu
              </a>
              <Link href="/free-test" style={{
                display: 'inline-block', marginTop: 8,
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: '#038390', color: '#FFFFFF', textDecoration: 'none',
              }}>
                Спробувати →
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
            gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.2)',
          }}>
            <span>© 2025 QLIXA · info@qlixa.eu</span>
            <span>Made with ♥ in Austria 🇦🇹</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
