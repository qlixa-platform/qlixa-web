'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function FreeTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Navbar />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🤔</div>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 36, color: '#353434', marginBottom: 16, lineHeight: 1.2 }}>
          Тут дві busy Ірки думають,<br />
          <em style={{ fontStyle: 'italic', color: '#038390' }}>який звітик сюди прикріпити</em>
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(53,52,52,0.55)', lineHeight: 1.7, marginBottom: 32 }}>
          Поки будемо думати — ця сторінка в процесі розробки. Але ти вже на правильному шляху!
        </p>
        <Link href="/pricing" style={{ display: 'inline-block', padding: '14px 28px', borderRadius: 12, background: '#038390', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
          Переглянути тарифи →
        </Link>
        <br />
        <Link href="/" style={{ display: 'inline-block', marginTop: 16, fontSize: 14, color: 'rgba(53,52,52,0.4)', textDecoration: 'none' }}>
          ← На головну
        </Link>
      </div>
      <Footer />
    </div>
  )
}
