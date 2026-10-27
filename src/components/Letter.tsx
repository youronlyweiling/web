import { useRef, useState } from 'react'
import { config, withName } from '../config'
import { useFX } from '../effects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTypewriter } from '../hooks/useTypewriter'
import { Envelope } from './Envelope'
import { HeartSvg, StarSvg } from './Decor'

/** Interactive love letter: envelope opens, paper slides out, text types itself. */
export function Letter() {
  const fx = useFX()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [skip, setSkip] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const full = withName(config.letter.body)
  const { shown, done } = useTypewriter(full, open, reduced || skip)

  const toggle = () => {
    if (!open) {
      setOpen(true)
      fx.chime('open')
      fx.heartsFrom(wrapRef.current, 10)
      window.setTimeout(() => fx.heartsFrom(wrapRef.current, 8), 600)
    } else {
      setOpen(false)
      setSkip(false)
    }
  }

  // Render typed text plus an invisible "ghost" of the rest, so the card keeps its final height
  // while typing (no layout jumping).
  let remaining = shown.length
  const lines = full.split('\n').map((line) => {
    const typed = line.slice(0, Math.max(0, remaining))
    const ghost = line.slice(typed.length)
    remaining -= line.length + 1
    return { typed, ghost, started: remaining + line.length + 1 > 0 }
  })
  const lastTypedIndex = lines.reduce((acc, l, i) => (l.started ? i : acc), 0)

  return (
    <section className="section letter-section" id="letter" data-section="letter">
      <h2 className="section-title">{config.letter.title}</h2>
      <p className="section-sub">{open ? 'tap the envelope again to close it' : config.letter.hint}</p>

      <div className="letter-wrap" ref={wrapRef}>
        <Envelope open={open} onClick={toggle} label={open ? 'Close the letter' : 'Open the letter'} />

        <div className={`letter-card ${open ? 'out' : ''}`} aria-hidden={!open}>
          <div className="letter-inner">
            <StarSvg className="sticker st1" />
            <HeartSvg className="sticker st2" />
            <StarSvg className="sticker st3" />
            <div className="letter-text hand" aria-live="polite">
              {open &&
                lines.map((l, i) => (
                  <p key={i} className={l.typed === '' && l.ghost === '' ? 'gap' : undefined}>
                    {l.typed}
                    {i === lastTypedIndex && !done && <span className="caret" />}
                    {l.ghost && <span className="ghost">{l.ghost}</span>}
                  </p>
                ))}
            </div>
            {open && !done && (
              <button type="button" className="btn btn-tiny" onClick={() => setSkip(true)}>
                Show it all
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
