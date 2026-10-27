import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { asset, config } from '../config'

export interface MusicPlayerHandle {
  play: () => Promise<void>
  pause: () => void
}

/**
 * Floating music button. Music can be started programmatically (e.g. on intro click).
 * If the audio file is missing, the site keeps working and a friendly note is shown.
 */
export const MusicPlayer = forwardRef<MusicPlayerHandle, { visible?: boolean }>(({ visible = true }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)
  const [panel, setPanel] = useState(false)
  const [volume, setVolume] = useState(config.music.defaultVolume)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      await a.play()
      setPlaying(true)
      setMissing(false)
    } catch {
      setPlaying(false)
      setMissing(true)
      setPanel(true)
    }
  }

  const pause = () => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    setPlaying(false)
  }

  useImperativeHandle(ref, () => ({ play, pause }), [playing])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      return
    }
    await play()
  }

  return (
    <div className={`music ${visible ? '' : 'is-hidden'}`}>
      <audio
        ref={audioRef}
        src={asset(config.music.src)}
        loop
        preload="none"
        onError={() => {
          setMissing(true)
          setPlaying(false)
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {panel && (
        <div className="music-panel" role="group" aria-label="Music settings">
          {missing ? (
            <p className="music-missing">
              No song added yet 🎵
              <br />
              <small>
                Put an audio file at <code>public{config.music.src}</code>
              </small>
            </p>
          ) : (
            <label className="music-vol">
              <span>Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Music volume"
              />
            </label>
          )}
        </div>
      )}

      <button
        type="button"
        className={`music-btn ${playing ? 'playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
      >
        {playing ? (
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span aria-hidden="true" className="music-note">
            ♪
          </span>
        )}
      </button>
      <button
        type="button"
        className="music-gear"
        onClick={() => setPanel((p) => !p)}
        aria-label={panel ? 'Hide music settings' : 'Show music settings'}
        aria-expanded={panel}
      >
        {panel ? '×' : '⋯'}
      </button>
    </div>
  )
})

MusicPlayer.displayName = 'MusicPlayer'
