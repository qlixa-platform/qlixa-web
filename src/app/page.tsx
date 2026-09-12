'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import FitHeadline from '@/components/FitHeadline'
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

// Слайдшоу на екрані ноутбука в Hero — окрема папка іконок під кожну мову
const HERO_ICON_FOLDERS: Record<string, string> = {
  UA: 'hero-icons-animation',
  DE: 'hero-icons-animation-de',
  EN: 'hero-icons-animation-en',
  RU: 'hero-icons-animation-ru',
}
const HERO_ICON_FILES = [
  'CLIENTS.png',
  'DEADLINES.png',
  'FINANZONLINE.png',
  'INVOICES.png',
  'KPI.png',
  'TAX%20REFUND.png',
]
function getHeroScreenSlides(lang: string) {
  const folder = HERO_ICON_FOLDERS[lang] || HERO_ICON_FOLDERS.UA
  return HERO_ICON_FILES.map(f => `/${folder}/${f}`)
}
const HERO_SLIDE_DURATION = 2 // секунд на одну картинку

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

// Переклади Hero-секції — поки що тільки UA, RU/EN/DE додамо після затвердження верстки
type HeroCard = {
  eyebrow: string
  title: string
  desc: string
  checklist: string[]
  cta: string
  href: string
  isSoon?: boolean
}
type HeroCopy = {
  h1: [string, string]
  supporting: string
  step1: { title: string[]; desc: string[] }
  step2: { title: string[]; desc: string[] }
  step3: { title: string[]; desc: string[] }
  cta: string
}
const HERO_TEXT: Record<string, {
  badge: string
  cards: [HeroCard, HeroCard]
  trust: string
  soonLabel: string
  hero: HeroCopy
}> = {
  UA: {
    badge: 'Твій автоматизований бізнес-помічник в Австрії',
    cards: [
      {
        eyebrow: 'Найманий?',
        title: 'Допоможе повернути переплачений податок',
        desc: 'Анкета QLIXA врахує роботу, сім’ю, доходи, списання',
        checklist: ['Ти відповідаєш на прості запитання', 'Анкета підлаштовується під твою ситуацію', 'QLIXA розраховує можливе повернення', 'Ти отримуєш готовий документ для FinanzOnline'],
        cta: 'Перевірити моє податкове повернення →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Бізнес?',
        title: 'Допоможе вести фінанси самостійно',
        desc: 'З кабінетом QLIXA — просто вести бізнес та бути готовим до звітності',
        checklist: ['Додаєш клієнтів, доходи, витрати, склад…', 'QLIXA автоматично їх структурує', 'Бачиш головні показники та зміни', 'Отримуєш готові звіти'],
        cta: 'Переглянути кабінет →',
        href: '/for/biznes',
        isSoon: true,
      },
    ],
    trust: 'Розроблено спеціально для 🇦🇹 Австрії · доступно 4 мовами · для підготовки податкової декларації',
    soonLabel: 'Скоро',
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
        desc: ['Отримай попередній розрахунок', 'можливого повернення та', 'повністю заповнену декларацію,', 'підготовлену до перевірки й', 'подання через FinanzOnline.'],
      },
      cta: 'Розрахувати можливе повернення →',
    },
  },
  EN: {
    badge: 'Your automated business assistant in Austria',
    cards: [
      {
        eyebrow: 'Employee?',
        title: 'Helps you get back your overpaid tax',
        desc: 'QLIXA’s questionnaire covers job, family, income, deductions',
        checklist: ['You answer simple questions', 'The questionnaire adapts to your situation', 'QLIXA calculates your possible refund', 'You get a ready-made document for FinanzOnline'],
        cta: 'Calculate my refund →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Business?',
        title: 'Helps you manage finances yourself',
        desc: 'With the QLIXA dashboard — simply run your business and stay ready for reporting',
        checklist: ['You add clients, income, expenses, inventory…', 'QLIXA automatically structures them', 'You see key metrics and changes', 'You get ready-made reports'],
        cta: 'View dashboard →',
        href: '/for/biznes',
        isSoon: true,
      },
    ],
    trust: 'Designed specifically for 🇦🇹 Austria · available in 4 languages · structured according to current Austrian tax regulations',
    soonLabel: 'Coming soon',
    hero: {
      h1: ['3 STEPS', 'TO YOUR TAX RETURN IN AUSTRIA.'],
      supporting: 'NO NEED TO FILL IN YOUR TAX RETURN YOURSELF',
      step1: {
        title: ['Tell us', 'about you'],
        desc: ['Answer simple', 'questions about your', 'basic information, family', 'and work situation.'],
      },
      step2: {
        title: ['Answer the QLIXA', 'Questionnaire'],
        desc: ['QLIXA adapts the questions to your', 'situation, going deeper when needed', 'to check relevant deduction categories', 'and important details.'],
      },
      step3: {
        title: ['Get your', 'tax return'],
        desc: ['Get a preliminary refund', 'estimate and a fully', 'completed tax return, ready', 'to submit via FinanzOnline.'],
      },
      cta: 'Calculate my refund →',
    },
  },
  RU: {
    badge: 'Твой автоматизированный бизнес-помощник в Австрии',
    cards: [
      {
        eyebrow: 'Наёмный?',
        title: 'Поможет вернуть переплаченный налог',
        desc: 'Анкета QLIXA учтёт работу, семью, доходы, списания',
        checklist: ['Ты отвечаешь на простые вопросы', 'Анкета подстраивается под твою ситуацию', 'QLIXA рассчитывает возможный возврат', 'Ты получаешь готовый документ для FinanzOnline'],
        cta: 'Рассчитать мой возврат →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Бизнес?',
        title: 'Поможет вести финансы самостоятельно',
        desc: 'С кабинетом QLIXA — просто вести бизнес и быть готовым к отчётности',
        checklist: ['Добавляешь клиентов, доходы, расходы, склад…', 'QLIXA автоматически их структурирует', 'Видишь главные показатели и изменения', 'Получаешь готовые отчёты'],
        cta: 'Посмотреть кабинет →',
        href: '/for/biznes',
        isSoon: true,
      },
    ],
    trust: 'Создано специально для 🇦🇹 Австрии · переведено на 4 языка · структурировано по актуальным правилам австрийской налоговой системы',
    soonLabel: 'Скоро',
    hero: {
      h1: ['3 ШАГА', 'К НАЛОГОВОЙ ДЕКЛАРАЦИИ В АВСТРИИ.'],
      supporting: 'НЕ НУЖНО САМОМУ ЗАПОЛНЯТЬ НАЛОГОВУЮ ДЕКЛАРАЦИЮ',
      step1: {
        title: ['Расскажи', 'о себе'],
        desc: ['Ответь на простые', 'вопросы о себе, семье', 'и своей рабочей', 'ситуации.'],
      },
      step2: {
        title: ['Пройди анкету', 'QLIXA'],
        desc: ['QLIXA подстраивает вопросы под', 'твою ситуацию и при необходимости', 'копает глубже, проверяя возможные', 'категории списаний и важные детали.'],
      },
      step3: {
        title: ['Получи', 'декларацию'],
        desc: ['Получи предварительный расчёт', 'возврата и полностью', 'заполненную декларацию, готовую', 'к подаче через FinanzOnline.'],
      },
      cta: 'Рассчитать мой возврат →',
    },
  },
  DE: {
    badge: 'Dein automatisierter Geschäftsassistent in Österreich',
    cards: [
      {
        eyebrow: 'Angestellte:r?',
        title: 'Hilft dir, deine zu viel gezahlte Steuer zurückzuholen',
        desc: 'Der QLIXA-Fragebogen berücksichtigt Job, Familie, Einkommen, Abzüge',
        checklist: ['Du beantwortest einfache Fragen', 'Der Fragebogen passt sich deiner Situation an', 'QLIXA berechnet deine mögliche Rückerstattung', 'Du erhältst ein fertiges Dokument für FinanzOnline'],
        cta: 'Meine Rückerstattung berechnen →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Business?',
        title: 'Hilft dir, deine Finanzen selbst zu verwalten',
        desc: 'Mit dem QLIXA-Kabinett einfach dein Geschäft führen und bereit für die Berichterstattung sein',
        checklist: ['Du fügst Kunden, Einnahmen, Ausgaben, Lager hinzu…', 'QLIXA strukturiert sie automatisch', 'Du siehst die wichtigsten Kennzahlen und Veränderungen', 'Du erhältst fertige Berichte'],
        cta: 'Dashboard ansehen →',
        href: '/for/biznes',
        isSoon: true,
      },
    ],
    trust: 'Speziell für 🇦🇹 Österreich entwickelt · verfügbar in 4 Sprachen · nach aktuellen österreichischen Steuervorschriften strukturiert',
    soonLabel: 'Demnächst',
    hero: {
      h1: ['3 SCHRITTE', 'ZUR STEUERERKLÄRUNG IN ÖSTERREICH.'],
      supporting: 'DU MUSST DEINE STEUERERKLÄRUNG NICHT SELBST AUSFÜLLEN',
      step1: {
        title: ['Erzähl uns', 'von dir'],
        desc: ['Beantworte einfache', 'Fragen zu dir, deiner', 'Familie und deiner', 'beruflichen Situation.'],
      },
      step2: {
        title: ['Beantworte den QLIXA-', 'Fragebogen'],
        desc: ['QLIXA passt die Fragen an deine', 'Situation an und fragt bei Bedarf', 'genauer nach – prüft mögliche', 'Abzugskategorien und wichtige Details.'],
      },
      step3: {
        title: ['Erhalte deine', 'Steuererklärung'],
        desc: ['Du erhältst eine vorläufige', 'Rückerstattungs-Schätzung und eine', 'fertig ausgefüllte Steuererklärung,', 'bereit zur Abgabe über FinanzOnline.'],
      },
      cta: 'Meine Rückerstattung berechnen →',
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
  centerTagline: string
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
    centerTagline: 'просто про складне',
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
    centerTagline: 'просто о сложном',
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
    centerTagline: 'complex made simple',
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
    centerTagline: 'Kompliziert einfach erklärt',
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
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Відповідаєш на запитання — QLIXA аналізує твої відповіді, перевіряє можливі категорії списань, показує попередній розрахунок можливого повернення та допомагає підготувати декларацію.', cta: 'Можливості', href: '/for/naymanyy' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'Окремий продукт для GmbH та бізнесу — зараз у розробці.', cta: 'Дізнатися першими', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Скоро',
  },
  RU: {
    badge: 'Как это работает',
    h2Before: 'Простой путь к готовой ',
    h2Emphasis: 'налоговой декларации',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Ты отвечаешь на вопросы — QLIXA анализирует твои ответы, проверяет возможные категории вычетов, показывает предварительный расчёт возможного возврата и помогает подготовить налоговую декларацию.', cta: 'Возможности', href: '/for/naymanyy' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'Отдельный продукт для GmbH и бизнеса — сейчас в разработке.', cta: 'Узнать первыми', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Скоро',
  },
  EN: {
    badge: 'How it works',
    h2Before: 'A simple path to a ',
    h2Emphasis: 'completed tax return',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'You answer the questions — QLIXA analyzes your answers, checks possible deduction categories, shows a preliminary estimate of your possible refund and helps prepare your tax return.', cta: 'Features', href: '/for/naymanyy' },
      { img: '/how-it-works/step-4.png', title: 'QLIXA Business', desc: 'A separate product for GmbHs and businesses — currently in development.', cta: 'Be the first to know', href: 'mailto:info@qlixa.eu?subject=Business%20plan', isSoon: true },
    ],
    soonLabel: 'Coming soon',
  },
  DE: {
    badge: 'So funktioniert es',
    h2Before: 'Ein einfacher Weg zur fertigen ',
    h2Emphasis: 'Steuererklärung',
    cards: [
      { img: '/how-it-works/step-1.png', title: 'QLIXA Tax Return', desc: 'Du beantwortest die Fragen — QLIXA analysiert deine Antworten, prüft mögliche Abzugskategorien, zeigt eine vorläufige Berechnung einer möglichen Rückerstattung und hilft bei der Vorbereitung deiner Steuererklärung.', cta: 'Funktionen', href: '/for/naymanyy' },
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
  features: { title: string; desc: string }[] // x6
  quoteLine1: string
  quoteBefore: string
  quoteEmphasis: string
  quoteAfter: string
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
    features: [
      { title: 'Пояснюємо людською мовою', desc: 'Без складних термінів і стресу.' },
      { title: 'Показуємо наступний крок', desc: 'Ти завжди знаєш, що робити далі.' },
      { title: 'Нагадуємо про дедлайни', desc: 'Щоб нічого не пропустити.' },
      { title: 'Збираємо все в одному місці', desc: 'Документи, податки, бізнес, FinanzOnline.' },
      { title: 'Допомагаємо знайти доступні списання', desc: 'Щоб повернути максимум.' },
      { title: 'Підлаштовуємося під твою ситуацію', desc: 'Бо двох однакових історій не існує.' },
    ],
    quoteLine1: '',
    quoteBefore: '',
    quoteEmphasis: '',
    quoteAfter: '',
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
    features: [
      { title: 'Объясняем человеческим языком', desc: 'Без сложных терминов и стресса.' },
      { title: 'Показываем следующий шаг', desc: 'Ты всегда знаешь, что делать дальше.' },
      { title: 'Напоминаем о дедлайнах', desc: 'Чтобы ничего не пропустить.' },
      { title: 'Собираем всё в одном месте', desc: 'Документы, налоги, бизнес, FinanzOnline.' },
      { title: 'Помогаем найти доступные списания', desc: 'Чтобы вернуть максимум.' },
      { title: 'Подстраиваемся под твою ситуацию', desc: 'Потому что двух одинаковых историй не существует.' },
    ],
    quoteLine1: '',
    quoteBefore: '',
    quoteEmphasis: '',
    quoteAfter: '',
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
    features: [
      { title: 'We explain in plain language', desc: 'No complex terms, no stress.' },
      { title: 'We show you the next step', desc: 'You always know what to do next.' },
      { title: 'We remind you of deadlines', desc: "So nothing slips through." },
      { title: 'We bring everything together', desc: 'Documents, taxes, business, FinanzOnline.' },
      { title: 'We help you find available deductions', desc: 'To get back as much as possible.' },
      { title: 'We adapt to your situation', desc: 'Because no two stories are the same.' },
    ],
    quoteLine1: '',
    quoteBefore: '',
    quoteEmphasis: '',
    quoteAfter: '',
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
    features: [
      { title: 'Wir erklären in einfacher Sprache', desc: 'Ohne komplizierte Begriffe und Stress.' },
      { title: 'Wir zeigen dir den nächsten Schritt', desc: 'Du weißt immer, was als Nächstes kommt.' },
      { title: 'Wir erinnern dich an Fristen', desc: 'Damit dir nichts durch die Lappen geht.' },
      { title: 'Wir sammeln alles an einem Ort', desc: 'Dokumente, Steuern, Business, FinanzOnline.' },
      { title: 'Wir helfen dir, mögliche Abzüge zu finden', desc: 'Damit du so viel wie möglich zurückbekommst.' },
      { title: 'Wir passen uns deiner Situation an', desc: 'Weil es nicht zwei gleiche Geschichten gibt.' },
    ],
    quoteLine1: '',
    quoteBefore: '',
    quoteEmphasis: '',
    quoteAfter: '',
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

  const HERO_SCREEN_SLIDES = getHeroScreenSlides(lang);
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
        @keyframes heroSlideFade {
          0%    { opacity: 0; transform: translate(-50%,-50%) scale(0.75) translateY(8px); }
          4%    { opacity: 1; transform: translate(-50%,-50%) scale(1.06) translateY(0); }
          7%    { opacity: 1; transform: translate(-50%,-50%) scale(1) translateY(0); }
          13%   { opacity: 1; transform: translate(-50%,-50%) scale(1) translateY(0); }
          16.67%{ opacity: 0; transform: translate(-50%,-50%) scale(0.9) translateY(-6px); }
          100%  { opacity: 0; transform: translate(-50%,-50%) scale(0.9) translateY(-6px); }
        }
        @keyframes checklistCycle {
          0%    { opacity: 0; transform: translateY(8px); }
          5%    { opacity: 1; transform: translateY(0); }
          20%   { opacity: 1; transform: translateY(0); }
          25%   { opacity: 0; transform: translateY(-8px); }
          100%  { opacity: 0; transform: translateY(-8px); }
        }
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
        .ticker-track { display:flex; animation:tickerMove 60s linear infinite; width:max-content; will-change:transform; }
      `}</style>

      <Navbar />

      <div style={{ overflowX: 'hidden' }}>

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

          
          {/* LAPTOP_IMAGE */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/laptop_hero_only.png"
            alt=""
            style={{ position: 'absolute' as const, left: '50%', top: '32.766%', width: '70%', height: '50%', objectFit: 'contain' as const, objectPosition: 'left top' as const }}
          />

          {/* HEADLINE_LINE1 — "3 STEPS" */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '1.713%', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(20px,5.833vw,70px)', lineHeight: 1, color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.h1[0]}
          </div>
          {/* HEADLINE_LINE2 — "TO YOUR TAX RETURN IN AUSTRIA." */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '15.041%', fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(12px,3.5vw,42px)', lineHeight: 1, color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.h1[1]}
          </div>

          {/* CHECKMARK_BULLET — small teal circle */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '27.293%', width: 'clamp(9px,1.3vw,15.6px)', height: 'clamp(9px,1.3vw,15.6px)', borderRadius: '50%', background: '#1F7489' }} />
          {/* CHECKMARK_TEXT — "NO NEED TO FILL IN YOUR TAX RETURN YOURSELF" */}
          <div style={{ position: 'absolute' as const, left: '1.742%', top: '25.199%', fontFamily: 'Charter, Georgia, serif', fontWeight: 700, fontSize: 'clamp(9px,2vw,24px)', color: '#1A1A1A', whiteSpace: 'nowrap' as const }}>
            {t.hero.supporting}
          </div>

          {/* ▼▼▼ CIRCLES_AND_STEPS_GROUP — the dashed connector line + all 3
              step icon-groups (circle+icon+number) + all step titles and
              descriptions. To move the WHOLE group together, edit ONLY this
              wrapper's left/top (it currently matches inset:0, i.e. no offset
              — children keep their existing % values unchanged, computed
              against this wrapper instead of the outer container, which is
              the same size, so nothing visually shifts). ▼▼▼ */}
          <div style={{ position: 'absolute' as const, left: 0, top: -20, width: '100%', height: '100%' }}>
          {/* DASHED_LINE_1_2_3 — connector between step 1,2 and step 3 circles */}
          <div style={{ position: 'absolute' as const, left: '8.575%', top: '43.301%', width: '33.258%', height: 0, borderTop: '2px dashed #BFDFDF' }} />
          
          {/* STEP1_ICON_GROUP — big white circle + chat-icon SVG + number "1".
              Move the whole group by editing ONLY this div's left/top. */}
          <div style={{ position: 'absolute' as const, left: '5.5%', top: '36.39%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)' }}>
            <div style={{ position: 'absolute' as const, left: '50%', top: '0%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)', borderRadius: '50%', background: '#fff', border: '1px solid #DAEDEF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
            <div style={{ position: 'absolute' as const, left: '50%', top: '50%', width: 'clamp(20px,3.4vw,41px)', height: 'clamp(20px,3.4vw,41px)', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' as const }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V14C20 15.1046 19.1046 16 18 16H9L5 20V16H6C4.89543 16 4 15.1046 4 14V5Z" stroke="#038390" strokeWidth="1.8" strokeLinejoin="round" fill="#E6F4F5" />
              </svg>
            </div>
            <div style={{ position: 'absolute' as const, left: '50%', top: '118%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              1
            </div>
          </div>

          {/* STEP2_ICON_GROUP — big white circle + question-mark SVG + number "2". */}
          <div style={{ position: 'absolute' as const, left: '26.14%', top: '36.39%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)' }}>
            <div style={{ position: 'absolute' as const, left: '50%', top: '0%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)', borderRadius: '50%', background: '#fff', border: '1px solid #DAEDEF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
            <div style={{ position: 'absolute' as const, left: '50%', top: '50%', width: 'clamp(20px,3.4vw,41px)', height: 'clamp(20px,3.4vw,41px)', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' as const }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M8.5 9C8.5 6.5 10.2 5 12 5C13.8 5 15.5 6.2 15.5 8.2C15.5 10.8 12.5 11 12.5 14" stroke="#038390" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12.5" cy="18" r="1.3" fill="#038390" />
              </svg>
            </div>
            <div style={{ position: 'absolute' as const, left: '50%', top: '118%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              2
            </div>
          </div>

          {/* STEP3_ICON_GROUP — big white circle + document SVG + number "3". */}
          <div style={{ position: 'absolute' as const, left: '44.98%', top: '36.39%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)' }}>
            <div style={{ position: 'absolute' as const, left: '50%', top: '0%', width: 'clamp(42px,7.17vw,86px)', height: 'clamp(42px,7.17vw,86px)', transform: 'translateX(-50%)', borderRadius: '50%', background: '#fff', border: '1px solid #DAEDEF', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
            <div style={{ position: 'absolute' as const, left: '50%', top: '50%', width: 'clamp(20px,3.4vw,41px)', height: 'clamp(20px,3.4vw,41px)', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' as const }}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M6 3H14L19 8V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z" stroke="#038390" strokeWidth="1.8" strokeLinejoin="round" fill="#E6F4F5" />
                <path d="M14 3V8H19" stroke="#038390" strokeWidth="1.8" strokeLinejoin="round" />
                <line x1="8" y1="12" x2="15" y2="12" stroke="#038390" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="8" y1="15" x2="15" y2="15" stroke="#038390" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ position: 'absolute' as const, left: '50%', top: '118%', width: 'clamp(14px,1.67vw,20px)', height: 'clamp(14px,1.67vw,20px)', transform: 'translateX(-50%)', borderRadius: '50%', border: '1px solid #BFDFDF', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' as const, fontSize: 'clamp(8px,1vw,12px)', fontWeight: 700, color: '#595959' }}>
              3
            </div>
          </div>

          {/* STEP1_TITLE — "Tell us about you" */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '57.618%', width: '10.84%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
            {t.hero.step1.title.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* STEP1_DESC — "Answer simple questions about your basic information, family and work situation." */}
          <div style={{ position: 'absolute' as const, left: '0%', top: '65%', width: '10.84%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
            {t.hero.step1.desc.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* STEP2_TITLE — "Answer the QLIXA Questionnaire" */}
          <div style={{ position: 'absolute' as const, left: '13.5%', top: '57.618%', width: '25.39%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
            {t.hero.step2.title.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* STEP2_EXTRA_DESC — "Our questionnaire delves deep into your situation
              and finds possible deductions." — placed next to STEP2_DESC, overlap
              is expected by design, Iryna will nudge left/top/width herself. */}
          <div style={{ position: 'absolute' as const, left: '13.23%', top: '65%', width: '25.39%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
            {t.hero.step2.desc.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* STEP3_TITLE — "Get your tax return" */}
          <div style={{ position: 'absolute' as const, left: '37.5%', top: '57.618%', width: '14.84%', textAlign: 'center' as const, fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 'clamp(9px,1.25vw,15px)', color: '#09877A', lineHeight: 1.2 }}>
            {t.hero.step3.title.map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* STEP3_EXTRA_DESC — "Get a preliminary refund estimate and a fully completed tax return, readyto submit via FinanzOnline." — placed next to STEP3_DESC, overlap is
              expected by design, Iryna will nudge left/top/width herself. */}
          <div style={{ position: 'absolute' as const, left: '37.5%', top: '65%', width: '14.84%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(7px,0.92vw,11px)', color: '#404040', lineHeight: 1.35 }}>
            {t.hero.step3.desc.map((line, i) => <div key={i}>{line}</div>)}
          </div>
          </div>
          {/* ▲▲▲ END CIRCLES_AND_STEPS_GROUP ▲▲▲ */}


          {/* BUTTON — "Calculate my refund →". aspect-ratio matches
              hero_button.png's REAL file dimensions (457×77px) exactly, so
              resizing it never distorts/stretches it. */}
          <Link
            href={t.cards[0].href}
            style={{
              position: 'absolute' as const, left: '0%', top: '74%', width: '27.867%', aspectRatio: '700 / 77',
              display: 'flex', alignItems: 'center', justifyContent: 'center' as const,
              backgroundImage: 'url(/hero/hero_button.png)', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' as const,
              fontFamily: 'Arial, sans-serif', fontSize: 'clamp(9px,1.17vw,14px)', fontWeight: 700, color: '#fff', textDecoration: 'none',
            }}
          >
            {t.hero.cta}
          </Link>

          {/* TRUST_LINE — "Designed specifically for 🇦🇹 Austria..." — this is
              the LAST element; the container's height ends exactly here. */}
          <div style={{ position: 'absolute' as const, left: 0, right: 0, top: '83%', textAlign: 'center' as const, fontFamily: 'Arial, sans-serif', fontSize: 'clamp(9px,1.42vw,17px)', color: '#404040', whiteSpace: 'nowrap' as const }}>
            {t.trust}
          </div>

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
