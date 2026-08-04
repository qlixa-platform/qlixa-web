'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import RWRCalculator from '@/components/RWRCalculator'
import { generateChecklistPDF } from '@/components/RWRChecklists'
import { ArticleSidebar, ArticlePrevNext, ArticleTOC } from '@/components/layout/ArticleNav'

const RWR_TEXT: Record<string, any> = {
  UA: {
    tag1: 'Гайд', tag2: 'RWR+ Karte', tag3: 'Документи',
    title: 'Як підготуватися до подачі на RWR+ карту',
    intro: 'Сьогодні ми розберемо, як підготуватися до подачі на Rot-Weiß-Rot Karte Plus — на прикладі Ірини — вигаданого персонажа нашого сайту, який супроводжує вас у всіх наших матеріалах. Вона з України, більше двох років живе в Австрії та вже рік як оформила самозайнятість.',
    date: 'Липень 2026', readTime: '~15 хвилин читання',
    discBold: 'Важливо:',
    disc: "Цей матеріал підготовлений на основі реального досвіду людей, які вже подавалися на RWR+ карту та отримали її. QLIXA не є юридичним агентством і не надає індивідуальних консультацій. Завжди перевіряйте актуальні вимоги на офіційному сайті:",
    toc: [
      ['#start', 'З чого почати'], ['#docs', 'Список документів'],
      ['#income', 'Підтвердження доходу'], ['#calculator', 'Калькулятор доходу RWR+'],
      ['#language', 'Знання мови'], ['#family', 'Сімейні документи'],
      ['#kids', 'Документи для дітей'], ['#tips', 'Поради'],
      ['#checklist', 'Завантажити чекліст'],
    ],
    startH2: 'З чого починає Ірина',
    startP1: 'Ірина — з України, в Австрії вже більше двох років. Рік тому вона оформила самозайнятість і тепер хоче перейти з тимчасового захисту на повноцінну Rot-Weiß-Rot Karte Plus.',
    startP2Before: 'Перше, що вона зробила — записалася на термін у магістраті за місцем прописки. У Клагенфурті це можна зробити через',
    startP3: "Але Ірина не стала чекати термін склавши руки. Вона почала збирати документи заздалегідь і запитала у знайомих, які вже подавалися, що можуть попросити додатково. Саме так і треба!",
    timelineLabel: 'Таймлайн підготовки',
    timeline: [
      ['За 2–3 місяці', 'Записуємося на термін. Перевіряємо всі документи які потрібно оновити, замовити, перекласти або апостилювати: свідоцтва про народження, дипломи, атестати, довідки про несудимість (UA та AT). Перевіряємо термін дії закордонного паспорта.'],
      ['За 1 місяць', 'Збираємо всі документи. Робимо переклади. Готуємо фінансову виписку.'],
      ['За 2 тижні', 'Перевіряємо кожен документ. Робимо копії. Сортуємо по папках.'],
      ['День термін', "Приходимо з папкою оригіналів і папкою копій на кожного члена сім’ї."],
      ['Після подачі', "Чекаємо. Можуть зв’язатися і попросити додаткові документи — це нормально!"],
    ],
    docsH2: 'Список документів',
    docsPBefore: 'Ірина підготувала', docsPBold: 'дві папки',
    docsPAfter: ": одна з оригіналами, одна з копіями. На кожного члена сім’ї — своя папка з копіями. Так вона зробила відвідування максимально швидким — співробітник просто зібрав все і відсканував.",
    docsTipBold: 'Порада:',
    docsTipAfter: 'нічим не скріплюйте документи — їх потім сканують. Просто покладіть у папку по порядку.',
    docsA: [
      { title: 'Посвідчення переміщених осіб (Blau Card)', text: 'Принесіть всі попередні Blau Card за всі роки, що ви тут. (оригінали + копії)' },
      { title: 'Закордонний паспорт — всі сторінки', text: 'Скопіюйте ВСІ сторінки закордонного паспорта, навіть порожні. Зверніть увагу: карту видають на термін до закінчення паспорта. Якщо закордонний паспорт закінчується через рік — карта теж буде на рік, навіть якщо вам належить 3 роки. Тому краще заздалегідь подбайте про новий закордонний паспорт.', warning: 'Перевірте термін дії паспорта ДО записи на термін!' },
      { title: 'Свідоцтво про народження', text: 'Оригінал + переклад на німецьку + апостиль.' },
      { title: 'Довідка про несудимість — українська', text: 'Можна згенерувати в застосунку ДІЯ. Апостиль НЕ потрібен. Перекласти можна в будь-якому бюро перекладів. Термін дії — 3 місяці.' },
    ],
    docBezirkTitle: 'Довідка про несудимість — австрійська (Strafregisterbescheinigung)',
    docBezirkText: 'Офіційна довідка про несудимість від BMI. Саме її потрібно подавати на RWR+. Запишіться на термін через офіційний сайт:',
    docBezirkLink: 'citizen.bmi.gv.at →',
    docKSVTitle: 'Довідка KSV (Auskunft nach Art. 15 DSGVO)',
    docKSVText: 'Це довідка про ваш кредитний рейтинг та дані KSV (кредитного бюро Австрії). Термін дії — 3 місяці. Замовити безкоштовно:',
    docKSVLink: 'digitalerantrag.ksv.at →',
    docsB: [
      { title: 'E-card', text: 'Оригінал + копія.' },
      { title: 'Паспортна фотографія (45×35 мм)', text: 'Не старша 6 місяців. Приклеюється прямо в анкету-формуляр.' },
      { title: 'Meldezettel (оригінал + копія)', text: 'Це довідка про реєстрацію місця проживання в Австрії — аналог прописки. Якщо ви ще не маєте Meldezettel або переїхали — зверніться до місцевого магістрату. Оригінал + копія. Актуальний на момент подачі.' },
      { title: 'Підтвердження права на житло', text: "Договір оренди або документ про власність. Ідеально, якщо в договорі вказані всі члени сім’ї — це спростить процес. Оригінал + копія." },
    ],
    docFormTitle: "Заповнений формуляр Antragsformulare — на кожного члена сім’ї окремо",
    docFormText: 'Завантажити бланк можна на офіційному сайті BMI:',
    docFormBtn: '⬇️ Завантажити формуляр (BMI)',
    incomeH2: 'Підтвердження доходу',
    incomeP: 'Підтвердження наявності надійних засобів до існування — один з ключових пунктів при подачі на RWR+. Залежно від того, ким ви працюєте, документи відрізняються.',
    employedLabel: '👔 Найманий працівник',
    employedItems: [
      { doc: 'Відомості про заробітну плату (Lohnzettel)', desc: 'Офіційний документ від роботодавця про нараховану зарплату. Зазвичай видається щомісяця або на запит.' },
      { doc: 'Довідка про зарплату від роботодавця', desc: 'Письмове підтвердження розміру зарплати — може бути у вільній формі або на бланку компанії.' },
      { doc: 'Контракт з роботодавцем', desc: 'Трудовий договір, що підтверджує вашу зайнятість та умови праці в Австрії.' },
    ],
    selfEmployedLabel: '💼 Самозайнятий',
    selfEmployedItems: [
      'Einkommensteuerbescheid — офіційна довідка про доходи від Finanzamt (завантажується з FinanzOnline). Якщо ще не маєте — можна подати Gewinnbestätigung / Selbsterklärung, тобто самостійно складену декларацію про прибуток.',
      'Unbedenklichkeitsbescheinigung з Finanzamt — довідка про відсутність податкових заборгованостей перед державою. Замовляється у вашому Finanzamt.',
      'Unbedenklichkeitsbescheinigung з SVA — аналогічна довідка від SVA (Sozialversicherungsanstalt der Selbständigen) — страхового органу для самозайнятих. Підтверджує відсутність боргів по соціальному страхуванню.',
    ],
    irynaLabel: 'Як це вирішила Ірина',
    irynaP1Before: 'Ірина подавалася на початку січня, тому офіційного Einkommensteuerbescheid з FinanzOnline у неї ще не було. Вона могла б звернутися до бухгалтера — але Ірина веде бухгалтерію сама. Тому вона заповнила',
    irynaP1Bold: 'Gewinnbestätigung / Selbsterklärung',
    irynaP1After: '— самодекларацію про доходи — власноруч, вписала всі свої дані та прибуток за рік. Подала — і її прийняли без питань.',
    exampleLabel: '📄 Приклад довідки Ірина',
    exampleP: 'Нижче — приклад Gewinnbestätigung, яку Ірина підготувала самостійно і подала до магістрату. Це лише приклад для ознайомлення. Дані і цифри відносяться виключно до ситуації вигаданого персонажа Ірина. Не використовуйте як шаблон.',
    exampleBtn: '📄 Переглянути приклад довідки (PDF)',
    irynaP2: 'Прибуток у Ірини в цьому році невеликий — вона тільки починала свою діяльність і багато часу витратила на пошук клієнтів. Але у неї були кошти на рахунку. Саме це вона вирішила використати як фінансову подушку та підстрахувати себе для отримання RWR+.',
    calcPromptP1: 'Хочете дізнатися, чи вистачає саме вашого доходу — і скільки потрібно показати на рахунку у вашій конкретній ситуації?',
    calcPromptP2: 'Ми зробили для цього окремий калькулятор — він все порахує за вас.',
    afterCalcTip: 'Іноді просять підтвердити точні суми оренди та комунальних — для цього просять виписку з банку за останні 3 місяці. Можна зробити вибірку лише по цих статтях в онлайн-банкінгу, щоб не друкувати тонни сторінок з покупками.',
    afterCalcP: 'Ірина порахувала все, підготувала виписки і склала повний пакет фінансових документів. Тепер залишалося вирішити ще одне питання — підтвердити знання мови.',
    langH2: 'Підтвердження знання німецької мови',
    langP1: "Ірина ще не встигла добре вивчити мову — це знайоме багатьом. Але Австрія про це подумала і передбачила альтернативу.",
    variant1Label: 'Варіант 1 — мовний сертифікат',
    variant1Lines: ['A1 — дійсний 1 рік', 'A2 — дійсний 1 рік (при A2 можуть видати карту на 3 роки)', 'B1 — дійсний 2 роки'],
    variant2Label: 'Варіант 2 — університетський диплом (як у Ірини!)',
    variant2Before: 'Якщо ваш університет має статус', variant2Bold: 'H+', variant2Mid: 'у списку',
    variant2LinkText: 'anabin.kmk.org',
    variant2After: '— це рівнозначна альтернатива мовному сертифікату. Перевірте свій заклад!',
    langP2: 'Ірина обрала саме цей варіант. Для нього знадобилося підготувати:',
    langItems: [
      'Атестат про закінчену середню освіту + додаток з оцінками (ориг. + переклад + апостиль)',
      'Диплом бакалавра + додаток з оцінками і годинами (ориг. + переклад + апостиль)',
      'Диплом спеціаліста/магістра + додаток (ориг. + переклад + апостиль)',
    ],
    langWarning: "⚠️ Атестат у Ірини попросили по email вже через кілька днів після подачі. Це нормально! Можуть зв’язуватися і просити документи ще довго після термін. Не переживайте — просто відповідайте.",
    familyH2: 'Сімейні документи (якщо є)',
    familyP: 'Залежно від вашої унікальної ситуації можуть знадобитися:',
    familyItems: [
      'Свідоцтво про шлюб / партнерство / усиновлення (ориг. + переклад + апостиль)',
      'Довідка про родинні стосунки (ориг. + переклад + апостиль)',
      'Bestätigung über den Bezug von Familienbeihilfe — підтвердження отримання сімейної допомоги (Familienbeihilfe). Якщо ви отримуєте цю виплату на дітей — цей документ може знадобитися. Витягнути можна з особистого кабінету FinanzOnline.',
    ],
    kidsH2: 'Документи для дітей',
    kidsP: 'У Ірини є син, якому 11 років. Вона заповнює на нього окрему анкету і збирає окремий пакет документів. На кожну дитину — своя папка з копіями.',
    kidsItems: [
      { text: 'Посвідчення переміщених осіб (блакитна картка / Ausweis für Vertriebene)', note: 'Копії + оригінали' },
      { text: 'Дійсний закордонний паспорт дитини — всі сторінки', note: 'Зробіть копії або скани всіх сторінок заздалегідь' },
      { text: 'Свідоцтво про народження або документ що підтверджує родинні стосунки', note: 'Оригінал + переклад на німецьку + апостиль' },
      { text: 'Паспортна фотографія (45×35 мм, не старша 6 місяців)', note: 'Приклеюється в анкету' },
      { text: 'E-card дитини', note: 'Оригінал + копія' },
      { text: 'Meldezettel дитини', note: 'Оригінал + копія' },
      { text: 'Schulbesuchsbestätigung — довідка про відвідування школи', note: 'Попросіть у секретаріаті школи' },
      { text: 'Останній шкільний табель (Zeugnis)', note: '⚠️ Важливо: за умовами RWR+ потрібна задовільна оцінка з німецької мови (4 і нижче за австрійською шкалою (1 — відмінно, 5 — незадовільно))' },
    ],
    kidsFormLabel: 'Заповнений формуляр Antragsformulare на дитину',
    kidsFormP: 'На кожну дитину — окремий формуляр. Завантажити:',
    kidsFormBtn: 'bmi.gv.at/312/60a/start.html →',
    tipsH2: 'Поради від людей, які вже подавалися і отримали карту',
    tipsP: 'Не факт, що у вашому випадку буде саме так — але краще бути готовими:',
    tipsItems: [
      ['Нічим не скріплюйте документи', 'Їх потім сканують. Просто покладіть у папку по порядку.'],
      ['Суму оренди вказуйте тільки у головного заявника', "Якщо решта членів сім’ї подаються разом — у них цього поля не заповнюємо."],
      ['Дохід вказуємо НЕТТО', 'Не брутто.'],
      ['Blau Card не вилучають', 'При подачі на RWR+ ваша діюча блакитна картка залишається у вас (пункт 14 формуляра).'],
      ['Після подачі можуть запитати ще документи', "Це нормально. Відповідайте і надсилайте. Інколи не зв’яжуться взагалі — залежить від конкретного працівника."],
      ['Виписка з банку', 'Іноді просять підтвердити суми оренди та комунальних за 3 місяці. Зробіть вибірку в онлайн-банкінгу.'],
      ['Bestätigung Familienbeihilfe', 'Іноді просять. Можна витягнути з особистого кабінету FinanzOnline.'],
    ],
    checklistH2: 'Завантажте чекліст підготовки документів',
    checklistP: 'Оберіть свій варіант — чекліст з квадратиками для відміток:',
    card1: { badge: 'Безкоштовно від QLIXA', title: 'Для найманих працівників', desc: 'Чекліст документів для тих, хто працює за наймом в Австрії.', btn: '⬇️ Завантажити PDF' },
    card2: { badge: 'Безкоштовно від QLIXA', title: 'Для самозайнятих', desc: 'Чекліст документів для самозайнятих та підприємців в Австрії.', btn: '⬇️ Завантажити PDF' },
    card3: { badge: 'Безкоштовно від QLIXA', title: 'Для дітей', desc: 'Чекліст документів на кожну дитину — окремо.', btn: '⬇️ Завантажити PDF' },
    bannerTitle: 'Інтерактивний чекліст RWR+ — незабаром',
    bannerP: 'Зареєструйтеся в QLIXA — і ви зможете відмічати готові документи, додавати власні нотатки, зберігати дати отримання довідок та повертатися до підготовки у будь-який момент.',
    bannerBtn: 'Отримати доступ — незабаром',
    backLink: '← Повернутися до всіх статей',
  },
  RU: {
    tag1: 'Гайд', tag2: 'RWR+ Karte', tag3: 'Документы',
    title: 'Как подготовиться к подаче на карту RWR+',
    intro: 'Сегодня мы разберём, как подготовиться к подаче на Rot-Weiß-Rot Karte Plus — на примере Ирины — вымышленного персонажа нашего сайта, который сопровождает вас во всех наших материалах. Она из Украины, более двух лет живёт в Австрии и уже год как оформила самозанятость.',
    date: 'Июль 2026', readTime: '~15 минут чтения',
    discBold: 'Важно:',
    disc: 'Этот материал подготовлен на основе реального опыта людей, которые уже подавали на карту RWR+ и получили её. QLIXA не является юридическим агентством и не предоставляет индивидуальных консультаций. Всегда проверяйте актуальные требования на официальном сайте:',
    toc: [
      ['#start', 'С чего начать'], ['#docs', 'Список документов'],
      ['#income', 'Подтверждение дохода'], ['#calculator', 'Калькулятор дохода RWR+'],
      ['#language', 'Знание языка'], ['#family', 'Семейные документы'],
      ['#kids', 'Документы для детей'], ['#tips', 'Советы'],
      ['#checklist', 'Скачать чеклист'],
    ],
    startH2: 'С чего начинает Ирина',
    startP1: 'Ирина — из Украины, в Австрии уже более двух лет. Год назад она оформила самозанятость и теперь хочет перейти с временной защиты на полноценную Rot-Weiß-Rot Karte Plus.',
    startP2Before: 'Первое, что она сделала — записалась на приём в магистрат по месту прописки. В Клагенфурте это можно сделать через',
    startP3: 'Но Ирина не стала ждать, сложа руки. Она начала собирать документы заранее и спросила у знакомых, которые уже подавали, что могут попросить дополнительно. Именно так и нужно!',
    timelineLabel: 'Таймлайн подготовки',
    timeline: [
      ['За 2–3 месяца', 'Записываемся на приём. Проверяем все документы, которые нужно обновить, заказать, перевести или апостилировать: свидетельства о рождении, дипломы, аттестаты, справки о несудимости (UA и AT). Проверяем срок действия загранпаспорта.'],
      ['За 1 месяц', 'Собираем все документы. Делаем переводы. Готовим финансовую выписку.'],
      ['За 2 недели', 'Проверяем каждый документ. Делаем копии. Сортируем по папкам.'],
      ['День приёма', 'Приходим с папкой оригиналов и папкой копий на каждого члена семьи.'],
      ['После подачи', 'Ждём. Могут связаться и попросить дополнительные документы — это нормально!'],
    ],
    docsH2: 'Список документов',
    docsPBefore: 'Ирина подготовила', docsPBold: 'две папки',
    docsPAfter: ': одна с оригиналами, одна с копиями. На каждого члена семьи — своя папка с копиями. Так она сделала визит максимально быстрым — сотрудник просто собрал всё и отсканировал.',
    docsTipBold: 'Совет:',
    docsTipAfter: 'ничем не скрепляйте документы — их потом сканируют. Просто положите в папку по порядку.',
    docsA: [
      { title: 'Удостоверение перемещённого лица (Blau Card)', text: 'Принесите все предыдущие Blau Card за все годы, что вы здесь. (оригиналы + копии)' },
      { title: 'Загранпаспорт — все страницы', text: 'Скопируйте ВСЕ страницы загранпаспорта, включая пустые. Обратите внимание: карта выдаётся на срок до истечения паспорта. Если загранпаспорт заканчивается через год — карта тоже будет на год, даже если вам положено 3 года. Поэтому лучше заранее позаботьтесь о новом загранпаспорте.', warning: 'Проверьте срок действия паспорта ДО записи на приём!' },
      { title: 'Свидетельство о рождении', text: 'Оригинал + перевод на немецкий + апостиль.' },
      { title: 'Справка о несудимости — украинская', text: 'Можно сгенерировать в приложении ДИЯ. Апостиль НЕ нужен. Перевести можно в любом бюро переводов. Срок действия — 3 месяца.' },
    ],
    docBezirkTitle: 'Справка о несудимости — австрийская (Strafregisterbescheinigung)',
    docBezirkText: 'Официальная справка о несудимости от BMI. Именно её нужно подавать на RWR+. Запишитесь на приём через официальный сайт:',
    docBezirkLink: 'citizen.bmi.gv.at →',
    docKSVTitle: 'Справка KSV (Auskunft nach Art. 15 DSGVO)',
    docKSVText: 'Это справка о вашем кредитном рейтинге и данных KSV (кредитного бюро Австрии). Срок действия — 3 месяца. Заказать бесплатно:',
    docKSVLink: 'digitalerantrag.ksv.at →',
    docsB: [
      { title: 'E-card', text: 'Оригинал + копия.' },
      { title: 'Фотография на документы (45×35 мм)', text: 'Не старше 6 месяцев. Вклеивается прямо в анкету-формуляр.' },
      { title: 'Meldezettel (оригинал + копия)', text: 'Это справка о регистрации места жительства в Австрии — аналог прописки. Если у вас ещё нет Meldezettel или вы переехали — обратитесь в местный магистрат. Оригинал + копия. Актуальный на момент подачи.' },
      { title: 'Подтверждение права на жильё', text: 'Договор аренды или документ о собственности. Идеально, если в договоре указаны все члены семьи — это упростит процесс. Оригинал + копия.' },
    ],
    docFormTitle: 'Заполненный формуляр Antragsformulare — на каждого члена семьи отдельно',
    docFormText: 'Скачать бланк можно на официальном сайте BMI:',
    docFormBtn: '⬇️ Скачать формуляр (BMI)',
    incomeH2: 'Подтверждение дохода',
    incomeP: 'Подтверждение наличия надёжных средств к существованию — один из ключевых пунктов при подаче на RWR+. В зависимости от того, кем вы работаете, документы отличаются.',
    employedLabel: '👔 Наёмный работник',
    employedItems: [
      { doc: 'Сведения о заработной плате (Lohnzettel)', desc: 'Официальный документ от работодателя о начисленной зарплате. Обычно выдаётся ежемесячно или по запросу.' },
      { doc: 'Справка о зарплате от работодателя', desc: 'Письменное подтверждение размера зарплаты — может быть в свободной форме или на бланке компании.' },
      { doc: 'Контракт с работодателем', desc: 'Трудовой договор, подтверждающий вашу занятость и условия труда в Австрии.' },
    ],
    selfEmployedLabel: '💼 Самозанятый',
    selfEmployedItems: [
      'Einkommensteuerbescheid — официальная справка о доходах от Finanzamt (скачивается с FinanzOnline). Если ещё нет — можно подать Gewinnbestätigung / Selbsterklärung, то есть самостоятельно составленную декларацию о доходах.',
      'Unbedenklichkeitsbescheinigung из Finanzamt — справка об отсутствии налоговых задолженностей перед государством. Заказывается в вашем Finanzamt.',
      'Unbedenklichkeitsbescheinigung из SVA — аналогичная справка от SVA (Sozialversicherungsanstalt der Selbständigen) — страхового органа для самозанятых. Подтверждает отсутствие долгов по социальному страхованию.',
    ],
    irynaLabel: 'Как это решила Ирина',
    irynaP1Before: 'Ирина подавала документы в начале января, поэтому официального Einkommensteuerbescheid из FinanzOnline у неё ещё не было. Она могла бы обратиться к бухгалтеру — но Ирина ведёт бухгалтерию сама. Поэтому она заполнила',
    irynaP1Bold: 'Gewinnbestätigung / Selbsterklärung',
    irynaP1After: '— самодекларацию о доходах — самостоятельно, вписала все свои данные и прибыль за год. Подала — и её приняли без вопросов.',
    exampleLabel: '📄 Пример справки Ирина',
    exampleP: 'Ниже — пример Gewinnbestätigung, которую Ирина подготовила самостоятельно и подала в магистрат. Это лишь пример для ознакомления. Данные и цифры относятся исключительно к ситуации вымышленного персонажа Ирина. Не используйте как шаблон.',
    exampleBtn: '📄 Посмотреть пример справки (PDF)',
    irynaP2: 'Доход у Ирины в этом году небольшой — она только начинала свою деятельность и много времени потратила на поиск клиентов. Но у неё были средства на счету. Именно это она решила использовать как финансовую подушку и подстраховаться для получения RWR+.',
    calcPromptP1: 'Хотите узнать, достаточно ли именно вашего дохода — и сколько нужно показать на счету в вашей конкретной ситуации?',
    calcPromptP2: 'Мы сделали для этого отдельный калькулятор — он всё посчитает за вас.',
    afterCalcTip: 'Иногда просят подтвердить точные суммы аренды и коммунальных — для этого просят выписку из банка за последние 3 месяца. Можно сделать выборку только по этим статьям в онлайн-банкинге, чтобы не печатать тонны страниц с покупками.',
    afterCalcP: 'Ирина всё посчитала, подготовила выписки и составила полный пакет финансовых документов. Теперь оставалось решить ещё один вопрос — подтвердить знание языка.',
    langH2: 'Подтверждение знания немецкого языка',
    langP1: 'Ирина ещё не успела хорошо выучить язык — это знакомо многим. Но Австрия об этом подумала и предусмотрела альтернативу.',
    variant1Label: 'Вариант 1 — языковой сертификат',
    variant1Lines: ['A1 — действителен 1 год', 'A2 — действителен 1 год (при A2 могут выдать карту на 3 года)', 'B1 — действителен 2 года'],
    variant2Label: 'Вариант 2 — университетский диплом (как у Ирины!)',
    variant2Before: 'Если ваш университет имеет статус', variant2Bold: 'H+', variant2Mid: 'в списке',
    variant2LinkText: 'anabin.kmk.org',
    variant2After: '— это равнозначная альтернатива языковому сертификату. Проверьте свой вуз!',
    langP2: 'Ирина выбрала именно этот вариант. Для него понадобилось подготовить:',
    langItems: [
      'Аттестат об окончании средней школы + приложение с оценками (ориг. + перевод + апостиль)',
      'Диплом бакалавра + приложение с оценками и часами (ориг. + перевод + апостиль)',
      'Диплом специалиста/магистра + приложение (ориг. + перевод + апостиль)',
    ],
    langWarning: '⚠️ Аттестат у Ирины запросили по email уже через несколько дней после подачи. Это нормально! Могут связываться и просить документы ещё долго после приёма. Не переживайте — просто отвечайте.',
    familyH2: 'Семейные документы (если есть)',
    familyP: 'В зависимости от вашей уникальной ситуации могут понадобиться:',
    familyItems: [
      'Свидетельство о браке / партнёрстве / усыновлении (ориг. + перевод + апостиль)',
      'Справка о родственных связях (ориг. + перевод + апостиль)',
      'Bestätigung über den Bezug von Familienbeihilfe — подтверждение получения семейной помощи (Familienbeihilfe). Если вы получаете эту выплату на детей — этот документ может понадобиться. Скачать можно из личного кабинета FinanzOnline.',
    ],
    kidsH2: 'Документы для детей',
    kidsP: 'У Ирины есть сын, которому 11 лет. Она заполняет на него отдельную анкету и собирает отдельный пакет документов. На каждого ребёнка — своя папка с копиями.',
    kidsItems: [
      { text: 'Удостоверение перемещённого лица (синяя карточка / Ausweis für Vertriebene)', note: 'Копии + оригиналы' },
      { text: 'Действительный загранпаспорт ребёнка — все страницы', note: 'Сделайте копии или сканы всех страниц заранее' },
      { text: 'Свидетельство о рождении или документ, подтверждающий родственные связи', note: 'Оригинал + перевод на немецкий + апостиль' },
      { text: 'Фотография на документы (45×35 мм, не старше 6 месяцев)', note: 'Вклеивается в анкету' },
      { text: 'E-card ребёнка', note: 'Оригинал + копия' },
      { text: 'Meldezettel ребёнка', note: 'Оригинал + копия' },
      { text: 'Schulbesuchsbestätigung — справка о посещении школы', note: 'Попросите в секретариате школы' },
      { text: 'Последний школьный табель (Zeugnis)', note: '⚠️ Важно: по условиям RWR+ нужна удовлетворительная оценка по немецкому языку (4 и ниже по австрийской шкале (1 — отлично, 5 — неудовлетворительно))' },
    ],
    kidsFormLabel: 'Заполненный формуляр Antragsformulare на ребёнка',
    kidsFormP: 'На каждого ребёнка — отдельный формуляр. Скачать:',
    kidsFormBtn: 'bmi.gv.at/312/60a/start.html →',
    tipsH2: 'Советы от людей, которые уже подавали и получили карту',
    tipsP: 'Не факт, что в вашем случае будет именно так — но лучше быть готовыми:',
    tipsItems: [
      ['Ничем не скрепляйте документы', 'Их потом сканируют. Просто положите в папку по порядку.'],
      ['Сумму аренды указывайте только у главного заявителя', 'Если остальные члены семьи подаются вместе — у них это поле не заполняем.'],
      ['Доход указываем НЕТТО', 'Не брутто.'],
      ['Blau Card не изымают', 'При подаче на RWR+ ваша действующая синяя карточка остаётся у вас (пункт 14 формуляра).'],
      ['После подачи могут запросить ещё документы', 'Это нормально. Отвечайте и отправляйте. Иногда не свяжутся вообще — зависит от конкретного сотрудника.'],
      ['Выписка из банка', 'Иногда просят подтвердить суммы аренды и коммунальных за 3 месяца. Сделайте выборку в онлайн-банкинге.'],
      ['Bestätigung Familienbeihilfe', 'Иногда просят. Можно скачать из личного кабинета FinanzOnline.'],
    ],
    checklistH2: 'Скачайте чеклист подготовки документов',
    checklistP: 'Выберите свой вариант — чеклист с квадратиками для отметок:',
    card1: { badge: 'Бесплатно от QLIXA', title: 'Для наёмных работников', desc: 'Чеклист документов для тех, кто работает по найму в Австрии.', btn: '⬇️ Скачать PDF' },
    card2: { badge: 'Бесплатно от QLIXA', title: 'Для самозанятых', desc: 'Чеклист документов для самозанятых и предпринимателей в Австрии.', btn: '⬇️ Скачать PDF' },
    card3: { badge: 'Бесплатно от QLIXA', title: 'Для детей', desc: 'Чеклист документов на каждого ребёнка — отдельно.', btn: '⬇️ Скачать PDF' },
    bannerTitle: 'Интерактивный чеклист RWR+ — скоро',
    bannerP: 'Зарегистрируйтесь в QLIXA — и вы сможете отмечать готовые документы, добавлять собственные заметки, сохранять даты получения справок и возвращаться к подготовке в любой момент.',
    bannerBtn: 'Получить доступ — скоро',
    backLink: '← Вернуться ко всем статьям',
  },
  EN: {
    tag1: "Guide", tag2: "RWR+ Karte", tag3: "Documents",
    title: "How to prepare your RWR+ card application",
    intro: "Today we'll walk through how to prepare for the Rot-Weiss-Rot Karte Plus application — using Iryna as an example, a fictional character on our site who guides you through all our materials. She's from Ukraine, has lived in Austria for over two years, and has been self-employed for a year now.",
    date: "July 2026", readTime: "~15 min read",
    discBold: "Important:",
    disc: "This material is based on the real experience of people who have already applied for and received the RWR+ card. QLIXA is not a legal agency and does not provide individual consultations. Always check the current requirements on the official website:",
    toc: [
      ["#start", "Where to Start"], ["#docs", "Document List"],
      ["#income", "Income Confirmation"], ["#calculator", "RWR+ Income Calculator"],
      ["#language", "Language Skills"], ["#family", "Family Documents"],
      ["#kids", "Documents for Children"], ["#tips", "Tips"],
      ["#checklist", "Download Checklist"],
    ],
    startH2: "Where Iryna Starts",
    startP1: "Iryna is from Ukraine and has been in Austria for over two years. A year ago she registered as self-employed, and now she wants to move from temporary protection to a full Rot-Weiss-Rot Karte Plus.",
    startP2Before: "The first thing she did was book an appointment at the local district office (Magistrat). In Klagenfurt, this can be done through",
    startP3: "But Iryna didn't just wait for her appointment. She started gathering documents in advance and asked people who had already applied what extra items might be requested. That's exactly the right approach!",
    timelineLabel: "Preparation Timeline",
    timeline: [
      ["2–3 months ahead", "Book your appointment. Check all documents that need updating, ordering, translating, or apostilling: birth certificates, diplomas, school certificates, criminal record checks (UA and AT). Check your passport expiry date."],
      ["1 month ahead", "Gather all documents. Get translations done. Prepare your bank statement."],
      ["2 weeks ahead", "Check every document. Make copies. Sort into folders."],
      ["Appointment day", "Bring a folder of originals and a folder of copies for each family member."],
      ["After submission", "Wait. They may contact you and ask for additional documents — that's normal!"],
    ],
    docsH2: "Document List",
    docsPBefore: "Iryna prepared", docsPBold: "two folders",
    docsPAfter: ": one with originals, one with copies. Each family member had their own folder of copies. This made her visit as quick as possible — the staff member just collected everything and scanned it.",
    docsTipBold: "Tip:",
    docsTipAfter: "don't staple your documents together — they get scanned afterward. Just put them in the folder in order.",
    docsA: [
      { title: "Displaced persons ID (Blau Card)", text: "Bring all your previous Blau Cards for every year you've been here. (originals + copies)" },
      { title: "Passport — all pages", text: "Copy ALL pages of your passport, even blank ones. Note: the card is issued for a period up to your passport's expiry date. If your passport expires in a year, the card will also only be valid for a year — even if you're entitled to 3 years. So it's better to renew your passport in advance.", warning: "Check your passport expiry date BEFORE booking your appointment!" },
      { title: "Birth certificate", text: "Original + German translation + apostille." },
      { title: "Criminal record certificate — Ukrainian", text: "Can be generated in the Diia app. No apostille needed. Can be translated at any translation bureau. Valid for 3 months." },
    ],
    docBezirkTitle: "Criminal record certificate — Austrian (Strafregisterbescheinigung)",
    docBezirkText: "Official criminal record certificate from the BMI. This is the one you need to submit for RWR+. Book an appointment through the official website:",
    docBezirkLink: "citizen.bmi.gv.at →",
    docKSVTitle: "KSV certificate (Auskunft nach Art. 15 DSGVO)",
    docKSVText: "This is a certificate of your credit rating and KSV data (Austria's credit bureau). Valid for 3 months. Order it for free:",
    docKSVLink: "digitalerantrag.ksv.at →",
    docsB: [
      { title: "E-card", text: "Original + copy." },
      { title: "Passport photo (45×35 mm)", text: "No older than 6 months. Glued directly onto the application form." },
      { title: "Meldezettel (original + copy)", text: "This is a registration confirmation of your address in Austria. If you don't have a Meldezettel yet or have moved, contact your local district office. Original + copy. Must be current at the time of submission." },
      { title: "Proof of right to housing", text: "A rental agreement or proof of ownership. Ideally, the agreement lists all family members — this simplifies the process. Original + copy." },
    ],
    docFormTitle: "Completed Antragsformulare — a separate one for each family member",
    docFormText: "You can download the form from the official BMI website:",
    docFormBtn: "⬇️ Download the form (BMI)",
    incomeH2: "Income Confirmation",
    incomeP: "Proof of reliable means of subsistence is one of the key requirements for the RWR+ application. Depending on your employment type, the required documents differ.",
    employedLabel: "👔 Employee",
    employedItems: [
      { doc: "Payslip (Lohnzettel)", desc: "An official document from your employer showing your calculated salary. Usually issued monthly or on request." },
      { doc: "Salary confirmation from your employer", desc: "Written confirmation of your salary amount — can be in free form or on company letterhead." },
      { doc: "Employment contract", desc: "A contract confirming your employment and working conditions in Austria." },
    ],
    selfEmployedLabel: "💼 Self-employed",
    selfEmployedItems: [
      "Einkommensteuerbescheid — an official income statement from the Finanzamt (downloadable from FinanzOnline). If you don't have one yet, you can submit a Gewinnbestätigung / Selbsterklärung — a self-prepared income declaration.",
      "Unbedenklichkeitsbescheinigung from the Finanzamt — a certificate confirming you have no outstanding tax debts. Ordered from your Finanzamt.",
      "Unbedenklichkeitsbescheinigung from SVA — a similar certificate from the SVA (Sozialversicherungsanstalt der Selbständigen), the insurance authority for the self-employed. Confirms no outstanding social insurance debts.",
    ],
    irynaLabel: "How Iryna Solved This",
    irynaP1Before: "Iryna applied in early January, so she didn't yet have an official Einkommensteuerbescheid from FinanzOnline. She could have gone to an accountant — but Iryna does her own bookkeeping. So she filled out a",
    irynaP1Bold: "Gewinnbestätigung / Selbsterklärung",
    irynaP1After: "— a self-declaration of income — by hand, entering all her data and profit for the year. She submitted it, and it was accepted without any questions.",
    exampleLabel: "📄 Iryna's Sample Certificate",
    exampleP: "Below is an example of the Gewinnbestätigung that Iryna prepared herself and submitted to the district office. This is only an example for reference. The data and figures relate solely to the fictional character Iryna's situation. Do not use it as a template.",
    exampleBtn: "📄 View sample certificate (PDF)",
    irynaP2: "Iryna's profit this year was small — she was just starting out and spent a lot of time looking for clients. But she had funds in her account. That's exactly what she decided to use as a financial cushion to secure her RWR+ application.",
    calcPromptP1: "Want to know if your income is enough — and how much you need to show in your account for your specific situation?",
    calcPromptP2: "We built a separate calculator for this — it will do all the math for you.",
    afterCalcTip: "Sometimes they ask you to confirm the exact amounts of rent and utilities — for this they ask for a bank statement from the last 3 months. You can filter just these transactions in online banking so you don't have to print tons of pages of purchases.",
    afterCalcP: "Iryna calculated everything, prepared her statements, and put together a complete package of financial documents. Now there was just one more thing left to sort out — confirming her language skills.",
    langH2: "Confirming German Language Skills",
    langP1: "Iryna hadn't had time to learn the language well yet — this is familiar to many people. But Austria thought of this and provided an alternative.",
    variant1Label: "Option 1 — Language Certificate",
    variant1Lines: ["A1 — valid for 1 year", "A2 — valid for 1 year (with A2 you may be issued a card for 3 years)", "B1 — valid for 2 years"],
    variant2Label: "Option 2 — University Diploma (like Iryna!)",
    variant2Before: "If your university has an", variant2Bold: "H+", variant2Mid: "status in the",
    variant2LinkText: "anabin.kmk.org",
    variant2After: "list — this is an equivalent alternative to the language certificate. Check your institution!",
    langP2: "Iryna chose exactly this option. For it, she needed to prepare:",
    langItems: [
      "School-leaving certificate + grade transcript (original + translation + apostille)",
      "Bachelor's diploma + transcript with grades and hours (original + translation + apostille)",
      "Specialist/Master's diploma + transcript (original + translation + apostille)",
    ],
    langWarning: "⚠️ Iryna was asked for her school certificate by email just a few days after submission. That's normal! They may contact you and ask for documents long after your appointment. Don't worry — just respond.",
    familyH2: "Family Documents (if applicable)",
    familyP: "Depending on your unique situation, you may need:",
    familyItems: [
      "Marriage / partnership / adoption certificate (original + translation + apostille)",
      "Certificate of family relationship (original + translation + apostille)",
      "Bestätigung über den Bezug von Familienbeihilfe — confirmation of receiving family allowance (Familienbeihilfe). If you receive this benefit for your children, this document may be required. It can be retrieved from your FinanzOnline account.",
    ],
    kidsH2: "Documents for Children",
    kidsP: "Iryna has an 11-year-old son. She fills out a separate application for him and gathers a separate set of documents. Each child needs their own folder of copies.",
    kidsItems: [
      { text: "Displaced persons ID (blue card / Ausweis für Vertriebene)", note: "Copies + originals" },
      { text: "Child's valid passport — all pages", note: "Make copies or scans of all pages in advance" },
      { text: "Birth certificate or document confirming family relationship", note: "Original + German translation + apostille" },
      { text: "Passport photo (45×35 mm, no older than 6 months)", note: "Glued into the application form" },
      { text: "Child's E-card", note: "Original + copy" },
      { text: "Child's Meldezettel", note: "Original + copy" },
      { text: "Schulbesuchsbestätigung — school attendance confirmation", note: "Ask the school's secretariat" },
      { text: "Latest school report card (Zeugnis)", note: "⚠️ Important: under RWR+ requirements, a satisfactory grade in German is needed (4 or lower on the Austrian scale, where 1 is excellent and 5 is unsatisfactory)" },
    ],
    kidsFormLabel: "Completed Antragsformulare for the child",
    kidsFormP: "A separate form for each child. Download:",
    kidsFormBtn: "bmi.gv.at/312/60a/start.html →",
    tipsH2: "Tips from People Who Have Already Applied and Received the Card",
    tipsP: "It might not be exactly the same in your case — but it's better to be prepared:",
    tipsItems: [
      ["Don't staple your documents together", "They get scanned afterward. Just put them in the folder in order."],
      ["Only list the rent amount for the main applicant", "If the rest of the family is applying together, leave this field blank for them."],
      ["State your income NET", "Not gross."],
      ["Your Blau Card is not confiscated", "When applying for RWR+, your current blue card stays with you (item 14 on the form)."],
      ["They may ask for more documents after submission", "That's normal. Respond and send them. Sometimes they won't contact you at all — it depends on the specific case worker."],
      ["Bank statement", "Sometimes they ask you to confirm rent and utility amounts for 3 months. Filter these in online banking."],
      ["Bestätigung Familienbeihilfe", "Sometimes requested. Can be retrieved from your FinanzOnline account."],
    ],
    checklistH2: "Download the Document Preparation Checklist",
    checklistP: "Choose your version — a checklist with checkboxes to tick off:",
    card1: { badge: "Free from QLIXA", title: "For Employees", desc: "Document checklist for those employed in Austria.", btn: "⬇️ Download PDF" },
    card2: { badge: "Free from QLIXA", title: "For the Self-Employed", desc: "Document checklist for the self-employed and entrepreneurs in Austria.", btn: "⬇️ Download PDF" },
    card3: { badge: "Free from QLIXA", title: "For Children", desc: "Document checklist for each child — separately.", btn: "⬇️ Download PDF" },
    bannerTitle: "Interactive RWR+ Checklist — Coming Soon",
    bannerP: "Sign up for QLIXA — and you'll be able to check off completed documents, add your own notes, save the dates you received certificates, and come back to your preparation anytime.",
    bannerBtn: "Get access — coming soon",
    backLink: "← Back to all articles",
  },
  DE: {
    tag1: "Anleitung", tag2: "RWR+ Karte", tag3: "Dokumente",
    title: "Wie du dich auf die RWR+ Karte vorbereitest",
    intro: "Heute gehen wir durch, wie du dich auf die Rot-Weiß-Rot Karte Plus vorbereitest — am Beispiel von Iryna, einer fiktiven Figur auf unserer Seite, die dich durch alle unsere Materialien begleitet. Sie kommt aus der Ukraine, lebt seit über zwei Jahren in Österreich und ist seit einem Jahr selbstständig.",
    date: "Juli 2026", readTime: "~15 Minuten Lesezeit",
    discBold: "Wichtig:",
    disc: "Dieses Material basiert auf den echten Erfahrungen von Menschen, die bereits eine RWR+ Karte beantragt und erhalten haben. QLIXA ist keine Rechtsberatung und bietet keine individuelle Beratung. Prüfe die aktuellen Anforderungen immer auf der offiziellen Website:",
    toc: [
      ["#start", "Wo du anfängst"], ["#docs", "Dokumentenliste"],
      ["#income", "Einkommensnachweis"], ["#calculator", "RWR+ Einkommensrechner"],
      ["#language", "Sprachkenntnisse"], ["#family", "Familiendokumente"],
      ["#kids", "Dokumente für Kinder"], ["#tips", "Tipps"],
      ["#checklist", "Checkliste herunterladen"],
    ],
    startH2: "Wo Iryna beginnt",
    startP1: "Iryna kommt aus der Ukraine und lebt seit über zwei Jahren in Österreich. Vor einem Jahr hat sie sich selbstständig gemacht und möchte nun vom vorübergehenden Schutz zur vollwertigen Rot-Weiß-Rot Karte Plus wechseln.",
    startP2Before: "Das Erste, was sie getan hat — sie hat einen Termin beim zuständigen Magistrat vereinbart. In Klagenfurt geht das über",
    startP3: "Aber Iryna hat nicht einfach auf den Termin gewartet. Sie hat frühzeitig angefangen, Dokumente zu sammeln, und Bekannte gefragt, die sich bereits beworben hatten, was zusätzlich verlangt werden könnte. Genau so sollte man es machen!",
    timelineLabel: "Vorbereitungs-Timeline",
    timeline: [
      ["2–3 Monate vorher", "Termin vereinbaren. Alle Dokumente prüfen, die aktualisiert, bestellt, übersetzt oder apostilliert werden müssen: Geburtsurkunden, Diplome, Zeugnisse, Strafregisterauszüge (UA und AT). Gültigkeit des Reisepasses prüfen."],
      ["1 Monat vorher", "Alle Dokumente sammeln. Übersetzungen anfertigen. Kontoauszug vorbereiten."],
      ["2 Wochen vorher", "Jedes Dokument prüfen. Kopien anfertigen. Nach Ordnern sortieren."],
      ["Am Tag des Termins", "Mit einer Mappe Originale und einer Mappe Kopien für jedes Familienmitglied kommen."],
      ["Nach der Antragstellung", "Warten. Es kann sein, dass man sich meldet und zusätzliche Dokumente anfordert — das ist normal!"],
    ],
    docsH2: "Dokumentenliste",
    docsPBefore: "Iryna hat", docsPBold: "zwei Mappen",
    docsPAfter: "vorbereitet: eine mit Originalen, eine mit Kopien. Jedes Familienmitglied hatte seine eigene Mappe mit Kopien. So hat sie den Termin so schnell wie möglich gemacht — die Mitarbeiterin hat einfach alles eingesammelt und eingescannt.",
    docsTipBold: "Tipp:",
    docsTipAfter: "Hefte deine Dokumente nirgendwo zusammen — sie werden anschließend gescannt. Einfach in der richtigen Reihenfolge in die Mappe legen.",
    docsA: [
      { title: "Ausweis für Vertriebene (Blau Card)", text: "Bring alle deine vorherigen Blau Cards für jedes Jahr mit, das du hier bist. (Originale + Kopien)" },
      { title: "Reisepass — alle Seiten", text: "Kopiere ALLE Seiten deines Reisepasses, auch die leeren. Beachte: Die Karte wird bis zum Ablaufdatum deines Passes ausgestellt. Wenn dein Reisepass in einem Jahr abläuft, gilt auch die Karte nur ein Jahr — selbst wenn dir 3 Jahre zustehen würden. Deshalb kümmere dich lieber frühzeitig um einen neuen Reisepass.", warning: "Prüfe die Gültigkeit deines Reisepasses VOR der Terminvereinbarung!" },
      { title: "Geburtsurkunde", text: "Original + deutsche Übersetzung + Apostille." },
      { title: "Strafregisterauszug — ukrainisch", text: "Kann in der Diia-App generiert werden. Keine Apostille nötig. Kann bei jedem Übersetzungsbüro übersetzt werden. Gültig für 3 Monate." },
    ],
    docBezirkTitle: "Strafregisterauszug — österreichisch (Strafregisterbescheinigung)",
    docBezirkText: "Offizieller Strafregisterauszug vom BMI. Genau diesen musst du für RWR+ einreichen. Vereinbare einen Termin über die offizielle Website:",
    docBezirkLink: "citizen.bmi.gv.at →",
    docKSVTitle: "KSV-Auskunft (Auskunft nach Art. 15 DSGVO)",
    docKSVText: "Das ist eine Auskunft über deine Bonität und KSV-Daten (österreichische Kreditauskunftei). Gültig für 3 Monate. Kostenlos bestellen:",
    docKSVLink: "digitalerantrag.ksv.at →",
    docsB: [
      { title: "E-card", text: "Original + Kopie." },
      { title: "Passfoto (45×35 mm)", text: "Nicht älter als 6 Monate. Wird direkt auf das Antragsformular geklebt." },
      { title: "Meldezettel (Original + Kopie)", text: "Das ist die Bestätigung deiner Wohnsitzmeldung in Österreich. Wenn du noch keinen Meldezettel hast oder umgezogen bist, wende dich an dein zuständiges Magistrat. Original + Kopie. Muss zum Zeitpunkt der Antragstellung aktuell sein." },
      { title: "Nachweis über das Wohnrecht", text: "Mietvertrag oder Eigentumsnachweis. Idealerweise sind im Vertrag alle Familienmitglieder aufgeführt — das vereinfacht den Prozess. Original + Kopie." },
    ],
    docFormTitle: "Ausgefülltes Antragsformular — für jedes Familienmitglied separat",
    docFormText: "Das Formular kannst du auf der offiziellen BMI-Website herunterladen:",
    docFormBtn: "⬇️ Formular herunterladen (BMI)",
    incomeH2: "Einkommensnachweis",
    incomeP: "Der Nachweis ausreichender fester und regelmäßiger Einkünfte ist einer der zentralen Punkte bei der RWR+ Antragstellung. Je nachdem, in welchem Beschäftigungsverhältnis du bist, unterscheiden sich die Dokumente.",
    employedLabel: "👔 Angestellte/r",
    employedItems: [
      { doc: "Lohnzettel", desc: "Offizielles Dokument des Arbeitgebers über das berechnete Gehalt. Wird normalerweise monatlich oder auf Anfrage ausgestellt." },
      { doc: "Gehaltsbestätigung vom Arbeitgeber", desc: "Schriftliche Bestätigung der Gehaltshöhe — kann formlos oder auf Firmenbriefpapier sein." },
      { doc: "Arbeitsvertrag", desc: "Vertrag, der deine Beschäftigung und Arbeitsbedingungen in Österreich bestätigt." },
    ],
    selfEmployedLabel: "💼 Selbstständig",
    selfEmployedItems: [
      "Einkommensteuerbescheid — offizieller Einkommensnachweis vom Finanzamt (herunterladbar über FinanzOnline). Falls du noch keinen hast, kannst du eine Gewinnbestätigung / Selbsterklärung einreichen — eine selbst erstellte Gewinnerklärung.",
      "Unbedenklichkeitsbescheinigung vom Finanzamt — Bestätigung, dass keine Steuerschulden gegenüber dem Staat bestehen. Wird bei deinem Finanzamt beantragt.",
      "Unbedenklichkeitsbescheinigung von der SVA — ähnliche Bestätigung von der SVA (Sozialversicherungsanstalt der Selbständigen). Bestätigt, dass keine Schulden bei der Sozialversicherung bestehen.",
    ],
    irynaLabel: "Wie Iryna das gelöst hat",
    irynaP1Before: "Iryna hat Anfang Januar eingereicht, deshalb hatte sie noch keinen offiziellen Einkommensteuerbescheid von FinanzOnline. Sie hätte einen Steuerberater beauftragen können — aber Iryna macht ihre Buchhaltung selbst. Deshalb hat sie eine",
    irynaP1Bold: "Gewinnbestätigung / Selbsterklärung",
    irynaP1After: "ausgefüllt — eine Selbsterklärung über ihr Einkommen — eigenhändig, mit allen ihren Daten und ihrem Gewinn für das Jahr. Sie hat sie eingereicht — und wurde ohne Rückfragen akzeptiert.",
    exampleLabel: "📄 Beispiel für Irynas Bestätigung",
    exampleP: "Unten siehst du ein Beispiel der Gewinnbestätigung, die Iryna selbst erstellt und beim Magistrat eingereicht hat. Dies dient nur als Beispiel zur Orientierung. Die Daten und Zahlen beziehen sich ausschließlich auf die Situation der fiktiven Figur Iryna. Verwende es nicht als Vorlage.",
    exampleBtn: "📄 Beispielbestätigung ansehen (PDF)",
    irynaP2: "Irynas Gewinn war dieses Jahr gering — sie stand noch am Anfang ihrer Tätigkeit und hat viel Zeit in die Kundensuche investiert. Aber sie hatte Guthaben auf ihrem Konto. Genau das hat sie als finanziellen Puffer genutzt, um sich für den RWR+ Antrag abzusichern.",
    calcPromptP1: "Möchtest du wissen, ob dein Einkommen ausreicht — und wie viel du in deiner konkreten Situation auf dem Konto nachweisen musst?",
    calcPromptP2: "Dafür haben wir einen eigenen Rechner erstellt — er berechnet alles für dich.",
    afterCalcTip: "Manchmal wird gebeten, die genauen Beträge für Miete und Nebenkosten zu bestätigen — dafür wird ein Kontoauszug der letzten 3 Monate verlangt. Du kannst im Online-Banking nur diese Posten filtern, um nicht Unmengen von Seiten mit Einkäufen ausdrucken zu müssen.",
    afterCalcP: "Iryna hat alles berechnet, ihre Kontoauszüge vorbereitet und ein vollständiges Paket an Finanzdokumenten zusammengestellt. Jetzt blieb nur noch ein Punkt offen — der Nachweis ihrer Sprachkenntnisse.",
    langH2: "Nachweis der deutschen Sprachkenntnisse",
    langP1: "Iryna hatte noch keine Zeit gehabt, die Sprache gut zu lernen — das kennen viele. Aber Österreich hat daran gedacht und eine Alternative vorgesehen.",
    variant1Label: "Option 1 — Sprachzertifikat",
    variant1Lines: ["A1 — gültig 1 Jahr", "A2 — gültig 1 Jahr (bei A2 kann die Karte für 3 Jahre ausgestellt werden)", "B1 — gültig 2 Jahre"],
    variant2Label: "Option 2 — Universitätsdiplom (wie bei Iryna!)",
    variant2Before: "Wenn deine Universität den Status", variant2Bold: "H+", variant2Mid: "auf der Liste",
    variant2LinkText: "anabin.kmk.org",
    variant2After: "hat — ist das eine gleichwertige Alternative zum Sprachzertifikat. Überprüfe deine Bildungseinrichtung!",
    langP2: "Iryna hat genau diese Option gewählt. Dafür musste sie vorbereiten:",
    langItems: [
      "Reifezeugnis + Notenübersicht (Original + Übersetzung + Apostille)",
      "Bachelor-Diplom + Notenübersicht mit Stunden (Original + Übersetzung + Apostille)",
      "Master-/Fachdiplom + Übersicht (Original + Übersetzung + Apostille)",
    ],
    langWarning: "⚠️ Iryna wurde schon wenige Tage nach der Antragstellung per E-Mail nach ihrem Zeugnis gefragt. Das ist normal! Es kann sein, dass man sich noch lange nach dem Termin meldet und Dokumente anfordert. Keine Sorge — antworte einfach.",
    familyH2: "Familiendokumente (falls zutreffend)",
    familyP: "Je nach deiner individuellen Situation könntest du Folgendes benötigen:",
    familyItems: [
      "Heirats- / Partnerschafts- / Adoptionsurkunde (Original + Übersetzung + Apostille)",
      "Nachweis über Verwandtschaftsverhältnisse (Original + Übersetzung + Apostille)",
      "Bestätigung über den Bezug von Familienbeihilfe. Wenn du diese Leistung für deine Kinder erhältst, könnte dieses Dokument benötigt werden. Kann aus deinem FinanzOnline-Konto abgerufen werden.",
    ],
    kidsH2: "Dokumente für Kinder",
    kidsP: "Iryna hat einen 11-jährigen Sohn. Für ihn füllt sie ein separates Formular aus und sammelt ein separates Dokumentenpaket. Für jedes Kind — eine eigene Mappe mit Kopien.",
    kidsItems: [
      { text: "Ausweis für Vertriebene (blaue Karte / Ausweis für Vertriebene)", note: "Kopien + Originale" },
      { text: "Gültiger Reisepass des Kindes — alle Seiten", note: "Kopien oder Scans aller Seiten frühzeitig anfertigen" },
      { text: "Geburtsurkunde oder Nachweis über das Verwandtschaftsverhältnis", note: "Original + deutsche Übersetzung + Apostille" },
      { text: "Passfoto (45×35 mm, nicht älter als 6 Monate)", note: "Wird ins Formular geklebt" },
      { text: "E-card des Kindes", note: "Original + Kopie" },
      { text: "Meldezettel des Kindes", note: "Original + Kopie" },
      { text: "Schulbesuchsbestätigung", note: "Im Sekretariat der Schule anfragen" },
      { text: "Letztes Schulzeugnis (Zeugnis)", note: "⚠️ Wichtig: Laut RWR+ Bedingungen ist eine ausreichende Note in Deutsch erforderlich (4 oder besser nach österreichischer Notenskala, wobei 1 sehr gut und 5 nicht genügend bedeutet)" },
    ],
    kidsFormLabel: "Ausgefülltes Antragsformular für das Kind",
    kidsFormP: "Für jedes Kind ein eigenes Formular. Herunterladen:",
    kidsFormBtn: "bmi.gv.at/312/60a/start.html →",
    tipsH2: "Tipps von Menschen, die die Karte bereits beantragt und erhalten haben",
    tipsP: "Es muss in deinem Fall nicht genauso sein — aber sei lieber vorbereitet:",
    tipsItems: [
      ["Hefte deine Dokumente nirgendwo zusammen", "Sie werden anschließend gescannt. Einfach in der richtigen Reihenfolge in die Mappe legen."],
      ["Gib die Miete nur beim Hauptantragsteller an", "Wenn die restlichen Familienmitglieder gemeinsam beantragen, wird dieses Feld bei ihnen nicht ausgefüllt."],
      ["Gib das Einkommen NETTO an", "Nicht brutto."],
      ["Deine Blau Card wird nicht eingezogen", "Bei der RWR+ Antragstellung bleibt deine gültige blaue Karte bei dir (Punkt 14 des Formulars)."],
      ["Nach der Antragstellung können weitere Dokumente angefragt werden", "Das ist normal. Antworte und sende sie zu. Manchmal meldet sich niemand — das hängt vom jeweiligen Sachbearbeiter ab."],
      ["Kontoauszug", "Manchmal wird gebeten, Miete und Nebenkosten für 3 Monate zu bestätigen. Filtere dies im Online-Banking."],
      ["Bestätigung Familienbeihilfe", "Wird manchmal angefragt. Kann aus dem FinanzOnline-Konto abgerufen werden."],
    ],
    checklistH2: "Lade die Checkliste zur Dokumentenvorbereitung herunter",
    checklistP: "Wähle deine Variante — eine Checkliste mit Kästchen zum Abhaken:",
    card1: { badge: "Kostenlos von QLIXA", title: "Für Angestellte", desc: "Dokumenten-Checkliste für alle, die in Österreich angestellt sind.", btn: "⬇️ PDF herunterladen" },
    card2: { badge: "Kostenlos von QLIXA", title: "Für Selbstständige", desc: "Dokumenten-Checkliste für Selbstständige und Unternehmer:innen in Österreich.", btn: "⬇️ PDF herunterladen" },
    card3: { badge: "Kostenlos von QLIXA", title: "Für Kinder", desc: "Dokumenten-Checkliste für jedes Kind — separat.", btn: "⬇️ PDF herunterladen" },
    bannerTitle: "Interaktive RWR+ Checkliste — bald verfügbar",
    bannerP: "Registriere dich bei QLIXA — und du kannst fertige Dokumente abhaken, eigene Notizen hinzufügen, Ausstellungsdaten von Bestätigungen speichern und jederzeit zu deiner Vorbereitung zurückkehren.",
    bannerBtn: "Zugang erhalten — bald verfügbar",
    backLink: "← Zurück zu allen Artikeln",
  },
}

