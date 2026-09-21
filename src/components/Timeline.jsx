import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const containerRef = useRef(null)
  const [extraPhotos, setExtraPhotos] = useState([])

  useEffect(() => {
    fetch('/api/extra-photos')
      .then((res) => res.json())
      .then((photos) => setExtraPhotos(Array.isArray(photos) ? photos : []))
      .catch(() => {})
  }, [])

  const allPhotos = [
    ...timeline,
    ...extraPhotos.map((p, i) => ({ id: `extra-${i}`, src: p.url, comment: p.caption })),
  ]

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
  }, [allPhotos.length])

  return (
    <div className="timeline" ref={containerRef}>
      {allPhotos.map(({ id, src, comment }) => (
        <figure className="timeline-item" key={id}>
          <div className="timeline-photo">
            <img src={src} alt={comment} loading="lazy" decoding="async" />
          </div>
          <figcaption>{comment}</figcaption>
        </figure>
      ))}
    </div>
  )
}
