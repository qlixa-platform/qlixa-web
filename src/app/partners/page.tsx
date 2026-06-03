'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function PartnersPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>

        {/* Mascot emoji placeholder */}
        <div style={{ fontSize: 72, marginBottom: 24 }}>🤝</div>

        <div style={{
          display: 'inline-block', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 999, marginBottom: 20,
          background: 'var(--peach-light)', color: 'var(--orange)',
        }}>
          Партнери
        </div>

        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 'clamp(32px,5vw,48px)',
          color: 'var(--charcoal)', lineHeight: 1.2, marginBottom: 24,
        }}>
          Вітаємо у клубі{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>обраних</em> 🎉
        </h1>

        <div style={{
          background: '#fff', borderRadius: 20, padding: '36px 32px',
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
          marginBottom: 32,
        }}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 16 }}>
            Якщо ти тут — значить, тобі <strong>дуже пощастило</strong>. 🍀<br />
            Або ти просто натиснув не туди. Але ми все одно раді!
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text2)', marginBottom: 16 }}>
            Цей розділ зовсім скоро буде наповнений нашими чудовими партнерами —
            людьми та компаніями, які, як і ми, вірять що вести бізнес в Австрії
            може бути <em style={{ color: 'var(--orange)' }}>просто і без болю</em>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text2)' }}>
            А поки що тут тихо, спокійно і пахне свіжим кодом. ☕
          </p>
        </div>

        <div style={{
          background: 'var(--peach-light)', borderRadius: 16, padding: '24px 28px',
          border: '1px solid var(--orange-mid)', marginBottom: 40,
        }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.7, marginBottom: 16 }}>
            🙋 Хочеш стати нашим партнером?<br />
            Напиши нам — разом придумаємо щось класне.
          </p>
          <a href="mailto:info@qlixa.eu" style={{
            display: 'inline-block', padding: '11px 24px', borderRadius: 999,
            background: 'var(--orange)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
          }}>
            Написати нам → info@qlixa.eu
          </a>
        </div>

        <Link href="/" style={{
          fontSize: 13, color: 'var(--text3)', textDecoration: 'none',
        }}>
          ← Повернутись на головну
        </Link>

      </div>

      <Footer />
    </div>
  )
}
