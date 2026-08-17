'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ReviewsSection from '@/components/layout/ReviewsSection'
import ArticlesSlider from '@/components/layout/ArticlesSlider'

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
      { tag: 'Гайд',                  title: 'Як підготуватися до подачі на RWR+ карту',                           desc: 'Покроковий гайд: документи, калькулятор фінансових вимог і PDF чеклісти для найманих та самозайнятих.' },
      { tag: 'Реєстрація бізнесу',    title: 'Gewerbeanmeldung в Австрії: покрокова реєстрація самозайнятості',     desc: 'Іноземці в Австрії платять юристам €300–500 за типові питання про реєстрацію бізнесу. Ми зібрали всю інформацію безкоштовно.' },
      { tag: 'Австрія · Документи',   title: 'Як оформити Austria ID: покроковий гайд для іноземців',               desc: 'Austria ID — обов\'язковий перший крок для реєстрації бізнесу, роботи з FinanzOnline та SVS. 5 кроків.' },
      { tag: 'Сім\'я · Пільги',       title: 'Інвалідність дитини в Австрії: виплати, пільги та з чого почати',    desc: 'Behindertenpass, підвищена Familienbeihilfe, Pflegegeld та податкові пільги — покроковий гайд для батьків.' },
      { tag: 'GISA · Реєстрація',     title: 'Реєстрація на сайті GISA: покрокова інструкція',                      desc: 'Як подати заяву Gewerbeanmeldung онлайн через GISA — детально, з поясненням кожного поля та кроку.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'Як заповнити формуляр SVS',           desc: 'Соціальне страхування — що вказати щоб не переплатити.' },
      { tag: 'FinanzOnline', title: 'Як заповнити формуляр FinanzOnline',  desc: 'Реєстрація в податковій онлайн — покроково.' },
      { tag: 'MVK',          title: 'Як обрати пенсійний фонд MVK',         desc: 'Що таке MVK і як не пропустити дедлайн 6 місяців.' },
    ],
  },
  RU: {
    published: [
      { tag: 'Гайд',                  title: 'Как подготовиться к подаче на RWR+ карту',                             desc: 'Пошаговый гайд: документы, калькулятор финансовых требований и PDF чеклисты для наёмных и самозанятых.' },
      { tag: 'Регистрация бизнеса',   title: 'Gewerbeanmeldung в Австрии: пошаговая регистрация самозанятости',     desc: 'Иностранцы в Австрии платят юристам €300–500 за типичные вопросы о регистрации бизнеса. Мы собрали всё бесплатно.' },
      { tag: 'Австрия · Документы',   title: 'Как оформить Austria ID: пошаговый гайд для иностранцев',             desc: 'Austria ID — обязательный первый шаг для регистрации бизнеса, работы с FinanzOnline и SVS. 5 шагов.' },
      { tag: 'Семья · Льготы',        title: 'Инвалидность ребёнка в Австрии: выплаты, льготы и с чего начать',    desc: 'Behindertenpass, повышенная Familienbeihilfe, Pflegegeld и налоговые льготы — пошаговый гайд для родителей.' },
      { tag: 'GISA · Регистрация',    title: 'Регистрация на сайте GISA: пошаговая инструкция',                     desc: 'Как подать заявку Gewerbeanmeldung онлайн через GISA — подробно, с объяснением каждого поля и шага.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'Как заполнить формуляр SVS',          desc: 'Социальное страхование — что указать чтобы не переплатить.' },
      { tag: 'FinanzOnline', title: 'Как заполнить формуляр FinanzOnline', desc: 'Регистрация в налоговой онлайн — пошагово.' },
      { tag: 'MVK',          title: 'Как выбрать пенсионный фонд MVK',     desc: 'Что такое MVK и как не пропустить дедлайн 6 месяцев.' },
    ],
  },
  EN: {
    published: [
      { tag: 'Guide',                  title: 'How to Prepare for Your RWR+ Card Application',                       desc: 'Step-by-step guide: documents, financial requirements calculator and PDF checklists for employed and self-employed.' },
      { tag: 'Business Registration',  title: 'Gewerbeanmeldung in Austria: Step-by-Step Self-Employment Registration', desc: 'Foreigners in Austria pay lawyers €300–500 for typical business registration questions. We collected it all for free.' },
      { tag: 'Austria · Documents',    title: 'How to Get Austria ID: Step-by-Step Guide for Foreigners',             desc: 'Austria ID — the mandatory first step for business registration, FinanzOnline and SVS. 5 steps.' },
      { tag: 'Family · Benefits',      title: 'Child Disability in Austria: Payments, Benefits and Where to Start',   desc: 'Behindertenpass, increased Familienbeihilfe, Pflegegeld and tax benefits — step-by-step guide for parents.' },
      { tag: 'GISA · Registration',    title: 'Registering on GISA Website: Step-by-Step Instructions',               desc: 'How to submit a Gewerbeanmeldung application online via GISA — in detail, explaining every field and step.' },
    ],
    upcoming: [
      { tag: 'SVS',          title: 'How to Fill in the SVS Form',         desc: 'Social insurance — what to enter so you don\'t overpay.' },
      { tag: 'FinanzOnline', title: 'How to Fill in the FinanzOnline Form', desc: 'Online tax office registration — step by step.' },
      { tag: 'MVK',          title: 'How to Choose a Pension Fund MVK',    desc: 'What MVK is and how not to miss the 6-month deadline.' },
    ],
  },
  DE: {
    published: [
      { tag: 'Leitfaden',              title: 'So bereitest du dich auf den RWR+-Kartenantrag vor',                   desc: 'Schritt-für-Schritt-Leitfaden: Unterlagen, Rechner für Finanznachweise und PDF-Checklisten für Angestellte und Selbstständige.' },
      { tag: 'Gewerbeanmeldung',       title: 'Gewerbeanmeldung in Österreich: Schritt-für-Schritt zur Selbstständigkeit', desc: 'Ausländer in Österreich zahlen Anwälten €300–500 für typische Fragen zur Gewerbeanmeldung. Wir haben alles kostenlos zusammengestellt.' },
      { tag: 'Österreich · Dokumente', title: 'Austria ID beantragen: Schritt-für-Schritt-Anleitung für Ausländer',  desc: 'Die Austria ID ist der Pflichtschritt für Gewerbeanmeldung, FinanzOnline und SVS. 5 Schritte.' },
      { tag: 'Familie · Leistungen',   title: 'Behinderung des Kindes in Österreich: Leistungen und wie man anfängt', desc: 'Behindertenpass, erhöhte Familienbeihilfe, Pflegegeld und Steuervergünstigungen — Leitfaden für Eltern.' },
      { tag: 'GISA · Anmeldung',       title: 'Registrierung auf der GISA-Website: Schritt-für-Schritt-Anleitung',   desc: 'Wie du die Gewerbeanmeldung online über GISA einreichst — detailliert mit Erklärung jedes Feldes und Schritts.' },
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
  'clients.png',
  'suppliers.png',
  'invoices.png',
  'tax-declaration.png',
  'tax-refund.png',
  'kpi-dashboard.png',
  'analytics.png',
  'deadlines.png',
  'inventory.png',
  'finanzonline.png',
  'automation.png',
  'languages.png',
]
const TICKER_TEXT: Record<string, string[]> = {
  UA: [
    'Керуйте клієнтами',
    'Керуйте постачальниками',
    'Створюйте рахунки',
    'Допомога з податковою декларацією',
    'Оцінка можливого щорічного повернення податку',
    'Контролюйте KPI',
    'Аналізуйте показники бізнесу',
    'Не пропускайте важливі терміни',
    'Керуйте складом',
    'Отримуйте допомогу з FinanzOnline',
    'Автоматизуйте рутинні процеси',
    'Доступно 4 мовами',
  ],
  EN: [
    'Manage Clients',
    'Manage Suppliers',
    'Create Invoices',
    'Tax Return Assistance',
    'Estimate Annual Tax Refund',
    'Track KPI',
    'Analyze Business Performance',
    'Stay on Top of Deadlines',
    'Manage Inventory',
    'Get Help with FinanzOnline',
    'Automate Routine Tasks',
    'Available in 4 Languages',
  ],
  DE: [
    'Kunden verwalten',
    'Lieferanten verwalten',
    'Rechnungen erstellen',
    'Unterstützung bei der Steuererklärung',
    'Mögliche jährliche Steuererstattung einschätzen',
    'KPIs verfolgen',
    'Geschäftsentwicklung analysieren',
    'Fristen im Blick behalten',
    'Lager verwalten',
    'Hilfe mit FinanzOnline',
    'Routineaufgaben automatisieren',
    'In 4 Sprachen verfügbar',
  ],
  RU: [
    'Управляйте клиентами',
    'Управляйте поставщиками',
    'Создавайте счета',
    'Помощь с налоговой декларацией',
    'Оценка возможного ежегодного возврата налога',
    'Контролируйте KPI',
    'Анализируйте показатели бизнеса',
    'Не пропускайте важные сроки',
    'Управляйте складом',
    'Получайте помощь с FinanzOnline',
    'Автоматизируйте рутинные задачи',
    'Доступно на 4 языках',
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
}
const HERO_TEXT: Record<string, {
  badge: string
  cards: [HeroCard, HeroCard]
  trust: string
}> = {
  UA: {
    badge: 'Твій автоматизований бізнес-помічник в Австрії',
    cards: [
      {
        eyebrow: 'Працюєш за наймом?',
        title: 'Розрахує переплачений податок',
        desc: 'Не знаєш, що саме можна списати? QLIXA проводить тебе через персональну анкету і враховує роботу, сім’ю, доходи та інші обставини, які можуть впливати на твоє податкове повернення.',
        checklist: ['Персональна податкова анкета', 'Можливі податкові відрахування', 'Готовий документ для FinanzOnline', 'Проста мова, без бухгалтерських термінів'],
        cta: 'Розрахувати моє повернення →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Є бізнес?',
        title: 'Допоможе вести фінанси самостійно',
        desc: 'Втрачаєш час на таблиці замість клієнтів? QLIXA збирає все в одному кабінеті — від клієнтів до звітності — і допомагає бути готовим до звітного періоду.',
        checklist: ['Клієнти та рахунки', 'Доходи та витрати', 'ПДВ та звітність', 'Дедлайни та KPI'],
        cta: 'Переглянути кабінет →',
        href: '/for/biznes',
      },
    ],
    trust: 'Створено спеціально для \u{1F1E6}\u{1F1F9} Австрії · перекладено на 4 мови · структуровано за актуальними правилами австрійської податкової системи',
  },
  EN: {
    badge: 'Your automated business assistant in Austria',
    cards: [
      {
        eyebrow: 'Work as an employee?',
        title: 'Calculates your overpaid tax',
        desc: "Not sure what you can deduct? QLIXA walks you through a personal questionnaire and takes into account your job, family, income, and other circumstances that may affect your tax refund.",
        checklist: ['Personal tax questionnaire', 'Possible tax deductions', 'Ready-made document for FinanzOnline', 'Plain language, no accounting jargon'],
        cta: 'Calculate my refund →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Have a business?',
        title: 'Helps you manage finances yourself',
        desc: 'Losing time on spreadsheets instead of clients? QLIXA brings everything together in one dashboard — from clients to reporting — and helps you stay ready for tax season.',
        checklist: ['Clients and invoices', 'Income and expenses', 'VAT and reporting', 'Deadlines and KPIs'],
        cta: 'View dashboard →',
        href: '/for/biznes',
      },
    ],
    trust: 'Designed specifically for 🇦🇹 Austria · available in 4 languages · structured according to current Austrian tax regulations',
  },
  RU: {
    badge: 'Твой автоматизированный бизнес-помощник в Австрии',
    cards: [
      {
        eyebrow: 'Работаешь по найму?',
        title: 'Рассчитает переплаченный налог',
        desc: 'Не знаешь, что именно можно списать? QLIXA проводит тебя через персональную анкету и учитывает работу, семью, доходы и другие обстоятельства, которые могут влиять на твой налоговый возврат.',
        checklist: ['Персональная налоговая анкета', 'Возможные налоговые вычеты', 'Готовый документ для FinanzOnline', 'Простой язык, без бухгалтерских терминов'],
        cta: 'Рассчитать мой возврат →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Есть бизнес?',
        title: 'Поможет вести финансы самостоятельно',
        desc: 'Теряешь время на таблицы вместо клиентов? QLIXA собирает всё в одном кабинете — от клиентов до отчётности — и помогает быть готовым к отчётному периоду.',
        checklist: ['Клиенты и счета', 'Доходы и расходы', 'НДС и отчётность', 'Дедлайны и KPI'],
        cta: 'Посмотреть кабинет →',
        href: '/for/biznes',
      },
    ],
    trust: 'Создано специально для 🇦🇹 Австрии · переведено на 4 языка · структурировано по актуальным правилам австрийской налоговой системы',
  },
  DE: {
    badge: 'Dein automatisierter Geschäftsassistent in Österreich',
    cards: [
      {
        eyebrow: 'Angestellt?',
        title: 'Berechnet deine zu viel gezahlte Steuer',
        desc: 'Weißt du nicht, was du absetzen kannst? QLIXA führt dich durch einen persönlichen Fragebogen und berücksichtigt deinen Job, deine Familie, dein Einkommen und andere Umstände, die deine Steuerrückerstattung beeinflussen können.',
        checklist: ['Persönlicher Steuerfragebogen', 'Mögliche Steuerabsetzungen', 'Fertiges Dokument für FinanzOnline', 'Einfache Sprache, ohne Buchhaltungsjargon'],
        cta: 'Meine Rückerstattung berechnen →',
        href: '/for/naymanyy',
      },
      {
        eyebrow: 'Hast du ein Unternehmen?',
        title: 'Hilft dir, deine Finanzen selbst zu verwalten',
        desc: 'Verlierst du Zeit mit Tabellen statt mit Kunden? QLIXA bringt alles in einem Dashboard zusammen — von Kunden bis zur Berichterstattung — und hilft dir, für die Steuerperiode bereit zu sein.',
        checklist: ['Kunden und Rechnungen', 'Einnahmen und Ausgaben', 'USt und Berichte', 'Fristen und KPIs'],
        cta: 'Dashboard ansehen →',
        href: '/for/biznes',
      },
    ],
    trust: 'Speziell für 🇦🇹 Österreich entwickelt · verfügbar in 4 Sprachen · nach aktuellen österreichischen Steuervorschriften strukturiert',
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
}> = {
  UA: {
    badge: 'Що таке QLIXA',
    h2Prefix: 'Це один кабінет замість купи різних ',
    h2Emphasis: 'сервісів.',
    subheading: 'Де ти зручною мовою вирішуєш щоденні фінансові та бізнес питання.',
    cards: [
      ['Щорічне повернення твого податку', 'Платформа підказує, які списання можна врахувати, та допомагає повернути максимум із того, що тобі належить.'],
      ['Інтерфейс, який зрозуміє навіть новачок', 'Ніяких складних таблиць, бухгалтерських термінів і незрозумілих кнопок. Все пояснюється крок за кроком.'],
      ['Не програма для бухгалтерів', 'Це платформа для звичайних людей. Для тих, хто хоче займатися своїм життям або бізнесом, а не годинами розбиратися в документах.'],
      ['Розуміємо австрійську систему замість вас', 'Ми вже вивчили правила за тебе і перетворили їх на прості запитання та автоматичні підказки.'],
      ['Допомагаємо не проґавити списання', 'На основі твоїх даних платформа показує можливості, про які більшість людей навіть не знає.'],
      ['Нагадуємо про важливі дедлайни', 'Платформа сама нагадає про важливі дати, щоб ти не отримав штраф через забудькуватість.'],
      ['Бізнес-помічник на кожен день', 'Рахунки, клієнти, витрати, показники бізнесу та документи — все в одному зрозумілому кабінеті.'],
      ['Складне, пояснене просто', 'Українською, англійською, російською та німецькою — обирай зручну мову і починай.'],
    ],
    centerTagline: 'просто про складне',
  },
  RU: {
    badge: 'Что такое QLIXA',
    h2Prefix: 'Это один кабинет вместо кучи разных ',
    h2Emphasis: 'сервисов.',
    subheading: 'Где ты на удобном языке решаешь ежедневные финансовые и бизнес-вопросы.',
    cards: [
      ['Ежегодный возврат твоего налога', 'Платформа подсказывает, какие списания можно учесть, и помогает вернуть максимум из того, что тебе причитается.'],
      ['Интерфейс, который поймёт даже новичок', 'Никаких сложных таблиц, бухгалтерских терминов и непонятных кнопок. Всё объясняется шаг за шагом.'],
      ['Не программа для бухгалтеров', 'Это платформа для обычных людей. Для тех, кто хочет заниматься своей жизнью или бизнесом, а не часами разбираться в документах.'],
      ['Разбираемся в австрийской системе вместо вас', 'Мы уже изучили правила за тебя и превратили их в простые вопросы и автоматические подсказки.'],
      ['Помогаем не упустить списания', 'На основе твоих данных платформа показывает возможности, о которых большинство людей даже не знает.'],
      ['Напоминаем о важных дедлайнах', 'Платформа сама напомнит о важных датах, чтобы ты не получил штраф из-за забывчивости.'],
      ['Бизнес-помощник на каждый день', 'Счета, клиенты, расходы, показатели бизнеса и документы — всё в одном понятном кабинете.'],
      ['Сложное, объяснённое просто', 'На украинском, английском, русском и немецком — выбирай удобный язык и начинай.'],
    ],
    centerTagline: 'просто о сложном',
  },
  EN: {
    badge: 'What is QLIXA',
    h2Prefix: "It's one dashboard instead of a bunch of different ",
    h2Emphasis: 'services.',
    subheading: "Where you handle everyday financial and business matters in a language that's comfortable for you.",
    cards: [
      ['Your annual tax refund', "The platform suggests which deductions you can claim and helps you get back the maximum of what you're owed."],
      ['An interface even a beginner will understand', 'No complicated spreadsheets, accounting jargon, or confusing buttons. Everything is explained step by step.'],
      ['Not software for accountants', "This is a platform for regular people. For those who want to focus on their life or business, not spend hours figuring out paperwork."],
      ["We understand the Austrian system so you don't have to", "We've already studied the rules for you and turned them into simple questions and automatic hints."],
      ['We help you not miss deductions', "Based on your data, the platform shows opportunities most people don't even know about."],
      ['We remind you about important deadlines', "The platform reminds you of important dates itself, so you don't get fined for forgetting."],
      ['Your everyday business assistant', 'Invoices, clients, expenses, business metrics and documents — all in one clear dashboard.'],
      ['Complex made simple', 'In Ukrainian, English, Russian, and German — choose your language and get started.'],
    ],
    centerTagline: 'simply about the complex',
  },
  DE: {
    badge: 'Was ist QLIXA',
    h2Prefix: 'Das ist ein Konto statt vieler verschiedener ',
    h2Emphasis: 'Services.',
    subheading: 'Wo du deine täglichen Finanz- und Geschäftsfragen in einer für dich verständlichen Sprache löst.',
    cards: [
      ['Deine jährliche Steuerrückerstattung', 'Die Plattform zeigt dir, welche Abzüge du geltend machen kannst, und hilft dir, das Maximum von dem zurückzubekommen, was dir zusteht.'],
      ['Eine Oberfläche, die sogar Anfänger verstehen', 'Keine komplizierten Tabellen, Buchhaltungsbegriffe oder unklaren Schaltflächen. Alles wird Schritt für Schritt erklärt.'],
      ['Kein Programm für Buchhalter', 'Das ist eine Plattform für ganz normale Menschen. Für alle, die sich um ihr Leben oder ihr Business kümmern wollen, statt stundenlang Unterlagen zu wälzen.'],
      ['Wir verstehen das österreichische System für dich', 'Wir haben die Regeln bereits für dich studiert und in einfache Fragen und automatische Hinweise verwandelt.'],
      ['Wir helfen dir, Abzüge nicht zu verpassen', 'Basierend auf deinen Daten zeigt dir die Plattform Möglichkeiten, von denen die meisten Menschen nicht einmal wissen.'],
      ['Wir erinnern dich an wichtige Fristen', 'Die Plattform erinnert dich selbst an wichtige Termine, damit du wegen Vergesslichkeit keine Strafe bekommst.'],
      ['Dein Business-Assistent für jeden Tag', 'Rechnungen, Kunden, Ausgaben, Geschäftskennzahlen und Dokumente — alles in einem übersichtlichen Konto.'],
      ['Kompliziertes einfach erklärt', 'Auf Ukrainisch, Englisch, Russisch und Deutsch — wähle deine Sprache und leg los.'],
    ],
    centerTagline: 'einfach erklärt',
  },
}

// Переклади секції "Для кого" — всі 4 мови
const FORWHOM_TEXT: Record<string, {
  badge: string
  h2Prefix: string
  h2Emphasis: string
  cards: [string, string][] // [title, desc] x6
}> = {
  UA: {
    badge: 'Для кого',
    h2Prefix: 'QLIXA підходить, ',
    h2Emphasis: 'якщо ти:',
    cards: [
      ['Самозайнятий / Фрілансер', 'Neue Selbstständige, Gewerbe або вільна професія — IT, дизайн, консалтинг. QLIXA пояснює кожен крок без складних термінів і зайвого стресу.'],
      ['Маєш капітальні та закордонні доходи', 'Маєш дохід від продажу акцій, нерухомості або з-за кордону? QLIXA розрахує KESt та інші зобов’язання точно і без помилок.'],
      ['Ведеш маленький бізнес', 'Або тільки плануєш відкрити — QLIXA пройде з тобою кожен крок від реєстрації до звітів.'],
      ['Здаєш нерухомість', 'Або маєш дохід з кількох джерел — платформа врахує всі надходження та списання.'],
      ['Пенсіонер з доходом', 'Додатковий дохід від підробітку — QLIXA розрахує твої зобов’язання просто і зрозуміло.'],
      ['Найманий працівник', 'Працюєш по найму, але хочеш контролювати свої фінанси та правильно розрахувати щорічне повернення податків.'],
    ],
  },
  RU: {
    badge: 'Для кого',
    h2Prefix: 'QLIXA подходит, ',
    h2Emphasis: 'если ты:',
    cards: [
      ['Самозанятый / Фрилансер', 'Neue Selbstständige, Gewerbe или свободная профессия — IT, дизайн, консалтинг. QLIXA объясняет каждый шаг без сложных терминов и лишнего стресса.'],
      ['Имеешь капитальные и заграничные доходы', 'Есть доход от продажи акций, недвижимости или из-за границы? QLIXA рассчитает KESt и другие обязательства точно и без ошибок.'],
      ['Ведёшь маленький бизнес', 'Или только планируешь открыть — QLIXA пройдёт с тобой каждый шаг от регистрации до отчётов.'],
      ['Сдаёшь недвижимость', 'Или имеешь доход из нескольких источников — платформа учтёт все поступления и списания.'],
      ['Пенсионер с доходом', 'Дополнительный доход от подработки — QLIXA рассчитает твои обязательства просто и понятно.'],
      ['Наёмный работник', 'Работаешь по найму, но хочешь контролировать свои финансы и правильно рассчитать ежегодный возврат налогов.'],
    ],
  },
  EN: {
    badge: 'For Whom',
    h2Prefix: 'QLIXA is right for you ',
    h2Emphasis: 'if you:',
    cards: [
      ['Self-employed / Freelancer', 'Neue Selbstständige, Gewerbe, or a liberal profession — IT, design, consulting. QLIXA explains every step without complex terms or unnecessary stress.'],
      ['Have capital gains or foreign income', 'Have income from selling shares, real estate, or from abroad? QLIXA calculates KESt and other obligations accurately and without errors.'],
      ['Run a small business', 'Or are just planning to start one — QLIXA walks you through every step from registration to reports.'],
      ['Rent out property', 'Or have income from multiple sources — the platform accounts for all income and deductions.'],
      ['Are a pensioner with income', 'Extra income from a side job — QLIXA calculates your obligations simply and clearly.'],
      ['Are an employee', 'Work as an employee but want to control your finances and correctly calculate your annual tax refund.'],
    ],
  },
  DE: {
    badge: 'Für wen',
    h2Prefix: 'QLIXA passt zu dir, ',
    h2Emphasis: 'wenn du:',
    cards: [
      ['Selbstständig / Freelancer', 'Neue Selbstständige, Gewerbe oder freier Beruf — IT, Design, Consulting. QLIXA erklärt jeden Schritt ohne komplizierte Begriffe und unnötigen Stress.'],
      ['Kapitalerträge oder Auslandseinkünfte hast', 'Einkünfte aus dem Verkauf von Aktien, Immobilien oder aus dem Ausland? QLIXA berechnet KESt und andere Verpflichtungen genau und fehlerfrei.'],
      ['Ein kleines Unternehmen führst', 'Oder erst planst, eins zu gründen — QLIXA begleitet dich bei jedem Schritt von der Anmeldung bis zu den Berichten.'],
      ['Immobilien vermietest', 'Oder Einkünfte aus mehreren Quellen hast — die Plattform berücksichtigt alle Einnahmen und Abzüge.'],
      ['Rentner/in mit Einkommen bist', 'Zusätzliches Einkommen aus einem Nebenjob — QLIXA berechnet deine Verpflichtungen einfach und verständlich.'],
      ['Angestellte/r bist', 'Arbeitest angestellt, willst aber deine Finanzen im Griff haben und deine jährliche Steuerrückerstattung richtig berechnen.'],
    ],
  },
}

// Переклади секції "Як це працює" — всі 4 мови
const DEMO_TEXT: Record<string, {
  badge: string
  h2Before: string
  h2Emphasis: string
  cards: { before: string; em: string; desc: string }[] // x4
}> = {
  UA: {
    badge: 'Як це працює',
    h2Before: 'Все просто — ',
    h2Emphasis: '4 кроки',
    cards: [
      { before: 'Відповідаєш на ', em: 'прості питання', desc: 'Кілька простих запитань — ти вводиш свої дані та розповідаєш про свою ситуацію.' },
      { before: 'QLIXA ', em: 'аналізує', desc: 'На основі введених тобою даних платформа показує потрібні розрахунки, суми, дедлайни та наступні кроки.' },
      { before: 'Отримуєш ', em: 'зрозумілі підказки', desc: 'QLIXA допомагає підготувати розрахунки, шаблони, чеклісти та пояснення. Ти перевіряєш результат і вирішуєш, що робити далі.' },
      { before: 'Ти ', em: 'залишаєшся головним', desc: 'QLIXA допомагає все структурувати та підготувати. Рішення, перевірка і відправка документів завжди залишаються за тобою.' },
    ],
  },
  RU: {
    badge: 'Как это работает',
    h2Before: 'Всё просто — ',
    h2Emphasis: '4 шага',
    cards: [
      { before: 'Отвечаешь на ', em: 'простые вопросы', desc: 'Несколько простых вопросов — ты вводишь свои данные и рассказываешь о своей ситуации.' },
      { before: 'QLIXA ', em: 'анализирует', desc: 'На основе введённых тобой данных платформа показывает нужные расчёты, суммы, дедлайны и следующие шаги.' },
      { before: 'Получаешь ', em: 'понятные подсказки', desc: 'QLIXA помогает подготовить расчёты, шаблоны, чек-листы и пояснения. Ты проверяешь результат и решаешь, что делать дальше.' },
      { before: 'Ты ', em: 'остаёшься главным', desc: 'QLIXA помогает всё структурировать и подготовить. Решение, проверка и отправка документов всегда остаются за тобой.' },
    ],
  },
  EN: {
    badge: 'How it works',
    h2Before: "It's simple — ",
    h2Emphasis: '4 steps',
    cards: [
      { before: 'You answer ', em: 'simple questions', desc: 'A few simple questions — you enter your details and describe your situation.' },
      { before: 'QLIXA ', em: 'analyzes', desc: 'Based on the data you entered, the platform shows the relevant calculations, amounts, deadlines, and next steps.' },
      { before: 'You get ', em: 'clear guidance', desc: 'QLIXA helps you prepare calculations, templates, checklists, and explanations. You review the result and decide what to do next.' },
      { before: 'You ', em: 'stay in control', desc: 'QLIXA helps structure and prepare everything. The decision, review, and submission of documents always remain with you.' },
    ],
  },
  DE: {
    badge: 'So funktioniert’s',
    h2Before: 'Ganz einfach — ',
    h2Emphasis: '4 Schritte',
    cards: [
      { before: 'Du beantwortest ', em: 'einfache Fragen', desc: 'Ein paar einfache Fragen — du gibst deine Daten ein und beschreibst deine Situation.' },
      { before: 'QLIXA ', em: 'analysiert', desc: 'Basierend auf deinen Angaben zeigt dir die Plattform die passenden Berechnungen, Beträge, Fristen und nächsten Schritte.' },
      { before: 'Du bekommst ', em: 'klare Hinweise', desc: 'QLIXA hilft dir, Berechnungen, Vorlagen, Checklisten und Erklärungen vorzubereiten. Du prüfst das Ergebnis und entscheidest, wie es weitergeht.' },
      { before: 'Du ', em: 'bleibst am Ruder', desc: 'QLIXA hilft dir, alles zu strukturieren und vorzubereiten. Die Entscheidung, Prüfung und das Einreichen von Dokumenten liegen immer bei dir.' },
    ],
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
    badge: 'Чому ж ми створили QLIXA',
    h2Line1: 'Ми просто створили платформу,',
    h2Line2Before: 'якої нам самим ',
    h2Emphasis: 'не вистачало',
    p: ['Ми теж проходили цей шлях.', 'Саме тому знаємо, що відчуває людина,', 'яка тільки починає життя чи бізнес в Австрії.'],
    linkText: 'Наша історія →',
    painBefore: 'Це ',
    painEmphasis: 'знайоме?',
    painCards: [
      ['Боїшся зробити помилку', 'Не тому що не вмієш. А тому що система здається дуже складною.'],
      ['Забагато незрозумілих слів', 'Хочеться, щоб усе пояснили простою мовою. Без бухгалтерського словника.'],
      ['Немає часу розбиратися', 'Після роботи хочеться бути з родиною. Не сидіти вечорами над деклараціями.'],
      ['Кожна ситуація різна', 'Дохід. Оренда. Діти. Бізнес. Хочеться саме для своєї ситуації.'],
      ['Консультація коштує дорого', 'А питань менше не стає.'],
      ['Хочеться щоб пояснили моєю мовою', 'Без складних термінів. Щоб було зрозуміло з першого разу.'],
      ['Страшно пропустити дедлайн', 'Ніхто не хоче отримати штраф лише тому, що забув дату.'],
      ['Хочеться повернути все, що належить', 'Без сумнівів: "А може я щось пропустив?"'],
    ],
    solutionBefore: 'Саме тому народилась ',
    solutionAfter: '',
    solutionP: ['Не ще один складний сервіс.', 'А платформа, яка допомагає і працювати за наймом, і вести бізнес — без зайвого стресу.'],
    features: [
      { title: 'Пояснюємо людською мовою', desc: 'Без складних термінів і стресу.' },
      { title: 'Показуємо наступний крок', desc: 'Ти завжди знаєш, що робити далі.' },
      { title: 'Нагадуємо про дедлайни', desc: 'Щоб нічого не пропустити.' },
      { title: 'Збираємо все в одному місці', desc: 'Документи, податки, бізнес, FinanzOnline.' },
      { title: 'Допомагаємо знайти доступні списання', desc: 'Щоб повернути максимум.' },
      { title: 'Підлаштовуємося під твою ситуацію', desc: 'Бо двох однакових історій не існує.' },
    ],
    quoteLine1: 'Ми не замінюємо бухгалтера —',
    quoteBefore: 'ми робимо так, щоб ти сам ',
    quoteEmphasis: 'розумів',
    quoteAfter: ' свою ситуацію.',
    quoteP2: ['Ти економиш час, гроші та нерви.', 'Ми беремо на себе складне,', 'а ти займаєшся тим, що для тебе справді важливо.'],
  },
  RU: {
    badge: 'Почему мы создали QLIXA',
    h2Line1: 'Мы просто создали платформу,',
    h2Line2Before: 'которой нам самим ',
    h2Emphasis: 'не хватало',
    p: ['Мы тоже проходили этот путь.', 'Именно поэтому знаем, что чувствует человек,', 'который только начинает жизнь или бизнес в Австрии.'],
    linkText: 'Наша история →',
    painBefore: 'Это ',
    painEmphasis: 'знакомо?',
    painCards: [
      ['Боишься совершить ошибку', 'Не потому что не умеешь. А потому что система кажется очень сложной.'],
      ['Слишком много непонятных слов', 'Хочется, чтобы всё объяснили простым языком. Без бухгалтерского словаря.'],
      ['Нет времени разбираться', 'После работы хочется быть с семьёй. Не сидеть вечерами над декларациями.'],
      ['Каждая ситуация разная', 'Доход. Аренда. Дети. Бизнес. Хочется именно для своей ситуации.'],
      ['Консультация стоит дорого', 'А вопросов меньше не становится.'],
      ['Хочется, чтобы объяснили на моём языке', 'Без сложных терминов. Чтобы было понятно с первого раза.'],
      ['Страшно пропустить дедлайн', 'Никто не хочет получить штраф просто потому, что забыл дату.'],
      ['Хочется вернуть всё, что положено', 'Без сомнений: "А может я что-то пропустил?"'],
    ],
    solutionBefore: 'Именно поэтому родилась ',
    solutionAfter: '',
    solutionP: ['Не ещё один сложный сервис.', 'А платформа, которая помогает и работать по найму, и вести бизнес — без лишнего стресса.'],
    features: [
      { title: 'Объясняем человеческим языком', desc: 'Без сложных терминов и стресса.' },
      { title: 'Показываем следующий шаг', desc: 'Ты всегда знаешь, что делать дальше.' },
      { title: 'Напоминаем о дедлайнах', desc: 'Чтобы ничего не пропустить.' },
      { title: 'Собираем всё в одном месте', desc: 'Документы, налоги, бизнес, FinanzOnline.' },
      { title: 'Помогаем найти доступные списания', desc: 'Чтобы вернуть максимум.' },
      { title: 'Подстраиваемся под твою ситуацию', desc: 'Потому что двух одинаковых историй не существует.' },
    ],
    quoteLine1: 'Мы не заменяем бухгалтера —',
    quoteBefore: 'мы делаем так, чтобы ты сам ',
    quoteEmphasis: 'понимал',
    quoteAfter: ' свою ситуацию.',
    quoteP2: ['Ты экономишь время, деньги и нервы.', 'Мы берём на себя сложное,', 'а ты занимаешься тем, что для тебя действительно важно.'],
  },
  EN: {
    badge: 'Why we created QLIXA',
    h2Line1: 'We simply built the platform',
    h2Line2Before: 'we ourselves ',
    h2Emphasis: 'were missing',
    p: ["We've been through this path too.", "That's why we know what it feels like", 'to start a life or business in Austria.'],
    linkText: 'Our story →',
    painBefore: 'Sound ',
    painEmphasis: 'familiar?',
    painCards: [
      ['Afraid of making a mistake', "Not because you can't handle it — it's because the system feels overwhelming."],
      ['Too many confusing terms', 'You just want it explained in plain language. No accounting jargon.'],
      ['No time to figure it out', "After work you want to be with family, not stuck on paperwork all evening."],
      ['Every situation is different', 'Income. Rent. Kids. Business. You want something made for your situation.'],
      ['Consultations are expensive', "And the questions don't stop coming."],
      ['You want it explained in your language', 'No complex terms. Clear the first time.'],
      ['Scared of missing a deadline', 'No one wants a fine just for forgetting a date.'],
      ["You want to get back everything you're owed", '"Wait, did I miss something?"'],
    ],
    solutionBefore: "That's why ",
    solutionAfter: ' was born',
    solutionP: ['Not just another complicated tool.', 'A platform that helps you work as an employee or run your own business — without the extra stress.'],
    features: [
      { title: 'We explain in plain language', desc: 'No complex terms, no stress.' },
      { title: 'We show you the next step', desc: 'You always know what to do next.' },
      { title: 'We remind you of deadlines', desc: "So nothing slips through." },
      { title: 'We bring everything together', desc: 'Documents, taxes, business, FinanzOnline.' },
      { title: 'We help you find available deductions', desc: 'To get back as much as possible.' },
      { title: 'We adapt to your situation', desc: 'Because no two stories are the same.' },
    ],
    quoteLine1: "We don't replace an accountant —",
    quoteBefore: 'we help you ',
    quoteEmphasis: 'understand',
    quoteAfter: ' your own situation.',
    quoteP2: ['You save time, money, and nerves.', 'We handle the complicated part,', 'so you can focus on what really matters to you.'],
  },
  DE: {
    badge: 'Warum wir QLIXA gegründet haben',
    h2Line1: 'Wir haben einfach die Plattform gebaut,',
    h2Line2Before: 'die uns selbst ',
    h2Emphasis: 'gefehlt hat',
    p: ['Diesen Weg sind wir selbst gegangen.', 'Deshalb wissen wir, wie es sich anfühlt,', 'wenn man in Österreich neu startet — privat oder beruflich.'],
    linkText: 'Unsere Geschichte →',
    painBefore: 'Kommt dir das ',
    painEmphasis: 'bekannt vor?',
    painCards: [
      ['Angst, einen Fehler zu machen', 'Nicht weil du es nicht kannst. Sondern weil das System so kompliziert wirkt.'],
      ['Zu viele unklare Begriffe', 'Du willst, dass man es dir einfach erklärt. Ohne Buchhaltungsjargon.'],
      ['Keine Zeit, dich einzuarbeiten', 'Nach der Arbeit willst du bei deiner Familie sein, nicht abends über Formularen sitzen.'],
      ['Jede Situation ist anders', 'Einkommen. Miete. Kinder. Business. Du willst eine Lösung für genau deine Situation.'],
      ['Beratung ist teuer', 'Und die Fragen werden trotzdem nicht weniger.'],
      ['Du willst es in deiner Sprache erklärt bekommen', 'Ohne komplizierte Begriffe. Auf Anhieb verständlich.'],
      ['Angst, eine Frist zu verpassen', 'Niemand will eine Strafe zahlen, nur weil er ein Datum vergessen hat.'],
      ['Du willst dir alles zurückholen, was dir zusteht', '„Habe ich vielleicht etwas übersehen?"'],
    ],
    solutionBefore: 'Genau deshalb ist ',
    solutionAfter: ' entstanden',
    solutionP: ['Kein weiteres kompliziertes Tool.', 'Sondern eine Plattform, die dir hilft, als Angestellte:r zu arbeiten oder dein eigenes Unternehmen zu führen — ganz ohne zusätzlichen Stress.'],
    features: [
      { title: 'Wir erklären in einfacher Sprache', desc: 'Ohne komplizierte Begriffe und Stress.' },
      { title: 'Wir zeigen dir den nächsten Schritt', desc: 'Du weißt immer, was als Nächstes kommt.' },
      { title: 'Wir erinnern dich an Fristen', desc: 'Damit dir nichts durch die Lappen geht.' },
      { title: 'Wir sammeln alles an einem Ort', desc: 'Dokumente, Steuern, Business, FinanzOnline.' },
      { title: 'Wir helfen dir, mögliche Abzüge zu finden', desc: 'Damit du so viel wie möglich zurückbekommst.' },
      { title: 'Wir passen uns deiner Situation an', desc: 'Weil es nicht zwei gleiche Geschichten gibt.' },
    ],
    quoteLine1: 'Wir ersetzen keinen Steuerberater —',
    quoteBefore: 'wir sorgen dafür, dass du deine Situation selbst ',
    quoteEmphasis: 'verstehst',
    quoteAfter: '.',
    quoteP2: ['Du sparst Zeit, Geld und Nerven.', 'Wir kümmern uns um das Komplizierte,', 'und du kannst dich auf das konzentrieren, was dir wirklich wichtig ist.'],
  },
}

// Переклади CTA-секції "Починай зараз" — всі 4 мови
const CTA_TEXT: Record<string, {
  badge: string
  h2: string
  pBefore: string
  pSpan1: string
  pMid: string
  pSpan2: string
  pAfter: string
  cta: string
}> = {
  UA: {
    badge: 'Починай зараз',
    h2: 'Твоя ситуація — унікальна. Ми це розуміємо.',
    pBefore: 'Саме тому ми створюємо не ',
    pSpan1: 'універсальні шаблони',
    pMid: ' — ми допомагаємо сформувати саме ',
    pSpan2: 'ваш персональний план дій',
    pAfter: '. Чеклісти, калькулятори, звіти та рекомендації створюються на основі введених вами даних і враховують саме вашу ситуацію.',
    cta: 'Починай підготовку →',
  },
  RU: {
    badge: 'Начни сейчас',
    h2: 'Твоя ситуация — уникальна. Мы это понимаем.',
    pBefore: 'Именно поэтому мы создаём не ',
    pSpan1: 'универсальные шаблоны',
    pMid: ' — мы помогаем сформировать именно ',
    pSpan2: 'твой персональный план действий',
    pAfter: '. Чек-листы, калькуляторы, отчёты и рекомендации создаются на основе введённых тобой данных и учитывают именно твою ситуацию.',
    cta: 'Начать подготовку →',
  },
  EN: {
    badge: 'Get started now',
    h2: 'Your situation is unique. We get that.',
    pBefore: "That's why we don't build ",
    pSpan1: 'universal templates',
    pMid: ' — we help you shape ',
    pSpan2: 'your own personal action plan',
    pAfter: '. Checklists, calculators, reports, and recommendations are created based on the data you enter and reflect your specific situation.',
    cta: 'Start now →',
  },
  DE: {
    badge: 'Jetzt starten',
    h2: 'Deine Situation ist einzigartig. Das wissen wir.',
    pBefore: 'Deshalb erstellen wir keine ',
    pSpan1: 'universellen Vorlagen',
    pMid: ' — wir helfen dir, genau ',
    pSpan2: 'deinen persönlichen Aktionsplan',
    pAfter: ' zu erstellen. Checklisten, Rechner, Berichte und Empfehlungen basieren auf deinen eingegebenen Daten und berücksichtigen genau deine Situation.',
    cta: 'Jetzt starten →',
  },
}

// Переклади секції "Часті запитання" — всі 4 мови
// Фірмові іконки FAQ (замість emoji) — порядок відповідає питанням, однаковий для всіх мов
const FAQ_ICONS = [
  // 0 — боюся помилки (документ зі знаком оклику)
  <svg key="faq0" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="2" width="12" height="16" rx="1.5" stroke="#038390" strokeWidth="1.5"/>
    <path d="M10 6v5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="1" fill="#038390"/>
  </svg>,
  // 1 — найманий працівник (портфель)
  <svg key="faq1" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="7" width="16" height="10" rx="1.5" stroke="#038390" strokeWidth="1.5"/>
    <path d="M7 7V5.5C7 4.67 7.67 4 8.5 4h3c.83 0 1.5.67 1.5 1.5V7" stroke="#038390" strokeWidth="1.5"/>
    <path d="M2 11.5h16" stroke="#038390" strokeWidth="1.5"/>
  </svg>,
  // 2 — мова (мовна бульбашка)
  <svg key="faq2" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M3 4h14v9H8l-3.5 3V13H3V4z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6.5 7.5h7M6.5 10h4" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 3 — щойно відкрив бізнес (ракета)
  <svg key="faq3" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M10 2c2.5 1.5 4 4.5 4 7.5 0 2-.7 3.7-1.6 5L10 18l-2.4-3.5C6.7 13.2 6 11.5 6 9.5 6 6.5 7.5 3.5 10 2Z" stroke="#038390" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="10" cy="9" r="1.6" stroke="#038390" strokeWidth="1.5"/>
    <path d="M7.5 14.5l-2 3M12.5 14.5l2 3" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 4 — витрати (євро в колі)
  <svg key="faq4" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="#038390" strokeWidth="1.5"/>
    <path d="M12.2 7.2c-.5-.5-1.2-.8-2-.8-1.8 0-3.2 1.6-3.2 3.6s1.4 3.6 3.2 3.6c.8 0 1.5-.3 2-.8" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 9h4.5M6 11h4.5" stroke="#038390" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 5 — безпека даних (замок)
  <svg key="faq5" width="18" height="18" viewBox="0 0 20 20" fill="none">
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
      { q: 'Самозайнятий: боюся зробити помилку в декларації — що буде?', a: 'QLIXA допоможе зібрати та впорядкувати всі дані за рік, якщо ведеш бухгалтерію на платформі. Ми підкажемо, на що звернути увагу для вигіднішого заповнення — наприклад, які витрати можна списати і як правильно їх задокументувати. Проте памʼятай: QLIXA — це цифровий помічник, а не бухгалтер чи Steuerberater. Якщо маєш складну ситуацію або сумніви — рекомендуємо додатково проконсультуватись із Steuerberater.' },
      { q: 'Найманий працівник: чи можу я повернути свої податки?', a: 'В Австрії роботодавець автоматично подає базові дані про твою зарплату до податкової — але він не вникає в твою особисту ситуацію. Саме тому більшість найманих працівників можуть самостійно подати Arbeitnehmerveranlagung і повернути частину сплачених податків. QLIXA допоможе розібратись саме у твоїй ситуації: знайде всі витрати, які можна врахувати — home office, транспорт, навчання, діти та інше. Просто і швидко, без складних термінів.' },
      { q: 'Я не говорю по-німецьки — зможу розібратись?', a: 'Так, саме для цього і створена QLIXA. Платформа повністю доступна українською, російською та англійською. Всі австрійські терміни перекладені і пояснені простими словами.' },
      { q: 'Я тільки відкрив Gewerbe. З чого почати?', a: 'Вітаємо з відкриттям! Ось з чого варто почати в QLIXA: підключи бухгалтерію — фіксуй доходи і витрати з першого дня; виставляй рахунки клієнтам прямо з платформи; стеж за дашбордом — він покаже загальну картину твого бізнесу в реальному часі. А щоб не загубитись у перших кроках — читай наші покрокові гайди у розділі Статті.' },
      { q: 'Що саме я можу списати як витрати?', a: 'Дуже багато: ноутбук, телефон, інтернет, частина оренди (home office), курси, підписки на програми, транспорт до клієнтів і десятки інших категорій. QLIXA покаже всі варіанти для твоєї ситуації.' },
      { q: 'Мої фінансові дані в безпеці?', a: 'Так. Сервери в ЄС, відповідність GDPR. Ми не передаємо дані третім особам. Ти можеш видалити акаунт і всі дані в будь-який момент.' },
    ],
  },
  RU: {
    badge: 'Часто задаваемые вопросы',
    h2Before: 'Часто задаваемые ',
    h2Emphasis: 'вопросы',
    items: [
      { q: 'Самозанятый: боюсь сделать ошибку в декларации — что будет?', a: 'QLIXA поможет собрать и упорядочить все данные за год, если ведёшь бухгалтерию на платформе. Мы подскажем, на что обратить внимание для более выгодного заполнения — например, какие расходы можно списать и как правильно их задокументировать. Однако помни: QLIXA — это цифровой помощник, а не бухгалтер или Steuerberater. Если у тебя сложная ситуация или сомнения — рекомендуем дополнительно проконсультироваться со Steuerberater.' },
      { q: 'Наёмный работник: могу ли я вернуть свои налоги?', a: 'В Австрии работодатель автоматически подаёт базовые данные о твоей зарплате в налоговую — но он не вникает в твою личную ситуацию. Именно поэтому большинство наёмных работников могут самостоятельно подать Arbeitnehmerveranlagung и вернуть часть уплаченных налогов. QLIXA поможет разобраться именно в твоей ситуации: найдёт все расходы, которые можно учесть — home office, транспорт, обучение, дети и другое. Просто и быстро, без сложных терминов.' },
      { q: 'Я не говорю по-немецки — смогу разобраться?', a: 'Да, именно для этого и создана QLIXA. Платформа полностью доступна на украинском, русском и английском языках. Все австрийские термины переведены и объяснены простыми словами.' },
      { q: 'Я только открыл Gewerbe. С чего начать?', a: 'Поздравляем с открытием! Вот с чего стоит начать в QLIXA: подключи бухгалтерию — фиксируй доходы и расходы с первого дня; выставляй счета клиентам прямо с платформы; следи за дашбордом — он покажет общую картину твоего бизнеса в реальном времени. А чтобы не потеряться на первых шагах — читай наши пошаговые гайды в разделе Статьи.' },
      { q: 'Что именно я могу списать как расходы?', a: 'Очень многое: ноутбук, телефон, интернет, часть аренды (home office), курсы, подписки на программы, транспорт к клиентам и десятки других категорий. QLIXA покажет все варианты для твоей ситуации.' },
      { q: 'Мои финансовые данные в безопасности?', a: 'Да. Серверы в ЕС, соответствие GDPR. Мы не передаём данные третьим лицам. Ты можешь удалить аккаунт и все данные в любой момент.' },
    ],
  },
  EN: {
    badge: 'Frequently Asked Questions',
    h2Before: 'Frequently Asked ',
    h2Emphasis: 'Questions',
    items: [
      { q: "Self-employed: I'm afraid of making a mistake in my tax return — what happens?", a: "QLIXA helps you collect and organize all your data for the year if you keep your books on the platform. We'll point out what to pay attention to for a more favorable filing — for example, which expenses you can deduct and how to document them correctly. But remember: QLIXA is a digital assistant, not an accountant or Steuerberater. If your situation is complex or you have doubts, we recommend also consulting a Steuerberater." },
      { q: 'Employee: can I get a tax refund?', a: "In Austria, your employer automatically reports basic data about your salary to the tax office — but it doesn't take your personal situation into account. That's why most employees can file an Arbeitnehmerveranlagung themselves and get back part of the taxes they paid. QLIXA helps you figure out exactly your situation: it finds all the expenses you can claim — home office, transport, education, children, and more. Simple and fast, without complex terms." },
      { q: "I don't speak German — will I be able to manage?", a: "Yes, that's exactly why QLIXA was created. The platform is fully available in Ukrainian, Russian, and English. All Austrian terms are translated and explained in simple words." },
      { q: 'I just opened a Gewerbe. Where do I start?', a: "Congratulations on opening! Here's where to start with QLIXA: set up your bookkeeping — record income and expenses from day one; issue invoices to clients right from the platform; keep an eye on the dashboard — it shows the full picture of your business in real time. And to avoid getting lost in the first steps, read our step-by-step guides in the Articles section." },
      { q: 'What exactly can I deduct as expenses?', a: "A lot: laptop, phone, internet, part of your rent (home office), courses, software subscriptions, transport to clients, and dozens of other categories. QLIXA shows all the options for your situation." },
      { q: 'Is my financial data safe?', a: "Yes. Servers in the EU, GDPR compliant. We don't share data with third parties. You can delete your account and all your data at any time." },
    ],
  },
  DE: {
    badge: 'Häufig gestellte Fragen',
    h2Before: 'Häufig gestellte ',
    h2Emphasis: 'Fragen',
    items: [
      { q: 'Selbstständig: Ich habe Angst, einen Fehler in der Steuererklärung zu machen — was passiert dann?', a: 'QLIXA hilft dir, alle Daten des Jahres zu sammeln und zu ordnen, wenn du deine Buchhaltung auf der Plattform führst. Wir zeigen dir, worauf du für eine günstigere Erklärung achten solltest — zum Beispiel, welche Ausgaben du absetzen kannst und wie du sie richtig dokumentierst. Denk aber daran: QLIXA ist ein digitaler Assistent, kein Buchhalter oder Steuerberater. Bei einer komplexen Situation oder Zweifeln empfehlen wir zusätzlich einen Steuerberater zu konsultieren.' },
      { q: 'Angestellte/r: Kann ich meine Steuern zurückbekommen?', a: 'In Österreich meldet dein Arbeitgeber automatisch grundlegende Gehaltsdaten ans Finanzamt — geht aber nicht auf deine persönliche Situation ein. Deshalb können die meisten Angestellten selbst eine Arbeitnehmerveranlagung einreichen und einen Teil der gezahlten Steuern zurückbekommen. QLIXA hilft dir, genau deine Situation zu durchschauen: findet alle Ausgaben, die du geltend machen kannst — Home Office, Fahrtkosten, Weiterbildung, Kinder und mehr. Einfach und schnell, ohne komplizierte Begriffe.' },
      { q: 'Ich spreche kein Deutsch — komme ich trotzdem zurecht?', a: 'Ja, genau dafür wurde QLIXA entwickelt. Die Plattform ist vollständig auf Ukrainisch, Russisch und Englisch verfügbar. Alle österreichischen Begriffe sind übersetzt und einfach erklärt.' },
      { q: 'Ich habe gerade ein Gewerbe angemeldet. Wo fange ich an?', a: 'Herzlichen Glückwunsch zur Gründung! So startest du am besten mit QLIXA: Buchhaltung einrichten — erfasse Einnahmen und Ausgaben von Tag eins an; Rechnungen direkt über die Plattform an Kunden stellen; das Dashboard im Blick behalten — es zeigt dir in Echtzeit das Gesamtbild deines Business. Und damit du bei den ersten Schritten nicht den Überblick verlierst, lies unsere Schritt-für-Schritt-Anleitungen im Bereich Artikel.' },
      { q: 'Was genau kann ich als Ausgaben absetzen?', a: 'Sehr vieles: Laptop, Handy, Internet, ein Teil der Miete (Home Office), Kurse, Software-Abos, Fahrten zu Kunden und Dutzende weitere Kategorien. QLIXA zeigt dir alle Optionen für deine Situation.' },
      { q: 'Sind meine Finanzdaten sicher?', a: 'Ja. Server in der EU, DSGVO-konform. Wir geben deine Daten nicht an Dritte weiter. Du kannst dein Konto und alle Daten jederzeit löschen.' },
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
      <section style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'url(/hero/hero-bg-line.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' as const,
        padding: '20px clamp(20px,4vw,60px)', display: 'flex', alignItems: 'center', boxSizing: 'border-box' as const, height: 'calc(100vh - 114px)', overflow: 'hidden', position: 'relative' as const, zIndex: 0,
      }}>

        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', textAlign: 'center' as const }}>

          <div style={{ maxWidth: 1035, marginLeft: 'auto', marginRight: 'auto' }}>

            {/* Row 1 — image + eyebrow heading */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              {t.cards.map((card, ci) => (
                <div key={ci} style={{ textAlign: 'center' as const }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ci === 0 ? '/hero/naymanyy-hero.png' : '/hero/frilanser-hero.png'} alt="" style={{ height: 88, width: 'auto', objectFit: 'contain' as const, margin: '0 auto 5px' }} />
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>
                    {card.eyebrow}
                  </div>
                </div>
              ))}
            </div>

            {/* Big badge headline — NORMAL document flow (not absolute), with real margin above and below. Font size is smaller for RU/DE only, since their translations are longer and were overflowing the viewport at the UA/EN size. */}
            <div style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: 800,
              fontSize: lang === 'RU' ? 34 : lang === 'DE' ? 37 : 43,
              lineHeight: lang === 'RU' ? '40px' : lang === 'DE' ? '43px' : '50px',
              color: '#1A1A1A', textAlign: 'center' as const, whiteSpace: 'nowrap' as const,
              textTransform: 'capitalize' as const,
              marginTop: 21, marginBottom: 21,
            }}>
              {t.badge}
            </div>

            {/* Row 2 — highlight title + desc + checklist + button */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, marginBottom: 20, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              {t.cards.map((card, ci) => (
                <div key={ci} style={{ textAlign: 'center' as const }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 7, minHeight: 23 }}>
                    {card.title}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: '#404040', lineHeight: 1.5, marginBottom: 11, minHeight: 60 }}>
                    {card.desc}
                  </p>

                  {/* Cycling checklist — one item visible at a time */}
                  <div style={{ position: 'relative' as const, height: 30, marginBottom: 14, overflow: 'hidden' }}>
                    {card.checklist.map((item, ii) => (
                      <div key={ii} style={{
                        position: 'absolute' as const, left: 0, right: 0, textAlign: 'center' as const,
                        fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: '30px',
                        opacity: 0,
                        animation: `checklistCycle ${card.checklist.length * 2.2}s ease-in-out infinite`,
                        animationDelay: `${-ii * 2.2}s`,
                      }}>
                        ✓ {item}
                      </div>
                    ))}
                  </div>

                  <Link href={card.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9, justifyContent: 'center' as const,
                    padding: '12px 24px', background: '#038390', color: '#fff',
                    borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  }}>
                    {card.cta}
                  </Link>
                </div>
              ))}
            </div>

          </div>

          {/* Trust line */}
          <p style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontSize: 15, fontWeight: 500, color: '#404040' }}>
            {t.trust}
          </p>

        </div>
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
      <section style={{ background: '#ffffff', padding: '40px clamp(20px,6vw,80px) 26px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 14, height: 522 }}>

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

            {/* CENTER — QLIXA logo */}
            <div style={{ background: '#1A1A1A', borderRadius: 24, padding: '8px 12px', boxShadow: '4px 4px 0 #1A1A1A', border: '1.5px solid #1A1A1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 6, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/logo-name-slogan_planets_white.svg" alt="QLIXA" style={{ width: '90%', maxWidth: 220, height: 'auto' }} />
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: '#ffffff', letterSpacing: '1px', textAlign: 'center' }}>{t2.centerTagline}</div>
              </div>
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
            <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/what-is-qlixa/business.png" alt="Бізнес-помічник" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t2.cards[6][0]}</div>
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
      <section id="для-кого" style={{ background: '#FFFFFF', padding: '26px clamp(20px,6vw,80px) 26px' }}>
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
              { img: '/for-who/frilanser.png', href: '/for/frilanser' },
              { img: '/for-who/samostiynyy.png', href: '/for/samostiynyy' },
              { img: '/for-who/biznes.png', href: '/for/biznes' },
              { img: '/for-who/nerukhomist.png', href: '/for/nerukhomist' },
              { img: '/for-who/pensioner.png', href: '/for/pensioner' },
              { img: '/for-who/naymanyy.png', href: '/for/naymanyy' },
            ].map((card, i) => (
              <Link key={i} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '24px', border: '1px solid rgba(3,131,144,0.12)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(3,131,144,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.img} alt={t3.cards[i][0]} style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>{t3.cards[i][0]}</div>
                  </div>
                  <div style={{ fontSize: 15, color: '#404040', lineHeight: 1.6 }}>{t3.cards[i][1]}</div>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* ── DEMO ── */}
      <section id="demo" style={{ background: '#ffffff', padding: '26px clamp(20px,6vw,80px) 26px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.15)', border: '1px solid rgba(3,131,144,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#038390', marginBottom: 16 }}>{t4.badge}</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 0 }}>
              {t4.h2Before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t4.h2Emphasis}</em>
            </h2>
          </div>

          {/* 4 cards in a row */}
          <div id="demo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {['/how-it-works/step-1.png', '/how-it-works/step-2.png', '/how-it-works/step-3.png', '/how-it-works/step-4.png'].map((img, i) => ({
              num: String(i + 1),
              img,
              title: t4.cards[i].before + t4.cards[i].em,
              em: t4.cards[i].em,
              before: t4.cards[i].before,
              desc: t4.cards[i].desc,
            })).map((card) => (
              <div key={card.num} style={{ background: '#F0F7F8', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(3,131,144,0.15)', display: 'flex', flexDirection: 'column' }}>
                {/* Image */}
                <div style={{ width: '100%', aspectRatio: '4/3', background: '#F0F7F8', position: 'relative', overflow: 'hidden', flexShrink: 0, padding: 32, boxSizing: 'border-box' as const }}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />

                </div>
                {/* Text */}
                <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.3px', margin: 0 }}>
                    {card.before}<em style={{ fontStyle: 'italic', color: '#038390' }}>{card.em}</em>
                  </h3>
                  <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
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
      <section style={{ background: '#ffffff', padding: '26px clamp(20px,6vw,80px) 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* BLOCK 1 — Story header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 20 }}>{t5.badge}</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 20 }}>
                {t5.h2Line1}<br/>{t5.h2Line2Before}{' '}
                <em style={{ fontStyle: 'italic', color: '#038390' }}>{t5.h2Emphasis}</em>
              </h2>
              <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, maxWidth: 520 }}>
                {t5.p[0]}<br/>
                {t5.p[1]}<br/>
                {t5.p[2]}
              </p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 15, fontWeight: 600, color: '#038390', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.textDecoration = 'underline'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.textDecoration = 'none'}>
                {t5.linkText}
              </Link>
            </div>
            <div style={{ flex: '0 0 500px', display: 'flex', alignItems: 'center' }}>
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

          {/* BLOCK 3 — QLIXA solution */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(30px,3.4vw,46px)', fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
              {t5.solutionBefore}<span style={{ color: '#038390', fontWeight: 700 }}>QLIXA</span>{t5.solutionAfter}
            </h3>
            <p style={{ fontSize: 16, color: '#595959', maxWidth: 600, margin: '0 auto' }}>
              {t5.solutionP[0]}<br/>
              {t5.solutionP[1]}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'stretch' }}>

            {/* Left — feature list */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20, background: '#F0F7F8', borderRadius: 24, padding: 28, boxShadow: '0 8px 40px rgba(3,131,144,0.10)' }}>
              {t5.features.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: '0 2px 8px rgba(3,131,144,0.08)' }}>
                    {WHY_ICONS[i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: '#404040', lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — quote card */}
            <div style={{ background: '#F0F7F8', borderRadius: 24, padding: 28, boxShadow: '0 8px 40px rgba(3,131,144,0.10)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/why-qlixa/laptop.png" alt="" style={{ width: '55%', height: 'auto', objectFit: 'contain', display: 'block', marginBottom: 16 }}/>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.4, textAlign: 'center', marginBottom: 16 }}>
                {t5.quoteLine1}<br/>
                {t5.quoteBefore}
                <em style={{ color: '#038390' }}>{t5.quoteEmphasis}</em>
                {t5.quoteAfter}
              </p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, textAlign: 'center', marginBottom: 24 }}>
                {t5.quoteP2[0]}<br/>
                {t5.quoteP2[1]}<br/>
                {t5.quoteP2[2]}
              </p>
            </div>

          </div>
        </div>
            </section>


      {/* ARTICLES */}
      <ArticlesSlider published={published} upcoming={upcoming} lang={lang} />

      {/* ── REVIEWS ── */}
      <ReviewsSection lang={lang} />

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', padding: '20px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>{t6.badge}</div>
        <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#fff', margin: '0 0 16px 0', letterSpacing: '-1px' }}>
          {t6.h2}
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>{t6.pBefore}<span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 3, padding: '1px 4px' }}>{t6.pSpan1}</span>{t6.pMid}<span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 3, padding: '1px 4px', fontWeight: 700 }}>{t6.pSpan2}</span>{t6.pAfter}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/pricing" style={{ padding: '16px 36px', borderRadius: 999, fontSize: 16, fontWeight: 600, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-block' }}>
            {t6.cta}
          </Link>
        </div>
      </section>

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
