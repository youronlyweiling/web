import { config } from '../config'
import { useInView } from '../hooks/useInView'
import { CuteCloud, HeartSvg, Sky, StarSvg } from './Decor'

interface Props {
  onReplay: () => void
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className={`reveal ${seen ? 'seen' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/** The finale: a last heartfelt note, big heading, beating heart, replay button. */
export function Finale({ onReplay }: Props) {
  const paragraphs = config.finale.body.split(/\n\s*\n/)

  return (
    <section className="section finale" id="finale" data-section="finale">
      <Sky dense />
      <CuteCloud className="finale-cloud fc1" />
      <CuteCloud className="finale-cloud fc2" />
      {[...Array(8)].map((_, i) => (
        <HeartSvg key={i} className="finale-heart" style={{ left: `${8 + i * 12}%`, animationDelay: `${i * 0.7}s` }} />
      ))}
      <StarSvg className="finale-star fs1" />
      <StarSvg className="finale-star fs2" />

      <div className="finale-inner">
        <Reveal>
          <h2 className="hand finale-kicker">{config.finale.kicker}</h2>
        </Reveal>

        <div className="finale-body">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="finale-heading">{config.finale.heading}</h2>
          <div className="beat-heart" aria-hidden="true">
            <HeartSvg />
          </div>
          <p className="hand finale-made">{config.finale.madeWith}</p>
          <button type="button" className="btn btn-primary" onClick={onReplay}>
            {config.finale.button}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
