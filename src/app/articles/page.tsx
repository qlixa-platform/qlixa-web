'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ✅ Опубліковані статті
const published = [
  {
    href: '/articles/rwr-karte',
    cover: '/articles/rwr-karte-cover.png',
    tag: 'Гайд',
    date: '2026-07-21',
    title: 'Як підготуватися до подачі на RWR+ карту',
    desc: 'Список документів, поради та безкоштовний PDF чекліст — на прикладі Iryna Muller.',
    author: 'QLIXA',
  },
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
  {
    tag: 'Сім\'я · Пільги',
    title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати',
    desc: 'Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та податкові пільги — покроковий гайд для батьків.',
    date: 'Червень 2025',
    readTime: '10 хв читання',
    href: '/articles/invalidity-child',
    cover: '/articles/invalidity-cover.jpg',
  },
  {
    tag: 'GISA · Реєстрація',
    title: 'Реєстрація на сайті GISA: покрокова інструкція',
    desc: 'Як подати заяву Gewerbeanmeldung онлайн через GISA — детально, з поясненням кожного поля та кроку.',
    date: 'Червень 2025',
    readTime: '15 хв читання',
    href: '/articles/gisa-formular',
    cover: '/articles/gisa-cover.jpg',
  },
]

// 🔜 Статті що готуються
const upcoming = [

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
          <style>{`
            .card-img { transition: transform 0.4s cubic-bezier(.25,.46,.45,.94); }
            .card-link:hover .card-img { transform: scale(1.07); }
            .card-body-inner { transition: box-shadow 0.3s ease; }
            .card-link:hover .card-body-inner { box-shadow: 0 8px 32px rgba(53,52,52,0.13) !important; }
          `}</style>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, alignItems: 'start' }}>
            {published.map(art => (
              <Link key={art.href} href={art.href} className="card-link" style={{ display: 'block', textDecoration: 'none', position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%', height: 190, borderRadius: 14, overflow: 'hidden', zIndex: 1 }}>
                  <img src={art.cover} alt={art.title} className="card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 10px', borderRadius: 4, zIndex: 2 }}>
                    {art.tag}
                  </div>
                </div>
                <div className="card-body-inner" style={{ position: 'relative', zIndex: 2, background: '#fff', borderRadius: 14, padding: '20px 18px 18px', marginTop: -22, border: '1px solid var(--line)', boxShadow: '0 4px 16px rgba(53,52,52,0.07)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.4, marginBottom: 7, flex: 1 }}>{art.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>{art.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
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
