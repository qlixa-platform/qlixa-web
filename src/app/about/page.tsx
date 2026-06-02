'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 'clamp(32px,5vw,52px)',
          color: 'var(--charcoal)', marginBottom: 24,
        }}>
          ПРОСТО <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>ДВОЄ BUSY</em>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7 }}>
          Цей розділ скоро буде доповнений.
        </p>
      </div>
      <Footer />
    </div>
  )
}
