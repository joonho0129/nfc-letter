import { timeline } from '../data/timeline'
import './Timeline.css'

export default function Timeline() {
  return (
    <div className="timeline">
      {timeline.map(({ id, src, comment }) => (
        <figure className="timeline-item" key={id}>
          <div className="timeline-photo">
            <img src={src} alt={comment} loading="lazy" />
          </div>
          <figcaption>{comment}</figcaption>
        </figure>
      ))}
    </div>
  )
}
