import { useEffect, useRef, useState } from 'react'
import { CassetteCover } from '../components/art/Cassette'
import { useSound } from '../sound'
import { prefersReducedMotion } from '../utils/motion'

export function Scene1Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const { click } = useSound()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleOpen = () => {
    if (opening) return
    click()
    if (prefersReducedMotion()) {
      onOpen()
      return
    }
    setOpening(true)
    timer.current = window.setTimeout(onOpen, 650)
  }

  return (
    <section className={`scene scene-cover ${opening ? 'is-opening' : ''}`} aria-labelledby="scene-title">
      <div className="cover-stage">
        <div className="cover-cassette">
          <CassetteCover lifting={opening} />
          <span className="note note--cassette" aria-hidden="true">
            psst… แตะตลับเทปดูสิ
          </span>
        </div>
      </div>

      <div className="cover-text">
        <h1 id="scene-title" tabIndex={-1} className="display display--xl">
          A Little Gift for You
        </h1>
        <p className="sub">Some songs, some flowers, and a little piece of my heart.</p>
        <p className="thai-lead">เรามีอะไรเล็ก ๆ อยากให้เธอลองเปิดดูนะ</p>
        <button type="button" className="btn btn--primary btn--big" onClick={handleOpen}>
          Open Your Little Gift ♡
        </button>
      </div>
    </section>
  )
}
