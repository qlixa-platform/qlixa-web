'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const articles = [
  {
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Іноземці в Австрії платять юристам €300–500 за типові питання про реєстрацію бізнесу. Ми зібрали всю інформацію безкоштовно — щоб ти міг зробити все сам, крок за кроком.',
    date: 'Червень 2025',
    readTime: '15 хв читання',
    href: '/articles/gewerbeanmeldung',
  },
]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{
        background: '#fff',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: 'calc(100vh - 64px)',
          maxHeight: 640,
          minHeight: 400,
        }}>

          {/* LEFT */}
          <div style={{
            padding: 'clamp(32px,5vw,60px) clamp(28px,4vw,56px) clamp(32px,5vw,60px) clamp(24px,3.5vw,52px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(26px,3.2vw,46px)',
              fontWeight: 400, lineHeight: 1.18,
              color: 'var(--charcoal)', letterSpacing: '-0.3px',
              margin: '0 0 18px 0',
            }}>
              твоя спокійна<br />
              і <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>розумна бухгалтерія</em><br />
              в Австрії
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: 'clamp(13px,1.2vw,15px)',
              color: 'var(--text2)',
              lineHeight: 1.75,
              margin: '0 0 28px 0',
              maxWidth: 400,
            }}>
              Steuerberater коштує дорого. Розібратися самому здається складно. Є третій шлях. Ми зібрали всю потрібну інформацію та розклали її по кроках — щоб ви впоралися самі, швидко і без зайвих витрат
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/free-test" style={{
                padding: '12px 24px', borderRadius: 999,
                fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 700,
                background: 'var(--orange)', color: '#fff',
                border: '2px solid var(--orange)',
                textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
              }}>
                Спробувати безкоштовно →
              </Link>
              <Link href="/pricing" style={{
                padding: '12px 24px', borderRadius: 999,
                fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 600,
                background: 'transparent', color: 'var(--charcoal)',
                border: '2px solid var(--line2)',
                textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
              }}>
                Дивитись тарифи
              </Link>
            </div>

          </div>

          {/* RIGHT — photo fills full height */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/hero-photo.jpg"
              alt="Жінка працює з ноутбуком на тлі гір"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              priority
            />
          </div>

        </div>
      </section>

      {/* ══ ARTICLES ══ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 32,
        }}>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 28, color: 'var(--charcoal)',
          }}>
            Останні <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>статті</em>
          </h2>
          <Link href="/articles" style={{
            fontSize: 14, fontWeight: 500,
            color: 'var(--orange)', textDecoration: 'none',
          }}>
            Всі статті →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {articles.map(art => (
            <Link key={art.href} href={art.href} style={{
              display: 'block', background: '#fff', borderRadius: 16,
              padding: 24, border: '1px solid var(--line)',
              boxShadow: 'var(--shadow)', textDecoration: 'none',
            }}>
              <div style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700,
                padding: '4px 10px', borderRadius: 6, marginBottom: 12,
                background: 'var(--peach-light)', color: 'var(--orange)',
              }}>
                {art.tag}
              </div>
              <h3 style={{
                fontSize: 15, fontWeight: 600, color: 'var(--charcoal)',
                marginBottom: 8, lineHeight: 1.4,
              }}>
                {art.title}
              </h3>
              <p style={{
                fontSize: 13, color: 'var(--text2)',
                lineHeight: 1.6, marginBottom: 16,
              }}>
                {art.desc}
              </p>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                {art.date} · {art.readTime}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
