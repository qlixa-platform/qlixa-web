import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalLayout from '@/components/layout/LegalLayout'

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <LegalLayout>
        <main style={{ background: '#ffffff', minHeight: '100vh' }}>
          <section style={{ background: '#F0F7F8', padding: '64px clamp(20px,6vw,80px) 48px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Rechtliches</div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 12 }}>Cookie Policy</h1>
              <p style={{ fontSize: 14, color: '#595959' }}>Verwendung von Cookies / Використання файлів cookie</p>
            </div>
          </section>
          <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.2)', borderRadius: 10, padding: '12px 20px', marginBottom: 40, fontSize: 13, color: '#CC0000' }}>
                ⚠️ Робочий шаблон — потребує заповнення після реєстрації GmbH
              </div>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75 }}>Inhalt folgt / Зміст буде додано після реєстрації GmbH.</p>
            </div>
          </section>
        </main>
      </LegalLayout>
      <Footer />
    </>
  )
}
