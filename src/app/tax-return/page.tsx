'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const CABINET_BASE = 'https://cabinet-ten-lac.vercel.app/login'

// ————————————————————————————————————————————————————————————————
// Small reusable pieces (kept local to this page — nothing here is
// generic enough yet to promote into /components, and the page is
// still RU-only content-wise; see note at the bottom of the file).
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

// ————————————————————————————————————————————————————————————————
// Content — RU only for now (see report). Falls back to RU for
// UA / EN / DE until they are localized in a follow-up task.
// ————————————————————————————————————————————————————————————————

const situationChips = [
  'Работа по найму',
  'Самозанятость / Gewerbe',
  'Несколько источников дохода',
  'Дети и семья',
  'Аренда недвижимости',
  'Дополнительные и заграничные доходы',
]

const terms = [
  'Arbeitnehmerveranlagung', 'Einkommensteuererklärung', 'Werbungskosten', 'Sonderausgaben',
  'Außergewöhnliche Belastungen', 'Pendlerpauschale', 'Familienbonus Plus', 'Betriebsausgaben',
]

const humanQuestions = [
  'Работаешь из дома?',
  'Ездишь на работу?',
  'Покупал что-нибудь для работы?',
  'У тебя есть дети?',
  'Проходил профессиональное обучение?',
  'Есть доход кроме зарплаты?',
  'Есть самостоятельная деятельность?',
  'Сдаёшь недвижимость?',
]

const situationCards = [
  { title: 'Работа по найму', desc: 'Работа, профессиональные расходы, Homeoffice, дорога на работу и другие связанные обстоятельства.' },
  { title: 'Самостоятельная деятельность', desc: 'Доходы и расходы от Gewerbe или другой самостоятельной деятельности.' },
  { title: 'Семья и дети', desc: 'Семейная ситуация, дети и возможные релевантные налоговые категории.' },
  { title: 'Недвижимость', desc: 'Доходы и расходы, связанные со сдачей недвижимости.' },
  { title: 'Другие источники дохода', desc: 'Дополнительные и иностранные доходы, если они относятся к поддерживаемой налоговой ситуации.' },
  { title: 'Другие обстоятельства', desc: 'QLIXA задаёт дополнительные вопросы там, где ответы показывают, что тема может быть релевантной.' },
]

const coverageItems = [
  'Работа и профессия', 'Работа из дома', 'Дорога на работу', 'Рабочая техника и оборудование',
  'Профессиональное обучение', 'Командировки и рабочие поездки', 'Дети и семья', 'Особые расходы и обстоятельства',
  'Самостоятельная деятельность', 'Доходы от Gewerbe', 'Расходы деятельности', 'Аренда недвижимости',
  'Дополнительные доходы', 'Иностранные доходы', 'Несколько источников дохода',
]

const cabinetFeatures = [
  { title: 'Бесплатный доступ', desc: 'Личный кабинет QLIXA доступен бесплатно.' },
  { title: 'Tax Return', desc: 'В кабинете можно начать работу с адаптивной анкетой QLIXA.' },
  { title: 'Продолжай позже', desc: 'Не обязательно заканчивать всё за один раз. Можно вернуться к заполнению позже.' },
  { title: 'Всё в одном месте', desc: 'Данные и доступные инструменты собраны в личном кабинете.' },
  { title: 'Полезные инструменты', desc: 'Помимо основной анкеты, в кабинете доступны дополнительные функции — например, учёт расходов и поездок в течение года.' },
  { title: 'QLIXA развивается', desc: 'В кабинете постепенно появляются новые функции и инструменты.' },
]

const pipelineSteps = [
  { n: '01', title: 'Ты отвечаешь', desc: 'Простые вопросы о своей ситуации.' },
  { n: '02', title: 'QLIXA уточняет', desc: 'Следующие вопросы появляются на основе предыдущих ответов.' },
  { n: '03', title: 'QLIXA структурирует данные', desc: 'Информация распределяется по релевантным частям налоговой декларации.' },
  { n: '04', title: 'Ты проверяешь', desc: 'Перед формированием результата можно проверить введённые данные.' },
  { n: '05', title: 'QLIXA подготавливает Tax Return', desc: 'На основе введённых данных подготавливается налоговая декларация и, если это нужно для твоей ситуации, необходимые дополнительные формы.' },
]

const resultSteps = [
  { n: '01', title: 'Твоя налоговая ситуация', desc: 'Все введённые данные собраны в понятной структуре.' },
  { n: '02', title: 'Возможные релевантные категории', desc: 'Ты видишь категории, которые могут относиться к твоей ситуации на основе введённых ответов.' },
  { n: '03', title: 'Предварительный расчёт', desc: 'Если применимо, QLIXA показывает предварительную оценку возможного возврата.' },
  { n: '04', title: 'Проверка перед формированием', desc: 'Перед созданием Tax Return ты проверяешь свои ответы.' },
  { n: '05', title: 'Подготовленная декларация и формы', desc: 'QLIXA формирует налоговую декларацию на основе введённых данных вместе с дополнительными формами, если они нужны для твоей ситуации.' },
]

