import type { PersonaType } from '../../logic/persona'

const INK = '#536F91'

/** Small decorative illustration for each love-personality result. */
export function PersonaMotif({ type, className }: { type: PersonaType; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      {type === 'sunshine' && (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M60 12 L64 28 L56 28 Z"
              fill="#F6D26B"
              stroke="#C98F25"
              strokeWidth="1.2"
              strokeLinejoin="round"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="24" fill="#F2C94C" stroke="#C98F25" strokeWidth="1.5" />
          <path d="M50 62 Q60 72 70 62" fill="none" stroke="#8A5C3A" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="52" cy="54" r="2" fill="#8A5C3A" />
          <circle cx="68" cy="54" r="2" fill="#8A5C3A" />
        </g>
      )}
      {type === 'quiet' && (
        <g>
          <path d="M72 18 A38 38 0 1 0 96 76 A30 30 0 1 1 72 18Z" fill="#C9C0DE" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          <g transform="translate(78 84)">
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx="0" cy="-8" r="7" fill="#E7A5B5" stroke="#CF7E94" strokeWidth="1" transform={`rotate(${a})`} />
            ))}
            <circle r="5" fill="#DE8CA2" stroke="#C4667F" strokeWidth="1" />
          </g>
          <path d="M34 34 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" fill="#F7F4E8" stroke={INK} strokeWidth="1" />
        </g>
      )}
      {type === 'dreamer' && (
        <g>
          <path
            d="M32 78 C20 78 16 62 28 58 C28 44 46 38 54 48 C60 36 82 40 82 56 C96 56 100 76 86 78Z"
            fill="#F7F4E8"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {[
            [96, 28, 9],
            [24, 30, 6],
            [100, 96, 6],
            [44, 98, 8],
          ].map(([x, y, s]) => (
            <path
              key={`${x}${y}`}
              d="M0 -1 L0.35 -0.35 L1 0 L0.35 0.35 L0 1 L-0.35 0.35 L-1 0 L-0.35 -0.35Z"
              fill="#C9C0DE"
              stroke={INK}
              strokeWidth={1.2 / s}
              transform={`translate(${x} ${y}) scale(${s})`}
            />
          ))}
          <path d="M44 66 q6 5 12 0" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {type === 'gentle' && (
        <g>
          <path
            d="M60 100 C28 76 16 58 16 42 C16 28 26 18 38 18 C47 18 55 23 60 31 C65 23 73 18 82 18 C94 18 104 28 104 42 C104 58 92 76 60 100Z"
            fill="#E7A5B5"
            stroke={INK}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M60 100 C60 82 66 70 82 62" fill="none" stroke="#6F9468" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M70 72 C78 62 90 62 94 66 C90 76 80 78 70 72Z" fill="#9DBF8F" stroke="#6F9468" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M36 40 q4 -8 12 -8" fill="none" stroke="#FFFEF9" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
        </g>
      )}
    </svg>
  )
}
