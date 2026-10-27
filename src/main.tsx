import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Fonts are bundled locally (no CDN), so the site looks the same offline.
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/fredoka/400.css'
import '@fontsource/fredoka/500.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
