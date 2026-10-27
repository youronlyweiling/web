import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useFX } from '../effects'
import { Envelope } from './Envelope'
import { HeartSvg, Sky } from './Decor'

interface Props {
  onDone: () => void
}

/** Full-screen first screen: a secret message and a sealed envelope. */
export function Intro({ onDone }: Props) {
  const fx = useFX()
  const [opening, setOpening] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const timers = useRef<number[]>([])
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const open = () => {
    if (opening) return
    setOpening(true)
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
      ctx.close().catch(() => {})
    } catch {}
    fx.chime('open')
    const r = wrapRef.current?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2
    const y = r ? r.top + r.height / 2 : window.innerHeight / 2
    fx.hearts(x, y, 14)
    later(() => fx.sparkles(x, y, 16), 350)
    later(() => fx.hearts(x, y, 10), 700)
    later(() => setLeaving(true), fx.reduced ? 300 : 1500) // glowing transition
    later(onDone, fx.reduced ? 600 : 2400)
  }

  return (
    <section className={`intro ${leaving ? 'leaving' : ''}`} aria-label="A secret message">
      <Sky dense />
      <div className="intro-inner">
        <h1 className="hand intro-line1">{config.intro.line1}</h1>
        <p className="intro-line2">{config.intro.line2}</p>

        <div className="intro-env" ref={wrapRef}>
          <Envelope open={opening} onClick={open} label="Open your little surprise" size="lg" />
        </div>

        <button type="button" className="btn btn-primary" onClick={open} disabled={opening}>
          {config.intro.button}
        </button>
        <p className="hint" aria-hidden={opening}>
          <HeartSvg className="hint-heart" /> {config.intro.hint}
        </p>
      </div>
      <div className="glow-wipe" aria-hidden="true" />
    </section>
  )
}
