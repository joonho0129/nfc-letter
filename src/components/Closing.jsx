import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Closing.css'

gsap.registerPlugin(ScrollTrigger)

// ponytail: 문구는 초안 — 실제 카피로 교체 필요
export default function Closing() {
  const ref = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !ref.current) return

    const ctx = gsap.context(() => {
      gsap.from('.closing-text', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section className="closing" ref={ref}>
      <p className="closing-text">
        오늘도, 앞으로도
        <br />
        네 곁에 있을게
      </p>
      <p className="closing-sub">사랑해 ♡</p>
    </section>
  )
}
