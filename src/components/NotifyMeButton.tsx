'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  label: string // текст кнопки-тригера
  source: string // напр. 'pricing-self-employed', 'homepage-demo-business'
  triggerStyle?: React.CSSProperties
}

export default function NotifyMeButton({ label, source, triggerStyle }: Props) {
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
              aria-label="Закрити"
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
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Дякуємо!</p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>Ми повідомимо вас про новий тариф.</p>
              </div>
            ) : status === 'duplicate' ? (
              <div style={{ textAlign: 'center' as const, padding: '12px 0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Ви вже у списку!</p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5 }}>Ми обов’язково повідомимо вас, щойно тариф стане доступний.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
                  Дізнатися першими
                </h3>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.5, marginBottom: 20 }}>
                  Залиш email — ми повідомимо, щойно тариф стане доступний.
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: '100%', boxSizing: 'border-box' as const, padding: '13px 16px', borderRadius: 11,
                    border: '1px solid #E6F4F5', fontSize: 15, fontFamily: 'DM Sans, sans-serif',
                    marginBottom: 14, outline: 'none',
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
                  {status === 'loading' ? 'Надсилаємо…' : 'Дізнатися першими'}
                </button>
                {status === 'error' && (
                  <p style={{ fontSize: 15, color: '#CC0000', marginTop: 10, textAlign: 'center' as const }}>
                    Щось пішло не так. Спробуй, будь ласка, ще раз.
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
