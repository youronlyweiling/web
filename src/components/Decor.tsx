import type { CSSProperties } from 'react'

/** Reusable cute SVG decorations. All colors come from the blue/white palette. */

export function HeartSvg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 30" aria-hidden="true">
      <path
        d="M16 29C16 29 2 20.5 2 10.2 2 5.4 5.6 2 9.8 2c2.7 0 5 1.4 6.2 3.6C17.200 3.400 19.500 2 22.200 2 26.400 2 30 5.400 30 10.200 30 20.500 16 29 16 29Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function StarSvg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.500l2.600 7.200 7.400.3-5.800 4.600 2 7.200L12 16.700 5.800 20.800l2-7.200L2 9l7.400-.3z" fill="currentColor" />
    </svg>
  )
}

export function SparkleSvg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.8 6.500 3.500 9.200 12 12-8.500 2.800-11.200 5.500-12 12-.8-6.500-3.500-9.200-12-12 8.500-2.800 11.200-5.500 12-12z" fill="currentColor" />
    </svg>
  )
}

export function CloudSvg({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 140 70" aria-hidden="true">
      <path
        d="M30 62c-16 0-28-9-28-22 0-12 10-21 23-21 3-12 14-19 28-19 14 0 25 7 29 18 3-1 6-2 10-2 15 0 27 11 27 26 0 11-8 20-20 20H30z"
        fill="currentColor"
      />
    </svg>
  )
}

/** A cute little cloud with a smile. */
export function CuteCloud({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 140 80" aria-hidden="true">
      <path
        d="M30 70c-16 0-28-9-28-22 0-12 10-21 23-21 3-12 14-19 28-19 14 0 25 7 29 18 3-1 6-2 10-2 15 0 27 11 27 26 0 11-8 20-20 20H30z"
        fill="#fff"
        stroke="#B8DCFF"
        strokeWidth="2.500"
      />
      <circle cx="52" cy="46" r="3" fill="#173B65" />
      <circle cx="82" cy="46" r="3" fill="#173B65" />
      <ellipse cx="44" cy="55" rx="6" ry="3.500" fill="#B8DCFF" opacity=".7" />
      <ellipse cx="90" cy="55" rx="6" ry="3.500" fill="#B8DCFF" opacity=".7" />
      <path d="M61 54c3 4 9 4 12 0" fill="none" stroke="#173B65" strokeWidth="2.200" strokeLinecap="round" />
    </svg>
  )
}

/** A static scatter of tiny stars + clouds used as a dreamy sky. */
const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 92}%`,
  size: 6 + ((i * 7) % 9),
  delay: `${(i % 7) * 0.45}s`,
}))

export function Sky({ dense = false }: { dense?: boolean }) {
  return (
    <div className="sky" aria-hidden="true">
      {STARS.slice(0, dense ? 26 : 16).map((s, i) => (
        <StarSvg
          key={i}
          className="sky-star"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}
      <CloudSvg className="sky-cloud c1" />
      <CloudSvg className="sky-cloud c2" />
      <CloudSvg className="sky-cloud c3" />
    </div>
  )
}

/** Cute mascot: a little round bear holding a birthday cake. */
export function Mascot({ className }: { className?: string }) {
  return (
    <svg className={`mascot ${className ?? ''}`} viewBox="0 0 160 170" role="img" aria-label="A cute little bear holding a birthday cake">
      {/* ears */}
      <circle cx="46" cy="40" r="16" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
      <circle cx="114" cy="40" r="16" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
      <circle cx="46" cy="40" r="7" fill="#B8DCFF" />
      <circle cx="114" cy="40" r="7" fill="#B8DCFF" />
      {/* head */}
      <ellipse cx="80" cy="66" rx="48" ry="42" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
      {/* party hat */}
      <path d="M80 2l16 30H64z" fill="#91C8F6" stroke="#fff" strokeWidth="2" />
      <circle cx="80" cy="3" r="4.500" fill="#fff" />
      {/* face */}
      <g className="mascot-eyes">
        <circle cx="62" cy="64" r="4.500" fill="#173B65" />
        <circle cx="98" cy="64" r="4.500" fill="#173B65" />
        <circle cx="63.500" cy="62.500" r="1.500" fill="#fff" />
        <circle cx="99.500" cy="62.500" r="1.500" fill="#fff" />
      </g>
      <ellipse cx="52" cy="76" rx="8" ry="5" fill="#B8DCFF" opacity=".8" />
      <ellipse cx="108" cy="76" rx="8" ry="5" fill="#B8DCFF" opacity=".8" />
      <ellipse cx="80" cy="74" rx="6" ry="4.500" fill="#173B65" />
      <path d="M72 82c3 5 13 5 16 0" fill="none" stroke="#173B65" strokeWidth="2.500" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="80" cy="128" rx="36" ry="30" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
      {/* cake */}
      <rect x="52" y="104" width="56" height="24" rx="8" fill="#fff" stroke="#91C8F6" strokeWidth="3" />
      <path d="M52 114c7 7 11-1 18 5s11-5 18 2 14-6 20 1" fill="none" stroke="#91C8F6" strokeWidth="3" strokeLinecap="round" />
      <rect x="77" y="92" width="6" height="12" rx="2" fill="#B8DCFF" />
      <path className="mascot-flame" d="M80 80c5 5 5 9 0 12-5-3-5-7 0-12z" fill="#fff" stroke="#91C8F6" strokeWidth="1.500" />
      {/* hands */}
      <circle cx="52" cy="124" r="9" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
      <circle cx="108" cy="124" r="9" fill="#DCEEFF" stroke="#91C8F6" strokeWidth="3" />
    </svg>
  )
}
