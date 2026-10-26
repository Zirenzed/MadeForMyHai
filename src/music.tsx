import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SONGS } from './data/content'
import { ChevronLeft, ChevronRight, CloseIcon, ExternalIcon, PauseIcon, PlayIcon } from './components/art/icons'

/**
 * Persistent mini player. Nothing loads from Spotify until the visitor taps the
 * cassette (a user gesture), and nothing is stored anywhere.
 * Uses Spotify's official iFrame API: https://open.spotify.com/embed/iframe-api/v1
 */

interface PlaybackData {
  isPaused: boolean
  isBuffering: boolean
  duration: number
  position: number
}
interface EmbedController {
  loadUri(uri: string): void
  play(): void
  pause(): void
  resume(): void
  togglePlay(): void
  destroy(): void
  addListener(event: string, cb: (e: { data: PlaybackData }) => void): void
}
interface IFrameAPI {
  createController(
    el: HTMLElement,
    options: { uri: string; width: string | number; height: string | number },
    cb: (c: EmbedController) => void,
  ): void
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void
  }
}

interface MusicApi {
  started: boolean
  playing: boolean
  index: number
  /** start the player (optionally on a given track). Must be called from a tap. */
  start: (track?: number) => void
  /** play a specific track; starts the player if needed */
  playTrack: (track: number) => void
  toggle: () => void
}

const MusicContext = createContext<MusicApi>({
  started: false,
  playing: false,
  index: 0,
  start: () => {},
  playTrack: () => {},
  toggle: () => {},
})

let apiPromise: Promise<IFrameAPI> | null = null
function loadSpotifyApi(): Promise<IFrameAPI> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise<IFrameAPI>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      apiPromise = null
      reject(new Error('timeout'))
    }, 10000)
    window.onSpotifyIframeApiReady = (api) => {
      window.clearTimeout(timer)
      resolve(api)
    }
    const s = document.createElement('script')
    s.src = 'https://open.spotify.com/embed/iframe-api/v1'
    s.async = true
    s.onerror = () => {
      window.clearTimeout(timer)
      apiPromise = null
      reject(new Error('load'))
    }
    document.body.appendChild(s)
  })
  return apiPromise
}

const uriOf = (i: number) => `spotify:track:${SONGS[i].id}`

export function MusicProvider({ children }: { children: ReactNode }) {
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [showEmbed, setShowEmbed] = useState(false)

  const hostRef = useRef<HTMLDivElement>(null)
  const ctrl = useRef<EmbedController | null>(null)
  const indexRef = useRef(0)
  const playingRef = useRef(false)
  const advancing = useRef(false)
  const began = useRef(false)

  const goTo = useCallback((i: number) => {
    const n = (i + SONGS.length) % SONGS.length
    indexRef.current = n
    setIndex(n)
    advancing.current = true
    ctrl.current?.loadUri(uriOf(n))
    window.setTimeout(() => {
      ctrl.current?.play()
      advancing.current = false
    }, 600)
  }, [])

  const start = useCallback((track = 0) => {
    if (began.current) return
    began.current = true
    indexRef.current = track
    setIndex(track)
    setStarted(true)
    setStatus('loading')

    // After the player is mounted, create the controller.
    const waitHost = () =>
      new Promise<HTMLDivElement>((resolve) => {
        const check = () => (hostRef.current ? resolve(hostRef.current) : window.requestAnimationFrame(check))
        check()
      })

    Promise.all([loadSpotifyApi(), waitHost()])
      .then(([api, host]) => {
        api.createController(host, { uri: uriOf(indexRef.current), width: '100%', height: 80 }, (c) => {
          ctrl.current = c
          setStatus('ready')
          c.addListener('playback_update', (e) => {
            const d = e.data
            const isPlaying = !d.isPaused
            playingRef.current = isPlaying
            setPlaying(isPlaying)
            if (isPlaying) setShowEmbed(false)
            // finished a track -> next one
            if (!advancing.current && d.duration > 0 && d.position >= d.duration - 400) {
              goTo(indexRef.current + 1)
            }
          })
          c.addListener('ready', () => c.play())
          c.play()
          // If the browser blocked autoplay, reveal the real Spotify button.
          window.setTimeout(() => {
            if (!playingRef.current) setShowEmbed(true)
          }, 3000)
        })
      })
      .catch(() => setStatus('error'))
  }, [goTo])

  const playTrack = useCallback(
    (track: number) => {
      if (!began.current) {
        start(track)
        return
      }
      if (!ctrl.current) {
        // still loading: the controller will pick up this track when it is created
        indexRef.current = track
        setIndex(track)
        return
      }
      if (track === indexRef.current) {
        if (!playingRef.current) ctrl.current.togglePlay()
        return
      }
      goTo(track)
    },
    [start, goTo],
  )

  const toggle = useCallback(() => {
    ctrl.current?.togglePlay()
  }, [])

  useEffect(
    () => () => {
      try {
        ctrl.current?.destroy()
      } catch {
        /* ignore */
      }
    },
    [],
  )

  const api = useMemo(
    () => ({ started, playing, index, start, playTrack, toggle }),
    [started, playing, index, start, playTrack, toggle],
  )
  const song = SONGS[index]

  useEffect(() => {
    document.body.classList.toggle('has-player', started)
    return () => document.body.classList.remove('has-player')
  }, [started])

  return (
    <MusicContext.Provider value={api}>
      {children}
      {started && (
        <aside className="player" aria-label="เครื่องเล่นเพลง">
          <div className={`player__embed ${showEmbed ? 'is-open' : ''}`}>
            {showEmbed && (
              <p className="player__embed-hint">
                เบราว์เซอร์ขอให้กดเล่นเองอีกครั้ง กดปุ่มเล่นสีเขียวในกล่องนี้ได้เลย
                <button type="button" className="icon-btn icon-btn--sm" onClick={() => setShowEmbed(false)} aria-label="ซ่อนกล่อง">
                  <CloseIcon />
                </button>
              </p>
            )}
            <div ref={hostRef} />
          </div>

          <div className="player__bar">
            <span className={`player__disc ${playing ? 'is-spinning' : ''}`} aria-hidden="true" />
            <div className="player__text" role="status" aria-live="polite">
              <span className="player__now">
                {status === 'loading' && 'กำลังโหลดเพลง…'}
                {status === 'error' && 'โหลด Spotify ไม่ได้ ลองกดลิงก์ได้เลย'}
                {status === 'ready' && (playing ? 'Now playing' : 'Paused')}
              </span>
              <span className="player__title">
                <span>{song.title}</span> · {song.artist}
              </span>
            </div>
            {status === 'error' ? (
              <a className="icon-btn" href={`https://open.spotify.com/track/${song.id}`} target="_blank" rel="noopener noreferrer" aria-label={`เปิด ${song.title} ใน Spotify`}>
                <ExternalIcon />
              </a>
            ) : (
              <div className="player__controls">
                <button type="button" className="icon-btn" onClick={() => goTo(index - 1)} aria-label="เพลงก่อนหน้า" disabled={status !== 'ready'}>
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn--lg"
                  onClick={toggle}
                  aria-label={playing ? 'หยุดเพลงชั่วคราว' : 'เล่นเพลง'}
                  disabled={status !== 'ready'}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button type="button" className="icon-btn" onClick={() => goTo(index + 1)} aria-label="เพลงถัดไป" disabled={status !== 'ready'}>
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </aside>
      )}
    </MusicContext.Provider>
  )
}

export function useMusic(): MusicApi {
  return useContext(MusicContext)
}
