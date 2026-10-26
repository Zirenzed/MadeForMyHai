import { useState, type KeyboardEvent } from 'react'
import { GettingToKnowYouQuiz } from '../components/GettingToKnowYouQuiz'
import { LovePersonalityQuiz } from '../components/LovePersonalityQuiz'
import { SceneHeader } from '../components/SceneHeader'

interface Scene5Props {
  know: (number | null)[]
  persona: (number | null)[]
  onKnowAnswer: (q: number, o: number) => void
  onKnowRestart: () => void
  onPersonaAnswer: (q: number, o: number) => void
  onPersonaUndo: () => void
  onPersonaRestart: () => void
  onContinue: () => void
}

const TABS = [
  { id: 'know', label: 'A · Getting to Know You' },
  { id: 'love', label: 'B · Love Personality' },
] as const

export function Scene5Quizzes(props: Scene5Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('know')

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = tab === 'know' ? 'love' : 'know'
      setTab(next)
      window.requestAnimationFrame(() => document.getElementById(`tab-${next}`)?.focus())
    }
  }

  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Just for fun"
        title="Little Things About You"
        thai="เกมเล็ก ๆ สองแบบ ไม่มีถูกไม่มีผิด เล่นเพื่อความสนุกเท่านั้น"
      />

      <div className="tabs" role="tablist" aria-label="เลือกเกม">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            className={`tab ${tab === t.id ? 'is-selected' : ''}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={onKeyDown}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="tabpanel">
        {tab === 'know' ? (
          <GettingToKnowYouQuiz answers={props.know} onAnswer={props.onKnowAnswer} onRestart={props.onKnowRestart} />
        ) : (
          <LovePersonalityQuiz
            answers={props.persona}
            onAnswer={props.onPersonaAnswer}
            onUndo={props.onPersonaUndo}
            onRestart={props.onPersonaRestart}
            onContinue={props.onContinue}
          />
        )}
      </div>
    </section>
  )
}
