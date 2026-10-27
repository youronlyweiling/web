import { useCallback, useEffect, useRef, useState } from 'react'
import { asset, config } from '../config'
import type { PhotoSlot } from '../config'
import { CloudSvg, HeartSvg, StarSvg } from './Decor'

/** Cute illustrated placeholder shown until a real photo is added (or if it fails to load). */
function Placeholder({ index }: { index: number }) {
  const Icon = [HeartSvg, StarSvg, CloudSvg][index % 3]
  return (
    <div className={`ph ph-${index % 3}`} aria-hidden="true">
      <Icon className="ph-icon" />
      <HeartSvg className="ph-mini a" />
      <StarSvg className="ph-mini b" />
      <HeartSvg className="ph-mini c" />
    </div>
  )
}

function PhotoImage({ photo, index }: { photo: PhotoSlot; index: number }) {
  const [failed, setFailed] = useState(false)
  if (!photo.src || failed) return <Placeholder index={index} />
  return (
    <img
      src={asset(photo.src)}
      alt={photo.alt ?? photo.caption}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/** Photo gallery with hover zoom, full-screen lightbox, and keyboard/touch navigation. */
export function Gallery() {
  const photos = config.gallery.photos
  const [active, setActive] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const touchX = useRef<number | null>(null)

  const close = useCallback(() => {
    setActive(null)
    openerRef.current?.focus()
  }, [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (active === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, close, prev, next])

  const current = active !== null ? photos[active] : null

  return (
    <section className="section gallery" id="gallery" data-section="gallery">
      <h2 className="section-title">{config.gallery.title}</h2>
      <p className="section-sub">{config.gallery.subtitle}</p>

      <ul className="photo-grid">
        {photos.map((p, i) => (
          <li key={i} style={{ ['--tilt' as string]: `${((i % 3) - 1) * 1.6}deg` }}>
            <button
              type="button"
              className="photo-card"
              onClick={(e) => {
                openerRef.current = e.currentTarget
                setActive(i)
              }}
              aria-label={`Open photo ${i + 1}: ${p.caption}`}
            >
              <span className="photo-frame">
                <PhotoImage photo={p} index={i} />
              </span>
              <span className="photo-caption hand">{p.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {current && active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
          }}
        >
          <button ref={closeRef} type="button" className="lb-close" onClick={close} aria-label="Close photo viewer">
            ✕
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              className="lb-nav lb-prev"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            <div className="lb-frame">
              {/* key resets the "failed to load" state when moving between photos */}
              <PhotoImage key={active} photo={current} index={active} />
            </div>
            <figcaption className="hand">{current.caption}</figcaption>
            <p className="lb-count">
              {active + 1} / {photos.length}
            </p>
          </figure>
          {photos.length > 1 && (
            <button
              type="button"
              className="lb-nav lb-next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  )
}
