/**
 * Shared SVG definitions and small decorative pieces.
 * <GlobalDefs/> is rendered once in <App/>; other SVGs reference its ids.
 */

export function GlobalDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="gingham-blue" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#FFFEF9" />
          <rect width="5" height="10" fill="#536F91" fillOpacity="0.38" />
          <rect width="10" height="5" fill="#536F91" fillOpacity="0.38" />
        </pattern>
        <pattern id="gingham-pink" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#FFFEF9" />
          <rect width="5" height="10" fill="#E7A5B5" fillOpacity="0.55" />
          <rect width="10" height="5" fill="#E7A5B5" fillOpacity="0.55" />
        </pattern>
        <radialGradient id="sun-center" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#8F6240" />
          <stop offset="100%" stopColor="#53341F" />
        </radialGradient>
        <filter id="wc-edge" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

interface MiniFlowerProps {
  x: number
  y: number
  r?: number
  petal?: string
  center?: string
  rotate?: number
}

/** Tiny five-petal flower used as a sticker on the cassette, seals, etc. */
export function MiniFlower({ x, y, r = 7, petal = '#E7A5B5', center = '#F2C94C', rotate = 0 }: MiniFlowerProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle
          key={a}
          cx="0"
          cy={-r * 0.9}
          r={r * 0.62}
          fill={petal}
          stroke="#536F91"
          strokeOpacity="0.55"
          strokeWidth="0.7"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.42} fill={center} stroke="#536F91" strokeOpacity="0.4" strokeWidth="0.6" />
    </g>
  )
}

export function HeartShape({ size = 16, color = '#E7A5B5' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 21 C5 15.5 2.5 12 2.5 8.6 C2.5 5.8 4.6 3.8 7.2 3.8 C9.1 3.8 10.9 4.9 12 6.6 C13.1 4.9 14.9 3.8 16.8 3.8 C19.4 3.8 21.5 5.8 21.5 8.6 C21.5 12 19 15.5 12 21Z"
        fill={color}
        stroke="#536F91"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StarShape({ size = 16, color = '#F7F4E8' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.8 L14.6 9 L21.2 9.5 L16.1 13.8 L17.8 20.3 L12 16.8 L6.2 20.3 L7.9 13.8 L2.8 9.5 L9.4 9Z"
        fill={color}
        stroke="#536F91"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A small flower sticker as a standalone SVG. */
export function FlowerSticker({
  size = 44,
  petal = '#E7A5B5',
  center = '#F2C94C',
  className,
}: {
  size?: number
  petal?: string
  center?: string
  className?: string
}) {
  return (
    <svg className={className} width={size} height={size} viewBox="-20 -20 40 40" aria-hidden="true" focusable="false">
      <MiniFlower x={0} y={0} r={14} petal={petal} center={center} />
    </svg>
  )
}
