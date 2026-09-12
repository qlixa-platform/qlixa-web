'use client'
import { loadPDFScripts, fetchLogoAsDataUrl } from '@/utils/generatePDF'

type ChecklistType = 'employed' | 'self' | 'kids'

// Переклади PDF-чеклістів — UA + RU (EN/DE додамо наступними кроками)
const CHECKLIST_TEXT: Record<string, any> = {
  UA: {
    uiIntro: 'Підготовка документів для подачі на Rot-Weiß-Rot – Karte plus (RWR+)',
    uiDescBox: 'Використовуйте цей чекліст під час підготовки документів для подачі на RWR+ карту. Відмічайте готові документи та робіть власні нотатки.',
    uiDateReceived: 'Дата отримання',
    uiValidUntil: 'Строк дії',
    uiNotesLine: 'Нотатки: ________________________________________',
    uiKidsNotesTitle: 'Нотатки щодо документів дитини',
    uiStartDate: 'Дата початку підготовки: ___________',
    uiSubmitDate: 'Дата подачі документів: ___________',
    uiMyNotes: 'Мої нотатки:',
    footerTagline: 'Практичні інструменти та матеріали для життя в Австрії',
    sectionCoreLabel: 'ОСНОВНІ ДОКУМЕНТИ ЗА ІНФОРМАЦІЄЮ BMI',
    sectionPracticalLabel: 'МОЖУТЬ ДОДАТКОВО ПОПРОСИТИ · З ПРАКТИЧНОГО ДОСВІДУ',
    introNote: 'Цей чеклист поєднує актуальну інформацію BMI та практичний досвід реальної успішної подачі. Документи у блоці «Можуть додатково попросити» не є універсально обов’язковими — вимоги можуть відрізнятися залежно від ситуації та компетентного органу.',
    footerDisclaimer: 'Перед поданням перевір актуальні вимоги BMI та свого компетентного органу.',
    configs: {
      employed: {
        title: 'Чекліст документів', subtitle: 'Для найманих працівників', filename: 'QLIXA_Checklist_Naymanyi.pdf',
        sections: [
          { header: 'ОСНОВНІ ДОКУМЕНТИ ЗА ІНФОРМАЦІЄЮ BMI', items: [
            { name: 'Ausweis für Vertriebene (посвідчення переміщеної особи)', note: 'чинне' },
            { name: 'Закордонний паспорт', note: 'дійсний' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Підтвердження права на житло', note: 'договір оренди / документ про власність / Wohnrechtsvereinbarung' },
            { name: 'Підтвердження знання німецької мови', note: 'або виконання Integrationsvereinbarung' },
          ]},
          { header: 'МОЖУТЬ ДОДАТКОВО ПОПРОСИТИ · З ПРАКТИЧНОГО ДОСВІДУ', items: [
            { name: 'Копії всіх сторінок паспорта', note: 'з практичного досвіду: у конкретній подачі попросили копії всіх сторінок паспорта, включно з порожніми' },
            { name: 'Копії попередніх Blau Card', note: 'за минулі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад за потреби; апостиль можуть додатково попросити залежно від органу' },
            { name: 'Довідка про несудимість — Україна', note: 'з практичного досвіду: у конкретній подачі для документа попросили переклад німецькою та апостиль' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка, може пришвидшити опрацювання' },
            { name: 'Банківська виписка', note: 'за потреби' },
            { name: 'Підтвердження оплати оренди та комунальних', note: 'за потреби, виписка за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]},
          { header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ', items: [
            { name: 'Трудовий договір (Dienstvertrag)', note: '' },
            { name: 'Підтвердження заробітної плати від роботодавця (Lohnbestätigung)', note: '' },
            { name: 'Останні розрахункові листки (Gehaltsabrechnungen / Lohnabrechnungen)', note: '' },
            { name: 'Lohnzettel / L16', note: 'якщо наявний або запитаний' },
          ]},
        ],
      },
      self: {
        title: 'Чекліст документів', subtitle: 'Для самозайнятих', filename: 'QLIXA_Checklist_Samozaynyati.pdf',
        sections: [
          { header: 'ОСНОВНІ ДОКУМЕНТИ ЗА ІНФОРМАЦІЄЮ BMI', items: [
            { name: 'Ausweis für Vertriebene (посвідчення переміщеної особи)', note: 'чинне' },
            { name: 'Закордонний паспорт', note: 'дійсний' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Підтвердження права на житло', note: 'договір оренди / документ про власність / Wohnrechtsvereinbarung' },
            { name: 'Підтвердження знання німецької мови', note: 'або виконання Integrationsvereinbarung' },
          ]},
          { header: 'МОЖУТЬ ДОДАТКОВО ПОПРОСИТИ · З ПРАКТИЧНОГО ДОСВІДУ', items: [
            { name: 'Копії всіх сторінок паспорта', note: 'з практичного досвіду: у конкретній подачі попросили копії всіх сторінок паспорта, включно з порожніми' },
            { name: 'Копії попередніх Blau Card', note: 'за минулі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад за потреби; апостиль можуть додатково попросити залежно від органу' },
            { name: 'Довідка про несудимість — Україна', note: 'з практичного досвіду: у конкретній подачі для документа попросили переклад німецькою та апостиль' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка, може пришвидшити опрацювання' },
            { name: 'Підтвердження оплати оренди та комунальних', note: 'за потреби, виписка за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]},
          { header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ', items: [
            { name: 'Einkommensteuerbescheid', note: 'якщо вже отриманий — з FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'довідка про відсутність заборгованостей' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'довідка від соціального страхування' },
            { name: 'Додаткове підтвердження доходу / Gewinnbestätigung', note: 'з практичного досвіду: у конкретній подачі цей документ був підготовлений, коли Einkommensteuerbescheid ще не було. Це не офіційна заміна Einkommensteuerbescheid — достатність документів оцінює компетентний орган індивідуально' },
            { name: 'Банківська виписка / підтвердження наявних коштів', note: 'за потреби' },
          ]},
        ],
      },
      kids: {
        title: 'Чекліст документів', subtitle: 'Документи для дитини', filename: 'QLIXA_Checklist_Dity.pdf',
        sections: [
          { header: 'ОСНОВНІ ДОКУМЕНТИ ЗА ІНФОРМАЦІЄЮ BMI', items: [
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад за потреби. Апостиль можуть додатково попросити залежно від органу' },
            { name: "Документи, що підтверджують родинні зв'язки", note: 'альтернатива свідоцтву про народження, за потреби' },
            { name: 'Закордонний паспорт дитини', note: 'дійсний' },
            { name: 'Ausweis für Vertriebene (посвідчення переміщеної особи)', note: 'чинне' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
          ]},
          { header: 'МОЖУТЬ ДОДАТКОВО ПОПРОСИТИ · З ПРАКТИЧНОГО ДОСВІДУ', items: [
            { name: 'Копії всіх сторінок паспорта дитини', note: 'з практичного досвіду: у конкретній подачі попросили копії всіх сторінок, включно з порожніми' },
            { name: 'Копії попередніх Blau Card дитини', note: 'за минулі роки' },
            { name: 'Свідоцтво про народження — переклад та апостиль', note: 'з практичного досвіду: у конкретній подачі для документа попросили переклад німецькою та апостиль' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Schulbesuchsbestätigung', note: 'якщо запитана' },
            { name: 'Останній шкільний табель (Zeugnis)', note: 'якщо запитаний. З практичного досвіду: у конкретній подачі для дитини додатково попросили Schulbesuchsbestätigung та останній шкільний табель' },
          ]},
        ],
      },
    },
  },
  RU: {
    uiIntro: 'Подготовка документов для подачи на Rot-Weiß-Rot – Karte plus (RWR+)',
    uiDescBox: 'Используйте этот чек-лист при подготовке документов для подачи на RWR+ карту. Отмечайте готовые документы и делайте собственные заметки.',
    uiDateReceived: 'Дата получения',
    uiValidUntil: 'Срок действия',
    uiNotesLine: 'Заметки: ________________________________________',
    uiKidsNotesTitle: 'Заметки по документам ребёнка',
    uiStartDate: 'Дата начала подготовки: ___________',
    uiSubmitDate: 'Дата подачи документов: ___________',
    uiMyNotes: 'Мои заметки:',
    footerTagline: 'Практические инструменты и материалы для жизни в Австрии',
    sectionCoreLabel: 'ОСНОВНЫЕ ДОКУМЕНТЫ ПО ИНФОРМАЦИИ BMI',
    sectionPracticalLabel: 'МОГУТ ЗАПРОСИТЬ ДОПОЛНИТЕЛЬНО · ИЗ ПРАКТИЧЕСКОГО ОПЫТА',
    introNote: 'Этот чек-лист объединяет актуальную информацию BMI и практический опыт реальной успешной подачи. Документы в разделе «Могут запросить дополнительно» не являются обязательными во всех случаях — требования могут отличаться в зависимости от ситуации и компетентного органа.',
    footerDisclaimer: 'Перед подачей проверь актуальные требования BMI и своего компетентного органа.',
    configs: {
      employed: {
        title: 'Чек-лист документов', subtitle: 'Для наёмных работников', filename: 'QLIXA_Checklist_Naymanyi.pdf',
        sections: [
          { header: 'ОСНОВНЫЕ ДОКУМЕНТЫ ПО ИНФОРМАЦИИ BMI', items: [
            { name: 'Ausweis für Vertriebene (удостоверение перемещённого лица)', note: 'действующее' },
            { name: 'Загранпаспорт', note: 'действительный' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
            { name: 'Подтверждение права на жильё', note: 'договор аренды / документ о собственности / Wohnrechtsvereinbarung' },
            { name: 'Подтверждение знания немецкого языка', note: 'или выполнение Integrationsvereinbarung' },
          ]},
          { header: 'МОГУТ ЗАПРОСИТЬ ДОПОЛНИТЕЛЬНО · ИЗ ПРАКТИЧЕСКОГО ОПЫТА', items: [
            { name: 'Копии всех страниц паспорта', note: 'из практического опыта: при одной реальной подаче попросили копии всех страниц паспорта, включая пустые' },
            { name: 'Копии предыдущих Blau Card', note: 'за прошлые годы' },
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод при необходимости; апостиль могут дополнительно попросить в зависимости от органа' },
            { name: 'Справка о несудимости — Украина', note: 'из практического опыта: при одной реальной подаче для документа попросили перевод на немецкий и апостиль' },
            { name: 'Австрийская справка о несудимости', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'Selbstauskunft KSV', note: 'бесплатная справка, может ускорить обработку' },
            { name: 'Банковская выписка', note: 'при необходимости' },
            { name: 'Подтверждение оплаты аренды и коммунальных', note: 'при необходимости, выписка за 3 месяца' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'если запрашивают' },
          ]},
          { header: 'ПОДТВЕРЖДЕНИЕ ДОХОДА', items: [
            { name: 'Трудовой договор (Dienstvertrag)', note: '' },
            { name: 'Подтверждение зарплаты от работодателя (Lohnbestätigung)', note: '' },
            { name: 'Последние расчётные листки (Gehaltsabrechnungen / Lohnabrechnungen)', note: '' },
            { name: 'Lohnzettel / L16', note: 'если есть или запрошен' },
          ]},
        ],
      },
      self: {
        title: 'Чек-лист документов', subtitle: 'Для самозанятых', filename: 'QLIXA_Checklist_Samozaynyati.pdf',
        sections: [
          { header: 'ОСНОВНЫЕ ДОКУМЕНТЫ ПО ИНФОРМАЦИИ BMI', items: [
            { name: 'Ausweis für Vertriebene (удостоверение перемещённого лица)', note: 'действующее' },
            { name: 'Загранпаспорт', note: 'действительный' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
            { name: 'Подтверждение права на жильё', note: 'договор аренды / документ о собственности / Wohnrechtsvereinbarung' },
            { name: 'Подтверждение знания немецкого языка', note: 'или выполнение Integrationsvereinbarung' },
          ]},
          { header: 'МОГУТ ЗАПРОСИТЬ ДОПОЛНИТЕЛЬНО · ИЗ ПРАКТИЧЕСКОГО ОПЫТА', items: [
            { name: 'Копии всех страниц паспорта', note: 'из практического опыта: при одной реальной подаче попросили копии всех страниц паспорта, включая пустые' },
            { name: 'Копии предыдущих Blau Card', note: 'за прошлые годы' },
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод при необходимости; апостиль могут дополнительно попросить в зависимости от органа' },
            { name: 'Справка о несудимости — Украина', note: 'из практического опыта: при одной реальной подаче для документа попросили перевод на немецкий и апостиль' },
            { name: 'Австрийская справка о несудимости', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'Selbstauskunft KSV', note: 'бесплатная справка, может ускорить обработку' },
            { name: 'Подтверждение оплаты аренды и коммунальных', note: 'при необходимости, выписка за 3 месяца' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'если запрашивают' },
          ]},
          { header: 'ПОДТВЕРЖДЕНИЕ ДОХОДА', items: [
            { name: 'Einkommensteuerbescheid', note: 'если уже получен — из FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'справка об отсутствии задолженностей' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'справка от социального страхования' },
            { name: 'Дополнительное подтверждение дохода / Gewinnbestätigung', note: 'из практического опыта: при одной реальной подаче этот документ был подготовлен, когда Einkommensteuerbescheid ещё не было. Это не официальная замена Einkommensteuerbescheid — достаточность документов оценивает компетентный орган индивидуально' },
            { name: 'Банковская выписка / подтверждение доступных средств', note: 'при необходимости' },
          ]},
        ],
      },
      kids: {
        title: 'Чек-лист документов', subtitle: 'Документы для ребёнка', filename: 'QLIXA_Checklist_Dity.pdf',
        sections: [
          { header: 'ОСНОВНЫЕ ДОКУМЕНТЫ ПО ИНФОРМАЦИИ BMI', items: [
            { name: 'Свидетельство о рождении', note: 'оригинал + перевод при необходимости. Апостиль могут дополнительно попросить в зависимости от органа' },
            { name: 'Документы, подтверждающие родственные связи', note: 'альтернатива свидетельству о рождении, при необходимости' },
            { name: 'Загранпаспорт ребёнка', note: 'действительный' },
            { name: 'Ausweis für Vertriebene (удостоверение перемещённого лица)', note: 'действующее' },
            { name: 'Фото на документы', note: '45 × 35 мм, не старше 6 месяцев' },
          ]},
          { header: 'МОГУТ ЗАПРОСИТЬ ДОПОЛНИТЕЛЬНО · ИЗ ПРАКТИЧЕСКОГО ОПЫТА', items: [
            { name: 'Копии всех страниц паспорта ребёнка', note: 'из практического опыта: при одной реальной подаче попросили копии всех страниц, включая пустые' },
            { name: 'Копии предыдущих Blau Card ребёнка', note: 'за прошлые годы' },
            { name: 'Свидетельство о рождении — перевод и апостиль', note: 'из практического опыта: при одной реальной подаче для документа попросили перевод на немецкий и апостиль' },
            { name: 'E-card', note: 'оригинал + копия' },
            { name: 'Meldezettel', note: 'оригинал + копия' },
            { name: 'Schulbesuchsbestätigung', note: 'если запрошена' },
            { name: 'Последний школьный табель (Zeugnis)', note: 'если запрошен. Из практического опыта: при одной реальной подаче для ребёнка дополнительно попросили Schulbesuchsbestätigung и последний школьный табель' },
          ]},
        ],
      },
    },
  },
  EN: {
    uiIntro: 'Preparing documents for a Rot-Weiß-Rot – Karte plus (RWR+) application',
    uiDescBox: 'Use this checklist while preparing documents for your RWR+ card application. Check off completed documents and add your own notes.',
    uiDateReceived: 'Date received',
    uiValidUntil: 'Valid until',
    uiNotesLine: 'Notes: ________________________________________',
    uiKidsNotesTitle: "Notes on the child's documents",
    uiStartDate: 'Preparation start date: ___________',
    uiSubmitDate: 'Submission date: ___________',
    uiMyNotes: 'My notes:',
    footerTagline: 'Practical tools and resources for life in Austria',
    sectionCoreLabel: 'CORE DOCUMENTS ACCORDING TO BMI',
    sectionPracticalLabel: 'MAY BE ADDITIONALLY REQUESTED · PRACTICAL EXPERIENCE',
    introNote: 'This checklist combines current BMI information with practical experience from a real successful application. Documents in the "May be additionally requested" section are not universally mandatory — requirements may vary depending on the individual case and competent authority.',
    footerDisclaimer: 'Before applying, check the current BMI requirements and the requirements of your competent authority.',
    configs: {
      employed: {
        title: 'Document Checklist', subtitle: 'For Employees', filename: 'QLIXA_Checklist_Employees.pdf',
        sections: [
          { header: 'CORE DOCUMENTS ACCORDING TO BMI', items: [
            { name: 'Ausweis für Vertriebene (displaced persons ID)', note: 'currently valid' },
            { name: 'Passport', note: 'valid' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
            { name: 'Proof of legal entitlement to accommodation', note: 'rental agreement / proof of ownership / Wohnrechtsvereinbarung' },
            { name: 'Proof of German language skills', note: 'or fulfilment of the Integrationsvereinbarung' },
          ]},
          { header: 'MAY BE ADDITIONALLY REQUESTED · PRACTICAL EXPERIENCE', items: [
            { name: 'Copies of all passport pages', note: 'from practical experience: in one real application, copies of all passport pages, including blank pages, were requested' },
            { name: 'Copies of previous Blau Cards', note: 'for earlier years' },
            { name: 'Birth certificate', note: 'original + translation if needed; the authority may additionally request an apostille' },
            { name: 'Ukrainian criminal record certificate', note: 'from practical experience: in one real application this document required a German translation and an apostille' },
            { name: 'Austrian criminal record certificate', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'Selbstauskunft KSV', note: 'free certificate, may speed up processing' },
            { name: 'Bank statement', note: 'if needed' },
            { name: 'Confirmation of rent and utility payments', note: 'if needed, statement for 3 months' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'if requested' },
          ]},
          { header: 'INCOME CONFIRMATION', items: [
            { name: 'Employment contract (Dienstvertrag)', note: '' },
            { name: 'Salary confirmation from employer (Lohnbestätigung)', note: '' },
            { name: 'Latest payslips (Gehaltsabrechnungen / Lohnabrechnungen)', note: '' },
            { name: 'Lohnzettel / L16', note: 'if available or requested' },
          ]},
        ],
      },
      self: {
        title: 'Document Checklist', subtitle: 'For the Self-Employed', filename: 'QLIXA_Checklist_SelfEmployed.pdf',
        sections: [
          { header: 'CORE DOCUMENTS ACCORDING TO BMI', items: [
            { name: 'Ausweis für Vertriebene (displaced persons ID)', note: 'currently valid' },
            { name: 'Passport', note: 'valid' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
            { name: 'Proof of legal entitlement to accommodation', note: 'rental agreement / proof of ownership / Wohnrechtsvereinbarung' },
            { name: 'Proof of German language skills', note: 'or fulfilment of the Integrationsvereinbarung' },
          ]},
          { header: 'MAY BE ADDITIONALLY REQUESTED · PRACTICAL EXPERIENCE', items: [
            { name: 'Copies of all passport pages', note: 'from practical experience: in one real application, copies of all passport pages, including blank pages, were requested' },
            { name: 'Copies of previous Blau Cards', note: 'for earlier years' },
            { name: 'Birth certificate', note: 'original + translation if needed; the authority may additionally request an apostille' },
            { name: 'Ukrainian criminal record certificate', note: 'from practical experience: in one real application this document required a German translation and an apostille' },
            { name: 'Austrian criminal record certificate', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'Selbstauskunft KSV', note: 'free certificate, may speed up processing' },
            { name: 'Confirmation of rent and utility payments', note: 'if needed, statement for 3 months' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'if requested' },
          ]},
          { header: 'INCOME CONFIRMATION', items: [
            { name: 'Einkommensteuerbescheid', note: 'if already received — from FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'certificate of no outstanding debts' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'certificate from social insurance' },
            { name: 'Additional proof of income / Gewinnbestätigung', note: 'from practical experience: in one real application this document was prepared when the Einkommensteuerbescheid was not yet available. It is not an official replacement for the Einkommensteuerbescheid — the competent authority assesses sufficient proof individually' },
            { name: 'Bank statement / proof of available funds', note: 'if needed' },
          ]},
        ],
      },
      kids: {
        title: 'Document Checklist', subtitle: "Documents for the Child", filename: 'QLIXA_Checklist_Children.pdf',
        sections: [
          { header: 'CORE DOCUMENTS ACCORDING TO BMI', items: [
            { name: 'Birth certificate', note: 'original + translation if needed. The authority may additionally request an apostille' },
            { name: 'Documents confirming family relationship', note: 'alternative to the birth certificate, if needed' },
            { name: "Child's passport", note: 'valid' },
            { name: 'Ausweis für Vertriebene (displaced persons ID)', note: 'currently valid' },
            { name: 'Passport photo', note: '45 × 35 mm, no older than 6 months' },
          ]},
          { header: 'MAY BE ADDITIONALLY REQUESTED · PRACTICAL EXPERIENCE', items: [
            { name: "Copies of all pages of the child's passport", note: 'from practical experience: in one real application, copies of all pages, including blank pages, were requested' },
            { name: "Copies of the child's previous Blau Cards", note: 'for earlier years' },
            { name: 'Birth certificate — translation and apostille', note: 'from practical experience: in one real application this document required a German translation and an apostille' },
            { name: 'E-card', note: 'original + copy' },
            { name: 'Meldezettel', note: 'original + copy' },
            { name: 'Schulbesuchsbestätigung', note: 'if requested' },
            { name: 'Latest school report card (Zeugnis)', note: 'if requested. From practical experience: in one real application, a Schulbesuchsbestätigung and the latest school report were additionally requested for the child' },
          ]},
        ],
      },
    },
  },
  DE: {
    uiIntro: 'Vorbereitung der Dokumente für die Rot-Weiß-Rot – Karte plus (RWR+)',
    uiDescBox: 'Nutze diese Checkliste bei der Vorbereitung der Dokumente für die RWR+ Antragstellung. Hake fertige Dokumente ab und mache eigene Notizen.',
    uiDateReceived: 'Erhalten am',
    uiValidUntil: 'Gültig bis',
    uiNotesLine: 'Notizen: ________________________________________',
    uiKidsNotesTitle: 'Notizen zu den Dokumenten des Kindes',
    uiStartDate: 'Beginn der Vorbereitung: ___________',
    uiSubmitDate: 'Datum der Antragstellung: ___________',
    uiMyNotes: 'Meine Notizen:',
    footerTagline: 'Praktische Tools und Informationen für das Leben in Österreich',
    sectionCoreLabel: 'GRUNDLEGENDE UNTERLAGEN LAUT BMI',
    sectionPracticalLabel: 'KANN ZUSÄTZLICH VERLANGT WERDEN · PRAKTISCHE ERFAHRUNG',
    introNote: 'Diese Checkliste verbindet aktuelle Informationen des BMI mit praktischer Erfahrung aus einem tatsächlich erfolgreichen Antrag. Die Unterlagen im Abschnitt „Kann zusätzlich verlangt werden“ sind nicht allgemein verpflichtend — die Anforderungen können je nach Einzelfall und zuständiger Behörde variieren.',
    footerDisclaimer: 'Prüfe vor der Antragstellung die aktuellen Anforderungen des BMI und deiner zuständigen Behörde.',
    configs: {
      employed: {
        title: 'Dokumenten-Checkliste', subtitle: 'Für Angestellte', filename: 'QLIXA_Checklist_Angestellte.pdf',
        sections: [
          { header: 'GRUNDLEGENDE UNTERLAGEN LAUT BMI', items: [
            { name: 'Ausweis für Vertriebene', note: 'gültig' },
            { name: 'Reisepass', note: 'gültig' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
            { name: 'Nachweis über das Wohnrecht', note: 'Mietvertrag / Eigentumsnachweis / Wohnrechtsvereinbarung' },
            { name: 'Nachweis über deutsche Sprachkenntnisse', note: 'oder Erfüllung der Integrationsvereinbarung' },
          ]},
          { header: 'KANN ZUSÄTZLICH VERLANGT WERDEN · PRAKTISCHE ERFAHRUNG', items: [
            { name: 'Kopien aller Reisepassseiten', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung wurden Kopien aller Passseiten, einschließlich leerer Seiten, verlangt' },
            { name: 'Kopien vorheriger Blau Cards', note: 'aus früheren Jahren' },
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung, falls nötig; eine Apostille kann von der Behörde zusätzlich verlangt werden' },
            { name: 'Ukrainischer Strafregisterauszug', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung waren dafür eine deutsche Übersetzung und eine Apostille nötig' },
            { name: 'Österreichischer Strafregisterauszug', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'Selbstauskunft KSV', note: 'kostenlos, kann die Bearbeitung beschleunigen' },
            { name: 'Kontoauszug', note: 'falls erforderlich' },
            { name: 'Bestätigung der Miet- und Betriebskostenzahlungen', note: 'falls erforderlich, Auszug über 3 Monate' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'falls angefragt' },
          ]},
          { header: 'EINKOMMENSNACHWEIS', items: [
            { name: 'Dienstvertrag', note: '' },
            { name: 'Gehaltsbestätigung vom Arbeitgeber (Lohnbestätigung)', note: '' },
            { name: 'Letzte Gehaltsabrechnungen / Lohnabrechnungen', note: '' },
            { name: 'Lohnzettel / L16', note: 'falls vorhanden oder angefragt' },
          ]},
        ],
      },
      self: {
        title: 'Dokumenten-Checkliste', subtitle: 'Für Selbstständige', filename: 'QLIXA_Checklist_Selbststaendige.pdf',
        sections: [
          { header: 'GRUNDLEGENDE UNTERLAGEN LAUT BMI', items: [
            { name: 'Ausweis für Vertriebene', note: 'gültig' },
            { name: 'Reisepass', note: 'gültig' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
            { name: 'Nachweis über das Wohnrecht', note: 'Mietvertrag / Eigentumsnachweis / Wohnrechtsvereinbarung' },
            { name: 'Nachweis über deutsche Sprachkenntnisse', note: 'oder Erfüllung der Integrationsvereinbarung' },
          ]},
          { header: 'KANN ZUSÄTZLICH VERLANGT WERDEN · PRAKTISCHE ERFAHRUNG', items: [
            { name: 'Kopien aller Reisepassseiten', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung wurden Kopien aller Passseiten, einschließlich leerer Seiten, verlangt' },
            { name: 'Kopien vorheriger Blau Cards', note: 'aus früheren Jahren' },
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung, falls nötig; eine Apostille kann von der Behörde zusätzlich verlangt werden' },
            { name: 'Ukrainischer Strafregisterauszug', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung waren dafür eine deutsche Übersetzung und eine Apostille nötig' },
            { name: 'Österreichischer Strafregisterauszug', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'Selbstauskunft KSV', note: 'kostenlos, kann die Bearbeitung beschleunigen' },
            { name: 'Bestätigung der Miet- und Betriebskostenzahlungen', note: 'falls erforderlich, Auszug über 3 Monate' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'falls angefragt' },
          ]},
          { header: 'EINKOMMENSNACHWEIS', items: [
            { name: 'Einkommensteuerbescheid', note: 'falls bereits erhalten — aus FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'Bestätigung ohne offene Forderungen' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'Bestätigung der Sozialversicherung' },
            { name: 'Zusätzlicher Einkommensnachweis / Gewinnbestätigung', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung wurde dieses Dokument erstellt, weil noch kein Einkommensteuerbescheid vorlag. Es ist kein offizieller Ersatz für den Einkommensteuerbescheid — die zuständige Behörde beurteilt die ausreichenden Nachweise im Einzelfall' },
            { name: 'Kontoauszug / Nachweis verfügbarer Mittel', note: 'bei Bedarf' },
          ]},
        ],
      },
      kids: {
        title: 'Dokumenten-Checkliste', subtitle: 'Dokumente für das Kind', filename: 'QLIXA_Checklist_Kinder.pdf',
        sections: [
          { header: 'GRUNDLEGENDE UNTERLAGEN LAUT BMI', items: [
            { name: 'Geburtsurkunde', note: 'Original + Übersetzung, falls nötig. Eine Apostille kann von der Behörde zusätzlich verlangt werden' },
            { name: 'Nachweis über Verwandtschaftsverhältnisse', note: 'Alternative zur Geburtsurkunde, falls nötig' },
            { name: 'Reisepass des Kindes', note: 'gültig' },
            { name: 'Ausweis für Vertriebene', note: 'gültig' },
            { name: 'Passfoto', note: '45 × 35 mm, nicht älter als 6 Monate' },
          ]},
          { header: 'KANN ZUSÄTZLICH VERLANGT WERDEN · PRAKTISCHE ERFAHRUNG', items: [
            { name: 'Kopien aller Reisepassseiten des Kindes', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung wurden Kopien aller Seiten, einschließlich leerer Seiten, verlangt' },
            { name: 'Kopien vorheriger Blau Cards des Kindes', note: 'aus früheren Jahren' },
            { name: 'Geburtsurkunde — Übersetzung und Apostille', note: 'aus praktischer Erfahrung: bei einer konkreten Antragstellung waren dafür eine deutsche Übersetzung und eine Apostille nötig' },
            { name: 'E-card', note: 'Original + Kopie' },
            { name: 'Meldezettel', note: 'Original + Kopie' },
            { name: 'Schulbesuchsbestätigung', note: 'falls angefragt' },
            { name: 'Letztes Schulzeugnis (Zeugnis)', note: 'falls angefragt. Aus praktischer Erfahrung: bei einer konkreten Antragstellung wurden für das Kind zusätzlich eine Schulbesuchsbestätigung und das letzte Schulzeugnis verlangt' },
          ]},
        ],
      },
    },
  },
}

function getLang() {
  if (typeof window === 'undefined') return 'UA'
  const l = localStorage.getItem('qlixa-lang')
  return l ? l.toUpperCase() : 'UA'
}

async function generateChecklistPDF(type: ChecklistType) {
  const lang = getLang()
  const t = CHECKLIST_TEXT[lang] || CHECKLIST_TEXT.UA
  const config = t.configs[type]

  await loadPDFScripts()
  const logoSrc = await fetchLogoAsDataUrl()

  const h2c = (window as any).html2canvas
  const { jsPDF } = (window as any).jspdf
  const pdf = new jsPDF({ format: 'a4', unit: 'mm' })
  const PW = 210

  const renderBlock = async (html: string, width = 794): Promise<HTMLCanvasElement> => {
    const el = document.createElement('div')
    el.style.cssText = `position:fixed;left:-9999px;top:0;width:${width}px;background:#fff;font-family:Arial,sans-serif`
    el.innerHTML = html
    document.body.appendChild(el)
    const canvas = await h2c(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false })
    document.body.removeChild(el)
    return canvas
  }

  const addCanvasToPdf = (canvas: HTMLCanvasElement, isFirst: boolean) => {
    if (!isFirst) pdf.addPage()
    const imgData = canvas.toDataURL('image/png')
    const H = (canvas.height * PW) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, PW, H)
  }

  const headerFooterHTML = (title: string, subtitle: string) => `
    <div style="background:#fff;padding:14px 28px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E6F4F5">
      <img src="${logoSrc}" style="width:140px;height:41.8px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
      <div style="text-align:right">
        <div style="font-size:10px;color:#595959">${subtitle}</div>
        <div style="font-size:10px;color:#038390;font-weight:700">qlixa.eu</div>
      </div>
    </div>
    <div style="height:2px;background:#038390"></div>
  `

  const footerHTML = () => `
    <div style="padding:0 28px;margin-top:8px">
      <div style="font-size:9px;color:#888;font-style:italic;border-top:1px solid #E6F4F5;padding-top:8px">${t.footerDisclaimer}</div>
    </div>
    <div style="background:#fff;padding:10px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E6F4F5;margin-top:8px">
      <img src="${logoSrc}" style="width:100px;height:29.9px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
      <div style="font-size:10px;color:#595959">${t.footerTagline} &nbsp;|&nbsp; qlixa.eu</div>
    </div>
  `

  const itemsHTML = (items: {name:string;note:string}[]) => items.map((item, i) => `
    <div style="background:${i%2===0?'#F0F7F8':'#fff'};padding:10px 14px;border-bottom:1px solid #E6F4F5;display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:#1A1A1A;margin-bottom:3px">☐ &nbsp;${item.name}${item.note ? `<span style="font-weight:400;color:#595959;font-size:11px"> (${item.note})</span>` : ''}</div>
        <div style="font-size:10px;color:#888">${t.uiNotesLine}</div>
      </div>
      <div style="flex-shrink:0;font-size:10px;color:#595959">
        <table style="border-collapse:collapse">
          <tr>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">${t.uiDateReceived}</td>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">${t.uiValidUntil}</td>
          </tr>
          <tr>
            <td style="border:1px solid #E6F4F5;padding:8px 10px;background:#fff;min-width:80px">&nbsp;</td>
            <td style="border:1px solid #E6F4F5;padding:8px 10px;background:#fff;min-width:80px">&nbsp;</td>
          </tr>
        </table>
      </div>
    </div>
  `).join('')

  // PAGE 1 — header + title + first section
  const page1 = headerFooterHTML(config.title, config.subtitle) + `
    <div style="padding:20px 28px 0">
      <div style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:4px">${config.title}</div>
      <div style="font-size:14px;font-weight:700;color:#038390;margin-bottom:4px">${config.subtitle}</div>
      <div style="font-size:10px;color:#595959;margin-bottom:8px">${t.uiIntro}</div>
      <div style="font-size:10px;color:#888;line-height:1.5;margin-bottom:8px;padding:8px 12px;background:#F0F7F8;border-radius:6px">
        ${t.uiDescBox}
      </div>
      <div style="font-size:9px;color:#595959;line-height:1.5;font-style:italic;margin-bottom:14px;padding:8px 12px;border:1px solid #E6F4F5;border-radius:6px">
        ${t.introNote}
      </div>
      <div style="background:#038390;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:8px 12px;margin-bottom:0">${config.sections[0].header}</div>
      ${itemsHTML(config.sections[0].items)}
    </div>
  `

  const canvas1 = await renderBlock(page1)
  addCanvasToPdf(canvas1, true)

  // Remaining sections
  for (let i = 1; i < config.sections.length; i++) {
    const section = config.sections[i]
    const pageN = headerFooterHTML(config.title, config.subtitle) + `
      <div style="padding:20px 28px 0">
        <div style="background:#038390;color:#fff;font-size:10px;font-weight:700;letter-spacing:1px;padding:8px 12px;margin-bottom:0">${section.header}</div>
        ${itemsHTML(section.items)}
      </div>
    `
    const canvasN = await renderBlock(pageN)
    addCanvasToPdf(canvasN, false)
  }

  // Kids extra notes page
  if (type === 'kids') {
    const kidsPage = headerFooterHTML(config.title, config.subtitle) + `
      <div style="padding:20px 28px">
        <div style="font-size:13px;font-weight:700;color:#038390;margin-bottom:14px">${t.uiKidsNotesTitle}</div>
        ${Array(6).fill('<div style="border-bottom:1px solid #E6F4F5;margin-bottom:18px;padding-bottom:2px">&nbsp;</div>').join('')}
      </div>
    `
    const kidsCanvas = await renderBlock(kidsPage)
    addCanvasToPdf(kidsCanvas, false)
  }

  // Last page — bottom block
  const lastPage = headerFooterHTML(config.title, config.subtitle) + `
    <div style="padding:20px 28px">
      <div style="border-top:1px solid #E6F4F5;padding-top:14px;font-size:10px;color:#888;line-height:1.8">
        <div style="margin-bottom:12px">${t.uiStartDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${t.uiSubmitDate}</div>
        <div style="font-weight:700;color:#595959;margin-bottom:8px">${t.uiMyNotes}</div>
        ${Array(5).fill('<div style="border-bottom:1px solid #E6F4F5;margin-bottom:16px">&nbsp;</div>').join('')}
      </div>
    </div>
    ${footerHTML()}
  `
  const lastCanvas = await renderBlock(lastPage)
  addCanvasToPdf(lastCanvas, false)

  pdf.save(config.filename)
}

export default function RWRChecklists() {
  return null
}

export { generateChecklistPDF }
