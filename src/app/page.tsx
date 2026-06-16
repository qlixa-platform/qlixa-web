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

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#F0F7F8', backgroundImage: 'linear-gradient(rgba(3,131,144,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
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
        .hiw-card { background:#fff; border-radius:22px; padding:36px 28px; transition:transform 0.2s,box-shadow 0.2s; position:relative; overflow:hidden }
        .hiw-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(0,0,0,0.10) }
        .hiw-card:hover::before { opacity:1 }
        .hiw-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(3,131,144,0.07),rgba(2,107,118,0.04)); opacity:0; transition:opacity 0.2s; pointer-events:none; border-radius:22px }
        .demo-opt { border:2px solid #eee; border-radius:12px; padding:14px 18px; cursor:pointer; background:#fff; font-size:14px; font-family:DM Sans,sans-serif; text-align:left; transition:all 0.15s; color:#1A1A1A }
        .demo-opt:hover { border-color:#038390; background:#F0F7F8 }
        .demo-opt.selected { border-color:#038390; background:#F0F7F8; color:#038390; font-weight:600 }
        .feat-card { border:1px solid #eee; border-radius:22px; padding:32px 28px; transition:transform 0.2s,box-shadow 0.2s }
        .feat-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,0.08) }
        .wcard { border-radius:20px; padding:36px 28px }
        .faq-item { border-bottom:1px solid #f0f0f0; overflow:hidden }
        .faq-btn { width:100%; background:none; border:none; text-align:left; padding:24px 0; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-family:DM Sans,sans-serif; font-size:17px; font-weight:600; color:#1A1A1A; gap:16px }
        .faq-btn:hover { color:#038390 }
        @keyframes fDashBar { from{width:30%;} to{width:85%;} }
        @keyframes fFillA { 0%{width:0%;} 60%,100%{width:100%;} }
        @keyframes fCheckA { 0%,59%{opacity:0;} 60%,100%{opacity:1;} }
        @keyframes fCalcNum { 0%,100%{opacity:1;} 45%{opacity:0;transform:translateY(-4px);} 55%{opacity:0;transform:translateY(4px);} }
        @keyframes fClockTick { from{stroke-dashoffset:0;} to{stroke-dashoffset:138;} }
        @keyframes fBlink { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
        @keyframes fKpiFill1 { 0%{width:0%;} 70%,100%{width:78%;} }
        @keyframes fKpiFill2 { 0%{width:0%;} 70%,100%{width:45%;} }
        @keyframes fKpiFill3 { 0%{width:0%;} 70%,100%{width:62%;} }
        @keyframes tickerMove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .panel-left { background:#FFFFFF; background-image:linear-gradient(rgba(3,131,144,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(3,131,144,0.04) 1px,transparent 1px); background-size:28px 28px; padding:12px 40px 24px 40px; display:flex; flex-direction:column; justify-content:flex-start; position:relative; overflow:hidden; border-right:1.5px solid rgba(3,131,144,0.15); box-sizing:border-box; }
        .panel-right { background:#F0F7F8; background-image:linear-gradient(rgba(3,131,144,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(3,131,144,0.08) 1px,transparent 1px); background-size:28px 28px; padding:12px 40px 24px 40px; display:flex; flex-direction:column; justify-content:flex-start; position:relative; overflow:hidden; box-sizing:border-box; }
        .hero-cta { display:inline-flex; align-items:center; gap:8px; padding:13px 24px; border-radius:10px; font-size:14px; font-weight:700; text-decoration:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; width:fit-content; }
        .ticker-track { display:flex; animation:tickerMove 42s linear infinite; width:max-content; }
        .ticker-wrap:hover .ticker-track { animation-play-state:paused; }
      `}</style>

      <Navbar />

      {/* ── HERO SPLIT ── */}
      <div style={{ paddingTop: 0 }}>
        {/* ── HERO ── */}
        <section style={{
          background: '#FFFFFF',
          backgroundImage: 'linear-gradient(rgba(3,131,144,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          padding: '52px clamp(20px,6vw,80px) 44px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 920, margin: '0 auto' }}>

            {/* H1 with QLIXA SVG + rest of title */}
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              {/* Line 1: SVG + твій цифровий помічник */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'nowrap' }}>
                <svg style={{ display: 'inline-block', width: 'clamp(140px,18vw,220px)', height: 'auto', verticalAlign: 'middle', marginRight: 8, flexShrink: 0 }} viewBox="0 0 497 116" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="qlx1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                    <linearGradient id="qlx2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                    <linearGradient id="qlx3" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                    <linearGradient id="qlx4" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                    <linearGradient id="qlx5" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                    <linearGradient id="qlx6" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#038390',stopOpacity:1}}/><stop offset="1" style={{stopColor:'#1A1A1A',stopOpacity:1}}/></linearGradient>
                  </defs>
                  <g transform="matrix(1,0,0,1,-194.465,-869.986)">
                    <g transform="matrix(1,0,0,1,-1.84252,-2655.14)">
                      <g transform="matrix(0.697492,0,0,0.697492,-38.2408,2047.54)">
                        <path d="M431.998,2273.76C425.284,2275.99 417.248,2277.11 407.889,2277.11C388.358,2277.11 372.217,2271.28 359.468,2259.62C344.005,2245.58 336.274,2224.96 336.274,2197.77C336.274,2170.37 344.209,2149.65 360.078,2135.61C373.031,2124.15 389.137,2118.42 408.397,2118.42C427.793,2118.42 444.069,2124.49 457.226,2136.63C472.417,2150.67 480.012,2170.3 480.012,2195.53C480.012,2208.89 478.384,2220.08 475.129,2229.1C472.484,2237.71 468.585,2244.87 463.431,2250.56L480.724,2266.74L464.346,2283.83L446.239,2266.74C440.746,2270.06 435.999,2272.4 431.998,2273.76ZM425.284,2246.7L410.127,2232.25L426.301,2215.37L441.458,2229.81C443.832,2224.93 445.493,2220.66 446.443,2216.99C447.935,2211.5 448.681,2205.09 448.681,2197.77C448.681,2180.95 445.239,2167.95 438.356,2158.76C431.472,2149.57 421.418,2144.97 408.194,2144.97C395.784,2144.97 385.882,2149.38 378.49,2158.2C371.098,2167.01 367.402,2180.2 367.402,2197.77C367.402,2218.32 372.692,2233.03 383.271,2241.92C390.121,2247.68 398.327,2250.56 407.889,2250.56C411.483,2250.56 414.942,2250.12 418.265,2249.24C420.096,2248.77 422.436,2247.92 425.284,2246.7Z" fill="url(#qlx1)" fillRule="nonzero"/>
                        <path d="M503.917,2123L535.249,2123L535.249,2245.99L609.508,2245.99L609.508,2272.94L503.917,2272.94L503.917,2123Z" fill="url(#qlx2)" fillRule="nonzero"/>
                        <rect x="628.734" y="2123" width="31.128" height="149.943" fill="url(#qlx3)" fillRule="nonzero"/>
                        <path d="M809.602,2272.94L771.557,2272.94L743.074,2221.88L712.963,2272.94L676.545,2272.94L724.763,2196.55L678.885,2123L716.32,2123L743.074,2171.73L770.539,2123L806.754,2123L760.875,2195.33L809.602,2272.94Z" fill="url(#qlx4)" fillRule="nonzero"/>
                        <g transform="matrix(1.42857,0,0,1.42857,-751.071,1379.87)">
                          <path d="M1098,626L1147,521L1177,575L1259,546C1205.66,573.145 1151.96,599.762 1098,626ZM1129,596L1162,581L1147,557L1129,596Z" fill="url(#qlx5)"/>
                          <g transform="matrix(1,0,0,1,0,-1)">
                            <path d="M1190,604L1197,617L1175,617L1175,612L1190,604Z" fill="url(#qlx6)"/>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(20px,3vw,42px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', whiteSpace: 'nowrap' }}>
                  {' '}твій цифровий помічник
                </span>
              </div>

              {/* Line 2: для життя та бізнесу в Австрії */}
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(20px,3vw,42px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-1px' }}>
                для життя та бізнесу <em style={{ fontStyle: 'italic', color: '#038390' }}>в Австрії.</em>
              </div>
            </div>

            {/* H2 — single line */}
            <p style={{ fontSize: 'clamp(13px,1.4vw,17px)', color: 'rgba(26,26,26,0.6)', fontWeight: 400, whiteSpace: 'nowrap', margin: '0 auto 14px', lineHeight: 1.5, textAlign: 'center' }}>
              Розбирись з податками та бізнесом в Австрії без складних термінів і зайвого стресу.
            </p>

            {/* Slogan — teal marker */}
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(to bottom, transparent 55%, rgba(3,131,144,0.18) 55%, rgba(3,131,144,0.18) 92%, transparent 92%)', paddingLeft: 8, paddingRight: 8 }}>
                просто про складне
              </span>
            </div>

            {/* Chain — bigger pills, single line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', gap: 6, marginBottom: 20, overflowX: 'auto' }}>
              {[
                { icon: '👤', text: 'Повернення податку' },
                { icon: '📄', text: 'Рахунки / Клієнти' },
                { icon: '🧾', text: 'Бухгалтерія' },
                { icon: '📊', text: 'Звіти' },
                { icon: '🏛', text: 'FinanzOnline' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '2px solid #1A1A1A', borderRadius: 12, padding: '9px 16px', boxShadow: '3px 3px 0 #1A1A1A', fontSize: 14, fontWeight: 600, color: '#1A1A1A', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    {item.text}
                  </div>
                  {i < 4 && <span style={{ fontSize: 18, color: '#038390', fontWeight: 700, padding: '0 2px', flexShrink: 0 }}>→</span>}
                </div>
              ))}
            </div>

            {/* Bottom badge + animated arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1A1A1A', borderRadius: 999, padding: '10px 24px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#038390', display: 'inline-block', animation: 'pulse 1.6s infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.3px' }}>Все в одному кабінеті</span>
                <span style={{ fontSize: 14, color: '#038390' }}>✓</span>
              </div>
              <div style={{ fontSize: 22, color: 'rgba(3,131,144,0.5)', lineHeight: 1, animation: 'qFloat 2s ease-in-out infinite' }}>↓</div>
            </div>

          </div>
        </section>
      </div>

      {/* ── TICKER (replaces stats bar) ── */}
      <div className="ticker-wrap" style={{ background: '#1A1A1A', padding: '14px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'linear-gradient(to right, #1A1A1A, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, background: 'linear-gradient(to left, #1A1A1A, transparent)', zIndex: 2 }} />
        <div className="ticker-track">
          {[...Array(2)].flatMap(() => [
            { text: '🌍 4 мови' },
            { text: '💰 Повертай податки легко' },
            { text: '📊 Ми забрали всю бухгалтерську складність на себе' },
            { text: '👥 Клієнти та постачальники під контролем' },
            { text: '🛒 Склад у порядку' },
            { text: '📄 Рахунки одним кліком' },
            { text: '📋 Звіти ПДВ на автопілоті' },
            { text: '📈 KPI під рукою' },
            { text: '🧮 Податки рахуються самі' },
            { text: '📋 Податкова онлайн — без паніки' },
            { text: '🚀 Постійно розвиваємось і додаємо нові можливості' },
            { text: '🧠 Ми знаємо, як це важко — тому зробили максимально просто' },
          ]).map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 28px', fontSize: 18, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Austrian stripe */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #CC0000 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CC0000 66.66%)', width: '100%' }} />

      {/* ── ЩО ТАКЕ QLIXA ── */}
      <section style={{
        background: '#1A1A1A',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        padding: '48px clamp(20px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#fff', background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.4) 55%, rgba(245,230,66,0.4) 92%, transparent 92%)', paddingLeft: 6, paddingRight: 6 }}>
              що таке QLIXA
            </span>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: '#fff', marginTop: 12, marginBottom: 8, letterSpacing: '-0.5px' }}>
              Один кабінет замість купи різних <em style={{ fontStyle: 'italic', color: '#038390' }}>сервісів.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 480, margin: '0 auto' }}>
              QLIXA допомагає іноземцям та малому бізнесу в Австрії розібратися з документами без складних термінів.
            </p>
          </div>

          {/* 7 feature pills grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '💰', title: 'Повернення податку', text: 'Заповни анкету — QLIXA знайде всі списання і розрахує суму повернення.' },
              { icon: '📄', title: 'Рахунки та клієнти', text: 'Створюй рахунки, додавай клієнтів і постачальників в кілька кліків.' },
              { icon: '🧾', title: 'Бухгалтерія', text: 'Доходи, витрати, прибуток — все в реальному часі без таблиць Excel.' },
              { icon: '📊', title: 'Звіти та декларації', text: 'Декларації з доходів та ПДВ заповнюються автоматично.' },
              { icon: '🏛', title: 'FinanzOnline', text: 'Більше не потрібно розбиратися в FinanzOnline — QLIXA підкаже що робити.' },
              { icon: '🔔', title: 'Дедлайни і нагадування', text: 'Жодного штрафу — QLIXA знає всі австрійські дедлайни і нагадає заздалегідь.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14, transition: 'background 0.2s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(3,131,144,0.2)', border: '1px solid rgba(3,131,144,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ДЛЯ КОГО ── */}
      <section style={{
        background: '#F0F7F8',
        backgroundImage: 'linear-gradient(rgba(3,131,144,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}>
        {/* Section eyebrow */}
        <div style={{ textAlign: 'center', padding: '32px 20px 0' }}>
          <span style={{
            fontFamily: 'Caveat, cursive',
            fontSize: 26,
            fontWeight: 700,
            color: '#1A1A1A',
            background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.55) 55%, rgba(245,230,66,0.55) 92%, transparent 92%)',
            paddingLeft: 6,
            paddingRight: 6,
          }}>для кого</span>
        </div>

        {/* Two panels side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>

          {/* LEFT panel */}
          <div className="panel-left">
            {/* Tag */}
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#038390', borderBottom: '2px solid #038390', paddingBottom: 3, display: 'inline-block', marginBottom: 6 }}>
              🏢 Ти власник малого бізнесу?
            </div>

            {/* Main headline — 2 lines */}
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.4vw,34px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 4, letterSpacing: '-0.5px' }}>
              Контролюй бізнес самостійно —<br/>
              <em style={{ fontStyle: 'italic', color: '#038390' }}>без хаосу та зайвих витрат.</em>
            </h2>

            {/* Subtitle */}
            <div style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)', fontWeight: 400, marginBottom: 6 }}>
              Простою мовою та в одному зрозумілому кабінеті.
            </div>

            {/* Description with hand-drawn underline */}
            <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
              <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.6, fontWeight: 500 }}>
                Забудь про вивчення бухгалтерії - QLIXA покаже крок за кроком як зробити все просто!
              </div>
              <svg style={{ display: 'block', marginTop: 3 }} height="6" viewBox="0 0 400 6" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%">
                <path d="M0 4 Q50 1 100 3 Q150 5 200 3 Q250 1 300 4 Q350 5 400 3" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M0 5 Q60 3 120 4 Q180 5 240 3 Q300 4 400 4" stroke="rgba(26,26,26,0.15)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              </svg>
            </div>

            {/* €450+ + handwritten label side by side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(38px,4.5vw,62px)', color: '#038390', lineHeight: 1, fontWeight: 400 }}>€450+</span>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.35, maxWidth: 360 }}>
                середня економія на бухгалтерських послугах щороку*
              </div>
            </div>

            {/* Checklist — 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginBottom: 10 }}>
              {[
                'Автоматичні нагадування про важливі дедлайни',
                'Рахунки, клієнти та склад — в одному інтерфейсі',
                'Бачиш ключові показники бізнесу в реальному часі',
                'Звіти ПДВ та податкова онлайн — без паніки',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, fontWeight: 500, color: '#1A1A1A', minHeight: 36 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(3,131,144,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: '#038390', fontWeight: 700, marginTop: 1 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/free-test" className="hero-cta" style={{ background: '#1A1A1A', color: '#fff', fontSize: 14, padding: '11px 22px', borderRadius: 10, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 0 }}>
              Перейти на платформу →
            </Link>
          </div>

          {/* RIGHT panel */}
          <div className="panel-right">
            {/* Tag */}
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: '#038390', borderBottom: '2px solid #038390', paddingBottom: 3, display: 'inline-block', marginBottom: 6 }}>
              👤 Ти найманий працівник?
            </div>

            {/* Main headline */}
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.4vw,34px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, marginBottom: 4, letterSpacing: '-0.5px' }}>
              Поверни свій податок —<br/>
              <em style={{ fontStyle: 'italic', color: '#038390' }}>це простіше, ніж здається.</em>
            </h2>

            {/* Subtitle */}
            <div style={{ fontSize: 13, color: 'rgba(26,26,26,0.5)', fontWeight: 400, marginBottom: 6 }}>
              Без складних термінів і зайвого стресу.
            </div>

            {/* Description with hand-drawn underline */}
            <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
              <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.6, fontWeight: 500 }}>
                З тебе кілька відповідей — QLIXA знайде всі списання і покаже скільки повернути.
              </div>
              <svg style={{ display: 'block', marginTop: 3 }} height="6" viewBox="0 0 400 6" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%">
                <path d="M0 4 Q50 1 100 3 Q150 5 200 3 Q250 1 300 4 Q350 5 400 3" stroke="rgba(26,26,26,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M0 5 Q60 3 120 4 Q180 5 240 3 Q300 4 400 4" stroke="rgba(26,26,26,0.15)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              </svg>
            </div>

            {/* €800 + handwritten label side by side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(38px,4.5vw,62px)', color: '#038390', lineHeight: 1, fontWeight: 400 }}>€800</span>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.35, maxWidth: 360 }}>
                середня сума повернення податку в Австрії щороку
              </div>
            </div>

            {/* Checklist — 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginBottom: 10 }}>
              {[
                'Індивідуальний розрахунок',
                'Всі можливі списання враховані',
                'Результат за 15 хвилин',
                'Без термінів — твоєю мовою',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, fontWeight: 500, color: '#1A1A1A', minHeight: 36 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(3,131,144,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: '#038390', fontWeight: 700, marginTop: 1 }}>✓</div>
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/free-test" className="hero-cta" style={{ background: '#038390', color: '#fff', boxShadow: '0 4px 14px rgba(3,131,144,0.3)', fontSize: 14, padding: '11px 22px', borderRadius: 10, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 0 }}>
              Розрахувати моє повернення →
            </Link>
          </div>

        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" style={{ padding: '32px clamp(20px,6vw,80px)', background: '#FFFFFF', backgroundImage: 'linear-gradient(rgba(3,131,144,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.55) 55%, rgba(245,230,66,0.55) 92%, transparent 92%)', paddingLeft: 4, paddingRight: 4 }}>Як це працює</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: '#1A1A1A', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Все просто — нарешті <em style={{ fontStyle: 'italic', color: '#038390' }}>жодних складних термінів</em>
            </h2>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '24px auto 0', maxWidth: 900 }}>
              {/* ── Shared styles via inline style tag ── */}
              <style>{`
                @keyframes kCheckDraw  { from{stroke-dashoffset:20} to{stroke-dashoffset:0} }
                @keyframes kCheckFill  { 0%{background:transparent} 100%{background:#038390} }
                @keyframes kRowIn      { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
                @keyframes kFadeIn     { from{opacity:0} to{opacity:1} }
                @keyframes kProgFill   { from{width:0} to{width:72%} }
                @keyframes kScanMove   { 0%{top:38px} 100%{top:110px} }
                @keyframes kGlowPulse  { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
                @keyframes kEuroIn     { 0%{opacity:0;transform:translateX(-50%) scale(0.7)} 60%{transform:translateX(-50%) scale(1.06)} 100%{opacity:1;transform:translateX(-50%) scale(1)} }
                @keyframes kCheckCircle{ 0%,50%{stroke-dashoffset:107;opacity:0} 100%{stroke-dashoffset:0;opacity:1} }
                @keyframes kCheckMark  { 0%,65%{stroke-dashoffset:28;opacity:0} 100%{stroke-dashoffset:0;opacity:1} }
                @keyframes kResultCard { 0%,55%{opacity:0;transform:translateY(6px)} 80%{transform:translateY(-2px)} 100%{opacity:1;transform:translateY(0)} }
                @keyframes kBirdBob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
                @keyframes kPupilBlink { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.05)} }
                @keyframes kSparkle    { 0%,100%{opacity:0.2} 50%{opacity:0.7} }
                .ksp { position:absolute; border-radius:50%; background:rgba(255,255,255,0.4); animation:kSparkle 2.5s ease-in-out infinite; }
                .k-cbtick { stroke-dasharray:20; stroke-dashoffset:20; }
                .kcbr:nth-child(1) .k-cbtick { animation:kCheckDraw .22s .18s ease-out forwards; }
                .kcbr:nth-child(2) .k-cbtick { animation:kCheckDraw .22s .36s ease-out forwards; }
                .kcbr:nth-child(3) .k-cbtick { animation:kCheckDraw .22s .54s ease-out forwards; }
                .kcbr:nth-child(1) .k-cbb { animation:kCheckFill .2s .16s ease-out forwards; border-color:#038390; }
                .kcbr:nth-child(2) .k-cbb { animation:kCheckFill .2s .34s ease-out forwards; border-color:#038390; }
                .kcbr:nth-child(3) .k-cbb { animation:kCheckFill .2s .52s ease-out forwards; border-color:#038390; }
                .kcbr:nth-child(1) { animation:kRowIn .3s .1s ease-out both; }
                .kcbr:nth-child(2) { animation:kRowIn .3s .28s ease-out both; }
                .kcbr:nth-child(3) { animation:kRowIn .3s .46s ease-out both; }
                .kcbr:nth-child(4) { animation:kRowIn .3s .64s ease-out both; }
                .k-dl:nth-child(2) { animation:kRowIn .3s .1s ease-out both; }
                .k-dl:nth-child(3) { animation:kRowIn .3s .2s ease-out both; }
                .k-dl:nth-child(4) { animation:kRowIn .3s .3s ease-out both; }
                .k-dl:nth-child(5) { animation:kRowIn .3s .4s ease-out both; }
              `}</style>

              {[
                { num: '1', label: 'Розкажи про себе',   sub: 'Відповідай на питання — QLIXA знає твою ситуацію' },
                { num: '2', label: 'QLIXA аналізує',     sub: 'Знаходить всі списання і можливості повернути більше' },
                { num: '3', label: 'Отримай результат',  sub: 'QLIXA покаже скільки ти можеш повернути' },
                { num: '4', label: 'Крок за кроком',     sub: 'QLIXA покаже що робити далі — крок за кроком і твоєю мовою' },
              ].map((card, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  {/* Illustration box */}
                  <div style={{ width: '100%', maxWidth: 200, aspectRatio: '1/1.1', borderRadius: 20, background: 'linear-gradient(150deg,#038390,#026B76)', position: 'relative', overflow: 'hidden', boxShadow: '4px 4px 0 #1A1A1A', border: '1.5px solid #1A1A1A' }}>
                    {/* bg circle */}
                    <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: -45, right: -35, pointerEvents: 'none' }} />
                    {/* step badge */}
                    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 30, width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{card.num}</div>
                    {/* sparkles */}
                    <div className="ksp" style={{ width: 4, height: 4, top: 12, right: 14, animationDelay: `${idx * 0.3}s` }} />
                    <div className="ksp" style={{ width: 3, height: 3, bottom: 18, left: 10, animationDelay: `${idx * 0.3 + 1}s` }} />

                    {/* ── CARD 1: Form ── */}
                    {idx === 0 && (
                      <div style={{ position: 'absolute', left: 12, right: 12, top: 34, bottom: 12, background: '#fff', borderRadius: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', overflow: 'hidden', animation: 'kFadeIn .4s ease-out both' }}>
                        <div style={{ height: 26, background: '#E6F4F5', borderBottom: '2px solid #038390', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 5 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#038390' }} />
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(3,131,144,0.3)' }} />
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(3,131,144,0.3)' }} />
                        </div>
                        <div style={{ padding: '8px 10px 6px' }}>
                          {[
                            { done: true,  w: '100%', w2: '60%' },
                            { done: true,  w: '100%', w2: '50%' },
                            { done: true,  w: '100%', w2: '65%' },
                            { done: false, w: '65%',  w2: null },
                          ].map((row, i) => (
                            <div key={i} className="kcbr" style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: i < 3 ? 7 : 0 }}>
                              <div className="k-cbb" style={{ width: 13, height: 13, flexShrink: 0, borderRadius: 3, border: `2px solid ${row.done ? '#038390' : 'rgba(3,131,144,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
                                {row.done && <svg width="9" height="9" viewBox="0 0 9 9"><path className="k-cbtick" d="M1.5 4.5L3.5 6.5L7.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                              </div>
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div style={{ height: 2.5, background: 'rgba(26,26,26,0.18)', borderRadius: 1.5, width: row.done ? row.w : 0, animation: row.done ? undefined : `kProgFill .5s .7s ease-out forwards`, maxWidth: row.w }} />
                                {row.w2 && <div style={{ height: 2, background: 'rgba(26,26,26,0.12)', borderRadius: 1, width: row.w2 }} />}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ margin: '4px 10px 8px', height: 3, background: 'rgba(3,131,144,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#038390', borderRadius: 2, width: 0, animation: 'kProgFill 1.2s .3s ease-out both', maxWidth: '72%' }} />
                        </div>
                      </div>
                    )}

                    {/* ── CARD 2: Magnifier + Bird ── */}
                    {idx === 1 && (<>
                      {/* Document */}
                      <div style={{ position: 'absolute', left: 12, right: 12, top: 34, background: '#fff', borderRadius: 10, padding: '10px 11px', boxShadow: '0 3px 12px rgba(0,0,0,0.15)', animation: 'kFadeIn .35s ease-out both', zIndex: 5 }}>
                        <div style={{ height: 3, background: '#038390', borderRadius: 2, width: '48%', marginBottom: 8 }} />
                        {[95,80,90,65].map((w,i) => (
                          <div key={i} className="k-dl" style={{ height: 2, borderRadius: 1, marginBottom: i < 3 ? 5 : 0, background: 'rgba(26,26,26,0.15)', width: `${w}%` }} />
                        ))}
                      </div>
                      {/* Scan beam */}
                      <div style={{ position: 'absolute', left: 12, right: 12, height: 9, background: 'rgba(3,131,144,0.22)', borderRadius: 2, zIndex: 8, top: 38, animation: 'kScanMove 2s .5s ease-in-out infinite alternate, kGlowPulse 2s .5s ease-in-out infinite alternate' }} />
                      {/* Magnifier */}
                      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'kBirdBob 3s ease-in-out infinite' }}>
                        <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                          <circle cx="30" cy="30" r="22" fill="rgba(230,244,245,0.9)" stroke="#038390" strokeWidth="3.5"/>
                          <circle cx="30" cy="30" r="15" fill="rgba(3,131,144,0.08)"/>
                          <line x1="19" y1="27" x2="41" y2="27" stroke="rgba(3,131,144,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
                          <line x1="19" y1="32" x2="38" y2="32" stroke="rgba(3,131,144,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="19" y1="37" x2="34" y2="37" stroke="rgba(3,131,144,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="47" y1="47" x2="62" y2="62" stroke="#026B76" strokeWidth="6" strokeLinecap="round"/>
                          <line x1="45" y1="45" x2="49" y2="49" stroke="#038390" strokeWidth="7" strokeLinecap="round"/>
                        </svg>
                      </div>
                      {/* Bird — bottom right */}
                      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 56, height: 56, zIndex: 10, animation: 'kBirdBob 2.5s ease-in-out infinite' }}>
                        <svg viewBox="0 0 216 179" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                          <g transform="matrix(1,0,0,1,-331.739,-513.78)"><g transform="matrix(1,0,0,1,-1031.84,-2073.86)"><g transform="matrix(0.426904,0,0,0.426904,1196.23,1887.93)">
                            <g transform="matrix(1,0,0,1,-1.11513,-1.11513)"><path d="M758.991,1970.08C735.058,1988.79 820.002,1893.1 802.68,1921.23L896,1962C898.943,1969.69 899.011,1977.03 896,1984L836,2036C829.333,2037.33 822.667,2037.49 816,2036L758.991,1970.08Z" fill="white"/></g>
                            <g transform="matrix(2.66643,0,0,2.59131,-506.392,288.944)"><ellipse cx="432" cy="592" rx="69" ry="71" fill="white"/></g>
                            <g transform="matrix(-1.82722,0.262373,-0.223264,-1.55486,1356.13,2923.82)"><path d="M336,615L348,658L324,658L336,615Z" fill="white"/></g>
                            <g transform="matrix(-1.81445,0.339609,-0.288988,-1.54399,1456.92,2893.29)"><path d="M336,615L348,658L324,658L336,615Z" fill="white"/></g>
                            <g transform="matrix(0.432204,0,0,0.432204,-175.949,1377.11)">
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3275.79)"><path d="M2022.83,980.071C2022.83,980.071 2010.13,970.547 2004.95,980.071L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,980.071Z" fill="#1A1A1A"/></g>
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3226.79)"><path d="M2022.83,980.071C2022.83,980.071 2010.13,970.547 2004.95,980.071L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,980.071Z" fill="#1A1A1A"/></g>
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3180.79)"><path d="M2022.83,1103.07C2022.83,1103.07 2010.13,1093.55 2004.95,1103.07L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,1103.07Z" fill="#1A1A1A"/></g>
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3130.79)"><path d="M2022.83,1103.07C2022.83,1103.07 2010.13,1093.55 2004.95,1103.07L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,1103.07Z" fill="#1A1A1A"/></g>
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3082.79)"><path d="M2022.83,1103.07C2022.83,1103.07 2010.13,1093.55 2004.95,1103.07L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,1103.07Z" fill="#1A1A1A"/></g>
                              <g transform="matrix(6.12323e-17,-1,1,6.12323e-17,973.636,3032.79)"><path d="M2022.83,1103.07C2022.83,1103.07 2010.13,1093.55 2004.95,1103.07L2004.95,1203.21C2011.85,1212.5 2017.66,1211.73 2022.62,1203.21L2022.83,1103.07Z" fill="#1A1A1A"/></g>
                            </g>
                            <path d="M467.454,1779.77L392,1695L504.432,1706.69L467.454,1779.77Z" fill="rgb(204,0,0)"/>
                            <path d="M490,1832C496.683,1733.57 552.699,1683.52 648,1672C628.425,1726.08 628.121,1779.39 645,1832C591.363,1807.93 539.611,1806.89 490,1832Z" fill="#1A1A1A"/>
                            <g transform="matrix(0.984252,0,0,0.984252,12.7559,27.9134)" style={{ transformOrigin: '580px 1733px', animation: 'kPupilBlink 3.5s ease-in-out infinite' }}><circle cx="580" cy="1733" r="24" fill="white"/></g>
                          </g></g></g>
                        </svg>
                      </div>
                    </>)}

                    {/* ── CARD 3: Euro + result ── */}
                    {idx === 2 && (<>
                      <div style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', animation: 'kEuroIn .6s .2s cubic-bezier(.34,1.56,.64,1) both' }}>
                        <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 72, color: '#fff', lineHeight: 1, textShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>€</div>
                      </div>
                      <div style={{ position: 'absolute', top: 112, left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'kFadeIn .3s .65s ease-out both' }}>
                        <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
                          <circle cx="20" cy="20" r="17" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
                          <circle cx="20" cy="20" r="17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="107" strokeDashoffset="107" style={{ animation: 'kCheckCircle .55s .6s ease-out forwards' }}/>
                          <path d="M11 20L17 26L29 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="28" strokeDashoffset="28" style={{ animation: 'kCheckMark .35s 1.1s ease-out forwards' }}/>
                        </svg>
                      </div>
                      <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: '#fff', borderRadius: 10, padding: '8px 11px', boxShadow: '3px 3px 0 rgba(26,26,26,0.25)', border: '1px solid rgba(26,26,26,0.12)', zIndex: 10, animation: 'kResultCard .5s .9s cubic-bezier(.34,1.56,.64,1) both' }}>
                        <div style={{ fontSize: 9, color: 'rgba(26,26,26,0.45)', fontWeight: 500, marginBottom: 2 }}>Ваше повернення</div>
                        <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#038390', lineHeight: 1 }}>€640</div>
                        <div style={{ display: 'inline-block', background: '#EBF5EE', color: '#16a34a', fontSize: 8, fontWeight: 700, padding: '2px 7px', borderRadius: 4, marginTop: 4 }}>✓ Розраховано</div>
                      </div>
                    </>)}

                    {/* ── CARD 4: Steps list ── */}
                    {idx === 3 && (
                      <div style={{ position: 'absolute', left: 12, right: 12, top: 34, bottom: 12, background: '#fff', borderRadius: 10, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', overflow: 'hidden', animation: 'kFadeIn .4s ease-out both', padding: '10px 11px' }}>
                        {[
                          { n: '1', label: 'Обери тип зайнятості', done: true },
                          { n: '2', label: 'Додай документи', done: true },
                          { n: '3', label: 'Надішли декларацію', done: false },
                          { n: '4', label: 'Отримай підтвердження', done: false },
                        ].map((step, i) => (
                          <div key={i} className="k-dl" style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: i < 3 ? 8 : 0 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: step.done ? '#038390' : 'rgba(3,131,144,0.15)', border: `1.5px solid ${step.done ? '#038390' : 'rgba(3,131,144,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 8, fontWeight: 700, color: step.done ? '#fff' : 'rgba(3,131,144,0.6)' }}>
                              {step.done ? '✓' : step.n}
                            </div>
                            <div style={{ flex: 1, height: 2.5, background: step.done ? 'rgba(3,131,144,0.35)' : 'rgba(26,26,26,0.12)', borderRadius: 1.5 }} />
                            <div style={{ fontSize: 7, color: step.done ? '#038390' : 'rgba(26,26,26,0.35)', fontWeight: 600, whiteSpace: 'nowrap', maxWidth: 58, textAlign: 'right', lineHeight: 1.3 }}>{step.label}</div>
                          </div>
                        ))}
                        <div style={{ marginTop: 8, height: 3, background: 'rgba(3,131,144,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', background: '#038390', borderRadius: 2, animation: 'kProgFill 1.4s .3s ease-out both', maxWidth: '50%' }} />
                        </div>
                      </div>
                    )}

                  </div>
                  {/* Label */}
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginTop: 12, marginBottom: 3 }}>{card.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(26,26,26,0.55)', textAlign: 'center', lineHeight: 1.5, maxWidth: 170 }}>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            {/* LEFT */}
            <div>
              {/* Step 1 */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#038390', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>Який тип зайнятості в Австрії?</span>
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
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 1 ? '#038390' : '#eee', color: demoStep >= 1 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>Який приблизний річний дохід? (€)</span>
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
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 2 ? '#038390' : '#eee', color: demoStep >= 2 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>Що маєш для списання? <span style={{ fontSize: 12, color: '#6B6B6B', fontWeight: 400 }}>(можна кілька)</span></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['💻 Ноутбук / техніка', '🏠 Home office', '📚 Курси / навчання', '🚗 Транспорт до клієнтів'].map(opt => (
                    <button key={opt} className={`demo-opt${s3Selections.includes(opt) ? ' selected' : ''}`} onClick={() => toggleS3(opt)}>{opt}</button>
                  ))}
                </div>
                {s3Selections.length > 0 && demoStep < 3 && (
                  <button onClick={() => setDemoStep(3)} style={{ marginTop: 12, padding: '10px 22px', borderRadius: 10, background: '#038390', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'DM Sans,sans-serif' }}>
                    Далі →
                  </button>
                )}
              </div>

              {/* Step 4 */}
              <div style={{ opacity: demoStep >= 3 ? 1 : 0.35, transition: 'opacity 0.3s', pointerEvents: demoStep >= 3 ? 'auto' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: demoStep >= 3 ? '#038390' : '#eee', color: demoStep >= 3 ? '#fff' : '#999', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>Чи подавав декларацію раніше?</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['✅ Так, подавав', '🆕 Ні, вперше'].map(opt => (
                    <button key={opt} className={`demo-opt${s4 === opt ? ' selected' : ''}`} onClick={() => { setS4(opt); setDemoStep(4) }}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — result panel */}
            <div style={{ background: '#1A1A1A', borderRadius: 24, padding: '32px', minHeight: 420 }}>
              {demoComplete ? (
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginBottom: 8 }}>Очікуване повернення</div>
                  <div style={{ fontSize: 64, fontFamily: 'DM Serif Display,serif', lineHeight: 1, marginBottom: 4 }}>
                    <span style={{ color: '#fff' }}>€</span><span style={{ color: '#038390' }}>{countVal.toLocaleString()}</span>
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
                  <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(3,131,144,0.15)', border: '1px solid rgba(3,131,144,0.3)', borderRadius: 10, fontSize: 12, color: '#038390', lineHeight: 1.5 }}>
                    ⚠️ Це ознайомчий розрахунок. Реальна сума залежить від вашої унікальної ситуації та документів.
                  </div>
                  <Link href="/pricing" style={{ display: 'block', marginTop: 14, background: 'linear-gradient(135deg,#038390,#026B76)', color: '#fff', textAlign: 'center', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Отримати повний розрахунок →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 320, gap: 0 }}>
                  {/* Logo mark with pulse rings */}
                  <div style={{ position: 'relative', marginBottom: 32 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(3,131,144,0.3)', animation: 'qPulse1 2s ease-out infinite' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(3,131,144,0.2)', animation: 'qPulse1 2s ease-out infinite 0.6s' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(3,131,144,0.1)', animation: 'qPulse1 2s ease-out infinite 1.2s' }} />
                    <div style={{ width: 56, height: 56, background: 'transparent', position: 'relative', zIndex: 1, animation: 'qFloat 3s ease-in-out infinite' }}>
                      <Image src="/logos/logo-bird.svg" alt="QLIXA" width={56} height={46} style={{ display: 'block' }} />
                    </div>
                  </div>
                  {/* Scanning bar */}
                  <div style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', marginBottom: 24 }}>
                    <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, #038390, transparent)', borderRadius: 2, animation: 'qScan 1.8s ease-in-out infinite' }} />
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
                      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#038390', animation: 'qDot 1.4s ease-in-out infinite', animationDelay: `${i * 0.15}s`, opacity: 0.3 }} />
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

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '32px clamp(20px,6vw,80px)', background: '#FFFFFF', backgroundImage: 'linear-gradient(rgba(3,131,144,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.55) 55%, rgba(245,230,66,0.55) 92%, transparent 92%)', paddingLeft: 4, paddingRight: 4 }}>щодня з QLIXA</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: '#1A1A1A', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
              Як QLIXA <em style={{ fontStyle: 'italic', color: '#038390' }}>допомагає щодня</em>
            </h2>
            <p style={{ fontSize: 17, color: '#3D3D3D' }}>Без паніки. Без помилок. Твоєю мовою.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 14 }}>

            {/* Card A — Dashboard, spans 2 rows */}
            <div style={{ gridColumn: '1', gridRow: '1 / 3', background: '#F0F7F8', border: '1px solid #A8DDE2', borderRadius: 18, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'inline-block', background: '#038390', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 5, marginBottom: 12, letterSpacing: '.5px' }}>Головне</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Твій особистий фінансовий кабінет</div>
              <div style={{ fontSize: 12, color: '#3D3D3D', lineHeight: 1.6 }}>Повний фінансовий дашборд: доходи, витрати, прибуток — все в реальному часі. Клієнти, постачальники, рахунки.</div>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'Дохід червень',   value: '€4 280',   valueColor: '#1A1A1A',  badge: null },
                  { label: 'Списані витрати', value: '€1 140',   valueColor: '#038390',  badge: null },
                  { label: 'До повернення',   value: '€640',     valueColor: '#22c55e',  badge: null },
                  { label: 'Звіт ПДВ Q2',     value: null, badge: { text: '✓ Готово', bg: '#EBF5EE', color: '#16a34a' } },
                  { label: 'SVS Formular',    value: null, badge: { text: '⏳ Скоро',  bg: '#F0F7F8', color: '#038390' } },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(3,131,144,0.06)', borderRadius: 7, padding: '7px 10px' }}>
                    <span style={{ fontSize: 11, color: '#3D3D3D' }}>{row.label}</span>
                    {row.badge
                      ? <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: row.badge.bg, color: row.badge.color }}>{row.badge.text}</span>
                      : <span style={{ fontSize: 12, fontWeight: 600, color: row.valueColor }}>{row.value}</span>
                    }
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, height: 4, background: 'rgba(3,131,144,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#038390', borderRadius: 2, animation: 'fDashBar 2.5s ease-in-out infinite alternate' }} />
              </div>
              <div style={{ fontSize: 10, color: 'rgba(26,26,26,0.65)', fontStyle: 'italic', marginTop: 10 }}>* Інтерфейс для ознайомлення. Реальний дашборд — після реєстрації.</div>
            </div>

            {/* Card B — Auto-fill */}
            <div style={{ gridColumn: '2', gridRow: '1', background: '#fff', border: '1px solid #E8E8E8', borderRadius: 18, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Не заповнюй декларації вручну — QLIXA зробить це швидше</div>
              <div style={{ fontSize: 12, color: '#3D3D3D', lineHeight: 1.6 }}>Декларації з доходів та ПДВ — автоматично. Просто перевір і відправ.</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ height: 22, borderRadius: 5, background: '#F4F4F4', border: '1px solid #E8E8E8', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'rgba(3,131,144,0.15)', borderRadius: 5, animation: `fFillA 2s ease-out infinite ${i * 0.4}s` }} />
                    <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#22c55e', opacity: 0, animation: `fCheckA 2s ease-out infinite ${i * 0.4}s` }}>✓</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                {['Податок з доходів', 'ПДВ', 'Автозаповнення'].map(t => (
                  <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, background: '#F4F4F4', color: '#3D3D3D', border: '1px solid #E8E8E8' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Card C — Calculators */}
            <div style={{ gridColumn: '3', gridRow: '1', background: '#fff', border: '1px solid #E8E8E8', borderRadius: 18, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Калькулятори податків</div>
              <div style={{ fontSize: 12, color: '#3D3D3D', lineHeight: 1.6 }}>Точний розрахунок капітальних та інших доходів для вашої ситуації.</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { label: 'Капітальні доходи', value: '€2 340', delay: '0s' },
                  { label: 'Податок',            value: '€468',   delay: '0.6s' },
                  { label: 'До повернення',      value: '€190',   delay: '1.2s' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 8px', background: '#F4F4F4', borderRadius: 6 }}>
                    <span style={{ fontSize: 11, color: '#3D3D3D' }}>{row.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#038390', fontFamily: 'DM Serif Display, serif', animation: `fCalcNum 3s ease-in-out infinite ${row.delay}` }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card D — Deadlines */}
            <div style={{ gridColumn: '2', gridRow: '2', background: '#1A1A1A', border: '1px solid #444', borderRadius: 18, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, width: 56, height: 56 }}>
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#038390" strokeWidth="4" strokeLinecap="round" strokeDasharray="138" strokeDashoffset="0" style={{ animation: 'fClockTick 4s linear infinite' }} />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.2 }}>SVS<br />30 лип</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Дедлайни і нагадування</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 120 }}>Ніяких штрафів — QLIXA нагадає заздалегідь.</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { dot: '#ef4444', anim: 'fBlink 1.5s ease-in-out infinite 0s',   text: 'SVS — 30 лип' },
                  { dot: '#038390', anim: 'fBlink 1.5s ease-in-out infinite 0.5s', text: 'Звіт ПДВ Q3 — 15 серп' },
                  { dot: '#22c55e', anim: '',                                        text: 'ESt — подано ✓' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: item.dot, animation: item.anim || undefined }} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Card E — KPI */}
            <div style={{ gridColumn: '3', gridRow: '2', background: '#F4F4F4', border: '1px solid #E0E0E0', borderRadius: 18, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Фінансова картина бізнесу</div>
              <div style={{ fontSize: 12, color: '#3D3D3D', lineHeight: 1.6 }}>Скільки заробив, витратив і скільки залишилось — все одразу.</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { label: 'Дохід',   pct: '78%', anim: 'fKpiFill1 2.5s ease-out forwards' },
                  { label: 'Витрати', pct: '45%', anim: 'fKpiFill2 2.5s ease-out 0.4s forwards' },
                  { label: 'Прибуток',pct: '62%', anim: 'fKpiFill3 2.5s ease-out 0.8s forwards' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#3D3D3D' }}>
                      <span>{row.label}</span><span>{row.pct}</span>
                    </div>
                    <div style={{ height: 5, background: '#E8E8E8', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 3, background: '#038390', animation: row.anim }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom note */}
          <div style={{ marginTop: 24, padding: '20px 24px', background: 'rgba(3,131,144,0.08)', borderRadius: 12, textAlign: 'center', border: '1px solid rgba(3,131,144,0.2)' }}>
            <span style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>🚀 <strong style={{ color: '#038390' }}>QLIXA постійно розвивається</strong> — нові можливості з&apos;являються регулярно. Слідкуй за оновленнями!</span>
          </div>
        </div>
      </section>

      {/* ── WHY QLIXA ── */}
      <section style={{ padding: '64px clamp(20px,6vw,80px)', background: '#FFFFFF', backgroundImage: 'linear-gradient(rgba(3,131,144,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <style>{`
          @keyframes why-s1 { 0%{opacity:0} 2%{opacity:1} 17%{opacity:1} 20%{opacity:0} 100%{opacity:0} }
          @keyframes why-s2 { 0%{opacity:0} 20%{opacity:0} 22%{opacity:1} 37%{opacity:1} 40%{opacity:0} 100%{opacity:0} }
          @keyframes why-s3 { 0%{opacity:0} 40%{opacity:0} 42%{opacity:1} 57%{opacity:1} 60%{opacity:0} 100%{opacity:0} }
          @keyframes why-s4 { 0%{opacity:0} 60%{opacity:0} 62%{opacity:1} 77%{opacity:1} 80%{opacity:0} 100%{opacity:0} }
          @keyframes why-s5 { 0%{opacity:0} 80%{opacity:0} 82%{opacity:1} 98%{opacity:1} 100%{opacity:0} }
          .why-scene { position:absolute; inset:0; opacity:0; pointer-events:none; }
          .why-s1 { animation: why-s1 24s ease-in-out infinite; }
          .why-s2 { animation: why-s2 24s ease-in-out infinite; }
          .why-s3 { animation: why-s3 24s ease-in-out infinite; }
          .why-s4 { animation: why-s4 24s ease-in-out infinite; }
          .why-s5 { animation: why-s5 24s ease-in-out infinite; }
          @keyframes why-t1 { 0%{opacity:0} 2%{opacity:1} 17%{opacity:1} 20%{opacity:0} 100%{opacity:0} }
          @keyframes why-t2 { 0%{opacity:0} 20%{opacity:0} 22%{opacity:1} 37%{opacity:1} 40%{opacity:0} 100%{opacity:0} }
          @keyframes why-t3 { 0%{opacity:0} 40%{opacity:0} 42%{opacity:1} 57%{opacity:1} 60%{opacity:0} 100%{opacity:0} }
          @keyframes why-t4 { 0%{opacity:0} 60%{opacity:0} 62%{opacity:1} 77%{opacity:1} 80%{opacity:0} 100%{opacity:0} }
          @keyframes why-t5 { 0%{opacity:0} 80%{opacity:0} 82%{opacity:1} 98%{opacity:1} 100%{opacity:0} }
          .why-text { position:absolute; inset:0; opacity:0; }
          .why-t1 { animation: why-t1 24s ease-in-out infinite; }
          .why-t2 { animation: why-t2 24s ease-in-out infinite; }
          .why-t3 { animation: why-t3 24s ease-in-out infinite; }
          .why-t4 { animation: why-t4 24s ease-in-out infinite; }
          .why-t5 { animation: why-t5 24s ease-in-out infinite; }
          @keyframes why-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.015)} }
          @keyframes why-blink { 0%,88%,100%{transform:scaleY(1)} 92%{transform:scaleY(0.06)} }
          @keyframes why-tail { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(3deg)} 70%{transform:rotate(-2deg)} }
          @keyframes why-tilt { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-4deg)} 70%{transform:rotate(3deg)} }
          @keyframes why-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes why-cloud1 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(14px)} }
          @keyframes why-cloud2 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-10px)} }
          @keyframes why-suitcase { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-4deg)} 70%{transform:rotate(3deg)} }
          @keyframes why-paper1 { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-10px) rotate(-9deg)} }
          @keyframes why-paper2 { 0%,100%{transform:translateY(0) rotate(8deg)} 50%{transform:translateY(-14px) rotate(13deg)} }
          @keyframes why-paper3 { 0%,100%{transform:translateY(0) rotate(-10deg)} 55%{transform:translateY(-8px) rotate(-14deg)} }
          @keyframes why-qmark { 0%,100%{opacity:0;transform:scale(0.5) translateY(4px)} 30%{opacity:0.8;transform:scale(1) translateY(0)} 70%{opacity:0.8;transform:scale(1) translateY(0)} }
          @keyframes why-warn { 0%,10%{opacity:0;transform:scale(0.3) translateY(-10px)} 20%{opacity:1;transform:scale(1.05) translateY(0)} 25%,80%{opacity:1;transform:scale(1)} 90%{opacity:0} 100%{opacity:0} }
          @keyframes why-sparkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
          @keyframes why-check { 0%,50%{opacity:0;transform:scale(0.3)} 70%{opacity:1;transform:scale(1.15)} 80%,100%{opacity:1;transform:scale(1)} }
          @keyframes why-steam { 0%,100%{opacity:0;transform:translateY(0)} 40%{opacity:0.5;transform:translateY(-10px)} 80%{opacity:0;transform:translateY(-18px)} }
          @keyframes why-glow { 0%,100%{opacity:0.7} 50%{opacity:1} }
          @keyframes why-dot1 { 0%,2%{background:#038390} 20%{background:#038390} 21%{background:rgba(3,131,144,0.2)} 100%{background:rgba(3,131,144,0.2)} }
          @keyframes why-dot2 { 0%,20%{background:rgba(3,131,144,0.2)} 22%{background:#038390} 39%{background:#038390} 41%{background:rgba(3,131,144,0.2)} 100%{background:rgba(3,131,144,0.2)} }
          @keyframes why-dot3 { 0%,40%{background:rgba(3,131,144,0.2)} 42%{background:#038390} 59%{background:#038390} 61%{background:rgba(3,131,144,0.2)} 100%{background:rgba(3,131,144,0.2)} }
          @keyframes why-dot4 { 0%,60%{background:rgba(3,131,144,0.2)} 62%{background:#038390} 79%{background:#038390} 81%{background:rgba(3,131,144,0.2)} 100%{background:rgba(3,131,144,0.2)} }
          @keyframes why-dot5 { 0%,80%{background:rgba(3,131,144,0.2)} 82%{background:#038390} 99%{background:#038390} 100%{background:rgba(3,131,144,0.2)} }
        `}</style>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.55) 55%, rgba(245,230,66,0.55) 92%, transparent 92%)', paddingLeft: 6, paddingRight: 6 }}>чому QLIXA</span>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 400, color: '#1A1A1A', marginTop: 10, letterSpacing: '-0.5px' }}>
              Ми створили платформу, якої нам самим <em style={{ fontStyle: 'italic', color: '#038390' }}>колись не вистачало.</em>
            </h2>
          </div>

          {/* Main grid: animation left, text right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'center' }}>

            {/* ── STAGE ── */}
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 24, border: '1.5px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A', position: 'relative', overflow: 'hidden', background: '#026B76', backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>

              {/* ── SCENE 1: Вокзал ── */}
              <div className="why-scene why-s1">
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="400" height="300" fill="#026B76"/>
                  <g style={{ animation: 'why-cloud1 5s ease-in-out infinite' }}>
                    <ellipse cx="80" cy="55" rx="35" ry="14" fill="white" opacity="0.5"/>
                    <ellipse cx="102" cy="47" rx="22" ry="13" fill="white" opacity="0.5"/>
                  </g>
                  <g style={{ animation: 'why-cloud2 6s ease-in-out infinite' }}>
                    <ellipse cx="300" cy="42" rx="28" ry="12" fill="white" opacity="0.5"/>
                    <ellipse cx="320" cy="35" rx="18" ry="10" fill="white" opacity="0.5"/>
                  </g>
                  <polygon points="0,195 80,100 160,195" fill="rgba(255,255,255,0.2)" opacity="1"/>
                  <polygon points="60,195 150,88 240,195" fill="rgba(255,255,255,0.14)" opacity="1"/>
                  <polygon points="180,195 260,108 340,195" fill="rgba(255,255,255,0.1)" opacity="1"/>
                  <rect x="0" y="195" width="400" height="105" fill="rgba(255,255,255,0.12)"/>
                  <rect x="0" y="195" width="400" height="3" fill="#A8DDE2" opacity="0.4"/>
                  <rect x="240" y="120" width="130" height="80" fill="white" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.85"/>
                  <polygon points="234,122 376,122 305,88" fill="#038390" opacity="0.45"/>
                  <rect x="254" y="130" width="76" height="26" rx="5" fill="#038390"/>
                  <text x="292" y="148" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" fill="white" textAnchor="middle">Wien</text>
                  <rect x="254" y="163" width="18" height="16" rx="2" fill="#E6F4F5" stroke="#1A1A1A" strokeWidth="1" opacity="0.8"/>
                  <rect x="278" y="163" width="18" height="16" rx="2" fill="#E6F4F5" stroke="#1A1A1A" strokeWidth="1" opacity="0.8"/>
                  <rect x="326" y="163" width="18" height="16" rx="2" fill="#E6F4F5" stroke="#1A1A1A" strokeWidth="1" opacity="0.8"/>
                  <g style={{ animation: 'why-suitcase 2.5s ease-in-out infinite', transformOrigin: '182px 248px' }}>
                    <rect x="162" y="228" width="40" height="32" rx="5" fill="#038390" stroke="#1A1A1A" strokeWidth="1.5"/>
                    <rect x="172" y="222" width="20" height="9" rx="3" fill="none" stroke="#1A1A1A" strokeWidth="2"/>
                    <line x1="162" y1="244" x2="202" y2="244" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                    <circle cx="182" cy="244" r="3" fill="white" opacity="0.4"/>
                  </g>
                  <rect x="210" y="155" width="4" height="46" fill="#1A1A1A" opacity="0.3"/>
                  <rect x="185" y="148" width="44" height="18" rx="3" fill="white" stroke="#1A1A1A" strokeWidth="1" opacity="0.9"/>
                  <text x="207" y="161" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="600" fill="#1A1A1A" textAnchor="middle">Finanzamt</text>
                  <g style={{ animation: 'why-breathe 3.5s ease-in-out infinite, why-tilt 5s ease-in-out infinite', transformOrigin: '110px 225px' }}>
                    <path d="M130,208 C140,200 158,194 161,205 L152,216 L130,208Z" fill="white" style={{ animation: 'why-tail 2.5s ease-in-out infinite', transformOrigin: '130px 208px' }}/>
                    <circle cx="108" cy="218" r="40" fill="white"/>
                    <path d="M118,213 C118,213 115,217 118,219 L140,219 C143,217 142,215 140,213 L118,213Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M118,206 C118,206 115,210 118,212 L140,212 C143,210 142,208 140,206 L118,206Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M128,199 C128,199 125,203 128,205 L140,205 C143,203 142,201 140,199 L128,199Z" fill="#1A1A1A" opacity="0.6"/>
                    <path d="M70,205 L50,186 L84,189 L70,205Z" fill="rgb(204,0,0)"/>
                    <path d="M74,222 C78,194 96,183 127,179 C120,193 120,207 127,222 C109,213 91,213 74,222Z" fill="#1A1A1A"/>
                    <circle cx="103" cy="189" r="6" fill="white" style={{ animation: 'why-blink 5s ease-in-out infinite', transformOrigin: '103px 189px' }}/>
                  </g>
                  <text x="72" y="178" fontFamily="DM Sans, sans-serif" fontSize="22" fontWeight="700" fill="#038390" opacity="0.7" style={{ animation: 'why-qmark 4s ease-in-out infinite' }}>?</text>
                </svg>
              </div>

              {/* ── SCENE 2: Documents ── */}
              <div className="why-scene why-s2">
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="400" height="300" fill="#026B76"/>
                  <rect x="50" y="215" width="300" height="10" rx="4" fill="#E6D5C3" stroke="#1A1A1A" strokeWidth="1" opacity="0.5"/>
                  <rect x="70" y="225" width="8" height="75" rx="3" fill="#E6D5C3" opacity="0.35"/>
                  <rect x="322" y="225" width="8" height="75" rx="3" fill="#E6D5C3" opacity="0.35"/>
                  <g style={{ animation: 'why-paper1 2.5s ease-in-out infinite', transformOrigin: '108px 138px' }}>
                    <rect x="82" y="108" width="52" height="68" rx="5" fill="white" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.92"/>
                    <rect x="82" y="108" width="52" height="14" rx="5" fill="#CC0000" opacity="0.1"/>
                    <text x="108" y="126" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="700" fill="#CC0000" textAnchor="middle">SVS</text>
                    <line x1="92" y1="136" x2="124" y2="136" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="92" y1="145" x2="120" y2="145" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="92" y1="154" x2="122" y2="154" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="92" y1="163" x2="116" y2="163" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                  </g>
                  <g style={{ animation: 'why-paper2 3s ease-in-out infinite', transformOrigin: '280px 110px' }}>
                    <rect x="254" y="82" width="52" height="68" rx="5" fill="white" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.92"/>
                    <rect x="254" y="82" width="52" height="14" rx="5" fill="#038390" opacity="0.12"/>
                    <text x="280" y="100" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="#038390" textAnchor="middle">FinanzOnline</text>
                    <line x1="264" y1="108" x2="296" y2="108" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="264" y1="117" x2="290" y2="117" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="264" y1="126" x2="294" y2="126" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="264" y1="135" x2="288" y2="135" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                  </g>
                  <g style={{ animation: 'why-paper3 2.8s ease-in-out infinite', transformOrigin: '200px 148px' }}>
                    <rect x="174" y="118" width="52" height="68" rx="5" fill="white" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.92"/>
                    <rect x="174" y="118" width="52" height="14" rx="5" fill="#1A1A1A" opacity="0.06"/>
                    <text x="200" y="136" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="700" fill="#1A1A1A" textAnchor="middle">GISA</text>
                    <line x1="184" y1="146" x2="216" y2="146" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="184" y1="155" x2="212" y2="155" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                    <line x1="184" y1="164" x2="214" y2="164" stroke="#1A1A1A" strokeWidth="1" opacity="0.15"/>
                  </g>
                  <g style={{ animation: 'why-paper1 3.2s ease-in-out infinite' }}>
                    <rect x="136" y="80" width="98" height="14" rx="3" fill="rgba(245,230,66,0.35)"/>
                    <text x="140" y="92" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="600" fill="white" opacity="0.85">Einkommensteuer</text>
                  </g>
                  <g style={{ animation: 'why-paper2 2.8s ease-in-out infinite' }}>
                    <rect x="54" y="182" width="88" height="13" rx="3" fill="rgba(245,230,66,0.35)"/>
                    <text x="58" y="193" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.85">Steuererklärung</text>
                  </g>
                  <g style={{ animation: 'why-paper3 3s ease-in-out infinite' }}>
                    <rect x="283" y="188" width="74" height="13" rx="3" fill="rgba(245,230,66,0.35)"/>
                    <text x="287" y="199" fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="600" fill="white" opacity="0.85">Arbeitnehmer</text>
                  </g>
                  <text x="152" y="105" fontFamily="DM Sans, sans-serif" fontSize="26" fontWeight="700" fill="#038390" style={{ animation: 'why-qmark 2s ease-in-out infinite 0s' }}>?</text>
                  <text x="320" y="155" fontFamily="DM Sans, sans-serif" fontSize="20" fontWeight="700" fill="#CC0000" style={{ animation: 'why-qmark 2s ease-in-out infinite 0.5s' }}>?</text>
                  <text x="60" y="150" fontFamily="DM Sans, sans-serif" fontSize="16" fontWeight="700" fill="#1A1A1A" style={{ animation: 'why-qmark 2s ease-in-out infinite 0.9s' }}>?</text>
                  <g style={{ animation: 'why-tilt 2.5s ease-in-out infinite', transformOrigin: '200px 195px' }}>
                    <path d="M222,178 C232,170 250,164 253,175 L244,186 L222,178Z" fill="white" style={{ animation: 'why-tail 2s ease-in-out infinite', transformOrigin: '222px 178px' }}/>
                    <circle cx="200" cy="188" r="38" fill="white"/>
                    <path d="M210,183 C210,183 207,187 210,189 L232,189 C235,187 234,185 232,183 L210,183Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M210,176 C210,176 207,180 210,182 L232,182 C235,180 234,178 232,176 L210,176Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M162,175 L142,156 L176,159 L162,175Z" fill="rgb(204,0,0)"/>
                    <path d="M166,192 C170,164 188,153 219,149 C212,163 212,177 219,192 C201,183 183,183 166,192Z" fill="#1A1A1A"/>
                    <circle cx="195" cy="159" r="6" fill="white" style={{ animation: 'why-blink 2.5s ease-in-out infinite', transformOrigin: '195px 159px' }}/>
                  </g>
                </svg>
              </div>

              {/* ── SCENE 3: Error / Fear ── */}
              <div className="why-scene why-s3">
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="400" height="300" fill="#026B76"/>
                  <rect x="80" y="50" width="200" height="160" rx="14" fill="white" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.92"/>
                  <rect x="80" y="50" width="200" height="32" rx="14" fill="#E6F4F5"/>
                  <rect x="80" y="68" width="200" height="14" fill="#E6F4F5"/>
                  <circle cx="98" cy="66" r="5" fill="#CC0000" opacity="0.5"/>
                  <circle cx="113" cy="66" r="5" fill="#FFB347" opacity="0.5"/>
                  <circle cx="128" cy="66" r="5" fill="#4CAF50" opacity="0.5"/>
                  <text x="192" y="70" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="600" fill="rgba(26,26,26,0.4)" textAnchor="middle">FinanzOnline</text>
                  <rect x="100" y="100" width="60" height="5" rx="2.5" fill="#E0E0E0"/>
                  <rect x="100" y="113" width="120" height="5" rx="2.5" fill="#E0E0E0"/>
                  <rect x="100" y="126" width="90" height="5" rx="2.5" fill="#E0E0E0"/>
                  <rect x="100" y="139" width="100" height="5" rx="2.5" fill="#E0E0E0"/>
                  <rect x="100" y="152" width="70" height="5" rx="2.5" fill="#E0E0E0"/>
                  <rect x="100" y="172" width="80" height="26" rx="7" fill="#038390"/>
                  <text x="140" y="189" fontFamily="DM Sans, sans-serif" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">Надіслати</text>
                  <g style={{ animation: 'why-warn 4.8s ease-in-out infinite' }}>
                    <rect x="88" y="10" width="184" height="52" rx="10" fill="#FFF0F0" stroke="#CC0000" strokeWidth="1.5"/>
                    <text x="110" y="40" fontSize="22">⚠️</text>
                    <text x="136" y="34" fontFamily="DM Sans, sans-serif" fontSize="12" fontWeight="700" fill="#CC0000">Помилка!</text>
                    <text x="136" y="50" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#CC0000" opacity="0.8">Перевірте дані форми</text>
                  </g>
                  <g style={{ animation: 'why-bounce 1s ease-in-out infinite', transformOrigin: '322px 228px' }}>
                    <path d="M344,208 C354,200 372,194 375,205 L366,216 L344,208Z" fill="white" style={{ animation: 'why-tail 1.5s ease-in-out infinite', transformOrigin: '344px 208px' }}/>
                    <circle cx="322" cy="218" r="38" fill="white"/>
                    <path d="M332,213 C332,213 329,217 332,219 L354,219 C357,217 356,215 354,213 L332,213Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M332,206 C332,206 329,210 332,212 L354,212 C357,210 356,208 354,206 L332,206Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M284,205 L264,186 L298,189 L284,205Z" fill="rgb(204,0,0)"/>
                    <path d="M288,222 C292,194 310,183 341,179 C334,193 334,207 341,222 C323,213 305,213 288,222Z" fill="#1A1A1A"/>
                    <circle cx="317" cy="189" r="8" fill="white" style={{ animation: 'why-blink 6s ease-in-out infinite', transformOrigin: '317px 189px' }}/>
                  </g>
                </svg>
              </div>

              {/* ── SCENE 4: QLIXA born ── */}
              <div className="why-scene why-s4">
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="400" height="300" fill="#026B76"/>
                  {[{cx:80,cy:70,r:5,c:'#F5E642',d:'0s'},{cx:320,cy:55,r:4,c:'#038390',d:'0.3s'},{cx:350,cy:150,r:3,c:'#F5E642',d:'0.7s'},{cx:60,cy:170,r:4,c:'#038390',d:'0.1s'},{cx:200,cy:40,r:3,c:'#FFB347',d:'0.5s'},{cx:360,cy:220,r:4,c:'#CC0000',d:'0.9s'},{cx:40,cy:240,r:3,c:'#F5E642',d:'0.4s'}].map((s,i) => (
                    <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.c} style={{ animation: `why-sparkle 1.5s ease-in-out infinite ${s.d}` }}/>
                  ))}
                  <text x="200" y="175" fontFamily="DM Serif Display, serif" fontSize="130" fontWeight="400" fill="none" stroke="#038390" strokeWidth="2" textAnchor="middle" opacity="0.08">Q</text>
                  <g style={{ animation: 'why-paper1 2s ease-in-out infinite' }}>
                    <rect x="72" y="100" width="48" height="60" rx="4" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                    <rect x="72" y="100" width="48" height="13" rx="4" fill="rgba(3,131,144,0.3)"/>
                    <text x="96" y="111" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">Рахунок</text>
                    <line x1="80" y1="124" x2="112" y2="124" stroke="#038390" strokeWidth="1.2" opacity="0.5"/>
                    <line x1="80" y1="132" x2="108" y2="132" stroke="rgba(26,26,26,0.2)" strokeWidth="1"/>
                    <line x1="80" y1="140" x2="110" y2="140" stroke="rgba(26,26,26,0.2)" strokeWidth="1"/>
                    <text x="80" y="153" fontFamily="DM Sans, sans-serif" fontSize="7" fill="#038390" fontWeight="600">€ 640</text>
                  </g>
                  <g style={{ animation: 'why-paper3 2.2s ease-in-out infinite' }}>
                    <rect x="288" y="88" width="48" height="60" rx="4" fill="rgba(255,255,255,0.92)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
                    <rect x="288" y="88" width="48" height="13" rx="4" fill="rgba(245,230,66,0.4)"/>
                    <text x="312" y="99" fontFamily="DM Sans, sans-serif" fontSize="7" fontWeight="700" fill="white" textAnchor="middle">Звіт ПДВ</text>
                    <line x1="296" y1="112" x2="328" y2="112" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                    <line x1="296" y1="120" x2="324" y2="120" stroke="rgba(26,26,26,0.2)" strokeWidth="1"/>
                    <line x1="296" y1="128" x2="326" y2="128" stroke="rgba(26,26,26,0.2)" strokeWidth="1"/>
                    <text x="296" y="141" fontFamily="DM Sans, sans-serif" fontSize="7" fill="#038390" fontWeight="600">✓ Готово</text>
                  </g>
                  <g style={{ animation: 'why-check 4.8s ease-in-out infinite' }}>
                    <rect x="118" y="80" width="164" height="110" rx="14" fill="white" stroke="#1A1A1A" strokeWidth="1.5"/>
                    <rect x="118" y="80" width="164" height="28" rx="14" fill="#E6F4F5"/>
                    <rect x="118" y="95" width="164" height="13" fill="#E6F4F5"/>
                    <circle cx="134" cy="94" r="4" fill="#CC0000" opacity="0.4"/>
                    <circle cx="146" cy="94" r="4" fill="#FFB347" opacity="0.4"/>
                    <circle cx="158" cy="94" r="4" fill="#4CAF50" opacity="0.4"/>
                    <text x="200" y="98" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="600" fill="rgba(26,26,26,0.4)" textAnchor="middle">QLIXA Platform</text>
                    <rect x="132" y="122" width="50" height="3" rx="1.5" fill="#038390"/>
                    <rect x="132" y="132" width="100" height="2.5" rx="1.2" fill="#E0E0E0"/>
                    <rect x="132" y="141" width="80" height="2.5" rx="1.2" fill="#E0E0E0"/>
                    <text x="134" y="160" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#038390">✓ Податки</text>
                    <text x="200" y="160" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#038390">✓ Звіти</text>
                    <text x="134" y="173" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#038390">✓ Документи</text>
                    <text x="200" y="173" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#038390">✓ FinanzOnline</text>
                  </g>
                  <g style={{ animation: 'why-breathe 3s ease-in-out infinite', transformOrigin: '322px 238px' }}>
                    <path d="M344,218 C354,210 372,204 375,215 L366,226 L344,218Z" fill="white" style={{ animation: 'why-tail 1.8s ease-in-out infinite', transformOrigin: '344px 218px' }}/>
                    <circle cx="322" cy="228" r="38" fill="white"/>
                    <path d="M332,223 L354,223 C357,221 356,219 354,219 L332,219 C329,219 329,221 332,223Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M332,216 L354,216 C357,214 356,212 354,212 L332,212 C329,212 329,214 332,216Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M284,215 L264,196 L298,199 L284,215Z" fill="rgb(204,0,0)"/>
                    <path d="M288,232 C292,204 310,193 341,189 C334,203 334,217 341,232 C323,223 305,223 288,232Z" fill="#1A1A1A"/>
                    <circle cx="317" cy="199" r="6" fill="white" style={{ animation: 'why-blink 4s ease-in-out infinite', transformOrigin: '317px 199px' }}/>
                    <path d="M296,237 C306,248 336,248 346,237" stroke="#038390" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
                  </g>
                </svg>
              </div>

              {/* ── SCENE 5: Coffee ── */}
              <div className="why-scene why-s5">
                <svg width="100%" height="100%" viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0 }}>
                  <rect width="400" height="300" fill="#026B76"/>
                  <rect x="260" y="30" width="110" height="80" rx="6" fill="white" stroke="#1A1A1A" strokeWidth="1" opacity="0.5"/>
                  <line x1="315" y1="30" x2="315" y2="110" stroke="#1A1A1A" strokeWidth="1" opacity="0.3"/>
                  <line x1="260" y1="70" x2="370" y2="70" stroke="#1A1A1A" strokeWidth="1" opacity="0.3"/>
                  <ellipse cx="290" cy="50" rx="18" ry="10" fill="#E6F4F5" opacity="0.6"/>
                  <ellipse cx="345" cy="55" rx="14" ry="8" fill="#E6F4F5" opacity="0.5"/>
                  <rect x="60" y="210" width="280" height="12" rx="5" fill="rgba(255,255,255,0.2)" stroke="#1A1A1A" strokeWidth="1" opacity="0.55"/>
                  <rect x="82" y="222" width="10" height="78" rx="4" fill="rgba(255,255,255,0.2)" opacity="0.4"/>
                  <rect x="308" y="222" width="10" height="78" rx="4" fill="rgba(255,255,255,0.2)" opacity="0.4"/>
                  <rect x="168" y="138" width="110" height="76" rx="7" fill="white" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.95"/>
                  <rect x="156" y="210" width="134" height="7" rx="3" fill="#1A1A1A" opacity="0.12"/>
                  <rect x="174" y="145" width="98" height="62" rx="4" fill="#E6F4F5" style={{ animation: 'why-glow 2.5s ease-in-out infinite' }}/>
                  <rect x="180" y="152" width="44" height="3" rx="1.5" fill="#038390"/>
                  <rect x="180" y="160" width="80" height="2" rx="1" fill="#1A1A1A" opacity="0.15"/>
                  <rect x="180" y="167" width="64" height="2" rx="1" fill="#1A1A1A" opacity="0.15"/>
                  <text x="180" y="182" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#038390">✓ Податки</text>
                  <text x="180" y="193" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#038390">✓ Документи</text>
                  <text x="180" y="204" fontFamily="DM Sans, sans-serif" fontSize="8" fill="#038390">✓ FinanzOnline</text>
                  <rect x="100" y="170" width="44" height="38" rx="6" fill="white" stroke="#1A1A1A" strokeWidth="1.5"/>
                  <rect x="100" y="170" width="44" height="14" rx="6" fill="#795548" opacity="0.18"/>
                  <path d="M144,182 C152,182 152,196 144,196" stroke="#1A1A1A" strokeWidth="1.5" fill="none" opacity="0.35"/>
                  <text x="122" y="195" fontFamily="DM Sans, sans-serif" fontSize="11" textAnchor="middle" opacity="0.3">☕</text>
                  <path d="M112,166 C114,156 110,151 112,143" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ animation: 'why-steam 2s ease-in-out infinite 0s' }}/>
                  <path d="M122,164 C124,154 120,149 122,141" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ animation: 'why-steam 2s ease-in-out infinite 0.35s' }}/>
                  <path d="M132,166 C134,156 130,151 132,143" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ animation: 'why-steam 2s ease-in-out infinite 0.7s' }}/>
                  <g style={{ animation: 'why-breathe 4s ease-in-out infinite', transformOrigin: '308px 185px' }}>
                    <path d="M330,168 C340,160 358,154 361,165 L352,176 L330,168Z" fill="white" style={{ animation: 'why-tail 3s ease-in-out infinite', transformOrigin: '330px 168px' }}/>
                    <circle cx="308" cy="178" r="38" fill="white"/>
                    <path d="M318,173 L340,173 C343,171 342,169 340,169 L318,169 C315,169 315,171 318,173Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M318,166 L340,166 C343,164 342,162 340,162 L318,162 C315,162 315,164 318,166Z" fill="#1A1A1A" opacity="0.7"/>
                    <path d="M270,165 L250,146 L284,149 L270,165Z" fill="rgb(204,0,0)"/>
                    <path d="M274,182 C278,154 296,143 327,139 C320,153 320,167 327,182 C309,173 291,173 274,182Z" fill="#1A1A1A"/>
                    <circle cx="303" cy="149" r="6" fill="white" style={{ animation: 'why-blink 5s ease-in-out infinite', transformOrigin: '303px 149px' }}/>
                    <path d="M282,187 C292,198 322,198 332,187" stroke="#038390" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65"/>
                  </g>
                  {[{x:16,y:28,flag:'🇺🇦',lang:'UA'},{x:58,y:28,flag:'🇷🇺',lang:'RU'},{x:100,y:28,flag:'🇬🇧',lang:'EN'},{x:142,y:28,flag:'🇩🇪',lang:'DE'}].map((l,i) => (
                    <g key={i}>
                      <rect x={l.x} y={l.y} width="36" height="18" rx="9" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      <text x={l.x+18} y={l.y+13} fontFamily="DM Sans, sans-serif" fontSize="8" fontWeight="600" fill="white" textAnchor="middle">{l.flag} {l.lang}</text>
                    </g>
                  ))}
                </svg>
              </div>

            </div>{/* /stage */}

            {/* ── TEXT PANEL ── */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ position: 'relative', minHeight: 180, marginBottom: 24 }}>

                {[
                  { cls: 'why-t1', h: <>Ми теж були новачками <em style={{ fontStyle: 'italic', color: '#038390' }}>в Австрії.</em></>, p: 'Приїхали. Нічого не розуміли. Хотілося просто щоб хтось пояснив — без зайвих слів.' },
                  { cls: 'why-t2', h: <>Не розуміли ні мови, <em style={{ fontStyle: 'italic', color: '#038390' }}>ні системи.</em></>, p: 'SVS, FinanzOnline, GISA — самі назви лякали. А форми — взагалі окремий жах.' },
                  { cls: 'why-t3', h: <>Боялися <em style={{ fontStyle: 'italic', color: '#CC0000' }}>зробити помилку.</em></>, p: 'Кожна помилка — потенційний штраф. Це сковувало і заважало жити спокійно.' },
                  { cls: 'why-t4', h: <>Саме тому <em style={{ fontStyle: 'italic', color: '#038390' }}>створили QLIXA.</em></>, p: 'Платформа, якої нам самим колись не вистачало. Проста. Людяна. Твоєю мовою.' },
                  { cls: 'why-t5', h: <>Як друг <em style={{ fontStyle: 'italic', color: '#038390' }}>за чашкою кави. ☕</em></>, p: 'Пояснюємо все без термінів і стресу — крок за кроком, зрозумілою мовою.' },
                ].map((t, i) => (
                  <div key={i} className={`why-text ${t.cls}`}>
                    <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 12 }}>{t.h}</h3>
                    <p style={{ fontSize: 16, color: '#3D3D3D', lineHeight: 1.75, fontWeight: 400 }}>{t.p}</p>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {['why-dot1','why-dot2','why-dot3','why-dot4','why-dot5'].map((a, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(3,131,144,0.2)', animation: `${a} 24s ease-in-out infinite` }}/>
                ))}
              </div>

              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#038390', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0 #026B76', width: 'fit-content' }}>
                Спробувати →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Austrian stripe */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #CC0000 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #CC0000 66.66%)', width: '100%' }} />

      {/* ARTICLES */}
      <ArticlesSlider published={published} upcoming={upcoming} />

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '20px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Починай зараз</div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#fff', margin: '0 0 16px 0', letterSpacing: '-1px' }}>
          Твій перший звіт — за <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>15 хвилин</em>
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>Без кредитної картки. Без зобов'язань.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-test" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 700, background: '#fff', color: '#038390', textDecoration: 'none', display: 'inline-block' }}>
            Спробувати безкоштовно →
          </Link>
          <Link href="/pricing" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 600, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block' }}>
            Переглянути тарифи
          </Link>
        </div>
      </section>

      {/* ── FAQ — after CTA ── */}
      <section id="faq" style={{ padding: '32px clamp(20px,6vw,80px)', background: '#FFFFFF', backgroundImage: 'linear-gradient(rgba(3,131,144,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(3,131,144,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(to bottom, transparent 55%, rgba(245,230,66,0.55) 55%, rgba(245,230,66,0.55) 92%, transparent 92%)', paddingLeft: 4, paddingRight: 4 }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: '#1A1A1A', margin: 0, letterSpacing: '-0.5px' }}>
              Часті <em style={{ fontStyle: 'italic', color: '#038390' }}>запитання</em>
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
                <span style={{ color: '#038390', fontSize: 20, fontWeight: 400, flexShrink: 0, transition: 'transform 0.2s', display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
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
