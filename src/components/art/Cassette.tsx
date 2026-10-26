import { useEffect, useRef, useState } from 'react'
import { MiniFlower } from './Decor'
import { useSound } from '../../sound'
import { ART } from '../../assets/art'

const INK = '#536F91'

function Reel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(0.78)`}>
      <circle r="18" fill="#6B4F3A" opacity="0.9" />
      <g className="reel">
        <circle r="13" fill="#F7F4E8" stroke={INK} strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="0" y1="-5" x2="0" y2="-11" stroke={INK} strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${a})`} />
        ))}
        <circle r="4.5" fill={INK} />
        <circle r="1.6" fill="#F7F4E8" />
      </g>
    </g>
  )
}

/** The pastel-blue cassette with flowers and a gingham ribbon (pure SVG). */
export function CassetteArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 214" aria-hidden="true" focusable="false">
      {/* body */}
      <rect x="10" y="10" width="300" height="194" rx="18" fill="#B7D6E0" stroke={INK} strokeWidth="3" />
      <rect x="18" y="18" width="284" height="178" rx="12" fill="none" stroke="#FFFEF9" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="3 5" />

      {/* label */}
      <rect x="38" y="30" width="244" height="92" rx="8" fill="#F7F4E8" stroke={INK} strokeWidth="1.6" />
      <rect x="38" y="52" width="244" height="3" fill="#E7A5B5" fillOpacity="0.75" />
      <text x="52" y="46" fontFamily="'DM Sans', sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.5" fill={INK}>
        SIDE A
      </text>
      <text x="270" y="47" textAnchor="end" fontFamily="'Caveat', cursive" fontSize="15" fontWeight="700" fill={INK}>
        a mixtape
      </text>

      {/* tape window + reels */}
      <rect x="96" y="58" width="128" height="38" rx="19" fill="#25282B" fillOpacity="0.9" stroke={INK} strokeWidth="1.5" />
      <path d="M126 90 Q160 86 194 90" stroke="#6B4F3A" strokeWidth="1.6" fill="none" />
      <Reel cx={126} cy={77} />
      <Reel cx={194} cy={77} />

      <text x="150" y="117" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="23" fontWeight="700" fill={INK}>
        for you
      </text>
      <path
        d="M190 112 C185 108 183 106 183 103.6 C183 101.9 184.3 100.8 185.8 100.8 C187 100.8 188 101.4 188.6 102.4 C189.2 101.4 190.2 100.8 191.4 100.8 C192.9 100.8 194.2 101.9 194.2 103.6 C194.2 106 192 108 190 112Z"
        transform="translate(2 1)"
        fill="#E7A5B5"
        stroke={INK}
        strokeWidth="1"
      />

      {/* bottom trapezoid */}
      <path d="M64 204 L82 156 H238 L256 204 Z" fill="#9CC3D1" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="108" cy="186" r="5" fill="#F7F4E8" stroke={INK} strokeWidth="1.4" />
      <circle cx="212" cy="186" r="5" fill="#F7F4E8" stroke={INK} strokeWidth="1.4" />
      <rect x="140" y="178" width="40" height="12" rx="3" fill={INK} opacity="0.28" />

      {/* screws */}
      {[
        [26, 26],
        [294, 26],
        [26, 188],
        [294, 188],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="#F7F4E8" stroke={INK} strokeWidth="1.4" />
          <path d={`M${x - 2.5} ${y - 2.5} l5 5 M${x + 2.5} ${y - 2.5} l-5 5`} stroke={INK} strokeWidth="1" />
        </g>
      ))}

      {/* gingham ribbon across the cassette */}
      <rect x="3" y="124" width="314" height="28" fill="url(#gingham-blue)" stroke={INK} strokeWidth="1.6" />
      <path d="M3 128 H317 M3 148 H317" stroke="#FFFEF9" strokeOpacity="0.5" strokeWidth="1" />

      {/* bow */}
      <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round" fill="url(#gingham-blue)">
        <path d="M240 138 C214 112 198 140 212 158 C224 164 236 152 240 138Z" />
        <path d="M240 138 C266 112 282 140 268 158 C256 164 244 152 240 138Z" />
        <path d="M235 146 L220 184 L233 177 L240 190 L244 150Z" />
        <path d="M245 146 L260 184 L247 177 L240 190 L236 150Z" />
        <circle cx="240" cy="140" r="8" />
      </g>

      {/* tiny flowers */}
      <MiniFlower x={24} y={62} r={7} petal="#E7A5B5" />
      <MiniFlower x={297} y={62} r={7} petal="#C9C0DE" center="#FFFEF9" />
      <MiniFlower x={30} y={170} r={8} petal="#FFFEF9" />
      <MiniFlower x={46} y={190} r={6} petal="#E7A5B5" />
      <MiniFlower x={200} y={146} r={6} petal="#C9C0DE" center="#FFFEF9" />
      <MiniFlower x={296} y={176} r={8} petal="#E7A5B5" />
      <g fill="#9DBF8F" stroke="#6F9468" strokeWidth="1">
        <ellipse cx="36" cy="182" rx="7" ry="3" transform="rotate(-30 36 182)" />
        <ellipse cx="288" cy="188" rx="7" ry="3" transform="rotate(25 288 188)" />
      </g>
    </svg>
  )
}

/** Clickable cassette: spins the reels and wobbles when pressed. */
export function CassetteCover({ lifting = false }: { lifting?: boolean }) {
  const [spinning, setSpinning] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const { click } = useSound()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = () => {
    click()
    setSpinning(false)
    // restart the animation even if pressed repeatedly
    window.requestAnimationFrame(() => {
      setSpinning(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setSpinning(false), 2600)
    })
  }

  return (
    <button
      type="button"
      className={`cassette ${spinning ? 'is-spinning' : ''} ${lifting ? 'is-lifting' : ''}`}
      onClick={handleClick}
      aria-label="ตลับเทปเพื่อเธอ แตะเพื่อให้ม้วนเทปหมุน"
    >
      <img className="cassette__img" src={ART.hero} alt="" decoding="async" draggable={false} />
    </button>
  )
}
