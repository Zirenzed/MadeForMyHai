import { FinalConfession } from '../components/FinalConfession'
import { SceneHeader } from '../components/SceneHeader'
import type { ConfessionChoice } from '../data/content'

interface Scene7Props {
  choice: ConfessionChoice | null
  onChoose: (c: ConfessionChoice) => void
  onReplay: () => void
  onBackToCover: () => void
}

export function Scene7Last(props: Scene7Props) {
  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader eyebrow="Side B · last track" title="One Last Little Thing…" />
      <FinalConfession {...props} />
    </section>
  )
}
