'use client'

import { useState, useEffect } from 'react'
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

type FooterColumn = { title: string; titleHref?: string; links: { label: string; href: string }[] }

// Переклади футера — всі 4 мови
const FOOTER_TEXT: Record<string, {
  tagline: string
  columns: FooterColumn[]
  contact: string
  contactLink: string
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
    tagline: 'Автоматизована цифрова платформа для самозайнятих, підприємців та найманих працівників в Австрії.',
    columns: [
      { title: 'Платформа', links: [{ label: 'Про нас', href: '/about' }, { label: 'Статті', href: '/articles' }, { label: 'Інструменти', href: '/tools' }] },
      { title: 'Правове', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Політика конфіденційності', href: '/privacy' }, { label: 'Умови використання', href: '/agb' }] },
    ],
    contact: 'Контакт',
    contactLink: 'Контакти',
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
    tagline: 'Автоматизированная цифровая платформа для самозанятых, предпринимателей и наёмных работников в Австрии.',
    columns: [
      { title: 'Платформа', links: [{ label: 'О нас', href: '/about' }, { label: 'Статьи', href: '/articles' }, { label: 'Инструменты', href: '/tools' }] },
      { title: 'Правовое', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Политика конфиденциальности', href: '/privacy' }, { label: 'Условия использования', href: '/agb' }] },
    ],
    contact: 'Контакт',
    contactLink: 'Контакты',
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
    tagline: 'An automated digital platform for the self-employed, entrepreneurs, and employees in Austria.',
    columns: [
      { title: 'Platform', links: [{ label: 'About Us', href: '/about' }, { label: 'Articles', href: '/articles' }, { label: 'Tools', href: '/tools' }] },
      { title: 'Legal', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Use', href: '/agb' }] },
    ],
    contact: 'Contact',
    contactLink: 'Contact',
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
    tagline: 'Eine automatisierte digitale Plattform für Selbstständige, Unternehmer:innen und Angestellte in Österreich.',
    columns: [
      { title: 'Plattform', links: [{ label: 'Über uns', href: '/about' }, { label: 'Artikel', href: '/articles' }, { label: 'Tools', href: '/tools' }] },
      { title: 'Rechtliches', titleHref: '/impressum', links: [{ label: 'Impressum', href: '/impressum' }, { label: 'Datenschutz', href: '/privacy' }, { label: 'Nutzungsbedingungen', href: '/agb' }] },
    ],
    contact: 'Kontakt',
    contactLink: 'Kontakt',
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
  }

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
      <div style={{ background: '#ffffff' }}>
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
              <p style={{ fontSize: 12, lineHeight: 1.6, color: '#9D9D9D', marginBottom: 16 }}>
                {t.tagline}
              </p>
            </div>

            {/* Link columns */}
            {t.columns.map(col => (
              <div key={col.title}>
                {col.titleHref ? (
                  <Link href={col.titleHref} style={{
                    display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#9D9D9D', marginBottom: 16, textDecoration: 'none',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
                  >
                    {col.title}
                  </Link>
                ) : (
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: '#9D9D9D', marginBottom: 16,
                  }}>
                    {col.title}
                  </div>
                )}
                {col.links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'block', fontSize: 13,
                    color: '#9D9D9D', textDecoration: 'none', marginBottom: 10,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
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
                textTransform: 'uppercase', color: '#9D9D9D', marginBottom: 16,
              }}>
                {t.contact}
              </div>
              <Link href="/contact" style={{
                display: 'block', fontSize: 13,
                color: '#9D9D9D', textDecoration: 'none', marginBottom: 10,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
              >
                {t.contactLink}
              </Link>
              <a href="mailto:info@qlixa.eu" style={{
                display: 'block', fontSize: 13,
                color: '#9D9D9D', textDecoration: 'none', marginBottom: 10,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
              >
                info@qlixa.eu
              </a>
              <button onClick={() => setShowModal(true)} style={{
                display: 'block', fontSize: 13, background: 'none', border: 'none', padding: 0,
                color: '#9D9D9D', textDecoration: 'underline', cursor: 'pointer', textAlign: 'left',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
              >
                {t.errorTrigger}
              </button>
            </div>
          </div>

          {/* Bottom bar — copyright | social icons | made with */}
          <div style={{
            paddingTop: 24, borderTop: '1px solid #f0f0f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
            gap: 16, fontSize: 12, color: '#9D9D9D',
          }}>
            <span>{t.copyright}</span>

            <div style={{ display: 'flex', gap: 14 }}>
              {socials.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  title={s.name} style={{ color: '#9D9D9D', display: 'flex' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#9D9D9D'}
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
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 20, padding: '32px 28px',
            maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>
              {t.modalTitle}
            </h3>
            <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 20 }}>
              {t.modalSubtitle}
            </p>

            <input value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder}
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #E6F4F5', fontSize: 14, marginBottom: 10, outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' as const }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.emailPlaceholder} type="email"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #E6F4F5', fontSize: 14, marginBottom: 16, outline: 'none', fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box' as const }} />

            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>
              {t.descLabel}
            </label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder={t.descPlaceholder} rows={4}
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #E6F4F5', fontSize: 14, marginBottom: 24, outline: 'none', fontFamily: 'DM Sans, sans-serif', resize: 'vertical' as const, boxSizing: 'border-box' as const }} />

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
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
