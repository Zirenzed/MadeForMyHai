import { useEffect, useRef, useState } from 'react'
import { ART } from '../../assets/art'
import { COVER_EGG, COVER_SPOTS, type CoverSpot } from '../../data/content'
import { useMusic } from '../../music'
import { useSound } from '../../sound'
import { Petals } from '../Petals'

/* Positions are percentages of the hero image (1100 × 825). */
const W = 1100
const H = 825
const pct = (x: number, y: number) => `${((x / W) * 100).toFixed(2)}% ${((y / H) * 100).toFixed(2)}%`
const poly = (pts: [number, number][]) => `polygon(${pts.map(([x, y]) => pct(x, y)).join(', ')})`
const origin = (x: number, y: number) => pct(x, y)
const reelClip = (x: number, y: number, r: number) => `circle(${((r / 972) * 100).toFixed(2)}% at ${pct(x, y)})`

const REELS: { x: number; y: number; r: number }[] = [
  { x: 405, y: 418, r: 40 },
  { x: 660, y: 378, r: 38 },
]

const BOW_TAILS = [
  {
    clip: poly([
      [775, 190],
      [880, 165],
      [945, 200],
      [950, 235],
      [980, 420],
      [985, 480],
      [960, 550],
      [930, 548],
      [905, 440],
      [850, 330],
      [815, 270],
      [790, 230],
    ]),
    origin: origin(800, 200),
  },
  {
    clip: poly([
      [835, 575],
      [870, 570],
      [880, 610],
      [840, 700],
      [790, 715],
      [700, 712],
      [715, 690],
      [780, 640],
      [820, 600],
    ]),
    origin: origin(860, 575),
  },
]

const SPOTS: { id: CoverSpot; left: number; top: number; width: number; height: number }[] = [
  { id: 'left', left: 2.3, top: 8.5, width: 21, height: 31.5 },
  { id: 'right', left: 80.5, top: 66, width: 17.3, height: 23.6 },
  { id: 'stamp', left: 85, top: 18.8, width: 11.8, height: 17 },
]

interface Bubble {
  text: string
  egg?: boolean
  key: number
}

/** The hero cassette: tap it to start the music, spin the reels and scatter petals. */
export function CassetteCover({ lifting = false }: { lifting?: boolean }) {
  const [spinning, setSpinning] = useState(false)
  const [taps, setTaps] = useState(0)
  const [burst, setBurst] = useState(0)
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const spotCount = useRef<Record<CoverSpot, number>>({ left: 0, right: 0, stamp: 0 })
  const timer = useRef<number | undefined>(undefined)
  const { click } = useSound()
  const music = useMusic()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const tapCassette = () => {
    click()
    music.start() // first tap = the visitor's own gesture that allows sound
    const n = taps + 1
    setTaps(n)
    setBurst((b) => b + 1)
    setSpinning(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setSpinning(false), 2800)
    if (n === 5) setBubble({ text: COVER_EGG, egg: true, key: Date.now() })
  }

  const tapSpot = (id: CoverSpot) => {
    click()
    const list = COVER_SPOTS[id].messages
    const i = spotCount.current[id]++ % list.length
    setBubble({ text: list[i], key: Date.now() })
  }

  const active = spinning || music.playing

  return (
    <div className="hero-wrap">
      <div className={`hero ${active ? 'is-active' : ''} ${spinning ? 'is-tapped' : ''} ${lifting ? 'is-lifting' : ''}`}>
        <button
          type="button"
          className="hero__main"
          onClick={tapCassette}
          aria-label={
            music.started
              ? 'ตลับเทปเพื่อเธอ แตะเพื่อให้ม้วนเทปหมุนและกลีบดอกไม้ร่วง'
              : 'ตลับเทปเพื่อเธอ แตะเพื่อเริ่มเล่นเพลงและให้ม้วนเทปหมุน'
          }
        >
          <img className="hero__img" src={ART.hero} alt="" decoding="async" draggable={false} />
          {BOW_TAILS.map((b, i) => (
            <span
              key={i}
              className="hero__layer hero__layer--bow"
              style={{ backgroundImage: `url(${ART.hero})`, clipPath: b.clip, transformOrigin: b.origin, animationDelay: `${i * -1.3}s` }}
              aria-hidden="true"
            />
          ))}
          {REELS.map((r, i) => (
            <span
              key={i}
              className="hero__layer hero__layer--reel"
              style={{ backgroundImage: `url(${ART.hero})`, clipPath: reelClip(r.x, r.y, r.r), transformOrigin: origin(r.x, r.y) }}
              aria-hidden="true"
            />
          ))}
        </button>

        {SPOTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="hero__spot"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.width}%`, height: `${s.height}%` }}
            onClick={() => tapSpot(s.id)}
            aria-label={`${COVER_SPOTS[s.id].label} แตะเพื่ออ่านข้อความ`}
          >
            <span className="hero__spark" aria-hidden="true" />
          </button>
        ))}
      </div>

      <p className="hero-hint" aria-hidden="true">
        {music.started ? 'เพลงเริ่มแล้ว ♪ ลองแตะโน้ตกับแสตมป์ดูนะ' : 'psst… แตะตลับเทปดูสิ'}
      </p>

      <div className="bubble-slot" role="status" aria-live="polite">
        {bubble && (
          <p key={bubble.key} className={`bubble ${bubble.egg ? 'bubble--egg' : ''}`}>
            {bubble.text}
          </p>
        )}
      </div>

      {burst > 0 && <Petals key={burst} count={10} />}
    </div>
  )
}
