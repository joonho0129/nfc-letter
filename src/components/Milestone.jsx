import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RELATIONSHIP_START, daysSince } from '../lib/dates'
import './Milestone.css'

gsap.registerPlugin(ScrollTrigger)

export default function Milestone() {
  const targetDays = daysSince(RELATIONSHIP_START)
  const [displayDays, setDisplayDays] = useState(0)
  const numberRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplayDays(targetDays)
      return
    }
    if (!numberRef.current) return

    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: targetDays,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => setDisplayDays(Math.round(counter.value)),
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [targetDays])

  return (
    <section className="milestone">
      <p className="milestone-label">함께한 지</p>
      <p className="milestone-number" ref={numberRef}>
        {displayDays}
        <span className="milestone-unit">일</span>
      </p>
    </section>
  )
}
