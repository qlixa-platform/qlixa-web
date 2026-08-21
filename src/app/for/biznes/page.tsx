'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#F0F7F8', display: 'flex', alignItems: 'center', padding: '80px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 64 }}>

          {/* LEFT — image */}
          <div style={{ flex: '0 0 420px', maxWidth: 420, position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 32, overflow: 'hidden', background: '#E6F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 40px rgba(3,131,144,0.12)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/for-who/biznes.png" alt="Маленький бізнес" style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
            </div>
          </div>

          {/* RIGHT — text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' as const }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390' }}>Для бізнесу</div>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642' }}>Скоро</div>
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 18 }}>Кабінет для малого бізнесу</h1>
            <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.65, marginBottom: 24, maxWidth: 480 }}>
              Команда QLIXA вже працює над зручним кабінетом для ведення малого бізнесу в Австрії — щоб все, що потрібно для щоденної роботи й звітності, було в одному місці.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32, maxWidth: 480 }}>
              {['Клієнти та рахунки', 'Склад і товари', 'Доходи та витрати', 'ПДВ та звітність', 'Дедлайни та KPI', 'Дані для FinanzOnline'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                  <span style={{ color: '#038390', fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="mailto:info@qlixa.eu?subject=Business%20plan" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#038390', color: '#fff',
              borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 24,
            }}>
              Дізнатися першими →
            </a>

            <div>
              <Link href="/" style={{ fontSize: 15, fontWeight: 700, color: '#038390', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>← Повернутись на головну</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
