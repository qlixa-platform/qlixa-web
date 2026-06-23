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
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 20 }}>Для кого</div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20 }}>Маленький бізнес</h1>
            <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, marginBottom: 16, maxWidth: 480 }}>Відкрив або плануєш відкрити бізнес — QLIXA пройде з тобою кожен крок від реєстрації до звітів.</p>
            <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.2)', fontSize: 12, fontWeight: 600, color: '#038390', marginBottom: 32 }}>Контент скоро буде</div>
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
