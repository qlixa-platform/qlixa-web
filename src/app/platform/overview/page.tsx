'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Компактні брендовані іконки (не emoji) для карток можливостей
function CapabilityIcon({ emoji }: { emoji: string }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, background: '#FFFFFF', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17,
      boxShadow: '0 2px 6px rgba(3,131,144,0.10)', border: '1px solid rgba(3,131,144,0.10)',
    }}>
      {emoji}
    </div>
  )
}

const capabilities = [
  { icon: '🚗', title: 'Журнал поїздок', desc: 'Записуйте поїздки протягом року або додайте їх одразу перед подачею декларації.' },
  { icon: '🧾', title: 'Журнал витрат', desc: 'Навчання, обладнання, робочі витрати, домашній офіс.' },
  { icon: '📈', title: 'Інші доходи', desc: 'ETF, акції, оренда, закордонні доходи.' },
  { icon: '📅', title: 'Дедлайни', desc: 'Нагадування про важливі дати.' },
  { icon: '📊', title: 'KPI панель', desc: 'Контроль доходів та витрат.' },
  { icon: '📄', title: 'Генерація декларації', desc: 'Створення E1 та додатків.' },
]

const howItWorks = [
  { n: '①', title: 'Заповніть анкету' },
  { n: '②', title: 'Додайте витрати та доходи' },
  { n: '③', title: 'Перевірте результат' },
  { n: '④', title: 'Отримайте декларацію' },
  { n: '⑤', title: 'Подайте через FinanzOnline' },
]

export default function PlatformOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />

      {/* ── 1. HERO ── */}
      <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 16 }}>
              Мій цифровий кабінет <span style={{ color: '#038390' }}>QLIXA</span>
            </h1>
            <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.6, marginBottom: 28, maxWidth: 480 }}>
              Ведіть витрати, доходи та документи протягом року, а QLIXA допоможе підготувати податкову декларацію та розрахувати можливе повернення.
            </p>
            <Link href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', background: '#038390', color: '#fff',
              borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none',
            }}>
              Обрати тариф →
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/platform/hero-mockup.png" alt="Мокап кабінету QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain' as const, display: 'block', borderRadius: 20 }} />
        </div>
      </section>

      {/* ── 2. АВТОМАТИЗОВАНА АНКЕТА — текст ліворуч, фото праворуч ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>

          {/* Left — text */}
          <div>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>
              Автоматизована анкета QLIXA
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>
              Відповідаєш на прості питання — <span style={{ color: '#038390' }}>автоматизована анкета QLIXA зробить складну роботу</span>
            </h2>
          </div>

          {/* Right — anketa mockup */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/platform/anketa-mockup.png" alt="Мокап анкети QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain' as const, display: 'block', borderRadius: 20 }} />
        </div>
      </section>

      {/* ── 3. МОЖЛИВОСТІ КАБІНЕТУ — компактні картки в стилі бренду ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 32 }}>
            Можливості кабінету
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'left' as const }}>
            {capabilities.map((c, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 12, padding: 14, border: '1px solid rgba(3,131,144,0.10)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <CapabilityIcon emoji={c.icon} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 3, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.45 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ЯК ЦЕ ПРАЦЮЄ ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.4vw,42px)', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 40 }}>
            Як це працює
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, alignItems: 'start' }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
                  {i > 0 && <span style={{ flex: 1, height: 2, background: '#E6F4F5' }} />}
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#F0F7F8', border: '2px solid #038390', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {step.n}
                  </div>
                  {i < howItWorks.length - 1 && <span style={{ flex: 1, height: 2, background: '#E6F4F5' }} />}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginTop: 12, lineHeight: 1.4 }}>{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ЩО ВЖЕ ГОТУЄМО ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 32 }}>
            Що вже готуємо
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5', textAlign: 'left' as const }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#038390', marginBottom: 4 }}>Тариф «Самозайнятий»</div>
                <div style={{ fontSize: 15, color: '#595959' }}>Ведення бізнесу для фрилансерів та Neue Selbstständige.</div>
              </div>
            </Link>
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E6F4F5', textAlign: 'left' as const }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#038390', marginBottom: 4 }}>Тариф «Бізнес»</div>
                <div style={{ fontSize: 15, color: '#595959' }}>Інструменти для компаній та команд.</div>
              </div>
            </Link>
          </div>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#9D9D9D' }}>Скоро:</span>
            {['клієнти', 'рахунки', 'склад', 'KPI', 'ПДВ', 'доходи та витрати'].map((tag, i) => (
              <span key={i} style={{ fontSize: 13, fontWeight: 600, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФІНАЛЬНИЙ CTA ── */}
      <section style={{ background: '#1A1A1A', padding: '56px clamp(20px,6vw,80px)', textAlign: 'center' as const }}>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3vw,36px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
          QLIXA = твій особистий фінансовий помічник
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
          Що робити сьогодні, що заповнити, скільки можна повернути, які витрати додати, які дедлайни не пропустити, чи готова декларація — QLIXA веде тебе крок за кроком.
        </p>
        <Link href="/pricing" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', background: '#038390', color: '#fff',
          borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none',
        }}>
          Обрати тариф →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
