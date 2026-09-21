import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const containerRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="timeline" ref={containerRef}>
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
