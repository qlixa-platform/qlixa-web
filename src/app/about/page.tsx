'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ————————————————————————————————————————————————————————————————
// /about — one shared structure/JSX for all 4 locales. The UA copy below
// is the approved, final source of truth (redesigned: shorter, editorial,
// 1080px card grid, 5-card "we looked for answers" strip, free-first
// section, etc.) — DE/EN/RU translate that same approved structure, not
// the old long-form layout this page used to have.
// ————————————————————————————————————————————————————————————————

type AboutFlowItem = { title: string; price: string; note: string }
type AboutYearCard = { title: string; desc: string }
type AboutGridItem = { label: string; icon: AboutIconName }

type AboutContent = {
  badge: string
  h1Line1: string
  h1Line2: string
  heroAlt: string
  heroP1: string
  heroP2: string

  s2Heading: string
  s2Lines: string[]
  s2Before: string
  s2Highlight: string

  s3Heading: string
  s3Grid: AboutGridItem[]
  s3After: string

  s4P1: string
  s4P2: string
  s4Before: string
  s4Quote: string
  s4Small: string

  s5P1: string
  s5Highlight: string
  s5P2: string

  s6Timeline: string[]
  s6P1: string
  s6P2: string
  s6P3: string

  s7HeadingBefore: string
  s7HeadingEm: string
  s7P1: string
  s7P1Em: string
  s7P2: string
  s7Pills: string[]
  s7P3: string
  s7P4: string
  s7Quote: string
  s7P5: string
  s7P6: string
  s7P7: string

  s8Heading: string
  s8P1: string
  s8Items: AboutFlowItem[]
  s8P2: string
  s8P3: string
  s8P4: string
  s8Highlight: string

  s9Heading: string
  s9Body: string
  s9Cards: AboutYearCard[]
  s9Bottom: string

  s10Heading: string
  s10Body: string
  s10List: string[]

  s11Card1: string
  s11Card2: string

  s12Heading: string
  s12P1: string
  s12P2: string
  s12P3: string
  s12P4: string

  belief1Alt: string

  s13Legal1: string
  s13Legal2: string

  s14P1: string
  s14P2: string
  signoff1: string
  signoff2: string
  signoff3: string
}

