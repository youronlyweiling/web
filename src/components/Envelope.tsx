import { HeartSvg } from './Decor'

interface Props {
  open: boolean
  onClick: () => void
  label: string
  /** Bigger envelope for the intro screen. */
  size?: 'md' | 'lg'
  disabled?: boolean
}

/** A cute pure-CSS envelope with a blue heart seal. The flap opens and a paper slides up. */
export function Envelope({ open, onClick, label, size = 'md', disabled }: Props) {
  return (
    <button
      type="button"
      className={`envelope ${size} ${open ? 'is-open' : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={open}
      disabled={disabled}
    >
      <span className="env-back" />
      <span className="env-paper">
        <i />
        <i />
        <i className="short" />
      </span>
      <span className="env-front" />
      <span className="env-flap" />
      <span className="env-seal">
        <HeartSvg />
      </span>
    </button>
  )
}
