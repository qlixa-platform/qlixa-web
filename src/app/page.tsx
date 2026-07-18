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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [heroBg, setHeroBg] = useState('hero-background-ua');

  useEffect(() => {
    const updateBg = () => {
      const lang = localStorage.getItem('qlixa-lang') || 'UA';
      setHeroBg(`hero-background-${lang.toLowerCase()}`);
    };
    updateBg();
    window.addEventListener('qlixa-lang-change', updateBg);
    return () => window.removeEventListener('qlixa-lang-change', updateBg);
  }, []);

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

      {false && (
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
      )}

      {/* ── HERO ── */}
      <section style={{ background: '#F0F7F8', backgroundImage: `url(/${heroBg}.png)`, backgroundSize: 'cover', backgroundPosition: 'center right', backgroundRepeat: 'no-repeat', padding: 'clamp(24px,4vh,48px) clamp(20px,4vw,60px)', display: 'flex', alignItems: 'center', boxSizing: 'border-box' as const, height: 'calc(100vh - 114px)', overflow: 'visible', position: 'relative' as const }}>
        <div style={{ width: '100%' }}>

          {/* LEFT — text */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', gap: 0 }}>

            {/* Badge */}
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20, display: 'inline-block', padding: '4px 12px', border: '1px solid rgba(3,131,144,0.3)', borderRadius: 999, background: 'rgba(3,131,144,0.07)', width: 'fit-content' }}>
              Твій цифровий бізнес-помічник в Австрії
            </div>

            {/* H1 line 1 */}
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.2vw,48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 6 }}>
              Разом розберемось з податками,
            </h1>

            {/* H1 line 2 — dark highlighted */}
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.2vw,48px)', fontWeight: 700, fontStyle: 'italic', color: '#ffffff', background: '#1A1A1A', padding: '2px 16px 6px', borderRadius: 6, lineHeight: 1.2, letterSpacing: '-0.5px', display: 'inline' }}>
                фінансами та бізнесом
              </span>
            </div>

            {/* Subheading */}
            <p style={{ fontSize: 'clamp(17px,1.6vw,21px)', color: '#1A1A1A', lineHeight: 1.5, marginBottom: 20, fontWeight: 600 }}>
              Один кабінет замість купи сервісів для
            </p>

            {/* Audience pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 32 }}>
              <Link href="/for/frilanser"
                style={{ fontSize: 13, fontWeight: 600, color: '#026B76', border: '1.5px solid rgba(3,131,144,0.35)', borderRadius: 999, padding: '6px 16px', background: 'rgba(3,131,144,0.07)', whiteSpace: 'nowrap' as const, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease', display: 'inline-block' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#038390'; el.style.color='#ffffff'; el.style.border='1.5px solid #038390'; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 4px 12px rgba(3,131,144,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(3,131,144,0.07)'; el.style.color='#026B76'; el.style.border='1.5px solid rgba(3,131,144,0.35)'; el.style.transform=''; el.style.boxShadow=''; }}>
                Самозайнятих
              </Link>
              <Link href="/for/biznes"
                style={{ fontSize: 13, fontWeight: 600, color: '#026B76', border: '1.5px solid rgba(3,131,144,0.35)', borderRadius: 999, padding: '6px 16px', background: 'rgba(3,131,144,0.07)', whiteSpace: 'nowrap' as const, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease', display: 'inline-block' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#038390'; el.style.color='#ffffff'; el.style.border='1.5px solid #038390'; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 4px 12px rgba(3,131,144,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(3,131,144,0.07)'; el.style.color='#026B76'; el.style.border='1.5px solid rgba(3,131,144,0.35)'; el.style.transform=''; el.style.boxShadow=''; }}>
                Малого бізнесу
              </Link>
              <Link href="/for/naymanyy"
                style={{ fontSize: 13, fontWeight: 600, color: '#026B76', border: '1.5px solid rgba(3,131,144,0.35)', borderRadius: 999, padding: '6px 16px', background: 'rgba(3,131,144,0.07)', whiteSpace: 'nowrap' as const, textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease', display: 'inline-block' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='#038390'; el.style.color='#ffffff'; el.style.border='1.5px solid #038390'; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 4px 12px rgba(3,131,144,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(3,131,144,0.07)'; el.style.color='#026B76'; el.style.border='1.5px solid rgba(3,131,144,0.35)'; el.style.transform=''; el.style.boxShadow=''; }}>
                Найманих працівників
              </Link>
            </div>

            {/* CTA */}
            <div style={{ marginBottom: 28 }}>
              <a href="/pricing"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', background: '#038390', color: '#fff', borderRadius: 14, fontSize: 16, fontWeight: 800, textDecoration: 'none', boxShadow: '0 6px 20px rgba(3,131,144,0.4), 3px 3px 0 #026B76', letterSpacing: '0.2px', transition: 'all 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#026B76';
                  el.style.boxShadow = '0 8px 28px rgba(3,131,144,0.55), 2px 2px 0 #015f68';
                  el.style.transform = 'translateY(-2px)';
                  el.style.gap = '12px';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#038390';
                  el.style.boxShadow = '0 6px 20px rgba(3,131,144,0.4), 3px 3px 0 #026B76';
                  el.style.transform = '';
                  el.style.gap = '8px';
                }}>
                Вибрати свій тариф →
              </a>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
              {[
                '1 200+ клієнтів',
                'FinanzOnline під контролем',
                'Економія €450/рік на бухгалтері',
              ].map((item, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 11, color: '#888' }}>✓ {item}</span>
                  {i < 2 && <span style={{ color: '#ccc', fontSize: 11, marginLeft: 6 }}>•</span>}
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* Girl image — overflows into navbar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-girl.png"
          alt=""
          style={{
            position: 'absolute',
            right: 'clamp(0px, 5vw, 80px)',
            bottom: 0,
            height: '115%',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        />
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
            { text: '📊 Складна система — простими кроками' },
            { text: '👥 Клієнти та постачальники під контролем' },
            { text: '🛒 Склад у порядку' },
            { text: '📄 Рахунки одним кліком' },
            { text: '📋 Звіти ПДВ на автопілоті' },
            { text: '📈 KPI під рукою' },
            { text: '🧮 Розрахунки на основі твоїх даних' },
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
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>Платформа підказує, які списання можна врахувати, та допомагає повернути максимум із того, що тобі належить.</div>
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
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Розуміємо австрійську систему замість вас</div>
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
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Більше не пропустите жодного списання</div>
              </div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.7 }}>На основі твоїх даних платформа показує можливості, про які більшість людей навіть не знає.</div>
            </div>

            {/* Card 6 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/no-deadlines-missed.png" alt="Жодного дедлайну" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25 }}>Більше не пропустите жодного дедлайну</div>
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
              { img: '/for-who/frilanser.png', title: 'Самозайнятий / Фрілансер', desc: 'Neue Selbstständige, Gewerbe або вільна професія — IT, дизайн, консалтинг. QLIXA пояснює кожен крок без складних термінів і зайвого стресу.', href: '/for/frilanser' },
              { img: '/for-who/samostiynyy.png', title: 'Маєш капітальні та закордонні доходи', desc: 'Маєш дохід від продажу акцій, нерухомості або з-за кордону? QLIXA розрахує KESt та інші зобов\'язання точно і без помилок.', href: '/for/samostiynyy' },
              { img: '/for-who/biznes.png', title: 'Ведеш маленький бізнес', desc: 'Або тільки плануєш відкрити — QLIXA пройде з тобою кожен крок від реєстрації до звітів.', href: '/for/biznes' },
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
                title: 'QLIXA розраховує.',
                em: 'аналізує.',
                before: 'QLIXA ',
                desc: 'На основі твоїх даних показує суми, можливості та наступні кроки.',
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
                desc: 'Біжи працювати далі — QLIXA підготує всі дані — ти приймаєш рішення.',
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



      {/* ── WHY QLIXA — redesigned ── */}
      <section style={{ background: '#ffffff', padding: '48px clamp(20px,6vw,80px) 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* BLOCK 1 — Story header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>Чому QLIXA</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 20 }}>
                Ми створили платформу,<br/>якої нам самим{' '}
                <em style={{ fontStyle: 'italic', color: '#038390' }}>не вистачало</em>
              </h2>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, maxWidth: 520 }}>
                Ми теж проходили цей шлях.<br/>
                Саме тому знаємо, що відчуває людина,<br/>
                яка тільки починає життя чи бізнес в Австрії.
              </p>
            </div>
            <div style={{ flex: '0 0 500px', display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/why-qlixa/founders.png" alt="Засновники QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* BLOCK 2 — Pain cards */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 0 }}>
              Це <em style={{ fontStyle: 'italic', color: '#038390' }}>знайоме?</em>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              { img: '/why-qlixa/fear-mistake.png', title: 'Боїшся зробити помилку', desc: 'Не тому що не вмієш. А тому що система здається дуже складною.' },
              { img: '/why-qlixa/complex-words.png', title: 'Забагато незрозумілих слів', desc: 'Хочеться, щоб усе пояснили простою мовою. Без бухгалтерського словника.' },
              { img: '/why-qlixa/no-time.png', title: 'Немає часу розбиратися', desc: 'Після роботи хочеться бути з родиною. Не сидіти вечорами над деклараціями.' },
              { img: '/why-qlixa/unique-situation.png', title: 'Кожна ситуація різна', desc: 'Дохід. Оренда. Діти. Бізнес. Хочеться саме для своєї ситуації.' },
              { img: '/why-qlixa/expensive.png', title: 'Консультація коштує дорого', desc: 'А питань менше не стає.' },
              { img: '/why-qlixa/my-language.png', title: 'Хочеться щоб пояснили моєю мовою', desc: 'Без складних термінів. Щоб було зрозуміло з першого разу.' },
              { img: '/why-qlixa/deadline.png', title: 'Страшно пропустити дедлайн', desc: 'Ніхто не хоче отримати штраф лише тому, що забув дату.' },
              { img: '/why-qlixa/return-all.png', title: 'Хочеться повернути все, що належить', desc: 'Без сумнівів: "А може я щось пропустив?"' },
            ].map((card, i) => (
              <div key={i}
                style={{ background: '#F0F7F8', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.10)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default', display: 'flex', flexDirection: 'column' as const }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 12px 32px rgba(3,131,144,0.12)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform=''; el.style.boxShadow=''; }}>
                <div style={{ width: '100%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 0' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                </div>
                <div style={{ padding: '16px 20px 24px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{card.title}</div>
                  <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.65 }}>{card.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* BLOCK 3 — QLIXA solution */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>
              Саме тому народилась <span style={{ color: '#038390', fontWeight: 700 }}>QLIXA</span>
            </h3>
            <p style={{ fontSize: 16, color: '#595959', maxWidth: 600, margin: '0 auto' }}>
              Не ще один складний інструмент.<br/>
              А платформа, яка пояснює складне простими словами і допомагає пройти цей шлях спокійно.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'stretch' }}>

            {/* Left — feature list */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20, background: '#F0F7F8', borderRadius: 24, padding: 28, boxShadow: '0 8px 40px rgba(3,131,144,0.10)' }}>
              {[
                { icon: '💬', title: 'Пояснюємо людською мовою', desc: 'Без складних термінів і стресу.' },
                { icon: '👣', title: 'Показуємо наступний крок', desc: 'Ти завжди знаєш, що робити далі.' },
                { icon: '🔔', title: 'Нагадуємо про дедлайни', desc: 'Щоб нічого не пропустити.' },
                { icon: '📁', title: 'Збираємо все в одному місці', desc: 'Документи, податки, бізнес, FinanzOnline.' },
                { icon: '💶', title: 'Допомагаємо знайти всі можливі списання', desc: 'Щоб повернути максимум.' },
                { icon: '🎯', title: 'Підлаштовуємося під твою ситуацію', desc: 'Бо двох однакових історій не існує.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px rgba(3,131,144,0.08)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — quote card */}
            <div style={{ background: '#F0F7F8', borderRadius: 24, padding: 28, boxShadow: '0 8px 40px rgba(3,131,144,0.10)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/why-qlixa/laptop.png" alt="" style={{ width: '55%', height: 'auto', objectFit: 'contain', display: 'block', marginBottom: 16 }}/>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.4, textAlign: 'center', marginBottom: 16 }}>
                Ми не замінюємо бухгалтера —<br/>
                ми робимо так, щоб ти сам{' '}
                <em style={{ color: '#038390' }}>розумів</em>{' '}
                свою ситуацію.
              </p>
              <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.65, textAlign: 'center', marginBottom: 24 }}>
                Ти економиш час, гроші та нерви.<br/>
                Ми беремо на себе складне,<br/>
                а ти займаєшся тим, що для тебе справді важливо.
              </p>
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
          Твоя ситуація — унікальна. Ми це розуміємо.
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>Кожен клієнт — це окрема історія. QLIXA не працює за шаблоном — ми розбираємося саме у вашій ситуації та допомагаємо знайти найкраще рішення.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
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
            { icon: '😰', q: 'Самозайнятий: боюся зробити помилку в декларації — що буде?', a: 'QLIXA допоможе зібрати та впорядкувати всі дані за рік, якщо ведеш бухгалтерію на платформі. Ми підкажемо, на що звернути увагу для вигіднішого заповнення — наприклад, які витрати можна списати і як правильно їх задокументувати. Проте памʼятай: QLIXA — це цифровий помічник, а не бухгалтер чи Steuerberater. Якщо маєш складну ситуацію або сумніви — рекомендуємо додатково проконсультуватись із Steuerberater.' },
            { icon: '💼', q: 'Найманий працівник: чи можу я повернути свої податки?', a: 'В Австрії роботодавець автоматично подає базові дані про твою зарплату до податкової — але він не вникає в твою особисту ситуацію. Саме тому більшість найманих працівників можуть самостійно подати Arbeitnehmerveranlagung і повернути частину сплачених податків. QLIXA допоможе розібратись саме у твоїй ситуації: знайде всі витрати, які можна врахувати — home office, транспорт, навчання, діти та інше. Просто і швидко, без складних термінів.' },
            { icon: '🇩🇪', q: 'Я не говорю по-німецьки — зможу розібратись?', a: 'Так, саме для цього і створена QLIXA. Платформа повністю доступна українською, російською та англійською. Всі австрійські терміни перекладені і пояснені простими словами.' },
            { icon: '🆕', q: 'Я тільки відкрив Gewerbe. З чого почати?', a: 'Вітаємо з відкриттям! Ось з чого варто почати в QLIXA: підключи бухгалтерію — фіксуй доходи і витрати з першого дня; виставляй рахунки клієнтам прямо з платформи; стеж за дашбордом — він покаже загальну картину твого бізнесу в реальному часі. А щоб не загубитись у перших кроках — читай наші покрокові гайди у розділі Статті.' },
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