const ABOUT: Record<'UA' | 'RU' | 'EN' | 'DE', AboutContent> = {
  UA: {
    badge: 'Про нас',
    h1Line1: 'Привіт!',
    h1Line2: 'Ми — Іра та Іра. 👋',
    heroAlt: 'Іра та Іра — засновниці QLIXA',
    heroP1: 'Ми дві мами, які переїхали з України до Австрії у 2022 році. Як і багато інших людей, починали все з нуля: нова країна, нові правила, нова мова й нова податкова система.',
    heroP2: 'Ми просто хотіли працювати, розвивати свою справу й бути впевненими, що робимо все правильно.',

    s2Heading: 'Австрійська бюрократія — майже окремий вид спорту. 😄',
    s2Lines: [
      'Як відкрити Gewerbe?',
      'Коли потрібно реєструватися в SVS?',
      'Як працює FinanzOnline?',
      'Що може бути релевантним для податкової декларації?',
      'Як не пропустити важливий дедлайн?',
    ],
    s2Before: 'І найголовніше —',
    s2Highlight: 'чому все це не можна було пояснити простими словами?',

    s3Heading: 'Ми шукали відповіді всюди.',
    s3Grid: [
      { label: 'Офіційні джерела', icon: 'doc' },
      { label: 'Семінари', icon: 'seminar' },
      { label: 'Фахівці', icon: 'people' },
      { label: 'Документи', icon: 'file' },
      { label: 'Перевірка інформації', icon: 'check' },
    ],
    s3After: 'Крок за кроком ми будували власне розуміння того, як працює австрійська система.',

    s4P1: 'Паралельно ми відкрили самозайнятість в Австрії, працювали, подавали звітність, вчилися вести облік і планувати податки.',
    s4P2: 'Ми дуже добре знаємо той момент, коли в поштовій скриньці з’являється лист від Finanzamt.',
    s4Before: 'І перша думка —',
    s4Quote: '«Сподіваємося, цього разу нічого страшного...» 😅',
    s4Small: 'Ми знаємо, як це — годинами шукати відповідь на одне просте запитання або перечитувати один абзац німецькою й усе одно не бути впевненими, що правильно зрозуміли, що від тебе потрібно.',

    s5P1: 'Саме тоді ми випадково познайомилися.',
    s5Highlight: 'Нас об’єднало бажання розібратися в системі та зробити складні речі зрозумілішими.',
    s5P2: 'Ми почали допомагати одна одній, ділитися знахідками, створювати власні таблиці, чек-листи, нагадування та шаблони, які спрощували щоденну роботу.',

    s6Timeline: ['Для себе', 'Для друзів', 'Для знайомих', 'QLIXA'],
    s6P1: 'А потім ми зрозуміли: ми точно не одні.',
    s6P2: 'Підприємці, самозайняті, наймані працівники та люди з різними джерелами доходу стикаються з дуже схожими запитаннями.',
    s6P3: 'І так само витрачають багато часу, намагаючись зібрати зрозумілу інформацію з різних джерел.',

    s7HeadingBefore: 'Так народилася ',
    s7HeadingEm: 'QLIXA.',
    s7P1: 'Ми постійно ловили себе на одній думці:',
    s7P1Em: 'а чому все це взагалі має бути настільки складно?',
    s7P2: 'Уявіть, що замість незрозумілих податкових форм, десятків полів і термінів німецькою вам просто ставлять звичайні запитання.',
    s7Pills: ['Працювали за наймом?', 'Мали власну діяльність?', 'Їздили у відрядження?', 'Купували щось для роботи?', 'Маєте дітей?', 'Були інші доходи?'],
    s7P3: 'Ви просто відповідаєте так, як є у вашому житті.',
    s7P4: 'А далі ця інформація поступово складається у структуру податкової декларації.',
    s7Quote: 'Саме такого інструменту нам колись дуже не вистачало.',
    s7P5: 'Не такого, для якого спочатку треба вивчити австрійські податкові терміни.',
    s7P6: 'Не такого, де потрібно самому здогадуватися, яку форму відкривати й у яке поле що вписувати.',
    s7P7: 'А такого, де складний процес поступово стає зрозумілим.',

    s8Heading: 'І ще одна річ була для нас принциповою.',
    s8P1: 'Ми не хотіли створювати сервіс, за який потрібно платити ще до того, як зрозумієш, чи він тобі взагалі підходить.',
    s8Items: [
      { title: 'QLIXA Кабінет', price: '€0', note: 'безкоштовно' },
      { title: 'Податкова анкета', price: '€0', note: 'безкоштовно' },
      { title: 'Попередній розрахунок', price: '€0', note: 'можна переглянути' },
      { title: 'Готова декларація', price: '€24,90', note: 'разова оплата' },
    ],
    s8P2: 'Можна спочатку відкрити QLIXA, подивитися, почати заповнювати анкету й зрозуміти, чи зручно тобі так працювати.',
    s8P3: 'Можна пройти анкету за підтримуваний попередній податковий рік і побачити попередній розрахунок можливого повернення.',
    s8P4: 'І вже після цього вирішити, чи потрібна тобі готова декларація за цей рік.',
    s8Highlight: 'спочатку побачити результат і зрозуміти цінність — а вже потім платити.',

    s9Heading: 'Нам завжди хотілося, щоб важливе не губилося протягом року.',
    s9Body: 'Бо наприкінці року дуже легко забути, що ще в січні була робоча поїздка, навесні — витрати, а десь між цим з’явився ще один дохід.',
    s9Cards: [
      { title: 'Відрядження', desc: 'Записати, коли це сталося.' },
      { title: 'Доходи', desc: 'Додати, коли вони з’явилися.' },
      { title: 'Витрати', desc: 'Не намагатися згадати все через рік.' },
    ],
    s9Bottom: 'Щоб не відновлювати весь рік за один вечір.',

    s10Heading: 'Як ми хочемо пояснювати складне',
    s10Body: 'Кожен матеріал та інструмент ми намагаємося створювати так, ніби пояснюємо його подрузі за чашкою кави:',
    s10List: ['зрозуміло,', 'послідовно', 'і без зайвої складності.'],

    s11Card1: 'Не потрібно спочатку ставати бухгалтером, щоб самостійно підготувати свої документи.',
    s11Card2: 'Ми віримо, що складні процеси можна пояснювати зрозуміло — крок за кроком.',
    belief1Alt: 'Стрес від паперів та бухгалтерії',

    s12Heading: 'І це тільки початок.',
    s12P1: 'QLIXA постійно розвивається.',
    s12P2: 'Ми хочемо поступово додавати нові корисні інструменти, якими можна буде користуватися в кабінеті.',
    s12P3: 'А ще ми працюємо над QLIXA Business — окремим великим продуктом для GmbH та бізнесу.',
    s12P4: 'Але це вже інша історія. 😉',

    s13Legal1: 'QLIXA — автоматизований цифровий інструмент для самостійної підготовки податкової декларації та роботи з доступними цифровими інструментами.',
    s13Legal2: 'QLIXA не є Steuerberater, бухгалтером або юридичним консультантом і не надає індивідуальних податкових чи юридичних консультацій.',

    s14P1: 'Ми продовжуємо вчитися, працювати з офіційними джерелами та вдосконалювати QLIXA.',
    s14P2: 'Якщо завдяки QLIXA ти витрачатимеш менше часу на бюрократію й більше — на роботу, родину та життя, значить усе це було недарма.',
    signoff1: 'Ласкаво просимо до QLIXA!',
    signoff2: 'Ми дуже раді, що ти тут.',
    signoff3: 'З любов’ю, Іра & Іра ❤️🤍❤️',
  },

  DE: {
    badge: 'ÜBER UNS',
    h1Line1: 'Hallo!',
    h1Line2: 'Wir sind Ira & Ira. 👋',
    heroAlt: 'Ira und Ira — Gründerinnen von QLIXA',
    heroP1: 'Wir sind zwei Mamas, die 2022 aus der Ukraine nach Österreich gezogen sind. Wie viele andere Menschen haben wir ganz von vorne angefangen: ein neues Land, neue Regeln, eine neue Sprache und ein neues Steuersystem.',
    heroP2: 'Wir wollten einfach arbeiten, unser eigenes Business aufbauen und sicher sein, dass wir alles richtig machen.',

    s2Heading: 'Die österreichische Bürokratie ist fast eine eigene Sportart. 😄',
    s2Lines: [
      'Wie meldet man ein Gewerbe an?',
      'Wann muss man sich bei der SVS anmelden?',
      'Wie funktioniert FinanzOnline?',
      'Was könnte für die Steuererklärung relevant sein?',
      'Wie verpasst man keine wichtige Frist?',
    ],
    s2Before: 'Und vor allem —',
    s2Highlight: 'warum kann man das alles nicht einfach verständlich erklären?',

    s3Heading: 'Wir haben überall nach Antworten gesucht.',
    s3Grid: [
      { label: 'Offizielle Quellen', icon: 'doc' },
      { label: 'Seminare', icon: 'seminar' },
      { label: 'Fachleute', icon: 'people' },
      { label: 'Dokumente', icon: 'file' },
      { label: 'Informationen prüfen', icon: 'check' },
    ],
    s3After: 'Schritt für Schritt haben wir uns ein eigenes Verständnis davon aufgebaut, wie das österreichische System funktioniert.',

    s4P1: 'Wir waren gleichzeitig selbstständig in Österreich, haben gearbeitet, Erklärungen eingereicht und gelernt, unsere Aufzeichnungen zu führen und Steuern zu planen.',
    s4P2: 'Wir kennen diesen Moment sehr gut, wenn ein Brief vom Finanzamt im Postkasten liegt.',
    s4Before: 'Und der erste Gedanke ist —',
    s4Quote: '„Hoffentlich ist diesmal nichts Schlimmes dabei ...“ 😅',
    s4Small: 'Wir wissen, wie es ist, stundenlang nach einer Antwort auf eine einfache Frage zu suchen oder denselben Absatz auf Deutsch mehrmals zu lesen und trotzdem nicht sicher zu sein, ob man wirklich verstanden hat, was von einem verlangt wird.',

    s5P1: 'Genau in dieser Zeit haben wir uns zufällig kennengelernt.',
    s5Highlight: 'Uns verband der Wunsch, das System zu verstehen und komplizierte Dinge verständlicher zu machen.',
    s5P2: 'Wir begannen, uns gegenseitig zu helfen, unsere Entdeckungen zu teilen und eigene Tabellen, Checklisten, Erinnerungen und Vorlagen zu erstellen, die uns den Alltag erleichterten.',

    s6Timeline: ['Für uns', 'Für Freunde', 'Für Bekannte', 'QLIXA'],
    s6P1: 'Und irgendwann wurde uns klar: Wir sind damit definitiv nicht allein.',
    s6P2: 'Unternehmer:innen, Selbstständige, Arbeitnehmer:innen und Menschen mit unterschiedlichen Einkommensarten stehen vor sehr ähnlichen Fragen.',
    s6P3: 'Und auch sie verbringen viel Zeit damit, verständliche Informationen aus verschiedenen Quellen zusammenzusuchen.',

    s7HeadingBefore: 'So entstand ',
    s7HeadingEm: 'QLIXA.',
    s7P1: 'Wir ertappten uns immer wieder bei demselben Gedanken:',
    s7P1Em: 'Warum muss das eigentlich alles so kompliziert sein?',
    s7P2: 'Stell dir vor, statt unverständlicher Steuerformulare, Dutzender Felder und deutscher Fachbegriffe werden dir einfach ganz normale Fragen gestellt.',
    s7Pills: ['Warst du angestellt?', 'Warst du selbstständig?', 'Warst du beruflich unterwegs?', 'Hast du etwas für die Arbeit gekauft?', 'Hast du Kinder?', 'Hattest du andere Einkünfte?'],
    s7P3: 'Du antwortest einfach so, wie es in deinem Leben tatsächlich ist.',
    s7P4: 'Und nach und nach fügen sich diese Informationen zur Struktur einer Steuererklärung zusammen.',
    s7Quote: 'Genau so ein Tool hat uns damals selbst gefehlt.',
    s7P5: 'Nicht eines, für das man zuerst österreichische Steuerbegriffe lernen muss.',
    s7P6: 'Nicht eines, bei dem man selbst herausfinden muss, welches Formular man öffnen und in welches Feld man was eintragen soll.',
    s7P7: 'Sondern eines, bei dem ein komplizierter Prozess Schritt für Schritt verständlich wird.',

    s8Heading: 'Und noch etwas war uns besonders wichtig.',
    s8P1: 'Wir wollten keinen Service entwickeln, für den man bezahlen muss, bevor man überhaupt weiß, ob er zu einem passt.',
    s8Items: [
      { title: 'QLIXA Account', price: '€0', note: 'kostenlos' },
      { title: 'Steuerfragebogen', price: '€0', note: 'kostenlos' },
      { title: 'Vorläufige Berechnung', price: '€0', note: 'ansehen' },
      { title: 'Fertige Steuererklärung', price: '€24,90', note: 'einmalige Zahlung' },
    ],
    s8P2: 'Du kannst QLIXA zuerst öffnen, dir alles ansehen, mit dem Fragebogen beginnen und herausfinden, ob diese Art zu arbeiten für dich angenehm ist.',
    s8P3: 'Du kannst den Fragebogen auch für ein unterstütztes früheres Steuerjahr durchgehen und eine vorläufige Berechnung einer möglichen Rückerstattung sehen.',
    s8P4: 'Und erst danach entscheidest du, ob du die fertige Steuererklärung für dieses Jahr brauchst.',
    s8Highlight: 'erst das Ergebnis sehen und den Wert verstehen — und erst dann bezahlen.',

    s9Heading: 'Wir wollten immer, dass Wichtiges im Laufe des Jahres nicht verloren geht.',
    s9Body: 'Denn am Jahresende vergisst man leicht, dass es schon im Jänner eine berufliche Fahrt gab, im Frühjahr Ausgaben entstanden sind und irgendwann dazwischen noch weitere Einkünfte dazugekommen sind.',
    s9Cards: [
      { title: 'Berufliche Fahrten', desc: 'Festhalten, wenn sie stattfinden.' },
      { title: 'Einkünfte', desc: 'Eintragen, wenn sie entstehen.' },
      { title: 'Ausgaben', desc: 'Nicht erst ein Jahr später alles zusammensuchen.' },
    ],
    s9Bottom: 'Damit du nicht das ganze Jahr an einem einzigen Abend rekonstruieren musst.',

    s10Heading: 'Wie wir komplizierte Dinge erklären möchten',
    s10Body: 'Jedes Material und jedes Tool versuchen wir so zu gestalten, als würden wir es einer Freundin bei einer Tasse Kaffee erklären:',
    s10List: ['verständlich,', 'Schritt für Schritt', 'und ohne unnötige Komplexität.'],

    s11Card1: 'Man sollte nicht erst Buchhalter:in werden müssen, um die eigenen Unterlagen selbst vorzubereiten.',
    s11Card2: 'Wir glauben, dass man komplizierte Prozesse verständlich erklären kann — Schritt für Schritt.',
    belief1Alt: 'Stress durch Papierkram und Buchhaltung',

    s12Heading: 'Und das ist erst der Anfang.',
    s12P1: 'QLIXA entwickelt sich ständig weiter.',
    s12P2: 'Wir möchten nach und nach neue nützliche Tools hinzufügen, die im QLIXA Account genutzt werden können.',
    s12P3: 'Außerdem arbeiten wir an QLIXA Business — einem separaten größeren Produkt für GmbHs und Unternehmen.',
    s12P4: 'Aber das ist eine andere Geschichte. 😉',

    s13Legal1: 'QLIXA ist ein automatisiertes digitales Tool zur selbstständigen Vorbereitung der Steuererklärung und zur Nutzung verfügbarer digitaler Funktionen.',
    s13Legal2: 'QLIXA ist kein Steuerberater, Buchhalter oder Rechtsberater und bietet keine individuelle Steuer- oder Rechtsberatung an.',

    s14P1: 'Wir lernen weiter, arbeiten mit offiziellen Quellen und entwickeln QLIXA kontinuierlich weiter.',
    s14P2: 'Wenn du dank QLIXA weniger Zeit mit Bürokratie und mehr Zeit mit Arbeit, Familie und deinem Leben verbringen kannst, dann war all das nicht umsonst.',
    signoff1: 'Willkommen bei QLIXA!',
    signoff2: 'Wir freuen uns sehr, dass du hier bist.',
    signoff3: 'Mit Liebe, Ira & Ira ❤️🤍❤️',
  },

  EN: {
    badge: 'ABOUT US',
    h1Line1: 'Hi!',
    h1Line2: 'We’re Ira & Ira. 👋',
    heroAlt: 'Ira and Ira — QLIXA founders',
    heroP1: 'We’re two mums who moved from Ukraine to Austria in 2022. Like many other people, we started from scratch: a new country, new rules, a new language and a new tax system.',
    heroP2: 'We simply wanted to work, build our own businesses and feel confident that we were doing things correctly.',

    s2Heading: 'Austrian bureaucracy is almost a sport of its own. 😄',
    s2Lines: [
      'How do you register a Gewerbe?',
      'When do you need to register with SVS?',
      'How does FinanzOnline work?',
      'What could be relevant for your tax return?',
      'How do you avoid missing an important deadline?',
    ],
    s2Before: 'And most importantly —',
    s2Highlight: 'why can’t all of this be explained in plain language?',

    s3Heading: 'We looked everywhere for answers.',
    s3Grid: [
      { label: 'Official sources', icon: 'doc' },
      { label: 'Seminars', icon: 'seminar' },
      { label: 'Professionals', icon: 'people' },
      { label: 'Documents', icon: 'file' },
      { label: 'Cross-checking information', icon: 'check' },
    ],
    s3After: 'Step by step, we built our own understanding of how the Austrian system works.',

    s4P1: 'At the same time, we became self-employed in Austria, worked, filed our returns and learned how to keep records and plan for taxes.',
    s4P2: 'We know that moment very well when a letter from the Finanzamt appears in the mailbox.',
    s4Before: 'And your first thought is —',
    s4Quote: '“Hopefully it’s nothing serious this time...” 😅',
    s4Small: 'We know what it’s like to spend hours searching for the answer to one simple question, or to read the same paragraph in German again and again and still not be sure you understood what was actually being asked of you.',

    s5P1: 'That was around the time we happened to meet.',
    s5Highlight: 'What connected us was the desire to understand the system and make complicated things easier to understand.',
    s5P2: 'We started helping each other, sharing what we found, and creating our own spreadsheets, checklists, reminders and templates that made everyday tasks easier.',

    s6Timeline: ['For ourselves', 'For friends', 'For people we knew', 'QLIXA'],
    s6P1: 'And then we realised: we definitely weren’t the only ones.',
    s6P2: 'Business owners, self-employed people, employees and people with different types of income face many of the same questions.',
    s6P3: 'And they also spend a lot of time trying to piece together understandable information from different sources.',

    s7HeadingBefore: 'That’s how ',
    s7HeadingEm: 'QLIXA was born.',
    s7P1: 'We kept coming back to the same thought:',
    s7P1Em: 'Why does all of this have to be so complicated?',
    s7P2: 'Imagine that instead of confusing tax forms, dozens of fields and unfamiliar German tax terms, you were simply asked normal questions.',
    s7Pills: ['Were you employed?', 'Were you self-employed?', 'Did you travel for work?', 'Did you buy anything for work?', 'Do you have children?', 'Did you have other income?'],
    s7P3: 'You simply answer based on what actually happened in your life.',
    s7P4: 'And step by step, that information takes the shape of a tax return.',
    s7Quote: 'This is exactly the kind of tool we wished we had.',
    s7P5: 'Not one that requires you to learn Austrian tax terminology first.',
    s7P6: 'Not one where you have to figure out which form to open and what belongs in which field.',
    s7P7: 'But one where a complicated process gradually becomes understandable.',

    s8Heading: 'And there was one more thing that really mattered to us.',
    s8P1: 'We didn’t want to build a service you have to pay for before you even know whether it works for you.',
    s8Items: [
      { title: 'QLIXA Account', price: '€0', note: 'free' },
      { title: 'Tax questionnaire', price: '€0', note: 'free' },
      { title: 'Preliminary estimate', price: '€0', note: 'view it first' },
      { title: 'Completed tax return', price: '€24.90', note: 'one-time payment' },
    ],
    s8P2: 'You can open QLIXA first, look around, start the questionnaire and see whether this way of working feels right for you.',
    s8P3: 'You can even complete the questionnaire for a supported previous tax year and see a preliminary estimate of a possible refund.',
    s8P4: 'Only then do you decide whether you want the completed tax return for that year.',
    s8Highlight: 'see the result and understand the value first — then pay.',

    s9Heading: 'We always wanted important things not to get lost during the year.',
    s9Body: 'Because by the end of the year it’s easy to forget that there was a work trip back in January, some expenses in spring, and another source of income somewhere in between.',
    s9Cards: [
      { title: 'Work trips', desc: 'Record them when they happen.' },
      { title: 'Income', desc: 'Add it when it comes in.' },
      { title: 'Expenses', desc: 'Don’t try to remember everything a year later.' },
    ],
    s9Bottom: 'So you don’t have to reconstruct an entire year in one evening.',

    s10Heading: 'How we want to explain complicated things',
    s10Body: 'We try to create every resource and tool as if we were explaining it to a friend over a cup of coffee:',
    s10List: ['clearly,', 'step by step', 'and without unnecessary complexity.'],

    s11Card1: 'You shouldn’t have to become an accountant first just to prepare your own documents.',
    s11Card2: 'We believe complicated processes can be explained clearly — step by step.',
    belief1Alt: 'Stress from paperwork and accounting',

    s12Heading: 'And this is only the beginning.',
    s12P1: 'QLIXA keeps evolving.',
    s12P2: 'We want to gradually add more useful tools that can be used inside the QLIXA Account.',
    s12P3: 'We’re also working on QLIXA Business — a separate larger product for GmbHs and businesses.',
    s12P4: 'But that’s another story. 😉',

    s13Legal1: 'QLIXA is an automated digital tool for independently preparing a tax return and using available digital tools.',
    s13Legal2: 'QLIXA is not a tax adviser, accountant or legal adviser and does not provide individual tax or legal advice.',

    s14P1: 'We keep learning, working with official sources and improving QLIXA.',
    s14P2: 'If QLIXA helps you spend less time on bureaucracy and more time on work, family and life, then all of this was worth it.',
    signoff1: 'Welcome to QLIXA!',
    signoff2: 'We’re very happy you’re here.',
    signoff3: 'With love, Ira & Ira ❤️🤍❤️',
  },

  RU: {
    badge: 'О НАС',
    h1Line1: 'Привет!',
    h1Line2: 'Мы — Ира и Ира. 👋',
    heroAlt: 'Ира и Ира — основательницы QLIXA',
    heroP1: 'Мы две мамы, которые переехали из Украины в Австрию в 2022 году. Как и многие другие люди, мы начинали всё с нуля: новая страна, новые правила, новый язык и новая налоговая система.',
    heroP2: 'Мы просто хотели работать, развивать своё дело и быть уверенными, что всё делаем правильно.',

    s2Heading: 'Австрийская бюрократия — почти отдельный вид спорта. 😄',
    s2Lines: [
      'Как открыть Gewerbe?',
      'Когда нужно регистрироваться в SVS?',
      'Как работает FinanzOnline?',
      'Что может быть релевантно для налоговой декларации?',
      'Как не пропустить важный срок?',
    ],
    s2Before: 'И самое главное —',
    s2Highlight: 'почему всё это нельзя было объяснить простыми словами?',

    s3Heading: 'Мы искали ответы везде.',
    s3Grid: [
      { label: 'Официальные источники', icon: 'doc' },
      { label: 'Семинары', icon: 'seminar' },
      { label: 'Специалисты', icon: 'people' },
      { label: 'Документы', icon: 'file' },
      { label: 'Проверка информации', icon: 'check' },
    ],
    s3After: 'Шаг за шагом мы выстраивали собственное понимание того, как работает австрийская система.',

    s4P1: 'Параллельно мы открыли самозанятость в Австрии, работали, подавали отчётность, учились вести учёт и планировать налоги.',
    s4P2: 'Мы очень хорошо знаем этот момент, когда в почтовом ящике появляется письмо от Finanzamt.',
    s4Before: 'И первая мысль —',
    s4Quote: '«Надеемся, в этот раз ничего страшного...» 😅',
    s4Small: 'Мы знаем, каково это — часами искать ответ на один простой вопрос или несколько раз перечитывать один абзац на немецком и всё равно не быть уверенными, что правильно поняли, чего от тебя хотят.',

    s5P1: 'Примерно тогда мы случайно и познакомились.',
    s5Highlight: 'Нас объединило желание разобраться в системе и сделать сложные вещи понятнее.',
    s5P2: 'Мы начали помогать друг другу, делиться находками, создавать собственные таблицы, чек-листы, напоминания и шаблоны, которые упрощали повседневные задачи.',

    s6Timeline: ['Для себя', 'Для друзей', 'Для знакомых', 'QLIXA'],
    s6P1: 'А потом мы поняли: мы точно не одни.',
    s6P2: 'Предприниматели, самозанятые, наёмные работники и люди с разными видами доходов сталкиваются с очень похожими вопросами.',
    s6P3: 'И так же тратят много времени, пытаясь собрать понятную информацию из разных источников.',

    s7HeadingBefore: 'Так родилась ',
    s7HeadingEm: 'QLIXA.',
    s7P1: 'Мы постоянно ловили себя на одной мысли:',
    s7P1Em: 'почему всё это вообще должно быть настолько сложно?',
    s7P2: 'Представь, что вместо непонятных налоговых форм, десятков полей и немецких налоговых терминов тебе просто задают обычные вопросы.',
    s7Pills: ['Работал(а) по найму?', 'Была своя деятельность?', 'Ездил(а) в рабочие поездки?', 'Покупал(а) что-то для работы?', 'Есть дети?', 'Были другие доходы?'],
    s7P3: 'Ты просто отвечаешь так, как всё было в твоей жизни.',
    s7P4: 'А дальше эта информация постепенно складывается в структуру налоговой декларации.',
    s7Quote: 'Именно такого инструмента нам когда-то очень не хватало.',
    s7P5: 'Не такого, для которого сначала нужно выучить австрийские налоговые термины.',
    s7P6: 'Не такого, где нужно самому разбираться, какую форму открыть и в какое поле что вписать.',
    s7P7: 'А такого, где сложный процесс постепенно становится понятным.',

    s8Heading: 'И ещё одна вещь была для нас принципиальной.',
    s8P1: 'Мы не хотели создавать сервис, за который нужно платить ещё до того, как поймёшь, подходит ли он тебе вообще.',
    s8Items: [
      { title: 'QLIXA Кабинет', price: '€0', note: 'бесплатно' },
      { title: 'Налоговая анкета', price: '€0', note: 'бесплатно' },
      { title: 'Предварительный расчёт', price: '€0', note: 'можно посмотреть' },
      { title: 'Готовая декларация', price: '€24,90', note: 'разовая оплата' },
    ],
    s8P2: 'Можно сначала открыть QLIXA, посмотреть, начать заполнять анкету и понять, удобно ли тебе так работать.',
    s8P3: 'Можно пройти анкету за поддерживаемый предыдущий налоговый год и увидеть предварительный расчёт возможного возврата.',
    s8P4: 'И только после этого решить, нужна ли тебе готовая декларация за этот год.',
    s8Highlight: 'сначала увидеть результат и понять ценность — а уже потом платить.',

    s9Heading: 'Нам всегда хотелось, чтобы важное не терялось в течение года.',
    s9Body: 'Потому что в конце года очень легко забыть, что ещё в январе была рабочая поездка, весной были расходы, а где-то между этим появился ещё один доход.',
    s9Cards: [
      { title: 'Рабочие поездки', desc: 'Записать, когда это произошло.' },
      { title: 'Доходы', desc: 'Добавить, когда они появились.' },
      { title: 'Расходы', desc: 'Не пытаться вспомнить всё через год.' },
    ],
    s9Bottom: 'Чтобы не восстанавливать весь год за один вечер.',

    s10Heading: 'Как мы хотим объяснять сложное',
    s10Body: 'Каждый материал и инструмент мы стараемся создавать так, как будто объясняем его подруге за чашкой кофе:',
    s10List: ['понятно,', 'последовательно', 'и без лишней сложности.'],

    s11Card1: 'Не нужно сначала становиться бухгалтером, чтобы самостоятельно подготовить свои документы.',
    s11Card2: 'Мы верим, что сложные процессы можно объяснять понятно — шаг за шагом.',
    belief1Alt: 'Стресс от бумаг и бухгалтерии',

    s12Heading: 'И это только начало.',
    s12P1: 'QLIXA постоянно развивается.',
    s12P2: 'Мы хотим постепенно добавлять новые полезные инструменты, которыми можно будет пользоваться в кабинете.',
    s12P3: 'А ещё мы работаем над QLIXA Business — отдельным большим продуктом для GmbH и бизнеса.',
    s12P4: 'Но это уже другая история. 😉',

    s13Legal1: 'QLIXA — автоматизированный цифровой инструмент для самостоятельной подготовки налоговой декларации и работы с доступными цифровыми инструментами.',
    s13Legal2: 'QLIXA не является Steuerberater, бухгалтером или юридическим консультантом и не предоставляет индивидуальные налоговые или юридические консультации.',

    s14P1: 'Мы продолжаем учиться, работать с официальными источниками и совершенствовать QLIXA.',
    s14P2: 'Если благодаря QLIXA ты будешь тратить меньше времени на бюрократию и больше — на работу, семью и жизнь, значит всё это было не зря.',
    signoff1: 'Добро пожаловать в QLIXA!',
    signoff2: 'Мы очень рады, что ты здесь.',
    signoff3: 'С любовью, Ира & Ира ❤️🤍❤️',
  },
}

