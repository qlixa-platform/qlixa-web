'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const faqs = [
  {
    q: 'Чи потрібно знати німецьку, щоб користуватись QLIXA?',
    a: 'Ні! QLIXA доступна українською, російською, англійською та німецькою мовами. Всі податкові терміни пояснені простими словами — без жаргону та складних понять.',
  },
  {
    q: 'Я щойно зареєстрував Gewerbe. Можна відразу починати?',
    a: 'Так. З першого дня ви можете додавати клієнтів, виставляти рахунки та відстежувати доходи. QLIXA проведе вас через перші кроки.',
  },
  {
    q: 'QLIXA автоматично рахує податки?',
    a: 'Так — USt (ПДВ), ESt (податок на прибуток) та внески SVS розраховуються автоматично на основі ваших доходів і витрат.',
  },
  {
    q: 'Мої дані в безпеці?',
    a: 'Всі дані зберігаються безпечно в ЄС (Австрія/Німеччина). Ми використовуємо шифрування банківського рівня та дотримуємось GDPR.',
  },
  {
    q: 'Чи можна скасувати підписку в будь-який момент?',
    a: 'Так. Жодних контрактів та прихованих платежів. Скасуйте підписку будь-коли одним кліком.',
  },
  {
    q: 'Якими мовами доступна платформа?',
    a: 'Українська, Deutsch (німецька), English та Русский. Переключайте мову в будь-який момент у налаштуваннях.',
  },
  {
    q: 'Підходить QLIXA якщо я тільки планую відкрити бізнес?',
    a: 'Так! QLIXA підходить як для тих хто вже веде бізнес, так і для тих хто тільки планує. Ми допоможемо розібратися з реєстрацією, вибором форми та першими кроками.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{ borderBottom: '1px solid var(--line)', cursor: 'pointer' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 0', gap: 16,
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--charcoal)' }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
          flexShrink: 0, transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <path d="M3 6l5 5 5-5" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <div style={{ paddingBottom: 16, fontSize: 13, lineHeight: 1.7, color: 'var(--text2)' }}>
          {a}
        </div>
      )}
    </div>
  )
}

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
    { label: 'Конфіденційність', href: '/privacy' },
    { label: 'Умови використання', href: '/terms' },
    { label: 'Impressum', href: '/impressum' },
  ],
}

export default function Footer() {
  return (
    <footer>
      {/* FAQ */}
      <div style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: 6, marginBottom: 12,
              background: 'var(--peach-light)', color: 'var(--orange)',
            }}>
              FAQ
            </div>
            <h2 style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 32, color: 'var(--charcoal)',
            }}>
              Часті <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>запитання</em>
            </h2>
          </div>
          {faqs.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32, marginBottom: 40,
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Image src="/logos/logo-mascot.svg" alt="QLIXA" width={32} height={32} />
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#fff' }}>
                  <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>Q</em>LIXA
                </span>
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                Reports in one click.<br />
                Розумна бухгалтерія для іноземців в Австрії.
              </p>
              <div style={{ display: 'flex', gap: 14 }}>
                {socials.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.name} style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--orange)'}
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
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 10,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
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
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 10,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--orange)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
              >
                info@qlixa.eu
              </a>
              <Link href="/free-test" style={{
                display: 'inline-block', marginTop: 8,
                padding: '9px 18px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                background: 'var(--orange)', color: '#fff', textDecoration: 'none',
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
