interface Props {
  /** When true the candle flames are out. */
  blownOut: boolean
}

const CANDLES = [78, 120, 162]

/** Animated birthday cake with flickering candle flames. */
export function Cake({ blownOut }: Props) {
  return (
    <svg
      className={`cake ${blownOut ? 'blown' : ''}`}
      viewBox="0 0 240 230"
      role="img"
      aria-label={blownOut ? 'A birthday cake with the candles blown out' : 'A birthday cake with three flickering candles'}
    >
      <defs>
        <linearGradient id="cakeGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#DCEEFF" />
        </linearGradient>
      </defs>
      {/* plate */}
      <ellipse cx="120" cy="212" rx="104" ry="13" fill="#B8DCFF" />
      <ellipse cx="120" cy="208" rx="104" ry="13" fill="#fff" stroke="#91C8F6" strokeWidth="3" />

      {/* bottom tier */}
      <rect x="28" y="140" width="184" height="68" rx="16" fill="url(#cakeGlow)" stroke="#91C8F6" strokeWidth="3.500" />
      <path
        d="M28 158c12 14 22 14 33 0s22 14 33 0 22 14 33 0 22 14 33 0 22 14 33 0 11 6 15 0v-6H28z"
        fill="#91C8F6"
        opacity=".9"
      />
      <circle cx="58" cy="186" r="5" fill="#B8DCFF" />
      <circle cx="98" cy="192" r="5" fill="#B8DCFF" />
      <circle cx="142" cy="186" r="5" fill="#B8DCFF" />
      <circle cx="182" cy="192" r="5" fill="#B8DCFF" />

      {/* top tier */}
      <rect x="54" y="92" width="132" height="54" rx="14" fill="url(#cakeGlow)" stroke="#91C8F6" strokeWidth="3.500" />
      <path
        d="M54 108c10 12 18 12 27 0s18 12 27 0 18 12 27 0 18 12 27 0 14 8 18 2v-5H54z"
        fill="#B8DCFF"
      />
      <path d="M100 132l6-6 6 6-6 6zM136 132l6-6 6 6-6 6z" fill="#91C8F6" opacity=".8" />

      {/* candles */}
      {CANDLES.map((x, i) => (
        <g key={x}>
          <rect x={x - 5} y="62" width="10" height="34" rx="3" fill="#fff" stroke="#91C8F6" strokeWidth="2.500" />
          <path d={`M${x - 5} 72l10 5M${x - 5} 80l10 5M${x - 5} 88l10 5`} stroke="#91C8F6" strokeWidth="2.500" opacity=".7" />
          {/* flame */}
          <g className="flame" style={{ animationDelay: `${i * 0.3}s` }}>
            <path d={`M${x} 34c9 10 9 19 0 25-9-6-9-15 0-25z`} fill="#fff" stroke="#91C8F6" strokeWidth="2.500" />
            <path d={`M${x} 44c4 5 4 9 0 12-4-3-4-7 0-12z`} fill="#B8DCFF" />
          </g>
          {/* smoke wisp, only visible once blown out */}
          <path
            className="smoke"
            style={{ animationDelay: `${i * 0.12}s` }}
            d={`M${x} 56c-6-8 6-12 0-22`}
            fill="none"
            stroke="#B8DCFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  )
}

const BALLOONS = [
  { left: '6%', color: '#91C8F6', delay: '0s', scale: 1 },
  { left: '17%', color: '#FFFFFF', delay: '0.8s', scale: 0.85 },
  { left: '82%', color: '#B8DCFF', delay: '0.4s', scale: 0.95 },
  { left: '92%', color: '#FFFFFF', delay: '1.2s', scale: 0.8 },
]

/** Floating blue-and-white balloons that bob gently. */
export function Balloons() {
  return (
    <div className="balloons" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <svg
          key={i}
          className="balloon"
          viewBox="0 0 60 120"
          style={{ left: b.left, animationDelay: b.delay, width: `${Math.round(60 * b.scale)}px` }}
        >
          <ellipse cx="30" cy="38" rx="26" ry="32" fill={b.color} stroke="#91C8F6" strokeWidth="2.500" />
          <ellipse cx="20" cy="26" rx="6" ry="10" fill="#fff" opacity=".6" transform="rotate(25 20 26)" />
          <path d="M26 70l4 6 4-6z" fill={b.color} stroke="#91C8F6" strokeWidth="2" />
          <path d="M30 76c-8 10 8 16 0 28s4 12 0 16" fill="none" stroke="#91C8F6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  )
}