// Small shared bits for the About layout.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.6vw,34px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.25, letterSpacing: '-0.5px', margin: 0 }}>
      {children}
    </h2>
  )
}
function HighlightYellow({ children }: { children: React.ReactNode }) {
  return <span style={{ background: '#F5E642', padding: '0 4px', borderRadius: 3 }}>{children}</span>
}
function HighlightTeal({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: 700, color: '#038390' }}>{children}</span>
}

// Tiny inline low-poly-style micro icons — teal stroke, geometric, no emoji,
// no external assets. Kept intentionally simple/small (16–20px) since
// they're just quiet visual anchors, not illustrations. Shared across all
// locales — only the text next to them changes.
type AboutIconName =
  | 'doc' | 'seminar' | 'people' | 'file' | 'check'
  | 'briefcase' | 'shop' | 'route' | 'laptop' | 'family' | 'euroDoc'
  | 'connect' | 'coffee' | 'arrow' | 'income' | 'expense'
function AboutIcon({ name, size = 18 }: { name: AboutIconName; size?: number }) {
  const s = { width: size, height: size, flexShrink: 0 } as const
  const stroke = '#038390'
  switch (name) {
    case 'doc':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="1.5" stroke={stroke} strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'seminar':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="10" rx="1.5" stroke={stroke} strokeWidth="1.5"/><path d="M10 13v3M7 17h6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><path d="M5.5 8.5l2.5-2 2 1.5 2.5-2.5" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'people':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7.5" r="2.8" stroke={stroke} strokeWidth="1.5"/><circle cx="13.2" cy="8.5" r="2.2" stroke={stroke} strokeWidth="1.5"/><path d="M2.5 16c0-2.6 2-4.5 4.5-4.5s4.5 1.9 4.5 4.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><path d="M12.2 12.2c1.9.2 3.3 1.8 3.3 3.8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'file':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M5 2.5h6l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/><path d="M11 2.5v4h4" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/></svg>
    case 'check':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke={stroke} strokeWidth="1.5"/><path d="M6.5 10.2l2.3 2.3 4.7-5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'briefcase':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><rect x="2" y="7" width="16" height="10" rx="1.5" stroke={stroke} strokeWidth="1.5"/><path d="M7 7V5.5C7 4.67 7.67 4 8.5 4h3c.83 0 1.5.67 1.5 1.5V7" stroke={stroke} strokeWidth="1.5"/><path d="M2 11.5h16" stroke={stroke} strokeWidth="1.5"/></svg>
    case 'shop':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M3 8l1-4h12l1 4" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 8a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/><path d="M4.5 8.5V17h11V8.5" stroke={stroke} strokeWidth="1.5"/></svg>
    case 'route':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><circle cx="4" cy="5" r="1.6" fill={stroke}/><circle cx="16" cy="15" r="1.6" fill={stroke}/><path d="M4 6.6c0 4 8 2.4 8 6.4" stroke={stroke} strokeWidth="1.5" strokeDasharray="2.2 2.2" strokeLinecap="round"/></svg>
    case 'laptop':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><rect x="4" y="3.5" width="12" height="8" rx="1" stroke={stroke} strokeWidth="1.5"/><path d="M2 16h16l-1.3-2.5H3.3L2 16z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/></svg>
    case 'family':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><circle cx="6.5" cy="6" r="2.4" stroke={stroke} strokeWidth="1.5"/><circle cx="14" cy="7" r="1.7" stroke={stroke} strokeWidth="1.5"/><path d="M2.5 16c0-2.4 1.8-4.2 4-4.2s4 1.8 4 4.2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><path d="M12.6 11.9c1.7.15 3 1.7 3 3.7" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'euroDoc':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={stroke} strokeWidth="1.5"/><path d="M12.2 7.2c-.5-.5-1.2-.8-2-.8-1.8 0-3.2 1.6-3.2 3.6s1.4 3.6 3.2 3.6c.8 0 1.5-.3 2-.8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/><path d="M6 9h4.5M6 11h4.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'connect':
      return <svg style={{ width: size * 1.6, height: size }} viewBox="0 0 32 20" fill="none"><circle cx="6" cy="10" r="4" stroke={stroke} strokeWidth="1.6"/><circle cx="26" cy="10" r="4" stroke={stroke} strokeWidth="1.6"/><path d="M10 10h12" stroke={stroke} strokeWidth="1.6" strokeDasharray="2.4 2.4" strokeLinecap="round"/></svg>
    case 'coffee':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M3.5 7h10v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V7z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/><path d="M13.5 8.5H15a2 2 0 0 1 0 4h-1.5" stroke={stroke} strokeWidth="1.5"/><path d="M6.5 3.5c0 .8.9 1 0 1.8M9.5 3.5c0 .8.9 1 0 1.8" stroke={stroke} strokeWidth="1.3" strokeLinecap="round"/></svg>
    case 'arrow':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M3 10h13" stroke={stroke} strokeWidth="1.8" strokeLinecap="round"/><path d="M11.5 5l5 5-5 5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'income':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M3 13l4.5-5 3.5 3 6-6.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 4h3.5v3.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'expense':
      return <svg style={s} viewBox="0 0 20 20" fill="none"><path d="M3 6l4.5 5 3.5-3 6 6.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.5 15h3.5v-3.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
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

  const c = ABOUT[lang as keyof typeof ABOUT] || ABOUT.UA

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ── 1. HERO — one balanced editorial composition ── */}
      <section style={{ background: '#F0F7F8', padding: '60px clamp(20px,6vw,80px) 60px' }}>
        {/* ABOUT_SECTION_CONTAINER — shared 1080px page grid; every major
            card below aligns its outer edge to this same width. */}
        <div className="about-stack-row" style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 40 }}>
          <div className="about-stack-text" style={{ flex: '1 1 60%', maxWidth: 520 }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(3,131,144,0.1)', border: '1px solid rgba(3,131,144,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#026B76', marginBottom: 20 }}>{c.badge}</div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px,4vw,50px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 18 }}>
              {c.h1Line1}<br/>{c.h1Line2}
            </h1>
            <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: '#595959', lineHeight: 1.7, marginBottom: 12 }}>{c.heroP1}</p>
            <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', color: '#595959', lineHeight: 1.7 }}>{c.heroP2}</p>
          </div>
          <div className="about-stack-image" style={{ flex: '0 0 40%', display: 'flex', justifyContent: 'center', position: 'relative' as const }}>
            {/* subtle abstract halo behind the illustration — no hard card */}
            <div className="about-hero-halo" style={{ position: 'absolute' as const, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(3,131,144,0.10) 0%, rgba(3,131,144,0.03) 60%, transparent 75%)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/ira-and-ira.png" alt={c.heroAlt} style={{ width: '100%', maxWidth: 320, height: 'auto', objectFit: 'contain', display: 'block', position: 'relative' as const }}/>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px clamp(20px,6vw,80px)' }}>
        {/* ABOUT_SECTION_CONTAINER — same shared 1080px grid as the hero
            above; every major card/section container in this column is
            full-width (100%) within it, so their left/right edges align. */}
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: 60 }}>

          {/* ── 2. AUSTRIAN BUREAUCRACY — one horizontal card ── */}
          <div className="about-stack-row about-card" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FCFC', border: '1px solid rgba(3,131,144,0.12)', borderRadius: 24, padding: '34px 36px' }}>
            <div className="about-stack-text" style={{ flex: '1 1 65%', maxWidth: 620 }}>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 16 }}>{c.s2Heading}</h2>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 4, marginBottom: 14 }}>
                {c.s2Lines.map((line) => (
                  <p key={line} style={{ fontSize: 16, color: '#404040', lineHeight: 1.6, margin: 0 }}>{line}</p>
                ))}
              </div>
              <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.6, margin: 0 }}>
                {c.s2Before} <HighlightYellow>{c.s2Highlight}</HighlightYellow>
              </p>
            </div>
            <div className="about-stack-image" style={{ flex: '0 0 35%', display: 'flex', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/confused-moms.png" alt="" style={{ width: '100%', maxWidth: 240, height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* ── 3. WE LOOKED FOR ANSWERS — illustration left, heading + one-row
              5-card strip + conclusion right. All 5 cards MUST stay on a
              single row at 1440/1280/1024 — kept deliberately compact
              (fixed icon/font sizes, no wrapping) rather than fluid, so
              they don't quietly collapse to 2 rows at 1024px. ── */}
          <div className="about-stack-row about-card" style={{ display: 'flex', alignItems: 'center', gap: 30, background: '#F8FCFC', border: '1px solid rgba(3,131,144,0.12)', borderRadius: 24, padding: '30px 32px' }}>
            <div className="about-stack-image" style={{ flex: '0 0 170px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3,131,144,0.05)', borderRadius: 20, padding: '18px 8px', alignSelf: 'stretch' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/studying-moms.png" alt="" style={{ width: '100%', maxWidth: 145, height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
            <div className="about-stack-text" style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 16 }}>{c.s3Heading}</h2>
              <div className="about-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10, marginBottom: 16 }}>
                {c.s3Grid.map((item) => (
                  <div key={item.label} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6, background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.12)', borderRadius: 15, padding: '14px 8px', textAlign: 'center' as const }}>
                    <AboutIcon name={item.icon} size={23} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25 }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, margin: 0 }}>{c.s3After}</p>
            </div>
          </div>

          {/* ── 4. FINANZAMT QUOTE — outer card aligned to the shared
              1080px grid; text kept inside a narrower readable column. ── */}
          <div className="about-card" style={{ background: '#F0F7F8', borderRadius: 20, borderLeft: '4px solid #038390', padding: '28px 36px', width: '100%' }}>
            <div style={{ maxWidth: 760 }}>
              <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 8 }}>{c.s4P1}</p>
              <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 12 }}>{c.s4P2}</p>
              <p style={{ fontSize: 14, color: '#595959', marginBottom: 6 }}>{c.s4Before}</p>
              <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(19px,2.1vw,24px)', fontStyle: 'italic', fontWeight: 400, color: '#1A1A1A', marginBottom: 14 }}>
                <HighlightYellow>{c.s4Quote}</HighlightYellow>
              </p>
              <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, margin: 0 }}>{c.s4Small}</p>
            </div>
          </div>

          {/* ── 5. HOW WE MET — ABOUT_MET_CARD is full-width (aligned to
              the shared 1080px grid, same as the other major cards);
              ABOUT_MET_TEXT keeps the actual copy at a readable width. ── */}
          <div className="about-card" style={{ width: '100%', background: 'rgba(3,131,144,0.035)', borderRadius: 20, padding: '32px 40px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <AboutIcon name="connect" size={22} />
              </div>
              <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 8 }}>{c.s5P1}</p>
              <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 8 }}><HighlightTeal>{c.s5Highlight}</HighlightTeal></p>
              <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.7, margin: 0 }}>{c.s5P2}</p>
            </div>
          </div>

          {/* ── 6. TIMELINE — one integrated split card ── */}
          <div className="about-stack-row about-card" style={{ display: 'flex', alignItems: 'center', gap: 36, background: '#F8FCFC', border: '1px solid rgba(3,131,144,0.12)', borderRadius: 24, padding: '32px 36px' }}>
            <div className="about-stack-text" style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' as const, gap: 10, marginBottom: 18 }}>
                {c.s6Timeline.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 14, fontWeight: 700, color: i === c.s6Timeline.length - 1 ? '#fff' : '#038390',
                      background: i === c.s6Timeline.length - 1 ? '#038390' : '#fff',
                      border: '1px solid rgba(3,131,144,0.25)', borderRadius: 999, padding: '7px 16px',
                    }}>{step}</span>
                    {i < c.s6Timeline.length - 1 && <span style={{ color: '#038390' }}>→</span>}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 8 }}>{c.s6P1}</p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 8 }}>{c.s6P2}</p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, margin: 0 }}>{c.s6P3}</p>
            </div>
            <div className="about-stack-image" style={{ flex: '0 0 230px', display: 'flex', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/helping-friends.png" alt="" style={{ width: '100%', maxWidth: 230, height: 'auto', objectFit: 'contain', display: 'block' }}/>
            </div>
          </div>

          {/* ── 7. QLIXA WAS BORN — editorial sub-blocks ── */}
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
            {/* A. intro */}
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,2.8vw,38px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 18 }}>
              {c.s7HeadingBefore}<em style={{ color: '#038390', fontStyle: 'italic' }}>{c.s7HeadingEm}</em>
            </h2>
            <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.75, marginBottom: 4 }}>{c.s7P1}</p>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic', fontSize: 'clamp(17px,1.8vw,21px)', color: '#1A1A1A', marginBottom: 16 }}>{c.s7P1Em}</p>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, marginBottom: 24 }}>{c.s7P2}</p>

            {/* B. 6 pills, 3×2 */}
            <div className="about-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { text: c.s7Pills[0], icon: 'briefcase' as const },
                { text: c.s7Pills[1], icon: 'shop' as const },
                { text: c.s7Pills[2], icon: 'route' as const },
                { text: c.s7Pills[3], icon: 'laptop' as const },
                { text: c.s7Pills[4], icon: 'family' as const },
                { text: c.s7Pills[5], icon: 'euroDoc' as const },
              ].map((pill) => (
                <span key={pill.text} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: '#026B76', background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.2)', borderRadius: 16, padding: '10px 12px' }}>
                  <AboutIcon name={pill.icon} size={16} />
                  {pill.text}
                </span>
              ))}
            </div>

            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 6 }}>{c.s7P3}</p>
            <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 26 }}>{c.s7P4}</p>

            {/* C. large pull quote */}
            <p style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic', fontSize: 'clamp(21px,2.6vw,30px)', fontWeight: 400, color: '#038390', lineHeight: 1.4, marginBottom: 26 }}>
              “{c.s7Quote}”
            </p>

            {/* D. three compact statement blocks */}
            <div className="about-grid-1col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ background: '#F8FCFC', border: '1px solid rgba(3,131,144,0.10)', borderRadius: 14, padding: '16px 16px' }}>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>{c.s7P5}</p>
              </div>
              <div style={{ background: '#F8FCFC', border: '1px solid rgba(3,131,144,0.10)', borderRadius: 14, padding: '16px 16px' }}>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, margin: 0 }}>{c.s7P6}</p>
              </div>
              <div style={{ background: 'rgba(3,131,144,0.06)', border: '1px solid rgba(3,131,144,0.16)', borderRadius: 14, padding: '16px 16px' }}>
                <p style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{c.s7P7}</p>
              </div>
            </div>
          </div>

          {/* ── 8. FREE-FIRST PHILOSOPHY — card is full-width (aligned to
              the shared 1080px grid); the 4 mini-cards use that full
              width, but the surrounding paragraphs stay in a narrower
              readable column. ── */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,2.6vw,32px)', fontWeight: 400, color: '#1A1A1A', textAlign: 'center' as const, marginBottom: 20 }}>{c.s8Heading}</h2>
            <div className="about-card" style={{ background: '#F0F7F8', borderRadius: 20, padding: '32px 40px', width: '100%' }}>
              <p style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.7, marginBottom: 24, textAlign: 'center' as const, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>{c.s8P1}</p>

              <div className="about-grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
                {c.s8Items.map((item) => (
                  <div key={item.title} style={{ background: '#fff', borderRadius: 14, padding: '16px 12px', textAlign: 'center' as const }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#595959', marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: '#038390', marginBottom: 4 }}>{item.price}</div>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.note}</div>
                  </div>
                ))}
              </div>

              <div style={{ maxWidth: 680, margin: '0 auto' }}>
                <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 8 }}>{c.s8P2}</p>
                <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 8 }}>{c.s8P3}</p>
                <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.65, marginBottom: 14 }}>{c.s8P4}</p>
                <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0, textAlign: 'center' as const }}><HighlightTeal>{c.s8Highlight}</HighlightTeal></p>
              </div>
            </div>
          </div>

          {/* ── 9. THROUGHOUT THE YEAR — section is full-width (aligned to
              the shared 1080px grid); heading/body/closing line kept in
              a narrower readable column, the 3-card row uses full width. ── */}
          <div style={{ width: '100%' }}>
            <div style={{ maxWidth: 760 }}>
              <SectionHeading>{c.s9Heading}</SectionHeading>
              <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.75, margin: '14px 0 22px' }}>{c.s9Body}</p>
            </div>
            <div className="about-grid-1col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
              {[
                { ...c.s9Cards[0], icon: 'route' as const },
                { ...c.s9Cards[1], icon: 'income' as const },
                { ...c.s9Cards[2], icon: 'expense' as const },
              ].map((card) => (
                <div key={card.title} style={{ background: '#F0F7F8', borderRadius: 16, padding: '22px 22px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <AboutIcon name={card.icon} size={20} />
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{card.title}</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.5 }}>{card.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: '#595959', margin: 0, maxWidth: 760 }}>{c.s9Bottom}</p>
          </div>

          {/* ── 10. COFFEE PHILOSOPHY — manifesto card, full-width outer
              (aligned to the shared 1080px grid), narrower inner text. ── */}
          <div className="about-card" style={{ width: '100%', textAlign: 'center' as const, background: 'rgba(3,131,144,0.035)', borderRadius: 20, padding: '32px 40px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                <AboutIcon name="coffee" size={22} />
              </div>
              <SectionHeading>{c.s10Heading}</SectionHeading>
              <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.75, margin: '14px 0 10px' }}>{c.s10Body}</p>
              <p style={{ fontSize: 17, color: '#1A1A1A', fontWeight: 700, margin: 0 }}>{c.s10List.join(' ')}</p>
            </div>
          </div>

          {/* ── 11. BELIEFS ── */}
          <div className="about-grid-1col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/stressed-accountant.png" alt={c.belief1Alt} style={{ width: 100, height: 100, objectFit: 'contain', flexShrink: 0 }}/>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(3,131,144,0.15)', flexShrink: 0 }} />
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, margin: 0, maxWidth: 260 }}>{c.s11Card1}</p>
            </div>
            <div style={{ background: '#F0F7F8', borderRadius: 18, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/relaxed-person.png" alt="" style={{ width: 100, height: 100, objectFit: 'contain', flexShrink: 0 }}/>
              <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(3,131,144,0.15)', flexShrink: 0 }} />
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.6, margin: 0, maxWidth: 260 }}>{c.s11Card2}</p>
            </div>
          </div>

          {/* ── 12. WHAT'S NEXT — card outer is full-width (aligned to the
              shared 1080px grid), inner text kept narrower and centered. ── */}
          <div className="about-card" style={{ width: '100%', textAlign: 'center' as const, background: '#fff', borderTop: '3px solid rgba(3,131,144,0.35)', borderRadius: 16, boxShadow: '0 1px 0 rgba(3,131,144,0.06)', padding: '28px 36px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <AboutIcon name="arrow" size={20} />
              </div>
              <SectionHeading>{c.s12Heading}</SectionHeading>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, margin: '14px 0 8px' }}>{c.s12P1}</p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, marginBottom: 8 }}>{c.s12P2}</p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, marginBottom: 8 }}>{c.s12P3}</p>
              <p style={{ fontSize: 15, color: '#404040', lineHeight: 1.7, margin: 0 }}>{c.s12P4}</p>
            </div>
          </div>

          {/* ── 13. LEGAL NOTE ── */}
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
            <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6, marginBottom: 6 }}>{c.s13Legal1}</p>
            <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6, margin: 0 }}>{c.s13Legal2}</p>
          </div>

          {/* ── 14. FINAL ── */}
          <div style={{ textAlign: 'center' as const, padding: '12px 0 8px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/heart-moms.png" alt="" style={{ width: 200, height: 'auto', objectFit: 'contain', margin: '0 auto 26px', display: 'block' }}/>
            <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.75, maxWidth: 720, margin: '0 auto 20px' }}>{c.s14P1}</p>
            <p style={{ fontSize: 16, color: '#404040', lineHeight: 1.75, maxWidth: 720, margin: '0 auto 28px' }}>{c.s14P2}</p>
            <p style={{ fontSize: 21, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{c.signoff1}</p>
            <p style={{ fontSize: 17, color: '#595959', marginBottom: 20 }}>{c.signoff2}</p>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 28, color: '#038390' }}>{c.signoff3}</p>
          </div>

        </div>
      </section>

    </main>
      <Footer />
    </div>
  )
}
