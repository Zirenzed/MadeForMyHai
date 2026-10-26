# A Mixtape for You × Flowers I Never Gave You

A personal, handmade-scrapbook gift website in seven scenes (React + TypeScript + Vite, plain CSS).

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```
`dist/` is fully static (relative paths), so it can be hosted anywhere or opened from any static host.

## Scenes
1. A Little Gift for You — cassette cover (tap it), optional sound toggle (off by default)
2. Songs That Remind Me of You — 4 official Spotify embeds (never autoplay) + "open in Spotify" fallback
3. Flowers I Never Gave You — 4 clickable flowers, each with its own note
4. The Little Secret Hunt — 3 ordered clues, optional hints, forgiving answer matching
5. Little Things About You — 5-question quiz + scored love-personality quiz (category counting)
6. Letters I Never Sent — 3 envelopes that open and close
7. The Last Flower — gentle confession with two equally enabled, respectful replies

## Privacy
All answers live in React state only. No localStorage, sessionStorage, cookies, analytics or network
calls (apart from the Spotify iframes the visitor chooses to play). Refreshing restarts the gift.

## Editing the content
- All Thai copy, songs, clues, quiz questions and letters: `src/data/content.ts`
- Clue answers accepted: `accepts` lists in `CLUES` (case/space/punctuation insensitive)
- Artwork: `src/assets/art/` (cropped from the supplied sticker sheet + hero image)
- Colours/typography/animation: `src/styles.css`

## Accessibility
Keyboard-operable everywhere, visible focus, focus moves to each scene heading, modal focus trap + Esc,
44px+ touch targets, `prefers-reduced-motion` respected, sound off by default.
