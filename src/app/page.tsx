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
      <section style={{ background: '#fff', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 'calc(100vh - 64px)', maxHeight: 640, minHeight: 400 }}>
          <div style={{ padding: 'clamp(32px,5vw,60px) clamp(28px,4vw,56px) clamp(32px,5vw,60px) clamp(24px,3.5vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3.2vw,46px)', fontWeight: 400, lineHeight: 1.18, color: 'var(--charcoal)', letterSpacing: '-0.3px', margin: '0 0 18px 0' }}>
              твоя спокійна<br />
              і <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>розумна бухгалтерія</em><br />
              в Австрії
            </h1>
            <p style={{ fontSize: 'clamp(13px,1.2vw,15px)', color: 'var(--text2)', lineHeight: 1.75, margin: '0 0 28px 0', maxWidth: 400 }}>
              Steuerberater коштує дорого. Розібратися самому здається складно. Є третій шлях. Ми зібрали всю потрібну інформацію та розклали її по кроках — щоб ви впоралися самі, швидко і без зайвих витрат
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/free-test" style={{ padding: '12px 24px', borderRadius: 999, fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 700, background: 'var(--orange)', color: '#fff', border: '2px solid var(--orange)', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
                Спробувати безкоштовно →
              </Link>
              <Link href="/pricing" style={{ padding: '12px 24px', borderRadius: 999, fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 600, background: 'transparent', color: 'var(--charcoal)', border: '2px solid var(--line2)', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
                Дивитись тарифи
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image src="/hero-photo.jpg" alt="Жінка працює з ноутбуком на тлі гір" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} priority />
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
