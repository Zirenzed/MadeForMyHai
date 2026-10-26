const PETALS = Array.from({ length: 16 }, (_, i) => ({
  left: 4 + ((i * 37) % 92),
  delay: (i % 8) * 0.28,
  duration: 4.2 + (i % 5) * 0.5,
  drift: ((i * 53) % 90) - 45,
  size: 10 + ((i * 7) % 9),
  heart: i % 4 === 0,
}))

/** Gentle petals for meaningful moments only. Re-mount (change `key`) to replay. */
export function Petals({ count = 16 }: { count?: number }) {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.slice(0, count).map((p, i) => (
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
