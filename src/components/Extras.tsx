import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useFX } from '../effects'
import { HeartSvg } from './Decor'

/** Thin bar at the top showing how far she has scrolled through the website. */
export function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="How much of the page you have explored"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className="progress-fill" style={{ width: `${pct}%` }}>
        <HeartSvg className="progress-heart" />
      </div>
    </div>
  )
}

/** A tiny blue heart that scrolls back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      type="button"
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <HeartSvg />
    </button>
  )
}

/** A hidden little heart. Finding it reveals an extra message. */
export function SecretHeart() {
  const fx = useFX()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="secret-spot">
      <button
        ref={btnRef}
        type="button"
        className="secret-heart"
        aria-label="A tiny secret heart"
        onClick={(e) => {
          fx.chime('reveal')
          fx.heartsFrom(e.currentTarget, 12)
          setOpen(true)
        }}
      >
        <HeartSvg />
      </button>
      {open && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="A secret message"
          onClick={() => setOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <HeartSvg className="modal-heart" />
            <h3 className="hand">{config.secret.title}</h3>
            <p>{config.secret.message}</p>
            <button
              ref={closeRef}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setOpen(false)
                btnRef.current?.focus()
              }}
            >
              Close 💙
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
