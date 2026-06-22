import Link from 'next/link'

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#F0F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
      <div style={{ maxWidth: 600, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📄</div>
        <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 20 }}>Як це працює</div>
        <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 16 }}>Рахунки-фактури</h1>
        <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75, marginBottom: 40 }}>Ця сторінка зараз у розробці. Скоро тут з&apos;явиться детальна інформація.</p>
        <div style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.2)', fontSize: 12, fontWeight: 600, color: '#038390', marginBottom: 32 }}>Скоро буде</div>
        <div style={{ marginTop: 8 }}>
          <Link href="/" style={{ fontSize: 14, fontWeight: 600, color: '#038390', textDecoration: 'none' }}>← Повернутись на головну</Link>
        </div>
      </div>
    </main>
  )
}
