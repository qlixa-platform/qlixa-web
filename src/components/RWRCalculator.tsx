'use client'
import { useState } from 'react'

const FREE_STATION = 386.43
const MIN_SINGLE = 1308.39
const MIN_COUPLE = 2064.12
const MIN_CHILD = 201.88

function fmt(n: number) {
  return n.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function adjIncome(amount: number, type: 'employed' | 'self') {
  return type === 'employed' ? amount * 14 / 12 : amount
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
  const DARK = '#0F2027'
  const DARK2 = '#1A2E38'

  const totalSteps = hasPartner ? 8 : 7

  const progress = (current: number) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i < current ? TEAL : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
      ))}
    </div>
  )

  const answerBox = (label: string, value: string) => (
    <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{value}</div>
    </div>
  )

  const adjI = adjIncome(parseFloat(income) || 0, incomeType)
  const adjP = hasPartner ? adjIncome(parseFloat(partnerIncome) || 0, partnerIncomeType) : 0

  const sidebar = (
    <div style={{ width: 200, background: DARK2, borderLeft: '1px solid rgba(255,255,255,0.06)', padding: '20px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Ваші відповіді</div>
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
          background: val === t ? 'rgba(3,131,144,0.25)' : 'rgba(255,255,255,0.04)',
          color: val === t ? '#fff' : 'rgba(255,255,255,0.45)',
          border: `1px solid ${val === t ? TEAL : 'rgba(255,255,255,0.1)'}`,
          fontWeight: val === t ? 600 : 400, transition: 'all 0.2s'
        }}>
          {t === 'employed' ? '👔 Найманий' : '💼 Самозайнятий'}
        </button>
      ))}
    </div>
  )

  const fieldInput = (value: string, onChange: (v: string) => void, placeholder: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '4px 16px', marginBottom: 10 }}>
      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>€</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} min={0}
        style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 22, fontWeight: 500, color: '#fff', width: '100%', padding: '13px 0' }} />
    </div>
  )

  const btnNext = (label: string, onClick: () => void) => (
    <button onClick={onClick} style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
      {label} →
    </button>
  )

  const btnBack = () => (
    <button onClick={() => setStep(s => s - 1)} style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 20px', fontSize: 14, cursor: 'pointer' }}>
      ← Назад
    </button>
  )

  const hint = (t: string) => (
    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, marginBottom: 20 }}>{t}</div>
  )

  const stepLabel = (n: number, title: string) => (
    <>
      <div style={{ fontSize: 11, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '2px', fontWeight: 600, marginBottom: 8 }}>Крок {n}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>{title}</div>
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

  const generatePDF = (r: Result) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    script.onload = () => {
      const { jsPDF } = (window as any).jspdf
      const doc = new jsPDF({ format: 'a4', unit: 'mm' })
      const W = 210

      doc.setFillColor(26, 46, 56)
      doc.rect(0, 0, W, 28, 'F')
      doc.setFillColor(3, 131, 144)
      doc.roundedRect(14, 7, 14, 14, 3, 3, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('Q', 21, 16.5, { align: 'center' })
      doc.setFontSize(14)
      doc.text('QLIXA', 32, 13)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(150, 180, 190)
      doc.text('RWR+ КАЛЬКУЛЯТОР ДОХОДУ', 32, 19)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(9)
      doc.text('qlixa.eu', W - 14, 16, { align: 'right' })
      doc.setFillColor(3, 131, 144)
      doc.rect(0, 28, W, 1.5, 'F')

      doc.setTextColor(26, 46, 56)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('Результат розрахунку RWR+', 14, 48)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const date = new Date().toLocaleDateString('uk-UA', { day: '2-digit', month: 'long', year: 'numeric' })
      doc.text(`Сформовано: ${date}`, 14, 56)

      if (r.ok) {
        doc.setFillColor(232, 248, 240)
        doc.roundedRect(14, 62, W - 28, 18, 3, 3, 'F')
        doc.setFillColor(16, 185, 129)
        doc.circle(24, 71, 4, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text('v', 24, 73, { align: 'center' })
        doc.setTextColor(15, 80, 50)
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.text('Дохід достатній', 32, 68.5)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(60, 120, 80)
        doc.text('За попереднім розрахунком умови BMI 2026 виконуються.', 32, 75)
      } else {
        doc.setFillColor(255, 248, 230)
        doc.roundedRect(14, 62, W - 28, 18, 3, 3, 'F')
        doc.setTextColor(120, 80, 10)
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        doc.text('! Дохід нижче мінімуму BMI', 20, 69)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Можна підтвердити заощадженнями на рахунку.', 20, 76)
      }

      let y = 92
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(26, 46, 56)
      doc.text('Розбивка розрахунку', 14, y)
      y += 8

      const rows: [string, string][] = [
        ['Ваш дохід (скоригований × 14÷12)', `€ ${fmt(r.adj)}`],
      ]
      if (hasPartner && r.adjP > 0) rows.push([`Дохід партнера (скоригований)`, `€ ${fmt(r.adjP)}`])
      rows.push([`Оренда понад freie Station (€386,43)`, `− € ${fmt(r.rentDed)}`])
      if (r.elec > 0) rows.push(['Електроенергія', `− € ${fmt(r.elec)}`])
      if (r.oth > 0) rows.push(['Інші регулярні платежі', `− € ${fmt(r.oth)}`])

      rows.forEach((row, i) => {
        if (i % 2 === 0) { doc.setFillColor(248, 250, 252); doc.rect(14, y - 4, W - 28, 10, 'F') }
        doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 80, 80)
        doc.text(row[0], 18, y + 2)
        doc.setTextColor(26, 46, 56); doc.setFont('helvetica', 'bold')
        doc.text(row[1], W - 18, y + 2, { align: 'right' })
        y += 10
      })

      doc.setFillColor(3, 131, 144)
      doc.rect(14, y, W - 28, 12, 'F')
      doc.setTextColor(255, 255, 255); doc.setFontSize(11); doc.setFont('helvetica', 'bold')
      doc.text('Дохід після витрат', 18, y + 8)
      doc.text(`€ ${fmt(r.net)}`, W - 18, y + 8, { align: 'right' })
      y += 18

      doc.setFillColor(240, 247, 248)
      doc.rect(14, y, W - 28, 10, 'F')
      doc.setTextColor(80, 80, 80); doc.setFontSize(10); doc.setFont('helvetica', 'normal')
      doc.text(`Мінімум BMI 2026 (${hasPartner ? 'пара' : '1 особа'}${children > 0 ? ` + ${children} дит.` : ''})`, 18, y + 7)
      doc.setTextColor(26, 46, 56); doc.setFont('helvetica', 'bold')
      doc.text(`€ ${fmt(r.required)}`, W - 18, y + 7, { align: 'right' })
      y += 16

      if (r.ok) {
        doc.setFillColor(232, 248, 240)
        doc.roundedRect(14, y, W - 28, 14, 2, 2, 'F')
        doc.setTextColor(15, 80, 50); doc.setFontSize(11); doc.setFont('helvetica', 'bold')
        doc.text('Залишок понад мінімум', 18, y + 9)
        doc.text(`€ ${fmt(r.net - r.required)}`, W - 18, y + 9, { align: 'right' })
      } else {
        doc.setFillColor(255, 243, 220)
        doc.roundedRect(14, y, W - 28, 24, 2, 2, 'F')
        doc.setTextColor(120, 80, 10); doc.setFontSize(11); doc.setFont('helvetica', 'bold')
        doc.text('Не вистачає', 18, y + 8)
        doc.text(`€ ${fmt(r.shortage)}`, W - 18, y + 8, { align: 'right' })
        doc.setFontSize(9); doc.setFont('helvetica', 'normal')
        doc.text('Рекомендована сума на рахунку:', 18, y + 16)
        doc.setFont('helvetica', 'bold'); doc.setFontSize(12)
        doc.text(`€ ${fmt(r.savings)}`, W - 18, y + 16, { align: 'right' })
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(160, 120, 40)
        doc.text('недостача × 12 міс + 10% запас (рекомендація QLIXA)', 18, y + 22)
        y += 10
      }
      y += 24

      doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(160, 160, 160)
      const disclaimer = 'Цей розрахунок виконано на основі офіційних ставок BMI 2026 і є попереднім. Остаточне рішення приймає компетентний орган. QLIXA не є податковим консультантом і не надає юридичних консультацій.'
      const lines = doc.splitTextToSize(disclaimer, W - 28)
      doc.text(lines, 14, y)

      doc.setFillColor(26, 46, 56)
      doc.rect(0, 282, W, 15, 'F')
      doc.setTextColor(3, 131, 144); doc.setFontSize(9); doc.setFont('helvetica', 'bold')
      doc.text('QLIXA', 14, 291)
      doc.setTextColor(150, 180, 190); doc.setFont('helvetica', 'normal')
      doc.text('| Твій цифровий бізнес-помічник в Австрії', 28, 291)
      doc.setTextColor(100, 140, 150)
      doc.text('qlixa.eu', W - 14, 291, { align: 'right' })

      doc.save('QLIXA_RWR_Rozrakhunok.pdf')
    }
    document.head.appendChild(script)
  }

  const rentStep = hasPartner ? 6 : 5
  const elecStep = hasPartner ? 7 : 6
  const otherStep = hasPartner ? 8 : 7

  const wrapStyle: React.CSSProperties = {
    background: DARK, borderRadius: 20, overflow: 'hidden',
    border: '1px solid rgba(3,131,144,0.2)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
  }

  const headerStyle: React.CSSProperties = {
    background: DARK2, padding: '14px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  }

  const mainStyle: React.CSSProperties = {
    padding: '32px', flex: 1, display: 'flex',
    flexDirection: 'column', justifyContent: 'center', minHeight: 340
  }

  const renderStep = () => {
    if (step === 0) return (
      <div style={mainStyle}>
        <div style={{ fontSize: 11, color: TEAL, textTransform: 'uppercase' as const, letterSpacing: '2px', fontWeight: 600, marginBottom: 10 }}>Інструмент QLIXA</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>RWR+ калькулятор доходу</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28, maxWidth: 360 }}>
          Перевірте за 2 хвилини, чи достатньо вашого доходу для подання на RWR+ карту — і скільки потрібно на рахунку, якщо ні.
        </div>
        <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: 24 }}>
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
              style={{ background: hasPartner === opt.val ? 'rgba(3,131,144,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hasPartner === opt.val ? TEAL : 'rgba(255,255,255,0.1)'}`, borderRadius: 14, padding: 16, cursor: 'pointer', textAlign: 'left' as const, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{opt.label}</div>
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
                background: children === n ? TEAL : 'rgba(255,255,255,0.05)',
                color: '#fff', border: `1px solid ${children === n ? TEAL : 'rgba(255,255,255,0.1)'}` }}>
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
          : 'Вводьте середній чистий місячний прибуток після податків та внесків до SVS.')}
        <div style={{ display: 'flex', gap: 8 }}>{btnBack()}{btnNext('Далі', () => setStep(4))}</div>
      </div>
    )

    if (step === 4) return (
      <div style={mainStyle}>
        {stepLabel(4, 'Ваш чистий місячний дохід')}
        {fieldInput(income, setIncome, 'напр. 1400')}
        {hint(incomeType === 'employed' ? 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.' : 'Середній чистий місячний прибуток після всіх відрахувань.')}
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
        {fieldInput(partnerIncome, setPartnerIncome, 'напр. 1200')}
        {hint(partnerIncomeType === 'employed' ? 'Вводьте звичайну місячну суму — перерахунок × 14÷12 відбудеться автоматично.' : 'Середній чистий місячний прибуток після всіх відрахувань.')}
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
            <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{result.ok ? 'Дохід достатній' : 'Дохід нижче мінімуму'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              {result.ok ? 'Умови BMI 2026 виконуються за попереднім розрахунком.' : 'Можна підтвердити заощадженнями на рахунку.'}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Розбивка</div>
          {[
            [`Ваш дохід (× 14÷12)`, `€ ${fmt(result.adj)}`],
            ...(hasPartner && result.adjP > 0 ? [[`Дохід партнера (× 14÷12)`, `€ ${fmt(result.adjP)}`]] : []),
            [`Оренда понад freie Station`, `− € ${fmt(result.rentDed)}`],
            ...(result.elec > 0 ? [[`Електрика`, `− € ${fmt(result.elec)}`]] : []),
            ...(result.oth > 0 ? [[`Інші платежі`, `− € ${fmt(result.oth)}`]] : []),
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px', fontSize: 13 }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Після витрат</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: result.ok ? '#10B981' : '#F59E0B' }}>€ {fmt(result.net)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Мінімум BMI 2026</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>€ {fmt(result.required)}</span>
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
          <button onClick={() => generatePDF(result)}
            style={{ background: TEAL, color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            ⬇ Завантажити результат (PDF)
          </button>
          <button onClick={() => { setStep(0); setIncome(''); setPartnerIncome(''); setRent(''); setElectricity('0'); setOther('0'); setResult(null); setHasPartner(null); setChildren(0) }}
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 18px', fontSize: 13, cursor: 'pointer' }}>
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
          <div style={{ width: 28, height: 28, background: TEAL, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>Q</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>QLIXA</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' as const }}>RWR+ калькулятор</div>
          </div>
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
