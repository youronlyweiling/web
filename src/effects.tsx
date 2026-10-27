import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { config } from './config'
import { useReducedMotion } from './hooks/useReducedMotion'

type Kind = 'heart' | 'sparkle' | 'confetti' | 'star'

interface Particle {
  id: number
  kind: Kind
  x: number // px, viewport
  y: number
  dx: number
  dy: number
  rot: number
  size: number
  dur: number
  color: string
  delay: number
}

export type Chime = 'open' | 'wish' | 'pop' | 'reveal'

interface FX {
  /** Little hearts rising from a point (viewport px). */
  hearts: (x: number, y: number, count?: number) => void
  /** Tiny sparkle burst at a point. */
  sparkles: (x: number, y: number, count?: number) => void
  /** Blue-and-white confetti from the top of the screen (or a point). */
  confetti: (count?: number, origin?: { x: number; y: number }) => void
  /** Fireworks of everything at once, for big moments. */
  celebrate: (x: number, y: number) => void
  /** Optional soft sound effect (synthesized, no files). */
  chime: (kind: Chime) => void
  /** Burst hearts centered on an element. */
  heartsFrom: (el: Element | null, count?: number) => void
  reduced: boolean
}

const Ctx = createContext<FX | null>(null)

export function useFX(): FX {
  const v = useContext(Ctx)
  if (!v) throw new Error('useFX must be used inside <FXProvider>')
  return v
}

const BLUES = ['#91C8F6', '#B8DCFF', '#DCEEFF', '#FFFFFF', '#6FB2EE', '#FFFFFF']
const MAX_PARTICLES = 140
let nextId = 1

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export function FXProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [particles, setParticles] = useState<Particle[]>([])
  const audioRef = useRef<AudioContext | null>(null)

  const add = useCallback((list: Particle[]) => {
    setParticles((prev) => [...prev, ...list].slice(-MAX_PARTICLES))
    const maxLife = Math.max(...list.map((p) => p.dur + p.delay)) * 1000 + 100
    window.setTimeout(() => {
      const ids = new Set(list.map((p) => p.id))
      setParticles((prev) => prev.filter((p) => !ids.has(p.id)))
    }, maxLife)
  }, [])

  const hearts = useCallback(
    (x: number, y: number, count = 6) => {
      if (reduced) return
      add(
        Array.from({ length: count }, () => ({
          id: nextId++,
          kind: 'heart' as Kind,
          x: x + rand(-18, 18),
          y,
          dx: rand(-50, 50),
          dy: -rand(90, 190),
          rot: rand(-25, 25),
          size: rand(14, 26),
          dur: rand(1.4, 2.4),
          color: Math.random() > 0.3 ? '#91C8F6' : '#FFFFFF',
          delay: rand(0, 0.25),
        })),
      )
    },
    [add, reduced],
  )

  const sparkles = useCallback(
    (x: number, y: number, count = 8) => {
      if (reduced) return
      add(
        Array.from({ length: count }, () => {
          const a = rand(0, Math.PI * 2)
          const d = rand(24, 70)
          return {
            id: nextId++,
            kind: (Math.random() > 0.5 ? 'sparkle' : 'star') as Kind,
            x,
            y,
            dx: Math.cos(a) * d,
            dy: Math.sin(a) * d,
            rot: rand(-90, 90),
            size: rand(8, 16),
            dur: rand(0.7, 1.2),
            color: BLUES[Math.floor(rand(0, BLUES.length))],
            delay: 0,
          }
        }),
      )
    },
    [add, reduced],
  )

  const confetti = useCallback(
    (count = 60, origin?: { x: number; y: number }) => {
      if (reduced) return
      const w = window.innerWidth
      add(
        Array.from({ length: count }, () => ({
          id: nextId++,
          kind: 'confetti' as Kind,
          x: origin ? origin.x + rand(-20, 20) : rand(0, w),
          y: origin ? origin.y : -12,
          dx: origin ? rand(-180, 180) : rand(-60, 60),
          dy: origin ? rand(-220, 260) : window.innerHeight + 40,
          rot: rand(-540, 540),
          size: rand(6, 11),
          dur: rand(1.8, 3.2),
          color: BLUES[Math.floor(rand(0, BLUES.length))],
          delay: rand(0, 0.5),
        })),
      )
    },
    [add, reduced],
  )

  const celebrate = useCallback(
    (x: number, y: number) => {
      confetti(70, { x, y })
      confetti(40)
      hearts(x, y, 8)
      sparkles(x, y, 12)
    },
    [confetti, hearts, sparkles],
  )

  const heartsFrom = useCallback(
    (el: Element | null, count = 6) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      hearts(r.left + r.width / 2, r.top + r.height / 2, count)
    },
    [hearts],
  )

  const chime = useCallback((kind: Chime) => {
    if (!config.music.soundEffects) return
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return
      if (!audioRef.current) audioRef.current = new AC()
      const ctx = audioRef.current
      if (ctx.state === 'suspended') void ctx.resume()
      const notes: Record<Chime, number[]> = {
        open: [659.25, 783.99, 987.77, 1318.51],
        wish: [523.25, 659.25, 783.99],
        pop: [880, 1174.66],
        reveal: [587.33, 880, 1174.66],
      }
      const t0 = ctx.currentTime
      notes[kind].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        const start = t0 + i * 0.11
        gain.gain.setValueAtTime(0.0001, start)
        gain.gain.exponentialRampToValueAtTime(0.06, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.7)
        osc.connect(gain).connect(ctx.destination)
        osc.start(start)
        osc.stop(start + 0.75)
      })
    } catch {
      /* sound is optional — ignore any failure */
    }
  }, [])

  const value = useMemo<FX>(
    () => ({ hearts, sparkles, confetti, celebrate, chime, heartsFrom, reduced }),
    [hearts, sparkles, confetti, celebrate, chime, heartsFrom, reduced],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fx-layer" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`fx fx-${p.kind}`}
            style={
              {
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.kind === 'confetti' ? p.size * 1.6 : p.size,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                '--rot': `${p.rot}deg`,
                '--c': p.color,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </Ctx.Provider>
  )
}
