import { useCallback, useEffect, useRef, useState } from 'react'
import { GlobalDefs } from './components/art/Decor'
import { ART } from './assets/art'
import { useMusic } from './music'
import { SceneNavigation } from './components/SceneNavigation'
import {
  CLUES,
  KNOW_QUESTIONS,
  PERSONA_QUESTIONS,
  SCENE_COUNT,
  type ConfessionChoice,
} from './data/content'
import { Scene1Cover } from './scenes/Scene1Cover'
import { Scene2Mixtape } from './scenes/Scene2Mixtape'
import { Scene3Flowers } from './scenes/Scene3Flowers'
import { Scene4Hunt } from './scenes/Scene4Hunt'
import { Scene5Quizzes } from './scenes/Scene5Quizzes'
import { Scene6Letters } from './scenes/Scene6Letters'
import { Scene7Last } from './scenes/Scene7Last'

const blank = (n: number): (number | null)[] => Array.from({ length: n }, () => null)

/** Wait (briefly) for the self-hosted fonts so the first paint isn't jumpy. */
function useFontsReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    const fonts = document.fonts
    const loading = fonts
      ? Promise.all([
          fonts.load('400 16px "Noto Sans Thai Looped"', 'เธอ'),
          fonts.load('700 24px "Caveat"', 'for you'),
          fonts.load('400 16px "DM Sans"', 'Aa'),
        ])
      : Promise.resolve()
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 1800))
    Promise.race([loading, timeout])
      .catch(() => undefined)
      .then(() => {
        if (alive) setReady(true)
      })
    return () => {
      alive = false
    }
  }, [])
  return ready
}

export default function App() {
  const ready = useFontsReady()
  const music = useMusic()
  const { suspend } = music

  // Everything below lives in memory only. Nothing is written to storage,
  // cookies or the network, and a refresh starts the gift over.
  const [scene, setScene] = useState(0)
  const [huntStage, setHuntStage] = useState(0)
  const [know, setKnow] = useState<(number | null)[]>(() => blank(KNOW_QUESTIONS.length))
  const [persona, setPersona] = useState<(number | null)[]>(() => blank(PERSONA_QUESTIONS.length))
  const [confession, setConfession] = useState<ConfessionChoice | null>(null)

  const firstRender = useRef(true)

  const goTo = useCallback((index: number) => {
    setScene(Math.min(Math.max(index, 0), SCENE_COUNT - 1))
  }, [])
  const next = useCallback(() => goTo(scene + 1), [goTo, scene])
  const prev = useCallback(() => goTo(scene - 1), [goTo, scene])

  // On scene change: scroll to top and move focus to the scene heading.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.getElementById('scene-title')?.focus({ preventScroll: true })
  }, [scene])

  // Scene 2 has its own Spotify players; pause the mini player there so they don't overlap.
  useEffect(() => {
    suspend(scene === 1)
  }, [scene, suspend])

  const setAt = (setter: typeof setKnow) => (q: number, o: number) =>
    setter((prevAnswers) => prevAnswers.map((a, i) => (i === q ? o : a)))

  const undoPersona = () =>
    setPersona((prevAnswers) => {
      let last = -1
      prevAnswers.forEach((a, i) => {
        if (a !== null) last = i
      })
      return last === -1 ? prevAnswers : prevAnswers.map((a, i) => (i === last ? null : a))
    })

  const replayAll = () => {
    setHuntStage(0)
    setKnow(blank(KNOW_QUESTIONS.length))
    setPersona(blank(PERSONA_QUESTIONS.length))
    setConfession(null)
    goTo(0)
  }

  if (!ready) {
    return (
      <div className="loading" role="status" aria-live="polite">
        <img className="loading__cassette" src={ART.cassetteSmall} alt="" />
        <p>กำลังม้วนเทป…</p>
        <GlobalDefs />
      </div>
    )
  }

  return (
    <div className="app">
      <GlobalDefs />
      <a className="skip-link" href="#main">
        ข้ามไปที่เนื้อหา
      </a>

      <SceneNavigation scene={scene} onPrev={prev} onNext={next} onGoTo={goTo} onHome={() => goTo(0)} />

      <main id="main" className="main" key={scene}>
        {scene === 0 && <Scene1Cover onOpen={next} />}
        {scene === 1 && <Scene2Mixtape />}
        {scene === 2 && <Scene3Flowers />}
        {scene === 3 && (
          <Scene4Hunt
            stage={huntStage}
            onSolve={() => setHuntStage((s) => Math.min(s + 1, CLUES.length))}
            onReset={() => setHuntStage(0)}
            onContinue={next}
          />
        )}
        {scene === 4 && (
          <Scene5Quizzes
            know={know}
            persona={persona}
            onKnowAnswer={setAt(setKnow)}
            onKnowRestart={() => setKnow(blank(KNOW_QUESTIONS.length))}
            onPersonaAnswer={setAt(setPersona)}
            onPersonaUndo={undoPersona}
            onPersonaRestart={() => setPersona(blank(PERSONA_QUESTIONS.length))}
            onContinue={next}
          />
        )}
        {scene === 5 && <Scene6Letters />}
        {scene === 6 && (
          <Scene7Last choice={confession} onChoose={setConfession} onReplay={replayAll} onBackToCover={() => goTo(0)} />
        )}
      </main>
    </div>
  )
}