const trustCards = [
  { title: 'Самостоятельно', desc: 'Ты сам проверяешь данные перед подачей.' },
  { title: 'Без комиссии от возврата', desc: 'QLIXA не забирает процент от возможного налогового возврата.' },
  { title: 'Без обязательной консультации', desc: 'Не нужно записываться на встречу, чтобы начать заполнение.' },
  { title: 'На понятном языке', desc: 'QLIXA помогает пройти процесс через обычные вопросы вместо сложной терминологии.' },
]

const faqGroupA = [
  { q: 'Я просто работаю по найму. Мне подойдёт QLIXA?', a: 'Да. Если ты получаешь зарплату в Австрии, анкета начинает с вопросов, относящихся к твоей ситуации: работе, возможным профессиональным расходам, дороге на работу, семье и другим обстоятельствам. Ненужные ветки вопросов не появляются только потому, что они существуют для других пользователей.' },
  { q: 'А если я самозанятый или у меня Gewerbe?', a: 'QLIXA Tax Return рассчитана и на поддерживаемые ситуации с самостоятельной деятельностью. Анкета может задавать вопросы о деятельности, доходах, расходах и других данных, относящихся к такой налоговой ситуации.' },
  { q: 'А если я одновременно работаю по найму и имею Gewerbe?', a: 'Такая комбинация учитывается в рамках одной налоговой ситуации. Дальнейшие вопросы адаптируются к введённым данным.' },
  { q: 'А если у меня несколько источников дохода?', a: 'Можно указать поддерживаемые источники дохода в рамках своей налоговой ситуации. Какие дополнительные вопросы появятся дальше, зависит от твоих ответов.' },
  { q: 'А если я сдаю квартиру или другую недвижимость?', a: 'QLIXA задаст соответствующие дополнительные вопросы о доходе от аренды как о части твоей налоговой ситуации.' },
  { q: 'А если у меня есть доходы из другой страны?', a: 'QLIXA может задавать дополнительные вопросы об иностранных доходах, когда они относятся к поддерживаемой налоговой ситуации. Какие именно данные нужны, зависит от вида дохода и других обстоятельств.' },
  { q: 'У меня дети. QLIXA это учитывает?', a: 'Анкета спрашивает о детях и семейной ситуации, если эти данные могут быть релевантны для декларации. В зависимости от ответов появляются дополнительные вопросы о соответствующих налоговых категориях.' },
  { q: 'У меня почти нет расходов. Есть смысл пользоваться QLIXA?', a: 'Да. Необязательно заранее знать, есть ли у тебя что учитывать. Ты отвечаешь на вопросы о своей ситуации, а анкета помогает проверить возможные категории, которые могут быть релевантны на основе введённых данных.' },
]

