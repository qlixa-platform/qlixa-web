'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'

function NoteBox({ type, children }: { type: 'warning' | 'info' | 'tip'; children: React.ReactNode }) {
  const s = {
    warning: { bg: '#FFF8E1', border: '#FFD54F', icon: '⚠️' },
    info:    { bg: '#E8F4FD', border: '#90CAF9', icon: 'ℹ️' },
    tip:     { bg: 'var(--peach-light)', border: 'var(--orange-mid)', icon: '💡' },
  }[type]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: '13px 16px', margin: '14px 0', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--charcoal)' }}>{children}</div>
    </div>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 13 }}>
      {children} ↗
    </a>
  )
}

const steps = [
  {
    n: 1,
    title: 'Завантажте застосунок Austria ID заздалегідь',
    content: (
      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
        Перед візитом до відділку встановіть застосунок <strong>ID Austria</strong> на свій смартфон. Він доступний для iOS та Android. Це важливо зробити заздалегідь — застосунок знадобиться прямо на місці під час реєстрації.
      </p>
    ),
  },
  {
    n: 2,
    title: 'Запишіться на термін до поліцейського управління',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Для не-громадян реєстрація Austria ID відбувається особисто в провінційному поліцейському управлінні (Landespolizeidirektion) вашої землі.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          <ExtLink href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung">
            📅 Записатися на термін — citizen.bmi.gv.at
          </ExtLink>
        </p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 6 }}>Як записатися:</p>
        {['Оберіть вашу федеральну землю', 'У пошуку вкажіть: ID Austria – Registration', 'Оберіть зручну дату і час'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
        <NoteBox type="warning">
          Термін можна записати лише на <strong>одну особу</strong>. Якщо плануєте оформити Austria ID на всю сім&apos;ю — кожен член сім&apos;ї записується і приходить окремо.
        </NoteBox>
      </>
    ),
  },
  {
    n: 3,
    title: 'Підготуйте документи',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Після запису вам прийде лист зі списком. Стандартний набір:
        </p>
        {[
          'Діючий паспорт (оригінал)',
          'Meldezettel — реєстрація за місцем проживання в Австрії',
          'Вид на проживання або документ, що підтверджує ваш статус',
          'Смартфон із встановленим застосунком ID Austria',
          'Австрійський номер телефону — обов\'язковий для SMS-коду',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6, border: '1px solid var(--line)' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--peach-light)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{item}</span>
          </div>
        ))}
      </>
    ),
  },
  {
    n: 4,
    title: 'Прийдіть до відділку у призначений час',
    content: (
      <>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 10 }}>
          Співробітник перевірить ваші документи та активує Austria ID прямо на вашому смартфоні. Весь процес займає близько <strong>20–30 хвилин</strong>.
        </p>
        <NoteBox type="tip">
          Ви отримаєте роздруківку з <strong>Freischaltcode</strong> і <strong>Widerrufs-Passwort</strong> — збережіть їх, вони знадобляться для завершення реєстрації вдома.
        </NoteBox>
      </>
    ),
  },
  {
    n: 5,
    title: 'Завершіть реєстрацію вдома',
    content: (
      <>
        {[
          'Зайдіть на сайт: a-trust.at/id-austria-registrierung',
          'Введіть отриманий Freischaltcode і Widerrufs-Passwort',
          'Прив\'яжіть застосунок ID Austria до вашого акаунту',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', borderRadius: 8, background: 'var(--gray)', marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--charcoal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--success-bg)', border: '1px solid var(--success)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 18 }}>✅</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>Готово — Austria ID активована і готова до використання!</span>
        </div>
      </>
    ),
  },
]

export default function AustriaIdPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar />

      {/* Hero — photo with text overlay */}
      <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
        <Image
          src="/articles/austria-id-cover.jpg"
          alt="Austria ID — цифровий підпис в Австрії"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          priority
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.78) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px clamp(16px,4vw,40px)', maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--orange)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', padding: '4px 11px', borderRadius: 4 }}>
              Австрія · Документи
            </span>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600, padding: '4px 11px', borderRadius: 4 }}>
              Самозайнятість
            </span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,3.5vw,32px)', color: '#fff', lineHeight: 1.2, marginBottom: 12, fontWeight: 400 }}>
            Як оформити Austria ID:<br />
            <em style={{ color: '#FFB899', fontStyle: 'italic' }}>покроковий гайд для іноземців</em>
          </h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[{ icon: '🕐', text: '8 хв читання' }, { icon: '📱', text: '5 кроків' }, { icon: '🇺🇦', text: 'Для іноземців' }].map(m => (
              <span key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>
                {m.icon} {m.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px 80px' }}>

        {/* Back link */}
        <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>
          ← Всі статті
        </Link>

        {/* What is Austria ID */}
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16 }}>
          Що таке Austria ID і навіщо вона <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>потрібна?</em>
        </h2>

        {/* ID Austria logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '14px 18px', border: '1px solid var(--line)', marginBottom: 16 }}>
          <Image src="/articles/id-austria-logo.svg" alt="ID Austria" width={120} height={32} style={{ objectFit: 'contain', height: 28, width: 'auto', background: 'transparent' }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>ID Austria</div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>Цифровий паспорт в Австрії</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>
            Austria ID (офіційна назва — <strong>ID Austria</strong>) — це ваш цифровий паспорт в Австрії. Простими словами — це електронне посвідчення особи, яке дозволяє підтверджувати вашу особистість онлайн і користуватися державними та приватними сервісами прямо зі смартфона.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>
            Раніше в Австрії для онлайн-підписів використовувалась <strong>Handy-Signatur</strong>. Austria ID — це її оновлена і розширена версія, яка замінила стару систему.
          </p>
        </div>

        {/* For whom */}
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16 }}>
          Навіщо вона потрібна <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>іноземцю?</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>Без Austria ID ви не зможете зареєструватися на багатьох держплатформах. Зокрема, вона обов&apos;язкова для:</p>
          {[
            { icon: '🏢', text: 'Реєстрації бізнесу на GISA (Gewerbeanmeldung)' },
            { icon: '💼', text: 'Роботи з FinanzOnline — податковим кабінетом' },
            { icon: '🏥', text: 'Реєстрації в SVS — соціальне страхування для самозайнятих' },
            { icon: '✍️', text: 'Підписання документів онлайн — юридично дійсний електронний підпис' },
            { icon: '🌐', text: 'Доступу до oesterreich.gv.at і десятків інших держсервісів' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Warning for non-citizens */}
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16 }}>
          Важливо для <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>не-громадян Австрії</em>
        </h2>

        {/* RWR card small inline */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <NoteBox type="warning">
              Якщо ви громадянин іншої країни — українець, румун, серб або будь-який інший іноземець з видом на проживання — онлайн-реєстрація Austria ID для вас може бути <strong>недоступна</strong>. Це залежить від вашої федеральної землі (Bundesland).<br /><br />
              Не засмучуйтесь — це нормальна ситуація. Просто будьте готові до того, що вам доведеться особисто прийти до поліцейського управління. Процедура нескладна і займає близько <strong>20–30 хвилин</strong>.
            </NoteBox>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Image
              src="/articles/austria-rwr-card.png"
              alt="RWR Karte Plus Austria"
              width={160} height={100}
              style={{ borderRadius: 8, border: '1px solid var(--line)', objectFit: 'cover' }}
            />
            <p style={{ fontSize: 10, color: 'var(--text3)', textAlign: 'center', marginTop: 5, maxWidth: 160 }}>
              Rot-Weiß-Rot Karte Plus
            </p>
          </div>
        </div>

        {/* Steps */}
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', margin: '32px 0 16px' }}>
          Покрокова інструкція: як <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>оформити Austria ID</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          {steps.map((step, i) => (
            <div key={step.n} style={{ display: 'flex', gap: 16, paddingBottom: i < steps.length - 1 ? 20 : 0, marginBottom: i < steps.length - 1 ? 20 : 0, borderBottom: i < steps.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--orange)', color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                {step.n}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{step.title}</h3>
                {step.content}
              </div>
            </div>
          ))}
        </div>

        {/* What next */}
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16 }}>
          Що робити <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>далі?</em>
        </h2>
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--charcoal)', marginBottom: 14 }}>Після того як Austria ID оформлена — ви готові до наступних кроків реєстрації бізнесу:</p>
          {[
            { icon: '🏢', text: 'Зареєструвати Gewerbe на GISA' },
            { icon: '💰', text: 'Увійти до FinanzOnline і налаштувати податковий кабінет' },
            { icon: '🏥', text: 'Зареєструватися в SVS — страхування для самозайнятих' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', marginBottom: 8, border: '1px solid var(--line)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--charcoal)' }}>{item.text}</span>
            </div>
          ))}
          <Link href="/articles/gewerbeanmeldung" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid var(--orange)', background: 'var(--peach-light)', textDecoration: 'none', marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>📖</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)' }}>Читайте детально → Gewerbeanmeldung в Австрії: покрокова реєстрація</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>Повний гайд по реєстрації самозайнятості</div>
              </div>
            </div>
            <span style={{ fontSize: 18, color: 'var(--orange)', fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Sources */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10 }}>
            Джерела
          </p>
          {[
            { label: 'Офіційний сайт ID Austria: id-austria.gv.at', href: 'https://www.id-austria.gv.at' },
            { label: 'Портал держпослуг Австрії: oesterreich.gv.at', href: 'https://www.oesterreich.gv.at' },
            { label: 'Запис на термін: citizen.bmi.gv.at', href: 'https://citizen.bmi.gv.at' },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: 'var(--orange)', textDecoration: 'none', marginBottom: 6 }}>
              ↗ {s.label}
            </a>
          ))}
        </div>

        <div style={{ background: 'var(--gray)', borderRadius: 10, padding: '13px 16px', fontSize: 12, color: 'var(--text3)', lineHeight: 1.6, marginTop: 24, border: '1px solid var(--line)' }}>
          Цей матеріал має інформаційний характер і ґрунтується на особистому досвіді команди QLIXA. Актуальність інформації рекомендуємо перевіряти на офіційних державних сайтах.
        </div>

      </div>
      <Footer />
    </div>
  )
}
