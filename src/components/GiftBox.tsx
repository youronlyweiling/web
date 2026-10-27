import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useFX } from '../effects'
import { HeartSvg, Sky, StarSvg } from './Decor'

type Phase = 'closed' | 'untying' | 'opening' | 'open'

/** Big gift box: ribbon comes loose, lid pops, confetti flies, a message card appears. */
export function GiftBox() {
  const fx = useFX()
  const [phase, setPhase] = useState<Phase>('closed')
  const boxRef = useRef<HTMLDivElement | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const openGift = () => {
    if (phase !== 'closed') return
    const slow = fx.reduced ? 0 : 1
    setPhase('untying')
    fx.chime('pop')
    later(() => {
      setPhase('opening')
      fx.chime('open')
    }, 700 * slow)
    later(() => {
      setPhase('open')
      const r = boxRef.current?.getBoundingClientRect()
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2
      const y = r ? r.top + r.height * 0.3 : window.innerHeight / 2
      fx.celebrate(x, y)
      fx.chime('reveal')
    }, 1300 * slow)
  }

  const replay = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setPhase('closed')
  }

  const paragraphs = config.gift.message.split(/\n\s*\n/)

  return (
    <section className="section gift" id="gift" data-section="gift">
      <Sky />
      <div className="gift-inner">
        <p className="hand gift-teaser">{config.gift.teaser}</p>

        <div className={`gift-stage phase-${phase}`}>
          <div className="giftbox" ref={boxRef}>
            <StarSvg className="gb-star s1" />
            <StarSvg className="gb-star s2" />
            <StarSvg className="gb-star s3" />
            <StarSvg className="gb-star s4" />
            <div className="gb-glow" />
            <div className="gb-body">
              <div className="gb-ribbon-v" />
            </div>
            <div className="gb-lid">
              <div className="gb-ribbon-v" />
              <div className="gb-bow">
                <span className="loop l" />
                <span className="loop r" />
                <span className="knot" />
                <span className="tail tl" />
                <span className="tail tr" />
              </div>
            </div>
          </div>

          <div className="gb-card" aria-hidden={phase !== 'open'}>
            <div className="gb-card-inner">
              <div className="gb-card-body">
                <HeartSvg className="gb-card-heart" />
                <div className="gb-card-text hand">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {phase === 'closed' && (
          <button type="button" className="btn btn-primary" onClick={openGift}>
            {config.gift.button}
          </button>
        )}
        {(phase === 'untying' || phase === 'opening') && (
          <button type="button" className="btn btn-primary" disabled>
            Opening... ✨
          </button>
        )}
        {phase === 'open' && (
          <button type="button" className="btn btn-ghost" onClick={replay}>
            {config.gift.replayButton}
          </button>
        )}
      </div>
    </section>
  )
}
