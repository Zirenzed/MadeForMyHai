import { useState } from 'react'
import { KNOW_QUESTIONS } from '../data/content'
import { RestartIcon } from './art/icons'
import { ScrapbookCard } from './ScrapbookCard'

interface Props {
  answers: (number | null)[]
  onAnswer: (question: number, option: number) => void
  onRestart: () => void
}

export function GettingToKnowYouQuiz({ answers, onAnswer, onRestart }: Props) {
  const [picked, setPicked] = useState<number | null>(null)
  const current = answers.findIndex((a) => a === null)
  const total = KNOW_QUESTIONS.length

  if (current === -1) {
    return (
      <ScrapbookCard tone="cream" tape="top" tilt={-0.5} className="quiz-card">
        <h2 className="quiz-card__title">A day in your little world</h2>
        <dl className="summary">
          {KNOW_QUESTIONS.map((q, i) => (
            <div key={q.short} className="summary__row">
              <dt>{q.short}</dt>
              <dd>{q.options[answers[i] ?? 0].label}</dd>
            </div>
          ))}
        </dl>
        <p className="whisper">ขอบคุณที่เล่นด้วยกันนะ ♡ คำตอบเหล่านี้อยู่แค่ในหน้านี้ ไม่ได้ถูกส่งหรือเก็บไว้ที่ไหนเลย</p>
        <div className="row">
          <button
            type="button"
            className="btn btn--paper"
            onClick={() => {
              setPicked(null)
              onRestart()
            }}
          >
            <RestartIcon /> เล่นใหม่
          </button>
        </div>
      </ScrapbookCard>
    )
  }

  const q = KNOW_QUESTIONS[current]
  const isLast = current === total - 1

  const next = () => {
    if (picked === null) return
    onAnswer(current, picked)
    setPicked(null)
  }

  return (
    <ScrapbookCard tone="white" polaroid tilt={0.4} tape="top" className="quiz-card" key={current}>
      <p className="quiz-card__count">
        ข้อ {current + 1} / {total}
      </p>
      <fieldset className="choices">
        <legend className="quiz-card__question">{q.question}</legend>
        {q.options.map((o, i) => (
          <label key={o.label} className={`choice choice--big ${picked === i ? 'is-picked' : ''}`}>
            <input type="radio" name={`know-${current}`} checked={picked === i} onChange={() => setPicked(i)} />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>

      <p className="feedback feedback--soft" role="status">
        {picked !== null ? q.options[picked].feedback : ''}
      </p>

      <div className="row">
        <button type="button" className="btn btn--primary" onClick={next} disabled={picked === null}>
          {isLast ? 'ดูสรุป' : 'ข้อต่อไป'}
        </button>
      </div>
    </ScrapbookCard>
  )
}
