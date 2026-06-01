'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function ArticlePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 16px' }}>
        <Link href="/articles" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32,
        }}>
          ← Всі статті
        </Link>
        <div style={{
          display: 'inline-block', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 6, marginBottom: 16,
          background: 'var(--peach-light)', color: 'var(--orange)',
        }}>
          Незабаром
        </div>
        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 'clamp(26px,4vw,38px)',
          color: 'var(--charcoal)', marginBottom: 20, lineHeight: 1.25,
        }}>
          Як оформити Austria ID: покроковий гайд
        </h1>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 32,
          border: '1px solid var(--line)', textAlign: 'center', boxShadow: 'var(--shadow)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 24px' }}>
            Ця стаття зараз готується. Залиште email — і ми повідомимо коли вона буде опублікована.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 360, margin: '0 auto' }}>
            <input type="email" placeholder="ваш@email.com" style={{
              flex: 1, padding: '10px 14px', borderRadius: 999, fontSize: 13,
              border: '1px solid var(--line2)', outline: 'none', fontFamily: 'DM Sans, sans-serif',
            }}/>
            <button style={{
              padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 700,
              background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
            }}>
              Сповістити
            </button>
          </div>
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 16 }}>
            Поки читайте нашу головну статтю:
          </p>
          <Link href="/articles/gewerbeanmeldung" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 20px', borderRadius: 12,
            border: '1.5px solid var(--orange)', background: 'var(--peach-light)',
            textDecoration: 'none',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>
              📖 Gewerbeanmeldung в Австрії: покрокова реєстрація →
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
