'use client'
import { useState } from 'react'
import { loadPDFScripts, fetchLogoAsDataUrl } from '@/utils/generatePDF'

const FREE_STATION = 386.43
const MIN_SINGLE = 1308.39
const MIN_COUPLE = 2064.12
const MIN_CHILD = 201.88

function fmt(n: number) {
  return n.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function adjIncome(amount: number, type: 'employed' | 'self') {
  return type === 'employed' ? amount * 14 / 12 : amount / 12
}

type Result = {
  ok: boolean
  total: number
  net: number
  required: number
  shortage: number
  savings: number
  adj: number
  adjP: number
  rentDed: number
  elec: number
  oth: number
}

export default function RWRCalculator() {
  const [step, setStep] = useState(0)
  const [hasPartner, setHasPartner] = useState<boolean | null>(null)
  const [children, setChildren] = useState(0)
  const [incomeType, setIncomeType] = useState<'employed' | 'self'>('employed')
  const [income, setIncome] = useState('')
  const [partnerIncomeType, setPartnerIncomeType] = useState<'employed' | 'self'>('employed')
  const [partnerIncome, setPartnerIncome] = useState('')
  const [rent, setRent] = useState('')
  const [electricity, setElectricity] = useState('0')
  const [other, setOther] = useState('0')
  const [result, setResult] = useState<Result | null>(null)

  const TEAL = '#038390'
  const DARK = '#ffffff'
  const DARK2 = '#F0F7F8'

  const totalSteps = hasPartner ? 8 : 7

  const progress = (current: number) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i < current ? TEAL : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
      ))}
    </div>
  )

  const answerBox = (label: string, value: string) => (
    <div key={label} style={{ background: '#ffffff', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{value}</div>
    </div>
  )

  const adjI = adjIncome(parseFloat(income) || 0, incomeType)
  const adjP = hasPartner ? adjIncome(parseFloat(partnerIncome) || 0, partnerIncomeType) : 0

  const sidebar = (
    <div style={{ width: 200, background: '#F0F7F8', borderLeft: '1.5px solid rgba(3,131,144,0.15)', padding: '20px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: '#038390', marginBottom: 4 }}>Ваші відповіді</div>
      {hasPartner !== null && answerBox('Склад', hasPartner ? 'Я + партнер' : 'Тільки я')}
      {children > 0 && answerBox('Діти', String(children))}
      {income && answerBox('Ваш дохід', `€ ${fmt(adjI)}`)}
      {hasPartner && partnerIncome && answerBox('Дохід партнера', `€ ${fmt(adjP)}`)}
      {rent && answerBox('Оренда', `€ ${rent}`)}
      {electricity && electricity !== '0' && answerBox('Електрика', `€ ${electricity}`)}
      {other && other !== '0' && answerBox('Інші платежі', `€ ${other}`)}
      {!hasPartner && !income && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>Заповніть форму</div>
      )}
    </div>
  )

  const typeToggle = (val: 'employed' | 'self', onChange: (v: 'employed' | 'self') => void) => (
    <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
      {(['employed', 'self'] as const).map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          flex: 1, padding: '9px 12px', borderRadius: 10, fontSize: 12, cursor: 'pointer',
          background: val === t ? '#038390' : '#F0F7F8', color: val === t ? '#fff' : '#595959',
          border: `1px solid ${val === t ? '#038390' : 'rgba(3,131,144,0.2)'}`,
          fontWeight: val === t ? 600 : 400, transition: 'all 0.2s'
        }}>
          {t === 'employed' ? '👔 Найманий' : '💼 Самозайнятий'}
        </button>
      ))}
    </div>
  )

  const fieldInput = (value: string, onChange: (v: string) => void, placeholder: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ffffff', border: '1.5px solid rgba(3,131,144,0.3)', borderRadius: 14, padding: '4px 16px', marginBottom: 10 }}>
      <span style={{ fontSize: 18, color: '#595959', fontWeight: 300 }}>€</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} min={0}
        style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 22, fontWeight: 500, color: '#1A1A1A', width: '100%', padding: '13px 0' }} />
    </div>
  )

  const btnNext = (label: string, onClick: () => void) => (
    <button onClick={onClick} style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
      {label} →
    </button>
  )

  const btnBack = () => (
    <button onClick={() => setStep(s => s - 1)} style={{ background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.2)', color: '#595959', borderRadius: 12, padding: '13px 20px', fontSize: 14, cursor: 'pointer' }}>
      ← Назад
    </button>
  )

  const hint = (t: string) => (
    <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.6, marginBottom: 20 }}>{t}</div>
  )

  const stepLabel = (n: number, title: string) => (
    <>
      <div style={{ fontSize: 11, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '2px', fontWeight: 600, marginBottom: 8 }}>Крок {n}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
    </>
  )

  const calculate = (): Result => {
    const inc = parseFloat(income) || 0
    const pInc = parseFloat(partnerIncome) || 0
    const ren = parseFloat(rent) || 0
    const elec = parseFloat(electricity) || 0
    const oth = parseFloat(other) || 0
    const adj = adjIncome(inc, incomeType)
    const adjPart = hasPartner ? adjIncome(pInc, partnerIncomeType) : 0
    const total = adj + adjPart
    const required = (hasPartner ? MIN_COUPLE : MIN_SINGLE) + children * MIN_CHILD
    const rentDed = Math.max(0, ren - FREE_STATION)
    const net = total - rentDed - elec - oth
    const ok = net >= required
    const shortage = Math.max(0, required - net)
    const savings = shortage * 12 * 1.1
    return { ok, total, net, required, shortage, savings, adj, adjP: adjPart, rentDed, elec, oth }
  }

  const generatePDF = async (r: Result) => {
    const date = new Date().toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })

    // Load logo from actual file
    const logoSrc = await fetchLogoAsDataUrl()

    const el = document.createElement('div')
    el.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif;padding:0'

    el.innerHTML = `
      <div style="background:#ffffff;padding:14px 28px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E6F4F5">
        <img src="${logoSrc}" style="width:140px;height:36px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
        <div style="text-align:right">
          <div style="font-size:10px;color:#595959">Результат розрахунку RWR+</div>
          <div style="font-size:11px;color:#038390;font-weight:700">qlixa.eu</div>
        </div>
      </div>
      <div style="height:2px;background:#038390"></div>

      <div style="padding:24px 28px">
        <div style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:4px">Результат розрахунку RWR+</div>
        <div style="font-size:11px;color:#888;margin-bottom:20px">Сформовано: ${date}</div>

        <div style="background:${r.ok ? '#E8F8F0' : '#FFF8E7'};border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px">
          <div style="width:36px;height:36px;border-radius:10px;background:${r.ok ? '#10B981' : '#F59E0B'};display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;flex-shrink:0;line-height:1;padding-bottom:1px">${r.ok ? '✓' : '!'}</div>
          <div>
            <div style="font-size:15px;font-weight:700;color:${r.ok ? '#065F46' : '#92400E'}">${r.ok ? 'Дохід достатній' : 'Дохід нижче мінімуму BMI'}</div>
            <div style="font-size:11px;color:${r.ok ? '#047857' : '#B45309'};margin-top:2px">${r.ok ? 'За попереднім розрахунком умови BMI 2026 виконуються.' : 'Можна підтвердити заощадженнями на рахунку.'}</div>
          </div>
        </div>

        <div style="font-size:10px;font-weight:700;color:#038390;letter-spacing:1px;margin-bottom:8px">РОЗБИВКА РОЗРАХУНКУ</div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          ${[
            [incomeType === 'employed' ? 'Ваш дохід (скоригований × 14÷12)' : 'Ваш дохід (річний ÷ 12)', `€ ${fmt(r.adj)}`],
            ...(hasPartner && r.adjP > 0 ? [[partnerIncomeType === 'employed' ? 'Дохід партнера (× 14÷12)' : 'Дохід партнера (річний ÷ 12)', `€ ${fmt(r.adjP)}`]] : []),
            ['Оренда понад freie Station (€386,43)', `− € ${fmt(r.rentDed)}`],
            ...(r.elec > 0 ? [['Електроенергія', `− € ${fmt(r.elec)}`]] : []),
            ...(r.oth > 0 ? [['Інші регулярні платежі', `− € ${fmt(r.oth)}`]] : []),
          ].map(([l, v], i) => `
            <tr style="background:${i % 2 === 0 ? '#F0F7F8' : '#ffffff'}">
              <td style="padding:9px 12px;font-size:12px;color:#595959">${l}</td>
              <td style="padding:9px 12px;font-size:12px;font-weight:700;color:#1A1A1A;text-align:right">${v}</td>
            </tr>
          `).join('')}
          <tr style="background:#038390">
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:#fff">Дохід після витрат</td>
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:#fff;text-align:right">€ ${fmt(r.net)}</td>
          </tr>
          <tr style="background:#F0F7F8">
            <td style="padding:9px 12px;font-size:12px;color:#595959">Мінімум BMI 2026 (${hasPartner ? 'пара' : '1 особа'}${children > 0 ? ` + ${children} дит.` : ''})</td>
            <td style="padding:9px 12px;font-size:12px;font-weight:700;color:#1A1A1A;text-align:right">€ ${fmt(r.required)}</td>
          </tr>
          <tr style="background:${r.ok ? '#E8F8F0' : '#FFF8E7'}">
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:${r.ok ? '#065F46' : '#92400E'}">${r.ok ? 'Залишок понад мінімум' : 'Не вистачає'}</td>
            <td style="padding:10px 12px;font-size:13px;font-weight:700;color:${r.ok ? '#10B981' : '#F59E0B'};text-align:right">€ ${r.ok ? fmt(r.net - r.required) : fmt(r.shortage)}</td>
          </tr>
        </table>

        ${!r.ok ? `
        <div style="background:#FFF8E7;border:1px solid rgba(245,166,35,0.3);border-radius:10px;padding:20px 18px;margin-bottom:20px">
          <div style="font-size:10px;color:#B45309;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Рекомендована сума на рахунку</div>
          <div style="font-size:26px;font-weight:700;color:#F59E0B;margin-bottom:8px;line-height:1.3">€ ${fmt(r.savings)}</div>
          <div style="font-size:10px;color:#888;margin-top:6px;line-height:1.5">недостача × 12 міс + 10% запас<br/>(рекомендація QLIXA)</div>
        </div>` : ''}

        <div style="font-size:9px;color:#aaa;line-height:1.6;border-top:1px solid #E6F4F5;padding-top:14px">
          Цей розрахунок виконано на основі офіційних ставок BMI 2026 і є попереднім. Остаточне рішення приймає компетентний орган. QLIXA не є податковим консультантом і не надає юридичних консультацій.
        </div>
      </div>

    `

    document.body.appendChild(el)

    loadPDFScripts().then(() => {
      const h2c = (window as any).html2canvas
      const { jsPDF } = (window as any).jspdf

      // Render content block
      h2c(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false }).then((contentCanvas: HTMLCanvasElement) => {

        // Create footer block
        const footerEl = document.createElement('div')
        footerEl.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif'
        footerEl.innerHTML = `
          <div style="background:#ffffff;padding:10px 28px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid #E6F4F5">
            <img src="${logoSrc}" style="width:100px;height:26px;object-fit:contain;object-position:left center;display:block" alt="QLIXA"/>
            <div style="font-size:10px;color:#595959">Твій цифровий бізнес-помічник в Австрії &nbsp;|&nbsp; qlixa.eu</div>
          </div>
        `
        document.body.appendChild(footerEl)

        h2c(footerEl, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false }).then((footerCanvas: HTMLCanvasElement) => {
          document.body.removeChild(el)
          document.body.removeChild(footerEl)

          const pdf = new jsPDF({ format: 'a4', unit: 'mm' })
          const PW = 210

          // Add content
          const contentImg = contentCanvas.toDataURL('image/png')
          const contentH = (contentCanvas.height * PW) / contentCanvas.width
          pdf.addImage(contentImg, 'PNG', 0, 0, PW, contentH)

          // Add footer immediately after content
          const footerImg = footerCanvas.toDataURL('image/png')
          const footerH = (footerCanvas.height * PW) / footerCanvas.width
          pdf.addImage(footerImg, 'PNG', 0, contentH, PW, footerH)

          pdf.save('QLIXA_RWR_Rozrakhunok.pdf')
        })
      })
    })
  }

  const rentStep = hasPartner ? 6 : 5
  const elecStep = hasPartner ? 7 : 6
  const otherStep = hasPartner ? 8 : 7

  const wrapStyle: React.CSSProperties = {
    background: '#ffffff', borderRadius: 20, overflow: 'hidden',
    border: '2px solid rgba(3,131,144,0.25)',
    boxShadow: '0 8px 40px rgba(3,131,144,0.12)'
  }

  const headerStyle: React.CSSProperties = {
    background: '#F0F7F8', padding: '14px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1.5px solid rgba(3,131,144,0.15)'
  }

  const mainStyle: React.CSSProperties = {
    padding: '32px', flex: 1, display: 'flex',
    flexDirection: 'column', justifyContent: 'center', minHeight: 340
  }

  const renderStep = () => {
    if (step === 0) return (
      <div style={mainStyle}>
        <div style={{ fontSize: 11, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '2px', fontWeight: 600, marginBottom: 10 }}>Інструмент QLIXA</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 10 }}>RWR+ калькулятор доходу</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28, maxWidth: 360 }}>
          Перевірте за 2 хвилини, чи достатньо вашого доходу для подання на RWR+ карту — і скільки потрібно на рахунку, якщо ні.
        </div>
        <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#595959', lineHeight: 1.5, marginBottom: 24 }}>
          Розрахунок базується на офіційних ставках BMI 2026. Є попереднім — остаточне рішення приймає компетентний орган.
        </div>
        {btnNext('Почати', () => setStep(1))}
      </div>
    )

    if (step === 1) return (
      <div style={mainStyle}>
        {stepLabel(1, 'Чи подаєтеся разом із партнером?')}
        {hint('Це впливає на мінімальний поріг доходу — для пари він інший.')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Тільки я', sub: `Мінімум € ${fmt(MIN_SINGLE)}`, val: false, icon: '🧑' },
            { label: 'Я + партнер', sub: `Мінімум € ${fmt(MIN_COUPLE)}`, val: true, icon: '👫' }
          ].map(opt => (
            <button key={String(opt.val)} onClick={() => { setHasPartner(opt.val); setStep(2) }}
              style={{ background: hasPartner === opt.val ? 'rgba(3,131,144,0.1)' : '#F0F7F8', border: `1px solid ${hasPartner === opt.val ? TEAL : 'rgba(3,131,144,0.2)'}`, borderRadius: 14, padding: 16, cursor: 'pointer', textAlign: 'left' as const, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', marginBottom: 4 }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{opt.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}</div>
      </div>
    )

    if (step === 2) return (
      <div style={mainStyle}>
        {stepLabel(2, 'Скільки у вас дітей?')}
        {hint(`За кожну дитину до мінімуму додається € ${fmt(MIN_CHILD)} / міс.`)}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 24 }}>
          {[0,1,2,3,4].map(n => (
            <button key={n} onClick={() => setChildren(n)}
              style={{ width: 52, height: 52, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: children === n ? TEAL : '#F0F7F8',
                color: children === n ? '#fff' : '#1A1A1A', border: `1px solid ${children === n ? TEAL : 'rgba(3,131,144,0.2)'}` }}>
              {n === 0 ? '0' : n}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext('Далі', () => setStep(3))}</div>
      </div>
    )

    if (step === 3) return (
      <div style={mainStyle}>
        {stepLabel(3, 'Як ви працюєте?')}
        {typeToggle(incomeType, setIncomeType)}
        {hint(incomeType === 'employed'
          ? 'Якщо зарплата 14 разів на рік — вводьте звичайну місячну суму. Ми перерахуємо × 14÷12 за формулою BMI.'
          : 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).')}
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext('Далі', () => setStep(4))}</div>
      </div>
    )

    if (step === 4) return (
      <div style={mainStyle}>
        {stepLabel(4, 'Ваш чистий місячний дохід')}
        {fieldInput(income, setIncome, incomeType === 'self' ? 'напр. 12000 (річний)' : 'напр. 1400')}
        {hint(incomeType === 'employed' ? 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.' : 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).')}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext('Далі', () => {
            if (!income || parseFloat(income) <= 0) { alert('Вкажіть дохід'); return }
            setStep(hasPartner ? 5 : rentStep)
          })}
        </div>
      </div>
    )

    if (step === 5 && hasPartner) return (
      <div style={mainStyle}>
        {stepLabel(5, 'Дохід партнера')}
        {typeToggle(partnerIncomeType, setPartnerIncomeType)}
        {fieldInput(partnerIncome, setPartnerIncome, partnerIncomeType === 'self' ? 'напр. 14400 (річний)' : 'напр. 1200')}
        {hint(partnerIncomeType === 'employed' ? 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.' : 'Вводьте річний чистий прибуток після вирахування податків та внесків до SVS. Ми розрахуємо середньомісячний автоматично (÷ 12).')}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext('Далі', () => {
            if (!partnerIncome || parseFloat(partnerIncome) <= 0) { alert('Вкажіть дохід партнера'); return }
            setStep(rentStep)
          })}
        </div>
      </div>
    )

    if (step === rentStep) return (
      <div style={mainStyle}>
        {stepLabel(rentStep, 'Щомісячна оренда')}
        {fieldInput(rent, setRent, 'напр. 700')}
        {hint('Оренда разом із Betriebskosten. Без електрики — її запитаємо окремо.')}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext('Далі', () => {
            if (rent === '') { alert('Вкажіть оренду'); return }
            setStep(elecStep)
          })}
        </div>
      </div>
    )

    if (step === elecStep) return (
      <div style={mainStyle}>
        {stepLabel(elecStep, 'Витрати на електроенергію')}
        {fieldInput(electricity, setElectricity, 'напр. 80')}
        {hint('При подачі на RWR+ часто запитують рахунки за електрику окремо — тому враховуємо. Якщо немає — введіть 0.')}
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext('Далі', () => setStep(otherStep))}</div>
      </div>
    )

    if (step === otherStep) return (
      <div style={mainStyle}>
        {stepLabel(otherStep, 'Інші регулярні платежі')}
        {fieldInput(other, setOther, 'напр. 0')}
        {hint('Кредит, іпотека, аліменти тощо. Якщо немає — залиште 0.')}
        <div style={{ display: 'flex', gap: 8 }}>
          {btnBack()}
          {btnNext('Розрахувати', () => { setResult(calculate()); setStep(99) })}
        </div>
      </div>
    )

    if (step === 99 && result) return (
      <div style={{ padding: 28, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: result.ok ? 'rgba(16,185,129,0.2)' : 'rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {result.ok ? '✓' : '!'}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{result.ok ? 'Дохід достатній' : 'Дохід нижче мінімуму'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              {result.ok ? 'Умови BMI 2026 виконуються за попереднім розрахунком.' : 'Можна підтвердити заощадженнями на рахунку.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: '#038390', marginBottom: 12 }}>Розбивка</div>
          {[
            [incomeType === 'employed' ? `Ваш дохід (скоригований × 14÷12)` : `Ваш дохід (річний ÷ 12)`, `€ ${fmt(result.adj)}`],
            ...(hasPartner && result.adjP > 0 ? [[partnerIncomeType === 'employed' ? `Дохід партнера (× 14÷12)` : `Дохід партнера (річний ÷ 12)`, `€ ${fmt(result.adjP)}`]] : []),
            [`Оренда понад freie Station`, `− € ${fmt(result.rentDed)}`],
            ...(result.elec > 0 ? [[`Електрика`, `− € ${fmt(result.elec)}`]] : []),
            ...(result.oth > 0 ? [[`Інші платежі`, `− € ${fmt(result.oth)}`]] : []),
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(3,131,144,0.1)', fontSize: 13 }}>
              <span style={{ color: '#595959' }}>{l}</span>
              <span style={{ color: '#1A1A1A', fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px', fontSize: 13 }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Після витрат</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: result.ok ? '#10B981' : '#F59E0B' }}>€ {fmt(result.net)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#595959' }}>Мінімум BMI 2026</span>
            <span style={{ color: '#595959' }}>€ {fmt(result.required)}</span>
          </div>
        </div>

        {!result.ok && (
          <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'rgba(245,166,35,0.7)', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: 4 }}>Рекомендована сума на рахунку</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#F59E0B' }}>€ {fmt(result.savings)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>недостача × 12 міс + 10% запас (рекомендація QLIXA)</div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
          <button onClick={() => { generatePDF(result) }}
            style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            ⬇ Завантажити результат (PDF)
          </button>
          <button onClick={() => { setStep(0); setIncome(''); setPartnerIncome(''); setRent(''); setElectricity('0'); setOther('0'); setResult(null); setHasPartner(null); setChildren(0) }}
            style={{ background: '#F0F7F8', color: '#595959', border: '1px solid rgba(3,131,144,0.2)', borderRadius: 10, padding: '11px 18px', fontSize: 13, cursor: 'pointer' }}>
            Розрахувати знову
          </button>
        </div>
      </div>
    )

    return null
  }

  const showSidebar = step > 0 && step < 99

  return (
    <div style={wrapStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logos/favicon-planet-black.svg" alt="QLIXA" style={{ width: 40, height: 40, objectFit: 'contain' }}/>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.5px', lineHeight: 1 }}>RWR+ КАЛЬКУЛЯТОР</div>
        </div>
        {step > 0 && step < 99 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 160 }}>{progress(step)}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', minWidth: 32 }}>{step} / {totalSteps}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {renderStep()}
        {showSidebar && sidebar}
      </div>
    </div>
  )
}
