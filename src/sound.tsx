import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

/**
 * Optional tape-click sound. Off by default, never autoplays. The audio
 * context is only created after the visitor switches sound on.
 */

interface SoundApi {
  enabled: boolean
  toggle: () => void
  click: () => void
}

const SoundContext = createContext<SoundApi>({ enabled: false, toggle: () => {}, click: () => {} })

function playClick(ctx: AudioContext) {
  const duration = 0.07
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  filter.Q.value = 0.8
  const gain = ctx.createGain()
  gain.gain.value = 0.18
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const toggle = useCallback(() => {
    const next = !enabled
    setEnabled(next)
    if (!next) return
    try {
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (!Ctor) return
        ctxRef.current = new Ctor()
      }
      void ctxRef.current.resume()
      playClick(ctxRef.current)
    } catch {
      /* sound is a nice-to-have; ignore failures */
    }
  }, [enabled])

  const click = useCallback(() => {
    if (!enabled || !ctxRef.current) return
    try {
      playClick(ctxRef.current)
    } catch {
      /* ignore */
    }
  }, [enabled])

  const value = useMemo(() => ({ enabled, toggle, click }), [enabled, toggle, click])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound(): SoundApi {
  return useContext(SoundContext)
}
