import { ExternalIcon, PauseIcon, PlayIcon } from '../components/art/icons'
import { SceneHeader } from '../components/SceneHeader'
import { ScrapbookCard } from '../components/ScrapbookCard'
import { SONGS } from '../data/content'
import { useMusic } from '../music'
import { useSound } from '../sound'

export function Scene2Mixtape() {
  const music = useMusic()
  const { click } = useSound()

  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Side A · Side B"
        title="Songs That Remind Me of You"
        thai="สี่เพลงในม้วนเทปนี้ เราอยากให้เธอได้ฟัง"
      />

      <ol className="tracklist">
        {SONGS.map((song, i) => {
          const current = music.started && music.index === i
          const isPlaying = current && music.playing
          return (
            <li key={song.id}>
              <ScrapbookCard
                tilt={i % 2 === 0 ? -0.8 : 0.8}
                tape={i % 2 === 0 ? 'top' : 'corner'}
                tone="white"
                className={`track ${current ? 'is-current' : ''}`}
              >
                <div className="track__meta">
                  <span className="track__label">
                    {song.side} / {song.track}
                  </span>
                  <h2 className="track__title">{song.title}</h2>
                  <p className="track__artist">{song.artist}</p>
                </div>
                <p className="track__note">{song.note}</p>

                <div className="track__actions">
                  <button
                    type="button"
                    className="btn btn--primary"
                    aria-pressed={isPlaying}
                    onClick={() => {
                      click()
                      if (isPlaying) music.toggle()
                      else music.playTrack(i)
                    }}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    {isPlaying ? 'หยุดชั่วคราว' : current ? 'เล่นต่อ' : 'เล่นเพลงนี้'}
                  </button>
                  <a
                    className="text-link"
                    href={`https://open.spotify.com/track/${song.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    เปิดใน Spotify <ExternalIcon />
                  </a>
                </div>
                {current && (
                  <p className="track__now" role="status">
                    {isPlaying ? '♪ กำลังเล่นอยู่ และจะเล่นต่อไปทุกฉากเลยนะ' : 'เลือกเพลงนี้ไว้แล้ว'}
                  </p>
                )}
              </ScrapbookCard>
            </li>
          )
        })}
      </ol>

      <p className="whisper">
        กดเลือกเพลงไหนก็ได้ เพลงจะเล่นต่อเนื่องไปจนจบเว็บ ไม่ต้องกดซ้ำ หยุดหรือข้ามได้ที่แถบด้านล่างเสมอ ♪
      </p>
    </section>
  )
}
