'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

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

type FooterColumn = { title: string; titleHref?: string; links: { label: string; href: string }[] }

// Переклади футера — всі 4 мови
const FOOTER_TEXT: Record<string, {
  tagline: string
  columns: FooterColumn[]
  contact: string
  copyright: string
  madeWith: string
  errorTrigger: string
  modalTitle: string
  modalSubtitle: string
  nameLabel: string
  namePlaceholder: string
  emailPlaceholder: string
  descLabel: string
  descPlaceholder: string
  cancel: string
  send: string
  mailSubject: string
  mailBodyName: string
  mailBodyEmail: string
  mailBodyDesc: string
  mailBodyPage: string
}> = {
  UA: {
    tagline: 'Автоматизований інструмент для самостійної підготовки податкової декларації в Австрії.',
    columns: [
      { title: 'Навігація', links: [{ label: 'Про нас', href: '/about' }, { label: 'Статті', href: '/articles' }, { label: 'Інструменти', href: '/tools' }] },
      { title: 'Правове', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Політика конфіденційності', href: '/privacy' }, { label: 'Умови використання', href: '/agb' }] },
    ],
    contact: 'Контакт',
    copyright: '© 2026 QLIXA®',
    madeWith: 'Зроблено з ♥ в Австрії 🇦🇹',
    errorTrigger: 'Знайшли помилку?',
    modalTitle: 'Повідомлення про помилку',
    modalSubtitle: 'Введіть ваше ім’я та email, щоб отримати відповідь, яку підготують фахівці QLIXA.',
    nameLabel: 'Ім’я',
    namePlaceholder: 'Ваше ім’я',
    emailPlaceholder: 'your@email.com',
    descLabel: 'Будь ласка, опишіть суть помилки:',
    descPlaceholder: 'Опишіть, що саме не так...',
    cancel: 'Скасувати',
    send: 'Відправити',
    mailSubject: 'Повідомлення про помилку на сайті QLIXA',
    mailBodyName: 'Ім’я:',
    mailBodyEmail: 'Email:',
    mailBodyDesc: 'Опис помилки:',
    mailBodyPage: 'Сторінка:',
  },
  RU: {
    tagline: 'Автоматизированный инструмент для самостоятельной подготовки налоговой декларации в Австрии.',
    columns: [
      { title: 'Навигация', links: [{ label: 'О нас', href: '/about' }, { label: 'Статьи', href: '/articles' }, { label: 'Инструменты', href: '/tools' }] },
      { title: 'Правовое', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Политика конфиденциальности', href: '/privacy' }, { label: 'Условия использования', href: '/agb' }] },
    ],
    contact: 'Контакт',
    copyright: '© 2026 QLIXA®',
    madeWith: 'Сделано с ♥ в Австрии 🇦🇹',
    errorTrigger: 'Нашли ошибку?',
    modalTitle: 'Сообщение об ошибке',
    modalSubtitle: 'Введите ваше имя и email, чтобы получить ответ, который подготовят специалисты QLIXA.',
    nameLabel: 'Имя',
    namePlaceholder: 'Ваше имя',
    emailPlaceholder: 'your@email.com',
    descLabel: 'Пожалуйста, опишите суть ошибки:',
    descPlaceholder: 'Опишите, что именно не так...',
    cancel: 'Отменить',
    send: 'Отправить',
    mailSubject: 'Сообщение об ошибке на сайте QLIXA',
    mailBodyName: 'Имя:',
    mailBodyEmail: 'Email:',
    mailBodyDesc: 'Описание ошибки:',
    mailBodyPage: 'Страница:',
  },
  EN: {
    tagline: 'An automated tool for preparing your Austrian tax return yourself.',
    columns: [
      { title: 'Navigation', links: [{ label: 'About Us', href: '/about' }, { label: 'Articles', href: '/articles' }, { label: 'Tools', href: '/tools' }] },
      { title: 'Legal', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Use', href: '/agb' }] },
    ],
    contact: 'Contact',
    copyright: '© 2026 QLIXA®',
    madeWith: 'Made with ♥ in Austria 🇦🇹',
    errorTrigger: 'Found a mistake?',
    modalTitle: 'Report an Error',
    modalSubtitle: 'Enter your name and email so the QLIXA team can get back to you.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    descLabel: 'Please describe the issue:',
    descPlaceholder: "Describe what's wrong...",
    cancel: 'Cancel',
    send: 'Send',
    mailSubject: 'Error report on the QLIXA website',
    mailBodyName: 'Name:',
    mailBodyEmail: 'Email:',
    mailBodyDesc: 'Description:',
    mailBodyPage: 'Page:',
  },
  DE: {
    tagline: 'Ein automatisiertes Tool zur selbstständigen Vorbereitung deiner Steuererklärung in Österreich.',
    columns: [
      { title: 'Navigation', links: [{ label: 'Über uns', href: '/about' }, { label: 'Artikel', href: '/articles' }, { label: 'Tools', href: '/tools' }] },
      { title: 'Rechtliches', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Datenschutz', href: '/privacy' }, { label: 'Nutzungsbedingungen', href: '/agb' }] },
    ],
    contact: 'Kontakt',
    copyright: '© 2026 QLIXA®',
    madeWith: 'Made with ♥ in Österreich 🇦🇹',
    errorTrigger: 'Fehler gefunden?',
    modalTitle: 'Fehler melden',
    modalSubtitle: 'Gib deinen Namen und deine E-Mail-Adresse ein, damit dir das QLIXA-Team antworten kann.',
    nameLabel: 'Name',
    namePlaceholder: 'Dein Name',
    emailPlaceholder: 'deine@email.com',
    descLabel: 'Bitte beschreibe den Fehler:',
    descPlaceholder: 'Beschreibe, was nicht stimmt...',
    cancel: 'Abbrechen',
    send: 'Senden',
    mailSubject: 'Fehlermeldung auf der QLIXA-Website',
    mailBodyName: 'Name:',
    mailBodyEmail: 'E-Mail:',
    mailBodyDesc: 'Fehlerbeschreibung:',
    mailBodyPage: 'Seite:',
  },
}

export default function Footer() {
  const [lang, setLang] = useState('UA')
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [desc, setDesc] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = FOOTER_TEXT[lang] || FOOTER_TEXT.UA

  const closeModal = () => {
    setShowModal(false)
    setName(''); setEmail(''); setDesc('')
    previousFocusRef.current?.focus()
  }

  const openModal = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    setShowModal(true)
  }

  // Body-scroll lock while the modal is open — without it, a touch-drag
  // starting on the fixed-position backdrop can scroll the page behind it
  // on mobile instead of (or in addition to) the modal's own content,
  // since `position:fixed` alone does not prevent background scroll on
  // touch devices. Restores whatever inline value was present before
  // (normally none) on close/unmount.
  useEffect(() => {
    if (!showModal) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [showModal])

  // Keyboard behavior while the modal is open: Escape closes it, and
  // Tab/Shift+Tab are trapped within the modal's own focusable controls.
  useEffect(() => {
    if (!showModal) return

    const getFocusable = () =>
      Array.from(modalRef.current?.querySelectorAll<HTMLElement>('input, textarea, button:not([disabled])') || [])

    // Move focus to the first control as soon as the modal renders.
    getFocusable()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])

  const handleSend = () => {
    if (!name || !email || !desc) return
    const page = typeof window !== 'undefined' ? window.location.href : ''
    const body = `${t.mailBodyName} ${name}\n${t.mailBodyEmail} ${email}\n${t.mailBodyPage} ${page}\n\n${t.mailBodyDesc}\n${desc}`
    const mailtoUrl = `mailto:info@qlixa.eu?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    closeModal()
  }

  return (
    <footer>
      <div style={{ height: 1, background: '#f0f0f0', width: '100%' }} />
      <div style={{ background: `#ffffff url('/footer/footer-mountains.png') bottom / cover no-repeat` }}>
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
                  src="/logos/logo-name-slogan_planets_black.svg"
                  alt="QLIXA — Reports in One Click"
                  width={140}
                  height={50}
                  style={{ display: 'block' }}
                />
              </Link>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-muted)', marginBottom: 16 }}>
                {t.tagline}
              </p>
            </div>

            {/* Link columns */}
            {t.columns.map(col => (
              <div key={col.title}>
                {col.titleHref ? (
                  <Link href={col.titleHref} style={{
                    display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16, textDecoration: 'none',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
                  >
                    {col.title}
                  </Link>
                ) : (
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16,
                  }}>
                    {col.title}
                  </div>
                )}
                {col.links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'block', fontSize: 13,
                    color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: 10,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
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
                textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 16,
              }}>
                {t.contact}
              </div>
              <a href="mailto:info@qlixa.eu" style={{
                display: 'block', fontSize: 13,
                color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: 10,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
              >
                info@qlixa.eu
              </a>
              <button onClick={openModal} style={{
                display: 'block', fontSize: 13, background: 'none', border: 'none', padding: 0,
                color: 'var(--color-text-muted)', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
              >
                {t.errorTrigger}
              </button>
            </div>
          </div>

          {/* Bottom bar — copyright | social icons | made with */}
          <div style={{
            paddingTop: 24, borderTop: '1px solid #f0f0f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
            gap: 16, fontSize: 12, color: 'var(--color-text-muted)',
          }}>
            <span>{t.copyright}</span>

            <div style={{ display: 'flex', gap: 14 }}>
              {socials.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.name} style={{ color: 'var(--color-text-muted)', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <span>{t.madeWith}</span>
          </div>
        </div>
      </div>

      {/* Error report modal */}
      {showModal && (
        <div onClick={closeModal} style={{
          position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, zIndex: 200,
        }}>
          <div ref={modalRef} className="footer-modal-panel" onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 20, padding: '32px 28px',
            maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>
              {t.modalTitle}
            </h3>
            <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 20 }}>
              {t.modalSubtitle}
            </p>

            <Input value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder}
              style={{ marginBottom: 10 }} />
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.emailPlaceholder} type="email"
              style={{ marginBottom: 16 }} />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>
              {t.descLabel}
            </label>
            <Textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder={t.descPlaceholder} rows={4}
              style={{ marginBottom: 24 }} />

            <div className="footer-modal-actions" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={closeModal} style={{
                padding: '11px 20px', borderRadius: 10, border: '1px solid #E6F4F5',
                background: '#fff', color: '#595959', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                {t.cancel}
              </button>
              <button onClick={handleSend} disabled={!name || !email || !desc} style={{
                padding: '11px 24px', borderRadius: 10, border: 'none',
                background: (!name || !email || !desc) ? '#9D9D9D' : '#038390', color: '#fff',
                fontSize: 13, fontWeight: 700, cursor: (!name || !email || !desc) ? 'not-allowed' : 'pointer',
              }}>
                {t.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
