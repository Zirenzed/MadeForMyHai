import { SceneHeader } from '../components/SceneHeader'
import { SecretHunt } from '../components/SecretHunt'

interface Scene4Props {
  stage: number
  onSolve: () => void
  onReset: () => void
  onContinue: () => void
}

export function Scene4Hunt(props: Scene4Props) {
  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Hidden in the scrapbook"
        title="The Little Secret Hunt"
        thai="มีโน้ตลับซ่อนอยู่สามใบ ลองไขทีละใบดูนะ ใบ้ขอได้เสมอ"
      />
      <SecretHunt {...props} />
    </section>
  )
}
