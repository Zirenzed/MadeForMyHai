import { useEffect, useState } from 'react'
import { ExternalIcon } from '../components/art/icons'
import { SceneHeader } from '../components/SceneHeader'
import { ScrapbookCard } from '../components/ScrapbookCard'
import { SONGS, type Song } from '../data/content'

function SpotifyEmbed({ song }: { song: Song }) {
  const [loaded, setLoaded] = useState(false)
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    // Cross-origin iframes don't report errors, so after a while we
    // gently point to the "open in Spotify" link instead.
    const t = window.setTimeout(() => setSlow(true), 8000)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="spotify">
      <div className="spotify__frame">
        {!loaded && (
          <div className="spotify__loading" role="status">
            {slow ? 'เพลงยังไม่ขึ้น ลองกดลิงก์ด้านล่างได้เลยนะ' : 'กำลังโหลดเพลง…'}
          </div>
        )}
        <iframe
          title={`Spotify: ${song.title} — ${song.artist}`}
          src={`https://open.spotify.com/embed/track/${song.id}?theme=0`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <a
        className="text-link"
        href={`https://open.spotify.com/track/${song.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        เปิด “{song.title}” ใน Spotify <ExternalIcon />
      </a>
    </div>
  )
}

export function Scene2Mixtape() {
  return (
    <section className="scene" aria-labelledby="scene-title">
      <SceneHeader
        eyebrow="Side A · Side B"
        title="Songs That Remind Me of You"
        thai="สี่เพลงในม้วนเทปนี้ เราอยากให้เธอได้ฟัง"
      />

      <ol className="tracklist">
        {SONGS.map((song, i) => (
          <li key={song.id}>
            <ScrapbookCard tilt={i % 2 === 0 ? -0.8 : 0.8} tape={i % 2 === 0 ? 'top' : 'corner'} tone="white" className="track">
              <div className="track__meta">
                <span className="track__label">
                  {song.side} / {song.track}
                </span>
                <h2 className="track__title">{song.title}</h2>
                <p className="track__artist">{song.artist}</p>
              </div>
              <p className="track__note">{song.note}</p>
              <SpotifyEmbed song={song} />
            </ScrapbookCard>
          </li>
        ))}
      </ol>

      <p className="whisper">ไม่มีเพลงไหนเล่นเอง กดเล่นตอนที่พร้อมได้เลยนะ ♪</p>
    </section>
  )
}
