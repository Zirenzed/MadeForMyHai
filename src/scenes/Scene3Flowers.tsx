import { FlowerGallery } from '../components/FlowerGallery'
import { SceneHeader } from '../components/SceneHeader'

export function Scene3Flowers() {
  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Pressed & collected"
        title="Flowers I Never Gave You"
        thai="ดอกไม้สี่ดอกที่เก็บไว้ให้เธอ แต่ละดอกมีโน้ตเล็ก ๆ ซ่อนอยู่"
      />
      <FlowerGallery />
    </section>
  )
}
