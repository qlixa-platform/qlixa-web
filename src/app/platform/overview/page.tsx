'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    num: '01',
    title: 'Автоматичне заповнення податкових декларацій',
    desc: 'На основі твоїх даних QLIXA формує декларації з доходів та ПДВ. Ти перевіряєш результат і самостійно відправляєш у FinanzOnline. Жодних складних форм і незрозумілих полів.',
    tags: ['Податок з доходів', 'ПДВ декларація', 'FinanzOnline'],
    accent: false,
  },
  {
    num: '02',
    title: 'Платформа для ведення бізнес-бухгалтерії',
    desc: 'Повний інструмент для комфортного ведення бізнесу: додавай клієнтів і постачальників, виставляй рахунки в кілька кліків, відстежуй доходи й витрати в реальному часі. Все в одному місці — без таблиць Excel і паперових папок.',
    tags: ['Клієнти та постачальники', 'Виставлення рахунків', 'Доходи і витрати'],
    accent: true,
  },
  {
    num: '03',
    title: 'KPI дашборд та аналітика бізнесу',
    desc: 'Бачиш своє підприємство одним поглядом: скільки заробив, скільки витратив, який прибуток і куди рухається бізнес. Прості зрозумілі графіки на основі твоїх даних — без бухгалтерського жаргону.',
    tags: ['Показники бізнесу', 'Графіки та звіти', 'Прогнозування'],
    accent: false,
  },
  {
    num: '04',
    title: 'Калькулятор капітальних доходів та податків',
    desc: 'Маєш дохід від продажу акцій, нерухомості чи інвестицій? Введи свої дані — QLIXA автоматично розрахує суму податку відповідно до чинних правил. Результат перевіряєш і приймаєш рішення ти.',
    tags: ['KESt', 'Капітальні доходи', 'Інвестиції'],
    accent: false,
  },
  {
    num: '05',
    title: 'Калькулятор інших доходів та податків',
    desc: 'Здаєш квартиру, маєш дохід з-за кордону чи кілька джерел? Введи дані — платформа врахує всі надходження, розрахує суми та підкаже можливі списання згідно з чинними правилами.',
    tags: ['Дохід від оренди', 'Закордонні доходи', 'Кілька джерел'],
    accent: false,
  },
]

const forWhom = [
  { img: '/for-who/samostiynyy.png', alt: 'Самозайнятий', text: 'Самозайнятий (Neue Selbstständige або Gewerbe)', href: '/for/samostiynyy' },
  { img: '/for-who/frilanser.png', alt: 'Фрілансер', text: 'Фрілансер — IT, дизайн, консалтинг, будь-яка вільна професія', href: '/for/frilanser' },
  { img: '/for-who/biznes.png', alt: 'Маленький бізнес', text: 'Маєш маленький бізнес або тільки плануєш відкрити', href: '/for/biznes' },
  { img: '/for-who/nerukhomist.png', alt: 'Нерухомість', text: 'Здаєш нерухомість або маєш дохід з кількох джерел', href: '/for/nerukhomist' },
  { img: '/for-who/pensioner.png', alt: 'Пенсіонер', text: 'Пенсіонер із додатковим доходом від підробітку', href: '/for/pensioner' },
  { img: '/for-who/naymanyy.png', alt: 'Найманий працівник', text: 'Найманий працівник — контроль фінансів та повернення податків', href: '/for/naymanyy' },
]

export default function PlatformOverviewPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'var(--charcoal)', padding: '56px 16px 48px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
<div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 999, marginBottom: 16,
            background: 'rgba(255,255,255,0.08)', color: 'var(--peach)',
          }}>
            Можливості платформи
          </div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(32px,3.5vw,48px)',
            color: '#fff', lineHeight: 1.2, marginBottom: 16,
          }}>
            Твій цифровий бізнес-помічник в Австрії
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            Разом розберемось з податками, фінансами та бізнесом.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 16px 80px' }}>

        {/* Intro */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 28,
          border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 40,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
            👋 Привіт!
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)' }}>
            QLIXA — це цифровий помічник, який допомагає тобі самостійно розібратися з податками та бізнесом в Австрії. Ти вводиш свої дані — платформа автоматично розраховує, підказує і нагадує. Рішення завжди за тобою.
          </p>
        </div>

        {/* Services section title */}
        <h2 style={{
          fontFamily: 'DM Serif Display, serif', fontSize: 28,
          color: 'var(--charcoal)', marginBottom: 8,
        }}>
          Послуги та <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>можливості</em>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 28, lineHeight: 1.6 }}>
          Ось що QLIXA робить для тебе прямо зараз:
        </p>

        {/* Service cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {services.map((s) => (
            <div key={s.num} style={{
              background: s.accent ? 'var(--peach-light)' : '#fff',
              borderRadius: 16, padding: 24,
              border: s.accent ? '1px solid var(--orange-mid)' : '1px solid var(--line)',
              boxShadow: 'var(--shadow)',
              display: 'flex', gap: 20, alignItems: 'flex-start',
            }}>
              {/* Number badge */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: s.accent ? 'var(--orange)' : 'var(--gray)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: s.accent ? '#fff' : 'var(--text3)',
                marginTop: 2,
              }}>
                {s.num}
              </div>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8, lineHeight: 1.3 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 12 }}>
                  {s.desc}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 5,
                      background: s.accent ? 'rgba(255,112,51,0.12)' : 'var(--gray)',
                      color: s.accent ? 'var(--orange)' : 'var(--text3)',
                      border: s.accent ? '1px solid var(--orange-mid)' : '1px solid var(--line)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon note */}
        <div style={{
          background: 'rgba(255,112,51,0.05)', borderRadius: 12, padding: '16px 20px',
          border: '1px solid rgba(255,112,51,0.15)', marginBottom: 40,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>🚀</span>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--charcoal)' }}>QLIXA постійно розвивається</strong> — нові можливості з'являються регулярно.
            Слідкуй за оновленнями, щоб не пропустити нічого корисного!
          </p>
        </div>

        {/* For whom */}
        <h2 style={{
          fontFamily: 'DM Serif Display, serif', fontSize: 26,
          color: 'var(--charcoal)', marginBottom: 8,
        }}>
          Для <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>кого це?</em>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20, lineHeight: 1.6 }}>
          QLIXA підходить, якщо ти:
        </p>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', marginBottom: 40 }}>
          {forWhom.map((item, i) => (
            <Link key={i} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#fff', borderRadius: 12, padding: '14px 18px',
                border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.alt} style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Why better */}
        <div style={{
          background: 'var(--charcoal)', borderRadius: 16, padding: 28, marginBottom: 40,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'var(--orange)', opacity: 0.06, top: -60, right: -60 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: 'DM Serif Display, serif', fontSize: 24,
              color: '#fff', marginBottom: 14, lineHeight: 1.3,
            }}>
              А ось у чому ми{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>відрізняємось</em>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
              Замість нудних форм на 40 полів — проста анкета. Ти відповідаєш звичайними словами: є діти? Є машина? Працюєш з дому? А QLIXA сама перекладає це в правильні цифри і документи.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
              Ніяких бухгалтерських термінів. Ніяких штрафів за помилки. Просто спокійно ведеш бізнес.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['🇺🇦 Українська', '🇩🇪 Deutsch', '🇬🇧 English', '🇷🇺 Русский'].map(lang => (
                <span key={lang} style={{
                  padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
