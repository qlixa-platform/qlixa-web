'use client'

import { useState, useEffect } from 'react'
import FitHeadline from './FitHeadline'

type Props = {
  cabinetUrl: string
}

const CATEGORIES = [
  'Обладнання або речі для роботи',
  'Курси або професійне навчання',
  'Інші витрати, пов’язані з роботою',
  'Поїздки на роботу або робочі поїздки',
  'Робота з дому',
  'Діти',
  'Інші доходи',
  'Надзвичайні витрати',
]

const RELATED_LINKS = [
  { label: 'Маєш капітальні та закордонні доходи', href: '/for/samostiynyy' },
  { label: 'Здаєш нерухомість', href: '/for/nerukhomist' },
  { label: 'Пенсіонер з доходом', href: '/for/pensioner' },
]

type Step = 'closed' | 'q1' | 'notEmployee' | 'checklist' | 'result'

export default function FreeQuestionnaire({ cabinetUrl }: Props) {
  const [step, setStep] = useState<Step>('closed')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (step !== 'closed') {
      setMounted(false)
      const id = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(id)
    }
  }, [step])

  function toggle(cat: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  function reset() {
    setStep('closed')
    setChecked(new Set())
  }

  const checkedCount = checked.size
  // 0 checked → nothing obvious found · 1–2 → possible refund, needs full check · 3+ → clearly worth checking
  const resultTier: 'green' | 'yellow' | 'gray' = checkedCount === 0 ? 'gray' : checkedCount <= 2 ? 'yellow' : 'green'

  if (step === 'closed') {
    return (
      <button
        onClick={() => setStep('q1')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px',
          background: '#038390', color: '#fff', borderRadius: 11, fontSize: 15, fontWeight: 700,
          border: 'none', cursor: 'pointer', marginTop: 18,
        }}
      >
        Перевірити безкоштовно →
      </button>
    )
  }

  return (
    <div style={{
      background: '#F0F7F8', border: '1px solid rgba(3,131,144,0.15)', borderRadius: 20, padding: 28,
      marginTop: 18, maxWidth: 760, maxHeight: 'min(900px, 85vh)', overflowY: 'auto' as const,
      opacity: mounted ? 1 : 0, transform: mounted ? 'translateX(0)' : 'translateX(24px)',
      transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
    }}>

      {step === 'q1' && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>
            Крок 1 з 2
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>
            Працюєте за наймом в Австрії?
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep('checklist')} style={{
              flex: 1, padding: '13px 20px', background: '#038390', color: '#fff', border: 'none',
              borderRadius: 11, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Так
            </button>
            <button onClick={() => setStep('notEmployee')} style={{
              flex: 1, padding: '13px 20px', background: '#fff', color: '#038390', border: '1px solid rgba(3,131,144,0.3)',
              borderRadius: 11, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              Ні
            </button>
          </div>
        </div>
      )}

      {step === 'notEmployee' && (
        <div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>
            Цей інструмент — для найманих працівників
          </p>
          <p style={{ fontSize: 15, color: '#595959', lineHeight: 1.6, marginBottom: 18 }}>
            Схоже, тобі підійде інший розділ QLIXA:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 18 }}>
            {RELATED_LINKS.map(link => (
              <a key={link.href} href={link.href} style={{
                fontSize: 15, fontWeight: 600, color: '#038390', background: '#fff',
                border: '1px solid rgba(3,131,144,0.2)', padding: '12px 16px', borderRadius: 11,
                textDecoration: 'none',
              }}>
                {link.label} →
              </a>
            ))}
          </div>
          <button onClick={reset} style={{ background: 'none', border: 'none', color: '#595959', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
            Пройти ще раз
          </button>
        </div>
      )}

      {step === 'checklist' && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: '#038390', marginBottom: 10 }}>
            Крок 2 з 2
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
            Протягом року у вас було щось із цього?
          </p>
          <p style={{ fontSize: 14, color: '#595959', marginBottom: 18 }}>
            Познач усе, що підходить — деталі уточнювати не потрібно.
          </p>
          {/* 3-per-row grid, per Iryna's request — more horizontal than the old 1-per-row stack */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
            {CATEGORIES.map(cat => (
              <label key={cat} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px', background: '#fff',
                border: `1px solid ${checked.has(cat) ? '#038390' : '#E6F4F5'}`, borderRadius: 11, cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={checked.has(cat)}
                  onChange={() => toggle(cat)}
                  style={{ width: 16, height: 16, accentColor: '#038390', flexShrink: 0, marginTop: 1 }}
                />
                <span style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.35 }}>{cat}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setStep('result')} style={{
            width: '100%', padding: '13px 20px', background: '#038390', color: '#fff', border: 'none',
            borderRadius: 11, fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>
            Показати результат →
          </button>
        </div>
      )}

      {step === 'result' && (
        <div>
          {resultTier === 'green' && (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#065F46', marginBottom: 10 }}>Є що перевірити 👀</p>
              <div style={{ marginBottom: 16 }}>
                <FitHeadline
                  text="За вашими відповідями є витрати або обставини, які можуть мати значення для вашого податкового результату."
                  startSize={15}
                  minSize={10}
                  maxWidth={700}
                  align="left"
                  style={{ color: '#1A1A1A', fontFamily: 'inherit' }}
                />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#595959', marginBottom: 8 }}>Категорії для перевірки:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginBottom: 18 }}>
                {Array.from(checked).map(cat => (
                  <div key={cat} style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.35 }}>✓ {cat}</div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: '#595959', marginBottom: 20 }}>
                Це ще не розрахунок суми повернення. Щоб перевірити ситуацію детальніше, потрібна повна анкета.
              </p>
              <a href={cabinetUrl} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#038390',
                color: '#fff', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              }}>
                Перейти до повної перевірки →
              </a>
            </>
          )}

          {resultTier === 'yellow' && (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#92400E', marginBottom: 10 }}>Можливе повернення — але потрібно перевірити детальніше</p>
              <div style={{ marginBottom: 8 }}>
                <FitHeadline
                  text="Ваші відповіді показують кілька факторів, які можуть впливати на податковий результат."
                  startSize={15}
                  minSize={10}
                  maxWidth={700}
                  align="left"
                  style={{ color: '#1A1A1A', fontFamily: 'inherit' }}
                />
              </div>
              {checkedCount > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginBottom: 12 }}>
                  {Array.from(checked).map(cat => (
                    <div key={cat} style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.35 }}>✓ {cat}</div>
                  ))}
                </div>
              )}
              <p style={{ fontSize: 14, color: '#595959', marginBottom: 20 }}>
                Щоб зробити персональний розрахунок, потрібно пройти повну анкету QLIXA.
              </p>
              <a href={cabinetUrl} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#038390',
                color: '#fff', borderRadius: 11, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              }}>
                Перейти до повної перевірки →
              </a>
            </>
          )}

          {resultTier === 'gray' && (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#404040', marginBottom: 10 }}>Поки що явних додаткових категорій не знайдено</p>
              <div style={{ marginBottom: 8 }}>
                <FitHeadline
                  text="За вашими відповідями ми не бачимо очевидних додаткових категорій для перевірки."
                  startSize={15}
                  minSize={10}
                  maxWidth={700}
                  align="left"
                  style={{ color: '#1A1A1A', fontFamily: 'inherit' }}
                />
              </div>
              <p style={{ fontSize: 14, color: '#595959', marginBottom: 20 }}>
                Це не означає, що повернення податку немає. Остаточний результат залежить від вашої повної ситуації та даних, які враховуються Finanzamt.
              </p>
              <a href={cabinetUrl} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: '#fff',
                color: '#038390', border: '1px solid rgba(3,131,144,0.3)', borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                Перейти до повної перевірки →
              </a>
            </>
          )}

          <div style={{ marginTop: 16 }}>
            <button onClick={reset} style={{ background: 'none', border: 'none', color: '#595959', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>
              Пройти ще раз
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
