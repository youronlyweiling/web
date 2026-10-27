import { useRef, useState } from 'react'
import { config, withName } from '../config'
import { useFX } from '../effects'
import { Balloons, Cake } from './Cake'
import { Mascot, Sky } from './Decor'

interface Props {
  /** Increments when "Let's Celebrate Again" is pressed, so the cake relights. */
  replayKey: number
  onGift: () => void
}

/** Main birthday hero: cake, balloons, wish button. */
export function Hero({ replayKey, onGift }: Props) {
  const fx = useFX()
  const [wished, setWished] = useState(false)
  const [lastKey, setLastKey] = useState(replayKey)
  const cakeRef = useRef<HTMLDivElement | null>(null)

  // Relight the candles when the celebration is replayed.
  if (replayKey !== lastKey) {
    setLastKey(replayKey)
    setWished(false)
  }

  const makeWish = () => {
    if (wished) return
    setWished(true)
    fx.chime('wish')
    const r = cakeRef.current?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2
    const y = r ? r.top + r.height * 0.2 : window.innerHeight / 3
    fx.celebrate(x, y)
  }

  return (
    <section className="section hero" id="hero" data-section="hero">
      <Sky />
      <Balloons />
      <div className="hero-inner">
        <p className="hand hero-top">{config.hero.topHeading}</p>
        <h1 className="hero-title">{withName(config.hero.nameHeading)}</h1>
        <p className="hero-sub">{config.hero.subtitle}</p>

        <div className="cake-wrap" ref={cakeRef}>
          <Cake blownOut={wished} />
          <Mascot className="hero-mascot" />
        </div>

        <p className={`wish-msg hand ${wished ? 'show' : ''}`} role="status" aria-live="polite">
          {wished ? config.hero.wishMessage : ' '}
        </p>

        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={makeWish} disabled={wished}>
            {wished ? 'Wish made 💫' : config.hero.wishButton}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onGift}>
            {config.hero.giftButton}
          </button>
        </div>
      </div>
    </section>
  )
}
