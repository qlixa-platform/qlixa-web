'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
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
  {
    tag: 'GISA · Реєстрація',
    title: 'Реєстрація на сайті GISA: покрокова інструкція',
    desc: 'Як подати заяву Gewerbeanmeldung онлайн через GISA — детально, з поясненням кожного поля та кроку.',
    date: 'Червень 2025', readTime: '15 хв читання',
    href: '/articles/gisa-formular', cover: '/articles/gisa-cover.jpg',
  },
]

const upcoming = [
  { tag: 'SVS', title: 'Як заповнити формуляр SVS', desc: 'Соціальне страхування — що вказати щоб не переплатити.', href: '/articles/svs-formular' },
  { tag: 'FinanzOnline', title: 'Як заповнити формуляр FinanzOnline', desc: 'Реєстрація в податковій онлайн — покроково.', href: '/articles/finanz-online' },
  { tag: 'MVK', title: 'Як обрати пенсійний фонд MVK', desc: 'Що таке MVK і як не пропустити дедлайн 6 місяців.', href: '/articles/mvk-pension' },
]

const incomeMap: Record<string, number> = {
  'До €15 000': 320,
  '€15 000 – €30 000': 580,
  '€30 000 – €60 000': 840,
  'Понад €60 000': 1240,
}

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(start)
    }, 30)
    return () => clearInterval(timer)
  }, [target, active])
  return val
}

