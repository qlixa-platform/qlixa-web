'use client'
import { loadPDFScripts } from '@/utils/generatePDF'

type ChecklistType = 'employed' | 'self' | 'kids'

async function generateChecklistPDF(type: ChecklistType) {
  const configs = {
    employed: {
      title: 'Чекліст документів',
      subtitle: 'Для найманих працівників',
      filename: 'QLIXA_Checklist_Naymanyi.pdf',
      sections: [
        {
          header: 'ОСНОВНІ ДОКУМЕНТИ',
          items: [
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: '' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Копії всіх попередніх Blau Card', note: 'за всі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Довідка про несудимість України', note: 'переклад нім., апостиль не потрібен' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Договір оренди / підтвердження житла', note: 'оригінал + копія' },
            { name: 'Підтвердження знання німецької мови', note: 'або документи для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка' },
          ]
        },
        {
          header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ',
          items: [
            { name: 'Трудовий договір', note: '' },
            { name: 'Останні розрахункові листки (Lohnzettel)', note: '' },
            { name: 'Підтвердження заробітної плати від роботодавця', note: '' },
            { name: 'Банківська виписка', note: 'за потреби' },
            { name: 'Підтвердження оплати оренди та комунальних', note: 'за потреби, виписка за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]
        }
      ]
    },
    self: {
      title: 'Чекліст документів',
      subtitle: 'Для самозайнятих',
      filename: 'QLIXA_Checklist_Samozaynyati.pdf',
      sections: [
        {
          header: 'ОСНОВНІ ДОКУМЕНТИ',
          items: [
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: '' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Копії всіх попередніх Blau Card', note: 'за всі роки' },
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Довідка про несудимість України', note: 'переклад нім., апостиль не потрібен' },
            { name: 'Австрійська довідка про несудимість', note: 'Strafregisterbescheinigung' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'Договір оренди / підтвердження житла', note: 'оригінал + копія' },
            { name: 'Підтвердження знання німецької мови', note: 'або документи для Integrationsvereinbarung' },
            { name: 'Selbstauskunft KSV', note: 'безкоштовна довідка' },
          ]
        },
        {
          header: 'ПІДТВЕРДЖЕННЯ ДОХОДУ',
          items: [
            { name: 'Einkommensteuerbescheid', note: 'якщо вже отриманий — з FinanzOnline' },
            { name: 'Unbedenklichkeitsbescheinigung Finanzamt', note: 'довідка про відсутність заборгованостей' },
            { name: 'Unbedenklichkeitsbescheinigung SVS', note: 'довідка від соціального страхування' },
            { name: 'Власна довідка про дохід (Gewinnbestätigung)', note: 'якщо Einkommensteuerbescheid відсутній' },
            { name: 'Банківська виписка — фінансова подушка', note: '' },
            { name: 'Банківська виписка — оренда та комунальні', note: 'за потреби, за 3 місяці' },
            { name: 'Bestätigung über den Bezug von Familienbeihilfe', note: 'якщо запитують' },
          ]
        }
      ]
    },
    kids: {
      title: 'Чекліст документів',
      subtitle: 'Документи для дитини',
      filename: 'QLIXA_Checklist_Dity.pdf',
      sections: [
        {
          header: 'ДОКУМЕНТИ НА ДИТИНУ',
          items: [
            { name: 'Свідоцтво про народження', note: 'оригінал + переклад + апостиль' },
            { name: 'Закордонний паспорт', note: 'всі сторінки, копії + оригінал' },
            { name: 'Посвідчення переміщеної особи (блакитна картка)', note: 'всі попередні за всі роки' },
            { name: 'Паспортне фото', note: '45 × 35 мм, не старше 6 місяців' },
            { name: 'Meldezettel', note: 'оригінал + копія' },
            { name: 'E-card', note: 'оригінал + копія' },
            { name: 'Schulbesuchsbestätigung', note: 'довідка про відвідування школи' },
            { name: 'Останній шкільний табель (Zeugnis)', note: 'оцінка з нім. мови: 4 і нижче' },
            { name: "Документи що підтверджують родинні зв'язки", note: 'якщо необхідно — ориг. + перекл. + апостиль' },
          ]
        }
      ]
    }
  }

  const config = configs[type]

  await loadPDFScripts()

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
      <img src="/logos/logo-name-slogan_planets_black.svg" style="height:auto;width:140px;object-fit:contain;display:block" crossorigin="anonymous" alt="QLIXA"/>
      <div style="text-align:right">
        <div style="font-size:10px;color:#595959">${subtitle}</div>
        <div style="font-size:10px;color:#038390;font-weight:700">qlixa.eu</div>
      </div>
    </div>
    <div style="height:2px;background:#038390"></div>
  `

  const footerHTML = () => `
    <div style="background:#fff;padding:10px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E6F4F5;margin-top:12px">
      <img src="/logos/logo-name-slogan_planets_black.svg" style="height:auto;width:100px;object-fit:contain;display:block" crossorigin="anonymous" alt="QLIXA"/>
      <div style="font-size:10px;color:#595959">Твій цифровий бізнес-помічник в Австрії &nbsp;|&nbsp; qlixa.eu</div>
    </div>
  `

  const itemsHTML = (items: {name:string;note:string}[]) => items.map((item, i) => `
    <div style="background:${i%2===0?'#F0F7F8':'#fff'};padding:10px 14px;border-bottom:1px solid #E6F4F5;display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:#1A1A1A;margin-bottom:3px">☐ &nbsp;${item.name}${item.note ? `<span style="font-weight:400;color:#595959;font-size:11px"> (${item.note})</span>` : ''}</div>
        <div style="font-size:10px;color:#888">Нотатки: ________________________________________</div>
      </div>
      <div style="flex-shrink:0;font-size:10px;color:#595959">
        <table style="border-collapse:collapse">
          <tr>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">Дата отримання</td>
            <td style="border:1px solid #E6F4F5;padding:3px 10px;background:#fff;font-size:9px">Строк дії</td>
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
      <div style="font-size:10px;color:#595959;margin-bottom:8px">Підготовка документів для подачі на RWR+ карту</div>
      <div style="font-size:10px;color:#888;line-height:1.5;margin-bottom:14px;padding:8px 12px;background:#F0F7F8;border-radius:6px">
        Використовуйте цей чекліст під час підготовки документів для подачі на RWR+ карту. Відмічайте готові документи та робіть власні нотатки.
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
        <div style="font-size:13px;font-weight:700;color:#038390;margin-bottom:14px">Нотатки щодо документів дитини</div>
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
        <div style="margin-bottom:12px">Дата початку підготовки: ___________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Дата подачі документів: ___________</div>
        <div style="font-weight:700;color:#595959;margin-bottom:8px">Мої нотатки:</div>
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
