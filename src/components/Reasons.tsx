import { useRef, useState } from 'react'
import { config } from '../config'
import { useFX } from '../effects'
import { CloudSvg, HeartSvg, StarSvg } from './Decor'

const STICKERS = [HeartSvg, StarSvg, CloudSvg, HeartSvg, StarSvg, CloudSvg, HeartSvg, StarSvg]

interface CardProps {
  index: number
  text: string
  flipped: boolean
  onFlip: (e: React.MouseEvent<HTMLElement>) => void
}

function ReasonCard({ index, text, flipped, onFlip }: CardProps) {
  const Sticker = STICKERS[index % STICKERS.length]
  return (
    <button
      type="button"
      className={`reason-card ${flipped ? 'flipped' : ''}`}
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={flipped ? text : `Reason number ${index + 1}. Tap to reveal.`}
    >
      <span className="rc-inner">
        <span className="rc-face rc-front">
          <Sticker className="rc-sticker" />
          <span className="rc-num">#{index + 1}</span>
        </span>
        <span className="rc-face rc-back">
          <span className="rc-text hand">{text}</span>
        </span>
      </span>
    </button>
  )
}

/** Flip-cards with sweet reasons, plus a button that reveals extra reasons one by one. */
export function Reasons() {
  const fx = useFX()
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [extra, setExtra] = useState(0)
  const [bump, setBump] = useState(0)
  const boardRef = useRef<HTMLDivElement | null>(null)

  const cards = config.reasons.cards
  const more = config.reasons.more
  const shownMore = more.slice(0, extra)
  const nextReason = extra > 0 ? more[extra - 1] : null

  const flip = (i: number, e: React.MouseEvent<HTMLElement>) => {
    const willFlip = !flipped.has(i)
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
    if (willFlip) {
      fx.chime('pop')
      fx.heartsFrom(e.currentTarget, 5)
    }
  }

  const another = (e: React.MouseEvent<HTMLElement>) => {
    // First reveal any unflipped starter cards, then go through the "more" list, then loop gently.
    const unflipped = cards.findIndex((_, i) => !flipped.has(i))
    if (unflipped !== -1) {
      setFlipped((prev) => new Set(prev).add(unflipped))
    } else if (extra < more.length) {
      setExtra((n) => n + 1)
    } else if (more.length > 0) {
      setExtra(1) // start over, gently
    }
    setBump((b) => b + 1)
    fx.chime('reveal')
    fx.heartsFrom(e.currentTarget, 8)
  }

  const allDone = cards.every((_, i) => flipped.has(i)) && more.length === 0

  return (
    <section className="section reasons" id="reasons" data-section="reasons">
      <h2 className="section-title">{config.reasons.title}</h2>
      <p className="section-sub">{config.reasons.subtitle}</p>

      <div className="reason-grid" ref={boardRef}>
        {cards.map((text, i) => (
          <ReasonCard key={i} index={i} text={text} flipped={flipped.has(i)} onFlip={(e) => flip(i, e)} />
        ))}
      </div>

      {nextReason && (
        <div key={bump} className="extra-reason hand" role="status" aria-live="polite">
          <HeartSvg className="er-heart" />
          <span>{nextReason}</span>
        </div>
      )}
      {shownMore.length > 1 && (
        <p className="section-sub small">{shownMore.length} extra reasons found so far 💙</p>
      )}

      <button type="button" className="btn btn-primary" onClick={another} disabled={allDone}>
        {config.reasons.moreButton}
      </button>
    </section>
  )
}
