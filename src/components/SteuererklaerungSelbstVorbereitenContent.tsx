'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArticleSidebar, ArticleTOC, ArticlePrevNext } from '@/components/layout/ArticleNav'
import Badge from '@/components/ui/Badge'
import ButtonLink from '@/components/ui/ButtonLink'
import { type InternalLangKey, type Locale, localeHref } from '@/lib/locale'

// Local helpers, following the exact pattern already established in the
// 5 existing article components (AustriaIdContent.tsx etc.) — small,
// article-scoped presentational pieces rather than new shared/global
// components, since nothing outside this one article needs them yet.

// EMPHASIS — the brief's "key sentence" call-outs. Reuses the existing
// left-border highlight treatment already used repeatedly in
// RwrKarteContent.tsx (borderLeft 3px solid teal + paddingLeft) instead
// of inventing a new visual device.
function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      borderLeft: '3px solid #038390', paddingLeft: 16,
      margin: '20px 0', fontSize: 15, fontWeight: 600,
      color: 'var(--charcoal)', lineHeight: 1.7,
    }}>
      {children}
    </p>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#038390', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'var(--peach-mid)', textUnderlineOffset: 3, fontSize: 13 }}>
      {children} ↗
    </a>
  )
}

// Translations — all 4 locales (Phase 8 follow-up: approved EN/UA/RU
// copy added). DE stays byte-for-byte the content it already was; the
// other 3 use the exact approved text supplied in that brief, mapped
// 1:1 onto the same field structure DE already uses, so the JSX below
// never needs locale-specific branches. `ergebnisLeadIn` is the one
// genuinely optional field: the approved EN/UA/RU copy for the "What
// do I get" section adds one extra lead-in sentence ("This part is
// important:" / "Це важливий момент:" / "Это важный момент:") that the
// approved DE copy never had — DE simply omits the key.
const T: Record<string, {
  tag1: string; tag2: string; tag3: string
  titleLine1: string; titleEm: string
  metaTime: string
  toc: [string, string][]
  backLink: string
  intro1: string; intro2: string
  emphasis1: string; intro3: string
  emphasis2: string; intro4: string

  h2AbgabeBefore: string; h2AbgabeEm: string
  abgabeP1: string; abgabeP2: string; abgabeP3: string; abgabeP4: string
  abgabeP5: string; abgabeP6: string; abgabeP7: string

  h2SituationBefore: string; h2SituationEm: string
  situationIntro: string
  fragen: string[]
  situationQuoteLead: string
  situationQuote: string
  situationP1: string
  emphasis3: string
  situationP2: string
  emphasis4: string

  ctaLabel: string

  h2FormulareBefore: string; h2FormulareEm: string
  formulareP1: string; formulareP2: string; formulareP3: string
  formulareQ: string
  formulareLeadIn: string
  formulareQuote: string
  formulareInsteadLabel: string
  formulareQuestions: string[]
  emphasis5: string
  formulareP4: string

  h2VorwissenBefore: string; h2VorwissenEm: string
  vorwissenP1: string; vorwissenP2: string; vorwissenP3: string; vorwissenP4: string
  emphasis6: string

  h2ErgebnisBefore: string; h2ErgebnisEm: string
  ergebnisLeadIn?: string
  emphasis7: string
  ergebnisP1: string
  emphasis8: string
  ergebnisP2: string

  h2FinanzonlineBefore: string; h2FinanzonlineEm: string
  finanzP1: string
  emphasis9: string
  finanzP2: string
  finanzLinkLabel: string

  h2SelbstBefore: string; h2SelbstEm: string
  selbstP1: string
  selbstLeadIn: string
  flow: string[]
  selbstP2: string
  emphasis10: string

  finalHeading: string
  finalP1: string
  finalP2: string
  finalCta: string
}> = {
  DE: {
    tag1: 'Steuererklärung', tag2: 'Selbst vorbereiten', tag3: 'Österreich',
    titleLine1: 'Steuererklärung in Österreich selbst vorbereiten:', titleEm: 'Schritt für Schritt',
    metaTime: '🕐 ~5 Min. Lesezeit',
    toc: [
      ['#abgabe', 'Muss ich eine Steuererklärung abgeben?'],
      ['#situation', 'Fang mit deiner Situation an'],
      ['#formulare', 'E1, L1, L1k & Co.'],
      ['#vorwissen', 'Brauche ich Vorwissen?'],
      ['#ergebnis', 'Was bekomme ich am Ende?'],
      ['#finanzonline', 'Einreichung über FinanzOnline'],
      ['#selbst', 'Selbst vorbereiten – der Weg'],
    ],
    backLink: '← Alle Artikel',

    intro1: 'Du möchtest deine Steuererklärung in Österreich selbst vorbereiten, weißt aber nicht, wo du anfangen sollst?',
    intro2: 'E1, L1, L1k, FinanzOnline – all diese Begriffe können den Prozess komplizierter erscheinen lassen, als er sein muss.',
    emphasis1: 'Die gute Nachricht: Um deine Steuererklärung selbst vorzubereiten, musst du nicht zuerst alle Steuerformulare verstehen oder dich durch das österreichische Steuerrecht arbeiten.',
    intro3: 'Einfacher ist es, mit dem anzufangen, was du bereits weißt: Wo hast du gearbeitet? Welche Einkünfte hattest du? Gab es zusätzliche Ausgaben? Hast du Kinder? Und was war in diesem Steuerjahr sonst noch wichtig?',
    emphasis2: 'Genau hier setzt die Grundidee von QLIXA an.',
    intro4: 'Statt mit Steuerformularen beginnst du mit verständlichen Fragen zu deiner persönlichen Situation.',

    h2AbgabeBefore: 'Muss ich überhaupt eine ', h2AbgabeEm: 'Steuererklärung abgeben?',
    abgabeP1: 'Das hängt von deiner Situation ab.',
    abgabeP2: 'Wenn du angestellt bist, erhält das Finanzamt bereits einen Teil deiner Einkommensdaten über deinen Arbeitgeber – insbesondere über den Jahreslohnzettel.',
    abgabeP3: 'In bestimmten Fällen kann das Finanzamt sogar eine antragslose Arbeitnehmerveranlagung durchführen, ohne dass du selbst eine Steuererklärung eingereicht hast.',
    abgabeP4: 'Das bedeutet aber nicht, dass du selbst nichts mehr angeben kannst oder dass bereits alle persönlichen Umstände berücksichtigt wurden.',
    abgabeP5: 'Vielleicht hattest du zusätzliche berufliche Ausgaben. Vielleicht gibt es Aufwendungen oder Umstände im Zusammenhang mit deiner Familie oder deinen Kindern. Auch Werbungskosten, bestimmte Sonderausgaben oder außergewöhnliche Belastungen können bei einer Arbeitnehmerveranlagung relevant sein.',
    abgabeP6: 'Selbst wenn das Finanzamt bereits eine antragslose Arbeitnehmerveranlagung durchgeführt hat, kannst du innerhalb der vorgesehenen Fünfjahresfrist eine Arbeitnehmerveranlagung einreichen und zusätzliche Angaben machen. Das Finanzamt hebt dann den Bescheid aus der antragslosen Veranlagung auf und entscheidet auf Grundlage deiner eingereichten Steuererklärung neu.',
    abgabeP7: 'In anderen Situationen – zum Beispiel bei selbstständiger Tätigkeit oder bestimmten zusätzlichen Einkünften – kann eine Einkommensteuererklärung erforderlich sein. Aber bevor du herausfinden musst, welches Steuerformular zu welchem Fall gehört, kannst du viel einfacher anfangen.',

    h2SituationBefore: 'Fang nicht mit Steuerformularen an – ', h2SituationEm: 'fang mit deiner Situation an',
    situationIntro: 'Stell dir stattdessen einfachere Fragen zu deiner eigenen Situation:',
    fragen: [
      'Warst du angestellt?',
      'Warst du selbstständig?',
      'Oder vielleicht beides?',
      'Hast du Kinder?',
      'Gab es zusätzliche Einkünfte?',
      'Berufliche Ausgaben?',
      'Einkünfte aus dem Ausland oder aus Vermietung?',
    ],
    situationQuoteLead: 'Solche Fragen sind wesentlich leichter zu beantworten als:',
    situationQuote: 'Brauche ich E1, L1, L1k oder noch eine andere Beilage?',
    situationP1: 'Und genau so funktioniert QLIXA.',
    emphasis3: 'Die nächsten Fragen hängen von deinen vorherigen Antworten ab.',
    situationP2: 'Statt vor einem großen Steuerformular mit vielen unbekannten Feldern zu sitzen, gehst du Schritt für Schritt durch deine eigene Situation.',
    emphasis4: 'So werden nach und nach die Informationen erfasst, die für die Vorbereitung deiner Steuererklärung benötigt werden.',

    ctaLabel: 'So funktioniert QLIXA Tax Return →',

    h2FormulareBefore: 'Und was ist mit E1, L1, L1k und den ', h2FormulareEm: 'anderen Steuerformularen?',
    formulareP1: 'Ja, in Österreich gibt es unterschiedliche Steuerformulare und Beilagen.',
    formulareP2: 'Für die Arbeitnehmerveranlagung wird grundsätzlich L1 verwendet. Je nach Situation können zusätzliche Beilagen notwendig sein – zum Beispiel L1k für bestimmte Angaben im Zusammenhang mit Kindern, L1ab für außergewöhnliche Belastungen oder L1i für bestimmte internationale Sachverhalte.',
    formulareP3: 'Für eine Einkommensteuererklärung wird E1 verwendet; abhängig von den Einkünften und der persönlichen Situation können weitere Beilagen erforderlich sein.',
    formulareQ: 'Klingt kompliziert?',
    formulareLeadIn: 'Genau deshalb beginnt QLIXA nicht mit der Frage:',
    formulareQuote: 'Welches Steuerformular möchtest du ausfüllen?',
    formulareInsteadLabel: 'Sondern mit Fragen wie:',
    formulareQuestions: [
      'Wie hast du gearbeitet?',
      'Welche Einkünfte hattest du?',
      'Hast du Kinder?',
      'Welche Ausgaben hattest du?',
    ],
    emphasis5: 'Wenn du QLIXA nutzt, musst du die Vorbereitung deiner Steuererklärung nicht damit beginnen, die Namen und Nummern der Steuerformulare zu lernen.',
    formulareP4: 'Du beantwortest verständliche Fragen zu deiner Situation. QLIXA nutzt deine Angaben anschließend für die Vorbereitung deiner Steuererklärung im Rahmen der unterstützten Fälle.',

    h2VorwissenBefore: 'Muss ich vorher wissen, welche ', h2VorwissenEm: 'Ausgaben und Angaben ich brauche?',
    vorwissenP1: 'Nein – genau das ist einer der Vorteile dieses Ansatzes.',
    vorwissenP2: 'Du musst nicht zuerst eine lange Liste von Steuerkategorien durchgehen und selbst herausfinden, in welches Feld eines Steuerformulars eine bestimmte Angabe gehört.',
    vorwissenP3: 'QLIXA stellt dir Schritt für Schritt passende Fragen auf Basis deiner vorherigen Antworten und hilft dabei, mögliche Kategorien zu prüfen, die zu deinen Angaben passen können.',
    vorwissenP4: 'Natürlich bedeutet das nicht, dass jede Ausgabe automatisch steuerlich berücksichtigt werden kann. Für unterschiedliche Kategorien gelten unterschiedliche Voraussetzungen.',
    emphasis6: 'Du musst nicht zuerst den Aufbau einer österreichischen Steuererklärung lernen, um mit der Vorbereitung deiner Steuererklärung zu beginnen.',

    h2ErgebnisBefore: 'Was bekomme ich ', h2ErgebnisEm: 'am Ende?',
    emphasis7: 'QLIXA ist nicht einfach ein Fragebogen, nach dem du nur eine Liste deiner Antworten erhältst.',
    ergebnisP1: 'Du gehst durch den adaptiven Fragebogen. Deine Angaben werden anschließend verwendet, um deine Steuererklärung und – soweit für den unterstützten Fall erforderlich – die entsprechenden Beilagen vorzubereiten.',
    emphasis8: 'Am Ende erhältst du eine vorbereitete Steuererklärung, die du selbst prüfen und anschließend einreichen kannst.',
    ergebnisP2: 'Damit führt der Weg nicht von einem Fragebogen zu noch mehr Formularen, sondern von deinen Antworten zu einer vorbereiteten Steuererklärung.',

    h2FinanzonlineBefore: 'Wie kommt meine Steuererklärung ', h2FinanzonlineEm: 'zum Finanzamt?',
    finanzP1: 'QLIXA reicht deine Steuererklärung nicht für dich beim Finanzamt ein.',
    emphasis9: 'QLIXA bereitet deine Steuererklärung vor. Du prüfst sie und reichst sie anschließend selbst ein.',
    finanzP2: 'Die Arbeitnehmerveranlagung kann beispielsweise elektronisch über FinanzOnline übermittelt werden. Das BMF nennt daneben auch die persönliche bzw. postalische Abgabe der entsprechenden Papierformulare.',
    finanzLinkLabel: 'Mehr über FinanzOnline erfahren',

    h2SelbstBefore: 'Kann ich meine Steuererklärung also wirklich ', h2SelbstEm: 'selbst vorbereiten?',
    selbstP1: 'Ja. Und du musst dafür nicht zuerst die Namen aller österreichischen Steuerformulare lernen.',
    selbstLeadIn: 'Mit QLIXA ist der Weg einfacher aufgebaut:',
    flow: ['Deine Situation', 'Verständliche Fragen', 'Relevante Angaben', 'Vorbereitete Steuererklärung', 'Deine Prüfung', 'Selbstständige Einreichung'],
    selbstP2: 'Du beginnst also nicht mit E1, L1 oder L1k.',
    emphasis10: 'Du beginnst mit dem, was du bereits kennst: deiner eigenen Situation.',

    finalHeading: 'Steuererklärung mit QLIXA vorbereiten',
    finalP1: 'Du musst nicht zuerst E1, L1 und zusätzliche Steuerformulare verstehen.',
    finalP2: 'Beantworte verständliche Fragen zu deiner Situation und geh mit QLIXA Schritt für Schritt bis zu deiner vorbereiteten Steuererklärung.',
    finalCta: 'Steuererklärung mit QLIXA vorbereiten →',
  },

  EN: {
    tag1: 'Tax Return', tag2: 'Self-Prepared', tag3: 'Austria',
    titleLine1: 'How to Prepare Your Tax Return in Austria:', titleEm: 'Step by Step',
    metaTime: '🕐 ~6 min read',
    toc: [
      ['#abgabe', 'Do I need to file at all?'],
      ['#situation', 'Start with your situation'],
      ['#formulare', 'E1, L1, L1k & co.'],
      ['#vorwissen', 'Do I need prior knowledge?'],
      ['#ergebnis', 'What do I get at the end?'],
      ['#finanzonline', 'Filing via FinanzOnline'],
      ['#selbst', 'Preparing it yourself – the path'],
    ],
    backLink: '← All Articles',

    intro1: 'Need to prepare your tax return in Austria but don’t know where to start?',
    intro2: 'E1, L1, L1k, FinanzOnline — all these names can make the process seem much more complicated than it actually needs to be.',
    emphasis1: 'The good news: you don’t need to understand every Austrian tax form or study Austrian tax law before you can start preparing your tax return.',
    intro3: 'It’s much easier to start with what you already know about yourself: Where did you work? What income did you receive? Did you have additional expenses? Do you have children? And what else was relevant to your situation during the tax year?',
    emphasis2: 'This is exactly where the idea behind QLIXA comes in.',
    intro4: 'Instead of starting with tax forms, you start with clear questions about your own situation.',

    h2AbgabeBefore: 'Do I Need to File a ', h2AbgabeEm: 'Tax Return at All?',
    abgabeP1: 'It depends on your situation.',
    abgabeP2: 'If you’re employed in Austria, the tax office already receives part of your income information through your employer, including your annual wage statement.',
    abgabeP3: 'In some cases, the tax office may even carry out an automatic employee tax assessment without you submitting an application yourself.',
    abgabeP4: 'But that doesn’t necessarily mean there is nothing else for you to declare or that every aspect of your personal situation has already been taken into account.',
    abgabeP5: 'You may have had additional work-related expenses. Your family or children may be relevant to your tax situation. Certain income-related expenses, special expenses or extraordinary burdens may also be taken into account as part of an employee tax assessment.',
    abgabeP6: 'Even if an automatic employee tax assessment has already been carried out, you can still submit your own employee tax assessment application within the applicable five-year period and include additional information.',
    abgabeP7: 'In other situations — for example, if you are self-employed or have certain additional types of income — an income tax return may be required. But you don’t need to begin by figuring out which Austrian tax form applies to you.',

    h2SituationBefore: 'Don’t Start with Tax Forms — ', h2SituationEm: 'Start with Your Situation',
    situationIntro: 'Start with simpler questions about yourself:',
    fragen: [
      'Were you employed?',
      'Were you self-employed?',
      'Or perhaps both?',
      'Do you have children?',
      'Did you have additional income?',
      'Work-related expenses?',
      'Income from abroad or rental income?',
    ],
    situationQuoteLead: 'These questions are much easier to answer than:',
    situationQuote: 'Do I need E1, L1, L1k or another attachment?',
    situationP1: 'And that’s how QLIXA works.',
    emphasis3: 'The questions you see next depend on your previous answers.',
    situationP2: 'Instead of facing a large tax form full of unfamiliar fields, you go through your own situation step by step.',
    emphasis4: 'This gradually collects the information needed to prepare your tax return.',

    ctaLabel: 'See how QLIXA Tax Return works →',

    h2FormulareBefore: 'What About E1, L1, L1k and the ', h2FormulareEm: 'Other Tax Forms?',
    formulareP1: 'Austria uses different tax forms and attachments for different situations.',
    formulareP2: 'For an employee tax assessment, L1 is the basic form. Depending on your situation, additional forms may be relevant — for example, L1k for certain information related to children, L1ab for extraordinary burdens or L1i for certain international situations.',
    formulareP3: 'For an income tax return, E1 is used, and additional attachments may be required depending on your income and circumstances.',
    formulareQ: 'Sounds complicated?',
    formulareLeadIn: 'That’s exactly why QLIXA doesn’t start by asking:',
    formulareQuote: 'Which tax form would you like to complete?',
    formulareInsteadLabel: 'Instead, it asks questions such as:',
    formulareQuestions: [
      'How did you work?',
      'What income did you receive?',
      'Do you have children?',
      'What expenses did you have?',
    ],
    emphasis5: 'When you use QLIXA, you don’t have to start preparing your tax return by learning the names and numbers of Austrian tax forms.',
    formulareP4: 'You answer clear questions about your situation. QLIXA then uses the information you provide to prepare your tax return within the cases supported by the product.',

    h2VorwissenBefore: 'Do I Need to Know in Advance Which ', h2VorwissenEm: 'Expenses and Information I’ll Need?',
    vorwissenP1: 'No — that’s one of the advantages of this approach.',
    vorwissenP2: 'You don’t have to start by going through a long list of tax categories and figuring out which field of a tax form each piece of information belongs in.',
    vorwissenP3: 'QLIXA asks you relevant questions step by step based on your previous answers and helps check possible categories that may apply based on the information you provide.',
    vorwissenP4: 'Of course, that doesn’t mean every expense can automatically be taken into account for tax purposes. Different categories have different requirements.',
    emphasis6: 'You don’t need to understand the structure of an Austrian tax return before you can start preparing one.',

    h2ErgebnisBefore: 'What Do I Get ', h2ErgebnisEm: 'at the End?',
    ergebnisLeadIn: 'This part is important:',
    emphasis7: 'QLIXA isn’t just a questionnaire that leaves you with a list of your answers.',
    ergebnisP1: 'You go through the adaptive questionnaire. The information you provide is then used to prepare your tax return and, where required for your supported situation, the necessary attachments.',
    emphasis8: 'At the end, you receive a prepared tax return that you can review yourself and then file.',
    ergebnisP2: 'So the process doesn’t take you from a questionnaire to even more forms. It takes you from your answers to a prepared tax return.',

    h2FinanzonlineBefore: 'How Does My Tax Return Get to the ', h2FinanzonlineEm: 'Tax Office?',
    finanzP1: 'QLIXA does not file your tax return with the tax office on your behalf.',
    emphasis9: 'QLIXA prepares your tax return. You review it and file it yourself.',
    finanzP2: 'Employee tax assessments can, for example, be submitted electronically through FinanzOnline. Income tax returns are generally submitted electronically through FinanzOnline as well.',
    finanzLinkLabel: 'Go to FinanzOnline',

    h2SelbstBefore: 'Can I Really Prepare My ', h2SelbstEm: 'Tax Return Myself?',
    selbstP1: 'Yes. And you don’t need to learn the names of every Austrian tax form first.',
    selbstLeadIn: 'With QLIXA, the process is structured more simply:',
    flow: ['Your situation', 'Clear questions', 'Relevant information', 'Prepared tax return', 'Your review', 'Filing it yourself'],
    selbstP2: 'You don’t start with E1, L1 or L1k.',
    emphasis10: 'You start with what you already know: your own situation.',

    finalHeading: 'Prepare Your Tax Return with QLIXA',
    finalP1: 'You don’t need to understand E1, L1 and additional Austrian tax forms before you begin.',
    finalP2: 'Answer clear questions about your situation and go step by step with QLIXA until your tax return is prepared.',
    finalCta: 'Prepare your tax return with QLIXA →',
  },

  UA: {
    tag1: 'Податкова декларація', tag2: 'Самостійно', tag3: 'Австрія',
    titleLine1: 'Як самостійно підготувати податкову декларацію в Австрії:', titleEm: 'крок за кроком',
    metaTime: '🕐 ~5 хв читання',
    toc: [
      ['#abgabe', 'Чи потрібно подавати декларацію?'],
      ['#situation', 'Почніть зі своєї ситуації'],
      ['#formulare', 'E1, L1, L1k та інші форми'],
      ['#vorwissen', 'Чи потрібні попередні знання?'],
      ['#ergebnis', 'Що я отримаю в результаті?'],
      ['#finanzonline', 'Подання через FinanzOnline'],
      ['#selbst', 'Самостійна підготовка – шлях'],
    ],
    backLink: '← Всі статті',

    intro1: 'Потрібно підготувати податкову декларацію в Австрії, але ви не знаєте, з чого почати?',
    intro2: 'E1, L1, L1k, FinanzOnline — усі ці назви можуть створювати враження, що процес набагато складніший, ніж є насправді.',
    emphasis1: 'Хороша новина: щоб самостійно підготувати податкову декларацію, вам не потрібно спочатку розбиратися в усіх податкових формах або вивчати австрійське податкове законодавство.',
    intro3: 'Набагато простіше почати з того, що ви вже знаєте про себе: де ви працювали, які доходи отримували, чи були додаткові витрати, чи є у вас діти та які ще обставини були важливими протягом податкового року.',
    emphasis2: 'Саме тут з’являється основна ідея QLIXA.',
    intro4: 'Замість того щоб починати з податкових форм, ви починаєте зі зрозумілих запитань про свою ситуацію.',

    h2AbgabeBefore: 'А мені взагалі потрібно подавати ', h2AbgabeEm: 'податкову декларацію?',
    abgabeP1: 'Це залежить від вашої ситуації.',
    abgabeP2: 'Якщо ви працюєте за наймом в Австрії, Finanzamt уже отримує частину інформації про ваші доходи від роботодавця, зокрема дані річного Lohnzettel.',
    abgabeP3: 'У деяких випадках Finanzamt може провести antragslose Arbeitnehmerveranlagung — автоматичний податковий розрахунок без подання заяви з вашого боку.',
    abgabeP4: 'Але це не обов’язково означає, що вам більше нічого вказувати або що всі обставини вашої особистої ситуації вже були враховані.',
    abgabeP5: 'Наприклад, у вас могли бути додаткові витрати, пов’язані з роботою. Значення можуть мати обставини, пов’язані із сім’єю чи дітьми. Під час Arbeitnehmerveranlagung також можуть враховуватися певні Werbungskosten, Sonderausgaben або außergewöhnliche Belastungen.',
    abgabeP6: 'Навіть якщо Finanzamt уже провів antragslose Arbeitnehmerveranlagung, для добровільної Arbeitnehmerveranlagung передбачений п’ятирічний строк.',
    abgabeP7: 'В інших ситуаціях — наприклад, при самозайнятості або певних додаткових доходах — може бути необхідна Einkommensteuererklärung. Але вам не потрібно починати з того, щоб самостійно визначати, яка саме австрійська податкова форма вам потрібна.',

    h2SituationBefore: 'Почніть не з податкових форм, а ', h2SituationEm: 'зі своєї ситуації',
    situationIntro: 'Почніть із простіших запитань про себе:',
    fragen: [
      'Ви працювали за наймом?',
      'Були самозайнятою особою?',
      'Або поєднували обидва варіанти?',
      'У вас є діти?',
      'Були додаткові доходи?',
      'Витрати, пов’язані з роботою?',
      'Доходи з-за кордону або від оренди?',
    ],
    situationQuoteLead: 'На такі запитання значно легше відповісти, ніж на:',
    situationQuote: 'Мені потрібна форма E1, L1, L1k чи ще якийсь додаток?',
    situationP1: 'Саме так працює QLIXA.',
    emphasis3: 'Наступні запитання залежать від ваших попередніх відповідей.',
    situationP2: 'Замість великої податкової форми з незрозумілими полями ви крок за кроком описуєте власну ситуацію.',
    emphasis4: 'Так поступово збирається інформація, необхідна для підготовки вашої податкової декларації.',

    ctaLabel: 'Як працює QLIXA Tax Return →',

    h2FormulareBefore: 'А що тоді робити з E1, L1, L1k та ', h2FormulareEm: 'іншими податковими формами?',
    formulareP1: 'В Австрії для різних ситуацій використовуються різні податкові форми та додатки.',
    formulareP2: 'Для Arbeitnehmerveranlagung основною є форма L1. Залежно від ситуації можуть знадобитися додаткові форми — наприклад, L1k для певних даних, пов’язаних із дітьми, L1ab для außergewöhnliche Belastungen або L1i для певних міжнародних ситуацій.',
    formulareP3: 'Для Einkommensteuererklärung використовується E1, а залежно від виду доходів та обставин можуть бути потрібні додаткові форми.',
    formulareQ: 'Звучить складно?',
    formulareLeadIn: 'Саме тому QLIXA не починає з питання:',
    formulareQuote: 'Яку податкову форму ви хочете заповнити?',
    formulareInsteadLabel: 'Натомість запитує:',
    formulareQuestions: [
      'Як ви працювали?',
      'Які доходи отримували?',
      'У вас є діти?',
      'Які витрати у вас були?',
    ],
    emphasis5: 'Якщо ви використовуєте QLIXA, вам не потрібно починати підготовку податкової декларації з вивчення назв і номерів податкових форм.',
    formulareP4: 'Ви відповідаєте на зрозумілі запитання про свою ситуацію. QLIXA використовує введені вами дані для підготовки податкової декларації в межах випадків, які підтримує продукт.',

    h2VorwissenBefore: 'Чи потрібно заздалегідь знати, які ', h2VorwissenEm: 'витрати та дані знадобляться?',
    vorwissenP1: 'Ні — саме в цьому одна з переваг такого підходу.',
    vorwissenP2: 'Вам не потрібно спочатку переглядати довгий список податкових категорій і самостійно визначати, у яке поле податкової форми потрібно внести ту чи іншу інформацію.',
    vorwissenP3: 'QLIXA крок за кроком ставить запитання на основі ваших попередніх відповідей і допомагає перевірити можливі категорії, які можуть відповідати введеній вами ситуації.',
    vorwissenP4: 'Звичайно, це не означає, що кожна витрата автоматично може бути врахована для цілей оподаткування. Для різних категорій діють різні умови.',
    emphasis6: 'Але вам не потрібно спочатку вивчати структуру австрійської податкової декларації, щоб розпочати її підготовку.',

    h2ErgebnisBefore: 'Що я отримаю ', h2ErgebnisEm: 'в результаті?',
    ergebnisLeadIn: 'Це важливий момент:',
    emphasis7: 'QLIXA — це не просто анкета, після якої ви отримуєте список своїх відповідей.',
    ergebnisP1: 'Ви проходите адаптивне опитування. Введена інформація використовується для підготовки вашої податкової декларації та — якщо це необхідно для ситуації, яку підтримує продукт, — відповідних додатків.',
    emphasis8: 'У результаті ви отримуєте підготовлену податкову декларацію, яку можете самостійно перевірити, а потім подати.',
    ergebnisP2: 'Тобто шлях не закінчується анкетою та ще одним списком податкових форм. Ваші відповіді приводять до підготовленої податкової декларації.',

    h2FinanzonlineBefore: 'Як моя податкова декларація потрапляє до ', h2FinanzonlineEm: 'Finanzamt?',
    finanzP1: 'QLIXA не подає податкову декларацію до Finanzamt замість вас.',
    emphasis9: 'QLIXA готує вашу податкову декларацію. Ви перевіряєте її та самостійно подаєте до Finanzamt.',
    finanzP2: 'Arbeitnehmerveranlagung можна, зокрема, подати в електронному вигляді через FinanzOnline.',
    finanzLinkLabel: 'Перейти до FinanzOnline',

    h2SelbstBefore: 'Тобто я справді можу самостійно ', h2SelbstEm: 'підготувати податкову декларацію?',
    selbstP1: 'Так. І для цього не потрібно спочатку вивчати назви всіх австрійських податкових форм.',
    selbstLeadIn: 'З QLIXA шлях побудований простіше:',
    flow: ['ваша ситуація', 'зрозумілі запитання', 'необхідні дані', 'підготовлена податкова декларація', 'ваша перевірка', 'самостійне подання'],
    selbstP2: 'Ви починаєте не з E1, L1 або L1k.',
    emphasis10: 'Ви починаєте з того, що вже знаєте: зі своєї ситуації.',

    finalHeading: 'Підготуйте податкову декларацію з QLIXA',
    finalP1: 'Вам не потрібно спочатку розбиратися в E1, L1 та додаткових податкових формах.',
    finalP2: 'Дайте відповіді на зрозумілі запитання про свою ситуацію та пройдіть із QLIXA крок за кроком до підготовленої податкової декларації.',
    finalCta: 'Підготувати податкову декларацію з QLIXA →',
  },

  RU: {
    tag1: 'Налоговая декларация', tag2: 'Самостоятельно', tag3: 'Австрия',
    titleLine1: 'Как самостоятельно подготовить налоговую декларацию в Австрии:', titleEm: 'пошагово',
    metaTime: '🕐 ~5 мин чтения',
    toc: [
      ['#abgabe', 'Нужно ли подавать декларацию?'],
      ['#situation', 'Начните со своей ситуации'],
      ['#formulare', 'E1, L1, L1k и другие формы'],
      ['#vorwissen', 'Нужны ли предварительные знания?'],
      ['#ergebnis', 'Что я получу в результате?'],
      ['#finanzonline', 'Подача через FinanzOnline'],
      ['#selbst', 'Самостоятельная подготовка – путь'],
    ],
    backLink: '← Все статьи',

    intro1: 'Нужно подготовить налоговую декларацию в Австрии, но вы не знаете, с чего начать?',
    intro2: 'E1, L1, L1k, FinanzOnline — все эти названия могут сделать процесс намного сложнее, чем он есть на самом деле.',
    emphasis1: 'Хорошая новость: чтобы самостоятельно подготовить налоговую декларацию, вам не нужно сначала разбираться во всех налоговых формах и изучать австрийское налоговое законодательство.',
    intro3: 'Гораздо проще начать с того, что вы уже знаете о себе: где вы работали, какие доходы получали, были ли дополнительные расходы, есть ли у вас дети и какие ещё обстоятельства были важны в течение налогового года.',
    emphasis2: 'Именно здесь появляется основная идея QLIXA.',
    intro4: 'Вместо налоговых форм вы начинаете с понятных вопросов о своей ситуации.',

    h2AbgabeBefore: 'А мне вообще нужно подавать ', h2AbgabeEm: 'налоговую декларацию?',
    abgabeP1: 'Это зависит от вашей ситуации.',
    abgabeP2: 'Если вы работаете по найму в Австрии, Finanzamt уже получает часть информации о ваших доходах от работодателя — в частности, данные годового Lohnzettel.',
    abgabeP3: 'В некоторых случаях Finanzamt может провести antragslose Arbeitnehmerveranlagung — автоматический налоговый расчёт без подачи заявления с вашей стороны.',
    abgabeP4: 'Но это не означает, что вам больше нечего указывать или что все обстоятельства вашей личной ситуации уже были учтены.',
    abgabeP5: 'Например, у вас могли быть дополнительные расходы, связанные с работой. Значение могут иметь обстоятельства, связанные с семьёй или детьми. При Arbeitnehmerveranlagung также могут учитываться определённые Werbungskosten, Sonderausgaben или außergewöhnliche Belastungen.',
    abgabeP6: 'Даже если Finanzamt уже провёл antragslose Arbeitnehmerveranlagung, добровольную Arbeitnehmerveranlagung можно подать в течение предусмотренного пятилетнего срока.',
    abgabeP7: 'В других ситуациях — например, при самостоятельной деятельности или определённых дополнительных доходах — может потребоваться Einkommensteuererklärung. Но вам не нужно начинать с самостоятельного выяснения, какая именно австрийская налоговая форма вам нужна.',

    h2SituationBefore: 'Начните не с налоговых форм, а ', h2SituationEm: 'со своей ситуации',
    situationIntro: 'Начните с более простых вопросов о себе:',
    fragen: [
      'Вы работали по найму?',
      'Были самозанятым?',
      'Или совмещали оба варианта?',
      'У вас есть дети?',
      'Были дополнительные доходы?',
      'Расходы, связанные с работой?',
      'Доходы из-за границы или от аренды?',
    ],
    situationQuoteLead: 'На такие вопросы гораздо проще ответить, чем на:',
    situationQuote: 'Мне нужна форма E1, L1, L1k или ещё какое-то приложение?',
    situationP1: 'Именно так работает QLIXA.',
    emphasis3: 'Следующие вопросы зависят от ваших предыдущих ответов.',
    situationP2: 'Вместо большой налоговой формы с незнакомыми полями вы шаг за шагом проходите через собственную ситуацию.',
    emphasis4: 'Так постепенно собирается информация, необходимая для подготовки вашей налоговой декларации.',

    ctaLabel: 'Как работает QLIXA Tax Return →',

    h2FormulareBefore: 'А что тогда делать с E1, L1, L1k и ', h2FormulareEm: 'другими налоговыми формами?',
    formulareP1: 'В Австрии для разных ситуаций используются разные налоговые формы и приложения.',
    formulareP2: 'Для Arbeitnehmerveranlagung основной является форма L1. В зависимости от ситуации могут потребоваться дополнительные формы — например, L1k для определённых данных, связанных с детьми, L1ab для außergewöhnliche Belastungen или L1i для определённых международных ситуаций.',
    formulareP3: 'Для Einkommensteuererklärung используется E1, а в зависимости от видов дохода и личной ситуации могут потребоваться дополнительные приложения.',
    formulareQ: 'Звучит сложно?',
    formulareLeadIn: 'Именно поэтому QLIXA не начинает с вопроса:',
    formulareQuote: 'Какую налоговую форму вы хотите заполнить?',
    formulareInsteadLabel: 'Вместо этого появляются понятные вопросы:',
    formulareQuestions: [
      'Как вы работали?',
      'Какие доходы получали?',
      'У вас есть дети?',
      'Какие расходы у вас были?',
    ],
    emphasis5: 'Если вы используете QLIXA, вам не нужно начинать подготовку налоговой декларации с изучения названий и номеров налоговых форм.',
    formulareP4: 'Вы отвечаете на понятные вопросы о своей ситуации. QLIXA использует введённые вами данные для подготовки налоговой декларации в рамках поддерживаемых продуктом случаев.',

    h2VorwissenBefore: 'Нужно ли заранее знать, какие ', h2VorwissenEm: 'расходы и данные понадобятся?',
    vorwissenP1: 'Нет — именно в этом одно из преимуществ такого подхода.',
    vorwissenP2: 'Вам не нужно сначала изучать длинный список налоговых категорий и самостоятельно выяснять, в какое поле налоговой формы относится та или иная информация.',
    vorwissenP3: 'QLIXA шаг за шагом задаёт подходящие вопросы на основе ваших предыдущих ответов и помогает проверить возможные категории, которые могут соответствовать введённым вами данным.',
    vorwissenP4: 'Конечно, это не означает, что каждый расход автоматически может быть учтён для целей налогообложения. Для разных категорий действуют разные условия.',
    emphasis6: 'Но вам не нужно сначала изучать структуру австрийской налоговой декларации, чтобы начать её подготовку.',

    h2ErgebnisBefore: 'Что я получу ', h2ErgebnisEm: 'в результате?',
    ergebnisLeadIn: 'Это важный момент:',
    emphasis7: 'QLIXA — не просто анкета, после которой вы получаете список своих ответов.',
    ergebnisP1: 'Вы проходите адаптивный опрос. Введённая информация используется для подготовки вашей налоговой декларации и — если это необходимо для поддерживаемой продуктом ситуации — соответствующих приложений.',
    emphasis8: 'В результате вы получаете подготовленную налоговую декларацию, которую можете самостоятельно проверить, а затем подать.',
    ergebnisP2: 'То есть путь не заканчивается анкетой и ещё одним списком налоговых форм. Ваши ответы приводят к подготовленной налоговой декларации.',

    h2FinanzonlineBefore: 'Как моя налоговая декларация попадает в ', h2FinanzonlineEm: 'Finanzamt?',
    finanzP1: 'QLIXA не подаёт налоговую декларацию в Finanzamt вместо вас.',
    emphasis9: 'QLIXA подготавливает вашу налоговую декларацию. Вы проверяете её и самостоятельно подаёте в Finanzamt.',
    finanzP2: 'Arbeitnehmerveranlagung можно, в частности, подать электронно через FinanzOnline. Для Einkommensteuererklärung электронная подача через FinanzOnline также является стандартным способом подачи.',
    finanzLinkLabel: 'Перейти в FinanzOnline',

    h2SelbstBefore: 'Получается, я действительно могу самостоятельно ', h2SelbstEm: 'подготовить налоговую декларацию?',
    selbstP1: 'Да. И для этого не нужно сначала изучать названия всех австрийских налоговых форм.',
    selbstLeadIn: 'С QLIXA путь построен проще:',
    flow: ['ваша ситуация', 'понятные вопросы', 'необходимые данные', 'подготовленная налоговая декларация', 'ваша проверка', 'самостоятельная подача'],
    selbstP2: 'Вы начинаете не с E1, L1 или L1k.',
    emphasis10: 'Вы начинаете с того, что уже знаете: со своей ситуации.',

    finalHeading: 'Подготовьте налоговую декларацию с QLIXA',
    finalP1: 'Вам не нужно сначала разбираться в E1, L1 и дополнительных налоговых формах.',
    finalP2: 'Ответьте на понятные вопросы о своей ситуации и пройдите с QLIXA шаг за шагом до подготовленной налоговой декларации.',
    finalCta: 'Подготовить налоговую декларацию с QLIXA →',
  },
}

