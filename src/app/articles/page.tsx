'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ✅ Опубліковані статті
const published = [
  {
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Повний гайд для іноземців — які документи потрібні, скільки коштує, куди йти і як не переплатити юристу €300.',
    date: 'Червень 2025',
    readTime: '15 хв читання',
    href: '/articles/gewerbeanmeldung',
    cover: '/articles/gewerbeanmeldung-cover.jpg',
  },
  {
    tag: 'Австрія · Документи',
    title: 'Як оформити Austria ID: покроковий гайд для іноземців',
    desc: 'Austria ID — обов\'язковий перший крок для реєстрації бізнесу, роботи з FinanzOnline та SVS. 5 кроків.',
    date: 'Червень 2025',
    readTime: '8 хв читання',
    href: '/articles/austria-id',
    cover: '/articles/austria-id-cover.jpg',
  },
]

// 🔜 Статті що готуються
const upcoming = [
  {
    tag: 'GISA',
    title: 'Як заповнити формуляр GISA',
    desc: 'Покроковий гайд з поясненнями — що вказати в кожному полі щоб реєстрація пройшла без помилок.',
    href: '/articles/gisa-formular',
  },
  {
    tag: 'SVS',
    title: 'Як заповнити формуляр SVS',
    desc: 'Соціальне страхування самозайнятих — що вказати, щоб не переплатити і підключити сім\'ю.',
    href: '/articles/svs-formular',
  },
  {
    tag: 'FinanzOnline',
    title: 'Як заповнити формуляр FinanzOnline',
    desc: 'Реєстрація в податковій онлайн — покроково, що вказати і як не помилитись з КВЕДом.',
    href: '/articles/finanz-online',
  },
  {
    tag: 'MVK',
    title: 'Як обрати пенсійний фонд MVK',
    desc: 'Що таке Mitarbeitervorsorgekasse, навіщо потрібен і як не пропустити дедлайн 6 місяців.',
    href: '/articles/mvk-pension',
  },
]

export default function ArticlesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '64px 16px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 6, marginBottom: 12,
            background: 'var(--peach-light)', color: 'var(--orange)',
          }}>
            Статті
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(28px,5vw,40px)',
            color: 'var(--charcoal)', marginBottom: 10,
          }}>
            Гайди та <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>ресурси</em>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 520 }}>
            Практичні знання для іноземців, які ведуть або відкривають бізнес в Австрії.
          </p>
        </div>

        {/* Published articles */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20,
          }}>
            Опубліковано
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24, alignItems: 'start' }}>
            {published.map(art => (
              <Link key={art.href} href={art.href} style={{ display: 'block', textDecoration: 'none', position: 'relative' }}>
                {/* Photo */}
                <div style={{ position: 'relative', width: '100%', height: 200, borderRadius: 16, overflow: 'hidden', zIndex: 1 }}>
                  <img src={art.cover} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
                  <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 10px', borderRadius: 4, zIndex: 2 }}>
                    {art.tag}
                  </div>
                </div>
                {/* White card overlapping */}
                <div style={{ position: 'relative', zIndex: 2, background: '#fff', borderRadius: 16, padding: '22px 20px 20px', marginTop: -24, border: '1px solid var(--line)', boxShadow: '0 4px 20px rgba(53,52,52,0.08)' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 8 }}>{art.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 14 }}>{art.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{art.date} · {art.readTime}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)' }}>Читати →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming articles */}
        <div>
          <h2 style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 20,
          }}>
            Незабаром
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {upcoming.map(art => (
              <Link key={art.href} href={art.href} style={{
                display: 'block', background: '#fff', borderRadius: 14,
                padding: 20, border: '1px solid var(--line)',
                textDecoration: 'none', opacity: 0.75,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700,
                    padding: '3px 10px', borderRadius: 5,
                    background: 'var(--gray)', color: 'var(--text3)',
                  }}>
                    {art.tag}
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: 'var(--orange)',
                    background: 'var(--peach-light)', padding: '3px 8px', borderRadius: 4,
                  }}>
                    Скоро
                  </div>
                </div>
                <h3 style={{
                  fontSize: 14, fontWeight: 600, color: 'var(--charcoal)',
                  marginBottom: 6, lineHeight: 1.4,
                }}>
                  {art.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                  {art.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </div>
  )
}
