import { config } from '../config'
import { useInView } from '../hooks/useInView'
import { HeartSvg } from './Decor'
import type { TimelineEvent } from '../config'

function Item({ event, index, placeholder }: { event: TimelineEvent; index: number; placeholder: boolean }) {
  const { ref, seen } = useInView<HTMLLIElement>(0.2)
  return (
    <li ref={ref} className={`tl-item ${index % 2 ? 'right' : 'left'} ${seen ? 'seen' : ''}`}>
      <HeartSvg className="tl-marker" />
      <div className={`tl-card ${placeholder ? 'is-placeholder' : ''}`}>
        {event.date && <span className="tl-date">{event.date}</span>}
        <h3 className="tl-title">{event.title}</h3>
        <p className="tl-text">{event.text}</p>
      </div>
    </li>
  )
}

/**
 * Optional timeline. Hidden until the owner adds real events in config.ts
 * (or turns on `showPlaceholders` to preview the layout). Never invents dates or events.
 */
export function Timeline() {
  const { events, placeholders, showPlaceholders } = config.timeline
  const usingPlaceholders = events.length === 0 && showPlaceholders
  const list = events.length > 0 ? events : usingPlaceholders ? placeholders : []

  if (list.length === 0) return null

  return (
    <section className="section timeline" id="timeline" data-section="timeline">
      <h2 className="section-title">{config.timeline.title}</h2>
      <p className="section-sub">{config.timeline.subtitle}</p>
      <ol className="tl-list">
        {list.map((e, i) => (
          <Item key={i} event={e} index={i} placeholder={usingPlaceholders} />
        ))}
      </ol>
    </section>
  )
}
