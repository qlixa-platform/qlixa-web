'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_BASE = 'https://cabinet-ten-lac.vercel.app/login'

// ————————————————————————————————————————————————————————————————
// Small reusable pieces (kept local to this page — nothing here is
// generic enough yet to promote into /components).
// ————————————————————————————————————————————————————————————————

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-block', padding: '5px 16px', borderRadius: 999,
      background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)',
      fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const,
      color: '#038390',
    }}>
      {children}
    </div>
  )
}

function SectionHeading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{
      fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700,
      color: '#1A1A1A', lineHeight: 1.2, ...style,
    }}>
      {children}
    </h2>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 15, fontWeight: 700, color: '#038390',
      background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.20)', borderRadius: 999,
      padding: '10px 18px', whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  )
}

function FlowArrowDown() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
      <svg width="20" height="34" viewBox="0 0 20 34">
        <line x1="10" y1="2" x2="10" y2="24" stroke="#038390" strokeWidth="3" strokeLinecap="round" />
        <polygon points="3,22 10,32 17,22" fill="#038390" />
      </svg>
    </div>
  )
}

function FlowArrowRight({ animated = false }: { animated?: boolean }) {
  return (
    <svg width="40" height="18" viewBox="0 0 40 18" style={{ flexShrink: 0 }}>
      <line x1="2" y1="9" x2="28" y2="9" stroke="#038390" strokeWidth="3" strokeLinecap="round">
        {animated && <animate attributeName="x2" values="18;32;18" dur="1.6s" repeatCount="indefinite" />}
      </line>
      <polygon points="28,3 38,9 28,15" fill="#038390">
        {animated && <animate attributeName="points" values="18,3 28,9 18,15;32,3 40,9 32,15;18,3 28,9 18,15" dur="1.6s" repeatCount="indefinite" />}
      </polygon>
    </svg>
  )
}

function YesNoPill({ active, label }: { active?: boolean; label: string }) {
  return (
    <span style={{
      fontSize: 14, fontWeight: 700, padding: '7px 16px', borderRadius: 999,
      background: active ? '#038390' : '#F0F7F8', color: active ? '#fff' : '#9D9D9D',
      border: `1px solid ${active ? '#038390' : '#E6F4F5'}`,
    }}>
      {label}
    </span>
  )
}

// Low-poly / faceted illustration: a person in glasses, mildly overwhelmed by
// Austrian tax terminology, with a few geometric "overload" marks above the
// head. Hand-built placeholder in the brand's teal/charcoal palette — no
// stock art, no emoji. Swap the <svg> contents for a final generated brand
// asset later if one is produced; the surrounding layout won't need to change.
// Language-neutral — used identically in all 4 locales.
function ConfusedFacesIllustration() {
  return (
    <svg width="112" height="128" viewBox="0 0 112 128" aria-hidden focusable="false" style={{ display: 'block', margin: '0 auto' }}>
      {/* overload marks */}
      <g stroke="#038390" strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <line x1="34" y1="14" x2="26" y2="2" />
        <line x1="56" y1="8" x2="56" y2="-4" />
        <line x1="78" y1="14" x2="86" y2="2" />
      </g>
      {/* low-poly head — faceted triangles */}
      <polygon points="56,20 88,40 88,74 56,96 24,74 24,40" fill="#F0F7F8" stroke="#E6F4F5" strokeWidth="1" />
      <polygon points="56,20 88,40 56,58" fill="#038390" />
      <polygon points="56,20 24,40 56,58" fill="#026B76" />
      <polygon points="24,40 24,74 56,58" fill="rgba(3,131,144,0.35)" />
      <polygon points="88,40 88,74 56,58" fill="rgba(3,131,144,0.55)" />
      <polygon points="24,74 56,96 56,58" fill="rgba(26,26,26,0.12)" />
      <polygon points="88,74 56,96 56,58" fill="rgba(26,26,26,0.20)" />
      {/* glasses */}
      <g fill="none" stroke="#1A1A1A" strokeWidth="2.5">
        <rect x="30" y="54" width="18" height="14" rx="4" />
        <rect x="64" y="54" width="18" height="14" rx="4" />
        <line x1="48" y1="60" x2="64" y2="60" />
      </g>
      {/* wide, surprised eyes behind the lenses */}
      <circle cx="39" cy="61" r="3" fill="#1A1A1A" />
      <circle cx="73" cy="61" r="3" fill="#1A1A1A" />
      {/* small open "?!" mouth */}
      <ellipse cx="56" cy="80" rx="5" ry="6" fill="#1A1A1A" opacity="0.85" />
    </svg>
  )
}

