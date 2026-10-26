import { useEffect, useRef, useState } from 'react'
import { CONFESSION_CHOICES, CONFESSION_PARAGRAPHS, type ConfessionChoice } from '../data/content'
import { Bouquet } from './art/Bouquet'
import { HeartShape } from './art/Decor'
import { RestartIcon } from './art/icons'
import { ScrapbookCard } from './ScrapbookCard'
import { useSound } from '../sound'

interface Props {
  choice: ConfessionChoice | null
  onChoose: (choice: ConfessionChoice) => void
  onReplay: () => void
  onBackToCover: () => void
}

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: 4 + ((i * 37) % 92),
  delay: (i % 8) * 0.28,
  duration: 4.2 + (i % 5) * 0.5,
  drift: ((i * 53) % 90) - 45,
  size: 10 + ((i * 7) % 9),
  heart: i % 4 === 0,
}))

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`petal ${p.heart ? 'petal--heart' : ''}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export function FinalConfession({ choice, onChoose, onReplay, onBackToCover }: Props) {
  const [burst, setBurst] = useState(0)
  const replyRef = useRef<HTMLDivElement>(null)
  const { click } = useSound()

  useEffect(() => {
    if (choice) replyRef.current?.focus({ preventScroll: true })
  }, [choice, burst])

  const pick = (c: ConfessionChoice) => {
    click()
    onChoose(c)
    if (c === 'yes') setBurst((n) => n + 1)
  }

  return (
    <div className="confession">
      <div className="confession__art" aria-hidden="true">
        <Bouquet className="bouquet" />
        <span className="note note--bouquet">pressed just for you</span>
      </div>

      <ScrapbookCard tone="cream" tilt={-0.5} tape="both" className="confession__letter torn">
        <p className="letter__heading">One last letter</p>
        {CONFESSION_PARAGRAPHS.map((p, i) => (
          <p key={p} className={`confession__p ${i === 2 ? 'confession__p--key' : ''}`} style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
            {p}
          </p>
        ))}

        <div className="choices-row" role="group" aria-label="ตอบอย่างไรก็ได้ ไม่มีคำตอบที่ผิด">
          {(Object.keys(CONFESSION_CHOICES) as ConfessionChoice[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`btn btn--paper btn--big ${choice === key ? 'is-chosen' : ''}`}
              aria-pressed={choice === key}
              onClick={() => pick(key)}
            >
              {CONFESSION_CHOICES[key].label}
            </button>
          ))}
        </div>

        <p className="whisper">
          เลือกอันไหนก็ได้ หรือจะยังไม่เลือกก็ได้นะ ไม่มีคำตอบไหนผิดเลย
          <br />
          คำตอบนี้อยู่แค่ในหน้านี้ ไม่ได้ถูกส่งหรือเก็บไว้ที่ไหน
        </p>

        <div ref={replyRef} tabIndex={-1} className="reply" role="status" aria-live="polite">
          {choice && (
            <ScrapbookCard tone={choice === 'yes' ? 'blue' : 'lavender'} tilt={0.6} className={`reply__card reply__card--${choice}`} key={`${choice}-${burst}`}>
              <HeartShape size={22} color={choice === 'yes' ? '#E7A5B5' : '#C9C0DE'} />
              <p>{CONFESSION_CHOICES[choice].reply}</p>
            </ScrapbookCard>
          )}
        </div>

        <div className="row row--center">
          <button type="button" className="btn btn--paper" onClick={onReplay}>
            <RestartIcon /> ย้อนฟังม้วนเทปอีกรอบ
          </button>
          <button type="button" className="btn btn--paper" onClick={onBackToCover}>
            กลับไปหน้าปก
          </button>
        </div>
      </ScrapbookCard>

      {choice === 'yes' && <Petals key={burst} />}
    </div>
  )
}