export default function RWRKartePage() {
  const [lang, setLang] = useState('UA')

  useEffect(() => {
    const stored = localStorage.getItem('qlixa-lang')
    if (stored) setLang(stored)
    const handler = () => {
      const updated = localStorage.getItem('qlixa-lang')
      if (updated) setLang(updated)
    }
    window.addEventListener('qlixa-lang-change', handler)
    return () => window.removeEventListener('qlixa-lang-change', handler)
  }, [])

  const t = RWR_TEXT[lang] || RWR_TEXT.UA

  return (
    <>
      <Navbar />
      <main style={{ background: '#ffffff', minHeight: '100vh' }}>

        {/* Hero */}
        <section style={{ background: '#F0F7F8', padding: '56px clamp(20px,6vw,80px) 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#038390', background: 'rgba(3,131,144,0.1)', padding: '4px 12px', borderRadius: 999 }}>{t.tag1}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>{t.tag2}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#595959', background: 'rgba(89,89,89,0.08)', padding: '4px 12px', borderRadius: 999 }}>{t.tag3}</span>
              </div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
                {t.title}
              </h1>
              <p style={{ fontSize: 16, color: '#595959', lineHeight: 1.75, marginBottom: 24, maxWidth: 480 }}>
                {t.intro}
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const, fontSize: 13, color: '#888' }}>
                <span>📅 {t.date}</span>
                <span>⏱ {t.readTime}</span>
                <span>✍️ QLIXA</span>
              </div>
            </div>
            <div style={{ flex: '0 0 340px', borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
              <img src="/articles/rwr-karte-cover.jpg" alt="RWR+ Karte" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '56px clamp(20px,6vw,80px)' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <ArticleSidebar currentSlug="rwr-karte" />

            {/* Main article */}
            <div style={{ flex: 1, minWidth: 0 }}>

              <ArticleTOC items={t.toc} />

              {/* Disclaimer */}
              <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 32, fontSize: 13, color: '#595959', lineHeight: 1.6 }}>
                ⚠️ <strong>{t.discBold}</strong> {t.disc}{' '}
                <a href="https://www.bmi.gv.at/Ukraine/Informationen_zum_Umstieg_auf_eine_Rot-_Weiss_Rot_Karte_plus.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>bmi.gv.at</a>
              </div>

              {/* Section: Start */}
              <div id="start" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.startH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.startP1}</p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>
                  {t.startP2Before}{' '}
                  <a href="https://timeacle.com/business/index/id/5277" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>timeacle.com</a>{' '}
                  → <strong>Fremdenrecht Erstantrag → Sonstige → E</strong>
                </p>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85 }}>{t.startP3}</p>
              </div>

              {/* Timeline */}
              <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '24px 28px', marginBottom: 40 }}>
                <div style={{ fontWeight: 700, color: '#038390', marginBottom: 16, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' as const }}>{t.timelineLabel}</div>
                {t.timeline.map(([time, desc]: [string, string], i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 4 ? 12 : 0 }}>
                    <div style={{ flex: '0 0 100px', fontSize: 12, fontWeight: 700, color: '#038390', paddingTop: 2 }}>{time}</div>
                    <div style={{ flex: 1, fontSize: 14, color: '#595959', lineHeight: 1.6, borderLeft: '2px solid rgba(3,131,144,0.2)', paddingLeft: 16 }}>{desc}</div>
                  </div>
                ))}
              </div>

              {/* Section: Docs */}
              <div id="docs" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>{t.docsH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>
                  {t.docsPBefore} <strong>{t.docsPBold}</strong>{t.docsPAfter}
                </p>

                <div style={{ background: '#FFF0F0', border: '1px solid rgba(204,0,0,0.15)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#595959' }}>
                  💡 <strong>{t.docsTipBold}</strong> {t.docsTipAfter}
                </div>

                {t.docsA.map((doc: any, i: number) => (
                  <div key={i} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {doc.title}</div>
                    <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>{doc.text}</div>
                    {doc.warning && <div style={{ fontSize: 13, color: '#CC0000', marginTop: 4 }}>⚠️ {doc.warning}</div>}
                  </div>
                ))}

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {t.docBezirkTitle}</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 6 }}>{t.docBezirkText}</div>
                  <a href="https://citizen.bmi.gv.at/at.gv.bmi.fnsetvweb-p/etv/public/sva/Terminvereinbarung?locale=en" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>{t.docBezirkLink}</a>
                </div>

                <div style={{ borderLeft: '3px solid rgba(89,89,89,0.3)', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {t.docKSVTitle}</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 6 }}>{t.docKSVText}</div>
                  <a href="https://digitalerantrag.ksv.at/Dip/?request=auskunft-nach-art-15-dsgvo" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>{t.docKSVLink}</a>
                </div>

                {t.docsB.map((doc: any, i: number) => (
                  <div key={`b${i}`} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {doc.title}</div>
                    <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>{doc.text}</div>
                  </div>
                ))}

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>☐ {t.docFormTitle}</div>
                  <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 8 }}>{t.docFormText}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                    <a href="https://www.bmi.gv.at/312/60a/start.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600, padding: '8px 16px', border: '1px solid #038390', borderRadius: 8, textDecoration: 'none' }}>{t.docFormBtn}</a>
                  </div>
                </div>
              </div>

              {/* Section: Income */}
              <div id="income" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.incomeH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.incomeP}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                  <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '20px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 10, fontSize: 14 }}>{t.employedLabel}</div>
                    {t.employedItems.map((item: any) => (
                      <div key={item.doc} style={{ fontSize: 13, color: '#595959', paddingLeft: 8, marginBottom: 8, lineHeight: 1.6 }}>
                        <div style={{ fontWeight: 500, color: '#1A1A1A', marginBottom: 2 }}>☐ {item.doc}</div>
                        <div style={{ fontSize: 12, color: '#595959' }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '20px' }}>
                    <div style={{ fontWeight: 700, color: '#038390', marginBottom: 10, fontSize: 14 }}>{t.selfEmployedLabel}</div>
                    {t.selfEmployedItems.map((item: string) => (
                      <div key={item} style={{ fontSize: 13, color: '#595959', paddingLeft: 8, marginBottom: 8, lineHeight: 1.6 }}>☐ {item}</div>
                    ))}
                  </div>
                </div>

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 20, marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontSize: 15 }}>{t.irynaLabel}</div>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 12 }}>
                    {t.irynaP1Before} <strong>{t.irynaP1Bold}</strong> {t.irynaP1After}
                  </p>
                  <div style={{ background: '#F0F7F8', borderRadius: 16, padding: '20px 24px', marginBottom: 16, marginTop: 16 }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 8, fontSize: 14 }}>{t.exampleLabel}</div>
                    <p style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 16 }}>{t.exampleP}</p>
                    <a href="/articles/iryna-gewinnbestatigung.pdf" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#038390', color: 'white', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                      {t.exampleBtn}
                    </a>
                  </div>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 12 }}>{t.irynaP2}</p>
                  <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }`}</style>
                  <div style={{ background: 'linear-gradient(135deg, #F0F7F8 0%, #E6F4F5 100%)', border: '1.5px solid rgba(3,131,144,0.25)', borderRadius: 16, padding: '20px 24px', marginTop: 16 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.65, marginBottom: 12 }}>{t.calcPromptP1}</p>
                    <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.65, marginBottom: 0 }}>
                      {t.calcPromptP2}{' '}
                      <span style={{ fontSize: 18, animation: 'bounce 1.2s ease-in-out infinite', display: 'inline-block', color: '#038390' }}>↓</span>
                    </p>
                  </div>
                </div>

                <div id="calculator" style={{ marginBottom: 20, scrollMarginTop: '80px' }}>
                  <RWRCalculator />
                </div>

                <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '16px 20px', fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                  💡 {t.afterCalcTip}
                </div>

                <div style={{ borderLeft: '3px solid #038390', paddingLeft: 20, marginTop: 24 }}>
                  <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85 }}>{t.afterCalcP}</p>
                </div>
              </div>

              {/* Section: Language */}
              <div id="language" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.langH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.langP1}</p>

                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, marginBottom: 24 }}>
                  <div style={{ border: '1px solid rgba(3,131,144,0.25)', borderRadius: 12, padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{t.variant1Label}</div>
                    <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                      {t.variant1Lines.map((line: string, i: number) => (
                        <span key={i}>{line}{i < 2 ? <br/> : null}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ border: '1px solid rgba(3,131,144,0.25)', borderRadius: 12, padding: '16px 20px', background: '#F0F7F8' }}>
                    <div style={{ fontWeight: 700, color: '#038390', marginBottom: 4 }}>{t.variant2Label}</div>
                    <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.65 }}>
                      {t.variant2Before} <strong>{t.variant2Bold}</strong> {t.variant2Mid}{' '}
                      <a href="https://anabin.kmk.org/db/institutionen" target="_blank" rel="noopener noreferrer" style={{ color: '#038390' }}>{t.variant2LinkText}</a>{' '}
                      {t.variant2After}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.langP2}</p>
                {t.langItems.map((item: string, i: number) => (
                  <div key={i} style={{ borderLeft: '3px solid #038390', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A' }}>☐ {item}</div>
                  </div>
                ))}
                <div style={{ background: '#FFF8E7', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#595959', marginTop: 12 }}>
                  {t.langWarning}
                </div>
              </div>

              {/* Section: Family */}
              <div id="family" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.familyH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.familyP}</p>
                {t.familyItems.map((item: string, i: number) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A' }}>☐ {item}</div>
                  </div>
                ))}
              </div>

              {/* Section: Kids */}
              <div id="kids" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.kidsH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.85, marginBottom: 16 }}>{t.kidsP}</p>
                {t.kidsItems.map((item: any, i: number) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500, marginBottom: 4 }}>☐ {item.text}</div>
                    <div style={{ fontSize: 13, color: '#595959' }}>{item.note}</div>
                  </div>
                ))}
                <div style={{ borderLeft: '3px solid rgba(3,131,144,0.3)', paddingLeft: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500, marginBottom: 4 }}>☐ {t.kidsFormLabel}</div>
                  <div style={{ fontSize: 13, color: '#595959', marginBottom: 6 }}>{t.kidsFormP}</div>
                  <a href="https://www.bmi.gv.at/312/60a/start.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#038390', fontWeight: 600 }}>{t.kidsFormBtn}</a>
                </div>
              </div>

              {/* Section: Tips */}
              <div id="tips" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 16 }}>{t.tipsH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>{t.tipsP}</p>
                {t.tipsItems.map(([title, desc]: [string, string], i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, background: '#F0F7F8', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 18, flexShrink: 0 }}>💡</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 14, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist CTA */}
              <div id="checklist" style={{ marginBottom: 40, scrollMarginTop: '80px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>{t.checklistH2}</h2>
                <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.75, marginBottom: 20 }}>{t.checklistP}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#038390', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column' as const }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t.card1.badge}</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>{t.card1.title}</div>
                    <div style={{ flex: 1 }}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>{t.card1.desc}</p></div>
                    <button onClick={() => generateChecklistPDF('employed')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#038390', borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      {t.card1.btn}
                    </button>
                  </div>
                  <div style={{ background: '#038390', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column' as const }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t.card2.badge}</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>{t.card2.title}</div>
                    <div style={{ flex: 1 }}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>{t.card2.desc}</p></div>
                    <button onClick={() => generateChecklistPDF('self')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#038390', borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      {t.card2.btn}
                    </button>
                  </div>
                  <div style={{ background: '#026B76', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column' as const }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t.card3.badge}</div>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'white', marginBottom: 8 }}>{t.card3.title}</div>
                    <div style={{ flex: 1 }}><p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>{t.card3.desc}</p></div>
                    <button onClick={() => generateChecklistPDF('kids')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#026B76', borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                      {t.card3.btn}
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive checklist banner */}
              <div style={{ border: '2px dashed rgba(3,131,144,0.3)', borderRadius: 20, padding: '32px 36px', marginBottom: 40, textAlign: 'center' as const }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 8 }}>{t.bannerTitle}</h3>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>{t.bannerP}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#038390', color: 'white', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'not-allowed', opacity: 0.6 }}>
                  {t.bannerBtn}
                </div>
              </div>

              {/* Back to articles */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
                <Link href="/articles" style={{ fontSize: 14, color: '#038390', textDecoration: 'none', fontWeight: 600 }}>
                  {t.backLink}
                </Link>
              </div>

            </div>
          </div>
        </section>
        <ArticlePrevNext currentSlug="rwr-karte" />
      </main>
      <Footer />
    </>
  )
}
