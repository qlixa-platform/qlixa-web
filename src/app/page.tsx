'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ArticlesSlider from '@/components/layout/ArticlesSlider'
import NotifyMeButton from '@/components/NotifyMeButton'

const PUBLISHED_META = [
  { href: '/articles/rwr-karte',         cover: '/articles/rwr-karte-cover.jpg',        date: { UA: '2026-07-21',   RU: '2026-07-21',  EN: '2026-07-21',  DE: '2026-07-21' },  readTime: { UA: '~15 хвилин',    RU: '~15 минут',   EN: '~15 min',    DE: '~15 Min.' } },
  { href: '/articles/gewerbeanmeldung',  cover: '/articles/gewerbeanmeldung-cover.jpg', date: { UA: 'Червень 2026', RU: 'Июнь 2026',   EN: 'June 2026',   DE: 'Juni 2026' },   readTime: { UA: '15 хв читання', RU: '15 мин',      EN: '15 min read', DE: '15 Min.' } },
  { href: '/articles/austria-id',        cover: '/articles/austria-id-cover.jpg',       date: { UA: 'Червень 2026', RU: 'Июнь 2026',   EN: 'June 2026',   DE: 'Juni 2026' },   readTime: { UA: '8 хв читання',  RU: '8 мин',       EN: '8 min read',  DE: '8 Min.' } },
  { href: '/articles/invalidity-child',  cover: '/articles/invalidity-cover.jpg',       date: { UA: 'Червень 2026', RU: 'Июнь 2026',   EN: 'June 2026',   DE: 'Juni 2026' },   readTime: { UA: '10 хв читання', RU: '10 мин',      EN: '10 min read', DE: '10 Min.' } },
  { href: '/articles/gisa-formular',     cover: '/articles/gisa-cover.jpg',             date: { UA: 'Червень 2026', RU: 'Июнь 2026',   EN: 'June 2026',   DE: 'Juni 2026' },   readTime: { UA: '15 хв читання', RU: '15 мин',      EN: '15 min read', DE: '15 Min.' } },
]

const UPCOMING_HREFS = [
  '/articles/svs-formular',
  '/articles/finanz-online',
  '/articles/mvk-pension',
]

