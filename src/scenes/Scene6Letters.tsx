import { LetterEnvelope } from '../components/LetterEnvelope'
import { SceneHeader } from '../components/SceneHeader'
import { LETTERS } from '../data/content'

export function Scene6Letters() {
  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Sealed, but not secret"
        title="Letters I Never Sent"
        thai="จดหมายสามฉบับที่เขียนไว้ แตะซองเพื่อเปิดอ่าน จะปิดแล้วเปิดใหม่อีกก็ได้"
      />
      <div className="letters">
        {LETTERS.map((letter, i) => (
          <LetterEnvelope key={letter.id} letter={letter} index={i} />
        ))}
      </div>
    </section>
  )
}
