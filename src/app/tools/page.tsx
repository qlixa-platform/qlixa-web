import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function ToolsPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#F0F7F8', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '80px 20px', textAlign: 'center' as const }}>
          <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 24 }}>
            Інструменти
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 16 }}>
            Безкоштовні інструменти <em style={{ fontStyle: 'italic', color: '#038390' }}>QLIXA</em>
          </h1>
          <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75, marginBottom: 32, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Тут з'являться всі наші безкоштовні калькулятори та інструменти — наприклад, калькулятор доходу для RWR+ карти. Розділ у розробці, слідкуй за оновленнями.
          </p>
          <Link href="/articles/rwr-karte#calculator" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px',
            background: '#038390', color: '#fff', borderRadius: 12, fontSize: 14, fontWeight: 700,
            textDecoration: 'none',
          }}>
            Спробувати RWR+ калькулятор →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
