import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CLUES, HUNT_WRONG_FEEDBACK, type Clue } from '../data/content'
import { isCorrect } from '../logic/answers'
import { scrollBehavior } from '../utils/motion'
import { useSound } from '../sound'
import { CheckIcon, LockIcon, RestartIcon } from './art/icons'
import { ScrapbookCard } from './ScrapbookCard'

type ClueState = 'locked' | 'active' | 'solved'

interface ClueCardProps {
  clue: Clue
  index: number
  state: ClueState
  onSolve: () => void
}

function ClueCard({ clue, index, state, onSolve }: ClueCardProps) {
  const [value, setValue] = useState('')
  const [hintsShown, setHintsShown] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [shake, setShake] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const firstRadioRef = useRef<HTMLInputElement>(null)
  const mounted = useRef(false)
  const { click } = useSound()

  // When this clue becomes the active one (after the previous was solved),
  // bring it into view and move focus to its answer field.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (state === 'active') {
      const t = window.setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' })
        ;(inputRef.current ?? firstRadioRef.current)?.focus({ preventScroll: true })
      }, 350)
      return () => window.clearTimeout(t)
    }
  }, [state])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) {
      setFeedback(clue.kind === 'choice' ? 'เลือกคำตอบก่อนนะ' : 'พิมพ์คำตอบก่อนนะ')
      return
    }
    if (isCorrect(value, clue.accepts, clue.match)) {
      click()
      setFeedback('')
      onSolve()
      return
    }
    setShake(false)
    window.requestAnimationFrame(() => setShake(true))
    setFeedback(HUNT_WRONG_FEEDBACK[attempts % HUNT_WRONG_FEEDBACK.length])
    setAttempts((n) => n + 1)
  }

  const label = `${clue.title}`

  if (state === 'locked') {
    return (
      <ScrapbookCard tone="lavender" tilt={index % 2 ? 0.6 : -0.6} className="clue clue--locked" aria-disabled="true">
        <p className="clue__title">{label}</p>
        <p className="clue__locked">
          <LockIcon /> ยังเปิดไม่ได้ ไขโน้ตก่อนหน้านี้ก่อนนะ
        </p>
      </ScrapbookCard>
    )
  }

  if (state === 'solved') {
    return (
      <ScrapbookCard tone="cream" tilt={index % 2 ? 0.6 : -0.6} tape="corner" className="clue clue--solved">
        <p className="clue__title">
          {label} <span className="clue__check"><CheckIcon /> solved</span>
        </p>
        <p className="clue__answer">{clue.reveal}</p>
        <p className="clue__success">{clue.success}</p>
      </ScrapbookCard>
    )
  }

  return (
    <div ref={cardRef}>
      <ScrapbookCard tone="white" tilt={index % 2 ? 0.5 : -0.5} tape="top" className={`clue clue--active ${shake ? 'is-shaking' : ''}`}>
        <p className="clue__title">{label}</p>
        <form onSubmit={submit} noValidate>
          {clue.kind === 'text' ? (
            <>
              <label className="clue__prompt" htmlFor={`${clue.id}-input`}>
                {clue.prompt}
              </label>
              <input
                ref={inputRef}
                id={`${clue.id}-input`}
                className="field"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={clue.placeholder}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="done"
              />
            </>
          ) : (
            <fieldset className="choices">
              <legend className="clue__prompt">{clue.prompt}</legend>
              {clue.options?.map((o, i) => (
                <label key={o.value} className="choice">
                  <input
                    ref={i === 0 ? firstRadioRef : undefined}
                    type="radio"
                    name={clue.id}
                    value={o.value}
                    checked={value === o.value}
                    onChange={() => setValue(o.value)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>
          )}

          {hintsShown > 0 && (
            <ul className="hints" aria-label="คำใบ้">
              {clue.hints.slice(0, hintsShown).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}

          <p className="feedback" role="status">
            {feedback}
          </p>

          <div className="row">
            <button type="submit" className="btn btn--primary">
              เช็กคำตอบ
            </button>
            {hintsShown < clue.hints.length && (
              <button type="button" className="btn btn--paper" onClick={() => setHintsShown((n) => n + 1)}>
                {hintsShown === 0 ? 'ขอใบ้หน่อย' : 'ใบ้เพิ่มอีกนิด'}
              </button>
            )}
          </div>
        </form>
      </ScrapbookCard>
    </div>
  )
}

interface SecretHuntProps {
  stage: number
  onSolve: () => void
  onReset: () => void
  onContinue: () => void
}

export function SecretHunt({ stage, onSolve, onReset, onContinue }: SecretHuntProps) {
  const done = stage >= CLUES.length
  return (
    <div className="hunt">
      <p className="whisper" role="status">
        {done ? 'ไขครบทั้งสามโน้ตแล้ว' : `โน้ตที่ ${stage + 1} จาก ${CLUES.length} · ไขทีละโน้ตตามลำดับนะ`}
      </p>

      {CLUES.map((clue, i) => (
        <ClueCard
          key={clue.id}
          clue={clue}
          index={i}
          state={i < stage ? 'solved' : i === stage ? 'active' : 'locked'}
          onSolve={onSolve}
        />
      ))}

      {done && (
        <ScrapbookCard tone="blue" tilt={-0.4} tape="both" className="hunt-complete">
          <h2 className="hunt-complete__title">All found ♡</h2>
          <p>
            ไขครบสามโน้ตแล้ว! ใต้ปกสมุดมีข้อความเล็ก ๆ ซ่อนอยู่: “ขอบคุณที่ตามหาด้วยกันนะ
            เราดีใจที่เธอเปิดมาถึงตรงนี้” ต่อไปมาเล่นเกมเล็ก ๆ เพื่อรู้จักกันมากขึ้นกัน
          </p>
          <div className="row">
            <button type="button" className="btn btn--primary" onClick={onContinue}>
              ไปต่อกัน
            </button>
            <button type="button" className="btn btn--paper" onClick={onReset}>
              <RestartIcon /> เล่นใหม่
            </button>
          </div>
        </ScrapbookCard>
      )}
    </div>
  )
}
