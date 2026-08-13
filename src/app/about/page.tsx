'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const ABOUT_TEXT: Record<string, any> = {
  UA: {
    badge: 'Про нас',
    h1Line1: 'Привіт!',
    h1Line2: 'Ми — Іра та Іра. 👋',
    heroP: 'Ми дві мами, які переїхали з України до Австрії у 2022 році. Як і тисячі інших людей, ми починали все з нуля. Нова країна, нові правила, нова мова, нова податкова система. Ми хотіли працювати, розвивати власну справу та бути впевненими, що робимо все правильно.',
    b1p1Before: 'Але дуже швидко зрозуміли: ',
    b1p1Hi: 'австрійська бюрократія — це майже окремий вид спорту',
    b1p1After: '. 😄',
    b1p2Before: 'Як відкрити Gewerbe? Коли потрібно реєструватися в SVS? Як працює FinanzOnline? Які звіти потрібно подавати? Що можна списати на витрати? Як не пропустити важливий дедлайн? І найголовніше — ',
    b1p2Hi: 'чому все це не можна було написати простими словами',
    b1p2After: '?',
    b2Bold: 'Ми шукали відповіді всюди',
    b2Mid: '. Читали офіційні сайти, відвідували семінари, спілкувалися зі спеціалістами, вивчали закони, перекладали документи, перевіряли інформацію з різних джерел і ',
    b2Underline: 'крок за кроком будували власне розуміння австрійської системи',
    b2After: '.',
    qP1: 'Паралельно ми відкрили самозайнятість в Австрії, працювали, подавали звітність, вчилися вести облік, планувати податки та не пропускати важливі дати. Ми добре знаємо, як це — коли в поштовій скриньці з\'являється лист від Finanzamt, а ти відкриваєш його з думкою: ',
    qP1Hi: '«Сподіваємося, цього разу нічого страшного...»',
    qP1After: ' 😅',
    qP2Before: 'Ми знаємо, як це — ',
    qP2Italic: 'годинами шукати відповідь на одне просте запитання',
    qP2Mid: '. Як ',
    qP2Box: 'десять хвилин читати один абзац німецькою і все одно не зрозуміти',
    qP2After: ', що саме від тебе хочуть.',
    b3Before: 'Саме тоді ми випадково познайомилися. ',
    b3Bold: "Нас об'єднало бажання розібратися в системі та зробити її зрозумілішою",
    b3After: '. Ми почали допомагати одна одній, ділитися знахідками, створювати власні таблиці, чек-листи, нагадування та шаблони, які спрощували щоденну роботу.',
    b4p1: 'Спочатку ми робили все це лише для себе.',
    b4p2: 'Потім для друзів.',
    b4p3: 'Потім для знайомих.',
    b4p4Before: 'А потім зрозуміли, що ',
    b4p4Hi: 'таких, як ми, — тисячи',
    b4p4Mid: '. Щороку нові підприємці, фрилансери, самозайняті, наймані працівники та люди, які тільки починають свій шлях в Австрії, ставлять одні й ті самі запитання, ',
    b4p4Underline: 'губляться серед десятків офіційних сайтів і витрачають години на пошук інформації',
    b4p4After: '.',
    bornBefore: 'Так народилася ',
    bornEm: 'QLIXA.',
    m1Before: 'Ми створюємо ',
    m1U1: 'не бухгалтерську програму',
    m1Mid1: ' і ',
    m1Hi: 'не замінюємо податкового консультанта',
    m1Mid2: '. Ми створюємо ',
    m1Bold: 'зрозумілу автоматизовану платформу',
    m1Mid3: ', яка допомагає підприємцям, самозайнятим та найманим працівникам ',
    m1Border: 'організувати фінанси, не пропускати важливі дедлайни, користуватися готовими шаблонами, автоматизувати рутинні процеси та краще розуміти австрійську систему',
    m1After: '.',
    m2Before: 'Кожен шаблон, калькулятор, інструкцію та чек-лист ми створюємо так, ',
    m2Italic: 'ніби пояснюємо все своїй подрузі за чашкою кави. Просто. Людською мовою. Без зайвої бюрократії та складних термінів.',
    belief1Before: 'Ми не віримо, що ',
    belief1Serif: 'підприємець повинен бути бухгалтером, щоб успішно вести свою справу',
    belief1After: '.',
    belief2Before: 'Ми віримо, що ',
    belief2Bold: "кожен повинен розуміти свої фінанси, знати свої обов'язки, не боятися офіційних листів і почуватися впевнено",
    belief2After: '.',
    learning: 'Ми продовжуємо навчатися щодня. Відвідуємо семінари, вивчаємо зміни в законодавстві, аналізуємо офіційні джерела, тестуємо власні рішення та постійно вдосконалюємо QLIXA. Бо австрійська система змінюється, а разом із нею змінюємося й ми.',
    d1Before: 'Ми щиро віримо, що ',
    d1Box: 'бізнес має приносити задоволення, а не постійний стрес через документи та податки',
    d1After: '.',
    d2: 'Якщо завдяки QLIXA ви зможете витрачати менше часу на бюрократію і більше часу приділяти своїй справі, родині, дітям чи відпочинку — значить, ми створили цей проєкт недаремно.',
    d3Before: 'І якщо одного дня ',
    d3Underline: 'лист від Finanzamt більше не викликатиме легку паніку',
    d3After: ', а стане просто ще одним повідомленням у вашому списку справ — ми будемо знати, що все було недарма. 😊',
    signoff1: 'Ласкаво просимо до QLIXA!',
    signoff2: 'Ми дуже раді, що ви тут.',
    signoff3: "З любов’ю, Іра & Іра ❤️🤍❤️",
  },
  RU: {
    badge: 'О нас',
    h1Line1: 'Привет!',
    h1Line2: 'Мы — Ира и Ира. 👋',
    heroP: 'Мы две мамы, которые переехали из Украины в Австрию в 2022 году. Как и тысячи других людей, мы начинали всё с нуля. Новая страна, новые правила, новый язык, новая налоговая система. Мы хотели работать, развивать своё дело и быть уверенными, что делаем всё правильно.',
    b1p1Before: 'Но очень быстро поняли: ',
    b1p1Hi: 'австрийская бюрократия — это почти отдельный вид спорта',
    b1p1After: '. 😄',
    b1p2Before: 'Как открыть Gewerbe? Когда нужно регистрироваться в SVS? Как работает FinanzOnline? Какие отчёты нужно подавать? Что можно списать на расходы? Как не пропустить важный дедлайн? И самое главное — ',
    b1p2Hi: 'почему всё это нельзя было написать простыми словами',
    b1p2After: '?',
    b2Bold: 'Мы искали ответы везде',
    b2Mid: '. Читали официальные сайты, посещали семинары, общались со специалистами, изучали законы, переводили документы, проверяли информацию из разных источников и ',
    b2Underline: 'шаг за шагом выстраивали собственное понимание австрийской системы',
    b2After: '.',
    qP1: 'Параллельно мы открыли самозанятость в Австрии, работали, подавали отчётность, учились вести учёт, планировать налоги и не пропускать важные даты. Мы хорошо знаем, каково это — когда в почтовом ящике появляется письмо от Finanzamt, а ты открываешь его с мыслью: ',
    qP1Hi: '«Надеемся, на этот раз ничего страшного...»',
    qP1After: ' 😅',
    qP2Before: 'Мы знаем, каково это — ',
    qP2Italic: 'часами искать ответ на один простой вопрос',
    qP2Mid: '. Как ',
    qP2Box: 'десять минут читать один абзац на немецком и всё равно не понять',
    qP2After: ', что именно от тебя хотят.',
    b3Before: 'Именно тогда мы случайно познакомились. ',
    b3Bold: 'Нас объединило желание разобраться в системе и сделать её понятнее',
    b3After: '. Мы начали помогать друг другу, делиться находками, создавать собственные таблицы, чек-листы, напоминания и шаблоны, которые упрощали повседневную работу.',
    b4p1: 'Сначала мы делали всё это только для себя.',
    b4p2: 'Потом для друзей.',
    b4p3: 'Потом для знакомых.',
    b4p4Before: 'А потом поняли, что ',
    b4p4Hi: 'таких, как мы, — тысячи',
    b4p4Mid: '. Каждый год новые предприниматели, фрилансеры, самозанятые, наёмные работники и люди, которые только начинают свой путь в Австрии, задают одни и те же вопросы, ',
    b4p4Underline: 'теряются среди десятков официальных сайтов и тратят часы на поиск информации',
    b4p4After: '.',
    bornBefore: 'Так родилась ',
    bornEm: 'QLIXA.',
    m1Before: 'Мы создаём ',
    m1U1: 'не бухгалтерскую программу',
    m1Mid1: ' и ',
    m1Hi: 'не заменяем налогового консультанта',
    m1Mid2: '. Мы создаём ',
    m1Bold: 'понятную автоматизированную платформу',
    m1Mid3: ', которая помогает предпринимателям, самозанятым и наёмным работникам ',
    m1Border: 'организовать финансы, не пропускать важные дедлайны, пользоваться готовыми шаблонами, автоматизировать рутинные процессы и лучше понимать австрийскую систему',
    m1After: '.',
    m2Before: 'Каждый шаблон, калькулятор, инструкцию и чек-лист мы создаём так, ',
    m2Italic: 'будто объясняем всё своей подруге за чашкой кофе. Просто. Человеческим языком. Без лишней бюрократии и сложных терминов.',
    belief1Before: 'Мы не верим, что ',
    belief1Serif: 'предприниматель должен быть бухгалтером, чтобы успешно вести своё дело',
    belief1After: '.',
    belief2Before: 'Мы верим, что ',
    belief2Bold: 'каждый должен понимать свои финансы, знать свои обязанности, не бояться официальных писем и чувствовать себя уверенно',
    belief2After: '.',
    learning: 'Мы продолжаем учиться каждый день. Посещаем семинары, изучаем изменения в законодательстве, анализируем официальные источники, тестируем собственные решения и постоянно совершенствуем QLIXA. Потому что австрийская система меняется, а вместе с ней меняемся и мы.',
    d1Before: 'Мы искренне верим, что ',
    d1Box: 'бизнес должен приносить удовольствие, а не постоянный стресс из-за документов и налогов',
    d1After: '.',
    d2: 'Если благодаря QLIXA вы сможете тратить меньше времени на бюрократию и больше времени уделять своему делу, семье, детям или отдыху — значит, мы создали этот проект не зря.',
    d3Before: 'И если однажды ',
    d3Underline: 'письмо от Finanzamt больше не будет вызывать лёгкую панику',
    d3After: ', а станет просто ещё одним пунктом в вашем списке дел — мы будем знать, что всё было не зря. 😊',
    signoff1: 'Добро пожаловать в QLIXA!',
    signoff2: 'Мы очень рады, что вы здесь.',
    signoff3: 'С любовью, Ира & Ира ❤️🤍❤️',
  },
  EN: {
    badge: 'About Us',
    h1Line1: 'Hi there!',
    h1Line2: "We're Ira and Ira. 👋",
    heroP: 'We are two moms who moved from Ukraine to Austria in 2022. Like thousands of others, we started from scratch. A new country, new rules, a new language, a new tax system. We wanted to work, build our own business, and be confident we were doing everything right.',
    b1p1Before: 'But we quickly realized: ',
    b1p1Hi: 'Austrian bureaucracy is basically its own sport',
    b1p1After: '. 😄',
    b1p2Before: "How do you open a Gewerbe? When do you need to register with SVS? How does FinanzOnline work? Which reports do you need to file? What expenses can you deduct? How do you not miss an important deadline? And most importantly — ",
    b1p2Hi: "why couldn't any of this be explained in plain language",
    b1p2After: '?',
    b2Bold: 'We looked for answers everywhere',
    b2Mid: '. We read official websites, attended seminars, talked to specialists, studied the laws, translated documents, cross-checked information from different sources, and ',
    b2Underline: 'built our own understanding of the Austrian system, step by step',
    b2After: '.',
    qP1: "At the same time, we registered as self-employed in Austria, worked, filed reports, and learned to keep books, plan taxes, and not miss important dates. We know exactly what it's like when a letter from the Finanzamt shows up in your mailbox, and you open it thinking: ",
    qP1Hi: '"Hopefully nothing bad this time..."',
    qP1After: ' 😅',
    qP2Before: "We know what it's like — ",
    qP2Italic: 'spending hours looking for the answer to one simple question',
    qP2Mid: '. Or ',
    qP2Box: 'spending ten minutes reading one paragraph in German and still not understanding',
    qP2After: ' exactly what they want from you.',
    b3Before: "That's when we happened to meet. ",
    b3Bold: 'We were united by the desire to figure out the system and make it clearer',
    b3After: '. We started helping each other, sharing what we found, and creating our own spreadsheets, checklists, reminders, and templates that made everyday work easier.',
    b4p1: 'At first, we did all of this just for ourselves.',
    b4p2: 'Then for friends.',
    b4p3: 'Then for acquaintances.',
    b4p4Before: 'And then we realized that ',
    b4p4Hi: 'there are thousands of people like us',
    b4p4Mid: '. Every year, new entrepreneurs, freelancers, self-employed people, employees, and people just starting their journey in Austria ask the same questions, ',
    b4p4Underline: 'get lost among dozens of official websites, and spend hours searching for information',
    b4p4After: '.',
    bornBefore: "And that's how ",
    bornEm: 'QLIXA was born.',
    m1Before: "We're not building ",
    m1U1: 'an accounting program',
    m1Mid1: ", and we're not ",
    m1Hi: 'replacing a tax advisor',
    m1Mid2: ". We're building ",
    m1Bold: 'a clear, automated platform',
    m1Mid3: ' that helps entrepreneurs, self-employed people, and employees ',
    m1Border: 'organize their finances, never miss important deadlines, use ready-made templates, automate routine tasks, and better understand the Austrian system',
    m1After: '.',
    m2Before: 'We create every template, calculator, guide, and checklist as if ',
    m2Italic: 'we were explaining it to a friend over a cup of coffee. Simply. In plain language. Without unnecessary bureaucracy or complex terms.',
    belief1Before: "We don't believe that ",
    belief1Serif: 'an entrepreneur has to be an accountant to run a successful business',
    belief1After: '.',
    belief2Before: 'We believe that ',
    belief2Bold: 'everyone should understand their finances, know their obligations, not be afraid of official letters, and feel confident',
    belief2After: '.',
    learning: 'We keep learning every day. We attend seminars, study changes in legislation, analyze official sources, test our own solutions, and constantly improve QLIXA. Because the Austrian system keeps changing, and so do we.',
    d1Before: 'We truly believe that ',
    d1Box: 'running a business should bring you joy, not constant stress over paperwork and taxes',
    d1After: '.',
    d2: "If QLIXA helps you spend less time on bureaucracy and more time on your business, your family, your kids, or simply resting — then we didn't build this project for nothing.",
    d3Before: 'And if one day ',
    d3Underline: 'a letter from the Finanzamt no longer triggers a flash of panic',
    d3After: " and becomes just another item on your to-do list — we'll know it was all worth it. 😊",
    signoff1: 'Welcome to QLIXA!',
    signoff2: "We're so glad you're here.",
    signoff3: 'With love, Ira & Ira ❤️🤍❤️',
  },
  DE: {
    badge: 'Über uns',
    h1Line1: 'Hallo!',
    h1Line2: 'Wir sind Ira und Ira. 👋',
    heroP: 'Wir sind zwei Mütter, die 2022 aus der Ukraine nach Österreich gezogen sind. Wie Tausende andere haben wir bei null angefangen. Ein neues Land, neue Regeln, eine neue Sprache, ein neues Steuersystem. Wir wollten arbeiten, unser eigenes Business aufbauen und sicher sein, dass wir alles richtig machen.',
    b1p1Before: 'Aber wir haben sehr schnell verstanden: ',
    b1p1Hi: 'österreichische Bürokratie ist fast eine eigene Sportart',
    b1p1After: '. 😄',
    b1p2Before: 'Wie meldet man ein Gewerbe an? Wann muss man sich bei der SVS anmelden? Wie funktioniert FinanzOnline? Welche Berichte muss man einreichen? Was kann man als Ausgaben absetzen? Wie verpasst man keine wichtige Frist? Und vor allem — ',
    b1p2Hi: 'warum konnte das nicht einfach in klarer Sprache erklärt werden',
    b1p2After: '?',
    b2Bold: 'Überall haben wir nach Antworten gesucht',
    b2Mid: '. Wir haben offizielle Websites gelesen, Seminare besucht, mit Expert:innen gesprochen, Gesetze studiert, Dokumente übersetzt, Informationen aus verschiedenen Quellen überprüft und uns ',
    b2Underline: 'Schritt für Schritt unser eigenes Verständnis des österreichischen Systems aufgebaut',
    b2After: '.',
    qP1: 'Parallel dazu haben wir uns in Österreich selbstständig gemacht, gearbeitet, Berichte eingereicht und gelernt, Buch zu führen, Steuern zu planen und wichtige Termine nicht zu verpassen. Wir wissen genau, wie es ist, wenn ein Brief vom Finanzamt im Briefkasten liegt und du ihn mit dem Gedanken öffnest: ',
    qP1Hi: '„Hoffentlich ist es diesmal nichts Schlimmes ..."',
    qP1After: ' 😅',
    qP2Before: 'Wir wissen, wie es ist — ',
    qP2Italic: 'stundenlang die Antwort auf eine einzige einfache Frage zu suchen',
    qP2Mid: '. Oder ',
    qP2Box: 'zehn Minuten einen Absatz auf Deutsch zu lesen und trotzdem nicht zu verstehen',
    qP2After: ', was genau von dir verlangt wird.',
    b3Before: 'Genau da haben wir uns zufällig kennengelernt. ',
    b3Bold: 'Uns hat der Wunsch verbunden, das System zu verstehen und es klarer zu machen',
    b3After: '. Wir haben angefangen, uns gegenseitig zu helfen, Erkenntnisse zu teilen und eigene Tabellen, Checklisten, Erinnerungen und Vorlagen zu erstellen, die den Alltag erleichtert haben.',
    b4p1: 'Zuerst haben wir das alles nur für uns selbst gemacht.',
    b4p2: 'Dann für Freund:innen.',
    b4p3: 'Dann für Bekannte.',
    b4p4Before: 'Und dann haben wir verstanden, dass ',
    b4p4Hi: 'es Tausende wie uns gibt',
    b4p4Mid: '. Jedes Jahr stellen sich neue Unternehmer:innen, Freelancer, Selbstständige, Angestellte und Menschen, die gerade erst in Österreich starten, dieselben Fragen, ',
    b4p4Underline: 'verlieren sich unter Dutzenden offiziellen Websites und verbringen Stunden mit der Suche nach Informationen',
    b4p4After: '.',
    bornBefore: 'So ist ',
    bornEm: 'QLIXA entstanden.',
    m1Before: 'Wir bauen ',
    m1U1: 'kein Buchhaltungsprogramm',
    m1Mid1: ' und wir ',
    m1Hi: 'ersetzen keinen Steuerberater',
    m1Mid2: '. Wir bauen ',
    m1Bold: 'eine klare, automatisierte Plattform',
    m1Mid3: ', die Unternehmer:innen, Selbstständigen und Angestellten hilft, ',
    m1Border: 'ihre Finanzen zu organisieren, wichtige Fristen nicht zu verpassen, fertige Vorlagen zu nutzen, Routineaufgaben zu automatisieren und das österreichische System besser zu verstehen',
    m1After: '.',
    m2Before: 'Jede Vorlage, jeden Rechner, jede Anleitung und jede Checkliste erstellen wir so, ',
    m2Italic: 'als würden wir es einer Freundin bei einem Kaffee erklären. Einfach. In klarer Sprache. Ohne unnötige Bürokratie und komplizierte Begriffe.',
    belief1Before: 'Wir glauben nicht, dass ',
    belief1Serif: 'man als Unternehmer:in Buchhalter:in sein muss, um erfolgreich zu sein',
    belief1After: '.',
    belief2Before: 'Wir glauben, dass ',
    belief2Bold: 'jede:r seine Finanzen verstehen, seine Pflichten kennen, keine Angst vor offiziellen Briefen haben und sich sicher fühlen sollte',
    belief2After: '.',
    learning: 'Wir lernen jeden Tag weiter. Wir besuchen Seminare, verfolgen Gesetzesänderungen, analysieren offizielle Quellen, testen unsere eigenen Lösungen und verbessern QLIXA ständig. Denn das österreichische System verändert sich — und wir uns mit ihm.',
    d1Before: 'Wir glauben fest daran, dass ',
    d1Box: 'ein Business Freude bringen sollte, statt ständigem Stress wegen Dokumenten und Steuern',
    d1After: '.',
    d2: 'Wenn Sie dank QLIXA weniger Zeit mit Bürokratie verbringen und mehr Zeit für Ihr Business, Ihre Familie, Ihre Kinder oder Erholung haben — dann haben wir dieses Projekt nicht umsonst gemacht.',
    d3Before: 'Und wenn ein Brief vom Finanzamt eines Tages ',
    d3Underline: 'keine leichte Panik mehr auslöst',
    d3After: ', sondern einfach nur ein weiterer Punkt auf Ihrer To-do-Liste ist — dann wissen wir, dass es sich gelohnt hat. 😊',
    signoff1: 'Willkommen bei QLIXA!',
    signoff2: 'Wir freuen uns sehr, dass Sie hier sind.',
    signoff3: 'Mit Liebe, Ira & Ira ❤️🤍❤️',
  },
}

