import { useCallback, useEffect, useRef, useState } from 'react'
import { config } from './config'
import { FXProvider, useFX } from './effects'
import { Intro } from './components/Intro'
import { Hero } from './components/Hero'
import { Letter } from './components/Letter'
import { Reasons } from './components/Reasons'
import { Gallery } from './components/Gallery'
import { GiftBox } from './components/GiftBox'
import { Timeline } from './components/Timeline'
import { Finale } from './components/Finale'
import { MusicPlayer, type MusicPlayerHandle } from './components/MusicPlayer'
import { BackToTop, ProgressBar, SecretHeart } from './components/Extras'

const scrollToId = (id: string, reduced: boolean) => {
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

const INTERACTIVE = 'button, a, input, textarea, select, label, [role="dialog"], .letter-card, .photo-card, .lightbox'

function Site() {
  const fx = useFX()
  const [introDone, setIntroDone] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const musicRef = useRef<MusicPlayerHandle>(null)

  // Sparkles when tapping empty decorative areas.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (!t || t.closest(INTERACTIVE)) return
      fx.sparkles(e.clientX, e.clientY, 7)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [fx])

  // While the intro is showing, lock page scroll.
  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [introDone])

  const replayIntro = useCallback(() => {
    window.scrollTo({ top: 0 })
    setIntroDone(false)
  }, [])

  const celebrateAgain = useCallback(() => {
    scrollToId('hero', fx.reduced)
    setReplayKey((k) => k + 1)
    window.setTimeout(() => {
      fx.confetti(90)
      fx.chime('wish')
    }, fx.reduced ? 0 : 600)
  }, [fx])

  return (
    <>
      {!introDone && <Intro onDone={() => { musicRef.current?.play().catch(() => {}); setIntroDone(true); }} />}

      {introDone && (
        <>
          <ProgressBar />
          <main className="site">
            <Hero replayKey={replayKey} onGift={() => scrollToId('gift', fx.reduced)} />
            <Letter />
            <Reasons />
            <Gallery />
            <SecretHeart />
            <GiftBox />
            <Timeline />
            <Finale onReplay={celebrateAgain} />
            <footer className="footer">
              <button type="button" className="btn btn-tiny" onClick={replayIntro}>
                Replay the opening surprise 💌
              </button>
              <p className="hand">{config.finale.madeWith}</p>
            </footer>
          </main>
          <BackToTop />
        </>
      )}
      {/* Stays mounted so music keeps playing if the opening surprise is replayed. */}
      <MusicPlayer ref={musicRef} visible={introDone} />
    </>
  )
}

export default function App() {
  return (
    <FXProvider>
      <Site />
    </FXProvider>
  )
}
