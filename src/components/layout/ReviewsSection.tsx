'use client'

import React from 'react'
import Image from 'next/image'

const reviews = [
  {
    name: 'Sofia M.',
    role: 'Фріланс-дизайнер · Freies Gewerbe',
    country: '🇺🇦 Відень, Австрія',
    // Young woman, professional, realistic
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face&q=80',
    // Austrian nature - alpine meadow
    cardBg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=120&fit=crop&q=70',
    text: '"Раніше я витрачала цілий день на звіти. Тепер — один клік. Нарешті є час малювати щось крім таблиць Excel."',
  },
  {
    name: 'Markus K.',
    role: 'Найманий працівник · Arbeitnehmerveranlagung',
    country: '🇩🇪 Зальцбург, Австрія',
    // Middle-aged man, professional
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&q=80',
    // Austrian mountain lake - verified working
    cardBg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=120&fit=crop&q=70',
    text: '"Я навіть не знав, що можу повернути €800 на рік. QLIXA показала що вказати в декларації — і гроші прийшли самі."',
  },
  {
    name: 'Olena V.',
    role: 'Самозайнята + оренда квартири в Україні',
    country: '🇺🇦 Грац, Австрія',
    // Woman, 35-45, Eastern European look
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face&q=80',
    // Austrian village
    cardBg: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=120&fit=crop&q=70',
    text: '"У мене бізнес тут і квартира здається в Україні. Думала — два бухгалтери мінімум. Виявилось — QLIXA вистачає."',
  },
  {
    name: 'Herbert S.',
    role: 'Пенсіонер · Додатковий дохід',
    country: '🇦🇹 Лінц, Австрія',
    // Older man, 65+, warm smile
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=120&h=120&fit=crop&crop=face&q=80',
    // Austrian forest sunset
    cardBg: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=400&h=120&fit=crop&q=70',
    text: '"На пенсії вирішив трохи консультувати. Думав, бухгалтерія мене доб\'є. Але з QLIXA — простіше ніж здавалось."',
  },
]

export default function ReviewsSection() {
  const [current, setCurrent] = React.useState(0)
  const total = reviews.length

  function goTo(n: number) {
    setCurrent(Math.max(0, Math.min(n, total - 1)))
  }

  return (
    <section style={{ background: 'var(--gray)' }}>

      {/* Photo with title overlaid */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Image
          src="/reviews-bg.jpg"
          alt="Наші клієнти"
          width={1400}
          height={700}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
          }}
          priority
        />
        {/* Center gradient for text */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.22)',
          pointerEvents: 'none',
        }} />
        {/* Title CENTER of photo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--peach)',
            marginBottom: 12, opacity: 0.9,
          }}>
            Відгуки клієнтів
          </div>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(32px,5vw,60px)',
            color: '#fff', fontWeight: 400, lineHeight: 1.15,
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            What Our{' '}
            <em style={{ fontStyle: 'italic', color: '#FFB899' }}>Clients Say</em>
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 20,
          transform: `translateX(calc(-${current} * (min(260px, 100%) + 20px)))`,
          transition: 'transform 0.4s cubic-bezier(.25,.46,.45,.94)',
        }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              minWidth: 'clamp(240px, 23%, 280px)',
              flex: '0 0 calc(25% - 15px)',
              background: '#fff', borderRadius: 16,
              border: '1px solid var(--line)',
              boxShadow: '0 4px 16px rgba(53,52,52,0.07)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              {/* Nature photo top */}
              <div style={{ position: 'relative', height: 100, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.cardBg}
                  alt="Austria"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Slight dark overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.12)',
                }} />
              </div>

              {/* Avatar overlapping photo */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: -32, position: 'relative', zIndex: 2 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    border: '3px solid #fff',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(53,52,52,0.18)',
                  }}
                />
              </div>

              {/* Body */}
              <div style={{ padding: '12px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)', textAlign: 'center', marginBottom: 3 }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 10, color: 'var(--orange)', fontWeight: 700, textAlign: 'center', marginBottom: 8, lineHeight: 1.4 }}>
                  {r.role}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 10, color: 'var(--orange)', fontSize: 13 }}>
                  ★★★★★
                </div>
                <div style={{ width: 28, height: 2, background: 'var(--peach-mid)', borderRadius: 2, margin: '0 auto 10px' }} />
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, textAlign: 'center', flex: 1, fontStyle: 'italic' }}>
                  {r.text}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)', textAlign: 'center', marginTop: 10 }}>
                  {r.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, padding: '24px 0 40px' }}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 20 : 7, height: 7,
              borderRadius: i === current ? 4 : '50%',
              background: i === current ? 'var(--orange)' : 'var(--line2)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              padding: 0,
            }}
          />
        ))}
      </div>

    </section>
  )
}