export default function AboutPage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const updateLang = () => {
      const l = localStorage.getItem('qlixa-lang')
      if (l) setLang(l.toUpperCase())
    }
    updateLang()
    window.addEventListener('qlixa-lang-change', updateLang)
    return () => window.removeEventListener('qlixa-lang-change', updateLang)
  }, [])

  const t = ABOUT_TEXT[lang] || ABOUT_TEXT.UA

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: '#F0F7F8', padding: '72px clamp(20px,6vw,80px) 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 52 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 24 }}>{t.badge}</div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 24 }}>
              {t.h1Line1}<br/>{t.h1Line2}
            </h1>
            <p style={{ fontSize: 'clamp(16px,1.5vw,20px)', color: '#595959', lineHeight: 1.8, maxWidth: 480 }}>
              {t.heroP}
            </p>
          </div>
          <div style={{ flex: '0 0 320px', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/ira-and-ira.png" alt="Іра та Іра — засновниці QLIXA" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px clamp(20px,6vw,80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 56 }}>

          {/* Block 1 — бюрократія */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 16 }}>
                {t.b1p1Before}<span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3 }}>{t.b1p1Hi}</span>{t.b1p1After}
              </p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                {t.b1p2Before}<span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3 }}>{t.b1p2Hi}</span>{t.b1p2After}
              </p>
            </div>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/confused-moms.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* Block 2 — шукали відповіді */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/studying-moms.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                <span style={{ fontWeight: 700, fontSize: '1.05em' }}>{t.b2Bold}</span>{t.b2Mid}<span style={{ textDecoration: 'underline', textDecorationColor: '#038390', textDecorationThickness: 3, textUnderlineOffset: 4 }}>{t.b2Underline}</span>{t.b2After}
              </p>
            </div>
          </div>

          {/* Quote block */}
          <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '36px 40px', borderLeft: '4px solid #038390' }}>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 }}>
              {t.qP1}<span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3 }}>{t.qP1Hi}</span>{t.qP1After}
            </p>
            <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.8 }}>
              {t.qP2Before}<span style={{ fontStyle: 'italic', fontWeight: 600 }}>{t.qP2Italic}</span>{t.qP2Mid}<span style={{ background: 'rgba(3,131,144,0.08)', border: '1px solid rgba(3,131,144,0.2)', borderRadius: 6, padding: '1px 6px' }}>{t.qP2Box}</span>{t.qP2After}
            </p>
          </div>

          {/* Block 3 — познайомилися */}
          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            {t.b3Before}<span style={{ fontWeight: 700, color: '#038390' }}>{t.b3Bold}</span>{t.b3After}
          </p>

          {/* Block 4 — для друзів */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>{t.b4p1}</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>{t.b4p2}</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 12 }}>{t.b4p3}</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
                {t.b4p4Before}<span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3, fontWeight: 700 }}>{t.b4p4Hi}</span>{t.b4p4Mid}<span style={{ textDecoration: 'underline', textDecorationColor: '#038390', textDecorationThickness: 3, textUnderlineOffset: 4 }}>{t.b4p4Underline}</span>{t.b4p4After}
              </p>
            </div>
            <div style={{ flex: '0 0 260px', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/helping-friends.png" alt="" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* QLIXA born */}
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: '#1A1A1A' }}>
              {t.bornBefore}<em style={{ color: '#038390', fontStyle: 'italic' }}>{t.bornEm}</em>
            </h2>
          </div>

          {/* Mission */}
          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            {t.m1Before}<span style={{ textDecoration: 'underline', textDecorationColor: '#038390', textDecorationThickness: 3, textUnderlineOffset: 4 }}>{t.m1U1}</span>{t.m1Mid1}<span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3 }}>{t.m1Hi}</span>{t.m1Mid2}<span style={{ fontWeight: 700, color: '#038390' }}>{t.m1Bold}</span>{t.m1Mid3}<span style={{ borderBottom: '2px solid #038390', paddingBottom: 1 }}>{t.m1Border}</span>{t.m1After}
          </p>

          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            {t.m2Before}<span style={{ fontStyle: 'italic', fontWeight: 600, color: '#1A1A1A' }}>{t.m2Italic}</span>
          </p>

          {/* Beliefs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/stressed-accountant.png" alt="Стрес від паперів та бухгалтерії" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}/>
              <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75 }}>
                {t.belief1Before}<span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '1.15em', fontWeight: 400, color: '#1A1A1A' }}>{t.belief1Serif}</span>{t.belief1After}
              </p>
            </div>
            <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/relaxed-person.png" alt="" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}/>
              <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75 }}>
                {t.belief2Before}<span style={{ fontWeight: 700, color: '#038390' }}>{t.belief2Bold}</span>{t.belief2After}
              </p>
            </div>
          </div>

          <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85 }}>
            {t.learning}
          </p>

          {/* Light block */}
          <div style={{ background: '#F0F7F8', borderRadius: 20, padding: '40px 44px' }}>
            <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 20 }}>
              {t.d1Before}<span style={{ display: 'inline', background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.3)', borderRadius: 6, padding: '2px 8px' }}>{t.d1Box}</span>{t.d1After}
            </p>
            <p style={{ fontSize: 17, color: '#1A1A1A', lineHeight: 1.85, marginBottom: 20 }}>
              {t.d2}
            </p>
            <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.85 }}>
              {t.d3Before}<span style={{ textDecoration: 'underline', textDecorationColor: '#038390', textDecorationThickness: 3, textUnderlineOffset: 4 }}>{t.d3Underline}</span>{t.d3After}
            </p>
          </div>

          {/* Sign-off */}
          <div style={{ textAlign: 'center', padding: '24px 0 12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/heart-moms.png" alt="" style={{ width: 200, height: 'auto', objectFit: 'contain', margin: '0 auto 24px', display: 'block' }}/>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
              {t.signoff1}
            </p>
            <p style={{ fontSize: 18, color: '#595959', marginBottom: 24 }}>
              {t.signoff2}
            </p>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 30, color: '#038390' }}>
              {t.signoff3}
            </p>
          </div>

        </div>
      </section>

    </main>
      <Footer />
    </div>
  )
}