// Official BMF/FinanzOnline destination only, per the Phase 8 new-
// article brief — no commercial tax-service link.
const FINANZONLINE_URL = 'https://finanzonline.bmf.gv.at/'

// `locale`, when provided, makes this page's own internal links
// locale-aware via localeHref — same dual-mode contract as every other
// *Content component (see AustriaIdContent.tsx's own doc comment). Both
// the inline and the final product CTA deliberately link to this
// article's own locale's /tax-return marketing page (localeHref), NOT
// the Cabinet app — per the explicit "Final CTA follows the same rule"
// requirement in the EN/UA/RU localization brief. (The Cabinet-app
// `cabinetUrl` pattern used by some other articles' final CTAs is
// intentionally NOT reused here.)
export default function SteuererklaerungSelbstVorbereitenContent({ lang, locale }: { lang: InternalLangKey; locale?: Locale }) {
  const t = T[lang] || T.DE
  const taxReturnHref = localeHref(locale ?? 'de', '/tax-return')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray)' }}>
      <Navbar locale={locale} />

      {/* Hero — text-only: no cover photo exists yet for this article
          (unlike the 5 existing articles, which each have a dedicated
          photo). Omitting the image column keeps the hero honest rather
          than inventing or reusing an unrelated image; the two-column
          .article-hero-row/.article-hero-image pattern can be added
          later once a real cover exists. */}
      <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
            <Badge variant="tagPrimary">{t.tag1}</Badge>
            <Badge variant="tagSecondary">{t.tag2}</Badge>
            <Badge variant="tagSecondary">{t.tag3}</Badge>
          </div>
          <h1 className="article-h1" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
            {t.titleLine1}<br />
            <em style={{ color: '#038390', fontStyle: 'italic' }}>{t.titleEm}</em>
          </h1>
          <div className="article-meta-row" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: 'var(--color-gray)' }}>
            <span>{t.metaTime}</span>
          </div>
        </div>
      </section>

      {/* Article body + sidebar */}
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 16px 80px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar — now registered in src/lib/articles.ts (Phase 8
            EN/UA/RU localization brief, section 9), so this correctly
            highlights itself as the current article in all 4 locales. */}
        <ArticleSidebar currentSlug="steuererklaerung-selbst-vorbereiten" lang={lang} locale={locale} />

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <ArticleTOC items={t.toc} lang={lang} />

          {/* Back link */}
          <Link href={locale ? localeHref(locale, '/articles') : '/articles'} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text3)', textDecoration: 'none', marginBottom: 32 }}>
            {t.backLink}
          </Link>

          {/* Intro */}
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro1}</p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro2}</p>
          <Emphasis>{t.emphasis1}</Emphasis>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.intro3}</p>
          <Emphasis>{t.emphasis2}</Emphasis>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 32 }}>{t.intro4}</p>

          {/* 1. Muss ich überhaupt eine Steuererklärung abgeben? */}
          <h2 id="abgabe" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2AbgabeBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2AbgabeEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP4}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP5}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.abgabeP6}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.abgabeP7}</p>
          </div>

          {/* 2. Fang nicht mit Steuerformularen an */}
          <h2 id="situation" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2SituationBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2SituationEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationIntro}</p>

            <div className="article-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {t.fragen.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>{t.situationQuoteLead}</p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text2)', margin: '0 0 18px', paddingLeft: 14, borderLeft: '2px solid var(--line2)' }}>
              &ldquo;{t.situationQuote}&rdquo;
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationP1}</p>
            <Emphasis>{t.emphasis3}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.situationP2}</p>
            <Emphasis>{t.emphasis4}</Emphasis>
          </div>

          {/* Inline product CTA — links to the current localized DE
              Tax Return page via localeHref, never a hardcoded /de/...
              path, so it never drops the locale. */}
          <Link href={taxReturnHref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 18px', borderRadius: 12, border: '1.5px solid #038390', background: 'var(--peach-light)', textDecoration: 'none', marginBottom: 32, flexWrap: 'wrap' as const }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#026B76' }}>{t.ctaLabel}</span>
          </Link>

          {/* 3. E1, L1, L1k und die anderen Steuerformulare */}
          <h2 id="formulare" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2FormulareBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2FormulareEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.formulareP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10, fontWeight: 600 }}>{t.formulareQ}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>{t.formulareLeadIn}</p>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text2)', margin: '0 0 18px', paddingLeft: 14, borderLeft: '2px solid var(--line2)' }}>
              &ldquo;{t.formulareQuote}&rdquo;
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 10 }}>{t.formulareInsteadLabel}</p>
            <div className="article-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
              {t.formulareQuestions.map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--gray)', borderRadius: 10, padding: '11px 14px', border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>&ldquo;{q}&rdquo;</span>
                </div>
              ))}
            </div>
            <Emphasis>{t.emphasis5}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.formulareP4}</p>
          </div>

          {/* 4. Muss ich vorher wissen, welche Ausgaben ich brauche? */}
          <h2 id="vorwissen" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2VorwissenBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2VorwissenEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP2}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP3}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.vorwissenP4}</p>
            <Emphasis>{t.emphasis6}</Emphasis>
          </div>

          {/* 5. Was bekomme ich am Ende? */}
          <h2 id="ergebnis" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2ErgebnisBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2ErgebnisEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            {t.ergebnisLeadIn && (
              <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14, fontWeight: 600 }}>{t.ergebnisLeadIn}</p>
            )}
            <Emphasis>{t.emphasis7}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.ergebnisP1}</p>
            <Emphasis>{t.emphasis8}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)' }}>{t.ergebnisP2}</p>
          </div>

          {/* 6. Wie kommt meine Steuererklärung zum Finanzamt? */}
          <h2 id="finanzonline" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2FinanzonlineBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2FinanzonlineEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.finanzP1}</p>
            <Emphasis>{t.emphasis9}</Emphasis>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.finanzP2}</p>
            <p><ExtLink href={FINANZONLINE_URL}>{t.finanzLinkLabel}</ExtLink></p>
          </div>

          {/* 7. Kann ich meine Steuererklärung also wirklich selbst vorbereiten? */}
          <h2 id="selbst" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, color: 'var(--charcoal)', marginBottom: 16, scrollMarginTop: '80px' }}>
            {t.h2SelbstBefore}<em style={{ fontStyle: 'italic', color: '#038390' }}>{t.h2SelbstEm}</em>
          </h2>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--line)', boxShadow: 'var(--shadow)', marginBottom: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstP1}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstLeadIn}</p>

            {/* Flow — flex-wrap only (no fixed-column grid), so it wraps
                naturally at any width instead of being forced into one
                horizontal row on small screens. */}
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 8, marginBottom: 18 }}>
              {t.flow.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#026B76', background: 'rgba(3,131,144,0.1)', padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap' as const }}>
                    {step}
                  </span>
                  {i < t.flow.length - 1 && <span style={{ color: '#038390', fontSize: 14 }}>→</span>}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--charcoal)', marginBottom: 14 }}>{t.selbstP2}</p>
            <Emphasis>{t.emphasis10}</Emphasis>
          </div>

          {/* Final product CTA */}
          <div style={{ background: 'linear-gradient(135deg, #038390 0%, #026B76 100%)', borderRadius: 16, padding: '32px 28px', marginBottom: 8, textAlign: 'center' as const }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.8vw,30px)', color: '#fff', marginBottom: 14, fontWeight: 400 }}>
              {t.finalHeading}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 8px' }}>{t.finalP1}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 22px' }}>{t.finalP2}</p>
            <ButtonLink href={taxReturnHref} style={{ background: '#fff', color: '#026B76' }}>
              {t.finalCta}
            </ButtonLink>
          </div>

          {/* Prev / Next navigation — now meaningful since this article
              is registered in src/lib/articles.ts (see ArticleSidebar's
              own comment above). */}
          <ArticlePrevNext currentSlug="steuererklaerung-selbst-vorbereiten" lang={lang} locale={locale} />

        </div>{/* end main content */}
      </div>{/* end flex wrapper */}
      <Footer locale={locale} />
    </div>
  )
}