function Accordion({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ border: '1px solid #E6F4F5', borderRadius: 14, background: '#fff', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: '18px 22px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' as const,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4 }}>{q}</span>
        <span aria-hidden style={{
          flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: open ? '#038390' : '#F0F7F8',
          color: open ? '#fff' : '#038390', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700, transition: 'transform 0.2s ease', transform: open ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 22px 20px' }}>
          <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

// Official Austrian/German tax terms shown in the "complex terms" cluster.
// These stay in German in every locale — they are the real terms a user
// will encounter on Austrian forms/systems, so they are not translated.
const terms = [
  'Arbeitnehmerveranlagung', 'Einkommensteuererklärung', 'Werbungskosten', 'Sonderausgaben',
  'Außergewöhnliche Belastungen', 'Pendlerpauschale', 'Familienbonus Plus', 'Betriebsausgaben',
]

// ————————————————————————————————————————————————————————————————
// Content — RU is the approved source of truth (wording/order untouched;
// only relocated here from what used to be hardcoded module-level
// constants and inline JSX strings, per the localization pass).
// UA / DE / EN mirror the same field structure.
// ————————————————————————————————————————————————————————————————

const T: Record<string, any> = {
  RU: {
    // Split into two lines on purpose so "без необходимости разбираться в
    // налогах" always renders together on its own line (see visual-polish
    // report — this is a layout-driven split, the wording is unchanged).
    heroH1Line1: 'Налоговая декларация в Австрии —',
    heroH1Line2: 'без необходимости разбираться в налогах',
    heroP1: 'Ты отвечаешь на понятные вопросы о своей работе, доходах, расходах, семье и других обстоятельствах.',
    heroP2: 'QLIXA адаптирует анкету под твои ответы, помогает проверить возможные релевантные категории и подготавливает налоговую декларацию на основе введённых данных.',
    heroCta: 'Начать бесплатно →',
    heroSupport: 'Бесплатный кабинет · Анкету можно начать без оплаты · 4 языка',
    chipsNote: 'Не нужно заранее выбирать «тип налогоплательщика». QLIXA строит анкету по твоей реальной ситуации.',
    situationChips: [
      'Работа по найму',
      'Самозанятость / Gewerbe',
      'Несколько источников дохода',
      'Дети и семья',
      'Аренда недвижимости',
      'Дополнительные и заграничные доходы',
    ],

    s2H2: 'Австрийские налоги выглядят сложно. Вопросы QLIXA — нет.',
    s2Center: 'QLIXA переводит налоговую логику в понятные вопросы',
    s2Bottom: 'Тебе не нужно знать, какой налоговый термин искать.',
    s2Support: 'Начни со своей ситуации. QLIXA задаст следующие вопросы на основе твоих ответов.',
    humanQuestions: [
      'Работаешь из дома?',
      'Ездишь на работу?',
      'Покупал что-нибудь для работы?',
      'У тебя есть дети?',
      'Проходил профессиональное обучение?',
      'Есть доход кроме зарплаты?',
      'Есть самостоятельная деятельность?',
      'Сдаёшь недвижимость?',
    ],

    s3H2: 'Не одна огромная анкета для всех',
    s3Sub: 'Следующие вопросы зависят от твоих ответов. Если тема к тебе не относится, соответствующая ветка вопросов не появляется.',
    s3Bottom: 'Ты рассказываешь о своей ситуации → QLIXA определяет, какие вопросы показать дальше.',
    s3Label: 'QLIXA спрашивает',
    s3Yes: 'Да',
    s3No: 'Нет',
    s3QA_Q: 'Работаешь ли ты частично или полностью из дома?',
    s3QA_Followups: [
      'Используешь ли ты дома отдельное рабочее помещение?',
      'Покупал ли ты оборудование или технику для работы?',
      'Есть ли другие расходы, связанные с работой из дома?',
    ],
    s3QB_Q: 'Есть ли у тебя дети?',
    s3QB_Followups: [
      'Сколько у тебя детей и какого они возраста?',
      'Есть ли расходы на обучение или уход за ребёнком?',
    ],
    s3QC_Q: 'Есть ли у тебя доход от самостоятельной деятельности?',
    s3QC_Branches: ['Доходы', 'Расходы', 'Деятельность', 'Дополнительные вопросы'],

    s4H2: 'У налоговой ситуации редко бывает только одна категория',
    s4Sub: 'Можно одновременно работать по найму, иметь дополнительные доходы, ребёнка, расходы на обучение или самостоятельную деятельность. QLIXA рассматривает введённую ситуацию вместе.',
    s4Bottom: 'Не выбирай заранее, какую декларацию тебе нужно «собирать». Сначала расскажи QLIXA о своей ситуации.',
    situationCards: [
      { title: 'Работа по найму', desc: 'Работа, профессиональные расходы, Homeoffice, дорога на работу и другие связанные обстоятельства.' },
      { title: 'Самостоятельная деятельность', desc: 'Доходы и расходы от Gewerbe или другой самостоятельной деятельности.' },
      { title: 'Семья и дети', desc: 'Семейная ситуация, дети и возможные релевантные налоговые категории.' },
      { title: 'Недвижимость', desc: 'Доходы и расходы, связанные со сдачей недвижимости.' },
      { title: 'Другие источники дохода', desc: 'Дополнительные и иностранные доходы, если они относятся к поддерживаемой налоговой ситуации.' },
      { title: 'Другие обстоятельства', desc: 'QLIXA задаёт дополнительные вопросы там, где ответы показывают, что тема может быть релевантной.' },
    ],

    s5H2: 'О чём может спросить QLIXA',
    s5Support: 'Какие именно вопросы появятся, зависит от твоих ответов.',
    s5Secondary: 'QLIXA не показывает все категории всем пользователям — анкета адаптируется по ходу заполнения.',
    coverageItems: [
      'Работа и профессия', 'Работа из дома', 'Дорога на работу', 'Рабочая техника и оборудование',
      'Профессиональное обучение', 'Командировки и рабочие поездки', 'Дети и семья', 'Особые расходы и обстоятельства',
      'Самостоятельная деятельность', 'Доходы от Gewerbe', 'Расходы деятельности', 'Аренда недвижимости',
      'Дополнительные доходы', 'Иностранные доходы', 'Несколько источников дохода',
    ],

    s6H2: 'Твой кабинет QLIXA — бесплатно',
    s6Cta: 'Открыть бесплатный кабинет →',
    s6Support: 'Доступ к кабинету бесплатный. Отдельные продукты и функции QLIXA могут быть платными.',
    s6ImgAlt: 'Кабинет QLIXA',
    cabinetFeatures: [
      { title: 'Бесплатный доступ', desc: 'Личный кабинет QLIXA доступен бесплатно.' },
      { title: 'Tax Return', desc: 'В кабинете можно начать работу с адаптивной анкетой QLIXA.' },
      { title: 'Продолжай позже', desc: 'Не обязательно заканчивать всё за один раз. Можно вернуться к заполнению позже.' },
      { title: 'Всё в одном месте', desc: 'Данные и доступные инструменты собраны в личном кабинете.' },
      { title: 'Полезные инструменты', desc: 'Помимо основной анкеты, в кабинете доступны дополнительные функции — например, учёт расходов и поездок в течение года.' },
      { title: 'QLIXA развивается', desc: 'В кабинете постепенно появляются новые функции и инструменты.' },
    ],

    s7H2: 'Можно сначала посмотреть, подходит ли тебе QLIXA',
    s7P1: 'Не нужно покупать продукт, не увидев его.',
    s7P2: 'Создай бесплатный кабинет, начни отвечать на вопросы и посмотри, как QLIXA работает с твоей налоговой ситуацией.',
    s7Cta: 'Попробовать бесплатно →',
    s7Support: 'Начать анкету можно без оплаты.',

    s8H2: 'От ответа до налоговой декларации',
    pipelineSteps: [
      { n: '01', title: 'Ты отвечаешь', desc: 'Простые вопросы о своей ситуации.' },
      { n: '02', title: 'QLIXA уточняет', desc: 'Следующие вопросы появляются на основе предыдущих ответов.' },
      { n: '03', title: 'QLIXA структурирует данные', desc: 'Информация распределяется по релевантным частям налоговой декларации.' },
      { n: '04', title: 'Ты проверяешь', desc: 'Перед формированием результата можно проверить введённые данные.' },
      { n: '05', title: 'QLIXA подготавливает Tax Return', desc: 'На основе введённых данных подготавливается налоговая декларация и, если это нужно для твоей ситуации, необходимые дополнительные формы.' },
    ],

    s9H2: 'А сколько можно получить обратно?',
    s9P: 'Если введённая налоговая ситуация позволяет рассчитать возможный возврат, QLIXA показывает предварительную оценку на основе твоих данных.',
    s9ResultLabel: 'Предварительный возможный возврат',
    s9Note: 'Итоговая сумма зависит от введённых данных и фактической обработки декларации налоговым органом.',

    s10H2: 'В конце — не просто список ответов',
    resultSteps: [
      { n: '01', title: 'Твоя налоговая ситуация', desc: 'Все введённые данные собраны в понятной структуре.' },
      { n: '02', title: 'Возможные релевантные категории', desc: 'Ты видишь категории, которые могут относиться к твоей ситуации на основе введённых ответов.' },
      { n: '03', title: 'Предварительный расчёт', desc: 'Если применимо, QLIXA показывает предварительную оценку возможного возврата.' },
      { n: '04', title: 'Проверка перед формированием', desc: 'Перед созданием Tax Return ты проверяешь свои ответы.' },
      { n: '05', title: 'Подготовленная декларация и формы', desc: 'QLIXA формирует налоговую декларацию на основе введённых данных вместе с дополнительными формами, если они нужны для твоей ситуации.' },
    ],

    s11H2: 'Одна ситуация — одна декларация и её приложения',
    s11Center: 'Твоя налоговая ситуация',
    s11Main: 'Налоговая декларация',
    s11Extra: 'Дополнительная форма',
    s11Caption: 'Какие именно части и дополнительные формы нужны, зависит от твоих ответов и поддерживаемой налоговой ситуации.',

    s12H2: 'QLIXA помогает подготовить. Решение остаётся за тобой.',
    s12Disclaimer: 'QLIXA не является налоговым консультантом и не принимает налоговые решения вместо пользователя. Результат формируется на основе введённых данных и предназначен для проверки пользователем перед подачей.',
    trustCards: [
      { title: 'Самостоятельно', desc: 'Ты сам проверяешь данные перед подачей.' },
      { title: 'Без комиссии от возврата', desc: 'QLIXA не забирает процент от возможного налогового возврата.' },
      { title: 'Без обязательной консультации', desc: 'Не нужно записываться на встречу, чтобы начать заполнение.' },
      { title: 'На понятном языке', desc: 'QLIXA помогает пройти процесс через обычные вопросы вместо сложной терминологии.' },
    ],

    s13H2: 'Сегодня 10 минут. Завтра продолжишь.',
    s13LeftTitle: 'Есть всё под рукой?',
    s13LeftBody: 'Пройди анкету сразу.',
    s13RightTitle: 'Не хватает документов или времени?',
    s13RightBody: 'Сохрани прогресс и продолжи позже.',
    s13Center: 'Один и тот же кабинет. Один и тот же Tax Return.',

    s14Eyebrow: 'QLIXA TAX RETURN',
    s14H2: 'Не нужно сначала учить австрийские налоги',
    s14P: 'Начни с простых вопросов о своей ситуации.',
    s14Support: 'Бесплатный кабинет · 4 языка · Начать анкету можно без оплаты',
    s14Cta: 'Начать бесплатно →',
    s14Flow: ['Твоя ситуация', 'Вопросы', 'Проверка', 'Tax Return'],

    faqH2: 'Часто задаваемые вопросы',
    faqGroupALabel: 'А мне подойдёт?',
    faqGroupBLabel: 'Как это работает?',
    faqGroupA: [
      { q: 'Я просто работаю по найму. Мне подойдёт QLIXA?', a: 'Да. Если ты получаешь зарплату в Австрии, анкета начинает с вопросов, относящихся к твоей ситуации: работе, возможным профессиональным расходам, дороге на работу, семье и другим обстоятельствам. Ненужные ветки вопросов не появляются только потому, что они существуют для других пользователей.' },
      { q: 'А если я самозанятый или у меня Gewerbe?', a: 'QLIXA Tax Return рассчитана и на поддерживаемые ситуации с самостоятельной деятельностью. Анкета может задавать вопросы о деятельности, доходах, расходах и других данных, относящихся к такой налоговой ситуации.' },
      { q: 'А если я одновременно работаю по найму и имею Gewerbe?', a: 'Такая комбинация учитывается в рамках одной налоговой ситуации. Дальнейшие вопросы адаптируются к введённым данным.' },
      { q: 'А если у меня несколько источников дохода?', a: 'Можно указать поддерживаемые источники дохода в рамках своей налоговой ситуации. Какие дополнительные вопросы появятся дальше, зависит от твоих ответов.' },
      { q: 'А если я сдаю квартиру или другую недвижимость?', a: 'QLIXA задаст соответствующие дополнительные вопросы о доходе от аренды как о части твоей налоговой ситуации.' },
      { q: 'А если у меня есть доходы из другой страны?', a: 'QLIXA может задавать дополнительные вопросы об иностранных доходах, когда они относятся к поддерживаемой налоговой ситуации. Какие именно данные нужны, зависит от вида дохода и других обстоятельств.' },
      { q: 'У меня дети. QLIXA это учитывает?', a: 'Анкета спрашивает о детях и семейной ситуации, если эти данные могут быть релевантны для декларации. В зависимости от ответов появляются дополнительные вопросы о соответствующих налоговых категориях.' },
      { q: 'У меня почти нет расходов. Есть смысл пользоваться QLIXA?', a: 'Да. Необязательно заранее знать, есть ли у тебя что учитывать. Ты отвечаешь на вопросы о своей ситуации, а анкета помогает проверить возможные категории, которые могут быть релевантны на основе введённых данных.' },
    ],
    faqGroupB: [
      { q: 'Я вообще не понимаю, что такое Arbeitnehmerveranlagung, Einkommensteuererklärung и Werbungskosten. Я справлюсь?', a: 'Именно поэтому QLIXA построена вокруг вопросов, а не вокруг знания налоговой терминологии. Когда официальный австрийский термин необходим, QLIXA объясняет его понятным языком.' },
      { q: 'Мне нужно заранее знать, какую налоговую декларацию подавать?', a: 'Нет. Ты начинаешь с информации о себе, доходах и обстоятельствах. Дальнейшие вопросы зависят от твоих ответов и помогают собрать необходимую для Tax Return информацию.' },
      { q: 'Мне нужно платить за доступ к кабинету QLIXA?', a: 'Нет. Личный кабинет QLIXA доступен бесплатно. В нём можно начать работу с QLIXA, пользоваться доступными бесплатными функциями и инструментами и возвращаться к своим данным. Оплата относится к отдельным платным продуктам и функциям, а не к самому доступу в кабинет.' },
      { q: 'В кабинете есть что-то кроме налоговой анкеты QLIXA?', a: 'Да. Помимо основной анкеты, в кабинете доступны дополнительные функции и инструменты. QLIXA развивается, поэтому со временем в кабинете могут появляться новые возможности.' },
      { q: 'Нужно ли проходить всю анкету сразу?', a: 'Нет. Можно остановиться и продолжить позже. Если всё необходимое уже под рукой, можно пройти анкету за один раз.' },
      { q: 'Можно ли сначала посмотреть QLIXA и только потом решить, платить или нет?', a: 'Да. Доступ к кабинету бесплатный, и начать анкету можно без оплаты. Так можно сначала познакомиться с QLIXA и посмотреть, как устроен процесс заполнения.' },
      { q: 'Что я получу после прохождения анкеты?', a: 'На основе введённых данных QLIXA помогает собрать налоговую ситуацию, проверить возможные релевантные категории и, на соответствующем этапе, подготовить Tax Return для твоей проверки перед подачей. Если для ситуации доступен расчёт возможного возврата, он показывается как предварительная оценка.' },
      { q: 'QLIXA сама отправит мою декларацию в FinanzOnline?', a: 'Нет. QLIXA помогает подготовить декларацию, но перед подачей ты самостоятельно проверяешь результат и подаёшь его.' },
      { q: 'QLIXA заменяет Steuerberater?', a: 'Нет. QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации. Он не является индивидуальной налоговой, юридической или финансовой консультацией.' },
      { q: 'На каких языках работает QLIXA?', a: 'QLIXA доступна на украинском, немецком, английском и русском языках.' },
    ],
  },

  UA: {
    heroH1Line1: 'Податкова декларація в Австрії —',
    heroH1Line2: 'без необхідності розбиратися в податках',
    heroP1: 'Ти відповідаєш на зрозумілі запитання про свою роботу, доходи, витрати, сім’ю та інші обставини.',
    heroP2: 'QLIXA адаптує анкету до твоїх відповідей, допомагає перевірити можливі релевантні категорії та готує податкову декларацію на основі введених даних.',
    heroCta: 'Почати безкоштовно →',
    heroSupport: 'Безкоштовний кабінет · Анкету можна почати без оплати · 4 мови',
    chipsNote: 'Не потрібно заздалегідь обирати «тип платника податків». QLIXA будує анкету відповідно до твоєї реальної ситуації.',
    situationChips: [
      'Робота за наймом',
      'Самозайнятість',
      'Кілька джерел доходу',
      'Діти та сім’я',
      'Оренда нерухомості',
      'Додаткові доходи',
    ],

    s2H2: 'Австрійські податки виглядають складно. Запитання QLIXA — ні.',
    s2Center: 'QLIXA перетворює податкову логіку на зрозумілі запитання',
    s2Bottom: 'Тобі не потрібно знати, який податковий термін шукати.',
    s2Support: 'Почни зі своєї ситуації. QLIXA поставить наступні запитання на основі твоїх відповідей.',
    humanQuestions: [
      'Працюєш з дому?',
      'Їздиш на роботу?',
      'Купував щось для роботи?',
      'У тебе є діти?',
      'Проходив професійне навчання?',
      'Є дохід крім зарплати?',
      'Маєш самостійну діяльність?',
      'Здаєш нерухомість в оренду?',
    ],

    s3H2: 'Не одна величезна анкета для всіх',
    s3Sub: 'Наступні запитання залежать від твоїх відповідей. Якщо тема тебе не стосується, відповідна гілка запитань не з’являється.',
    s3Bottom: 'Ти розповідаєш про свою ситуацію → QLIXA визначає, які запитання показати далі.',
    s3Label: 'QLIXA запитує',
    s3Yes: 'Так',
    s3No: 'Ні',
    s3QA_Q: 'Працюєш частково або повністю з дому?',
    s3QA_Followups: [
      'Використовуєш удома окреме робоче приміщення?',
      'Купував обладнання або техніку для роботи?',
      'Є інші витрати, пов’язані з роботою з дому?',
    ],
    s3QB_Q: 'У тебе є діти?',
    s3QB_Followups: [
      'Скільки в тебе дітей і якого вони віку?',
      'Чи є витрати на навчання або догляд за дитиною?',
    ],
    s3QC_Q: 'Маєш дохід від самостійної діяльності?',
    s3QC_Branches: ['Доходи', 'Витрати', 'Діяльність', 'Додаткові запитання'],

    s4H2: 'У податковій ситуації рідко буває лише одна категорія',
    s4Sub: 'Можна одночасно працювати за наймом, мати додаткові доходи, дитину, витрати на навчання або самостійну діяльність. QLIXA розглядає введену ситуацію разом.',
    s4Bottom: 'Не обирай заздалегідь, яку декларацію тобі потрібно «збирати». Спочатку розкажи QLIXA про свою ситуацію.',
    situationCards: [
      { title: 'Робота за наймом', desc: 'Робота, професійні витрати, Homeoffice, дорога на роботу та інші пов’язані обставини.' },
      { title: 'Самостійна діяльність', desc: 'Доходи та витрати від Gewerbe або іншої самостійної діяльності.' },
      { title: 'Сім’я та діти', desc: 'Сімейна ситуація, діти та можливі релевантні податкові категорії.' },
      { title: 'Нерухомість', desc: 'Доходи та витрати, пов’язані зі здаванням нерухомості в оренду.' },
      { title: 'Інші джерела доходу', desc: 'Додаткові та іноземні доходи, якщо вони належать до підтримуваної податкової ситуації.' },
      { title: 'Інші обставини', desc: 'QLIXA ставить додаткові запитання там, де відповіді показують, що тема може бути релевантною.' },
    ],

    s5H2: 'Про що може запитати QLIXA',
    s5Support: 'Які саме запитання з’являться, залежить від твоїх відповідей.',
    s5Secondary: 'QLIXA не показує всі категорії всім користувачам — анкета адаптується в процесі заповнення.',
    coverageItems: [
      'Робота та професія', 'Робота з дому', 'Дорога на роботу', 'Робоча техніка та обладнання',
      'Професійне навчання', 'Відрядження та робочі поїздки', 'Діти та сім’я', 'Особливі витрати та обставини',
      'Самостійна діяльність', 'Доходи від Gewerbe', 'Витрати діяльності', 'Оренда нерухомості',
      'Додаткові доходи', 'Іноземні доходи', 'Кілька джерел доходу',
    ],

    s6H2: 'Твій кабінет QLIXA — безкоштовно',
    s6Cta: 'Відкрити безкоштовний кабінет →',
    s6Support: 'Доступ до кабінету безкоштовний. Окремі продукти та функції QLIXA можуть бути платними.',
    s6ImgAlt: 'Кабінет QLIXA',
    cabinetFeatures: [
      { title: 'Безкоштовний доступ', desc: 'Особистий кабінет QLIXA доступний безкоштовно.' },
      { title: 'Tax Return', desc: 'У кабінеті можна почати роботу з адаптивною анкетою QLIXA.' },
      { title: 'Продовжуй пізніше', desc: 'Не обов’язково завершувати все за один раз. Можна повернутися до заповнення пізніше.' },
      { title: 'Усе в одному місці', desc: 'Дані та доступні інструменти зібрані в особистому кабінеті.' },
      { title: 'Корисні інструменти', desc: 'Крім основної анкети, у кабінеті доступні додаткові функції та інструменти.' },
      { title: 'QLIXA розвивається', desc: 'У кабінеті поступово з’являються нові функції та інструменти.' },
    ],

    s7H2: 'Можна спочатку подивитися, чи підходить тобі QLIXA',
    s7P1: 'Не потрібно купувати продукт, не побачивши його.',
    s7P2: 'Створи безкоштовний кабінет, почни відповідати на запитання та подивися, як QLIXA працює з твоєю податковою ситуацією.',
    s7Cta: 'Спробувати безкоштовно →',
    s7Support: 'Почати анкету можна без оплати.',

    s8H2: 'Від відповіді до податкової декларації',
    pipelineSteps: [
      { n: '01', title: 'Ти відповідаєш', desc: 'Зрозумілі запитання про твою ситуацію.' },
      { n: '02', title: 'QLIXA уточнює', desc: 'Наступні запитання з’являються на основі попередніх відповідей.' },
      { n: '03', title: 'QLIXA структурує дані', desc: 'Інформація розподіляється за релевантними частинами податкової декларації.' },
      { n: '04', title: 'Ти перевіряєш', desc: 'Перед формуванням результату можна перевірити введені дані.' },
      { n: '05', title: 'QLIXA готує Tax Return', desc: 'На основі введених даних готується податкова декларація та необхідні додаткові форми, якщо вони потрібні для підтримуваної ситуації.' },
    ],

    s9H2: 'А скільки можна отримати назад?',
    s9P: 'Якщо введена податкова ситуація дозволяє розрахувати можливе повернення, QLIXA показує попередню оцінку на основі твоїх даних.',
    s9ResultLabel: 'Попереднє можливе повернення',
    s9Note: 'Підсумкова сума залежить від введених даних і фактичного опрацювання декларації податковим органом.',

    s10H2: 'Наприкінці — не просто список відповідей',
    resultSteps: [
      { n: '01', title: 'Твоя податкова ситуація', desc: 'Усі введені дані зібрані у зрозумілій структурі.' },
      { n: '02', title: 'Можливі релевантні категорії', desc: 'Ти бачиш категорії, які можуть стосуватися твоєї ситуації на основі введених відповідей.' },
      { n: '03', title: 'Попередній розрахунок', desc: 'Якщо застосовно, QLIXA показує попередню оцінку можливого повернення.' },
      { n: '04', title: 'Перевірка перед формуванням', desc: 'Перед створенням Tax Return ти перевіряєш свої відповіді.' },
      { n: '05', title: 'Підготовлена декларація та форми', desc: 'QLIXA формує податкову декларацію на основі введених даних разом із додатковими формами, якщо вони потрібні для твоєї ситуації.' },
    ],

    s11H2: 'Одна ситуація — одна декларація та її додатки',
    s11Center: 'Твоя податкова ситуація',
    s11Main: 'Податкова декларація',
    s11Extra: 'Додаткова форма',
    s11Caption: 'Які саме частини та додаткові форми потрібні, залежить від твоїх відповідей і підтримуваної податкової ситуації.',

    s12H2: 'QLIXA допомагає підготувати. Рішення залишається за тобою.',
    s12Disclaimer: 'QLIXA не є податковим консультантом і не приймає податкових рішень замість користувача. Результат формується на основі введених даних і призначений для перевірки користувачем перед поданням.',
    trustCards: [
      { title: 'Самостійно', desc: 'Ти сам перевіряєш дані перед поданням.' },
      { title: 'Без комісії від повернення', desc: 'QLIXA не забирає відсоток від можливого податкового повернення.' },
      { title: 'Без обов’язкової консультації', desc: 'Не потрібно записуватися на зустріч, щоб почати заповнення.' },
      { title: 'Зрозумілою мовою', desc: 'QLIXA допомагає пройти процес через звичайні запитання замість складної термінології.' },
    ],

    s13H2: 'Сьогодні 10 хвилин. Завтра продовжиш.',
    s13LeftTitle: 'Усе необхідне під рукою?',
    s13LeftBody: 'Пройди анкету одразу.',
    s13RightTitle: 'Не вистачає документів або часу?',
    s13RightBody: 'Збережи прогрес і продовж пізніше.',
    s13Center: 'Той самий кабінет. Той самий Tax Return.',

    s14Eyebrow: 'QLIXA TAX RETURN',
    s14H2: 'Не потрібно спочатку вивчати австрійські податки',
    s14P: 'Почни зі зрозумілих запитань про свою ситуацію.',
    s14Support: 'Безкоштовний кабінет · 4 мови · Анкету можна почати без оплати',
    s14Cta: 'Почати безкоштовно →',
    s14Flow: ['Твоя ситуація', 'Запитання', 'Перевірка', 'Tax Return'],

    faqH2: 'Часті запитання',
    faqGroupALabel: 'А мені підійде?',
    faqGroupBLabel: 'Як це працює?',
    faqGroupA: [
      { q: 'Я просто працюю за наймом. Мені підійде QLIXA?', a: 'Так. Якщо ти отримуєш зарплату в Австрії, анкета починається з запитань, що стосуються твоєї ситуації: роботи, можливих професійних витрат, дороги на роботу, сім’ї та інших обставин. Непотрібні гілки запитань не з’являються лише тому, що вони існують для інших користувачів.' },
      { q: 'А якщо я самозайнятий або маю Gewerbe?', a: 'QLIXA Tax Return розрахована і на підтримувані ситуації із самостійною діяльністю. Анкета може ставити запитання про діяльність, доходи, витрати та інші дані, що стосуються такої податкової ситуації.' },
      { q: 'А якщо я одночасно працюю за наймом і маю Gewerbe?', a: 'Така комбінація враховується в межах однієї податкової ситуації. Подальші запитання адаптуються до введених даних.' },
      { q: 'А якщо в мене кілька джерел доходу?', a: 'Можна вказати підтримувані джерела доходу в межах своєї податкової ситуації. Які додаткові запитання з’являться далі, залежить від твоїх відповідей.' },
      { q: 'А якщо я здаю квартиру чи іншу нерухомість?', a: 'QLIXA поставить відповідні додаткові запитання про дохід від оренди як частину твоєї податкової ситуації.' },
      { q: 'А якщо в мене є доходи з іншої країни?', a: 'QLIXA може ставити додаткові запитання про іноземні доходи, коли вони належать до підтримуваної податкової ситуації. Які саме дані потрібні, залежить від виду доходу та інших обставин.' },
      { q: 'У мене є діти. QLIXA це враховує?', a: 'Анкета запитує про дітей і сімейну ситуацію, якщо ці дані можуть бути релевантними для декларації. Залежно від відповідей з’являються додаткові запитання про відповідні податкові категорії.' },
      { q: 'У мене майже немає витрат. Чи є сенс користуватися QLIXA?', a: 'Так. Не обов’язково заздалегідь знати, чи є в тебе що враховувати. Ти відповідаєш на запитання про свою ситуацію, а анкета допомагає перевірити можливі категорії, які можуть бути релевантними на основі введених даних.' },
    ],
    faqGroupB: [
      { q: 'Я взагалі не розумію, що таке Arbeitnehmerveranlagung, Einkommensteuererklärung і Werbungskosten. Я впораюся?', a: 'Саме тому QLIXA побудована навколо запитань, а не навколо знання податкової термінології. Коли офіційний австрійський термін необхідний, QLIXA пояснює його зрозумілою мовою.' },
      { q: 'Мені потрібно заздалегідь знати, яку податкову декларацію подавати?', a: 'Ні. Ти починаєш з інформації про себе, доходи та обставини. Подальші запитання залежать від твоїх відповідей і допомагають зібрати інформацію, необхідну для Tax Return.' },
      { q: 'Мені потрібно платити за доступ до кабінету QLIXA?', a: 'Ні. Особистий кабінет QLIXA доступний безкоштовно. У ньому можна почати роботу з QLIXA, користуватися доступними безкоштовними функціями та інструментами і повертатися до своїх даних. Оплата стосується окремих платних продуктів і функцій, а не самого доступу до кабінету.' },
      { q: 'У кабінеті є щось, крім податкової анкети QLIXA?', a: 'Так. Крім основної анкети, у кабінеті доступні додаткові функції та інструменти. QLIXA розвивається, тому з часом у кабінеті можуть з’являтися нові можливості.' },
      { q: 'Чи потрібно проходити всю анкету одразу?', a: 'Ні. Можна зупинитися і продовжити пізніше. Якщо все необхідне вже під рукою, можна пройти анкету за один раз.' },
      { q: 'Чи можна спочатку подивитися на QLIXA і тільки потім вирішити, платити чи ні?', a: 'Так. Доступ до кабінету безкоштовний, і почати анкету можна без оплати. Так можна спочатку познайомитися з QLIXA і подивитися, як влаштований процес заповнення.' },
      { q: 'Що я отримаю після проходження анкети?', a: 'На основі введених даних QLIXA допомагає зібрати податкову ситуацію, перевірити можливі релевантні категорії та, на відповідному етапі, підготувати Tax Return для твоєї перевірки перед поданням. Якщо для ситуації доступний розрахунок можливого повернення, він показується як попередня оцінка.' },
      { q: 'QLIXA сама надішле мою декларацію у FinanzOnline?', a: 'Ні. QLIXA допомагає підготувати декларацію, але перед поданням ти самостійно перевіряєш результат і подаєш його.' },
      { q: 'QLIXA замінює Steuerberater?', a: 'Ні. QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації. Він не є індивідуальною податковою, юридичною чи фінансовою консультацією.' },
      { q: 'Якими мовами працює QLIXA?', a: 'QLIXA доступна українською, німецькою, англійською та російською мовами.' },
    ],
  },

  DE: {
    heroH1Line1: 'Steuererklärung in Österreich —',
    heroH1Line2: 'ohne dass du dich mit Steuerrecht auskennen musst',
    heroP1: 'Du beantwortest verständliche Fragen zu deiner Arbeit, deinen Einkünften, Ausgaben, deiner Familie und weiteren Umständen.',
    heroP2: 'QLIXA passt den Fragebogen an deine Antworten an, hilft dir, möglicherweise relevante Kategorien zu prüfen, und bereitet auf Basis deiner Angaben deine Steuererklärung vor.',
    heroCta: 'Kostenlos starten →',
    heroSupport: 'Kostenloser QLIXA-Bereich · Fragebogen ohne Zahlung starten · 4 Sprachen',
    chipsNote: 'Du musst dich nicht vorab einem bestimmten „Steuertyp“ zuordnen. QLIXA passt den Fragebogen an deine tatsächliche Situation an.',
    situationChips: [
      'Angestellt',
      'Selbstständig',
      'Mehrere Einkunftsquellen',
      'Kinder & Familie',
      'Vermietung',
      'Weitere Einkünfte',
    ],

    s2H2: 'Österreichische Steuern wirken kompliziert. Die Fragen von QLIXA nicht.',
    s2Center: 'QLIXA übersetzt Steuerlogik in verständliche Fragen',
    s2Bottom: 'Du musst nicht wissen, nach welchem Steuerbegriff du suchen musst.',
    s2Support: 'Beginne mit deiner Situation. QLIXA stellt die nächsten Fragen auf Basis deiner Antworten.',
    humanQuestions: [
      'Arbeitest du von zu Hause?',
      'Fährst du regelmäßig zur Arbeit?',
      'Hast du etwas für deine Arbeit gekauft?',
      'Hast du Kinder?',
      'Hast du eine berufliche Aus- oder Weiterbildung gemacht?',
      'Hast du neben deinem Gehalt weitere Einkünfte?',
      'Bist du selbstständig tätig?',
      'Vermietest du eine Immobilie?',
    ],

    s3H2: 'Nicht ein riesiger Fragebogen für alle',
    s3Sub: 'Welche Fragen als Nächstes erscheinen, hängt von deinen Antworten ab. Wenn ein Thema für dich nicht relevant ist, wird der entsprechende Fragenbereich nicht angezeigt.',
    s3Bottom: 'Du beschreibst deine Situation → QLIXA bestimmt anhand deiner Antworten, welche Fragen als Nächstes angezeigt werden.',
    s3Label: 'QLIXA fragt',
    s3Yes: 'Ja',
    s3No: 'Nein',
    s3QA_Q: 'Arbeitest du teilweise oder vollständig von zu Hause?',
    s3QA_Followups: [
      'Nutzt du zu Hause einen eigenen Arbeitsraum?',
      'Hast du Geräte oder Technik für deine Arbeit gekauft?',
      'Hast du weitere Ausgaben im Zusammenhang mit der Arbeit von zu Hause?',
    ],
    s3QB_Q: 'Hast du Kinder?',
    s3QB_Followups: [
      'Wie viele Kinder hast du und wie alt sind sie?',
      'Hast du Ausgaben für Ausbildung oder Kinderbetreuung?',
    ],
    s3QC_Q: 'Hast du Einkünfte aus selbstständiger Tätigkeit?',
    s3QC_Branches: ['Einkünfte', 'Ausgaben', 'Tätigkeit', 'Weitere Fragen'],

    s4H2: 'Eine steuerliche Situation besteht selten nur aus einer Kategorie',
    s4Sub: 'Du kannst gleichzeitig angestellt sein, weitere Einkünfte haben, ein Kind haben, Weiterbildungskosten tragen oder selbstständig tätig sein. QLIXA betrachtet deine eingegebene Situation zusammen.',
    s4Bottom: 'Du musst nicht vorab entscheiden, welche Erklärung du „zusammenstellen“ musst. Beginne mit deiner Situation.',
    situationCards: [
      { title: 'Angestellt', desc: 'Arbeit, berufliche Ausgaben, Homeoffice, Arbeitsweg und weitere damit verbundene Umstände.' },
      { title: 'Selbstständige Tätigkeit', desc: 'Einkünfte und Ausgaben aus einem Gewerbe oder einer anderen selbstständigen Tätigkeit.' },
      { title: 'Familie & Kinder', desc: 'Familiensituation, Kinder und möglicherweise relevante steuerliche Kategorien.' },
      { title: 'Vermietung', desc: 'Einkünfte und Ausgaben im Zusammenhang mit der Vermietung von Immobilien.' },
      { title: 'Weitere Einkünfte', desc: 'Zusätzliche und ausländische Einkünfte, soweit sie zur unterstützten steuerlichen Situation gehören.' },
      { title: 'Weitere Umstände', desc: 'QLIXA stellt zusätzliche Fragen, wenn deine Antworten zeigen, dass ein Thema relevant sein könnte.' },
    ],

    s5H2: 'Wozu kann QLIXA Fragen stellen?',
    s5Support: 'Welche Fragen tatsächlich erscheinen, hängt von deinen Antworten ab.',
    s5Secondary: 'QLIXA zeigt nicht allen Nutzern alle Kategorien — der Fragebogen passt sich während des Ausfüllens an.',
    coverageItems: [
      'Arbeit & Beruf', 'Arbeiten von zu Hause', 'Arbeitsweg', 'Arbeitsmittel & Geräte',
      'Berufliche Aus- und Weiterbildung', 'Dienstreisen & berufliche Fahrten', 'Kinder & Familie', 'Besondere Ausgaben & Umstände',
      'Selbstständige Tätigkeit', 'Einkünfte aus Gewerbe', 'Betriebsausgaben', 'Vermietung',
      'Weitere Einkünfte', 'Ausländische Einkünfte', 'Mehrere Einkunftsquellen',
    ],

    s6H2: 'Dein QLIXA-Bereich — kostenlos',
    s6Cta: 'Kostenlosen QLIXA-Bereich öffnen →',
    s6Support: 'Der Zugang zum QLIXA-Bereich ist kostenlos. Einzelne Produkte und Funktionen von QLIXA können kostenpflichtig sein.',
    s6ImgAlt: 'QLIXA-Bereich',
    cabinetFeatures: [
      { title: 'Kostenloser Zugang', desc: 'Dein persönlicher QLIXA-Bereich ist kostenlos zugänglich.' },
      { title: 'Tax Return', desc: 'Im QLIXA-Bereich kannst du mit dem adaptiven Fragebogen für deine Steuererklärung beginnen.' },
      { title: 'Später weitermachen', desc: 'Du musst nicht alles auf einmal erledigen. Du kannst später weiter ausfüllen.' },
      { title: 'Alles an einem Ort', desc: 'Deine Daten und verfügbaren Tools sind in deinem persönlichen QLIXA-Bereich gebündelt.' },
      { title: 'Praktische Tools', desc: 'Neben dem Hauptfragebogen stehen weitere Funktionen und Tools zur Verfügung.' },
      { title: 'QLIXA entwickelt sich weiter', desc: 'Nach und nach kommen weitere Funktionen und Tools hinzu.' },
    ],

    s7H2: 'Du kannst zuerst prüfen, ob QLIXA zu dir passt',
    s7P1: 'Du musst kein Produkt kaufen, ohne es vorher gesehen zu haben.',
    s7P2: 'Erstelle deinen kostenlosen QLIXA-Bereich, beantworte die ersten Fragen und sieh dir an, wie QLIXA mit deiner steuerlichen Situation arbeitet.',
    s7Cta: 'Kostenlos ausprobieren →',
    s7Support: 'Du kannst den Fragebogen ohne Zahlung beginnen.',

    s8H2: 'Von deiner Antwort zur Steuererklärung',
    pipelineSteps: [
      { n: '01', title: 'Du antwortest', desc: 'Verständliche Fragen zu deiner Situation.' },
      { n: '02', title: 'QLIXA fragt gezielt weiter', desc: 'Die nächsten Fragen erscheinen auf Basis deiner bisherigen Antworten.' },
      { n: '03', title: 'QLIXA strukturiert die Daten', desc: 'Die Informationen werden den relevanten Bereichen der Steuererklärung zugeordnet.' },
      { n: '04', title: 'Du prüfst', desc: 'Vor der Erstellung kannst du deine eingegebenen Daten überprüfen.' },
      { n: '05', title: 'QLIXA bereitet den Tax Return vor', desc: 'Auf Basis deiner Angaben werden die Steuererklärung und erforderliche zusätzliche Formulare vorbereitet, soweit sie für die unterstützte Situation erforderlich sind.' },
    ],

    s9H2: 'Und wie viel könntest du zurückbekommen?',
    s9P: 'Wenn für deine eingegebene steuerliche Situation eine Berechnung möglich ist, zeigt QLIXA eine vorläufige Schätzung einer möglichen Rückerstattung auf Basis deiner Angaben.',
    s9ResultLabel: 'Vorläufige mögliche Rückerstattung',
    s9Note: 'Der endgültige Betrag hängt von deinen Angaben und der tatsächlichen Bearbeitung der Steuererklärung durch die Finanzverwaltung ab.',

    s10H2: 'Am Ende bekommst du mehr als nur eine Liste deiner Antworten',
    resultSteps: [
      { n: '01', title: 'Deine steuerliche Situation', desc: 'Alle eingegebenen Daten sind übersichtlich strukturiert.' },
      { n: '02', title: 'Möglicherweise relevante Kategorien', desc: 'Du siehst Kategorien, die auf Basis deiner Antworten für deine Situation relevant sein könnten.' },
      { n: '03', title: 'Vorläufige Berechnung', desc: 'Falls anwendbar, zeigt QLIXA eine vorläufige Schätzung einer möglichen Rückerstattung.' },
      { n: '04', title: 'Prüfung vor der Erstellung', desc: 'Vor der Erstellung des Tax Return prüfst du deine Antworten.' },
      { n: '05', title: 'Vorbereitete Erklärung und Formulare', desc: 'QLIXA erstellt die Steuererklärung auf Basis deiner Angaben zusammen mit zusätzlichen Formularen, falls diese für deine Situation erforderlich sind.' },
    ],

    s11H2: 'Eine Situation — eine Steuererklärung mit den benötigten Zusatzformularen',
    s11Center: 'Deine steuerliche Situation',
    s11Main: 'Steuererklärung',
    s11Extra: 'Zusätzliches Formular',
    s11Caption: 'Welche Teile und zusätzlichen Formulare erforderlich sind, hängt von deinen Antworten und der unterstützten steuerlichen Situation ab.',

    s12H2: 'QLIXA hilft bei der Vorbereitung. Die Entscheidung bleibt bei dir.',
    s12Disclaimer: 'QLIXA ist keine Steuerberatung und trifft keine steuerlichen Entscheidungen für Nutzer. Das Ergebnis wird auf Basis der eingegebenen Daten erstellt und ist vor der Einreichung vom Nutzer selbst zu prüfen.',
    trustCards: [
      { title: 'Selbstständig', desc: 'Du prüfst deine Daten selbst, bevor du sie einreichst.' },
      { title: 'Keine Provision auf die Rückerstattung', desc: 'QLIXA erhält keinen prozentualen Anteil an einer möglichen Steuerrückerstattung.' },
      { title: 'Keine verpflichtende Beratung', desc: 'Du musst keinen Beratungstermin vereinbaren, um mit dem Ausfüllen zu beginnen.' },
      { title: 'Verständliche Sprache', desc: 'QLIXA führt dich mit verständlichen Fragen durch den Prozess, statt komplizierte Fachbegriffe vorauszusetzen.' },
    ],

    s13H2: 'Heute 10 Minuten. Morgen machst du weiter.',
    s13LeftTitle: 'Alles zur Hand?',
    s13LeftBody: 'Dann kannst du den Fragebogen direkt ausfüllen.',
    s13RightTitle: 'Fehlen dir Unterlagen oder Zeit?',
    s13RightBody: 'Speichere deinen Fortschritt und mache später weiter.',
    s13Center: 'Derselbe QLIXA-Bereich. Derselbe Tax Return.',

    s14Eyebrow: 'QLIXA TAX RETURN',
    s14H2: 'Du musst nicht zuerst das österreichische Steuerrecht lernen',
    s14P: 'Beginne mit verständlichen Fragen zu deiner Situation.',
    s14Support: 'Kostenloser QLIXA-Bereich · 4 Sprachen · Fragebogen ohne Zahlung starten',
    s14Cta: 'Kostenlos starten →',
    s14Flow: ['Deine Situation', 'Fragen', 'Prüfung', 'Tax Return'],

    faqH2: 'Häufig gestellte Fragen',
    faqGroupALabel: 'Passt QLIXA zu meiner Situation?',
    faqGroupBLabel: 'Wie funktioniert QLIXA?',
    faqGroupA: [
      { q: 'Ich bin einfach angestellt. Passt QLIXA für mich?', a: 'Ja. Wenn du in Österreich ein Gehalt beziehst, beginnt der Fragebogen mit Fragen zu deiner Situation: zu deiner Arbeit, möglichen beruflichen Ausgaben, deinem Arbeitsweg, deiner Familie und weiteren Umständen. Fragenbereiche, die für dich nicht relevant sind, werden nicht angezeigt, nur weil es sie für andere Nutzer:innen gibt.' },
      { q: 'Und wenn ich selbstständig bin oder ein Gewerbe habe?', a: 'QLIXA Tax Return ist auch für unterstützte Situationen mit selbstständiger Tätigkeit ausgelegt. Der Fragebogen kann Fragen zur Tätigkeit, zu Einkünften, Ausgaben und weiteren Angaben stellen, die zu dieser steuerlichen Situation gehören.' },
      { q: 'Und wenn ich gleichzeitig angestellt bin und ein Gewerbe habe?', a: 'Diese Kombination wird innerhalb einer steuerlichen Situation berücksichtigt. Die weiteren Fragen passen sich an deine eingegebenen Daten an.' },
      { q: 'Und wenn ich mehrere Einkunftsquellen habe?', a: 'Du kannst die unterstützten Einkunftsquellen innerhalb deiner steuerlichen Situation angeben. Welche zusätzlichen Fragen als Nächstes erscheinen, hängt von deinen Antworten ab.' },
      { q: 'Und wenn ich eine Wohnung oder eine andere Immobilie vermiete?', a: 'QLIXA stellt entsprechende zusätzliche Fragen zu den Einkünften aus der Vermietung als Teil deiner steuerlichen Situation.' },
      { q: 'Und wenn ich Einkünfte aus einem anderen Land habe?', a: 'QLIXA kann zusätzliche Fragen zu ausländischen Einkünften stellen, wenn diese zur unterstützten steuerlichen Situation gehören. Welche Angaben genau erforderlich sind, hängt von der Art der Einkünfte und weiteren Umständen ab.' },
      { q: 'Ich habe Kinder. Berücksichtigt QLIXA das?', a: 'Der Fragebogen fragt nach Kindern und der Familiensituation, wenn diese Angaben für die Steuererklärung relevant sein können. Je nach Antworten erscheinen zusätzliche Fragen zu den entsprechenden steuerlichen Kategorien.' },
      { q: 'Ich habe kaum Ausgaben. Lohnt sich QLIXA trotzdem?', a: 'Ja. Du musst nicht im Voraus wissen, ob es bei dir etwas zu berücksichtigen gibt. Du beantwortest Fragen zu deiner Situation, und der Fragebogen hilft dir, mögliche Kategorien zu prüfen, die auf Basis deiner Angaben relevant sein könnten.' },
    ],
    faqGroupB: [
      { q: 'Ich verstehe überhaupt nicht, was Arbeitnehmerveranlagung, Einkommensteuererklärung und Werbungskosten bedeuten. Schaffe ich das trotzdem?', a: 'Genau deshalb ist QLIXA rund um Fragen aufgebaut und nicht um Kenntnisse der Steuerterminologie. Wenn ein offizieller österreichischer Begriff notwendig ist, erklärt QLIXA ihn in verständlicher Sprache.' },
      { q: 'Muss ich vorher wissen, welche Steuererklärung ich einreichen muss?', a: 'Nein. Du beginnst mit Angaben zu dir, deinen Einkünften und deinen Umständen. Die weiteren Fragen hängen von deinen Antworten ab und helfen dabei, die für den Tax Return notwendigen Informationen zusammenzustellen.' },
      { q: 'Muss ich für den Zugang zum QLIXA-Bereich bezahlen?', a: 'Nein. Dein persönlicher QLIXA-Bereich ist kostenlos zugänglich. Dort kannst du mit QLIXA starten, verfügbare kostenlose Funktionen und Tools nutzen und zu deinen Daten zurückkehren. Kosten entstehen nur bei einzelnen kostenpflichtigen Produkten und Funktionen, nicht beim Zugang zum Bereich selbst.' },
      { q: 'Gibt es im QLIXA-Bereich noch etwas außer dem Steuerfragebogen?', a: 'Ja. Neben dem Hauptfragebogen stehen im Bereich weitere Funktionen und Tools zur Verfügung. QLIXA entwickelt sich weiter, daher können mit der Zeit neue Möglichkeiten hinzukommen.' },
      { q: 'Muss ich den gesamten Fragebogen auf einmal ausfüllen?', a: 'Nein. Du kannst pausieren und später weitermachen. Wenn du bereits alles zur Hand hast, kannst du den Fragebogen auch auf einmal ausfüllen.' },
      { q: 'Kann ich mir QLIXA zuerst ansehen und erst danach entscheiden, ob ich zahle?', a: 'Ja. Der Zugang zum Bereich ist kostenlos, und du kannst den Fragebogen ohne Zahlung starten. So kannst du QLIXA zuerst kennenlernen und sehen, wie der Ausfüllprozess funktioniert.' },
      { q: 'Was bekomme ich, nachdem ich den Fragebogen ausgefüllt habe?', a: 'Auf Basis deiner Angaben hilft dir QLIXA, deine steuerliche Situation zusammenzustellen, mögliche relevante Kategorien zu prüfen und, im entsprechenden Schritt, einen Tax Return zur Prüfung vor der Einreichung vorzubereiten. Falls für deine Situation eine Berechnung möglich ist, wird eine vorläufige Schätzung einer möglichen Rückerstattung angezeigt.' },
      { q: 'Sendet QLIXA meine Steuererklärung selbst an FinanzOnline?', a: 'Nein. QLIXA hilft dir, die Steuererklärung vorzubereiten, aber vor der Einreichung prüfst du das Ergebnis selbst und reichst es selbst ein.' },
      { q: 'Ersetzt QLIXA einen Steuerberater?', a: 'Nein. QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung der Steuererklärung. Es ist keine individuelle steuerliche, rechtliche oder finanzielle Beratung.' },
      { q: 'In welchen Sprachen ist QLIXA verfügbar?', a: 'QLIXA ist auf Ukrainisch, Deutsch, Englisch und Russisch verfügbar.' },
    ],
  },

  EN: {
    heroH1Line1: 'Tax return in Austria —',
    heroH1Line2: 'without having to understand the tax system first',
    heroP1: 'You answer clear questions about your work, income, expenses, family and other circumstances.',
    heroP2: 'QLIXA adapts the questionnaire to your answers, helps you check possible relevant categories and prepares your tax return based on the information you enter.',
    heroCta: 'Start for free →',
    heroSupport: 'Free QLIXA account · Start the questionnaire without payment · 4 languages',
    chipsNote: 'You do not need to choose a “taxpayer type” in advance. QLIXA adapts the questionnaire to your actual situation.',
    situationChips: [
      'Employment',
      'Self-employment',
      'Multiple income sources',
      'Children & family',
      'Rental income',
      'Additional income',
    ],

    s2H2: 'Austrian taxes look complicated. QLIXA’s questions don’t.',
    s2Center: 'QLIXA turns tax logic into clear questions',
    s2Bottom: 'You don’t need to know which tax term to look for.',
    s2Support: 'Start with your situation. QLIXA asks the next questions based on your answers.',
    humanQuestions: [
      'Do you work from home?',
      'Do you commute to work?',
      'Did you buy anything for work?',
      'Do you have children?',
      'Did you complete professional training?',
      'Do you have income besides your salary?',
      'Do you have self-employed income?',
      'Do you rent out property?',
    ],

    s3H2: 'Not one huge questionnaire for everyone',
    s3Sub: 'The questions you see next depend on your answers. If a topic does not apply to you, the corresponding question branch does not appear.',
    s3Bottom: 'You tell QLIXA about your situation → QLIXA determines which questions to show next.',
    s3Label: 'QLIXA asks',
    s3Yes: 'Yes',
    s3No: 'No',
    s3QA_Q: 'Do you work partly or fully from home?',
    s3QA_Followups: [
      'Do you use a separate room at home for work?',
      'Did you buy equipment or technology for work?',
      'Do you have other expenses related to working from home?',
    ],
    s3QB_Q: 'Do you have children?',
    s3QB_Followups: [
      'How many children do you have and how old are they?',
      'Do you have expenses for education or childcare?',
    ],
    s3QC_Q: 'Do you have income from self-employment?',
    s3QC_Branches: ['Income', 'Expenses', 'Activity', 'Additional questions'],

    s4H2: 'A tax situation rarely fits into just one category',
    s4Sub: 'You can be employed while also having additional income, a child, training expenses or self-employed activity. QLIXA considers the information you enter as one tax situation.',
    s4Bottom: 'You do not need to decide in advance which return you need to “assemble”. Start with your situation.',
    situationCards: [
      { title: 'Employment', desc: 'Work, professional expenses, home office, commuting and other related circumstances.' },
      { title: 'Self-employment', desc: 'Income and expenses from a Gewerbe or other self-employed activity.' },
      { title: 'Family & children', desc: 'Family circumstances, children and possible relevant tax categories.' },
      { title: 'Rental property', desc: 'Income and expenses related to renting out property.' },
      { title: 'Other income', desc: 'Additional and foreign income where it falls within a supported tax situation.' },
      { title: 'Other circumstances', desc: 'QLIXA asks additional questions when your answers indicate that a topic may be relevant.' },
    ],

    s5H2: 'What QLIXA may ask about',
    s5Support: 'The questions that appear depend on your answers.',
    s5Secondary: 'QLIXA does not show every category to every user — the questionnaire adapts as you complete it.',
    coverageItems: [
      'Work & profession', 'Working from home', 'Commuting', 'Work equipment & technology',
      'Professional training', 'Business trips & work-related travel', 'Children & family', 'Special expenses & circumstances',
      'Self-employment', 'Gewerbe income', 'Business expenses', 'Rental property',
      'Additional income', 'Foreign income', 'Multiple income sources',
    ],

    s6H2: 'Your QLIXA account — free',
    s6Cta: 'Open your free QLIXA account →',
    s6Support: 'Access to your QLIXA account is free. Some QLIXA products and features may be paid.',
    s6ImgAlt: 'QLIXA account',
    cabinetFeatures: [
      { title: 'Free access', desc: 'Your personal QLIXA account is free to access.' },
      { title: 'Tax Return', desc: 'You can start the adaptive QLIXA Tax Return questionnaire from your account.' },
      { title: 'Continue later', desc: 'You do not have to finish everything at once. You can return and continue later.' },
      { title: 'Everything in one place', desc: 'Your data and available tools are kept together in your QLIXA account.' },
      { title: 'Useful tools', desc: 'In addition to the main questionnaire, other functions and tools are available in your account.' },
      { title: 'QLIXA keeps developing', desc: 'New functions and tools are gradually added as QLIXA develops.' },
    ],

    s7H2: 'See whether QLIXA works for you first',
    s7P1: 'You do not need to buy the product before seeing how it works.',
    s7P2: 'Create your free QLIXA account, start answering questions and see how QLIXA works with your tax situation.',
    s7Cta: 'Try for free →',
    s7Support: 'You can start the questionnaire without payment.',

    s8H2: 'From your answers to your tax return',
    pipelineSteps: [
      { n: '01', title: 'You answer', desc: 'Clear questions about your situation.' },
      { n: '02', title: 'QLIXA follows up', desc: 'The next questions appear based on your previous answers.' },
      { n: '03', title: 'QLIXA structures the data', desc: 'Your information is mapped to the relevant parts of the tax return.' },
      { n: '04', title: 'You review', desc: 'Before generation, you can review the information you entered.' },
      { n: '05', title: 'QLIXA prepares your Tax Return', desc: 'Based on the information you enter, QLIXA prepares the tax return and any necessary additional forms required for the supported situation.' },
    ],

    s9H2: 'How much could you get back?',
    s9P: 'If a possible refund can be calculated for the tax situation you entered, QLIXA shows a preliminary estimate based on your information.',
    s9ResultLabel: 'Preliminary possible refund',
    s9Note: 'The final amount depends on the information entered and the tax authority’s actual processing of the return.',

    s10H2: 'At the end, you get more than a list of answers',
    resultSteps: [
      { n: '01', title: 'Your tax situation', desc: 'All entered information is organised into a clear structure.' },
      { n: '02', title: 'Possible relevant categories', desc: 'You can see categories that may be relevant to your situation based on your answers.' },
      { n: '03', title: 'Preliminary calculation', desc: 'Where applicable, QLIXA shows a preliminary estimate of a possible refund.' },
      { n: '04', title: 'Review before generation', desc: 'You review your answers before your Tax Return is created.' },
      { n: '05', title: 'Prepared return and forms', desc: 'QLIXA prepares the tax return based on the information you entered together with additional forms, if they’re needed for your situation.' },
    ],

    s11H2: 'One situation — one tax return and its additional forms',
    s11Center: 'Your tax situation',
    s11Main: 'Tax return',
    s11Extra: 'Additional form',
    s11Caption: 'The parts and additional forms required depend on your answers and the supported tax situation.',

    s12H2: 'QLIXA helps you prepare. You stay in control.',
    s12Disclaimer: 'QLIXA is not a tax adviser and does not make tax decisions for users. The result is prepared based on the information entered and should be reviewed by the user before submission.',
    trustCards: [
      { title: 'Self-service', desc: 'You review your information yourself before submission.' },
      { title: 'No refund commission', desc: 'QLIXA does not take a percentage of a possible tax refund.' },
      { title: 'No mandatory consultation', desc: 'You do not need to book an appointment to start.' },
      { title: 'Clear language', desc: 'QLIXA guides you through the process with clear questions instead of requiring you to understand complex tax terminology.' },
    ],

    s13H2: '10 minutes today. Continue tomorrow.',
    s13LeftTitle: 'Have everything ready?',
    s13LeftBody: 'Complete the questionnaire in one go.',
    s13RightTitle: 'Missing a document or short on time?',
    s13RightBody: 'Save your progress and continue later.',
    s13Center: 'The same QLIXA account. The same Tax Return.',

    s14Eyebrow: 'QLIXA TAX RETURN',
    s14H2: 'You don’t need to learn Austrian tax law first',
    s14P: 'Start with clear questions about your situation.',
    s14Support: 'Free QLIXA account · 4 languages · Start the questionnaire without payment',
    s14Cta: 'Start for free →',
    s14Flow: ['Your situation', 'Questions', 'Review', 'Tax Return'],

    faqH2: 'Frequently asked questions',
    faqGroupALabel: 'Will QLIXA work for my situation?',
    faqGroupBLabel: 'How does it work?',
    faqGroupA: [
      { q: 'I’m just an employee. Is QLIXA for me?', a: 'Yes. If you receive a salary in Austria, the questionnaire starts with questions relevant to your situation: your job, possible work-related expenses, your commute, your family and other circumstances. Question branches that don’t apply to you don’t appear just because they exist for other users.' },
      { q: 'What if I’m self-employed or have a Gewerbe?', a: 'QLIXA Tax Return is also designed for supported self-employment situations. The questionnaire can ask about the activity, income, expenses and other information relevant to that tax situation.' },
      { q: 'What if I’m employed and have a Gewerbe at the same time?', a: 'This combination is handled within a single tax situation. Further questions adapt based on the information you enter.' },
      { q: 'What if I have several income sources?', a: 'You can enter the supported income sources as part of your tax situation. Which additional questions appear next depends on your answers.' },
      { q: 'What if I rent out an apartment or other property?', a: 'QLIXA will ask the relevant additional questions about rental income as part of your tax situation.' },
      { q: 'What if I have income from another country?', a: 'QLIXA can ask additional questions about foreign income when it falls within a supported tax situation. The exact information needed depends on the type of income and other circumstances.' },
      { q: 'I have children. Does QLIXA take that into account?', a: 'The questionnaire asks about children and your family situation when this information may be relevant to the return. Depending on your answers, additional questions about the relevant tax categories appear.' },
      { q: 'I have almost no expenses. Is QLIXA still worth using?', a: 'Yes. You don’t need to know in advance whether you have anything to claim. You answer questions about your situation, and the questionnaire helps check possible categories that may be relevant based on the information you enter.' },
    ],
    faqGroupB: [
      { q: 'I don’t understand what Arbeitnehmerveranlagung, Einkommensteuererklärung or Werbungskosten even mean. Can I still do this?', a: 'That’s exactly why QLIXA is built around questions rather than around knowledge of tax terminology. When an official Austrian term is needed, QLIXA explains it in plain language.' },
      { q: 'Do I need to know in advance which tax return I need to file?', a: 'No. You start with information about yourself, your income and your circumstances. Further questions depend on your answers and help gather the information needed for your Tax Return.' },
      { q: 'Do I have to pay to access my QLIXA account?', a: 'No. Your personal QLIXA account is free to access. You can start using QLIXA there, use the available free functions and tools, and come back to your data. Payment applies only to specific paid products and features, not to access to the account itself.' },
      { q: 'Is there anything in the account besides the QLIXA tax questionnaire?', a: 'Yes. In addition to the main questionnaire, other functions and tools are available in the account. QLIXA keeps developing, so new features may be added over time.' },
      { q: 'Do I need to complete the whole questionnaire in one go?', a: 'No. You can stop and continue later. If you already have everything you need on hand, you can complete the questionnaire in one sitting.' },
      { q: 'Can I look at QLIXA first and decide later whether to pay?', a: 'Yes. Access to the account is free, and you can start the questionnaire without payment. This lets you get to know QLIXA first and see how the process works.' },
      { q: 'What do I get after completing the questionnaire?', a: 'Based on the information you enter, QLIXA helps put together your tax situation, check possible relevant categories and, at the appropriate stage, prepare a Tax Return for you to review before submission. If a possible refund can be calculated for your situation, it’s shown as a preliminary estimate.' },
      { q: 'Does QLIXA submit my tax return to FinanzOnline for me?', a: 'No. QLIXA helps prepare the tax return, but before submission you review the result yourself and submit it yourself.' },
      { q: 'Does QLIXA replace a tax adviser (Steuerberater)?', a: 'No. QLIXA is an automated tool for preparing your own tax return. It is not individual tax, legal or financial advice.' },
      { q: 'What languages does QLIXA work in?', a: 'QLIXA is available in Ukrainian, German, English and Russian.' },
    ],
  },
}

export default function TaxReturnPage() {
  const [lang, setLang] = useState('UA')
  const [openFaq, setOpenFaq] = useState<string | null>('A0')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = T[lang] || T.RU
  const cabinetUrl = `${CABINET_BASE}?lang=${lang === 'UA' ? 'uk' : lang.toLowerCase()}`

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar />

      {/* ── 1. HERO ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px) 56px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{ marginBottom: 18 }}><Eyebrow>QLIXA Tax Return</Eyebrow></div>
          <h1 style={{
            fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,4.2vw,40px)', fontWeight: 700,
            color: '#1A1A1A', lineHeight: 1.28, letterSpacing: '-0.5px', marginBottom: 22,
          }}>
            {t.heroH1Line1}<br />{t.heroH1Line2}
          </h1>
          <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.7, maxWidth: 900, margin: '0 auto 10px' }}>{t.heroP1}</p>
          <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.7, maxWidth: 660, margin: '0 auto 32px' }}>{t.heroP2}</p>

          <a href={cabinetUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: '#038390',
            color: '#fff', borderRadius: 12, fontSize: 17, fontWeight: 700, textDecoration: 'none',
          }}>
            {t.heroCta}
          </a>
          <p style={{ fontSize: 15, color: '#595959', marginTop: 14, fontWeight: 500 }}>{t.heroSupport}</p>
        </div>

        {/* Situation chips */}
        <div style={{ maxWidth: 1000, margin: '44px auto 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, justifyContent: 'center' }}>
            {t.situationChips.map((c: string) => <Chip key={c}>{c}</Chip>)}
          </div>
          <p style={{ fontSize: 15, color: '#595959', textAlign: 'center' as const, marginTop: 18, fontWeight: 500 }}>{t.chipsNote}</p>
        </div>
      </section>

      {/* ── 2. TERMINOLOGY → QUESTIONS ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 44 }}>{t.s2H2}</SectionHeading>

          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 28, alignItems: 'center', justifyContent: 'center' }}>
            {/* Left — bureaucratic terms (kept in German in every locale) */}
            <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 18, padding: 26, border: '1px solid #E6F4F5' }}>
              <ConfusedFacesIllustration />
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginTop: 14 }}>
                {terms.map(term => (
                  <span key={term} style={{
                    fontSize: 14, fontWeight: 600, color: '#9D9D9D', background: 'var(--gray, #F5F5F5)',
                    border: '1px solid #E6F4F5', borderRadius: 8, padding: '8px 12px', fontFamily: 'monospace',
                  }}>
                    {term}
                  </span>
                ))}
              </div>
            </div>

            {/* Center — transformation (icon fixed across locales per brand rule) */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 10, padding: '0 8px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/favicon-planet-origin.svg" alt="QLIXA" style={{ width: 48, height: 48, objectFit: 'contain' as const, flexShrink: 0 }} />
              <FlowArrowRight animated />
              <p style={{ fontSize: 13, color: '#595959', textAlign: 'center' as const, fontWeight: 600, maxWidth: 110, lineHeight: 1.4 }}>
                {t.s2Center}
              </p>
            </div>

            {/* Right — human questions */}
            <div style={{ background: '#fff', borderRadius: 18, padding: 26, border: '1px solid #E6F4F5', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
              {t.humanQuestions.map((q: string) => (
                <div key={q} style={{
                  fontSize: 15, fontWeight: 600, color: '#1A1A1A', background: '#F0F7F8',
                  borderRadius: 10, padding: '10px 14px', lineHeight: 1.4,
                }}>
                  {q}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: 36 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{t.s2Bottom}</p>
            <p style={{ fontSize: 15, color: '#595959', fontWeight: 500 }}>{t.s2Support}</p>
          </div>
        </div>
      </section>

      {/* ── 3. ADAPTIVE QUESTIONNAIRE ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 10 }}>{t.s3H2}</SectionHeading>
          <p style={{ fontSize: 17, color: '#595959', textAlign: 'center' as const, maxWidth: 720, margin: '0 auto 48px', lineHeight: 1.6 }}>
            {t.s3Sub}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {/* Example A — home office */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 22, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>{t.s3Label}</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>{t.s3QA_Q}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label={t.s3Yes} />
                <YesNoPill label={t.s3No} />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {t.s3QA_Followups.map((q: string) => (
                  <div key={q} style={{ fontSize: 14, color: '#404040', background: '#fff', borderRadius: 9, padding: '9px 12px', lineHeight: 1.4, fontWeight: 500 }}>{q}</div>
                ))}
              </div>
            </div>

            {/* Example B — children */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 22, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>{t.s3Label}</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>{t.s3QB_Q}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label={t.s3Yes} />
                <YesNoPill label={t.s3No} />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {t.s3QB_Followups.map((q: string) => (
                  <div key={q} style={{ fontSize: 14, color: '#404040', background: '#fff', borderRadius: 9, padding: '9px 12px', lineHeight: 1.4, fontWeight: 500 }}>{q}</div>
                ))}
              </div>
            </div>

            {/* Example C — self-employment */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 22, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>{t.s3Label}</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>{t.s3QC_Q}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label={t.s3Yes} />
                <YesNoPill label={t.s3No} />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' as const, gap: 6 }}>
                {t.s3QC_Branches.map((m: string, i: number, arr: string[]) => (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#038390', background: '#fff', borderRadius: 999, padding: '6px 12px' }}>{m}</span>
                    {i < arr.length - 1 && <span style={{ color: '#038390', fontSize: 13 }}>→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginTop: 40 }}>{t.s3Bottom}</p>
        </div>
      </section>

      {/* ── 4. MULTIPLE SITUATIONS ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 10 }}>{t.s4H2}</SectionHeading>
          <p style={{ fontSize: 17, color: '#595959', textAlign: 'center' as const, maxWidth: 760, margin: '0 auto 44px', lineHeight: 1.6 }}>
            {t.s4Sub}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {t.situationCards.map((c: any) => (
              <div key={c.title} style={{ background: '#fff', borderRadius: 18, padding: 22, border: '1px solid #E6F4F5' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' as const, marginTop: 40 }}>{t.s4Bottom}</p>
        </div>
      </section>

      {/* ── 5. QUESTIONNAIRE COVERAGE ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' as const }}>
          <SectionHeading style={{ marginBottom: 36 }}>{t.s5H2}</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, justifyContent: 'center', marginBottom: 28 }}>
            {t.coverageItems.map((item: string) => (
              <span key={item} style={{
                fontSize: 15, fontWeight: 600, color: '#1A1A1A', background: '#F0F7F8',
                border: '1px solid rgba(3,131,144,0.12)', borderRadius: 999, padding: '9px 16px',
              }}>
                {item}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#404040', marginBottom: 6 }}>{t.s5Support}</p>
          <p style={{ fontSize: 15, color: '#9D9D9D' }}>{t.s5Secondary}</p>
        </div>
      </section>

      {/* ── 6. FREE CABINET ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <SectionHeading style={{ marginBottom: 24 }}>{t.s6H2}</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14, marginBottom: 28 }}>
              {t.cabinetFeatures.map((f: any) => (
                <div key={f.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#038390', fontSize: 18, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{f.title}</div>
                    <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={cabinetUrl} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', background: '#038390',
              color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginBottom: 12,
            }}>
              {t.s6Cta}
            </a>
            <p style={{ fontSize: 14, color: '#595959' }}>{t.s6Support}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/platform/hero-mockup.png" alt={t.s6ImgAlt} style={{ width: '100%', height: 'auto', objectFit: 'contain' as const, display: 'block', borderRadius: 20 }} />
        </div>
      </section>

      {/* ── 7. TRY BEFORE PAYING ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' as const }}>
          <SectionHeading style={{ marginBottom: 16 }}>{t.s7H2}</SectionHeading>
          <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.65, marginBottom: 4 }}>{t.s7P1}</p>
          <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.65, marginBottom: 28 }}>{t.s7P2}</p>
          <a href={cabinetUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', background: '#038390',
            color: '#fff', borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginBottom: 12,
          }}>
            {t.s7Cta}
          </a>
          <p style={{ fontSize: 14, color: '#595959' }}>{t.s7Support}</p>
        </div>
      </section>

      {/* ── 8. PIPELINE ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 48 }}>{t.s8H2}</SectionHeading>
          <div className="qlixa-pipeline" style={{ display: 'grid', gap: 12, alignItems: 'start' }}>
            {t.pipelineSteps.map((step: any, i: number) => (
              <div key={step.n} style={{ display: 'flex', flexDirection: 'column' as const }}>
                <div className="qlixa-pipeline-connector" style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', marginBottom: 14 }}>
                  {i > 0 && <span className="qlixa-connector-line" style={{ flex: 1, height: 2, background: '#E6F4F5' }} />}
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%', background: '#fff', border: '2px solid #038390',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontFamily: 'DM Serif Display, serif', fontSize: 16, fontWeight: 700, color: '#038390',
                  }}>
                    {step.n}
                  </div>
                  {i < t.pipelineSteps.length - 1 && <span className="qlixa-connector-line" style={{ flex: 1, height: 2, background: '#E6F4F5' }} />}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PRELIMINARY REFUND ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
          <SectionHeading style={{ marginBottom: 16 }}>{t.s9H2}</SectionHeading>
          <p style={{ fontSize: 17, color: '#404040', lineHeight: 1.65, marginBottom: 32 }}>{t.s9P}</p>

          <div style={{ background: '#1A1A1A', borderRadius: 20, padding: '32px 28px', maxWidth: 380, margin: '0 auto 20px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 10, fontWeight: 500 }}>{t.s9ResultLabel}</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 44, fontWeight: 700, color: '#fff' }}>€ —</div>
          </div>
          <p style={{ fontSize: 14, color: '#9D9D9D', maxWidth: 480, margin: '0 auto' }}>{t.s9Note}</p>
        </div>
      </section>

      {/* ── 10. WHAT USER GETS ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 36 }}>{t.s10H2}</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {t.resultSteps.map((step: any) => (
              <div key={step.n} style={{ display: 'flex', gap: 14, background: '#fff', borderRadius: 16, padding: 20, border: '1px solid #E6F4F5' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 700, color: '#038390', flexShrink: 0, width: 34 }}>{step.n}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 4, lineHeight: 1.3 }}>{step.title}</div>
                  <div style={{ fontSize: 15, color: '#595959', lineHeight: 1.55 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. DOCUMENT VISUAL ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' as const }}>
          <SectionHeading style={{ marginBottom: 28 }}>{t.s11H2}</SectionHeading>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 999,
            background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.15)', fontSize: 15, fontWeight: 700, color: '#1A1A1A',
            marginBottom: 6,
          }}>
            {t.s11Center}
          </div>
          <FlowArrowDown />

          {/* One main declaration, flanked by its two additional forms — kept
              to three cards total so this fits one row on desktop without
              excess vertical height. */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' as const, marginTop: 4 }}>
            <div style={{
              background: '#fff', borderRadius: 14, padding: '16px 18px', minWidth: 130,
              border: '1px dashed rgba(3,131,144,0.35)',
            }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>📎</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#595959' }}>{t.s11Extra}</div>
            </div>
            <div style={{
              background: '#038390', color: '#fff', borderRadius: 16, padding: '22px 28px', minWidth: 200,
              boxShadow: '0 8px 24px rgba(3,131,144,0.25)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{t.s11Main}</div>
            </div>
            <div style={{
              background: '#fff', borderRadius: 14, padding: '16px 18px', minWidth: 130,
              border: '1px dashed rgba(3,131,144,0.35)',
            }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>📎</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#595959' }}>{t.s11Extra}</div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: '#9D9D9D', maxWidth: 520, margin: '24px auto 0' }}>{t.s11Caption}</p>
        </div>
      </section>

      {/* ── 12. USER CONTROL / TRUST ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 36 }}>{t.s12H2}</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 28 }}>
            {t.trustCards.map((c: any) => (
              <div key={c.title} style={{ background: '#fff', borderRadius: 14, padding: 18, border: '1px solid #E6F4F5' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#9D9D9D', lineHeight: 1.6, maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
            {t.s12Disclaimer}
          </p>
        </div>
      </section>

      {/* ── 13. COMPLETE NOW OR LATER ── */}
      <section style={{ background: '#FFFFFF', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 32 }}>{t.s13H2}</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 20, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 280px', background: '#F0F7F8', borderRadius: 16, padding: 22, border: '1px solid rgba(3,131,144,0.10)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{t.s13LeftTitle}</div>
              <div style={{ fontSize: 15, color: '#404040' }}>{t.s13LeftBody}</div>
            </div>
            <div style={{ flex: '0 0 auto', fontSize: 14, fontWeight: 700, color: '#595959', textAlign: 'center' as const, maxWidth: 140 }}>
              {t.s13Center}
            </div>
            <div style={{ flex: '1 1 280px', background: '#F0F7F8', borderRadius: 16, padding: 22, border: '1px solid rgba(3,131,144,0.10)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{t.s13RightTitle}</div>
              <div style={{ fontSize: 15, color: '#404040' }}>{t.s13RightBody}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. FINAL CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#fff', marginBottom: 18 }}>
            {t.s14Eyebrow}
          </div>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.6vw,40px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 14 }}>
            {t.s14H2}
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 30, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>{t.s14P}</p>

          <a href={cabinetUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 34px', background: '#fff',
            color: '#038390', borderRadius: 12, fontSize: 17, fontWeight: 700, textDecoration: 'none', marginBottom: 16,
          }}>
            {t.s14Cta}
          </a>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 32 }}>{t.s14Support}</p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' as const }}>
            {t.s14Flow.map((step: string, i: number) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '7px 14px' }}>{step}</span>
                {i < t.s14Flow.length - 1 && <span style={{ color: 'rgba(255,255,255,0.6)' }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FAQ ── */}
      <section style={{ background: '#FFFFFF', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 40 }}>{t.faqH2}</SectionHeading>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>
              {t.faqGroupALabel}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {t.faqGroupA.map((f: any, i: number) => (
                <Accordion key={f.q} q={f.q} a={f.a} open={openFaq === `A${i}`} onToggle={() => setOpenFaq(openFaq === `A${i}` ? null : `A${i}`)} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>
              {t.faqGroupBLabel}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {t.faqGroupB.map((f: any, i: number) => (
                <Accordion key={f.q} q={f.q} a={f.a} open={openFaq === `B${i}`} onToggle={() => setOpenFaq(openFaq === `B${i}` ? null : `B${i}`)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* The pipeline's step circles are connected by horizontal lines on
          desktop; below 860px it becomes a plain vertical list (the lines
          would be meaningless once wrapped), matching the "vertical
          journey on mobile" requirement. Scoped to this page only. */}
      <style jsx>{`
        .qlixa-pipeline { grid-template-columns: repeat(5, 1fr); }
        @media (max-width: 860px) {
          .qlixa-pipeline {
            grid-template-columns: 1fr;
          }
          .qlixa-connector-line {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
