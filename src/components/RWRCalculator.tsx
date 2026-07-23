'use client'
import { useState } from 'react'

const FREE_STATION = 386.43
const MIN_SINGLE = 1308.39
const MIN_COUPLE = 2064.12
const MIN_CHILD = 201.88

function fmt(n: number) {
  return n.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function adjustIncome(amount: number, type: 'employed' | 'self') {
  return type === 'employed' ? amount * 14 / 12 : amount
}

type Result = {
  ok: boolean
  totalIncome: number
  netIncome: number
  required: number
  shortage: number
  savingsNeeded: number
  hasPartner: boolean
  children: number
  rentDeduction: number
  elec: number
  other: number
}

export default function RWRCalculator() {
  const [step, setStep] = useState(1)
  const [incomeType, setIncomeType] = useState<'employed' | 'self'>('employed')
  const [income, setIncome] = useState('')
  const [hasPartner, setHasPartner] = useState<boolean | null>(null)
  const [partnerIncomeType, setPartnerIncomeType] = useState<'employed' | 'self'>('employed')
  const [partnerIncome, setPartnerIncome] = useState('')
  const [children, setChildren] = useState(0)
  const [rent, setRent] = useState('')
  const [electricity, setElectricity] = useState('0')
  const [other, setOther] = useState('0')
  const [result, setResult] = useState<Result | null>(null)

  const progress = (current: number, total: number) => (
    <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem' }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i < current ? '#038390' : 'rgba(0,0,0,0.1)' }} />
      ))}
    </div>
  )

  const title = (t: string) => <div style={{ fontSize: 18, fontWeight: 500, color: '#1A1A1A', marginBottom: 8 }}>{t}</div>
  const hint = (t: string) => <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 12 }}>{t}</div>

  const fieldRow = (value: string, onChange: (v: string) => void, placeholder: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
      <span style={{ fontSize: 15, color: '#595959' }}>€</span>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} min={0} step={1}
        style={{ flex: 1, padding: '10px 12px', border: '0.5px solid #ccc', borderRadius: 8, fontSize: 15 }} />
    </div>
  )

  const typeToggle = (value: 'employed' | 'self', onChange: (v: 'employed' | 'self') => void) => (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {(['employed', 'self'] as const).map(t => (
        <button key={t} onClick={() => onChange(t)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: value === t ? 600 : 400,
            background: value === t ? '#038390' : 'transparent', color: value === t ? 'white' : '#595959',
            border: `0.5px solid ${value === t ? '#038390' : '#ccc'}` }}>
          {t === 'employed' ? '👔 Найманий працівник' : '💼 Самозайнятий'}
        </button>
      ))}
    </div>
  )

  const btnPrimary = (label: string, onClick: () => void) => (
    <button onClick={onClick} style={{ background: '#038390', color: 'white', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{label}</button>
  )

  const btnBack = (onClick: () => void) => (
    <button onClick={onClick} style={{ background: 'transparent', border: '0.5px solid #ccc', color: '#595959', borderRadius: 8, padding: '10px 20px', fontSize: 14, cursor: 'pointer' }}>Назад</button>
  )

  const incomeHintEmployed = 'Якщо отримуєте зарплату 14 разів на рік — вкажіть звичайну місячну суму, ми перерахуємо за формулою BMI (× 14 ÷ 12).'
  const incomeHintSelf = 'Вкажіть середній чистий місячний прибуток після вирахування податків та внесків до SVS.'

  const calculate = () => {
    const inc = parseFloat(income) || 0
    const pInc = parseFloat(partnerIncome) || 0
    const ren = parseFloat(rent) || 0
    const elec = parseFloat(electricity) || 0
    const oth = parseFloat(other) || 0
    const adjIncome = adjustIncome(inc, incomeType)
    const adjPartner = hasPartner ? adjustIncome(pInc, partnerIncomeType) : 0
    const totalIncome = adjIncome + adjPartner
    const required = (hasPartner ? MIN_COUPLE : MIN_SINGLE) + children * MIN_CHILD
    const rentDeduction = Math.max(0, ren - FREE_STATION)
    const totalDeductions = rentDeduction + elec + oth
    const netIncome = totalIncome - totalDeductions
    const ok = netIncome >= required
    const shortage = Math.max(0, required - netIncome)
    const savingsNeeded = shortage * 12 * 1.1
    setResult({ ok, totalIncome, netIncome, required, shortage, savingsNeeded, hasPartner: !!hasPartner, children, rentDeduction, elec, other: oth })
    setStep(100)
  }

  const metricCard = (label: string, value: string, color?: string) => (
    <div style={{ background: '#F0F7F8', borderRadius: 8, padding: '10px 14px' }}>
      <div style={{ fontSize: 12, color: '#595959', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 500, color: color || '#1A1A1A' }}>{value}</div>
    </div>
  )

  const reset = () => {
    setStep(1); setIncome(''); setPartnerIncome(''); setRent('')
    setElectricity('0'); setOther('0'); setResult(null)
    setHasPartner(null); setChildren(0)
    setIncomeType('employed'); setPartnerIncomeType('employed')
  }

  const totalSteps = hasPartner ? 8 : 7

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '1.5rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(3,131,144,0.12)' }}>

      {step === 1 && (
        <div>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#1A1A1A', marginBottom: 6 }}>RWR+ калькулятор доходу</div>
          <div style={{ fontSize: 14, color: '#595959', lineHeight: 1.6, marginBottom: 16 }}>Перевірте за 2 хвилини, чи достатньо ваших доходів для подання на RWR+ карту.</div>
          <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#595959', lineHeight: 1.5, marginBottom: 20 }}>
            <strong>Важливо:</strong> калькулятор створений на основі офіційних рекомендацій BMI 2026 і допомагає попередньо оцінити фінансові вимоги. Остаточне рішення приймає компетентний орган.
          </div>
          {btnPrimary('Почати', () => setStep(2))}
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок 1</div>
          {progress(1, totalSteps)}
          {title('Чи подаєтеся ви разом із чоловіком / дружиною?')}
          {['Так', 'Ні'].map((opt, i) => (
            <button key={opt} onClick={() => { setHasPartner(i === 0); setStep(3) }}
              style={{ display: 'block', width: '100%', textAlign: 'left' as const, background: '#F0F7F8', border: '0.5px solid rgba(3,131,144,0.3)', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#1A1A1A', cursor: 'pointer', marginBottom: 8 }}>
              {opt}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{btnBack(() => setStep(1))}</div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок 2</div>
          {progress(2, hasPartner ? 8 : 7)}
          {title('Чи є у вас діти?')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 16 }}>
            {[0, 1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => { setChildren(n); setStep(4) }}
                style={{ padding: '10px 20px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
                  background: '#F0F7F8', color: '#1A1A1A', border: '0.5px solid rgba(3,131,144,0.2)' }}>
                {n === 0 ? 'Немає' : n}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>{btnBack(() => setStep(2))}</div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок 3</div>
          {progress(3, hasPartner ? 8 : 7)}
          {title('Ваш тип зайнятості та дохід')}
          {typeToggle(incomeType, setIncomeType)}
          {hint(incomeType === 'employed' ? incomeHintEmployed : incomeHintSelf)}
          {fieldRow(income, setIncome, 'напр. 1400')}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {btnBack(() => setStep(3))}
            {btnPrimary('Далі', () => {
              if (!income || parseFloat(income) <= 0) { alert('Будь ласка, вкажіть дохід.'); return }
              setStep(hasPartner ? 5 : 6)
            })}
          </div>
        </div>
      )}

      {step === 5 && hasPartner && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок 4</div>
          {progress(4, 8)}
          {title('Тип зайнятості та дохід партнера')}
          {typeToggle(partnerIncomeType, setPartnerIncomeType)}
          {hint(partnerIncomeType === 'employed' ? incomeHintEmployed : incomeHintSelf)}
          {fieldRow(partnerIncome, setPartnerIncome, 'напр. 1200')}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {btnBack(() => setStep(4))}
            {btnPrimary('Далі', () => {
              if (!partnerIncome || parseFloat(partnerIncome) <= 0) { alert('Будь ласка, вкажіть дохід партнера.'); return }
              setStep(6)
            })}
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок {hasPartner ? 5 : 4}</div>
          {progress(hasPartner ? 5 : 4, hasPartner ? 8 : 7)}
          {title('Щомісячна оренда')}
          {hint('Оренда разом із Betriebskosten. Не враховуйте електроенергію — її запитаємо окремо.')}
          {fieldRow(rent, setRent, 'напр. 700')}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {btnBack(() => setStep(hasPartner ? 5 : 4))}
            {btnPrimary('Далі', () => {
              if (rent === '') { alert('Будь ласка, вкажіть оренду.'); return }
              setStep(7)
            })}
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок {hasPartner ? 6 : 5}</div>
          {progress(hasPartner ? 6 : 5, hasPartner ? 8 : 7)}
          {title('Витрати на електроенергію')}
          {hint('При подачі документів на RWR+ часто запитують рахунки за електрику окремо — тому ми враховуємо її в цьому розрахунку, щоб підстрахувати вас. Якщо електроопалення немає — введіть 0.')}
          {fieldRow(electricity, setElectricity, 'напр. 80')}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {btnBack(() => setStep(6))}
            {btnPrimary('Далі', () => setStep(8))}
          </div>
        </div>
      )}

      {step === 8 && (
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Крок {hasPartner ? 7 : 6}</div>
          {progress(hasPartner ? 7 : 6, hasPartner ? 8 : 7)}
          {title('Інші регулярні платежі')}
          {hint('Загальна сума: кредит, іпотека, аліменти, страховка авто тощо. Якщо немає — залиште 0.')}
          {fieldRow(other, setOther, 'напр. 0')}
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            {btnBack(() => setStep(7))}
            {btnPrimary('Розрахувати', calculate)}
          </div>
        </div>
      )}

      {step === 100 && result && (
        <div>
          <div style={{ background: result.ok ? 'rgba(16,185,129,0.08)' : 'rgba(204,0,0,0.06)', border: `1px solid ${result.ok ? 'rgba(16,185,129,0.3)' : 'rgba(204,0,0,0.2)'}`, borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: result.ok ? '#059669' : '#CC0000', marginBottom: 4 }}>
              {result.ok ? 'Вітаємо!' : 'Дохід недостатній'}
            </div>
            <div style={{ fontSize: 14, color: result.ok ? '#059669' : '#CC0000', lineHeight: 1.5 }}>
              {result.ok ? 'За попереднім розрахунком ваш дохід відповідає фінансовим вимогам для подання на RWR+ карту.' : 'За поточними даними дохід не покриває мінімальний поріг. Але є рішення — читайте нижче.'}
            </div>
          </div>

          <div style={{ background: '#F0F7F8', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 12, fontSize: 13, color: '#1A1A1A', lineHeight: 1.8 }}>
            <div style={{ fontWeight: 500, marginBottom: 12, color: '#038390', fontSize: 14 }}>📊 Ваш результат</div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#595959', fontSize: 12, marginBottom: 2 }}>👨‍👩‍👧 Склад сім&apos;ї</div>
              <div style={{ fontWeight: 500 }}>{result.hasPartner ? '2 дорослих' : '1 доросла особа'}{result.children > 0 ? ` + ${result.children} ${result.children === 1 ? 'дитина' : 'дітей'}` : ''}</div>
            </div>

            <div style={{ borderTop: '0.5px solid rgba(3,131,144,0.15)', paddingTop: 10, marginBottom: 10 }}>
              <div style={{ color: '#595959', fontSize: 12, marginBottom: 4 }}>💶 Сукупний дохід (скоригований)</div>
              {result.hasPartner ? (
                <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8, marginBottom: 2 }}>
                  Ваш дохід × 14÷12 + дохід партнера × 14÷12 = € {fmt(result.totalIncome)}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8, marginBottom: 2 }}>
                  Ваш дохід × 14÷12 = € {fmt(result.totalIncome)}
                </div>
              )}
              <div style={{ fontWeight: 500 }}>€ {fmt(result.totalIncome)}</div>
            </div>

            <div style={{ borderTop: '0.5px solid rgba(3,131,144,0.15)', paddingTop: 10, marginBottom: 10 }}>
              <div style={{ color: '#595959', fontSize: 12, marginBottom: 4 }}>🏠 Враховані витрати</div>
              <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8 }}>
                {result.rentDeduction > 0
                  ? `Оренда понад freie station (€386,43): € ${fmt(result.rentDeduction)}`
                  : `Оренда ≤ freie station (€386,43): не вираховується`}
              </div>
              {result.elec > 0 && <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8 }}>Електроенергія: € {fmt(result.elec)}</div>}
              {result.other > 0 && <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8 }}>Інші платежі: € {fmt(result.other)}</div>}
              <div style={{ fontWeight: 500 }}>Разом: − € {fmt(result.rentDeduction + result.elec + result.other)}</div>
            </div>

            <div style={{ borderTop: '0.5px solid rgba(3,131,144,0.15)', paddingTop: 10, marginBottom: 10 }}>
              <div style={{ color: '#595959', fontSize: 12, marginBottom: 4 }}>✅ Мінімально необхідний дохід (BMI 2026)</div>
              <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8 }}>
                {result.hasPartner ? `Подружня пара: €2.064,12` : `Одна особа: €1.308,39`}
              </div>
              {result.children > 0 && (
                <div style={{ fontSize: 12, color: '#595959', paddingLeft: 8 }}>
                  + {result.children} {result.children === 1 ? 'дитина' : 'дітей'} × €201,88 = € {fmt(result.children * 201.88)}
                </div>
              )}
              <div style={{ fontWeight: 500 }}>€ {fmt(result.required)}</div>
            </div>

            <div style={{ borderTop: '0.5px solid rgba(3,131,144,0.15)', paddingTop: 10 }}>
              <div style={{ color: '#595959', fontSize: 12, marginBottom: 4 }}>📊 Підсумок</div>
              <div style={{ fontWeight: 500, color: result.ok ? '#059669' : '#CC0000', fontSize: 14 }}>
                {result.ok
                  ? `✓ Залишок після мінімуму: € ${fmt(result.netIncome - result.required)}`
                  : `✗ Не вистачає: € ${fmt(result.shortage)}`}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {metricCard('Після витрат', `€ ${fmt(result.netIncome)}`, result.ok ? '#059669' : '#CC0000')}
            {metricCard('Мінімум BMI 2026', `€ ${fmt(result.required)}`)}
          </div>

          {!result.ok && (
            <div style={{ background: '#FFF8E7', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A', marginBottom: 6 }}>💰 Заощадження як підстраховка</div>
              <div style={{ fontSize: 13, color: '#595959', lineHeight: 1.6, marginBottom: 10 }}>
                QLIXA рекомендує орієнтуватися на суму із запасом ~10%, оскільки кожна справа розглядається індивідуально.
              </div>
              <div style={{ fontSize: 13, color: '#7a6800', marginBottom: 4 }}>Рекомендована сума на рахунку:</div>
              <div style={{ fontSize: 24, fontWeight: 500, color: '#7a6800' }}>€ {fmt(result.savingsNeeded)}</div>
              <div style={{ fontSize: 12, color: '#7a6800', marginTop: 4, opacity: 0.8 }}>недостача {fmt(result.shortage)} × 12 міс + 10% запас</div>
            </div>
          )}

          <div style={{ background: '#038390', borderRadius: 12, padding: '1.25rem', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'white', marginBottom: 6 }}>Ваш розрахунок готовий</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 12 }}>
              Завантажте безкоштовний чекліст RWR+ від QLIXA — щоб нічого не забути при підготовці документів.
            </div>
            <a href="/articles/QLIXA_RWR_Checklist.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', color: '#038390', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Завантажити чекліст
            </a>
          </div>

          <button onClick={reset} style={{ background: 'transparent', border: '0.5px solid #ccc', color: '#595959', borderRadius: 8, padding: '10px 20px', fontSize: 14, cursor: 'pointer' }}>
            Розрахувати знову
          </button>
        </div>
      )}

    </div>
  )
}
