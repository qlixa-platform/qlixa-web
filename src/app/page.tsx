'use client'

import React, { useState } from 'react'
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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#F0F7F8', overflowX: 'hidden' }}>
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
          background: '#F0F7F8',
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
                { img: '/hero-icons/tax-return.png', text: 'Повернення податку' },
                { img: '/hero-icons/invoices.png', text: 'Рахунки / Клієнти' },
                { img: '/hero-icons/expenses.png', text: 'Витрати' },
                { img: '/hero-icons/reports.png', text: 'Звіти' },
                { img: '/hero-icons/finanz.png', text: 'FinanzOnline' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fff', border: '2px solid #1A1A1A', borderRadius: 12, padding: '9px 16px', boxShadow: '3px 3px 0 #1A1A1A', fontSize: 14, fontWeight: 600, color: '#1A1A1A', whiteSpace: 'nowrap' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.text} style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
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

      {/* ── HERO2 (experimental map section) ── */}
      <section style={{ 
        minHeight: '100vh', 
        background: '#F0F7F8', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 clamp(20px,6vw,80px)'
      }}>
        <div style={{ maxWidth: 1200, width: '100%', display: 'flex', alignItems: 'center', gap: 60 }}>

          {/* LEFT — text */}
          <div style={{ flex: '0 0 420px' }}>
            {/* Eyebrow */}
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Твій цифровий помічник в Австрії</div>

            {/* H1 */}
            <div style={{ marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/qlixa-text-dark.svg"
                alt="QLIXA"
                style={{ height: 72, width: 'auto', display: 'block' }}
              />
            </div>

            {/* Subheading */}
            <p style={{ fontSize: 20, fontWeight: 400, color: '#1A1A1A', lineHeight: 1.5, marginBottom: 8 }}>
              Податки, звіти та бізнес-процеси —
            </p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#038390', lineHeight: 1.5, marginBottom: 32 }}>
              простою мовою.
            </p>

            {/* Checklist links */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 36 }}>
              {[
                { text: 'Для працівників за наймом', href: '/for/naymanyy' },
                { text: 'Для малого бізнесу', href: '/for/biznes' },
                { text: 'Для самозайнятих', href: '/for/frilanser' },
                { text: 'Якщо є капітальні чи закордонні доходи', href: '/for/samostiynyy' },
              ].map((item, i) => (
                <Link key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#1A1A1A', fontSize: 15, fontWeight: 500, transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#038390'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#1A1A1A'}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#038390', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {item.text}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <a href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#038390', color: '#fff', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '3px 3px 0 #026B76' }}>
                Спробувати →
              </a>
              <a href="#demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'transparent', color: '#038390', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '1.5px solid #038390' }}>
                Як це працює
              </a>
            </div>
          </div>

          {/* RIGHT — Austria 3D map SVG */}
          <style>{`
            @keyframes floatIconAnim {
              0%    { opacity: 0; transform: translate(0px, 0px) scale(0.3); }
              8%    { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
              77%   { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
              92%   { opacity: 0; transform: translate(0px, 0px) scale(0.3); }
              100%  { opacity: 0; transform: translate(0px, 0px) scale(0.3); }
            }
            .float-icon {
              position: absolute;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              opacity: 0;
              pointer-events: none;
              background: white;
              border-radius: 16px;
              padding: 10px 14px;
              box-shadow: 0 4px 20px rgba(3,131,144,0.15);
              border: 1px solid rgba(3,131,144,0.15);
            }
            .float-icon img { width: 36px; height: 36px; object-fit: contain; }
            .float-icon span { font-size: 10px; font-weight: 700; color: #038390; font-family: 'DM Sans', sans-serif; white-space: nowrap; }
          `}</style>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            {/* Floating icons around bird */}
            {[
              { src: '/hero-icons/tax-return.png', label: 'Повернення податку', tx: '-180px', ty: '-120px' },
              { src: '/hero-icons/invoices.png',   label: 'Рахунки',             tx: '100px',  ty: '-140px' },
              { src: '/hero-icons/expenses.png',   label: 'Витрати',             tx: '180px', ty: '0px'  },
              { src: '/hero-icons/reports.svg',    label: 'Звіти',               tx: '100px',  ty: '120px'  },
              { src: '/hero-icons/finanz.png',     label: 'FinanzOnline',        tx: '-180px', ty: '100px'  },
            ].map((icon, i) => (
              <div key={i} className="float-icon" style={{
                top: '50%',
                left: '62%',
                '--tx': icon.tx,
                '--ty': icon.ty,
                animation: 'floatIconAnim 6.5s ease-in-out infinite',
              } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon.src} alt={icon.label} />
                <span>{icon.label}</span>
              </div>
            ))}
            <svg width="100%" viewBox="0 0 1419 774" role="img" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
              <title>Карта Австрії QLIXA</title>
              <defs>
                <filter id="h2sh">
                  <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#8bbec6" floodOpacity="0.4"/>
                </filter>
              </defs>

              {/* 3D layer dark */}
              <g transform="translate(0, 38)">
                <path d="M1490,1506C1492.83,1504 1489.5,1492 1490,1487C1490.38,1483.22 1491,1479 1493,1476C1495,1473 1500,1472.17 1502,1469C1504,1465.83 1503.83,1460.17 1505,1457C1505.93,1454.48 1506.54,1451.08 1509,1450C1511.67,1448.83 1519,1449.67 1521,1450C1521.66,1450.11 1520.35,1451.86 1521,1452C1522.5,1452.33 1528.5,1451.17 1530,1452C1531.46,1452.81 1528.83,1456.17 1530,1457C1531.17,1457.83 1535.83,1458.17 1537,1457C1538.17,1455.83 1538.17,1451.17 1537,1450C1535.83,1448.83 1531.17,1451.67 1530,1450C1528.83,1448.33 1528.83,1441.67 1530,1440C1531.17,1438.33 1536.11,1442.16 1537,1440C1538.17,1437.17 1536.33,1425.83 1537,1423C1537.31,1421.7 1540.84,1424.32 1541,1423C1541.67,1417.33 1540.5,1394.67 1541,1389C1541.09,1388 1543.61,1389.92 1544,1389C1544.5,1387.83 1541.95,1383.11 1544,1382C1546.17,1380.83 1554.83,1381.5 1557,1382C1557.97,1382.23 1556.02,1384.82 1557,1385C1559.67,1385.5 1570.33,1383.5 1573,1385C1575.62,1386.47 1572.33,1392.5 1573,1394C1573.54,1395.22 1576.33,1393 1577,1394C1577.67,1395 1576,1399 1577,1400C1578,1401 1582,1400.67 1583,1400C1584,1399.33 1581.78,1396.54 1583,1396C1584.5,1395.33 1590.5,1397.83 1592,1396C1593.5,1394.17 1591.17,1386.83 1592,1385C1592.69,1383.48 1596.17,1384.33 1597,1385C1597.83,1385.67 1597,1387.67 1597,1389C1597,1390.5 1595.39,1393.58 1597,1394C1600.17,1394.83 1612.83,1392.5 1616,1394C1618.71,1395.28 1613.29,1401.72 1616,1403C1619.17,1404.5 1631.83,1401.67 1635,1403C1637.46,1404.04 1632.65,1409.75 1635,1411C1637.5,1412.33 1647.5,1410.17 1650,1411C1651.58,1411.53 1648.51,1415.26 1650,1416C1651.67,1416.83 1658.33,1415.5 1660,1416C1660.96,1416.29 1659.08,1418.61 1660,1419C1661.17,1419.5 1665.83,1417.83 1667,1419C1668.17,1420.17 1664.8,1425.23 1667,1426C1670.33,1427.17 1680.5,1426 1687,1426C1693.33,1426 1702.83,1424.83 1706,1426C1708.19,1426.81 1704.17,1431.83 1706,1433C1707.83,1434.17 1715.17,1432.5 1717,1433C1717.97,1433.26 1716.06,1435.65 1717,1436C1718.33,1436.5 1723.67,1434.67 1725,1436C1726.33,1437.33 1724.26,1441.93 1725,1444C1725.7,1445.97 1727.95,1446.95 1729.43,1448.43C1732.7,1451.7 1737.59,1462.15 1744.6,1463.6C1756.86,1466.12 1791.27,1466.86 1803,1463.6C1810.38,1461.54 1810.33,1447.27 1815,1444C1819.37,1440.94 1827.22,1442.89 1831,1444C1834.01,1444.88 1834.71,1449.58 1837.65,1450.65C1841.32,1451.99 1850.44,1449.84 1853,1452C1855.56,1454.16 1850.33,1461.66 1853,1463.6C1855.67,1465.53 1865.47,1462.74 1869,1463.6C1871.37,1464.17 1871.76,1468.36 1874.16,1468.76C1879.33,1469.62 1894.69,1463.72 1900,1468.76C1905.31,1473.8 1905,1490.46 1906,1499C1906.81,1505.95 1907.67,1513.67 1906,1520C1904.33,1526.33 1898.5,1531.67 1896,1537C1893.76,1541.77 1891.69,1546.78 1891,1552C1890.17,1558.33 1889.5,1568.33 1891,1575C1892.41,1581.26 1897.5,1586.67 1900,1592C1902.29,1596.88 1904.25,1601.91 1906,1607C1907.83,1612.33 1908.3,1618.75 1911,1624C1913.83,1629.5 1919.5,1635.83 1923,1640C1925.73,1643.25 1930.74,1644.95 1932,1649C1933.5,1653.83 1929.83,1664.67 1932,1669C1934.13,1673.27 1942.83,1673 1945,1675C1946.47,1676.36 1945.83,1680 1945,1681C1944.17,1682 1940.63,1679.46 1940,1681C1938.5,1684.67 1937.33,1696.67 1936,1703C1934.87,1708.38 1934.17,1715.5 1932,1719C1930.19,1721.92 1923,1720.57 1923,1724C1923,1731.33 1934,1755.5 1932,1763C1930.12,1770.03 1917.83,1768 1911,1769C1904.4,1769.97 1897.14,1768.17 1891,1769C1885.2,1769.79 1878.83,1775 1874.16,1774C1869.5,1773 1867.19,1765.83 1863,1763C1858.81,1760.17 1853.22,1758.67 1849,1757C1845.27,1755.53 1840.15,1753.67 1837.65,1753C1836.48,1752.69 1834.42,1751.86 1834,1753C1833.39,1754.67 1835.5,1761.33 1834,1763C1832.5,1764.67 1827.42,1761.23 1825,1763C1822.5,1764.83 1820.67,1772.17 1819,1774C1818.1,1774.99 1815.67,1773 1815,1774C1814.33,1775 1813.33,1779 1815,1780C1816.67,1781 1823.33,1779.17 1825,1780C1826.49,1780.75 1823.36,1784.71 1825,1785C1829.67,1785.83 1847.67,1781.5 1853,1785C1858.33,1788.5 1856.33,1800.5 1857,1806C1857.48,1809.97 1857.45,1814.03 1857,1818C1856.33,1823.83 1856.83,1834.67 1853,1841C1849.17,1847.33 1840.33,1853.5 1834,1856C1828.11,1858.33 1818.17,1852.33 1815,1856C1811.83,1859.67 1814.33,1871.17 1815,1878C1815.63,1884.44 1820,1892.17 1819,1897C1818.05,1901.62 1809,1902.29 1809,1907C1809,1911.83 1816.33,1922.83 1819,1926C1820.29,1927.53 1824,1925.17 1825,1926C1826,1926.83 1825,1929.33 1825,1931C1825,1933.5 1826,1938 1825,1941C1824,1944 1819,1946.33 1819,1949C1819,1951.67 1824.25,1953.75 1825,1957C1826,1961.33 1826.67,1972 1825,1975C1823.38,1977.91 1818.33,1975 1815,1975C1808.5,1975 1791.5,1973.33 1786,1975C1782.56,1976.04 1784.76,1982.71 1782,1985C1772.57,1992.83 1738.19,2010.83 1729.43,2022C1723.26,2029.87 1728.34,2046.33 1729.43,2052C1729.92,2054.52 1735.2,2053.56 1736,2056C1737.1,2059.33 1741.3,2072.64 1736,2072C1730.5,2071.33 1711.17,2053.83 1703,2052C1697.03,2050.66 1692.94,2059.52 1687,2061C1681,2062.5 1673.17,2060.17 1667,2061C1661.15,2061.79 1654,2061.67 1650,2066C1646,2070.33 1646,2083.5 1643,2087C1640.61,2089.78 1635.21,2088.77 1632,2087C1628.67,2085.17 1627.52,2077.42 1623,2076C1617.17,2074.17 1605.67,2076 1597,2076C1586,2076 1566.33,2075.17 1557,2076C1551.43,2076.5 1545.5,2079.67 1541,2081C1537.36,2082.08 1533.35,2082.2 1530,2084C1525.33,2086.5 1515.83,2091.17 1513,2096C1510.17,2100.83 1516.77,2108.76 1513,2113C1506.33,2120.5 1481.5,2134 1473,2141C1468.42,2144.77 1466.33,2155 1462,2155C1457.67,2155 1453.62,2142.72 1447,2141C1438,2138.67 1419.17,2141.83 1408,2141C1398.55,2140.29 1385.67,2138.17 1380,2136C1376.89,2134.81 1377.03,2129.4 1374,2128C1367.5,2125 1352.28,2120.23 1341,2118C1328.33,2115.5 1312.19,2115.6 1298,2113C1282.5,2110.17 1262,2103 1248,2101C1236.78,2099.4 1223.17,2101.83 1214,2101C1206.83,2100.35 1200.03,2097.54 1193,2096C1182.33,2093.67 1160.83,2089.5 1150,2087C1142.59,2085.29 1135.39,2082.79 1128,2081C1117.67,2078.5 1099.33,2076.17 1088,2072C1077.91,2068.29 1066.83,2062 1060,2056C1054.03,2050.75 1050.17,2040.67 1047,2036C1045.13,2033.24 1042.28,2031.08 1041,2028C1039,2023.17 1038.83,2011.33 1035,2007C1031.17,2002.67 1021.97,2006.38 1018,2002C1013.17,1996.67 1006,1981.17 1006,1975C1006,1969.79 1014.73,1969.05 1018,1965C1021.5,1960.67 1028.33,1951.67 1027,1949C1025.67,1946.33 1015.57,1947.94 1010,1949C1003,1950.33 992.729,1952.9 985,1957C976.833,1961.33 969.333,1971.17 961,1975C952.982,1978.69 942.5,1981.67 935,1980C927.5,1978.33 921.5,1965.83 916,1965C910.5,1964.17 907.474,1973.29 902,1975C894,1977.5 877.667,1979.17 868,1980C860.03,1980.69 850.333,1979.17 844,1980C839.087,1980.65 833.737,1981.75 830,1985C824.833,1989.5 817.088,1998.68 813,2007C808.167,2016.83 810,2039.17 801,2044C792,2048.83 769.5,2040.83 759,2036C750.007,2031.86 745.667,2018.5 738,2015C730.419,2011.54 719.333,2015 713,2015C708.667,2015 702.064,2018.81 700,2015C697.833,2011 701.667,1996.83 700,1991C698.639,1986.24 692.821,1982.67 690,1980C687.93,1978.04 684.749,1975 683.073,1975C681.396,1975 680.988,1978.34 679.94,1980C678.261,1982.67 676.323,1989.17 673,1991C669.677,1992.83 662.667,1991 660,1991C659,1991 657.184,1990.02 657,1991C656.5,1993.67 660.167,2003 657,2007C653.833,2011 642.667,2013.67 638,2015C635.115,2015.82 631.662,2016.38 629,2015C624.833,2012.83 618.852,2005.6 613,2002C606.5,1998 594.667,1996.17 590,1991C585.394,1985.9 590.085,1975.62 585,1971C579.5,1966 564.667,1963.33 557,1961C551.12,1959.21 542,1961.33 539,1957C536,1952.67 539.833,1940.83 539,1935C538.343,1930.4 535.398,1926.43 534,1922C532,1915.67 526.167,1905.33 527,1897C527.833,1888.67 535.548,1878.33 539,1872C541.496,1867.42 547.043,1864.17 547.71,1859C548.377,1853.83 545.285,1845.33 543,1841C541.128,1837.45 535.5,1835.33 534,1833C532.918,1831.32 532.4,1828.2 534,1827C537.333,1824.5 548.5,1822.67 554,1818C559.5,1813.33 563,1802.17 567,1799C569.875,1796.72 576.167,1797.83 578,1799C579.833,1800.17 575.868,1805.05 578,1806C582.5,1808 599.167,1807.5 605,1811C610.113,1814.07 609,1822.67 613,1827C617,1831.33 626.333,1834.67 629,1837C630.003,1837.88 629,1839.67 629,1841C629,1844.17 627.5,1852.33 629,1856C630.439,1859.52 634.221,1862.6 638,1863C642.667,1863.5 654.833,1856.5 657,1859C659.167,1861.5 652,1873.67 651,1878C650.475,1880.27 649.5,1883.83 651,1885C652.5,1886.17 657.492,1886.65 660,1885C664.823,1881.83 674.071,1871.83 679.94,1866C685.17,1860.8 693.539,1856.5 695.215,1850C696.892,1843.5 690.8,1834.82 690,1827C689.131,1818.5 688.333,1803.59 690,1799C691.138,1795.86 698.333,1797.45 700,1799.45C701.667,1801.45 697.833,1809.07 700,1811C702.167,1812.93 709.333,1811.83 713,1811C716.347,1810.24 718.618,1806.58 722,1806C726.833,1805.17 735.833,1804 742,1806C748.167,1808 752.356,1816.01 759,1818C765.667,1820 775.667,1814.17 782,1818C788.333,1821.83 794.5,1834.67 797,1841C798.836,1845.65 794.333,1854 797,1856C799.667,1858 807.794,1854.53 813,1853C819.167,1851.19 827.833,1846.44 834,1845.12C839.216,1844.02 845.294,1847.63 850,1845.12C855.667,1842.1 863.775,1831.52 868,1827C870.644,1824.17 871.605,1818.99 875.349,1818C881.016,1816.5 896.558,1821.09 902,1818C907.442,1814.91 904.833,1802.46 908,1799.45C911.141,1796.46 916.722,1800.62 921,1799.91C928.5,1798.67 942.078,1793.2 953,1792C965,1790.68 983,1792 993,1792C999.667,1792 1009.67,1795 1013,1792C1016.33,1789 1010.97,1779.65 1013,1774C1015.33,1767.5 1023.33,1753.83 1027,1753C1030.67,1752.17 1029.63,1766.4 1035,1769C1040.5,1771.67 1053.5,1767.17 1060,1769C1065.71,1770.61 1069.33,1777.33 1074,1780C1078.3,1782.46 1084.5,1786 1088,1785C1091.5,1784 1091.01,1775.73 1095,1774C1101.17,1771.33 1118,1767.17 1125,1769C1131.45,1770.69 1135,1779.85 1137,1785C1138.8,1789.63 1137.18,1796.41 1137,1799.91C1136.9,1801.97 1134.73,1804.33 1135.93,1806C1138.1,1809.01 1145.67,1814.5 1150,1818C1153.87,1821.13 1158.42,1825.5 1161.92,1827C1164.7,1828.19 1169.51,1829.63 1171,1827C1172.51,1824.33 1169.54,1816.13 1171,1811C1172.67,1805.17 1179.33,1798.17 1181,1792C1182.57,1786.21 1181,1778.83 1181,1774C1181,1770.33 1184.18,1764.33 1181,1763C1177.82,1761.67 1167.08,1767.67 1161.92,1766C1156.75,1764.33 1149.39,1758.85 1150,1753C1150.68,1746.5 1165,1736.5 1166,1727C1167,1717.5 1160.83,1705.67 1156,1696C1151.17,1686.33 1141.67,1675.34 1137,1669C1134.19,1665.18 1130,1661.32 1128,1657.99C1126.38,1655.28 1123.55,1651.8 1125,1649C1127.33,1644.5 1139.17,1635.83 1142,1631C1143.85,1627.84 1138.79,1621.77 1142,1620C1145.32,1618.17 1156.25,1623 1161.92,1620C1167.58,1617 1169.49,1605.96 1176,1602C1183.68,1597.33 1197.83,1595.67 1208,1592C1217.84,1588.45 1230.33,1584.67 1237,1580C1242.3,1576.29 1246.24,1570.23 1248,1564C1250.83,1554 1250.5,1528.83 1254,1520C1256.15,1514.58 1263.21,1510.34 1269,1511C1276.33,1511.83 1290.33,1525 1298,1525C1305.34,1525 1312.32,1517.83 1315,1511C1318.67,1501.67 1317.83,1478 1320,1469C1321.12,1464.33 1323.41,1455.58 1328,1457C1335,1459.17 1356.33,1475 1362,1482C1365.57,1486.4 1357.93,1495.06 1362,1499C1367,1503.83 1383.5,1508 1392,1511C1398.87,1513.43 1406.5,1517.85 1413,1517.02C1419.5,1516.19 1426.5,1510 1431,1506C1434.94,1502.5 1436.62,1494.17 1440,1493C1443.38,1491.83 1447.07,1498.24 1451.26,1499C1456.76,1500 1466.54,1497.83 1473,1499C1479.03,1500.09 1487.17,1508 1490,1506Z" fill="#b8d8de" transform="translate(-526.919,-1381.35)"/>
              </g>

              {/* 3D layer medium */}
              <g transform="translate(0, 20)">
                <path d="M1490,1506C1492.83,1504 1489.5,1492 1490,1487C1490.38,1483.22 1491,1479 1493,1476C1495,1473 1500,1472.17 1502,1469C1504,1465.83 1503.83,1460.17 1505,1457C1505.93,1454.48 1506.54,1451.08 1509,1450C1511.67,1448.83 1519,1449.67 1521,1450C1521.66,1450.11 1520.35,1451.86 1521,1452C1522.5,1452.33 1528.5,1451.17 1530,1452C1531.46,1452.81 1528.83,1456.17 1530,1457C1531.17,1457.83 1535.83,1458.17 1537,1457C1538.17,1455.83 1538.17,1451.17 1537,1450C1535.83,1448.83 1531.17,1451.67 1530,1450C1528.83,1448.33 1528.83,1441.67 1530,1440C1531.17,1438.33 1536.11,1442.16 1537,1440C1538.17,1437.17 1536.33,1425.83 1537,1423C1537.31,1421.7 1540.84,1424.32 1541,1423C1541.67,1417.33 1540.5,1394.67 1541,1389C1541.09,1388 1543.61,1389.92 1544,1389C1544.5,1387.83 1541.95,1383.11 1544,1382C1546.17,1380.83 1554.83,1381.5 1557,1382C1557.97,1382.23 1556.02,1384.82 1557,1385C1559.67,1385.5 1570.33,1383.5 1573,1385C1575.62,1386.47 1572.33,1392.5 1573,1394C1573.54,1395.22 1576.33,1393 1577,1394C1577.67,1395 1576,1399 1577,1400C1578,1401 1582,1400.67 1583,1400C1584,1399.33 1581.78,1396.54 1583,1396C1584.5,1395.33 1590.5,1397.83 1592,1396C1593.5,1394.17 1591.17,1386.83 1592,1385C1592.69,1383.48 1596.17,1384.33 1597,1385C1597.83,1385.67 1597,1387.67 1597,1389C1597,1390.5 1595.39,1393.58 1597,1394C1600.17,1394.83 1612.83,1392.5 1616,1394C1618.71,1395.28 1613.29,1401.72 1616,1403C1619.17,1404.5 1631.83,1401.67 1635,1403C1637.46,1404.04 1632.65,1409.75 1635,1411C1637.5,1412.33 1647.5,1410.17 1650,1411C1651.58,1411.53 1648.51,1415.26 1650,1416C1651.67,1416.83 1658.33,1415.5 1660,1416C1660.96,1416.29 1659.08,1418.61 1660,1419C1661.17,1419.5 1665.83,1417.83 1667,1419C1668.17,1420.17 1664.8,1425.23 1667,1426C1670.33,1427.17 1680.5,1426 1687,1426C1693.33,1426 1702.83,1424.83 1706,1426C1708.19,1426.81 1704.17,1431.83 1706,1433C1707.83,1434.17 1715.17,1432.5 1717,1433C1717.97,1433.26 1716.06,1435.65 1717,1436C1718.33,1436.5 1723.67,1434.67 1725,1436C1726.33,1437.33 1724.26,1441.93 1725,1444C1725.7,1445.97 1727.95,1446.95 1729.43,1448.43C1732.7,1451.7 1737.59,1462.15 1744.6,1463.6C1756.86,1466.12 1791.27,1466.86 1803,1463.6C1810.38,1461.54 1810.33,1447.27 1815,1444C1819.37,1440.94 1827.22,1442.89 1831,1444C1834.01,1444.88 1834.71,1449.58 1837.65,1450.65C1841.32,1451.99 1850.44,1449.84 1853,1452C1855.56,1454.16 1850.33,1461.66 1853,1463.6C1855.67,1465.53 1865.47,1462.74 1869,1463.6C1871.37,1464.17 1871.76,1468.36 1874.16,1468.76C1879.33,1469.62 1894.69,1463.72 1900,1468.76C1905.31,1473.8 1905,1490.46 1906,1499C1906.81,1505.95 1907.67,1513.67 1906,1520C1904.33,1526.33 1898.5,1531.67 1896,1537C1893.76,1541.77 1891.69,1546.78 1891,1552C1890.17,1558.33 1889.5,1568.33 1891,1575C1892.41,1581.26 1897.5,1586.67 1900,1592C1902.29,1596.88 1904.25,1601.91 1906,1607C1907.83,1612.33 1908.3,1618.75 1911,1624C1913.83,1629.5 1919.5,1635.83 1923,1640C1925.73,1643.25 1930.74,1644.95 1932,1649C1933.5,1653.83 1929.83,1664.67 1932,1669C1934.13,1673.27 1942.83,1673 1945,1675C1946.47,1676.36 1945.83,1680 1945,1681C1944.17,1682 1940.63,1679.46 1940,1681C1938.5,1684.67 1937.33,1696.67 1936,1703C1934.87,1708.38 1934.17,1715.5 1932,1719C1930.19,1721.92 1923,1720.57 1923,1724C1923,1731.33 1934,1755.5 1932,1763C1930.12,1770.03 1917.83,1768 1911,1769C1904.4,1769.97 1897.14,1768.17 1891,1769C1885.2,1769.79 1878.83,1775 1874.16,1774C1869.5,1773 1867.19,1765.83 1863,1763C1858.81,1760.17 1853.22,1758.67 1849,1757C1845.27,1755.53 1840.15,1753.67 1837.65,1753C1836.48,1752.69 1834.42,1751.86 1834,1753C1833.39,1754.67 1835.5,1761.33 1834,1763C1832.5,1764.67 1827.42,1761.23 1825,1763C1822.5,1764.83 1820.67,1772.17 1819,1774C1818.1,1774.99 1815.67,1773 1815,1774C1814.33,1775 1813.33,1779 1815,1780C1816.67,1781 1823.33,1779.17 1825,1780C1826.49,1780.75 1823.36,1784.71 1825,1785C1829.67,1785.83 1847.67,1781.5 1853,1785C1858.33,1788.5 1856.33,1800.5 1857,1806C1857.48,1809.97 1857.45,1814.03 1857,1818C1856.33,1823.83 1856.83,1834.67 1853,1841C1849.17,1847.33 1840.33,1853.5 1834,1856C1828.11,1858.33 1818.17,1852.33 1815,1856C1811.83,1859.67 1814.33,1871.17 1815,1878C1815.63,1884.44 1820,1892.17 1819,1897C1818.05,1901.62 1809,1902.29 1809,1907C1809,1911.83 1816.33,1922.83 1819,1926C1820.29,1927.53 1824,1925.17 1825,1926C1826,1926.83 1825,1929.33 1825,1931C1825,1933.5 1826,1938 1825,1941C1824,1944 1819,1946.33 1819,1949C1819,1951.67 1824.25,1953.75 1825,1957C1826,1961.33 1826.67,1972 1825,1975C1823.38,1977.91 1818.33,1975 1815,1975C1808.5,1975 1791.5,1973.33 1786,1975C1782.56,1976.04 1784.76,1982.71 1782,1985C1772.57,1992.83 1738.19,2010.83 1729.43,2022C1723.26,2029.87 1728.34,2046.33 1729.43,2052C1729.92,2054.52 1735.2,2053.56 1736,2056C1737.1,2059.33 1741.3,2072.64 1736,2072C1730.5,2071.33 1711.17,2053.83 1703,2052C1697.03,2050.66 1692.94,2059.52 1687,2061C1681,2062.5 1673.17,2060.17 1667,2061C1661.15,2061.79 1654,2061.67 1650,2066C1646,2070.33 1646,2083.5 1643,2087C1640.61,2089.78 1635.21,2088.77 1632,2087C1628.67,2085.17 1627.52,2077.42 1623,2076C1617.17,2074.17 1605.67,2076 1597,2076C1586,2076 1566.33,2075.17 1557,2076C1551.43,2076.5 1545.5,2079.67 1541,2081C1537.36,2082.08 1533.35,2082.2 1530,2084C1525.33,2086.5 1515.83,2091.17 1513,2096C1510.17,2100.83 1516.77,2108.76 1513,2113C1506.33,2120.5 1481.5,2134 1473,2141C1468.42,2144.77 1466.33,2155 1462,2155C1457.67,2155 1453.62,2142.72 1447,2141C1438,2138.67 1419.17,2141.83 1408,2141C1398.55,2140.29 1385.67,2138.17 1380,2136C1376.89,2134.81 1377.03,2129.4 1374,2128C1367.5,2125 1352.28,2120.23 1341,2118C1328.33,2115.5 1312.19,2115.6 1298,2113C1282.5,2110.17 1262,2103 1248,2101C1236.78,2099.4 1223.17,2101.83 1214,2101C1206.83,2100.35 1200.03,2097.54 1193,2096C1182.33,2093.67 1160.83,2089.5 1150,2087C1142.59,2085.29 1135.39,2082.79 1128,2081C1117.67,2078.5 1099.33,2076.17 1088,2072C1077.91,2068.29 1066.83,2062 1060,2056C1054.03,2050.75 1050.17,2040.67 1047,2036C1045.13,2033.24 1042.28,2031.08 1041,2028C1039,2023.17 1038.83,2011.33 1035,2007C1031.17,2002.67 1021.97,2006.38 1018,2002C1013.17,1996.67 1006,1981.17 1006,1975C1006,1969.79 1014.73,1969.05 1018,1965C1021.5,1960.67 1028.33,1951.67 1027,1949C1025.67,1946.33 1015.57,1947.94 1010,1949C1003,1950.33 992.729,1952.9 985,1957C976.833,1961.33 969.333,1971.17 961,1975C952.982,1978.69 942.5,1981.67 935,1980C927.5,1978.33 921.5,1965.83 916,1965C910.5,1964.17 907.474,1973.29 902,1975C894,1977.5 877.667,1979.17 868,1980C860.03,1980.69 850.333,1979.17 844,1980C839.087,1980.65 833.737,1981.75 830,1985C824.833,1989.5 817.088,1998.68 813,2007C808.167,2016.83 810,2039.17 801,2044C792,2048.83 769.5,2040.83 759,2036C750.007,2031.86 745.667,2018.5 738,2015C730.419,2011.54 719.333,2015 713,2015C708.667,2015 702.064,2018.81 700,2015C697.833,2011 701.667,1996.83 700,1991C698.639,1986.24 692.821,1982.67 690,1980C687.93,1978.04 684.749,1975 683.073,1975C681.396,1975 680.988,1978.34 679.94,1980C678.261,1982.67 676.323,1989.17 673,1991C669.677,1992.83 662.667,1991 660,1991C659,1991 657.184,1990.02 657,1991C656.5,1993.67 660.167,2003 657,2007C653.833,2011 642.667,2013.67 638,2015C635.115,2015.82 631.662,2016.38 629,2015C624.833,2012.83 618.852,2005.6 613,2002C606.5,1998 594.667,1996.17 590,1991C585.394,1985.9 590.085,1975.62 585,1971C579.5,1966 564.667,1963.33 557,1961C551.12,1959.21 542,1961.33 539,1957C536,1952.67 539.833,1940.83 539,1935C538.343,1930.4 535.398,1926.43 534,1922C532,1915.67 526.167,1905.33 527,1897C527.833,1888.67 535.548,1878.33 539,1872C541.496,1867.42 547.043,1864.17 547.71,1859C548.377,1853.83 545.285,1845.33 543,1841C541.128,1837.45 535.5,1835.33 534,1833C532.918,1831.32 532.4,1828.2 534,1827C537.333,1824.5 548.5,1822.67 554,1818C559.5,1813.33 563,1802.17 567,1799C569.875,1796.72 576.167,1797.83 578,1799C579.833,1800.17 575.868,1805.05 578,1806C582.5,1808 599.167,1807.5 605,1811C610.113,1814.07 609,1822.67 613,1827C617,1831.33 626.333,1834.67 629,1837C630.003,1837.88 629,1839.67 629,1841C629,1844.17 627.5,1852.33 629,1856C630.439,1859.52 634.221,1862.6 638,1863C642.667,1863.5 654.833,1856.5 657,1859C659.167,1861.5 652,1873.67 651,1878C650.475,1880.27 649.5,1883.83 651,1885C652.5,1886.17 657.492,1886.65 660,1885C664.823,1881.83 674.071,1871.83 679.94,1866C685.17,1860.8 693.539,1856.5 695.215,1850C696.892,1843.5 690.8,1834.82 690,1827C689.131,1818.5 688.333,1803.59 690,1799C691.138,1795.86 698.333,1797.45 700,1799.45C701.667,1801.45 697.833,1809.07 700,1811C702.167,1812.93 709.333,1811.83 713,1811C716.347,1810.24 718.618,1806.58 722,1806C726.833,1805.17 735.833,1804 742,1806C748.167,1808 752.356,1816.01 759,1818C765.667,1820 775.667,1814.17 782,1818C788.333,1821.83 794.5,1834.67 797,1841C798.836,1845.65 794.333,1854 797,1856C799.667,1858 807.794,1854.53 813,1853C819.167,1851.19 827.833,1846.44 834,1845.12C839.216,1844.02 845.294,1847.63 850,1845.12C855.667,1842.1 863.775,1831.52 868,1827C870.644,1824.17 871.605,1818.99 875.349,1818C881.016,1816.5 896.558,1821.09 902,1818C907.442,1814.91 904.833,1802.46 908,1799.45C911.141,1796.46 916.722,1800.62 921,1799.91C928.5,1798.67 942.078,1793.2 953,1792C965,1790.68 983,1792 993,1792C999.667,1792 1009.67,1795 1013,1792C1016.33,1789 1010.97,1779.65 1013,1774C1015.33,1767.5 1023.33,1753.83 1027,1753C1030.67,1752.17 1029.63,1766.4 1035,1769C1040.5,1771.67 1053.5,1767.17 1060,1769C1065.71,1770.61 1069.33,1777.33 1074,1780C1078.3,1782.46 1084.5,1786 1088,1785C1091.5,1784 1091.01,1775.73 1095,1774C1101.17,1771.33 1118,1767.17 1125,1769C1131.45,1770.69 1135,1779.85 1137,1785C1138.8,1789.63 1137.18,1796.41 1137,1799.91C1136.9,1801.97 1134.73,1804.33 1135.93,1806C1138.1,1809.01 1145.67,1814.5 1150,1818C1153.87,1821.13 1158.42,1825.5 1161.92,1827C1164.7,1828.19 1169.51,1829.63 1171,1827C1172.51,1824.33 1169.54,1816.13 1171,1811C1172.67,1805.17 1179.33,1798.17 1181,1792C1182.57,1786.21 1181,1778.83 1181,1774C1181,1770.33 1184.18,1764.33 1181,1763C1177.82,1761.67 1167.08,1767.67 1161.92,1766C1156.75,1764.33 1149.39,1758.85 1150,1753C1150.68,1746.5 1165,1736.5 1166,1727C1167,1717.5 1160.83,1705.67 1156,1696C1151.17,1686.33 1141.67,1675.34 1137,1669C1134.19,1665.18 1130,1661.32 1128,1657.99C1126.38,1655.28 1123.55,1651.8 1125,1649C1127.33,1644.5 1139.17,1635.83 1142,1631C1143.85,1627.84 1138.79,1621.77 1142,1620C1145.32,1618.17 1156.25,1623 1161.92,1620C1167.58,1617 1169.49,1605.96 1176,1602C1183.68,1597.33 1197.83,1595.67 1208,1592C1217.84,1588.45 1230.33,1584.67 1237,1580C1242.3,1576.29 1246.24,1570.23 1248,1564C1250.83,1554 1250.5,1528.83 1254,1520C1256.15,1514.58 1263.21,1510.34 1269,1511C1276.33,1511.83 1290.33,1525 1298,1525C1305.34,1525 1312.32,1517.83 1315,1511C1318.67,1501.67 1317.83,1478 1320,1469C1321.12,1464.33 1323.41,1455.58 1328,1457C1335,1459.17 1356.33,1475 1362,1482C1365.57,1486.4 1357.93,1495.06 1362,1499C1367,1503.83 1383.5,1508 1392,1511C1398.87,1513.43 1406.5,1517.85 1413,1517.02C1419.5,1516.19 1426.5,1510 1431,1506C1434.94,1502.5 1436.62,1494.17 1440,1493C1443.38,1491.83 1447.07,1498.24 1451.26,1499C1456.76,1500 1466.54,1497.83 1473,1499C1479.03,1500.09 1487.17,1508 1490,1506Z" fill="#d4eaee" transform="translate(-526.919,-1381.35)"/>
              </g>

              {/* TOP white surface */}
              <g filter="url(#h2sh)">
                <path d="M1490,1506C1492.83,1504 1489.5,1492 1490,1487C1490.38,1483.22 1491,1479 1493,1476C1495,1473 1500,1472.17 1502,1469C1504,1465.83 1503.83,1460.17 1505,1457C1505.93,1454.48 1506.54,1451.08 1509,1450C1511.67,1448.83 1519,1449.67 1521,1450C1521.66,1450.11 1520.35,1451.86 1521,1452C1522.5,1452.33 1528.5,1451.17 1530,1452C1531.46,1452.81 1528.83,1456.17 1530,1457C1531.17,1457.83 1535.83,1458.17 1537,1457C1538.17,1455.83 1538.17,1451.17 1537,1450C1535.83,1448.83 1531.17,1451.67 1530,1450C1528.83,1448.33 1528.83,1441.67 1530,1440C1531.17,1438.33 1536.11,1442.16 1537,1440C1538.17,1437.17 1536.33,1425.83 1537,1423C1537.31,1421.7 1540.84,1424.32 1541,1423C1541.67,1417.33 1540.5,1394.67 1541,1389C1541.09,1388 1543.61,1389.92 1544,1389C1544.5,1387.83 1541.95,1383.11 1544,1382C1546.17,1380.83 1554.83,1381.5 1557,1382C1557.97,1382.23 1556.02,1384.82 1557,1385C1559.67,1385.5 1570.33,1383.5 1573,1385C1575.62,1386.47 1572.33,1392.5 1573,1394C1573.54,1395.22 1576.33,1393 1577,1394C1577.67,1395 1576,1399 1577,1400C1578,1401 1582,1400.67 1583,1400C1584,1399.33 1581.78,1396.54 1583,1396C1584.5,1395.33 1590.5,1397.83 1592,1396C1593.5,1394.17 1591.17,1386.83 1592,1385C1592.69,1383.48 1596.17,1384.33 1597,1385C1597.83,1385.67 1597,1387.67 1597,1389C1597,1390.5 1595.39,1393.58 1597,1394C1600.17,1394.83 1612.83,1392.5 1616,1394C1618.71,1395.28 1613.29,1401.72 1616,1403C1619.17,1404.5 1631.83,1401.67 1635,1403C1637.46,1404.04 1632.65,1409.75 1635,1411C1637.5,1412.33 1647.5,1410.17 1650,1411C1651.58,1411.53 1648.51,1415.26 1650,1416C1651.67,1416.83 1658.33,1415.5 1660,1416C1660.96,1416.29 1659.08,1418.61 1660,1419C1661.17,1419.5 1665.83,1417.83 1667,1419C1668.17,1420.17 1664.8,1425.23 1667,1426C1670.33,1427.17 1680.5,1426 1687,1426C1693.33,1426 1702.83,1424.83 1706,1426C1708.19,1426.81 1704.17,1431.83 1706,1433C1707.83,1434.17 1715.17,1432.5 1717,1433C1717.97,1433.26 1716.06,1435.65 1717,1436C1718.33,1436.5 1723.67,1434.67 1725,1436C1726.33,1437.33 1724.26,1441.93 1725,1444C1725.7,1445.97 1727.95,1446.95 1729.43,1448.43C1732.7,1451.7 1737.59,1462.15 1744.6,1463.6C1756.86,1466.12 1791.27,1466.86 1803,1463.6C1810.38,1461.54 1810.33,1447.27 1815,1444C1819.37,1440.94 1827.22,1442.89 1831,1444C1834.01,1444.88 1834.71,1449.58 1837.65,1450.65C1841.32,1451.99 1850.44,1449.84 1853,1452C1855.56,1454.16 1850.33,1461.66 1853,1463.6C1855.67,1465.53 1865.47,1462.74 1869,1463.6C1871.37,1464.17 1871.76,1468.36 1874.16,1468.76C1879.33,1469.62 1894.69,1463.72 1900,1468.76C1905.31,1473.8 1905,1490.46 1906,1499C1906.81,1505.95 1907.67,1513.67 1906,1520C1904.33,1526.33 1898.5,1531.67 1896,1537C1893.76,1541.77 1891.69,1546.78 1891,1552C1890.17,1558.33 1889.5,1568.33 1891,1575C1892.41,1581.26 1897.5,1586.67 1900,1592C1902.29,1596.88 1904.25,1601.91 1906,1607C1907.83,1612.33 1908.3,1618.75 1911,1624C1913.83,1629.5 1919.5,1635.83 1923,1640C1925.73,1643.25 1930.74,1644.95 1932,1649C1933.5,1653.83 1929.83,1664.67 1932,1669C1934.13,1673.27 1942.83,1673 1945,1675C1946.47,1676.36 1945.83,1680 1945,1681C1944.17,1682 1940.63,1679.46 1940,1681C1938.5,1684.67 1937.33,1696.67 1936,1703C1934.87,1708.38 1934.17,1715.5 1932,1719C1930.19,1721.92 1923,1720.57 1923,1724C1923,1731.33 1934,1755.5 1932,1763C1930.12,1770.03 1917.83,1768 1911,1769C1904.4,1769.97 1897.14,1768.17 1891,1769C1885.2,1769.79 1878.83,1775 1874.16,1774C1869.5,1773 1867.19,1765.83 1863,1763C1858.81,1760.17 1853.22,1758.67 1849,1757C1845.27,1755.53 1840.15,1753.67 1837.65,1753C1836.48,1752.69 1834.42,1751.86 1834,1753C1833.39,1754.67 1835.5,1761.33 1834,1763C1832.5,1764.67 1827.42,1761.23 1825,1763C1822.5,1764.83 1820.67,1772.17 1819,1774C1818.1,1774.99 1815.67,1773 1815,1774C1814.33,1775 1813.33,1779 1815,1780C1816.67,1781 1823.33,1779.17 1825,1780C1826.49,1780.75 1823.36,1784.71 1825,1785C1829.67,1785.83 1847.67,1781.5 1853,1785C1858.33,1788.5 1856.33,1800.5 1857,1806C1857.48,1809.97 1857.45,1814.03 1857,1818C1856.33,1823.83 1856.83,1834.67 1853,1841C1849.17,1847.33 1840.33,1853.5 1834,1856C1828.11,1858.33 1818.17,1852.33 1815,1856C1811.83,1859.67 1814.33,1871.17 1815,1878C1815.63,1884.44 1820,1892.17 1819,1897C1818.05,1901.62 1809,1902.29 1809,1907C1809,1911.83 1816.33,1922.83 1819,1926C1820.29,1927.53 1824,1925.17 1825,1926C1826,1926.83 1825,1929.33 1825,1931C1825,1933.5 1826,1938 1825,1941C1824,1944 1819,1946.33 1819,1949C1819,1951.67 1824.25,1953.75 1825,1957C1826,1961.33 1826.67,1972 1825,1975C1823.38,1977.91 1818.33,1975 1815,1975C1808.5,1975 1791.5,1973.33 1786,1975C1782.56,1976.04 1784.76,1982.71 1782,1985C1772.57,1992.83 1738.19,2010.83 1729.43,2022C1723.26,2029.87 1728.34,2046.33 1729.43,2052C1729.92,2054.52 1735.2,2053.56 1736,2056C1737.1,2059.33 1741.3,2072.64 1736,2072C1730.5,2071.33 1711.17,2053.83 1703,2052C1697.03,2050.66 1692.94,2059.52 1687,2061C1681,2062.5 1673.17,2060.17 1667,2061C1661.15,2061.79 1654,2061.67 1650,2066C1646,2070.33 1646,2083.5 1643,2087C1640.61,2089.78 1635.21,2088.77 1632,2087C1628.67,2085.17 1627.52,2077.42 1623,2076C1617.17,2074.17 1605.67,2076 1597,2076C1586,2076 1566.33,2075.17 1557,2076C1551.43,2076.5 1545.5,2079.67 1541,2081C1537.36,2082.08 1533.35,2082.2 1530,2084C1525.33,2086.5 1515.83,2091.17 1513,2096C1510.17,2100.83 1516.77,2108.76 1513,2113C1506.33,2120.5 1481.5,2134 1473,2141C1468.42,2144.77 1466.33,2155 1462,2155C1457.67,2155 1453.62,2142.72 1447,2141C1438,2138.67 1419.17,2141.83 1408,2141C1398.55,2140.29 1385.67,2138.17 1380,2136C1376.89,2134.81 1377.03,2129.4 1374,2128C1367.5,2125 1352.28,2120.23 1341,2118C1328.33,2115.5 1312.19,2115.6 1298,2113C1282.5,2110.17 1262,2103 1248,2101C1236.78,2099.4 1223.17,2101.83 1214,2101C1206.83,2100.35 1200.03,2097.54 1193,2096C1182.33,2093.67 1160.83,2089.5 1150,2087C1142.59,2085.29 1135.39,2082.79 1128,2081C1117.67,2078.5 1099.33,2076.17 1088,2072C1077.91,2068.29 1066.83,2062 1060,2056C1054.03,2050.75 1050.17,2040.67 1047,2036C1045.13,2033.24 1042.28,2031.08 1041,2028C1039,2023.17 1038.83,2011.33 1035,2007C1031.17,2002.67 1021.97,2006.38 1018,2002C1013.17,1996.67 1006,1981.17 1006,1975C1006,1969.79 1014.73,1969.05 1018,1965C1021.5,1960.67 1028.33,1951.67 1027,1949C1025.67,1946.33 1015.57,1947.94 1010,1949C1003,1950.33 992.729,1952.9 985,1957C976.833,1961.33 969.333,1971.17 961,1975C952.982,1978.69 942.5,1981.67 935,1980C927.5,1978.33 921.5,1965.83 916,1965C910.5,1964.17 907.474,1973.29 902,1975C894,1977.5 877.667,1979.17 868,1980C860.03,1980.69 850.333,1979.17 844,1980C839.087,1980.65 833.737,1981.75 830,1985C824.833,1989.5 817.088,1998.68 813,2007C808.167,2016.83 810,2039.17 801,2044C792,2048.83 769.5,2040.83 759,2036C750.007,2031.86 745.667,2018.5 738,2015C730.419,2011.54 719.333,2015 713,2015C708.667,2015 702.064,2018.81 700,2015C697.833,2011 701.667,1996.83 700,1991C698.639,1986.24 692.821,1982.67 690,1980C687.93,1978.04 684.749,1975 683.073,1975C681.396,1975 680.988,1978.34 679.94,1980C678.261,1982.67 676.323,1989.17 673,1991C669.677,1992.83 662.667,1991 660,1991C659,1991 657.184,1990.02 657,1991C656.5,1993.67 660.167,2003 657,2007C653.833,2011 642.667,2013.67 638,2015C635.115,2015.82 631.662,2016.38 629,2015C624.833,2012.83 618.852,2005.6 613,2002C606.5,1998 594.667,1996.17 590,1991C585.394,1985.9 590.085,1975.62 585,1971C579.5,1966 564.667,1963.33 557,1961C551.12,1959.21 542,1961.33 539,1957C536,1952.67 539.833,1940.83 539,1935C538.343,1930.4 535.398,1926.43 534,1922C532,1915.67 526.167,1905.33 527,1897C527.833,1888.67 535.548,1878.33 539,1872C541.496,1867.42 547.043,1864.17 547.71,1859C548.377,1853.83 545.285,1845.33 543,1841C541.128,1837.45 535.5,1835.33 534,1833C532.918,1831.32 532.4,1828.2 534,1827C537.333,1824.5 548.5,1822.67 554,1818C559.5,1813.33 563,1802.17 567,1799C569.875,1796.72 576.167,1797.83 578,1799C579.833,1800.17 575.868,1805.05 578,1806C582.5,1808 599.167,1807.5 605,1811C610.113,1814.07 609,1822.67 613,1827C617,1831.33 626.333,1834.67 629,1837C630.003,1837.88 629,1839.67 629,1841C629,1844.17 627.5,1852.33 629,1856C630.439,1859.52 634.221,1862.6 638,1863C642.667,1863.5 654.833,1856.5 657,1859C659.167,1861.5 652,1873.67 651,1878C650.475,1880.27 649.5,1883.83 651,1885C652.5,1886.17 657.492,1886.65 660,1885C664.823,1881.83 674.071,1871.83 679.94,1866C685.17,1860.8 693.539,1856.5 695.215,1850C696.892,1843.5 690.8,1834.82 690,1827C689.131,1818.5 688.333,1803.59 690,1799C691.138,1795.86 698.333,1797.45 700,1799.45C701.667,1801.45 697.833,1809.07 700,1811C702.167,1812.93 709.333,1811.83 713,1811C716.347,1810.24 718.618,1806.58 722,1806C726.833,1805.17 735.833,1804 742,1806C748.167,1808 752.356,1816.01 759,1818C765.667,1820 775.667,1814.17 782,1818C788.333,1821.83 794.5,1834.67 797,1841C798.836,1845.65 794.333,1854 797,1856C799.667,1858 807.794,1854.53 813,1853C819.167,1851.19 827.833,1846.44 834,1845.12C839.216,1844.02 845.294,1847.63 850,1845.12C855.667,1842.1 863.775,1831.52 868,1827C870.644,1824.17 871.605,1818.99 875.349,1818C881.016,1816.5 896.558,1821.09 902,1818C907.442,1814.91 904.833,1802.46 908,1799.45C911.141,1796.46 916.722,1800.62 921,1799.91C928.5,1798.67 942.078,1793.2 953,1792C965,1790.68 983,1792 993,1792C999.667,1792 1009.67,1795 1013,1792C1016.33,1789 1010.97,1779.65 1013,1774C1015.33,1767.5 1023.33,1753.83 1027,1753C1030.67,1752.17 1029.63,1766.4 1035,1769C1040.5,1771.67 1053.5,1767.17 1060,1769C1065.71,1770.61 1069.33,1777.33 1074,1780C1078.3,1782.46 1084.5,1786 1088,1785C1091.5,1784 1091.01,1775.73 1095,1774C1101.17,1771.33 1118,1767.17 1125,1769C1131.45,1770.69 1135,1779.85 1137,1785C1138.8,1789.63 1137.18,1796.41 1137,1799.91C1136.9,1801.97 1134.73,1804.33 1135.93,1806C1138.1,1809.01 1145.67,1814.5 1150,1818C1153.87,1821.13 1158.42,1825.5 1161.92,1827C1164.7,1828.19 1169.51,1829.63 1171,1827C1172.51,1824.33 1169.54,1816.13 1171,1811C1172.67,1805.17 1179.33,1798.17 1181,1792C1182.57,1786.21 1181,1778.83 1181,1774C1181,1770.33 1184.18,1764.33 1181,1763C1177.82,1761.67 1167.08,1767.67 1161.92,1766C1156.75,1764.33 1149.39,1758.85 1150,1753C1150.68,1746.5 1165,1736.5 1166,1727C1167,1717.5 1160.83,1705.67 1156,1696C1151.17,1686.33 1141.67,1675.34 1137,1669C1134.19,1665.18 1130,1661.32 1128,1657.99C1126.38,1655.28 1123.55,1651.8 1125,1649C1127.33,1644.5 1139.17,1635.83 1142,1631C1143.85,1627.84 1138.79,1621.77 1142,1620C1145.32,1618.17 1156.25,1623 1161.92,1620C1167.58,1617 1169.49,1605.96 1176,1602C1183.68,1597.33 1197.83,1595.67 1208,1592C1217.84,1588.45 1230.33,1584.67 1237,1580C1242.3,1576.29 1246.24,1570.23 1248,1564C1250.83,1554 1250.5,1528.83 1254,1520C1256.15,1514.58 1263.21,1510.34 1269,1511C1276.33,1511.83 1290.33,1525 1298,1525C1305.34,1525 1312.32,1517.83 1315,1511C1318.67,1501.67 1317.83,1478 1320,1469C1321.12,1464.33 1323.41,1455.58 1328,1457C1335,1459.17 1356.33,1475 1362,1482C1365.57,1486.4 1357.93,1495.06 1362,1499C1367,1503.83 1383.5,1508 1392,1511C1398.87,1513.43 1406.5,1517.85 1413,1517.02C1419.5,1516.19 1426.5,1510 1431,1506C1434.94,1502.5 1436.62,1494.17 1440,1493C1443.38,1491.83 1447.07,1498.24 1451.26,1499C1456.76,1500 1466.54,1497.83 1473,1499C1479.03,1500.09 1487.17,1508 1490,1506Z" fill="white" stroke="#daeef2" strokeWidth="3" transform="translate(-526.919,-1381.35)"/>
              </g>

              {/* Bird moving along route */}
              <g transform="translate(889, 450)">
                <image
                  href="/logos/logo-bird-for-white-bg.svg"
                  x="-108"
                  y="-90"
                  width="216"
                  height="180"
                />
              </g>

              {/* City dots */}
              <g fill="#038390">
                <circle cx="871" cy="229" r="16"/>
                <circle cx="671" cy="377" r="16"/>
                <circle cx="926" cy="676" r="16"/>
                <circle cx="377" cy="527" r="16"/>
                <circle cx="1118" cy="219" r="16"/>
                <circle cx="1118" cy="535" r="16"/>
                <circle cx="1248" cy="237" r="16"/>
                <circle cx="65" cy="450" r="16"/>
              </g>
              <g fill="white">
                <circle cx="871" cy="229" r="7"/>
                <circle cx="671" cy="377" r="7"/>
                <circle cx="926" cy="676" r="7"/>
                <circle cx="377" cy="527" r="7"/>
                <circle cx="1118" cy="219" r="7"/>
                <circle cx="1118" cy="535" r="7"/>
                <circle cx="1248" cy="237" r="7"/>
                <circle cx="65" cy="450" r="7"/>
              </g>


              {/* City labels */}
              <g fontFamily="DM Sans, sans-serif" fontSize="28" fontWeight="600" fill="#1A1A1A">
                <text x="871" y="198" textAnchor="middle">Linz</text>
                <text x="671" y="346" textAnchor="middle">Salzburg</text>
                <text x="926" y="745" textAnchor="middle">Klagenfurt</text>
                <text x="377" y="496" textAnchor="middle">Innsbruck</text>
                <text x="1118" y="188" textAnchor="middle">St. Pölten</text>
                <text x="1118" y="504" textAnchor="middle">Graz</text>
                <text x="1248" y="206" textAnchor="middle">Wien</text>
                <text x="65" y="419" textAnchor="middle">Bregenz</text>
              </g>
            </svg>
          </div>

        </div>
      </section>
      {/* ── END HERO2 ── */}

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
      <section style={{ background: '#1A1A1A', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ffffff', marginBottom: 16 }}>Що таке QLIXA</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 12 }}>
              Це один кабінет замість купи різних <em style={{ fontStyle: 'italic', color: '#038390' }}>сервісів.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto', lineHeight: 1.7, textAlign: 'center' }}>
              Де ти зручною мовою вирішуєш щоденні фінансові та бізнес питання.
            </p>
          </div>

          {/* 3×3 grid with QLIXA center */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 14, height: 522 }}>

            {/* Card 1 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/tax-return.png" alt="Повернення податку" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Щорічне повернення твого податку</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Платформа знаходить усі можливі списання та допомагає повернути максимум із того, що тобі належить.</div>
            </div>

            {/* Card 2 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/interface.png" alt="Інтерфейс" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Інтерфейс, який зрозуміє навіть новачок</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Ніяких складних таблиць, бухгалтерських термінів і незрозумілих кнопок. Все пояснюється крок за кроком.</div>
            </div>

            {/* Card 3 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/not-for-accountants.png" alt="Не для бухгалтерів" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Не програма для бухгалтерів</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Це платформа для звичайних людей. Для тих, хто хоче займатися своїм життям або бізнесом, а не годинами розбиратися в документах.</div>
            </div>

            {/* Card 4 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/laws.png" alt="Закони" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Тисячі сторінок законів, перекладених людською мовою</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Ми вже вивчили правила за тебе і перетворили їх на прості запитання та автоматичні підказки.</div>
            </div>

            {/* CENTER — QLIXA logo */}
            <div style={{ background: '#1A1A1A', borderRadius: 24, padding: '8px 12px', boxShadow: '4px 4px 0 #1A1A1A', border: '1.5px solid #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 6, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
                <svg viewBox="0 0 497 116" xmlns="http://www.w3.org/2000/svg" style={{ width: '90%', maxWidth: 220, height: 'auto' }}>
                  <defs>
                    <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(711.226,0,0,165.405,336.274,2201.12)"><stop offset="0" style={{stopColor:'#ffffff',stopOpacity:1}}/><stop offset="1" style={{stopColor:'rgba(255,255,255,0.7)',stopOpacity:1}}/></linearGradient>
                  </defs>
                  <g transform="matrix(1,0,0,1,-194.465,-869.986)">
                    <g transform="matrix(1,0,0,1,-1.84252,-2655.14)">
                      <g transform="matrix(0.697492,0,0,0.697492,-38.2408,2047.54)">
                        <path d="M431.998,2273.76C425.284,2275.99 417.248,2277.11 407.889,2277.11C388.358,2277.11 372.217,2271.28 359.468,2259.62C344.005,2245.58 336.274,2224.96 336.274,2197.77C336.274,2170.37 344.209,2149.65 360.078,2135.61C373.031,2124.15 389.137,2118.42 408.397,2118.42C427.793,2118.42 444.069,2124.49 457.226,2136.63C472.417,2150.67 480.012,2170.3 480.012,2195.53C480.012,2208.89 478.384,2220.08 475.129,2229.1C472.484,2237.71 468.585,2244.87 463.431,2250.56L480.724,2266.74L464.346,2283.83L446.239,2266.74C440.746,2270.06 435.999,2272.4 431.998,2273.76ZM425.284,2246.7L410.127,2232.25L426.301,2215.37L441.458,2229.81C443.832,2224.93 445.493,2220.66 446.443,2216.99C447.935,2211.5 448.681,2205.09 448.681,2197.77C448.681,2180.95 445.239,2167.95 438.356,2158.76C431.472,2149.57 421.418,2144.97 408.194,2144.97C395.784,2144.97 385.882,2149.38 378.49,2158.2C371.098,2167.01 367.402,2180.2 367.402,2197.77C367.402,2218.32 372.692,2233.03 383.271,2241.92C390.121,2247.68 398.327,2250.56 407.889,2250.56C411.483,2250.56 414.942,2250.12 418.265,2249.24C420.096,2248.77 422.436,2247.92 425.284,2246.7Z" fill="url(#cg1)" fillRule="nonzero"/>
                        <path d="M503.917,2123L535.249,2123L535.249,2245.99L609.508,2245.99L609.508,2272.94L503.917,2272.94L503.917,2123Z" fill="url(#cg1)" fillRule="nonzero"/>
                        <rect x="628.734" y="2123" width="31.128" height="149.943" fill="url(#cg1)" fillRule="nonzero"/>
                        <path d="M809.602,2272.94L771.557,2272.94L743.074,2221.88L712.963,2272.94L676.545,2272.94L724.763,2196.55L678.885,2123L716.32,2123L743.074,2171.73L770.539,2123L806.754,2123L760.875,2195.33L809.602,2272.94Z" fill="url(#cg1)" fillRule="nonzero"/>
                        <g transform="matrix(1.42857,0,0,1.42857,-751.071,1379.87)">
                          <path d="M1098,626L1147,521L1177,575L1259,546C1205.66,573.145 1151.96,599.762 1098,626ZM1129,596L1162,581L1147,557L1129,596Z" fill="url(#cg1)"/>
                          <path d="M1190,604L1197,617L1175,617L1175,612L1190,604Z" fill="url(#cg1)"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: 'rgba(255,255,255,0.85)', letterSpacing: '1px', textAlign: 'center' }}>просто про складне</div>
              </div>
            </div>

            {/* Card 5 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/no-deductions-missed.png" alt="Жодного списання" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Жодного пропущеного списання</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Платформа аналізує твою ситуацію та знаходить можливості, про які більшість людей навіть не знає.</div>
            </div>

            {/* Card 6 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/no-deadlines-missed.png" alt="Жодного дедлайну" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Жодного пропущеного дедлайну</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Платформа сама нагадає про важливі дати, щоб ти не отримав штраф через забудькуватість.</div>
            </div>

            {/* Card 7 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/business.png" alt="Бізнес-помічник" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Бізнес-помічник на кожен день</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Рахунки, клієнти, витрати, показники бізнесу та документи — все в одному зрозумілому кабінеті.</div>
            </div>

            {/* Card 8 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/languages.png" alt="Мови" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Складне, пояснене просто</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Українською, англійською, російською та німецькою — обирай зручну мову і починай.</div>
            </div>

          </div>
        </div>
      </section>


      {/* ── ДЛЯ КОГО ── */}
      <section id="для-кого" style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>Для кого</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 12 }}>
              QLIXA підходить, <em style={{ fontStyle: 'italic', color: '#038390' }}>якщо ти:</em>
            </h2>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>

            {[
              { img: '/for-who/frilanser.png', title: 'Самозайнятий / Фрілансер', desc: 'Neue Selbstständige, Gewerbe або вільна професія — IT, дизайн, консалтинг. QLIXA замінить Steuerberater за частку вартості.', href: '/for/frilanser' },
              { img: '/for-who/samostiynyy.png', title: 'Капітальні та закордонні доходи', desc: 'Маєш дохід від продажу акцій, нерухомості або з-за кордону? QLIXA розрахує KESt та інші зобов\'язання точно і без помилок.', href: '/for/samostiynyy' },
              { img: '/for-who/biznes.png', title: 'Маленький бізнес', desc: 'Або тільки плануєш відкрити — QLIXA пройде з тобою кожен крок від реєстрації до звітів.', href: '/for/biznes' },
              { img: '/for-who/nerukhomist.png', title: 'Здаєш нерухомість', desc: 'Або маєш дохід з кількох джерел — платформа врахує всі надходження та списання.', href: '/for/nerukhomist' },
              { img: '/for-who/pensioner.png', title: 'Пенсіонер з доходом', desc: "Додатковий дохід від підробітку — QLIXA розрахує твої зобов'язання просто і зрозуміло.", href: '/for/pensioner' },
              { img: '/for-who/naymanyy.png', title: 'Найманий працівник', desc: 'Працюєш по найму, але хочеш контролювати свої фінанси та правильно розрахувати щорічне повернення податків.', href: '/for/naymanyy' },
            ].map((card, i) => (
              <Link key={i} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.img} alt={card.title} style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{card.title}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.65 }}>{card.desc}</div>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* ── DEMO ── */}
      <section id="demo" style={{ background: '#1A1A1A', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.15)', border: '1px solid rgba(3,131,144,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>Як це працює</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 0 }}>
              Все просто — 4 кроки і <em style={{ fontStyle: 'italic', color: '#038390' }}>жодних складних термінів</em>
            </h2>
          </div>

          {/* 4 cards in a row */}
          <div id="demo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              {
                num: '1',
                img: '/how-it-works/step-1.png',
                title: 'Відповідаєш на прості питання.',
                em: 'прості питання.',
                before: 'Відповідаєш на ',
                desc: 'Ніяких складних форм. Просто обираєш відповідь — і QLIXA вже знає твою ситуацію.',
              },
              {
                num: '2',
                img: '/how-it-works/step-2.png',
                title: 'QLIXA аналізує.',
                em: 'аналізує.',
                before: 'QLIXA ',
                desc: 'Знаходить усі можливі списання та податкові можливості, про які ти навіть не знав.',
              },
              {
                num: '3',
                img: '/how-it-works/step-3.png',
                title: 'Натискаєш одну кнопку.',
                em: 'одну кнопку.',
                before: 'Натискаєш ',
                desc: 'QLIXA формує звіти та готує дані для FinanzOnline автоматично.',
              },
              {
                num: '4',
                img: '/how-it-works/step-4.png',
                title: 'Отримуєш результат.',
                em: 'результат.',
                before: 'Отримуєш ',
                desc: 'Біжи працювати далі — QLIXA зробить всю складну роботу.',
              },
            ].map((card) => (
              <div key={card.num} style={{ background: '#242424', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ width: '100%', aspectRatio: '4/3', background: '#F0F7F8', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />

                </div>
                {/* Text */}
                <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.3px', margin: 0 }}>
                    {card.before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{card.em}</em>
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet: 2x2 grid override */}
          <style>{`
            @media (max-width: 900px) {
              #demo-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 540px) {
              #demo-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

        </div>
      </section>



      {/* ── FEATURES ── */}

      {/* ── WHY QLIXA ── */}
      <section style={{ padding: '64px clamp(20px,6vw,80px)', background: '#F0F7F8' }}>
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
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>Чому QLIXA</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 400, color: '#1A1A1A', marginTop: 10, letterSpacing: '-0.5px' }}>
              Ми створили платформу, якої нам самим <em style={{ fontStyle: 'italic', color: '#038390' }}>колись не вистачало.</em>
            </h2>
          </div>

          {/* Main grid: animation left, text right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52, alignItems: 'center' }}>

            {/* ── STAGE ── */}
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 24, border: '1.5px solid #1A1A1A', boxShadow: '4px 4px 0 #1A1A1A', position: 'relative', overflow: 'hidden', background: '#026B76' }}>

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
      <section id="faq" style={{ padding: '32px clamp(20px,6vw,80px)', background: '#F0F7F8' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>Часті запитання</div>
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
