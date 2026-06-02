'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const published = [
  {
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Іноземці в Австрії платять юристам €300–500 за типові питання про реєстрацію бізнесу. Ми зібрали всю інформацію безкоштовно — щоб ти міг зробити все сам, крок за кроком.',
    date: 'Червень 2025',
    readTime: '15 хв читання',
    href: '/articles/gewerbeanmeldung',
    cover: '/articles/gewerbeanmeldung-cover.jpg',
  },
  {
    tag: 'Австрія · Документи',
    title: 'Як оформити Austria ID: покроковий гайд для іноземців',
    desc: 'Austria ID — обов\'язковий перший крок для реєстрації бізнесу, роботи з FinanzOnline та SVS. Розповідаємо як оформити за 5 кроків.',
    date: 'Червень 2025',
    readTime: '8 хв читання',
    href: '/articles/austria-id',
    cover: '/articles/austria-id-cover.jpg',
  },
]

const upcoming = [
  { tag: 'GISA', title: 'Як заповнити формуляр GISA', desc: 'Покроковий гайд з поясненнями кожного поля.', href: '/articles/gisa-formular' },
  { tag: 'SVS', title: 'Як заповнити формуляр SVS', desc: 'Соціальне страхування — що вказати щоб не переплатити.', href: '/articles/svs-formular' },
  { tag: 'FinanzOnline', title: 'Як заповнити формуляр FinanzOnline', desc: 'Реєстрація в податковій онлайн — покроково.', href: '/articles/finanz-online' },
  { tag: 'MVK', title: 'Як обрати пенсійний фонд MVK', desc: 'Що таке MVK і як не пропустити дедлайн 6 місяців.', href: '/articles/mvk-pension' },
]

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          height: 'calc(100vh - 64px)', maxHeight: 640, minHeight: 400,
        }}>
          <div style={{
            padding: 'clamp(32px,5vw,60px) clamp(28px,4vw,56px) clamp(32px,5vw,60px) clamp(24px,3.5vw,52px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
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
            <p style={{
              fontSize: 'clamp(13px,1.2vw,15px)', color: 'var(--text2)',
              lineHeight: 1.75, margin: '0 0 28px 0', maxWidth: 400,
            }}>
              Steuerberater коштує дорого. Розібратися самому здається складно. Є третій шлях. Ми зібрали всю потрібну інформацію та розклали її по кроках — щоб ви впоралися самі, швидко і без зайвих витрат
            </p>
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

      {/* ARTICLES */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 32,
        }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 28, color: 'var(--charcoal)' }}>
            Останні <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>статті</em>
          </h2>
          <Link href="/articles" style={{ fontSize: 14, fontWeight: 500, color: 'var(--orange)', textDecoration: 'none' }}>
            Всі статті →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>

          {/* Published — with photo overlap effect */}
          {published.map(art => (
            <Link key={art.href} href={art.href} style={{ display: 'block', textDecoration: 'none', position: 'relative' }}>
              {/* Photo */}
              <div style={{
                position: 'relative', width: '100%', height: 200,
                borderRadius: 16, overflow: 'hidden', zIndex: 1,
              }}>
                <Image
                  src={art.cover}
                  alt={art.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
                />
                {/* Tag on photo */}
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'var(--orange)', color: '#fff',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.5px',
                  padding: '4px 10px', borderRadius: 4, zIndex: 2,
                }}>
                  {art.tag}
                </div>
              </div>
              {/* White card overlapping photo */}
              <div style={{
                position: 'relative', zIndex: 2,
                background: '#fff', borderRadius: 16,
                padding: '22px 20px 20px',
                marginTop: -24,
                border: '1px solid var(--line)',
                boxShadow: '0 4px 20px rgba(53,52,52,0.08)',
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 8 }}>
                  {art.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>
                  {art.desc}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{art.date} · {art.readTime}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>Читати →</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Upcoming — no photo */}
          {upcoming.map(art => (
            <Link key={art.href} href={art.href} style={{
              display: 'block', textDecoration: 'none',
              background: '#fff', borderRadius: 16,
              padding: 20, border: '1px dashed var(--line2)',
              opacity: 0.65,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px',
                  borderRadius: 4, background: 'var(--gray)', color: 'var(--text3)',
                }}>
                  {art.tag}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
                  padding: '3px 8px', borderRadius: 3,
                  background: 'var(--peach-light)', color: 'var(--orange)',
                }}>
                  Скоро
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 6 }}>
                {art.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
                {art.desc}
              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  )
}
