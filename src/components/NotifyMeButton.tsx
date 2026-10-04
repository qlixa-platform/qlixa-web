'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { type Locale } from '@/lib/locale'

// Modal copy by locale (Phase 9A.1) — the trigger button's own `label`
// was already localized by every call site; only the modal content
// (opened on click) was still hardcoded Ukrainian. Keeping the exact
// original Ukrainian meaning as the source of truth for the other 3
// translations, per the audit's own instruction. `emailPlaceholder`
// follows the same per-locale convention already established in
// Footer.tsx's FOOTER_TEXT (only DE uses "deine@email.com"; the other
// 3 locales keep the generic "your@email.com").
const NOTIFY_TEXT: Record<Locale, {
  modalHeading: string
  modalBody: string
  emailPlaceholder: string
  submitLabel: string
  loadingLabel: string
  errorMessage: string
  successHeading: string
  successBody: string
  duplicateHeading: string
  duplicateBody: string
  closeAriaLabel: string
}> = {
  ua: {
    modalHeading: 'Дізнатися першими',
    modalBody: 'Залиш email — ми повідомимо, щойно тариф стане доступний.',
    emailPlaceholder: 'your@email.com',
    submitLabel: 'Дізнатися першими',
    loadingLabel: 'Надсилаємо…',
    errorMessage: 'Щось пішло не так. Спробуй, будь ласка, ще раз.',
    successHeading: 'Дякуємо!',
    successBody: 'Ми повідомимо вас про новий тариф.',
    duplicateHeading: 'Ви вже у списку!',
    duplicateBody: 'Ми обов’язково повідомимо вас, щойно тариф стане доступний.',
    closeAriaLabel: 'Закрити',
  },
  ru: {
    modalHeading: 'Узнать первыми',
    modalBody: 'Оставь email — мы сообщим, как только тариф станет доступен.',
    emailPlaceholder: 'your@email.com',
    submitLabel: 'Узнать первыми',
    loadingLabel: 'Отправляем…',
    errorMessage: 'Что-то пошло не так. Попробуй, пожалуйста, ещё раз.',
    successHeading: 'Спасибо!',
    successBody: 'Мы сообщим вам о новом тарифе.',
    duplicateHeading: 'Вы уже в списке!',
    duplicateBody: 'Мы обязательно сообщим вам, как только тариф станет доступен.',
    closeAriaLabel: 'Закрыть',
  },
  en: {
    modalHeading: 'Be the first to know',
    modalBody: "Leave your email and we'll let you know as soon as this plan is available.",
    emailPlaceholder: 'your@email.com',
    submitLabel: 'Be the first to know',
    loadingLabel: 'Sending…',
    errorMessage: 'Something went wrong. Please try again.',
    successHeading: 'Thank you!',
    successBody: "We'll notify you about the new plan.",
    duplicateHeading: "You're already on the list!",
    duplicateBody: "We'll be sure to notify you as soon as this plan is available.",
    closeAriaLabel: 'Close',
  },
  de: {
    modalHeading: 'Als Erster erfahren',
    modalBody: 'Hinterlasse deine E-Mail-Adresse — wir informieren dich, sobald dieser Tarif verfügbar ist.',
    emailPlaceholder: 'deine@email.com',
    submitLabel: 'Als Erster erfahren',
    loadingLabel: 'Wird gesendet…',
    errorMessage: 'Etwas ist schiefgelaufen. Bitte versuch es noch einmal.',
    successHeading: 'Danke!',
    successBody: 'Wir informieren dich über den neuen Tarif.',
    duplicateHeading: 'Du stehst schon auf der Liste!',
    duplicateBody: 'Wir informieren dich auf jeden Fall, sobald dieser Tarif verfügbar ist.',
    closeAriaLabel: 'Schließen',
  },
}

type Props = {
  label: string // текст кнопки-тригера (already localized by every call site)
  source: string // напр. 'pricing-self-employed', 'homepage-demo-business'
  locale?: Locale // page's URL-authoritative locale; undefined falls back to Ukrainian (the component's original, only behavior) — never derived from window/localStorage/navigator
  triggerStyle?: React.CSSProperties
  triggerClassName?: string // optional CSS hook on the trigger button only (e.g. for a mobile-only touch-target/typography override) — modal itself is untouched
}

export default function NotifyMeButton({ label, source, locale, triggerStyle, triggerClassName }: Props) {
  const t = NOTIFY_TEXT[locale ?? 'ua']
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  useEffect(() => {
    if (isOpen) {
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  function closeModal() {
    setIsOpen(false)
    setTimeout(() => { setStatus('idle'); setEmail('') }, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, source })
    if (error) {
      if (error.code === '23505') {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } else {
      setStatus('success')
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={triggerClassName}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
          background: '#038390', color: '#fff', borderRadius: 11, fontSize: 15, fontWeight: 700,
          border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
          ...triggerStyle,
        }}
      >
        {label}
      </button>

      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed' as const, inset: 0, background: 'rgba(26,26,26,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FFFFFF', borderRadius: 20, padding: 32, maxWidth: 420, width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' as const,
            }}
          >
            <button
              onClick={closeModal}
              aria-label={t.closeAriaLabel}
              style={{
                position: 'absolute' as const, top: 16, right: 16, width: 28, height: 28, borderRadius: '50%',
                border: 'none', background: '#F0F7F8', color: '#595959', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center' as const, padding: '12px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{t.successHeading}</p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>{t.successBody}</p>
              </div>
            ) : status === 'duplicate' ? (
              <div style={{ textAlign: 'center' as const, padding: '12px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{t.duplicateHeading}</p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>{t.duplicateBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
                  {t.modalHeading}
                </h3>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5, marginBottom: 20 }}>
                  {t.modalBody}
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  style={{
                    width: '100%', boxSizing: 'border-box' as const, padding: '13px 16px', borderRadius: 11,
                    border: '1px solid #E6F4F5', fontSize: 15, fontFamily: 'DM Sans, sans-serif',
                    marginBottom: 14,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '13px 24px', background: '#038390', color: '#fff',
                    borderRadius: 11, fontSize: 15, fontWeight: 700, border: 'none',
                    cursor: status === 'loading' ? 'default' : 'pointer', opacity: status === 'loading' ? 0.7 : 1,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {status === 'loading' ? t.loadingLabel : t.submitLabel}
                </button>
                {status === 'error' && (
                  <p style={{ fontSize: 15, color: '#CC0000', marginTop: 10, textAlign: 'center' as const }}>
                    {t.errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
