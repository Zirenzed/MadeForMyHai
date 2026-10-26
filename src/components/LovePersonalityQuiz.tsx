import { PERSONA_QUESTIONS, PERSONA_RESULTS } from '../data/content'
import { PERSONA_ORDER, scorePersonality, type PersonaType } from '../logic/persona'
import { PersonaMotif } from './art/PersonaMotif'
import { ChevronLeft, RestartIcon } from './art/icons'
import { ScrapbookCard } from './ScrapbookCard'

interface Props {
  answers: (number | null)[]
  onAnswer: (question: number, option: number) => void
  onUndo: () => void
  onRestart: () => void
  onContinue: () => void
}

const SHORT: Record<PersonaType, string> = {
  sunshine: 'Sunshine',
  quiet: 'Quiet',
  dreamer: 'Dreamer',
  gentle: 'Gentle',
}

export function LovePersonalityQuiz({ answers, onAnswer, onUndo, onRestart, onContinue }: Props) {
  const current = answers.findIndex((a) => a === null)
  const total = PERSONA_QUESTIONS.length

  if (current === -1) {
    const types = answers.map((a, i) => PERSONA_QUESTIONS[i].options[a ?? 0].type)
    const { winner, tally } = scorePersonality(types)
    const result = PERSONA_RESULTS[winner]

    return (
      <ScrapbookCard tone="lavender" tape="both" tilt={-0.4} className="quiz-card result-card" data-persona={winner}>
        <PersonaMotif type={winner} className="result-card__motif" />
        <p className="eyebrow">Your love personality</p>
        <h2 className="result-card__title">{result.title}</h2>
        <p className="result-card__thai">{result.thaiTitle}</p>
        <p>{result.description}</p>
        <p className="result-card__message">{result.message}</p>

        <ul className="tally" aria-label="คะแนนของแต่ละแบบ">
          {PERSONA_ORDER.map((t) => (
            <li key={t}>
              <span className="tally__name">{SHORT[t]}</span>
              <span className="tally__bar" aria-hidden="true">
                <span style={{ width: `${(tally[t] / total) * 100}%` }} />
              </span>
              <span className="tally__n">{tally[t]}</span>
            </li>
          ))}
        </ul>

        <div className="row">
          <button type="button" className="btn btn--primary" onClick={onContinue}>
            ไปอ่านจดหมายกัน
          </button>
          <button type="button" className="btn btn--paper" onClick={onRestart}>
            <RestartIcon /> ทำใหม่
          </button>
        </div>
        <p className="whisper">ผลลัพธ์นี้คิดจากคำตอบของเธอจริง ๆ และอยู่แค่ในหน้านี้ ไม่ได้ถูกส่งไปไหน</p>
      </ScrapbookCard>
    )
  }

  const q = PERSONA_QUESTIONS[current]

  return (
    <ScrapbookCard tone="white" polaroid tilt={-0.4} tape="top" className="quiz-card" key={current}>
      <p className="quiz-card__count">
        ข้อ {current + 1} / {total}
      </p>
      <h2 className="quiz-card__question">{q.question}</h2>
      <ul className="stack" role="list">
        {q.options.map((o, i) => (
          <li key={o.label}>
            <button type="button" className="choice-btn" onClick={() => onAnswer(current, i)}>
              {o.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="row">
        <button type="button" className="btn btn--paper" onClick={onUndo} disabled={current === 0}>
          <ChevronLeft /> ย้อนกลับ
        </button>
      </div>
    </ScrapbookCard>
  )
}
