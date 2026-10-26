import { ART } from '../../assets/art'

/** The handmade bouquet (hand-painted sticker art) for the last scene. */
export function Bouquet({ className }: { className?: string }) {
  return (
    <span className={`bouquet ${className ?? ''}`.trim()} aria-hidden="true">
      <img className="bouquet__img" src={ART.bouquet} alt="" decoding="async" draggable={false} />
    </span>
  )
}
