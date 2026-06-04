'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import ReviewsSection from '@/components/layout/ReviewsSection'
import ArticlesSlider from '@/components/layout/ArticlesSlider'

const published = [
  {
    tag: 'Реєстрація бізнесу',
    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',
    desc: 'Іноземці в Австрії платять юристам €300–500 за типові питання про реєстрацію бізнесу. Ми зібрали всю інформацію безкоштовно — щоб ти міг зробити все сам, крок за кроком.',
    date: 'Червень 2025', readTime: '15 хв читання',
    href: '/articles/gewerbeanmeldung', cover: '/articles/gewerbeanmeldung-cover.jpg',
  },
  {
    tag: 'Австрія · Документи',
    title: 'Як оформити Austria ID: покроковий гайд для іноземців',
    desc: 'Austria ID — обов\'язковий перший крок для реєстрації бізнесу, роботи з FinanzOnline та SVS. 5 кроків.',
    date: 'Червень 2025', readTime: '8 хв читання',
    href: '/articles/austria-id', cover: '/articles/austria-id-cover.jpg',
  },
  {
    tag: 'Сім\'я · Пільги',
    title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати',
    desc: 'Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та податкові пільги — покроковий гайд для батьків.',
    date: 'Червень 2025', readTime: '10 хв читання',
    href: '/articles/invalidity-child', cover: '/articles/invalidity-cover.jpg',
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
      <section style={{ position: 'relative', overflow: 'hidden', height: 'calc(100vh - 64px)', maxHeight: 680, minHeight: 420 }}>
        {/* Full background photo */}
        <Image
          src="/hero-photo.jpg"
          alt="Жінка працює з ноутбуком на тлі гір"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          priority
        />
        {/* Subtle dark overlay — left side stronger for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.1) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Text — left aligned, vertically centered */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          padding: '0 clamp(24px,6vw,80px)',
        }}>
          <div style={{ maxWidth: 520 }}>
            <h1 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(32px,4.5vw,58px)',
              fontWeight: 400, lineHeight: 1.15,
              color: '#fff', letterSpacing: '-0.5px',
              margin: '0 0 20px 0',
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
            }}>
              твоя спокійна<br />
              і <em style={{ fontStyle: 'italic', color: '#FFB899' }}>розумна бухгалтерія</em><br />
              в Австрії
            </h1>
            <p style={{
              fontSize: 'clamp(14px,1.4vw,17px)',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.75, margin: '0 0 32px 0',
              maxWidth: 440,
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}>
              Steuerberater коштує дорого. Розібратися самому здається складно. Є третій шлях — ми зібрали всю потрібну інформацію та розклали її по кроках.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/free-test" style={{
                padding: '13px 26px', borderRadius: 999,
                fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 700,
                background: 'var(--orange)', color: '#fff',
                border: '2px solid var(--orange)',
                textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
              }}>
                Спробувати безкоштовно →
              </Link>
              <Link href="/pricing" style={{
                padding: '13px 26px', borderRadius: 999,
                fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 600,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.5)',
                textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
              }}>
                Дивитись тарифи
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES — horizontal scroll */}
      <ArticlesSlider published={published} upcoming={upcoming} />

      {/* REVIEWS */}
      <ReviewsSection />

      <Footer />
    </div>
  )
}