const faqGroupB = [
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
]

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

    s2H2: 'Австрийские налоги выглядят сложно. Вопросы QLIXA — нет.',
    s2Center: 'QLIXA переводит налоговую логику в понятные вопросы',
    s2Bottom: 'Тебе не нужно знать, какой налоговый термин искать.',
    s2Support: 'Начни со своей ситуации. QLIXA задаст следующие вопросы на основе твоих ответов.',

    s3H2: 'Не одна огромная анкета для всех',
    s3Sub: 'Следующие вопросы зависят от твоих ответов. Если тема к тебе не относится, соответствующая ветка вопросов не появляется.',
    s3Bottom: 'Ты рассказываешь о своей ситуации → QLIXA определяет, какие вопросы показать дальше.',

    s4H2: 'У налоговой ситуации редко бывает только одна категория',
    s4Sub: 'Можно одновременно работать по найму, иметь дополнительные доходы, ребёнка, расходы на обучение или самостоятельную деятельность. QLIXA рассматривает введённую ситуацию вместе.',
    s4Bottom: 'Не выбирай заранее, какую декларацию тебе нужно «собирать». Сначала расскажи QLIXA о своей ситуации.',

    s5H2: 'О чём может спросить QLIXA',
    s5Support: 'Какие именно вопросы появятся, зависит от твоих ответов.',
    s5Secondary: 'QLIXA не показывает все категории всем пользователям — анкета адаптируется по ходу заполнения.',

    s6H2: 'Твой кабинет QLIXA — бесплатно',
    s6Cta: 'Открыть бесплатный кабинет →',
    s6Support: 'Доступ к кабинету бесплатный. Отдельные продукты и функции QLIXA могут быть платными.',

    s7H2: 'Можно сначала посмотреть, подходит ли тебе QLIXA',
    s7P1: 'Не нужно покупать продукт, не увидев его.',
    s7P2: 'Создай бесплатный кабинет, начни отвечать на вопросы и посмотри, как QLIXA работает с твоей налоговой ситуацией.',
    s7Cta: 'Попробовать бесплатно →',
    s7Support: 'Начать анкету можно без оплаты.',

    s8H2: 'От ответа до налоговой декларации',

    s9H2: 'А сколько можно получить обратно?',
    s9P: 'Если введённая налоговая ситуация позволяет рассчитать возможный возврат, QLIXA показывает предварительную оценку на основе твоих данных.',
    s9ResultLabel: 'Предварительный возможный возврат',
    s9Note: 'Итоговая сумма зависит от введённых данных и фактической обработки декларации налоговым органом.',

    s10H2: 'В конце — не просто список ответов',

    s11H2: 'Одна ситуация — одна декларация и её приложения',
    s11Center: 'Твоя налоговая ситуация',
    s11Main: 'Налоговая декларация',
    s11Extra: 'Дополнительная форма',
    s11Caption: 'Какие именно части и дополнительные формы нужны, зависит от твоих ответов и поддерживаемой налоговой ситуации.',

    s12H2: 'QLIXA помогает подготовить. Решение остаётся за тобой.',
    s12Disclaimer: 'QLIXA не является налоговым консультантом и не принимает налоговые решения вместо пользователя. Результат формируется на основе введённых данных и предназначен для проверки пользователем перед подачей.',

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

  // NOTE: only RU is written for this task. UA / EN / DE fall back to RU
  // until localized in a follow-up task (see final report).
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
            {situationChips.map(c => <Chip key={c}>{c}</Chip>)}
          </div>
          <p style={{ fontSize: 15, color: '#595959', textAlign: 'center' as const, marginTop: 18, fontWeight: 500 }}>{t.chipsNote}</p>
        </div>
      </section>

      {/* ── 2. TERMINOLOGY → QUESTIONS ── */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading style={{ textAlign: 'center', marginBottom: 44 }}>{t.s2H2}</SectionHeading>

          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 28, alignItems: 'center', justifyContent: 'center' }}>
            {/* Left — bureaucratic terms */}
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

            {/* Center — transformation */}
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
              {humanQuestions.map(q => (
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
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>QLIXA спрашивает</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>Работаешь ли ты частично или полностью из дома?</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label="Да" />
                <YesNoPill label="Нет" />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {['Используешь ли ты дома отдельное рабочее помещение?', 'Покупал ли ты оборудование или технику для работы?', 'Есть ли другие расходы, связанные с работой из дома?'].map(q => (
                  <div key={q} style={{ fontSize: 14, color: '#404040', background: '#fff', borderRadius: 9, padding: '9px 12px', lineHeight: 1.4, fontWeight: 500 }}>{q}</div>
                ))}
              </div>
            </div>

            {/* Example B — children */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 22, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>QLIXA спрашивает</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>Есть ли у тебя дети?</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label="Да" />
                <YesNoPill label="Нет" />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {['Сколько у тебя детей и какого они возраста?', 'Есть ли расходы на обучение или уход за ребёнком?'].map(q => (
                  <div key={q} style={{ fontSize: 14, color: '#404040', background: '#fff', borderRadius: 9, padding: '9px 12px', lineHeight: 1.4, fontWeight: 500 }}>{q}</div>
                ))}
              </div>
            </div>

            {/* Example C — self-employment */}
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: 22, border: '1px solid rgba(3,131,144,0.12)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>QLIXA спрашивает</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.4 }}>Есть ли у тебя доход от самостоятельной деятельности?</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <YesNoPill active label="Да" />
                <YesNoPill label="Нет" />
              </div>
              <FlowArrowDown />
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' as const, gap: 6 }}>
                {['Доходы', 'Расходы', 'Деятельность', 'Дополнительные вопросы'].map((m, i, arr) => (
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
            {situationCards.map(c => (
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
            {coverageItems.map(item => (
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
              {cabinetFeatures.map((f: any) => (
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
          <img src="/platform/hero-mockup.png" alt="Кабинет QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain' as const, display: 'block', borderRadius: 20 }} />
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
            {pipelineSteps.map((step, i) => (
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
                  {i < pipelineSteps.length - 1 && <span className="qlixa-connector-line" style={{ flex: 1, height: 2, background: '#E6F4F5' }} />}
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
            {resultSteps.map(step => (
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
            {trustCards.map(c => (
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
              {faqGroupA.map((f, i) => (
                <Accordion key={f.q} q={f.q} a={f.a} open={openFaq === `A${i}`} onToggle={() => setOpenFaq(openFaq === `A${i}` ? null : `A${i}`)} />
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>
              {t.faqGroupBLabel}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {faqGroupB.map((f, i) => (
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
