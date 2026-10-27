import type { FlowerId } from '../../data/content'
import { ART } from '../../assets/art'

export function FlowerArt({ id, className }: { id: FlowerId; className?: string }) {
  return (
    <span className={`flower-art flower-art--${id} ${className ?? ''}`.trim()} aria-hidden="true">
      <img className="flower-art__img" src={ART[id]} alt="" loading="lazy" decoding="async" draggable={false} />
    </span>
  )
}