export default function HomePage() {
  const [demoStep, setDemoStep] = useState(0)
  const [s1, setS1] = useState('')
  const [s2, setS2] = useState('')
  const [s3Selections, setS3Selections] = useState<string[]>([])
  const [s4, setS4] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const demoComplete = !!(s1 && s2 && s3Selections.length > 0 && s4)
  const incomeBase = incomeMap[s2] || 0
  const bonus = s3Selections.length * 120
  const total = incomeBase + bonus
  const countVal = useCountUp(total, demoComplete)

  const toggleS3 = (opt: string) => {
    setS3Selections(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])
  }

  const fcard = {
    background: '#fff',
    borderRadius: 14,
    padding: '14px 16px',
    border: '1px solid rgba(30,30,30,0.07)',
    boxShadow: '0 8px 24px rgba(30,30,30,0.08)',
    position: 'absolute' as const,
    whiteSpace: 'nowrap' as const,
    minWidth: 140,
  }

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @keyframes float1 { 0%,100%{transform:rotate(-6deg) translateY(0)} 50%{transform:rotate(-6deg) translateY(-12px)} }
        @keyframes float2 { 0%,100%{transform:rotate(5deg) translateY(0)} 50%{transform:rotate(5deg) translateY(-10px)} }
        @keyframes float3 { 0%,100%{transform:rotate(3deg) translateY(0)} 50%{transform:rotate(3deg) translateY(-14px)} }
        @keyframes float4 { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-8px)} }
        @keyframes float5 { 0%,100%{transform:rotate(4deg) translateY(0)} 50%{transform:rotate(4deg) translateY(-10px)} }
        @keyframes progAnim { from{width:40%} to{width:85%} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.4)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes qPulse1 { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.8} 100%{transform:translate(-50%,-50%) scale(2.2);opacity:0} }
        @keyframes qFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes qScan { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }
        @keyframes qDot { 0%,100%{opacity:0.2;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.8)} }
        @keyframes coinFloat1 { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.15;} 50%{transform:translateY(-14px) rotate(20deg);opacity:0.35;} }
        @keyframes coinFloat2 { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.12;} 50%{transform:translateY(-10px) rotate(-15deg);opacity:0.3;} }
        @keyframes coinFloat3 { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.1;} 50%{transform:translateY(-18px) rotate(10deg);opacity:0.28;} }
        @keyframes countUp { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        @keyframes ringFill { 0%{stroke-dashoffset:175;} 70%{stroke-dashoffset:44;} 100%{stroke-dashoffset:44;} }
        @keyframes wBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes langPop { from{opacity:0;transform:scale(0.7);} to{opacity:1;transform:scale(1);} }
        @keyframes updatePulse { 0%,100%{transform:scale(1);opacity:0.5;} 50%{transform:scale(1.6);opacity:1;} }
        @keyframes barFill { 0%{width:0%;} 80%{width:100%;} 100%{width:100%;} }
        .hero-left { animation: slideUp 0.7s ease both }
        .hero-left-delay { animation: slideUp 0.7s 0.15s ease both }
        .hero-left-delay2 { animation: slideUp 0.7s 0.3s ease both }
        .hiw-card { background:#fff; border-radius:22px; padding:36px 28px; transition:transform 0.2s,box-shadow 0.2s; position:relative; overflow:hidden }
        .hiw-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.10) }
        .hiw-card:hover::before { opacity:1 }
        .hiw-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,112,51,0.07),rgba(255,149,0,0.04)); opacity:0; transition:opacity 0.2s; pointer-events:none; border-radius:22px }
        .demo-opt { border:2px solid #eee; border-radius:12px; padding:14px 18px; cursor:pointer; background:#fff; font-size:14px; font-family:DM Sans,sans-serif; text-align:left; transition:all 0.15s; color:#353434 }
        .demo-opt:hover { border-color:#FF7033; background:#FFF8F5 }
        .demo-opt.selected { border-color:#FF7033; background:#FFF0E8; color:#FF7033; font-weight:600 }
        .feat-card { border:1px solid #eee; border-radius:22px; padding:32px 28px; transition:transform 0.2s,box-shadow 0.2s }
        .feat-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,0.08) }
        .wcard { border-radius:20px; padding:36px 28px }
        .faq-item { border-bottom:1px solid #f0f0f0; overflow:hidden }
        .faq-btn { width:100%; background:none; border:none; text-align:left; padding:24px 0; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-family:DM Sans,sans-serif; font-size:17px; font-weight:600; color:#353434; gap:16px }
        .faq-btn:hover { color:#FF7033 }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        paddingTop: 66,
        backgroundImage: `
          radial-gradient(ellipse 70% 60% at 70% 30%, rgba(255,112,51,0.07) 0%, transparent 70%),
          linear-gradient(rgba(30,30,30,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30,30,30,0.03) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 48px 48px, 48px 48px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '80px clamp(20px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* LEFT */}
          <div>
            <div className="hero-left" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF0E8', border: '1px solid #FFD4BC', borderRadius: 999, padding: '6px 14px', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF7033', display: 'inline-block', animation: 'pulse 1.8s infinite' }} />
              <span style={{ fontSize: 13, color: '#FF7033', fontWeight: 600 }}>Для іноземців в Австрії · 4 мови</span>
            </div>
            <h1 className="hero-left-delay" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(42px,4.5vw,66px)', fontWeight: 400, lineHeight: 1.12, color: '#353434', letterSpacing: '-1.5px', margin: '0 0 24px 0' }}>
              Бухгалтерія в Австрії—<br />нарешті <em style={{ fontStyle: 'italic', color: '#FF7033' }}>зрозуміло.</em>
            </h1>
            <p className="hero-left-delay2" style={{ fontSize: 18, fontWeight: 300, color: '#595959', lineHeight: 1.7, margin: '0 0 36px 0', maxWidth: 460 }}>
              Вводиш дані — QLIXA рахує. <strong style={{ fontWeight: 700, color: 'rgba(30,30,30,0.7)' }}>Без бухгалтера. Без німецької. Без паніки.</strong>
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/free-test" style={{ padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 700, background: 'linear-gradient(135deg,#FF7033,#FF9500)', color: '#fff', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 20px rgba(255,112,51,0.35)' }}>
                Спробувати безкоштовно →
              </Link>
              <button onClick={() => document.getElementById('hiw')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 600, background: 'transparent', color: '#353434', border: '2px solid #353434', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>
                Як це працює?
              </button>
            </div>
          </div>

          {/* RIGHT — floating cards */}
          <div style={{ position: 'relative', height: 540 }}>

            {/* Central card — WHITE */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', border: '1px solid #E8E8E8', borderRadius: 24, padding: '28px 32px', width: 240, zIndex: 2, boxShadow: '0 24px 64px rgba(30,30,30,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, background: '#FF7033', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 16 }}>Q</div>
                <span style={{ color: '#353434', fontSize: 13 }}>QLIXA Dashboard</span>
              </div>
              <div style={{ color: '#353434', fontSize: 42, fontFamily: 'DM Serif Display,serif', fontWeight: 400, lineHeight: 1 }}>
                €<span style={{ color: '#FF7033' }}>640</span>
              </div>
              <div style={{ color: '#6B6B6B', fontSize: 12, marginBottom: 16 }}>до повернення податків</div>
              <div style={{ color: '#353434', fontSize: 22, fontWeight: 700 }}>15 хвилин</div>
              <div style={{ color: '#6B6B6B', fontSize: 12, marginBottom: 16 }}>на цей звіт</div>
              <div style={{ background: 'rgba(30,30,30,0.06)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,#FF7033,#FF9500)', borderRadius: 8, animation: 'progAnim 2s 0.5s ease both', width: '85%' }} />
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7033', display: 'inline-block', animation: `blink 1.2s ${i * 0.3}s infinite` }} />)}
              </div>
            </div>

            {/* Card 1 — Einkommensteuer — top-left */}
            <div style={{ ...fcard, top: 20, left: 0, animation: 'float1 3.5s ease-in-out infinite' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#353434' }}>Einkommensteuer</div>
              <div style={{ fontSize: 11, color: '#595959', marginBottom: 6 }}>Прибутковий податок</div>
              <span style={{ background: '#FFF0E8', color: '#FF7033', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>Готово</span>
            </div>

            {/* Card 2 — Gewerbeanmeldung — top-right */}
            <div style={{ ...fcard, top: 10, right: 0, animation: 'float2 4s ease-in-out infinite' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>🏢</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#353434' }}>Gewerbeanmeldung</div>
              <div style={{ fontSize: 11, color: '#595959', marginBottom: 6 }}>Реєстрація бізнесу</div>
              <span style={{ background: '#E8F8F0', color: '#22C55E', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>✓ Подано</span>
            </div>

            {/* Card 3 — VAT Report — bottom-left area */}
            <div style={{ ...fcard, bottom: 100, left: 10, animation: 'float3 3.8s ease-in-out infinite' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>💰</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#353434' }}>VAT Report Q2</div>
              <div style={{ fontSize: 11, color: '#595959', marginBottom: 6 }}>Звіт ПДВ</div>
              <span style={{ background: '#FFF0E8', color: '#FF7033', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>15 хв</span>
            </div>

            {/* Card 4 — E/A-Rechnung — bottom-right */}
            <div style={{ ...fcard, bottom: 60, right: 0, animation: 'float4 4.2s ease-in-out infinite' }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>📊</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#353434' }}>E/A-Rechnung</div>
              <div style={{ fontSize: 11, color: '#595959', marginBottom: 6 }}>Облік витрат</div>
              <span style={{ background: '#EFF6FF', color: '#3B82F6', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>Автоматично</span>
            </div>

            {/* Card 5 — SVS Formular — middle, wrapper handles vertical centering */}
            <div style={{ position: 'absolute', top: '48%', left: -10, transform: 'translateY(-50%)', zIndex: 3 }}>
              <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(30,30,30,0.07)', boxShadow: '0 8px 24px rgba(30,30,30,0.08)', whiteSpace: 'nowrap', minWidth: 140, animation: 'float5 3.6s ease-in-out infinite' }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>⏰</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#353434' }}>SVS Formular</div>
                <div style={{ fontSize: 11, color: '#595959', marginBottom: 6 }}>Соц. страхування</div>
                <span style={{ background: '#FFF0E8', color: '#FF7033', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999 }}>Дедлайн: 30 лип</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: '#1E1E1E', padding: '0 clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { val: 'Індивідуальний', label: 'підхід до кожного бізнесу', orange: false },
            { val: '€800', label: 'Середнє повернення податків на рік', orange: true },
            { val: '15 хв', label: 'На один звіт', orange: false },
            { val: '4 мови', label: 'UA · RU · EN · DE', orange: false },
          ].map((item, i) => (
            <div key={i} style={{ padding: '32px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: item.val.length > 5 ? 22 : 32, fontWeight: 800, color: item.orange ? '#FF7033' : '#fff', fontFamily: 'DM Serif Display,serif', marginBottom: 6 }}>{item.val}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DEMO ── */}
      <section id="demo" style={{ padding: '100px clamp(20px,6vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E8', color: '#FF7033', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 999, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Спробуй прямо зараз</div>
            <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, color: '#353434', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Все просто — нарешті <em style={{ color: '#FF7033', fontStyle: 'italic' }}>жодних складних термінів</em>
            </h2>
            <p style={{ fontSize: 17, color: '#595959', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              Відповідай на прості запитання — QLIXA врахує твою ситуацію: сімейний стан, тип зайнятості, витрати. І підкаже на чому можна заощадити, як повернути податки і які звіти потрібно подати.
            </p>
            <p style={{ fontSize: 13, color: '#6B6B6B', fontStyle: 'italic', margin: '12px auto 0', maxWidth: 480 }}>
              * Це ознайомчий інтерфейс. Реальний індивідуальний звіт отримаєш після реєстрації.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            {/* LEFT */}
            <div>
              {/* Step 1 */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF7033', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                  <span style={{ fontWeight: 600, color: '#353434' }}>Який тип зайнятості в Австрії?</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['🏢 Самозайнятий (Gewerbe)', '💼 Найманий працівник', '💻 Фрілансер', '👴 Пенсіонер з доходом'].map(opt => (
                    <button key={opt} className={`demo-opt${s1 === opt ? ' selected' : ''}`} onClick={() => { setS1(opt); if (demoStep < 1) setDemoStep(1) }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ marginBottom: 32, opacity: demoStep >= 1 ? 1 : 0.35, transition: 'opacity 0.3s', pointerEvents: demoStep >= 1 ? 'auto' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 1 ? '#FF7033' : '#eee', color: demoStep >= 1 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                  <span style={{ fontWeight: 600, color: '#353434' }}>Який приблизний річний дохід? (€)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['До €15 000', '€15 000 – €30 000', '€30 000 – €60 000', 'Понад €60 000'].map(opt => (
                    <button key={opt} className={`demo-opt${s2 === opt ? ' selected' : ''}`} onClick={() => { setS2(opt); if (demoStep < 2) setDemoStep(2) }}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Step 3 — multi-select */}
              <div style={{ marginBottom: 32, opacity: demoStep >= 2 ? 1 : 0.35, transition: 'opacity 0.3s', pointerEvents: demoStep >= 2 ? 'auto' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 2 ? '#FF7033' : '#eee', color: demoStep >= 2 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                  <span style={{ fontWeight: 600, color: '#353434' }}>Що маєш для списання? <span style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 400 }}>(можна кілька)</span></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['💻 Ноутбук / техніка', '🏠 Home office', '📚 Курси / навчання', '🚗 Транспорт до клієнтів'].map(opt => (
                    <button key={opt} className={`demo-opt${s3Selections.includes(opt) ? ' selected' : ''}`} onClick={() => toggleS3(opt)}>{opt}</button>
                  ))}
                </div>
                {s3Selections.length > 0 && demoStep < 3 && (
                  <button onClick={() => setDemoStep(3)} style={{ marginTop: 12, padding: '10px 22px', borderRadius: 10, background: '#FF7033', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'DM Sans,sans-serif' }}>
                    Далі →
                  </button>
                )}
              </div>

              {/* Step 4 */}
              <div style={{ opacity: demoStep >= 3 ? 1 : 0.35, transition: 'opacity 0.3s', pointerEvents: demoStep >= 3 ? 'auto' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 3 ? '#FF7033' : '#eee', color: demoStep >= 3 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
                  <span style={{ fontWeight: 600, color: '#353434' }}>Чи подавав декларацію раніше?</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['✅ Так, подавав', '🆕 Ні, вперше'].map(opt => (
                    <button key={opt} className={`demo-opt${s4 === opt ? ' selected' : ''}`} onClick={() => { setS4(opt); setDemoStep(4) }}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — result panel */}
            <div style={{ background: '#1E1E1E', borderRadius: 24, padding: '32px', minHeight: 420 }}>
              {demoComplete ? (
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginBottom: 8 }}>Очікуване повернення</div>
                  <div style={{ fontSize: 64, fontFamily: 'DM Serif Display,serif', lineHeight: 1, marginBottom: 4 }}>
                    <span style={{ color: '#fff' }}>€</span><span style={{ color: '#FF7033' }}>{countVal.toLocaleString()}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 24 }}>Розрахунок для вашої ситуації</div>
                  {[
                    { label: 'Тип зайнятості', val: s1 },
                    { label: 'Дохід', val: s2 },
                    { label: 'Витрати до списання', val: s3Selections.join(', ') },
                    { label: 'Досвід подачі', val: s4 },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, flexShrink: 0 }}>{row.label}</span>
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 500, maxWidth: '58%', textAlign: 'right' }}>{row.val}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,112,51,0.15)', border: '1px solid rgba(255,112,51,0.3)', borderRadius: 10, fontSize: 12, color: '#FF7033', lineHeight: 1.5 }}>
                    ⚠️ Це ознайомчий розрахунок. Реальна сума залежить від вашої унікальної ситуації та документів.
                  </div>
                  <Link href="/pricing" style={{ display: 'block', marginTop: 14, background: 'linear-gradient(135deg,#FF7033,#FF9500)', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Отримати повний розрахунок →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 320, gap: 0 }}>
                  {/* Logo mark with pulse rings */}
                  <div style={{ position: 'relative', marginBottom: 32 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,112,51,0.3)', animation: 'qPulse1 2s ease-out infinite' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,112,51,0.2)', animation: 'qPulse1 2s ease-out infinite 0.6s' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,112,51,0.1)', animation: 'qPulse1 2s ease-out infinite 1.2s' }} />
                    <div style={{ width: 56, height: 56, background: 'transparent', position: 'relative', zIndex: 1, animation: 'qFloat 3s ease-in-out infinite' }}>
                      <Image src="/logos/logo-mascot.svg" alt="QLIXA" width={56} height={56} style={{ display: 'block' }} />
                    </div>
                  </div>
                  {/* Scanning bar */}
                  <div style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', marginBottom: 24 }}>
                    <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, #FF7033, transparent)', borderRadius: 2, animation: 'qScan 1.8s ease-in-out infinite' }} />
                  </div>
                  {/* Text */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: '#fff', marginBottom: 8, letterSpacing: '-0.3px' }}>
                      QLIXA чекає вашу анкету
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 220 }}>
                      Відповідайте на запитання —<br />тут з'явиться розрахунок
                    </div>
                  </div>
                  {/* Animated dots */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF7033', animation: 'qDot 1.4s ease-in-out infinite', animationDelay: `${i * 0.15}s`, opacity: 0.3 }} />
                    ))}
                  </div>
                  {/* Disclaimer */}
                  <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', textAlign: 'center', maxWidth: 200 }}>
                    Ознайомчий інтерфейс.<br />Реальний звіт — після реєстрації.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="hiw" style={{ padding: '100px clamp(20px,6vw,80px)', background: '#F4F4F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E8', color: '#FF7033', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 999, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Як це працює</div>
            <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, color: '#353434', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Чотири кроки — від <em style={{ color: '#FF7033', fontStyle: 'italic' }}>нуля до звіту</em>
            </h2>
            <p style={{ fontSize: 17, color: '#595959', maxWidth: 520, margin: '0 auto' }}>Не потрібно знати бухгалтерію. Просто відповідай на прості питання.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { step: '1', icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="6" y="4" width="24" height="28" rx="4" fill="#FFF0E8"/><path d="M11 12h14M11 18h10M11 24h6" stroke="#FF7033" strokeWidth="2" strokeLinecap="round"/><circle cx="26" cy="26" r="6" fill="#FF7033"/><path d="M23 26l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Розкажи про бізнес', text: 'Коротка анкета замість складних форм — прості питання зрозумілою мовою.' },
              { step: '2', icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="12" fill="#FFF0E8"/><path d="M18 12v6l4 2" stroke="#FF7033" strokeWidth="2" strokeLinecap="round"/><path d="M8 18a10 10 0 0 1 10-10" stroke="#FF7033" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/></svg>, title: 'QLIXA аналізує', text: 'Автоматично рахує податки, знаходить витрати до списання, перевіряє дедлайни.' },
              { step: '3', icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="4" y="8" width="28" height="20" rx="4" fill="#FFF0E8"/><rect x="8" y="14" width="8" height="8" rx="2" fill="#FF7033" opacity="0.5"/><rect x="20" y="14" width="8" height="3" rx="1" fill="#FF7033"/><rect x="20" y="20" width="5" height="2" rx="1" fill="#FF7033" opacity="0.4"/></svg>, title: 'Отримай звіт', text: 'Dashboard з цифрами: дохід, витрати, прибуток, ПДВ. PDF, XML або Excel.' },
              { step: '4', icon: <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="6" y="4" width="24" height="28" rx="4" fill="#FFF0E8"/><path d="M18 22V12m0 0l-4 4m4-4l4 4" stroke="#FF7033" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 26h12" stroke="#FF7033" strokeWidth="2" strokeLinecap="round"/></svg>, title: 'Відправ результат', text: 'Надсилай в FinanzOnline або завантажуй. Дізнайся скільки можеш повернути.' },
            ].map((c, i) => (
              <div key={i} className="hiw-card">
                <div style={{ fontSize: 12, fontWeight: 700, color: '#FF7033', letterSpacing: 1, marginBottom: 16 }}>КРОК {c.step}</div>
                <div style={{ marginBottom: 16 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#353434', marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px clamp(20px,6vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E8', color: '#FF7033', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 999, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Послуги та можливості</div>
            <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, color: '#353434', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Що вміє <em style={{ color: '#FF7033', fontStyle: 'italic' }}>QLIXA</em>
            </h2>
            <p style={{ fontSize: 17, color: '#595959' }}>Просто. Легко. В одному місці.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 20 }}>
            {/* Card A — peach, spans 2 rows */}
            <div className="feat-card" style={{ gridRow: '1 / 3', background: '#FFF0E8', border: '1px solid #FFD4BC', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'inline-block', background: '#FF7033', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, marginBottom: 20, letterSpacing: 0.5 }}>Головне</div>
                <div style={{ fontSize: 28, marginBottom: 14 }}>📊</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#353434', marginBottom: 12, lineHeight: 1.3 }}>Платформа для ведення бізнес-бухгалтерії</div>
                <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 28 }}>Повний фінансовий дашборд: доходи, витрати, прибуток — все в реальному часі. Додавайте клієнтів, постачальників, виставляйте рахунки та керуйте бізнесом комфортно.</div>
              </div>
              {/* Mini dashboard mockup */}
              <div>
                <div style={{ background: 'rgba(53,52,52,0.05)', borderRadius: 14, padding: '16px 18px' }}>
                  {[
                    { label: 'Дохід червень', val: '€4 280', color: '#353434' },
                    { label: 'Списані витрати', val: '€1 140', color: '#FF7033' },
                    { label: 'До повернення', val: '€640', color: '#22C55E' },
                    { label: 'VAT Q2', val: '✓ Готово', color: '#22C55E' },
                    { label: 'SVS Formular', val: '⏳ Скоро', color: '#F59E0B' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(53,52,52,0.06)' }}>
                      <span style={{ fontSize: 12, color: '#595959' }}>{row.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: row.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: '#6B6B6B', fontStyle: 'italic', marginTop: 10 }}>
                  * Інтерфейс для ознайомлення. Реальний дашборд — після реєстрації.
                </div>
              </div>
            </div>

            {/* Card B */}
            <div className="feat-card" style={{ gridColumn: '2', gridRow: '1', background: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>📝</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#353434', marginBottom: 10 }}>Автоматичне заповнення податкових декларацій</div>
              <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, marginBottom: 16 }}>Декларації з доходів та ПДВ заповнюються автоматично на основі ваших даних. Просто перевір і відправ.</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Податок з доходів', 'ПДВ декларація', 'Автозаповнення'].map(t => (
                  <span key={t} style={{ background: '#FFF0E8', color: '#FF7033', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Card C */}
            <div className="feat-card" style={{ gridColumn: '3', gridRow: '1', background: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>🧮</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#353434', marginBottom: 10 }}>Калькулятори податків</div>
              <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, marginBottom: 16 }}>Точний розрахунок капітальних доходів, інших видів доходів та відповідних податків для вашої конкретної ситуації.</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Капітальні доходи', 'Інші доходи', 'Точний розрахунок'].map(t => (
                  <span key={t} style={{ background: '#FFF0E8', color: '#FF7033', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Card D — Дедлайни */}
            <div className="feat-card" style={{ gridColumn: '2', gridRow: '2', background: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>⏰</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#353434', marginBottom: 10 }}>Дедлайни і нагадування</div>
              <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>Ніяких штрафів! QLIXA знає всі австрійські дедлайни і нагадає заздалегідь.</div>
            </div>

            {/* Card E — KPI */}
            <div className="feat-card" style={{ gridColumn: '3', gridRow: '2', background: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>📈</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#353434', marginBottom: 10 }}>KPI дашборд та аналітика</div>
              <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6 }}>Відстежуйте ключові показники бізнесу простою мовою — без складних таблиць і зайвих термінів.</div>
            </div>
          </div>

          {/* Bottom note */}
          <div style={{ marginTop: 24, padding: '20px 24px', background: 'rgba(255,112,51,0.06)', borderRadius: 12, textAlign: 'center' }}>
            <span style={{ fontSize: 14, color: '#595959' }}>🚀 QLIXA постійно розвивається — нові можливості з'являються регулярно. Слідкуй за оновленнями!</span>
          </div>
        </div>
      </section>

      {/* ── WHY QLIXA ── */}
      <section style={{ padding: '64px clamp(20px,6vw,80px)', background: '#F4F4F4' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E8', color: '#FF7033', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 999, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>Чому QLIXA</div>
            <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, color: '#353434', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Не просто <em style={{ color: '#FF7033', fontStyle: 'italic' }}>бухгалтерія</em>
            </h2>
            <p style={{ fontSize: 17, color: '#595959', maxWidth: 460, margin: '0 auto' }}>Ми самі іноземці в Австрії. Ми знаємо як це — не розуміти систему.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '52px auto 0' }}>

            {/* ── CARD 1: €800 ── */}
            <div style={{ background: '#FFF0E8', border: '1px solid #FFD4BC', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120 }}>
                {[
                  { top: 12, right: 18, w: 28, cls: 'coinFloat1', dur: '3s',   del: '0s' },
                  { top: 36, right: 52, w: 28, cls: 'coinFloat2', dur: '3.5s', del: '0.5s' },
                  { top: 8,  right: 60, w: 28, cls: 'coinFloat3', dur: '4s',   del: '1s' },
                  { top: 55, right: 20, w: 28, cls: 'coinFloat1', dur: '3.2s', del: '0.7s' },
                  { top: 65, right: 56, w: 20, cls: 'coinFloat2', dur: '2.8s', del: '1.3s' },
                ].map((c, i) => (
                  <div key={i} style={{ position: 'absolute', top: c.top, right: c.right, width: c.w, height: c.w, borderRadius: '50%', background: '#FF7033', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: c.w === 20 ? 9 : 11, fontWeight: 700, color: '#fff', opacity: 0.15, animation: `${c.cls} ${c.dur} ease-in-out infinite ${c.del}` }}>€</div>
                ))}
              </div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 52, color: '#FF7033', lineHeight: 1, marginBottom: 4, animation: 'countUp 2s ease-out forwards' }}>€800</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#353434', marginBottom: 8 }}>Середнє повернення податків на рік</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>Наші користувачі в середньому повертають €800 на рік завдяки грамотному оформленню витрат.</div>
            </div>

            {/* ── CARD 2: 15хв ── */}
            <div style={{ background: '#353434', border: '1px solid #444', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
              <div style={{ position: 'absolute', top: 20, right: 20, width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <circle cx="36" cy="36" r="28" fill="none" stroke="#FF7033" strokeWidth="5" strokeLinecap="round" strokeDasharray="175" strokeDashoffset="175" style={{ animation: 'ringFill 3s ease-out infinite' }} />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.2 }}>15<br />хв</div>
              </div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 52, color: '#fff', lineHeight: 1, marginBottom: 4 }}>15 <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>хв</span></div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>На повний квартальний звіт</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Те що Steuerberater робить за годину, QLIXA — за чверть. Без черг і дорогих консультацій.</div>
            </div>

            {/* ── CARD 3: 0% ── */}
            <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 52, color: '#FF7033', lineHeight: 1, marginBottom: 4 }}>
                0%<span style={{ display: 'inline-block', width: 2, height: 40, background: '#FF7033', marginLeft: 2, verticalAlign: 'middle', animation: 'wBlink 1s step-end infinite' }} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#353434', marginBottom: 8 }}>Знань бухгалтерії не потрібно</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 10 }}>Платформа пояснює кожен крок простою мовою — без термінів і складних форм.</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {[
                  { label: '🇺🇦 UA', delay: '0.1s' },
                  { label: '🇷🇺 RU', delay: '0.25s' },
                  { label: '🇬🇧 EN', delay: '0.4s' },
                  { label: '🇩🇪 DE', delay: '0.55s' },
                ].map(l => (
                  <span key={l.label} style={{ padding: '5px 11px', borderRadius: 100, fontSize: 12, fontWeight: 600, border: '1.5px solid #FFD4BC', color: '#FF7033', background: '#FFF0E8', animation: 'langPop 0.4s ease-out backwards', animationDelay: l.delay }}>{l.label}</span>
                ))}
              </div>
            </div>

            {/* ── CARD 4: 100% ── */}
            <div style={{ background: '#F4F4F4', border: '1px solid #E0E0E0', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { label: 'SVS 2026', delay: '0s' },
                  { label: 'VAT rate', delay: '0.6s' },
                  { label: 'KMU-Paket', delay: '1.2s' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 600, color: 'rgba(53,52,52,0.4)', whiteSpace: 'nowrap' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0, animation: `updatePulse 2s ease-in-out infinite ${item.delay}` }} />
                    {item.label}
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 52, color: '#353434', lineHeight: 1, marginBottom: 4 }}>100%</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#353434', marginBottom: 8 }}>Актуальні австрійські закони</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>Всі розрахунки і гайди оновлюються відповідно до змін австрійського законодавства.</div>
              <div style={{ height: 2, background: 'rgba(53,52,52,0.06)', borderRadius: 1, marginTop: 14, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #22c55e, #16a34a)', animation: 'barFill 3s ease-out infinite' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <ArticlesSlider published={published} upcoming={upcoming} />

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,#FF7033,#FF9500)', padding: '100px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Починай зараз</div>
        <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(38px,5vw,60px)', fontWeight: 400, color: '#fff', margin: '0 0 16px 0', letterSpacing: '-1px' }}>
          Твій перший звіт — за 2 хвилини
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>Без кредитної картки. Без зобов'язань.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-test" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 700, background: '#fff', color: '#FF7033', textDecoration: 'none', display: 'inline-block' }}>
            Спробувати безкоштовно →
          </Link>
          <Link href="/pricing" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 600, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block' }}>
            Переглянути тарифи
          </Link>
        </div>
      </section>

      {/* ── FAQ — after CTA ── */}
      <section id="faq" style={{ padding: '100px clamp(20px,6vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: '#FFF0E8', color: '#FF7033', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 999, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' }}>FAQ</div>
            <h2 style={{ fontFamily: 'DM Serif Display,serif', fontSize: 'clamp(32px,3.5vw,50px)', fontWeight: 400, color: '#353434', margin: 0, letterSpacing: '-0.5px' }}>
              Часті <em style={{ color: '#FF7033', fontStyle: 'italic' }}>запитання</em>
            </h2>
          </div>
          {[
            { icon: '😰', q: 'Я боюся зробити помилку в декларації — що буде?', a: 'QLIXA перевіряє дані перед відправкою і підсвічує підозрілі моменти. Всі гайди написані практикуючими експертами. Якщо щось незрозуміло — є пояснення до кожного поля простою мовою.' },
            { icon: '🇩🇪', q: 'Я не говорю по-німецьки — зможу розібратись?', a: 'Так, саме для цього і створена QLIXA. Платформа повністю доступна українською, російською та англійською. Всі австрійські терміни перекладені і пояснені простими словами.' },
            { icon: '🆕', q: 'Я тільки відкрив Gewerbe. З чого почати?', a: 'Є спеціальний маршрут «Початківцям»: Austria ID → GISA → SVS → FinanzOnline. Кожен крок з поясненням що і навіщо. Плюс автоматичне нагадування про перший звіт.' },
            { icon: '💰', q: 'Що саме я можу списати як витрати?', a: 'Дуже багато: ноутбук, телефон, інтернет, частина оренди (home office), курси, підписки на програми, транспорт до клієнтів і десятки інших категорій. QLIXA покаже всі варіанти для твоєї ситуації.' },
            { icon: '🔒', q: 'Мої фінансові дані в безпеці?', a: 'Так. Сервери в ЄС, відповідність GDPR. Ми не передаємо дані третім особам. Ти можеш видалити акаунт і всі дані в будь-який момент.' },
          ].map((item, i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{item.icon} {item.q}</span>
                <span style={{ color: '#FF7033', fontSize: 20, fontWeight: 400, flexShrink: 0, transition: 'transform 0.2s', display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.75, paddingBottom: 24 }}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
