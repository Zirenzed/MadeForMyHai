import { useCallback, useEffect, useRef, useState } from 'react'
import { FLOWERS, type FlowerId, type FlowerInfo } from '../data/content'
import { CheckIcon, CloseIcon } from './art/icons'
import { FlowerArt } from './art/Flowers'
import { ScrapbookCard } from './ScrapbookCard'
import { useSound } from '../sound'

interface FlowerNoteProps {
  flower: FlowerInfo
  index: number
  onClose: () => void
  onNext: () => void
}

function FlowerNote({ flower, index, onClose, onNext }: FlowerNoteProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.classList.add('no-scroll')

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="note-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flower-note-title"
        aria-describedby="flower-note-text"
      >
        <ScrapbookCard tone="cream" tilt={-1.2} tape="top" className="note-paper torn" key={flower.id}>
          <FlowerArt id={flower.id} className="note-paper__flower" />
          <p className="note-paper__count">
            ดอกที่ {index + 1} / {FLOWERS.length}
          </p>
          <h2 id="flower-note-title" className="note-paper__title">
            {flower.label}
          </h2>
          <p id="flower-note-text" className="note-paper__text">
            {flower.message}
          </p>
          <p className="note-paper__aside">— {flower.aside}</p>
        </ScrapbookCard>
        <div className="note-dialog__actions">
          <button ref={closeRef} type="button" className="btn btn--paper" onClick={onClose}>
            <CloseIcon /> ปิดโน้ต
          </button>
          <button type="button" className="btn btn--paper" onClick={onNext}>
            ดอกถัดไป
          </button>
        </div>
      </div>
    </div>
  )
}

export function FlowerGallery() {
  const [openId, setOpenId] = useState<FlowerId | null>(null)
  const [seen, setSeen] = useState<FlowerId[]>([])
  const [popping, setPopping] = useState<FlowerId | null>(null)
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})
  const popTimer = useRef<number | undefined>(undefined)
  const { click } = useSound()

  useEffect(() => () => window.clearTimeout(popTimer.current), [])

  const open = (id: FlowerId) => {
    click()
    setPopping(null)
    window.requestAnimationFrame(() => setPopping(id))
    window.clearTimeout(popTimer.current)
    popTimer.current = window.setTimeout(() => setPopping(null), 900)
    setOpenId(id)
    setSeen((s) => (s.includes(id) ? s : [...s, id]))
  }

  const close = useCallback(() => {
    setOpenId((current) => {
      if (current) window.requestAnimationFrame(() => buttons.current[current]?.focus())
      return null
    })
  }, [])

  const next = () => {
    if (!openId) return
    const i = FLOWERS.findIndex((f) => f.id === openId)
    const target = FLOWERS[(i + 1) % FLOWERS.length].id
    setOpenId(target)
    setSeen((s) => (s.includes(target) ? s : [...s, target]))
  }

  const current = openId ? FLOWERS.findIndex((f) => f.id === openId) : -1
  const allSeen = seen.length === FLOWERS.length

  return (
    <div className="flowers">
      <ul className="flower-grid">
        {FLOWERS.map((f, i) => (
          <li key={f.id}>
            <button
              ref={(el) => {
                buttons.current[f.id] = el
              }}
              type="button"
              className={`flower-btn ${popping === f.id ? 'is-popping' : ''}`}
              style={{ ['--sway-delay' as string]: `${i * -1.4}s` }}
              onClick={() => open(f.id)}
              aria-haspopup="dialog"
              aria-label={`${f.thaiName} (${f.name}) — ${f.label} แตะเพื่ออ่านโน้ต${seen.includes(f.id) ? ' (อ่านแล้ว)' : ''}`}
            >
              <FlowerArt id={f.id} className="flower-btn__art" />
              <span className="flower-btn__label">{f.label}</span>
              <span className="flower-btn__name">{f.thaiName}</span>
              {seen.includes(f.id) && (
                <span className="flower-btn__seen" aria-hidden="true">
                  <CheckIcon />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <p className="whisper" role="status">
        {allSeen
          ? 'ครบทุกดอกแล้ว นี่คือดอกไม้ที่เรายังไม่เคยได้ให้เธอ ♡'
          : `แตะดอกไม้เพื่ออ่านโน้ตเล็ก ๆ · อ่านแล้ว ${seen.length} / ${FLOWERS.length}`}
      </p>

      {openId && current >= 0 && <FlowerNote flower={FLOWERS[current]} index={current} onClose={close} onNext={next} />}
    </div>
  )
}
