'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  { icon: '🧮', text: 'Автоматично рахує твої доходи й витрати' },
  { icon: '🧾', text: 'Допомагає швидко виставляти рахунки клієнтам (красиво і професійно)' },
  { icon: '🏦', text: 'Підтягує виписки з банку' },
  { icon: '📸', text: 'Розпізнає чеки і документи (просто сфотографував — і готово)' },
  { icon: '📊', text: 'Сама готує звіти для FinanzOnline і SVS' },
  { icon: '👥', text: 'Веде клієнтів, пропозиції та склад' },
  { icon: '🏪', text: 'Підтримує електронну касу (Registrierkasse)' },
]

const forWhom = [
  { icon: '💼', text: 'Самозайнятий (Neue Selbstständige)' },
  { icon: '💻', text: 'Фрілансер, IT-шник, дизайнер, консультант' },
  { icon: '🏢', text: 'Маєш маленький бізнес або плануєш його відкрити' },
  { icon: '🧘', text: 'Хочеш спокійно вести справи без дорогого бухгалтера' },
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--charcoal)', padding: '56px 16px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <Image
            src="/logos/logo-mascot.svg"
            alt="QLIXA"
            width={80} height={80}
            style={{ margin: '0 auto 20px', display: 'block' }}
          />
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 999, marginBottom: 16,
            background: 'rgba(255,255,255,0.08)', color: 'var(--peach)',
          }}>
            Про нас
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(28px,5vw,44px)',
            color: '#fff', lineHeight: 1.2, marginBottom: 16,
          }}>
            QLIXA — твоя спокійна і розумна{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>бухгалтерія в Австрії</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Reports in one click — і спокій у голові.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px 80px' }}>

        {/* Intro */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '28px 28px',
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 16 }}>
            Привіт! 👋
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 16 }}>
            Ми створили <strong>QLIXA</strong> — просту онлайн-програму для ведення бізнесу, щоб ти міг
            спокійно займатися своєю справою, а не нервувати через папери, податки та SVS.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)' }}>
            Уяви: ти відкриваєш програму, а там усе зрозуміло, без складних бухгалтерських слів і страшних таблиць.
            Все по-людськи.
          </p>
        </div>

        {/* What QLIXA can do */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif', fontSize: 26,
            color: 'var(--charcoal)', marginBottom: 20,
          }}>
            Що вміє <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>QLIXA</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#fff', borderRadius: 12, padding: '14px 18px',
                border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                <span style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* For whom */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif', fontSize: 26,
            color: 'var(--charcoal)', marginBottom: 8,
          }}>
            Для <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>кого це створено?</em>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
            Для тебе — якщо ти:
          </p>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            {forWhom.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#fff', borderRadius: 12, padding: '16px 18px',
                border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why we are better */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            background: 'var(--peach-light)', borderRadius: 16, padding: '28px 28px',
            border: '1px solid var(--orange-mid)',
          }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 24,
              color: 'var(--charcoal)', marginBottom: 16,
            }}>
              А ось у чому ми{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>крутіші за інших</em>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 16 }}>
              Ми зробили бухгалтерію по-справжньому зрозумілою для звичайної людини.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 16 }}>
              У нас немає нудних інструкцій на 40 сторінок. Замість цього — проста анкета на початку.
              Ти відповідаєш на звичайні питання{' '}
              <em style={{ color: 'var(--charcoal2)' }}>
                («у тебе є діти?», «їздиш на роботу на машині?», «працюєш з дому?»)
              </em>
              {' '}— і QLIXA сама підказує, що можна списати, які витрати врахувати і як зекономити на податках і внесках.
            </p>
            <div style={{
              display: 'flex', gap: 10, flexWrap: 'wrap',
            }}>
              {['🇺🇦 Українська', '🇩🇪 Deutsch', '🇬🇧 English', '🇷🇺 Русский'].map(lang => (
                <span key={lang} style={{
                  padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  background: '#fff', color: 'var(--charcoal)', border: '1px solid var(--line2)',
                }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Final quote */}
        <div style={{
          background: 'var(--charcoal)', borderRadius: 20, padding: '36px 28px',
          textAlign: 'center', marginBottom: 32,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            background: 'var(--orange)', opacity: 0.07, top: -60, right: -40,
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 22,
              color: '#fff', lineHeight: 1.5, marginBottom: 12,
            }}>
              «Ми не просто чергова бухгалтерська програма.<br />
              Ми — твій{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>спокійний помічник</em>,<br />
              який говорить з тобою нормальною людською мовою.»
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
              Reports in one click — і спокій у голові.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-test" style={{
            padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
            background: 'var(--orange)', color: '#fff', border: '2px solid var(--orange)',
            textDecoration: 'none', display: 'inline-block',
          }}>
            Спробувати безкоштовно →
          </Link>
          <Link href="/pricing" style={{
            padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 700,
            background: 'transparent', color: 'var(--charcoal)',
            border: '2px solid var(--line2)', textDecoration: 'none', display: 'inline-block',
          }}>
            Дивитись тарифи
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  )
}
