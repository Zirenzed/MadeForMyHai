import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-sans-thai-looped/thai-400.css'
import '@fontsource/noto-sans-thai-looped/thai-600.css'
import '@fontsource/caveat/latin-500.css'
import '@fontsource/caveat/latin-700.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-700.css'
import './styles.css'
import App from './App'
import { SoundProvider } from './sound'
import { MusicProvider } from './music'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SoundProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </SoundProvider>
  </StrictMode>,
)
