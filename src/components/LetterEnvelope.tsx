import { useEffect, useRef, useState } from 'react'
import type { Letter } from '../data/content'
import { MiniFlower } from './art/Decor'
import { scrollBehavior } from '../utils/motion'
import { useSound } from '../sound'
import { ScrapbookCard } from './ScrapbookCard'

const SEAL_COLORS: Record<Letter['flower'], { petal: string; center: string }> = {
  sunflower: { petal: '#F6D26B', center: '#8F6240' },
  rose: { petal: '#E7A5B5', center: '#DE8CA2' },
  daisy: { petal: '#FFFEF9', center: '#F2C94C' },
  violet: { petal: '#C9C0DE', center: '#F4E3A1' },
  dandelion: { petal: '#DDE6EF', center: '#9C8B63' },
}

export function LetterEnvelope({ letter, index }: { letter: Letter; index: number }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const { click } = useSound()
  const panelId = `letter-${letter.id}`
  const seal = SEAL_COLORS[letter.flower]

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const toggle = () => {
    click()
    const next = !open
    setOpen(next)
    window.clearTimeout(timer.current)
    if (next) {
      timer.current = window.setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: scrollBehavior(), block: 'nearest' })
      }, 450)
    }
  }

  return (
    <div className={`letter ${open ? 'is-open' : ''}`} style={{ ['--tilt' as string]: `${index % 2 ? 1.2 : -1.2}deg` }}>
      <button
        type="button"
        className="envelope"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? 'ปิด' : 'เปิด'}จดหมาย: ${letter.label}`}
      >
        <span className="envelope__shape" aria-hidden="true">
          <span className="envelope__back" />
          <span className="envelope__paper" />
          <span className="envelope__front">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <polygon points="0,0 50,55 0,100" fill="#B7D6E0" />
              <polygon points="100,0 50,55 100,100" fill="#B7D6E0" />
              <polygon points="0,100 50,48 100,100" fill="#A5CAD8" />
            </svg>
          </span>
          <span className="envelope__flap">
            <svg className="flap-out" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <polygon points="0,0 100,0 50,100" fill="#C9E0E8" />
            </svg>
            <svg className="flap-in" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <polygon points="0,0 100,0 50,100" fill="#F7F4E8" />
            </svg>
          </span>
          <svg className="envelope__seal" viewBox="-18 -18 36 36" focusable="false">
            <MiniFlower x={0} y={0} r={13} petal={seal.petal} center={seal.center} />
          </svg>
        </span>
        <span className="envelope__label">{letter.label}</span>
      </button>

      <div id={panelId} ref={panelRef} className="letter__panel" role="region" aria-label={letter.label} aria-hidden={!open}>
        <div className="letter__panel-inner">
          <ScrapbookCard tone="lined" tape="top" className="letter__paper torn">
            <p className="letter__heading">{letter.label}</p>
            <p className="letter__to">ถึงเธอ,</p>
            {letter.paragraphs.map((p) => (
              <p key={p} className="letter__text">
                {p}
              </p>
            ))}
            <p className="letter__sign">{letter.sign}</p>
            <button type="button" className="btn btn--paper letter__close" onClick={toggle} tabIndex={open ? 0 : -1}>
              ปิดจดหมาย
            </button>
          </ScrapbookCard>
        </div>
      </div>
    </div>
  )
}
