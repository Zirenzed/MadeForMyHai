interface SceneHeaderProps {
  eyebrow: string
  title: string
  thai?: string
}

/** Heading block shared by scenes 2–7. The h1 receives focus on scene change. */
export function SceneHeader({ eyebrow, title, thai }: SceneHeaderProps) {
  return (
    <header className="scene-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="scene-title" tabIndex={-1} className="display">
        {title}
      </h1>
      {thai && <p className="thai-lead">{thai}</p>}
    </header>
  )
}
