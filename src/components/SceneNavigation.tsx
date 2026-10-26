import { SCENE_COUNT, SCENE_TITLES } from '../data/content'
import { useSound } from '../sound'
import { ChevronLeft, ChevronRight, HomeIcon, VolumeOff, VolumeOn } from './art/icons'

interface SceneNavigationProps {
  scene: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
  onHome: () => void
}

export function SceneNavigation({ scene, onPrev, onNext, onGoTo, onHome }: SceneNavigationProps) {
  const { enabled, toggle } = useSound()
  const progress = (scene / (SCENE_COUNT - 1)) * 100

  return (
    <>
      <header className="topbar">
        <button type="button" className="icon-btn" onClick={onHome} aria-label="กลับไปหน้าปก" disabled={scene === 0}>
          <HomeIcon />
        </button>
        <div className="topbar__title" aria-live="polite">
          <span className="topbar__count">
            Scene {scene + 1} / {SCENE_COUNT}
          </span>
          <span className="topbar__name">{SCENE_TITLES[scene]}</span>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? 'ปิดเสียงเอฟเฟกต์เบา ๆ' : 'เปิดเสียงเอฟเฟกต์เบา ๆ (ตอนนี้ปิดอยู่)'}
        >
          {enabled ? <VolumeOn /> : <VolumeOff />}
        </button>
      </header>

      <nav className="bottombar" aria-label="เลื่อนดูแต่ละฉาก">
        <button
          type="button"
          className="icon-btn icon-btn--lg"
          onClick={onPrev}
          aria-label="ฉากก่อนหน้า"
          style={{ visibility: scene === 0 ? 'hidden' : 'visible' }}
          disabled={scene === 0}
        >
          <ChevronLeft />
        </button>

        <div className="progress">
          <div className="progress__track" aria-hidden="true">
            <div className="progress__fill" style={{ width: `${progress}%` }} />
          </div>
          <ol className="progress__dots">
            {SCENE_TITLES.map((title, i) => (
              <li key={title}>
                <button
                  type="button"
                  className={`dot ${i === scene ? 'is-current' : ''} ${i < scene ? 'is-done' : ''}`}
                  onClick={() => onGoTo(i)}
                  aria-label={`ไปที่ฉากที่ ${i + 1}: ${title}`}
                  aria-current={i === scene ? 'step' : undefined}
                />
              </li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          className="icon-btn icon-btn--lg"
          onClick={onNext}
          aria-label="ฉากถัดไป"
          style={{ visibility: scene === SCENE_COUNT - 1 ? 'hidden' : 'visible' }}
          disabled={scene === SCENE_COUNT - 1}
        >
          <ChevronRight />
        </button>
      </nav>
    </>
  )
}