const ARTICLES_TEXT: Record<string, {
  published: { tag: string; title: string; desc: string }[]
  upcoming:  { tag: string; title: string; desc: string }[]
}> = {
  UA: {
    published: [
      { tag: 'Гайд',                  title: 'Як підготуватися до подачі на RWR+ карту',                           desc: 'Покроковий огляд підготовки до подачі: документи, фінансові вимоги та чеклісти для різних робочих ситуацій.' },
      { tag: 'Реєстрація бізнесу',    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',     desc: 'Покроковий огляд Gewerbeanmeldung: які документи можуть знадобитися, куди подавати заяву та на що звернути увагу під час реєстрації.' },
      { tag: 'Австрія · Документи',   title: 'Як оформити ID Austria: покроковий гайд для іноземців',               desc: 'Як оформити ID Austria та використовувати її для доступу до цифрових державних сервісів, зокрема FinanzOnline.' },
      { tag: 'Сім\'я · Пільги',       title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати',    desc: 'Огляд основних тем для батьків: Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та можливі податкові пільги.' },
      { tag: 'GISA · Реєстрація',     title: 'Реєстрація на сайті GISA: покрокова інструкція',                      desc: 'Покрокова інструкція з онлайн-подання Gewerbeanmeldung через GISA з поясненням основних полів і етапів.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'Як заповнити формуляр SVS',           desc: 'Соціальне страхування — що вказати щоб не переплатити.' },
      { tag: 'FinanzOnline', title: 'Як заповнити формуляр FinanzOnline',  desc: 'Реєстрація в податковій онлайн — покроково.' },
      { tag: 'MVK',          title: 'Як обрати пенсійний фонд MVK',         desc: 'Що таке MVK і як не пропустити дедлайн 6 місяців.' },
    ],
  },
  RU: {
    published: [
      { tag: 'Гайд',                  title: 'Как подготовиться к подаче на RWR+ карту',                             desc: 'Пошаговый обзор подготовки к подаче: документы, финансовые требования и чек-листы для разных рабочих ситуаций.' },
      { tag: 'Регистрация бизнеса',   title: 'Gewerbeanmeldung в Австрии: пошаговая регистрация самозанятости',     desc: 'Пошаговый обзор Gewerbeanmeldung: какие документы могут понадобиться, куда подавать заявление и на что обратить внимание при регистрации.' },
      { tag: 'Австрия · Документы',   title: 'Как оформить ID Austria: пошаговый гайд для иностранцев',             desc: 'Как оформить ID Austria и использовать её для доступа к цифровым государственным сервисам, включая FinanzOnline.' },
      { tag: 'Семья · Льготы',        title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать',    desc: 'Обзор основных тем для родителей: Behindertenpass, повышенная Familienbeihilfe, Pflegegeld и возможные налоговые льготы.' },
      { tag: 'GISA · Регистрация',    title: 'Регистрация на сайте GISA: пошаговая инструкция',                     desc: 'Пошаговая инструкция по онлайн-подаче Gewerbeanmeldung через GISA с пояснением основных полей и этапов.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'Как заполнить формуляр SVS',          desc: 'Социальное страхование — что указать чтобы не переплатить.' },
      { tag: 'FinanzOnline', title: 'Как заполнить формуляр FinanzOnline', desc: 'Регистрация в налоговой онлайн — пошагово.' },
      { tag: 'MVK',          title: 'Как выбрать пенсионный фонд MVK',     desc: 'Что такое MVK и как не пропустить дедлайн 6 месяцев.' },
    ],
  },
  EN: {
    published: [
      { tag: 'Guide',                  title: 'How to Prepare for Your RWR+ Card Application',                       desc: 'A step-by-step overview of how to prepare: documents, financial requirements and checklists for different work situations.' },
      { tag: 'Business Registration',  title: 'Gewerbeanmeldung in Austria: Step-by-Step Self-Employment Registration', desc: 'A step-by-step overview of Gewerbeanmeldung: which documents may be needed, where to submit the application and what to consider during registration.' },
      { tag: 'Austria · Documents',    title: 'How to Get ID Austria: Step-by-Step Guide for Foreigners',             desc: 'How to set up ID Austria and use it to access digital government services, including FinanzOnline.' },
      { tag: 'Family · Benefits',      title: 'Child Disability in Austria: Payments, Benefits and Where to Start',   desc: 'An overview of key topics for parents: Behindertenpass, increased Familienbeihilfe, Pflegegeld and possible tax benefits.' },
      { tag: 'GISA · Registration',    title: 'Registering on GISA Website: Step-by-Step Instructions',               desc: 'A step-by-step guide to submitting a Gewerbeanmeldung online via GISA, with explanations of the main fields and stages.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'How to Fill in the SVS Form',         desc: 'Social insurance — what to enter so you don\'t overpay.' },
      { tag: 'FinanzOnline', title: 'How to Fill in the FinanzOnline Form', desc: 'Online tax office registration — step by step.' },
      { tag: 'MVK',          title: 'How to Choose a Pension Fund MVK',    desc: 'What MVK is and how not to miss the 6-month deadline.' },
    ],
  },
  DE: {
    published: [
      { tag: 'Leitfaden',              title: 'So bereitest du dich auf den RWR+-Kartenantrag vor',                   desc: 'Ein Schritt-für-Schritt-Überblick zur Vorbereitung: Dokumente, finanzielle Voraussetzungen und Checklisten für unterschiedliche Arbeitssituationen.' },
      { tag: 'Gewerbeanmeldung',       title: 'Gewerbeanmeldung in Österreich: Schritt-für-Schritt zur Selbstständigkeit', desc: 'Ein Schritt-für-Schritt-Überblick zur Gewerbeanmeldung: welche Unterlagen benötigt werden können, wo die Anmeldung erfolgt und worauf bei der Registrierung zu achten ist.' },
      { tag: 'Österreich · Dokumente', title: 'ID Austria beantragen: Schritt-für-Schritt-Anleitung für Ausländer',  desc: 'So richtest du die ID Austria ein und nutzt sie für den Zugang zu digitalen Behördenservices, darunter FinanzOnline.' },
      { tag: 'Familie · Leistungen',   title: 'Behinderung des Kindes in Österreich: Leistungen und wie man anfängt', desc: 'Ein Überblick über wichtige Themen für Eltern: Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und mögliche steuerliche Begünstigungen.' },
      { tag: 'GISA · Anmeldung',       title: 'Registrierung auf der GISA-Website: Schritt-für-Schritt-Anleitung',   desc: 'Eine Schritt-für-Schritt-Anleitung zur Online-Gewerbeanmeldung über GISA mit Erklärungen zu den wichtigsten Feldern und Schritten.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'So füllst du das SVS-Formular aus',          desc: 'Sozialversicherung — was du angeben musst, um nicht zu viel zu zahlen.' },
      { tag: 'FinanzOnline', title: 'So füllst du das FinanzOnline-Formular aus', desc: 'Online-Registrierung beim Finanzamt — Schritt für Schritt.' },
      { tag: 'MVK',          title: 'Wie du den Pensionsfonds MVK wählst',        desc: 'Was MVK ist und wie du die 6-Monats-Frist nicht verpasst.' },
    ],
  },
}

// Тикер: іконка + текст, переклади на 4 мови
type TickerItem = { icon: string; text: string }
const TICKER_ICONS = [
  'deadlines.png',
  'invoices.png',
  'suppliers.png',
  'languages.png',
  'automation.png',
  'clients.png',
  'tax-refund.png',
  'VAT-Reports.png',
]
const TICKER_TEXT: Record<string, string[]> = {
  UA: [
    'Без запису на прийом',
    'Без комісії від суми повернення',
    'Самообслуговування',
    'Доступно 4 мовами',
    'Розумна адаптивна анкета',
    'Анкета підлаштовується під твої відповіді',
    'Попередній розрахунок можливого повернення',
    'Повністю заповнена податкова декларація',
  ],
  EN: [
    'No appointment',
    'No commission on your refund',
    'Self-service',
    'Available in 4 languages',
    'Smart adaptive questionnaire',
    'Built around your situation',
    'Preliminary refund before filing',
    'Fully completed tax declaration',
  ],
  DE: [
    'Kein Termin nötig',
    'Keine Provision auf deine Rückerstattung',
    'Selbstbedienung',
    'In 4 Sprachen verfügbar',
    'Intelligenter, adaptiver Fragebogen',
    'Auf deine Situation zugeschnitten',
    'Vorläufige Rückerstattung vor der Einreichung',
    'Vollständig ausgefüllte Steuererklärung',
  ],
  RU: [
    'Без записи на приём',
    'Без комиссии с возврата',
    'Самообслуживание',
    'Доступно на 4 языках',
    'Умная адаптивная анкета',
    'Построено вокруг твоей ситуации',
    'Предварительный расчёт возврата до подачи',
    'Полностью заполненная налоговая декларация',
  ],
}
const TICKER_ITEMS: Record<string, TickerItem[]> = Object.fromEntries(
  Object.entries(TICKER_TEXT).map(([lang, texts]) => [
    lang,
    texts.map((text, i) => ({ icon: TICKER_ICONS[i], text })),
  ])
)

// Hero copy by locale. UA layout is currently the approved visual source
// of truth (see the explicit HERO_* wrappers further down); RU/EN/DE reuse
// the same HeroCopy shape and fall back to the pre-strip CTA/positions.
type HeroFlowItem = { title: string; price: string; desc: string }
type HeroCopy = {
  h1: [string, string]
  supporting: string
  step1: { title: string[]; desc: string[] }
  step2: { title: string[]; desc: string[] }
  step3: { title: string[]; desc: string[] }
  // The free→paid strip (HERO_FREE_FLOW_GROUP): 4 explicit items, same
  // structure/positions in every locale — only this text varies.
  flow: { item1: HeroFlowItem; item2: HeroFlowItem; item3: HeroFlowItem; item4: HeroFlowItem }
  cta: string
}
// All 4 locales now share one identical Hero structure/geometry (the
// approved UA layout) and the same commercial logic (account/questionnaire/
// estimate free, completed declaration paid). The Hero CTA always links to
// /tax-return — no more per-locale fallback route.
const HERO_TEXT: Record<string, { hero: HeroCopy }> = {
  UA: {
    hero: {
      h1: ['3 КРОКИ', 'ДО ПОДАТКОВОЇ ДЕКЛАРАЦІЇ В АВСТРІЇ.'],
      supporting: 'НЕ ПОТРІБНО САМОМУ ЗАПОВНЮВАТИ ПОДАТКОВУ ДЕКЛАРАЦІЮ',
      step1: {
        title: ['Розкажи', 'про себе'],
        desc: ['Дай прості відповіді', 'про себе, свою сім’ю', 'та робочу', 'ситуацію.'],
      },
      step2: {
        title: ['Пройди анкету', 'QLIXA'],
        desc: ['QLIXA підлаштовує запитання', 'під твою ситуацію та за потреби', 'заглиблюється, щоб перевірити можливі', 'категорії списань і важливі деталі.'],
      },
      step3: {
        title: ['Отримай', 'декларацію'],
        desc: ['Після анкети побачиш', 'попередній розрахунок', 'можливого повернення та готову', 'податкову декларацію', 'з необхідними додатками.'],
      },
      flow: {
        item1: { title: 'QLIXA Кабінет', price: '€0', desc: 'безкоштовний кабінет' },
        item2: { title: 'Податкова анкета', price: '€0', desc: 'без оплати' },
        item3: { title: 'Попередній розрахунок', price: '€0', desc: 'можливий результат' },
        item4: { title: 'Готова декларація', price: '€24,90', desc: 'разово · без підписки' },
      },
      cta: 'Почати податкову декларацію безкоштовно →',
    },
  },
  EN: {
    hero: {
      h1: ['3 STEPS', 'TO YOUR TAX RETURN IN AUSTRIA.'],
      supporting: 'NO NEED TO FILL IN YOUR TAX RETURN YOURSELF',
      step1: {
        title: ['Tell us', 'about yourself'],
        desc: ['Answer simple questions', 'about yourself, your ', 'family and your work', 'situation.'],
      },
      step2: {
        title: ['Complete the', 'QLIXA questionnaire'],
        desc: ['QLIXA adapts the questions', 'to your situation and asks for more ', 'detail when needed to check ', 'possible deduction categories','and key information.'],
      },
      step3: {
        title: ['Get your', 'tax return'],
        desc: ['After the questionnaire, you’ll see', 'a preliminary estimate', 'of a possible refund and your', 'completed tax return with', ' the necessary additional forms.'],
      },
      flow: {
        item1: { title: 'QLIXA Account', price: '€0', desc: 'free account' },
        item2: { title: 'Tax questionnaire', price: '€0', desc: 'no payment' },
        item3: { title: 'Preliminary estimate', price: '€0', desc: 'possible result' },
        item4: { title: 'Completed tax return', price: '€24.90', desc: 'one-time · no subscription' },
      },
      cta: 'Start your tax return for free →',
    },
  },
  RU: {
    hero: {
      h1: ['3 ШАГА', 'К НАЛОГОВОЙ ДЕКЛАРАЦИИ В АВСТРИИ.'],
      supporting: 'НЕ НУЖНО САМОМУ ЗАПОЛНЯТЬ НАЛОГОВУЮ ДЕКЛАРАЦИЮ',
      step1: {
        title: ['Расскажи', 'о себе'],
        desc: ['Ответь на простые вопросы', 'о себе, семье', 'и своей рабочей', 'ситуации.'],
      },
      step2: {
        title: ['Пройди анкету', 'QLIXA'],
        desc: ['QLIXA подстраивает вопросы под', 'твою ситуацию и при необходимости', 'уточняет детали, чтобы проверить', 'возможные категории вычетов','и важную информацию.'],
      },
      step3: {
        title: ['Получи', 'декларацию'],
        desc: ['После анкеты ты увидишь', 'предварительный расчёт', 'возможного возврата и готовую', 'налоговую декларацию', 'с необходимыми приложениями.'],
      },
      flow: {
        item1: { title: 'QLIXA Кабинет', price: '€0', desc: 'бесплатный кабинет' },
        item2: { title: 'Налоговая анкета', price: '€0', desc: 'без оплаты' },
        item3: { title: 'Предварительный расчёт', price: '€0', desc: 'возможный результат' },
        item4: { title: 'Готовая декларация', price: '€24,90', desc: 'разово · без подписки' },
      },
      cta: 'Начать налоговую декларацию бесплатно →',
    },
  },
  DE: {
    hero: {
      h1: ['3 SCHRITTE', 'ZUR STEUERERKLÄRUNG IN ÖSTERREICH.'],
      supporting: 'DU MUSST DEINE STEUERERKLÄRUNG NICHT SELBST AUSFÜLLEN',
      step1: {
        title: ['Erzähl uns', 'von dir'],
        desc: ['Beantworte einfache Fragen', 'zu dir, deiner Familie', 'und deiner beruflichen', 'Situation.'],
      },
      step2: {
        title: ['Beantworte den', 'QLIXA-Fragebogen'],
        desc: ['QLIXA passt die Fragen', 'an deine Situation an und fragt bei Bedarf', 'genauer nach, um mögliche', 'Abzugskategorien und wichtige', 'Angaben zu prüfen.'],
      },
      step3: {
        title: ['Erhalte deine', 'Steuererklärung'],
        desc: ['Nach dem Fragebogen siehst du', 'eine vorläufige Berechnung', 'einer möglichen Rückerstattung und ', 'deine fertige Steuererklärung', 'mit den erforderlichen Zusatzformularen.'],
      },
      flow: {
        item1: { title: 'QLIXA-Bereich', price: '€0', desc: 'kostenloser Zugang' },
        item2: { title: 'Steuerfragebogen', price: '€0', desc: 'ohne Zahlung' },
        item3: { title: 'Vorläufige Berechnung', price: '€0', desc: 'mögliches Ergebnis' },
        item4: { title: 'Fertige Steuererklärung', price: '€24,90', desc: 'einmalig · kein Abo' },
      },
      cta: 'Steuererklärung kostenlos starten →',
    },
  },
}

// Переклади секції "Що таке QLIXA" — всі 4 мови
const QLIXA_TEXT: Record<string, {
  badge: string
  h2Prefix: string
  h2Emphasis: string
  subheading: string
  cards: [string, string][] // [title, desc] x8
  soonLabel: string
}> = {
  UA: {
    badge: 'Що таке QLIXA',
    h2Prefix: 'Це простий спосіб підготувати ',
    h2Emphasis: 'податкову декларацію в Австрії.',
    subheading: 'Ти відповідаєш на запитання — QLIXA аналізує твої відповіді, показує можливі категорії списань і допомагає підготувати декларацію.',
    cards: [
      ['Податкова декларація в Австрії', 'QLIXA перевіряє за твоїми відповідями можливі категорії списань та допомагає підготувати податкову декларацію.'],
      ['Відповідай на запитання замість заповнення складних форм.', 'QLIXA проводить тебе через зрозумілу анкету — без потреби самостійно розбиратися, що й куди вписувати.'],
      ['Без спеціальних податкових знань', 'Ти просто відповідаєш на запитання про свою ситуацію, а QLIXA підлаштовує анкету під твої відповіді.'],
      ['Не потрібно знати всі правила', 'QLIXA перетворює необхідні для декларації дані на зрозумілі запитання, а наступні питання залежать від твоїх відповідей.'],
      ['Перевірка можливих списань', 'На основі твоїх відповідей QLIXA перевіряє відповідні категорії, які можуть бути враховані в декларації.'],
      ['Попередній розрахунок до подання', 'Після завершення анкети QLIXA формує попередній розрахунок можливого повернення на основі введених даних.'],
      ['QLIXA Business', 'Окремий продукт для GmbH та бізнесу — у розробці.'],
      ['QLIXA підлаштовує анкету під твої відповіді', 'QLIXA підлаштовує наступні запитання під твої відповіді та ставить додаткові запитання, коли це потрібно.'],
    ],
    soonLabel: 'Скоро',
  },
  RU: {
    badge: 'Что такое QLIXA',
    h2Prefix: 'Это простой способ подготовить ',
    h2Emphasis: 'налоговую декларацию в Австрии.',
    subheading: 'Ты отвечаешь на вопросы — QLIXA анализирует твои ответы, показывает возможные категории списаний и помогает подготовить декларацию.',
    cards: [
      ['Налоговая декларация в Австрии', 'QLIXA проверяет по твоим ответам возможные категории списаний и помогает подготовить налоговую декларацию.'],
      ['Отвечай на вопросы вместо заполнения сложных форм.', 'QLIXA проводит тебя через понятную анкету — без необходимости самостоятельно разбираться, что и куда вписывать.'],
      ['Без специальных налоговых знаний', 'Ты просто отвечаешь на вопросы о своей ситуации, а QLIXA подстраивает анкету под твои ответы.'],
      ['Не нужно знать все правила', 'QLIXA превращает нужные для декларации данные в понятные вопросы, а следующие вопросы зависят от твоих ответов.'],
      ['Проверка возможных списаний', 'На основе твоих ответов QLIXA проверяет соответствующие категории, которые могут быть учтены в декларации.'],
      ['Предварительный расчёт до подачи', 'После завершения анкеты QLIXA формирует предварительный расчёт возможного возврата на основе введённых данных.'],
      ['QLIXA Business', 'Отдельный продукт для GmbH и бизнеса — в разработке.'],
      ['QLIXA подстраивает анкету под твои ответы', 'QLIXA подстраивает следующие вопросы под твои ответы и задаёт дополнительные вопросы, когда это нужно.'],
    ],
    soonLabel: 'Скоро',
  },
  EN: {
    badge: 'What is QLIXA',
    h2Prefix: "It's a simple way to prepare your ",
    h2Emphasis: 'tax return in Austria.',
    subheading: "You answer questions — QLIXA analyzes your answers, shows possible deduction categories, and helps you prepare your tax return.",
    cards: [
      ['Tax return in Austria', 'Based on your answers, QLIXA checks possible deduction categories and helps you prepare your tax return.'],
      ['Answer questions instead of filling out complicated forms.', 'QLIXA guides you through a clear questionnaire — no need to figure out on your own what goes where.'],
      ['No special tax knowledge needed', 'You simply answer questions about your situation, and QLIXA adapts the questionnaire to your answers.'],
      ["No need to know all the rules", 'QLIXA turns the data needed for your tax return into clear questions, and the next questions depend on your answers.'],
      ['Checking possible deductions', "Based on your answers, QLIXA checks the relevant categories that could be included in your tax return."],
      ['Preliminary estimate before filing', 'Once you finish the questionnaire, QLIXA generates a preliminary estimate of your possible refund based on the data you entered.'],
      ['QLIXA Business', 'A separate product for GmbHs and businesses — in development.'],
      ['QLIXA adapts the questionnaire to your answers', 'QLIXA adjusts the next questions based on your answers and asks additional questions when needed.'],
    ],
    soonLabel: 'Coming soon',
  },
  DE: {
    badge: 'Was ist QLIXA',
    h2Prefix: 'Das ist der einfache Weg, deine ',
    h2Emphasis: 'Steuererklärung in Österreich vorzubereiten.',
    subheading: 'Du beantwortest Fragen — QLIXA analysiert deine Antworten, zeigt mögliche Abzugskategorien und hilft dir, deine Erklärung vorzubereiten.',
    cards: [
      ['Steuererklärung in Österreich', 'QLIXA prüft anhand deiner Antworten mögliche Abzugskategorien und hilft dir, deine Steuererklärung vorzubereiten.'],
      ['Beantworte Fragen, statt komplizierte Formulare auszufüllen.', 'QLIXA führt dich durch einen klaren Fragebogen — du musst nicht selbst herausfinden, was wohin gehört.'],
      ['Kein steuerliches Fachwissen nötig', 'Du beantwortest einfach Fragen zu deiner Situation, und QLIXA passt den Fragebogen an deine Antworten an.'],
      ['Du musst nicht alle Regeln kennen', 'QLIXA verwandelt die für die Erklärung nötigen Daten in verständliche Fragen, und die nächsten Fragen hängen von deinen Antworten ab.'],
      ['Prüfung möglicher Abzüge', 'Basierend auf deinen Antworten prüft QLIXA die relevanten Kategorien, die in der Erklärung berücksichtigt werden könnten.'],
      ['Vorläufige Berechnung vor der Abgabe', 'Nach Abschluss des Fragebogens erstellt QLIXA eine vorläufige Berechnung deiner möglichen Rückerstattung basierend auf den eingegebenen Daten.'],
      ['QLIXA Business', 'Ein eigenes Produkt für GmbHs und Unternehmen — in Entwicklung.'],
      ['QLIXA passt den Fragebogen an deine Antworten an', 'QLIXA passt die nächsten Fragen an deine Antworten an und stellt bei Bedarf zusätzliche Fragen.'],
    ],
    soonLabel: 'Demnächst',
  },
}

// Переклади секції "Для кого" — всі 4 мови
const FORWHOM_TEXT: Record<string, {
  badge: string
  h2Prefix: string
  h2Emphasis: string
  cards: [string, string][] // [title, desc] x6
  soonLabel: string
}> = {
  UA: {
    badge: 'Для кого',
    h2Prefix: 'QLIXA підходить, ',
    h2Emphasis: 'якщо ти:',
    cards: [
      ['Найманий працівник', 'Працюєш за наймом? QLIXA допоможе перевірити можливі списання та підготувати декларацію на основі твоїх відповідей.'],
      ['Пенсіонер з доходом', 'Маєш пенсію та додатковий дохід? QLIXA допоможе врахувати потрібну інформацію під час підготовки декларації.'],
      ['Доходи від інвестицій або з-за кордону', 'Маєш доходи від інвестицій чи з іншої країни? QLIXA допоможе врахувати їх у твоїй податковій декларації.'],
      ['Доходи від оренди', 'Здаєш нерухомість або маєш кілька джерел доходу? QLIXA допоможе зібрати потрібну інформацію для декларації.'],
      ['Самозайнятий / Фрілансер', 'Працюєш як Neue Selbstständige, маєш Gewerbe або вільну професію? QLIXA допоможе врахувати доходи й витрати та підготувати декларацію.'],
      ['Поєднуєш роботу та власну справу', 'Маєш зарплату та дохід від власної справи? QLIXA допоможе зібрати потрібну інформацію для твоєї декларації.'],
    ],
    soonLabel: 'Скоро',
  },
  RU: {
    badge: 'Для кого',
    h2Prefix: 'QLIXA подходит, ',
    h2Emphasis: 'если ты:',
    cards: [
      ['Наёмный работник', 'Работаешь по найму? QLIXA поможет проверить возможные вычеты и подготовить налоговую декларацию на основе твоих ответов.'],
      ['Пенсионер с дополнительным доходом', 'Получаешь пенсию и дополнительный доход? QLIXA поможет учесть нужную информацию при подготовке налоговой декларации.'],
      ['Доходы от инвестиций или из-за границы', 'Есть доход от инвестиций или из другой страны? QLIXA поможет учесть его в налоговой декларации.'],
      ['Доход от аренды', 'Сдаёшь недвижимость или получаешь доход из нескольких источников? QLIXA поможет собрать нужную информацию для декларации.'],
      ['Самозанятый / Фрилансер', 'Работаешь как Neue Selbstständige, имеешь Gewerbe или свободную профессию? QLIXA поможет учесть доходы и расходы при подготовке декларации.'],
      ['Работа по найму + своё дело', 'Есть зарплата и доход от собственной деятельности? QLIXA поможет собрать нужную информацию для налоговой декларации.'],
    ],
    soonLabel: 'Скоро',
  },
  EN: {
    badge: 'For Whom',
    h2Prefix: 'QLIXA is right for you ',
    h2Emphasis: 'if you:',
    cards: [
      ['Employee', 'Working as an employee? QLIXA helps check possible deductions and prepare your tax return based on your answers.'],
      ['Pensioner with additional income', 'Receiving a pension and additional income? QLIXA helps include the relevant information when preparing your tax return.'],
      ['Investment or foreign income', 'Have income from investments or another country? QLIXA helps include it in your tax return.'],
      ['Rental income', 'Renting out property or receiving income from several sources? QLIXA helps collect the information needed for your tax return.'],
      ['Self-employed / Freelancer', 'Working as a Neue Selbstständige, under a Gewerbe or in a liberal profession? QLIXA helps include your income and expenses when preparing your tax return.'],
      ['Employment + own business', 'Have employment income and income from your own business? QLIXA helps collect the information needed for your tax return.'],
    ],
    soonLabel: 'Coming soon',
  },
  DE: {
    badge: 'Für wen',
    h2Prefix: 'QLIXA passt zu dir, ',
    h2Emphasis: 'wenn du:',
    cards: [
      ['Arbeitnehmer/in', 'Arbeitest du angestellt? QLIXA hilft dabei, mögliche Abzüge zu prüfen und deine Steuererklärung anhand deiner Antworten vorzubereiten.'],
      ['Pensionist/in mit Zusatzeinkommen', 'Beziehst du eine Pension und hast zusätzliches Einkommen? QLIXA hilft dabei, die relevanten Angaben für deine Steuererklärung zu erfassen.'],
      ['Kapital- oder Auslandseinkünfte', 'Hast du Einkünfte aus Investitionen oder aus dem Ausland? QLIXA hilft dabei, diese Angaben in deiner Steuererklärung zu berücksichtigen.'],
      ['Mieteinkünfte', 'Vermietest du eine Immobilie oder hast du Einkünfte aus mehreren Quellen? QLIXA hilft dabei, die benötigten Angaben für deine Steuererklärung zu erfassen.'],
      ['Selbstständig / Freelancer', 'Arbeitest du als Neue Selbstständige/r, mit Gewerbe oder in einem freien Beruf? QLIXA hilft dabei, Einnahmen und Ausgaben für deine Steuererklärung zu erfassen.'],
      ['Angestellt + eigenes Einkommen', 'Hast du Einkommen aus deiner Anstellung und aus einer eigenen Tätigkeit? QLIXA hilft dabei, die benötigten Angaben für deine Steuererklärung zu erfassen.'],
    ],
    soonLabel: 'Demnächst',
  },
}

// Переклади секції "Як це працює" — всі 4 мови
// Продуктова архітектура спрощена до 2 карток: QLIXA Tax Return (активний продукт
// для найманих, самозайнятих, фрілансерів, пенсіонерів тощо) і QLIXA Business
// (майбутній продукт для GmbH, "Скоро"). Немає більше окремих тарифів
// "Найманий працівник" / "Самозайнятий" / "Бізнес".
const DEMO_TEXT: Record<string, {
  badge: string
  h2Before: string
  h2Emphasis: string
  cards: { img: string; title: string; desc: string; cta: string; href: string; isSoon?: boolean }[] // x2
  soonLabel: string
}> = {
  UA: {
    badge: 'Як це працює',
    h2Before: 'Простий шлях до готової ',
    h2Emphasis: 'податкової декларації',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Відповідаєш на запитання — QLIXA аналізує твої відповіді, перевіряє можливі категорії списань, показує попередній розрахунок можливого повернення та допомагає підготувати декларацію.', cta: 'Можливості', href: '/tax-return' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'Окремий продукт для GmbH та бізнесу — зараз у розробці.', cta: 'Дізнатися першими', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Скоро',
  },
  RU: {
    badge: 'Как это работает',
    h2Before: 'Простой путь к готовой ',
    h2Emphasis: 'налоговой декларации',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Ты отвечаешь на вопросы — QLIXA анализирует твои ответы, проверяет возможные категории вычетов, показывает предварительный расчёт возможного возврата и помогает подготовить налоговую декларацию.', cta: 'Подробнее о QLIXA Tax Return', href: '/tax-return' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'Отдельный продукт для GmbH и бизнеса — сейчас в разработке.', cta: 'Узнать первыми', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Скоро',
  },
  EN: {
    badge: 'How it works',
    h2Before: 'A simple path to a ',
    h2Emphasis: 'completed tax return',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'You answer the questions — QLIXA analyzes your answers, checks possible deduction categories, shows a preliminary estimate of your possible refund and helps prepare your tax return.', cta: 'Features', href: '/tax-return' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'A separate product for GmbHs and businesses — currently in development.', cta: 'Be the first to know', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Coming soon',
  },
  DE: {
    badge: 'So funktioniert es',
    h2Before: 'Ein einfacher Weg zur fertigen ',
    h2Emphasis: 'Steuererklärung',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Du beantwortest die Fragen — QLIXA analysiert deine Antworten, prüft mögliche Abzugskategorien, zeigt eine vorläufige Berechnung einer möglichen Rückerstattung und hilft bei der Vorbereitung deiner Steuererklärung.', cta: 'Funktionen', href: '/tax-return' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'Ein separates Produkt für GmbHs und Unternehmen — derzeit in Entwicklung.', cta: 'Als Erste erfahren', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Demnächst',
  },
}

// Переклади секції "Чому ж ми створили QLIXA" — всі 4 мови
// Фірмові іконки блоку переваг (замість emoji) — порядок однаковий для всіх мов
const WHY_ICONS = [
  // 0 — пояснюємо людською мовою (мовна бульбашка)
  <svg key="why0" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 4h14v9H8l-3.5 3V13H3V4z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6.5 7.5h7M6.5 10h4" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 1 — наступний крок (стрілка вперед)
  <svg key="why1" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 10h12" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 5l5 5-5 5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // 2 — дедлайни (дзвіночок)
  <svg key="why2" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3c-2.2 0-4 1.8-4 4v3.2c0 .5-.2 1-.6 1.4L4 13h12l-1.4-1.4c-.4-.4-.6-.9-.6-1.4V7c0-2.2-1.8-4-4-4z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8.3 15.5a1.8 1.8 0 0 0 3.4 0" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 3 — все в одному місці (папка)
  <svg key="why3" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 5.5a1 1 0 0 1 1-1h4l1.5 2H16a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5.5z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>,
  // 4 — списання (євро в колі)
  <svg key="why4" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="#038390" strokeWidth="1.5"/>
    <path d="M12.2 7.2c-.5-.5-1.2-.8-2-.8-1.8 0-3.2 1.6-3.2 3.6s1.4 3.6 3.2 3.6c.8 0 1.5-.3 2-.8" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 9h4.5M6 11h4.5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 5 — під твою ситуацію (мішень)
  <svg key="why5" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#038390" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="4.3" stroke="#038390" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="1.2" fill="#038390"/>
  </svg>,
]

const WHYQLIXA_TEXT: Record<string, {
  badge: string
  h2Line1: string
  h2Line2Before: string
  h2Emphasis: string
  p: [string, string, string]
  linkText: string
  painBefore: string
  painEmphasis: string
  painCards: [string, string][] // x8
  solutionBefore: string
  solutionAfter: string
  solutionP: [string, string]
  quoteP2: [string, string, string]
}> = {
  UA: {
    badge: 'Чому з’явилася QLIXA',
    h2Line1: 'Створена з досвіду,',
    h2Line2Before: 'який ',
    h2Emphasis: 'знайомий багатьом',
    p: ['QLIXA з’явилася з власного досвіду життя в Австрії — коли податкові правила здаються складними, а заповнювати декларацію самостійно не так просто.', '', 'Саме тому QLIXA створена для людей, які хочуть самостійно підготувати свою податкову декларацію та пройти цей процес зрозумілим шляхом.'],
    linkText: 'Наша історія →',
    painBefore: 'Це ',
    painEmphasis: 'знайоме?',
    painCards: [
      ['Боїшся зробити помилку', 'Не тому що не вмієш. А тому що система здається дуже складною.'],
      ['Забагато незрозумілих слів', 'Хочеться, щоб усе пояснювали зрозумілою мовою — без зайвої складності.'],
      ['Немає часу розбиратися', 'Після роботи хочеться бути з родиною. Не сидіти вечорами над деклараціями.'],
      ['У кожного свої відповіді', 'Дохід, оренда, діти, робота чи інші обставини — тому наступні запитання QLIXA залежать від твоїх відповідей.'],
      ['Консультація коштує дорого', 'Не кожне питання потребує окремої консультації. Іноді хочеться спочатку розібратися самостійно.'],
      ['Хочеться, щоб пояснили моєю мовою', 'Зрозумілі запитання легше проходити мовою, якою тобі зручно користуватися.'],
      ['Не хочеться відкладати декларацію', 'Коли процес здається складним, його легко відкладати на потім.'],
      ['Хочеться знати, що можна врахувати', 'І не залишатися з питанням: «А раптом я щось пропустив?»'],
    ],
    solutionBefore: 'Саме тому з’явилася ',
    solutionAfter: '',
    solutionP: ['QLIXA перетворює складний процес підготовки декларації на зрозумілу послідовність запитань.', ''],
    quoteP2: ['Ти вводиш свої дані. QLIXA підлаштовує анкету під твої відповіді, формує попередній розрахунок можливого повернення та допомагає підготувати декларацію.', '', ''],
  },
  RU: {
    badge: 'Почему появилась QLIXA',
    h2Line1: 'Создана из опыта,',
    h2Line2Before: 'знакомого ',
    h2Emphasis: 'многим',
    p: ['QLIXA появилась из личного опыта жизни в Австрии — когда налоговые правила кажутся сложными, а самостоятельно подготовить декларацию не всегда просто.', '', 'Поэтому QLIXA создана для людей, которые хотят самостоятельно подготовить налоговую декларацию и пройти этот процесс понятным и последовательным путём.'],
    linkText: 'Наша история →',
    painBefore: '',
    painEmphasis: 'Знакомо?',
    painCards: [
      ['Боишься сделать ошибку', 'Не потому, что не умеешь. Просто система кажется очень сложной.'],
      ['Слишком много непонятных слов', 'Хочется, чтобы всё объясняли понятно — без лишней сложности.'],
      ['Нет времени разбираться', 'После работы хочется быть с семьёй, а не сидеть вечерами над налоговой декларацией.'],
      ['У каждого свои ответы', 'Доход, аренда, дети, работа или другие обстоятельства — поэтому следующие вопросы QLIXA зависят от твоих ответов.'],
      ['Индивидуальная консультация стоит дорого', 'Не каждый вопрос требует отдельной консультации. Иногда хочется сначала разобраться самостоятельно.'],
      ['Хочется понимать на своём языке', 'На понятные вопросы легче отвечать на языке, которым тебе удобно пользоваться.'],
      ['Не хочется откладывать декларацию', 'Когда процесс кажется сложным, его легко откладывать на потом.'],
      ['Хочется знать, что можно учесть', 'И не оставаться с вопросом: «А вдруг я что-то упустил?»'],
    ],
    solutionBefore: 'Поэтому появилась ',
    solutionAfter: '',
    solutionP: ['QLIXA превращает сложный процесс подготовки налоговой декларации в понятную последовательность вопросов.', ''],
    quoteP2: ['Ты вводишь свои данные. QLIXA подстраивает анкету под твои ответы, показывает предварительный расчёт возможного возврата и помогает подготовить налоговую декларацию.', '', ''],
  },
  EN: {
    badge: 'Why QLIXA exists',
    h2Line1: 'Created from an experience',
    h2Line2Before: 'many people ',
    h2Emphasis: 'know',
    p: ['QLIXA grew out of first-hand experience of living in Austria — where tax rules can feel complicated and preparing a tax return on your own is not always easy.', '', 'That is why QLIXA was created for people who want to prepare their own tax return and go through the process in a clear, structured way.'],
    linkText: 'Our story →',
    painBefore: 'Sound ',
    painEmphasis: 'familiar?',
    painCards: [
      ['Afraid of making a mistake', "Not because you can’t do it. The system can simply feel very complicated."],
      ['Too many unfamiliar terms', 'You want things explained clearly — without unnecessary complexity.'],
      ['No time to figure it all out', 'After work, you want time with your family — not evenings spent on tax returns.'],
      ['Everyone has different answers', 'Income, rent, children, work or other circumstances — so QLIXA’s next questions depend on your answers.'],
      ['Individual advice can be expensive', 'Not every question requires a separate consultation. Sometimes you want to understand things yourself first.'],
      ['You want it in your language', 'Clear questions are easier to work through in a language you feel comfortable using.'],
      ['You don’t want to keep putting it off', 'When a process feels complicated, it’s easy to leave it until later.'],
      ['You want to know what can be included', 'And not be left wondering: “What if I missed something?”'],
    ],
    solutionBefore: "That’s why ",
    solutionAfter: ' was created',
    solutionP: ['QLIXA turns the complex process of preparing a tax return into a clear sequence of questions.', ''],
    quoteP2: ['You enter your information. QLIXA adapts the questionnaire to your answers, provides a preliminary estimate of your possible refund and helps prepare your tax return.', '', ''],
  },
  DE: {
    badge: 'Warum es QLIXA gibt',
    h2Line1: 'Entstanden aus einer Erfahrung,',
    h2Line2Before: 'die viele ',
    h2Emphasis: 'kennen',
    p: ['QLIXA entstand aus eigener Erfahrung mit dem Leben in Österreich — wenn Steuerregeln kompliziert wirken und es nicht immer einfach ist, die Steuererklärung selbst vorzubereiten.', '', 'Deshalb wurde QLIXA für Menschen entwickelt, die ihre Steuererklärung selbst vorbereiten und den Prozess Schritt für Schritt nachvollziehen möchten.'],
    linkText: 'Die Geschichte →',
    painBefore: 'Kommt dir das ',
    painEmphasis: 'bekannt vor?',
    painCards: [
      ['Angst, einen Fehler zu machen', 'Nicht, weil du es nicht kannst. Das System kann einfach sehr kompliziert wirken.'],
      ['Zu viele unverständliche Begriffe', 'Du möchtest, dass alles verständlich erklärt wird — ohne unnötige Komplexität.'],
      ['Keine Zeit, alles selbst herauszufinden', 'Nach der Arbeit möchtest du Zeit mit deiner Familie verbringen — und nicht abends über der Steuererklärung sitzen.'],
      ['Jeder hat andere Antworten', 'Einkommen, Vermietung, Kinder, Arbeit oder andere Umstände — deshalb hängen die nächsten Fragen von QLIXA von deinen Antworten ab.'],
      ['Eine individuelle Beratung kann teuer sein', 'Nicht jede Frage erfordert eine eigene Beratung. Manchmal möchtest du dich zuerst selbst orientieren.'],
      ['Du möchtest es in deiner Sprache verstehen', 'Verständliche Fragen lassen sich leichter in einer Sprache beantworten, mit der du dich wohlfühlst.'],
      ['Du möchtest die Steuererklärung nicht aufschieben', 'Wenn ein Prozess kompliziert wirkt, schiebt man ihn leicht auf später.'],
      ['Du möchtest wissen, was berücksichtigt werden kann', 'Und nicht mit der Frage zurückbleiben: „Habe ich vielleicht etwas übersehen?“'],
    ],
    solutionBefore: 'Deshalb gibt es ',
    solutionAfter: '',
    solutionP: ['QLIXA macht aus dem komplexen Prozess der Steuererklärung eine verständliche Abfolge von Fragen.', ''],
    quoteP2: ['Du gibst deine Angaben ein. QLIXA passt den Fragebogen an deine Antworten an, zeigt eine vorläufige Berechnung einer möglichen Rückerstattung und hilft bei der Vorbereitung deiner Steuererklärung.', '', ''],
  },
}

// Переклади CTA-секції "Починай зараз" — всі 4 мови
const CTA_TEXT: Record<string, {
  badge: string
  h2: string
  pBefore: string
  pHighlight: string
  pAfter: string
  cta: string
  trust: string
}> = {
  UA: {
    badge: 'ГОТОВА ДЕКЛАРАЦІЯ — КРОК ЗА КРОКОМ',
    h2: 'Підготуй свою податкову декларацію з QLIXA',
    pBefore: 'Відповідай на запитання — QLIXA підлаштує анкету під твою ситуацію, покаже ',
    pHighlight: 'попередній розрахунок можливого повернення',
    pAfter: ' та допоможе підготувати декларацію до перевірки й подання.',
    cta: 'Почати підготовку →',
    trust: 'Без запису на прийом · Без комісії від суми повернення · Самостійне подання через FinanzOnline',
  },
  RU: {
    badge: 'НАЛОГОВАЯ ДЕКЛАРАЦИЯ — ШАГ ЗА ШАГОМ',
    h2: 'Подготовь свою налоговую декларацию с QLIXA',
    pBefore: 'Отвечай на вопросы — QLIXA подстроит анкету под твою ситуацию, покажет ',
    pHighlight: 'предварительный расчёт возможного возврата',
    pAfter: ' и поможет подготовить декларацию к проверке и подаче.',
    cta: 'Начать подготовку →',
    trust: 'Без записи на приём · Без комиссии от суммы возврата · Самостоятельная подача через FinanzOnline',
  },
  EN: {
    badge: 'YOUR TAX RETURN — STEP BY STEP',
    h2: 'Prepare your Austrian tax return with QLIXA',
    pBefore: 'Answer the questions — QLIXA adapts the questionnaire to your situation, shows a ',
    pHighlight: 'preliminary estimate of your possible refund',
    pAfter: ' and helps prepare your tax return for review and submission.',
    cta: 'Start preparing →',
    trust: 'No appointment · No commission on your refund · Submit it yourself via FinanzOnline',
  },
  DE: {
    badge: 'DEINE STEUERERKLÄRUNG — SCHRITT FÜR SCHRITT',
    h2: 'Bereite deine Steuererklärung mit QLIXA vor',
    pBefore: 'Beantworte die Fragen — QLIXA passt den Fragebogen an deine Situation an, zeigt eine ',
    pHighlight: 'vorläufige Berechnung einer möglichen Rückerstattung',
    pAfter: ' und hilft bei der Vorbereitung deiner Steuererklärung zur Prüfung und Einreichung.',
    cta: 'Vorbereitung starten →',
    trust: 'Kein Termin · Keine Provision auf deine Rückerstattung · Selbstständig über FinanzOnline einreichen',
  },
}

// Переклади секції "Часті запитання" — всі 4 мови
// Фірмові іконки FAQ (замість emoji) — порядок відповідає питанням, однаковий для всіх мов
const FAQ_ICONS = [
  // 0 — що таке QLIXA (документ з рядками — анкета/декларація)
  <svg key="faq0" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#038390" strokeWidth="1.5"/>
    <path d="M7 6h6M7 9h6M7 12h3" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 1 — найманий працівник (портфель)
  <svg key="faq1" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="7" width="16" height="10" rx="1.5" stroke="#038390" strokeWidth="1.5"/>
    <path d="M7 7V5.5C7 4.67 7.67 4 8.5 4h3c.83 0 1.5.67 1.5 1.5V7" stroke="#038390" strokeWidth="1.5"/>
    <path d="M2 11.5h16" stroke="#038390" strokeWidth="1.5"/>
  </svg>,
  // 2 — QLIXA vs Steuerberater / QLIXA не є консультантом (постать людини)
  <svg key="faq2" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3" stroke="#038390" strokeWidth="1.5"/>
    <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 3 — як працює анкета (стрілка — наступний крок)
  <svg key="faq3" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M3 10h12" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 5l5 5-5 5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // 4 — для кого підходить (мішень — під твою ситуацію)
  <svg key="faq4" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#038390" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="4.3" stroke="#038390" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="1.2" fill="#038390"/>
  </svg>,
  // 5 — не потрібні податкові знання (мовна бульбашка — прості запитання)
  <svg key="faq5" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M3 4h14v9H8l-3.5 3V13H3V4z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6.5 7.5h7M6.5 10h4" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 6 — попередній розрахунок (євро в колі)
  <svg key="faq6" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="#038390" strokeWidth="1.5"/>
    <path d="M12.2 7.2c-.5-.5-1.2-.8-2-.8-1.8 0-3.2 1.6-3.2 3.6s1.4 3.6 3.2 3.6c.8 0 1.5-.3 2-.8" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 9h4.5M6 11h4.5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 7 — подання декларації (галочка в колі)
  <svg key="faq7" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="#038390" strokeWidth="1.5"/>
    <path d="M6.5 10.2l2.3 2.3 4.7-5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  // 8 — QLIXA не є Steuerberater/бухгалтером (постать людини)
  <svg key="faq8" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3" stroke="#038390" strokeWidth="1.5"/>
    <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 9 — безпека даних (замок)
  <svg key="faq9" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="4.5" y="9" width="11" height="8" rx="1.5" stroke="#038390" strokeWidth="1.5"/>
    <path d="M7 9V6.5a3 3 0 0 1 6 0V9" stroke="#038390" strokeWidth="1.5"/>
    <circle cx="10" cy="13" r="1" fill="#038390"/>
  </svg>,
]

const FAQ_TEXT: Record<string, {
  badge: string
  h2Before: string
  h2Emphasis: string
  items: { q: string; a: string }[]
}> = {
  UA: {
    badge: 'Часті запитання',
    h2Before: 'Часті ',
    h2Emphasis: 'запитання',
    items: [
      { q: 'Що таке QLIXA?', a: 'QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації в Австрії. Замість самостійного заповнення податкових форм ти проходиш адаптивну анкету. QLIXA підлаштовує запитання під твої відповіді, допомагає зібрати потрібну інформацію та підготувати декларацію до перевірки й подання.' },
      { q: 'Навіщо мені подавати декларацію, якщо я працюю за наймом?', a: 'Роботодавець передає до податкової дані про твою зарплату, але може не мати інформації про всі твої особисті обставини та витрати, які можуть мати значення для податкової декларації. QLIXA допомагає пройти через можливі категорії крок за кроком і перевірити, яка інформація може стосуватися саме твоєї ситуації. Тому навіть для найманого працівника підготовка власної податкової декларації може мати сенс.' },
      { q: 'Навіщо мені QLIXA, якщо я можу звернутися до Steuerberater?', a: 'QLIXA не замінює Steuerberater. Це інструмент для тих, хто хоче самостійно підготувати свою податкову декларацію: пройти потрібні запитання, зібрати інформацію, перевірити можливі категорії списань та отримати підготовлену декларацію. Після цього ти вирішуєш сам: перевірити й подати декларацію через FinanzOnline або, якщо твоя ситуація потребує професійної оцінки, звернутися до Steuerberater.' },
      { q: 'QLIXA Tax Return — як це працює?', a: 'Ти заповнюєш анкету та відповідаєш на запитання про свою ситуацію. QLIXA підлаштовує наступні запитання залежно від твоїх відповідей і за потреби ставить додаткові. Після завершення ти отримуєш попередній розрахунок можливого повернення та податкову декларацію, підготовлену до перевірки й подання.' },
      { q: 'Для кого підходить QLIXA Tax Return?', a: 'QLIXA Tax Return створена не лише для найманих працівників. Анкета може враховувати різні ситуації: роботу за наймом, самозайнятість або Gewerbe, доходи від оренди, інвестицій чи з-за кордону, пенсію з додатковими доходами, а також поєднання кількох джерел доходу.' },
      { q: 'Чи потрібно мені розбиратися в австрійських податках?', a: 'Ні, спеціальні податкові знання не потрібні. Замість самостійного заповнення податкових форм ти відповідаєш на запитання про доходи, роботу, сімейну ситуацію, витрати та інші обставини. Наступні запитання залежать від твоїх відповідей.' },
      { q: 'Чи є попередній розрахунок точною сумою повернення?', a: 'Ні. Розрахунок є попереднім і формується на основі введених тобою даних. Фактичний результат визначається після подання та опрацювання декларації податковим органом.' },
      { q: 'QLIXA подає декларацію замість мене?', a: 'Ні. QLIXA допомагає підготувати податкову декларацію на основі введених тобою даних. Перед поданням ти перевіряєш результат і самостійно подаєш декларацію через FinanzOnline. А щоб це було простіше, QLIXA підготувала безкоштовну покрокову інструкцію з подання декларації через FinanzOnline — від входу в систему до відправлення декларації.' },
      { q: 'QLIXA — це податковий консультант чи бухгалтер?', a: 'Ні. QLIXA — автоматизований інструмент для самостійної підготовки податкової декларації. QLIXA не є Steuerberater, бухгалтером, юридичним або фінансовим консультантом і не надає індивідуальних податкових, юридичних чи фінансових консультацій. Якщо твоя ситуація потребує професійної оцінки, варто звернутися до відповідного фахівця.' },
      { q: 'Чи безпечно зберігати мої дані в QLIXA?', a: 'QLIXA обробляє персональні дані відповідно до вимог захисту даних. Детальна інформація про те, які дані обробляються, для яких цілей і як вони захищаються, доступна в Політиці конфіденційності.' },
    ],
  },
  RU: {
    badge: 'Часто задаваемые вопросы',
    h2Before: 'Часто задаваемые ',
    h2Emphasis: 'вопросы',
    items: [
      { q: 'Что такое QLIXA?', a: 'QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации в Австрии. Вместо самостоятельного заполнения налоговых форм ты проходишь адаптивную анкету. QLIXA подстраивает вопросы под твои ответы, помогает собрать нужную информацию и подготовить декларацию к проверке и подаче.' },
      { q: 'Зачем мне подавать декларацию, если я работаю по найму?', a: 'Работодатель передаёт в налоговую информацию о твоей зарплате, но может не знать обо всех личных обстоятельствах и расходах, которые могут иметь значение для твоей налоговой декларации. QLIXA помогает шаг за шагом пройти возможные категории и проверить, какая информация может относиться именно к твоей ситуации. Поэтому подготовка собственной налоговой декларации может иметь смысл и для наёмного работника.' },
      { q: 'Зачем мне QLIXA, если я могу обратиться к Steuerberater?', a: 'QLIXA не заменяет Steuerberater. Это инструмент для тех, кто хочет самостоятельно подготовить свою налоговую декларацию: пройти нужные вопросы, собрать информацию, проверить возможные категории списаний и получить подготовленную декларацию. После этого ты сам решаешь: проверить и подать декларацию через FinanzOnline или, если твоя ситуация требует профессиональной оценки, обратиться к Steuerberater.' },
      { q: 'Как работает QLIXA Tax Return?', a: 'Ты заполняешь анкету и отвечаешь на вопросы о своей ситуации. QLIXA подстраивает следующие вопросы в зависимости от твоих ответов и при необходимости задаёт дополнительные. После завершения ты получаешь предварительный расчёт возможного возврата и налоговую декларацию, подготовленную к проверке и подаче.' },
      { q: 'Для кого подходит QLIXA Tax Return?', a: 'QLIXA Tax Return создана не только для наёмных работников. Анкета может учитывать разные ситуации: работу по найму, самозанятость или Gewerbe, доход от аренды, инвестиций или из-за границы, пенсию с дополнительным доходом, а также сочетание нескольких источников дохода.' },
      { q: 'Нужно ли мне разбираться в австрийских налогах?', a: 'Специальные знания в области налогов не нужны. Вместо самостоятельного заполнения налоговых форм ты отвечаешь на вопросы о доходах, работе, семейной ситуации, расходах и других обстоятельствах. Следующие вопросы зависят от твоих ответов.' },
      { q: 'Предварительный расчёт — это точная сумма возврата?', a: 'Нет. Расчёт является предварительным и формируется на основе введённых тобой данных. Фактический результат определяется после подачи и обработки декларации налоговым органом.' },
      { q: 'QLIXA подаёт декларацию вместо меня?', a: 'Нет. QLIXA помогает подготовить налоговую декларацию на основе введённых тобой данных. Перед подачей ты проверяешь результат и самостоятельно подаёшь декларацию через FinanzOnline. Чтобы сделать этот процесс проще, QLIXA подготовила бесплатную пошаговую инструкцию по подаче декларации через FinanzOnline — от входа в систему до отправки декларации.' },
      { q: 'QLIXA — это налоговый консультант или бухгалтер?', a: 'Нет. QLIXA — автоматизированный инструмент для самостоятельной подготовки налоговой декларации. QLIXA не является Steuerberater, бухгалтером, юридическим или финансовым консультантом и не предоставляет индивидуальные налоговые, юридические или финансовые консультации. Если твоя ситуация требует профессиональной оценки, стоит обратиться к соответствующему специалисту.' },
      { q: 'Мои данные в безопасности?', a: 'QLIXA обрабатывает персональные данные в соответствии с требованиями по защите данных. Подробная информация о том, какие данные обрабатываются, для каких целей и как они защищаются, доступна в Политике конфиденциальности.' },
    ],
  },
  EN: {
    badge: 'Frequently Asked Questions',
    h2Before: 'Frequently Asked ',
    h2Emphasis: 'Questions',
    items: [
      { q: 'What is QLIXA?', a: 'QLIXA is an automated tool for preparing your Austrian tax return yourself. Instead of filling out tax forms on your own, you complete an adaptive questionnaire. QLIXA adjusts the questions based on your answers, helps you collect the relevant information and prepares the tax return for review and submission.' },
      { q: 'Why should I file a tax return if I am an employee?', a: "Your employer provides the tax authority with information about your salary, but may not have information about all of your personal circumstances and expenses that could be relevant to your tax return. QLIXA guides you through possible categories step by step and helps you check which information may be relevant to your situation. This means that preparing your own tax return can also be worthwhile for employees." },
      { q: 'Why do I need QLIXA if I can go to a tax adviser?', a: 'QLIXA does not replace a tax adviser. It is designed for people who want to prepare their tax return themselves: go through the relevant questions, collect the necessary information, check possible deduction categories and receive a prepared tax return. After that, you decide whether to review and submit it yourself through FinanzOnline or contact a tax adviser if your situation requires professional assessment.' },
      { q: 'How does QLIXA Tax Return work?', a: 'You complete the questionnaire and answer questions about your situation. QLIXA adjusts the next questions based on your answers and asks additional questions when needed. Once completed, you receive a preliminary estimate of your possible refund and a tax return prepared for review and submission.' },
      { q: 'Who is QLIXA Tax Return for?', a: 'QLIXA Tax Return is not only for employees. The questionnaire can cover different situations, including employment, self-employment or a Gewerbe, rental income, investment or foreign income, a pension with additional income, and combinations of several income sources.' },
      { q: 'Do I need to understand Austrian taxes?', a: 'No special tax knowledge is required. Instead of filling out tax forms yourself, you answer questions about your income, work, family situation, expenses and other circumstances. The next questions depend on your answers.' },
      { q: 'Is the preliminary estimate the exact amount I will receive?', a: 'No. The calculation is preliminary and is based on the information you enter. The actual result is determined after the tax return has been submitted and processed by the tax authority.' },
      { q: 'Does QLIXA submit my tax return for me?', a: 'No. QLIXA helps prepare your tax return based on the information you enter. Before submission, you review the result and submit the tax return yourself through FinanzOnline. To make this easier, QLIXA provides a free step-by-step guide to submitting your tax return through FinanzOnline — from signing in to sending the declaration.' },
      { q: 'Is QLIXA a tax adviser or accountant?', a: 'No. QLIXA is an automated tool for preparing your tax return yourself. QLIXA is not a tax adviser, accountant, legal adviser or financial adviser and does not provide individual tax, legal or financial advice. If your situation requires professional assessment, you should contact an appropriate professional.' },
      { q: 'Is my data safe with QLIXA?', a: 'QLIXA processes personal data in accordance with applicable data-protection requirements. Detailed information about what data is processed, for what purposes and how it is protected is available in the Privacy Policy.' },
    ],
  },
  DE: {
    badge: 'Häufig gestellte Fragen',
    h2Before: 'Häufig gestellte ',
    h2Emphasis: 'Fragen',
    items: [
      { q: 'Was ist QLIXA?', a: 'QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung deiner Steuererklärung in Österreich. Anstatt Steuerformulare selbst auszufüllen, durchläufst du einen adaptiven Fragebogen. QLIXA passt die Fragen an deine Antworten an, hilft dir dabei, die relevanten Informationen zusammenzustellen, und bereitet die Steuererklärung zur Prüfung und Einreichung vor.' },
      { q: 'Warum sollte ich eine Steuererklärung machen, wenn ich angestellt bin?', a: 'Dein Arbeitgeber übermittelt der Abgabenbehörde Informationen über dein Gehalt, kennt aber möglicherweise nicht alle persönlichen Umstände und Ausgaben, die für deine Steuererklärung relevant sein können. QLIXA führt dich Schritt für Schritt durch mögliche Kategorien und hilft dir zu prüfen, welche Informationen für deine Situation relevant sein könnten. Deshalb kann es auch für Arbeitnehmerinnen und Arbeitnehmer sinnvoll sein, eine eigene Steuererklärung vorzubereiten.' },
      { q: 'Warum brauche ich QLIXA, wenn ich zu einem Steuerberater gehen kann?', a: 'QLIXA ersetzt keinen Steuerberater. QLIXA ist für Menschen gedacht, die ihre Steuererklärung selbst vorbereiten möchten: relevante Fragen beantworten, benötigte Informationen zusammentragen, mögliche Abzugskategorien prüfen und eine vorbereitete Steuererklärung erhalten. Danach entscheidest du selbst, ob du die Erklärung prüfst und über FinanzOnline einreichst oder dich an einen Steuerberater wendest, wenn deine Situation eine professionelle Beurteilung erfordert.' },
      { q: 'Wie funktioniert QLIXA Tax Return?', a: 'Du füllst den Fragebogen aus und beantwortest Fragen zu deiner Situation. QLIXA passt die nächsten Fragen an deine Antworten an und stellt bei Bedarf zusätzliche Fragen. Nach Abschluss erhältst du eine vorläufige Berechnung einer möglichen Rückerstattung sowie eine Steuererklärung, die zur Prüfung und Einreichung vorbereitet ist.' },
      { q: 'Für wen ist QLIXA Tax Return geeignet?', a: 'QLIXA Tax Return ist nicht nur für Arbeitnehmerinnen und Arbeitnehmer gedacht. Der Fragebogen kann unterschiedliche Situationen berücksichtigen, darunter Anstellung, Selbstständigkeit oder Gewerbe, Mieteinkünfte, Kapital- oder Auslandseinkünfte, Pension mit zusätzlichen Einkünften sowie Kombinationen mehrerer Einkommensquellen.' },
      { q: 'Muss ich mich mit österreichischen Steuern auskennen?', a: 'Nein, besondere Steuerkenntnisse sind nicht erforderlich. Anstatt Steuerformulare selbst auszufüllen, beantwortest du Fragen zu Einkommen, Arbeit, Familiensituation, Ausgaben und weiteren Umständen. Die nächsten Fragen hängen von deinen Antworten ab.' },
      { q: 'Ist die vorläufige Berechnung genau der Betrag, den ich zurückbekomme?', a: 'Nein. Die Berechnung ist vorläufig und basiert auf den von dir eingegebenen Daten. Das tatsächliche Ergebnis wird nach Einreichung und Bearbeitung der Steuererklärung durch die Abgabenbehörde festgestellt.' },
      { q: 'Reicht QLIXA meine Steuererklärung für mich ein?', a: 'Nein. QLIXA hilft dabei, deine Steuererklärung anhand deiner eingegebenen Daten vorzubereiten. Vor der Einreichung prüfst du das Ergebnis und reichst die Steuererklärung selbst über FinanzOnline ein. Damit das einfacher wird, stellt QLIXA eine kostenlose Schritt-für-Schritt-Anleitung für die Einreichung über FinanzOnline bereit — von der Anmeldung bis zum Absenden der Steuererklärung.' },
      { q: 'Ist QLIXA ein Steuerberater oder Buchhalter?', a: 'Nein. QLIXA ist ein automatisiertes Tool zur selbstständigen Vorbereitung deiner Steuererklärung. QLIXA ist kein Steuerberater, Buchhalter, Rechtsberater oder Finanzberater und bietet keine individuelle Steuer-, Rechts- oder Finanzberatung. Wenn deine Situation eine professionelle Beurteilung erfordert, solltest du dich an eine entsprechende Fachperson wenden.' },
      { q: 'Sind meine Daten bei QLIXA sicher?', a: 'QLIXA verarbeitet personenbezogene Daten gemäß den geltenden Datenschutzanforderungen. Detaillierte Informationen darüber, welche Daten verarbeitet werden, zu welchen Zwecken und wie sie geschützt werden, findest du in der Datenschutzerklärung.' },
    ],
  },
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [lang, setLang] = useState('UA');

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang') || 'UA';
      setLang(l.toUpperCase());
    };
    updateLang();
    window.addEventListener('qlixa-lang-change', updateLang);
    return () => window.removeEventListener('qlixa-lang-change', updateLang);
  }, []);

  const t = HERO_TEXT[lang] || HERO_TEXT.UA;
  const t2 = QLIXA_TEXT[lang] || QLIXA_TEXT.UA;
  const t3 = FORWHOM_TEXT[lang] || FORWHOM_TEXT.UA;
  const t4 = DEMO_TEXT[lang] || DEMO_TEXT.UA;
  const t5 = WHYQLIXA_TEXT[lang] || WHYQLIXA_TEXT.UA;
  const at = ARTICLES_TEXT[lang] || ARTICLES_TEXT.UA;
  const published = at.published.map((item, i) => ({
    ...PUBLISHED_META[i],
    date: PUBLISHED_META[i].date[lang as 'UA' | 'RU' | 'EN' | 'DE'] || PUBLISHED_META[i].date.UA,
    readTime: PUBLISHED_META[i].readTime[lang as 'UA' | 'RU' | 'EN' | 'DE'] || PUBLISHED_META[i].readTime.UA,
    ...item,
  }));
  const upcoming = UPCOMING_HREFS.map((href, i) => ({
    href,
    tag: at.upcoming[i].tag,
    title: at.upcoming[i].title,
    desc: at.upcoming[i].desc,
  }));
  const t6 = CTA_TEXT[lang] || CTA_TEXT.UA;
  const t7 = FAQ_TEXT[lang] || FAQ_TEXT.UA;

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#F0F7F8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
        .faq-item { border-bottom:1px solid #f0f0f0; overflow:hidden }
        .faq-btn { width:100%; background:none; border:none; text-align:left; padding:24px 0; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-family:DM Sans,sans-serif; font-size:17px; font-weight:600; color:#1A1A1A; gap:16px }
        .faq-btn:hover { color:#038390 }
        @keyframes tickerMove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { display:flex; animation:tickerMove 60s linear infinite; width:max-content; will-change:transform; }
      `}</style>

      <Navbar />

      <div style={{ overflowX: 'hidden' }}>


      {/* ── HERO ── */}
      {/* Aspect-ratio 1200/648 (not 786) crops away the empty space that used
          to sit below the trust line — Hero now ends exactly where its content
          ends. Every element below is its OWN separate, labeled, absolutely-
          positioned div (not shared via .map()), so each can be nudged
          independently just by editing that one div's left/top. */}
      <section style={{ background: '#FFFFFF', padding: '0 clamp(20px,6vw,80px)', boxSizing: 'border-box' as const }}>
        {/* ▼▼▼ HERO_CROP_WRAPPER — this OUTER box controls Hero's visible
            height. Change ONLY this wrapper's aspect-ratio to trim empty
            space after the trust line — it crops (overflow:hidden), it does
            NOT rescale or distort anything, because the INNER box below
            keeps its ORIGINAL 1200/648 ratio untouched. ▼▼▼ */}
        <div style={{ maxWidth: 1200, margin: '0 auto', aspectRatio: '1200 / 566', position: 'relative' as const, overflow: 'hidden' }}>
        {/* ▼▼▼ HERO_CONTENT_CONTAINER — everything belonging to the Hero
            section lives inside this ONE div. Its aspect-ratio (1200/648)
            must stay EXACTLY as is — every child's top/left % below is
            calibrated against this number. ▼▼▼ */}
        <div style={{ position: 'absolute' as const, top: 0, left: 0, width: '100%', aspectRatio: '1200 / 648' }}>

          
          {/* HERO_LAPTOP_IMAGE — combined laptop+phone source image.
              MOVE: edit left / top / width / height on this element only. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/laptop_hero_only.png"
            alt=""
            style={{ position: 'absolute' as const, left: '51%', top: '35.766%', width: '70%', height: '51%', objectFit: 'contain' as const, objectPosition: 'left top' as const }}
          />

          {/* HERO_HEADLINE_LINE_1 — "3 КРОКИ" / "3 STEPS" etc.
              MOVE: edit left / top on this element only. */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '1.713%', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(20px,5.833vw,70px)', lineHeight: 1, color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.h1[0]}
          </div>
          {/* HERO_HEADLINE_LINE_2 — "ДО ПОДАТКОВОЇ ДЕКЛАРАЦІЇ В АВСТРІЇ." / "TO YOUR TAX RETURN IN AUSTRIA." etc.
              MOVE: edit left / top on this element only. */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '15.041%', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(12px,3.5vw,42px)', lineHeight: 1, color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.h1[1]}
          </div>

          {/* HERO_SUPPORTING_LINE — bullet + "НЕ ПОТРІБНО САМОМУ ЗАПОВНЮВАТИ
              ПОДАТКОВУ ДЕКЛАРАЦІЮ". Two elements (bullet + text) kept as a
              matched pair — move both together if you move one.
              MOVE: edit left / top on either element below. */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '27.293%', width: 'clamp(9px,1.3vw,15.6px)', height: 'clamp(9px,1.3vw,15.6px)', borderRadius: '50%', background: '#1F7489' }} />
          <div style={{ position: 'absolute' as const, left: '1.742%', top: '25.199%', fontFamily: 'Charter, Georgia, serif', fontWeight: 700, fontSize: 'clamp(9px,2vw,24px)', color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.supporting}
          </div>

          {/* =========================================================
              HERO_IMAGES_GROUP
              Contains ONLY the 3 low-poly illustrations — no titles, no
              descriptions, no step numbers (those live in
              HERO_STEPS_COPY_GROUP below).
              MOVE THE WHOLE GROUP: edit left / top / width / height on
              THIS wrapper. Every child's own left/top is a % of THIS
              wrapper (wrapper starts at 0/0/100%/100%, i.e. the same
              coordinate space as the rest of the Hero, so moving it by
              e.g. left:'3%' shifts all 3 images together by 3% of the
              Hero's width).
              MOVE ONE IMAGE ONLY: edit that image's own left/top/width/height.
              ========================================================= */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '-2%', width: '100%', height: '100%' }}>
            {/* HERO_IMAGE_1 — "about you" illustration */}
            <div style={{ position: 'absolute' as const, left: '5.5%', top: '33.3%', width: 'clamp(38px,6.5vw,80px)', height: 'clamp(38px,6.5vw,80px)', transform: 'translateX(-50%)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/how-it-works-about.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' as const }} />
            </div>

            {/* HERO_IMAGE_2 — "questionnaire" illustration */}
            <div style={{ position: 'absolute' as const, left: '26.14%', top: '33.3%', width: 'clamp(38px,6.5vw,80px)', height: 'clamp(38px,6.5vw,80px)', transform: 'translateX(-50%)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/how-it-works-questionnaire.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' as const }} />
            </div>

            {/* HERO_IMAGE_3 — "tax return" illustration */}
            <div style={{ position: 'absolute' as const, left: '44.98%', top: '33.3%', width: 'clamp(38px,6.5vw,80px)', height: 'clamp(38px,6.5vw,80px)', transform: 'translateX(-50%)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/illustrations/how-it-works-tax-return.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' as const }} />
            </div>
          </div>
          {/* ▲▲▲ END HERO_IMAGES_GROUP ▲▲▲ */}

          {/* HERO_DOTTED_CONNECTOR — the dashed line between step 1/2 and
              step 3. Independent from HERO_IMAGES_GROUP and
              HERO_STEPS_COPY_GROUP on purpose.
              MOVE THIS INDEPENDENTLY: edit only left / top / width here. */}
          <div style={{ position: 'absolute' as const, left: '8.575%', top: '39.9%', width: '33.258%', height: 0, borderTop: '2px dashed #BFDFDF' }} />

          {/* =========================================================
              HERO_STEPS_COPY_GROUP
              Contains ONLY: the 3 step numbers, the 3 step titles and the
              3 step descriptions. No images here (see HERO_IMAGES_GROUP).
              MOVE THE WHOLE GROUP: edit left / top / width / height on
              THIS wrapper (same 0/0/100%/100% coordinate-space pattern as
              HERO_IMAGES_GROUP — see that comment for how it works).
              MOVE ONE NUMBER / TITLE / DESCRIPTION ONLY: edit that one
              child's own left/top/width below.
              ========================================================= */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '-6%', width: '100%', height: '100%' }}>

            {/* HERO_STEP1_NUMBER — "1" */}
            <div style={{ position: 'absolute' as const, left: '5.5%', top: '49%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              1
            </div>
            {/* HERO_STEP2_NUMBER — "2" */}
            <div style={{ position: 'absolute' as const, left: '26.14%', top: '49%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              2
            </div>
            {/* HERO_STEP3_NUMBER — "3" */}
            <div style={{ position: 'absolute' as const, left: '44.98%', top: '49%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              3
            </div>

            {/* HERO_STEP1_TITLE — "Розкажи / про себе" */}
            <div style={{ position: 'absolute' as const, left: '0%', top: '52.5%', width: '10.84%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
              {t.hero.step1.title.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            {/* HERO_STEP1_DESCRIPTION */}
            <div style={{ position: 'absolute' as const, left: '0%', top: '60%', width: '10.84%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
              {t.hero.step1.desc.map((line, i) => <div key={i}>{line}</div>)}
            </div>

            {/* HERO_STEP2_TITLE — "Пройди анкету / QLIXA" */}
            <div style={{ position: 'absolute' as const, left: '13.5%', top: '52.5%', width: '25.39%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
              {t.hero.step2.title.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            {/* HERO_STEP2_DESCRIPTION */}
            <div style={{ position: 'absolute' as const, left: '13.23%', top: '60%', width: '25.39%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
              {t.hero.step2.desc.map((line, i) => <div key={i}>{line}</div>)}
            </div>

            {/* HERO_STEP3_TITLE — "Отримай / декларацію" */}
            <div style={{ position: 'absolute' as const, left: '37.5%', top: '52.5%', width: '14.84%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
              {t.hero.step3.title.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            {/* HERO_STEP3_DESCRIPTION */}
            <div style={{ position: 'absolute' as const, left: '35.5%', top: '60%', width: '18.84%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
              {t.hero.step3.desc.map((line, i) => <div key={i}>{line}</div>)}
            </div>

          </div>
          {/* ▲▲▲ END HERO_STEPS_COPY_GROUP ▲▲▲ */}

          {/* =========================================================
              HERO_FREE_FLOW_GROUP
              The pale-teal horizontal free→paid strip. Independent from
              HERO_STEPS_COPY_GROUP. No badge above this strip (removed
              per instruction — "МОЖНА СПРОБУВАТИ БЕЗКОШТОВНО" is gone,
              no HERO_FREE_BADGE wrapper exists).
              Now active for ALL 4 locales, using the exact approved UA
              geometry — only the text (t.hero.flow.itemN) varies by locale.
              Each of the 4 items below is its OWN absolutely-positioned
              child (HERO_FREE_FLOW_ITEM_1..4), written explicitly — NOT
              generated via .map() — so each can be repositioned on its own.
              MOVE THE WHOLE STRIP: edit left / top / width / height on
              THIS wrapper.
              MOVE ONE ITEM ONLY: edit that item's own left/top/width below.
              ========================================================= */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '69%', width: '55%', height: 'clamp(30px,4.5vw,36px)' }}>

            {/* background pill — purely visual, spans the whole strip */}
            <div style={{ position: 'absolute' as const, left: 0, top: 0, width: '100%', height: '100%', background: 'rgba(3,131,144,0.05)', border: '1px solid rgba(3,131,144,0.14)', borderRadius: 18, boxSizing: 'border-box' as const }} />

            {/* subtle separators between the 4 columns */}
            <div style={{ position: 'absolute' as const, left: '25%', top: '15%', width: 1, height: '70%', background: 'rgba(3,131,144,0.15)' }} />
            <div style={{ position: 'absolute' as const, left: '50%', top: '15%', width: 1, height: '70%', background: 'rgba(3,131,144,0.15)' }} />
            <div style={{ position: 'absolute' as const, left: '75%', top: '15%', width: 1, height: '70%', background: 'rgba(3,131,144,0.15)' }} />

            {/* HERO_FREE_FLOW_ITEM_1 — QLIXA account/cabinet → €0 */}
            <div style={{ position: 'absolute' as const, left: '0%', top: '0%', width: '25%', textAlign: 'center' as const }}>
              <div style={{ fontSize: 'clamp(5.5px,0.62vw,7px)', fontWeight: 700, color: '#595959', textTransform: 'uppercase' as const, letterSpacing: '0.2px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item1.title}</div>
              <div style={{ fontSize: 'clamp(9px,1.1vw,13px)', fontWeight: 800, color: '#038390', lineHeight: 1.1 }}>{t.hero.flow.item1.price}</div>
              <div style={{ fontSize: 'clamp(5px,0.58vw,6.5px)', color: '#9D9D9D', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item1.desc}</div>
            </div>

            {/* HERO_FREE_FLOW_ITEM_2 — tax questionnaire → €0 */}
            <div style={{ position: 'absolute' as const, left: '25%', top: '0%', width: '25%', textAlign: 'center' as const }}>
              <div style={{ fontSize: 'clamp(5.5px,0.62vw,7px)', fontWeight: 700, color: '#595959', textTransform: 'uppercase' as const, letterSpacing: '0.2px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item2.title}</div>
              <div style={{ fontSize: 'clamp(9px,1.1vw,13px)', fontWeight: 800, color: '#038390', lineHeight: 1.1 }}>{t.hero.flow.item2.price}</div>
              <div style={{ fontSize: 'clamp(5px,0.58vw,6.5px)', color: '#9D9D9D', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item2.desc}</div>
            </div>

            {/* HERO_FREE_FLOW_ITEM_3 — preliminary calculation → €0 */}
            <div style={{ position: 'absolute' as const, left: '50%', top: '0%', width: '25%', textAlign: 'center' as const }}>
              <div style={{ fontSize: 'clamp(5.5px,0.62vw,7px)', fontWeight: 700, color: '#595959', textTransform: 'uppercase' as const, letterSpacing: '0.2px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item3.title}</div>
              <div style={{ fontSize: 'clamp(9px,1.1vw,13px)', fontWeight: 800, color: '#038390', lineHeight: 1.1 }}>{t.hero.flow.item3.price}</div>
              <div style={{ fontSize: 'clamp(5px,0.58vw,6.5px)', color: '#9D9D9D', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item3.desc}</div>
            </div>

            {/* HERO_FREE_FLOW_ITEM_4 — completed tax declaration → €24.90 */}
            <div style={{ position: 'absolute' as const, left: '75%', top: '0%', width: '25%', textAlign: 'center' as const }}>
              <div style={{ fontSize: 'clamp(5.5px,0.62vw,7px)', fontWeight: 700, color: '#595959', textTransform: 'uppercase' as const, letterSpacing: '0.2px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item4.title}</div>
              <div style={{ fontSize: 'clamp(9px,1.1vw,13px)', fontWeight: 800, color: '#038390', lineHeight: 1.1 }}>{t.hero.flow.item4.price}</div>
              <div style={{ fontSize: 'clamp(5px,0.58vw,6.5px)', color: '#9D9D9D', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.hero.flow.item4.desc}</div>
            </div>

          </div>
          {/* ▲▲▲ END HERO_FREE_FLOW_GROUP ▲▲▲ */}

          {/* =========================================================
              HERO_CTA
              Independent from HERO_FREE_FLOW_GROUP — its own left/top/width.
              Now identical geometry/styling in all 4 locales (the approved
              UA button/coordinates) — only the text (t.hero.cta) and the
              route are shared: every locale links straight to /tax-return.
              MOVE THIS INDEPENDENTLY: edit only left / top / width / height here.
              ========================================================= */}
          <Link
            href="/tax-return"
            style={{
              position: 'absolute' as const, left: '5%', top: '77%', width: '42%', height: 'clamp(34px,3.6vw,38px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' as const,
              backgroundImage: 'url(/hero/hero_button.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' as const,
              fontFamily: 'Arial, sans-serif', fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#fff', textDecoration: 'none',
            }}
          >
            {t.hero.cta}
          </Link>

        </div>
        {/* ▲▲▲ END HERO_CONTENT_CONTAINER ▲▲▲ */}
        </div>
        {/* ▲▲▲ END HERO_CROP_WRAPPER ▲▲▲ */}
      </section>
      {/* ── END HERO2 ── */}

      {/* ── TICKER — premium minimal, icon + text, 4 languages ── */}
      <div className="ticker-wrap" style={{ background: '#FFFFFF', padding: '12px 0', overflow: 'hidden', position: 'relative', borderTop: '1px solid #E6F4F5', borderBottom: '1px solid #E6F4F5' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'linear-gradient(to right, #FFFFFF, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 80, background: 'linear-gradient(to left, #FFFFFF, transparent)', zIndex: 2 }} />
        <div className="ticker-track">
          {[...Array(2)].flatMap(() =>
            TICKER_ITEMS[lang] || TICKER_ITEMS.UA
          ).map((item, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginRight: 64, whiteSpace: 'nowrap' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/ticker-icons/${item.icon}`} alt="" style={{ width: 30, height: 30, objectFit: 'contain', display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500, color: '#1F2328' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ── ЩО ТАКЕ QLIXA ── */}
      <section style={{ background: '#ffffff', padding: '40px clamp(20px,6vw,80px) 38px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.08)', border: '1px solid rgba(3,131,144,0.2)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: 16 }}>{t2.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 12 }}>
              {t2.h2Prefix}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t2.h2Emphasis}</em>
            </h2>
            <p style={{ fontSize: 15, color: '#595959', margin: '0 auto', lineHeight: 1.7, textAlign: 'center' }}>
              {t2.subheading}
            </p>
          </div>

          {/* 3×3 grid with QLIXA center */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>

            {/* Card 1 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/tax-return.png" alt="Повернення податку" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[0][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[0][1]}</div>
            </div>

            {/* Card 2 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/interface.png" alt="Інтерфейс" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[1][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[1][1]}</div>
            </div>

            {/* Card 3 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/not-for-accountants.png" alt="Не для бухгалтерів" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[2][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[2][1]}</div>
            </div>

            {/* Card 4 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/laws.png" alt="Закони" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[3][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[3][1]}</div>
            </div>

            {/* CENTER — hero mockup image */}
            <div style={{ background: '#FFFFFF', borderRadius: 24, padding: '8px 12px', boxShadow: '4px 4px 0 #1A1A1A', border: '1.5px solid #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 6, position: 'relative', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/platform/hero-mockup.png" alt="QLIXA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* Card 5 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/no-deductions-missed.png" alt="Жодного списання" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[4][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[4][1]}</div>
            </div>

            {/* Card 6 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/no-deadlines-missed.png" alt="Жодного дедлайну" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[5][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[5][1]}</div>
            </div>

            {/* Card 7 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', position: 'relative' as const }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <span style={{
                position: 'absolute' as const, top: 14, right: 14,
                fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642',
                padding: '3px 9px', borderRadius: 999, zIndex: 1,
              }}>
                {t2.soonLabel}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/business.png" alt="Бізнес-помічник" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3, paddingRight: 60 }}>{t2.cards[6][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[6][1]}</div>
            </div>

            {/* Card 8 */}
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/languages.png" alt="Мови" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[7][0]}</div>
              </div>
              <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t2.cards[7][1]}</div>
            </div>

          </div>
        </div>
      </section>


      {/* ── ДЛЯ КОГО ── */}
      <section id="для-кого" style={{ background: '#FFFFFF', padding: '38px clamp(20px,6vw,80px) 38px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>{t3.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 12 }}>
              {t3.h2Prefix}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t3.h2Emphasis}</em>
            </h2>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>

            {[
              { img: '/for-who/naymanyy.png', href: '/for/naymanyy' },
              { img: '/for-who/pensioner.png', href: '/for/pensioner' },
              { img: '/for-who/samostiynyy.png', href: '/for/samostiynyy' },
              { img: '/for-who/nerukhomist.png', href: '/for/nerukhomist' },
              { img: '/for-who/frilanser.png', href: '/for/frilanser', isSoon: false },
              { img: '/for-who/biznes.png', href: '/for/biznes', isSoon: false },
            ].map((card, i) => (
              <Link key={i} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%', position: 'relative' as const }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
                  {card.isSoon && (
                    <span style={{
                      position: 'absolute' as const, top: 14, right: 14,
                      fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642',
                      padding: '3px 9px', borderRadius: 999, zIndex: 1,
                    }}>
                      {t3.soonLabel}
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.img} alt={t3.cards[i][0]} style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3, paddingRight: card.isSoon ? 60 : 0 }}>{t3.cards[i][0]}</div>
                  </div>
                  <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t3.cards[i][1]}</div>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* ── DEMO ── */}
      <section id="demo" style={{ background: '#ffffff', padding: '28px clamp(20px,6vw,80px) 28px', scrollMarginTop: 80 }}>
        <div id="how-it-works" style={{ maxWidth: 1100, margin: '0 auto', scrollMarginTop: 80 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.15)', border: '1px solid rgba(3,131,144,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>{t4.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 0 }}>
              {t4.h2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t4.h2Emphasis}</em>
            </h2>
          </div>

          {/* 2 cards, alternating image/text sides:
              card 1 (QLIXA Tax Return) = image left / text right,
              card 2 (QLIXA Business)   = text left / image right.
              Reuses the same card look (bg/radius/border) and the same
              image (next/image fill + padding) and CTA patterns as before —
              only the grid-of-3 became a stack of 2 wide row cards. */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {t4.cards.map((card) => (
              <div key={card.title} style={{
                background: '#F0F7F8', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.15)',
                display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' as const,
              }}>
                {/* Image */}
                <div style={{ flex: '0 0 32%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box' as const }}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={0}
                    height={0}
                    sizes="(max-width: 900px) 90vw, 340px"
                    style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: 150, objectFit: 'contain', display: 'block' }}
                  />
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0, padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {card.isSoon ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.3px', margin: 0 }}>
                        {card.title}
                      </h3>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: '#026B76', background: '#F5E642', padding: '3px 9px', borderRadius: 999, flexShrink: 0 }}>
                        {t4.soonLabel}
                      </span>
                    </div>
                  ) : (
                    <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.3px', margin: 0 }}>
                      {card.title}
                    </h3>
                  )}
                  <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, margin: 0 }}>
                    {card.desc}
                  </p>
                  {card.isSoon ? (
                    <NotifyMeButton
                      label={`${card.cta} →`}
                      source={`homepage-demo-${card.title}`}
                      triggerStyle={{
                        background: 'transparent', padding: 0, borderRadius: 0,
                        fontSize: 15, fontWeight: 700, color: '#038390', width: 'fit-content',
                      }}
                    />
                  ) : (
                    <a href={card.href} style={{ fontSize: 15, fontWeight: 700, color: '#038390', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {card.cta} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ── WHY QLIXA — redesigned ── */}
      <section style={{ background: '#ffffff', padding: '26px clamp(20px,6vw,80px) 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* BLOCK 1 — Story header. Centered badge + headline (same badge/heading
              system as the "Як це працює" section below), then one wide card
              (same bg/radius/border language as the QLIXA Tax Return / QLIXA
              Business cards) with body text + CTA on the left and the founders
              illustration on the right. */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.15)', border: '1px solid rgba(3,131,144,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 16 }}>{t5.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 0 }}>
              {t5.h2Line1} {t5.h2Line2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t5.h2Emphasis}</em>
            </h2>
          </div>

          <div style={{
            background: '#F0F7F8', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.15)',
            display: 'flex', flexDirection: 'row' as const, alignItems: 'center', marginBottom: 40,
          }}>
            {/* Text — left */}
            <div style={{ flex: '1 1 54%', minWidth: 0, padding: '40px 24px 40px 48px', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, margin: 0 }}>{t5.p[0]}</p>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, margin: 0 }}>{t5.p[2]}</p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: '#038390', textDecoration: 'none', width: 'fit-content' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}>
                {t5.linkText}
              </Link>
            </div>
            {/* Founders illustration — right */}
            <div style={{ flex: '0 0 46%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 48px 32px 20px', boxSizing: 'border-box' as const }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/why-qlixa/founders.png" alt="Засновники QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* BLOCK 2 — Pain cards */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 0 }}>
              {t5.painBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t5.painEmphasis}</em>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              '/why-qlixa/fear-mistake.png',
              '/why-qlixa/complex-words.png',
              '/why-qlixa/no-time.png',
              '/why-qlixa/unique-situation.png',
              '/why-qlixa/expensive.png',
              '/why-qlixa/my-language.png',
              '/why-qlixa/deadline.png',
              '/why-qlixa/return-all.png',
            ].map((img, i) => ({ img, title: t5.painCards[i][0], desc: t5.painCards[i][1] })).map((card, i) => (
              <div key={i}
                style={{ background: '#F0F7F8', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.10)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default', display: 'flex', flexDirection: 'row' as const, alignItems: 'center', padding: 20, gap: 20 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 12px 32px rgba(3,131,144,0.12)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform=''; el.style.boxShadow=''; }}>
                <div style={{ flex: '0 0 96px', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 6, lineHeight: 1.3 }}>{card.title}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#404040', lineHeight: 1.6 }}>{card.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* BLOCK 3 — QLIXA solution. Same card system as the "Чому з'явилася
              QLIXA" card above (bg/radius/border), laptop illustration on the
              LEFT, heading + the two explanatory sentences on the RIGHT. */}
          <div style={{
            background: '#F0F7F8', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.15)',
            display: 'flex', flexDirection: 'row' as const, alignItems: 'center',
          }}>
            {/* Laptop illustration — left */}
            <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 20px 32px 48px', boxSizing: 'border-box' as const }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/why-qlixa/laptop.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
            {/* Heading + text — right */}
            <div style={{ flex: '1 1 58%', minWidth: 0, padding: '40px 48px 40px 24px', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.3px', margin: 0 }}>
                {t5.solutionBefore}<span style={{ color: '#038390', fontWeight: 700 }}>QLIXA</span>{t5.solutionAfter}
              </h3>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, margin: 0 }}>{t5.solutionP[0]}</p>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, margin: 0 }}>{t5.quoteP2[0]}</p>
            </div>
          </div>
        </div>
            </section>


      {/* ── CTA — compact final conversion section. Headline has no extra
          max-width wrapper (uses the section's full padded width, same as
          every other element here) and uses a fluid clamp() tuned to the
          site's existing section-heading ratio (~3.4vw → 4vw here, since
          this headline is a few characters shorter than the "Як це працює" /
          "Створена з досвіду" headlines that already use 3.4vw comfortably)
          so the ~43-44 char sentence in every locale reads as one large line
          at normal desktop/laptop widths, scales down smoothly as the
          viewport narrows, and is free to wrap on tablet/mobile — no JS
          shrink-to-fit, no fixed px override. */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '56px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>{t6.badge}</div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,4vw,54px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: '0 0 16px 0', letterSpacing: '-1px' }}>
          {t6.h2}
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 24px' }}>
          {t6.pBefore}<span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 3, padding: '1px 4px', fontWeight: 700 }}>{t6.pHighlight}</span>{t6.pAfter}
        </p>
        <div style={{ marginBottom: 16 }}>
          <Link href="/pricing" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 600, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block' }}>
            {t6.cta}
          </Link>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
          {t6.trust}
        </div>
      </section>

      {/* ARTICLES */}
      <ArticlesSlider published={published} upcoming={upcoming} lang={lang} />

      {/* ── FAQ — after CTA ── */}
      <section id="faq" style={{ padding: '32px clamp(20px,6vw,80px)', background: '#F0F7F8' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>{t7.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: '#1A1A1A', margin: 0, letterSpacing: '-0.5px' }}>
              {t7.h2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t7.h2Emphasis}</em>
            </h2>
          </div>
          {t7.items.map((item, i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(3,131,144,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {FAQ_ICONS[i]}
                  </span>
                  {item.q}
                </span>
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
    </div>
  )
}
