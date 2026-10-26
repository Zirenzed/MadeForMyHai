import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface ScrapbookCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tilt?: number
  tape?: 'top' | 'corner' | 'both' | 'none'
  tone?: 'cream' | 'white' | 'blue' | 'lined' | 'lavender'
  polaroid?: boolean
}

/** A paper card with optional washi tape and a slight tilt. */
export function ScrapbookCard({
  children,
  tilt = 0,
  tape = 'none',
  tone = 'white',
  polaroid = false,
  className = '',
  style,
  ...rest
}: ScrapbookCardProps) {
  const merged: CSSProperties = { ...style, ['--tilt' as string]: `${tilt}deg` }
  return (
    <div
      className={`card card--${tone} ${polaroid ? 'card--polaroid' : ''} ${className}`.trim()}
      style={merged}
      {...rest}
    >
      {(tape === 'top' || tape === 'both') && <span className="washi washi--top" aria-hidden="true" />}
      {(tape === 'corner' || tape === 'both') && <span className="washi washi--corner" aria-hidden="true" />}
      {children}
    </div>
  )
}
